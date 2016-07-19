import { Component } from './component'
import { genId } from './uid'
import { IGlobalAttribute, IAllAttribute } from './interfaces'
import { RouterView } from './routerview'
import { AttrGlue } from '../glue/attr'
import { BindGlue } from '../glue/bind'
import { ClassGlue } from '../glue/class'
import { EventGlue } from '../glue/event'
import { Glue } from '../glue/glue'
import { IfGlue } from '../glue/if'
import { LinkGlue } from '../glue/link'
import { StyleGlue } from '../glue/style'
import { TextGlue } from '../glue/model/text'
import { InputNumberGlue } from '../glue/model/input-number'
import { InputCheckboxGlue } from '../glue/model/input-checkbox'
import { InputRadioGlue } from '../glue/model/input-radio'
import { SelectGlue } from '../glue/model/select'
import { is } from '../instance/status'
import { ObsGetter } from '../observer/observable'
import { isBoolean, isString } from '../tools/typecheck'

export class Elem {
  constructor(
    public id: string,
    public template: string = '',
    public glues: Glue[] = [],
    public events: string[] = [],
    public readyFns: Function[],
    public routers: RouterView[]
  ) { }
}

export type TChild = (string | ObsGetter | Elem | Component)
const onRx = /^on/
export function h(
  tag: string,
  attrs: IAllAttribute = {},
  children: TChild[] = []
): Elem {
  if (!attrs) attrs = { empty: true }

  const attrId = attrs.id
  let id: string
  if (!attrId) {
    id = genId()
  } else if (isString(attrId)) {
    id = attrId
  } else if (attrId instanceof ObsGetter) {
    id = attrId.val()
  }
  let template = `<${tag} id="${id}" `
  const glues: Glue[] = []
  const events: string[] = []
  const readyFns: Function[] = []
  const routers: RouterView[] = []

  if (!attrs.empty) {
    if (attrs.if instanceof ObsGetter) {
      const ifGlue = new IfGlue(id, attrs.if, () => {
        return h(tag, attrs, children)
      })

      const openTag = template
      template = '<script id="if' + id + '"></script>'

      if (attrs.if.val()) {
        return new Elem(
          id, template, glues, events, readyFns, routers
        )
      } else {
        template += openTag
        glues.push(ifGlue)
      }
      attrs.if = null
    } else if (attrs.if !== undefined && !attrs.if) {
      return new Elem(
        id, template, glues, events, readyFns, routers
      )
    }

    if (attrs.className !== undefined) {
      template += 'class="'
      if (attrs.class) {
        const attrClass = attrs.class
        attrClass instanceof ObsGetter
          ? template += `${attrClass.val()} `
          : template += `${attrClass} `
        attrs.class = null
      }
      Object.keys(attrs.className).forEach((className) => {
        const cond = attrs.className[name]
        if (cond instanceof ObsGetter) {
          if (cond.val()) template = `${className} `
          glues.push(
            new ClassGlue(id, name, attrs.className[name])
          )
        } else if (isBoolean(cond) && !!cond) {
          template = `${className} `
        }
      })
      attrs.className = null
      template += '"'
    }

    if (attrs.style !== undefined) {
      template += 'style="'
      Object.keys(attrs.style).forEach((styleName) => {
        let value = attrs.style[styleName]
        if (value instanceof ObsGetter) {
          value = value.val()
          glues.push(
            new StyleGlue(id, styleName, value)
          )
        }
        template += `${camelToSnake(styleName)}:${value};`
      })
      template += '"'
    }

    if (attrs.link) {
      glues.push(
        new LinkGlue(id, attrs.link)
      )
      attrs.link = null
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
        } else if (isString(val)) {
          template += val
        }
        template += '"'
      }
    })
  }

  template += '>'

  children.forEach((child, i) => {
    let elem: Elem = <Elem>child
    if (child instanceof ObsGetter) {
      elem = h('span', null, child.val())
      elem.glues.push(
        new BindGlue(elem.id, child)
      )
    }

    if (child instanceof Component) {
      elem = child.create()
      readyFns.push(child.ready)
    }

    if (elem instanceof Elem) {
      if (!is.prerender) template += elem.template
      if (!is.server) {
        glues.push(...elem.glues)
        events.push(...elem.events)
        routers.push(...elem.routers)
      }
    } else if (child && !is.prerender) {
      template += child.toString()
    }
  })

  template += '</' + tag + '>'

  return new Elem(
    id, template, glues, events, readyFns, routers
  )
}

function camelToSnake(str: string): string {
  return str.replace(/\.?[A-Z]+/g, (x, y) => {
    return "-" + y.toLowerCase()
  }).replace(/^-/, '')
}
