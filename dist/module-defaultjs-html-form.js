/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Form, Page, BaseField, Field, List, Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/BaseField */ "./src/BaseField.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseField", function() { return _src_BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Field */ "./src/Field.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _src_Field__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _src_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Container */ "./src/Container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _src_Container__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _src_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/List */ "./src/List.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _src_List__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _src_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Page */ "./src/Page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return _src_Page__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _src_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Form */ "./src/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _src_Form__WEBPACK_IMPORTED_MODULE_5__["default"]; });










/***/ }),

/***/ "./module.js":
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./index.js");



_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.form = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.form || {
	VERSION : "1.0.0-beta.1",
	Form: _index__WEBPACK_IMPORTED_MODULE_1__["Form"],
	Field: _index__WEBPACK_IMPORTED_MODULE_1__["Field"]
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {const GLOBAL = (() => {
	if(typeof global !== "undefined") return global;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ __webpack_exports__["default"] = (GLOBAL);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 * 
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *  
 *  @return returns the changed object
 */
const append = function(aKey, aData, aObject){
	if(typeof aData !== "undefined"){		
		const key = aKey.toLowerCase().trim();	
		if(typeof aObject[key] === "undefined")
			aObject[key] = aData;
		else{		
			const data = aObject[key];
			if(data instanceof Array)
				data.push(aData);
			else
				aObject[key] = [aObject[key], aData];
		}
	}	
	return aObject;
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 * 
 * @param aObject:object the object to be testing
 * 
 * @return boolean
 */
const isPojo = function(aObject){
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object"
}

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other 
 * value would be replaced by value from the source object.
 * 
 * sample: merge(target, source-1, source-2, ...source-n)
 * 
 * @param aTarget:object the target object to merging into
 * @param aSources:object
 * 
 * @return object returns the target object
 */
const merge = function(aTarget){	
	for(let i = 1; i < arguments.length; i++){
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach(aKey => {
			if(isPojo(aTarget[aKey]))
				merge(aTarget[aKey], source[aKey]);
			else
				aTarget[aKey] = source[aKey];
		});
	}
	
	return aTarget;
}

/* harmony default export */ __webpack_exports__["default"] = ({
	isPojo : isPojo,
	append: append,
	merge : merge
});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {const GLOBAL = (() => {
	if(typeof global !== "undefined") return global;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ __webpack_exports__["default"] = (GLOBAL);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ObjectProperty; });
class ObjectProperty {
	constructor(key, context){
		this.key = key;
		this.context = context;
	}
	
	get keyDefined(){
		return this.key in this.context; 
	}
	
	get hasValue(){
		return !!this.context[this.key];
	}
	
	get value(){
		return this.context[this.key];
	}
	
	set value(data){
		this.context[this.key] = data;
	}
	
	set append(data) {
		if(!this.hasValue)
			this.value = data;
		else {
			const value = this.value;
			if(value instanceof Array)
				value.push(data);
			else
				this.value = [this.value, data];
		}
	}
	
	remove(){
		delete this.context[this.key];
	}
	
	static load(data, key, create=true) {
		let context = data;
		const keys = key.split("\.");
		let name = keys.shift().trim();
		while(keys.length > 0){
			if(!context[name]){
				if(!create)
					return null;
				
				context[name] = {}
			}
			
			context = context[name];
			name = keys.shift().trim();
		}
		
		return new ObjectProperty(name, context);
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \***********************************************************************************************************************************/
/*! exports provided: append, isPojo, merge, filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPojo", function() { return isPojo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 * 
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *  
 *  @return returns the changed object
 */
const append = function(aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true)
		property.append = aData;
	}
	return aObject;
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 * 
 * @param aObject:object the object to be testing
 * 
 * @return boolean
 */
const isPojo = function(aObject) {
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object"
}

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other 
 * value would be replaced by value from the source object.
 * 
 * sample: merge(target, source-1, source-2, ...source-n)
 * 
 * @param aTarget:object the target object to merging into
 * @param aSources:object
 * 
 * @return object returns the target object
 */
const merge = function(aTarget) {
	for (let i = 1; i < arguments.length; i++) {
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach(aKey => {
			if (isPojo(aTarget[aKey]))
				merge(aTarget[aKey], source[aKey]);
			else
				aTarget[aKey] = source[aKey];
		});
	}

	return aTarget;
}



const buildPropertyFilter = function({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	}
};


const filter = function() {
	const [data, propFilter, {deep = false, recursive = true, parents = []} = {}] = arguments;
	const result = {};

	for (name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined))
			result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object"
				|| value instanceof Array
				|| value instanceof Map
				|| value instanceof Set
				|| value instanceof RegExp
				|| parents.includes[value]
				|| value == data)
				result[name] = value;
			else
				result[name] = filter(value, propFilter, {deep, recursive, parents:  parents.concat(data)});
		}

	}

	return result;
};



/* harmony default export */ __webpack_exports__["default"] = ({
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter
});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/Context.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Context; });
const seekAtChain = (resolver, property) => {
	while(resolver){
		const def = resolver.proxy.handle.getPropertyDef(property, false);
		if(def)
			return def;
		
		resolver = resolver.parent;
	}	
	return { data: null, resolver: null, defined: false };
}

class Handle {
	constructor(data, resolver) {
		this.data = data;
		this.resolver = resolver;
		this.cache = new Map();
	}
	
	updateData(data){
		this.data = data;
		this.cache = new Map();
	}
	
	resetCache(){
		this.cache = new Map();
	}

	getPropertyDef(property, seek = true) {
		if (this.cache.has(property))
			return this.cache.get(property);
		
		let def = null
		if (this.data && property in this.data)
			def = { data: this.data, resolver: this.resolver, defined: true };
		else if(seek)
			def = seekAtChain(this.resolver.parent, property);
		else
			return null;
		if(def.defined)
			this.cache.set(property, def);
		return def;
	}

	hasProperty(property) {
		//@TODO write tests!!!
		const { defined } = this.getPropertyDef(property);
		return defined;
	}
	getProperty(property) {
		//@TODO write tests!!!	
		const { data } = this.getPropertyDef(property);
		return data ? data[property] : undefined;
	}
	setProperty(property, value) {
		//@TODO would support this action on an proxied resolver context??? write tests!!!
		const { data, defined } = this.getPropertyDef(property);
		if (defined)
			data[property] = value;
		else {
			if (this.data)
				this.data[property] = value;
			else {
				this.data = {}
				this.data[property] = value;
			}
			this.cache.set(property, { data: this.data, resolver: this.resolver, defined: true });
		}
	}
	deleteProperty(property) {
		//@TODO would support this action on an proxied resolver context??? write tests!!!		
		throw new Error("unsupported function!")
	}
}

class Context {
	constructor(context, resolver) {
		this.handle = new Handle(context, resolver);		
		this.data = new Proxy(this.handle, {
			has: function(data, property) {
				return data.hasProperty(property);
			},
			get: function(data, property) {
				return data.getProperty(property);
			},
			set: function(data, property, value) {
				return data.setProperty(property, value);
			},
			deleteProperty: function(data, property) {
				return data.deleteProperty(property);
			}
			//@TODO need to support the other proxy actions		
		});;
	}
	
	updateData(data){
		this.handle.updateData(data)		
	}
	
	resetCache(){
		this.handle.resetCache();
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultValue; });
class DefaultValue {
	constructor(value){
		this.hasValue = arguments.length == 1;
		this.value = value;
	}	
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpressionResolver; });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectProperty.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultValue.js */ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js");






/*
 * 1 : resolver filter
 * 2 : resolver name
 * 3 : expression
 */
const EXPRESSION = /\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\}/;
const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const toDefaultValue = value => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"])
		return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"](value);
};

const execute = function(aStatement, aContext) {
	if (typeof aStatement !== "string")
		return aStatement;
		
	const expression = new Function("context", `try{with(context){return ${aStatement}}}catch(e){throw e;}`);
	return expression(aContext);
};

const resolve = async function(aResolver, aExpression, aFilter, aDefault) {
	if (aFilter && aResolver.name != aFilter)
		return aResolver.parent ? resolve(aResolver.parent, aExpression, aFilter, aDefault) : null;
	
	const result = await execute(aExpression, aResolver.proxy.data);
	if (result !== null && typeof result !== "undefined")
		return result;

	else if (aDefault instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"] && aDefault.hasValue)
		return aDefault.value;

	return result;
};

const normalize = value => {
	if (value) {
		value = value.trim();
		return value.length == 0 ? null : value;
	}
	return null;
};

class ExpressionResolver {
	constructor({ context = _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"], parent = null, name = null }) {
		this.parent = (parent instanceof ExpressionResolver) ? parent : null;
		this.name = name;
		this.context = context;
		this.proxy = new _Context_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.context, this);
	}

	get chain() {
		return this.parent ? this.parent.chain + "/" + this.name : "/" + this.name;
	}

	get effectiveChain() {
		if (!this.context)
			return this.parent ? this.parent.effectiveChain : "";
		return this.parent ? this.parent.effectiveChain + "/" + this.name : "/" + this.name;
	}

	get contextChain() {
		const result = [];
		let resolver = this;
		while (resolver) {
			if (resolver.context)
				result.push(resolver.context);

			resolver = resolver.parent;
		}

		return result;
	}

	getData(key, filter) {
		if (!key)
			return;
		else if (filter && filter != this.name) {
			if (this.parent)
				this.parent.getData(key, filter);
		} else {
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key, false);
			return property ? property.value : null;
		}
	}

	updateData(key, value, filter) {
		if (!key)
			return;
		else if (filter && filter != this.name) {
			if (this.parent)
				this.parent.updateData(key, value, filter);
		} else {
			if(this.context == null || typeof this.context === "undefined"){
				this.context = {};				
				this.proxy.updateData(this.context);
			}
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key);
			property.value = value;
			this.proxy.resetCache();
		}
	}

	mergeContext(context, filter) {
		if (filter && filter != this.name) {
			if (this.parent)
				this.parent.mergeContext(context, filter);
		} else {
			this.context = this.context ? _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].merge(this.context, context) : context;
		}
	}

	async resolve(aExpression, aDefault) {
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		try {
			const match = EXPRESSION.exec(aExpression);
			if (match)
				return await resolve(this, match[3], normalize(match[2]), defaultValue);
			else
				return await resolve(this, normalize(aExpression), null, defaultValue);
		} catch (e) {
			console.error("error at executing statment\"", aExpression, "\":", e);
			return defaultValue.hasValue ? defaultValue.value : aExpression;
		}
	}

	async resolveText(aText, aDefault) {
		let text = aText;
		let temp = aText; // required to prevent infinity loop
		let match = EXPRESSION.exec(text);
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED
		while (match != null) {
			const result = await this.resolve(match[0], defaultValue);
			temp = temp.split(match[0]).join(); // remove current match for next loop
			text = text.split(match[0]).join(typeof result === "undefined" ? "undefined" : (result == null ? "null" : result));
			match = EXPRESSION.exec(temp);
		}
		return text;
	}

	static async resolve(aExpression, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(resolver.resolve(aExpression, defaultValue));
				}, aTimeout);
			});

		return resolver.resolve(aExpression, defaultValue)
	}

	static async resolveText(aText, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(resolver.resolveText(aText, defaultValue));
				}, aTimeout);
			});

		return resolver.resolveText(aText, defaultValue);
	}
	
	static buildSecure({context, propFilter, option={deep:true}, name, parent}){
		context = _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].filter({data: context, propFilter, option});
		return new ExpressionResolver({context, name, parent});
	}
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Base.js":
/*!*********************!*\
  !*** ./src/Base.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_VALID"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_INVALID"]];

class Base extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {
		await this.initBase();
	}

	async initBase() {
		this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Form);
	}

	connectedCallback() {
		Promise.resolve(this.init())
			.then(() => {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].initialize);
			});
	}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].change);
		}
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"]);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			Object(_utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__["updateActiveState"])(this, active);
			this.activeUpdated();
		}
	}

	activeUpdated() {
	}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"]);
	}

	set readonly(readonly) {
		readonly ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"], "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"], null);
		this.readonlyUpdated();
	}

	readonlyUpdated() { }

	get condition() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_INVALID"]);
	}

	conditionUpdated() {

	}

	get valid() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_VALID"]);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Base);


/***/ }),

/***/ "./src/BaseField.js":
/*!**************************!*\
  !*** ./src/BaseField.js ***!
  \**************************/
/*! exports provided: findParentField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParentField", function() { return findParentField; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Validator */ "./src/Validator.js");






const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NAME"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_REQUIRED"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NOVALUE"]];

const findParentField = (field) => {
	let parent = field.parentNode;
	while (parent) {
		if (parent instanceof BaseField) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const updateHasValue = (hasValue, field) => {
	field.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NOVALUE"], !hasValue ? "" : null);
}

class BaseField extends _Base__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Base__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	constructor(value = null) {
		super();
		this.__value__ = value;
	}

	async init() {
		await this.initBaseField();
	}

	async initBaseField() {
		await this.initBase();

		this.parentField = findParentField(this);
		this.validator = new _Validator__WEBPACK_IMPORTED_MODULE_4__["default"](this);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].conditionStateChanged,
			(event) => {
				if (event.target == this) this.conditionUpdated();
			}
		);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input,
			(event) => {
				if (event.target == this) {
					this.__value__ = event.detail ? event.detail[0] : null;
					this.validate();
					this.publishValue();
				}
			}
		);

		this.form.on(
			_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].executeValidate,
			async (event) => {
				const chain = event.detail[0];
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					if (current != valid)
						this.publishValue();
				}
			}
		);
		
		this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].allPublishValue, ()=> {
			this.publishValue();
		});

		this.validate();
	}

	conditionUpdated() {
		this.active = this.condition;
	}

	get name() {
		return this.getAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NAME"]);
	}

	get required() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_REQUIRED"]);
	}

	get hasValue() {
		const value = this.value;
		return value != null && typeof value !== "undefined";
	}

	get value() {
		return this.__value__;
	}

	set value(value) {
		if (this.__value__ != value && this.acceptValue(value)) {
			value = this.normalizeValue(value);
			if (this.__value__ != value) {
				this.__value__ = value;
				this.updatedValue(value);
				this.validate();
				this.publishValue();
			}
		}
	}

	async validate() {
		updateHasValue(this.hasValue, this);
		if (!this.validator)
			return false;

		const valid = await this.validator.validate();
		return valid;
	}

	async publishValue(chain = []) {
		chain.push(this);
		let value = null;
		//if (this.condition)
		value = this.value;

		setTimeout(() => {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].valueChanged, chain);
		}, _Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"]);
	}

	acceptValue(value) {
		return true;
	}

	normalizeValue(value) {
		return value;
	}

	async updatedValue() { }
}
/* harmony default export */ __webpack_exports__["default"] = (BaseField);


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! exports provided: HTML_TAG_PREFIX, TRIGGER_TIMEOUT, EVENTHANDLE_TIMEOUT, NODENAMES, FORMSTATES, REQUIREDSTATES, EVENT_PREFIX, EVENTS, SPECIALVARS, ATTRIBUTE_NAME, ATTRIBUTE_STEP, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_REQUIRED, ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED, ATTRIBUTE_READONLY, ATTRIBUTE_NOVALUE, ATTRIBUTE_VALID, ATTRIBUTE_INVALID, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_MAX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTML_TAG_PREFIX", function() { return HTML_TAG_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIGGER_TIMEOUT", function() { return TRIGGER_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENTHANDLE_TIMEOUT", function() { return EVENTHANDLE_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODENAMES", function() { return NODENAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMSTATES", function() { return FORMSTATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUIREDSTATES", function() { return REQUIREDSTATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_PREFIX", function() { return EVENT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENTS", function() { return EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPECIALVARS", function() { return SPECIALVARS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_NAME", function() { return ATTRIBUTE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_STEP", function() { return ATTRIBUTE_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_USE_SUMMARY_PAGE", function() { return ATTRIBUTE_USE_SUMMARY_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_REQUIRED", function() { return ATTRIBUTE_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY", function() { return ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_CONDITION", function() { return ATTRIBUTE_CONDITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_ACTIVE", function() { return ATTRIBUTE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DISABLED", function() { return ATTRIBUTE_DISABLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_READONLY", function() { return ATTRIBUTE_READONLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_NOVALUE", function() { return ATTRIBUTE_NOVALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_VALID", function() { return ATTRIBUTE_VALID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_INVALID", function() { return ATTRIBUTE_INVALID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_CONDITION_VALID", function() { return ATTRIBUTE_CONDITION_VALID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_CONDITION_INVALID", function() { return ATTRIBUTE_CONDITION_INVALID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_MAX", function() { return ATTRIBUTE_MAX; });
const HTML_TAG_PREFIX = "d-";
const TRIGGER_TIMEOUT = 10;
const EVENTHANDLE_TIMEOUT = 10;

const NODENAMES = {
	Form: HTML_TAG_PREFIX + "form",
	Control: HTML_TAG_PREFIX + "control",
	BackButton: HTML_TAG_PREFIX + "control-back",
	NextButton: HTML_TAG_PREFIX + "control-next",
	SummaryButton: HTML_TAG_PREFIX + "control-summary",
	SubmitButton: HTML_TAG_PREFIX + "control-submit",
	CancelButton: HTML_TAG_PREFIX + "control-cancel",
	Page: HTML_TAG_PREFIX + "page",
	Field: HTML_TAG_PREFIX + "field",
	WrapperField: HTML_TAG_PREFIX + "wrapper-field",
	List: HTML_TAG_PREFIX + "list",
	ListRows: HTML_TAG_PREFIX + "rows",
	ListRow: HTML_TAG_PREFIX + "row",
	ButtonAddRow: HTML_TAG_PREFIX + "add-row",
	ButtonDeleteRow: HTML_TAG_PREFIX + "delete-row",
	Container: HTML_TAG_PREFIX + "container",
	Validation: HTML_TAG_PREFIX + "validation",
	Message: HTML_TAG_PREFIX + "message",
};
const FORMSTATES = {
	init: "init",
	input: "input",
	summary: "summary",
	submit: "submit",
	finished: "finished",
};

const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

const EVENT_PREFIX = HTML_TAG_PREFIX + "event-";

const EVENTS = {
	initialize: EVENT_PREFIX + "initialize",
	/* fired by change value from an field implementation 
	 * and consumed by the reference implementation of 
	 * BaseField to make validation and fire valueChanged 
	 * event
	 */
	input: EVENT_PREFIX + "input",
	/* internal event for publish that a value of field has changed (event after validation) */
	valueChanged: EVENT_PREFIX + "value-changed",
	/* internal event to start validation at elements -> only fired at form*/
	executeValidate: EVENT_PREFIX + "execute-validate",
	/* */
	activeStateChanged: EVENT_PREFIX + "active-state-changed",
	/* */
	conditionStateChanged: EVENT_PREFIX + "condition-state-changed",
	/* */
	validStateChanged: EVENT_PREFIX + "valid-state-changed",
    /* */
	siteChanged: EVENT_PREFIX + "site-changed",
	/* */
	formStateChanged: EVENT_PREFIX + "form-state-changed",
	/* */
	allPublishValue: EVENT_PREFIX + "all-publish-value",
	
	//old need to be refactored

	added: EVENT_PREFIX + "added",
	change: EVENT_PREFIX + "change",
	changeAttributeEventBuilder: (name) => {
		return EVENT_PREFIX + "change-attribute-" + name;
	},
	changeActive: EVENT_PREFIX + "change-active",
	changeValue: EVENT_PREFIX + "change-value",
	changeCondition: EVENT_PREFIX + "change-condition",
	changeValidation: EVENT_PREFIX + "change-validation",

	//LIST EVENTS
	listRowAdd: EVENT_PREFIX + "list-row-add",
	listRowDelete: EVENT_PREFIX + "list-row-delete",
};

const SPECIALVARS = {
	CURRENTVALUE: "$value",
	CURRENTLISTROW: "$item"
}

//ATTRIBUTES

const ATTRIBUTE_NAME = "name";
const ATTRIBUTE_STEP = "step";
const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
const ATTRIBUTE_REQUIRED = "required";
const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_DISABLED = "disabled";
const ATTRIBUTE_READONLY = "readonly";
const ATTRIBUTE_NOVALUE = "no-value";
const ATTRIBUTE_VALID = "valid";
const ATTRIBUTE_INVALID = "invalid";
const ATTRIBUTE_CONDITION_VALID = "condition-valid";
const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";
const ATTRIBUTE_MAX = "max";



/***/ }),

/***/ "./src/Container.js":
/*!**************************!*\
  !*** ./src/Container.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");





const ATTRIBUTES = [];

const NAME_SPLITTER = /\./g;

const valueHelper = function(data, name, value) {
	if (data == null || typeof data === "undefined")
		return null;

	const update = arguments.length > 2;

	const names = name.split(NAME_SPLITTER);
	while (names.length > 1) {
		const key = names.shift();
		let temp = data[key];
		const has = typeof temp !== "undefiend" && temp != null;
		if (!has && !update)
			return null;
		else if (!has && update)
			temp = data[key] = {};

		data = temp;
	}

	if (update)
		data[names[0]] = value;
	else
		return data[names[0]] ? data[names[0]] : null;
};

class Container extends _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	constructor(value = null) {
		super(value ? value : {});
		this.fields = [];

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].valueChanged,
			(event) => {
				if (event.target != this) {
					const { name, value } = event.target;

					if (name)
						valueHelper(this.__value__, name, value);
					else if (value != null)
						_default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge(this.__value__, value);

					this.validate();
					this.publishValue(event.detail[0]);

					event.preventDefault();
					event.stopPropagation();
				}
			}
		);
	}

	async init() {
		await this.initContainer();
	}

	async initContainer() {
		await this.initBaseField();

		this.fields = Object(_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__["findFields"])(this);
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].initialize, (event) => {
			if (event.target != this) {

				const field = event.target;
				if (field instanceof _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"]) {
					if (this.fields.indexOf(field) < 0) {
						this.fields.push(field);
					}

					event.preventDefault();
					event.stopPropagation();
				}
			}
		});

		this.validator.addCustomCheck(async ({ data, target }) => {
			const { fields } = target;
			if (fields) {
				const length = fields.length;
				for (let i = 0; i < length; i++) {
					const field = fields[i];
					if (field.condition && !field.valid) return false;
				}
			}

			return true;
		});
	}


	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	updatedValue(value) {
		this.__value__ = {};
		const { fields } = this;
		if (fields)
			for (let field of fields) {
				if (field.name) field.value = valueHelper(value, field.name);
				else if (field instanceof Container) field.value = value;
			}
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_1__["NODENAMES"].Container, Container);
/* harmony default export */ __webpack_exports__["default"] = (Container);


/***/ }),

/***/ "./src/Control.js":
/*!************************!*\
  !*** ./src/Control.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/controls/index.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Page */ "./src/Page.js");





const ATTRIBUTES = [];

const init = (control) => {
	control.form = control.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Form);
	control.back = control.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].BackButton).first();
	control.next = control.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].NextButton).first();
	control.summary = control.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].SummaryButton).first();
	control.submit = control.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].SubmitButton).first();

	control.form.on(
		[_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].validStateChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].conditionStateChanged],
		(event) => {
			if(event.target instanceof _Page__WEBPACK_IMPORTED_MODULE_3__["default"])
				control.update();
		}
	);

	control.form.on(
		[_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].formStateChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].siteChanged],
		(event) => {
			control.update();
		}
	);
};

class Control extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(control) {
		init(control);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Control.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].change);
		}
	}

	update() {
		const { back, next, summary, submit, form } = this;
		const { activePageIndex, activePage, nextPage, pages, useSummaryPage, state } = form;

		// basic control setup
		back.active = true;
		back.disabled = true;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].finished) {
			back.disabled = true;
			submit.active = true;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].summary) {
			back.disabled = false;
			submit.active = true;
			submit.disabled = !form.valid;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].input) {
			back.disabled = activePageIndex <= 0;
			
			if (nextPage || (!activePage.valid && (activePageIndex + 1 < pages.length))) {
				next.active = true;
				next.disabled = !activePage.valid;
			} else if (useSummaryPage && state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].input) {
				summary.active = true;
				summary.disabled = !activePage.valid;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}

	}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Control, Control);
/* harmony default export */ __webpack_exports__["default"] = (Control);


/***/ }),

/***/ "./src/Field.js":
/*!**********************!*\
  !*** ./src/Field.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrapper */ "./src/wrapper/index.js");




const ATTRIBUTES = ["file-format"];

class Field extends _BaseField__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	constructor() {
		super();
	}

	async init() {
		await this.initField();
	}

	async initField() {
		await this.initBaseField();
		this.wrapper = Object(_wrapper__WEBPACK_IMPORTED_MODULE_2__["findWrapper"])(this);
		if (this.wrapper)
			this.validator.addCustomCheck(async () => {
				return this.wrapper.valid;
			});
	}

	readonlyUpdated() {
		if (this.wrapper)
			this.wrapper.readonly = this.readonly;
	}

	acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	normalizeValue(value) {
		if (this.wrapper)
			return this.wrapper.normalizeValue(value);

		return value;
	}

	updatedValue(value) {
		if (this.wrapper)
			this.wrapper.updatedValue(value);
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Field, Field);
/* harmony default export */ __webpack_exports__["default"] = (Field);


/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Control */ "./src/Control.js");






const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_1__["ATTRIBUTE_NAME"], _Constants__WEBPACK_IMPORTED_MODULE_1__["ATTRIBUTE_USE_SUMMARY_PAGE"]];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};


const init = (form) => {
	form.state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].init;
	form.useSummaryPage = form.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_1__["ATTRIBUTE_USE_SUMMARY_PAGE"]);
	form.pages = form.find(_Constants__WEBPACK_IMPORTED_MODULE_1__["NODENAMES"].Page);
	form.activePageIndex = -1;
	if (form.pages.length > 0) form.toNextPage();
};

class Form extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(form) {
		init(form);
	}

	constructor() {
		super();
		this.__data__ = {};
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].init;
		this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_1__["ATTRIBUTE_USE_SUMMARY_PAGE"]);
		this.activePageIndex = -1;

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].valueChanged,
			(event) => {
				const { name, value } = event.target;
				if (name)
					this.__data__[name] = value
				else if (value != null)
					_default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge(this.__data__, value);

				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].executeValidate, event.detail[0]);

				event.preventDefault();
				event.stopPropagation();
			}
		);
	}

	connectedCallback() {
		Form.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].change);
		}
	}

	get state() {
		return this._state;
	}

	set state(state) {
		const actual = this.state;
		if (actual == _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input && state != _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input) readonly(this, true);
		else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input && state == _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input) {
			readonly(this, false);
			if (this.activePage)
				this.activePage.active = true;
		}
		this._state = state;

		if (actual != state)
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].formStateChanged);
	}

	get valid() {
		for (let page of this.pages) {
			if (!page.valid) return false;
		}

		return true;
	}

	get data() {
		return this.__data__;
	}

	set data(data) {
		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input) {
			this.__data__ = {};//data;
			for (let page of this.pages) {
				if (page.name)
					page.value = data[page.name];
				else
					page.value = data;
			}

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].allPublishValue);

		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__["EVENTS"].siteChanged);
		}
	}

	get prevPage() {
		const start = this.activePageIndex - 1;
		for (let i = start; i >= 0; i--) {
			const page = this.pages[i];
			if (page.condition) return page;
		}
		return null;
	}

	get nextPage() {
		if (this.pages) {
			const start = this.activePageIndex + 1;
			for (let i = start; i < this.pages.length; i++) {
				const page = this.pages[i];
				if (page.condition) return page;
			}
		}
		return null;
	}

	async toPrevPage() {
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].init)
				this._state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].input;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit()
		}
	}

	summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].summary;
	}

	submit() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__["FORMSTATES"].finished;
	}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_1__["NODENAMES"].Form, Form);
/* harmony default export */ __webpack_exports__["default"] = (Form);


/***/ }),

/***/ "./src/FormButton.js":
/*!***************************!*\
  !*** ./src/FormButton.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");


const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_DISABLED"]];

const init = (button) => {
	button.form = button.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Form);
	button.active = false;
	button.disabled = false;
	button.on("click", (event) => {
		if (button.active && !button.disabled) button.execute();
		event.preventDefault();
		event.stopPropagation();
	});
};

class FormButton extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(controlButton) {
		init(controlButton);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		FormButton.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"]);
	}

	set active(active) {
		active ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], null);
	}

	get disabled() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_DISABLED"]);
	}

	set disabled(disabled) {
		disabled ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_DISABLED"], "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_DISABLED"], null);
	}

	execute() {
		console.log("execute");
	}
}
/* harmony default export */ __webpack_exports__["default"] = (FormButton);


/***/ }),

/***/ "./src/List.js":
/*!*********************!*\
  !*** ./src/List.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _list_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/Row */ "./src/list/Row.js");
/* harmony import */ var _list_AddRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/AddRow */ "./src/list/AddRow.js");
/* harmony import */ var _list_DeleteRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/DeleteRow */ "./src/list/DeleteRow.js");
/* harmony import */ var _list_Rows__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list/Rows */ "./src/list/Rows.js");









const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_MAX"]];

const findAddButton = (list) => {
	return Object(_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__["treeFilter"])({
		root: list,
		filter: (element) => {
			if (element instanceof _list_AddRow__WEBPACK_IMPORTED_MODULE_5__["default"]) return { accept: true, stop: true };
			else if (element instanceof _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"]) return { accept: false, stop: true };
			return { accept: false };
		}
	})[0];
};

const createRow = (list, value) => {
	const { container, template } = list;
	const row = document.importNode(template.content, true).children[0];
	container.append(row);

	if (value) {
		setTimeout(() => {
			console.log("set value to row", { row, value });
			row.value = value;
		}, _Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"]);
	}

	return row;
};


class List extends _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	constructor(value = null) {
		super(value ? value : []);
		this.template = this.find("template").first();
		this.container = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ListRows).first();

		this.on([_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].valueChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].initialize],
			(event) => {
				if (event.target instanceof _list_Row__WEBPACK_IMPORTED_MODULE_4__["default"]) {
					const rows = this.rows;
					const row = event.target;
					const { value } = row;

					const index = rows.indexOf(row);
					this.__value__[index] = value;

					this.validate();
					this.publishValue(event.detail ? event.detail[0] : [row]);

					event.preventDefault();
					event.stopPropagation();
				}
			}
		);
	}

	async init() {
		this.initList();
	}

	async initList() {
		await this.initBaseField();
		const { container, template, validator } = this;
		const addButton = findAddButton(this);

		validator.addCustomCheck(async ({ }) => {
			const { rows, max, readonly } = this;
			const length = rows.length;
			if (!readonly) {
				if (length == max) addButton.disabled = true;
				else if (length < max) addButton.disabled = false;
			}
			return length <= max;
		});

		validator.addCustomCheck(async () => {
			const { rows } = this;
			if (rows)
				for (let row of rows) {
					if (!row.valid) return false;
				}

			return true;
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].listRowAdd, (event) => {
			const { readonly, __value__ } = this;
			if (!readonly) {
				const row = createRow(this);
				__value__.push(row.value);

				this.validate();
				this.publishValue();
			}
			event.preventDefault();
			event.stopPropagation();
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].listRowDelete, (event) => {
			const { rows, readonly, __value__ } = this;
			if (!readonly) {
				const row = event.target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ListRow);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();
					rows.splice(index, 1);
					__value__.splice(index, 1);

					this.validate();
					this.publishValue();
				}
			}
			event.preventDefault();
			event.stopPropagation();
		});

		this.validate();
		this.publishValue();
	}

	readonlyUpdated() {
		const { readonly } = this;
		for (let row of this.rows) {
			row.readonly = readonly;
		}
	}

	get rows() {
		return Array.from(this.container.children);
	}

	get max() {
		if (this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_MAX"])) return parseInt(this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_MAX"]));
		return Number.MAX_SAFE_INTEGER;
	}

	acceptValue(value) {
		return !value || value instanceof Array;
	}

	normalizeValue(value) {
		return value.filter((item) => !!item);
	}

	get value() {
		if (this.__value__.length > 0)
			return this.__value__;

		return null;
	}

	set value(value) {
		if (this.acceptValue(value)) {
			value = this.normalizeValue(value);

			this.container.children.remove();
			this.__value__ = [];
			if (value) {
				for (let val of value)
					createRow(this, val);
			}
		}
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].List, List);
/* harmony default export */ __webpack_exports__["default"] = (List);


/***/ }),

/***/ "./src/Message.js":
/*!************************!*\
  !*** ./src/Message.js ***!
  \************************/
/*! exports provided: ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION, findParentBase, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_ACTIVE", function() { return ATTRIBUTE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_CONDITION", function() { return ATTRIBUTE_CONDITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParentBase", function() { return findParentBase; });
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");







const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];

const findParentBase = (message) => {
	let parent = message.parentNode;
	while (parent) {
		if (parent instanceof _Base__WEBPACK_IMPORTED_MODULE_1__["default"]) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const init = (message) => {
	message.reference = findParentBase(message);
	message.form = message.parent(_Constants__WEBPACK_IMPORTED_MODULE_2__["NODENAMES"].Form);

	message.form.on(
		Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__["toEvents"])(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].executeValidate),
		(event) => {
			message.update();
		},
	);
	message.update();
};

class Message extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(message) {
		init(message);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Message.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].change);
		}
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active ? this.attr(ATTRIBUTE_ACTIVE, "") : this.attr(ATTRIBUTE_ACTIVE, undefined);
	}

	get condition() {
		return this.attr(ATTRIBUTE_CONDITION);
	}

	async update() {
		const data = Object(_utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__["evaluationData"])(this.reference);
		this.active = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(this.condition, data, false);
	}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_2__["NODENAMES"].Message, Message);
/* harmony default export */ __webpack_exports__["default"] = (Message);


/***/ }),

/***/ "./src/Page.js":
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container */ "./src/Container.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_STEP"]];

class Page extends _Container__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Container__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	constructor() {
		super();
	}

	async init() {
		await this.initPage();
	}

	async initPage() {
		await this.initContainer();
	}	
	
	conditionUpdated(){}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Page, Page);
/* harmony default export */ __webpack_exports__["default"] = (Page);


/***/ }),

/***/ "./src/Validation.js":
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
/*! exports provided: ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_ACTIVE", function() { return ATTRIBUTE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_CONDITION", function() { return ATTRIBUTE_CONDITION; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");


const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];

const init = (validation) => {
	validation.active = false;
};

class Validation extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(validation) {
		init(validation);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Validation.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].change);
		}
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active ? this.attr(ATTRIBUTE_ACTIVE, "") : this.attr(ATTRIBUTE_ACTIVE, undefined);
	}

	get condition() {
		return this.attr(ATTRIBUTE_CONDITION);
	}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Validation, Validation);
/* harmony default export */ __webpack_exports__["default"] = (Validation);


/***/ }),

/***/ "./src/Validator.js":
/*!**************************!*\
  !*** ./src/Validator.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validation */ "./src/Validation.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");








class Validator {
	constructor(base) {
		this.inital = true;
		this.target = base;
		this.customChecks = [];
		this.validations = Object(_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_4__["findValidations"])(base) || [];
		this.condition = base.attr(_Constants__WEBPACK_IMPORTED_MODULE_1__["ATTRIBUTE_CONDITION"]);

	}

	addCustomCheck(check) {
		this.customChecks.push(check);
	}

	get form() {
		return this.target.form;
	}

	async validate() {
		const { target, validations, customChecks, condition } = this;
		const { hasValue, required, requiredOnlyOnActive } = target;
		const hasChecks = customChecks.length > 0 || validations.length > 0;
		const data = Object(_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__["evaluationData"])(target);
		

		const conditionValid = condition ? await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(condition, data, false) : true;
		Object(_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__["updateConditionState"])(target, conditionValid, this.inital);


		let valid = required ? hasValue : true;
			
		if (valid)
			for (let check of customChecks) {
				const test = await check({ data, target });
				if (!test) valid = false;
			}

		for (let validation of validations) {
			if (valid && hasValue) {
				const test = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(validation.condition, data, true);
				validation.active = !test;
				if (!test) valid = false;
			} else
				validation.active = false;
		}

		Object(_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__["updateValidState"])(target, valid, this.inital);
		this.inital = false;

		return valid;
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Validator);


/***/ }),

/***/ "./src/controls/BackButton.js":
/*!************************************!*\
  !*** ./src/controls/BackButton.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");



const ATTRIBUTES = [];
class BackButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toPrevPage();
	}
}
/* harmony default export */ __webpack_exports__["default"] = (BackButton);
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].BackButton, BackButton);


/***/ }),

/***/ "./src/controls/NextButton.js":
/*!************************************!*\
  !*** ./src/controls/NextButton.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");



const ATTRIBUTES = [];
class NextButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ __webpack_exports__["default"] = (NextButton);
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].NextButton, NextButton);


/***/ }),

/***/ "./src/controls/SubmitButton.js":
/*!**************************************!*\
  !*** ./src/controls/SubmitButton.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");



const ATTRIBUTES = [];
class SubmitButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
	}

	constructor() {
		super();
	}
	execute() {
		this.form.submit();
	}
}
/* harmony default export */ __webpack_exports__["default"] = (SubmitButton);
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].SubmitButton, SubmitButton);


/***/ }),

/***/ "./src/controls/SummaryButton.js":
/*!***************************************!*\
  !*** ./src/controls/SummaryButton.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");



const ATTRIBUTES = [];
class SummaryButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
	}

	constructor() {
		super();
	}
	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ __webpack_exports__["default"] = (SummaryButton);
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].SummaryButton, SummaryButton);


/***/ }),

/***/ "./src/controls/index.js":
/*!*******************************!*\
  !*** ./src/controls/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BackButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackButton */ "./src/controls/BackButton.js");
/* harmony import */ var _NextButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NextButton */ "./src/controls/NextButton.js");
/* harmony import */ var _SummaryButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SummaryButton */ "./src/controls/SummaryButton.js");
/* harmony import */ var _SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitButton */ "./src/controls/SubmitButton.js");





/* harmony default export */ __webpack_exports__["default"] = ({
	BackButton: _BackButton__WEBPACK_IMPORTED_MODULE_0__["default"],
	NextButton: _NextButton__WEBPACK_IMPORTED_MODULE_1__["default"],
	SummaryButton: _SummaryButton__WEBPACK_IMPORTED_MODULE_2__["default"],
	SubmitButton: _SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"],
});


/***/ }),

/***/ "./src/list/AddRow.js":
/*!****************************!*\
  !*** ./src/list/AddRow.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");




const ATTRIBUTES = [];
class AddRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	
	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
		button.active	= true;
	}

	constructor() {
		super();	
	}

	connectedCallback() {
		AddRow.init(this);
	}

	execute(){
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].listRowAdd);
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ButtonAddRow, AddRow);
/* harmony default export */ __webpack_exports__["default"] = (AddRow);


/***/ }),

/***/ "./src/list/DeleteRow.js":
/*!*******************************!*\
  !*** ./src/list/DeleteRow.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");



const ATTRIBUTES = [];

class DeleteRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(button) {
		_FormButton__WEBPACK_IMPORTED_MODULE_1__["default"].init(button);
		button.active	= true;
	}

	constructor() {
		super();
	}

	connectedCallback() {
		DeleteRow.init(this);
	}

	execute() {
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].listRowDelete);
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ButtonDeleteRow, DeleteRow);
/* harmony default export */ __webpack_exports__["default"] = (DeleteRow);


/***/ }),

/***/ "./src/list/Row.js":
/*!*************************!*\
  !*** ./src/list/Row.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Container */ "./src/Container.js");
/* harmony import */ var _DeleteRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeleteRow */ "./src/list/DeleteRow.js");




const ATTRIBUTES = [];

class ListRow extends _Container__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Container__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}
	
	constructor() {
		super();
	}

	get active() {
		return true;
	}
	set active(active) {}

	get condition() {
		return true;
	}

	get name() {
		return null;
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ListRow, ListRow);
/* harmony default export */ __webpack_exports__["default"] = (ListRow);


/***/ }),

/***/ "./src/list/Rows.js":
/*!**************************!*\
  !*** ./src/list/Rows.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");



const ATTRIBUTES = [];

const init = (element) => {
};

class ListRows extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(listRows){
		init(listRows);
	}

	constructor() {
		super();		
	}

	connectedCallback() {
		ListRows.init(this);
	}
}

customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ListRows, ListRows);
/* harmony default export */ __webpack_exports__["default"] = (ListRows);


/***/ }),

/***/ "./src/utils/DataHelper.js":
/*!*********************************!*\
  !*** ./src/utils/DataHelper.js ***!
  \*********************************/
/*! exports provided: evaluationData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaluationData", function() { return evaluationData; });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");



const evaluationData = (base) => {
	const data = {};
	data[_Constants__WEBPACK_IMPORTED_MODULE_1__["SPECIALVARS"].CURRENTVALUE] = base.value;

	let row = base.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__["NODENAMES"].ListRow);
	let temp = data;
	while (row) {
		temp[_Constants__WEBPACK_IMPORTED_MODULE_1__["SPECIALVARS"].CURRENTLISTROW] = row.value
		temp = temp[_Constants__WEBPACK_IMPORTED_MODULE_1__["SPECIALVARS"].CURRENTLISTROW];
		row = row.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__["NODENAMES"].ListRow);
	}

	return _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge( data,base.form.data);
}

/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/*! exports provided: toEvents, toTimeoutHandle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toEvents", function() { return toEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTimeoutHandle", function() { return toTimeoutHandle; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const toEvents = function() {
    return Array.from(arguments).join(" ");
};

const toTimeoutHandle = (handle, preventDefault, stopPropagation) => {
    let timeout = null;
    return function(event) {
        if(timeout)
            clearTimeout(timeout);

        timeout = setTimeout(function() {
            timeout = null;
            handle(event);
        }, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTHANDLE_TIMEOUT"]);

        if(preventDefault)
            event.preventDefault();
        if(stopPropagation)
            event.stopPropagation();
    }
};

/***/ }),

/***/ "./src/utils/NodeHelper.js":
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
/*! exports provided: treeFilter, findFields, findValidations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treeFilter", function() { return treeFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFields", function() { return findFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findValidations", function() { return findValidations; });
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseField */ "./src/BaseField.js");
/* harmony import */ var _Validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Validation */ "./src/Validation.js");



const treeFilter = ({ root, filter }) => {
	let elements = [];
	root.children.forEach((element) => {
		const { accept, stop = false } = filter(element);

		if (accept) elements.push(element);

		if (!stop) {
			const result = treeFilter({ root: element, filter });
			if (result instanceof Array) elements = elements.concat(result);
			else if (result) elements.push(result);
		}
	});

	return elements;
};

const findFields = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (element instanceof _BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]) return { accept: true, stop: true };
			return { accept: false };
		},
	});
};

const findValidations = (root) => {
	return treeFilter({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof _BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]) return { accept: false, stop: true };
				else if (element instanceof _Validation__WEBPACK_IMPORTED_MODULE_1__["default"]) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};


/***/ }),

/***/ "./src/utils/StateHelper.js":
/*!**********************************!*\
  !*** ./src/utils/StateHelper.js ***!
  \**********************************/
/*! exports provided: updateValidState, updateConditionState, updateActiveState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateValidState", function() { return updateValidState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateConditionState", function() { return updateConditionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateActiveState", function() { return updateActiveState; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const updateValidState = (target, valid, initial = false) => {
	const oldState = target.valid;
	if (typeof valid === "undefined" || valid == null) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_INVALID"], null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_VALID"], null);
	} else if (valid) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_INVALID"], null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_VALID"], "");
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_INVALID"], "");
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_VALID"], null);
	}
	
	if (oldState != valid || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].validStateChanged);
};

const updateConditionState = (target, valid, initial = false) => {
	const oldState = target.condition;
	if (valid) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_INVALID"], null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_VALID"], "");
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_VALID"], null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_CONDITION_INVALID"], "");
	}
	if (oldState != valid || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].conditionStateChanged);
};

const updateActiveState = (target, active, initial = false) => {
	const oldState = target.active;
	active ? target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], "") : target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], null);
	if (oldState != active || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].activeStateChanged);
};

/***/ }),

/***/ "./src/wrapper/Checkbox.js":
/*!*********************************!*\
  !*** ./src/wrapper/Checkbox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Checkbox; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");




const INPUTSELECTOR = 'input[type="checkbox"]';


class Checkbox extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static findInput(field) {
		const input = field.find(INPUTSELECTOR);
		if (input.length == 0)
			return null;
			
		return input.length == 1 ? input.first() : input;
	}

	constructor(field, input) {
		super(field, input);
	}

	init() {
		const { field, input } = this;
		this.multiple = input instanceof NodeList;
		input.on(
			"input",
			Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
				},
				false,
				true
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		const value = this.input.val();
		if (!(value instanceof Map)) return value;
		if (value.size == 0) return null;

		const values = [];
		value.forEach((value) => {
			values.push(value);
		});

		return values;
	}

	normalizeValue(value) {
		if (value) {
			if (this.multiple) {
				value = value.filter((item) => !!item);
				return value.length != 0 ? value : null;
			} else {
				return value;
			}
		}

		return null;
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;
		else if (this.multiple)
			return value instanceof Array;
		else{
			const type = typeof value;
			return type === "string" || type === "boolean";
		}
	}

	updatedValue(value) {
		if (this.field.value != this.value)
			this.input.val(value ? value : null);
	}
}


/***/ }),

/***/ "./src/wrapper/File.js":
/*!*****************************!*\
  !*** ./src/wrapper/File.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return File; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");




const INPUTSELECTOR = 'input[type="file"]';

const readFile = (file, readFnName) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("loadend", () => {
			resolve({
				name: file.name,
				type: file.type,
				size: file.size,
				data: reader.result
			});
		}, false);
		reader[readFnName](file);
	});
};

//readAsDataURL

const FORMAT = {
	"form-input": async (file) => {
		file.format = "form-input";
		return file;
	},
	"data-url-base64": async (file) => {
		const result = await readFile(file, "readAsDataURL");
		result.format = "data-url-base64";
		return result;
	},
	"base64": async (file) => {
		const result = await readFile(file, "readAsDataURL");
		result.data = result.data.substr(result.data.indexOf(",") + 1);
		result.format = "base64";
		return result;
	}
};

const readFiles = async (files, format, multiple) => {
	let result = [];
	for (let file of files)
		result.push(await FORMAT[format](file));

	if (result.length == 0)
		return null;


	return multiple ? result : result[0];
};



class File extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static findInput(field) {
		return field.find(INPUTSELECTOR).first();
	}

	constructor(field, input) {
		super(field, input);
	}

	async init() {
		const { field, input } = this;
		this.multiple = input.multiple;
		this.format = field.attr("file-format") || "form-input";
		this.filenameTarget = field.attr("file-name-target");
		this.filenameTarget = this.filenameTarget ? field.find(this.filenameTarget).first() : null;
		const { format, multiple } = this;

		input.on(
			"input",
			Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
				async () => {
					this.updatedValue(await readFiles(input.files, format, multiple));
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.value);
				},
				false,
				true
			)
		);

		if (input.files && input.files.length != 0)
			this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.value);
	};

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}



	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;
		else if (this.multiple)
			return value instanceof Array;
		else
			return value instanceof "object";
	}

	normalizeValue(value) {
		if (value == null || typeof value === "undefined")
			return null;
		else if (this.multiple)
			return value.length != 0 ? value : null;
		else
			return value;
	}

	updatedValue(value) {
		if (value != this.__value__) {
			this.__value__ = value;

			if (this.filenameTarget && value) {
				if (this.multiple) {
					for (let file of value) {
						this.filenameTarget.append(`<span>${file.name}</span>`);
					}
				}
				else {
					this.filenameTarget.append(`<span>${value.name}</span>`);
				}
			}

		}
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.__value__;
	}

	get valid() {
		return this.input.checkValidity();
	}
}


/***/ }),

/***/ "./src/wrapper/Radio.js":
/*!******************************!*\
  !*** ./src/wrapper/Radio.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Radio; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");




const INPUTSELECTOR = 'input[type="radio"]';

const getRandomInt = () => {
	return Math.floor(Math.random() * Date.now());
};

const init = (wrapper) => {
	const { field } = wrapper;
	const name = field.name + getRandomInt();
	const input = (wrapper.input = field.find(INPUTSELECTOR));
	for (let radio of input) radio.name = name;
	input.on(
		"change",
		Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
			() => {
				field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].changeValue);
			}
		)
	);
};

class Radio extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static findInput(field) {
		const input = field.find(INPUTSELECTOR);
		if (input.length == 0)
			return null;

		return input;
	}

	constructor(field, input) {
		super(field, input);
	}

	init() {
		const { field, input } = this;
		const name = field.name + getRandomInt();
		for (let radio of input) radio.name = name;
		input.on(
			"input",
			Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
				},
				false,
				true
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
	}


	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		const value = this.input.val();
		if (!(value instanceof Map)) return value;
		if (value.size == 0) return null;
		return value.values().next().value;
	}

	normalizeValue(value) {
		if (value)
			return value;

		return null;
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;
		else{
			const type = typeof value;
			return type === "string" || type === "boolean";
		}
	}

	updatedValue(value) {
		if (this.field.value != this.value)
			this.input.val(value ? value : null);
	}
}


/***/ }),

/***/ "./src/wrapper/Select.js":
/*!*******************************!*\
  !*** ./src/wrapper/Select.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");




const INPUTSELECTOR = 'select';

class Text extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static findInput(field) {
		return field.find(INPUTSELECTOR).first();
	}

	constructor(field, input) {
		super(field, input);
	}

	init() {
		const { field, input } = this;
		input.on(
			"input, changed",
			Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.value);
				},
				false,
				true
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.value);
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.normalizeValue(this.input.multiple ? this.input.val() : this.input.value);
	}
	
	normalizeValue(value) {
		if (value) {
			if(this.input.multiple){
				value = value.filter((item) => item && item.trim().length > 0);
				return value.length != 0 ? value : null;
			} else{
				value = value.trim();
				return value.length != 0 ? value : null;	
			}				
		}
		
		return null;
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;
		else if (this.input.multiple)
			return value instanceof Array;
		else
			return typeof value === "string";
	}

	updatedValue(value) {
		if (this.field.value != this.value)
			this.input.val(value ? value : null);
	}
}


/***/ }),

/***/ "./src/wrapper/Text.js":
/*!*****************************!*\
  !*** ./src/wrapper/Text.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");




const INPUTSELECTOR = 'input:not([type=\"file\"]):not([type=\"radio\"]):not([type=\"checkbox\"]) ,input:not([type]), textarea';

const DEFAULTTYPE = "text";


const text = {
	accept: (value) => { return typeof value === "string" },
	value: (input) => { return input.value; },
	normalize: (value) => {
		if (value) {
			value = value.trim();
			return value.length > 0 ? value : null;
		}
		
		return null;
	}
};
const number = {
	accept: (value) => { return typeof value === "number"; },
	value: (input) => { return input.valueAsNumber; },
	normalize: (value) => {
		if (value && !Number.isNaN(value))
			return value;
			
		return null;
	}
};
const date = {
	accept: (value) => { return value instanceof Date },
	value: (input) => { return input.valueAsDate; },
	normalize: (value) => {
		if(value)
			return value;
	
		return null;
	}
};
const TYPES = { text, number, date, time: date };

class Text extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {

	static findInput(field) {
		return field.find(INPUTSELECTOR).first();
	}

	constructor(field, input) {
		super(field, input);
	}

	init() {
		const { field, input } = this;
		const type = (field.attr("input-type") || input.attr("type") || DEFAULTTYPE).trim().toLowerCase();
		this.type = TYPES[type] || TYPES[DEFAULTTYPE];
		input.on(
			"input",
			Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__["toTimeoutHandle"])(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
				},
				false,
				true
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].input, this.normalizeValue(this.value));
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;

		return this.type.accept(value);
	}

	normalizeValue(value) {
		if (value == null && typeof value === "undefined")
			return null;

		return this.type.normalize(value);
	}
	updatedValue(value) {
		if (this.field.value != this.input.value)
			this.input.val(value ? value : null);
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.type.value(this.input);
	}

	get valid() {
		return this.input.checkValidity();
	}
}


/***/ }),

/***/ "./src/wrapper/Wrapper.js":
/*!********************************!*\
  !*** ./src/wrapper/Wrapper.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Wrapper; });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Field */ "./src/Field.js");


class Wrapper {
	
	static findInput(field){ return null;}
	
	constructor(field, input) {
		this.field = field;
		this.input = input;
		this.init();
	}

	init() { }

	set readonly(disabled) { }

	acceptValue(value) {
		return true;
	}

	normalizeValue(value) {
		return value;
	}

	updatedValue() {

	}
	
	get value(){
		return null;
	}
	
	get valid(){
		return true;
	}
}


/***/ }),

/***/ "./src/wrapper/index.js":
/*!******************************!*\
  !*** ./src/wrapper/index.js ***!
  \******************************/
/*! exports provided: wrappers, findWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrappers", function() { return wrappers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findWrapper", function() { return findWrapper; });
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ "./src/wrapper/Text.js");
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox */ "./src/wrapper/Checkbox.js");
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Radio */ "./src/wrapper/Radio.js");
/* harmony import */ var _File__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./File */ "./src/wrapper/File.js");
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Select */ "./src/wrapper/Select.js");






const wrappers = [_Text__WEBPACK_IMPORTED_MODULE_0__["default"], _Checkbox__WEBPACK_IMPORTED_MODULE_1__["default"], _Radio__WEBPACK_IMPORTED_MODULE_2__["default"], _File__WEBPACK_IMPORTED_MODULE_3__["default"], _Select__WEBPACK_IMPORTED_MODULE_4__["default"]];

const findWrapper = (field) => {
	for (let wrapper of wrappers) {
		const input = wrapper.findInput(field);
		if (input) return new wrapper(field, input);
	}

	return null;
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmFzZUZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29udHJvbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm1CdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbHMvQmFja0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbHMvU3VibWl0QnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9scy9TdW1tYXJ5QnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlzdC9BZGRSb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpc3QvRGVsZXRlUm93LmpzIiwid2VicGFjazovLy8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlzdC9Sb3dzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9EYXRhSGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvTm9kZUhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvU3RhdGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvRmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd3JhcHBlci9SYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd3JhcHBlci9XcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy93cmFwcGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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bGUiOiJtb2R1bGUtZGVmYXVsdGpzLWh0bWwtZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbW9kdWxlLmpzXCIpO1xuIiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuXG5leHBvcnQge0Zvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIExpc3QsIENvbnRhaW5lcn07IiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsXCI7XG5pbXBvcnQge0Zvcm0sIEZpZWxkfSBmcm9tIFwiLi9pbmRleFwiXG5cbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sID0gR0xPQkFMLmRlZmF1bHRqcy5odG1sIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sLmZvcm0gPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwuZm9ybSB8fCB7XG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcblx0Rm9ybSxcblx0RmllbGRcbn07IiwiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcclxuXHRpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsO1xyXG5cdGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB3aW5kb3c7XHRcclxuXHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0cmV0dXJuIHt9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR0xPQkFMOyIsIlxyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICogXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKiAgXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBhcHBlbmQgPSBmdW5jdGlvbihhS2V5LCBhRGF0YSwgYU9iamVjdCl7XHJcblx0aWYodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKXtcdFx0XHJcblx0XHRjb25zdCBrZXkgPSBhS2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1x0XHJcblx0XHRpZih0eXBlb2YgYU9iamVjdFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRhT2JqZWN0W2tleV0gPSBhRGF0YTtcclxuXHRcdGVsc2V7XHRcdFxyXG5cdFx0XHRjb25zdCBkYXRhID0gYU9iamVjdFtrZXldO1xyXG5cdFx0XHRpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0ZGF0YS5wdXNoKGFEYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFPYmplY3Rba2V5XSA9IFthT2JqZWN0W2tleV0sIGFEYXRhXTtcclxuXHRcdH1cclxuXHR9XHRcclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqIFxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqIFxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uKGFPYmplY3Qpe1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyIFxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKiBcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqIFxyXG4gKiBAcGFyYW0gYVRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBhU291cmNlczpvYmplY3RcclxuICogXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmNvbnN0IG1lcmdlID0gZnVuY3Rpb24oYVRhcmdldCl7XHRcclxuXHRmb3IobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChhS2V5ID0+IHtcclxuXHRcdFx0aWYoaXNQb2pvKGFUYXJnZXRbYUtleV0pKVxyXG5cdFx0XHRcdG1lcmdlKGFUYXJnZXRbYUtleV0sIHNvdXJjZVthS2V5XSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRhVGFyZ2V0W2FLZXldID0gc291cmNlW2FLZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvIDogaXNQb2pvLFxyXG5cdGFwcGVuZDogYXBwZW5kLFxyXG5cdG1lcmdlIDogbWVyZ2VcclxufTsiLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xuXHRcdHRoaXMua2V5ID0ga2V5O1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdH1cblx0XG5cdGdldCBrZXlEZWZpbmVkKCl7XG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXG5cdH1cblx0XG5cdGdldCBoYXNWYWx1ZSgpe1xuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xuXHR9XG5cdFxuXHRzZXQgdmFsdWUoZGF0YSl7XG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XG5cdH1cblx0XG5cdHNldCBhcHBlbmQoZGF0YSkge1xuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xuXHRcdH1cblx0fVxuXHRcblx0cmVtb3ZlKCl7XG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcblx0XHRcdFx0aWYoIWNyZWF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xuXHR9XG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICogXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKiAgXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24oYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSlcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqIFxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqIFxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbihhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXIgXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqIFxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICogXHJcbiAqIEBwYXJhbSBhVGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIGFTb3VyY2VzOm9iamVjdFxyXG4gKiBcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24oYVRhcmdldCkge1xyXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goYUtleSA9PiB7XHJcblx0XHRcdGlmIChpc1Bvam8oYVRhcmdldFthS2V5XSkpXHJcblx0XHRcdFx0bWVyZ2UoYVRhcmdldFthS2V5XSwgc291cmNlW2FLZXldKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFUYXJnZXRbYUtleV0gPSBzb3VyY2VbYUtleV07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbih7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwge2RlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpXHJcblx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCJcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XHJcblx0XHRcdFx0fHwgdmFsdWUgaW5zdGFuY2VvZiBNYXBcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldFxyXG5cdFx0XHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwXHJcblx0XHRcdFx0fHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV1cclxuXHRcdFx0XHR8fCB2YWx1ZSA9PSBkYXRhKVxyXG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7ZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiAgcGFyZW50cy5jb25jYXQoZGF0YSl9KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvLFxyXG5cdGFwcGVuZCxcclxuXHRtZXJnZSxcclxuXHRmaWx0ZXIsXHJcblx0YnVpbGRQcm9wZXJ0eUZpbHRlclxyXG59OyIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcbi8qXHJcbiAqIDEgOiByZXNvbHZlciBmaWx0ZXJcclxuICogMiA6IHJlc29sdmVyIG5hbWVcclxuICogMyA6IGV4cHJlc3Npb25cclxuICovXHJcbmNvbnN0IEVYUFJFU1NJT04gPSAvXFwkXFx7KChbYS16QS1aMC05XFwtX1xcc10rKTo6KT8oW15cXHtcXH1dKylcXH0vO1xyXG5jb25zdCBERUZBVUxUX05PVF9ERUZJTkVEID0gbmV3IERlZmF1bHRWYWx1ZSgpO1xyXG5jb25zdCB0b0RlZmF1bHRWYWx1ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUpXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdHJldHVybiBuZXcgRGVmYXVsdFZhbHVlKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGUgPSBmdW5jdGlvbihhU3RhdGVtZW50LCBhQ29udGV4dCkge1xyXG5cdGlmICh0eXBlb2YgYVN0YXRlbWVudCAhPT0gXCJzdHJpbmdcIilcclxuXHRcdHJldHVybiBhU3RhdGVtZW50O1xyXG5cdFx0XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbihcImNvbnRleHRcIiwgYHRyeXt3aXRoKGNvbnRleHQpe3JldHVybiAke2FTdGF0ZW1lbnR9fX1jYXRjaChlKXt0aHJvdyBlO31gKTtcclxuXHRyZXR1cm4gZXhwcmVzc2lvbihhQ29udGV4dCk7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlID0gYXN5bmMgZnVuY3Rpb24oYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKVxyXG5cdFx0cmV0dXJuIGFSZXNvbHZlci5wYXJlbnQgPyByZXNvbHZlKGFSZXNvbHZlci5wYXJlbnQsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkgOiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoYUV4cHJlc3Npb24sIGFSZXNvbHZlci5wcm94eS5kYXRhKTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHRlbHNlIGlmIChhRGVmYXVsdCBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSAmJiBhRGVmYXVsdC5oYXNWYWx1ZSlcclxuXHRcdHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlKHRoaXMsIG1hdGNoWzNdLCBub3JtYWxpemUobWF0Y2hbMl0pLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIGF3YWl0IHJlc29sdmUodGhpcywgbm9ybWFsaXplKGFFeHByZXNzaW9uKSwgbnVsbCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcImVycm9yIGF0IGV4ZWN1dGluZyBzdGF0bWVudFxcXCJcIiwgYUV4cHJlc3Npb24sIFwiXFxcIjpcIiwgZSk7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWUuaGFzVmFsdWUgPyBkZWZhdWx0VmFsdWUudmFsdWUgOiBhRXhwcmVzc2lvbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhRGVmYXVsdCkge1xyXG5cdFx0bGV0IHRleHQgPSBhVGV4dDtcclxuXHRcdGxldCB0ZW1wID0gYVRleHQ7IC8vIHJlcXVpcmVkIHRvIHByZXZlbnQgaW5maW5pdHkgbG9vcFxyXG5cdFx0bGV0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRleHQpO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRFxyXG5cdFx0d2hpbGUgKG1hdGNoICE9IG51bGwpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXNvbHZlKG1hdGNoWzBdLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHR0ZW1wID0gdGVtcC5zcGxpdChtYXRjaFswXSkuam9pbigpOyAvLyByZW1vdmUgY3VycmVudCBtYXRjaCBmb3IgbmV4dCBsb29wXHJcblx0XHRcdHRleHQgPSB0ZXh0LnNwbGl0KG1hdGNoWzBdKS5qb2luKHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKHJlc3VsdCA9PSBudWxsID8gXCJudWxsXCIgOiByZXN1bHQpKTtcclxuXHRcdFx0bWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGVtcCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGV4dDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmUoYUV4cHJlc3Npb24sIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmUoYUV4cHJlc3Npb24sIGRlZmF1bHRWYWx1ZSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBidWlsZFNlY3VyZSh7Y29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9uPXtkZWVwOnRydWV9LCBuYW1lLCBwYXJlbnR9KXtcclxuXHRcdGNvbnRleHQgPSBPYmplY3RVdGlscy5maWx0ZXIoe2RhdGE6IGNvbnRleHQsIHByb3BGaWx0ZXIsIG9wdGlvbn0pO1xyXG5cdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoe2NvbnRleHQsIG5hbWUsIHBhcmVudH0pO1xyXG5cdH1cclxufTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSwgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEXTtcblxuY2xhc3MgQmFzZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlKCk7XG5cdH1cblxuXHRhc3luYyBpbml0QmFzZSgpIHtcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5pbml0KCkpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuaW5pdGlhbGl6ZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGFkb3B0ZWRDYWxsYmFjaygpIHtcblx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2UpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdFx0dGhpcy5hY3RpdmVVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0YWN0aXZlVXBkYXRlZCgpIHtcblx0fVxuXG5cdGdldCByZWFkb25seSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkgeyB9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge1xuXG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSwgQVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSBcIi4vVmFsaWRhdG9yXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEZpZWxkID0gKGZpZWxkKSA9PiB7XG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHBhcmVudDtcblxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XG5cdGZpZWxkLmF0dHIoQVRUUklCVVRFX05PVkFMVUUsICFoYXNWYWx1ZSA/IFwiXCIgOiBudWxsKTtcbn1cblxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX192YWx1ZV9fID0gdmFsdWU7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHRoaXMuaW5pdEJhc2VGaWVsZCgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdEJhc2VGaWVsZCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlKCk7XG5cblx0XHR0aGlzLnBhcmVudEZpZWxkID0gZmluZFBhcmVudEZpZWxkKHRoaXMpO1xuXHRcdHRoaXMudmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcih0aGlzKTtcblxuXHRcdHRoaXMub24oRVZFTlRTLmNvbmRpdGlvblN0YXRlQ2hhbmdlZCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMpIHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5pbnB1dCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMpIHtcblx0XHRcdFx0XHR0aGlzLl9fdmFsdWVfXyA9IGV2ZW50LmRldGFpbCA/IGV2ZW50LmRldGFpbFswXSA6IG51bGw7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XHJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0aGlzLmZvcm0ub24oXG5cdFx0XHRFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLFxuXHRcdFx0YXN5bmMgKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBldmVudC5kZXRhaWxbMF07XG5cdFx0XHRcdGlmIChjaGFpbi5pbmRleE9mKHRoaXMpIDwgMCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLnZhbGlkO1xuXHRcdFx0XHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50ICE9IHZhbGlkKVxuXHRcdFx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0XG5cdFx0dGhpcy5mb3JtLm9uKEVWRU5UUy5hbGxQdWJsaXNoVmFsdWUsICgpPT4ge1xuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMudmFsaWRhdGUoKTtcblx0fVxuXG5cdGNvbmRpdGlvblVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5hY3RpdmUgPSB0aGlzLmNvbmRpdGlvbjtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfTkFNRSk7XG5cdH1cblxuXHRnZXQgcmVxdWlyZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRVFVSVJFRCk7XG5cdH1cblxuXHRnZXQgaGFzVmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXHRcdHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fX3ZhbHVlX187XHJcblx0fVxuXG5cdHNldCB2YWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLl9fdmFsdWVfXyAhPSB2YWx1ZSAmJiB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblx0XHRcdGlmICh0aGlzLl9fdmFsdWVfXyAhPSB2YWx1ZSkge1xuXHRcdFx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcblx0XHR1cGRhdGVIYXNWYWx1ZSh0aGlzLmhhc1ZhbHVlLCB0aGlzKTtcblx0XHRpZiAoIXRoaXMudmFsaWRhdG9yKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXG5cdGFzeW5jIHB1Ymxpc2hWYWx1ZShjaGFpbiA9IFtdKSB7XG5cdFx0Y2hhaW4ucHVzaCh0aGlzKTtcblx0XHRsZXQgdmFsdWUgPSBudWxsO1xuXHRcdC8vaWYgKHRoaXMuY29uZGl0aW9uKVxuXHRcdHZhbHVlID0gdGhpcy52YWx1ZTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy52YWx1ZUNoYW5nZWQsIGNoYWluKTtcblx0XHR9LCBUUklHR0VSX1RJTUVPVVQpO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkgeyB9XG59XG5leHBvcnQgZGVmYXVsdCBCYXNlRmllbGQ7XG4iLCJleHBvcnQgY29uc3QgSFRNTF9UQUdfUFJFRklYID0gXCJkLVwiO1xuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX1RJTUVPVVQgPSAxMDtcblxuZXhwb3J0IGNvbnN0IE5PREVOQU1FUyA9IHtcblx0Rm9ybTogSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtXCIsXG5cdENvbnRyb2w6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbFwiLFxuXHRCYWNrQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtYmFja1wiLFxuXHROZXh0QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtbmV4dFwiLFxuXHRTdW1tYXJ5QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtc3VtbWFyeVwiLFxuXHRTdWJtaXRCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1zdWJtaXRcIixcblx0Q2FuY2VsQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtY2FuY2VsXCIsXG5cdFBhZ2U6IEhUTUxfVEFHX1BSRUZJWCArIFwicGFnZVwiLFxuXHRGaWVsZDogSFRNTF9UQUdfUFJFRklYICsgXCJmaWVsZFwiLFxuXHRXcmFwcGVyRmllbGQ6IEhUTUxfVEFHX1BSRUZJWCArIFwid3JhcHBlci1maWVsZFwiLFxuXHRMaXN0OiBIVE1MX1RBR19QUkVGSVggKyBcImxpc3RcIixcblx0TGlzdFJvd3M6IEhUTUxfVEFHX1BSRUZJWCArIFwicm93c1wiLFxuXHRMaXN0Um93OiBIVE1MX1RBR19QUkVGSVggKyBcInJvd1wiLFxuXHRCdXR0b25BZGRSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiYWRkLXJvd1wiLFxuXHRCdXR0b25EZWxldGVSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiZGVsZXRlLXJvd1wiLFxuXHRDb250YWluZXI6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udGFpbmVyXCIsXG5cdFZhbGlkYXRpb246IEhUTUxfVEFHX1BSRUZJWCArIFwidmFsaWRhdGlvblwiLFxuXHRNZXNzYWdlOiBIVE1MX1RBR19QUkVGSVggKyBcIm1lc3NhZ2VcIixcbn07XG5leHBvcnQgY29uc3QgRk9STVNUQVRFUyA9IHtcblx0aW5pdDogXCJpbml0XCIsXG5cdGlucHV0OiBcImlucHV0XCIsXG5cdHN1bW1hcnk6IFwic3VtbWFyeVwiLFxuXHRzdWJtaXQ6IFwic3VibWl0XCIsXG5cdGZpbmlzaGVkOiBcImZpbmlzaGVkXCIsXG59O1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURTVEFURVMgPSB7XG5cdGFsd2F5czogXCJhbHdheXNcIixcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJldmVudC1cIjtcblxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IHtcblx0aW5pdGlhbGl6ZTogRVZFTlRfUFJFRklYICsgXCJpbml0aWFsaXplXCIsXG5cdC8qIGZpcmVkIGJ5IGNoYW5nZSB2YWx1ZSBmcm9tIGFuIGZpZWxkIGltcGxlbWVudGF0aW9uIFxuXHQgKiBhbmQgY29uc3VtZWQgYnkgdGhlIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbiBvZiBcblx0ICogQmFzZUZpZWxkIHRvIG1ha2UgdmFsaWRhdGlvbiBhbmQgZmlyZSB2YWx1ZUNoYW5nZWQgXG5cdCAqIGV2ZW50XG5cdCAqL1xuXHRpbnB1dDogRVZFTlRfUFJFRklYICsgXCJpbnB1dFwiLFxuXHQvKiBpbnRlcm5hbCBldmVudCBmb3IgcHVibGlzaCB0aGF0IGEgdmFsdWUgb2YgZmllbGQgaGFzIGNoYW5nZWQgKGV2ZW50IGFmdGVyIHZhbGlkYXRpb24pICovXG5cdHZhbHVlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWx1ZS1jaGFuZ2VkXCIsXG5cdC8qIGludGVybmFsIGV2ZW50IHRvIHN0YXJ0IHZhbGlkYXRpb24gYXQgZWxlbWVudHMgLT4gb25seSBmaXJlZCBhdCBmb3JtKi9cblx0ZXhlY3V0ZVZhbGlkYXRlOiBFVkVOVF9QUkVGSVggKyBcImV4ZWN1dGUtdmFsaWRhdGVcIixcblx0LyogKi9cblx0YWN0aXZlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImFjdGl2ZS1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGNvbmRpdGlvblN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJjb25kaXRpb24tc3RhdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHR2YWxpZFN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWxpZC1zdGF0ZS1jaGFuZ2VkXCIsXG4gICAgLyogKi9cblx0c2l0ZUNoYW5nZWQ6IEVWRU5UX1BSRUZJWCArIFwic2l0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGZvcm1TdGF0ZUNoYW5nZWQ6IEVWRU5UX1BSRUZJWCArIFwiZm9ybS1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGFsbFB1Ymxpc2hWYWx1ZTogRVZFTlRfUFJFRklYICsgXCJhbGwtcHVibGlzaC12YWx1ZVwiLFxuXHRcblx0Ly9vbGQgbmVlZCB0byBiZSByZWZhY3RvcmVkXG5cblx0YWRkZWQ6IEVWRU5UX1BSRUZJWCArIFwiYWRkZWRcIixcblx0Y2hhbmdlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZVwiLFxuXHRjaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXI6IChuYW1lKSA9PiB7XG5cdFx0cmV0dXJuIEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWF0dHJpYnV0ZS1cIiArIG5hbWU7XG5cdH0sXG5cdGNoYW5nZUFjdGl2ZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtYWN0aXZlXCIsXG5cdGNoYW5nZVZhbHVlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWx1ZVwiLFxuXHRjaGFuZ2VDb25kaXRpb246IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWNvbmRpdGlvblwiLFxuXHRjaGFuZ2VWYWxpZGF0aW9uOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWxpZGF0aW9uXCIsXG5cblx0Ly9MSVNUIEVWRU5UU1xuXHRsaXN0Um93QWRkOiBFVkVOVF9QUkVGSVggKyBcImxpc3Qtcm93LWFkZFwiLFxuXHRsaXN0Um93RGVsZXRlOiBFVkVOVF9QUkVGSVggKyBcImxpc3Qtcm93LWRlbGV0ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IFNQRUNJQUxWQVJTID0ge1xuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCJcbn1cblxuLy9BVFRSSUJVVEVTXG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTkFNRSA9IFwibmFtZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRUQgPSBcInJlcXVpcmVkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEX09OX0FDVElWRV9PTkxZID0gXCJyZXF1aXJlZC1vbi1hY3RpdmUtb25seVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVBRE9OTFkgPSBcInJlYWRvbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlZBTElEID0gXCJpbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCA9IFwiY29uZGl0aW9uLXZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEID0gXCJjb25kaXRpb24taW52YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NQVggPSBcIm1heFwiO1xuXG4iLCJpbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XG5pbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZmluZEZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY29uc3QgTkFNRV9TUExJVFRFUiA9IC9cXC4vZztcblxuY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbihkYXRhLCBuYW1lLCB2YWx1ZSkge1xuXHRpZiAoZGF0YSA9PSBudWxsIHx8IHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdHJldHVybiBudWxsO1xuXG5cdGNvbnN0IHVwZGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuXG5cdGNvbnN0IG5hbWVzID0gbmFtZS5zcGxpdChOQU1FX1NQTElUVEVSKTtcblx0d2hpbGUgKG5hbWVzLmxlbmd0aCA+IDEpIHtcblx0XHRjb25zdCBrZXkgPSBuYW1lcy5zaGlmdCgpO1xuXHRcdGxldCB0ZW1wID0gZGF0YVtrZXldO1xuXHRcdGNvbnN0IGhhcyA9IHR5cGVvZiB0ZW1wICE9PSBcInVuZGVmaWVuZFwiICYmIHRlbXAgIT0gbnVsbDtcblx0XHRpZiAoIWhhcyAmJiAhdXBkYXRlKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAoIWhhcyAmJiB1cGRhdGUpXG5cdFx0XHR0ZW1wID0gZGF0YVtrZXldID0ge307XG5cblx0XHRkYXRhID0gdGVtcDtcblx0fVxuXG5cdGlmICh1cGRhdGUpXG5cdFx0ZGF0YVtuYW1lc1swXV0gPSB2YWx1ZTtcblx0ZWxzZVxuXHRcdHJldHVybiBkYXRhW25hbWVzWzBdXSA/IGRhdGFbbmFtZXNbMF1dIDogbnVsbDtcbn07XG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlID0gbnVsbCkge1xuXHRcdHN1cGVyKHZhbHVlID8gdmFsdWUgOiB7fSk7XG5cdFx0dGhpcy5maWVsZHMgPSBbXTtcblxuXHRcdHRoaXMub24oRVZFTlRTLnZhbHVlQ2hhbmdlZCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IHRoaXMpIHtcblx0XHRcdFx0XHRjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG5cblx0XHRcdFx0XHRpZiAobmFtZSlcblx0XHRcdFx0XHRcdHZhbHVlSGVscGVyKHRoaXMuX192YWx1ZV9fLCBuYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUgIT0gbnVsbClcblx0XHRcdFx0XHRcdE9iamVjdFV0aWxzLm1lcmdlKHRoaXMuX192YWx1ZV9fLCB2YWx1ZSk7XG5cblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoZXZlbnQuZGV0YWlsWzBdKTtcblxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRDb250YWluZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXRDb250YWluZXIoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0QmFzZUZpZWxkKCk7XG5cblx0XHR0aGlzLmZpZWxkcyA9IGZpbmRGaWVsZHModGhpcyk7XG5cdFx0dGhpcy5vbihFVkVOVFMuaW5pdGlhbGl6ZSwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IHRoaXMpIHtcblxuXHRcdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0aWYgKGZpZWxkIGluc3RhbmNlb2YgQmFzZUZpZWxkKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZmllbGRzLmluZGV4T2YoZmllbGQpIDwgMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5maWVsZHMucHVzaChmaWVsZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy52YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKHsgZGF0YSwgdGFyZ2V0IH0pID0+IHtcblx0XHRcdGNvbnN0IHsgZmllbGRzIH0gPSB0YXJnZXQ7XG5cdFx0XHRpZiAoZmllbGRzKSB7XG5cdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGZpZWxkcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGZpZWxkc1tpXTtcblx0XHRcdFx0XHRpZiAoZmllbGQuY29uZGl0aW9uICYmICFmaWVsZC52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXHR9XG5cblxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XG5cdFx0Y29uc3QgeyByZWFkb25seSwgZmllbGRzIH0gPSB0aGlzO1xuXHRcdGlmIChmaWVsZHMpXG5cdFx0XHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcblx0XHRcdFx0ZmllbGQucmVhZG9ubHkgPSByZWFkb25seTtcblx0XHRcdH1cblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdHRoaXMuX192YWx1ZV9fID0ge307XG5cdFx0Y29uc3QgeyBmaWVsZHMgfSA9IHRoaXM7XG5cdFx0aWYgKGZpZWxkcylcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZmllbGQubmFtZSkgZmllbGQudmFsdWUgPSB2YWx1ZUhlbHBlcih2YWx1ZSwgZmllbGQubmFtZSk7XG5cdFx0XHRcdGVsc2UgaWYgKGZpZWxkIGluc3RhbmNlb2YgQ29udGFpbmVyKSBmaWVsZC52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0fVxuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuQ29udGFpbmVyLCBDb250YWluZXIpO1xuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgRk9STVNUQVRFUywgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgQmFja0J1dHRvbiwgTmV4dEJ1dHRvbiwgU3VtbWFyeUJ1dHRvbiwgU3VibWl0QnV0dG9uLCBDYW5jZWxCdXR0b24gfSBmcm9tIFwiLi9jb250cm9sc1wiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vUGFnZVwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5cbmNvbnN0IGluaXQgPSAoY29udHJvbCkgPT4ge1xuXHRjb250cm9sLmZvcm0gPSBjb250cm9sLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdGNvbnRyb2wuYmFjayA9IGNvbnRyb2wuZmluZChOT0RFTkFNRVMuQmFja0J1dHRvbikuZmlyc3QoKTtcblx0Y29udHJvbC5uZXh0ID0gY29udHJvbC5maW5kKE5PREVOQU1FUy5OZXh0QnV0dG9uKS5maXJzdCgpO1xuXHRjb250cm9sLnN1bW1hcnkgPSBjb250cm9sLmZpbmQoTk9ERU5BTUVTLlN1bW1hcnlCdXR0b24pLmZpcnN0KCk7XG5cdGNvbnRyb2wuc3VibWl0ID0gY29udHJvbC5maW5kKE5PREVOQU1FUy5TdWJtaXRCdXR0b24pLmZpcnN0KCk7XG5cblx0Y29udHJvbC5mb3JtLm9uKFxuXHRcdFtFVkVOVFMudmFsaWRTdGF0ZUNoYW5nZWQsIEVWRU5UUy5jb25kaXRpb25TdGF0ZUNoYW5nZWRdLFxuXHRcdChldmVudCkgPT4ge1xuXHRcdFx0aWYoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgUGFnZSlcblx0XHRcdFx0Y29udHJvbC51cGRhdGUoKTtcblx0XHR9XG5cdCk7XG5cblx0Y29udHJvbC5mb3JtLm9uKFxuXHRcdFtFVkVOVFMuZm9ybVN0YXRlQ2hhbmdlZCwgRVZFTlRTLnNpdGVDaGFuZ2VkXSxcblx0XHQoZXZlbnQpID0+IHtcblx0XHRcdGNvbnRyb2wudXBkYXRlKCk7XG5cdFx0fVxuXHQpO1xufTtcblxuY2xhc3MgQ29udHJvbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChjb250cm9sKSB7XG5cdFx0aW5pdChjb250cm9sKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRDb250cm9sLmluaXQodGhpcyk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2UpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHRjb25zdCB7IGJhY2ssIG5leHQsIHN1bW1hcnksIHN1Ym1pdCwgZm9ybSB9ID0gdGhpcztcblx0XHRjb25zdCB7IGFjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgbmV4dFBhZ2UsIHBhZ2VzLCB1c2VTdW1tYXJ5UGFnZSwgc3RhdGUgfSA9IGZvcm07XG5cblx0XHQvLyBiYXNpYyBjb250cm9sIHNldHVwXG5cdFx0YmFjay5hY3RpdmUgPSB0cnVlO1xuXHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xuXHRcdG5leHQuYWN0aXZlID0gZmFsc2U7XG5cdFx0bmV4dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0c3VtbWFyeS5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdW1tYXJ5LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdWJtaXQuYWN0aXZlID0gZmFsc2U7XG5cdFx0c3VibWl0LmRpc2FibGVkID0gdHJ1ZTtcblxuXHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmZpbmlzaGVkKSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2VJbmRleCA8PSAwO1xuXHRcdFx0XG5cdFx0XHRpZiAobmV4dFBhZ2UgfHwgKCFhY3RpdmVQYWdlLnZhbGlkICYmIChhY3RpdmVQYWdlSW5kZXggKyAxIDwgcGFnZXMubGVuZ3RoKSkpIHtcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKHVzZVN1bW1hcnlQYWdlICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdFx0c3VtbWFyeS5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdW1tYXJ5LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkNvbnRyb2wsIENvbnRyb2wpO1xuZXhwb3J0IGRlZmF1bHQgQ29udHJvbDtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgeyBmaW5kV3JhcHBlciB9IGZyb20gXCIuL3dyYXBwZXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtcImZpbGUtZm9ybWF0XCJdO1xuXG5jbGFzcyBGaWVsZCBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHRoaXMuaW5pdEZpZWxkKCk7XG5cdH1cblxuXHRhc3luYyBpbml0RmllbGQoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0QmFzZUZpZWxkKCk7XG5cdFx0dGhpcy53cmFwcGVyID0gZmluZFdyYXBwZXIodGhpcyk7XG5cdFx0aWYgKHRoaXMud3JhcHBlcilcblx0XHRcdHRoaXMudmFsaWRhdG9yLmFkZEN1c3RvbUNoZWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMud3JhcHBlci52YWxpZDtcblx0XHRcdH0pO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGlmICh0aGlzLndyYXBwZXIpXG5cdFx0XHR0aGlzLndyYXBwZXIucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdGhpcy53cmFwcGVyID8gdGhpcy53cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKVxuXHRcdFx0cmV0dXJuIHRoaXMud3JhcHBlci5ub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKVxuXHRcdFx0dGhpcy53cmFwcGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5GaWVsZCwgRmllbGQpO1xuZXhwb3J0IGRlZmF1bHQgRmllbGQ7XG4iLCJpbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XG5pbXBvcnQgeyBGT1JNU1RBVEVTLCBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VULCBBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL01lc3NhZ2VcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCBDb250cm9sIGZyb20gXCIuL0NvbnRyb2xcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0VdO1xuXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xuXHRmb3IgKGxldCBwYWdlIG9mIGZvcm0ucGFnZXMpIHtcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcblx0fVxufTtcblxuXG5jb25zdCBpbml0ID0gKGZvcm0pID0+IHtcblx0Zm9ybS5zdGF0ZSA9IEZPUk1TVEFURVMuaW5pdDtcblx0Zm9ybS51c2VTdW1tYXJ5UGFnZSA9IGZvcm0uaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcblx0Zm9ybS5wYWdlcyA9IGZvcm0uZmluZChOT0RFTkFNRVMuUGFnZSk7XG5cdGZvcm0uYWN0aXZlUGFnZUluZGV4ID0gLTE7XG5cdGlmIChmb3JtLnBhZ2VzLmxlbmd0aCA+IDApIGZvcm0udG9OZXh0UGFnZSgpO1xufTtcblxuY2xhc3MgRm9ybSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChmb3JtKSB7XG5cdFx0aW5pdChmb3JtKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fX2RhdGFfXyA9IHt9O1xuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmluaXQ7XG5cdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcblx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMudmFsdWVDaGFuZ2VkLFxuXHRcdFx0KGV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0aWYgKG5hbWUpXG5cdFx0XHRcdFx0dGhpcy5fX2RhdGFfX1tuYW1lXSA9IHZhbHVlXG5cdFx0XHRcdGVsc2UgaWYgKHZhbHVlICE9IG51bGwpXG5cdFx0XHRcdFx0T2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fX2RhdGFfXywgdmFsdWUpO1xuXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLCBldmVudC5kZXRhaWxbMF0pO1xuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRGb3JtLmluaXQodGhpcyk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2UpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBzdGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGU7XG5cdH1cblxuXHRzZXQgc3RhdGUoc3RhdGUpIHtcblx0XHRjb25zdCBhY3R1YWwgPSB0aGlzLnN0YXRlO1xuXHRcdGlmIChhY3R1YWwgPT0gRk9STVNUQVRFUy5pbnB1dCAmJiBzdGF0ZSAhPSBGT1JNU1RBVEVTLmlucHV0KSByZWFkb25seSh0aGlzLCB0cnVlKTtcblx0XHRlbHNlIGlmIChhY3R1YWwgIT0gRk9STVNUQVRFUy5pbnB1dCAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRyZWFkb25seSh0aGlzLCBmYWxzZSk7XG5cdFx0XHRpZiAodGhpcy5hY3RpdmVQYWdlKVxuXHRcdFx0XHR0aGlzLmFjdGl2ZVBhZ2UuYWN0aXZlID0gdHJ1ZTtcblx0XHR9XG5cdFx0dGhpcy5fc3RhdGUgPSBzdGF0ZTtcblxuXHRcdGlmIChhY3R1YWwgIT0gc3RhdGUpXG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLmZvcm1TdGF0ZUNoYW5nZWQpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdGZvciAobGV0IHBhZ2Ugb2YgdGhpcy5wYWdlcykge1xuXHRcdFx0aWYgKCFwYWdlLnZhbGlkKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXQgZGF0YSgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9fZGF0YV9fO1xuXHR9XG5cblx0c2V0IGRhdGEoZGF0YSkge1xuXHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuX19kYXRhX18gPSB7fTsvL2RhdGE7XG5cdFx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIHtcblx0XHRcdFx0aWYgKHBhZ2UubmFtZSlcblx0XHRcdFx0XHRwYWdlLnZhbHVlID0gZGF0YVtwYWdlLm5hbWVdO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cGFnZS52YWx1ZSA9IGRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuYWxsUHVibGlzaFZhbHVlKTtcblxuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmVQYWdlKCkge1xuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZVBhZ2U7XG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCkge1xuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IHRoaXMucGFnZXMuaW5kZXhPZihwYWdlKTtcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5zaXRlQ2hhbmdlZCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHByZXZQYWdlKCkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xuXHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXQgbmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMucGFnZXMpIHtcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gdGhpcy5wYWdlc1tpXTtcblx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhc3luYyB0b1ByZXZQYWdlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBwcmV2ID0gYXdhaXQgdGhpcy5wcmV2UGFnZTtcblx0XHRcdGlmIChwcmV2KSB0aGlzLmFjdGl2ZVBhZ2UgPSBwcmV2O1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XG5cdFx0Y29uc3QgbmV4dCA9IGF3YWl0IHRoaXMubmV4dFBhZ2U7XG5cdFx0aWYgKG5leHQpIHtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVTLmluaXQpXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcblx0XHRcdHRoaXMuc3VtbWFyeSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdCgpXG5cdFx0fVxuXHR9XG5cblx0c3VtbWFyeSgpIHtcblx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5zdW1tYXJ5O1xuXHR9XG5cblx0c3VibWl0KCkge1xuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmZpbmlzaGVkO1xuXHR9XG59XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5Gb3JtLCBGb3JtKTtcbmV4cG9ydCBkZWZhdWx0IEZvcm07XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRF07XG5cbmNvbnN0IGluaXQgPSAoYnV0dG9uKSA9PiB7XG5cdGJ1dHRvbi5mb3JtID0gYnV0dG9uLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdGJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcblx0YnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG5cdGJ1dHRvbi5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdGlmIChidXR0b24uYWN0aXZlICYmICFidXR0b24uZGlzYWJsZWQpIGJ1dHRvbi5leGVjdXRlKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fSk7XG59O1xuXG5jbGFzcyBGb3JtQnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBpbml0KGNvbnRyb2xCdXR0b24pIHtcblx0XHRpbml0KGNvbnRyb2xCdXR0b24pO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdEZvcm1CdXR0b24uaW5pdCh0aGlzKTtcblx0fVxuXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUpIHtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXIobmFtZSkpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBudWxsKTtcblx0fVxuXG5cdGdldCBkaXNhYmxlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0RJU0FCTEVEKTtcblx0fVxuXG5cdHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuXHRcdGRpc2FibGVkID8gdGhpcy5hdHRyKEFUVFJJQlVURV9ESVNBQkxFRCwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBudWxsKTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJleGVjdXRlXCIpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtQnV0dG9uO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgQVRUUklCVVRFX01BWCwgQVRUUklCVVRFX0lOVkFMSUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyB0cmVlRmlsdGVyIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCBSb3cgZnJvbSBcIi4vbGlzdC9Sb3dcIjtcbmltcG9ydCBBZGRSb3cgZnJvbSBcIi4vbGlzdC9BZGRSb3dcIjtcbmltcG9ydCBEZWxldGVSb3cgZnJvbSBcIi4vbGlzdC9EZWxldGVSb3dcIjtcbmltcG9ydCBSb3dzIGZyb20gXCIuL2xpc3QvUm93c1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9NQVhdO1xuXG5jb25zdCBmaW5kQWRkQnV0dG9uID0gKGxpc3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3Q6IGxpc3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBZGRSb3cpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH1cblx0fSlbMF07XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSAobGlzdCwgdmFsdWUpID0+IHtcblx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlIH0gPSBsaXN0O1xuXHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpLmNoaWxkcmVuWzBdO1xuXHRjb250YWluZXIuYXBwZW5kKHJvdyk7XG5cblx0aWYgKHZhbHVlKSB7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInNldCB2YWx1ZSB0byByb3dcIiwgeyByb3csIHZhbHVlIH0pO1xuXHRcdFx0cm93LnZhbHVlID0gdmFsdWU7XG5cdFx0fSwgVFJJR0dFUl9USU1FT1VUKTtcblx0fVxuXG5cdHJldHVybiByb3c7XG59O1xuXG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcih2YWx1ZSA/IHZhbHVlIDogW10pO1xuXHRcdHRoaXMudGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xuXHRcdHRoaXMuY29udGFpbmVyID0gdGhpcy5maW5kKE5PREVOQU1FUy5MaXN0Um93cykuZmlyc3QoKTtcblxuXHRcdHRoaXMub24oW0VWRU5UUy52YWx1ZUNoYW5nZWQsIEVWRU5UUy5pbml0aWFsaXplXSxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgUm93KSB7XG5cdFx0XHRcdFx0Y29uc3Qgcm93cyA9IHRoaXMucm93cztcblx0XHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRcdFx0Y29uc3QgeyB2YWx1ZSB9ID0gcm93O1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcblx0XHRcdFx0XHR0aGlzLl9fdmFsdWVfX1tpbmRleF0gPSB2YWx1ZTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShldmVudC5kZXRhaWwgPyBldmVudC5kZXRhaWxbMF0gOiBbcm93XSk7XG5cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0dGhpcy5pbml0TGlzdCgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdExpc3QoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0QmFzZUZpZWxkKCk7XG5cdFx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlLCB2YWxpZGF0b3IgfSA9IHRoaXM7XG5cdFx0Y29uc3QgYWRkQnV0dG9uID0gZmluZEFkZEJ1dHRvbih0aGlzKTtcblxuXHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyB9KSA9PiB7XG5cdFx0XHRjb25zdCB7IHJvd3MsIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0aWYgKGxlbmd0aCA9PSBtYXgpIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdGVsc2UgaWYgKGxlbmd0aCA8IG1heCkgYWRkQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuZ3RoIDw9IG1heDtcblx0XHR9KTtcblxuXHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCB7IHJvd3MgfSA9IHRoaXM7XG5cdFx0XHRpZiAocm93cylcblx0XHRcdFx0Zm9yIChsZXQgcm93IG9mIHJvd3MpIHtcblx0XHRcdFx0XHRpZiAoIXJvdy52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMubGlzdFJvd0FkZCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5LCBfX3ZhbHVlX18gfSA9IHRoaXM7XG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGNvbnN0IHJvdyA9IGNyZWF0ZVJvdyh0aGlzKTtcblx0XHRcdFx0X192YWx1ZV9fLnB1c2gocm93LnZhbHVlKTtcblxuXHRcdFx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5saXN0Um93RGVsZXRlLCAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IHsgcm93cywgcmVhZG9ubHksIF9fdmFsdWVfXyB9ID0gdGhpcztcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0cm93LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJvd3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRfX3ZhbHVlX18uc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3MpIHtcblx0XHRcdHJvdy5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdH1cblx0fVxuXG5cdGdldCByb3dzKCkge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLmNoaWxkcmVuKTtcblx0fVxuXG5cdGdldCBtYXgoKSB7XG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NQVgpKSByZXR1cm4gcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NQVgpKTtcblx0XHRyZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiAhdmFsdWUgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRpZiAodGhpcy5fX3ZhbHVlX18ubGVuZ3RoID4gMClcblx0XHRcdHJldHVybiB0aGlzLl9fdmFsdWVfXztcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IHZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuYWNjZXB0VmFsdWUodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXMubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5yZW1vdmUoKTtcblx0XHRcdHRoaXMuX192YWx1ZV9fID0gW107XG5cdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0Zm9yIChsZXQgdmFsIG9mIHZhbHVlKVxuXHRcdFx0XHRcdGNyZWF0ZVJvdyh0aGlzLCB2YWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkxpc3QsIExpc3QpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRCYXNlID0gKG1lc3NhZ2UpID0+IHtcblx0bGV0IHBhcmVudCA9IG1lc3NhZ2UucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gcGFyZW50O1xuXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBpbml0ID0gKG1lc3NhZ2UpID0+IHtcblx0bWVzc2FnZS5yZWZlcmVuY2UgPSBmaW5kUGFyZW50QmFzZShtZXNzYWdlKTtcblx0bWVzc2FnZS5mb3JtID0gbWVzc2FnZS5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXG5cdG1lc3NhZ2UuZm9ybS5vbihcblx0XHR0b0V2ZW50cyhFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlKSxcblx0XHQoZXZlbnQpID0+IHtcblx0XHRcdG1lc3NhZ2UudXBkYXRlKCk7XG5cdFx0fSxcblx0KTtcblx0bWVzc2FnZS51cGRhdGUoKTtcbn07XG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGluaXQobWVzc2FnZSkge1xuXHRcdGluaXQobWVzc2FnZSk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0TWVzc2FnZS5pbml0KHRoaXMpO1xuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZUF0dHJpYnV0ZUV2ZW50QnVpbGRlcihuYW1lKSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlKCkge1xuXHRcdGNvbnN0IGRhdGEgPSBldmFsdWF0aW9uRGF0YSh0aGlzLnJlZmVyZW5jZSk7XG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHR9XG59XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5NZXNzYWdlLCBNZXNzYWdlKTtcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgQVRUUklCVVRFX1NURVAgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1NURVBdO1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0UGFnZSgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdFBhZ2UoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0Q29udGFpbmVyKCk7XG5cdH1cdFxuXHRcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLlBhZ2UsIFBhZ2UpO1xuZXhwb3J0IGRlZmF1bHQgUGFnZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0NPTkRJVElPTl07XG5cbmNvbnN0IGluaXQgPSAodmFsaWRhdGlvbikgPT4ge1xuXHR2YWxpZGF0aW9uLmFjdGl2ZSA9IGZhbHNlO1xufTtcblxuY2xhc3MgVmFsaWRhdGlvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgaW5pdCh2YWxpZGF0aW9uKSB7XG5cdFx0aW5pdCh2YWxpZGF0aW9uKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRWYWxpZGF0aW9uLmluaXQodGhpcyk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLmNoYW5nZUF0dHJpYnV0ZUV2ZW50QnVpbGRlcihuYW1lKSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLmNoYW5nZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0fVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuVmFsaWRhdGlvbiwgVmFsaWRhdGlvbik7XG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uO1xuIiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IHsgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIE5PREVOQU1FUywgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlQ29uZGl0aW9uU3RhdGUsIHVwZGF0ZVZhbGlkU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiXG5pbXBvcnQgeyBmaW5kVmFsaWRhdGlvbnMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgeyBldmFsdWF0aW9uRGF0YSB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuXG5jbGFzcyBWYWxpZGF0b3Ige1xuXHRjb25zdHJ1Y3RvcihiYXNlKSB7XG5cdFx0dGhpcy5pbml0YWwgPSB0cnVlO1xuXHRcdHRoaXMudGFyZ2V0ID0gYmFzZTtcblx0XHR0aGlzLmN1c3RvbUNoZWNrcyA9IFtdO1xuXHRcdHRoaXMudmFsaWRhdGlvbnMgPSBmaW5kVmFsaWRhdGlvbnMoYmFzZSkgfHwgW107XG5cdFx0dGhpcy5jb25kaXRpb24gPSBiYXNlLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cblx0fVxuXG5cdGFkZEN1c3RvbUNoZWNrKGNoZWNrKSB7XG5cdFx0dGhpcy5jdXN0b21DaGVja3MucHVzaChjaGVjayk7XG5cdH1cblxuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXQuZm9ybTtcblx0fVxuXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xuXHRcdGNvbnN0IHsgdGFyZ2V0LCB2YWxpZGF0aW9ucywgY3VzdG9tQ2hlY2tzLCBjb25kaXRpb24gfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBoYXNWYWx1ZSwgcmVxdWlyZWQsIHJlcXVpcmVkT25seU9uQWN0aXZlIH0gPSB0YXJnZXQ7XG5cdFx0Y29uc3QgaGFzQ2hlY2tzID0gY3VzdG9tQ2hlY2tzLmxlbmd0aCA+IDAgfHwgdmFsaWRhdGlvbnMubGVuZ3RoID4gMDtcblx0XHRjb25zdCBkYXRhID0gZXZhbHVhdGlvbkRhdGEodGFyZ2V0KTtcblx0XHRcblxuXHRcdGNvbnN0IGNvbmRpdGlvblZhbGlkID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xuXHRcdHVwZGF0ZUNvbmRpdGlvblN0YXRlKHRhcmdldCwgY29uZGl0aW9uVmFsaWQsIHRoaXMuaW5pdGFsKTtcblxuXG5cdFx0bGV0IHZhbGlkID0gcmVxdWlyZWQgPyBoYXNWYWx1ZSA6IHRydWU7XG5cdFx0XHRcblx0XHRpZiAodmFsaWQpXG5cdFx0XHRmb3IgKGxldCBjaGVjayBvZiBjdXN0b21DaGVja3MpIHtcblx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IGNoZWNrKHsgZGF0YSwgdGFyZ2V0IH0pO1xuXHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRmb3IgKGxldCB2YWxpZGF0aW9uIG9mIHZhbGlkYXRpb25zKSB7XG5cdFx0XHRpZiAodmFsaWQgJiYgaGFzVmFsdWUpIHtcblx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHZhbGlkYXRpb24uY29uZGl0aW9uLCBkYXRhLCB0cnVlKTtcblx0XHRcdFx0dmFsaWRhdGlvbi5hY3RpdmUgPSAhdGVzdDtcblx0XHRcdFx0aWYgKCF0ZXN0KSB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlXG5cdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0YXJnZXQsIHZhbGlkLCB0aGlzLmluaXRhbCk7XG5cdFx0dGhpcy5pbml0YWwgPSBmYWxzZTtcblxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0b3I7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBCYWNrQnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFx0Rm9ybUJ1dHRvbi5pbml0KGJ1dHRvbik7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuQmFja0J1dHRvbiwgQmFja0J1dHRvbik7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cdFxuXHRzdGF0aWMgaW5pdChidXR0b24pIHtcblx0XHRGb3JtQnV0dG9uLmluaXQoYnV0dG9uKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5leHRCdXR0b247XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5OZXh0QnV0dG9uLCBOZXh0QnV0dG9uKTtcbiIsImltcG9ydCB7IE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIFN1Ym1pdEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXHRcblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFx0Rm9ybUJ1dHRvbi5pbml0KGJ1dHRvbik7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdWJtaXRCdXR0b247XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5TdWJtaXRCdXR0b24sIFN1Ym1pdEJ1dHRvbik7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBTdW1tYXJ5QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cdFxuXHRzdGF0aWMgaW5pdChidXR0b24pIHtcblx0XHRGb3JtQnV0dG9uLmluaXQoYnV0dG9uKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5QnV0dG9uO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbiwgU3VtbWFyeUJ1dHRvbik7XG4iLCJpbXBvcnQgQmFja0J1dHRvbiBmcm9tIFwiLi9CYWNrQnV0dG9uXCI7XG5pbXBvcnQgTmV4dEJ1dHRvbiBmcm9tIFwiLi9OZXh0QnV0dG9uXCI7XG5pbXBvcnQgU3VtbWFyeUJ1dHRvbiBmcm9tIFwiLi9TdW1tYXJ5QnV0dG9uXCI7XG5pbXBvcnQgU3VibWl0QnV0dG9uIGZyb20gXCIuL1N1Ym1pdEJ1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdEJhY2tCdXR0b24sXG5cdE5leHRCdXR0b24sXG5cdFN1bW1hcnlCdXR0b24sXG5cdFN1Ym1pdEJ1dHRvbixcbn07XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5cblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgQWRkUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdFxuXHRzdGF0aWMgaW5pdChidXR0b24pIHtcblx0XHRGb3JtQnV0dG9uLmluaXQoYnV0dG9uKTtcblx0XHRidXR0b24uYWN0aXZlXHQ9IHRydWU7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1x0XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRBZGRSb3cuaW5pdCh0aGlzKTtcblx0fVxuXG5cdGV4ZWN1dGUoKXtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVFMubGlzdFJvd0FkZCk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5CdXR0b25BZGRSb3csIEFkZFJvdyk7XG5leHBvcnQgZGVmYXVsdCBBZGRSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBpbml0KGJ1dHRvbikge1xuXHRcdEZvcm1CdXR0b24uaW5pdChidXR0b24pO1xuXHRcdGJ1dHRvbi5hY3RpdmVcdD0gdHJ1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHREZWxldGVSb3cuaW5pdCh0aGlzKTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy50cmlnZ2VyKDEwMCwgRVZFTlRTLmxpc3RSb3dEZWxldGUpO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuQnV0dG9uRGVsZXRlUm93LCBEZWxldGVSb3cpO1xuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCBEZWxldGVSb3cgZnJvbSBcIi4vRGVsZXRlUm93XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY2xhc3MgTGlzdFJvdyBleHRlbmRzIENvbnRhaW5lciB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuTGlzdFJvdywgTGlzdFJvdyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93O1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jb25zdCBpbml0ID0gKGVsZW1lbnQpID0+IHtcbn07XG5cbmNsYXNzIExpc3RSb3dzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChsaXN0Um93cyl7XG5cdFx0aW5pdChsaXN0Um93cyk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1x0XHRcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdExpc3RSb3dzLmluaXQodGhpcyk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5MaXN0Um93cywgTGlzdFJvd3MpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdFJvd3M7XG4iLCJpbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XG5pbXBvcnQgeyBTUEVDSUFMVkFSUywgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiXG5cbmV4cG9ydCBjb25zdCBldmFsdWF0aW9uRGF0YSA9IChiYXNlKSA9PiB7XG5cdGNvbnN0IGRhdGEgPSB7fTtcblx0ZGF0YVtTUEVDSUFMVkFSUy5DVVJSRU5UVkFMVUVdID0gYmFzZS52YWx1ZTtcblxuXHRsZXQgcm93ID0gYmFzZS5wYXJlbnQoTk9ERU5BTUVTLkxpc3RSb3cpO1xuXHRsZXQgdGVtcCA9IGRhdGE7XG5cdHdoaWxlIChyb3cpIHtcblx0XHR0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXSA9IHJvdy52YWx1ZVxuXHRcdHRlbXAgPSB0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXTtcblx0XHRyb3cgPSByb3cucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0fVxuXG5cdHJldHVybiBPYmplY3RVdGlscy5tZXJnZSggZGF0YSxiYXNlLmZvcm0uZGF0YSk7XG59IiwiaW1wb3J0IHtFVkVOVEhBTkRMRV9USU1FT1VUfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJndW1lbnRzKS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b1RpbWVvdXRIYW5kbGUgPSAoaGFuZGxlLCBwcmV2ZW50RGVmYXVsdCwgc3RvcFByb3BhZ2F0aW9uKSA9PiB7XG4gICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZih0aW1lb3V0KVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGUoZXZlbnQpO1xuICAgICAgICB9LCBFVkVOVEhBTkRMRV9USU1FT1VUKTtcblxuICAgICAgICBpZihwcmV2ZW50RGVmYXVsdClcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn07IiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi4vVmFsaWRhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgdHJlZUZpbHRlciA9ICh7IHJvb3QsIGZpbHRlciB9KSA9PiB7XG5cdGxldCBlbGVtZW50cyA9IFtdO1xuXHRyb290LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB7IGFjY2VwdCwgc3RvcCA9IGZhbHNlIH0gPSBmaWx0ZXIoZWxlbWVudCk7XG5cblx0XHRpZiAoYWNjZXB0KSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSB0cmVlRmlsdGVyKHsgcm9vdDogZWxlbWVudCwgZmlsdGVyIH0pO1xuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0KSBlbGVtZW50cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEZpZWxkcyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kVmFsaWRhdGlvbnMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAocm9vdCAhPSBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBWYWxpZGF0aW9uKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG4iLCJpbXBvcnQgeyBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlVmFsaWRTdGF0ZSA9ICh0YXJnZXQsIHZhbGlkLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQudmFsaWQ7XG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgXCJcIik7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIFwiXCIpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XG5cdH1cblx0XG5cdGlmIChvbGRTdGF0ZSAhPSB2YWxpZCB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy52YWxpZFN0YXRlQ2hhbmdlZCk7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQ29uZGl0aW9uU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmNvbmRpdGlvbjtcblx0aWYgKHZhbGlkKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcIlwiKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFwiXCIpO1xuXHR9XG5cdGlmIChvbGRTdGF0ZSAhPSB2YWxpZCB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jb25kaXRpb25TdGF0ZUNoYW5nZWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFjdGl2ZVN0YXRlID0gKHRhcmdldCwgYWN0aXZlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuYWN0aXZlO1xuXHRhY3RpdmUgPyB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xuXHRpZiAob2xkU3RhdGUgIT0gYWN0aXZlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmFjdGl2ZVN0YXRlQ2hhbmdlZCk7XG59OyIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFxuXHRcdHJldHVybiBpbnB1dC5sZW5ndGggPT0gMSA/IGlucHV0LmZpcnN0KCkgOiBpbnB1dDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiZmlsZVwiXSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gKGZpbGUsIHJlYWRGbk5hbWUpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG5cdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxuXHRcdFx0XHR0eXBlOiBmaWxlLnR5cGUsXG5cdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdFxuXHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHJlYWRlcltyZWFkRm5OYW1lXShmaWxlKTtcblx0fSk7XG59O1xuXG4vL3JlYWRBc0RhdGFVUkxcblxuY29uc3QgRk9STUFUID0ge1xuXHRcImZvcm0taW5wdXRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHJldHVybiBmaWxlO1xuXHR9LFxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJkYXRhLXVybC1iYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRcImJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLnN1YnN0cihyZXN1bHQuZGF0YS5pbmRleE9mKFwiLFwiKSArIDEpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNvbnN0IHJlYWRGaWxlcyA9IGFzeW5jIChmaWxlcywgZm9ybWF0LCBtdWx0aXBsZSkgPT4ge1xuXHRsZXQgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpXG5cdFx0cmVzdWx0LnB1c2goYXdhaXQgRk9STUFUW2Zvcm1hdF0oZmlsZSkpO1xuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIG51bGw7XG5cblxuXHRyZXR1cm4gbXVsdGlwbGUgPyByZXN1bHQgOiByZXN1bHRbMF07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dC5tdWx0aXBsZTtcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gZmllbGQuYXR0cihcImZpbGUtbmFtZS10YXJnZXRcIik7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IHRoaXMuZmlsZW5hbWVUYXJnZXQgPyBmaWVsZC5maW5kKHRoaXMuZmlsZW5hbWVUYXJnZXQpLmZpcnN0KCkgOiBudWxsO1xuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcblxuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMudmFsdWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXMubGVuZ3RoICE9IDApXG5cdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0fTtcblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBcIm9iamVjdFwiO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlICE9IHRoaXMuX192YWx1ZV9fKSB7XG5cdFx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy5maWxlbmFtZVRhcmdldCAmJiB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdGZvciAobGV0IGZpbGUgb2YgdmFsdWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQuYXBwZW5kKGA8c3Bhbj4ke2ZpbGUubmFtZX08L3NwYW4+YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fX3ZhbHVlX187XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nO1xuXG5jb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcbn07XG5cbmNvbnN0IGluaXQgPSAod3JhcHBlcikgPT4ge1xuXHRjb25zdCB7IGZpZWxkIH0gPSB3cmFwcGVyO1xuXHRjb25zdCBuYW1lID0gZmllbGQubmFtZSArIGdldFJhbmRvbUludCgpO1xuXHRjb25zdCBpbnB1dCA9ICh3cmFwcGVyLmlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKSk7XG5cdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcblx0aW5wdXQub24oXG5cdFx0XCJjaGFuZ2VcIixcblx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmNoYW5nZVZhbHVlKTtcblx0XHRcdH1cblx0XHQpXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0XHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xuXHRcdHJldHVybiB2YWx1ZS52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNle1xuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy5pbnB1dC5tdWx0aXBsZSA/IHRoaXMuaW5wdXQudmFsKCkgOiB0aGlzLmlucHV0LnZhbHVlKTtcblx0fVxuXHRcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGggPiAwKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNle1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1x0XG5cdFx0XHR9XHRcdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXQ6bm90KFt0eXBlPVxcXCJmaWxlXFxcIl0pOm5vdChbdHlwZT1cXFwicmFkaW9cXFwiXSk6bm90KFt0eXBlPVxcXCJjaGVja2JveFxcXCJdKSAsaW5wdXQ6bm90KFt0eXBlXSksIHRleHRhcmVhJztcblxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcblxuXG5jb25zdCB0ZXh0ID0ge1xuXHRhY2NlcHQ6ICh2YWx1ZSkgPT4geyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIH0sXG5cdHZhbHVlOiAoaW5wdXQpID0+IHsgcmV0dXJuIGlucHV0LnZhbHVlOyB9LFxuXHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogbnVsbDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5jb25zdCBudW1iZXIgPSB7XG5cdGFjY2VwdDogKHZhbHVlKSA9PiB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7IH0sXG5cdHZhbHVlOiAoaW5wdXQpID0+IHsgcmV0dXJuIGlucHV0LnZhbHVlQXNOdW1iZXI7IH0sXG5cdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XG5cdFx0aWYgKHZhbHVlICYmICFOdW1iZXIuaXNOYU4odmFsdWUpKVxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5jb25zdCBkYXRlID0ge1xuXHRhY2NlcHQ6ICh2YWx1ZSkgPT4geyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIH0sXG5cdHZhbHVlOiAoaW5wdXQpID0+IHsgcmV0dXJuIGlucHV0LnZhbHVlQXNEYXRlOyB9LFxuXHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdGlmKHZhbHVlKVxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufTtcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGUsIHRpbWU6IGRhdGUgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xuXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy50eXBlID0gVFlQRVNbdHlwZV0gfHwgVFlQRVNbREVGQVVMVFRZUEVdO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUubm9ybWFsaXplKHZhbHVlKTtcblx0fVxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLmlucHV0LnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZS52YWx1ZSh0aGlzLmlucHV0KTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCBGaWVsZCBmcm9tIFwiLi4vRmllbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XG5cdFxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKXsgcmV0dXJuIG51bGw7fVxuXHRcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0dGhpcy5maWVsZCA9IGZpZWxkO1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7IH1cblxuXHRzZXQgcmVhZG9ubHkoZGlzYWJsZWQpIHsgfVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSgpIHtcblxuXHR9XG5cdFxuXHRnZXQgdmFsdWUoKXtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRcblx0Z2V0IHZhbGlkKCl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsImltcG9ydCBUZXh0IGZyb20gXCIuL1RleHRcIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9DaGVja2JveFwiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL1JhZGlvXCI7XG5pbXBvcnQgRmlsZSBmcm9tIFwiLi9GaWxlXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL1NlbGVjdFwiO1xuXG5leHBvcnQgY29uc3Qgd3JhcHBlcnMgPSBbVGV4dCwgQ2hlY2tib3gsIFJhZGlvLCBGaWxlLCBTZWxlY3RdO1xuXG5leHBvcnQgY29uc3QgZmluZFdyYXBwZXIgPSAoZmllbGQpID0+IHtcblx0Zm9yIChsZXQgd3JhcHBlciBvZiB3cmFwcGVycykge1xuXHRcdGNvbnN0IGlucHV0ID0gd3JhcHBlci5maW5kSW5wdXQoZmllbGQpO1xuXHRcdGlmIChpbnB1dCkgcmV0dXJuIG5ldyB3cmFwcGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9