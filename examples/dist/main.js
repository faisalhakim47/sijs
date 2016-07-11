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
	const elem_1 = __webpack_require__(3);
	const observable_1 = __webpack_require__(17);
	const router_1 = __webpack_require__(10);
	function isComponentClass(t) {
	    return t && t._isComponentClass;
	}
	exports.isComponentClass = isComponentClass;
	class Component {
	    constructor(attrs, children) {
	        this.attrs = attrs;
	        this.children = children;
	        this.rawState = {};
	        this._isComponent = true;
	        this.params = {};
	        this.query = {};
	        this.state = new observable_1.Observable(this, 'rawState');
	    }
	    create() {
	        this.params = router_1.Router.currentParams;
	        this.query = router_1.Router.currentQuery;
	        const e = this.render(elem_1.createElem, this.state);
	        if (this.created)
	            this.created();
	        return e;
	    }
	}
	Component._isComponentClass = true;
	Component.awaitState = [];
	exports.Component = Component;
	//# sourceMappingURL=component.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const component_1 = __webpack_require__(2);
	const routerview_1 = __webpack_require__(4);
	const uid_1 = __webpack_require__(11);
	const attr_1 = __webpack_require__(12);
	const bind_1 = __webpack_require__(13);
	const class_1 = __webpack_require__(14);
	const event_1 = __webpack_require__(15);
	const if_1 = __webpack_require__(16);
	const style_1 = __webpack_require__(19);
	const text_1 = __webpack_require__(20);
	const input_number_1 = __webpack_require__(21);
	const input_checkbox_1 = __webpack_require__(22);
	const input_radio_1 = __webpack_require__(23);
	const select_1 = __webpack_require__(24);
	const status_1 = __webpack_require__(8);
	const observable_1 = __webpack_require__(17);
	function isElem(t) {
	    return t && t._isElm;
	}
	exports.isElem = isElem;
	const onRx = /^on/;
	exports.React = {
	    createElement: createElem
	};
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
	                            template += `value="${model.val()}"`;
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
	                            template += `value="${model.val()}"`;
	                            events.oninput = true;
	                            glues.push(new text_1.TextGlue(id, model));
	                            break;
	                    }
	                }
	                else if (tag === 'select') {
	                    template += `value="${model.val()}"`;
	                    events.onchange = true;
	                    glues.push(new select_1.SelectGlue(id, model));
	                }
	                attrs.model = null;
	                attrs.type = null;
	            }
	            if (attrs.bind) {
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
	                template += `${eventName}="(function(){_E('${id}:${eventName}')})()"`;
	            }
	        }
	        template += '>';
	        children.forEach((child, i) => {
	            let elem = child;
	            if (child instanceof observable_1.ObsGetter) {
	                elem = createElem('span', null, child.val());
	                elem.glues.push(new bind_1.BindGlue(elem.id, child));
	            }
	            if (child instanceof routerview_1.RouterView) {
	                elem = child.init();
	            }
	            if (isElem(elem)) {
	                if (!status_1.is.prerender)
	                    template += elem.template;
	                if (!status_1.is.server)
	                    glues.push(...elem.glues);
	            }
	            else if (child && !status_1.is.prerender) {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const elem_1 = __webpack_require__(3);
	const routerview_1 = __webpack_require__(5);
	const router_1 = __webpack_require__(10);
	const paramRx = new RegExp('/:(.*)/', 'g');
	class RouterView {
	    constructor(obj) {
	        this.routes = {};
	        Object.keys(obj).forEach((key) => {
	            this.routes[key] = obj[key];
	        });
	    }
	    init() {
	        const helperElem = elem_1.createElem('script', null);
	        const e = this.Elem();
	        helperElem.glues.push(new routerview_1.RouterViewGlue(helperElem.id, this, e.glues));
	        helperElem.glues.push(...e.glues);
	        helperElem.template += e.template;
	        return helperElem;
	    }
	    Elem() {
	        const Component = this.routes[router_1.Router.currentRouteName];
	        if (Component) {
	            return (new Component()).create();
	        }
	        else {
	            return elem_1.createElem('script', { dummy: true });
	        }
	    }
	}
	exports.RouterView = RouterView;
	//# sourceMappingURL=routerview.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const global_event_1 = __webpack_require__(7);
	class RouterViewGlue extends glue_1.Glue {
	    constructor(id, rv, activeGlues) {
	        super();
	        this.id = id;
	        this.rv = rv;
	        this.activeGlues = activeGlues;
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.watchers.push(global_event_1.GlobalEvent.on('route:change', () => this.routeWatcher()));
	    }
	    destroy() {
	        this.unwatchAll();
	        this.el = null;
	        glue_1.removeElRef(this.id);
	    }
	    routeWatcher() {
	        const e = this.rv.Elem();
	        if (this.el.nextElementSibling.hasAttribute(this.id)) {
	            glue_1.destroyGlues(this.activeGlues);
	            this.el.parentElement.removeChild(this.el.nextElementSibling);
	        }
	        this.el.insertAdjacentHTML('afterend', e.template.replace('>', ` ${this.id}>`));
	        glue_1.installGlues(e.glues);
	        this.activeGlues = e.glues;
	    }
	}
	exports.RouterViewGlue = RouterViewGlue;
	const instances = {};
	//# sourceMappingURL=routerview.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	class Glue {
	    constructor() {
	        this.isInstalled = false;
	        this.watchers = [];
	    }
	    unwatchAll() {
	        this.watchers.forEach((watcher) => watcher.unwatch());
	        this.watchers = [];
	    }
	}
	exports.Glue = Glue;
	const elReference = {};
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
	    return elReference[id].el;
	}
	exports.getEl = getEl;
	function removeElRef(id) {
	    const ref = elReference[id];
	    if (ref) {
	        ref.refCount--;
	        if (ref.refCount === 0) {
	            elReference[id] = null;
	        }
	    }
	    else {
	        console.warn('#', id, 'have not been referenced yet.');
	    }
	}
	exports.removeElRef = removeElRef;
	function installGlues(glues) {
	    glues.forEach((glue) => glue.install());
	}
	exports.installGlues = installGlues;
	function destroyGlues(glues) {
	    glues.forEach((glue) => glue.destroy());
	}
	exports.destroyGlues = destroyGlues;
	//# sourceMappingURL=glue.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const status_1 = __webpack_require__(8);
	const emitter_1 = __webpack_require__(9);
	const observable_1 = __webpack_require__(17);
	const uid_1 = __webpack_require__(11);
	exports.GlobalEvent = new emitter_1.Emitter();
	if (status_1.is.browser) {
	    const addEvent = (name, eventFn) => {
	        window.addEventListener(name, eventFn);
	    };
	    addEvent('popstate', (e) => {
	        exports.GlobalEvent.emit('browser:popstate', e);
	    });
	    addEvent('online', (e) => {
	        exports.GlobalEvent.emit('browser:online', e);
	    });
	    addEvent('offline', (e) => {
	        exports.GlobalEvent.emit('browser:offline', e);
	    });
	}
	exports.GlobalEvent.on('resetIds', () => {
	    observable_1.resetObsId();
	    uid_1.resetElemId();
	});
	//# sourceMappingURL=global-event.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	const test = {};
	try {
	    test['bowser'] = !!window && !!document;
	}
	catch (e) { }
	try {
	    test['server'] = !!global;
	}
	catch (e) { }
	const browser = !!test['bowser'];
	const server = !!test['server'] && !browser;
	const prerender = browser && window['_prerender'];
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
	class Emitter {
	    constructor() {
	        this.watchers = new Map();
	    }
	    on(name, watcher) {
	        if (!this.watchers.has(name)) {
	            this.watchers.set(name, new Set());
	        }
	        const watchers = this.watchers.get(name);
	        watchers.add(watcher);
	        return {
	            unwatch() {
	                watchers.delete(watcher);
	            }
	        };
	    }
	    off(name, watcher) {
	        const watchers = this.watchers.get(name);
	        if (!watchers)
	            return;
	        watchers.delete(watcher);
	    }
	    emit(name, ...data) {
	        const watchers = this.watchers.get(name);
	        if (!watchers)
	            return;
	        watchers.forEach((watcher) => {
	            watcher(...data);
	        });
	    }
	}
	exports.Emitter = Emitter;
	//# sourceMappingURL=emitter.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const global_event_1 = __webpack_require__(7);
	const paramRx = new RegExp('/(:.*)/', 'g');
	class Router {
	    constructor(Component, routes) {
	        this.Component = Component;
	        routes.forEach(({ path, name }) => {
	            let params = path.match(paramRx);
	            if (params === null)
	                params = [];
	            params = params.map((param) => param.slice(1));
	            params.shift();
	            Router.routes.push({
	                path: path,
	                name: name,
	                params: params,
	                rx: new RegExp(path.replace(paramRx, '/(.*)/'))
	            });
	        });
	    }
	    static generateRoute(path) {
	        if (!path)
	            path = Router.path;
	        for (let i = Router.routes.length; i--;) {
	            const route = Router.routes[i];
	            if (route.rx.test(path)) {
	                Router.currentRouteName = route.name;
	                let paramsArr = path.match(route.rx);
	                let paramsObj = null;
	                if (route.params) {
	                    paramsObj = {};
	                    route.params.forEach((name, i) => {
	                        paramsObj[name] = paramsArr[i];
	                    });
	                    Router.currentParams = paramsObj;
	                }
	                else {
	                    Router.currentParams = paramsArr;
	                }
	                i = 0;
	            }
	        }
	        global_event_1.GlobalEvent.emit('route:change', Router); // Global Event
	    }
	    generateElem(path) {
	        Router.generateRoute(path);
	        return (new this.Component()).create();
	    }
	}
	Router.routes = [];
	exports.Router = Router;
	//# sourceMappingURL=router.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	let uid = 0;
	function getId() {
	    return uid;
	}
	exports.getId = getId;
	function genId() {
	    return '_' + uid++;
	}
	exports.genId = genId;
	function resetElemId() {
	    uid = 0;
	}
	exports.resetElemId = resetElemId;
	//# sourceMappingURL=uid.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	class AttrGlue extends glue_1.Glue {
	    constructor(id, attrName, attrValue) {
	        super();
	        this.id = id;
	        this.attrName = attrName;
	        this.attrValue = attrValue;
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.watchers.push(this.attrValue.watch((val) => this.attrSetter(val)));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
	        }
	    }
	    attrSetter(val) {
	        this.el.setAttribute(this.attrName, val);
	    }
	}
	exports.AttrGlue = AttrGlue;
	//# sourceMappingURL=attr.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	class BindGlue extends glue_1.Glue {
	    constructor(id, value) {
	        super();
	        this.id = id;
	        this.value = value;
	        this.bindSetter = (val) => {
	            if (this.el.innerText == val)
	                return;
	            this.el.innerText = val;
	        };
	    }
	    install() {
	        this.el = glue_1.getEl(this.id);
	        this.watchers.push(this.value.watch(this.bindSetter));
	        window['test'] = this.value;
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	        }
	    }
	}
	exports.BindGlue = BindGlue;
	//# sourceMappingURL=bind.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	class ClassGlue extends glue_1.Glue {
	    constructor(id, className, cond) {
	        super();
	        this.id = id;
	        this.className = className;
	        this.cond = cond;
	    }
	    install() {
	        this.el = glue_1.getEl(this.id);
	        this.watchers.push(this.cond.watch((val) => this.classNameSetter(val)));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	        }
	    }
	    classNameSetter(val) {
	        const isContain = this.el.classList.contains(this.className);
	        if (val && !isContain) {
	            this.el.classList.add(this.className);
	        }
	        else if (!val && isContain) {
	            this.el.classList.remove(this.className);
	        }
	    }
	}
	exports.ClassGlue = ClassGlue;
	//# sourceMappingURL=class.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const status_1 = __webpack_require__(8);
	const emitter_1 = __webpack_require__(9);
	exports.eventBus = new emitter_1.Emitter();
	if (status_1.is.browser) {
	    window['_E'] = (code) => {
	        exports.eventBus.emit(code);
	    };
	    console.log('create _E', window['_E']);
	}
	function watchEvent(id, name, eventFn) {
	    return exports.eventBus.on(id + ':' + name, eventFn);
	}
	exports.watchEvent = watchEvent;
	function unwatchEvent(id, name, eventFn) {
	    return exports.eventBus.off(id + ':' + name, eventFn);
	}
	exports.unwatchEvent = unwatchEvent;
	class EventGlue extends glue_1.Glue {
	    constructor(id, name, eventFn) {
	        super();
	        this.id = id;
	        this.name = name;
	        this.eventFn = eventFn;
	    }
	    install() {
	        watchEvent(this.id, this.name, this.eventFn);
	    }
	    destroy() {
	        unwatchEvent(this.id, this.name, this.eventFn);
	    }
	}
	EventGlue.context = null;
	exports.EventGlue = EventGlue;
	//# sourceMappingURL=event.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const observable_1 = __webpack_require__(17);
	class IfGlue extends glue_1.Glue {
	    constructor(id, cond, elem) {
	        super();
	        this.id = id;
	        this.cond = cond;
	        this.elem = elem;
	    }
	    install() {
	        const cond = this.cond;
	        this.helperEl = document.getElementById('if' + this.id);
	        if (cond instanceof observable_1.ObsGetter) {
	            this.watchers.push(cond.watch((val) => this.ifWatcher(val)));
	        }
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (!this.isInstalled)
	            return;
	        const cond = this.cond;
	        if (cond instanceof observable_1.ObsGetter) {
	            this.unwatchAll();
	        }
	        this.helperEl = null;
	    }
	    ifWatcher(cond) {
	        if (cond && !this.isExist()) {
	            const e = this.elem();
	            this.helperEl.insertAdjacentHTML('afterend', e.template);
	            glue_1.installGlues(e.glues);
	            this.activeGlues = e.glues;
	        }
	        else if (!cond && this.isExist()) {
	            this.helperEl.parentElement.removeChild(this.helperEl.nextElementSibling);
	            glue_1.destroyGlues(this.activeGlues);
	            this.activeGlues = [];
	        }
	    }
	    isExist() {
	        return this.helperEl.nextElementSibling.id === this.id;
	    }
	}
	exports.IfGlue = IfGlue;
	//# sourceMappingURL=if.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const emitter_1 = __webpack_require__(9);
	const object_1 = __webpack_require__(18);
	class Observable {
	    constructor(baseData = { _dummy: null }, basePath = '_dummy', id) {
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
	    raw(path) {
	        return object_1.get(this.rawData, path);
	    }
	    get(path) {
	        path = path;
	        return new ObsGetter(this.id, path, this);
	    }
	    set(path, value) {
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
	    }
	    filter(path, filterFn) {
	        const obs = this.get(path);
	        const val = obs.val;
	        if (filterFn instanceof String) {
	            obs.val = () => exports.Filters.get(filterFn)(val());
	            return obs;
	        }
	        else if (filterFn instanceof Function) {
	            obs.val = () => filterFn(val());
	            return obs;
	        }
	    }
	    watch(path, watcher) {
	        this.EE.on(path, watcher);
	        let i = 0;
	        this.EE.watchers.forEach((watchers, listedPath) => {
	            if (listedPath.indexOf(path) === 0 && path !== listedPath) {
	                const name = listedPath + path + i++;
	                this.childWatcher[name] = () => {
	                    this.EE.emit(listedPath, object_1.get(this.rawData, listedPath));
	                };
	                this.EE.on(null, this.childWatcher[name]);
	            }
	        });
	        return {
	            unwatch: () => {
	                this.unwatch(path, watcher);
	            }
	        };
	    }
	    unwatch(path, watcher) {
	        this.EE.off(path, watcher);
	        let i = 0;
	        this.EE.watchers.forEach((watchers, listedPath) => {
	            if (listedPath.indexOf(path) === 0 && path !== listedPath) {
	                this.EE.off(path, this.childWatcher[listedPath + path + i++]);
	            }
	        });
	    }
	}
	exports.Observable = Observable;
	class ObsGetter {
	    constructor(id, path, parent) {
	        this.id = id;
	        this.path = path;
	        this.parent = parent;
	    }
	    get(childPath) {
	        return this.parent.get(this.path + '.' + childPath);
	    }
	    raw() {
	        return this.parent.raw(this.path);
	    }
	    val() {
	        return Object.freeze(this.raw());
	    }
	    set(value) {
	        return this.parent.set(this.path, value);
	    }
	    watch(watcher) {
	        return this.parent.watch(this.path, watcher);
	    }
	    unwatch(watcher) {
	        return this.parent.unwatch(this.path, watcher);
	    }
	}
	exports.ObsGetter = ObsGetter;
	exports.Filters = new Map();
	function registerFilter(name, filterFn) {
	    exports.Filters.set(name, filterFn);
	}
	exports.registerFilter = registerFilter;
	let idCound = 0;
	function genId() {
	    return 'Obs_' + idCound++;
	}
	function resetObsId() {
	    idCound = 0;
	}
	exports.resetObsId = resetObsId;
	//# sourceMappingURL=observable.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	function get(obj, path) {
	    if (!path)
	        return;
	    const parsedPath = pathParse(path);
	    let l = parsedPath.length - 1;
	    for (let i = 0; i < l; i++) {
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
	    const parsedPath = pathParse(path);
	    let l = parsedPath.length - 1;
	    for (let i = 0; i < l; i++) {
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
	const pathRx = /\[|\]\./g;
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
	const glue_1 = __webpack_require__(6);
	class StyleGlue extends glue_1.Glue {
	    constructor(id, name, value) {
	        super();
	        this.id = id;
	        this.name = name;
	        this.value = value;
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not been inserted yet.', this);
	        }
	        this.watchers.push(this.value.watch((val) => this.styleWatcher(val)));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue style #', this.id, 'has not been installed yet.', this);
	        }
	    }
	    styleWatcher(val) {
	        this.el.style[this.name] = val;
	    }
	}
	exports.StyleGlue = StyleGlue;
	//# sourceMappingURL=style.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const event_1 = __webpack_require__(15);
	class TextGlue extends glue_1.Glue {
	    constructor(id, model) {
	        super();
	        this.id = id;
	        this.model = model;
	        this.toView = (val) => {
	            if (val == this.el.value)
	                return;
	            this.el.value = val;
	        };
	        this.toModel = () => {
	            if (this.model.val() == this.el.value)
	                return;
	            this.model.set(this.el.value);
	        };
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.watchers.push(this.model.watch(this.toView), event_1.watchEvent(this.id, 'oninput', this.toModel));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
	        }
	    }
	}
	exports.TextGlue = TextGlue;
	//# sourceMappingURL=text.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const event_1 = __webpack_require__(15);
	class InputNumberGlue extends glue_1.Glue {
	    constructor(id, model) {
	        super();
	        this.id = id;
	        this.model = model;
	    }
	    toView(val) {
	        this.el.value = val;
	    }
	    toModel() {
	        this.model.set(parseFloat(this.el.value));
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.watchers.push(this.model.watch((val) => this.toView(val)), event_1.watchEvent(this.id, 'oninput', () => this.toModel()));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputNumber #', this.id, 'has not installed yet.', this);
	        }
	    }
	}
	exports.InputNumberGlue = InputNumberGlue;
	//# sourceMappingURL=input-number.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const event_1 = __webpack_require__(15);
	class InputCheckboxGlue extends glue_1.Glue {
	    constructor(id, model) {
	        super();
	        this.id = id;
	        this.model = model;
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.watchers.push(this.model.watch((val) => this.toView(val)), event_1.watchEvent(this.id, 'onclick', () => this.toModel()));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputCheckbox #', this.id, 'has not installed yet.', this);
	        }
	    }
	    toView(val) {
	        if (val.indexOf(this.el.value) === -1) {
	            this.el.checked = false;
	        }
	        else {
	            this.el.checked = true;
	        }
	    }
	    toModel() {
	        this.model.set(this.el.value);
	    }
	}
	exports.InputCheckboxGlue = InputCheckboxGlue;
	//# sourceMappingURL=input-checkbox.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const event_1 = __webpack_require__(15);
	class InputRadioGlue extends glue_1.Glue {
	    constructor(id, model) {
	        super();
	        this.id = id;
	        this.model = model;
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
	        }
	        this.radioName = this.model.path + this.model.val();
	        this.el.name = this.radioName;
	        this.watchers.push(this.model.watch((val) => this.toView(val)), event_1.watchEvent(this.id, 'onclick', () => this.toModel()));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue InputRadio #', this.id, 'has not installed yet.', this);
	        }
	    }
	    toView(val) {
	        if (this.value === val) {
	            this.el.click();
	        }
	    }
	    toModel() {
	        this.model.set(this.el.value);
	    }
	}
	exports.InputRadioGlue = InputRadioGlue;
	//# sourceMappingURL=input-radio.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const glue_1 = __webpack_require__(6);
	const event_1 = __webpack_require__(15);
	class SelectGlue extends glue_1.Glue {
	    constructor(id, model) {
	        super();
	        this.id = id;
	        this.model = model;
	    }
	    toView(val) {
	        this.el.value = val;
	    }
	    toModel() {
	        this.model.set(this.el.value);
	    }
	    install() {
	        if (!(this.el = glue_1.getEl(this.id))) {
	            return console.warn('Select element #', this.id, 'has not inserted yet.', this);
	        }
	        this.el.value = this.model.val();
	        this.watchers.push(this.model.watch((val) => this.toView(val)), event_1.watchEvent(this.id, 'onchange', () => this.toModel()));
	        this.isInstalled = true;
	    }
	    destroy() {
	        if (this.isInstalled) {
	            this.unwatchAll();
	            this.el = null;
	            glue_1.removeElRef(this.id);
	        }
	        else {
	            console.warn('Glue select #', this.id, 'has not installed yet.', this);
	        }
	    }
	}
	exports.SelectGlue = SelectGlue;
	//# sourceMappingURL=select.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const uid_1 = __webpack_require__(11);
	const list_1 = __webpack_require__(26);
	const observable_1 = __webpack_require__(17);
	function isListFn(t) {
	    return t && typeof t === 'function';
	}
	function eList(items, listFn, opts) {
	    if (!opts)
	        opts = { limit: 0, skip: 0 };
	    let skip = opts.skip instanceof observable_1.ObsGetter
	        ? opts.skip.val()
	        : (opts.skip || 0);
	    let limit = opts.limit instanceof observable_1.ObsGetter
	        ? opts.limit.val()
	        : (opts.limit || 0);
	    const id = uid_1.genId();
	    const glues = [];
	    const listGlue = new list_1.ListGlue(id, items, listFn, opts);
	    let template = '<script id="' + id + '"></script>';
	    let length = items.length(), i;
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
	    for (let index = 0; index < i; index++) {
	        const currentItem = listGlue.currentItems[index] = {
	            index: index,
	            item: items.get(skip + index)
	        };
	        const e = listFn(currentItem.item, () => currentItem.index);
	        template += e.template.replace('>', ' ' + id + '>');
	        glues.push(...currentItem['glues'] = e.glues);
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
	const glue_1 = __webpack_require__(6);
	const observable_1 = __webpack_require__(17);
	class ListGlue extends glue_1.Glue {
	    constructor(helperId, items, listFn, opts) {
	        super();
	        this.helperId = helperId;
	        this.items = items;
	        this.listFn = listFn;
	        this.opts = opts;
	        this.currentItems = [];
	        const { skip, limit } = opts;
	        if (skip instanceof observable_1.ObsGetter) {
	            this.skip = skip.val();
	            this.watchers.push(skip.watch((val) => this.skipWatcher(val)));
	        }
	        if (limit instanceof observable_1.ObsGetter) {
	            this.limit = limit.val();
	            this.watchers.push(limit.watch((val) => this.limitWatcher(val)));
	        }
	    }
	    install() {
	        this.helperEl = document.getElementById(this.helperId);
	        const helperParentEl = this.helperEl.parentElement;
	        const elIndex = Array.prototype.indexOf.call(helperParentEl.children, this.helperEl);
	        this.currentItems = this.currentItems.map((oldItem, index) => {
	            oldItem['el'] = helperParentEl.children[elIndex + index + 1];
	            return oldItem;
	        });
	        this.watchers.push(this.items.watch(() => this.listGenerator()));
	        this.isInstalled = true;
	    }
	    destroy() {
	        const { skip, limit } = this.opts;
	        if (!this.isInstalled)
	            return;
	        this.unwatchAll();
	        this.helperEl = null;
	    }
	    skipWatcher(val) {
	        this.skip = val;
	    }
	    limitWatcher(val) {
	        this.limit = val;
	    }
	    listGenerator() {
	        const { helperId, helperEl, items, listFn, skip, limit, currentItems } = this;
	        let newItems = [];
	        let length = items.length();
	        let i;
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
	        let skipIndex = skip;
	        if (skip > length)
	            skipIndex = length;
	        else if (skip < 0)
	            skipIndex = 0;
	        while (i--) {
	            const index = skipIndex + i;
	            const item = items.get(index);
	            let indexItem = -1;
	            for (let i = 0, l = currentItems.length; i < l; i++) {
	                if (currentItems[i].item === item) {
	                    indexItem = i;
	                    break;
	                }
	            }
	            if (indexItem !== -1) {
	                helperEl.insertAdjacentElement('afterend', currentItems[indexItem].el);
	                const currentItem = currentItems.splice(indexItem, 1)[0];
	                currentItem.index = index;
	                currentItems.push(currentItem);
	            }
	            else {
	                const itemParam = { item: item, index: index };
	                const e = listFn(itemParam.item, () => itemParam.index);
	                helperEl.insertAdjacentHTML('afterend', e.template.replace('>', ' ' + helperId + '>'));
	                glue_1.installGlues(itemParam['glues'] = e.glues);
	                itemParam['el'] = helperEl.nextSibling;
	                newItems.push(itemParam);
	            }
	        }
	        currentItems.forEach((oldItem) => {
	            helperEl.parentElement.removeChild(oldItem.el);
	            glue_1.destroyGlues(oldItem.glues);
	        });
	        this.currentItems = newItems;
	        newItems = [];
	    }
	}
	exports.ListGlue = ListGlue;
	//# sourceMappingURL=list.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const dependency_1 = __webpack_require__(28);
	const observable_1 = __webpack_require__(17);
	function compute(deps, computeFn) {
	    const obs = new observable_1.Observable();
	    dependency_1.dependsOn(deps, (...datas) => {
	        obs.set(null, computeFn(...datas));
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
	    const Emit = () => {
	        fn(...deps.map(dep => dep.val()));
	    };
	    Emit();
	    const watchers = [];
	    deps.forEach((dep) => {
	        watchers.push(dep.watch(Emit));
	    });
	    return {
	        unwatch() {
	            watchers.forEach(watcher => watcher.unwatch());
	        }
	    };
	}
	exports.dependsOn = dependsOn;
	//# sourceMappingURL=dependency.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const emitter_1 = __webpack_require__(9);
	const observable_1 = __webpack_require__(17);
	const compute_1 = __webpack_require__(27);
	const object_1 = __webpack_require__(18);
	class ObsArray {
	    constructor(baseData = { _dummy: [] }, basePath = '_dummy') {
	        this.baseData = baseData;
	        this.basePath = basePath;
	        const rawItems = object_1.get(baseData, basePath);
	        if (rawItems.undefined) {
	            throw new Error('cannot create on undefined path');
	        }
	        else if (!Array.isArray(this.obsItems)) {
	            throw new Error('cannot create on non-Array path');
	        }
	        this.rawItems = rawItems;
	        this.obsItems = this.rawItems.map((item, i) => {
	            return new observable_1.Observable(rawItems, i.toString());
	        });
	        this.EE = new emitter_1.Emitter();
	    }
	    length() {
	        return this.obsItems.length;
	    }
	    get(index) {
	        return this.obsItems[index];
	    }
	    getAll() {
	        return this.obsItems;
	    }
	    val() {
	        return this.getAll();
	    }
	    set(index, value) {
	        this.obsItems[index].set(null, value);
	    }
	    pop() {
	        const val = this.rawItems.pop();
	        this.obsItems.pop();
	        this.EE.emit('remove', {
	            index: this.obsItems.length
	        });
	        this.EE.emit('change');
	        return val;
	    }
	    push(val) {
	        const r = this.rawItems.push(val);
	        const index = this.rawItems.length - 1;
	        val = new observable_1.Observable(this.rawItems, index.toString());
	        this.obsItems.push(val);
	        this.EE.emit('add', { index: index, val: val });
	        this.EE.emit('change');
	        return r;
	    }
	    shift() {
	        const val = this.rawItems.shift();
	        this.obsItems.shift();
	        this.EE.emit('remove', { index: 0 });
	        this.EE.emit('change');
	        return val;
	    }
	    unshift(val) {
	        const r = this.rawItems.unshift(val);
	        val = new observable_1.Observable(this.rawItems, '0');
	        this.obsItems.unshift(val);
	        this.EE.emit('add', { index: 0, val: val });
	        this.EE.emit('change');
	        return r;
	    }
	    splice(start, delCount, ...vals) {
	        const d = this.rawItems.splice(start, delCount, ...vals);
	        for (let i = delCount; i--;) {
	            this.EE.emit('remove', { index: start + i });
	        }
	        this.obsItems.splice(start, delCount, ...vals.map((val, i) => {
	            const index = start + i;
	            val = new observable_1.Observable(this.rawItems, index.toString());
	            this.EE.emit('add', { index: index, val: val });
	            return val;
	        }));
	        this.EE.emit('change');
	        return d;
	    }
	    filter(deps, filterFn) {
	        deps.push(this);
	        const obs = compute_1.compute(deps, (...data) => {
	            return this.obsItems.filter((item, i) => filterFn(item, i, ...data));
	        });
	        return obs;
	    }
	    watch(p1, p2) {
	        if (typeof p1 === 'string') {
	            this.EE.on(p1, p2);
	        }
	        else {
	            this.EE.on('change', p1);
	        }
	        return {
	            unwatch: () => {
	                this.unwatch(p1, p2);
	            }
	        };
	    }
	    unwatch(p1, p2) {
	        if (typeof p1 === 'string') {
	            this.EE.off(p1, p2);
	        }
	        else {
	            this.EE.off('change', p1);
	        }
	    }
	}
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
	const status_1 = __webpack_require__(8);
	const glue_1 = __webpack_require__(6);
	function Bootsrap(selector, RouterInstance) {
	    if (status_1.is.browser) {
	        document.addEventListener('DOMContentLoaded', () => {
	            const el = document.querySelector(selector);
	            const { template, glues } = RouterInstance.generateElem(window.location.pathname);
	            if (!status_1.is.prerender)
	                el.outerHTML = template;
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
	        common_1.GlobalEvent.emit('resetIds');
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