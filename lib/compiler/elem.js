"use strict";
var component_1 = require('./component');
var elem_routerview_1 = require('./elem-routerview');
var uid_1 = require('./uid');
var attr_1 = require('../glue/attr');
var class_1 = require('../glue/class');
var event_1 = require('../glue/event');
var if_1 = require('../glue/if');
var style_1 = require('../glue/style');
var text_1 = require('../glue/model/text');
var input_number_1 = require('../glue/model/input-number');
var input_checkbox_1 = require('../glue/model/input-checkbox');
var input_radio_1 = require('../glue/model/input-radio');
var select_1 = require('../glue/model/select');
var status_1 = require('../instance/status');
var observable_1 = require('../observer/observable');
function isElem(t) {
    return t && t._isElm;
}
exports.isElem = isElem;
var onRx = /^on/;
function createElem(tag, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (attrs === null)
        attrs = { empty: true };
    if (component_1.isComponentClass(tag)) {
        var c = new tag(attrs, children);
        return c.create();
    }
    if (typeof tag === 'string') {
        var id_1 = attrs.id || uid_1.genId();
        var template_1 = '<' + tag + ' id="' + id_1 + '"';
        var glues_1 = [];
        if (!attrs.empty) {
            if (attrs.if instanceof observable_1.ObsGetter) {
                var ifGlue = new if_1.IfGlue(id_1, attrs.if, function () {
                    return createElem.apply(void 0, [tag, attrs].concat(children));
                });
                var openTag = template_1;
                template_1 = '<script id="if' + id_1 + '"></script>';
                if (attrs.if.val()) {
                    return { _isElm: true, id: id_1, template: template_1, glues: [ifGlue] };
                }
                else {
                    template_1 += openTag;
                    glues_1.push(ifGlue);
                }
                attrs.if = null;
            }
            else if (attrs.if !== undefined && !attrs.if) {
                return { _isElm: true, id: id_1, template: '', glues: [] };
            }
            if (attrs.className !== undefined) {
                template_1 += 'class="';
                if (attrs.class) {
                    attrs.class instanceof observable_1.ObsGetter
                        ? template_1 += attrs.class.val() + ' '
                        : template_1 += attrs.class + ' ';
                    attrs.class = null;
                }
                Object.keys(attrs.className).forEach(function (name) {
                    glues_1.push(new class_1.ClassGlue(id_1, name, attrs.className[name]));
                });
                attrs.className = null;
                template_1 += '"';
            }
            if (attrs.style !== undefined) {
                template_1 += 'style="';
                Object.keys(attrs.style).forEach(function (styleName) {
                    var value = attrs.style[styleName];
                    if (value instanceof observable_1.ObsGetter) {
                        glues_1.push(new style_1.StyleGlue(id_1, styleName, value));
                        value = value.val();
                    }
                    template_1 += camelToSnake(styleName) + ":" + value + ";";
                });
                template_1 += '"';
            }
            var events_1 = {};
            if (attrs.model instanceof observable_1.ObsGetter) {
                var model = attrs.model;
                if (tag === 'input' || tag === 'textarea') {
                    switch (attrs.type) {
                        case 'number':
                            events_1.oninput = true;
                            glues_1.push(new input_number_1.InputNumberGlue(id_1, model));
                            break;
                        case 'checkbox':
                            events_1.onchange = true;
                            glues_1.push(new input_checkbox_1.InputCheckboxGlue(id_1, model));
                            break;
                        case 'radio':
                            events_1.onchange = true;
                            glues_1.push(new input_radio_1.InputRadioGlue(id_1, model));
                            break;
                        default:
                            events_1.oninput = true;
                            glues_1.push(new text_1.TextGlue(id_1, model));
                            break;
                    }
                }
                else if (tag === 'select') {
                    events_1.onchange = true;
                    glues_1.push(new select_1.SelectGlue(id_1, model));
                }
                attrs.model = null;
                attrs.type = null;
            }
            Object.keys(attrs).forEach(function (name) {
                var val = attrs[name];
                if (val === null)
                    return;
                if (onRx.test(name)) {
                    glues_1.push(new event_1.EventGlue(id_1, name, val));
                    events_1.push(name);
                }
                else {
                    template_1 += name + '="';
                    if (attrs[name] instanceof observable_1.ObsGetter) {
                        template_1 += val.val();
                        glues_1.push(new attr_1.AttrGlue(id_1, name, val));
                    }
                    else if (typeof val === 'string') {
                        template_1 += val;
                    }
                    template_1 += '"';
                }
            });
            for (var eventName in events_1) {
                template_1 += eventName + "=\"_EBE('" + id_1 + ":" + eventName + "')\"";
            }
        }
        template_1 += '>';
        children.forEach(function (child, i) {
            if (child instanceof observable_1.ObsGetter) {
                child = createElem('span', { bind: child }, child.val());
            }
            if (child instanceof elem_routerview_1.RouterView) {
                child = child.Elem();
            }
            if (isElem(child)) {
                if (!status_1.default.prerender)
                    template_1 += child.template;
                if (!status_1.default.server)
                    glues_1.push.apply(glues_1, child.glues);
            }
            else if (child && !status_1.default.prerender) {
                template_1 += child.toString();
            }
        });
        template_1 += '</' + tag + '>';
        return {
            id: id_1,
            template: template_1,
            glues: glues_1,
            _isElm: true,
        };
    }
}
exports.createElem = createElem;
function camelToSnake(str) {
    return str.replace(/\.?[A-Z]+/g, function (x, y) {
        return "-" + y.toLowerCase();
    }).replace(/^-/, '');
}
//# sourceMappingURL=elem.js.map