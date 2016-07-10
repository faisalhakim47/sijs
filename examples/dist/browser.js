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
	const browser_1 = __webpack_require__(1);
	const routes_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./routes\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	browser_1.Bootsrap('#app', routes_1.Routes);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts" />
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	//# sourceMappingURL=browser.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const status_1 = __webpack_require__(3);
	const glue_1 = __webpack_require__(4);
	function Bootsrap(selector, RouterInstance) {
	    document.addEventListener('DOMContentLoaded', () => {
	        const el = document.querySelector(selector);
	        const { template, glues } = RouterInstance.generateElem(window.location.pathname);
	        if (!status_1.default.prerender)
	            el.outerHTML = template;
	        glue_1.installGlues(glues);
	        status_1.default.prerender = false;
	    });
	}
	exports.Bootsrap = Bootsrap;
	//# sourceMappingURL=browser.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	const test = {};
	try {
	    test['bowser'] = !!window && !!document;
	    test['server'] = !!global;
	}
	catch (e) { }
	const browser = !!test['bowser'];
	const server = test['server'] && !browser ? false : true;
	const prerender = browser && window['_prerender'];
	const status = {
	    browser: browser,
	    server: server,
	    prerender: prerender
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = status;
	//# sourceMappingURL=status.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	class Glue {
	    constructor() {
	        this.isInstalled = false;
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
	    return elReference[id];
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
	        console.warn('removeRef error:', id);
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=browser.js.map