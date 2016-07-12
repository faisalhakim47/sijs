import { IComponentClass, isComponentClass } from './component'
import { RouterView } from './routerview'
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
import { Router } from '../instance/router'
import { is } from '../instance/status'
import { ObsGetter } from '../observer/observable'

export interface IElem {
  id: string
  _isElm: boolean
  template: string
  glues: Glue[]
  events: string[]
}

export function isElem(t): t is IElem {
  return t && t._isElm
}

const onRx = /^on/

export interface createElem {
  (
    tag: string | IComponentClass,
    attrs: any,
    ...children: (string | ObsGetter | IElem | RouterView)[]
  ): IElem
  router: Router
}

export function createElem(
  tag: string | IComponentClass,
  attrs: any,
  ...children: (string | ObsGetter | IElem | RouterView)[]
): IElem {
  if (attrs === null) attrs = { empty: true }

  if (isComponentClass(tag)) {
    const c = new tag(attrs, children, (<any>createElem).router)
    return c.create()
  }

  if (typeof tag === 'string') {
    const id = attrs.id || genId()
    let template = '<' + tag + ' id="' + id + '"'
    const glues: Glue[] = []
    const events: string[] = []

    if (!attrs.empty) {
      if (attrs.if instanceof ObsGetter) {
        const ifGlue = new IfGlue(id, attrs.if, () => {
          return createElem(tag, attrs, ...children)
        })

        const openTag = template
        template = '<script id="if' + id + '"></script>'

        if (attrs.if.val()) {
          return { _isElm: true, id, template, glues: [ifGlue], events: [] }
        } else {
          template += openTag
          glues.push(ifGlue)
        }
        attrs.if = null
      } else if (attrs.if !== undefined && !attrs.if) {
        return { _isElm: true, id, template: '', glues: [], events: [] }
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

      if (attrs.model instanceof ObsGetter) {
        const model: ObsGetter = attrs.model
        if (tag === 'input' || tag === 'textarea') {
          switch (attrs.type) {
            case 'number':
              template += `value="${model.val()}"`
              glues.push(
                new InputNumberGlue(id, model)
              )
              events.push('oninput')
              break

            case 'checkbox':
              glues.push(
                new InputCheckboxGlue(id, model)
              )
              events.push('onchange')
              break

            case 'radio':
              events.push('onchange')
              glues.push(
                new InputRadioGlue(id, model)
              )
              break

            default:
              template += `value="${model.val()}"`
              glues.push(
                new TextGlue(id, model)
              )
              events.push('oninput')
              break
          }
        } else if (tag === 'select') {
          template += `value="${model.val()}"`
          glues.push(
            new SelectGlue(id, model)
          )
          events.push('onchange')
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
    }

    template += '>'

    children.forEach((child, i) => {
      let elem: IElem = <IElem>child
      if (child instanceof ObsGetter) {
        elem = createElem('span', null, child.val())
        elem.glues.push(
          new BindGlue(elem.id, child)
        )
      }
      if (child instanceof RouterView) {
        elem = child.init(
          (<any>createElem).router
            ? (<any>createElem).router.currentRouteName
            : null
        )
      }
      if (isElem(elem)) {
        if (!is.prerender) template += elem.template
        if (!is.server) {
          glues.push(...elem.glues)
          events.push(...elem.events)
        }
      } else if (child && !is.prerender) {
        template += child.toString()
      }
    })

    template += '</' + tag + '>'

    return {
      id,
      template,
      glues,
      events,
      _isElm: true
    }
  }
}

function camelToSnake(str) {
  return str.replace(/\.?[A-Z]+/g, (x, y) => {
    return "-" + y.toLowerCase()
  }).replace(/^-/, '')
}
