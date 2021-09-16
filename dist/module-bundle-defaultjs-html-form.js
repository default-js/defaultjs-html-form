/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const GLOBAL = (() => {
	if(typeof __webpack_require__.g !== "undefined") return __webpack_require__.g;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GLOBAL);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectProperty)
/* harmony export */ });
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

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "defValue": () => (/* binding */ defValue),
/* harmony export */   "defGet": () => (/* binding */ defGet),
/* harmony export */   "defGetSet": () => (/* binding */ defGetSet),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 *
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *
 *  @return returns the changed object
 */
const append = function (aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true);
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
const isPojo = function (aObject) {
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object";
};

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other
 * value would be replaced by value from the source object.
 *
 * sample: merge(target, source-1, source-2, ...source-n)
 *
 * @param target:object the target object to merging into
 * @param sources:object
 *
 * @return object returns the target object
 */
const merge = function (target, ...sources) {
	if(!target)
		target = {};

	for (let source of sources) {
		if (isPojo(source)) {
			Object.getOwnPropertyNames(source).forEach((key) => {
				if (isPojo(target[key])) merge(target[key], source[key]);
				else target[key] = source[key];
			});
		}
	}

	return target;
};

const buildPropertyFilter = function ({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	};
};

const filter = function () {
	const [data, propFilter, { deep = false, recursive = true, parents = [] } = {}] = arguments;
	const result = {};

	for (let name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined)) result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object" || value instanceof Array || value instanceof Map || value instanceof Set || value instanceof RegExp || parents.includes[value] || value == data) result[name] = value;
			else result[name] = filter(value, propFilter, { deep, recursive, parents: parents.concat(data) });
		}
	}

	return result;
};

const defValue = (o, name, value) => {
	Object.defineProperty(o, name, {
		value,
		writable: false,
		configurable: false,
		enumerable: false,
	});
};
const defGet = (o, name, get) => {
	Object.defineProperty(o, name, {
		get,
		configurable: false,
		enumerable: false,
	});
};

const defGetSet = (o, name, get, set) => {
	Object.defineProperty(o, name, {
		get,
		set,
		configurable: false,
		enumerable: false,
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter,
	defValue,
	defGet,
	defGetSet,
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "privateProperty": () => (/* binding */ privateProperty),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const PRIVATE_PROPERTIES = new WeakMap();
const privateStore = (obj) => {
	if(PRIVATE_PROPERTIES.has(obj))
		return PRIVATE_PROPERTIES.get(obj);
	
	const data = {};
	PRIVATE_PROPERTIES.set(obj, data);
	return data;
};

const privateProperty = function(obj, name, value) {
	const data = privateStore(obj);
	if(arguments.length === 1)
		return data;
	else if(arguments.length === 2)
		return data[name];
	else if(arguments.length === 3)
		data[name] = value;
	else
		throw new Error("Not allowed size of arguments!");
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({privateProperty});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutPromise": () => (/* binding */ timeoutPromise),
/* harmony export */   "lazyPromise": () => (/* binding */ lazyPromise),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");


const timeoutPromise = (fn, ms) =>{
	let canceled = false;
	let timeout = null;
	const promise = new Promise((r, e) => {
		timeout = setTimeout(()=> {
			timeout = null;
			fn(r,e);
		}, ms)
	});

	const then = promise.then;
	promise.then = (fn) => {
		then.call(promise, (result) => {
			if(!undefined.canceled)
				return fn(result);
		});
	}

	;(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "cancel", () => {
		if(timeout){
			clearTimeout(timeout);
			canceled = true;
		}
	});
	(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, canceld, () => canceled);

	return promise;
}


const lazyPromise = () => {
		let promiseResolve = null;
		let promiseError = null;

		const promise = new Promise((r, e) => {
			promiseResolve = r;
			promiseError = e;
		});

		let resolved = false;
		let error = false;
		let value = undefined;

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "resolve", (result) => {
			value = result;
			resolved = true;
			if (value instanceof Error) {
				error = true;
				promiseError(value);
			} else promiseResolve(value);
		});

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "value", () => value);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "error", () => error);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "resolved", () => resolved);

		return promise;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	lazyPromise,
	timeoutPromise
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UUID_SCHEMA": () => (/* binding */ UUID_SCHEMA),
/* harmony export */   "uuid": () => (/* binding */ uuid),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//the solution is found here: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
const UUID_SCHEMA = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

const uuid = () => {
	const buf = new Uint32Array(4);
	window.crypto.getRandomValues(buf);
	let idx = -1;
	return UUID_SCHEMA.replace(/[xy]/g, (c) => {
		idx++;
		const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
		const v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ uuid });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noValue": () => (/* binding */ noValue),
/* harmony export */   "emtpyOrNoValueString": () => (/* binding */ emtpyOrNoValueString),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const noValue = (value) => {
	return value == null || typeof value === "undefined";
};

const emtpyOrNoValueString = (value) => {	
	return noValue(value) || value.trim().length == 0;
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	noValue,
	emtpyOrNoValueString
});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/Context.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Context)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DefaultValue)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExpressionResolver)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultValue.js */ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js");







const EXECUTION_WARN_TIMEOUT = 1000;
const EXPRESSION = /(\\?)(\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\})/;
const MATCH_ESCAPED = 1;
const MATCH_FULL_EXPRESSION = 2;
const MATCH_EXPRESSION_SCOPE = 4;
const MATCH_EXPRESSION_STATEMENT = 5;

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
	let result = undefined;
	try{
		result = await expression(aContext);
	}catch(e){}
	
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
};

const resolveMatch = async (resolver, match, defaultValue) => {
	if(match[MATCH_ESCAPED])
		return match[MATCH_FULL_EXPRESSION]; 
		
	return resolve(resolver, match[MATCH_EXPRESSION_STATEMENT], normalize(match[MATCH_EXPRESSION_SCOPE]), defaultValue);
}

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
				return await resolveMatch(this, match, defaultValue);
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
			const result = await resolveMatch(this, match, defaultValue);
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

/***/ "./node_modules/@default-js/defaultjs-extdom/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./node_modules/@default-js/defaultjs-extdom/src/index.js");


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/Global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/Global.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs || {};
_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom || {
	VERSION : "1.0.2",
	utils : {
		Utils: _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"]
	}
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.find = function() {
	return document.find.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.ready = function() {
	return document.ready.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.create = function(aContent, asTemplate) {
	if (typeof arguments[0] !== "string")
		throw new Error("The first argument must be a string!");
	
	const template = document.createElement("template");
	template.innerHTML = aContent;
	if(asTemplate)
		return template;
	
	return document.importNode(template.content, true).childNodes;
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script = function(aFile, aTarget) {
	if(aFile instanceof Array)
		return Promise.all(aFile.map(file => _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script(file, aTarget)));
	
	if(typeof aFile === "string")	
		return new Promise((r,e) => {
			const script = document.createElement("script");
			script.async = true;
			script.onload = function(){r()};
			script.onerror = function(){throw new Error("load error!")};
			!aTarget ? document.body.append(script) : aTarget.append(script);
			script.src = aFile;
		});
	else
		return Promise.reject("First parameter must be an array of strings or a string!");
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ReadyEventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Document, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

document.addEventListener("DOMContentLoaded", () => document.trigger("ready"));





/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(DocumentFragment, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);






/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/AttributeSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Element,_extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js");



(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(EventTarget, _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/HtmlClassSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js");
/* harmony import */ var _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ShowHideSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js");





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLElement, _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLInputElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLSelectElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLTextAreaElement,(0,_utils_Extender__WEBPACK_IMPORTED_MODULE_1__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		if(arguments.length == 0)
			return this.value;
		else
			this.value = arguments[0]
			
		return this;
	};	
}));

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLCollection, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

HTMLCollection.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

HTMLCollection.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		HTMLCollection.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

HTMLCollection.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof HTMLElement)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof HTMLCollection || arg instanceof NodeList || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof HTMLElement){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(HTMLCollection.prototype, data);
};


(0,_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			let result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof HTMLCollection)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof HTMLElement || results[0] instanceof HTMLCollection)
		return HTMLCollection.from.apply(null, results);
	else
		return results;
},HTMLCollection.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/DataSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Node,_extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__["default"],_extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(NodeList, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

NodeList.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

NodeList.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		NodeList.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

NodeList.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof Node)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof NodeList || arg instanceof HTMLCollection || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof Node){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(NodeList.prototype, data);
};


(0,_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			const result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof NodeList)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof Node || results[0] instanceof NodeList)
		return NodeList.from(results);
	else
		return results;
},NodeList.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("AttributeSupport", Prototype => {
	Prototype.attr = function() {
		if (arguments.length == 0)
			return this.hasAttributes() ? (() => {
				const result = {};
				this.getAttributeNames().forEach(name => {
					result[name] = this.getAttribute(name);
				});
				return result;
			})() : undefined;
		else if (arguments.length == 1)
			return this.getAttribute(arguments[0]);
		else if (typeof arguments[1] === "undefined" || arguments[1] == null)
			this.removeAttribute(arguments[0]);
		else
			this.setAttribute(arguments[0], arguments[1]);
		
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("DataSupport", Prototype => {
	Prototype.data = function() {
		const data = {};
		if (typeof this.dataset !== "undefined")
			for (name in this.dataset)
				data[name] = this.dataset[name];

		this.data = (function() {
			if (arguments.length == 0)
				return data;
			else if (arguments.length == 1)
				return data[arguments[0]];
			else if (typeof arguments[1] === "undefined" || arguments[1] == null)
				delete data[arguments[0]];
			else
				data[arguments[0]] = arguments[1];

			return this;
		}).bind(this);

		return this.data.apply(null, arguments);
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const DEFAULT_TIMEOUT = 100;
const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("EventSupport", (Prototype) => {
	const EVENTSPLITER = /(\s+)|(\s*,\s*)/;
	const getWrapperHandleMap = (element) => {
		if (!element.__wrapperhandlemap__) element.__wrapperhandlemap__ = new Map();

		return element.__wrapperhandlemap__;
	};

	const getTriggerTimeouts = (element) => {
		if (!element.___EVENTTRIGGERTIMEOUTS___) element.___EVENTTRIGGERTIMEOUTS___ = {};

		return element.___EVENTTRIGGERTIMEOUTS___;
	};

	const removeWrapper = (element, data, eventTypes) => {
		const { wrapper, option, events, handle } = data;
		const capture = option.capture;
		if (eventTypes) {
			eventTypes = typeof eventTypes === "string" ? eventTypes.split(EVENTSPLITER) : eventTypes;
			for (let event of eventTypes) {
				const index = events.indexOf(event);
				if (index >= 0) {
					element.removeEventListener(event, wrapper, capture);
					events.splice(index, 1);
				}
				if (events.length == 0) getWrapperHandleMap(element).delete(handle);
			}
		} else {
			for (let event of events) {
				element.removeEventListener(event, wrapper, capture);
			}
			getWrapperHandleMap(element).delete(handle);
		}
	};

	Prototype.on = function () {
		if (arguments.length < 2) throw new Error("Too less arguments!");

		const args = Array.from(arguments);
		let events = typeof args[0] === "string" ? args.shift().split(EVENTSPLITER) : args.shift();
		const filter = typeof args[0] === "string" ? args.shift() : null;
		const handle = args.shift();
		const option = typeof args[0] === "undefined" ? { capture: false, once: false, passive: false } : typeof args[0] === "boolean" ? { capture: args.shift(), once: false, passive: false } : args.shift();
		const wrapper = function (event) {
			if (filter) {
				const target = event.target;
				if (typeof target.is === "function" && !target.is(filter)) return;
			}
			const result = handle.apply(null, arguments);
			if (option.once) removeWrapper(this, wrapper);
			return result;
		};

		getWrapperHandleMap(this).set(handle, { handle, wrapper: wrapper, events, option });

		for (let event of events) {
			this.addEventListener(event, wrapper, option);
		}

		return this;
	};

	Prototype.removeOn = function (handle, event, capture) {
		const data = getWrapperHandleMap(this).get(handle);
		if (data) removeWrapper(this, data, event);
		else this.removeEventListener(handle, event, capture);

		return this;
	};

	Prototype.trigger = function () {
		const args = Array.from(arguments);
		const timeout = typeof args[0] === "number" ? args.shift() : -1;
		if (timeout >= 0) {
			const type = args[0];
			const timeouts = getTriggerTimeouts(this);
			const timeoutid = timeouts[type];
			if (timeoutid) clearTimeout(timeoutid);

			timeouts[type] = setTimeout(() => {
				delete timeouts[type];
				this.trigger.apply(this, args);
			}, timeout);
		} else {
			const type = args.shift();
			const delegate = args[0] instanceof Event ? args.shift() : null;
			const data = args.length >= 1 ? (args.length == 1 ? args.shift() : args) : delegate;
			const event = data ? new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: data }) : new Event(type, { bubbles: true, cancelable: true, composed: true });

			if (delegate) event.delegatedEvent = delegate;
			this.dispatchEvent(event);
		}
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("HtmlClassSupport", Prototype => {	
	Prototype.addClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.add(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,clazz => this.classList.add(clazz));
		
		return this;
	};
	
	Prototype.removeClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.remove(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.remove(clazz));
		
		return this;		
	};
	
	Prototype.toggleClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.toggle(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.toggle(clazz));
		
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ListSupport", Prototype => {		
	Prototype.indexOf = function() {
		for(let i = 0; i < this.length; i++)
			if(this[i] == arguments[0])
				return i;
		
		return -1;
	};

	Prototype.forEach = function(){
		return Array.prototype.forEach.apply(Array.from(this), arguments);
	};
	
	Prototype.map = function(){
		return Array.prototype.map.apply(Array.from(this), arguments);
	};
	
	Prototype.filter = function(){
		return Array.prototype.filter.apply(Array.from(this), arguments);
	};

	Prototype.first = function(){
		if(this.length > 0)
			return this[0];
	};	
	
	Prototype.last = function(){
		if(this.length > 0)
			return this[this.length - 1];
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");



const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ManipulationSupport", Prototype => {	
	Prototype.empty = function(){
		let nodes = this.childNodes
		while(nodes.length != 0)			
			nodes[0].remove(true);
		
		return this;
	};
	
	Prototype.content = function(){
		return this.childNodes;
	};	
	
	Prototype.html = function(){
		if(arguments.length == 0)			
			return this.innerHTML;
		else if(arguments.length == 1 && typeof arguments[0] === "boolean")
			if(arguments[0])
				return this.outerHTML;
			else
				return this.innerHTML;
		else 
			Array.from(arguments).forEach(content => {
				this.empty();
				if(typeof content === "string")
					this.append(content);
				else if(content instanceof Node || content instanceof NodeList || content instanceof HTMLCollection){
					this.append(content);
				}
			});		
			
		return this;
	};
	
	const append = function(){
		const append = Prototype.appendChild.bind(this);
		for(let i = 0; i < arguments.length; i++){
			let arg = arguments[i];
			if(arg instanceof Node)
				this.appendChild(arg);
			else if(typeof arg === "string")
				create(arg).forEach(append);
			else if(typeof arg.forEach === "function")
				arg.forEach(append);
		}
	};	
	Prototype.append = append;
	
	const prepend = function(aFirstElement, aElement){
		this.insertBefore(aElement, aFirstElement);
	};
	Prototype.prepend = function(){
		if(this.childNodes.length == 0)
			append.apply(this, arguments);
		else {
			const first = this.childNodes.first();
			const insert = prepend.bind(this, first);
			for(let i = 0; i < arguments.length; i++){
				const arg = arguments[i];
				if(arg instanceof Node)
					insert(arg);
				else if(typeof arg === "string")
					arg.forEach(insert);
				else if(typeof arg.forEach === "function")
					arg.forEach(insert);
			}
		}
	};
	
	Prototype.replace = function(){
		if(arguments.length < 1)
			throw new Error("Insufficient arguments! One or two nodes required!");
		
		const parent = arguments.length == 1 ? this.parentNode : this;
		const oldNode = arguments.length == 1 ? this : arguments[0];
		const newNode = arguments.length == 1 ? arguments[0] : arguments[1];
		
		if(newNode instanceof Array || newNode instanceof NodeList || newNode instanceof HTMLCollection){
			newNode.forEach(aItem => parent.insertBefore(aItem, oldNode));
			oldNode.remove();
		}
		else
			parent.replaceChild(newNode,oldNode);
	};
	
	Prototype.after = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const next = this.nextSibling;
		if(next)
			Prototype.before.apply(next, arguments);
		else
			Prototype.append.apply(parent, arguments);
	};	
	
	Prototype.before = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const inserter = (node) => {parent.insertBefore(node, this);}
		for(let i = 0; i < arguments.length; i++){
			const arg = arguments[i];
			if(arg instanceof Node)
				inserter(arg);
			else if(typeof arg === "string")
				arg.forEach(inserter);
			else if(typeof arg.forEach === "function")
				arg.forEach(inserter);
		}
	};	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const parentSelector = /:parent(\(\"([^\)]*)\"\))?/i;
const queryExecuter = function (aElement, aSelector) {
	let match = parentSelector.exec(aSelector);
	if (match) {
		let result = aElement;
		if (match.index > 0) {
			result = aElement.querySelectorAll(aSelector.substr(0, match.index));
			if (result.length == 0) return;
		}
		result = result.parent(match[2]);
		if (result) {
			let nextSelector = aSelector.substr(match.index + match[0].length).trim();
			if (nextSelector.length > 0) result = result.find(nextSelector);

			return result;
		}
	} else return aElement.querySelectorAll(aSelector);
};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("QuerySupport", (Prototype) => {
	Prototype.find = function () {
		let nodes = [];
		let args = Array.from(arguments);
		let arg = args.shift();
		while (arg) {
			if (typeof arg === "string") {
				let result = queryExecuter(this, arg);
				if (result) nodes.push(result);
			}

			arg = args.shift();
		}

		let result = NodeList.from.apply(null, nodes);
		return result;
	};

	Prototype.is = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return false;
		else if (arguments.length == 1) {
			if (typeof arguments[0] === "string") return this.matches(arguments[0]);
			else if (typeof arguments[0].length === "number") {
				let filter = arguments[0];
				for (let i = 0; i < filter.length; i++) if (this.matches(filter[i])) return true;
			}
		} else if (arguments.length > 1) return this.is(Array.from(arguments));

		return false;
	};

	Prototype.parent = function (selector, ignoreShadowRoot) {
		if (!this.parentNode) return null;
		ignoreShadowRoot = typeof selector === "boolean" ? selector : ignoreShadowRoot;
		selector = typeof selector === "string" ? selector : null;

		let parent = this.parentNode;
		if (parent instanceof ShadowRoot && ignoreShadowRoot) parent = parent.host;

		if (selector) {
			try {
				while (parent && !parent.is(selector)) parent = parent.parent(selector, ignoreShadowRoot);
			} catch (e) {
				console.error("this:", this, "parent:", parent, "error:", e);
			}
			return parent;
		}
		return parent;
	};

	Prototype.parents = function () {
		let result = new Array();
		let parent = Prototype.parent.apply(this, arguments);
		while (parent) {
			result.push(parent);
			parent = Prototype.parent.apply(parent, arguments);
		}

		return NodeList.from(result);
	};

	Prototype.selector = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return undefined;
		else if (this.id) return "#" + this.id;
		else {
			let selector = this.tagName.toLowerCase();
			let parent = this.parent();
			if (parent) {
				let sameTagSiblings = parent.find(":scope>" + selector);
				if (sameTagSiblings instanceof NodeList) {
					let index = sameTagSiblings.indexOf(this);
					if (index > 0) selector += ":nth-child(" + (index + 1) + ")";
				}
				let parentSelector = parent.selector();
				return parentSelector ? parentSelector + ">" + selector : selector;
			}
			return selector;
		}
	};

	Prototype.closest = function (aQuery) {
		return this.closests(aQuery).first();
	};

	Prototype.closests = function (aQuery) {
		const result = this.find(aQuery);
		if (result.length != 0) return result;
		
		const parent = this.parentElement;
		if (parent) return parent.closests(aQuery);

		return NodeList.from([]);
	};

	Prototype.nested = function (aQuery) {
		if (this.is(aQuery)) return NodeList.from(this);

		let nested = this.find(aQuery);
		if (nested && nested.length > 0) return nested;
		else return NodeList.from(this.parent(aQuery));
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ReadyEventSupport", Prototype => {
	Prototype.ready = function(aFunction, once){	
		this.on("ready", aFunction, once);
		if(document.readyState == "complete")			
			this.trigger("ready");
		
		return this;
	};
	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const HIDEVALUE = "none";

const isHidden = (element) => {
	return element.style.display === HIDEVALUE
};

const init = (element) => {	
	let display = !isHidden(element) ? element.style.display : "";
	
	element.show = (function(){
		this.style.display = display;
		return this;		
	}).bind(element);
	
	element.hide = (function(){
		this.style.display = HIDEVALUE;
		return this;		
	}).bind(element);
	
	return element;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ShowHideSupport", Prototype => {
	Prototype.show = function() {
		return init(this).show.apply(null, arguments)
	};

	Prototype.hide = function() {
		return init(this).hide.apply(null, arguments)
	};

	Prototype.toggleShow = function() {
		return isHidden(this) ? this.show() : this.hide();
	};

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const InputTypes = [
	{
		selector : "select",
		get : function(){
			const result = [];
			this.find("option").forEach(option => {
				if(option.selected)
					result.push(option.value);
			});			
			return result;
		},
		set : function(){				
			let values = [];
			const args = Array.from(arguments);
			let arg = args.shift();
			while(arg){
				if(Array.isArray(arg))
					values = values.concat(arg);
				else
					values.push(arg);
				
				arg = args.shift();
			}
			this.value = values;
			this.find("option").forEach(option => option.selected = values.indexOf(option.value) >= 0);			
			this.trigger("changed");
		}			
	},
	{
		selector : "input[type=\"checkbox\"], input[type=\"radio\"]",
		get : function(){
			if(this.value == "on" || this.value == "off")
				return this.checked;
			else if(this.checked)
				return this.value;				
		},
		set : function(aValue){
			if(typeof aValue === "boolean")
				this.checked = aValue;
			else if(typeof aValue === "string")
				this.checked = this.value == aValue;
			else if(Array.isArray(aValue))
				this.checked = aValue.indexOf(this.value) >= 0;
			
			this.trigger("changed");
		}
	}
];

const DefaultInputType = {
		get : function(){
			return this.value;
		},
		set : function(aValue){
			this.value = aValue;
			this.trigger("input");
		}	
};

const getInputType = function(aElement){
	for(let i = 0; i < InputTypes.length; i++)
		if(aElement.is(InputTypes[i].selector))
			return InputTypes[i];		
	return DefaultInputType;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		let type = getInputType(this);
		if(arguments.length == 0)
			return type.get.apply(this, arguments);
		else
			type.set.apply(this, arguments);
			
		return this;
	};	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_EventTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/EventTarget */ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js");
/* harmony import */ var _dom_Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Node */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js");
/* harmony import */ var _dom_Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Element */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js");
/* harmony import */ var _dom_Document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/Document */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js");
/* harmony import */ var _dom_DocumentFragment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/DocumentFragment */ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js");
/* harmony import */ var _dom_HTMLElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom/HTMLElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js");
/* harmony import */ var _dom_HTMLInputElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom/HTMLInputElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js");
/* harmony import */ var _dom_HTMLTextAreaElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dom/HTMLTextAreaElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js");
/* harmony import */ var _dom_HTMLSelectElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom/HTMLSelectElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js");
/* harmony import */ var _dom_NodeList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom/NodeList */ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js");
/* harmony import */ var _dom_HtmlCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom/HtmlCollection */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Global */ "./node_modules/@default-js/defaultjs-extdom/src/Global.js");














/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DelegaterBuilder = function() {
	const args = Array.from(arguments);
	const callback = args.shift();
	const source = args.shift();
	args.forEach( target =>{
		Object.getOwnPropertyNames(target)
		.forEach(name => {
			const prop = Object.getOwnPropertyDescriptor(target, name);
			if (typeof source[name] === "undefined" && typeof prop.value === "function")
				source[name] = function(){
					return callback.call(this, name, arguments);
				};										
		});
	});
	
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DelegaterBuilder);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const extendPrototype = function(){
	const args = Array.from(arguments);
	const type = args.shift();	
	while(args.length > 0){
		const extender = args.shift();
		extender(type);
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extendPrototype);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


const EXTENSIONS_MAP = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].globalVar("___DOM_API_EXTENSION_MAP___", {});
const Extender = function(aName, aExtention){
	return function(aType){	
		let extensions = EXTENSIONS_MAP[aType.name];
		if(!extensions)
			extensions = EXTENSIONS_MAP[aType.name] = {};		
		
		if(!extensions[aName]){
			extensions[aName] = true;
			aExtention(aType.prototype);
		}
		else
			console.warn("duplicated load of extension \"" + aName + "\"!");
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Extender);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Utils = {
	global : (() => {
		if(typeof window !== "undefined") return window;
		if(typeof __webpack_require__.g !== "undefined") return __webpack_require__.g;
		if(typeof self !== "undefined") return self;
		return {};		
	})(),
	globalVar : function(aName, aInitValue){
		if(arguments.length === 2 && typeof Utils.global[aName] === "undefined")
			Utils.global[aName] = aInitValue;
		
		return Utils.global[aName];		
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Component.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Component.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUID": () => (/* binding */ createUID),
/* harmony export */   "componentBaseOf": () => (/* binding */ componentBaseOf),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/EventHelper */ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js");
/* harmony import */ var _utils_WeakData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/WeakData */ "./node_modules/@default-js/defaultjs-html-components/src/utils/WeakData.js");







const PRIVATE_READY = "ready";

const TIMEOUTS = new _utils_WeakData__WEBPACK_IMPORTED_MODULE_5__["default"]();
const init = (component) => {
	const data = TIMEOUTS.data(component);
	if (data.initialize) clearTimeout(data.initialize);

	data.initialize = setTimeout(async () => {
		delete data.initialize;

		await component.init();
		component.ready.resolve();
		component.trigger((0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("initialzed", component));
	}, _Constants__WEBPACK_IMPORTED_MODULE_3__.initTimeout);
};

const createUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
    while(count < 100){
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__.uuid)()}${suffix ? suffix : ""}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};



const buildClass = (htmlBaseType) =>{
	return class Component extends htmlBaseType {
		constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
			super();
			(0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__.privateProperty)(this, PRIVATE_READY, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
	
			if(createUID)
				this.attr("id", createUID(uidPrefix, uidSuffix));
	
			if(shadowRoot)
				this.attachShadow({mode:open});
			
			if(content)
				this.root.append(typeof content === "function" ? content(this) : content);
		}
	
		get root(){
			return this.shadowRoot || this;
		}
	
		get ready(){
			return (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__.privateProperty)(this, PRIVATE_READY);
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
				(0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__.privateProperty)(this, PRIVATE_READY, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
		}
	
		connectedCallback() {
			if (this.ownerDocument == document) init(this);
		}
	
		adoptedCallback() {
			this.connectedCallback();
		}
	
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.attributeChangeEventname)(name, this));
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("change", this));
			}
		}
	
		disconnectedCallback(){
			this.destroy();
		}
	};
} 

const CLAZZMAP = new Map();

const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if(clazz == null){
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
}

const Component = componentBaseOf(HTMLElement);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Constants.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "componentPrefix": () => (/* binding */ componentPrefix),
/* harmony export */   "attributeChangeEventPrefix": () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   "initTimeout": () => (/* binding */ initTimeout),
/* harmony export */   "triggerTimeout": () => (/* binding */ triggerTimeout)
/* harmony export */ });
const componentPrefix = "d-";
const attributeChangeEventPrefix = "attribute-";
const initTimeout = 100;
const triggerTimeout = 100;


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "componentEventname": () => (/* binding */ componentEventname),
/* harmony export */   "attributeChangeEventname": () => (/* binding */ attributeChangeEventname),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


const componentEventname = (eventType, node ) => {	
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(typeof node + " is not supported as pram node!");
	
   return `${nodename.toLowerCase()}:${eventType}`;//use @ as separtor and not :
};


const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/WeakData.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/WeakData.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeakData)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");

class WeakData {
	constructor() {
		(0,_default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(this, "weakmap", new WeakMap());
	}

	data(reference) {
		let data = this.weakmap.get(reference);
		if (!data) {
			data = {};
			this.weakmap.set(reference, data);
		}
		return data;
	}

	value(reference, key, value) {
		if (arguments.length == 2) return this.data(reference)[key];
		else this.data(reference)[key] = value;
	}
};



/***/ }),

/***/ "./src/Base.js":
/*!*********************!*\
  !*** ./src/Base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");





const PRIVATE_FORM = "form";

const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE_CONDITION];

class Base extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
	}

	get form() {
		let form = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privateProperty)(this, PRIVATE_FORM);
		if (!form) {
			form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
			(0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privateProperty)(this, PRIVATE_FORM, form);
		}
		return form;
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateActiveState)(this, active);
			this.activeUpdated();
		}
	}

	activeUpdated() {}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateEditableState)(this, !readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}

	readonlyUpdated() {}

	get editable() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE);
	}

	set editable(editable) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateEditableState)(this, editable, !this.ready.resolved);
		this.editableUpdated();
	}

	editableUpdated() {
		this.readonlyUpdated();
	}

	get condition() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID);
	}

	conditionUpdated() {}

	get valid() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);


/***/ }),

/***/ "./src/BaseField.js":
/*!**************************!*\
  !*** ./src/BaseField.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_value": () => (/* binding */ _value),
/* harmony export */   "findParentField": () => (/* binding */ findParentField),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validator */ "./src/Validator.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");





const PRIVATE_PARENT = "parent";
const PRIVATE_VALUE = "value";
const PRIVATE_VALIDATOR = "validator";

const _value = function (self, value) {
	if (arguments.length == 2) (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(self, PRIVATE_VALUE, value);
	else return (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(self, PRIVATE_VALUE);
};

const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_REQUIRED, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NOVALUE];

const findParentField = (field) => {
	let parent = field.parentNode;
	while (parent) {
		if (parent instanceof BaseField) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const updateHasValue = (hasValue, field) => {
	field.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NOVALUE, !hasValue ? "" : null);
};

class BaseField extends _Base__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Base__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	constructor(value = null) {
		super();
		_value(this, value);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.conditionStateChanged, (event) => {
			if (event.target == this) {
				this.conditionUpdated();
			}
		});
	}

	async init() {
		await super.init();
		const ready = this.ready;
		if (!ready.resolved) {
			(0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(this, PRIVATE_PARENT, findParentField(this));
			(0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(this, PRIVATE_VALIDATOR, new _Validator__WEBPACK_IMPORTED_MODULE_2__["default"](this));			

			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.executeValidate, async (event) => {
				const chain = event.detail;
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					if (current != valid) {
						this.publishValue();
					}
				}
			});

			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.allPublishValue, () => {
				this.publishValue();
			});
		}

		this.validate();
	}

	get validator() {
		return (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(this, PRIVATE_VALIDATOR);
	}

	get parentField() {
		return (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(this, PRIVATE_PARENT);
	}

	conditionUpdated() {
		this.active = this.condition;
	}

	get name() {
		return this.getAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		const value = _value(this);
		return value != null && typeof value !== "undefined";
	}

	async value(value) {
		if (arguments.length == 0) return _value(this);

		await this.ready;
		const currentValue = _value(this);

		if (await this.acceptValue(value)) {
			value = await this.normalizeValue(value);
			if (currentValue != value) {
				_value(this, value);
				await this.updatedValue(value);				
				await this.validate();
				this.publishValue();
			}
		}
	}

	async validate() {
		updateHasValue(this.hasValue, this);
		if (!this.validator) return false;

		const valid = await this.validator.validate();
		return valid;
	}

	async publishValue(chain = []) {
		await this.ready;
		chain.push(this);
		if (this.parentField) await this.parentField.childValueChanged(this, chain);
		else this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.valueChanged, chain);
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async updatedValue() {}
	async childValueChanged(child, chain) {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseField);


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTML_TAG_PREFIX": () => (/* binding */ HTML_TAG_PREFIX),
/* harmony export */   "TRIGGER_TIMEOUT": () => (/* binding */ TRIGGER_TIMEOUT),
/* harmony export */   "EVENTHANDLE_TIMEOUT": () => (/* binding */ EVENTHANDLE_TIMEOUT),
/* harmony export */   "EVENTHANDLE_INPUT_TIMEOUT": () => (/* binding */ EVENTHANDLE_INPUT_TIMEOUT),
/* harmony export */   "NODENAMES": () => (/* binding */ NODENAMES),
/* harmony export */   "FORMSTATES": () => (/* binding */ FORMSTATES),
/* harmony export */   "REQUIREDSTATES": () => (/* binding */ REQUIREDSTATES),
/* harmony export */   "EVENT_PREFIX": () => (/* binding */ EVENT_PREFIX),
/* harmony export */   "EVENTS": () => (/* binding */ EVENTS),
/* harmony export */   "SPECIALVARS": () => (/* binding */ SPECIALVARS),
/* harmony export */   "ATTRIBUTE_NAME": () => (/* binding */ ATTRIBUTE_NAME),
/* harmony export */   "ATTRIBUTE_ENDPOINT": () => (/* binding */ ATTRIBUTE_ENDPOINT),
/* harmony export */   "ATTRIBUTE_METHOD": () => (/* binding */ ATTRIBUTE_METHOD),
/* harmony export */   "ATTRIBUTE_STATE": () => (/* binding */ ATTRIBUTE_STATE),
/* harmony export */   "ATTRIBUTE_STEP": () => (/* binding */ ATTRIBUTE_STEP),
/* harmony export */   "ATTRIBUTE_USE_SUMMARY_PAGE": () => (/* binding */ ATTRIBUTE_USE_SUMMARY_PAGE),
/* harmony export */   "ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT": () => (/* binding */ ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT),
/* harmony export */   "ATTRIBUTE_REQUIRED": () => (/* binding */ ATTRIBUTE_REQUIRED),
/* harmony export */   "ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY": () => (/* binding */ ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY),
/* harmony export */   "ATTRIBUTE_CONDITION": () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   "ATTRIBUTE_ACTIVE": () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   "ATTRIBUTE_DISABLED": () => (/* binding */ ATTRIBUTE_DISABLED),
/* harmony export */   "ATTRIBUTE_EDITABLE": () => (/* binding */ ATTRIBUTE_EDITABLE),
/* harmony export */   "ATTRIBUTE_EDITABLE_CONDITION": () => (/* binding */ ATTRIBUTE_EDITABLE_CONDITION),
/* harmony export */   "ATTRIBUTE_READONLY": () => (/* binding */ ATTRIBUTE_READONLY),
/* harmony export */   "ATTRIBUTE_NOVALUE": () => (/* binding */ ATTRIBUTE_NOVALUE),
/* harmony export */   "ATTRIBUTE_VALID": () => (/* binding */ ATTRIBUTE_VALID),
/* harmony export */   "ATTRIBUTE_INVALID": () => (/* binding */ ATTRIBUTE_INVALID),
/* harmony export */   "ATTRIBUTE_CONDITION_VALID": () => (/* binding */ ATTRIBUTE_CONDITION_VALID),
/* harmony export */   "ATTRIBUTE_CONDITION_INVALID": () => (/* binding */ ATTRIBUTE_CONDITION_INVALID),
/* harmony export */   "ATTRIBUTE_MAX": () => (/* binding */ ATTRIBUTE_MAX),
/* harmony export */   "ATTRIBUTE_PROGRESS": () => (/* binding */ ATTRIBUTE_PROGRESS)
/* harmony export */ });
const HTML_TAG_PREFIX = "d-";
const TRIGGER_TIMEOUT = 10;
const EVENTHANDLE_TIMEOUT = 10;
const EVENTHANDLE_INPUT_TIMEOUT = 50 * EVENTHANDLE_TIMEOUT;

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

const EVENT_PREFIX = HTML_TAG_PREFIX + "form-";

const EVENTS = {
	initialize: EVENT_PREFIX + "initialize",
	/* fired by change value from an field implementation
	 * and consumed by the reference implementation of
	 * BaseField to make validation and fire valueChanged
	 * event
	 */
	input: EVENT_PREFIX + "field-input",
	/* internal event for publish that a value of field has changed (event after validation) */
	valueChanged: EVENT_PREFIX + "field-value-changed",
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
	formStateChanged: EVENT_PREFIX + "state-changed",
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
	
	editableStateChanged: EVENT_PREFIX + "editable-state-changed"
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
const ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT = "input-mode-after-submit";
const ATTRIBUTE_REQUIRED = "required";
const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_DISABLED = "disabled";
const ATTRIBUTE_EDITABLE = "editable";
const ATTRIBUTE_EDITABLE_CONDITION = "editable-condition";
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");







const ATTRIBUTES = [];

const NAME_SPLITTER = /\./g;

const valueHelper = function (data, name, value) {
	if (data == null || typeof data === "undefined") return null;

	const update = arguments.length > 2;

	const names = name.split(NAME_SPLITTER);
	while (names.length > 1) {
		const key = names.shift();
		let temp = data[key];
		const has = typeof temp !== "undefiend" && temp != null;
		if (!has && !update) return null;
		else if (!has && update) temp = data[key] = {};

		data = temp;
	}

	if (update) data[names[0]] = value;
	else return data[names[0]] ? data[names[0]] : null;
};

class Container extends _BaseField__WEBPACK_IMPORTED_MODULE_4__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_4__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_1__.NODENAMES.Container;
	}

	constructor(value = null) {
		super(value ? value : {});
		this.fields = [];
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_1__.EVENTS.valueChanged, (event) => {
			const field = event.target;
			if (field != this) {
				event.preventDefault();
				event.stopPropagation();

				const chain = event.detail;
				this.childValueChanged(field, chain);
			}
		});
	}

	async init() {
		const ready = this.ready;
		await super.init();
		this.fields = (0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__.findFields)(this);
		if (!ready.resolved) {
			this.on(_Constants__WEBPACK_IMPORTED_MODULE_1__.EVENTS.initialize, (event) => {
				if (event.target != this) {
					const field = event.target;
					if (field instanceof _BaseField__WEBPACK_IMPORTED_MODULE_4__["default"]) {
						if (this.fields.indexOf(field) < 0) {
							this.fields.push(field);
						}

						event.preventDefault();
						event.stopPropagation();
					}
				}
			});

			this.validator.addCustomCheck(async ({ data, base }) => {
				const { fields } = base;
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
	}

	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	async updatedValue(value) {
		await this.ready;
		(0,_BaseField__WEBPACK_IMPORTED_MODULE_4__._value)(this, {});
		const { fields } = this;
		if (fields) {
			for (let field of fields) {
				if (field.name) await field.value(valueHelper(value, field.name));
				else if (field instanceof Container) await field.value(value);
			}
		}
	}

	async childValueChanged(field, chain) {
		await this.ready;
		const data = (0,_BaseField__WEBPACK_IMPORTED_MODULE_4__._value)(this);
		const name = await field.name;
		const value = await field.value();
		const hasValue = value != null && typeof value !== "undefined";
		if (name) {
			if (hasValue) data[name] = value;
			else delete data[name];
		} else if (hasValue) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge(data, value);

		this.validate();
		this.publishValue(chain);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__["default"])(Container);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);


/***/ }),

/***/ "./src/Control.js":
/*!************************!*\
  !*** ./src/Control.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/controls/index.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");






const BUTTONDUMMY = {
	active: true,
	disabled: true,
};

const ATTRIBUTES = [];
class Control extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Control;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		if (!this.ready.resolved) {
			this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
			this.back = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.BackButton).first() || BUTTONDUMMY;
			this.next = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.NextButton).first() || BUTTONDUMMY;
			this.summary = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.SummaryButton).first() || BUTTONDUMMY;
			this.submit = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.SubmitButton).first() || BUTTONDUMMY;

			this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.validStateChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.conditionStateChanged], (event) => {
				if (event.target instanceof _Page__WEBPACK_IMPORTED_MODULE_3__["default"]) this.update();
			});

			this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.formStateChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.siteChanged], (event) => {
				this.update();
			});
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

		if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.finished) {
			back.disabled = true;
			submit.active = true;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.summary) {
			back.disabled = false;
			submit.active = true;
			submit.disabled = !form.valid;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.input) {
			back.disabled = activePageIndex <= 0;

			if (nextPage || (!activePage.valid && activePageIndex + 1 < pages.length)) {
				next.active = true;
				next.disabled = !activePage.valid;
			} else if (useSummaryPage && state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.input) {
				summary.active = true;
				summary.disabled = !activePage.valid;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}
	}
}
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__["default"])(Control);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);


/***/ }),

/***/ "./src/Field.js":
/*!**********************!*\
  !*** ./src/Field.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrapper */ "./src/wrapper/index.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");





const ATTRIBUTES = ["file-format"];

class Field extends _BaseField__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Field;
	}

	constructor() {
		super();
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const value = event.detail ? event.detail : null;
			if((0,_BaseField__WEBPACK_IMPORTED_MODULE_1__._value)(this) != value)
				this.value(value);
		});
	}
	
	async init() {
		await super.init();
		const ready = this.ready;
		if (!ready.resolved) {
			this.wrapper = (0,_wrapper__WEBPACK_IMPORTED_MODULE_2__.findWrapper)(this);
			if (this.wrapper)
				this.validator.addCustomCheck(async () => {
					return this.wrapper.valid;
				});
		}
		
		this.publishValue();
	}

	readonlyUpdated() {
		if (this.wrapper) this.wrapper.readonly = this.readonly;
	}

	async acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	async normalizeValue(value) {
		if (this.wrapper) return this.wrapper.normalizeValue(value);

		return value;
	}

	async updatedValue(value) {		
		await this.ready;	
		if (this.wrapper) await this.wrapper.updatedValue(value);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_3__["default"])(Field);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Field);


/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Control */ "./src/Control.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.js");











const PRIVATE_STATE = "state";

const formState = function (self, state) {
	if (arguments.length == 2) (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(self, PRIVATE_STATE, state);
	else return (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privateProperty)(self, PRIVATE_STATE);
};

const collectData = async (self) => {
	await self.ready;
	const data = {};
	const pages = self.pages;
	for (let page of pages) {
		if (page.condition) {
			const name = page.name;
			const value = await page.value();
			const hasValue = value != null && typeof value !== "undefined";
			if (name && hasValue) data[name] = value;
			else if (hasValue) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_2__["default"].merge(data, value);
		}
	}

	return data;
};

const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_USE_SUMMARY_PAGE, _Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_ENDPOINT, _Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_METHOD, _Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_STATE, _Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

class Form extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_4__.NODENAMES.Form;
	}

	constructor() {
		super();
		formState(this, null);
		let valueChangeTimeout = null;
		this.on(
			_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.valueChanged,
			(event) => {
				event.stopPropagation();
				const detail = event.detail;
				if(valueChangeTimeout)
					clearTimeout(valueChangeTimeout);

				valueChangeTimeout = setTimeout(() => {
					valueChangeTimeout = null;
					this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.executeValidate, detail);
				}, 1);
			}
		);
	}

	async init() {
		await super.init();
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.init;
		const ready = this.ready;
		if (!ready.resolved) {
			this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_USE_SUMMARY_PAGE);
			this.activePageIndex = -1;

			this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_USE_SUMMARY_PAGE);
			this.pages = this.find(_Constants__WEBPACK_IMPORTED_MODULE_4__.NODENAMES.Page);
		}

		this.activePageIndex = -1;
		if (this.pages.length > 0) this.toNextPage();
	}

	get state() {
		return formState(this);
	}

	set state(state) {
		const actual = this.state;
		if (actual == _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input && state != _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input) readonly(this, true);
		else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input && state == _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		formState(this, state);

		if (actual != state) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.formStateChanged);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_STATE, state);
	}

	get valid() {
		for (let page of this.pages) if (!page.valid) return false;

		return true;
	}

	async value(data) {
		if (arguments.length == 0) return collectData(this); //return formData(this);

		await this.ready;
		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input) {
			for (let page of this.pages) {
				await page.value(null); // reset all values
				if (page.name) await page.value(data[page.name]);
				else await page.value(data);
			}

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.allPublishValue);
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
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input) this.state = _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input;

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.siteChanged);
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
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.init) this._state = _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.summary;
	}

	async submit() {
		this.state = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.input : _Constants__WEBPACK_IMPORTED_MODULE_4__.FORMSTATES.finished;
		const data = await this.value();

		let endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_ENDPOINT);
		if (endpoint) {
			endpoint = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_1__["default"].resolveText(endpoint, data, endpoint);
			const url = new URL(endpoint, location);

			return await fetch(url.toString(), {
				method: this.attr(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_METHOD) || "post",
				credentials: "include",
				mode: "cors",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENTS.submit, data);
	}
}
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__["default"])(Form);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);


/***/ }),

/***/ "./src/FormButton.js":
/*!***************************!*\
  !*** ./src/FormButton.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED];

class FormButton extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(button) {
	
	}

	constructor() {
		super();
		this.active = false;
		this.disabled = false;
		this.on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			if (this.active && !this.disabled) this.execute();
		});
	}

	async init() {
		await super.init();
		this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		active ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, null);
	}

	get disabled() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED);
	}

	set disabled(disabled) {
		disabled ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED, "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED, null);
	}

	execute() {
		console.log("execute");
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormButton);


/***/ }),

/***/ "./src/List.js":
/*!*********************!*\
  !*** ./src/List.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _list_Row__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/Row */ "./src/list/Row.js");
/* harmony import */ var _list_AddRow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list/AddRow */ "./src/list/AddRow.js");
/* harmony import */ var _list_DeleteRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./list/DeleteRow */ "./src/list/DeleteRow.js");
/* harmony import */ var _list_Rows__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./list/Rows */ "./src/list/Rows.js");











const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX];

const findAddButton = (list) => {
	return (0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_3__.treeFilter)({
		root: list,
		filter: (element) => {
			if (element instanceof _list_AddRow__WEBPACK_IMPORTED_MODULE_7__["default"]) return { accept: true, stop: true };
			else if (element instanceof _BaseField__WEBPACK_IMPORTED_MODULE_5__["default"]) return { accept: false, stop: true };
			return { accept: false };
		},
	})[0];
};

const createRow = async (list, value) => {
	const { container, template } = list;
	const row = document.importNode(template.content, true).children[0];
	container.append(row);

	if (value) await row.value(value);

	return row;
};

class List extends _BaseField__WEBPACK_IMPORTED_MODULE_5__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_5__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.List;
	}

	constructor(value = null) {
		super(value ? value : []);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.valueChanged, (event) => {
			const row = event.target;
			if (row instanceof _list_Row__WEBPACK_IMPORTED_MODULE_6__["default"]) {
				event.preventDefault();
				event.stopPropagation();

				const chain = event.detail;
				this.childValueChanged(row, chain);
			}
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowAdd, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { readonly} = this;
			const values = (0,_BaseField__WEBPACK_IMPORTED_MODULE_5__._value)(this);
			if (!readonly) {
				const row = createRow(this);
				values.push(row.value);

				this.validate();
				this.publishValue();
			}
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowDelete, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { rows, readonly} = this;
			const values = (0,_BaseField__WEBPACK_IMPORTED_MODULE_5__._value)(this);
			if (!readonly) {
				const row = event.target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRow);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();
					rows.splice(index, 1);
					values.splice(index, 1);

					this.validate();
					this.publishValue();
				}
			}
		});
	}

	async init() {
		await super.init();		
		const ready = this.ready;
		if (!ready.resolved) {
			this.template = this.find("template").first();
			this.container = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRows).first();
			const validator  = this.validator;
			const addButton = findAddButton(this);

			validator.addCustomCheck(async ({}) => {
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
		}

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
		if (this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX)) return parseInt(this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX));
		return Number.MAX_SAFE_INTEGER;
	}

	acceptValue(value) {
		return !value || value instanceof Array;
	}

	normalizeValue(value) {
		return value ? value.filter((item) => !!item) : null;
	}

	async updatedValue(value) {
		this.container.children.remove();
		if (value) for (let val of value) await createRow(this, val);
	}

	async childValueChanged(row, chain) {
		await this.ready;		
		let values = await (0,_BaseField__WEBPACK_IMPORTED_MODULE_5__._value)(this);
		if (!values) {
			values = [];
			(0,_BaseField__WEBPACK_IMPORTED_MODULE_5__._value)(values);
		}

		const rows = this.rows;
		const value = await row.value();
		const index = rows.indexOf(row);		
		values[index] = value;

		await this.validate();
		await this.publishValue(chain);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__["default"])(List);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);


/***/ }),

/***/ "./src/Message.js":
/*!************************!*\
  !*** ./src/Message.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ATTRIBUTE_ACTIVE": () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   "ATTRIBUTE_CONDITION": () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   "findParentBase": () => (/* binding */ findParentBase),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");








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

class Message extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAMES.Message;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		const ready = this.ready;		

		if (!ready.resolved) {			
			this.reference = findParentBase(this);
			this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAMES.Form);
			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.executeValidate, () => {
				this.update();
			});
		}
		this.update();
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
		await this.ready;
		const data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.evaluationData)(this.reference);
		this.active = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(this.condition, data, false);
	}
}
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_6__["default"])(Message);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message);


/***/ }),

/***/ "./src/Page.js":
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container */ "./src/Container.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STEP];

class Page extends _Container__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Container__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Page;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
	}

	get step(){
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STEP);
	}
	
	conditionUpdated(){}
}
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(Page);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);


/***/ }),

/***/ "./src/ProgressBar.js":
/*!****************************!*\
  !*** ./src/ProgressBar.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Step */ "./src/Step.js");





const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS];

const firstStepPageIndex = (pages, step, activePage) => {
	for (let page of pages) {
		if (page.step == step && page.condition) return page;
		else if (page == activePage) return;
	}

	return null;
};

class ProgressBar extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ProgressBar;
	}

	constructor() {
		super();

		this.on("click", ({ target }) => {
			if (!this.form) return;
			if (target == this) return;

			const step = target.is(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step) ? target : target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step).first();

			if (!step) return;

			const state = this.form.state;
			const pages = this.form.pages;
			const activePageIndex = this.form.activePageIndex;
			const activePage = this.form.activePage;
			const stepName = step.name;
			if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.input || state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.summary) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) this.form.activePage = page;
			}
		});
	}

	async init() {
		await super.init();
		const ready = this.ready;
		this.progress = 0;
		if (!ready.resolved) {
			this.form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
			this.steps = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step);
			this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.initialize, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.siteChanged, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.formStateChanged], () => {
				const state = this.form.state;
				const activePage = this.form.activePage;
				if (!activePage) return;

				const index = this.form.activePageIndex;
				const count = this.form.pages.length;
				const pageStep = activePage ? activePage.step : _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.init;
				const progress = Math.floor((index * 100) / count);

				for (let step of this.steps) {
					const name = step.name;
					if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.input) {
						step.active = name == pageStep;
						step.readonly = false;
					} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.summary) {
						step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.summary;
						step.readonly = false;
					} else {
						step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.finished;
						step.readonly = true;
					}
				}

				this.progress = state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.summary || state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATES.finished ? 100 : progress;

				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.progressbarChanged);
			});
		}
	}

	get progress() {
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS);
	}

	set progress(progress) {
		if (this.style.setProperty) this.style.setProperty("--progress", progress + "%");
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS, Math.max(0, Math.min(progress, 100)));
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(ProgressBar);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);


/***/ }),

/***/ "./src/Step.js":
/*!*********************!*\
  !*** ./src/Step.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY];

class Step extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step;
	}

	constructor() {
		super();
	}

    get name(){
        return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME);
    }
    
    get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_1__.updateActiveState)(this, active);
		}
	}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		readonly ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, null);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(Step);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Step);


/***/ }),

/***/ "./src/Validation.js":
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ATTRIBUTE_ACTIVE": () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   "ATTRIBUTE_CONDITION": () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];


class Validation extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Validation;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.active = false;
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
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(Validation);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validation);


/***/ }),

/***/ "./src/Validator.js":
/*!**************************!*\
  !*** ./src/Validator.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validation */ "./src/Validation.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");








const updateReadonly = async ({ data, valid, base, condition }) => {
	const { form } = base;
	if (form.state == _Constants__WEBPACK_IMPORTED_MODULE_1__.FORMSTATES.input) {
		if (!valid)
			base.readonly = false;
		else if (condition) {
			const test = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(condition, data, false);
			base.editable = test;
			return test;
		}
	}
	return valid;
}

class Validator {
	constructor(base) {
		this.inital = true;
		this.base = base;
		this.customChecks = [];
		this.validations = (0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_4__.findValidations)(base) || [];
		this.condition = base.attr(_Constants__WEBPACK_IMPORTED_MODULE_1__.ATTRIBUTE_CONDITION);
		this.editableCondition = base.attr(_Constants__WEBPACK_IMPORTED_MODULE_1__.ATTRIBUTE_EDITABLE_CONDITION);

	}

	addCustomCheck(check) {
		this.customChecks.push(check);
	}

	get form() {
		return this.base.form;
	}

	async validate() {
		const { base, validations, customChecks, condition, editableCondition } = this;
		const { hasValue, required, requiredOnlyOnActive } = base;
		const hasChecks = customChecks.length > 0 || validations.length > 0;
		const data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.evaluationData)(base);
		const initial = this.inital;
		this.inital = false;


		const conditionValid = condition ? await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(condition, data, false) : true;
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateConditionState)(base, conditionValid, this.inital);

		let valid = required ? hasValue : true;
		if (conditionValid) {
			if (valid)
				for (let check of customChecks) {
					const test = await check({ data, base });
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

			const editable = updateReadonly({ data, valid, base, condition: editableCondition });
			if(!editable)
				valid = true;
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateValidState)(base, valid, this.inital);
			
		}
		return valid;

	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validator);


/***/ }),

/***/ "./src/controls/BackButton.js":
/*!************************************!*\
  !*** ./src/controls/BackButton.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];
class BackButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.BackButton;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toPrevPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackButton);
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(BackButton);


/***/ }),

/***/ "./src/controls/NextButton.js":
/*!************************************!*\
  !*** ./src/controls/NextButton.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];
class NextButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.NextButton;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextButton);
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(NextButton);


/***/ }),

/***/ "./src/controls/SubmitButton.js":
/*!**************************************!*\
  !*** ./src/controls/SubmitButton.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];
class SubmitButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.SubmitButton;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.submit();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitButton);
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(SubmitButton);


/***/ }),

/***/ "./src/controls/SummaryButton.js":
/*!***************************************!*\
  !*** ./src/controls/SummaryButton.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];
class SummaryButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.SummaryButton;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryButton);
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(SummaryButton);


/***/ }),

/***/ "./src/controls/index.js":
/*!*******************************!*\
  !*** ./src/controls/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackButton": () => (/* reexport safe */ _BackButton__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "NextButton": () => (/* reexport safe */ _NextButton__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "SummaryButton": () => (/* reexport safe */ _SummaryButton__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "SubmitButton": () => (/* reexport safe */ _SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _BackButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackButton */ "./src/controls/BackButton.js");
/* harmony import */ var _NextButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NextButton */ "./src/controls/NextButton.js");
/* harmony import */ var _SummaryButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SummaryButton */ "./src/controls/SummaryButton.js");
/* harmony import */ var _SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitButton */ "./src/controls/SubmitButton.js");








/***/ }),

/***/ "./src/list/AddRow.js":
/*!****************************!*\
  !*** ./src/list/AddRow.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];
class AddRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME(){
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ButtonAddRow;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.active = true;
	}

	execute() {
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowAdd);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(AddRow);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddRow);


/***/ }),

/***/ "./src/list/DeleteRow.js":
/*!*******************************!*\
  !*** ./src/list/DeleteRow.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/DefineElement */ "./src/utils/DefineElement.js");




const ATTRIBUTES = [];

class DeleteRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ButtonDeleteRow;
	}

	constructor() {
		super();
	}

	async init(){
		await super.init();
		this.active	= true;
	}

	execute() {
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowDelete);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(DeleteRow);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteRow);


/***/ }),

/***/ "./src/list/Row.js":
/*!*************************!*\
  !*** ./src/list/Row.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Container */ "./src/Container.js");
/* harmony import */ var _DeleteRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeleteRow */ "./src/list/DeleteRow.js");




const ATTRIBUTES = [];
class ListRow extends _Container__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Container__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRow;
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

customElements.define(ListRow.NODENAME, ListRow);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListRow);


/***/ }),

/***/ "./src/list/Rows.js":
/*!**************************!*\
  !*** ./src/list/Rows.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");



const ATTRIBUTES = [];
class ListRows extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRows;
	}

	constructor() {
		super();
	}
}

customElements.define(ListRows.NODENAME, ListRows);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListRows);


/***/ }),

/***/ "./src/utils/DataHelper.js":
/*!*********************************!*\
  !*** ./src/utils/DataHelper.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "evaluationData": () => (/* binding */ evaluationData)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");



const evaluationData = async (base) => {
	await base.ready;
	const data = {};
	data[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTVALUE] = await base.value();

	let row = base.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__.NODENAMES.ListRow);
	let temp = data;
	while (row) {
		temp[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTLISTROW] = await row.value();
		temp = temp[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTLISTROW];
		row = row.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__.NODENAMES.ListRow);
	}
	
	return _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge( data, await base.form.value());
}

/***/ }),

/***/ "./src/utils/DefineElement.js":
/*!************************************!*\
  !*** ./src/utils/DefineElement.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((Node) => {
    if(!window.customElements.get(Node.NODENAME))
        window.customElements.define(Node.NODENAME, Node);
});

/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toEvents": () => (/* binding */ toEvents),
/* harmony export */   "makeEventCopy": () => (/* binding */ makeEventCopy),
/* harmony export */   "toTimeoutHandle": () => (/* binding */ toTimeoutHandle)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const toEvents = function() {
    return Array.from(arguments).join(" ");
};

const makeEventCopy = (event) => {
    return {
        type: event.type,
        target: event.target,
        detail: event.detail,
        currentTarget: event.currentTarget,
        explicitOriginalTarget: event.explicitOriginalTarget,
        originalTarget : event.originalTarget,
        srcElement: event.srcElement,
        timeStamp: event.timeStamp
    };
}

const toTimeoutHandle = (handle, preventDefault, stopPropagation, timeout) => {
    let id = null;

    const prevent = typeof preventDefault === "function" ? preventDefault : () => preventDefault;
    const stop = typeof stopPropagation === "function" ? stopPropagation : () => stopPropagation;

    return (event) => {
        if(prevent(event))
            event.preventDefault();
        if(stop(event))
            event.stopPropagation();

        const eventCopy = makeEventCopy(event);

        if(id)
            clearTimeout(id);
                    
        id = setTimeout(() => {
            id = null;
            handle(eventCopy);
        }, timeout || _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_TIMEOUT);

    }
};

/***/ }),

/***/ "./src/utils/NodeHelper.js":
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "treeFilter": () => (/* binding */ treeFilter),
/* harmony export */   "findFields": () => (/* binding */ findFields),
/* harmony export */   "findValidations": () => (/* binding */ findValidations)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateValidState": () => (/* binding */ updateValidState),
/* harmony export */   "updateConditionState": () => (/* binding */ updateConditionState),
/* harmony export */   "updateActiveState": () => (/* binding */ updateActiveState),
/* harmony export */   "updateEditableState": () => (/* binding */ updateEditableState)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const updateValidState = (target, valid, initial = false) => {
	const oldState = target.valid;
	if (typeof valid === "undefined" || valid == null) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INVALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID, null);
	} else if (valid) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INVALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID, "");
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INVALID, "");
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID, null);
	}

	if (oldState != valid || initial){ 
		target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.validStateChanged);
	}
};

const updateConditionState = (target, valid, initial = false) => {
	
	const oldState = target.condition;
	if (valid) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, "");
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, "");
	}
	if (oldState != valid || initial) {		
		target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.conditionStateChanged);
	}
};

const updateActiveState = (target, active, initial = false) => {
	const oldState = target.active;
	active ? target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, null);
	if (oldState != active || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.activeStateChanged);
};

const updateEditableState = (target, editable, initial = false) => {
	const oldState = target.editable;
	if (editable) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, "");
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, null);
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, "");
	}
	if (oldState != editable || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.editableStateChanged);
};

/***/ }),

/***/ "./src/wrapper/Checkbox.js":
/*!*********************************!*\
  !*** ./src/wrapper/Checkbox.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Checkbox)
/* harmony export */ });
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ File)
/* harmony export */ });
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
				async () => {
					this.updatedValue(await readFiles(input.files, format, multiple));
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.value);
				},
				false,
				true
			)
		);

		if (input.files && input.files.length != 0)
			this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.value);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Radio)
/* harmony export */ });
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
		(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
			() => {
				field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.changeValue);
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.value);
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.value);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");





const INPUTSELECTOR = 'input:not([type="file"]):not([type="radio"]):not([type="checkbox"]) ,input:not([type]), textarea';

const DEFAULTTYPE = "text";

const text = {
	accept: (value) => {
		return typeof value === "string";
	},
	value: (input) => {
		return input.value;
	},
	normalize: (value) => {
		if (value) {
			value = value.trim();
			return value.length > 0 ? value : null;
		}

		return null;
	},
};
const number = {
	accept: (value) => {
		return typeof value === "number";
	},
	value: (input) => {
		return input.valueAsNumber;
	},
	normalize: (value) => {
		if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value) && !Number.isNaN(value)) return value;

		return null;
	},
};
const date = {
	accept: (value) => {
		return value instanceof Date;
	},
	value: (input) => {
		return input.valueAsDate;
	},
	normalize: (value) => {
		if (value) return value;

		return null;
	},
};
const TYPES = { text, number, date, time: date };

class Text extends _Wrapper__WEBPACK_IMPORTED_MODULE_3__["default"] {
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__.toTimeoutHandle)(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
				},
				false,
				true,
			),
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, this.normalizeValue(this.value));
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined") return true;

		return this.type.accept(value);
	}

	normalizeValue(value) {
		if (value == null && typeof value === "undefined") return null;

		return this.type.normalize(value);
	}
	async updatedValue(value) {
		if (value != this.input.value)
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Wrapper)
/* harmony export */ });
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

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async updatedValue() {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrappers": () => (/* binding */ wrappers),
/* harmony export */   "findWrapper": () => (/* binding */ findWrapper)
/* harmony export */ });
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./module-bundle.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* reexport safe */ _src_Form__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Page": () => (/* reexport safe */ _src_Page__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "BaseField": () => (/* reexport safe */ _src_BaseField__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Field": () => (/* reexport safe */ _src_Field__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "List": () => (/* reexport safe */ _src_List__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Container": () => (/* reexport safe */ _src_Container__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _src_BaseField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/BaseField */ "./src/BaseField.js");
/* harmony import */ var _src_Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Field */ "./src/Field.js");
/* harmony import */ var _src_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Container */ "./src/Container.js");
/* harmony import */ var _src_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/List */ "./src/List.js");
/* harmony import */ var _src_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Page */ "./src/Page.js");
/* harmony import */ var _src_Form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Form */ "./src/Form.js");









})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLWJ1bmRsZS1kZWZhdWx0anMtaHRtbC1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxXQUFXLHFCQUFNLHlCQUF5QixxQkFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ1BOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG1CQUFtQiwrREFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxnQkFBZ0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNEJBQTRCLCtDQUErQyxJQUFJO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0U7QUFDUjtBQUNRO0FBQ1Y7QUFDRDtBQUNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTElucHV0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MU2VsZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0h0bWxDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL05vZGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZUxpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvRGF0YVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvTGlzdFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvdXRpbHMvRXZlbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9XZWFrRGF0YS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9EZWZpbmVFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvRXZlbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9Ob2RlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvU3RhdGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0NoZWNrYm94LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9GaWxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9SYWRpby5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvU2VsZWN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9UZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9XcmFwcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9tb2R1bGUtYnVuZGxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICpcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24gKGFLZXksIGFEYXRhLCBhT2JqZWN0KSB7XHJcblx0aWYgKHR5cGVvZiBhRGF0YSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKGFPYmplY3QsIGFLZXksIHRydWUpO1xyXG5cdFx0cHJvcGVydHkuYXBwZW5kID0gYURhdGE7XHJcblx0fVxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICpcclxuICogQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYmUgdGVzdGluZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbiAoYU9iamVjdCkge1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXJcclxuICogdmFsdWUgd291bGQgYmUgcmVwbGFjZWQgYnkgdmFsdWUgZnJvbSB0aGUgc291cmNlIG9iamVjdC5cclxuICpcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqXHJcbiAqIEBwYXJhbSB0YXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gc291cmNlczpvYmplY3RcclxuICpcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgLi4uc291cmNlcykge1xyXG5cdGlmKCF0YXJnZXQpXHJcblx0XHR0YXJnZXQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgc291cmNlIG9mIHNvdXJjZXMpIHtcclxuXHRcdGlmIChpc1Bvam8oc291cmNlKSkge1xyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpc1Bvam8odGFyZ2V0W2tleV0pKSBtZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uICh7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgW2RhdGEsIHByb3BGaWx0ZXIsIHsgZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW10gfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XHJcblx0XHRjb25zdCBhY2NlcHQgPSBwcm9wRmlsdGVyKG5hbWUsIHZhbHVlLCBkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQgJiYgKCFkZWVwIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdGVsc2UgaWYgKGFjY2VwdCAmJiBkZWVwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdGlmICh0eXBlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV0gfHwgdmFsdWUgPT0gZGF0YSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2UgcmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7IGRlZXAsIHJlY3Vyc2l2ZSwgcGFyZW50czogcGFyZW50cy5jb25jYXQoZGF0YSkgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZlZhbHVlID0gKG8sIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdHZhbHVlLFxyXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVmR2V0ID0gKG8sIG5hbWUsIGdldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmR2V0U2V0ID0gKG8sIG5hbWUsIGdldCwgc2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdHNldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtwcml2YXRlUHJvcGVydHl9IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiY29uc3Qgc2Vla0F0Q2hhaW4gPSAocmVzb2x2ZXIsIHByb3BlcnR5KSA9PiB7XG5cdHdoaWxlKHJlc29sdmVyKXtcblx0XHRjb25zdCBkZWYgPSByZXNvbHZlci5wcm94eS5oYW5kbGUuZ2V0UHJvcGVydHlEZWYocHJvcGVydHksIGZhbHNlKTtcblx0XHRpZihkZWYpXG5cdFx0XHRyZXR1cm4gZGVmO1xuXHRcdFxuXHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xuXHR9XHRcblx0cmV0dXJuIHsgZGF0YTogbnVsbCwgcmVzb2x2ZXI6IG51bGwsIGRlZmluZWQ6IGZhbHNlIH07XG59XG5cbmNsYXNzIEhhbmRsZSB7XG5cdGNvbnN0cnVjdG9yKGRhdGEsIHJlc29sdmVyKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0Z2V0UHJvcGVydHlEZWYocHJvcGVydHksIHNlZWsgPSB0cnVlKSB7XG5cdFx0aWYgKHRoaXMuY2FjaGUuaGFzKHByb3BlcnR5KSlcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLmdldChwcm9wZXJ0eSk7XG5cdFx0XG5cdFx0bGV0IGRlZiA9IG51bGxcblx0XHRpZiAodGhpcy5kYXRhICYmIHByb3BlcnR5IGluIHRoaXMuZGF0YSlcblx0XHRcdGRlZiA9IHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9O1xuXHRcdGVsc2UgaWYoc2Vlaylcblx0XHRcdGRlZiA9IHNlZWtBdENoYWluKHRoaXMucmVzb2x2ZXIucGFyZW50LCBwcm9wZXJ0eSk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0aWYoZGVmLmRlZmluZWQpXG5cdFx0XHR0aGlzLmNhY2hlLnNldChwcm9wZXJ0eSwgZGVmKTtcblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0aGFzUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRyZXR1cm4gZGVmaW5lZDtcblx0fVxuXHRnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuXHRcdC8vQFRPRE8gd3JpdGUgdGVzdHMhISFcdFxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRhdGEgPyBkYXRhW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcblx0fVxuXHRzZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkYXRhLCBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRpZiAoZGVmaW5lZClcblx0XHRcdGRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhKVxuXHRcdFx0XHR0aGlzLmRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kYXRhID0ge31cblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9KTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXHRcdFxuXHRcdHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkIGZ1bmN0aW9uIVwiKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHQge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0LCByZXNvbHZlcikge1xuXHRcdHRoaXMuaGFuZGxlID0gbmV3IEhhbmRsZShjb250ZXh0LCByZXNvbHZlcik7XHRcdFxuXHRcdHRoaXMuZGF0YSA9IG5ldyBQcm94eSh0aGlzLmhhbmRsZSwge1xuXHRcdFx0aGFzOiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5oYXNQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5nZXRQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZGVsZXRlUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9AVE9ETyBuZWVkIHRvIHN1cHBvcnQgdGhlIG90aGVyIHByb3h5IGFjdGlvbnNcdFx0XG5cdFx0fSk7O1xuXHR9XG5cdFxuXHR1cGRhdGVEYXRhKGRhdGEpe1xuXHRcdHRoaXMuaGFuZGxlLnVwZGF0ZURhdGEoZGF0YSlcdFx0XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmhhbmRsZS5yZXNldENhY2hlKCk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdFZhbHVlIHtcblx0Y29uc3RydWN0b3IodmFsdWUpe1xuXHRcdHRoaXMuaGFzVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XHRcbn07IiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzXCJcclxuaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzXCJcclxuaW1wb3J0IERlZmF1bHRWYWx1ZSBmcm9tIFwiLi9EZWZhdWx0VmFsdWUuanNcIjtcclxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vQ29udGV4dC5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IEVYRUNVVElPTl9XQVJOX1RJTUVPVVQgPSAxMDAwO1xyXG5jb25zdCBFWFBSRVNTSU9OID0gLyhcXFxcPykoXFwkXFx7KChbYS16QS1aMC05XFwtX1xcc10rKTo6KT8oW15cXHtcXH1dKylcXH0pLztcclxuY29uc3QgTUFUQ0hfRVNDQVBFRCA9IDE7XHJcbmNvbnN0IE1BVENIX0ZVTExfRVhQUkVTU0lPTiA9IDI7XHJcbmNvbnN0IE1BVENIX0VYUFJFU1NJT05fU0NPUEUgPSA0O1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVCA9IDU7XHJcblxyXG5jb25zdCBERUZBVUxUX05PVF9ERUZJTkVEID0gbmV3IERlZmF1bHRWYWx1ZSgpO1xyXG5jb25zdCB0b0RlZmF1bHRWYWx1ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUpXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdHJldHVybiBuZXcgRGVmYXVsdFZhbHVlKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbihhU3RhdGVtZW50LCBhQ29udGV4dCkge1xyXG5cdGlmICh0eXBlb2YgYVN0YXRlbWVudCAhPT0gXCJzdHJpbmdcIilcclxuXHRcdHJldHVybiBhU3RhdGVtZW50O1xyXG5cdFx0XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbihcImNvbnRleHRcIiwgXHJcbmBcclxucmV0dXJuIChhc3luYyAoY29udGV4dCkgPT4ge1xyXG5cdHRyeXsgXHJcblx0XHR3aXRoKGNvbnRleHQpe1xyXG5cdFx0XHQgcmV0dXJuICR7YVN0YXRlbWVudH1cclxuXHRcdH1cclxuXHR9Y2F0Y2goZSl7XHJcblx0XHR0aHJvdyBlO1xyXG5cdH1cclxufSkoY29udGV4dClgXHJcblx0KTtcclxuXHRcclxuXHRsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRjb25zb2xlLndhcm4oXCJsb25nIHJ1bm5pbmcgc3RhdGVtZW50OlwiLCBhU3RhdGVtZW50LCBuZXcgRXJyb3IoKSk7XHJcblx0fSwgRVhFQ1VUSU9OX1dBUk5fVElNRU9VVClcclxuXHRsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG5cdHRyeXtcclxuXHRcdHJlc3VsdCA9IGF3YWl0IGV4cHJlc3Npb24oYUNvbnRleHQpO1xyXG5cdH1jYXRjaChlKXt9XHJcblx0XHJcblx0aWYodGltZW91dClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlID0gYXN5bmMgZnVuY3Rpb24oYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKVxyXG5cdFx0cmV0dXJuIGFSZXNvbHZlci5wYXJlbnQgPyByZXNvbHZlKGFSZXNvbHZlci5wYXJlbnQsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkgOiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoYUV4cHJlc3Npb24sIGFSZXNvbHZlci5wcm94eS5kYXRhKTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHRlbHNlIGlmIChhRGVmYXVsdCBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSAmJiBhRGVmYXVsdC5oYXNWYWx1ZSlcclxuXHRcdHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYXRjaCA9IGFzeW5jIChyZXNvbHZlciwgbWF0Y2gsIGRlZmF1bHRWYWx1ZSkgPT4ge1xyXG5cdGlmKG1hdGNoW01BVENIX0VTQ0FQRURdKVxyXG5cdFx0cmV0dXJuIG1hdGNoW01BVENIX0ZVTExfRVhQUkVTU0lPTl07IFxyXG5cdFx0XHJcblx0cmV0dXJuIHJlc29sdmUocmVzb2x2ZXIsIG1hdGNoW01BVENIX0VYUFJFU1NJT05fU1RBVEVNRU5UXSwgbm9ybWFsaXplKG1hdGNoW01BVENIX0VYUFJFU1NJT05fU0NPUEVdKSwgZGVmYXVsdFZhbHVlKTtcclxufVxyXG5cclxuY29uc3Qgbm9ybWFsaXplID0gdmFsdWUgPT4ge1xyXG5cdGlmICh2YWx1ZSkge1xyXG5cdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcblx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID09IDAgPyBudWxsIDogdmFsdWU7XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyIHtcclxuXHRjb25zdHJ1Y3Rvcih7IGNvbnRleHQgPSBHTE9CQUwsIHBhcmVudCA9IG51bGwsIG5hbWUgPSBudWxsIH0pIHtcclxuXHRcdHRoaXMucGFyZW50ID0gKHBhcmVudCBpbnN0YW5jZW9mIEV4cHJlc3Npb25SZXNvbHZlcikgPyBwYXJlbnQgOiBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0XHR0aGlzLnByb3h5ID0gbmV3IENvbnRleHQodGhpcy5jb250ZXh0LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGdldCBjaGFpbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldCBlZmZlY3RpdmVDaGFpbigpIHtcclxuXHRcdGlmICghdGhpcy5jb250ZXh0KVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiA6IFwiXCI7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgY29udGV4dENoYWluKCkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRsZXQgcmVzb2x2ZXIgPSB0aGlzO1xyXG5cdFx0d2hpbGUgKHJlc29sdmVyKSB7XHJcblx0XHRcdGlmIChyZXNvbHZlci5jb250ZXh0KVxyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKHJlc29sdmVyLmNvbnRleHQpO1xyXG5cclxuXHRcdFx0cmVzb2x2ZXIgPSByZXNvbHZlci5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGdldERhdGEoa2V5LCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQuZ2V0RGF0YShrZXksIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQodGhpcy5jb250ZXh0LCBrZXksIGZhbHNlKTtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5ID8gcHJvcGVydHkudmFsdWUgOiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQudXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYodGhpcy5jb250ZXh0ID09IG51bGwgfHwgdHlwZW9mIHRoaXMuY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIil7XHJcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0ge307XHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLnByb3h5LnVwZGF0ZURhdGEodGhpcy5jb250ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQodGhpcy5jb250ZXh0LCBrZXkpO1xyXG5cdFx0XHRwcm9wZXJ0eS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLnByb3h5LnJlc2V0Q2FjaGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpIHtcclxuXHRcdGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQubWVyZ2VDb250ZXh0KGNvbnRleHQsIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQgPyBPYmplY3RVdGlscy5tZXJnZSh0aGlzLmNvbnRleHQsIGNvbnRleHQpIDogY29udGV4dDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFEZWZhdWx0KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWMoYUV4cHJlc3Npb24pO1xyXG5cdFx0XHRpZiAobWF0Y2gpXHJcblx0XHRcdFx0cmV0dXJuIGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlKHRoaXMsIG5vcm1hbGl6ZShhRXhwcmVzc2lvbiksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBhdCBleGVjdXRpbmcgc3RhdG1lbnRcXFwiXCIsIGFFeHByZXNzaW9uLCBcIlxcXCI6XCIsIGUpO1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlLmhhc1ZhbHVlID8gZGVmYXVsdFZhbHVlLnZhbHVlIDogYUV4cHJlc3Npb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYURlZmF1bHQpIHtcclxuXHRcdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0XHRsZXQgdGVtcCA9IGFUZXh0OyAvLyByZXF1aXJlZCB0byBwcmV2ZW50IGluZmluaXR5IGxvb3BcclxuXHRcdGxldCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZXh0KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORURcclxuXHRcdHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0dGVtcCA9IHRlbXAuc3BsaXQobWF0Y2hbMF0pLmpvaW4oKTsgLy8gcmVtb3ZlIGN1cnJlbnQgbWF0Y2ggZm9yIG5leHQgbG9vcFxyXG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChtYXRjaFswXSkuam9pbih0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IChyZXN1bHQgPT0gbnVsbCA/IFwibnVsbFwiIDogcmVzdWx0KSk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZShhRXhwcmVzc2lvbiwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoe2NvbnRleHQsIHByb3BGaWx0ZXIsIG9wdGlvbj17ZGVlcDp0cnVlfSwgbmFtZSwgcGFyZW50fSl7XHJcblx0XHRjb250ZXh0ID0gT2JqZWN0VXRpbHMuZmlsdGVyKHtkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb259KTtcclxuXHRcdHJldHVybiBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHtjb250ZXh0LCBuYW1lLCBwYXJlbnR9KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzL1V0aWxzXCI7XHJcblxyXG5VdGlscy5nbG9iYWwuZGVmYXVsdGpzID0gVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcyB8fCB7fTtcclxuVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcy5leHRkb20gPSBVdGlscy5nbG9iYWwuZGVmYXVsdGpzLmV4dGRvbSB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdHV0aWxzIDoge1xyXG5cdFx0VXRpbHM6IFV0aWxzXHJcblx0fVxyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLmZpbmQgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQuZmluZC5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5yZWFkeSA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5yZWFkeS5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5jcmVhdGUgPSBmdW5jdGlvbihhQ29udGVudCwgYXNUZW1wbGF0ZSkge1xyXG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdICE9PSBcInN0cmluZ1wiKVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmchXCIpO1xyXG5cdFxyXG5cdGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG5cdHRlbXBsYXRlLmlubmVySFRNTCA9IGFDb250ZW50O1xyXG5cdGlmKGFzVGVtcGxhdGUpXHJcblx0XHRyZXR1cm4gdGVtcGxhdGU7XHJcblx0XHJcblx0cmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSkuY2hpbGROb2RlcztcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5zY3JpcHQgPSBmdW5jdGlvbihhRmlsZSwgYVRhcmdldCkge1xyXG5cdGlmKGFGaWxlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoYUZpbGUubWFwKGZpbGUgPT4gVXRpbHMuZ2xvYmFsLnNjcmlwdChmaWxlLCBhVGFyZ2V0KSkpO1xyXG5cdFxyXG5cdGlmKHR5cGVvZiBhRmlsZSA9PT0gXCJzdHJpbmdcIilcdFxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyLGUpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7cigpfTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImxvYWQgZXJyb3IhXCIpfTtcclxuXHRcdFx0IWFUYXJnZXQgPyBkb2N1bWVudC5ib2R5LmFwcGVuZChzY3JpcHQpIDogYVRhcmdldC5hcHBlbmQoc2NyaXB0KTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IGFGaWxlO1xyXG5cdFx0fSk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwiRmlyc3QgcGFyYW1ldGVyIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBhIHN0cmluZyFcIik7XHJcbn07IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IFJlYWR5RXZlbnRTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudCwgUXVlcnlTdXBwb3J0LCBSZWFkeUV2ZW50U3VwcG9ydCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb2N1bWVudC50cmlnZ2VyKFwicmVhZHlcIikpO1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudEZyYWdtZW50LCBRdWVyeVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpO1xyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IEF0dHJpYnV0ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEVsZW1lbnQsUXVlcnlTdXBwb3J0LCBBdHRyaWJ1dGVTdXBwb3J0LCBNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcbmltcG9ydCBFdmVudFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnRcIjtcblxuZXh0ZW5kUHJvdG90eXBlKEV2ZW50VGFyZ2V0LCBFdmVudFN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgSHRtbENsYXNzU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnRcIjtcclxuaW1wb3J0IFNob3dIaWRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1Nob3dIaWRlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MRWxlbWVudCwgSHRtbENsYXNzU3VwcG9ydCwgU2hvd0hpZGVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MSW5wdXRFbGVtZW50LFZhbHVlU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTFNlbGVjdEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MVGV4dEFyZWFFbGVtZW50LEV4dGVuZGVyKFwiVmFsdWVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gYXJndW1lbnRzWzBdXHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcdFxyXG59KSk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XHJcbmltcG9ydCBMaXN0U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTENvbGxlY3Rpb24sIExpc3RTdXBwb3J0KTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxpbmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBjYWxsaW5nID09PSBcImZ1bmN0aW9uXCI7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IG5vZGUgPSB0aGlzW2ldO1xyXG5cdFx0bGV0XHRyZXN1bHQ7XHJcblx0XHRpZihpc0Z1bmN0aW9uKVxyXG5cdFx0XHRyZXN1bHQgPSBjYWxsaW5nLmFwcGx5KFtub2RlXS5jb25jYXQoYXJncykpO1xyXG5cdFx0ZWxzZSBpZih0eXBlb2Ygbm9kZVtjYWxsaW5nXSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRyZXN1bHQgPSBub2RlW2NhbGxpbmddLmFwcGx5KG5vZGUsIGFyZ3MpO1xyXG5cdFx0XHJcblx0XHRpZihyZXN1bHQpXHJcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0aWYodHlwZW9mIG5vZGUudmFsID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlLnZhbCgpO1xyXG5cdFx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHRcdHJlc3VsdC5zZXQoKG5vZGUubmFtZSB8fCBub2RlLmlkIHx8IG5vZGUuc2VsZWN0b3IoKSksIG5vZGUudmFsKCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9XHJcblx0ZWxzZVxyXG5cdFx0SFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmFwcGx5VG8uYXBwbHkodGhpcywgW1widmFsXCJdLmNvbmNhdChBcnJheS5mcm9tKGFyZ3VtZW50cykpKTtcclxufTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLmZyb20gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGxldCBjb3VudGVyID0gMDtcclxuXHRcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0aWYodHlwZW9mIGFyZyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcmcgIT0gbnVsbCl7XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG5cdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0ZWxzZSBpZihhcmcgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbiB8fCBhcmcgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBhcmcgaW5zdGFuY2VvZiBBcnJheSl7XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRpZihhcmdbaV0gJiYgYXJnW2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe1xyXG5cdFx0XHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZ1tpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGRhdGEubGVuZ3RoID0ge3ZhbHVlOiBjb3VudGVyfTtcclxuXHRyZXR1cm4gIE9iamVjdC5jcmVhdGUoSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLCBkYXRhKTtcclxufTtcclxuXHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xyXG5cdGxldCByZXN1bHRzID0gW107XHRcclxuXHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRpZihub2RlICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xyXG5cdFx0XHRpZihyZXN1bHQpeyBcclxuXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcclxuXHRcdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChBcnJheS5mcm9tKHJlc3VsdCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdGlmKHJlc3VsdHMubGVuZ3RoID09PSAwKVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRlbHNlIGlmKHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCByZXN1bHRzWzBdIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pXHJcblx0XHRyZXR1cm4gSFRNTENvbGxlY3Rpb24uZnJvbS5hcHBseShudWxsLCByZXN1bHRzKTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxufSxIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUsIE5vZGUucHJvdG90eXBlLCBIVE1MRWxlbWVudC5wcm90b3R5cGUsIEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlLCBFbGVtZW50LnByb3RvdHlwZSwgRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEYXRhU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0RhdGFTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKE5vZGUsRGF0YVN1cHBvcnQsTWFuaXB1bGF0aW9uU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XHJcbmltcG9ydCBMaXN0U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZUxpc3QsIExpc3RTdXBwb3J0KTtcclxuXHJcbk5vZGVMaXN0LnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxpbmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBjYWxsaW5nID09PSBcImZ1bmN0aW9uXCI7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IG5vZGUgPSB0aGlzW2ldO1xyXG5cdFx0bGV0XHRyZXN1bHQ7XHJcblx0XHRpZihpc0Z1bmN0aW9uKVxyXG5cdFx0XHRyZXN1bHQgPSBjYWxsaW5nLmFwcGx5KFtub2RlXS5jb25jYXQoYXJncykpO1xyXG5cdFx0ZWxzZSBpZih0eXBlb2Ygbm9kZVtjYWxsaW5nXSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRyZXN1bHQgPSBub2RlW2NhbGxpbmddLmFwcGx5KG5vZGUsIGFyZ3MpO1xyXG5cdFx0XHJcblx0XHRpZihyZXN1bHQpXHJcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbk5vZGVMaXN0LnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0aWYodHlwZW9mIG5vZGUudmFsID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlLnZhbCgpO1xyXG5cdFx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHRcdHJlc3VsdC5zZXQoKG5vZGUubmFtZSB8fCBub2RlLmlkIHx8IG5vZGUuc2VsZWN0b3IoKSksIG5vZGUudmFsKCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9XHJcblx0ZWxzZVxyXG5cdFx0Tm9kZUxpc3QucHJvdG90eXBlLmFwcGx5VG8uYXBwbHkodGhpcywgW1widmFsXCJdLmNvbmNhdChBcnJheS5mcm9tKGFyZ3VtZW50cykpKTtcclxufTtcclxuXHJcbk5vZGVMaXN0LmZyb20gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGxldCBjb3VudGVyID0gMDtcclxuXHRcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0aWYodHlwZW9mIGFyZyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcmcgIT0gbnVsbCl7XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmcsIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRlbHNlIGlmKGFyZyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGFyZyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IGFyZyBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmKGFyZ1tpXSAmJiBhcmdbaV0gaW5zdGFuY2VvZiBOb2RlKXtcclxuXHRcdFx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmdbaV0sIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRkYXRhLmxlbmd0aCA9IHt2YWx1ZTogY291bnRlcn07XHJcblx0cmV0dXJuICBPYmplY3QuY3JlYXRlKE5vZGVMaXN0LnByb3RvdHlwZSwgZGF0YSk7XHJcbn07XHJcblxyXG5cclxuRGVsZWdhdGVyQnVpbGRlcihmdW5jdGlvbihhRnVuY3Rpb25OYW1lLCB0aGVBcmd1bWVudHMpIHtcclxuXHRsZXQgcmVzdWx0cyA9IFtdO1x0XHJcblx0dGhpcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0aWYobm9kZSAmJiB0eXBlb2Ygbm9kZVthRnVuY3Rpb25OYW1lXSA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xyXG5cdFx0XHRpZihyZXN1bHQpeyBcclxuXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBOb2RlTGlzdClcclxuXHRcdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChBcnJheS5mcm9tKHJlc3VsdCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdGlmKHJlc3VsdHMubGVuZ3RoID09PSAwKVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRlbHNlIGlmKHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBOb2RlIHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBOb2RlTGlzdClcclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKHJlc3VsdHMpO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG59LE5vZGVMaXN0LnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJBdHRyaWJ1dGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZXMoKSA/ICgoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0ge307XHJcblx0XHRcdFx0dGhpcy5nZXRBdHRyaWJ1dGVOYW1lcygpLmZvckVhY2gobmFtZSA9PiB7XHJcblx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHR9KSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwidW5kZWZpbmVkXCIgfHwgYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKGFyZ3VtZW50c1swXSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJEYXRhU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCBkYXRhID0ge307XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZGF0YXNldCAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0Zm9yIChuYW1lIGluIHRoaXMuZGF0YXNldClcclxuXHRcdFx0XHRkYXRhW25hbWVdID0gdGhpcy5kYXRhc2V0W25hbWVdO1xyXG5cclxuXHRcdHRoaXMuZGF0YSA9IChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhW2FyZ3VtZW50c1swXV07XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwidW5kZWZpbmVkXCIgfHwgYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdFx0ZGVsZXRlIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGRhdGFbYXJndW1lbnRzWzBdXSA9IGFyZ3VtZW50c1sxXTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSkuYmluZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwO1xyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJFdmVudFN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdGNvbnN0IEVWRU5UU1BMSVRFUiA9IC8oXFxzKyl8KFxccyosXFxzKikvO1xyXG5cdGNvbnN0IGdldFdyYXBwZXJIYW5kbGVNYXAgPSAoZWxlbWVudCkgPT4ge1xyXG5cdFx0aWYgKCFlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fKSBlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fID0gbmV3IE1hcCgpO1xyXG5cclxuXHRcdHJldHVybiBlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGdldFRyaWdnZXJUaW1lb3V0cyA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRpZiAoIWVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX18pIGVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX18gPSB7fTtcclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXztcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZW1vdmVXcmFwcGVyID0gKGVsZW1lbnQsIGRhdGEsIGV2ZW50VHlwZXMpID0+IHtcclxuXHRcdGNvbnN0IHsgd3JhcHBlciwgb3B0aW9uLCBldmVudHMsIGhhbmRsZSB9ID0gZGF0YTtcclxuXHRcdGNvbnN0IGNhcHR1cmUgPSBvcHRpb24uY2FwdHVyZTtcclxuXHRcdGlmIChldmVudFR5cGVzKSB7XHJcblx0XHRcdGV2ZW50VHlwZXMgPSB0eXBlb2YgZXZlbnRUeXBlcyA9PT0gXCJzdHJpbmdcIiA/IGV2ZW50VHlwZXMuc3BsaXQoRVZFTlRTUExJVEVSKSA6IGV2ZW50VHlwZXM7XHJcblx0XHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50VHlwZXMpIHtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBjYXB0dXJlKTtcclxuXHRcdFx0XHRcdGV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZXZlbnRzLmxlbmd0aCA9PSAwKSBnZXRXcmFwcGVySGFuZGxlTWFwKGVsZW1lbnQpLmRlbGV0ZShoYW5kbGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIGNhcHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGdldFdyYXBwZXJIYW5kbGVNYXAoZWxlbWVudCkuZGVsZXRlKGhhbmRsZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB0aHJvdyBuZXcgRXJyb3IoXCJUb28gbGVzcyBhcmd1bWVudHMhXCIpO1xyXG5cclxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZXZlbnRzID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIgPyBhcmdzLnNoaWZ0KCkuc3BsaXQoRVZFTlRTUExJVEVSKSA6IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IGZpbHRlciA9IHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiID8gYXJncy5zaGlmdCgpIDogbnVsbDtcclxuXHRcdGNvbnN0IGhhbmRsZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IG9wdGlvbiA9IHR5cGVvZiBhcmdzWzBdID09PSBcInVuZGVmaW5lZFwiID8geyBjYXB0dXJlOiBmYWxzZSwgb25jZTogZmFsc2UsIHBhc3NpdmU6IGZhbHNlIH0gOiB0eXBlb2YgYXJnc1swXSA9PT0gXCJib29sZWFuXCIgPyB7IGNhcHR1cmU6IGFyZ3Muc2hpZnQoKSwgb25jZTogZmFsc2UsIHBhc3NpdmU6IGZhbHNlIH0gOiBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChmaWx0ZXIpIHtcclxuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXQuaXMgPT09IFwiZnVuY3Rpb25cIiAmJiAhdGFyZ2V0LmlzKGZpbHRlcikpIHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBoYW5kbGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHRcdFx0aWYgKG9wdGlvbi5vbmNlKSByZW1vdmVXcmFwcGVyKHRoaXMsIHdyYXBwZXIpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHRnZXRXcmFwcGVySGFuZGxlTWFwKHRoaXMpLnNldChoYW5kbGUsIHsgaGFuZGxlLCB3cmFwcGVyOiB3cmFwcGVyLCBldmVudHMsIG9wdGlvbiB9KTtcclxuXHJcblx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBvcHRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5yZW1vdmVPbiA9IGZ1bmN0aW9uIChoYW5kbGUsIGV2ZW50LCBjYXB0dXJlKSB7XHJcblx0XHRjb25zdCBkYXRhID0gZ2V0V3JhcHBlckhhbmRsZU1hcCh0aGlzKS5nZXQoaGFuZGxlKTtcclxuXHRcdGlmIChkYXRhKSByZW1vdmVXcmFwcGVyKHRoaXMsIGRhdGEsIGV2ZW50KTtcclxuXHRcdGVsc2UgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZSwgZXZlbnQsIGNhcHR1cmUpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGNvbnN0IHRpbWVvdXQgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJudW1iZXJcIiA/IGFyZ3Muc2hpZnQoKSA6IC0xO1xyXG5cdFx0aWYgKHRpbWVvdXQgPj0gMCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJnc1swXTtcclxuXHRcdFx0Y29uc3QgdGltZW91dHMgPSBnZXRUcmlnZ2VyVGltZW91dHModGhpcyk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXRpZCA9IHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRpZiAodGltZW91dGlkKSBjbGVhclRpbWVvdXQodGltZW91dGlkKTtcclxuXHJcblx0XHRcdHRpbWVvdXRzW3R5cGVdID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0ZGVsZXRlIHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHRjb25zdCBkZWxlZ2F0ZSA9IGFyZ3NbMF0gaW5zdGFuY2VvZiBFdmVudCA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhcmdzLmxlbmd0aCA+PSAxID8gKGFyZ3MubGVuZ3RoID09IDEgPyBhcmdzLnNoaWZ0KCkgOiBhcmdzKSA6IGRlbGVnYXRlO1xyXG5cdFx0XHRjb25zdCBldmVudCA9IGRhdGEgPyBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSwgZGV0YWlsOiBkYXRhIH0pIDogbmV3IEV2ZW50KHR5cGUsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XHJcblxyXG5cdFx0XHRpZiAoZGVsZWdhdGUpIGV2ZW50LmRlbGVnYXRlZEV2ZW50ID0gZGVsZWdhdGU7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiSHRtbENsYXNzU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cyxjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QudG9nZ2xlKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgY2xhenogPT4gdGhpcy5jbGFzc0xpc3QudG9nZ2xlKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkxpc3RTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcdFxyXG5cdFByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oKSB7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0aWYodGhpc1tpXSA9PSBhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIGk7XHJcblx0XHRcclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmZvckVhY2guYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1swXTtcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi91dGlscy9VdGlsc1wiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTWFuaXB1bGF0aW9uU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKXtcclxuXHRcdGxldCBub2RlcyA9IHRoaXMuY2hpbGROb2Rlc1xyXG5cdFx0d2hpbGUobm9kZXMubGVuZ3RoICE9IDApXHRcdFx0XHJcblx0XHRcdG5vZGVzWzBdLnJlbW92ZSh0cnVlKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGlsZE5vZGVzO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0XHRpZihhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMub3V0ZXJIVE1MO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBcclxuXHRcdFx0QXJyYXkuZnJvbShhcmd1bWVudHMpLmZvckVhY2goY29udGVudCA9PiB7XHJcblx0XHRcdFx0dGhpcy5lbXB0eSgpO1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0ZWxzZSBpZihjb250ZW50IGluc3RhbmNlb2YgTm9kZSB8fCBjb250ZW50IGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29udGVudCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKXtcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0Y29uc3QgYXBwZW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnN0IGFwcGVuZCA9IFByb3RvdHlwZS5hcHBlbmRDaGlsZC5iaW5kKHRoaXMpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGxldCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0dGhpcy5hcHBlbmRDaGlsZChhcmcpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0Y3JlYXRlKGFyZykuZm9yRWFjaChhcHBlbmQpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGFwcGVuZCk7XHJcblx0XHR9XHJcblx0fTtcdFxyXG5cdFByb3RvdHlwZS5hcHBlbmQgPSBhcHBlbmQ7XHJcblx0XHJcblx0Y29uc3QgcHJlcGVuZCA9IGZ1bmN0aW9uKGFGaXJzdEVsZW1lbnQsIGFFbGVtZW50KXtcclxuXHRcdHRoaXMuaW5zZXJ0QmVmb3JlKGFFbGVtZW50LCBhRmlyc3RFbGVtZW50KTtcclxuXHR9O1xyXG5cdFByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPT0gMClcclxuXHRcdFx0YXBwZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgZmlyc3QgPSB0aGlzLmNoaWxkTm9kZXMuZmlyc3QoKTtcclxuXHRcdFx0Y29uc3QgaW5zZXJ0ID0gcHJlcGVuZC5iaW5kKHRoaXMsIGZpcnN0KTtcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0Y29uc3QgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0XHRpbnNlcnQoYXJnKTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnQpO1xyXG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoIDwgMSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5zdWZmaWNpZW50IGFyZ3VtZW50cyEgT25lIG9yIHR3byBub2RlcyByZXF1aXJlZCFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHRoaXMucGFyZW50Tm9kZSA6IHRoaXM7XHJcblx0XHRjb25zdCBvbGROb2RlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gdGhpcyA6IGFyZ3VtZW50c1swXTtcclxuXHRcdGNvbnN0IG5ld05vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHNbMV07XHJcblx0XHRcclxuXHRcdGlmKG5ld05vZGUgaW5zdGFuY2VvZiBBcnJheSB8fCBuZXdOb2RlIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgbmV3Tm9kZSBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKXtcclxuXHRcdFx0bmV3Tm9kZS5mb3JFYWNoKGFJdGVtID0+IHBhcmVudC5pbnNlcnRCZWZvcmUoYUl0ZW0sIG9sZE5vZGUpKTtcclxuXHRcdFx0b2xkTm9kZS5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZChuZXdOb2RlLG9sZE5vZGUpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMucGFyZW50Tm9kZSA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBpbnNlcnQgbm9kZXMgYWZ0ZXIgdGhpcyBub2RlISBQYXJlbnQgbm9kZSBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmc7XHJcblx0XHRpZihuZXh0KVxyXG5cdFx0XHRQcm90b3R5cGUuYmVmb3JlLmFwcGx5KG5leHQsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlXHJcblx0XHRcdFByb3RvdHlwZS5hcHBlbmQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMucGFyZW50Tm9kZSA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBpbnNlcnQgbm9kZXMgYWZ0ZXIgdGhpcyBub2RlISBQYXJlbnQgbm9kZSBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0Y29uc3QgaW5zZXJ0ZXIgPSAobm9kZSkgPT4ge3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcyk7fVxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGNvbnN0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRpbnNlcnRlcihhcmcpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0ZXIpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydGVyKTtcclxuXHRcdH1cclxuXHR9O1x0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHBhcmVudFNlbGVjdG9yID0gLzpwYXJlbnQoXFwoXFxcIihbXlxcKV0qKVxcXCJcXCkpPy9pO1xyXG5jb25zdCBxdWVyeUV4ZWN1dGVyID0gZnVuY3Rpb24gKGFFbGVtZW50LCBhU2VsZWN0b3IpIHtcclxuXHRsZXQgbWF0Y2ggPSBwYXJlbnRTZWxlY3Rvci5leGVjKGFTZWxlY3Rvcik7XHJcblx0aWYgKG1hdGNoKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gYUVsZW1lbnQ7XHJcblx0XHRpZiAobWF0Y2guaW5kZXggPiAwKSB7XHJcblx0XHRcdHJlc3VsdCA9IGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yLnN1YnN0cigwLCBtYXRjaC5pbmRleCkpO1xyXG5cdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblx0XHR9XHJcblx0XHRyZXN1bHQgPSByZXN1bHQucGFyZW50KG1hdGNoWzJdKTtcclxuXHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0bGV0IG5leHRTZWxlY3RvciA9IGFTZWxlY3Rvci5zdWJzdHIobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpLnRyaW0oKTtcclxuXHRcdFx0aWYgKG5leHRTZWxlY3Rvci5sZW5ndGggPiAwKSByZXN1bHQgPSByZXN1bHQuZmluZChuZXh0U2VsZWN0b3IpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9IGVsc2UgcmV0dXJuIGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yKTtcclxufTtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlF1ZXJ5U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0UHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgbm9kZXMgPSBbXTtcclxuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdHdoaWxlIChhcmcpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gcXVlcnlFeGVjdXRlcih0aGlzLCBhcmcpO1xyXG5cdFx0XHRcdGlmIChyZXN1bHQpIG5vZGVzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCByZXN1bHQgPSBOb2RlTGlzdC5mcm9tLmFwcGx5KG51bGwsIG5vZGVzKTtcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmlzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcInN0cmluZ1wiKSByZXR1cm4gdGhpcy5tYXRjaGVzKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcblx0XHRcdFx0bGV0IGZpbHRlciA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlci5sZW5ndGg7IGkrKykgaWYgKHRoaXMubWF0Y2hlcyhmaWx0ZXJbaV0pKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgcmV0dXJuIHRoaXMuaXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgaWdub3JlU2hhZG93Um9vdCkge1xyXG5cdFx0aWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVybiBudWxsO1xyXG5cdFx0aWdub3JlU2hhZG93Um9vdCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJib29sZWFuXCIgPyBzZWxlY3RvciA6IGlnbm9yZVNoYWRvd1Jvb3Q7XHJcblx0XHRzZWxlY3RvciA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiA/IHNlbGVjdG9yIDogbnVsbDtcclxuXHJcblx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgJiYgaWdub3JlU2hhZG93Um9vdCkgcGFyZW50ID0gcGFyZW50Lmhvc3Q7XHJcblxyXG5cdFx0aWYgKHNlbGVjdG9yKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0d2hpbGUgKHBhcmVudCAmJiAhcGFyZW50LmlzKHNlbGVjdG9yKSkgcGFyZW50ID0gcGFyZW50LnBhcmVudChzZWxlY3RvciwgaWdub3JlU2hhZG93Um9vdCk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwidGhpczpcIiwgdGhpcywgXCJwYXJlbnQ6XCIsIHBhcmVudCwgXCJlcnJvcjpcIiwgZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcmVudDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnQ7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnBhcmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gbmV3IEFycmF5KCk7XHJcblx0XHRsZXQgcGFyZW50ID0gUHJvdG90eXBlLnBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0d2hpbGUgKHBhcmVudCkge1xyXG5cdFx0XHRyZXN1bHQucHVzaChwYXJlbnQpO1xyXG5cdFx0XHRwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHBhcmVudCwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShyZXN1bHQpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5zZWxlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmICh0aGlzLmlkKSByZXR1cm4gXCIjXCIgKyB0aGlzLmlkO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBzZWxlY3RvciA9IHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQoKTtcclxuXHRcdFx0aWYgKHBhcmVudCkge1xyXG5cdFx0XHRcdGxldCBzYW1lVGFnU2libGluZ3MgPSBwYXJlbnQuZmluZChcIjpzY29wZT5cIiArIHNlbGVjdG9yKTtcclxuXHRcdFx0XHRpZiAoc2FtZVRhZ1NpYmxpbmdzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcclxuXHRcdFx0XHRcdGxldCBpbmRleCA9IHNhbWVUYWdTaWJsaW5ncy5pbmRleE9mKHRoaXMpO1xyXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gMCkgc2VsZWN0b3IgKz0gXCI6bnRoLWNoaWxkKFwiICsgKGluZGV4ICsgMSkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IHBhcmVudFNlbGVjdG9yID0gcGFyZW50LnNlbGVjdG9yKCk7XHJcblx0XHRcdFx0cmV0dXJuIHBhcmVudFNlbGVjdG9yID8gcGFyZW50U2VsZWN0b3IgKyBcIj5cIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvc2VzdHMoYVF1ZXJ5KS5maXJzdCgpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5jbG9zZXN0cyA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKHJlc3VsdC5sZW5ndGggIT0gMCkgcmV0dXJuIHJlc3VsdDtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG5cdFx0aWYgKHBhcmVudCkgcmV0dXJuIHBhcmVudC5jbG9zZXN0cyhhUXVlcnkpO1xyXG5cclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKFtdKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUubmVzdGVkID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0aWYgKHRoaXMuaXMoYVF1ZXJ5KSkgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcyk7XHJcblxyXG5cdFx0bGV0IG5lc3RlZCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKG5lc3RlZCAmJiBuZXN0ZWQubGVuZ3RoID4gMCkgcmV0dXJuIG5lc3RlZDtcclxuXHRcdGVsc2UgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcy5wYXJlbnQoYVF1ZXJ5KSk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlJlYWR5RXZlbnRTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24oYUZ1bmN0aW9uLCBvbmNlKXtcdFxyXG5cdFx0dGhpcy5vbihcInJlYWR5XCIsIGFGdW5jdGlvbiwgb25jZSk7XHJcblx0XHRpZihkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIilcdFx0XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVhZHlcIik7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IEhJREVWQUxVRSA9IFwibm9uZVwiO1xyXG5cclxuY29uc3QgaXNIaWRkZW4gPSAoZWxlbWVudCkgPT4ge1xyXG5cdHJldHVybiBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09IEhJREVWQUxVRVxyXG59O1xyXG5cclxuY29uc3QgaW5pdCA9IChlbGVtZW50KSA9PiB7XHRcclxuXHRsZXQgZGlzcGxheSA9ICFpc0hpZGRlbihlbGVtZW50KSA/IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA6IFwiXCI7XHJcblx0XHJcblx0ZWxlbWVudC5zaG93ID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblx0XHJcblx0ZWxlbWVudC5oaWRlID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBISURFVkFMVUU7XHJcblx0XHRyZXR1cm4gdGhpcztcdFx0XHJcblx0fSkuYmluZChlbGVtZW50KTtcclxuXHRcclxuXHRyZXR1cm4gZWxlbWVudDtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJTaG93SGlkZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGluaXQodGhpcykuc2hvdy5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLmhpZGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS50b2dnbGVTaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaXNIaWRkZW4odGhpcykgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xyXG5cdH07XHJcblxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBJbnB1dFR5cGVzID0gW1xyXG5cdHtcclxuXHRcdHNlbGVjdG9yIDogXCJzZWxlY3RcIixcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0XHR0aGlzLmZpbmQoXCJvcHRpb25cIikuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdGlmKG9wdGlvbi5zZWxlY3RlZClcclxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbi52YWx1ZSk7XHJcblx0XHRcdH0pO1x0XHRcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHRcclxuXHRcdFx0bGV0IHZhbHVlcyA9IFtdO1xyXG5cdFx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0XHRsZXQgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHR3aGlsZShhcmcpe1xyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoYXJnKSlcclxuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoYXJnKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR2YWx1ZXMucHVzaChhcmcpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVzO1xyXG5cdFx0XHR0aGlzLmZpbmQoXCJvcHRpb25cIikuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkID0gdmFsdWVzLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwKTtcdFx0XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcclxuXHRcdH1cdFx0XHRcclxuXHR9LFxyXG5cdHtcclxuXHRcdHNlbGVjdG9yIDogXCJpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdXCIsXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZih0aGlzLnZhbHVlID09IFwib25cIiB8fCB0aGlzLnZhbHVlID09IFwib2ZmXCIpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuXHRcdFx0ZWxzZSBpZih0aGlzLmNoZWNrZWQpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHRpZih0eXBlb2YgYVZhbHVlID09PSBcImJvb2xlYW5cIilcclxuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSBhVmFsdWU7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSB0aGlzLnZhbHVlID09IGFWYWx1ZTtcclxuXHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KGFWYWx1ZSkpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlLmluZGV4T2YodGhpcy52YWx1ZSkgPj0gMDtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHJcblx0fVxyXG5dO1xyXG5cclxuY29uc3QgRGVmYXVsdElucHV0VHlwZSA9IHtcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdHRoaXMudmFsdWUgPSBhVmFsdWU7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImlucHV0XCIpO1xyXG5cdFx0fVx0XHJcbn07XHJcblxyXG5jb25zdCBnZXRJbnB1dFR5cGUgPSBmdW5jdGlvbihhRWxlbWVudCl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IElucHV0VHlwZXMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihhRWxlbWVudC5pcyhJbnB1dFR5cGVzW2ldLnNlbGVjdG9yKSlcclxuXHRcdFx0cmV0dXJuIElucHV0VHlwZXNbaV07XHRcdFxyXG5cdHJldHVybiBEZWZhdWx0SW5wdXRUeXBlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlZhbHVlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHR5cGUgPSBnZXRJbnB1dFR5cGUodGhpcyk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0eXBlLmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0eXBlLnNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IFwiLi9kb20vRXZlbnRUYXJnZXRcIjtcclxuaW1wb3J0IFwiLi9kb20vTm9kZVwiO1xyXG5pbXBvcnQgXCIuL2RvbS9FbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50RnJhZ21lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTElucHV0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxTZWxlY3RFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVMaXN0XCI7XHJcbmltcG9ydCBcIi4vZG9tL0h0bWxDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBcIi4vR2xvYmFsXCI7XHJcbiIsImNvbnN0IERlbGVnYXRlckJ1aWxkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xyXG5cdGNvbnN0IHNvdXJjZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRhcmdzLmZvckVhY2goIHRhcmdldCA9PntcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcclxuXHRcdC5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cdFx0XHRjb25zdCBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIG5hbWUpO1xyXG5cdFx0XHRpZiAodHlwZW9mIHNvdXJjZVtuYW1lXSA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgcHJvcC52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBuYW1lLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdH07XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBEZWxlZ2F0ZXJCdWlsZGVyOyIsImNvbnN0IGV4dGVuZFByb3RvdHlwZSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1x0XHJcblx0d2hpbGUoYXJncy5sZW5ndGggPiAwKXtcclxuXHRcdGNvbnN0IGV4dGVuZGVyID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0ZXh0ZW5kZXIodHlwZSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kUHJvdG90eXBlOyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgRVhURU5TSU9OU19NQVAgPSBVdGlscy5nbG9iYWxWYXIoXCJfX19ET01fQVBJX0VYVEVOU0lPTl9NQVBfX19cIiwge30pO1xyXG5jb25zdCBFeHRlbmRlciA9IGZ1bmN0aW9uKGFOYW1lLCBhRXh0ZW50aW9uKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24oYVR5cGUpe1x0XHJcblx0XHRsZXQgZXh0ZW5zaW9ucyA9IEVYVEVOU0lPTlNfTUFQW2FUeXBlLm5hbWVdO1xyXG5cdFx0aWYoIWV4dGVuc2lvbnMpXHJcblx0XHRcdGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFthVHlwZS5uYW1lXSA9IHt9O1x0XHRcclxuXHRcdFxyXG5cdFx0aWYoIWV4dGVuc2lvbnNbYU5hbWVdKXtcclxuXHRcdFx0ZXh0ZW5zaW9uc1thTmFtZV0gPSB0cnVlO1xyXG5cdFx0XHRhRXh0ZW50aW9uKGFUeXBlLnByb3RvdHlwZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdGNvbnNvbGUud2FybihcImR1cGxpY2F0ZWQgbG9hZCBvZiBleHRlbnNpb24gXFxcIlwiICsgYU5hbWUgKyBcIlxcXCIhXCIpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVyOyIsImNvbnN0IFV0aWxzID0ge1xyXG5cdGdsb2JhbCA6ICgoKSA9PiB7XHJcblx0XHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1xyXG5cdFx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRcdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRcdHJldHVybiB7fTtcdFx0XHJcblx0fSkoKSxcclxuXHRnbG9iYWxWYXIgOiBmdW5jdGlvbihhTmFtZSwgYUluaXRWYWx1ZSl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBVdGlscy5nbG9iYWxbYU5hbWVdID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRVdGlscy5nbG9iYWxbYU5hbWVdID0gYUluaXRWYWx1ZTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIFV0aWxzLmdsb2JhbFthTmFtZV07XHRcdFxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyIsImltcG9ydCB7cHJpdmF0ZVByb3BlcnR5IH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSURcIjtcbmltcG9ydCB7IGluaXRUaW1lb3V0LCB0cmlnZ2VyVGltZW91dCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdlYWtEYXRhIGZyb20gXCIuL3V0aWxzL1dlYWtEYXRhXCI7XG5cbmNvbnN0IFBSSVZBVEVfUkVBRFkgPSBcInJlYWR5XCI7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtEYXRhKCk7XG5jb25zdCBpbml0ID0gKGNvbXBvbmVudCkgPT4ge1xuXHRjb25zdCBkYXRhID0gVElNRU9VVFMuZGF0YShjb21wb25lbnQpO1xuXHRpZiAoZGF0YS5pbml0aWFsaXplKSBjbGVhclRpbWVvdXQoZGF0YS5pbml0aWFsaXplKTtcblxuXHRkYXRhLmluaXRpYWxpemUgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRkZWxldGUgZGF0YS5pbml0aWFsaXplO1xuXG5cdFx0YXdhaXQgY29tcG9uZW50LmluaXQoKTtcblx0XHRjb21wb25lbnQucmVhZHkucmVzb2x2ZSgpO1xuXHRcdGNvbXBvbmVudC50cmlnZ2VyKGNvbXBvbmVudEV2ZW50bmFtZShcImluaXRpYWx6ZWRcIiwgY29tcG9uZW50KSk7XG5cdH0sIGluaXRUaW1lb3V0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVSUQgPSAocHJlZml4LCBzdWZmaXgpID0+IHtcblx0bGV0IGNvdW50ID0gMDtcblx0bGV0IGlkID0gbnVsbDtcbiAgICB3aGlsZShjb3VudCA8IDEwMCl7XG5cdFx0aWQgPSBgJHtwcmVmaXggPyBwcmVmaXggOiBcIlwifSR7dXVpZCgpfSR7c3VmZml4ID8gc3VmZml4IDogXCJcIn1gO1xuXHRcdGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpXG5cdFx0XHRyZXR1cm4gaWQ7XG5cblx0XHRjb3VudCsrO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcblx0cmV0dXJuIGlkO1xufTtcblxuXG5cbmNvbnN0IGJ1aWxkQ2xhc3MgPSAoaHRtbEJhc2VUeXBlKSA9Pntcblx0cmV0dXJuIGNsYXNzIENvbXBvbmVudCBleHRlbmRzIGh0bWxCYXNlVHlwZSB7XG5cdFx0Y29uc3RydWN0b3Ioe3NoYWRvd1Jvb3QgPSBmYWxzZSwgY29udGVudCA9IG51bGwsIGNyZWF0ZVVJRCA9IGZhbHNlLCB1aWRQcmVmaXggPSBcImlkLVwiLCB1aWRTdWZmaXggPSBcIlwifSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHRoaXMsIFBSSVZBVEVfUkVBRFksIGxhenlQcm9taXNlKCkpO1xuXHRcblx0XHRcdGlmKGNyZWF0ZVVJRClcblx0XHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cdFxuXHRcdFx0aWYoc2hhZG93Um9vdClcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6b3Blbn0pO1xuXHRcdFx0XG5cdFx0XHRpZihjb250ZW50KVxuXHRcdFx0XHR0aGlzLnJvb3QuYXBwZW5kKHR5cGVvZiBjb250ZW50ID09PSBcImZ1bmN0aW9uXCIgPyBjb250ZW50KHRoaXMpIDogY29udGVudCk7XG5cdFx0fVxuXHRcblx0XHRnZXQgcm9vdCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc2hhZG93Um9vdCB8fCB0aGlzO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJlYWR5KCl7XG5cdFx0XHRyZXR1cm4gcHJpdmF0ZVByb3BlcnR5KHRoaXMsIFBSSVZBVEVfUkVBRFkpO1xuXHRcdH1cblx0XG5cdFx0YXN5bmMgaW5pdCgpIHt9XG5cdFxuXHRcdGFzeW5jIGRlc3Ryb3koKSB7XG5cdFx0XHRpZih0aGlzLnJlYWR5LnJlc29sdmVkKVxuXHRcdFx0XHRwcml2YXRlUHJvcGVydHkodGhpcywgUFJJVkFURV9SRUFEWSwgbGF6eVByb21pc2UoKSk7XG5cdFx0fVxuXHRcblx0XHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdGlmICh0aGlzLm93bmVyRG9jdW1lbnQgPT0gZG9jdW1lbnQpIGluaXQodGhpcyk7XG5cdFx0fVxuXHRcblx0XHRhZG9wdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cdFx0fVxuXHRcblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZShuYW1lLCB0aGlzKSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgY29tcG9uZW50RXZlbnRuYW1lKFwiY2hhbmdlXCIsIHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdFxuXHRcdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7XG5cdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHR9XG5cdH07XG59IFxuXG5jb25zdCBDTEFaWk1BUCA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEJhc2VPZiA9IChodG1sQmFzZVR5cGUpID0+IHtcblx0bGV0IGNsYXp6ID0gQ0xBWlpNQVAuZ2V0KGh0bWxCYXNlVHlwZSk7XG5cdGlmKGNsYXp6ID09IG51bGwpe1xuXHRcdGNsYXp6ID0gYnVpbGRDbGFzcyhodG1sQmFzZVR5cGUpO1xuXHRcdENMQVpaTUFQLnNldChodG1sQmFzZVR5cGUsIGNsYXp6KTtcblx0fVxuXG5cdHJldHVybiBjbGF6ejtcbn1cblxuY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50QmFzZU9mKEhUTUxFbGVtZW50KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcbiIsImV4cG9ydCBjb25zdCBjb21wb25lbnRQcmVmaXggPSBcImQtXCI7XHJcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeCA9IFwiYXR0cmlidXRlLVwiO1xyXG5leHBvcnQgY29uc3QgaW5pdFRpbWVvdXQgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwMDtcclxuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSApID0+IHtcdFxuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IodHlwZW9mIG5vZGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkIGFzIHByYW0gbm9kZSFcIik7XG5cdFxuICAgcmV0dXJuIGAke25vZGVuYW1lLnRvTG93ZXJDYXNlKCl9OiR7ZXZlbnRUeXBlfWA7Ly91c2UgQCBhcyBzZXBhcnRvciBhbmQgbm90IDpcbn07XG5cblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUgKSA9PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudEV2ZW50bmFtZShgJHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0tJHthdHRyaWJ1dGV9YCwgbm9kZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9IiwiaW1wb3J0IHsgZGVmVmFsdWUgfSBmcm9tXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vha0RhdGEge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkZWZWYWx1ZSh0aGlzLCBcIndlYWttYXBcIiwgbmV3IFdlYWtNYXAoKSk7XG5cdH1cblxuXHRkYXRhKHJlZmVyZW5jZSkge1xuXHRcdGxldCBkYXRhID0gdGhpcy53ZWFrbWFwLmdldChyZWZlcmVuY2UpO1xuXHRcdGlmICghZGF0YSkge1xuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0dGhpcy53ZWFrbWFwLnNldChyZWZlcmVuY2UsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHZhbHVlKHJlZmVyZW5jZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHJldHVybiB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldO1xuXHRcdGVsc2UgdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XSA9IHZhbHVlO1xuXHR9XG59O1xuXG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgQVRUUklCVVRFX0VESVRBQkxFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcblxuY29uc3QgUFJJVkFURV9GT1JNID0gXCJmb3JtXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZLCBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT05dO1xuXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdH1cblxuXHRnZXQgZm9ybSgpIHtcblx0XHRsZXQgZm9ybSA9IHByaXZhdGVQcm9wZXJ0eSh0aGlzLCBQUklWQVRFX0ZPUk0pO1xuXHRcdGlmICghZm9ybSkge1xuXHRcdFx0Zm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdHByaXZhdGVQcm9wZXJ0eSh0aGlzLCBQUklWQVRFX0ZPUk0sIGZvcm0pO1xuXHRcdH1cblx0XHRyZXR1cm4gZm9ybTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdFx0dGhpcy5hY3RpdmVVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0YWN0aXZlVXBkYXRlZCgpIHt9XG5cblx0Z2V0IHJlYWRvbmx5KCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCAhcmVhZG9ubHksICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge31cblxuXHRnZXQgZWRpdGFibGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9FRElUQUJMRSk7XG5cdH1cblxuXHRzZXQgZWRpdGFibGUoZWRpdGFibGUpIHtcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsIGVkaXRhYmxlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XG5cdFx0dGhpcy5lZGl0YWJsZVVwZGF0ZWQoKTtcblx0fVxuXG5cdGVkaXRhYmxlVXBkYXRlZCgpIHtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge31cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSwgQVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSBcIi4vVmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHkgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5cbmNvbnN0IFBSSVZBVEVfUEFSRU5UID0gXCJwYXJlbnRcIjtcbmNvbnN0IFBSSVZBVEVfVkFMVUUgPSBcInZhbHVlXCI7XG5jb25zdCBQUklWQVRFX1ZBTElEQVRPUiA9IFwidmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBjb25zdCBfdmFsdWUgPSBmdW5jdGlvbiAoc2VsZiwgdmFsdWUpIHtcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcHJpdmF0ZVByb3BlcnR5KHNlbGYsIFBSSVZBVEVfVkFMVUUsIHZhbHVlKTtcblx0ZWxzZSByZXR1cm4gcHJpdmF0ZVByb3BlcnR5KHNlbGYsIFBSSVZBVEVfVkFMVUUpO1xufTtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1JFUVVJUkVELCBBVFRSSUJVVEVfTk9WQUxVRV07XG5cbmV4cG9ydCBjb25zdCBmaW5kUGFyZW50RmllbGQgPSAoZmllbGQpID0+IHtcblx0bGV0IHBhcmVudCA9IGZpZWxkLnBhcmVudE5vZGU7XG5cdHdoaWxlIChwYXJlbnQpIHtcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4gcGFyZW50O1xuXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCB1cGRhdGVIYXNWYWx1ZSA9IChoYXNWYWx1ZSwgZmllbGQpID0+IHtcblx0ZmllbGQuYXR0cihBVFRSSUJVVEVfTk9WQUxVRSwgIWhhc1ZhbHVlID8gXCJcIiA6IG51bGwpO1xufTtcblxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcigpO1xuXHRcdF92YWx1ZSh0aGlzLCB2YWx1ZSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5jb25kaXRpb25TdGF0ZUNoYW5nZWQsIChldmVudCkgPT4ge1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHByaXZhdGVQcm9wZXJ0eSh0aGlzLCBQUklWQVRFX1BBUkVOVCwgZmluZFBhcmVudEZpZWxkKHRoaXMpKTtcblx0XHRcdHByaXZhdGVQcm9wZXJ0eSh0aGlzLCBQUklWQVRFX1ZBTElEQVRPUiwgbmV3IFZhbGlkYXRvcih0aGlzKSk7XHRcdFx0XG5cblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLCBhc3luYyAoZXZlbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBldmVudC5kZXRhaWw7XG5cdFx0XHRcdGlmIChjaGFpbi5pbmRleE9mKHRoaXMpIDwgMCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLnZhbGlkO1xuXHRcdFx0XHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50ICE9IHZhbGlkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVFMuYWxsUHVibGlzaFZhbHVlLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdH1cblxuXHRnZXQgdmFsaWRhdG9yKCkge1xuXHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkodGhpcywgUFJJVkFURV9WQUxJREFUT1IpO1xuXHR9XG5cblx0Z2V0IHBhcmVudEZpZWxkKCkge1xuXHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkodGhpcywgUFJJVkFURV9QQVJFTlQpO1xuXHR9XG5cblx0Y29uZGl0aW9uVXBkYXRlZCgpIHtcblx0XHR0aGlzLmFjdGl2ZSA9IHRoaXMuY29uZGl0aW9uO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcblx0fVxuXG5cdGdldCByZXF1aXJlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFUVVJUkVEKTtcblx0fVxuXG5cdGdldCBoYXNWYWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IF92YWx1ZSh0aGlzKTtcblx0XHRyZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCI7XG5cdH1cblxuXHRhc3luYyB2YWx1ZSh2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApIHJldHVybiBfdmFsdWUodGhpcyk7XG5cblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblxuXHRcdGlmIChhd2FpdCB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT0gdmFsdWUpIHtcblx0XHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcblx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVkVmFsdWUodmFsdWUpO1x0XHRcdFx0XG5cdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcblx0XHR1cGRhdGVIYXNWYWx1ZSh0aGlzLmhhc1ZhbHVlLCB0aGlzKTtcblx0XHRpZiAoIXRoaXMudmFsaWRhdG9yKSByZXR1cm4gZmFsc2U7XG5cblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKCk7XG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9XG5cblx0YXN5bmMgcHVibGlzaFZhbHVlKGNoYWluID0gW10pIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNoYWluLnB1c2godGhpcyk7XG5cdFx0aWYgKHRoaXMucGFyZW50RmllbGQpIGF3YWl0IHRoaXMucGFyZW50RmllbGQuY2hpbGRWYWx1ZUNoYW5nZWQodGhpcywgY2hhaW4pO1xuXHRcdGVsc2UgdGhpcy50cmlnZ2VyKEVWRU5UUy52YWx1ZUNoYW5nZWQsIGNoYWluKTtcblx0fVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHt9XG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGNoaWxkLCBjaGFpbikge31cbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcbiIsImV4cG9ydCBjb25zdCBIVE1MX1RBR19QUkVGSVggPSBcImQtXCI7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgPSA1MCAqIEVWRU5USEFORExFX1RJTUVPVVQ7XG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRVMgPSB7XG5cdEZvcm06IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybVwiLFxuXHRDb250cm9sOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2xcIixcblx0QmFja0J1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLWJhY2tcIixcblx0TmV4dEJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLW5leHRcIixcblx0U3VtbWFyeUJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLXN1bW1hcnlcIixcblx0U3VibWl0QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtc3VibWl0XCIsXG5cdENhbmNlbEJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLWNhbmNlbFwiLFxuXHRQYWdlOiBIVE1MX1RBR19QUkVGSVggKyBcInBhZ2VcIixcblx0RmllbGQ6IEhUTUxfVEFHX1BSRUZJWCArIFwiZmllbGRcIixcblx0V3JhcHBlckZpZWxkOiBIVE1MX1RBR19QUkVGSVggKyBcIndyYXBwZXItZmllbGRcIixcblx0TGlzdDogSFRNTF9UQUdfUFJFRklYICsgXCJsaXN0XCIsXG5cdExpc3RSb3dzOiBIVE1MX1RBR19QUkVGSVggKyBcInJvd3NcIixcblx0TGlzdFJvdzogSFRNTF9UQUdfUFJFRklYICsgXCJyb3dcIixcblx0QnV0dG9uQWRkUm93OiBIVE1MX1RBR19QUkVGSVggKyBcImFkZC1yb3dcIixcblx0QnV0dG9uRGVsZXRlUm93OiBIVE1MX1RBR19QUkVGSVggKyBcImRlbGV0ZS1yb3dcIixcblx0Q29udGFpbmVyOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRhaW5lclwiLFxuXHRWYWxpZGF0aW9uOiBIVE1MX1RBR19QUkVGSVggKyBcInZhbGlkYXRpb25cIixcblx0TWVzc2FnZTogSFRNTF9UQUdfUFJFRklYICsgXCJtZXNzYWdlXCIsXG5cdFByb2dyZXNzQmFyOiBIVE1MX1RBR19QUkVGSVggKyBcInByb2dyZXNzLWJhclwiLFxuXHRTdGVwOiBIVE1MX1RBR19QUkVGSVggKyBcInN0ZXBcIixcbn07XG5leHBvcnQgY29uc3QgRk9STVNUQVRFUyA9IHtcblx0aW5pdDogXCJpbml0XCIsXG5cdGlucHV0OiBcImlucHV0XCIsXG5cdHN1bW1hcnk6IFwic3VtbWFyeVwiLFxuXHRmaW5pc2hlZDogXCJmaW5pc2hlZFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEU1RBVEVTID0ge1xuXHRhbHdheXM6IFwiYWx3YXlzXCIsXG5cdG9uQWN0aXZlOiBcIm9uLWFjdGl2ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1BSRUZJWCA9IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybS1cIjtcblxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IHtcblx0aW5pdGlhbGl6ZTogRVZFTlRfUFJFRklYICsgXCJpbml0aWFsaXplXCIsXG5cdC8qIGZpcmVkIGJ5IGNoYW5nZSB2YWx1ZSBmcm9tIGFuIGZpZWxkIGltcGxlbWVudGF0aW9uXG5cdCAqIGFuZCBjb25zdW1lZCBieSB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mXG5cdCAqIEJhc2VGaWVsZCB0byBtYWtlIHZhbGlkYXRpb24gYW5kIGZpcmUgdmFsdWVDaGFuZ2VkXG5cdCAqIGV2ZW50XG5cdCAqL1xuXHRpbnB1dDogRVZFTlRfUFJFRklYICsgXCJmaWVsZC1pbnB1dFwiLFxuXHQvKiBpbnRlcm5hbCBldmVudCBmb3IgcHVibGlzaCB0aGF0IGEgdmFsdWUgb2YgZmllbGQgaGFzIGNoYW5nZWQgKGV2ZW50IGFmdGVyIHZhbGlkYXRpb24pICovXG5cdHZhbHVlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJmaWVsZC12YWx1ZS1jaGFuZ2VkXCIsXG5cdC8qIGludGVybmFsIGV2ZW50IHRvIHN0YXJ0IHZhbGlkYXRpb24gYXQgZWxlbWVudHMgLT4gb25seSBmaXJlZCBhdCBmb3JtKi9cblx0ZXhlY3V0ZVZhbGlkYXRlOiBFVkVOVF9QUkVGSVggKyBcImV4ZWN1dGUtdmFsaWRhdGVcIixcblx0LyogKi9cblx0YWN0aXZlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImFjdGl2ZS1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGNvbmRpdGlvblN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJjb25kaXRpb24tc3RhdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHR2YWxpZFN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWxpZC1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdHNpdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcInNpdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHRmb3JtU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcInN0YXRlLWNoYW5nZWRcIixcblx0LyogKi9cblx0YWxsUHVibGlzaFZhbHVlOiBFVkVOVF9QUkVGSVggKyBcImFsbC1wdWJsaXNoLXZhbHVlXCIsXG5cdC8qICovXG5cdHN1Ym1pdDogRVZFTlRfUFJFRklYICsgXCJzdWJtaXRcIixcblx0LyogKi9cblx0cHJvZ3Jlc3NiYXJDaGFuZ2VkIDogRVZFTlRfUFJFRklYICsgXCJwcm9ncmVzcy1iYXItY2hhbmdlZFwiLFxuXG5cdC8vb2xkIG5lZWQgdG8gYmUgcmVmYWN0b3JlZFxuXG5cdGFkZGVkOiBFVkVOVF9QUkVGSVggKyBcImFkZGVkXCIsXG5cdGNoYW5nZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2VcIixcblx0Y2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyOiAobmFtZSkgPT4ge1xuXHRcdHJldHVybiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS1hdHRyaWJ1dGUtXCIgKyBuYW1lO1xuXHR9LFxuXHRjaGFuZ2VBY3RpdmU6IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWFjdGl2ZVwiLFxuXHRjaGFuZ2VWYWx1ZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtdmFsdWVcIixcblx0Y2hhbmdlQ29uZGl0aW9uOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS1jb25kaXRpb25cIixcblx0Y2hhbmdlVmFsaWRhdGlvbjogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtdmFsaWRhdGlvblwiLFxuXG5cdC8vTElTVCBFVkVOVFNcblx0bGlzdFJvd0FkZDogRVZFTlRfUFJFRklYICsgXCJsaXN0LXJvdy1hZGRcIixcblx0bGlzdFJvd0RlbGV0ZTogRVZFTlRfUFJFRklYICsgXCJsaXN0LXJvdy1kZWxldGVcIixcblx0XG5cdGVkaXRhYmxlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImVkaXRhYmxlLXN0YXRlLWNoYW5nZWRcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNQRUNJQUxWQVJTID0ge1xuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCIsXG59O1xuXG4vL0FUVFJJQlVURVNcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OQU1FID0gXCJuYW1lXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VORFBPSU5UID0gXCJlbmRwb2ludFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NRVRIT0QgPSBcIm1ldGhvZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEFURSA9IFwic3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQgPSBcImlucHV0LW1vZGUtYWZ0ZXItc3VibWl0XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEID0gXCJyZXF1aXJlZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSA9IFwicmVxdWlyZWQtb24tYWN0aXZlLW9ubHlcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VESVRBQkxFID0gXCJlZGl0YWJsZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04gPSBcImVkaXRhYmxlLWNvbmRpdGlvblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRUFET05MWSA9IFwicmVhZG9ubHlcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTk9WQUxVRSA9IFwibm8tdmFsdWVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMSUQgPSBcInZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOVkFMSUQgPSBcImludmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElEID0gXCJjb25kaXRpb24tdmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQgPSBcImNvbmRpdGlvbi1pbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01BWCA9IFwibWF4XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiO1xuIiwiaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xuXG5jb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uIChkYXRhLCBuYW1lLCB2YWx1ZSkge1xuXHRpZiAoZGF0YSA9PSBudWxsIHx8IHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCB1cGRhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcblxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XG5cdHdoaWxlIChuYW1lcy5sZW5ndGggPiAxKSB7XG5cdFx0Y29uc3Qga2V5ID0gbmFtZXMuc2hpZnQoKTtcblx0XHRsZXQgdGVtcCA9IGRhdGFba2V5XTtcblx0XHRjb25zdCBoYXMgPSB0eXBlb2YgdGVtcCAhPT0gXCJ1bmRlZmllbmRcIiAmJiB0ZW1wICE9IG51bGw7XG5cdFx0aWYgKCFoYXMgJiYgIXVwZGF0ZSkgcmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAoIWhhcyAmJiB1cGRhdGUpIHRlbXAgPSBkYXRhW2tleV0gPSB7fTtcblxuXHRcdGRhdGEgPSB0ZW1wO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSkgZGF0YVtuYW1lc1swXV0gPSB2YWx1ZTtcblx0ZWxzZSByZXR1cm4gZGF0YVtuYW1lc1swXV0gPyBkYXRhW25hbWVzWzBdXSA6IG51bGw7XG59O1xuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQ29udGFpbmVyO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIodmFsdWUgPyB2YWx1ZSA6IHt9KTtcblx0XHR0aGlzLmZpZWxkcyA9IFtdO1xuXHRcdHRoaXMub24oRVZFTlRTLnZhbHVlQ2hhbmdlZCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGNvbnN0IGNoYWluID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCBjaGFpbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5maWVsZHMgPSBmaW5kRmllbGRzKHRoaXMpO1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMub24oRVZFTlRTLmluaXRpYWxpemUsIChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IHRoaXMpIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpZWxkcy5pbmRleE9mKGZpZWxkKSA8IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5maWVsZHMucHVzaChmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLnZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyBkYXRhLCBiYXNlIH0pID0+IHtcblx0XHRcdFx0Y29uc3QgeyBmaWVsZHMgfSA9IGJhc2U7XG5cdFx0XHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBmaWVsZHMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGZpZWxkLmNvbmRpdGlvbiAmJiAhZmllbGQudmFsaWQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XG5cdFx0aWYgKGZpZWxkcylcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdFx0fVxuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRfdmFsdWUodGhpcywge30pO1xuXHRcdGNvbnN0IHsgZmllbGRzIH0gPSB0aGlzO1xuXHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZmllbGQubmFtZSkgYXdhaXQgZmllbGQudmFsdWUodmFsdWVIZWxwZXIodmFsdWUsIGZpZWxkLm5hbWUpKTtcblx0XHRcdFx0ZWxzZSBpZiAoZmllbGQgaW5zdGFuY2VvZiBDb250YWluZXIpIGF3YWl0IGZpZWxkLnZhbHVlKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgY2hhaW4pIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGRhdGEgPSBfdmFsdWUodGhpcyk7XG5cdFx0Y29uc3QgbmFtZSA9IGF3YWl0IGZpZWxkLm5hbWU7XG5cdFx0Y29uc3QgdmFsdWUgPSBhd2FpdCBmaWVsZC52YWx1ZSgpO1xuXHRcdGNvbnN0IGhhc1ZhbHVlID0gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCI7XG5cdFx0aWYgKG5hbWUpIHtcblx0XHRcdGlmIChoYXNWYWx1ZSkgZGF0YVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSBkZWxldGUgZGF0YVtuYW1lXTtcblx0XHR9IGVsc2UgaWYgKGhhc1ZhbHVlKSBPYmplY3RVdGlscy5tZXJnZShkYXRhLCB2YWx1ZSk7XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUoY2hhaW4pO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoQ29udGFpbmVyKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbiIsImltcG9ydCB7IEZPUk1TVEFURVMsIE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBcIi4vY29udHJvbHNcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQlVUVE9ORFVNTVkgPSB7XG5cdGFjdGl2ZTogdHJ1ZSxcblx0ZGlzYWJsZWQ6IHRydWUsXG59O1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQ29udHJvbDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRpZiAoIXRoaXMucmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMuZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdHRoaXMuYmFjayA9IHRoaXMuZmluZChOT0RFTkFNRVMuQmFja0J1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMubmV4dCA9IHRoaXMuZmluZChOT0RFTkFNRVMuTmV4dEJ1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMuc3VtbWFyeSA9IHRoaXMuZmluZChOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMuc3VibWl0ID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdWJtaXRCdXR0b24pLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihbRVZFTlRTLnZhbGlkU3RhdGVDaGFuZ2VkLCBFVkVOVFMuY29uZGl0aW9uU3RhdGVDaGFuZ2VkXSwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBQYWdlKSB0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihbRVZFTlRTLmZvcm1TdGF0ZUNoYW5nZWQsIEVWRU5UUy5zaXRlQ2hhbmdlZF0sIChldmVudCkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdGNvbnN0IHsgYmFjaywgbmV4dCwgc3VtbWFyeSwgc3VibWl0LCBmb3JtIH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgYWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBuZXh0UGFnZSwgcGFnZXMsIHVzZVN1bW1hcnlQYWdlLCBzdGF0ZSB9ID0gZm9ybTtcblxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XG5cdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdW1tYXJ5LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xuXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XG5cblx0XHRcdGlmIChuZXh0UGFnZSB8fCAoIWFjdGl2ZVBhZ2UudmFsaWQgJiYgYWN0aXZlUGFnZUluZGV4ICsgMSA8IHBhZ2VzLmxlbmd0aCkpIHtcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKHVzZVN1bW1hcnlQYWdlICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdFx0c3VtbWFyeS5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdW1tYXJ5LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5kZWZpbmVFbGVtZW50KENvbnRyb2wpO1xuZXhwb3J0IGRlZmF1bHQgQ29udHJvbDtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlRmllbGQsIHtfdmFsdWV9IGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IHsgZmluZFdyYXBwZXIgfSBmcm9tIFwiLi93cmFwcGVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXCJmaWxlLWZvcm1hdFwiXTtcblxuY2xhc3MgRmllbGQgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuRmllbGQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub24oRVZFTlRTLmlucHV0LCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwgPyBldmVudC5kZXRhaWwgOiBudWxsO1xuXHRcdFx0aWYoX3ZhbHVlKHRoaXMpICE9IHZhbHVlKVxuXHRcdFx0XHR0aGlzLnZhbHVlKHZhbHVlKTtcblx0XHR9KTtcblx0fVxuXHRcblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMud3JhcHBlciA9IGZpbmRXcmFwcGVyKHRoaXMpO1xuXHRcdFx0aWYgKHRoaXMud3JhcHBlcilcblx0XHRcdFx0dGhpcy52YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLndyYXBwZXIudmFsaWQ7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGlmICh0aGlzLndyYXBwZXIpIHRoaXMud3JhcHBlci5yZWFkb25seSA9IHRoaXMucmVhZG9ubHk7XG5cdH1cblxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB0aGlzLndyYXBwZXIgPyB0aGlzLndyYXBwZXIuYWNjZXB0VmFsdWUodmFsdWUpIDogZmFsc2U7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLndyYXBwZXIpIHJldHVybiB0aGlzLndyYXBwZXIubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHRcdFxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHRcblx0XHRpZiAodGhpcy53cmFwcGVyKSBhd2FpdCB0aGlzLndyYXBwZXIudXBkYXRlZFZhbHVlKHZhbHVlKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KEZpZWxkKTtcbmV4cG9ydCBkZWZhdWx0IEZpZWxkO1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHkgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBGT1JNU1RBVEVTLCBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VULCBBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgXCIuL01lc3NhZ2VcIjtcbmltcG9ydCBcIi4vUGFnZVwiO1xuaW1wb3J0IFwiLi9Db250cm9sXCI7XG5pbXBvcnQgXCIuL1Byb2dyZXNzQmFyXCI7XG5jb25zdCBQUklWQVRFX1NUQVRFID0gXCJzdGF0ZVwiO1xuXG5jb25zdCBmb3JtU3RhdGUgPSBmdW5jdGlvbiAoc2VsZiwgc3RhdGUpIHtcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcHJpdmF0ZVByb3BlcnR5KHNlbGYsIFBSSVZBVEVfU1RBVEUsIHN0YXRlKTtcblx0ZWxzZSByZXR1cm4gcHJpdmF0ZVByb3BlcnR5KHNlbGYsIFBSSVZBVEVfU1RBVEUpO1xufTtcblxuY29uc3QgY29sbGVjdERhdGEgPSBhc3luYyAoc2VsZikgPT4ge1xuXHRhd2FpdCBzZWxmLnJlYWR5O1xuXHRjb25zdCBkYXRhID0ge307XG5cdGNvbnN0IHBhZ2VzID0gc2VsZi5wYWdlcztcblx0Zm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuXHRcdGlmIChwYWdlLmNvbmRpdGlvbikge1xuXHRcdFx0Y29uc3QgbmFtZSA9IHBhZ2UubmFtZTtcblx0XHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgcGFnZS52YWx1ZSgpO1xuXHRcdFx0Y29uc3QgaGFzVmFsdWUgPSB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcblx0XHRcdGlmIChuYW1lICYmIGhhc1ZhbHVlKSBkYXRhW25hbWVdID0gdmFsdWU7XG5cdFx0XHRlbHNlIGlmIChoYXNWYWx1ZSkgT2JqZWN0VXRpbHMubWVyZ2UoZGF0YSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVRdO1xuXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xuXHRmb3IgKGxldCBwYWdlIG9mIGZvcm0ucGFnZXMpIHtcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcblx0fVxufTtcblxuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkZvcm07XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdGZvcm1TdGF0ZSh0aGlzLCBudWxsKTtcblx0XHRsZXQgdmFsdWVDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcblx0XHR0aGlzLm9uKFxuXHRcdFx0RVZFTlRTLnZhbHVlQ2hhbmdlZCxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0Y29uc3QgZGV0YWlsID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHRpZih2YWx1ZUNoYW5nZVRpbWVvdXQpXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHZhbHVlQ2hhbmdlVGltZW91dCk7XG5cblx0XHRcdFx0dmFsdWVDaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dmFsdWVDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLmV4ZWN1dGVWYWxpZGF0ZSwgZGV0YWlsKTtcblx0XHRcdFx0fSwgMSk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmluaXQ7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMudXNlU3VtbWFyeVBhZ2UgPSB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSk7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xuXG5cdFx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xuXHRcdFx0dGhpcy5wYWdlcyA9IHRoaXMuZmluZChOT0RFTkFNRVMuUGFnZSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcblx0XHRpZiAodGhpcy5wYWdlcy5sZW5ndGggPiAwKSB0aGlzLnRvTmV4dFBhZ2UoKTtcblx0fVxuXG5cdGdldCBzdGF0ZSgpIHtcblx0XHRyZXR1cm4gZm9ybVN0YXRlKHRoaXMpO1xuXHR9XG5cblx0c2V0IHN0YXRlKHN0YXRlKSB7XG5cdFx0Y29uc3QgYWN0dWFsID0gdGhpcy5zdGF0ZTtcblx0XHRpZiAoYWN0dWFsID09IEZPUk1TVEFURVMuaW5wdXQgJiYgc3RhdGUgIT0gRk9STVNUQVRFUy5pbnB1dCkgcmVhZG9ubHkodGhpcywgdHJ1ZSk7XG5cdFx0ZWxzZSBpZiAoYWN0dWFsICE9IEZPUk1TVEFURVMuaW5wdXQgJiYgc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0cmVhZG9ubHkodGhpcywgZmFsc2UpO1xuXHRcdFx0aWYgKHRoaXMuYWN0aXZlUGFnZSkgdGhpcy5hY3RpdmVQYWdlLmFjdGl2ZSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcm1TdGF0ZSh0aGlzLCBzdGF0ZSk7XG5cblx0XHRpZiAoYWN0dWFsICE9IHN0YXRlKSB0aGlzLnRyaWdnZXIoRVZFTlRTLmZvcm1TdGF0ZUNoYW5nZWQpO1xuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfU1RBVEUsIHN0YXRlKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIGlmICghcGFnZS52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyB2YWx1ZShkYXRhKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIGNvbGxlY3REYXRhKHRoaXMpOyAvL3JldHVybiBmb3JtRGF0YSh0aGlzKTtcblxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0aWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSB7XG5cdFx0XHRcdGF3YWl0IHBhZ2UudmFsdWUobnVsbCk7IC8vIHJlc2V0IGFsbCB2YWx1ZXNcblx0XHRcdFx0aWYgKHBhZ2UubmFtZSkgYXdhaXQgcGFnZS52YWx1ZShkYXRhW3BhZ2UubmFtZV0pO1xuXHRcdFx0XHRlbHNlIGF3YWl0IHBhZ2UudmFsdWUoZGF0YSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuYWxsUHVibGlzaFZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgYWN0aXZlUGFnZSgpIHtcblx0XHRpZiAoMCA8PSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAmJiB0aGlzLmFjdGl2ZVBhZ2VJbmRleCA8IHRoaXMucGFnZXMubGVuZ3RoKSByZXR1cm4gdGhpcy5wYWdlc1t0aGlzLmFjdGl2ZVBhZ2VJbmRleF07XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHNldCBhY3RpdmVQYWdlKHBhZ2UpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmVQYWdlO1xuXHRcdGlmIChwYWdlICE9IGN1cnJlbnQpIHtcblx0XHRcdGlmIChjdXJyZW50KSBjdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XG5cdFx0XHRwYWdlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVTLmlucHV0KSB0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5zaXRlQ2hhbmdlZCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHByZXZQYWdlKCkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xuXHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXQgbmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMucGFnZXMpIHtcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gdGhpcy5wYWdlc1tpXTtcblx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhc3luYyB0b1ByZXZQYWdlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBwcmV2ID0gYXdhaXQgdGhpcy5wcmV2UGFnZTtcblx0XHRcdGlmIChwcmV2KSB0aGlzLmFjdGl2ZVBhZ2UgPSBwcmV2O1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XG5cdFx0Y29uc3QgbmV4dCA9IGF3YWl0IHRoaXMubmV4dFBhZ2U7XG5cdFx0aWYgKG5leHQpIHtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVTLmluaXQpIHRoaXMuX3N0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcblx0XHRcdHRoaXMuc3VtbWFyeSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHN1bW1hcnkoKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuc3VtbWFyeTtcblx0fVxuXG5cdGFzeW5jIHN1Ym1pdCgpIHtcblx0XHR0aGlzLnN0YXRlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUKSA/IEZPUk1TVEFURVMuaW5wdXQgOiBGT1JNU1RBVEVTLmZpbmlzaGVkO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XG5cblx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmF0dHIoQVRUUklCVVRFX0VORFBPSU5UKTtcblx0XHRpZiAoZW5kcG9pbnQpIHtcblx0XHRcdGVuZHBvaW50ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmVUZXh0KGVuZHBvaW50LCBkYXRhLCBlbmRwb2ludCk7XG5cdFx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCBsb2NhdGlvbik7XG5cblx0XHRcdHJldHVybiBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSwge1xuXHRcdFx0XHRtZXRob2Q6IHRoaXMuYXR0cihBVFRSSUJVVEVfTUVUSE9EKSB8fCBcInBvc3RcIixcblx0XHRcdFx0Y3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuXHRcdFx0XHRtb2RlOiBcImNvcnNcIixcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuc3VibWl0LCBkYXRhKTtcblx0fVxufVxuZGVmaW5lRWxlbWVudChGb3JtKTtcbmV4cG9ydCBkZWZhdWx0IEZvcm07XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEXTtcblxuY2xhc3MgRm9ybUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFxuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5kaXNhYmxlZCkgdGhpcy5leGVjdXRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xuXHR9XG5cblx0Z2V0IGRpc2FibGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRElTQUJMRUQpO1xuXHR9XG5cblx0c2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG5cdFx0ZGlzYWJsZWQgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfRElTQUJMRUQsIG51bGwpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHRjb25zb2xlLmxvZyhcImV4ZWN1dGVcIik7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZvcm1CdXR0b247XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VULCBBVFRSSUJVVEVfTUFYLCBBVFRSSUJVVEVfSU5WQUxJRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCB7IHRyZWVGaWx0ZXIgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5pbXBvcnQgQmFzZUZpZWxkLCB7IF92YWx1ZSB9IGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFJvdyBmcm9tIFwiLi9saXN0L1Jvd1wiO1xuaW1wb3J0IEFkZFJvdyBmcm9tIFwiLi9saXN0L0FkZFJvd1wiO1xuaW1wb3J0IERlbGV0ZVJvdyBmcm9tIFwiLi9saXN0L0RlbGV0ZVJvd1wiO1xuaW1wb3J0IFJvd3MgZnJvbSBcIi4vbGlzdC9Sb3dzXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX01BWF07XG5cbmNvbnN0IGZpbmRBZGRCdXR0b24gPSAobGlzdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdDogbGlzdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFkZFJvdykgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSlbMF07XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBhc3luYyAobGlzdCwgdmFsdWUpID0+IHtcblx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlIH0gPSBsaXN0O1xuXHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpLmNoaWxkcmVuWzBdO1xuXHRjb250YWluZXIuYXBwZW5kKHJvdyk7XG5cblx0aWYgKHZhbHVlKSBhd2FpdCByb3cudmFsdWUodmFsdWUpO1xuXG5cdHJldHVybiByb3c7XG59O1xuXG5jbGFzcyBMaXN0IGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkxpc3Q7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcih2YWx1ZSA/IHZhbHVlIDogW10pO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMudmFsdWVDaGFuZ2VkLCAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldDtcblx0XHRcdGlmIChyb3cgaW5zdGFuY2VvZiBSb3cpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBldmVudC5kZXRhaWw7XG5cdFx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQocm93LCBjaGFpbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5saXN0Um93QWRkLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgeyByZWFkb25seX0gPSB0aGlzO1xuXHRcdFx0Y29uc3QgdmFsdWVzID0gX3ZhbHVlKHRoaXMpO1xuXHRcdFx0aWYgKCFyZWFkb25seSkge1xuXHRcdFx0XHRjb25zdCByb3cgPSBjcmVhdGVSb3codGhpcyk7XG5cdFx0XHRcdHZhbHVlcy5wdXNoKHJvdy52YWx1ZSk7XG5cblx0XHRcdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbihFVkVOVFMubGlzdFJvd0RlbGV0ZSwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGNvbnN0IHsgcm93cywgcmVhZG9ubHl9ID0gdGhpcztcblx0XHRcdGNvbnN0IHZhbHVlcyA9IF92YWx1ZSh0aGlzKTtcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0cm93LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJvd3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR2YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcdFx0XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMudGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xuXHRcdFx0dGhpcy5jb250YWluZXIgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLkxpc3RSb3dzKS5maXJzdCgpO1xuXHRcdFx0Y29uc3QgdmFsaWRhdG9yICA9IHRoaXMudmFsaWRhdG9yO1xuXHRcdFx0Y29uc3QgYWRkQnV0dG9uID0gZmluZEFkZEJ1dHRvbih0aGlzKTtcblxuXHRcdFx0dmFsaWRhdG9yLmFkZEN1c3RvbUNoZWNrKGFzeW5jICh7fSkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IHJvd3MsIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0XHRcdGNvbnN0IGxlbmd0aCA9IHJvd3MubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA9PSBtYXgpIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0ZWxzZSBpZiAobGVuZ3RoIDwgbWF4KSBhZGRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbGVuZ3RoIDw9IG1heDtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IHJvd3MgfSA9IHRoaXM7XG5cdFx0XHRcdGlmIChyb3dzKVxuXHRcdFx0XHRcdGZvciAobGV0IHJvdyBvZiByb3dzKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXJvdy52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0Zm9yIChsZXQgcm93IG9mIHRoaXMucm93cykge1xuXHRcdFx0cm93LnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHJvd3MoKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5jb250YWluZXIuY2hpbGRyZW4pO1xuXHR9XG5cblx0Z2V0IG1heCgpIHtcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01BWCkpIHJldHVybiBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01BWCkpO1xuXHRcdHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuICF2YWx1ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSkgOiBudWxsO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy5jb250YWluZXIuY2hpbGRyZW4ucmVtb3ZlKCk7XG5cdFx0aWYgKHZhbHVlKSBmb3IgKGxldCB2YWwgb2YgdmFsdWUpIGF3YWl0IGNyZWF0ZVJvdyh0aGlzLCB2YWwpO1xuXHR9XG5cblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQocm93LCBjaGFpbikge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHRcdFxuXHRcdGxldCB2YWx1ZXMgPSBhd2FpdCBfdmFsdWUodGhpcyk7XG5cdFx0aWYgKCF2YWx1ZXMpIHtcblx0XHRcdHZhbHVlcyA9IFtdO1xuXHRcdFx0X3ZhbHVlKHZhbHVlcyk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgcm93cyA9IHRoaXMucm93cztcblx0XHRjb25zdCB2YWx1ZSA9IGF3YWl0IHJvdy52YWx1ZSgpO1xuXHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XHRcdFxuXHRcdHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblxuXHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZShjaGFpbik7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChMaXN0KTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvRXZlbnRzLCB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0NPTkRJVElPTl07XG5cbmV4cG9ydCBjb25zdCBmaW5kUGFyZW50QmFzZSA9IChtZXNzYWdlKSA9PiB7XG5cdGxldCBwYXJlbnQgPSBtZXNzYWdlLnBhcmVudE5vZGU7XG5cdHdoaWxlIChwYXJlbnQpIHtcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgQmFzZSkgcmV0dXJuIHBhcmVudDtcblxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLk1lc3NhZ2U7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1x0XHRcblxuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcdFx0XHRcblx0XHRcdHRoaXMucmVmZXJlbmNlID0gZmluZFBhcmVudEJhc2UodGhpcyk7XG5cdFx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0XHR0aGlzLmZvcm0ub24oRVZFTlRTLmV4ZWN1dGVWYWxpZGF0ZSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlKCkge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGV2YWx1YXRpb25EYXRhKHRoaXMucmVmZXJlbmNlKTtcblx0XHR0aGlzLmFjdGl2ZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XG5cdH1cbn1cbmRlZmluZUVsZW1lbnQoTWVzc2FnZSk7XG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIEFUVFJJQlVURV9TVEVQIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9TVEVQXTtcblxuY2xhc3MgUGFnZSBleHRlbmRzIENvbnRhaW5lciB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5QYWdlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHR9XG5cblx0Z2V0IHN0ZXAoKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9TVEVQKTtcblx0fVxuXHRcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cbn1cbmRlZmluZUVsZW1lbnQoUGFnZSk7XG5leHBvcnQgZGVmYXVsdCBQYWdlO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgRk9STVNUQVRFUywgcHJvZ3Jlc3MsIEFUVFJJQlVURV9QUk9HUkVTUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5pbXBvcnQgXCIuL1N0ZXBcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfUFJPR1JFU1NdO1xuXG5jb25zdCBmaXJzdFN0ZXBQYWdlSW5kZXggPSAocGFnZXMsIHN0ZXAsIGFjdGl2ZVBhZ2UpID0+IHtcblx0Zm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuXHRcdGlmIChwYWdlLnN0ZXAgPT0gc3RlcCAmJiBwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XG5cdFx0ZWxzZSBpZiAocGFnZSA9PSBhY3RpdmVQYWdlKSByZXR1cm47XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuUHJvZ3Jlc3NCYXI7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMuZm9ybSkgcmV0dXJuO1xuXHRcdFx0aWYgKHRhcmdldCA9PSB0aGlzKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHN0ZXAgPSB0YXJnZXQuaXMoTk9ERU5BTUVTLlN0ZXApID8gdGFyZ2V0IDogdGFyZ2V0LnBhcmVudChOT0RFTkFNRVMuU3RlcCkuZmlyc3QoKTtcblxuXHRcdFx0aWYgKCFzdGVwKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xuXHRcdFx0Y29uc3QgcGFnZXMgPSB0aGlzLmZvcm0ucGFnZXM7XG5cdFx0XHRjb25zdCBhY3RpdmVQYWdlSW5kZXggPSB0aGlzLmZvcm0uYWN0aXZlUGFnZUluZGV4O1xuXHRcdFx0Y29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuZm9ybS5hY3RpdmVQYWdlO1xuXHRcdFx0Y29uc3Qgc3RlcE5hbWUgPSBzdGVwLm5hbWU7XG5cdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkpIHtcblx0XHRcdFx0Y29uc3QgcGFnZSA9IGZpcnN0U3RlcFBhZ2VJbmRleChwYWdlcywgc3RlcE5hbWUsIGFjdGl2ZVBhZ2UpO1xuXHRcdFx0XHRpZiAocGFnZSkgdGhpcy5mb3JtLmFjdGl2ZVBhZ2UgPSBwYWdlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdHRoaXMucHJvZ3Jlc3MgPSAwO1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMuZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdHRoaXMuc3RlcHMgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLlN0ZXApO1xuXHRcdFx0dGhpcy5mb3JtLm9uKFtFVkVOVFMuaW5pdGlhbGl6ZSwgRVZFTlRTLnNpdGVDaGFuZ2VkLCBFVkVOVFMuZm9ybVN0YXRlQ2hhbmdlZF0sICgpID0+IHtcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSB0aGlzLmZvcm0uc3RhdGU7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmZvcm0uYWN0aXZlUGFnZTtcblx0XHRcdFx0aWYgKCFhY3RpdmVQYWdlKSByZXR1cm47XG5cblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLmZvcm0uYWN0aXZlUGFnZUluZGV4O1xuXHRcdFx0XHRjb25zdCBjb3VudCA9IHRoaXMuZm9ybS5wYWdlcy5sZW5ndGg7XG5cdFx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURVMuaW5pdDtcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKChpbmRleCAqIDEwMCkgLyBjb3VudCk7XG5cblx0XHRcdFx0Zm9yIChsZXQgc3RlcCBvZiB0aGlzLnN0ZXBzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHN0ZXAubmFtZTtcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IHBhZ2VTdGVwO1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5O1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFUy5maW5pc2hlZDtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucHJvZ3Jlc3MgPSBzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkgfHwgc3RhdGUgPT0gRk9STVNUQVRFUy5maW5pc2hlZCA/IDEwMCA6IHByb2dyZXNzO1xuXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMucHJvZ3Jlc3NiYXJDaGFuZ2VkKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldCBwcm9ncmVzcygpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUyk7XG5cdH1cblxuXHRzZXQgcHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcblx0XHRpZiAodGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSkgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgKyBcIiVcIik7XG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUywgTWF0aC5tYXgoMCwgTWF0aC5taW4ocHJvZ3Jlc3MsIDEwMCkpKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KFByb2dyZXNzQmFyKTtcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFldO1xuXG5jbGFzcyBTdGVwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdGVwO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG4gICAgZ2V0IG5hbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfTkFNRSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdH1cblx0fVxuXG5cdGdldCByZWFkb25seSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KFN0ZXApO1xuZXhwb3J0IGRlZmF1bHQgU3RlcDtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuVmFsaWRhdGlvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0fVxufVxuZGVmaW5lRWxlbWVudChWYWxpZGF0aW9uKTtcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XG4iLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgeyBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgTk9ERU5BTUVTLCBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OLCBGT1JNU1RBVEVTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZUNvbmRpdGlvblN0YXRlLCB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIlxuaW1wb3J0IHsgZmluZFZhbGlkYXRpb25zIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cblxuY29uc3QgdXBkYXRlUmVhZG9ubHkgPSBhc3luYyAoeyBkYXRhLCB2YWxpZCwgYmFzZSwgY29uZGl0aW9uIH0pID0+IHtcblx0Y29uc3QgeyBmb3JtIH0gPSBiYXNlO1xuXHRpZiAoZm9ybS5zdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0aWYgKCF2YWxpZClcblx0XHRcdGJhc2UucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRlbHNlIGlmIChjb25kaXRpb24pIHtcblx0XHRcdGNvbnN0IHRlc3QgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcblx0XHRcdGJhc2UuZWRpdGFibGUgPSB0ZXN0O1xuXHRcdFx0cmV0dXJuIHRlc3Q7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWxpZDtcbn1cblxuY2xhc3MgVmFsaWRhdG9yIHtcblx0Y29uc3RydWN0b3IoYmFzZSkge1xuXHRcdHRoaXMuaW5pdGFsID0gdHJ1ZTtcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xuXHRcdHRoaXMuY3VzdG9tQ2hlY2tzID0gW107XG5cdFx0dGhpcy52YWxpZGF0aW9ucyA9IGZpbmRWYWxpZGF0aW9ucyhiYXNlKSB8fCBbXTtcblx0XHR0aGlzLmNvbmRpdGlvbiA9IGJhc2UuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0XHR0aGlzLmVkaXRhYmxlQ29uZGl0aW9uID0gYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pO1xuXG5cdH1cblxuXHRhZGRDdXN0b21DaGVjayhjaGVjaykge1xuXHRcdHRoaXMuY3VzdG9tQ2hlY2tzLnB1c2goY2hlY2spO1xuXHR9XG5cblx0Z2V0IGZvcm0oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYmFzZS5mb3JtO1xuXHR9XG5cblx0YXN5bmMgdmFsaWRhdGUoKSB7XG5cdFx0Y29uc3QgeyBiYXNlLCB2YWxpZGF0aW9ucywgY3VzdG9tQ2hlY2tzLCBjb25kaXRpb24sIGVkaXRhYmxlQ29uZGl0aW9uIH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkLCByZXF1aXJlZE9ubHlPbkFjdGl2ZSB9ID0gYmFzZTtcblx0XHRjb25zdCBoYXNDaGVja3MgPSBjdXN0b21DaGVja3MubGVuZ3RoID4gMCB8fCB2YWxpZGF0aW9ucy5sZW5ndGggPiAwO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBldmFsdWF0aW9uRGF0YShiYXNlKTtcblx0XHRjb25zdCBpbml0aWFsID0gdGhpcy5pbml0YWw7XG5cdFx0dGhpcy5pbml0YWwgPSBmYWxzZTtcblxuXG5cdFx0Y29uc3QgY29uZGl0aW9uVmFsaWQgPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XG5cdFx0dXBkYXRlQ29uZGl0aW9uU3RhdGUoYmFzZSwgY29uZGl0aW9uVmFsaWQsIHRoaXMuaW5pdGFsKTtcblxuXHRcdGxldCB2YWxpZCA9IHJlcXVpcmVkID8gaGFzVmFsdWUgOiB0cnVlO1xuXHRcdGlmIChjb25kaXRpb25WYWxpZCkge1xuXHRcdFx0aWYgKHZhbGlkKVxuXHRcdFx0XHRmb3IgKGxldCBjaGVjayBvZiBjdXN0b21DaGVja3MpIHtcblx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gYXdhaXQgY2hlY2soeyBkYXRhLCBiYXNlIH0pO1xuXHRcdFx0XHRcdGlmICghdGVzdCkgdmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCB2YWxpZGF0aW9uIG9mIHZhbGlkYXRpb25zKSB7XG5cdFx0XHRcdGlmICh2YWxpZCAmJiBoYXNWYWx1ZSkge1xuXHRcdFx0XHRcdGNvbnN0IHRlc3QgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh2YWxpZGF0aW9uLmNvbmRpdGlvbiwgZGF0YSwgdHJ1ZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGlvbi5hY3RpdmUgPSAhdGVzdDtcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVkaXRhYmxlID0gdXBkYXRlUmVhZG9ubHkoeyBkYXRhLCB2YWxpZCwgYmFzZSwgY29uZGl0aW9uOiBlZGl0YWJsZUNvbmRpdGlvbiB9KTtcblx0XHRcdGlmKCFlZGl0YWJsZSlcblx0XHRcdFx0dmFsaWQgPSB0cnVlO1xuXHRcdFx0dXBkYXRlVmFsaWRTdGF0ZShiYXNlLCB2YWxpZCwgdGhpcy5pbml0YWwpO1xuXHRcdFx0XG5cdFx0fVxuXHRcdHJldHVybiB2YWxpZDtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRvcjtcbiIsImltcG9ydCB7IE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQmFja0J1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkJhY2tCdXR0b247XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvUHJldlBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFja0J1dHRvbjtcclxuZGVmaW5lRWxlbWVudChCYWNrQnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRVMuTmV4dEJ1dHRvbjtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QnV0dG9uO1xyXG5kZWZpbmVFbGVtZW50KE5leHRCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIFN1Ym1pdEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdWJtaXRCdXR0b247XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0uc3VibWl0KCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN1Ym1pdEJ1dHRvbjtcclxuZGVmaW5lRWxlbWVudChTdWJtaXRCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdW1tYXJ5QnV0dG9uO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnlCdXR0b247XG5kZWZpbmVFbGVtZW50KFN1bW1hcnlCdXR0b24pO1xuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xuaW1wb3J0IE5leHRCdXR0b24gZnJvbSBcIi4vTmV4dEJ1dHRvblwiO1xuaW1wb3J0IFN1bW1hcnlCdXR0b24gZnJvbSBcIi4vU3VtbWFyeUJ1dHRvblwiO1xuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcblxuZXhwb3J0IHtcblx0QmFja0J1dHRvbixcblx0TmV4dEJ1dHRvbixcblx0U3VtbWFyeUJ1dHRvbixcblx0U3VibWl0QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIEFkZFJvdyBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCl7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CdXR0b25BZGRSb3c7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVFMubGlzdFJvd0FkZCk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChBZGRSb3cpO1xuZXhwb3J0IGRlZmF1bHQgQWRkUm93O1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jbGFzcyBEZWxldGVSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkJ1dHRvbkRlbGV0ZVJvdztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCl7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlXHQ9IHRydWU7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMudHJpZ2dlcigxMDAsIEVWRU5UUy5saXN0Um93RGVsZXRlKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KERlbGV0ZVJvdyk7XG5leHBvcnQgZGVmYXVsdCBEZWxldGVSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IERlbGV0ZVJvdyBmcm9tIFwiLi9EZWxldGVSb3dcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgTGlzdFJvdyBleHRlbmRzIENvbnRhaW5lciB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5MaXN0Um93O1xuXHR9XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge31cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKExpc3RSb3cuTk9ERU5BTUUsIExpc3RSb3cpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdFJvdztcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIExpc3RSb3dzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkxpc3RSb3dzO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTGlzdFJvd3MuTk9ERU5BTUUsIExpc3RSb3dzKTtcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3dzO1xuIiwiaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuaW1wb3J0IHsgU1BFQ0lBTFZBUlMsIE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIlxuXG5leHBvcnQgY29uc3QgZXZhbHVhdGlvbkRhdGEgPSBhc3luYyAoYmFzZSkgPT4ge1xuXHRhd2FpdCBiYXNlLnJlYWR5O1xuXHRjb25zdCBkYXRhID0ge307XG5cdGRhdGFbU1BFQ0lBTFZBUlMuQ1VSUkVOVFZBTFVFXSA9IGF3YWl0IGJhc2UudmFsdWUoKTtcblxuXHRsZXQgcm93ID0gYmFzZS5wYXJlbnQoTk9ERU5BTUVTLkxpc3RSb3cpO1xuXHRsZXQgdGVtcCA9IGRhdGE7XG5cdHdoaWxlIChyb3cpIHtcblx0XHR0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXSA9IGF3YWl0IHJvdy52YWx1ZSgpO1xuXHRcdHRlbXAgPSB0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXTtcblx0XHRyb3cgPSByb3cucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0fVxuXHRcblx0cmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlKCBkYXRhLCBhd2FpdCBiYXNlLmZvcm0udmFsdWUoKSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgKE5vZGUpID0+IHtcclxuICAgIGlmKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KE5vZGUuTk9ERU5BTUUpKVxyXG4gICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTm9kZS5OT0RFTkFNRSwgTm9kZSk7XHJcbn0iLCJpbXBvcnQge0VWRU5USEFORExFX1RJTUVPVVR9IGZyb20gXCIuLi9Db25zdGFudHNcIlxuXG5leHBvcnQgY29uc3QgdG9FdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcmd1bWVudHMpLmpvaW4oXCIgXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VFdmVudENvcHkgPSAoZXZlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXG4gICAgICAgIGN1cnJlbnRUYXJnZXQ6IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ6IGV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIG9yaWdpbmFsVGFyZ2V0IDogZXZlbnQub3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIHNyY0VsZW1lbnQ6IGV2ZW50LnNyY0VsZW1lbnQsXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvVGltZW91dEhhbmRsZSA9IChoYW5kbGUsIHByZXZlbnREZWZhdWx0LCBzdG9wUHJvcGFnYXRpb24sIHRpbWVvdXQpID0+IHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmVudCA9IHR5cGVvZiBwcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiID8gcHJldmVudERlZmF1bHQgOiAoKSA9PiBwcmV2ZW50RGVmYXVsdDtcbiAgICBjb25zdCBzdG9wID0gdHlwZW9mIHN0b3BQcm9wYWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiID8gc3RvcFByb3BhZ2F0aW9uIDogKCkgPT4gc3RvcFByb3BhZ2F0aW9uO1xuXG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICBpZihwcmV2ZW50KGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHN0b3AoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZXZlbnRDb3B5ID0gbWFrZUV2ZW50Q29weShldmVudCk7XG5cbiAgICAgICAgaWYoaWQpXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlkID0gbnVsbDtcbiAgICAgICAgICAgIGhhbmRsZShldmVudENvcHkpO1xuICAgICAgICB9LCB0aW1lb3V0IHx8IEVWRU5USEFORExFX1RJTUVPVVQpO1xuXG4gICAgfVxufTsiLCJpbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuLi9CYXNlRmllbGRcIjtcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gXCIuLi9WYWxpZGF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCB0cmVlRmlsdGVyID0gKHsgcm9vdCwgZmlsdGVyIH0pID0+IHtcblx0bGV0IGVsZW1lbnRzID0gW107XG5cdHJvb3QuY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdGNvbnN0IHsgYWNjZXB0LCBzdG9wID0gZmFsc2UgfSA9IGZpbHRlcihlbGVtZW50KTtcblxuXHRcdGlmIChhY2NlcHQpIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cblx0XHRpZiAoIXN0b3ApIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IHRyZWVGaWx0ZXIoeyByb290OiBlbGVtZW50LCBmaWx0ZXIgfSk7XG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHJlc3VsdCk7XG5cdFx0XHRlbHNlIGlmIChyZXN1bHQpIGVsZW1lbnRzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBlbGVtZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kRmllbGRzID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRWYWxpZGF0aW9ucyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChyb290ICE9IGVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogZmFsc2UsIHN0b3A6IHRydWUgfTtcblx0XHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFZhbGlkYXRpb24pIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pO1xufTtcbiIsImltcG9ydCB7IEVWRU5UUywgVFJJR0dFUl9USU1FT1VULCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfVkFMSUQsIEFUVFJJQlVURV9JTlZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIEFUVFJJQlVURV9FRElUQUJMRSwgQVRUUklCVVRFX1JFQURPTkxZIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlVmFsaWRTdGF0ZSA9ICh0YXJnZXQsIHZhbGlkLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQudmFsaWQ7XG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgXCJcIik7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIFwiXCIpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XG5cdH1cblxuXHRpZiAob2xkU3RhdGUgIT0gdmFsaWQgfHwgaW5pdGlhbCl7IFxuXHRcdHRhcmdldC50cmlnZ2VyKEVWRU5UUy52YWxpZFN0YXRlQ2hhbmdlZCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVDb25kaXRpb25TdGF0ZSA9ICh0YXJnZXQsIHZhbGlkLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmNvbmRpdGlvbjtcblx0aWYgKHZhbGlkKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcIlwiKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFwiXCIpO1xuXHR9XG5cdGlmIChvbGRTdGF0ZSAhPSB2YWxpZCB8fCBpbml0aWFsKSB7XHRcdFxuXHRcdHRhcmdldC50cmlnZ2VyKEVWRU5UUy5jb25kaXRpb25TdGF0ZUNoYW5nZWQpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQWN0aXZlU3RhdGUgPSAodGFyZ2V0LCBhY3RpdmUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5hY3RpdmU7XG5cdGFjdGl2ZSA/IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XG5cdGlmIChvbGRTdGF0ZSAhPSBhY3RpdmUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRTLmFjdGl2ZVN0YXRlQ2hhbmdlZCk7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRWRpdGFibGVTdGF0ZSA9ICh0YXJnZXQsIGVkaXRhYmxlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuZWRpdGFibGU7XG5cdGlmIChlZGl0YWJsZSkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgXCJcIik7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfRURJVEFCTEUsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIik7XG5cdH1cblx0aWYgKG9sZFN0YXRlICE9IGVkaXRhYmxlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UUy5lZGl0YWJsZVN0YXRlQ2hhbmdlZCk7XG59OyIsImltcG9ydCB7IEVWRU5UUywgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFxuXHRcdHJldHVybiBpbnB1dC5sZW5ndGggPT0gMSA/IGlucHV0LmZpcnN0KCkgOiBpbnB1dDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiZmlsZVwiXSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gKGZpbGUsIHJlYWRGbk5hbWUpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG5cdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxuXHRcdFx0XHR0eXBlOiBmaWxlLnR5cGUsXG5cdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdFxuXHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHJlYWRlcltyZWFkRm5OYW1lXShmaWxlKTtcblx0fSk7XG59O1xuXG4vL3JlYWRBc0RhdGFVUkxcblxuY29uc3QgRk9STUFUID0ge1xuXHRcImZvcm0taW5wdXRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHJldHVybiBmaWxlO1xuXHR9LFxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJkYXRhLXVybC1iYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRcImJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLnN1YnN0cihyZXN1bHQuZGF0YS5pbmRleE9mKFwiLFwiKSArIDEpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNvbnN0IHJlYWRGaWxlcyA9IGFzeW5jIChmaWxlcywgZm9ybWF0LCBtdWx0aXBsZSkgPT4ge1xuXHRsZXQgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpXG5cdFx0cmVzdWx0LnB1c2goYXdhaXQgRk9STUFUW2Zvcm1hdF0oZmlsZSkpO1xuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIG51bGw7XG5cblxuXHRyZXR1cm4gbXVsdGlwbGUgPyByZXN1bHQgOiByZXN1bHRbMF07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dC5tdWx0aXBsZTtcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gZmllbGQuYXR0cihcImZpbGUtbmFtZS10YXJnZXRcIik7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IHRoaXMuZmlsZW5hbWVUYXJnZXQgPyBmaWVsZC5maW5kKHRoaXMuZmlsZW5hbWVUYXJnZXQpLmZpcnN0KCkgOiBudWxsO1xuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcblxuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMudmFsdWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXMubGVuZ3RoICE9IDApXG5cdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0fTtcblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBcIm9iamVjdFwiO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlICE9IHRoaXMuX192YWx1ZV9fKSB7XG5cdFx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy5maWxlbmFtZVRhcmdldCAmJiB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdGZvciAobGV0IGZpbGUgb2YgdmFsdWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQuYXBwZW5kKGA8c3Bhbj4ke2ZpbGUubmFtZX08L3NwYW4+YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fX3ZhbHVlX187XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nO1xuXG5jb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcbn07XG5cbmNvbnN0IGluaXQgPSAod3JhcHBlcikgPT4ge1xuXHRjb25zdCB7IGZpZWxkIH0gPSB3cmFwcGVyO1xuXHRjb25zdCBuYW1lID0gZmllbGQubmFtZSArIGdldFJhbmRvbUludCgpO1xuXHRjb25zdCBpbnB1dCA9ICh3cmFwcGVyLmlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKSk7XG5cdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcblx0aW5wdXQub24oXG5cdFx0XCJjaGFuZ2VcIixcblx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmNoYW5nZVZhbHVlKTtcblx0XHRcdH1cblx0XHQpXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0XHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xuXHRcdHJldHVybiB2YWx1ZS52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNle1xuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUywgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy5pbnB1dC5tdWx0aXBsZSA/IHRoaXMuaW5wdXQudmFsKCkgOiB0aGlzLmlucHV0LnZhbHVlKTtcblx0fVxuXHRcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGggPiAwKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNle1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1x0XG5cdFx0XHR9XHRcdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXQ6bm90KFt0eXBlPVwiZmlsZVwiXSk6bm90KFt0eXBlPVwicmFkaW9cIl0pOm5vdChbdHlwZT1cImNoZWNrYm94XCJdKSAsaW5wdXQ6bm90KFt0eXBlXSksIHRleHRhcmVhJztcblxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcblxuY29uc3QgdGV4dCA9IHtcblx0YWNjZXB0OiAodmFsdWUpID0+IHtcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuXHR9LFxuXHR2YWx1ZTogKGlucHV0KSA9PiB7XG5cdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xuXHR9LFxuXHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcbn07XG5jb25zdCBudW1iZXIgPSB7XG5cdGFjY2VwdDogKHZhbHVlKSA9PiB7XG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcblx0fSxcblx0dmFsdWU6IChpbnB1dCkgPT4ge1xuXHRcdHJldHVybiBpbnB1dC52YWx1ZUFzTnVtYmVyO1xuXHR9LFxuXHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkpIHJldHVybiB2YWx1ZTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxufTtcbmNvbnN0IGRhdGUgPSB7XG5cdGFjY2VwdDogKHZhbHVlKSA9PiB7XG5cdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcblx0fSxcblx0dmFsdWU6IChpbnB1dCkgPT4ge1xuXHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcblx0fSxcblx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxufTtcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGUsIHRpbWU6IGRhdGUgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGNvbnN0IHR5cGUgPSAoZmllbGQuYXR0cihcImlucHV0LXR5cGVcIikgfHwgaW5wdXQuYXR0cihcInR5cGVcIikgfHwgREVGQVVMVFRZUEUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMudHlwZSA9IFRZUEVTW3R5cGVdIHx8IFRZUEVTW0RFRkFVTFRUWVBFXTtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gdGhpcy50eXBlLmFjY2VwdCh2YWx1ZSk7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcy50eXBlLm5vcm1hbGl6ZSh2YWx1ZSk7XG5cdH1cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlICE9IHRoaXMuaW5wdXQudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy50eXBlLnZhbHVlKHRoaXMuaW5wdXQpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gXCIuLi9GaWVsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIHtcblx0XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpeyByZXR1cm4gbnVsbDt9XG5cdFxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpIHsgfVxuXG5cdHNldCByZWFkb25seShkaXNhYmxlZCkgeyB9XG5cblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkge1xuXHR9XG5cdFxuXHRnZXQgdmFsdWUoKXtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRcblx0Z2V0IHZhbGlkKCl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsImltcG9ydCBUZXh0IGZyb20gXCIuL1RleHRcIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9DaGVja2JveFwiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL1JhZGlvXCI7XG5pbXBvcnQgRmlsZSBmcm9tIFwiLi9GaWxlXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL1NlbGVjdFwiO1xuXG5leHBvcnQgY29uc3Qgd3JhcHBlcnMgPSBbVGV4dCwgQ2hlY2tib3gsIFJhZGlvLCBGaWxlLCBTZWxlY3RdO1xuXG5leHBvcnQgY29uc3QgZmluZFdyYXBwZXIgPSAoZmllbGQpID0+IHtcblx0Zm9yIChsZXQgd3JhcHBlciBvZiB3cmFwcGVycykge1xuXHRcdGNvbnN0IGlucHV0ID0gd3JhcHBlci5maW5kSW5wdXQoZmllbGQpO1xuXHRcdGlmIChpbnB1dCkgcmV0dXJuIG5ldyB3cmFwcGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbVwiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuXG5leHBvcnQge0Zvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIExpc3QsIENvbnRhaW5lcn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9