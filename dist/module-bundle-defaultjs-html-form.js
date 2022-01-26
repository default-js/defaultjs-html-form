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
/* harmony export */   "privateStore": () => (/* binding */ privateStore),
/* harmony export */   "privateProperty": () => (/* binding */ privateProperty),
/* harmony export */   "privatePropertyAccessor": () => (/* binding */ privatePropertyAccessor),
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

const privatePropertyAccessor = (varname) => {
	return function(self, value){
		if(arguments.length == 2)
			privateProperty(self, varname, value);
		else
			return privateProperty(self, varname);
	};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({privateProperty, privatePropertyAccessor, privateStore});

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

/***/ "./node_modules/@default-js/defaultjs-expression-language/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpressionResolver": () => (/* reexport safe */ _src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Context": () => (/* reexport safe */ _src_Context__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _src_Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Context */ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js");






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
	VERSION : "1.2.20",
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

/***/ "./node_modules/@default-js/defaultjs-html-components/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "componentBaseOf": () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_0__.componentBaseOf),
/* harmony export */   "define": () => (/* reexport safe */ _src_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__.define)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _src_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utils/DefineComponentHelper */ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js");






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






const _ready = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__.privatePropertyAccessor)("ready");

const TIMEOUTS = new WeakMap();
const init = (component) => {
	let timeout = TIMEOUTS.get(component);
	if (timeout) clearTimeout(timeout);

	TIMEOUTS.get(component, setTimeout(async () => {
		TIMEOUTS.delete(component);
		try{
			await component.init();
			component.ready.resolve();
		}catch(e){
			console.error("Can't initialize component!", component, e);
			component.ready(resolve(e));
		}
		component.trigger((0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("initialzed", component));
	}, _Constants__WEBPACK_IMPORTED_MODULE_3__.initTimeout));	
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
			_ready(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
	
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
			return _ready(this);
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
			_ready(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
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

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toNodeName": () => (/* binding */ toNodeName),
/* harmony export */   "define": () => (/* binding */ define),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return _Constants__WEBPACK_IMPORTED_MODULE_0__.componentPrefix + name;
};

const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (define); 


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
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);
	
   return `${nodename.toLowerCase()}:${eventType}`;//use @ as separtor and not :
};


const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});

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





const _form = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("form");

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
		let form = _form(this);
		if (!form) {
			form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
			_form(this, form);
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






const _parent = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privatePropertyAccessor)("parent");
const _value = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privatePropertyAccessor)("value");
const _validator = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privatePropertyAccessor)("validator");

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

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_CONDITION_STATE_CHANGED, (event) => {
			if (event.target == this) {
				this.conditionUpdated();
			}
		});
	}

	async init() {		
		await super.init();
		const ready = this.ready;		
		if (!ready.resolved) {
			_parent(this, findParentField(this));
			_validator(this, new _Validator__WEBPACK_IMPORTED_MODULE_2__["default"](this));			
			
			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_EXECUTE_VALIDATE, async (event) => {
				const chain = event.detail;
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					const condition = this.condition;
					if (current != valid && condition) {
						this.publishValue();
					}
				}
			});

			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_ALL_PUBLISH_VALUE, () => {
				this.publishValue();
			});

			ready.then(() => {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED);
			});
		}

		ready.then(async () => {
			await this.validate();			
			await this.publishValue();
		});
	}

	get validator() {
		return _validator(this);
	}

	get parentField() {
		return _parent(this);
	}

	conditionUpdated() {
		this.active = this.condition;
		(async () => {
			this.publishValue();
		})();
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
				await this.publishValue();
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
		else this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_CHANGED, chain);
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
/* harmony export */   "NODENAME_FORM": () => (/* binding */ NODENAME_FORM),
/* harmony export */   "NODENAME_SUBMIT_ACTION": () => (/* binding */ NODENAME_SUBMIT_ACTION),
/* harmony export */   "NODENAMES": () => (/* binding */ NODENAMES),
/* harmony export */   "FORMSTATE_INIT": () => (/* binding */ FORMSTATE_INIT),
/* harmony export */   "FORMSTATE_INPUT": () => (/* binding */ FORMSTATE_INPUT),
/* harmony export */   "FORMSTATE_SUMMARY": () => (/* binding */ FORMSTATE_SUMMARY),
/* harmony export */   "FORMSTATE_FINISHED": () => (/* binding */ FORMSTATE_FINISHED),
/* harmony export */   "FORMSTATES": () => (/* binding */ FORMSTATES),
/* harmony export */   "REQUIREDSTATES": () => (/* binding */ REQUIREDSTATES),
/* harmony export */   "EVENT_PREFIX": () => (/* binding */ EVENT_PREFIX),
/* harmony export */   "EVENT_INITIALIZE": () => (/* binding */ EVENT_INITIALIZE),
/* harmony export */   "EVENT_INITIALIZED": () => (/* binding */ EVENT_INITIALIZED),
/* harmony export */   "EVENT_FIELD_INITIALIZED": () => (/* binding */ EVENT_FIELD_INITIALIZED),
/* harmony export */   "EVENT_INITIALIZE_SUBMIT_ACTION": () => (/* binding */ EVENT_INITIALIZE_SUBMIT_ACTION),
/* harmony export */   "EVENT_SUBMIT": () => (/* binding */ EVENT_SUBMIT),
/* harmony export */   "EVENT_SUBMIT_RESULTS": () => (/* binding */ EVENT_SUBMIT_RESULTS),
/* harmony export */   "EVENT_EXECUTE_VALIDATE": () => (/* binding */ EVENT_EXECUTE_VALIDATE),
/* harmony export */   "EVENT_CONDITION_STATE_CHANGED": () => (/* binding */ EVENT_CONDITION_STATE_CHANGED),
/* harmony export */   "EVENT_ALL_PUBLISH_VALUE": () => (/* binding */ EVENT_ALL_PUBLISH_VALUE),
/* harmony export */   "EVENT_VALUE_CHANGED": () => (/* binding */ EVENT_VALUE_CHANGED),
/* harmony export */   "EVENT_SITE_CHANGED": () => (/* binding */ EVENT_SITE_CHANGED),
/* harmony export */   "EVENT_FORM_STATE_CHANGED": () => (/* binding */ EVENT_FORM_STATE_CHANGED),
/* harmony export */   "EVENT_FIELD_INPUT": () => (/* binding */ EVENT_FIELD_INPUT),
/* harmony export */   "EVENT_LIST_ROW_ADD": () => (/* binding */ EVENT_LIST_ROW_ADD),
/* harmony export */   "EVENT_LIST_ROW_DELETE": () => (/* binding */ EVENT_LIST_ROW_DELETE),
/* harmony export */   "EVENT_PROGRESSBAR_CHANGED": () => (/* binding */ EVENT_PROGRESSBAR_CHANGED),
/* harmony export */   "EVENT_ACTIVE_STATE_CHANGED": () => (/* binding */ EVENT_ACTIVE_STATE_CHANGED),
/* harmony export */   "EVENT_VALID_STATE_CHANGED": () => (/* binding */ EVENT_VALID_STATE_CHANGED),
/* harmony export */   "EVENT_EDITABLE_STATE_CHANGED": () => (/* binding */ EVENT_EDITABLE_STATE_CHANGED),
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
/* harmony export */   "ATTRIBUTE_MIN": () => (/* binding */ ATTRIBUTE_MIN),
/* harmony export */   "ATTRIBUTE_MAX": () => (/* binding */ ATTRIBUTE_MAX),
/* harmony export */   "ATTRIBUTE_PROGRESS": () => (/* binding */ ATTRIBUTE_PROGRESS)
/* harmony export */ });
const HTML_TAG_PREFIX = "d-";
const TRIGGER_TIMEOUT = 10;
const EVENTHANDLE_TIMEOUT = 10;
const EVENTHANDLE_INPUT_TIMEOUT = 50 * EVENTHANDLE_TIMEOUT;

const NODENAME_FORM = `${HTML_TAG_PREFIX}form`;
const NODENAME_SUBMIT_ACTION = `${HTML_TAG_PREFIX}submit-action`;


const NODENAMES = {
	Form: NODENAME_FORM,
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
	SubmitAction: NODENAME_SUBMIT_ACTION,
};

const FORMSTATE_INIT = "init";
const FORMSTATE_INPUT = "input";
const FORMSTATE_SUMMARY = "summary";
const FORMSTATE_FINISHED = "finished";
const FORMSTATES = {
	init: FORMSTATE_INIT,
	input: FORMSTATE_INPUT,
	summary: FORMSTATE_SUMMARY,
	finished: FORMSTATE_FINISHED,
};

const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

const EVENT_PREFIX = HTML_TAG_PREFIX + "form-";

const EVENT_INITIALIZE = `${EVENT_PREFIX}initialize`;
const EVENT_INITIALIZED = `${EVENT_PREFIX}initialized`;
const EVENT_FIELD_INITIALIZED = `${EVENT_PREFIX}field-initialized`;
const EVENT_INITIALIZE_SUBMIT_ACTION = `${EVENT_INITIALIZE}submit-action`;
const EVENT_SUBMIT = `${EVENT_PREFIX}submit`;
const EVENT_SUBMIT_RESULTS = `${EVENT_PREFIX}submit-results`;
const EVENT_EXECUTE_VALIDATE = `${EVENT_PREFIX}execute-validate`;
const EVENT_CONDITION_STATE_CHANGED = `${EVENT_PREFIX}condition-state-changed`;
const EVENT_ALL_PUBLISH_VALUE = `${EVENT_PREFIX}all-publish-value`;
const EVENT_VALUE_CHANGED = `${EVENT_PREFIX}field-value-changed`;
const EVENT_SITE_CHANGED = `${EVENT_PREFIX}site-changed`;
const EVENT_FORM_STATE_CHANGED = `${EVENT_PREFIX}state-changed`;
const EVENT_FIELD_INPUT = `${EVENT_PREFIX}field-input`;
const EVENT_LIST_ROW_ADD = `${EVENT_PREFIX}list-row-add`;
const EVENT_LIST_ROW_DELETE = `${EVENT_PREFIX}list-row-delete`;
const EVENT_PROGRESSBAR_CHANGED = `${EVENT_PREFIX}progress-bar-changed`;

const EVENT_ACTIVE_STATE_CHANGED = `${EVENT_PREFIX}active-state-changed`;
const EVENT_VALID_STATE_CHANGED = `${EVENT_PREFIX}valid-state-changed`;
const EVENT_EDITABLE_STATE_CHANGED = `${EVENT_PREFIX}editable-state-changed`;

const EVENTS = {
	initialize: EVENT_INITIALIZE,
	initialized: EVENT_INITIALIZED,
	fieldInitialized : EVENT_FIELD_INITIALIZED,
	/* fired by change value from an field implementation
	 * and consumed by the reference implementation of
	 * BaseField to make validation and fire valueChanged
	 * event
	 */
	input: EVENT_FIELD_INPUT,//deprecated
	fieldInput : EVENT_FIELD_INPUT,
	/* internal event for publish that a value of field has changed (event after validation) */
	valueChanged: EVENT_VALUE_CHANGED,
	/* internal event to start validation at elements -> only fired at form*/
	executeValidate: EVENT_EXECUTE_VALIDATE,
	/* */
	activeStateChanged: EVENT_ACTIVE_STATE_CHANGED,
	/* */
	conditionStateChanged: EVENT_CONDITION_STATE_CHANGED,
	/* */
	validStateChanged: EVENT_VALID_STATE_CHANGED,
	/* */
	siteChanged: EVENT_SITE_CHANGED,
	/* */
	formStateChanged: EVENT_FORM_STATE_CHANGED,
	/* */
	allPublishValue: EVENT_ALL_PUBLISH_VALUE,
	/* */
	submit: EVENT_SUBMIT,
	/* */
	submitResults: EVENT_SUBMIT_RESULTS,
	/* */
	progressbarChanged : EVENT_PROGRESSBAR_CHANGED,

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
	listRowAdd: EVENT_LIST_ROW_ADD,
	listRowDelete: EVENT_LIST_ROW_DELETE,
	
	editableStateChanged: EVENT_EDITABLE_STATE_CHANGED,

	// Other Events
	initializeSubmitAction: EVENT_INITIALIZE_SUBMIT_ACTION
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
const ATTRIBUTE_MIN = "min";
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
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");






const ATTRIBUTES = [];




const refreshValue = async (self) => {
	const data = {};
	const fields = self.fields;

	for (let field of fields) {
		if (field.condition && field.hasValue) {
			const name = field.name;
			const value = await field.value();
			if (name) (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__.valueHelper)(data, name, value);
			else Object.assign(data, value);
		}
	}

	if (Object.getOwnPropertyNames(data).length > 0) (0,_BaseField__WEBPACK_IMPORTED_MODULE_2__._value)(self, data);
	else (0,_BaseField__WEBPACK_IMPORTED_MODULE_2__._value)(self, null);
};

class Container extends _BaseField__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Container;
	}

	constructor(value = null) {
		super(value);
		this.fields = [];
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_CHANGED, (event) => {
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
		this.fields = (0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__.findFields)(this);
		if (!ready.resolved) {
			this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED, (event) => {
				const field = event.target;
				if (field != this) {				
					if (field instanceof _BaseField__WEBPACK_IMPORTED_MODULE_2__["default"]) {
						if (this.fields.indexOf(field) < 0){
							this.fields.push(field);
							refreshValue(this)
						}						
					}
					
					event.preventDefault();
					event.stopPropagation();
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
		const fields = this.fields;
		if (fields) {
			for (let field of fields) {
				if (field.name) await field.value((0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__.valueHelper)(value, field.name));
				else if (field instanceof Container) await field.value(value);
			}

			await refreshValue(this);
		}
	}

	async childValueChanged(field, chain) {
		await this.ready;

		await refreshValue(this);

		await this.validate();
		await this.publishValue(chain);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_3__["default"])(Container);
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

			this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_INITIALIZED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_CHANGED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_CONDITION_STATE_CHANGED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED], (event) => {
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

	constructor(value = null) {
		super(value);
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, (event) => {
			event.preventDefault();
			event.stopPropagation();
			const value = event.detail ? event.detail : null;
			(async () => {
				const current = await this.value();				
				if (current != value) this.value(value);
			})();
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Control */ "./src/Control.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.js");
/* harmony import */ var _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./submitActions/DefaultFormSubmitAction */ "./src/submitActions/DefaultFormSubmitAction.js");
/* harmony import */ var _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./submitActions/SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");














const _submitActions = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("submitAction");
const _state =  (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("state");

const collectData = async (self) => {
	await self.ready;
	const data = {};
	const pages = self.pages;

	for (let page of pages) {
		if (page.condition) {
			const name = page.name;
			const value = await page.value();
			const hasValue = value != null && typeof value !== "undefined";
			if (name && hasValue)  (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_12__.valueHelper)(data, name, value);
			else if (hasValue) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"].merge(data, value);
		}
	}

	return data;
};

const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_USE_SUMMARY_PAGE, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_ENDPOINT, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_METHOD, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_STATE, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

const executeActions = async (actions, data) => {
	const results = [];
	for (let action of actions) {
		const accept = await action.accept(data);
		if (accept) {
			try{
				const result = await action.execute(data) || new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__.STATE_SUCCESS);
				results.push(result);
				if (result.state == _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__.STATE_FAIL)
					return results;
			}catch(e){
				results.push(new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_11__.STATE_FAIL, e));
				return results;
			}
		}
	}
	return results;
};

class Form extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAMES.Form;
	}

	constructor() {
		super();
		_state(this, null);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_VALUE_CHANGED, (event) => {
			event.stopPropagation();
			const detail = event.detail;
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_EXECUTE_VALIDATE, detail);
		});
	}

	async init() {
		await super.init();
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.init;
		const ready = this.ready;
		if (!ready.resolved) {
			this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_USE_SUMMARY_PAGE);
			this.activePageIndex = -1;

			this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_USE_SUMMARY_PAGE);
			this.pages = this.find(_Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAMES.Page);
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_INITIALIZED);
		}

		this.activePageIndex = -1;
		if (this.pages.length > 0) this.toNextPage();
	}

	get state() {
		return _state(this);
	}

	set state(state) {
		const actual = this.state;
		if (actual == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input && state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) readonly(this, true);
		else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input && state == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		_state(this, state);

		if (actual != state) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_FORM_STATE_CHANGED);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_STATE, state);
	}

	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	async value(data) {
		if (arguments.length == 0) return collectData(this);

		await this.ready;
		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			for (let page of this.pages) {
				const name = page.name;
				//await page.value(null); // reset all values					
				if (name) await page.value( (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_12__.valueHelper)(data, name) );
				else await page.value(data);
			}
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) this.state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input;

			this.scrollIntoView();
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_SITE_CHANGED);
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
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.init) this._state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.summary;
	}

	get submitActions() {
		let actions = _submitActions(this);
		if (!actions) {
			actions = [];
			let endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_ENDPOINT);
			if (endpoint) {
				const method = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_METHOD) || "post";
				this.append(new _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_10__["default"](endpoint, method));
			}


			const childs = this.children;
			for (let child of childs) {
				if (child instanceof _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_9__["default"]) actions.push(child);
			}
			_submitActions(this, actions);
		}

		return actions;
	}

	async submit() {
		this.state = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input : _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.finished;
		const data = await this.value();

		const actions = this.submitActions;
		if (actions) {
			const results = await executeActions(actions, data);
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_SUBMIT, data);
	}
};
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__["default"])(Form);
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
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _list_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/Row */ "./src/list/Row.js");
/* harmony import */ var _list_AddRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/AddRow */ "./src/list/AddRow.js");
/* harmony import */ var _list_DeleteRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/DeleteRow */ "./src/list/DeleteRow.js");
/* harmony import */ var _list_Rows__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list/Rows */ "./src/list/Rows.js");









const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX];

const findAddButton = (list) => {
	return (0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__.treeFilter)({
		root: list,
		filter: (element) => {
			if (element instanceof _list_AddRow__WEBPACK_IMPORTED_MODULE_5__["default"]) return { accept: true, stop: true };
			else if (element instanceof _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"]) return { accept: false, stop: true };
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

class List extends _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.List;
	}

	constructor(value = null) {
		super(value);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_CHANGED, (event) => {
			const row = event.target;
			if (row instanceof _list_Row__WEBPACK_IMPORTED_MODULE_4__["default"]) {
				event.preventDefault();
				event.stopPropagation();

				const chain = event.detail;
				this.childValueChanged(row, chain);
			}
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_ADD, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { readonly} = this;
			if (!readonly) {
				const row = createRow(this);
				this.childValueChanged();
			}
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_DELETE, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { rows, readonly} = this;
			if (!readonly) {
				const row = event.target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRow);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();				
					this.childValueChanged();
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
				const { rows, min, max, readonly } = this;
				const length = rows.length;
				if (!readonly) {					
					if (length == max) addButton.disabled = true;
					else if (length < max) addButton.disabled = false;
				}
				return min <= length && length <= max;
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

	get min() {
		if (this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN))
			return Math.max(0, parseInt(this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN)));
		return 0;
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
		
		const values = [];

		for (let row of this.rows){
			const value = await row.value();
			if(value)
				values.push(value)
		}

		if(values.length > 0)
			(0,_BaseField__WEBPACK_IMPORTED_MODULE_3__._value)(this, values);
		else
			(0,_BaseField__WEBPACK_IMPORTED_MODULE_3__._value)(this, null);

		await this.validate();
		await this.publishValue(chain);
	}
}

(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_2__["default"])(List);
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
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");







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
			this.form.on(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_EXECUTE_VALIDATE, () => {
				this.update();
			});
			ready.then(() => {
				this.update();
			});
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
		await this.ready;
		const data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_4__.evaluationData)(this.reference);
		this.active = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(this.condition, data, false);
	}
}
(0,_utils_DefineElement__WEBPACK_IMPORTED_MODULE_5__["default"])(Message);
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

	constructor(value) {
		super(value);
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

			const step = target.is(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step) ? target : target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Step);

			if (!step) return;

			const state = this.form.state;
			const pages = this.form.pages;
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
			this.form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED,_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED], () => {
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

				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PROGRESSBAR_CHANGED);
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
		/*if (!valid)
			base.readonly = false;
		else */
		if (condition) {
			const test = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(condition, data, false);
			base.editable = test;
			return test;
		}
	}
	return true;
};

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
		const { hasValue, required } = base;
		const data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.evaluationData)(base);
		const initial = this.inital;
		this.inital = false;

		const conditionValid = condition ? await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(condition, data, false) : true;
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateConditionState)(base, conditionValid, initial);

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
				} else validation.active = false;
			}

			const editable = await updateReadonly({ data, valid, base, condition: editableCondition });
			if (!editable) valid = true;

			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_3__.updateValidState)(base, valid, initial);
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
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_ADD);
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
		this.trigger(100, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_DELETE);
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

/***/ "./src/submitActions/BaseSubmitAction.js":
/*!***********************************************!*\
  !*** ./src/submitActions/BaseSubmitAction.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");






// private member
const _form = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_1__.privatePropertyAccessor)("form");

// logic
class BaseSubmitAction extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	async init() {
		await super.init();
		const form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_4__.NODENAME_FORM);
		_form(this, form);
		if (form) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENT_INITIALIZE_SUBMIT_ACTION);
	}

	get form() {
		return _form(this);
	}

	async accept(data = {}) {
		const condition = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_CONDITION);
        if(condition)
            return await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__.ExpressionResolver.resolve(condition, data, false);
            
        return true;
	}

	/**
	 * Override this function!
	 */
	async execute(data = {}) {
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__["default"](_SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__.STATE_FAIL, "not implemented");
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseSubmitAction);


/***/ }),

/***/ "./src/submitActions/DefaultFormSubmitAction.js":
/*!******************************************************!*\
  !*** ./src/submitActions/DefaultFormSubmitAction.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _BaseSubmitAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");





const NODENAME = `${_Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAME_SUBMIT_ACTION}-default`;

class DefaultFormSubmitAction extends _BaseSubmitAction__WEBPACK_IMPORTED_MODULE_1__["default"] {

    static get NODENAME() { return NODENAME;}


	constructor(endpoint, method) {
		super();
		this.endpoint = endpoint;
		this.method = method;
	}

	async execute(data) {		
		let endpoint = this.endpoint;
		endpoint = await ExpressionResolver.resolveText(endpoint, data, endpoint);
		const url = new URL(endpoint, location);

		const response = await fetch(url, {
			method: this.method,
			credentials: "include",
			mode: "cors",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});		
			
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__["default"](this, response.ok ? _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_SUCCESS : _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_FAIL, response);		
	}
};

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_0__.define)(DefaultFormSubmitAction);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DefaultFormSubmitAction);


/***/ }),

/***/ "./src/submitActions/SubmitActionResult.js":
/*!*************************************************!*\
  !*** ./src/submitActions/SubmitActionResult.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATE_SUCCESS": () => (/* binding */ STATE_SUCCESS),
/* harmony export */   "STATE_FAIL": () => (/* binding */ STATE_FAIL),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const STATE_SUCCESS = "success";
const STATE_FAIL = "fail";

class SubmitActionResult {

    static get STATE_SUCCESS(){return STATE_SUCCESS;}
    static get STATE_FAIL(){return STATE_FAIL;}

    constructor(action, state, message, data){
		this.action = action;
        this.state = state;
        this.message = message;
        this.data = data;
    };    
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitActionResult);

/***/ }),

/***/ "./src/utils/DataHelper.js":
/*!*********************************!*\
  !*** ./src/utils/DataHelper.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "evaluationData": () => (/* binding */ evaluationData),
/* harmony export */   "valueHelper": () => (/* binding */ valueHelper)
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
};

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
		target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALID_STATE_CHANGED);
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
		target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_CONDITION_STATE_CHANGED);
	}
};

const updateActiveState = (target, active, initial = false) => {
	const oldState = target.active;
	active ? target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, null);
	if (oldState != active || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTIVE_STATE_CHANGED);
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
	if (oldState != editable || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_EDITABLE_STATE_CHANGED);
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
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");





const _value = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_3__.privatePropertyAccessor)("value");

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
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
				},
				false,
				true
			)
		);

		if (input.files && input.files.length != 0)
			this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
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
			return typeof value  === "object";
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
		const currentValue = _value(this);
		if (value != currentValue) {
			_value(this, value)
			if(!value)			
				this.input.value = null;

			const filename = this.filenameTarget;
			if (filename) {
				filename.empty();
				if(value){
					if (this.multiple) {
						for (let file of value) {
							filename.append(`<span>${file.name}</span>`);
						}
					}
					else
						filename.append(`<span>${value.name}</span>`);
				}
			}

		}
	}

	get value() {
		return _value(this);
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
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
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
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
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

const text = (input) => {
	return 	{
		accept: (value) => {
			return typeof value === "string"; 
		},
		getValue: () => {
			return input.value;
		},
		setValue: (value) => {
			return input.value = value; 
		},
		normalize: (value) => {
			if (value) {
				value = value.trim();
				return value.length > 0 ? value : null;
			}

			return null;
		}
	};
};
const number = (input) =>{
	return {
		accept: (value) => {
			return typeof value === "number";
		},
		getValue: () => {
			return input.valueAsNumber;
		},
		setValue: (value) =>{
			input.valueAsNumber = value;
		},
		normalize: (value) => {
			if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value) && !Number.isNaN(value)) return value;

			return null;
		},
	};
};
const date = (input) => {
	return {
		accept: (value) => {
			return value instanceof Date;
		},
		getValue: () => {
			return input.valueAsDate;
		},
		setValue: (value) => {
			input.valueAsDate = value;
		},
		normalize: (value) => {
			if (value) return value;

			return null;
		},
	};
};
const TYPES = { text, number, date, time: date, range:number };

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
		this.type = (TYPES[type] || TYPES[DEFAULTTYPE])(input);
		input.on(
			"input",
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__.toTimeoutHandle)(
				() => {
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
				},
				false,
				true,
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT
			),
		);

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.normalizeValue(this.value));
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
		const currentValue =  this.type.getValue();
		if (value != currentValue)
			this.type.setValue(value)
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.type.getValue();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLWJ1bmRsZS1kZWZhdWx0anMtaHRtbC1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxXQUFXLHFCQUFNLHlCQUF5QixxQkFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ1BOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG1CQUFtQiwrREFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxnQkFBZ0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNEJBQTRCLCtDQUErQyxJQUFJO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEk2Qjs7QUFFZDtBQUNmO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDMEI7QUFDUTtBQUNOO0FBQ0Y7QUFDSTs7QUFFdkIsa0JBQWtCLDZDQUFJLEVBQUUsaURBQVEsRUFBRSw4Q0FBSyxFQUFFLDZDQUFJLEVBQUUsK0NBQU07O0FBRXJEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNFO0FBQ1I7QUFDUTtBQUNWO0FBQ0Q7QUFDQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTElucHV0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MU2VsZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0h0bWxDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL05vZGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZUxpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvRGF0YVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvTGlzdFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL3V0aWxzL0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQmFzZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2VGaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9GaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Zvcm0uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvTGlzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9QYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9TdGVwLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvVmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL0JhY2tCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9OZXh0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VibWl0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VtbWFyeUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9BZGRSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L0RlbGV0ZVJvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9Sb3dzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvc3VibWl0QWN0aW9ucy9EZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvU3VibWl0QWN0aW9uUmVzdWx0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvRGF0YUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RlZmluZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1JhZGlvLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL21vZHVsZS1idW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcclxuXHRpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsO1xyXG5cdGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB3aW5kb3c7XHRcclxuXHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0cmV0dXJuIHt9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR0xPQkFMOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uIChhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYoIXRhcmdldClcclxuXHRcdHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciA9ICh2YXJuYW1lKSA9PiB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGYsIHZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMilcclxuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lKTtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IsIHByaXZhdGVTdG9yZX07IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9zcmMvQ29udGV4dFwiO1xuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIENvbnRleHQgfTtcbiIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0bGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHR0cnl7XHJcblx0XHRyZXN1bHQgPSBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZihtYXRjaFtNQVRDSF9FU0NBUEVEXSlcclxuXHRcdHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dOyBcclxuXHRcdFxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn1cclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XFxcIlwiLCBhRXhwcmVzc2lvbiwgXCJcXFwiOlwiLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEXHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdHRlbXAgPSB0ZW1wLnNwbGl0KG1hdGNoWzBdKS5qb2luKCk7IC8vIHJlbW92ZSBjdXJyZW50IG1hdGNoIGZvciBuZXh0IGxvb3BcclxuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQobWF0Y2hbMF0pLmpvaW4odHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAocmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCkpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHtjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb249e2RlZXA6dHJ1ZX0sIG5hbWUsIHBhcmVudH0pe1xyXG5cdFx0Y29udGV4dCA9IE9iamVjdFV0aWxzLmZpbHRlcih7ZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9ufSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7Y29udGV4dCwgbmFtZSwgcGFyZW50fSk7XHJcblx0fVxyXG59OyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlscy9VdGlsc1wiO1xyXG5cclxuVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcyA9IFV0aWxzLmdsb2JhbC5kZWZhdWx0anMgfHwge307XHJcblV0aWxzLmdsb2JhbC5kZWZhdWx0anMuZXh0ZG9tID0gVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcy5leHRkb20gfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHR1dGlscyA6IHtcclxuXHRcdFV0aWxzOiBVdGlsc1xyXG5cdH1cclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5maW5kID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIGRvY3VtZW50LmZpbmQuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwucmVhZHkgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQucmVhZHkuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwuY3JlYXRlID0gZnVuY3Rpb24oYUNvbnRlbnQsIGFzVGVtcGxhdGUpIHtcclxuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gXCJzdHJpbmdcIilcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nIVwiKTtcclxuXHRcclxuXHRjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcclxuXHR0ZW1wbGF0ZS5pbm5lckhUTUwgPSBhQ29udGVudDtcclxuXHRpZihhc1RlbXBsYXRlKVxyXG5cdFx0cmV0dXJuIHRlbXBsYXRlO1xyXG5cdFxyXG5cdHJldHVybiBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpLmNoaWxkTm9kZXM7XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwuc2NyaXB0ID0gZnVuY3Rpb24oYUZpbGUsIGFUYXJnZXQpIHtcclxuXHRpZihhRmlsZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKGFGaWxlLm1hcChmaWxlID0+IFV0aWxzLmdsb2JhbC5zY3JpcHQoZmlsZSwgYVRhcmdldCkpKTtcclxuXHRcclxuXHRpZih0eXBlb2YgYUZpbGUgPT09IFwic3RyaW5nXCIpXHRcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocixlKSA9PiB7XHJcblx0XHRcdGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcblx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XHJcblx0XHRcdHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpe3IoKX07XHJcblx0XHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJsb2FkIGVycm9yIVwiKX07XHJcblx0XHRcdCFhVGFyZ2V0ID8gZG9jdW1lbnQuYm9keS5hcHBlbmQoc2NyaXB0KSA6IGFUYXJnZXQuYXBwZW5kKHNjcmlwdCk7XHJcblx0XHRcdHNjcmlwdC5zcmMgPSBhRmlsZTtcclxuXHRcdH0pO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIkZpcnN0IHBhcmFtZXRlciBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgYSBzdHJpbmchXCIpO1xyXG59OyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBSZWFkeUV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1JlYWR5RXZlbnRTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRG9jdW1lbnQsIFF1ZXJ5U3VwcG9ydCwgUmVhZHlFdmVudFN1cHBvcnQpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZG9jdW1lbnQudHJpZ2dlcihcInJlYWR5XCIpKTtcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRG9jdW1lbnRGcmFnbWVudCwgUXVlcnlTdXBwb3J0LCBNYW5pcHVsYXRpb25TdXBwb3J0KTtcclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBBdHRyaWJ1dGVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvQXR0cmlidXRlU3VwcG9ydFwiO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShFbGVtZW50LFF1ZXJ5U3VwcG9ydCwgQXR0cmlidXRlU3VwcG9ydCwgTWFuaXB1bGF0aW9uU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XG5pbXBvcnQgRXZlbnRTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRXZlbnRTdXBwb3J0XCI7XG5cbmV4dGVuZFByb3RvdHlwZShFdmVudFRhcmdldCwgRXZlbnRTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IEh0bWxDbGFzc1N1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0XCI7XHJcbmltcG9ydCBTaG93SGlkZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTEVsZW1lbnQsIEh0bWxDbGFzc1N1cHBvcnQsIFNob3dIaWRlU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTElucHV0RWxlbWVudCxWYWx1ZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxTZWxlY3RFbGVtZW50LFZhbHVlU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTFRleHRBcmVhRWxlbWVudCxFeHRlbmRlcihcIlZhbHVlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGFyZ3VtZW50c1swXVxyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHRcclxufSkpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRGVsZWdhdGVyQnVpbGRlciBmcm9tIFwiLi4vdXRpbHMvRGVsZWdhdGVyQnVpbGRlclwiO1xyXG5pbXBvcnQgTGlzdFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxDb2xsZWN0aW9uLCBMaXN0U3VwcG9ydCk7XHJcblxyXG5IVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuYXBwbHlUbyA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBjYWxsaW5nID0gYXJncy5zaGlmdCgpO1xyXG5cdGNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlb2YgY2FsbGluZyA9PT0gXCJmdW5jdGlvblwiO1xyXG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRjb25zdCBub2RlID0gdGhpc1tpXTtcclxuXHRcdGxldFx0cmVzdWx0O1xyXG5cdFx0aWYoaXNGdW5jdGlvbilcclxuXHRcdFx0cmVzdWx0ID0gY2FsbGluZy5hcHBseShbbm9kZV0uY29uY2F0KGFyZ3MpKTtcclxuXHRcdGVsc2UgaWYodHlwZW9mIG5vZGVbY2FsbGluZ10gPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0cmVzdWx0ID0gbm9kZVtjYWxsaW5nXS5hcHBseShub2RlLCBhcmdzKTtcclxuXHRcdFxyXG5cdFx0aWYocmVzdWx0KVxyXG5cdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIHJlc3VsdHM7XHJcbn07XHJcblxyXG5IVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKTtcclxuXHRcdFx0dGhpcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBub2RlLnZhbCA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gbm9kZS52YWwoKTtcclxuXHRcdFx0XHRcdGlmKHZhbHVlKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQuc2V0KChub2RlLm5hbWUgfHwgbm9kZS5pZCB8fCBub2RlLnNlbGVjdG9yKCkpLCBub2RlLnZhbCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1x0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cdGVsc2VcclxuXHRcdEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5hcHBseVRvLmFwcGx5KHRoaXMsIFtcInZhbFwiXS5jb25jYXQoQXJyYXkuZnJvbShhcmd1bWVudHMpKSk7XHJcbn07XHJcblxyXG5IVE1MQ29sbGVjdGlvbi5mcm9tID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRsZXQgY291bnRlciA9IDA7XHJcblx0XHJcblx0d2hpbGUoYXJncy5sZW5ndGggPiAwKXtcclxuXHRcdGNvbnN0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGlmKHR5cGVvZiBhcmcgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJnICE9IG51bGwpe1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcclxuXHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZywgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdGVsc2UgaWYoYXJnIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgYXJnIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgYXJnIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYoYXJnW2ldICYmIGFyZ1tpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtcclxuXHRcdFx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmdbaV0sIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRkYXRhLmxlbmd0aCA9IHt2YWx1ZTogY291bnRlcn07XHJcblx0cmV0dXJuICBPYmplY3QuY3JlYXRlKEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZSwgZGF0YSk7XHJcbn07XHJcblxyXG5cclxuRGVsZWdhdGVyQnVpbGRlcihmdW5jdGlvbihhRnVuY3Rpb25OYW1lLCB0aGVBcmd1bWVudHMpIHtcclxuXHRsZXQgcmVzdWx0cyA9IFtdO1x0XHJcblx0dGhpcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0aWYobm9kZSAmJiB0eXBlb2Ygbm9kZVthRnVuY3Rpb25OYW1lXSA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0bGV0IHJlc3VsdCA9IG5vZGVbYUZ1bmN0aW9uTmFtZV0uYXBwbHkobm9kZSwgdGhlQXJndW1lbnRzKTtcclxuXHRcdFx0aWYocmVzdWx0KXsgXHJcblx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pXHJcblx0XHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoQXJyYXkuZnJvbShyZXN1bHQpKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0fVx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHRpZihyZXN1bHRzLmxlbmd0aCA9PT0gMClcclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0ZWxzZSBpZihyZXN1bHRzWzBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgcmVzdWx0c1swXSBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKVxyXG5cdFx0cmV0dXJuIEhUTUxDb2xsZWN0aW9uLmZyb20uYXBwbHkobnVsbCwgcmVzdWx0cyk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIHJlc3VsdHM7XHJcbn0sSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLCBOb2RlLnByb3RvdHlwZSwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgRWxlbWVudC5wcm90b3R5cGUsIEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XHJcbiIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRGF0YVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9EYXRhU3VwcG9ydFwiO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShOb2RlLERhdGFTdXBwb3J0LE1hbmlwdWxhdGlvblN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRGVsZWdhdGVyQnVpbGRlciBmcm9tIFwiLi4vdXRpbHMvRGVsZWdhdGVyQnVpbGRlclwiO1xyXG5pbXBvcnQgTGlzdFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKE5vZGVMaXN0LCBMaXN0U3VwcG9ydCk7XHJcblxyXG5Ob2RlTGlzdC5wcm90b3R5cGUuYXBwbHlUbyA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBjYWxsaW5nID0gYXJncy5zaGlmdCgpO1xyXG5cdGNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlb2YgY2FsbGluZyA9PT0gXCJmdW5jdGlvblwiO1xyXG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRjb25zdCBub2RlID0gdGhpc1tpXTtcclxuXHRcdGxldFx0cmVzdWx0O1xyXG5cdFx0aWYoaXNGdW5jdGlvbilcclxuXHRcdFx0cmVzdWx0ID0gY2FsbGluZy5hcHBseShbbm9kZV0uY29uY2F0KGFyZ3MpKTtcclxuXHRcdGVsc2UgaWYodHlwZW9mIG5vZGVbY2FsbGluZ10gPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0cmVzdWx0ID0gbm9kZVtjYWxsaW5nXS5hcHBseShub2RlLCBhcmdzKTtcclxuXHRcdFxyXG5cdFx0aWYocmVzdWx0KVxyXG5cdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIHJlc3VsdHM7XHJcbn07XHJcblxyXG5Ob2RlTGlzdC5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKTtcclxuXHRcdFx0dGhpcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBub2RlLnZhbCA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gbm9kZS52YWwoKTtcclxuXHRcdFx0XHRcdGlmKHZhbHVlKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQuc2V0KChub2RlLm5hbWUgfHwgbm9kZS5pZCB8fCBub2RlLnNlbGVjdG9yKCkpLCBub2RlLnZhbCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1x0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cdGVsc2VcclxuXHRcdE5vZGVMaXN0LnByb3RvdHlwZS5hcHBseVRvLmFwcGx5KHRoaXMsIFtcInZhbFwiXS5jb25jYXQoQXJyYXkuZnJvbShhcmd1bWVudHMpKSk7XHJcbn07XHJcblxyXG5Ob2RlTGlzdC5mcm9tID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRsZXQgY291bnRlciA9IDA7XHJcblx0XHJcblx0d2hpbGUoYXJncy5sZW5ndGggPiAwKXtcclxuXHRcdGNvbnN0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGlmKHR5cGVvZiBhcmcgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJnICE9IG51bGwpe1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0ZWxzZSBpZihhcmcgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBhcmcgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbiB8fCBhcmcgaW5zdGFuY2VvZiBBcnJheSl7XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRpZihhcmdbaV0gJiYgYXJnW2ldIGluc3RhbmNlb2YgTm9kZSl7XHJcblx0XHRcdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnW2ldLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0ZGF0YS5sZW5ndGggPSB7dmFsdWU6IGNvdW50ZXJ9O1xyXG5cdHJldHVybiAgT2JqZWN0LmNyZWF0ZShOb2RlTGlzdC5wcm90b3R5cGUsIGRhdGEpO1xyXG59O1xyXG5cclxuXHJcbkRlbGVnYXRlckJ1aWxkZXIoZnVuY3Rpb24oYUZ1bmN0aW9uTmFtZSwgdGhlQXJndW1lbnRzKSB7XHJcblx0bGV0IHJlc3VsdHMgPSBbXTtcdFxyXG5cdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdGlmKG5vZGUgJiYgdHlwZW9mIG5vZGVbYUZ1bmN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5vZGVbYUZ1bmN0aW9uTmFtZV0uYXBwbHkobm9kZSwgdGhlQXJndW1lbnRzKTtcclxuXHRcdFx0aWYocmVzdWx0KXsgXHJcblx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgTm9kZUxpc3QpXHJcblx0XHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoQXJyYXkuZnJvbShyZXN1bHQpKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0fVx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHRpZihyZXN1bHRzLmxlbmd0aCA9PT0gMClcclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0ZWxzZSBpZihyZXN1bHRzWzBdIGluc3RhbmNlb2YgTm9kZSB8fCByZXN1bHRzWzBdIGluc3RhbmNlb2YgTm9kZUxpc3QpXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShyZXN1bHRzKTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxufSxOb2RlTGlzdC5wcm90b3R5cGUsIE5vZGUucHJvdG90eXBlLCBIVE1MRWxlbWVudC5wcm90b3R5cGUsIEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlLCBFbGVtZW50LnByb3RvdHlwZSwgRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcclxuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiQXR0cmlidXRlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGVzKCkgPyAoKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cdFx0XHRcdHRoaXMuZ2V0QXR0cmlidXRlTmFtZXMoKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cdFx0XHRcdFx0cmVzdWx0W25hbWVdID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0fSkoKSA6IHVuZGVmaW5lZDtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGFyZ3VtZW50c1swXSk7XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInVuZGVmaW5lZFwiIHx8IGFyZ3VtZW50c1sxXSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiRGF0YVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmRhdGFzZXQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdGZvciAobmFtZSBpbiB0aGlzLmRhdGFzZXQpXHJcblx0XHRcdFx0ZGF0YVtuYW1lXSA9IHRoaXMuZGF0YXNldFtuYW1lXTtcclxuXHJcblx0XHR0aGlzLmRhdGEgPSAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0XHRyZXR1cm4gZGF0YVthcmd1bWVudHNbMF1dO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInVuZGVmaW5lZFwiIHx8IGFyZ3VtZW50c1sxXSA9PSBudWxsKVxyXG5cdFx0XHRcdGRlbGV0ZSBkYXRhW2FyZ3VtZW50c1swXV07XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRkYXRhW2FyZ3VtZW50c1swXV0gPSBhcmd1bWVudHNbMV07XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0pLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwMDtcclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiRXZlbnRTdXBwb3J0XCIsIChQcm90b3R5cGUpID0+IHtcclxuXHRjb25zdCBFVkVOVFNQTElURVIgPSAvKFxccyspfChcXHMqLFxccyopLztcclxuXHRjb25zdCBnZXRXcmFwcGVySGFuZGxlTWFwID0gKGVsZW1lbnQpID0+IHtcclxuXHRcdGlmICghZWxlbWVudC5fX3dyYXBwZXJoYW5kbGVtYXBfXykgZWxlbWVudC5fX3dyYXBwZXJoYW5kbGVtYXBfXyA9IG5ldyBNYXAoKTtcclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5fX3dyYXBwZXJoYW5kbGVtYXBfXztcclxuXHR9O1xyXG5cclxuXHRjb25zdCBnZXRUcmlnZ2VyVGltZW91dHMgPSAoZWxlbWVudCkgPT4ge1xyXG5cdFx0aWYgKCFlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fKSBlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fID0ge307XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX187XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVtb3ZlV3JhcHBlciA9IChlbGVtZW50LCBkYXRhLCBldmVudFR5cGVzKSA9PiB7XHJcblx0XHRjb25zdCB7IHdyYXBwZXIsIG9wdGlvbiwgZXZlbnRzLCBoYW5kbGUgfSA9IGRhdGE7XHJcblx0XHRjb25zdCBjYXB0dXJlID0gb3B0aW9uLmNhcHR1cmU7XHJcblx0XHRpZiAoZXZlbnRUeXBlcykge1xyXG5cdFx0XHRldmVudFR5cGVzID0gdHlwZW9mIGV2ZW50VHlwZXMgPT09IFwic3RyaW5nXCIgPyBldmVudFR5cGVzLnNwbGl0KEVWRU5UU1BMSVRFUikgOiBldmVudFR5cGVzO1xyXG5cdFx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudFR5cGVzKSB7XHJcblx0XHRcdFx0Y29uc3QgaW5kZXggPSBldmVudHMuaW5kZXhPZihldmVudCk7XHJcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgY2FwdHVyZSk7XHJcblx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGV2ZW50cy5sZW5ndGggPT0gMCkgZ2V0V3JhcHBlckhhbmRsZU1hcChlbGVtZW50KS5kZWxldGUoaGFuZGxlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBjYXB0dXJlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRnZXRXcmFwcGVySGFuZGxlTWFwKGVsZW1lbnQpLmRlbGV0ZShoYW5kbGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwiVG9vIGxlc3MgYXJndW1lbnRzIVwiKTtcclxuXHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGV2ZW50cyA9IHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiID8gYXJncy5zaGlmdCgpLnNwbGl0KEVWRU5UU1BMSVRFUikgOiBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCBmaWx0ZXIgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRjb25zdCBoYW5kbGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCBvcHRpb24gPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgY2FwdHVyZTogZmFsc2UsIG9uY2U6IGZhbHNlLCBwYXNzaXZlOiBmYWxzZSB9IDogdHlwZW9mIGFyZ3NbMF0gPT09IFwiYm9vbGVhblwiID8geyBjYXB0dXJlOiBhcmdzLnNoaWZ0KCksIG9uY2U6IGZhbHNlLCBwYXNzaXZlOiBmYWxzZSB9IDogYXJncy5zaGlmdCgpO1xyXG5cdFx0Y29uc3Qgd3JhcHBlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoZmlsdGVyKSB7XHJcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0LmlzID09PSBcImZ1bmN0aW9uXCIgJiYgIXRhcmdldC5pcyhmaWx0ZXIpKSByZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gaGFuZGxlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcblx0XHRcdGlmIChvcHRpb24ub25jZSkgcmVtb3ZlV3JhcHBlcih0aGlzLCB3cmFwcGVyKTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblxyXG5cdFx0Z2V0V3JhcHBlckhhbmRsZU1hcCh0aGlzKS5zZXQoaGFuZGxlLCB7IGhhbmRsZSwgd3JhcHBlcjogd3JhcHBlciwgZXZlbnRzLCBvcHRpb24gfSk7XHJcblxyXG5cdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XHJcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgb3B0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUucmVtb3ZlT24gPSBmdW5jdGlvbiAoaGFuZGxlLCBldmVudCwgY2FwdHVyZSkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IGdldFdyYXBwZXJIYW5kbGVNYXAodGhpcykuZ2V0KGhhbmRsZSk7XHJcblx0XHRpZiAoZGF0YSkgcmVtb3ZlV3JhcHBlcih0aGlzLCBkYXRhLCBldmVudCk7XHJcblx0XHRlbHNlIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihoYW5kbGUsIGV2ZW50LCBjYXB0dXJlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRjb25zdCB0aW1lb3V0ID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwibnVtYmVyXCIgPyBhcmdzLnNoaWZ0KCkgOiAtMTtcclxuXHRcdGlmICh0aW1lb3V0ID49IDApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IGFyZ3NbMF07XHJcblx0XHRcdGNvbnN0IHRpbWVvdXRzID0gZ2V0VHJpZ2dlclRpbWVvdXRzKHRoaXMpO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0aWQgPSB0aW1lb3V0c1t0eXBlXTtcclxuXHRcdFx0aWYgKHRpbWVvdXRpZCkgY2xlYXJUaW1lb3V0KHRpbWVvdXRpZCk7XHJcblxyXG5cdFx0XHR0aW1lb3V0c1t0eXBlXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGRlbGV0ZSB0aW1lb3V0c1t0eXBlXTtcclxuXHRcdFx0XHR0aGlzLnRyaWdnZXIuYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdH0sIHRpbWVvdXQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0Y29uc3QgZGVsZWdhdGUgPSBhcmdzWzBdIGluc3RhbmNlb2YgRXZlbnQgPyBhcmdzLnNoaWZ0KCkgOiBudWxsO1xyXG5cdFx0XHRjb25zdCBkYXRhID0gYXJncy5sZW5ndGggPj0gMSA/IChhcmdzLmxlbmd0aCA9PSAxID8gYXJncy5zaGlmdCgpIDogYXJncykgOiBkZWxlZ2F0ZTtcclxuXHRcdFx0Y29uc3QgZXZlbnQgPSBkYXRhID8gbmV3IEN1c3RvbUV2ZW50KHR5cGUsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgY29tcG9zZWQ6IHRydWUsIGRldGFpbDogZGF0YSB9KSA6IG5ldyBFdmVudCh0eXBlLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xyXG5cclxuXHRcdFx0aWYgKGRlbGVnYXRlKSBldmVudC5kZWxlZ2F0ZWRFdmVudCA9IGRlbGVnYXRlO1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkh0bWxDbGFzc1N1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LmFkZChjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsY2xhenogPT4gdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgY2xhenogPT4gdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsIGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJMaXN0U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHRcclxuXHRQcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdGlmKHRoaXNbaV0gPT0gYXJndW1lbnRzWzBdKVxyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUubWFwID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbMF07XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvVXRpbHNcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIk1hbmlwdWxhdGlvblN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgbm9kZXMgPSB0aGlzLmNoaWxkTm9kZXNcclxuXHRcdHdoaWxlKG5vZGVzLmxlbmd0aCAhPSAwKVx0XHRcdFxyXG5cdFx0XHRub2Rlc1swXS5yZW1vdmUodHJ1ZSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmNvbnRlbnQgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGROb2RlcztcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcImJvb2xlYW5cIilcclxuXHRcdFx0aWYoYXJndW1lbnRzWzBdKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLm91dGVySFRNTDtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgXHJcblx0XHRcdEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZW1wdHkoKTtcclxuXHRcdFx0XHRpZih0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdGVsc2UgaWYoY29udGVudCBpbnN0YW5jZW9mIE5vZGUgfHwgY29udGVudCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbil7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1x0XHRcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zdCBhcHBlbmQgPSBQcm90b3R5cGUuYXBwZW5kQ2hpbGQuYmluZCh0aGlzKTtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRsZXQgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoYXJnKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdGNyZWF0ZShhcmcpLmZvckVhY2goYXBwZW5kKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChhcHBlbmQpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxuXHRQcm90b3R5cGUuYXBwZW5kID0gYXBwZW5kO1xyXG5cdFxyXG5cdGNvbnN0IHByZXBlbmQgPSBmdW5jdGlvbihhRmlyc3RFbGVtZW50LCBhRWxlbWVudCl7XHJcblx0XHR0aGlzLmluc2VydEJlZm9yZShhRWxlbWVudCwgYUZpcnN0RWxlbWVudCk7XHJcblx0fTtcclxuXHRQcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID09IDApXHJcblx0XHRcdGFwcGVuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IGZpcnN0ID0gdGhpcy5jaGlsZE5vZGVzLmZpcnN0KCk7XHJcblx0XHRcdGNvbnN0IGluc2VydCA9IHByZXBlbmQuYmluZCh0aGlzLCBmaXJzdCk7XHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGNvbnN0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdFx0aW5zZXJ0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0KTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA8IDEpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkluc3VmZmljaWVudCBhcmd1bWVudHMhIE9uZSBvciB0d28gbm9kZXMgcmVxdWlyZWQhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzLnBhcmVudE5vZGUgOiB0aGlzO1xyXG5cdFx0Y29uc3Qgb2xkTm9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHRoaXMgOiBhcmd1bWVudHNbMF07XHJcblx0XHRjb25zdCBuZXdOb2RlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzWzFdO1xyXG5cdFx0XHJcblx0XHRpZihuZXdOb2RlIGluc3RhbmNlb2YgQXJyYXkgfHwgbmV3Tm9kZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IG5ld05vZGUgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbil7XHJcblx0XHRcdG5ld05vZGUuZm9yRWFjaChhSXRlbSA9PiBwYXJlbnQuaW5zZXJ0QmVmb3JlKGFJdGVtLCBvbGROb2RlKSk7XHJcblx0XHRcdG9sZE5vZGUucmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3Tm9kZSxvbGROb2RlKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGFmdGVyIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLm5leHRTaWJsaW5nO1xyXG5cdFx0aWYobmV4dClcclxuXHRcdFx0UHJvdG90eXBlLmJlZm9yZS5hcHBseShuZXh0LCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRQcm90b3R5cGUuYXBwZW5kLmFwcGx5KHBhcmVudCwgYXJndW1lbnRzKTtcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGFmdGVyIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGNvbnN0IGluc2VydGVyID0gKG5vZGUpID0+IHtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMpO31cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRjb25zdCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0aW5zZXJ0ZXIoYXJnKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydGVyKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnRlcik7XHJcblx0XHR9XHJcblx0fTtcdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBwYXJlbnRTZWxlY3RvciA9IC86cGFyZW50KFxcKFxcXCIoW15cXCldKilcXFwiXFwpKT8vaTtcclxuY29uc3QgcXVlcnlFeGVjdXRlciA9IGZ1bmN0aW9uIChhRWxlbWVudCwgYVNlbGVjdG9yKSB7XHJcblx0bGV0IG1hdGNoID0gcGFyZW50U2VsZWN0b3IuZXhlYyhhU2VsZWN0b3IpO1xyXG5cdGlmIChtYXRjaCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IGFFbGVtZW50O1xyXG5cdFx0aWYgKG1hdGNoLmluZGV4ID4gMCkge1xyXG5cdFx0XHRyZXN1bHQgPSBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvci5zdWJzdHIoMCwgbWF0Y2guaW5kZXgpKTtcclxuXHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmVzdWx0ID0gcmVzdWx0LnBhcmVudChtYXRjaFsyXSk7XHJcblx0XHRpZiAocmVzdWx0KSB7XHJcblx0XHRcdGxldCBuZXh0U2VsZWN0b3IgPSBhU2VsZWN0b3Iuc3Vic3RyKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKS50cmltKCk7XHJcblx0XHRcdGlmIChuZXh0U2VsZWN0b3IubGVuZ3RoID4gMCkgcmVzdWx0ID0gcmVzdWx0LmZpbmQobmV4dFNlbGVjdG9yKTtcclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0fSBlbHNlIHJldHVybiBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvcik7XHJcbn07XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJRdWVyeVN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdFByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0bGV0IG5vZGVzID0gW107XHJcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHR3aGlsZSAoYXJnKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0bGV0IHJlc3VsdCA9IHF1ZXJ5RXhlY3V0ZXIodGhpcywgYXJnKTtcclxuXHRcdFx0XHRpZiAocmVzdWx0KSBub2Rlcy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmVzdWx0ID0gTm9kZUxpc3QuZnJvbS5hcHBseShudWxsLCBub2Rlcyk7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiBmYWxzZTtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXMubWF0Y2hlcyhhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRcdGxldCBmaWx0ZXIgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspIGlmICh0aGlzLm1hdGNoZXMoZmlsdGVyW2ldKSkgcmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHJldHVybiB0aGlzLmlzKEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpIHtcclxuXHRcdGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm4gbnVsbDtcclxuXHRcdGlnbm9yZVNoYWRvd1Jvb3QgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiYm9vbGVhblwiID8gc2VsZWN0b3IgOiBpZ25vcmVTaGFkb3dSb290O1xyXG5cdFx0c2VsZWN0b3IgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgPyBzZWxlY3RvciA6IG51bGw7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290ICYmIGlnbm9yZVNoYWRvd1Jvb3QpIHBhcmVudCA9IHBhcmVudC5ob3N0O1xyXG5cclxuXHRcdGlmIChzZWxlY3Rvcikge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgIXBhcmVudC5pcyhzZWxlY3RvcikpIHBhcmVudCA9IHBhcmVudC5wYXJlbnQoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcInRoaXM6XCIsIHRoaXMsIFwicGFyZW50OlwiLCBwYXJlbnQsIFwiZXJyb3I6XCIsIGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5wYXJlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0bGV0IHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdFx0cmVzdWx0LnB1c2gocGFyZW50KTtcclxuXHRcdFx0cGFyZW50ID0gUHJvdG90eXBlLnBhcmVudC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0KTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuc2VsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50IHx8IHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5pZCkgcmV0dXJuIFwiI1wiICsgdGhpcy5pZDtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgc2VsZWN0b3IgPSB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50KCk7XHJcblx0XHRcdGlmIChwYXJlbnQpIHtcclxuXHRcdFx0XHRsZXQgc2FtZVRhZ1NpYmxpbmdzID0gcGFyZW50LmZpbmQoXCI6c2NvcGU+XCIgKyBzZWxlY3Rvcik7XHJcblx0XHRcdFx0aWYgKHNhbWVUYWdTaWJsaW5ncyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XHJcblx0XHRcdFx0XHRsZXQgaW5kZXggPSBzYW1lVGFnU2libGluZ3MuaW5kZXhPZih0aGlzKTtcclxuXHRcdFx0XHRcdGlmIChpbmRleCA+IDApIHNlbGVjdG9yICs9IFwiOm50aC1jaGlsZChcIiArIChpbmRleCArIDEpICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBwYXJlbnRTZWxlY3RvciA9IHBhcmVudC5zZWxlY3RvcigpO1xyXG5cdFx0XHRcdHJldHVybiBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgXCI+XCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzZWxlY3RvcjtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb3Nlc3RzKGFRdWVyeSkuZmlyc3QoKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuY2xvc2VzdHMgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChyZXN1bHQubGVuZ3RoICE9IDApIHJldHVybiByZXN1bHQ7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuXHRcdGlmIChwYXJlbnQpIHJldHVybiBwYXJlbnQuY2xvc2VzdHMoYVF1ZXJ5KTtcclxuXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShbXSk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLm5lc3RlZCA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGlmICh0aGlzLmlzKGFRdWVyeSkpIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMpO1xyXG5cclxuXHRcdGxldCBuZXN0ZWQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChuZXN0ZWQgJiYgbmVzdGVkLmxlbmd0aCA+IDApIHJldHVybiBuZXN0ZWQ7XHJcblx0XHRlbHNlIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMucGFyZW50KGFRdWVyeSkpO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJSZWFkeUV2ZW50U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGFGdW5jdGlvbiwgb25jZSl7XHRcclxuXHRcdHRoaXMub24oXCJyZWFkeVwiLCBhRnVuY3Rpb24sIG9uY2UpO1xyXG5cdFx0aWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpXHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcInJlYWR5XCIpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBISURFVkFMVUUgPSBcIm5vbmVcIjtcclxuXHJcbmNvbnN0IGlzSGlkZGVuID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSBISURFVkFMVUVcclxufTtcclxuXHJcbmNvbnN0IGluaXQgPSAoZWxlbWVudCkgPT4ge1x0XHJcblx0bGV0IGRpc3BsYXkgPSAhaXNIaWRkZW4oZWxlbWVudCkgPyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgOiBcIlwiO1xyXG5cdFxyXG5cdGVsZW1lbnQuc2hvdyA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9KS5iaW5kKGVsZW1lbnQpO1xyXG5cdFxyXG5cdGVsZW1lbnQuaGlkZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gSElERVZBTFVFO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblx0XHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiU2hvd0hpZGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLnNob3cuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaW5pdCh0aGlzKS5oaWRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUudG9nZ2xlU2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGlzSGlkZGVuKHRoaXMpID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcclxuXHR9O1xyXG5cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgSW5wdXRUeXBlcyA9IFtcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwic2VsZWN0XCIsXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRpZihvcHRpb24uc2VsZWN0ZWQpXHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbigpe1x0XHRcdFx0XHJcblx0XHRcdGxldCB2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0d2hpbGUoYXJnKXtcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGFyZykpXHJcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goYXJnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlcztcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlcy5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMCk7XHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHRcdFx0XHJcblx0fSxcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXVwiLFxyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYodGhpcy52YWx1ZSA9PSBcIm9uXCIgfHwgdGhpcy52YWx1ZSA9PSBcIm9mZlwiKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNoZWNrZWQ7XHJcblx0XHRcdGVsc2UgaWYodGhpcy5jaGVja2VkKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1x0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oYVZhbHVlKXtcclxuXHRcdFx0aWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdGhpcy52YWx1ZSA9PSBhVmFsdWU7XHJcblx0XHRcdGVsc2UgaWYoQXJyYXkuaXNBcnJheShhVmFsdWUpKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID49IDA7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXTtcclxuXHJcbmNvbnN0IERlZmF1bHRJbnB1dFR5cGUgPSB7XHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gYVZhbHVlO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuXHRcdH1cdFxyXG59O1xyXG5cclxuY29uc3QgZ2V0SW5wdXRUeXBlID0gZnVuY3Rpb24oYUVsZW1lbnQpe1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBJbnB1dFR5cGVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0aWYoYUVsZW1lbnQuaXMoSW5wdXRUeXBlc1tpXS5zZWxlY3RvcikpXHJcblx0XHRcdHJldHVybiBJbnB1dFR5cGVzW2ldO1x0XHRcclxuXHRyZXR1cm4gRGVmYXVsdElucHV0VHlwZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCB0eXBlID0gZ2V0SW5wdXRUeXBlKHRoaXMpO1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdHlwZS5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dHlwZS5zZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBcIi4vZG9tL0V2ZW50VGFyZ2V0XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVcIjtcclxuaW1wb3J0IFwiLi9kb20vRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudEZyYWdtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxJbnB1dEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTFRleHRBcmVhRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MU2VsZWN0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Ob2RlTGlzdFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IdG1sQ29sbGVjdGlvblwiO1xyXG5pbXBvcnQgXCIuL0dsb2JhbFwiO1xyXG4iLCJjb25zdCBEZWxlZ2F0ZXJCdWlsZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBjYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBzb3VyY2UgPSBhcmdzLnNoaWZ0KCk7XHJcblx0YXJncy5mb3JFYWNoKCB0YXJnZXQgPT57XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXHJcblx0XHQuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0Y29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBuYW1lKTtcclxuXHRcdFx0aWYgKHR5cGVvZiBzb3VyY2VbbmFtZV0gPT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHByb3AudmFsdWUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRzb3VyY2VbbmFtZV0gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgbmFtZSwgYXJndW1lbnRzKTtcclxuXHRcdFx0XHR9O1x0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZWdhdGVyQnVpbGRlcjsiLCJjb25zdCBleHRlbmRQcm90b3R5cGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBleHRlbmRlciA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGV4dGVuZGVyKHR5cGUpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuZFByb3RvdHlwZTsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IEVYVEVOU0lPTlNfTUFQID0gVXRpbHMuZ2xvYmFsVmFyKFwiX19fRE9NX0FQSV9FWFRFTlNJT05fTUFQX19fXCIsIHt9KTtcclxuY29uc3QgRXh0ZW5kZXIgPSBmdW5jdGlvbihhTmFtZSwgYUV4dGVudGlvbil7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKGFUeXBlKXtcdFxyXG5cdFx0bGV0IGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFthVHlwZS5uYW1lXTtcclxuXHRcdGlmKCFleHRlbnNpb25zKVxyXG5cdFx0XHRleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbYVR5cGUubmFtZV0gPSB7fTtcdFx0XHJcblx0XHRcclxuXHRcdGlmKCFleHRlbnNpb25zW2FOYW1lXSl7XHJcblx0XHRcdGV4dGVuc2lvbnNbYU5hbWVdID0gdHJ1ZTtcclxuXHRcdFx0YUV4dGVudGlvbihhVHlwZS5wcm90b3R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJkdXBsaWNhdGVkIGxvYWQgb2YgZXh0ZW5zaW9uIFxcXCJcIiArIGFOYW1lICsgXCJcXFwiIVwiKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlcjsiLCJjb25zdCBVdGlscyA9IHtcclxuXHRnbG9iYWwgOiAoKCkgPT4ge1xyXG5cdFx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcclxuXHRcdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0XHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0XHRyZXR1cm4ge307XHRcdFxyXG5cdH0pKCksXHJcblx0Z2xvYmFsVmFyIDogZnVuY3Rpb24oYU5hbWUsIGFJbml0VmFsdWUpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgVXRpbHMuZ2xvYmFsW2FOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0VXRpbHMuZ2xvYmFsW2FOYW1lXSA9IGFJbml0VmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiBVdGlscy5nbG9iYWxbYU5hbWVdO1x0XHRcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiLCJpbXBvcnQgQ29tcG9uZW50ICwge2NvbXBvbmVudEJhc2VPZn0gZnJvbSBcIi4vc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IHtkZWZpbmV9IGZyb20gXCIuL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXJcIjtcblxuZXhwb3J0IHtDb21wb25lbnQsIGNvbXBvbmVudEJhc2VPZiwgZGVmaW5lfTtcbiIsImltcG9ydCB7cHJpdmF0ZVByb3BlcnR5LCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcbmltcG9ydCB7IGxhenlQcm9taXNlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlsc1wiO1xuaW1wb3J0IHsgdXVpZCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9VVUlEXCI7XG5pbXBvcnQgeyBpbml0VGltZW91dCwgdHJpZ2dlclRpbWVvdXQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSwgY29tcG9uZW50RXZlbnRuYW1lIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcblxuY29uc3QgX3JlYWR5ID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJyZWFkeVwiKTtcblxuY29uc3QgVElNRU9VVFMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgaW5pdCA9IChjb21wb25lbnQpID0+IHtcblx0bGV0IHRpbWVvdXQgPSBUSU1FT1VUUy5nZXQoY29tcG9uZW50KTtcblx0aWYgKHRpbWVvdXQpIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuXHRUSU1FT1VUUy5nZXQoY29tcG9uZW50LCBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRUSU1FT1VUUy5kZWxldGUoY29tcG9uZW50KTtcblx0XHR0cnl7XG5cdFx0XHRhd2FpdCBjb21wb25lbnQuaW5pdCgpO1xuXHRcdFx0Y29tcG9uZW50LnJlYWR5LnJlc29sdmUoKTtcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBjb21wb25lbnQhXCIsIGNvbXBvbmVudCwgZSk7XG5cdFx0XHRjb21wb25lbnQucmVhZHkocmVzb2x2ZShlKSk7XG5cdFx0fVxuXHRcdGNvbXBvbmVudC50cmlnZ2VyKGNvbXBvbmVudEV2ZW50bmFtZShcImluaXRpYWx6ZWRcIiwgY29tcG9uZW50KSk7XG5cdH0sIGluaXRUaW1lb3V0KSk7XHRcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVSUQgPSAocHJlZml4LCBzdWZmaXgpID0+IHtcblx0bGV0IGNvdW50ID0gMDtcblx0bGV0IGlkID0gbnVsbDtcbiAgICB3aGlsZShjb3VudCA8IDEwMCl7XG5cdFx0aWQgPSBgJHtwcmVmaXggPyBwcmVmaXggOiBcIlwifSR7dXVpZCgpfSR7c3VmZml4ID8gc3VmZml4IDogXCJcIn1gO1xuXHRcdGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpXG5cdFx0XHRyZXR1cm4gaWQ7XG5cblx0XHRjb3VudCsrO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcblx0cmV0dXJuIGlkO1xufTtcblxuXG5cbmNvbnN0IGJ1aWxkQ2xhc3MgPSAoaHRtbEJhc2VUeXBlKSA9Pntcblx0cmV0dXJuIGNsYXNzIENvbXBvbmVudCBleHRlbmRzIGh0bWxCYXNlVHlwZSB7XG5cdFx0Y29uc3RydWN0b3Ioe3NoYWRvd1Jvb3QgPSBmYWxzZSwgY29udGVudCA9IG51bGwsIGNyZWF0ZVVJRCA9IGZhbHNlLCB1aWRQcmVmaXggPSBcImlkLVwiLCB1aWRTdWZmaXggPSBcIlwifSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0X3JlYWR5KHRoaXMsIGxhenlQcm9taXNlKCkpO1xuXHRcblx0XHRcdGlmKGNyZWF0ZVVJRClcblx0XHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cdFxuXHRcdFx0aWYoc2hhZG93Um9vdClcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6b3Blbn0pO1xuXHRcdFx0XG5cdFx0XHRpZihjb250ZW50KVxuXHRcdFx0XHR0aGlzLnJvb3QuYXBwZW5kKHR5cGVvZiBjb250ZW50ID09PSBcImZ1bmN0aW9uXCIgPyBjb250ZW50KHRoaXMpIDogY29udGVudCk7XG5cdFx0fVxuXHRcblx0XHRnZXQgcm9vdCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc2hhZG93Um9vdCB8fCB0aGlzO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJlYWR5KCl7XG5cdFx0XHRyZXR1cm4gX3JlYWR5KHRoaXMpO1xuXHRcdH1cblx0XG5cdFx0YXN5bmMgaW5pdCgpIHt9XG5cdFxuXHRcdGFzeW5jIGRlc3Ryb3koKSB7XG5cdFx0XHRpZih0aGlzLnJlYWR5LnJlc29sdmVkKVxuXHRcdFx0X3JlYWR5KHRoaXMsIGxhenlQcm9taXNlKCkpO1xuXHRcdH1cblx0XG5cdFx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHRpZiAodGhpcy5vd25lckRvY3VtZW50ID09IGRvY3VtZW50KSBpbml0KHRoaXMpO1xuXHRcdH1cblx0XG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblx0XG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpe1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xufSBcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZihjbGF6eiA9PSBudWxsKXtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59XG5cbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTAwO1xyXG5leHBvcnQgY29uc3QgdHJpZ2dlclRpbWVvdXQgPSAxMDA7XHJcbiIsImltcG9ydCB7IGNvbXBvbmVudFByZWZpeCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHRvTm9kZU5hbWUgPSAobmFtZSwgcHJlZml4KSA9PiB7XG5cdGlmKHR5cGVvZiBwcmVmaXggPT09IFwic3RyaW5nXCIpXG5cdFx0cmV0dXJuIHByZWZpeCArIG5hbWU7XG5cdFx0XG5cdHJldHVybiBjb21wb25lbnRQcmVmaXggKyBuYW1lO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlZmluZSA9IGZ1bmN0aW9uKGNsYXp6LCBvcHRpb25zKSB7XG5cdGNvbnN0IG5vZGVuYW1lID0gY2xhenouTk9ERU5BTUU7XG5cdGlmICghY3VzdG9tRWxlbWVudHMuZ2V0KG5vZGVuYW1lKSkge1xuXHRcdGN1c3RvbUVsZW1lbnRzLmRlZmluZShub2RlbmFtZSwgY2xhenosIG9wdGlvbnMpO1xuXHR9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZTsgXG4iLCJpbXBvcnQge2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRFdmVudG5hbWUgPSAoZXZlbnRUeXBlLCBub2RlICkgPT4ge1x0XG5cdGxldCBub2RlbmFtZSA9IFwidW5zdXBwb3J0ZWRcIjtcblx0aWYodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlO1xuXHRlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcblx0XHRub2RlbmFtZSA9IG5vZGUubm9kZU5hbWU7XG5cdGVsc2UgaWYodHlwZW9mIG5vZGUuTk9ERU5BTUUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlLk5PREVOQU1FO1xuXHRlbHNlIHRocm93IG5ldyBFcnJvcihgJHt0eXBlb2Ygbm9kZX0gaXMgbm90IHN1cHBvcnRlZCBhcyBwYXJhbWV0ZXIgXCJub2RlXCIhYCk7XG5cdFxuICAgcmV0dXJuIGAke25vZGVuYW1lLnRvTG93ZXJDYXNlKCl9OiR7ZXZlbnRUeXBlfWA7Ly91c2UgQCBhcyBzZXBhcnRvciBhbmQgbm90IDpcbn07XG5cblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUgKSA9PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudEV2ZW50bmFtZShgJHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0tJHthdHRyaWJ1dGV9YCwgbm9kZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9IiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FUywgXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxuXHRBVFRSSUJVVEVfUkVBRE9OTFksIFxuXHRBVFRSSUJVVEVfQ09ORElUSU9OLCBcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXG5cdEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXG5cdEFUVFJJQlVURV9WQUxJRCwgXG5cdEFUVFJJQlVURV9JTlZBTElELCBcblx0QVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgXG5cdEFUVFJJQlVURV9FRElUQUJMRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcblxuY29uc3QgX2Zvcm0gPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcImZvcm1cIik7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZLCBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT05dO1xuXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1x0XHRcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHR9XG5cblx0Z2V0IGZvcm0oKSB7XG5cdFx0bGV0IGZvcm0gPSBfZm9ybSh0aGlzKTtcblx0XHRpZiAoIWZvcm0pIHtcblx0XHRcdGZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0XHRfZm9ybSh0aGlzLCBmb3JtKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZvcm07XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcblx0XHRcdHRoaXMuYWN0aXZlVXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdGFjdGl2ZVVwZGF0ZWQoKSB7fVxuXG5cdGdldCByZWFkb25seSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHVwZGF0ZUVkaXRhYmxlU3RhdGUodGhpcywgIXJlYWRvbmx5LCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XG5cdFx0dGhpcy5yZWFkb25seVVwZGF0ZWQoKTtcblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHt9XG5cblx0Z2V0IGVkaXRhYmxlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRURJVEFCTEUpO1xuXHR9XG5cblx0c2V0IGVkaXRhYmxlKGVkaXRhYmxlKSB7XG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCBlZGl0YWJsZSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xuXHRcdHRoaXMuZWRpdGFibGVVcGRhdGVkKCk7XG5cdH1cblxuXHRlZGl0YWJsZVVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5yZWFkb25seVVwZGF0ZWQoKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQpO1xuXHR9XG5cblx0Y29uZGl0aW9uVXBkYXRlZCgpIHt9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVkFMSUQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsXG5cdEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9FWEVDVVRFX1ZBTElEQVRFLFxuXHRFVkVOVF9BTExfUFVCTElTSF9WQUxVRSxcblx0RVZFTlRfVkFMVUVfQ0hBTkdFRCxcblx0QVRUUklCVVRFX05BTUUsIFxuXHRBVFRSSUJVVEVfUkVRVUlSRUQsIFxuXHRBVFRSSUJVVEVfTk9WQUxVRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi9WYWxpZGF0b3JcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuXG5cbmNvbnN0IF9wYXJlbnQgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInBhcmVudFwiKTtcbmV4cG9ydCBjb25zdCBfdmFsdWUgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInZhbHVlXCIpO1xuY29uc3QgX3ZhbGlkYXRvciA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwidmFsaWRhdG9yXCIpO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9OT1ZBTFVFXTtcblxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRGaWVsZCA9IChmaWVsZCkgPT4ge1xuXHRsZXQgcGFyZW50ID0gZmllbGQucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiBwYXJlbnQ7XG5cblx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHVwZGF0ZUhhc1ZhbHVlID0gKGhhc1ZhbHVlLCBmaWVsZCkgPT4ge1xuXHRmaWVsZC5hdHRyKEFUVFJJQlVURV9OT1ZBTFVFLCAhaGFzVmFsdWUgPyBcIlwiIDogbnVsbCk7XG59O1xuXG5jbGFzcyBCYXNlRmllbGQgZXh0ZW5kcyBCYXNlIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2Uub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlID0gbnVsbCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcblxuXHRcdHRoaXMub24oRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsIChldmVudCkgPT4ge1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcdFx0XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcdFx0XG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0X3BhcmVudCh0aGlzLCBmaW5kUGFyZW50RmllbGQodGhpcykpO1xuXHRcdFx0X3ZhbGlkYXRvcih0aGlzLCBuZXcgVmFsaWRhdG9yKHRoaXMpKTtcdFx0XHRcblx0XHRcdFxuXHRcdFx0dGhpcy5mb3JtLm9uKEVWRU5UX0VYRUNVVEVfVkFMSURBVEUsIGFzeW5jIChldmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjaGFpbiA9IGV2ZW50LmRldGFpbDtcblx0XHRcdFx0aWYgKGNoYWluLmluZGV4T2YodGhpcykgPCAwKSB7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudCA9IHRoaXMudmFsaWQ7XG5cdFx0XHRcdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XG5cdFx0XHRcdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQgIT0gdmFsaWQgJiYgY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVF9BTExfUFVCTElTSF9WQUxVRSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlYWR5LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfRklFTERfSU5JVElBTElaRUQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVhZHkudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XHRcdFx0XG5cdFx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IHZhbGlkYXRvcigpIHtcblx0XHRyZXR1cm4gX3ZhbGlkYXRvcih0aGlzKTtcblx0fVxuXG5cdGdldCBwYXJlbnRGaWVsZCgpIHtcblx0XHRyZXR1cm4gX3BhcmVudCh0aGlzKTtcblx0fVxuXG5cdGNvbmRpdGlvblVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5hY3RpdmUgPSB0aGlzLmNvbmRpdGlvbjtcblx0XHQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHR9KSgpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcblx0fVxuXG5cdGdldCByZXF1aXJlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFUVVJUkVEKTtcblx0fVxuXG5cdGdldCBoYXNWYWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IF92YWx1ZSh0aGlzKTtcblx0XHRyZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCI7XG5cdH1cblxuXHRhc3luYyB2YWx1ZSh2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApIHJldHVybiBfdmFsdWUodGhpcyk7XG5cblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblxuXHRcdGlmIChhd2FpdCB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT0gdmFsdWUpIHtcblx0XHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcblx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVkVmFsdWUodmFsdWUpO1x0XHRcdFx0XG5cdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcblx0XHR1cGRhdGVIYXNWYWx1ZSh0aGlzLmhhc1ZhbHVlLCB0aGlzKTtcblx0XHRpZiAoIXRoaXMudmFsaWRhdG9yKSByZXR1cm4gZmFsc2U7XG5cblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKCk7XHRcdFxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXG5cdGFzeW5jIHB1Ymxpc2hWYWx1ZShjaGFpbiA9IFtdKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRjaGFpbi5wdXNoKHRoaXMpO1xuXHRcdGlmICh0aGlzLnBhcmVudEZpZWxkKSBhd2FpdCB0aGlzLnBhcmVudEZpZWxkLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIGNoYWluKTtcblx0XHRlbHNlIHRoaXMudHJpZ2dlcihFVkVOVF9WQUxVRV9DSEFOR0VELCBjaGFpbik7XG5cdH1cblxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUoKSB7fVxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChjaGlsZCwgY2hhaW4pIHt9XG59XG5leHBvcnQgZGVmYXVsdCBCYXNlRmllbGQ7XG4iLCJleHBvcnQgY29uc3QgSFRNTF9UQUdfUFJFRklYID0gXCJkLVwiO1xuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX1RJTUVPVVQgPSAxMDtcbmV4cG9ydCBjb25zdCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUID0gNTAgKiBFVkVOVEhBTkRMRV9USU1FT1VUO1xuXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfRk9STSA9IGAke0hUTUxfVEFHX1BSRUZJWH1mb3JtYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9TVUJNSVRfQUNUSU9OID0gYCR7SFRNTF9UQUdfUFJFRklYfXN1Ym1pdC1hY3Rpb25gO1xuXG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRVMgPSB7XG5cdEZvcm06IE5PREVOQU1FX0ZPUk0sXG5cdENvbnRyb2w6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbFwiLFxuXHRCYWNrQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtYmFja1wiLFxuXHROZXh0QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtbmV4dFwiLFxuXHRTdW1tYXJ5QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtc3VtbWFyeVwiLFxuXHRTdWJtaXRCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1zdWJtaXRcIixcblx0Q2FuY2VsQnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtY2FuY2VsXCIsXG5cdFBhZ2U6IEhUTUxfVEFHX1BSRUZJWCArIFwicGFnZVwiLFxuXHRGaWVsZDogSFRNTF9UQUdfUFJFRklYICsgXCJmaWVsZFwiLFxuXHRXcmFwcGVyRmllbGQ6IEhUTUxfVEFHX1BSRUZJWCArIFwid3JhcHBlci1maWVsZFwiLFxuXHRMaXN0OiBIVE1MX1RBR19QUkVGSVggKyBcImxpc3RcIixcblx0TGlzdFJvd3M6IEhUTUxfVEFHX1BSRUZJWCArIFwicm93c1wiLFxuXHRMaXN0Um93OiBIVE1MX1RBR19QUkVGSVggKyBcInJvd1wiLFxuXHRCdXR0b25BZGRSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiYWRkLXJvd1wiLFxuXHRCdXR0b25EZWxldGVSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwiZGVsZXRlLXJvd1wiLFxuXHRDb250YWluZXI6IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udGFpbmVyXCIsXG5cdFZhbGlkYXRpb246IEhUTUxfVEFHX1BSRUZJWCArIFwidmFsaWRhdGlvblwiLFxuXHRNZXNzYWdlOiBIVE1MX1RBR19QUkVGSVggKyBcIm1lc3NhZ2VcIixcblx0UHJvZ3Jlc3NCYXI6IEhUTUxfVEFHX1BSRUZJWCArIFwicHJvZ3Jlc3MtYmFyXCIsXG5cdFN0ZXA6IEhUTUxfVEFHX1BSRUZJWCArIFwic3RlcFwiLFxuXHRTdWJtaXRBY3Rpb246IE5PREVOQU1FX1NVQk1JVF9BQ1RJT04sXG59O1xuXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0lOSVQgPSBcImluaXRcIjtcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5QVVQgPSBcImlucHV0XCI7XG5leHBvcnQgY29uc3QgRk9STVNUQVRFX1NVTU1BUlkgPSBcInN1bW1hcnlcIjtcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfRklOSVNIRUQgPSBcImZpbmlzaGVkXCI7XG5leHBvcnQgY29uc3QgRk9STVNUQVRFUyA9IHtcblx0aW5pdDogRk9STVNUQVRFX0lOSVQsXG5cdGlucHV0OiBGT1JNU1RBVEVfSU5QVVQsXG5cdHN1bW1hcnk6IEZPUk1TVEFURV9TVU1NQVJZLFxuXHRmaW5pc2hlZDogRk9STVNUQVRFX0ZJTklTSEVELFxufTtcblxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEU1RBVEVTID0ge1xuXHRhbHdheXM6IFwiYWx3YXlzXCIsXG5cdG9uQWN0aXZlOiBcIm9uLWFjdGl2ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1BSRUZJWCA9IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybS1cIjtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkUgPSBgJHtFVkVOVF9QUkVGSVh9aW5pdGlhbGl6ZWA7XG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9aW5pdGlhbGl6ZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLWluaXRpYWxpemVkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04gPSBgJHtFVkVOVF9JTklUSUFMSVpFfXN1Ym1pdC1hY3Rpb25gO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVCA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVF9SRVNVTFRTID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdC1yZXN1bHRzYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9FWEVDVVRFX1ZBTElEQVRFID0gYCR7RVZFTlRfUFJFRklYfWV4ZWN1dGUtdmFsaWRhdGVgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWNvbmRpdGlvbi1zdGF0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9BTExfUFVCTElTSF9WQUxVRSA9IGAke0VWRU5UX1BSRUZJWH1hbGwtcHVibGlzaC12YWx1ZWA7XG5leHBvcnQgY29uc3QgRVZFTlRfVkFMVUVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC12YWx1ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9TSVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c2l0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c3RhdGUtY2hhbmdlZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5QVVQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5wdXRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0FERCA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1hZGRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0RFTEVURSA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1kZWxldGVgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9cHJvZ3Jlc3MtYmFyLWNoYW5nZWRgO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9YWN0aXZlLXN0YXRlLWNoYW5nZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWQtc3RhdGUtY2hhbmdlZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1lZGl0YWJsZS1zdGF0ZS1jaGFuZ2VkYDtcblxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IHtcblx0aW5pdGlhbGl6ZTogRVZFTlRfSU5JVElBTElaRSxcblx0aW5pdGlhbGl6ZWQ6IEVWRU5UX0lOSVRJQUxJWkVELFxuXHRmaWVsZEluaXRpYWxpemVkIDogRVZFTlRfRklFTERfSU5JVElBTElaRUQsXG5cdC8qIGZpcmVkIGJ5IGNoYW5nZSB2YWx1ZSBmcm9tIGFuIGZpZWxkIGltcGxlbWVudGF0aW9uXG5cdCAqIGFuZCBjb25zdW1lZCBieSB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mXG5cdCAqIEJhc2VGaWVsZCB0byBtYWtlIHZhbGlkYXRpb24gYW5kIGZpcmUgdmFsdWVDaGFuZ2VkXG5cdCAqIGV2ZW50XG5cdCAqL1xuXHRpbnB1dDogRVZFTlRfRklFTERfSU5QVVQsLy9kZXByZWNhdGVkXG5cdGZpZWxkSW5wdXQgOiBFVkVOVF9GSUVMRF9JTlBVVCxcblx0LyogaW50ZXJuYWwgZXZlbnQgZm9yIHB1Ymxpc2ggdGhhdCBhIHZhbHVlIG9mIGZpZWxkIGhhcyBjaGFuZ2VkIChldmVudCBhZnRlciB2YWxpZGF0aW9uKSAqL1xuXHR2YWx1ZUNoYW5nZWQ6IEVWRU5UX1ZBTFVFX0NIQU5HRUQsXG5cdC8qIGludGVybmFsIGV2ZW50IHRvIHN0YXJ0IHZhbGlkYXRpb24gYXQgZWxlbWVudHMgLT4gb25seSBmaXJlZCBhdCBmb3JtKi9cblx0ZXhlY3V0ZVZhbGlkYXRlOiBFVkVOVF9FWEVDVVRFX1ZBTElEQVRFLFxuXHQvKiAqL1xuXHRhY3RpdmVTdGF0ZUNoYW5nZWQ6IEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VELFxuXHQvKiAqL1xuXHRjb25kaXRpb25TdGF0ZUNoYW5nZWQ6IEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELFxuXHQvKiAqL1xuXHR2YWxpZFN0YXRlQ2hhbmdlZDogRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcblx0LyogKi9cblx0c2l0ZUNoYW5nZWQ6IEVWRU5UX1NJVEVfQ0hBTkdFRCxcblx0LyogKi9cblx0Zm9ybVN0YXRlQ2hhbmdlZDogRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHQvKiAqL1xuXHRhbGxQdWJsaXNoVmFsdWU6IEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFLFxuXHQvKiAqL1xuXHRzdWJtaXQ6IEVWRU5UX1NVQk1JVCxcblx0LyogKi9cblx0c3VibWl0UmVzdWx0czogRVZFTlRfU1VCTUlUX1JFU1VMVFMsXG5cdC8qICovXG5cdHByb2dyZXNzYmFyQ2hhbmdlZCA6IEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQsXG5cblx0Ly9vbGQgbmVlZCB0byBiZSByZWZhY3RvcmVkXG5cblx0YWRkZWQ6IEVWRU5UX1BSRUZJWCArIFwiYWRkZWRcIixcblx0Y2hhbmdlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZVwiLFxuXHRjaGFuZ2VBdHRyaWJ1dGVFdmVudEJ1aWxkZXI6IChuYW1lKSA9PiB7XG5cdFx0cmV0dXJuIEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWF0dHJpYnV0ZS1cIiArIG5hbWU7XG5cdH0sXG5cdGNoYW5nZUFjdGl2ZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtYWN0aXZlXCIsXG5cdGNoYW5nZVZhbHVlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWx1ZVwiLFxuXHRjaGFuZ2VDb25kaXRpb246IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWNvbmRpdGlvblwiLFxuXHRjaGFuZ2VWYWxpZGF0aW9uOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS12YWxpZGF0aW9uXCIsXG5cblx0Ly9MSVNUIEVWRU5UU1xuXHRsaXN0Um93QWRkOiBFVkVOVF9MSVNUX1JPV19BREQsXG5cdGxpc3RSb3dEZWxldGU6IEVWRU5UX0xJU1RfUk9XX0RFTEVURSxcblx0XG5cdGVkaXRhYmxlU3RhdGVDaGFuZ2VkOiBFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxuXG5cdC8vIE90aGVyIEV2ZW50c1xuXHRpbml0aWFsaXplU3VibWl0QWN0aW9uOiBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT05cbn07XG5cblxuXG5leHBvcnQgY29uc3QgU1BFQ0lBTFZBUlMgPSB7XG5cdENVUlJFTlRWQUxVRTogXCIkdmFsdWVcIixcblx0Q1VSUkVOVExJU1RST1c6IFwiJGl0ZW1cIixcbn07XG5cbi8vQVRUUklCVVRFU1xuXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05BTUUgPSBcIm5hbWVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRU5EUE9JTlQgPSBcImVuZHBvaW50XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01FVEhPRCA9IFwibWV0aG9kXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1NUQVRFID0gXCJzdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1NURVAgPSBcInN0ZXBcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSA9IFwidXNlLXN1bW1hcnktcGFnZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCA9IFwiaW5wdXQtbW9kZS1hZnRlci1zdWJtaXRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRUQgPSBcInJlcXVpcmVkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEX09OX0FDVElWRV9PTkxZID0gXCJyZXF1aXJlZC1vbi1hY3RpdmUtb25seVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEUgPSBcImVkaXRhYmxlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiA9IFwiZWRpdGFibGUtY29uZGl0aW9uXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFQURPTkxZID0gXCJyZWFkb25seVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OT1ZBTFVFID0gXCJuby12YWx1ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9WQUxJRCA9IFwidmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5WQUxJRCA9IFwiaW52YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQgPSBcImNvbmRpdGlvbi12YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCA9IFwiY29uZGl0aW9uLWludmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUlOID0gXCJtaW5cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUFYID0gXCJtYXhcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUFJPR1JFU1MgPSBcInByb2dyZXNzXCI7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLFxuXHRFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCxcblx0RVZFTlRfVkFMVUVfQ0hBTkdFRCxcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBmaW5kRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCB7IHZhbHVlSGVscGVyIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5cblxuXG5cbmNvbnN0IHJlZnJlc2hWYWx1ZSA9IGFzeW5jIChzZWxmKSA9PiB7XG5cdGNvbnN0IGRhdGEgPSB7fTtcblx0Y29uc3QgZmllbGRzID0gc2VsZi5maWVsZHM7XG5cblx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG5cdFx0aWYgKGZpZWxkLmNvbmRpdGlvbiAmJiBmaWVsZC5oYXNWYWx1ZSkge1xuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGF3YWl0IGZpZWxkLnZhbHVlKCk7XG5cdFx0XHRpZiAobmFtZSkgdmFsdWVIZWxwZXIoZGF0YSwgbmFtZSwgdmFsdWUpO1xuXHRcdFx0ZWxzZSBPYmplY3QuYXNzaWduKGRhdGEsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID4gMCkgX3ZhbHVlKHNlbGYsIGRhdGEpO1xuXHRlbHNlIF92YWx1ZShzZWxmLCBudWxsKTtcbn07XG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5Db250YWluZXI7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcih2YWx1ZSk7XG5cdFx0dGhpcy5maWVsZHMgPSBbXTtcblx0XHR0aGlzLm9uKEVWRU5UX1ZBTFVFX0NIQU5HRUQsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRjb25zdCBjaGFpbiA9IGV2ZW50LmRldGFpbDtcblx0XHRcdFx0dGhpcy5jaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgY2hhaW4pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuZmllbGRzID0gZmluZEZpZWxkcyh0aGlzKTtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLm9uKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpZWxkcy5pbmRleE9mKGZpZWxkKSA8IDApe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmZpZWxkcy5wdXNoKGZpZWxkKTtcblx0XHRcdFx0XHRcdFx0cmVmcmVzaFZhbHVlKHRoaXMpXG5cdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLnZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyBkYXRhLCBiYXNlIH0pID0+IHtcblx0XHRcdFx0Y29uc3QgeyBmaWVsZHMgfSA9IGJhc2U7XG5cdFx0XHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBmaWVsZHMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGZpZWxkLmNvbmRpdGlvbiAmJiAhZmllbGQudmFsaWQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XG5cdFx0aWYgKGZpZWxkcylcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdFx0fVxuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRjb25zdCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcblx0XHRpZiAoZmllbGRzKSB7XG5cdFx0XHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcblx0XHRcdFx0aWYgKGZpZWxkLm5hbWUpIGF3YWl0IGZpZWxkLnZhbHVlKHZhbHVlSGVscGVyKHZhbHVlLCBmaWVsZC5uYW1lKSk7XG5cdFx0XHRcdGVsc2UgaWYgKGZpZWxkIGluc3RhbmNlb2YgQ29udGFpbmVyKSBhd2FpdCBmaWVsZC52YWx1ZSh2YWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IHJlZnJlc2hWYWx1ZSh0aGlzKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgY2hhaW4pIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXG5cdFx0YXdhaXQgcmVmcmVzaFZhbHVlKHRoaXMpO1xuXG5cdFx0YXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGNoYWluKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KENvbnRhaW5lcik7XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iLCJpbXBvcnQgeyBcblx0Rk9STVNUQVRFUywgXG5cdE5PREVOQU1FUywgXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxuXHRFVkVOVF9WQUxVRV9DSEFOR0VELFxuXHRFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCxcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9TSVRFX0NIQU5HRURcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBcIi4vY29udHJvbHNcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQlVUVE9ORFVNTVkgPSB7XG5cdGFjdGl2ZTogdHJ1ZSxcblx0ZGlzYWJsZWQ6IHRydWUsXG59O1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQ29udHJvbDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRpZiAoIXRoaXMucmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMuZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdHRoaXMuYmFjayA9IHRoaXMuZmluZChOT0RFTkFNRVMuQmFja0J1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMubmV4dCA9IHRoaXMuZmluZChOT0RFTkFNRVMuTmV4dEJ1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMuc3VtbWFyeSA9IHRoaXMuZmluZChOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMuc3VibWl0ID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdWJtaXRCdXR0b24pLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihbRVZFTlRfSU5JVElBTElaRUQsIEVWRU5UX1ZBTFVFX0NIQU5HRUQsIEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCwgRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsIEVWRU5UX1NJVEVfQ0hBTkdFRF0sIChldmVudCkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdGNvbnN0IHsgYmFjaywgbmV4dCwgc3VtbWFyeSwgc3VibWl0LCBmb3JtIH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgYWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBuZXh0UGFnZSwgcGFnZXMsIHVzZVN1bW1hcnlQYWdlLCBzdGF0ZSB9ID0gZm9ybTtcblxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XG5cdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdW1tYXJ5LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xuXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XG5cblx0XHRcdGlmIChuZXh0UGFnZSB8fCAoIWFjdGl2ZVBhZ2UudmFsaWQgJiYgYWN0aXZlUGFnZUluZGV4ICsgMSA8IHBhZ2VzLmxlbmd0aCkpIHtcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKHVzZVN1bW1hcnlQYWdlICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdFx0c3VtbWFyeS5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdW1tYXJ5LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5kZWZpbmVFbGVtZW50KENvbnRyb2wpO1xuZXhwb3J0IGRlZmF1bHQgQ29udHJvbDtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRfRklFTERfSU5QVVQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgeyBmaW5kV3JhcHBlciB9IGZyb20gXCIuL3dyYXBwZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtcImZpbGUtZm9ybWF0XCJdO1xuXG5jbGFzcyBGaWVsZCBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5GaWVsZDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlID0gbnVsbCkge1xuXHRcdHN1cGVyKHZhbHVlKTtcblx0XHR0aGlzLm9uKEVWRU5UX0ZJRUxEX0lOUFVULCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsID8gZXZlbnQuZGV0YWlsIDogbnVsbDtcblx0XHRcdChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnQgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XHRcdFx0XHRcblx0XHRcdFx0aWYgKGN1cnJlbnQgIT0gdmFsdWUpIHRoaXMudmFsdWUodmFsdWUpO1xuXHRcdFx0fSkoKTtcblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSBmaW5kV3JhcHBlcih0aGlzKTtcblx0XHRcdGlmICh0aGlzLndyYXBwZXIpXG5cdFx0XHRcdHRoaXMudmFsaWRhdG9yLmFkZEN1c3RvbUNoZWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy53cmFwcGVyLnZhbGlkO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XG5cdFx0aWYgKHRoaXMud3JhcHBlcikgdGhpcy53cmFwcGVyLnJlYWRvbmx5ID0gdGhpcy5yZWFkb25seTtcblx0fVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRoaXMud3JhcHBlciA/IHRoaXMud3JhcHBlci5hY2NlcHRWYWx1ZSh2YWx1ZSkgOiBmYWxzZTtcblx0fVxuXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMud3JhcHBlcikgcmV0dXJuIHRoaXMud3JhcHBlci5ub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGlmICh0aGlzLndyYXBwZXIpIGF3YWl0IHRoaXMud3JhcHBlci51cGRhdGVkVmFsdWUodmFsdWUpO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoRmllbGQpO1xuZXhwb3J0IGRlZmF1bHQgRmllbGQ7XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IHtcblx0Rk9STVNUQVRFUyxcblx0Tk9ERU5BTUVTLFxuXHRFVkVOVF9JTklUSUFMSVpFRCxcblx0RVZFTlRfVkFMVUVfQ0hBTkdFRCxcblx0RVZFTlRfRVhFQ1VURV9WQUxJREFURSxcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXG5cdEVWRU5UX1NVQk1JVCxcblx0RVZFTlRfU1VCTUlUX1JFU1VMVFMsXG5cdEFUVFJJQlVURV9OQU1FLFxuXHRBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSxcblx0QVRUUklCVVRFX0VORFBPSU5ULFxuXHRBVFRSSUJVVEVfTUVUSE9ELFxuXHRBVFRSSUJVVEVfU1RBVEUsXG5cdEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xuaW1wb3J0IFwiLi9QYWdlXCI7XG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGZyb20gXCIuL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwsIFNUQVRFX1NVQ0NFU1MgYXMgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcbmltcG9ydCB7IHZhbHVlSGVscGVyIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuXG5jb25zdCBfc3VibWl0QWN0aW9ucyA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwic3VibWl0QWN0aW9uXCIpO1xuY29uc3QgX3N0YXRlID0gIHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwic3RhdGVcIik7XG5cbmNvbnN0IGNvbGxlY3REYXRhID0gYXN5bmMgKHNlbGYpID0+IHtcblx0YXdhaXQgc2VsZi5yZWFkeTtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRjb25zdCBwYWdlcyA9IHNlbGYucGFnZXM7XG5cblx0Zm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuXHRcdGlmIChwYWdlLmNvbmRpdGlvbikge1xuXHRcdFx0Y29uc3QgbmFtZSA9IHBhZ2UubmFtZTtcblx0XHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgcGFnZS52YWx1ZSgpO1xuXHRcdFx0Y29uc3QgaGFzVmFsdWUgPSB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcblx0XHRcdGlmIChuYW1lICYmIGhhc1ZhbHVlKSAgdmFsdWVIZWxwZXIoZGF0YSwgbmFtZSwgdmFsdWUpO1xuXHRcdFx0ZWxzZSBpZiAoaGFzVmFsdWUpIE9iamVjdFV0aWxzLm1lcmdlKGRhdGEsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFLCBBVFRSSUJVVEVfRU5EUE9JTlQsIEFUVFJJQlVURV9NRVRIT0QsIEFUVFJJQlVURV9TVEFURSwgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUXTtcblxuY29uc3QgcmVhZG9ubHkgPSAoZm9ybSwgcmVhZG9ubHkpID0+IHtcblx0Zm9yIChsZXQgcGFnZSBvZiBmb3JtLnBhZ2VzKSB7XG5cdFx0cGFnZS5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdHBhZ2UuYWN0aXZlID0gcmVhZG9ubHk7XG5cdH1cbn07XG5cbmNvbnN0IGV4ZWN1dGVBY3Rpb25zID0gYXN5bmMgKGFjdGlvbnMsIGRhdGEpID0+IHtcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRmb3IgKGxldCBhY3Rpb24gb2YgYWN0aW9ucykge1xuXHRcdGNvbnN0IGFjY2VwdCA9IGF3YWl0IGFjdGlvbi5hY2NlcHQoZGF0YSk7XG5cdFx0aWYgKGFjY2VwdCkge1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb24uZXhlY3V0ZShkYXRhKSB8fCBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTKTtcblx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdGlmIChyZXN1bHQuc3RhdGUgPT0gQUNUSU9OX1NVQk1JVF9TVEFURV9GQUlMKVxuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZXN1bHRzLnB1c2gobmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgZSkpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuRm9ybTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0X3N0YXRlKHRoaXMsIG51bGwpO1xuXG5cdFx0dGhpcy5vbihFVkVOVF9WQUxVRV9DSEFOR0VELCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0Y29uc3QgZGV0YWlsID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0VYRUNVVEVfVkFMSURBVEUsIGRldGFpbCk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5pbml0O1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcblxuXHRcdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcblx0XHRcdHRoaXMucGFnZXMgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLlBhZ2UpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0lOSVRJQUxJWkVEKTtcblx0XHR9XG5cblx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xuXHRcdGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA+IDApIHRoaXMudG9OZXh0UGFnZSgpO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiBfc3RhdGUodGhpcyk7XG5cdH1cblxuXHRzZXQgc3RhdGUoc3RhdGUpIHtcblx0XHRjb25zdCBhY3R1YWwgPSB0aGlzLnN0YXRlO1xuXHRcdGlmIChhY3R1YWwgPT0gRk9STVNUQVRFUy5pbnB1dCAmJiBzdGF0ZSAhPSBGT1JNU1RBVEVTLmlucHV0KSByZWFkb25seSh0aGlzLCB0cnVlKTtcblx0XHRlbHNlIGlmIChhY3R1YWwgIT0gRk9STVNUQVRFUy5pbnB1dCAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRyZWFkb25seSh0aGlzLCBmYWxzZSk7XG5cdFx0XHRpZiAodGhpcy5hY3RpdmVQYWdlKSB0aGlzLmFjdGl2ZVBhZ2UuYWN0aXZlID0gdHJ1ZTtcblx0XHR9XG5cdFx0X3N0YXRlKHRoaXMsIHN0YXRlKTtcblxuXHRcdGlmIChhY3R1YWwgIT0gc3RhdGUpIHRoaXMudHJpZ2dlcihFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfU1RBVEUsIHN0YXRlKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIGlmIChwYWdlLmNvbmRpdGlvbiAmJiAhcGFnZS52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyB2YWx1ZShkYXRhKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIGNvbGxlY3REYXRhKHRoaXMpO1xuXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIHtcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHBhZ2UubmFtZTtcblx0XHRcdFx0Ly9hd2FpdCBwYWdlLnZhbHVlKG51bGwpOyAvLyByZXNldCBhbGwgdmFsdWVzXHRcdFx0XHRcdFxuXHRcdFx0XHRpZiAobmFtZSkgYXdhaXQgcGFnZS52YWx1ZSggdmFsdWVIZWxwZXIoZGF0YSwgbmFtZSkgKTtcblx0XHRcdFx0ZWxzZSBhd2FpdCBwYWdlLnZhbHVlKGRhdGEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmVQYWdlKCkge1xuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZVBhZ2U7XG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCB8fCB0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdGlmIChjdXJyZW50KSBjdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XG5cdFx0XHRwYWdlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVTLmlucHV0KSB0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblxuXHRcdFx0dGhpcy5zY3JvbGxJbnRvVmlldygpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NJVEVfQ0hBTkdFRCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHByZXZQYWdlKCkge1xuXHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xuXHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXQgbmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMucGFnZXMpIHtcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gdGhpcy5wYWdlc1tpXTtcblx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhc3luYyB0b1ByZXZQYWdlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBwcmV2ID0gYXdhaXQgdGhpcy5wcmV2UGFnZTtcblx0XHRcdGlmIChwcmV2KSB0aGlzLmFjdGl2ZVBhZ2UgPSBwcmV2O1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XG5cdFx0Y29uc3QgbmV4dCA9IGF3YWl0IHRoaXMubmV4dFBhZ2U7XG5cdFx0aWYgKG5leHQpIHtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVTLmluaXQpIHRoaXMuX3N0YXRlID0gRk9STVNUQVRFUy5pbnB1dDtcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcblx0XHRcdHRoaXMuc3VtbWFyeSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHN1bW1hcnkoKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuc3VtbWFyeTtcblx0fVxuXG5cdGdldCBzdWJtaXRBY3Rpb25zKCkge1xuXHRcdGxldCBhY3Rpb25zID0gX3N1Ym1pdEFjdGlvbnModGhpcyk7XG5cdFx0aWYgKCFhY3Rpb25zKSB7XG5cdFx0XHRhY3Rpb25zID0gW107XG5cdFx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmF0dHIoQVRUUklCVVRFX0VORFBPSU5UKTtcblx0XHRcdGlmIChlbmRwb2ludCkge1xuXHRcdFx0XHRjb25zdCBtZXRob2QgPSB0aGlzLmF0dHIoQVRUUklCVVRFX01FVEhPRCkgfHwgXCJwb3N0XCI7XG5cdFx0XHRcdHRoaXMuYXBwZW5kKG5ldyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbihlbmRwb2ludCwgbWV0aG9kKSk7XG5cdFx0XHR9XG5cblxuXHRcdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5jaGlsZHJlbjtcblx0XHRcdGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcykge1xuXHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBCYXNlU3VibWl0QWN0aW9uKSBhY3Rpb25zLnB1c2goY2hpbGQpO1xuXHRcdFx0fVxuXHRcdFx0X3N1Ym1pdEFjdGlvbnModGhpcywgYWN0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjdGlvbnM7XG5cdH1cblxuXHRhc3luYyBzdWJtaXQoKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCkgPyBGT1JNU1RBVEVTLmlucHV0IDogRk9STVNUQVRFUy5maW5pc2hlZDtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xuXG5cdFx0Y29uc3QgYWN0aW9ucyA9IHRoaXMuc3VibWl0QWN0aW9ucztcblx0XHRpZiAoYWN0aW9ucykge1xuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IGV4ZWN1dGVBY3Rpb25zKGFjdGlvbnMsIGRhdGEpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NVQk1JVF9SRVNVTFRTLCByZXN1bHRzKTtcblx0XHR9XG5cblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlULCBkYXRhKTtcblx0fVxufTtcbmRlZmluZUVsZW1lbnQoRm9ybSk7XG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRF07XG5cbmNsYXNzIEZvcm1CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBpbml0KGJ1dHRvbikge1xuXHRcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0XHR0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0dGhpcy5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuZGlzYWJsZWQpIHRoaXMuZXhlY3V0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5mb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBudWxsKTtcblx0fVxuXG5cdGdldCBkaXNhYmxlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0RJU0FCTEVEKTtcblx0fVxuXG5cdHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuXHRcdGRpc2FibGVkID8gdGhpcy5hdHRyKEFUVFJJQlVURV9ESVNBQkxFRCwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBudWxsKTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJleGVjdXRlXCIpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtQnV0dG9uO1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FUywgXG5cdEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELFxuXHRFVkVOVF9WQUxVRV9DSEFOR0VELFxuXHRFVkVOVF9MSVNUX1JPV19BREQsXG5cdEVWRU5UX0xJU1RfUk9XX0RFTEVURSxcblx0QVRUUklCVVRFX01JTiwgXG5cdEFUVFJJQlVURV9NQVggXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCBCYXNlRmllbGQsIHsgX3ZhbHVlIH0gZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgUm93IGZyb20gXCIuL2xpc3QvUm93XCI7XG5pbXBvcnQgQWRkUm93IGZyb20gXCIuL2xpc3QvQWRkUm93XCI7XG5pbXBvcnQgXCIuL2xpc3QvRGVsZXRlUm93XCI7XG5pbXBvcnQgXCIuL2xpc3QvUm93c1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9NSU4sIEFUVFJJQlVURV9NQVhdO1xuXG5jb25zdCBmaW5kQWRkQnV0dG9uID0gKGxpc3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3Q6IGxpc3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBZGRSb3cpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pWzBdO1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gYXN5bmMgKGxpc3QsIHZhbHVlKSA9PiB7XG5cdGNvbnN0IHsgY29udGFpbmVyLCB0ZW1wbGF0ZSB9ID0gbGlzdDtcblx0Y29uc3Qgcm93ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKS5jaGlsZHJlblswXTtcblx0Y29udGFpbmVyLmFwcGVuZChyb3cpO1xuXG5cdGlmICh2YWx1ZSkgYXdhaXQgcm93LnZhbHVlKHZhbHVlKTtcblxuXHRyZXR1cm4gcm93O1xufTtcblxuY2xhc3MgTGlzdCBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5MaXN0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIodmFsdWUpO1xuXG5cdFx0dGhpcy5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UX1ZBTFVFX0NIQU5HRUQsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0aWYgKHJvdyBpbnN0YW5jZW9mIFJvdykge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRjb25zdCBjaGFpbiA9IGV2ZW50LmRldGFpbDtcblx0XHRcdFx0dGhpcy5jaGlsZFZhbHVlQ2hhbmdlZChyb3csIGNoYWluKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMub24oRVZFTlRfTElTVF9ST1dfQURELCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgeyByZWFkb25seX0gPSB0aGlzO1xuXHRcdFx0aWYgKCFyZWFkb25seSkge1xuXHRcdFx0XHRjb25zdCByb3cgPSBjcmVhdGVSb3codGhpcyk7XG5cdFx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMub24oRVZFTlRfTElTVF9ST1dfREVMRVRFLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgeyByb3dzLCByZWFkb25seX0gPSB0aGlzO1xuXHRcdFx0aWYgKCFyZWFkb25seSkge1xuXHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdFx0XHRyb3cucmVtb3ZlKCk7XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1x0XHRcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0dGhpcy50ZW1wbGF0ZSA9IHRoaXMuZmluZChcInRlbXBsYXRlXCIpLmZpcnN0KCk7XG5cdFx0XHR0aGlzLmNvbnRhaW5lciA9IHRoaXMuZmluZChOT0RFTkFNRVMuTGlzdFJvd3MpLmZpcnN0KCk7XG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgID0gdGhpcy52YWxpZGF0b3I7XG5cdFx0XHRjb25zdCBhZGRCdXR0b24gPSBmaW5kQWRkQnV0dG9uKHRoaXMpO1xuXG5cdFx0XHR2YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKHt9KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgcm93cywgbWluLCBtYXgsIHJlYWRvbmx5IH0gPSB0aGlzO1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcblx0XHRcdFx0aWYgKCFyZWFkb25seSkge1x0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAobGVuZ3RoID09IG1heCkgYWRkQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRlbHNlIGlmIChsZW5ndGggPCBtYXgpIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtaW4gPD0gbGVuZ3RoICYmIGxlbmd0aCA8PSBtYXg7XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFsaWRhdG9yLmFkZEN1c3RvbUNoZWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgeyByb3dzIH0gPSB0aGlzO1xuXHRcdFx0XHRpZiAocm93cylcblx0XHRcdFx0XHRmb3IgKGxldCByb3cgb2Ygcm93cykge1xuXHRcdFx0XHRcdFx0aWYgKCFyb3cudmFsaWQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3MpIHtcblx0XHRcdHJvdy5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdH1cblx0fVxuXG5cdGdldCByb3dzKCkge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLmNoaWxkcmVuKTtcblx0fVxuXG5cdGdldCBtaW4oKSB7XG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NSU4pKVxuXHRcdFx0cmV0dXJuIE1hdGgubWF4KDAsIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUlOKSkpO1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Z2V0IG1heCgpIHtcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01BWCkpIHJldHVybiBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01BWCkpO1xuXHRcdHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuICF2YWx1ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSkgOiBudWxsO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy5jb250YWluZXIuY2hpbGRyZW4ucmVtb3ZlKCk7XG5cdFx0aWYgKHZhbHVlKSBmb3IgKGxldCB2YWwgb2YgdmFsdWUpIGF3YWl0IGNyZWF0ZVJvdyh0aGlzLCB2YWwpO1xuXHR9XG5cblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQocm93LCBjaGFpbikge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0XG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cblx0XHRmb3IgKGxldCByb3cgb2YgdGhpcy5yb3dzKXtcblx0XHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgcm93LnZhbHVlKCk7XG5cdFx0XHRpZih2YWx1ZSlcblx0XHRcdFx0dmFsdWVzLnB1c2godmFsdWUpXG5cdFx0fVxuXG5cdFx0aWYodmFsdWVzLmxlbmd0aCA+IDApXG5cdFx0XHRfdmFsdWUodGhpcywgdmFsdWVzKTtcblx0XHRlbHNlXG5cdFx0XHRfdmFsdWUodGhpcywgbnVsbCk7XG5cblx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoY2hhaW4pO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoTGlzdCk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCBcblx0RVZFTlRfRVhFQ1VURV9WQUxJREFURSBcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBldmFsdWF0aW9uRGF0YSB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRCYXNlID0gKG1lc3NhZ2UpID0+IHtcblx0bGV0IHBhcmVudCA9IG1lc3NhZ2UucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gcGFyZW50O1xuXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jbGFzcyBNZXNzYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTWVzc2FnZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XHRcdFxuXG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1x0XHRcdFxuXHRcdFx0dGhpcy5yZWZlcmVuY2UgPSBmaW5kUGFyZW50QmFzZSh0aGlzKTtcblx0XHRcdHRoaXMuZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVF9FWEVDVVRFX1ZBTElEQVRFLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJlYWR5LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVx0XHRcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIHVuZGVmaW5lZCk7XG5cdH1cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cdH1cblxuXHRhc3luYyB1cGRhdGUoKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgZXZhbHVhdGlvbkRhdGEodGhpcy5yZWZlcmVuY2UpO1xuXHRcdHRoaXMuYWN0aXZlID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUodGhpcy5jb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcblx0fVxufVxuZGVmaW5lRWxlbWVudChNZXNzYWdlKTtcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCAgXG5cdEFUVFJJQlVURV9TVEVQIFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1NURVBdO1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLlBhZ2U7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuXHRcdHN1cGVyKHZhbHVlKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHR9XG5cblx0Z2V0IHN0ZXAoKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9TVEVQKTtcblx0fVxuXHRcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cbn1cbmRlZmluZUVsZW1lbnQoUGFnZSk7XG5leHBvcnQgZGVmYXVsdCBQYWdlO1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FUywgXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VELFxuXHRGT1JNU1RBVEVTLCBcblx0QVRUUklCVVRFX1BST0dSRVNTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCBcIi4vU3RlcFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9QUk9HUkVTU107XG5cbmNvbnN0IGZpcnN0U3RlcFBhZ2VJbmRleCA9IChwYWdlcywgc3RlcCwgYWN0aXZlUGFnZSkgPT4ge1xuXHRmb3IgKGxldCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0aWYgKHBhZ2Uuc3RlcCA9PSBzdGVwICYmIHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcblx0XHRlbHNlIGlmIChwYWdlID09IGFjdGl2ZVBhZ2UpIHJldHVybjtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufTtcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5Qcm9ncmVzc0Jhcjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcblx0XHRcdGlmICghdGhpcy5mb3JtKSByZXR1cm47XG5cdFx0XHRpZiAodGFyZ2V0ID09IHRoaXMpIHJldHVybjtcblxuXHRcdFx0Y29uc3Qgc3RlcCA9IHRhcmdldC5pcyhOT0RFTkFNRVMuU3RlcCkgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50KE5PREVOQU1FUy5TdGVwKTtcblxuXHRcdFx0aWYgKCFzdGVwKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xuXHRcdFx0Y29uc3QgcGFnZXMgPSB0aGlzLmZvcm0ucGFnZXM7XG5cdFx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2U7XG5cdFx0XHRjb25zdCBzdGVwTmFtZSA9IHN0ZXAubmFtZTtcblx0XHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0IHx8IHN0YXRlID09IEZPUk1TVEFURVMuc3VtbWFyeSkge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gZmlyc3RTdGVwUGFnZUluZGV4KHBhZ2VzLCBzdGVwTmFtZSwgYWN0aXZlUGFnZSk7XG5cdFx0XHRcdGlmIChwYWdlKSB0aGlzLmZvcm0uYWN0aXZlUGFnZSA9IHBhZ2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XG5cdFx0dGhpcy5wcm9ncmVzcyA9IDA7XG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0dGhpcy5mb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHRcdFx0dGhpcy5zdGVwcyA9IHRoaXMuZmluZChOT0RFTkFNRVMuU3RlcCk7XG5cdFx0XHR0aGlzLmZvcm0ub24oW0VWRU5UX1NJVEVfQ0hBTkdFRCxFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRURdLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xuXHRcdFx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2U7XG5cdFx0XHRcdGlmICghYWN0aXZlUGFnZSkgcmV0dXJuO1xuXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2VJbmRleDtcblx0XHRcdFx0Y29uc3QgY291bnQgPSB0aGlzLmZvcm0ucGFnZXMubGVuZ3RoO1xuXHRcdFx0XHRjb25zdCBwYWdlU3RlcCA9IGFjdGl2ZVBhZ2UgPyBhY3RpdmVQYWdlLnN0ZXAgOiBGT1JNU1RBVEVTLmluaXQ7XG5cdFx0XHRcdGNvbnN0IHByb2dyZXNzID0gTWF0aC5mbG9vcigoaW5kZXggKiAxMDApIC8gY291bnQpO1xuXG5cdFx0XHRcdGZvciAobGV0IHN0ZXAgb2YgdGhpcy5zdGVwcykge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzdGVwLm5hbWU7XG5cdFx0XHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBwYWdlU3RlcDtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURVMuc3VtbWFyeSkge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURVMuc3VtbWFyeTtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURVMuZmluaXNoZWQ7XG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnByb2dyZXNzID0gc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5IHx8IHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQgPyAxMDAgOiBwcm9ncmVzcztcblxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcHJvZ3Jlc3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MpO1xuXHR9XG5cblx0c2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XG5cdFx0aWYgKHRoaXMuc3R5bGUuc2V0UHJvcGVydHkpIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXByb2dyZXNzXCIsIHByb2dyZXNzICsgXCIlXCIpO1xuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MsIE1hdGgubWF4KDAsIE1hdGgubWluKHByb2dyZXNzLCAxMDApKSk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChQcm9ncmVzc0Jhcik7XG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVMsIFxuXHRBVFRSSUJVVEVfTkFNRSwgXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxuXHRBVFRSSUJVVEVfUkVBRE9OTFkgXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFldO1xuXG5jbGFzcyBTdGVwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdGVwO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG4gICAgZ2V0IG5hbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfTkFNRSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdH1cblx0fVxuXG5cdGdldCByZWFkb25seSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KFN0ZXApO1xuZXhwb3J0IGRlZmF1bHQgU3RlcDtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVNcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuVmFsaWRhdGlvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0fVxufVxuZGVmaW5lRWxlbWVudChWYWxpZGF0aW9uKTtcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XG4iLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgeyBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OLCBGT1JNU1RBVEVTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IHVwZGF0ZUNvbmRpdGlvblN0YXRlLCB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCB7IGZpbmRWYWxpZGF0aW9ucyB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuXG5jb25zdCB1cGRhdGVSZWFkb25seSA9IGFzeW5jICh7IGRhdGEsIHZhbGlkLCBiYXNlLCBjb25kaXRpb24gfSkgPT4ge1xuXHRjb25zdCB7IGZvcm0gfSA9IGJhc2U7XG5cdGlmIChmb3JtLnN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHQvKmlmICghdmFsaWQpXG5cdFx0XHRiYXNlLnJlYWRvbmx5ID0gZmFsc2U7XG5cdFx0ZWxzZSAqL1xuXHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdGNvbnN0IHRlc3QgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcblx0XHRcdGJhc2UuZWRpdGFibGUgPSB0ZXN0O1xuXHRcdFx0cmV0dXJuIHRlc3Q7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufTtcblxuY2xhc3MgVmFsaWRhdG9yIHtcblx0Y29uc3RydWN0b3IoYmFzZSkge1xuXHRcdHRoaXMuaW5pdGFsID0gdHJ1ZTtcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xuXHRcdHRoaXMuY3VzdG9tQ2hlY2tzID0gW107XG5cdFx0dGhpcy52YWxpZGF0aW9ucyA9IGZpbmRWYWxpZGF0aW9ucyhiYXNlKSB8fCBbXTtcblx0XHR0aGlzLmNvbmRpdGlvbiA9IGJhc2UuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0XHR0aGlzLmVkaXRhYmxlQ29uZGl0aW9uID0gYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pO1xuXHR9XG5cblx0YWRkQ3VzdG9tQ2hlY2soY2hlY2spIHtcblx0XHR0aGlzLmN1c3RvbUNoZWNrcy5wdXNoKGNoZWNrKTtcblx0fVxuXG5cdGdldCBmb3JtKCkge1xuXHRcdHJldHVybiB0aGlzLmJhc2UuZm9ybTtcblx0fVxuXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xuXHRcdGNvbnN0IHsgYmFzZSwgdmFsaWRhdGlvbnMsIGN1c3RvbUNoZWNrcywgY29uZGl0aW9uLCBlZGl0YWJsZUNvbmRpdGlvbiB9ID0gdGhpcztcblx0XHRjb25zdCB7IGhhc1ZhbHVlLCByZXF1aXJlZCB9ID0gYmFzZTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgZXZhbHVhdGlvbkRhdGEoYmFzZSk7XG5cdFx0Y29uc3QgaW5pdGlhbCA9IHRoaXMuaW5pdGFsO1xuXHRcdHRoaXMuaW5pdGFsID0gZmFsc2U7XG5cblx0XHRjb25zdCBjb25kaXRpb25WYWxpZCA9IGNvbmRpdGlvbiA/IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpIDogdHJ1ZTtcblx0XHR1cGRhdGVDb25kaXRpb25TdGF0ZShiYXNlLCBjb25kaXRpb25WYWxpZCwgaW5pdGlhbCk7XG5cblx0XHRsZXQgdmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcblx0XHRpZiAoY29uZGl0aW9uVmFsaWQpIHtcblx0XHRcdGlmICh2YWxpZClcblx0XHRcdFx0Zm9yIChsZXQgY2hlY2sgb2YgY3VzdG9tQ2hlY2tzKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IGNoZWNrKHsgZGF0YSwgYmFzZSB9KTtcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgdmFsaWRhdGlvbiBvZiB2YWxpZGF0aW9ucykge1xuXHRcdFx0XHRpZiAodmFsaWQgJiYgaGFzVmFsdWUpIHtcblx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUodmFsaWRhdGlvbi5jb25kaXRpb24sIGRhdGEsIHRydWUpO1xuXHRcdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gIXRlc3Q7XG5cdFx0XHRcdFx0aWYgKCF0ZXN0KSB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0XHR9IGVsc2UgdmFsaWRhdGlvbi5hY3RpdmUgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZWRpdGFibGUgPSBhd2FpdCB1cGRhdGVSZWFkb25seSh7IGRhdGEsIHZhbGlkLCBiYXNlLCBjb25kaXRpb246IGVkaXRhYmxlQ29uZGl0aW9uIH0pO1xuXHRcdFx0aWYgKCFlZGl0YWJsZSkgdmFsaWQgPSB0cnVlO1xuXG5cdFx0XHR1cGRhdGVWYWxpZFN0YXRlKGJhc2UsIHZhbGlkLCBpbml0aWFsKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsaWQ7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdG9yO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIEJhY2tCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblx0XG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CYWNrQnV0dG9uO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy5mb3JtLnRvUHJldlBhZ2UoKTtcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgQmFja0J1dHRvbjtcbmRlZmluZUVsZW1lbnQoQmFja0J1dHRvbik7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXHRcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLk5leHRCdXR0b247XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBOZXh0QnV0dG9uO1xuZGVmaW5lRWxlbWVudChOZXh0QnV0dG9uKTtcbiIsImltcG9ydCB7IE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuU3VibWl0QnV0dG9uO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMuZm9ybS5zdWJtaXQoKTtcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QnV0dG9uO1xuZGVmaW5lRWxlbWVudChTdWJtaXRCdXR0b24pO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIFN1bW1hcnlCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5QnV0dG9uO1xuZGVmaW5lRWxlbWVudChTdW1tYXJ5QnV0dG9uKTtcbiIsImltcG9ydCBCYWNrQnV0dG9uIGZyb20gXCIuL0JhY2tCdXR0b25cIjtcbmltcG9ydCBOZXh0QnV0dG9uIGZyb20gXCIuL05leHRCdXR0b25cIjtcbmltcG9ydCBTdW1tYXJ5QnV0dG9uIGZyb20gXCIuL1N1bW1hcnlCdXR0b25cIjtcbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSBcIi4vU3VibWl0QnV0dG9uXCI7XG5cbmV4cG9ydCB7XG5cdEJhY2tCdXR0b24sXG5cdE5leHRCdXR0b24sXG5cdFN1bW1hcnlCdXR0b24sXG5cdFN1Ym1pdEJ1dHRvbixcbn07XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCBcblx0RVZFTlRfTElTVF9ST1dfQUREXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBBZGRSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpe1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQnV0dG9uQWRkUm93O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy50cmlnZ2VyKDEwMCwgRVZFTlRfTElTVF9ST1dfQUREKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KEFkZFJvdyk7XG5leHBvcnQgZGVmYXVsdCBBZGRSb3c7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLFxuXHRFVkVOVF9MSVNUX1JPV19ERUxFVEVcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CdXR0b25EZWxldGVSb3c7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpe1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmFjdGl2ZVx0PSB0cnVlO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVF9MSVNUX1JPV19ERUxFVEUpO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoRGVsZXRlUm93KTtcbmV4cG9ydCBkZWZhdWx0IERlbGV0ZVJvdztcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVNcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi4vQ29udGFpbmVyXCI7XG5pbXBvcnQgRGVsZXRlUm93IGZyb20gXCIuL0RlbGV0ZVJvd1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBMaXN0Um93IGV4dGVuZHMgQ29udGFpbmVyIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkxpc3RSb3c7XG5cdH1cblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTGlzdFJvdy5OT0RFTkFNRSwgTGlzdFJvdyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93O1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FU1xufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgTGlzdFJvd3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTGlzdFJvd3M7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93cy5OT0RFTkFNRSwgTGlzdFJvd3MpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdFJvd3M7XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX0ZBSUwgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcbmltcG9ydCB7IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTiwgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuLy8gcHJpdmF0ZSBtZW1iZXJcbmNvbnN0IF9mb3JtID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJmb3JtXCIpO1xuXG4vLyBsb2dpY1xuY2xhc3MgQmFzZVN1Ym1pdEFjdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRjb25zdCBmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XG5cdFx0X2Zvcm0odGhpcywgZm9ybSk7XG5cdFx0aWYgKGZvcm0pIHRoaXMudHJpZ2dlcihFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04pO1xuXHR9XG5cblx0Z2V0IGZvcm0oKSB7XG5cdFx0cmV0dXJuIF9mb3JtKHRoaXMpO1xuXHR9XG5cblx0YXN5bmMgYWNjZXB0KGRhdGEgPSB7fSkge1xuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcbiAgICAgICAgaWYoY29uZGl0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIE92ZXJyaWRlIHRoaXMgZnVuY3Rpb24hXG5cdCAqL1xuXHRhc3luYyBleGVjdXRlKGRhdGEgPSB7fSkge1xuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KFNUQVRFX0ZBSUwsIFwibm90IGltcGxlbWVudGVkXCIpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBCYXNlU3VibWl0QWN0aW9uO1xuIiwiaW1wb3J0IHtkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5pbXBvcnQgQmFzZVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9CYXNlU3VibWl0QWN0aW9uXCI7XG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX1NVQ0NFU1MsIFNUQVRFX0ZBSUwgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcbmltcG9ydCB7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5jb25zdCBOT0RFTkFNRSA9IGAke05PREVOQU1FX1NVQk1JVF9BQ1RJT059LWRlZmF1bHRgO1xuXG5jbGFzcyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbiBleHRlbmRzIEJhc2VTdWJtaXRBY3Rpb24ge1xuXG4gICAgc3RhdGljIGdldCBOT0RFTkFNRSgpIHsgcmV0dXJuIE5PREVOQU1FO31cblxuXG5cdGNvbnN0cnVjdG9yKGVuZHBvaW50LCBtZXRob2QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcblx0XHR0aGlzLm1ldGhvZCA9IG1ldGhvZDtcblx0fVxuXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSkge1x0XHRcblx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50O1xuXHRcdGVuZHBvaW50ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmVUZXh0KGVuZHBvaW50LCBkYXRhLCBlbmRwb2ludCk7XG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgbG9jYXRpb24pO1xuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogdGhpcy5tZXRob2QsXG5cdFx0XHRjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG5cdFx0XHRtb2RlOiBcImNvcnNcIixcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG5cdFx0fSk7XHRcdFxuXHRcdFx0XG5cdFx0cmV0dXJuIG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQodGhpcywgcmVzcG9uc2Uub2sgPyBTVEFURV9TVUNDRVNTIDogU1RBVEVfRkFJTCwgcmVzcG9uc2UpO1x0XHRcblx0fVxufTtcblxuZGVmaW5lKERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKTtcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uO1xuIiwiZXhwb3J0IGNvbnN0IFNUQVRFX1NVQ0NFU1MgPSBcInN1Y2Nlc3NcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9GQUlMID0gXCJmYWlsXCI7XG5cbmNsYXNzIFN1Ym1pdEFjdGlvblJlc3VsdCB7XG5cbiAgICBzdGF0aWMgZ2V0IFNUQVRFX1NVQ0NFU1MoKXtyZXR1cm4gU1RBVEVfU1VDQ0VTUzt9XG4gICAgc3RhdGljIGdldCBTVEFURV9GQUlMKCl7cmV0dXJuIFNUQVRFX0ZBSUw7fVxuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uLCBzdGF0ZSwgbWVzc2FnZSwgZGF0YSl7XG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9OyAgICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pdEFjdGlvblJlc3VsdDsiLCJpbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XG5pbXBvcnQgeyBTUEVDSUFMVkFSUywgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiXG5cbmV4cG9ydCBjb25zdCBldmFsdWF0aW9uRGF0YSA9IGFzeW5jIChiYXNlKSA9PiB7XG5cdGF3YWl0IGJhc2UucmVhZHk7XG5cdGNvbnN0IGRhdGEgPSB7fTtcblx0ZGF0YVtTUEVDSUFMVkFSUy5DVVJSRU5UVkFMVUVdID0gYXdhaXQgYmFzZS52YWx1ZSgpO1xuXG5cdGxldCByb3cgPSBiYXNlLnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdGxldCB0ZW1wID0gZGF0YTtcblx0d2hpbGUgKHJvdykge1xuXHRcdHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddID0gYXdhaXQgcm93LnZhbHVlKCk7XG5cdFx0dGVtcCA9IHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddO1xuXHRcdHJvdyA9IHJvdy5wYXJlbnQoTk9ERU5BTUVTLkxpc3RSb3cpO1xuXHR9XG5cdFxuXHRyZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UoIGRhdGEsIGF3YWl0IGJhc2UuZm9ybS52YWx1ZSgpKTtcbn07XG5cbmNvbnN0IE5BTUVfU1BMSVRURVIgPSAvXFwuL2c7XG5leHBvcnQgY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbiAoZGF0YSwgbmFtZSwgdmFsdWUpIHtcblx0aWYgKGRhdGEgPT0gbnVsbCB8fCB0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XG5cblx0Y29uc3QgdXBkYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG5cblx0Y29uc3QgbmFtZXMgPSBuYW1lLnNwbGl0KE5BTUVfU1BMSVRURVIpO1xuXHR3aGlsZSAobmFtZXMubGVuZ3RoID4gMSkge1xuXHRcdGNvbnN0IGtleSA9IG5hbWVzLnNoaWZ0KCk7XG5cdFx0bGV0IHRlbXAgPSBkYXRhW2tleV07XG5cdFx0Y29uc3QgaGFzID0gdHlwZW9mIHRlbXAgIT09IFwidW5kZWZpZW5kXCIgJiYgdGVtcCAhPSBudWxsO1xuXHRcdGlmICghaGFzICYmICF1cGRhdGUpIHJldHVybiBudWxsO1xuXHRcdGVsc2UgaWYgKCFoYXMgJiYgdXBkYXRlKSB0ZW1wID0gZGF0YVtrZXldID0ge307XG5cblx0XHRkYXRhID0gdGVtcDtcblx0fVxuXG5cdGlmICh1cGRhdGUpIGRhdGFbbmFtZXNbMF1dID0gdmFsdWU7XG5cdGVsc2UgcmV0dXJuIGRhdGFbbmFtZXNbMF1dID8gZGF0YVtuYW1lc1swXV0gOiBudWxsO1xufTsiLCJleHBvcnQgZGVmYXVsdCAoTm9kZSkgPT4ge1xuICAgIGlmKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KE5vZGUuTk9ERU5BTUUpKVxuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5vZGUuTk9ERU5BTUUsIE5vZGUpO1xufSIsImltcG9ydCB7RVZFTlRIQU5ETEVfVElNRU9VVH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiXG5cbmV4cG9ydCBjb25zdCB0b0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFyZ3VtZW50cykuam9pbihcIiBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZUV2ZW50Q29weSA9IChldmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcbiAgICAgICAgY3VycmVudFRhcmdldDogZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgZXhwbGljaXRPcmlnaW5hbFRhcmdldDogZXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCxcbiAgICAgICAgb3JpZ2luYWxUYXJnZXQgOiBldmVudC5vcmlnaW5hbFRhcmdldCxcbiAgICAgICAgc3JjRWxlbWVudDogZXZlbnQuc3JjRWxlbWVudCxcbiAgICAgICAgdGltZVN0YW1wOiBldmVudC50aW1lU3RhbXBcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgdG9UaW1lb3V0SGFuZGxlID0gKGhhbmRsZSwgcHJldmVudERlZmF1bHQsIHN0b3BQcm9wYWdhdGlvbiwgdGltZW91dCkgPT4ge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBjb25zdCBwcmV2ZW50ID0gdHlwZW9mIHByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgPyBwcmV2ZW50RGVmYXVsdCA6ICgpID0+IHByZXZlbnREZWZhdWx0O1xuICAgIGNvbnN0IHN0b3AgPSB0eXBlb2Ygc3RvcFByb3BhZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIgPyBzdG9wUHJvcGFnYXRpb24gOiAoKSA9PiBzdG9wUHJvcGFnYXRpb247XG5cbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmKHByZXZlbnQoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYoc3RvcChldmVudCkpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBldmVudENvcHkgPSBtYWtlRXZlbnRDb3B5KGV2ZW50KTtcblxuICAgICAgICBpZihpZClcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWQgPSBudWxsO1xuICAgICAgICAgICAgaGFuZGxlKGV2ZW50Q29weSk7XG4gICAgICAgIH0sIHRpbWVvdXQgfHwgRVZFTlRIQU5ETEVfVElNRU9VVCk7XG5cbiAgICB9XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IHRyZWVGaWx0ZXIgPSAoeyByb290LCBmaWx0ZXIgfSkgPT4ge1xuXHRsZXQgZWxlbWVudHMgPSBbXTtcblx0cm9vdC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0Y29uc3QgeyBhY2NlcHQsIHN0b3AgPSBmYWxzZSB9ID0gZmlsdGVyKGVsZW1lbnQpO1xuXG5cdFx0aWYgKGFjY2VwdCkgZWxlbWVudHMucHVzaChlbGVtZW50KTtcblxuXHRcdGlmICghc3RvcCkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gdHJlZUZpbHRlcih7IHJvb3Q6IGVsZW1lbnQsIGZpbHRlciB9KTtcblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQocmVzdWx0KTtcblx0XHRcdGVsc2UgaWYgKHJlc3VsdCkgZWxlbWVudHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRGaWVsZHMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFZhbGlkYXRpb25zID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVmFsaWRhdGlvbikgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuIiwiaW1wb3J0IHsgXG5cdEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCxcblx0RVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCxcblx0QVRUUklCVVRFX0FDVElWRSwgXG5cdEFUVFJJQlVURV9WQUxJRCwgXG5cdEFUVFJJQlVURV9JTlZBTElELCBcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXG5cdEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXG5cdEFUVFJJQlVURV9FRElUQUJMRSwgQVRUUklCVVRFX1JFQURPTkxZIFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVWYWxpZFN0YXRlID0gKHRhcmdldCwgdmFsaWQsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC52YWxpZDtcblx0aWYgKHR5cGVvZiB2YWxpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWxpZCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XG5cdH0gZWxzZSBpZiAodmFsaWQpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBcIlwiKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgXCJcIik7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcblx0fVxuXG5cdGlmIChvbGRTdGF0ZSAhPSB2YWxpZCB8fCBpbml0aWFsKXsgXG5cdFx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVDb25kaXRpb25TdGF0ZSA9ICh0YXJnZXQsIHZhbGlkLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmNvbmRpdGlvbjtcblx0aWYgKHZhbGlkKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcIlwiKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFwiXCIpO1xuXHR9XG5cdGlmIChvbGRTdGF0ZSAhPSB2YWxpZCB8fCBpbml0aWFsKSB7XHRcdFxuXHRcdHRhcmdldC50cmlnZ2VyKEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFjdGl2ZVN0YXRlID0gKHRhcmdldCwgYWN0aXZlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuYWN0aXZlO1xuXHRhY3RpdmUgPyB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xuXHRpZiAob2xkU3RhdGUgIT0gYWN0aXZlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VEKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFZGl0YWJsZVN0YXRlID0gKHRhcmdldCwgZWRpdGFibGUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5lZGl0YWJsZTtcblx0aWYgKGVkaXRhYmxlKSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBcIlwiKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xuXHR9IGVsc2Uge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKTtcblx0fVxuXHRpZiAob2xkU3RhdGUgIT0gZWRpdGFibGUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCk7XG59OyIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2JveCBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XG5cdFx0cmV0dXJuIGlucHV0Lmxlbmd0aCA9PSAxID8gaW5wdXQuZmlyc3QoKSA6IGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0dGhpcy5tdWx0aXBsZSA9IGlucHV0IGluc3RhbmNlb2YgTm9kZUxpc3Q7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5QVVRcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcblxuY29uc3QgX3ZhbHVlID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJ2YWx1ZVwiKTtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiZmlsZVwiXSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gKGZpbGUsIHJlYWRGbk5hbWUpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG5cdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxuXHRcdFx0XHR0eXBlOiBmaWxlLnR5cGUsXG5cdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdFxuXHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHJlYWRlcltyZWFkRm5OYW1lXShmaWxlKTtcblx0fSk7XG59O1xuXG4vL3JlYWRBc0RhdGFVUkxcblxuY29uc3QgRk9STUFUID0ge1xuXHRcImZvcm0taW5wdXRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHJldHVybiBmaWxlO1xuXHR9LFxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJkYXRhLXVybC1iYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRcImJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLnN1YnN0cihyZXN1bHQuZGF0YS5pbmRleE9mKFwiLFwiKSArIDEpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNvbnN0IHJlYWRGaWxlcyA9IGFzeW5jIChmaWxlcywgZm9ybWF0LCBtdWx0aXBsZSkgPT4ge1xuXHRsZXQgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpXG5cdFx0cmVzdWx0LnB1c2goYXdhaXQgRk9STUFUW2Zvcm1hdF0oZmlsZSkpO1xuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIG51bGw7XG5cblxuXHRyZXR1cm4gbXVsdGlwbGUgPyByZXN1bHQgOiByZXN1bHRbMF07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dC5tdWx0aXBsZTtcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gZmllbGQuYXR0cihcImZpbGUtbmFtZS10YXJnZXRcIik7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IHRoaXMuZmlsZW5hbWVUYXJnZXQgPyBmaWVsZC5maW5kKHRoaXMuZmlsZW5hbWVUYXJnZXQpLmZpcnN0KCkgOiBudWxsO1xuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcblxuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlcy5sZW5ndGggIT0gMClcblx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdH07XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlICA9PT0gXCJvYmplY3RcIjtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSBfdmFsdWUodGhpcyk7XG5cdFx0aWYgKHZhbHVlICE9IGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKVxuXHRcdFx0aWYoIXZhbHVlKVx0XHRcdFxuXHRcdFx0XHR0aGlzLmlucHV0LnZhbHVlID0gbnVsbDtcblxuXHRcdFx0Y29uc3QgZmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0O1xuXHRcdFx0aWYgKGZpbGVuYW1lKSB7XG5cdFx0XHRcdGZpbGVuYW1lLmVtcHR5KCk7XG5cdFx0XHRcdGlmKHZhbHVlKXtcblx0XHRcdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlbmFtZS5hcHBlbmQoYDxzcGFuPiR7ZmlsZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIF92YWx1ZSh0aGlzKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcblxuY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0XHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWUudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5QVVQsXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMuaW5wdXQubXVsdGlwbGUgPyB0aGlzLmlucHV0LnZhbCgpIDogdGhpcy5pbnB1dC52YWx1ZSk7XG5cdH1cblx0XG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZih0aGlzLmlucHV0Lm11bHRpcGxlKXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoID4gMCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxuXHRcdFx0fVx0XHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLmlucHV0Lm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXQ6bm90KFt0eXBlPVwiZmlsZVwiXSk6bm90KFt0eXBlPVwicmFkaW9cIl0pOm5vdChbdHlwZT1cImNoZWNrYm94XCJdKSAsaW5wdXQ6bm90KFt0eXBlXSksIHRleHRhcmVhJztcblxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcblxuY29uc3QgdGV4dCA9IChpbnB1dCkgPT4ge1xuXHRyZXR1cm4gXHR7XG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7IFxuXHRcdH0sXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+IHtcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZSA9IHZhbHVlOyBcblx0XHR9LFxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH07XG59O1xuY29uc3QgbnVtYmVyID0gKGlucHV0KSA9Pntcblx0cmV0dXJuIHtcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcblx0XHR9LFxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc051bWJlcjtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+e1xuXHRcdFx0aW5wdXQudmFsdWVBc051bWJlciA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkpIHJldHVybiB2YWx1ZTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0fTtcbn07XG5jb25zdCBkYXRlID0gKGlucHV0KSA9PiB7XG5cdHJldHVybiB7XG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGU7XG5cdFx0fSxcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlQXNEYXRlO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0aW5wdXQudmFsdWVBc0RhdGUgPSB2YWx1ZTtcblx0XHR9LFxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0fTtcbn07XG5jb25zdCBUWVBFUyA9IHsgdGV4dCwgbnVtYmVyLCBkYXRlLCB0aW1lOiBkYXRlLCByYW5nZTpudW1iZXIgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGNvbnN0IHR5cGUgPSAoZmllbGQuYXR0cihcImlucHV0LXR5cGVcIikgfHwgaW5wdXQuYXR0cihcInR5cGVcIikgfHwgREVGQVVMVFRZUEUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMudHlwZSA9IChUWVBFU1t0eXBlXSB8fCBUWVBFU1tERUZBVUxUVFlQRV0pKGlucHV0KTtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KSxcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gdGhpcy50eXBlLmFjY2VwdCh2YWx1ZSk7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcy50eXBlLm5vcm1hbGl6ZSh2YWx1ZSk7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSAgdGhpcy50eXBlLmdldFZhbHVlKCk7XG5cdFx0aWYgKHZhbHVlICE9IGN1cnJlbnRWYWx1ZSlcblx0XHRcdHRoaXMudHlwZS5zZXRWYWx1ZSh2YWx1ZSlcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCBGaWVsZCBmcm9tIFwiLi4vRmllbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XG5cdFxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKXsgcmV0dXJuIG51bGw7fVxuXHRcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0dGhpcy5maWVsZCA9IGZpZWxkO1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7IH1cblxuXHRzZXQgcmVhZG9ubHkoZGlzYWJsZWQpIHsgfVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHtcblx0fVxuXHRcblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdGdldCB2YWxpZCgpe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb21cIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vc3JjL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IEZpZWxkIGZyb20gXCIuL3NyYy9GaWVsZFwiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9zcmMvQ29udGFpbmVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9zcmMvTGlzdFwiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vc3JjL1BhZ2VcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vc3JjL0Zvcm1cIjtcblxuZXhwb3J0IHtGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXJ9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==