"use strict";
const component_1 = require('./component');
const elem_routerview_1 = require('./elem-routerview');
const uid_1 = require('./uid');
const attr_1 = require('../glue/attr');
const class_1 = require('../glue/class');
const event_1 = require('../glue/event');
const if_1 = require('../glue/if');
const style_1 = require('../glue/style');
const text_1 = require('../glue/model/text');
const input_number_1 = require('../glue/model/input-number');
const input_checkbox_1 = require('../glue/model/input-checkbox');
const input_radio_1 = require('../glue/model/input-radio');
const select_1 = require('../glue/model/select');
const status_1 = require('../instance/status');
const observable_1 = require('../observer/observable');
function isElem(t) {
    return t && t._isElm;
}
exports.isElem = isElem;
const onRx = /^on/;
function createElem(tag, attrs, ...children) {
    if (attrs === null)
        attrs = { empty: true };
    if (component_1.isComponentClass(tag)) {
        const c = new tag(attrs, children);
        return c.create();
    }
    if (typeof tag === 'string') {
        const id = attrs.id || uid_1.genId();
        let template = '<' + tag + ' id="' + id + '"';
        const glues = [];
        if (!attrs.empty) {
            if (attrs.if instanceof observable_1.ObsGetter) {
                const ifGlue = new if_1.IfGlue(id, attrs.if, () => {
                    return createElem(tag, attrs, ...children);
                });
                const openTag = template;
                template = '<script id="if' + id + '"></script>';
                if (attrs.if.val()) {
                    return { _isElm: true, id: id, template: template, glues: [ifGlue] };
                }
                else {
                    template += openTag;
                    glues.push(ifGlue);
                }
                attrs.if = null;
            }
            else if (attrs.if !== undefined && !attrs.if) {
                return { _isElm: true, id: id, template: '', glues: [] };
            }
            if (attrs.className !== undefined) {
                template += 'class="';
                if (attrs.class) {
                    attrs.class instanceof observable_1.ObsGetter
                        ? template += attrs.class.val() + ' '
                        : template += attrs.class + ' ';
                    attrs.class = null;
                }
                Object.keys(attrs.className).forEach((name) => {
                    glues.push(new class_1.ClassGlue(id, name, attrs.className[name]));
                });
                attrs.className = null;
                template += '"';
            }
            if (attrs.style !== undefined) {
                template += 'style="';
                Object.keys(attrs.style).forEach((styleName) => {
                    let value = attrs.style[styleName];
                    if (value instanceof observable_1.ObsGetter) {
                        glues.push(new style_1.StyleGlue(id, styleName, value));
                        value = value.val();
                    }
                    template += `${camelToSnake(styleName)}:${value};`;
                });
                template += '"';
            }
            const events = {};
            if (attrs.model instanceof observable_1.ObsGetter) {
                const model = attrs.model;
                if (tag === 'input' || tag === 'textarea') {
                    switch (attrs.type) {
                        case 'number':
                            events.oninput = true;
                            glues.push(new input_number_1.InputNumberGlue(id, model));
                            break;
                        case 'checkbox':
                            events.onchange = true;
                            glues.push(new input_checkbox_1.InputCheckboxGlue(id, model));
                            break;
                        case 'radio':
                            events.onchange = true;
                            glues.push(new input_radio_1.InputRadioGlue(id, model));
                            break;
                        default:
                            events.oninput = true;
                            glues.push(new text_1.TextGlue(id, model));
                            break;
                    }
                }
                else if (tag === 'select') {
                    events.onchange = true;
                    glues.push(new select_1.SelectGlue(id, model));
                }
                attrs.model = null;
                attrs.type = null;
            }
            Object.keys(attrs).forEach((name) => {
                const val = attrs[name];
                if (val === null)
                    return;
                if (onRx.test(name)) {
                    glues.push(new event_1.EventGlue(id, name, val));
                    events.push(name);
                }
                else {
                    template += name + '="';
                    if (attrs[name] instanceof observable_1.ObsGetter) {
                        template += val.val();
                        glues.push(new attr_1.AttrGlue(id, name, val));
                    }
                    else if (typeof val === 'string') {
                        template += val;
                    }
                    template += '"';
                }
            });
            for (let eventName in events) {
                template += `${eventName}="_EBE('${id}:${eventName}')"`;
            }
        }
        template += '>';
        children.forEach((child, i) => {
            if (child instanceof observable_1.ObsGetter) {
                child = createElem('span', { bind: child }, child.val());
            }
            if (child instanceof elem_routerview_1.RouterView) {
                child = child.init();
            }
            if (isElem(child)) {
                if (!status_1.default.prerender)
                    template += child.template;
                if (!status_1.default.server)
                    glues.push(...child.glues);
            }
            else if (child && !status_1.default.prerender) {
                template += child.toString();
            }
        });
        template += '</' + tag + '>';
        return {
            id: id,
            template: template,
            glues: glues,
            _isElm: true,
        };
    }
}
exports.createElem = createElem;
function camelToSnake(str) {
    return str.replace(/\.?[A-Z]+/g, (x, y) => {
        return "-" + y.toLowerCase();
    }).replace(/^-/, '');
}
//# sourceMappingURL=elem.js.map