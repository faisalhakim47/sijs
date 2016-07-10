(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("example", [], factory);
	else if(typeof exports === 'object')
		exports["example"] = factory();
	else
		root["example"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const common_1 = __webpack_require__(1);
	const browser_1 = __webpack_require__(30);
	const main_1 = __webpack_require__(32);
	exports.Routes = new common_1.Router(main_1.App, [{ path: '/', name: 'default' }, { path: '/page1', name: 'page1' }, { path: '/page2', name: 'page2' }]);
	if (common_1.is.browser) {
	    browser_1.Bootsrap('body', exports.Routes);
	}
	module.exports = exports.Routes;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/// <reference path="../typings/index.d.ts" />
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));
	__export(__webpack_require__(25));
	__export(__webpack_require__(10));
	__export(__webpack_require__(4));
	__export(__webpack_require__(11));
	__export(__webpack_require__(6));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	__export(__webpack_require__(26));
	__export(__webpack_require__(22));
	__export(__webpack_require__(21));
	__export(__webpack_require__(23));
	__export(__webpack_require__(24));
	__export(__webpack_require__(20));
	__export(__webpack_require__(5));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(9));
	__export(__webpack_require__(17));
	__export(__webpack_require__(29));
	__export(__webpack_require__(18));
	//# sourceMappingURL=common.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var elem_1 = __webpack_require__(3);
	var observable_1 = __webpack_require__(17);
	var router_1 = __webpack_require__(10);
	function isComponentClass(t) {
	    return t && t._isComponentClass;
	}
	exports.isComponentClass = isComponentClass;
	var Component = (function () {
	    function Component(attrs, children) {
	        this.attrs = attrs;
	        this.children = children;
	        this.rawState = {};
	        this._isComponent = true;
	        this.params = {};
	        this.query = {};
	        this.state = new observable_1.Observable(this, 'rawState');
	    }
	    Component.prototype.create = function () {
	        this.params = router_1.Router.currentParams;
	        this.query = router_1.Router.currentQuery;
	        var e = this.render(elem_1.createElem, this.state);
	        if (this.created)
	            this.created();
	        return e;
	    };
	    Component._isComponentClass = true;
	    Component.awaitState = [];
	    return Component;
	}());
	exports.Component = Component;
	//# sourceMappingURL=component.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var component_1 = __webpack_require__(2);
	var routerview_1 = __webpack_require__(4);
	var uid_1 = __webpack_require__(11);
	var attr_1 = __webpack_require__(12);
	var bind_1 = __webpack_require__(13);
	var class_1 = __webpack_require__(14);
	var event_1 = __webpack_require__(15);
	var if_1 = __webpack_require__(16);
	var style_1 = __webpack_require__(19);
	var text_1 = __webpack_require__(20);
	var input_number_1 = __webpack_require__(21);
	var input_checkbox_1 = __webpack_require__(22);
	var input_radio_1 = __webpack_require__(23);
	var select_1 = __webpack_require__(24);
	var status_1 = __webpack_require__(8);
	var observable_1 = __webpack_require__(17);
	function isElem(t) {
	    return t && t._isElm;
	}
	exports.isElem = isElem;
	var onRx = /^on/;
	exports.React = {
	    createElement: createElem
	};
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
	                            template_1 += "value=\"" + model.val() + "\"";
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
	                            template_1 += "value=\"" + model.val() + "\"";
	                            events_1.oninput = true;
	                            glues_1.push(new text_1.TextGlue(id_1, model));
	                            break;
	                    }
	                }
	                else if (tag === 'select') {
	                    template_1 += "value=\"" + model.val() + "\"";
	                    events_1.onchange = true;
	                    glues_1.push(new select_1.SelectGlue(id_1, model));
	                }
	                attrs.model = null;
	                attrs.type = null;
	            }
	            if (attrs.bind) {
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
	                template_1 += eventName + "=\"_E('" + id_1 + ":" + eventName + "')\"";
	            }
	        }
	        template_1 += '>';
	        children.forEach(function (child, i) {
	            var elem = child;
	            if (child instanceof observable_1.ObsGetter) {
	                elem = createElem('span', null, child.val());
	                elem.glues.push(new bind_1.BindGlue(elem.id, child));
	            }
	            if (child instanceof routerview_1.RouterView) {
	                elem = child.init();
	            }
	            if (isElem(elem)) {
	                if (!status_1.is.prerender)
	                    template_1 += elem.template;
	                if (!status_1.is.server)
	                    glues_1.push.apply(glues_1, elem.glues);
	                console.log('is server', status_1.is.server);
	            }
	            else if (child && !status_1.is.prerender) {
	                template_1 += child.toString();
	            }
	        });
	        template_1 += '</' + tag + '>';
	        console.trace(2, glues_1);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var elem_1 = __webpack_require__(3);
	var routerview_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(10);
	var paramRx = new RegExp('/:(.*)/', 'g');
	var RouterView = (function () {
	    function RouterView(obj) {
	        var _this = this;
	        this.routes = {};
	        Object.keys(obj).forEach(function (key) {
	            _this.routes[key] = obj[key];
	        });
	    }
	    RouterView.prototype.init = function () {
	        var helperElem = elem_1.createElem('script', null);
	        var e = this.Elem();
	        helperElem.glues.push(new routerview_1.RouterViewGlue(helperElem.id, this, e.glues));
	        (_a = helperElem.glues).push.apply(_a, e.glues);
	        helperElem.template += e.template;
	        return helperElem;
	        var _a;
	    };
	    RouterView.prototype.Elem = function () {
	        var Component = this.routes[router_1.Router.currentRouteName];
	        if (Component) {
	            return (new Component()).create();
	        }
	        else {
	            return elem_1.createElem('script', { dummy: true });
	        }
	    };
	    return RouterView;
	}());
	exports.RouterView = RouterView;
	//# sourceMappingURL=routerview.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var global_event_1 = __webpack_require__(7);
	var RouterViewGlue = (function (_super) {
	    __extends(RouterViewGlue, _super);
	    function RouterViewGlue(id, rv, activeGlues) {
	        _super.call(this);
	        this.id = id;
	        this.rv = rv;
	        this.activeGlues = activeGlues;
	    }
	    RouterViewGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        global_event_1.GlobalEvent.on('route:change', this.routeWatcher);
	    };
	    RouterViewGlue.prototype.destroy = function () {
	        global_event_1.GlobalEvent.off('route:change', this.routeWatcher);
	        this.el = null;
	        glue_1.removeElRef(this.id);
	    };
	    RouterViewGlue.prototype.routeWatcher = function () {
	        var e = this.rv.Elem();
	        if (this.el.nextElementSibling.hasAttribute(this.id)) {
	            glue_1.destroyGlues(this.activeGlues);
	            this.el.parentElement.removeChild(this.el.nextElementSibling);
	        }
	        this.el.insertAdjacentHTML('afterend', e.template.replace('>', " " + this.id + ">"));
	        glue_1.installGlues(e.glues);
	        this.activeGlues = e.glues;
	    };
	    return RouterViewGlue;
	}(glue_1.Glue));
	exports.RouterViewGlue = RouterViewGlue;
	var instances = {};
	//# sourceMappingURL=routerview.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Glue = (function () {
	    function Glue() {
	        this.isInstalled = false;
	    }
	    return Glue;
	}());
	exports.Glue = Glue;
	var elReference = {};
	function getEl(id) {
	    if (!elReference[id]) {
	        elReference[id] = {
	            refCount: 1,
	            el: document.getElementById(id)
	        };
	    }
	    else {
	        elReference[id].refCount++;
	    }
	    return elReference[id];
	}
	exports.getEl = getEl;
	function removeElRef(id) {
	    var ref = elReference[id];
	    if (ref) {
	        ref.refCount--;
	        if (ref.refCount === 0) {
	            elReference[id] = null;
	        }
	    }
	    else {
	        console.warn('removeRef error:', id);
	    }
	}
	exports.removeElRef = removeElRef;
	function installGlues(glues) {
	    console.log('install', glues);
	    glues.forEach(function (glue) { return glue.install(); });
	}
	exports.installGlues = installGlues;
	function destroyGlues(glues) {
	    glues.forEach(function (glue) { return glue.destroy(); });
	}
	exports.destroyGlues = destroyGlues;
	//# sourceMappingURL=glue.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var status_1 = __webpack_require__(8);
	var emitter_1 = __webpack_require__(9);
	exports.GlobalEvent = new emitter_1.Emitter();
	if (status_1.is.browser) {
	    var addEvent = function (name, eventFn) {
	        window.addEventListener(name, eventFn);
	    };
	    addEvent('popstate', function (e) {
	        exports.GlobalEvent.emit('browser:popstate', e);
	    });
	    addEvent('online', function (e) {
	        exports.GlobalEvent.emit('browser:online', e);
	    });
	    addEvent('offline', function (e) {
	        exports.GlobalEvent.emit('browser:offline', e);
	    });
	}
	//# sourceMappingURL=global-event.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var test = {};
	try {
	    test['bowser'] = !!window && !!document;
	    test['server'] = !!global;
	}
	catch (e) { }
	var browser = !!test['bowser'];
	var server = test['server'] && !browser;
	var prerender = browser && window['_prerender'];
	exports.is = {
	    browser: browser,
	    server: server,
	    prerender: prerender
	};
	//# sourceMappingURL=status.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var Emitter = (function () {
	    function Emitter() {
	        this.watchers = {};
	    }
	    Emitter.prototype.on = function (name, watcher) {
	        var watchers = this.watchers[name]
	            ? this.watchers[name]
	            : (this.watchers[name] = []);
	        watcher.wi = watchers.push(watcher) - 1;
	    };
	    Emitter.prototype.off = function (name, watcher) {
	        if (!watcher) {
	            console.trace(name, watcher);
	        }
	        var watchers = this.watchers[name];
	        if (!Array.isArray(watchers))
	            return;
	        if (typeof watcher.wi === 'number') {
	            watchers.splice(watcher.wi, 1);
	        }
	        else {
	            console.warn(watcher, 'does not contain watcher index (wi)');
	        }
	    };
	    Emitter.prototype.emit = function (name) {
	        var data = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            data[_i - 1] = arguments[_i];
	        }
	        var watchers = this.watchers[name];
	        if (!watchers)
	            return;
	        var l = watchers.length;
	        while (l--) {
	            watchers[l].apply(watchers, data);
	        }
	    };
	    return Emitter;
	}());
	exports.Emitter = Emitter;
	//# sourceMappingURL=emitter.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var global_event_1 = __webpack_require__(7);
	var paramRx = new RegExp('/(:.*)/', 'g');
	var Router = (function () {
	    function Router(Component, routes) {
	        this.Component = Component;
	        routes.forEach(function (_a) {
	            var path = _a.path, name = _a.name;
	            var params = path.match(paramRx);
	            if (params === null)
	                params = [];
	            params = params.map(function (param) { return param.slice(1); });
	            params.shift();
	            Router.routes.push({
	                path: path,
	                name: name,
	                params: params,
	                rx: new RegExp(path.replace(paramRx, '/(.*)/'))
	            });
	        });
	    }
	    Router.generateRoute = function (path) {
	        if (!path)
	            path = Router.path;
	        var _loop_1 = function(i) {
	            var route = Router.routes[i];
	            if (route.rx.test(path)) {
	                Router.currentRouteName = route.name;
	                var paramsArr_1 = path.match(route.rx);
	                var paramsObj_1 = null;
	                if (route.params) {
	                    paramsObj_1 = {};
	                    route.params.forEach(function (name, i) {
	                        paramsObj_1[name] = paramsArr_1[i];
	                    });
	                    Router.currentParams = paramsObj_1;
	                }
	                else {
	                    Router.currentParams = paramsArr_1;
	                }
	                i = 0;
	            }
	            out_i_1 = i;
	        };
	        var out_i_1;
	        for (var i = Router.routes.length; i--;) {
	            _loop_1(i);
	            i = out_i_1;
	        }
	        global_event_1.GlobalEvent.emit('route:change', Router); // Global Event
	    };
	    Router.prototype.generateElem = function (path) {
	        Router.generateRoute(path);
	        return (new this.Component()).create();
	    };
	    Router.routes = [];
	    return Router;
	}());
	exports.Router = Router;
	//# sourceMappingURL=router.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var uid = 0;
	function getId() {
	    return uid;
	}
	exports.getId = getId;
	function genId() {
	    return '_' + uid++;
	}
	exports.genId = genId;
	//# sourceMappingURL=uid.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var AttrGlue = (function (_super) {
	    __extends(AttrGlue, _super);
	    function AttrGlue(id, attrName, attrValue) {
	        _super.call(this);
	        this.id = id;
	        this.attrName = attrName;
	        this.attrValue = attrValue;
	    }
	    AttrGlue.prototype.attrWatcher = function (val) {
	        this.el.setAttribute(this.attrName, val);
	    };
	    AttrGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.attrValue.watch(this.attrWatcher);
	        this.isInstalled = true;
	    };
	    AttrGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.attrValue.unwatch(this.attrWatcher);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
	        }
	    };
	    return AttrGlue;
	}(glue_1.Glue));
	exports.AttrGlue = AttrGlue;
	//# sourceMappingURL=attr.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var BindGlue = (function (_super) {
	    __extends(BindGlue, _super);
	    function BindGlue(id, value) {
	        _super.call(this);
	        this.id = id;
	        this.value = value;
	        this.bindWatcher = this.toViewBind.bind(this);
	    }
	    BindGlue.prototype.install = function () {
	        this.el = glue_1.getEl(this.id);
	        this.value.watch(this.bindWatcher);
	        window['test'] = this.value;
	        this.isInstalled = true;
	    };
	    BindGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.value.unwatch(this.bindWatcher);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	        }
	    };
	    BindGlue.prototype.toViewBind = function (val) {
	        this.el.innerText = val;
	    };
	    return BindGlue;
	}(glue_1.Glue));
	exports.BindGlue = BindGlue;
	//# sourceMappingURL=bind.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var ClassGlue = (function (_super) {
	    __extends(ClassGlue, _super);
	    function ClassGlue(id, className, cond) {
	        _super.call(this);
	        this.id = id;
	        this.className = className;
	        this.cond = cond;
	    }
	    ClassGlue.prototype.install = function () {
	        this.el = glue_1.getEl(this.id);
	        this.cond.watch(this.classNameWatcher);
	        this.isInstalled = true;
	    };
	    ClassGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.cond.unwatch(this.classNameWatcher);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	        }
	    };
	    ClassGlue.prototype.classNameWatcher = function (val) {
	        var isContain = this.el.classList.contains(this.className);
	        if (val && !isContain) {
	            this.el.classList.add(this.className);
	        }
	        else if (!val && isContain) {
	            this.el.classList.remove(this.className);
	        }
	    };
	    return ClassGlue;
	}(glue_1.Glue));
	exports.ClassGlue = ClassGlue;
	//# sourceMappingURL=class.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var status_1 = __webpack_require__(8);
	var emitter_1 = __webpack_require__(9);
	exports.eventBus = new emitter_1.Emitter();
	if (status_1.is.browser) {
	    window['_E'] = function (code) {
	        console.log('emit', code, exports.eventBus.watchers[code]);
	        exports.eventBus.emit(code);
	    };
	}
	function watchEvent(id, name, eventFn) {
	    return exports.eventBus.on(id + ':' + name, eventFn);
	}
	exports.watchEvent = watchEvent;
	function unwatchEvent(id, name, eventFn) {
	    return exports.eventBus.off(id + ':' + name, eventFn);
	}
	exports.unwatchEvent = unwatchEvent;
	var EventGlue = (function (_super) {
	    __extends(EventGlue, _super);
	    function EventGlue(id, name, eventFn) {
	        _super.call(this);
	        this.id = id;
	        this.name = name;
	        this.eventFn = eventFn;
	    }
	    EventGlue.prototype.install = function () {
	        watchEvent(this.id, this.name, this.eventFn);
	    };
	    EventGlue.prototype.destroy = function () {
	        unwatchEvent(this.id, this.name, this.eventFn);
	    };
	    EventGlue.context = null;
	    return EventGlue;
	}(glue_1.Glue));
	exports.EventGlue = EventGlue;
	//# sourceMappingURL=event.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var observable_1 = __webpack_require__(17);
	var IfGlue = (function (_super) {
	    __extends(IfGlue, _super);
	    function IfGlue(id, cond, elem) {
	        _super.call(this);
	        this.id = id;
	        this.cond = cond;
	        this.elem = elem;
	    }
	    IfGlue.prototype.ifWatcher = function (cond) {
	        if (cond && !this.isExist()) {
	            var e = this.elem();
	            this.helperEl.insertAdjacentHTML('afterend', e.template);
	            glue_1.installGlues(e.glues);
	            this.activeGlues = e.glues;
	        }
	        else if (!cond && this.isExist()) {
	            this.helperEl.parentElement.removeChild(this.helperEl.nextElementSibling);
	            glue_1.destroyGlues(this.activeGlues);
	            this.activeGlues = [];
	        }
	    };
	    IfGlue.prototype.isExist = function () {
	        return this.helperEl.nextElementSibling.id === this.id;
	    };
	    IfGlue.prototype.install = function () {
	        var cond = this.cond;
	        this.helperEl = document.getElementById('if' + this.id);
	        if (cond instanceof observable_1.ObsGetter) {
	            cond.watch(this.ifWatcher);
	        }
	        this.isInstalled = true;
	    };
	    IfGlue.prototype.destroy = function () {
	        if (!this.isInstalled)
	            return;
	        var cond = this.cond;
	        if (cond instanceof observable_1.ObsGetter) {
	            cond.unwatch(this.ifWatcher);
	        }
	        this.helperEl = null;
	    };
	    return IfGlue;
	}(glue_1.Glue));
	exports.IfGlue = IfGlue;
	//# sourceMappingURL=if.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var emitter_1 = __webpack_require__(9);
	var object_1 = __webpack_require__(18);
	var Observable = (function () {
	    function Observable(baseData, basePath, id) {
	        if (baseData === void 0) { baseData = { _dummy: null }; }
	        if (basePath === void 0) { basePath = '_dummy'; }
	        this.baseData = baseData;
	        this.basePath = basePath;
	        this.id = id;
	        this.childWatcher = {};
	        this.childArray = {};
	        this.childNum = {};
	        this.rawData = object_1.get(baseData, basePath);
	        if (this.rawData.undefined) {
	            throw new Error('cannot create on undefined path');
	        }
	        if (!id) {
	            this.id = genId();
	        }
	        this.EE = new emitter_1.Emitter();
	    }
	    Observable.prototype.get = function (path) {
	        path = path;
	        return new ObsGetter(this.id, this.rawData, path, this.EE, this.get, this.childWatcher);
	    };
	    Observable.prototype.set = function (path, value) {
	        if (!path) {
	            object_1.set(this.baseData, this.basePath, value);
	            this.rawData = object_1.get(this.baseData, this.basePath);
	            return;
	        }
	        if (object_1.get(this.rawData, path) === value)
	            return;
	        if (object_1.set(this.rawData, path, value)) {
	            this.EE.emit(path, value);
	        }
	    };
	    Observable.prototype.filter = function (path, filterFn) {
	        var obs = this.get(path);
	        var val = obs.val;
	        if (filterFn instanceof String) {
	            obs.val = function () { return exports.Filters[filterFn](val()); };
	            return obs;
	        }
	        else if (filterFn instanceof Function) {
	            obs.val = function () { return filterFn(val()); };
	            return obs;
	        }
	    };
	    Observable.prototype.watch = function (watcher) {
	        var _this = this;
	        this.EE.on(null, watcher);
	        var i = 0;
	        Object.keys(this.EE.watchers).forEach(function (listedPath) {
	            if (listedPath.indexOf(null) === 0 && null !== listedPath) {
	                var name_1 = listedPath + null + i++;
	                _this.childWatcher[name_1] = function () {
	                    _this.EE.emit(listedPath, object_1.get(_this.rawData, listedPath));
	                };
	                _this.EE.on(null, _this.childWatcher[name_1]);
	            }
	        });
	    };
	    Observable.prototype.unwatch = function (watcher) {
	        var _this = this;
	        this.EE.off(null, watcher);
	        var i = 0;
	        Object.keys(this.EE.watchers).forEach(function (listedPath) {
	            if (listedPath.indexOf(null) === 0 && 'null' !== listedPath) {
	                _this.EE.off(null, _this.childWatcher[listedPath + null + i++]);
	            }
	        });
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	var ObsGetter = (function () {
	    function ObsGetter(id, rawData, path, EE, getter, childWatcher) {
	        this.id = id;
	        this.rawData = rawData;
	        this.path = path;
	        this.EE = EE;
	        this.getter = getter;
	        this.childWatcher = childWatcher;
	    }
	    ObsGetter.prototype.get = function (childPath) {
	        return this.getter(this.path + childPath);
	    };
	    ObsGetter.prototype.raw = function () {
	        var ret = object_1.get(this.rawData, this.path);
	        if (ret.undefined)
	            ret = undefined;
	        return ret;
	    };
	    ObsGetter.prototype.val = function () {
	        return Object.freeze(this.raw());
	    };
	    ObsGetter.prototype.set = function (value) {
	        console.trace('set test', this);
	        if (object_1.get(this.rawData, this.path) === value)
	            return;
	        console.log('set pass', object_1.get(this.rawData, this.path), value);
	        if (object_1.set(this.rawData, this.path, value)) {
	            console.log('set ok', object_1.get(this.rawData, this.path), 'emit...');
	            this.EE.emit(this.path, value);
	        }
	        else {
	            console.log('cannot set', this.rawData, 'on path', this.path, 'with', value);
	        }
	    };
	    ObsGetter.prototype.watch = function (watcher) {
	        var _this = this;
	        this.EE.on(this.path, watcher);
	        var i = 0;
	        Object.keys(this.EE.watchers).forEach(function (listedPath) {
	            if (listedPath.indexOf(_this.path) === 0 && _this.path !== listedPath) {
	                var name_2 = listedPath + _this.path + i++;
	                _this.childWatcher[name_2] = function () {
	                    _this.EE.emit(listedPath, object_1.get(_this.rawData, listedPath));
	                };
	                _this.EE.on(_this.path, _this.childWatcher[name_2]);
	            }
	        });
	    };
	    ObsGetter.prototype.unwatch = function (watcher) {
	        var _this = this;
	        this.EE.off(this.path, watcher);
	        var i = 0;
	        Object.keys(this.EE.watchers).forEach(function (listedPath) {
	            if (listedPath.indexOf(_this.path) === 0 && _this.path !== listedPath) {
	                _this.EE.off(_this.path, _this.childWatcher[listedPath + _this.path + i++]);
	            }
	        });
	    };
	    return ObsGetter;
	}());
	exports.ObsGetter = ObsGetter;
	exports.Filters = {};
	function registerFilter(name, filterFn) {
	    exports.Filters[name] = filterFn;
	}
	exports.registerFilter = registerFilter;
	var idCound = 0;
	function genId() {
	    return 'Obs_' + idCound++;
	}
	//# sourceMappingURL=observable.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	function get(obj, path) {
	    if (!path)
	        return;
	    var parsedPath = pathParse(path);
	    var l = parsedPath.length - 1;
	    for (var i = 0; i < l; i++) {
	        obj = obj[parsedPath[i]];
	        if (!obj) {
	            console.warn('can\'t get object', obj, 'on path', path);
	            return { undefined: true };
	        }
	    }
	    return obj[parsedPath[l]];
	}
	exports.get = get;
	function set(obj, path, value) {
	    if (!path)
	        return;
	    var parsedPath = pathParse(path);
	    var l = parsedPath.length - 1;
	    for (var i = 0; i < l; i++) {
	        obj = obj[parsedPath[i]];
	        if (!obj) {
	            console.warn('can\'t get object', obj, 'on path', path);
	            return false;
	        }
	    }
	    obj[parsedPath[l]] = value;
	    return true;
	}
	exports.set = set;
	var pathRx = /\[|\]\./g;
	function pathParse(path) {
	    return path.replace(pathRx, '.').split('.');
	}
	exports.pathParse = pathParse;
	/**
	 * Object.defineProperty syntatic sugar
	 *
	 * @param {*} Obj
	 * @param {string} propName
	 * @param {{ get: function, set: function }|*} value
	 * @param {boolean} isEnum
	 * @param {boolean} isConf
	 */
	function def(obj, propName, value, isEnum, isConf) {
	    if (typeof value.get === 'function' ||
	        typeof value.set === 'function') {
	        Object.defineProperty(obj, propName, {
	            get: value.get,
	            set: value.set,
	            enumerable: isEnum,
	            configurable: isConf
	        });
	    }
	    else {
	        Object.defineProperty(obj, propName, {
	            value: value,
	            enumerable: isEnum,
	            configurable: isConf
	        });
	    }
	}
	exports.def = def;
	/*
	**  ref: https://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects/5878101#5878101
	**  Function to test if an object is a plain object, i.e. is constructed
	**  by the built-in Object constructor and inherits directly from Object.prototype
	**  or null. Some built-in objects pass the test, e.g. Math which is a plain object
	**  and some host or exotic objects may pass also.
	**
	**  @param {} obj - value to test
	**  @returns {Boolean} true if passes tests, false otherwise
	*/
	function isPlainObject(obj) {
	    // Basic check for Type object that's not null
	    if (typeof obj === 'object' && obj !== null) {
	        // If Object.getPrototypeOf supported, use it
	        if (typeof Object.getPrototypeOf === 'function') {
	            var proto = Object.getPrototypeOf(obj);
	            return proto === Object.prototype || proto === null;
	        }
	        // Otherwise, use internal class
	        // This should be reliable as if getPrototypeOf not supported, is pre-ES5
	        return Object.prototype.toString.call(obj) === '[object Object]';
	    }
	    // Not an object
	    return false;
	}
	exports.isPlainObject = isPlainObject;
	//# sourceMappingURL=object.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var StyleGlue = (function (_super) {
	    __extends(StyleGlue, _super);
	    function StyleGlue(id, name, value) {
	        _super.call(this);
	        this.id = id;
	        this.name = name;
	        this.value = value;
	    }
	    StyleGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not been inserted yet.', this);
	        }
	        this.value.watch(this.styleWatcher);
	        this.isInstalled = true;
	    };
	    StyleGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.value.unwatch(this.styleWatcher);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue style #', this.id, 'has not been installed yet.', this);
	        }
	    };
	    StyleGlue.prototype.styleWatcher = function (val) {
	        this.el.style[this.name] = val;
	    };
	    return StyleGlue;
	}(glue_1.Glue));
	exports.StyleGlue = StyleGlue;
	//# sourceMappingURL=style.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var event_1 = __webpack_require__(15);
	var TextGlue = (function (_super) {
	    __extends(TextGlue, _super);
	    function TextGlue(id, model) {
	        _super.call(this);
	        this.id = id;
	        this.model = model;
	        this.viewWatcher = this.toModel.bind(this);
	        this.modelWatcher = this.toModel.bind(this);
	    }
	    TextGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.model.watch(this.viewWatcher);
	        event_1.watchEvent(this.id, 'oninput', this.modelWatcher);
	        this.isInstalled = true;
	    };
	    TextGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.model.unwatch(this.viewWatcher);
	            event_1.unwatchEvent(this.id, 'oninput', this.modelWatcher);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
	        }
	    };
	    TextGlue.prototype.toView = function (val) {
	        this.el.value = val;
	    };
	    TextGlue.prototype.toModel = function () {
	        this.model.set(this.el.value);
	    };
	    return TextGlue;
	}(glue_1.Glue));
	exports.TextGlue = TextGlue;
	//# sourceMappingURL=text.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var event_1 = __webpack_require__(15);
	var InputNumberGlue = (function (_super) {
	    __extends(InputNumberGlue, _super);
	    function InputNumberGlue(id, model) {
	        _super.call(this);
	        this.id = id;
	        this.model = model;
	    }
	    InputNumberGlue.prototype.toView = function (val) {
	        this.el.value = val;
	    };
	    InputNumberGlue.prototype.toModel = function () {
	        this.model.set(parseFloat(this.el.value));
	    };
	    InputNumberGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.model.watch(this.toView);
	        event_1.watchEvent(this.id, 'oninput', this.toModel);
	        this.isInstalled = true;
	    };
	    InputNumberGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.model.unwatch(this.toView);
	            event_1.unwatchEvent(this.id, 'oninput', this.toModel);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputNumber #', this.id, 'has not installed yet.', this);
	        }
	    };
	    return InputNumberGlue;
	}(glue_1.Glue));
	exports.InputNumberGlue = InputNumberGlue;
	//# sourceMappingURL=input-number.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var event_1 = __webpack_require__(15);
	var InputCheckboxGlue = (function (_super) {
	    __extends(InputCheckboxGlue, _super);
	    function InputCheckboxGlue(id, model) {
	        _super.call(this);
	        this.id = id;
	        this.model = model;
	    }
	    InputCheckboxGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        event_1.watchEvent(this.id, 'oninput', this.toModel);
	        this.isInstalled = true;
	    };
	    InputCheckboxGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.model.unwatch(this.toView);
	            event_1.unwatchEvent(this.id, 'oninput', this.toModel);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputCheckbox #', this.id, 'has not installed yet.', this);
	        }
	    };
	    InputCheckboxGlue.prototype.toView = function (val) {
	        if (val.indexOf(this.el.value) === -1) {
	            this.el.checked = false;
	        }
	        else {
	            this.el.checked = true;
	        }
	    };
	    InputCheckboxGlue.prototype.toModel = function () {
	        this.model.set(this.el.value);
	    };
	    return InputCheckboxGlue;
	}(glue_1.Glue));
	exports.InputCheckboxGlue = InputCheckboxGlue;
	//# sourceMappingURL=input-checkbox.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var event_1 = __webpack_require__(15);
	var InputRadioGlue = (function (_super) {
	    __extends(InputRadioGlue, _super);
	    function InputRadioGlue(id, model) {
	        _super.call(this);
	        this.id = id;
	        this.model = model;
	    }
	    InputRadioGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.radioName = this.model.path + this.model.val();
	        this.el.name = this.radioName;
	        event_1.watchEvent(this.id, 'onclick', this.toModel);
	        this.isInstalled = true;
	    };
	    InputRadioGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.model.unwatch(this.toView);
	            event_1.unwatchEvent(this.id, 'onclick', this.toModel);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputRadio #', this.id, 'has not installed yet.', this);
	        }
	    };
	    InputRadioGlue.prototype.toView = function (val) {
	        if (this.value === val) {
	            this.el.click();
	        }
	    };
	    InputRadioGlue.prototype.toModel = function () {
	        this.model.set(this.el.value);
	    };
	    return InputRadioGlue;
	}(glue_1.Glue));
	exports.InputRadioGlue = InputRadioGlue;
	//# sourceMappingURL=input-radio.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var event_1 = __webpack_require__(15);
	var SelectGlue = (function (_super) {
	    __extends(SelectGlue, _super);
	    function SelectGlue(id, model) {
	        _super.call(this);
	        this.id = id;
	        this.model = model;
	    }
	    SelectGlue.prototype.toView = function (val) {
	        this.el.value = val;
	    };
	    SelectGlue.prototype.toModel = function () {
	        this.model.set(this.el.value);
	    };
	    SelectGlue.prototype.install = function () {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Select element #', this.id, 'has not inserted yet.', this);
	        }
	        this.el.value = this.model.val();
	        this.model.watch(this.toView);
	        event_1.watchEvent(this.id, 'onchange', this.toModel);
	        this.isInstalled = true;
	    };
	    SelectGlue.prototype.destroy = function () {
	        if (this.isInstalled) {
	            this.model.unwatch(this.toView);
	            event_1.unwatchEvent(this.id, 'onchange', this.toModel);
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue select #', this.id, 'has not installed yet.', this);
	        }
	    };
	    return SelectGlue;
	}(glue_1.Glue));
	exports.SelectGlue = SelectGlue;
	//# sourceMappingURL=select.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var uid_1 = __webpack_require__(11);
	var list_1 = __webpack_require__(26);
	var observable_1 = __webpack_require__(17);
	function isListFn(t) {
	    return t && typeof t === 'function';
	}
	function eList(items, listFn, opts) {
	    if (!opts)
	        opts = { limit: 0, skip: 0 };
	    var skip = opts.skip instanceof observable_1.ObsGetter
	        ? opts.skip.val()
	        : (opts.skip || 0);
	    var limit = opts.limit instanceof observable_1.ObsGetter
	        ? opts.limit.val()
	        : (opts.limit || 0);
	    var id = uid_1.genId();
	    var glues = [];
	    var listGlue = new list_1.ListGlue(id, items, listFn, opts);
	    var template = '<script id="' + id + '"></script>';
	    var length = items.length(), i;
	    if (length <= skip + limit) {
	        i = length - skip;
	        if (i < 0)
	            i = 0;
	    }
	    else if (limit === 0) {
	        i = length - skip;
	    }
	    else {
	        i = limit;
	    }
	    if (skip > length)
	        skip = length;
	    else if (skip < 0)
	        skip = 0;
	    var _loop_1 = function(index) {
	        var currentItem = listGlue.currentItems[index] = {
	            index: index,
	            item: items.get(skip + index)
	        };
	        var e = listFn(currentItem.item, function () { return currentItem.index; });
	        template += e.template.replace('>', ' ' + id + '>');
	        glues.push.apply(glues, (currentItem['glues'] = e.glues));
	    };
	    for (var index = 0; index < i; index++) {
	        _loop_1(index);
	    }
	    glues.unshift(listGlue);
	    return { id: id, template: template, glues: glues, _isElm: true };
	}
	exports.eList = eList;
	//# sourceMappingURL=elem-list.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var glue_1 = __webpack_require__(6);
	var observable_1 = __webpack_require__(17);
	var ListGlue = (function (_super) {
	    __extends(ListGlue, _super);
	    function ListGlue(helperId, items, listFn, opts) {
	        _super.call(this);
	        this.helperId = helperId;
	        this.items = items;
	        this.listFn = listFn;
	        this.opts = opts;
	        this.currentItems = [];
	        var skip = opts.skip, limit = opts.limit;
	        if (skip instanceof observable_1.ObsGetter) {
	            this.skip = skip.val();
	            skip.watch(this.skipWatcher);
	        }
	        if (limit instanceof observable_1.ObsGetter) {
	            this.limit = limit.val();
	            limit.watch(this.limitWatcher);
	        }
	    }
	    ListGlue.prototype.install = function () {
	        this.helperEl = document.getElementById(this.helperId);
	        var helperParentEl = this.helperEl.parentElement;
	        var elIndex = Array.prototype.indexOf.call(helperParentEl.children, this.helperEl);
	        this.currentItems = this.currentItems.map(function (oldItem, index) {
	            oldItem['el'] = helperParentEl.children[elIndex + index + 1];
	            return oldItem;
	        });
	        this.items.watch(this.listGenerator);
	        this.isInstalled = true;
	    };
	    ListGlue.prototype.destroy = function () {
	        var _a = this.opts, skip = _a.skip, limit = _a.limit;
	        if (skip instanceof observable_1.ObsGetter) {
	            skip.unwatch(this.skipWatcher);
	        }
	        if (limit instanceof observable_1.ObsGetter) {
	            limit.unwatch(this.limitWatcher);
	        }
	        if (!this.isInstalled)
	            return;
	        this.items.unwatch(this.listGenerator);
	        this.helperEl = null;
	    };
	    ListGlue.prototype.skipWatcher = function (val) {
	        this.skip = val;
	    };
	    ListGlue.prototype.limitWatcher = function (val) {
	        this.limit = val;
	    };
	    ListGlue.prototype.listGenerator = function () {
	        var _a = this, helperId = _a.helperId, helperEl = _a.helperEl, items = _a.items, listFn = _a.listFn, skip = _a.skip, limit = _a.limit, currentItems = _a.currentItems;
	        var newItems = [];
	        var length = items.length();
	        var i;
	        if (length <= skip + limit) {
	            i = length - skip;
	            if (i < 0)
	                i = 0;
	        }
	        else if (limit === 0) {
	            i = length - skip;
	        }
	        else {
	            i = limit;
	        }
	        var skipIndex = skip;
	        if (skip > length)
	            skipIndex = length;
	        else if (skip < 0)
	            skipIndex = 0;
	        var _loop_1 = function() {
	            var index = skipIndex + i;
	            var item = items.get(index);
	            var indexItem = -1;
	            for (var i_1 = 0, l = currentItems.length; i_1 < l; i_1++) {
	                if (currentItems[i_1].item === item) {
	                    indexItem = i_1;
	                    break;
	                }
	            }
	            if (indexItem !== -1) {
	                helperEl.insertAdjacentElement('afterend', currentItems[indexItem].el);
	                var currentItem = currentItems.splice(indexItem, 1)[0];
	                currentItem.index = index;
	                currentItems.push(currentItem);
	            }
	            else {
	                var itemParam_1 = { item: item, index: index };
	                var e = listFn(itemParam_1.item, function () { return itemParam_1.index; });
	                helperEl.insertAdjacentHTML('afterend', e.template.replace('>', ' ' + helperId + '>'));
	                glue_1.installGlues(itemParam_1['glues'] = e.glues);
	                itemParam_1['el'] = helperEl.nextSibling;
	                newItems.push(itemParam_1);
	            }
	        };
	        while (i--) {
	            _loop_1();
	        }
	        currentItems.forEach(function (oldItem) {
	            helperEl.parentElement.removeChild(oldItem.el);
	            glue_1.destroyGlues(oldItem.glues);
	        });
	        this.currentItems = newItems;
	        newItems = [];
	    };
	    return ListGlue;
	}(glue_1.Glue));
	exports.ListGlue = ListGlue;
	//# sourceMappingURL=list.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dependency_1 = __webpack_require__(28);
	var observable_1 = __webpack_require__(17);
	function compute(deps, computeFn) {
	    var obs = new observable_1.Observable();
	    dependency_1.dependsOn(deps, function () {
	        var datas = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            datas[_i - 0] = arguments[_i];
	        }
	        obs.set(null, computeFn.apply(void 0, datas));
	    });
	    return obs;
	}
	exports.compute = compute;
	//# sourceMappingURL=compute.js.map

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	function dependsOn(deps, fn) {
	    var Emit = function () {
	        fn.apply(void 0, deps.map(function (dep) { return dep.val(); }));
	    };
	    Emit();
	    deps.forEach(function (dep) {
	        dep.watch(Emit);
	    });
	    return function () {
	        deps.forEach(function (dep) {
	            dep.unwatch(Emit);
	        });
	    };
	}
	exports.dependsOn = dependsOn;
	//# sourceMappingURL=dependency.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var emitter_1 = __webpack_require__(9);
	var observable_1 = __webpack_require__(17);
	var compute_1 = __webpack_require__(27);
	var object_1 = __webpack_require__(18);
	var ObsArray = (function () {
	    function ObsArray(baseData, basePath) {
	        if (baseData === void 0) { baseData = { _dummy: [] }; }
	        if (basePath === void 0) { basePath = '_dummy'; }
	        this.baseData = baseData;
	        this.basePath = basePath;
	        var rawItems = object_1.get(baseData, basePath);
	        if (rawItems.undefined) {
	            throw new Error('cannot create on undefined path');
	        }
	        else if (!Array.isArray(this.obsItems)) {
	            throw new Error('cannot create on non-Array path');
	        }
	        this.rawItems = rawItems;
	        this.obsItems = this.rawItems.map(function (item, i) {
	            return new observable_1.Observable(rawItems, i.toString());
	        });
	        this.EE = new emitter_1.Emitter();
	    }
	    ObsArray.prototype.length = function () {
	        return this.obsItems.length;
	    };
	    ObsArray.prototype.get = function (index) {
	        return this.obsItems[index];
	    };
	    ObsArray.prototype.getAll = function () {
	        return this.obsItems;
	    };
	    ObsArray.prototype.val = function () {
	        return this.obsItems;
	    };
	    ObsArray.prototype.set = function (index, value) {
	        this.obsItems[index].set(null, value);
	    };
	    ObsArray.prototype.pop = function () {
	        var val = this.rawItems.pop();
	        this.obsItems.pop();
	        this.EE.emit('remove', {
	            index: this.obsItems.length
	        });
	        this.EE.emit('change');
	        return val;
	    };
	    ObsArray.prototype.push = function (val) {
	        var r = this.rawItems.push(val);
	        var index = this.rawItems.length - 1;
	        val = new observable_1.Observable(this.rawItems, index.toString());
	        this.obsItems.push(val);
	        this.EE.emit('add', { index: index, val: val });
	        this.EE.emit('change');
	        return r;
	    };
	    ObsArray.prototype.shift = function () {
	        var val = this.rawItems.shift();
	        this.obsItems.shift();
	        this.EE.emit('remove', { index: 0 });
	        this.EE.emit('change');
	        return val;
	    };
	    ObsArray.prototype.unshift = function (val) {
	        var r = this.rawItems.unshift(val);
	        val = new observable_1.Observable(this.rawItems, '0');
	        this.obsItems.unshift(val);
	        this.EE.emit('add', { index: 0, val: val });
	        this.EE.emit('change');
	        return r;
	    };
	    ObsArray.prototype.splice = function (start, delCount) {
	        var _this = this;
	        var vals = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            vals[_i - 2] = arguments[_i];
	        }
	        var d = (_a = this.rawItems).splice.apply(_a, [start, delCount].concat(vals));
	        for (var i = delCount; i--;) {
	            this.EE.emit('remove', { index: start + i });
	        }
	        (_b = this.obsItems).splice.apply(_b, [start, delCount].concat(vals.map(function (val, i) {
	            var index = start + i;
	            val = new observable_1.Observable(_this.rawItems, index.toString());
	            _this.EE.emit('add', { index: index, val: val });
	            return val;
	        })));
	        this.EE.emit('change');
	        return d;
	        var _a, _b;
	    };
	    ObsArray.prototype.filter = function (deps, filterFn) {
	        var _this = this;
	        deps.push(this);
	        var obs = compute_1.compute(deps, function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            return _this.obsItems.filter(function (item, i) { return filterFn.apply(void 0, [item, i].concat(data)); });
	        });
	        return obs;
	    };
	    ObsArray.prototype.watch = function (p1, p2) {
	        if (typeof p1 === 'string') {
	            this.EE.on(p1, p2);
	        }
	        else {
	            this.EE.on('change', p1);
	        }
	    };
	    ObsArray.prototype.unwatch = function (p1, p2) {
	        if (typeof p1 === 'string') {
	            this.EE.off(p1, p2);
	        }
	        else {
	            this.EE.off('change', p1);
	        }
	    };
	    return ObsArray;
	}());
	exports.ObsArray = ObsArray;
	//# sourceMappingURL=observable-array.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts" />
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(31));
	//# sourceMappingURL=browser.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var status_1 = __webpack_require__(8);
	var glue_1 = __webpack_require__(6);
	function Bootsrap(selector, RouterInstance) {
	    if (status_1.is.browser) {
	        document.addEventListener('DOMContentLoaded', function () {
	            var el = document.querySelector(selector);
	            var _a = RouterInstance.generateElem(window.location.pathname), template = _a.template, glues = _a.glues;
	            if (!status_1.is.prerender)
	                el.outerHTML = template;
	            console.log(!status_1.is.prerender, template, glues);
	            glue_1.installGlues(glues);
	            status_1.is.prerender = false;
	        });
	    }
	    else {
	        console.error('Cannot Bootsrap(), this is not browser.');
	    }
	}
	exports.Bootsrap = Bootsrap;
	//# sourceMappingURL=browser.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const common_1 = __webpack_require__(1);
	const index_1 = __webpack_require__(33);
	class App extends common_1.Component {
	    render(e) {
	        return e('body', null, e('div', { id: 'app' }, index_1.PageView));
	    }
	}
	exports.App = App;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const common_1 = __webpack_require__(1);
	const page1_1 = __webpack_require__(34);
	const page2_1 = __webpack_require__(35);
	exports.PageView = new common_1.RouterView({
	    'page1': page1_1.Page1,
	    'page2': page2_1.Page2
	});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const common_1 = __webpack_require__(1);
	class Page1 extends common_1.Component {
	    constructor() {
	        super();
	        this.state.set(null, {
	            bool: true,
	            str: 'test'
	        });
	    }
	    render(e, state) {
	        return e('div', null, e('input', { model: state.get('str') }), state.get('str'));
	    }
	}
	exports.Page1 = Page1;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const common_1 = __webpack_require__(1);
	class Page2 extends common_1.Component {
	    constructor() {
	        super();
	        this.state.set(null, {
	            bool: true,
	            str: 'test2'
	        });
	    }
	    render(e, state) {
	        return e('div', null, e('input', { model: state.get('str') }), state.get('str'));
	    }
	}
	exports.Page2 = Page2;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=main.js.map