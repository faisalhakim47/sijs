import { IComponentClass, isComponentClass } from './component'
import { RouterView } from './elem-routerview'
import { genId } from './uid'
import { Glue } from '../glue/glue'
import { AttrGlue } from '../glue/attr'
import { BindGlue } from '../glue/bind'
import { ClassGlue } from '../glue/class'
import { EventGlue } from '../glue/event'
import { IfGlue } from '../glue/if'
import { StyleGlue } from '../glue/style'
import { TextGlue } from '../glue/model/text'
import { InputNumberGlue } from '../glue/model/input-number'
import { InputCheckboxGlue } from '../glue/model/input-checkbox'
import { InputRadioGlue } from '../glue/model/input-radio'
import { SelectGlue } from '../glue/model/select'
import is from '../instance/status'
import { ObsGetter } from '../observer/observable'

export interface IElem {
  id: string
  _isElm: boolean
  template: string
  glues: Glue[]
}

export function isElem(t): t is IElem {
  return t && t._isElm
}

const onRx = /^on/

export function createElem(
  tag: string | IComponentClass,
  attrs: any,
  ...children: (string | ObsGetter | IElem | RouterView)[]
): IElem {
  if (attrs === null) attrs = { empty: true }

  if (isComponentClass(tag)) {
    const c = new tag(attrs, children)
    return c.create()
  }

  if (typeof tag === 'string') {
    const id = attrs.id || genId()
    let template = '<' + tag + ' id="' + id + '"'
    const glues: Glue[] = []

    if (!attrs.empty) {
      if (attrs.if instanceof ObsGetter) {
        const ifGlue = new IfGlue(id, attrs.if, () => {
          return createElem(tag, attrs, ...children)
        })

        const openTag = template
        template = '<script id="if' + id + '"></script>'

        if (attrs.if.val()) {
          return { _isElm: true, id, template, glues: [ifGlue] }
        } else {
          template += openTag
          glues.push(ifGlue)
        }
        attrs.if = null
      } else if (attrs.if !== undefined && !attrs.if) {
        return { _isElm: true, id, template: '', glues: [] }
      }

      if (attrs.className !== undefined) {
        template += 'class="'
        if (attrs.class) {
          attrs.class instanceof ObsGetter
            ? template += attrs.class.val() + ' '
            : template += attrs.class + ' '
          attrs.class = null
        }
        Object.keys(attrs.className).forEach((name) => {
          glues.push(
            new ClassGlue(id, name, attrs.className[name])
          )
        })

        attrs.className = null
        template += '"'
      }

      if (attrs.style !== undefined) {
        template += 'style="'
        Object.keys(attrs.style).forEach((styleName) => {
          let value = attrs.style[styleName]
          if (value instanceof ObsGetter) {
            glues.push(
              new StyleGlue(id, styleName, value)
            )
            value = value.val()
          }
          template += `${camelToSnake(styleName)}:${value};`
        })
        template += '"'
      }

      const events: any = {}

      if (attrs.model instanceof ObsGetter) {
        const model: ObsGetter = attrs.model
        if (tag === 'input' || tag === 'textarea') {
          switch (attrs.type) {
            case 'number':
              events.oninput = true
              glues.push(
                new InputNumberGlue(id, model)
              )
              break

            case 'checkbox':
              events.onchange = true
              glues.push(
                new InputCheckboxGlue(id, model)
              )
              break

            case 'radio':
              events.onchange = true
              glues.push(
                new InputRadioGlue(id, model)
              )
              break

            default:
              events.oninput = true
              glues.push(
                new TextGlue(id, model)
              )
              break
          }
        } else if (tag === 'select') {
          events.onchange = true
          glues.push(
            new SelectGlue(id, model)
          )
        }
        attrs.model = null
        attrs.type = null
      }

      Object.keys(attrs).forEach((name) => {
        const val = attrs[name]

        if (val === null) return

        if (onRx.test(name)) {
          glues.push(
            new EventGlue(id, name, val)
          )
          events.push(name)
        } else {
          template += name + '="'
          if (attrs[name] instanceof ObsGetter) {
            template += val.val()
            glues.push(
              new AttrGlue(id, name, val)
            )
          } else if (typeof val === 'string') {
            template += val
          }
          template += '"'
        }
      })

      for (let eventName in events) {
        template += `${eventName}="_EBE('${id}:${eventName}')"`
      }
    }

    template += '>'

    children.forEach((child, i) => {
      if (child instanceof ObsGetter) {
        child = createElem('span', { bind: child }, (<ObsGetter>child).val())
      }
      if (child instanceof RouterView) {
        child = (<RouterView>child).Elem()
      }
      if (isElem(child)) {
        if (!is.prerender) template += child.template
        if (!is.server) glues.push(...child.glues)
      } else if (child && !is.prerender) {
        template += child.toString()
      }
    })

    template += '</' + tag + '>'

    return {
      id,
      template,
      glues,
      _isElm: true,
    }
  }
}

function camelToSnake(str) {
  return str.replace(/\.?[A-Z]+/g, (x, y) => {
    return "-" + y.toLowerCase()
  }).replace(/^-/, '')
}
