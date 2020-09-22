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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
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







const EXECUTION_WARN_TIMEOUT = 1000;
const EXPRESSION = /\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\}/;
const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const toDefaultValue = value => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"])
		return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"](value);
};

const execute = async function(aStatement, aContext) {
	if (typeof aStatement !== "string")
		return aStatement;
		
	const expression = new Function("context", 
`
return (async (context) => {
	try{ 
		with(context){
			 return ${aStatement}
		}
	}catch(e){
		throw e;
	}
})(context)`
	);
	
	let timeout = setTimeout(() => {
		timeout = null;
		console.warn("long running statement:", aStatement, new Error());
	}, EXECUTION_WARN_TIMEOUT)
	
	const result = await expression(aContext);
	
	if(timeout)
		clearTimeout(timeout)
	return result;
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
/*! exports provided: HTML_TAG_PREFIX, TRIGGER_TIMEOUT, EVENTHANDLE_TIMEOUT, NODENAMES, FORMSTATES, REQUIREDSTATES, EVENT_PREFIX, EVENTS, SPECIALVARS, ATTRIBUTE_NAME, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_STEP, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_REQUIRED, ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED, ATTRIBUTE_READONLY, ATTRIBUTE_NOVALUE, ATTRIBUTE_VALID, ATTRIBUTE_INVALID, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_MAX, ATTRIBUTE_PROGRESS */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_ENDPOINT", function() { return ATTRIBUTE_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_METHOD", function() { return ATTRIBUTE_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_STATE", function() { return ATTRIBUTE_STATE; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_PROGRESS", function() { return ATTRIBUTE_PROGRESS; });
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
	ProgressBar: HTML_TAG_PREFIX + "progress-bar",
	Step: HTML_TAG_PREFIX + "step",
};
const FORMSTATES = {
	init: "init",
	input: "input",
	summary: "summary",
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
	/* */
	submit: EVENT_PREFIX + "submit",
	/* */
	progressbarChanged : EVENT_PREFIX + "progress-bar-changed",

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
	CURRENTLISTROW: "$item",
};

//ATTRIBUTES

const ATTRIBUTE_NAME = "name";
const ATTRIBUTE_ENDPOINT = "endpoint";
const ATTRIBUTE_METHOD = "method";
const ATTRIBUTE_STATE = "state";

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
const ATTRIBUTE_PROGRESS = "progress";


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
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Control */ "./src/Control.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.js");








const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_NAME"], _Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_USE_SUMMARY_PAGE"], _Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_ENDPOINT"], _Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_METHOD"], _Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_STATE"]];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

const init = (form) => {
	form.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].init;
	form.useSummaryPage = form.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_USE_SUMMARY_PAGE"]);
	form.pages = form.find(_Constants__WEBPACK_IMPORTED_MODULE_2__["NODENAMES"].Page);
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
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].init;
		this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_USE_SUMMARY_PAGE"]);
		this.activePageIndex = -1;

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].valueChanged, (event) => {
			const { name, value } = event.target;
			if (name) this.__data__[name] = value;
			else if (value != null) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"].merge(this.__data__, value);

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].executeValidate, event.detail[0]);

			event.preventDefault();
			event.stopPropagation();
		});
	}

	connectedCallback() {
		Form.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].change);
		}
	}

	get state() {
		return this._state;
	}

	set state(state) {
		const actual = this.state;
		if (actual == _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input && state != _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input) readonly(this, true);
		else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input && state == _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		this._state = state;

		if (actual != state) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].formStateChanged);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_STATE"], this._state);
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
		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input) {
			this.__data__ = {}; //data;
			for (let page of this.pages) {
				if (page.name) page.value = data[page.name];
				else page.value = data;
			}

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].allPublishValue);
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
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input) this.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input;

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].siteChanged);
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
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].init) this._state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].input;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].summary;
	}

	async submit() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_2__["FORMSTATES"].finished;
		const data = this.data;

		let endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_ENDPOINT"]);
		if (endpoint) {
			endpoint = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolveText(endpoint, data, endpoint);
			const url = new URL(endpoint, location.origin);

			return await fetch(url.toString(), {
				method: (this.attr(_Constants__WEBPACK_IMPORTED_MODULE_2__["ATTRIBUTE_METHOD"]) || "post").toLowerCase(),
				credentials: "include",
				mode: "cors",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].submit, data);
	}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_2__["NODENAMES"].Form, Form);
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

	get step(){
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_STEP"]);
	}
	
	conditionUpdated(){}
}
window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Page, Page);
/* harmony default export */ __webpack_exports__["default"] = (Page);


/***/ }),

/***/ "./src/ProgressBar.js":
/*!****************************!*\
  !*** ./src/ProgressBar.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Step */ "./src/Step.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_PROGRESS"]];

const firstStepPageIndex = (pages, step, activePage) => {
	for (let page of pages) {
		if (page.step == step && page.condition) return page;
		else if (page == activePage) return;
	}

	return null;
};

class ProgressBar extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
        super();
        this.progress = 0;

		this.on("click", ({ target }) => {
            if (!this.form) return;
            if(target == this) return;

            const step = target.is(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Step) ? target : target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Step).first();
            
			if (!step) return;

			const state = this.form.state;
			const pages = this.form.pages;
			const activePageIndex = this.form.activePageIndex;
			const activePage = this.form.activePage;
			const stepName = step.name;
			if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].input || state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].summary) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) this.form.activePage = page;
			}
		});
	}

	connectedCallback() {
		this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Form);
		this.steps = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Step);
		this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].initialize, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].siteChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].formStateChanged], () => {
			const state = this.form.state;
			const activePage = this.form.activePage;
			if (!activePage) return;

			const index = this.form.activePageIndex;
			const count = this.form.pages.length;
			const pageStep = activePage ? activePage.step : _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].init;
			const progress = Math.floor((index * 100) / count);

			for (let step of this.steps) {
				const name = step.name;
				if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].input) {
					step.active = name == pageStep;
					step.readonly = false;
				} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].summary) {
					step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].summary;
					step.readonly = false;
				} else {
					step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].finished;
					step.readonly = true;
				}
			}

            this.progress = state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].summary || state == _Constants__WEBPACK_IMPORTED_MODULE_0__["FORMSTATES"].finished ? 100 : progress;
            
            this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].progressbarChanged);
		});
	}

	get progress() {
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_PROGRESS"]);
	}

	set progress(progress) {
        if(this.style.setProperty)
            this.style.setProperty("--progress", progress + "%");
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_PROGRESS"], Math.max(0, Math.min(progress, 100)));
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
}

window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].ProgressBar, ProgressBar);
/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);


/***/ }),

/***/ "./src/Step.js":
/*!*********************!*\
  !*** ./src/Step.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NAME"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"], _Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"]];

class Step extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	connectedCallback() {}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].changeAttributeEventBuilder(name));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TIMEOUT"], _Constants__WEBPACK_IMPORTED_MODULE_0__["EVENTS"].change);
		}
    }

    get name(){
        return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_NAME"]);
    }
    
    get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_ACTIVE"]);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			Object(_utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__["updateActiveState"])(this, active);
		}
	}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"]);
	}

	set readonly(readonly) {
		readonly ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"], "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__["ATTRIBUTE_READONLY"], null);
	}
}

window.customElements.define(_Constants__WEBPACK_IMPORTED_MODULE_0__["NODENAMES"].Step, Step);
/* harmony default export */ __webpack_exports__["default"] = (Step);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmFzZUZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29udHJvbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm1CdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdGVwLmpzIiwid2VicGFjazovLy8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xzL0JhY2tCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xzL05leHRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbHMvU3VtbWFyeUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovLy8uL3NyYy9saXN0L0RlbGV0ZVJvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlzdC9Sb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvRGF0YUhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvRXZlbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1N0YXRlSGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy93cmFwcGVyL0NoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvUmFkaW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvU2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyYXBwZXIvV3JhcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd3JhcHBlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BHQTtBQUFBO0FBQUE7QUFBNkI7O0FBRWQ7O0FBRWYseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBCO0FBQ1E7QUFDTjtBQUNGO0FBQ0k7O0FBRXZCLGtCQUFrQiw2Q0FBSSxFQUFFLGlEQUFRLEVBQUUsOENBQUssRUFBRSw2Q0FBSSxFQUFFLCtDQUFNOztBQUVyRDtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoibW9kdWxlLWRlZmF1bHRqcy1odG1sLWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuXG5leHBvcnQge0Zvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIExpc3QsIENvbnRhaW5lcn07IiwiXHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKiBcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqICBcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uKGFLZXksIGFEYXRhLCBhT2JqZWN0KXtcclxuXHRpZih0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpe1x0XHRcclxuXHRcdGNvbnN0IGtleSA9IGFLZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XHRcclxuXHRcdGlmKHR5cGVvZiBhT2JqZWN0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdGFPYmplY3Rba2V5XSA9IGFEYXRhO1xyXG5cdFx0ZWxzZXtcdFx0XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhT2JqZWN0W2tleV07XHJcblx0XHRcdGlmKGRhdGEgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRkYXRhLnB1c2goYURhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0YU9iamVjdFtrZXldID0gW2FPYmplY3Rba2V5XSwgYURhdGFdO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICogXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICogXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuY29uc3QgaXNQb2pvID0gZnVuY3Rpb24oYU9iamVjdCl7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXIgXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqIFxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICogXHJcbiAqIEBwYXJhbSBhVGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIGFTb3VyY2VzOm9iamVjdFxyXG4gKiBcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuY29uc3QgbWVyZ2UgPSBmdW5jdGlvbihhVGFyZ2V0KXtcdFxyXG5cdGZvcihsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKGFLZXkgPT4ge1xyXG5cdFx0XHRpZihpc1Bvam8oYVRhcmdldFthS2V5XSkpXHJcblx0XHRcdFx0bWVyZ2UoYVRhcmdldFthS2V5XSwgc291cmNlW2FLZXldKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFUYXJnZXRbYUtleV0gPSBzb3VyY2VbYUtleV07XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIGFUYXJnZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8gOiBpc1Bvam8sXHJcblx0YXBwZW5kOiBhcHBlbmQsXHJcblx0bWVyZ2UgOiBtZXJnZVxyXG59OyIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XG5cdGNvbnN0cnVjdG9yKGtleSwgY29udGV4dCl7XG5cdFx0dGhpcy5rZXkgPSBrZXk7XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblx0fVxuXHRcblx0Z2V0IGtleURlZmluZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5rZXkgaW4gdGhpcy5jb250ZXh0OyBcblx0fVxuXHRcblx0Z2V0IGhhc1ZhbHVlKCl7XG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcblx0fVxuXHRcblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdHNldCB2YWx1ZShkYXRhKXtcblx0XHR0aGlzLmNvbnRleHRbdGhpcy5rZXldID0gZGF0YTtcblx0fVxuXHRcblx0c2V0IGFwcGVuZChkYXRhKSB7XG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdHZhbHVlLnB1c2goZGF0YSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XG5cdFx0fVxuXHR9XG5cdFxuXHRyZW1vdmUoKXtcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcblx0fVxuXHRcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcblx0XHRjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiXFwuXCIpO1xuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYoIWNvbnRleHRbbmFtZV0pe1xuXHRcdFx0XHRpZighY3JlYXRlKVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XG5cdH1cbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKiBcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqICBcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbihhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKVxyXG5cdFx0cHJvcGVydHkuYXBwZW5kID0gYURhdGE7XHJcblx0fVxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICogXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICogXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uKGFPYmplY3QpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGFPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgYU9iamVjdCAhPSBudWxsICYmIGFPYmplY3QuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIlxyXG59XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlciBcclxuICogdmFsdWUgd291bGQgYmUgcmVwbGFjZWQgYnkgdmFsdWUgZnJvbSB0aGUgc291cmNlIG9iamVjdC5cclxuICogXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKiBcclxuICogQHBhcmFtIGFUYXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gYVNvdXJjZXM6b2JqZWN0XHJcbiAqIFxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbihhVGFyZ2V0KSB7XHJcblx0Zm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChhS2V5ID0+IHtcclxuXHRcdFx0aWYgKGlzUG9qbyhhVGFyZ2V0W2FLZXldKSlcclxuXHRcdFx0XHRtZXJnZShhVGFyZ2V0W2FLZXldLCBzb3VyY2VbYUtleV0pO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0YVRhcmdldFthS2V5XSA9IHNvdXJjZVthS2V5XTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGFUYXJnZXQ7XHJcbn1cclxuXHJcblxyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7ZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW119ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSlcclxuXHRcdFx0cmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIlxyXG5cdFx0XHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcFxyXG5cdFx0XHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0XHJcblx0XHRcdFx0fHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHBcclxuXHRcdFx0XHR8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXVxyXG5cdFx0XHRcdHx8IHZhbHVlID09IGRhdGEpXHJcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHtkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6ICBwYXJlbnRzLmNvbmNhdChkYXRhKX0pO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyXHJcbn07IiwiY29uc3Qgc2Vla0F0Q2hhaW4gPSAocmVzb2x2ZXIsIHByb3BlcnR5KSA9PiB7XG5cdHdoaWxlKHJlc29sdmVyKXtcblx0XHRjb25zdCBkZWYgPSByZXNvbHZlci5wcm94eS5oYW5kbGUuZ2V0UHJvcGVydHlEZWYocHJvcGVydHksIGZhbHNlKTtcblx0XHRpZihkZWYpXG5cdFx0XHRyZXR1cm4gZGVmO1xuXHRcdFxuXHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xuXHR9XHRcblx0cmV0dXJuIHsgZGF0YTogbnVsbCwgcmVzb2x2ZXI6IG51bGwsIGRlZmluZWQ6IGZhbHNlIH07XG59XG5cbmNsYXNzIEhhbmRsZSB7XG5cdGNvbnN0cnVjdG9yKGRhdGEsIHJlc29sdmVyKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0Z2V0UHJvcGVydHlEZWYocHJvcGVydHksIHNlZWsgPSB0cnVlKSB7XG5cdFx0aWYgKHRoaXMuY2FjaGUuaGFzKHByb3BlcnR5KSlcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLmdldChwcm9wZXJ0eSk7XG5cdFx0XG5cdFx0bGV0IGRlZiA9IG51bGxcblx0XHRpZiAodGhpcy5kYXRhICYmIHByb3BlcnR5IGluIHRoaXMuZGF0YSlcblx0XHRcdGRlZiA9IHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9O1xuXHRcdGVsc2UgaWYoc2Vlaylcblx0XHRcdGRlZiA9IHNlZWtBdENoYWluKHRoaXMucmVzb2x2ZXIucGFyZW50LCBwcm9wZXJ0eSk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0aWYoZGVmLmRlZmluZWQpXG5cdFx0XHR0aGlzLmNhY2hlLnNldChwcm9wZXJ0eSwgZGVmKTtcblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0aGFzUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRyZXR1cm4gZGVmaW5lZDtcblx0fVxuXHRnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuXHRcdC8vQFRPRE8gd3JpdGUgdGVzdHMhISFcdFxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRhdGEgPyBkYXRhW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcblx0fVxuXHRzZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkYXRhLCBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRpZiAoZGVmaW5lZClcblx0XHRcdGRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhKVxuXHRcdFx0XHR0aGlzLmRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kYXRhID0ge31cblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9KTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXHRcdFxuXHRcdHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkIGZ1bmN0aW9uIVwiKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHQge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0LCByZXNvbHZlcikge1xuXHRcdHRoaXMuaGFuZGxlID0gbmV3IEhhbmRsZShjb250ZXh0LCByZXNvbHZlcik7XHRcdFxuXHRcdHRoaXMuZGF0YSA9IG5ldyBQcm94eSh0aGlzLmhhbmRsZSwge1xuXHRcdFx0aGFzOiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5oYXNQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5nZXRQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZGVsZXRlUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9AVE9ETyBuZWVkIHRvIHN1cHBvcnQgdGhlIG90aGVyIHByb3h5IGFjdGlvbnNcdFx0XG5cdFx0fSk7O1xuXHR9XG5cdFxuXHR1cGRhdGVEYXRhKGRhdGEpe1xuXHRcdHRoaXMuaGFuZGxlLnVwZGF0ZURhdGEoZGF0YSlcdFx0XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmhhbmRsZS5yZXNldENhY2hlKCk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdFZhbHVlIHtcblx0Y29uc3RydWN0b3IodmFsdWUpe1xuXHRcdHRoaXMuaGFzVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XHRcbn07IiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzXCJcclxuaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzXCJcclxuaW1wb3J0IERlZmF1bHRWYWx1ZSBmcm9tIFwiLi9EZWZhdWx0VmFsdWUuanNcIjtcclxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vQ29udGV4dC5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IEVYRUNVVElPTl9XQVJOX1RJTUVPVVQgPSAxMDAwO1xyXG5jb25zdCBFWFBSRVNTSU9OID0gL1xcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9LztcclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0XHJcblx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgZXhwcmVzc2lvbihhQ29udGV4dCk7XHJcblx0XHJcblx0aWYodGltZW91dClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlID0gYXN5bmMgZnVuY3Rpb24oYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKVxyXG5cdFx0cmV0dXJuIGFSZXNvbHZlci5wYXJlbnQgPyByZXNvbHZlKGFSZXNvbHZlci5wYXJlbnQsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkgOiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoYUV4cHJlc3Npb24sIGFSZXNvbHZlci5wcm94eS5kYXRhKTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHRlbHNlIGlmIChhRGVmYXVsdCBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSAmJiBhRGVmYXVsdC5oYXNWYWx1ZSlcclxuXHRcdHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlKHRoaXMsIG1hdGNoWzNdLCBub3JtYWxpemUobWF0Y2hbMl0pLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIGF3YWl0IHJlc29sdmUodGhpcywgbm9ybWFsaXplKGFFeHByZXNzaW9uKSwgbnVsbCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcImVycm9yIGF0IGV4ZWN1dGluZyBzdGF0bWVudFxcXCJcIiwgYUV4cHJlc3Npb24sIFwiXFxcIjpcIiwgZSk7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWUuaGFzVmFsdWUgPyBkZWZhdWx0VmFsdWUudmFsdWUgOiBhRXhwcmVzc2lvbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhRGVmYXVsdCkge1xyXG5cdFx0bGV0IHRleHQgPSBhVGV4dDtcclxuXHRcdGxldCB0ZW1wID0gYVRleHQ7IC8vIHJlcXVpcmVkIHRvIHByZXZlbnQgaW5maW5pdHkgbG9vcFxyXG5cdFx0bGV0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRleHQpO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRFxyXG5cdFx0d2hpbGUgKG1hdGNoICE9IG51bGwpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXNvbHZlKG1hdGNoWzBdLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHR0ZW1wID0gdGVtcC5zcGxpdChtYXRjaFswXSkuam9pbigpOyAvLyByZW1vdmUgY3VycmVudCBtYXRjaCBmb3IgbmV4dCBsb29wXHJcblx0XHRcdHRleHQgPSB0ZXh0LnNwbGl0KG1hdGNoWzBdKS5qb2luKHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKHJlc3VsdCA9PSBudWxsID8gXCJudWxsXCIgOiByZXN1bHQpKTtcclxuXHRcdFx0bWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGVtcCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGV4dDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmUoYUV4cHJlc3Npb24sIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmUoYUV4cHJlc3Npb24sIGRlZmF1bHRWYWx1ZSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBidWlsZFNlY3VyZSh7Y29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9uPXtkZWVwOnRydWV9LCBuYW1lLCBwYXJlbnR9KXtcclxuXHRcdGNvbnRleHQgPSBPYmplY3RVdGlscy5maWx0ZXIoe2RhdGE6IGNvbnRleHQsIHByb3BGaWx0ZXIsIG9wdGlvbn0pO1xyXG5cdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoe2NvbnRleHQsIG5hbWUsIHBhcmVudH0pO1xyXG5cdH1cclxufTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSwgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEXTtcblxuY2xhc3MgQmFzZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlKCk7XG5cdH1cblxuXHRhc3luYyBpbml0QmFzZSgpIHtcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5pbml0KCkpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuaW5pdGlhbGl6ZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGFkb3B0ZWRDYWxsYmFjaygpIHtcblx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2UpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdFx0dGhpcy5hY3RpdmVVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0YWN0aXZlVXBkYXRlZCgpIHtcblx0fVxuXG5cdGdldCByZWFkb25seSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkgeyB9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge1xuXG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSwgQVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSBcIi4vVmFsaWRhdG9yXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEZpZWxkID0gKGZpZWxkKSA9PiB7XG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHBhcmVudDtcblxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XG5cdGZpZWxkLmF0dHIoQVRUUklCVVRFX05PVkFMVUUsICFoYXNWYWx1ZSA/IFwiXCIgOiBudWxsKTtcbn1cblxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX192YWx1ZV9fID0gdmFsdWU7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHRoaXMuaW5pdEJhc2VGaWVsZCgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdEJhc2VGaWVsZCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlKCk7XG5cblx0XHR0aGlzLnBhcmVudEZpZWxkID0gZmluZFBhcmVudEZpZWxkKHRoaXMpO1xuXHRcdHRoaXMudmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcih0aGlzKTtcblxuXHRcdHRoaXMub24oRVZFTlRTLmNvbmRpdGlvblN0YXRlQ2hhbmdlZCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMpIHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5pbnB1dCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMpIHtcblx0XHRcdFx0XHR0aGlzLl9fdmFsdWVfXyA9IGV2ZW50LmRldGFpbCA/IGV2ZW50LmRldGFpbFswXSA6IG51bGw7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XHJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0aGlzLmZvcm0ub24oXG5cdFx0XHRFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLFxuXHRcdFx0YXN5bmMgKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBldmVudC5kZXRhaWxbMF07XG5cdFx0XHRcdGlmIChjaGFpbi5pbmRleE9mKHRoaXMpIDwgMCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLnZhbGlkO1xuXHRcdFx0XHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50ICE9IHZhbGlkKVxuXHRcdFx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0XG5cdFx0dGhpcy5mb3JtLm9uKEVWRU5UUy5hbGxQdWJsaXNoVmFsdWUsICgpPT4ge1xuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMudmFsaWRhdGUoKTtcblx0fVxuXG5cdGNvbmRpdGlvblVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5hY3RpdmUgPSB0aGlzLmNvbmRpdGlvbjtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfTkFNRSk7XG5cdH1cblxuXHRnZXQgcmVxdWlyZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRVFVSVJFRCk7XG5cdH1cblxuXHRnZXQgaGFzVmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXHRcdHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fX3ZhbHVlX187XHJcblx0fVxuXG5cdHNldCB2YWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLl9fdmFsdWVfXyAhPSB2YWx1ZSAmJiB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblx0XHRcdGlmICh0aGlzLl9fdmFsdWVfXyAhPSB2YWx1ZSkge1xuXHRcdFx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcblx0XHR1cGRhdGVIYXNWYWx1ZSh0aGlzLmhhc1ZhbHVlLCB0aGlzKTtcblx0XHRpZiAoIXRoaXMudmFsaWRhdG9yKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXG5cdGFzeW5jIHB1Ymxpc2hWYWx1ZShjaGFpbiA9IFtdKSB7XG5cdFx0Y2hhaW4ucHVzaCh0aGlzKTtcblx0XHRsZXQgdmFsdWUgPSBudWxsO1xuXHRcdC8vaWYgKHRoaXMuY29uZGl0aW9uKVxuXHRcdHZhbHVlID0gdGhpcy52YWx1ZTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy52YWx1ZUNoYW5nZWQsIGNoYWluKTtcblx0XHR9LCBUUklHR0VSX1RJTUVPVVQpO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkgeyB9XG59XG5leHBvcnQgZGVmYXVsdCBCYXNlRmllbGQ7XG4iLCJleHBvcnQgY29uc3QgSFRNTF9UQUdfUFJFRklYID0gXCJkLVwiO1xuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX1RJTUVPVVQgPSAxMDtcblxuZXhwb3J0IGNvbnN0IE5PREVOQU1FUyA9IHtcblx0Rm9ybTogSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtXCIsXG5cdENvbnRyb2w6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbFwiLFxuXHRCYWNrQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtYmFja1wiLFxuXHROZXh0QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtbmV4dFwiLFxuXHRTdW1tYXJ5QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtc3VtbWFyeVwiLFxuXHRTdWJtaXRCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1zdWJtaXRcIixcblx0Q2FuY2VsQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtY2FuY2VsXCIsXG5cdFBhZ2U6IEhUTUxfVEFHX1BSRUZJWCArIFwicGFnZVwiLFxuXHRGaWVsZDogSFRNTF9UQUdfUFJFRklYICsgXCJmaWVsZFwiLFxuXHRXcmFwcGVyRmllbGQ6IEhUTUxfVEFHX1BSRUZJWCArIFwid3JhcHBlci1maWVsZFwiLFxuXHRMaXN0OiBIVE1MX1RBR19QUkVGSVggKyBcImxpc3RcIixcblx0TGlzdFJvd3M6IEhUTUxfVEFHX1BSRUZJWCArIFwicm93c1wiLFxuXHRMaXN0Um93OiBIVE1MX1RBR19QUkVGSVggKyBcInJvd1wiLFxuXHRCdXR0b25BZGRSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiYWRkLXJvd1wiLFxuXHRCdXR0b25EZWxldGVSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiZGVsZXRlLXJvd1wiLFxuXHRDb250YWluZXI6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udGFpbmVyXCIsXG5cdFZhbGlkYXRpb246IEhUTUxfVEFHX1BSRUZJWCArIFwidmFsaWRhdGlvblwiLFxuXHRNZXNzYWdlOiBIVE1MX1RBR19QUkVGSVggKyBcIm1lc3NhZ2VcIixcblx0UHJvZ3Jlc3NCYXI6IEhUTUxfVEFHX1BSRUZJWCArIFwicHJvZ3Jlc3MtYmFyXCIsXG5cdFN0ZXA6IEhUTUxfVEFHX1BSRUZJWCArIFwic3RlcFwiLFxufTtcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVTID0ge1xuXHRpbml0OiBcImluaXRcIixcblx0aW5wdXQ6IFwiaW5wdXRcIixcblx0c3VtbWFyeTogXCJzdW1tYXJ5XCIsXG5cdGZpbmlzaGVkOiBcImZpbmlzaGVkXCIsXG59O1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURTVEFURVMgPSB7XG5cdGFsd2F5czogXCJhbHdheXNcIixcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJldmVudC1cIjtcblxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IHtcblx0aW5pdGlhbGl6ZTogRVZFTlRfUFJFRklYICsgXCJpbml0aWFsaXplXCIsXG5cdC8qIGZpcmVkIGJ5IGNoYW5nZSB2YWx1ZSBmcm9tIGFuIGZpZWxkIGltcGxlbWVudGF0aW9uXG5cdCAqIGFuZCBjb25zdW1lZCBieSB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mXG5cdCAqIEJhc2VGaWVsZCB0byBtYWtlIHZhbGlkYXRpb24gYW5kIGZpcmUgdmFsdWVDaGFuZ2VkXG5cdCAqIGV2ZW50XG5cdCAqL1xuXHRpbnB1dDogRVZFTlRfUFJFRklYICsgXCJpbnB1dFwiLFxuXHQvKiBpbnRlcm5hbCBldmVudCBmb3IgcHVibGlzaCB0aGF0IGEgdmFsdWUgb2YgZmllbGQgaGFzIGNoYW5nZWQgKGV2ZW50IGFmdGVyIHZhbGlkYXRpb24pICovXG5cdHZhbHVlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWx1ZS1jaGFuZ2VkXCIsXG5cdC8qIGludGVybmFsIGV2ZW50IHRvIHN0YXJ0IHZhbGlkYXRpb24gYXQgZWxlbWVudHMgLT4gb25seSBmaXJlZCBhdCBmb3JtKi9cblx0ZXhlY3V0ZVZhbGlkYXRlOiBFVkVOVF9QUkVGSVggKyBcImV4ZWN1dGUtdmFsaWRhdGVcIixcblx0LyogKi9cblx0YWN0aXZlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImFjdGl2ZS1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGNvbmRpdGlvblN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJjb25kaXRpb24tc3RhdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHR2YWxpZFN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWxpZC1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdHNpdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcInNpdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHRmb3JtU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImZvcm0tc3RhdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHRhbGxQdWJsaXNoVmFsdWU6IEVWRU5UX1BSRUZJWCArIFwiYWxsLXB1Ymxpc2gtdmFsdWVcIixcblx0LyogKi9cblx0c3VibWl0OiBFVkVOVF9QUkVGSVggKyBcInN1Ym1pdFwiLFxuXHQvKiAqL1xuXHRwcm9ncmVzc2JhckNoYW5nZWQgOiBFVkVOVF9QUkVGSVggKyBcInByb2dyZXNzLWJhci1jaGFuZ2VkXCIsXG5cblx0Ly9vbGQgbmVlZCB0byBiZSByZWZhY3RvcmVkXG5cblx0YWRkZWQ6IEVWRU5UX1BSRUZJWCArIFwiYWRkZWRcIixcblx0Y2hhbmdlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZVwiLFxuXHRjaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXI6IChuYW1lKSA9PiB7XG5cdFx0cmV0dXJuIEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWF0dHJpYnV0ZS1cIiArIG5hbWU7XG5cdH0sXG5cdGNoYW5nZUFjdGl2ZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtYWN0aXZlXCIsXG5cdGNoYW5nZVZhbHVlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWx1ZVwiLFxuXHRjaGFuZ2VDb25kaXRpb246IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWNvbmRpdGlvblwiLFxuXHRjaGFuZ2VWYWxpZGF0aW9uOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWxpZGF0aW9uXCIsXG5cblx0Ly9MSVNUIEVWRU5UU1xuXHRsaXN0Um93QWRkOiBFVkVOVF9QUkVGSVggKyBcImxpc3Qtcm93LWFkZFwiLFxuXHRsaXN0Um93RGVsZXRlOiBFVkVOVF9QUkVGSVggKyBcImxpc3Qtcm93LWRlbGV0ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IFNQRUNJQUxWQVJTID0ge1xuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCIsXG59O1xuXG4vL0FUVFJJQlVURVNcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OQU1FID0gXCJuYW1lXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VORFBPSU5UID0gXCJlbmRwb2ludFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NRVRIT0QgPSBcIm1ldGhvZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEFURSA9IFwic3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRUQgPSBcInJlcXVpcmVkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEX09OX0FDVElWRV9PTkxZID0gXCJyZXF1aXJlZC1vbi1hY3RpdmUtb25seVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVBRE9OTFkgPSBcInJlYWRvbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlZBTElEID0gXCJpbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCA9IFwiY29uZGl0aW9uLXZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEID0gXCJjb25kaXRpb24taW52YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NQVggPSBcIm1heFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIjtcbiIsImltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBmaW5kRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xuXG5jb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uKGRhdGEsIG5hbWUsIHZhbHVlKSB7XG5cdGlmIChkYXRhID09IG51bGwgfHwgdHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0Y29uc3QgdXBkYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG5cblx0Y29uc3QgbmFtZXMgPSBuYW1lLnNwbGl0KE5BTUVfU1BMSVRURVIpO1xuXHR3aGlsZSAobmFtZXMubGVuZ3RoID4gMSkge1xuXHRcdGNvbnN0IGtleSA9IG5hbWVzLnNoaWZ0KCk7XG5cdFx0bGV0IHRlbXAgPSBkYXRhW2tleV07XG5cdFx0Y29uc3QgaGFzID0gdHlwZW9mIHRlbXAgIT09IFwidW5kZWZpZW5kXCIgJiYgdGVtcCAhPSBudWxsO1xuXHRcdGlmICghaGFzICYmICF1cGRhdGUpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRlbHNlIGlmICghaGFzICYmIHVwZGF0ZSlcblx0XHRcdHRlbXAgPSBkYXRhW2tleV0gPSB7fTtcblxuXHRcdGRhdGEgPSB0ZW1wO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSlcblx0XHRkYXRhW25hbWVzWzBdXSA9IHZhbHVlO1xuXHRlbHNlXG5cdFx0cmV0dXJuIGRhdGFbbmFtZXNbMF1dID8gZGF0YVtuYW1lc1swXV0gOiBudWxsO1xufTtcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIodmFsdWUgPyB2YWx1ZSA6IHt9KTtcblx0XHR0aGlzLmZpZWxkcyA9IFtdO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMudmFsdWVDaGFuZ2VkLFxuXHRcdFx0KGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmIChldmVudC50YXJnZXQgIT0gdGhpcykge1xuXHRcdFx0XHRcdGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcblxuXHRcdFx0XHRcdGlmIChuYW1lKVxuXHRcdFx0XHRcdFx0dmFsdWVIZWxwZXIodGhpcy5fX3ZhbHVlX18sIG5hbWUsIHZhbHVlKTtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZSAhPSBudWxsKVxuXHRcdFx0XHRcdFx0T2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fX3ZhbHVlX18sIHZhbHVlKTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShldmVudC5kZXRhaWxbMF0pO1xuXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHRoaXMuaW5pdENvbnRhaW5lcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdENvbnRhaW5lcigpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlRmllbGQoKTtcblxuXHRcdHRoaXMuZmllbGRzID0gZmluZEZpZWxkcyh0aGlzKTtcblx0XHR0aGlzLm9uKEVWRU5UUy5pbml0aWFsaXplLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmIChldmVudC50YXJnZXQgIT0gdGhpcykge1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5maWVsZHMuaW5kZXhPZihmaWVsZCkgPCAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZpZWxkcy5wdXNoKGZpZWxkKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyBkYXRhLCB0YXJnZXQgfSkgPT4ge1xuXHRcdFx0Y29uc3QgeyBmaWVsZHMgfSA9IHRhcmdldDtcblx0XHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdFx0Y29uc3QgbGVuZ3RoID0gZmllbGRzLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuXHRcdFx0XHRcdGlmIChmaWVsZC5jb25kaXRpb24gJiYgIWZpZWxkLnZhbGlkKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cdH1cblxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XG5cdFx0aWYgKGZpZWxkcylcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdFx0fVxuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy5fX3ZhbHVlX18gPSB7fTtcblx0XHRjb25zdCB7IGZpZWxkcyB9ID0gdGhpcztcblx0XHRpZiAoZmllbGRzKVxuXHRcdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG5cdFx0XHRcdGlmIChmaWVsZC5uYW1lKSBmaWVsZC52YWx1ZSA9IHZhbHVlSGVscGVyKHZhbHVlLCBmaWVsZC5uYW1lKTtcblx0XHRcdFx0ZWxzZSBpZiAoZmllbGQgaW5zdGFuY2VvZiBDb250YWluZXIpIGZpZWxkLnZhbHVlID0gdmFsdWU7XG5cdFx0XHR9XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5Db250YWluZXIsIENvbnRhaW5lcik7XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iLCJpbXBvcnQgeyBGT1JNU1RBVEVTLCBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9FdmVudHMsIHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyBCYWNrQnV0dG9uLCBOZXh0QnV0dG9uLCBTdW1tYXJ5QnV0dG9uLCBTdWJtaXRCdXR0b24sIENhbmNlbEJ1dHRvbiB9IGZyb20gXCIuL2NvbnRyb2xzXCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9QYWdlXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY29uc3QgaW5pdCA9IChjb250cm9sKSA9PiB7XG5cdGNvbnRyb2wuZm9ybSA9IGNvbnRyb2wucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0Y29udHJvbC5iYWNrID0gY29udHJvbC5maW5kKE5PREVOQU1FUy5CYWNrQnV0dG9uKS5maXJzdCgpO1xuXHRjb250cm9sLm5leHQgPSBjb250cm9sLmZpbmQoTk9ERU5BTUVTLk5leHRCdXR0b24pLmZpcnN0KCk7XG5cdGNvbnRyb2wuc3VtbWFyeSA9IGNvbnRyb2wuZmluZChOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbikuZmlyc3QoKTtcblx0Y29udHJvbC5zdWJtaXQgPSBjb250cm9sLmZpbmQoTk9ERU5BTUVTLlN1Ym1pdEJ1dHRvbikuZmlyc3QoKTtcblxuXHRjb250cm9sLmZvcm0ub24oXG5cdFx0W0VWRU5UUy52YWxpZFN0YXRlQ2hhbmdlZCwgRVZFTlRTLmNvbmRpdGlvblN0YXRlQ2hhbmdlZF0sXG5cdFx0KGV2ZW50KSA9PiB7XG5cdFx0XHRpZihldmVudC50YXJnZXQgaW5zdGFuY2VvZiBQYWdlKVxuXHRcdFx0XHRjb250cm9sLnVwZGF0ZSgpO1xuXHRcdH1cblx0KTtcblxuXHRjb250cm9sLmZvcm0ub24oXG5cdFx0W0VWRU5UUy5mb3JtU3RhdGVDaGFuZ2VkLCBFVkVOVFMuc2l0ZUNoYW5nZWRdLFxuXHRcdChldmVudCkgPT4ge1xuXHRcdFx0Y29udHJvbC51cGRhdGUoKTtcblx0XHR9XG5cdCk7XG59O1xuXG5jbGFzcyBDb250cm9sIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBpbml0KGNvbnRyb2wpIHtcblx0XHRpbml0KGNvbnRyb2wpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdENvbnRyb2wuaW5pdCh0aGlzKTtcblx0fVxuXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUpIHtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXIobmFtZSkpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdGNvbnN0IHsgYmFjaywgbmV4dCwgc3VtbWFyeSwgc3VibWl0LCBmb3JtIH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgYWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBuZXh0UGFnZSwgcGFnZXMsIHVzZVN1bW1hcnlQYWdlLCBzdGF0ZSB9ID0gZm9ybTtcblxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XG5cdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdW1tYXJ5LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xuXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XG5cdFx0XHRcblx0XHRcdGlmIChuZXh0UGFnZSB8fCAoIWFjdGl2ZVBhZ2UudmFsaWQgJiYgKGFjdGl2ZVBhZ2VJbmRleCArIDEgPCBwYWdlcy5sZW5ndGgpKSkge1xuXHRcdFx0XHRuZXh0LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdG5leHQuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcblx0XHRcdH0gZWxzZSBpZiAodXNlU3VtbWFyeVBhZ2UgJiYgc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0XHRzdW1tYXJ5LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdHN1bW1hcnkuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuQ29udHJvbCwgQ29udHJvbCk7XG5leHBvcnQgZGVmYXVsdCBDb250cm9sO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCB7IGZpbmRXcmFwcGVyIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW1wiZmlsZS1mb3JtYXRcIl07XG5cbmNsYXNzIEZpZWxkIGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0RmllbGQoKTtcblx0fVxuXG5cdGFzeW5jIGluaXRGaWVsZCgpIHtcblx0XHRhd2FpdCB0aGlzLmluaXRCYXNlRmllbGQoKTtcblx0XHR0aGlzLndyYXBwZXIgPSBmaW5kV3JhcHBlcih0aGlzKTtcblx0XHRpZiAodGhpcy53cmFwcGVyKVxuXHRcdFx0dGhpcy52YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy53cmFwcGVyLnZhbGlkO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XG5cdFx0aWYgKHRoaXMud3JhcHBlcilcblx0XHRcdHRoaXMud3JhcHBlci5yZWFkb25seSA9IHRoaXMucmVhZG9ubHk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB0aGlzLndyYXBwZXIgPyB0aGlzLndyYXBwZXIuYWNjZXB0VmFsdWUodmFsdWUpIDogZmFsc2U7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLndyYXBwZXIpXG5cdFx0XHRyZXR1cm4gdGhpcy53cmFwcGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLndyYXBwZXIpXG5cdFx0XHR0aGlzLndyYXBwZXIudXBkYXRlZFZhbHVlKHZhbHVlKTtcblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkZpZWxkLCBGaWVsZCk7XG5leHBvcnQgZGVmYXVsdCBGaWVsZDtcbiIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IEZPUk1TVEFURVMsIE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xuaW1wb3J0IFwiLi9QYWdlXCI7XG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFXTtcblxuY29uc3QgcmVhZG9ubHkgPSAoZm9ybSwgcmVhZG9ubHkpID0+IHtcblx0Zm9yIChsZXQgcGFnZSBvZiBmb3JtLnBhZ2VzKSB7XG5cdFx0cGFnZS5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdHBhZ2UuYWN0aXZlID0gcmVhZG9ubHk7XG5cdH1cbn07XG5cbmNvbnN0IGluaXQgPSAoZm9ybSkgPT4ge1xuXHRmb3JtLnN0YXRlID0gRk9STVNUQVRFUy5pbml0O1xuXHRmb3JtLnVzZVN1bW1hcnlQYWdlID0gZm9ybS5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xuXHRmb3JtLnBhZ2VzID0gZm9ybS5maW5kKE5PREVOQU1FUy5QYWdlKTtcblx0Zm9ybS5hY3RpdmVQYWdlSW5kZXggPSAtMTtcblx0aWYgKGZvcm0ucGFnZXMubGVuZ3RoID4gMCkgZm9ybS50b05leHRQYWdlKCk7XG59O1xuXG5jbGFzcyBGb3JtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBpbml0KGZvcm0pIHtcblx0XHRpbml0KGZvcm0pO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9fZGF0YV9fID0ge307XG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuaW5pdDtcblx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xuXHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy52YWx1ZUNoYW5nZWQsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0aWYgKG5hbWUpIHRoaXMuX19kYXRhX19bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIE9iamVjdFV0aWxzLm1lcmdlKHRoaXMuX19kYXRhX18sIHZhbHVlKTtcblxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5leGVjdXRlVmFsaWRhdGUsIGV2ZW50LmRldGFpbFswXSk7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdEZvcm0uaW5pdCh0aGlzKTtcblx0fVxuXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUpIHtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXIobmFtZSkpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHJlYWRvbmx5KHRoaXMsIHRydWUpO1xuXHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHJlYWRvbmx5KHRoaXMsIGZhbHNlKTtcblx0XHRcdGlmICh0aGlzLmFjdGl2ZVBhZ2UpIHRoaXMuYWN0aXZlUGFnZS5hY3RpdmUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuXG5cdFx0aWYgKGFjdHVhbCAhPSBzdGF0ZSkgdGhpcy50cmlnZ2VyKEVWRU5UUy5mb3JtU3RhdGVDaGFuZ2VkKTtcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1NUQVRFLCB0aGlzLl9zdGF0ZSk7XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSB7XG5cdFx0XHRpZiAoIXBhZ2UudmFsaWQpIHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldCBkYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLl9fZGF0YV9fO1xuXHR9XG5cblx0c2V0IGRhdGEoZGF0YSkge1xuXHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuX19kYXRhX18gPSB7fTsgLy9kYXRhO1xuXHRcdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSB7XG5cdFx0XHRcdGlmIChwYWdlLm5hbWUpIHBhZ2UudmFsdWUgPSBkYXRhW3BhZ2UubmFtZV07XG5cdFx0XHRcdGVsc2UgcGFnZS52YWx1ZSA9IGRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuYWxsUHVibGlzaFZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgYWN0aXZlUGFnZSgpIHtcblx0XHRpZiAoMCA8PSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAmJiB0aGlzLmFjdGl2ZVBhZ2VJbmRleCA8IHRoaXMucGFnZXMubGVuZ3RoKSByZXR1cm4gdGhpcy5wYWdlc1t0aGlzLmFjdGl2ZVBhZ2VJbmRleF07XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHNldCBhY3RpdmVQYWdlKHBhZ2UpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmVQYWdlO1xuXHRcdGlmIChwYWdlICE9IGN1cnJlbnQpIHtcblx0XHRcdGlmIChjdXJyZW50KSBjdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XG5cdFx0XHRwYWdlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVTLmlucHV0KSB0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5zaXRlQ2hhbmdlZCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHByZXZQYWdlKCkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xuXHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXQgbmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMucGFnZXMpIHtcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gdGhpcy5wYWdlc1tpXTtcblx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhc3luYyB0b1ByZXZQYWdlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBwcmV2ID0gYXdhaXQgdGhpcy5wcmV2UGFnZTtcblx0XHRcdGlmIChwcmV2KSB0aGlzLmFjdGl2ZVBhZ2UgPSBwcmV2O1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XG5cdFx0Y29uc3QgbmV4dCA9IGF3YWl0IHRoaXMubmV4dFBhZ2U7XG5cdFx0aWYgKG5leHQpIHtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVTLmluaXQpIHRoaXMuX3N0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcblx0XHRcdHRoaXMuc3VtbWFyeSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHN1bW1hcnkoKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuc3VtbWFyeTtcblx0fVxuXG5cdGFzeW5jIHN1Ym1pdCgpIHtcblx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5maW5pc2hlZDtcblx0XHRjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xuXG5cdFx0bGV0IGVuZHBvaW50ID0gdGhpcy5hdHRyKEFUVFJJQlVURV9FTkRQT0lOVCk7XG5cdFx0aWYgKGVuZHBvaW50KSB7XG5cdFx0XHRlbmRwb2ludCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlVGV4dChlbmRwb2ludCwgZGF0YSwgZW5kcG9pbnQpO1xuXHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgbG9jYXRpb24ub3JpZ2luKTtcblxuXHRcdFx0cmV0dXJuIGF3YWl0IGZldGNoKHVybC50b1N0cmluZygpLCB7XG5cdFx0XHRcdG1ldGhvZDogKHRoaXMuYXR0cihBVFRSSUJVVEVfTUVUSE9EKSB8fCBcInBvc3RcIikudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0Y3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuXHRcdFx0XHRtb2RlOiBcImNvcnNcIixcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuc3VibWl0LCBkYXRhKTtcblx0fVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuRm9ybSwgRm9ybSk7XG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRURdO1xuXG5jb25zdCBpbml0ID0gKGJ1dHRvbikgPT4ge1xuXHRidXR0b24uZm9ybSA9IGJ1dHRvbi5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHRidXR0b24uYWN0aXZlID0gZmFsc2U7XG5cdGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXHRidXR0b24ub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRpZiAoYnV0dG9uLmFjdGl2ZSAmJiAhYnV0dG9uLmRpc2FibGVkKSBidXR0b24uZXhlY3V0ZSgpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH0pO1xufTtcblxuY2xhc3MgRm9ybUJ1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChjb250cm9sQnV0dG9uKSB7XG5cdFx0aW5pdChjb250cm9sQnV0dG9uKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRGb3JtQnV0dG9uLmluaXQodGhpcyk7XG5cdH1cblxuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2UpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XG5cdH1cblxuXHRnZXQgZGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9ESVNBQkxFRCk7XG5cdH1cblxuXHRzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcblx0XHRkaXNhYmxlZCA/IHRoaXMuYXR0cihBVFRSSUJVVEVfRElTQUJMRUQsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9ESVNBQkxFRCwgbnVsbCk7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiZXhlY3V0ZVwiKTtcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybUJ1dHRvbjtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9NQVgsIEFUVFJJQlVURV9JTlZBTElEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgUm93IGZyb20gXCIuL2xpc3QvUm93XCI7XG5pbXBvcnQgQWRkUm93IGZyb20gXCIuL2xpc3QvQWRkUm93XCI7XG5pbXBvcnQgRGVsZXRlUm93IGZyb20gXCIuL2xpc3QvRGVsZXRlUm93XCI7XG5pbXBvcnQgUm93cyBmcm9tIFwiLi9saXN0L1Jvd3NcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTUFYXTtcblxuY29uc3QgZmluZEFkZEJ1dHRvbiA9IChsaXN0KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290OiBsaXN0LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQWRkUm93KSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogZmFsc2UsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9XG5cdH0pWzBdO1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gKGxpc3QsIHZhbHVlKSA9PiB7XG5cdGNvbnN0IHsgY29udGFpbmVyLCB0ZW1wbGF0ZSB9ID0gbGlzdDtcblx0Y29uc3Qgcm93ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKS5jaGlsZHJlblswXTtcblx0Y29udGFpbmVyLmFwcGVuZChyb3cpO1xuXG5cdGlmICh2YWx1ZSkge1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0cm93LnZhbHVlID0gdmFsdWU7XG5cdFx0fSwgVFJJR0dFUl9USU1FT1VUKTtcblx0fVxuXG5cdHJldHVybiByb3c7XG59O1xuXG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcih2YWx1ZSA/IHZhbHVlIDogW10pO1xuXHRcdHRoaXMudGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xuXHRcdHRoaXMuY29udGFpbmVyID0gdGhpcy5maW5kKE5PREVOQU1FUy5MaXN0Um93cykuZmlyc3QoKTtcblxuXHRcdHRoaXMub24oW0VWRU5UUy52YWx1ZUNoYW5nZWQsIEVWRU5UUy5pbml0aWFsaXplXSxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgUm93KSB7XG5cdFx0XHRcdFx0Y29uc3Qgcm93cyA9IHRoaXMucm93cztcblx0XHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRcdFx0Y29uc3QgeyB2YWx1ZSB9ID0gcm93O1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcblx0XHRcdFx0XHR0aGlzLl9fdmFsdWVfX1tpbmRleF0gPSB2YWx1ZTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShldmVudC5kZXRhaWwgPyBldmVudC5kZXRhaWxbMF0gOiBbcm93XSk7XG5cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0dGhpcy5pbml0TGlzdCgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdExpc3QoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0QmFzZUZpZWxkKCk7XG5cdFx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlLCB2YWxpZGF0b3IgfSA9IHRoaXM7XG5cdFx0Y29uc3QgYWRkQnV0dG9uID0gZmluZEFkZEJ1dHRvbih0aGlzKTtcblxuXHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyB9KSA9PiB7XG5cdFx0XHRjb25zdCB7IHJvd3MsIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0aWYgKGxlbmd0aCA9PSBtYXgpIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdGVsc2UgaWYgKGxlbmd0aCA8IG1heCkgYWRkQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuZ3RoIDw9IG1heDtcblx0XHR9KTtcblxuXHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCB7IHJvd3MgfSA9IHRoaXM7XG5cdFx0XHRpZiAocm93cylcblx0XHRcdFx0Zm9yIChsZXQgcm93IG9mIHJvd3MpIHtcblx0XHRcdFx0XHRpZiAoIXJvdy52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMubGlzdFJvd0FkZCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5LCBfX3ZhbHVlX18gfSA9IHRoaXM7XG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGNvbnN0IHJvdyA9IGNyZWF0ZVJvdyh0aGlzKTtcblx0XHRcdFx0X192YWx1ZV9fLnB1c2gocm93LnZhbHVlKTtcblxuXHRcdFx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5saXN0Um93RGVsZXRlLCAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IHsgcm93cywgcmVhZG9ubHksIF9fdmFsdWVfXyB9ID0gdGhpcztcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0cm93LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJvd3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRfX3ZhbHVlX18uc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3MpIHtcblx0XHRcdHJvdy5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdH1cblx0fVxuXG5cdGdldCByb3dzKCkge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLmNoaWxkcmVuKTtcblx0fVxuXG5cdGdldCBtYXgoKSB7XG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NQVgpKSByZXR1cm4gcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NQVgpKTtcblx0XHRyZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiAhdmFsdWUgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRpZiAodGhpcy5fX3ZhbHVlX18ubGVuZ3RoID4gMClcblx0XHRcdHJldHVybiB0aGlzLl9fdmFsdWVfXztcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IHZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuYWNjZXB0VmFsdWUodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXMubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG5cdFx0XHR0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5yZW1vdmUoKTtcblx0XHRcdHRoaXMuX192YWx1ZV9fID0gW107XG5cdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0Zm9yIChsZXQgdmFsIG9mIHZhbHVlKVxuXHRcdFx0XHRcdGNyZWF0ZVJvdyh0aGlzLCB2YWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkxpc3QsIExpc3QpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRCYXNlID0gKG1lc3NhZ2UpID0+IHtcblx0bGV0IHBhcmVudCA9IG1lc3NhZ2UucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gcGFyZW50O1xuXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBpbml0ID0gKG1lc3NhZ2UpID0+IHtcblx0bWVzc2FnZS5yZWZlcmVuY2UgPSBmaW5kUGFyZW50QmFzZShtZXNzYWdlKTtcblx0bWVzc2FnZS5mb3JtID0gbWVzc2FnZS5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXG5cdG1lc3NhZ2UuZm9ybS5vbihcblx0XHR0b0V2ZW50cyhFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlKSxcblx0XHQoZXZlbnQpID0+IHtcblx0XHRcdG1lc3NhZ2UudXBkYXRlKCk7XG5cdFx0fSxcblx0KTtcblx0bWVzc2FnZS51cGRhdGUoKTtcbn07XG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGluaXQobWVzc2FnZSkge1xuXHRcdGluaXQobWVzc2FnZSk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0TWVzc2FnZS5pbml0KHRoaXMpO1xuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZUF0dHJpYnV0ZUV2ZW50QnVpbGRlcihuYW1lKSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlKCkge1xuXHRcdGNvbnN0IGRhdGEgPSBldmFsdWF0aW9uRGF0YSh0aGlzLnJlZmVyZW5jZSk7XG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHR9XG59XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5NZXNzYWdlLCBNZXNzYWdlKTtcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgQVRUUklCVVRFX1NURVAgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1NURVBdO1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0UGFnZSgpO1xuXHR9XG5cblx0YXN5bmMgaW5pdFBhZ2UoKSB7XG5cdFx0YXdhaXQgdGhpcy5pbml0Q29udGFpbmVyKCk7XG5cdH1cblxuXHRnZXQgc3RlcCgpe1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX1NURVApO1xuXHR9XG5cdFxuXHRjb25kaXRpb25VcGRhdGVkKCl7fVxufVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShOT0RFTkFNRVMuUGFnZSwgUGFnZSk7XG5leHBvcnQgZGVmYXVsdCBQYWdlO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgRk9STVNUQVRFUywgcHJvZ3Jlc3MsIEFUVFJJQlVURV9QUk9HUkVTUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXCIuL1N0ZXBcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1BST0dSRVNTXTtcclxuXHJcbmNvbnN0IGZpcnN0U3RlcFBhZ2VJbmRleCA9IChwYWdlcywgc3RlcCwgYWN0aXZlUGFnZSkgPT4ge1xyXG5cdGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcclxuXHRcdGlmIChwYWdlLnN0ZXAgPT0gc3RlcCAmJiBwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRlbHNlIGlmIChwYWdlID09IGFjdGl2ZVBhZ2UpIHJldHVybjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XHJcblxyXG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5mb3JtKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHRhcmdldCA9PSB0aGlzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGVwID0gdGFyZ2V0LmlzKE5PREVOQU1FUy5TdGVwKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVTLlN0ZXApLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIFxyXG5cdFx0XHRpZiAoIXN0ZXApIHJldHVybjtcclxuXHJcblx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMuZm9ybS5wYWdlcztcclxuXHRcdFx0Y29uc3QgYWN0aXZlUGFnZUluZGV4ID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2VJbmRleDtcclxuXHRcdFx0Y29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuZm9ybS5hY3RpdmVQYWdlO1xyXG5cdFx0XHRjb25zdCBzdGVwTmFtZSA9IHN0ZXAubmFtZTtcclxuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQgfHwgc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IGZpcnN0U3RlcFBhZ2VJbmRleChwYWdlcywgc3RlcE5hbWUsIGFjdGl2ZVBhZ2UpO1xyXG5cdFx0XHRcdGlmIChwYWdlKSB0aGlzLmZvcm0uYWN0aXZlUGFnZSA9IHBhZ2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XHJcblx0XHR0aGlzLnN0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdGVwKTtcclxuXHRcdHRoaXMuZm9ybS5vbihbRVZFTlRTLmluaXRpYWxpemUsIEVWRU5UUy5zaXRlQ2hhbmdlZCwgRVZFTlRTLmZvcm1TdGF0ZUNoYW5nZWRdLCAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xyXG5cdFx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2U7XHJcblx0XHRcdGlmICghYWN0aXZlUGFnZSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLmZvcm0uYWN0aXZlUGFnZUluZGV4O1xyXG5cdFx0XHRjb25zdCBjb3VudCA9IHRoaXMuZm9ybS5wYWdlcy5sZW5ndGg7XHJcblx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURVMuaW5pdDtcclxuXHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKChpbmRleCAqIDEwMCkgLyBjb3VudCk7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBzdGVwIG9mIHRoaXMuc3RlcHMpIHtcclxuXHRcdFx0XHRjb25zdCBuYW1lID0gc3RlcC5uYW1lO1xyXG5cdFx0XHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XHJcblx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gcGFnZVN0ZXA7XHJcblx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkpIHtcclxuXHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnk7XHJcblx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBGT1JNU1RBVEVTLmZpbmlzaGVkO1xyXG5cdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5IHx8IHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQgPyAxMDAgOiBwcm9ncmVzcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihFVkVOVFMucHJvZ3Jlc3NiYXJDaGFuZ2VkKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0IHByb2dyZXNzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MpO1xyXG5cdH1cclxuXHJcblx0c2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XHJcbiAgICAgICAgaWYodGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSlcclxuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgKyBcIiVcIik7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTLCBNYXRoLm1heCgwLCBNYXRoLm1pbihwcm9ncmVzcywgMTAwKSkpO1xyXG5cdH1cclxuXHJcblx0YWRvcHRlZENhbGxiYWNrKCkge1xyXG5cdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xyXG5cdH1cclxuXHJcblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG5cdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5jaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXIobmFtZSkpO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLlByb2dyZXNzQmFyLCBQcm9ncmVzc0Jhcik7XHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VULCBBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWV07XHJcblxyXG5jbGFzcyBTdGVwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHt9XHJcblxyXG5cdGFkb3B0ZWRDYWxsYmFjaygpIHtcclxuXHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2soKTtcclxuXHR9XHJcblxyXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcclxuXHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyKG5hbWUpKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLmNoYW5nZSk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9OQU1FKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XHJcblx0XHRpZiAoY3VycmVudCAhPSBhY3RpdmUpIHtcclxuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCByZWFkb25seSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHRyZWFkb25seSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5TdGVwLCBTdGVwKTtcclxuZXhwb3J0IGRlZmF1bHQgU3RlcDtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xyXG5cclxuY29uc3QgaW5pdCA9ICh2YWxpZGF0aW9uKSA9PiB7XHJcblx0dmFsaWRhdGlvbi5hY3RpdmUgPSBmYWxzZTtcclxufTtcclxuXHJcbmNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpbml0KHZhbGlkYXRpb24pIHtcclxuXHRcdGluaXQodmFsaWRhdGlvbik7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuXHRcdFZhbGlkYXRpb24uaW5pdCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcclxuXHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLmNoYW5nZUF0dHJpYnV0ZUV2ZW50QnVpbGRlcihuYW1lKSk7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuY2hhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxufVxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5WYWxpZGF0aW9uLCBWYWxpZGF0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbjtcclxuIiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IHsgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIE5PREVOQU1FUywgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlQ29uZGl0aW9uU3RhdGUsIHVwZGF0ZVZhbGlkU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiXG5pbXBvcnQgeyBmaW5kVmFsaWRhdGlvbnMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgeyBldmFsdWF0aW9uRGF0YSB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuXG5jbGFzcyBWYWxpZGF0b3Ige1xuXHRjb25zdHJ1Y3RvcihiYXNlKSB7XG5cdFx0dGhpcy5pbml0YWwgPSB0cnVlO1xuXHRcdHRoaXMudGFyZ2V0ID0gYmFzZTtcblx0XHR0aGlzLmN1c3RvbUNoZWNrcyA9IFtdO1xuXHRcdHRoaXMudmFsaWRhdGlvbnMgPSBmaW5kVmFsaWRhdGlvbnMoYmFzZSkgfHwgW107XG5cdFx0dGhpcy5jb25kaXRpb24gPSBiYXNlLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cblx0fVxuXG5cdGFkZEN1c3RvbUNoZWNrKGNoZWNrKSB7XG5cdFx0dGhpcy5jdXN0b21DaGVja3MucHVzaChjaGVjayk7XG5cdH1cblxuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXQuZm9ybTtcblx0fVxuXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xuXHRcdGNvbnN0IHsgdGFyZ2V0LCB2YWxpZGF0aW9ucywgY3VzdG9tQ2hlY2tzLCBjb25kaXRpb24gfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBoYXNWYWx1ZSwgcmVxdWlyZWQsIHJlcXVpcmVkT25seU9uQWN0aXZlIH0gPSB0YXJnZXQ7XG5cdFx0Y29uc3QgaGFzQ2hlY2tzID0gY3VzdG9tQ2hlY2tzLmxlbmd0aCA+IDAgfHwgdmFsaWRhdGlvbnMubGVuZ3RoID4gMDtcblx0XHRjb25zdCBkYXRhID0gZXZhbHVhdGlvbkRhdGEodGFyZ2V0KTtcblx0XHRcblxuXHRcdGNvbnN0IGNvbmRpdGlvblZhbGlkID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xuXHRcdHVwZGF0ZUNvbmRpdGlvblN0YXRlKHRhcmdldCwgY29uZGl0aW9uVmFsaWQsIHRoaXMuaW5pdGFsKTtcblxuXG5cdFx0bGV0IHZhbGlkID0gcmVxdWlyZWQgPyBoYXNWYWx1ZSA6IHRydWU7XG5cdFx0XHRcblx0XHRpZiAodmFsaWQpXG5cdFx0XHRmb3IgKGxldCBjaGVjayBvZiBjdXN0b21DaGVja3MpIHtcblx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IGNoZWNrKHsgZGF0YSwgdGFyZ2V0IH0pO1xuXHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRmb3IgKGxldCB2YWxpZGF0aW9uIG9mIHZhbGlkYXRpb25zKSB7XG5cdFx0XHRpZiAodmFsaWQgJiYgaGFzVmFsdWUpIHtcblx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHZhbGlkYXRpb24uY29uZGl0aW9uLCBkYXRhLCB0cnVlKTtcblx0XHRcdFx0dmFsaWRhdGlvbi5hY3RpdmUgPSAhdGVzdDtcblx0XHRcdFx0aWYgKCF0ZXN0KSB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlXG5cdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0YXJnZXQsIHZhbGlkLCB0aGlzLmluaXRhbCk7XG5cdFx0dGhpcy5pbml0YWwgPSBmYWxzZTtcblxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0b3I7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIEJhY2tCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XHJcblx0XHRGb3JtQnV0dG9uLmluaXQoYnV0dG9uKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5CYWNrQnV0dG9uLCBCYWNrQnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XHJcblx0XHRGb3JtQnV0dG9uLmluaXQoYnV0dG9uKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QnV0dG9uO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5OZXh0QnV0dG9uLCBOZXh0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgaW5pdChidXR0b24pIHtcclxuXHRcdEZvcm1CdXR0b24uaW5pdChidXR0b24pO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRCdXR0b247XHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLlN1Ym1pdEJ1dHRvbiwgU3VibWl0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXHRcblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFx0Rm9ybUJ1dHRvbi5pbml0KGJ1dHRvbik7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgU3VtbWFyeUJ1dHRvbjtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLlN1bW1hcnlCdXR0b24sIFN1bW1hcnlCdXR0b24pO1xuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xyXG5pbXBvcnQgTmV4dEJ1dHRvbiBmcm9tIFwiLi9OZXh0QnV0dG9uXCI7XHJcbmltcG9ydCBTdW1tYXJ5QnV0dG9uIGZyb20gXCIuL1N1bW1hcnlCdXR0b25cIjtcclxuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRCYWNrQnV0dG9uLFxyXG5cdE5leHRCdXR0b24sXHJcblx0U3VtbWFyeUJ1dHRvbixcclxuXHRTdWJtaXRCdXR0b24sXHJcbn07XHJcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcblxuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBBZGRSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0XG5cdHN0YXRpYyBpbml0KGJ1dHRvbikge1xuXHRcdEZvcm1CdXR0b24uaW5pdChidXR0b24pO1xuXHRcdGJ1dHRvbi5hY3RpdmVcdD0gdHJ1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XHRcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdEFkZFJvdy5pbml0KHRoaXMpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpe1xuXHRcdHRoaXMudHJpZ2dlcigxMDAsIEVWRU5UUy5saXN0Um93QWRkKTtcblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkJ1dHRvbkFkZFJvdywgQWRkUm93KTtcbmV4cG9ydCBkZWZhdWx0IEFkZFJvdztcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jbGFzcyBEZWxldGVSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFx0Rm9ybUJ1dHRvbi5pbml0KGJ1dHRvbik7XG5cdFx0YnV0dG9uLmFjdGl2ZVx0PSB0cnVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdERlbGV0ZVJvdy5pbml0KHRoaXMpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVFMubGlzdFJvd0RlbGV0ZSk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5CdXR0b25EZWxldGVSb3csIERlbGV0ZVJvdyk7XG5leHBvcnQgZGVmYXVsdCBEZWxldGVSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IERlbGV0ZVJvdyBmcm9tIFwiLi9EZWxldGVSb3dcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jbGFzcyBMaXN0Um93IGV4dGVuZHMgQ29udGFpbmVyIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge31cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5PREVOQU1FUy5MaXN0Um93LCBMaXN0Um93KTtcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5cbmNvbnN0IGluaXQgPSAoZWxlbWVudCkgPT4ge1xufTtcblxuY2xhc3MgTGlzdFJvd3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBpbml0KGxpc3RSb3dzKXtcblx0XHRpbml0KGxpc3RSb3dzKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XHRcdFxuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0TGlzdFJvd3MuaW5pdCh0aGlzKTtcblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTk9ERU5BTUVTLkxpc3RSb3dzLCBMaXN0Um93cyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcbiIsImltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IFNQRUNJQUxWQVJTLCBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRpb25EYXRhID0gKGJhc2UpID0+IHtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRkYXRhW1NQRUNJQUxWQVJTLkNVUlJFTlRWQUxVRV0gPSBiYXNlLnZhbHVlO1xuXG5cdGxldCByb3cgPSBiYXNlLnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdGxldCB0ZW1wID0gZGF0YTtcblx0d2hpbGUgKHJvdykge1xuXHRcdHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddID0gcm93LnZhbHVlXG5cdFx0dGVtcCA9IHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddO1xuXHRcdHJvdyA9IHJvdy5wYXJlbnQoTk9ERU5BTUVTLkxpc3RSb3cpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlKCBkYXRhLGJhc2UuZm9ybS5kYXRhKTtcbn0iLCJpbXBvcnQge0VWRU5USEFORExFX1RJTUVPVVR9IGZyb20gXCIuLi9Db25zdGFudHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcmd1bWVudHMpLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvVGltZW91dEhhbmRsZSA9IChoYW5kbGUsIHByZXZlbnREZWZhdWx0LCBzdG9wUHJvcGFnYXRpb24pID0+IHtcclxuICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKHRpbWVvdXQpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBoYW5kbGUoZXZlbnQpO1xyXG4gICAgICAgIH0sIEVWRU5USEFORExFX1RJTUVPVVQpO1xyXG5cclxuICAgICAgICBpZihwcmV2ZW50RGVmYXVsdClcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZihzdG9wUHJvcGFnYXRpb24pXHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IHRyZWVGaWx0ZXIgPSAoeyByb290LCBmaWx0ZXIgfSkgPT4ge1xuXHRsZXQgZWxlbWVudHMgPSBbXTtcblx0cm9vdC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0Y29uc3QgeyBhY2NlcHQsIHN0b3AgPSBmYWxzZSB9ID0gZmlsdGVyKGVsZW1lbnQpO1xuXG5cdFx0aWYgKGFjY2VwdCkgZWxlbWVudHMucHVzaChlbGVtZW50KTtcblxuXHRcdGlmICghc3RvcCkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gdHJlZUZpbHRlcih7IHJvb3Q6IGVsZW1lbnQsIGZpbHRlciB9KTtcblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQocmVzdWx0KTtcblx0XHRcdGVsc2UgaWYgKHJlc3VsdCkgZWxlbWVudHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRGaWVsZHMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFZhbGlkYXRpb25zID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVmFsaWRhdGlvbikgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuIiwiaW1wb3J0IHsgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9WQUxJRCwgQVRUUklCVVRFX0lOVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZhbGlkU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnZhbGlkO1xuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcblx0fSBlbHNlIGlmICh2YWxpZCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIFwiXCIpO1xuXHR9IGVsc2Uge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBcIlwiKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xuXHR9XG5cdFxuXHRpZiAob2xkU3RhdGUgIT0gdmFsaWQgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMudmFsaWRTdGF0ZUNoYW5nZWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbmRpdGlvblN0YXRlID0gKHRhcmdldCwgdmFsaWQsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5jb25kaXRpb247XG5cdGlmICh2YWxpZCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXCJcIik7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcIlwiKTtcblx0fVxuXHRpZiAob2xkU3RhdGUgIT0gdmFsaWQgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoVFJJR0dFUl9USU1FT1VULCBFVkVOVFMuY29uZGl0aW9uU3RhdGVDaGFuZ2VkKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBY3RpdmVTdGF0ZSA9ICh0YXJnZXQsIGFjdGl2ZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmFjdGl2ZTtcblx0YWN0aXZlID8gdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBudWxsKTtcblx0aWYgKG9sZFN0YXRlICE9IGFjdGl2ZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihUUklHR0VSX1RJTUVPVVQsIEVWRU5UUy5hY3RpdmVTdGF0ZUNoYW5nZWQpO1xufTsiLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cdFx0dmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHtcblx0XHRcdHZhbHVlcy5wdXNoKHZhbHVlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB2YWx1ZXM7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHRcdGVsc2V7XG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImZpbGVcIl0nO1xuXG5jb25zdCByZWFkRmlsZSA9IChmaWxlLCByZWFkRm5OYW1lKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRyZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgKCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSh7XG5cdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0dHlwZTogZmlsZS50eXBlLFxuXHRcdFx0XHRzaXplOiBmaWxlLnNpemUsXG5cdFx0XHRcdGRhdGE6IHJlYWRlci5yZXN1bHRcblx0XHRcdH0pO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRyZWFkZXJbcmVhZEZuTmFtZV0oZmlsZSk7XG5cdH0pO1xufTtcblxuLy9yZWFkQXNEYXRhVVJMXG5cbmNvbnN0IEZPUk1BVCA9IHtcblx0XCJmb3JtLWlucHV0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0ZmlsZS5mb3JtYXQgPSBcImZvcm0taW5wdXRcIjtcblx0XHRyZXR1cm4gZmlsZTtcblx0fSxcblx0XCJkYXRhLXVybC1iYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiZGF0YS11cmwtYmFzZTY0XCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0XCJiYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmRhdGEgPSByZXN1bHQuZGF0YS5zdWJzdHIocmVzdWx0LmRhdGEuaW5kZXhPZihcIixcIikgKyAxKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJiYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5jb25zdCByZWFkRmlsZXMgPSBhc3luYyAoZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpID0+IHtcblx0bGV0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBmaWxlIG9mIGZpbGVzKVxuXHRcdHJlc3VsdC5wdXNoKGF3YWl0IEZPUk1BVFtmb3JtYXRdKGZpbGUpKTtcblxuXHRpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKVxuXHRcdHJldHVybiBudWxsO1xuXG5cblx0cmV0dXJuIG11bHRpcGxlID8gcmVzdWx0IDogcmVzdWx0WzBdO1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQubXVsdGlwbGU7XG5cdFx0dGhpcy5mb3JtYXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1mb3JtYXRcIikgfHwgXCJmb3JtLWlucHV0XCI7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IGZpZWxkLmF0dHIoXCJmaWxlLW5hbWUtdGFyZ2V0XCIpO1xuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0ID8gZmllbGQuZmluZCh0aGlzLmZpbGVuYW1lVGFyZ2V0KS5maXJzdCgpIDogbnVsbDtcblx0XHRjb25zdCB7IGZvcm1hdCwgbXVsdGlwbGUgfSA9IHRoaXM7XG5cblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKVxuXHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy52YWx1ZSk7XG5cdH07XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgXCJvYmplY3RcIjtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPSB0aGlzLl9fdmFsdWVfXykge1xuXHRcdFx0dGhpcy5fX3ZhbHVlX18gPSB2YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMuZmlsZW5hbWVUYXJnZXQgJiYgdmFsdWUpIHtcblx0XHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBmaWxlIG9mIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0LmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0LmFwcGVuZChgPHNwYW4+JHt2YWx1ZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX192YWx1ZV9fO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcblxuY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XG59O1xuXG5jb25zdCBpbml0ID0gKHdyYXBwZXIpID0+IHtcblx0Y29uc3QgeyBmaWVsZCB9ID0gd3JhcHBlcjtcblx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0Y29uc3QgaW5wdXQgPSAod3JhcHBlci5pbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikpO1xuXHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdGlucHV0Lm9uKFxuXHRcdFwiY2hhbmdlXCIsXG5cdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5jaGFuZ2VWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0KVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8gZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGNvbnN0IG5hbWUgPSBmaWVsZC5uYW1lICsgZ2V0UmFuZG9tSW50KCk7XG5cdFx0Zm9yIChsZXQgcmFkaW8gb2YgaW5wdXQpIHJhZGlvLm5hbWUgPSBuYW1lO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWUudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdzZWxlY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0LCBjaGFuZ2VkXCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMuaW5wdXQubXVsdGlwbGUgPyB0aGlzLmlucHV0LnZhbCgpIDogdGhpcy5pbnB1dC52YWx1ZSk7XG5cdH1cblx0XG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZih0aGlzLmlucHV0Lm11bHRpcGxlKXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoID4gMCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxuXHRcdFx0fVx0XHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLmlucHV0Lm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0Om5vdChbdHlwZT1cXFwiZmlsZVxcXCJdKTpub3QoW3R5cGU9XFxcInJhZGlvXFxcIl0pOm5vdChbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSkgLGlucHV0Om5vdChbdHlwZV0pLCB0ZXh0YXJlYSc7XG5cbmNvbnN0IERFRkFVTFRUWVBFID0gXCJ0ZXh0XCI7XG5cblxuY29uc3QgdGV4dCA9IHtcblx0YWNjZXB0OiAodmFsdWUpID0+IHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB9LFxuXHR2YWx1ZTogKGlucHV0KSA9PiB7IHJldHVybiBpbnB1dC52YWx1ZTsgfSxcblx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59O1xuY29uc3QgbnVtYmVyID0ge1xuXHRhY2NlcHQ6ICh2YWx1ZSkgPT4geyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiOyB9LFxuXHR2YWx1ZTogKGlucHV0KSA9PiB7IHJldHVybiBpbnB1dC52YWx1ZUFzTnVtYmVyOyB9LFxuXHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdGlmICh2YWx1ZSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59O1xuY29uc3QgZGF0ZSA9IHtcblx0YWNjZXB0OiAodmFsdWUpID0+IHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB9LFxuXHR2YWx1ZTogKGlucHV0KSA9PiB7IHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTsgfSxcblx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRpZih2YWx1ZSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5jb25zdCBUWVBFUyA9IHsgdGV4dCwgbnVtYmVyLCBkYXRlLCB0aW1lOiBkYXRlIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGNvbnN0IHR5cGUgPSAoZmllbGQuYXR0cihcImlucHV0LXR5cGVcIikgfHwgaW5wdXQuYXR0cihcInR5cGVcIikgfHwgREVGQVVMVFRZUEUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMudHlwZSA9IFRZUEVTW3R5cGVdIHx8IFRZUEVTW0RFRkFVTFRUWVBFXTtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUuYWNjZXB0KHZhbHVlKTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcy50eXBlLm5vcm1hbGl6ZSh2YWx1ZSk7XG5cdH1cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy5pbnB1dC52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLnR5cGUudmFsdWUodGhpcy5pbnB1dCk7XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSBcIi4uL0ZpZWxkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXIge1xuXHRcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCl7IHJldHVybiBudWxsO31cblx0XG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHRoaXMuZmllbGQgPSBmaWVsZDtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCkgeyB9XG5cblx0c2V0IHJlYWRvbmx5KGRpc2FibGVkKSB7IH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUoKSB7XG5cblx0fVxuXHRcblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdGdldCB2YWxpZCgpe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==