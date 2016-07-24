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
import { ObsObject } from '../observer/observable-object'
import { isBoolean, isString } from '../tools/typecheck'

export interface IHooks {
  beforeInstall?: Function[]
  afterInstall?: Function[]
  beforeDestroy?: Function[]
  afterDestroy?: Function[]
}

export class Elem {
  constructor(
    public id: string,
    public template: string = '',
    public glues: Glue[] = [],
    public events: string[] = [],
    public hooks: IHooks,
    public routers: RouterView[]
  ) {
    if (!this.hooks.beforeInstall) {
      this.hooks.beforeInstall = []
    }
    if (!this.hooks.afterInstall) {
      this.hooks.afterInstall = []
    }
    if (!this.hooks.beforeDestroy) {
      this.hooks.beforeDestroy = []
    }
    if (!this.hooks.afterDestroy) {
      this.hooks.afterDestroy = []
    }
  }
}

export type TChild = (string | ObsObject | Elem | Component)
const onRx = /^on/

export function createElem(
  tag: string,
  attrs: IAllAttribute = {},
  children: TChild[] = []
) {
  if (!attrs && !Object.keys(attrs || {}).length) attrs = { empty: true }

  let id: string
  const attrId = attrs.id
  if (!attrId) {
    id = genId()
  } else if (isString(attrId)) {
    id = attrId
  } else if (attrId instanceof ObsObject) {
    id = attrId.val()
  }
  let template = `<${tag} id="${id}" `
  const glues: Glue[] = []
  const events: string[] = []
  const hooks: IHooks = {
    beforeInstall: [],
    afterInstall: [],
    beforeDestroy: [],
    afterDestroy: []
  }
  const routers: RouterView[] = []

  if (!attrs.empty) {
    if (attrs.if instanceof ObsObject) {
      const ifGlue = new IfGlue(id, attrs.if, () => {
        return createElem(tag, attrs, children)
      })

      const openTag = template
      template = '<script id="if' + id + '"></script>'

      if (!attrs.if.val()) {
        return new Elem(
          id, template, glues, events, {}, routers
        )
      } else {
        template += openTag
        glues.push(ifGlue)
      }
      attrs.if = null
    } else if (attrs.if !== undefined && !attrs.if) {
      return new Elem(
        id, template, glues, events, {}, routers
      )
    }

    if (attrs.className !== undefined) {
      template += 'class="'
      if (attrs.class) {
        const attrClass = attrs.class
        attrClass instanceof ObsObject
          ? template += `${attrClass.val()} `
          : template += `${attrClass} `
        attrs.class = null
      }
      Object.keys(attrs.className).forEach((className) => {
        const cond = attrs.className[name]
        if (cond instanceof ObsObject) {
          if (cond.val()) template = `${className} `
          glues.push(
            new ClassGlue(id, name, attrs.className[name])
          )
        } else if (!!cond) {
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
        if (value instanceof ObsObject) {
          glues.push(
            new StyleGlue(id, styleName, value)
          )
        }
        template += `${camelToSnake(styleName)}:${value.val()};`
      })
      template += '"'
    }

    if (attrs.link) {
      glues.push(
        new LinkGlue(id, attrs.link)
      )
      events.push('onclick')

      if (tag === 'a') attrs.href = attrs.link

      attrs.link = null
    }

    if (attrs.model instanceof ObsObject) {
      const model: ObsObject = attrs.model
      if (tag === 'input' || tag === 'textarea') {
        switch (attrs.type) {
          case 'number':
            template += `value="${model.val() || ''}"`
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
            template += `value="${model.val() || ''}"`
            glues.push(
              new TextGlue(id, model)
            )
            events.push('oninput')
            break
        }
      } else if (tag === 'select') {
        template += `value="${model.val() || ''}"`
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
        if (attrs[name] instanceof ObsObject) {
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
    if (child instanceof ObsObject) {
      elem = createElem('span', null, [child.val() || ''])
      elem.glues.push(
        new BindGlue(elem.id, child)
      )
    }

    if (child instanceof Component) {
      elem = child.create()
      if ((<any>child).beforeInstall instanceof Function) {
        hooks.beforeInstall.push(() => (<any>child).beforeInstall())
      }
      if ((<any>child).afterInstall instanceof Function) {
        hooks.afterInstall.push(() => (<any>child).afterInstall())
      }
      if ((<any>child).beforeDestroy instanceof Function) {
        hooks.beforeDestroy.push(() => (<any>child).beforeDestroy())
      }
      if ((<any>child).afterDestroy instanceof Function) {
        hooks.afterDestroy.push(() => (<any>child).afterDestroy())
      }
    }

    if (elem instanceof Elem) {
      if (!is.prerender) template += elem.template
      if (!is.server) {
        glues.push(...elem.glues)
        events.push(...elem.events)
        routers.push(...elem.routers)
        hooks.afterInstall.push(...elem.hooks.afterInstall)
        hooks.beforeDestroy.push(...elem.hooks.beforeDestroy)
        hooks.afterDestroy.push(...elem.hooks.afterDestroy)
      }
    } else if (child && !is.prerender) {
      template += child.toString()
    }
  })

  template += '</' + tag + '>'

  return new Elem(
    id, template, glues, events, hooks, routers
  )
}

function camelToSnake(str: string): string {
  return str.replace(/\.?[A-Z]+/g, (x, y) => {
    return "-" + y.toLowerCase()
  }).replace(/^-/, '')
}

export function h(
  selector: string,
  p1: (TChild | TChild[]) | IAllAttribute = null,
  p2: TChild | TChild[] = [],
  ...childrenArgs: TChild[]
) {
  // Syntatic sugar
  let tag: string = ''
  let attrs: IAllAttribute = { class: '' }
  let children: any = []
  if (
    typeof p1 === 'string' ||
    p1 instanceof ObsObject ||
    Array.isArray(p1) ||
    p1 instanceof Elem ||
    p1 instanceof Component
  ) {
    children = Array.isArray(p1) ? p1 : [p1]
  } else {
    attrs = p1
    children = Array.isArray(p2) ? p2 : [p2]
  }

  // Selector parse
  selector.split(/(?=\.)|(?=#)/).forEach((str) => {
    switch (str[0]) {
      case '#':
        attrs.id = str.slice(1)
        break

      case '.':
        attrs.class += ' ' + str.slice(1)
        break

      default:
        tag = str
        break
    }
  })

  if (!tag) tag = 'div'

  children.push(...childrenArgs)

  return createElem(tag, attrs, children)
}
