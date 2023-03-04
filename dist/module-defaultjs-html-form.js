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
/* harmony export */   "defGet": () => (/* binding */ defGet),
/* harmony export */   "defGetSet": () => (/* binding */ defGetSet),
/* harmony export */   "defValue": () => (/* binding */ defValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge)
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "privateProperty": () => (/* binding */ privateProperty),
/* harmony export */   "privatePropertyAccessor": () => (/* binding */ privatePropertyAccessor),
/* harmony export */   "privateStore": () => (/* binding */ privateStore)
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "lazyPromise": () => (/* binding */ lazyPromise),
/* harmony export */   "timeoutPromise": () => (/* binding */ timeoutPromise)
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "uuid": () => (/* binding */ uuid)
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "emtpyOrNoValueString": () => (/* binding */ emtpyOrNoValueString),
/* harmony export */   "noValue": () => (/* binding */ noValue)
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
/* harmony export */   "Context": () => (/* reexport safe */ _src_Context__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "ExpressionResolver": () => (/* reexport safe */ _src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"])
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
/* harmony export */   "componentBaseOf": () => (/* binding */ componentBaseOf),
/* harmony export */   "createUID": () => (/* binding */ createUID),
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
			if (this.ownerDocument == document && this.isConnected) init(this);
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
/* harmony export */   "attributeChangeEventPrefix": () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   "componentPrefix": () => (/* binding */ componentPrefix),
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "define": () => (/* binding */ define),
/* harmony export */   "toNodeName": () => (/* binding */ toNodeName)
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
/* harmony export */   "attributeChangeEventname": () => (/* binding */ attributeChangeEventname),
/* harmony export */   "componentEventname": () => (/* binding */ componentEventname),
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
/* harmony import */ var _handels_ConditionHandle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handels/ConditionHandle */ "./src/handels/ConditionHandle.js");
/* harmony import */ var _handels_EditableHandle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handels/EditableHandle */ "./src/handels/EditableHandle.js");
/* harmony import */ var _handels_ValidationHandle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handels/ValidationHandle */ "./src/handels/ValidationHandle.js");
/* harmony import */ var _handels_MessageHandle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handels/MessageHandle */ "./src/handels/MessageHandle.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");













const _form = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_7__.privatePropertyAccessor)("form");
const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE_CONDITION];

class Base extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	#conditionHandle;
	#editableHandle;
	#validationHandle;
	#messageHandle;

	constructor() {
		super();
		this.#messageHandle = new _handels_MessageHandle__WEBPACK_IMPORTED_MODULE_5__["default"](this);
		this.#conditionHandle = new _handels_ConditionHandle__WEBPACK_IMPORTED_MODULE_2__["default"](this);
		this.#editableHandle = new _handels_EditableHandle__WEBPACK_IMPORTED_MODULE_3__["default"](this);
		this.#validationHandle = new _handels_ValidationHandle__WEBPACK_IMPORTED_MODULE_4__["default"](this);
	}

	addValidation(validation) {
		this.#validationHandle.addCustomValidation(validation);
	}

	async validate(data) {		
		//console.log(`${this.nodeName}(${this.name}).validate:`, data)
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EVALUATE, "");
		const context = Object.assign({}, data, await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_6__.evaluationData)(this));
		await this.#conditionHandle.validate(context);
		await this.#editableHandle.validate(context);
		await this.#validationHandle.validate(context);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EVALUATE, null);

		await this.#messageHandle.validate(context);

		return this.valid;
	}

	get form() {
		let form = _form(this);
		if (!form) {
			form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM);
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
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateActiveState)(this, active);
			this.activeUpdated();
		}
	}

	async activeUpdated() {}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		if(!this.editable)
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, true, !this.ready.resolved);
		else
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}

	async readonlyUpdated() {}

	get editable() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE);
	}

	set editable(editable) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateEditableState)(this, editable, !this.ready.resolved);
		this.editableUpdated();		
		this.readonly = !editable;
	}

	async editableUpdated() {
	}

	set condition(condition){
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateConditionState)(this, condition);
		this.conditionUpdated();
	}

	get condition() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID);
	}

	async conditionUpdated() {}

	set valid(valid){
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateValidState)(this, valid);
		this.validUpdated();
	}

	get valid() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID);
	}

	async validUpdated(){}
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "findParentField": () => (/* binding */ findParentField)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");





const _parent = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("parent");
const _value = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("value");

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

	constructor(options = {}) {
		super(options);
		const {value} = options;
		_value(this, value);
		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED));
	}

	async destroy() {		
		this.publishValue(null);
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_REMOVED);
		await super.destroy();
	}

	get parentField() {
		let parent = _parent(this);
		if (!parent) {
			parent = findParentField(this);
			_parent(this, parent);
		}
		return parent;
	}

	async conditionUpdated() {
		this.active = this.condition;
		return this.publishValue();
	}

	get name() {
		return this.getAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NOVALUE);
	}

	async value(value) {
		const {condition, valid, ready} = this;
		//console.log(`${this.nodeName}(${this.name}).value: `, arguments, {condition, valid});

		if (arguments.length == 0)
			return  !condition || !valid ? null : _value(this);		
		
		await ready;
		const currentValue = _value(this);

		if (await this.acceptValue(value)) {
			value = await this.normalizeValue(value) || value;
			if (currentValue != value) {				
				value = await this.updatedValue(value) || value;				
				await this.publishValue(value);
			}
		}
	}

	async validate(data){
		const currentCondition = this.condition;
		const currentValid = this.valid;
		const valid = await super.validate(data);
		const condition = this.condition;
		const hasChange = currentCondition != condition || currentValid != valid;
		if(hasChange)
			this.publishValue();

		return valid;
	}

	async updatedValue(value) { }

	async publishValue(value) {
		await this.ready;
		let updated = false;
		const currentValue = _value(this);
		value = arguments.length == 1 ? value : currentValue;
		if(typeof value === "undefined")
			value = null;
		if(arguments.length == 1 && currentValue != value){
			updated = true;
			_value(this, value);
		}

		updateHasValue(!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_3__.noValue)(value), this);

		const publising = this.condition && (this.valid || updated);
		const publishValue = publising ? value : null
		//console.log(`${this.nodeName}(${this.name}).publishValue:`, {updated, publising, publishValue});
		if(updated){
			if (this.parentField) await this.parentField.childValueChanged(this, publishValue);
			else await this.form.childValueChanged(this, publishValue);
		}
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async childValueChanged(field, value) {}
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
/* harmony export */   "ATTRIBUTE_ACTIVE": () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   "ATTRIBUTE_CONDITION": () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   "ATTRIBUTE_CONDITION_INVALID": () => (/* binding */ ATTRIBUTE_CONDITION_INVALID),
/* harmony export */   "ATTRIBUTE_CONDITION_VALID": () => (/* binding */ ATTRIBUTE_CONDITION_VALID),
/* harmony export */   "ATTRIBUTE_DISABLED": () => (/* binding */ ATTRIBUTE_DISABLED),
/* harmony export */   "ATTRIBUTE_EDITABLE": () => (/* binding */ ATTRIBUTE_EDITABLE),
/* harmony export */   "ATTRIBUTE_EDITABLE_CONDITION": () => (/* binding */ ATTRIBUTE_EDITABLE_CONDITION),
/* harmony export */   "ATTRIBUTE_ENDPOINT": () => (/* binding */ ATTRIBUTE_ENDPOINT),
/* harmony export */   "ATTRIBUTE_EVALUATE": () => (/* binding */ ATTRIBUTE_EVALUATE),
/* harmony export */   "ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT": () => (/* binding */ ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT),
/* harmony export */   "ATTRIBUTE_INVALID": () => (/* binding */ ATTRIBUTE_INVALID),
/* harmony export */   "ATTRIBUTE_MAX": () => (/* binding */ ATTRIBUTE_MAX),
/* harmony export */   "ATTRIBUTE_METHOD": () => (/* binding */ ATTRIBUTE_METHOD),
/* harmony export */   "ATTRIBUTE_MIN": () => (/* binding */ ATTRIBUTE_MIN),
/* harmony export */   "ATTRIBUTE_NAME": () => (/* binding */ ATTRIBUTE_NAME),
/* harmony export */   "ATTRIBUTE_NOVALUE": () => (/* binding */ ATTRIBUTE_NOVALUE),
/* harmony export */   "ATTRIBUTE_PROGRESS": () => (/* binding */ ATTRIBUTE_PROGRESS),
/* harmony export */   "ATTRIBUTE_READONLY": () => (/* binding */ ATTRIBUTE_READONLY),
/* harmony export */   "ATTRIBUTE_REQUIRED": () => (/* binding */ ATTRIBUTE_REQUIRED),
/* harmony export */   "ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY": () => (/* binding */ ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY),
/* harmony export */   "ATTRIBUTE_STATE": () => (/* binding */ ATTRIBUTE_STATE),
/* harmony export */   "ATTRIBUTE_STEP": () => (/* binding */ ATTRIBUTE_STEP),
/* harmony export */   "ATTRIBUTE_USE_SUMMARY_PAGE": () => (/* binding */ ATTRIBUTE_USE_SUMMARY_PAGE),
/* harmony export */   "ATTRIBUTE_VALID": () => (/* binding */ ATTRIBUTE_VALID),
/* harmony export */   "EVENTHANDLE_INPUT_TIMEOUT": () => (/* binding */ EVENTHANDLE_INPUT_TIMEOUT),
/* harmony export */   "EVENTHANDLE_TIMEOUT": () => (/* binding */ EVENTHANDLE_TIMEOUT),
/* harmony export */   "EVENT_ACTIVE_STATE_CHANGED": () => (/* binding */ EVENT_ACTIVE_STATE_CHANGED),
/* harmony export */   "EVENT_ALL_PUBLISH_VALUE": () => (/* binding */ EVENT_ALL_PUBLISH_VALUE),
/* harmony export */   "EVENT_CONDITION_STATE_CHANGED": () => (/* binding */ EVENT_CONDITION_STATE_CHANGED),
/* harmony export */   "EVENT_EDITABLE_STATE_CHANGED": () => (/* binding */ EVENT_EDITABLE_STATE_CHANGED),
/* harmony export */   "EVENT_EXECUTE_VALIDATE": () => (/* binding */ EVENT_EXECUTE_VALIDATE),
/* harmony export */   "EVENT_FIELD_INITIALIZED": () => (/* binding */ EVENT_FIELD_INITIALIZED),
/* harmony export */   "EVENT_FIELD_INPUT": () => (/* binding */ EVENT_FIELD_INPUT),
/* harmony export */   "EVENT_FIELD_REMOVED": () => (/* binding */ EVENT_FIELD_REMOVED),
/* harmony export */   "EVENT_FORM_STATE_CHANGED": () => (/* binding */ EVENT_FORM_STATE_CHANGED),
/* harmony export */   "EVENT_INITIALIZE": () => (/* binding */ EVENT_INITIALIZE),
/* harmony export */   "EVENT_INITIALIZED": () => (/* binding */ EVENT_INITIALIZED),
/* harmony export */   "EVENT_INITIALIZE_SUBMIT_ACTION": () => (/* binding */ EVENT_INITIALIZE_SUBMIT_ACTION),
/* harmony export */   "EVENT_LIST_ROW_ADD": () => (/* binding */ EVENT_LIST_ROW_ADD),
/* harmony export */   "EVENT_LIST_ROW_DELETE": () => (/* binding */ EVENT_LIST_ROW_DELETE),
/* harmony export */   "EVENT_MESSAGE_INITIALIZED": () => (/* binding */ EVENT_MESSAGE_INITIALIZED),
/* harmony export */   "EVENT_MESSAGE_REMOVED": () => (/* binding */ EVENT_MESSAGE_REMOVED),
/* harmony export */   "EVENT_PAGE_INITIALIZED": () => (/* binding */ EVENT_PAGE_INITIALIZED),
/* harmony export */   "EVENT_PAGE_REMOVED": () => (/* binding */ EVENT_PAGE_REMOVED),
/* harmony export */   "EVENT_PREFIX": () => (/* binding */ EVENT_PREFIX),
/* harmony export */   "EVENT_PROGRESSBAR_CHANGED": () => (/* binding */ EVENT_PROGRESSBAR_CHANGED),
/* harmony export */   "EVENT_SITE_CHANGED": () => (/* binding */ EVENT_SITE_CHANGED),
/* harmony export */   "EVENT_SUBMIT": () => (/* binding */ EVENT_SUBMIT),
/* harmony export */   "EVENT_SUBMIT_RESULTS": () => (/* binding */ EVENT_SUBMIT_RESULTS),
/* harmony export */   "EVENT_VALIDATION_INITIALIZED": () => (/* binding */ EVENT_VALIDATION_INITIALIZED),
/* harmony export */   "EVENT_VALIDATION_REMOVED": () => (/* binding */ EVENT_VALIDATION_REMOVED),
/* harmony export */   "EVENT_VALID_STATE_CHANGED": () => (/* binding */ EVENT_VALID_STATE_CHANGED),
/* harmony export */   "EVENT_VALUE_CHANGED": () => (/* binding */ EVENT_VALUE_CHANGED),
/* harmony export */   "FORMSTATES": () => (/* binding */ FORMSTATES),
/* harmony export */   "FORMSTATE_FINISHED": () => (/* binding */ FORMSTATE_FINISHED),
/* harmony export */   "FORMSTATE_INIT": () => (/* binding */ FORMSTATE_INIT),
/* harmony export */   "FORMSTATE_INPUT": () => (/* binding */ FORMSTATE_INPUT),
/* harmony export */   "FORMSTATE_SUMMARY": () => (/* binding */ FORMSTATE_SUMMARY),
/* harmony export */   "FORMSTATE_VALIDATING": () => (/* binding */ FORMSTATE_VALIDATING),
/* harmony export */   "HTML_TAG_PREFIX": () => (/* binding */ HTML_TAG_PREFIX),
/* harmony export */   "NODENAME_CONTAINER": () => (/* binding */ NODENAME_CONTAINER),
/* harmony export */   "NODENAME_CONTROL": () => (/* binding */ NODENAME_CONTROL),
/* harmony export */   "NODENAME_CONTROL_BACK": () => (/* binding */ NODENAME_CONTROL_BACK),
/* harmony export */   "NODENAME_CONTROL_CANCEL": () => (/* binding */ NODENAME_CONTROL_CANCEL),
/* harmony export */   "NODENAME_CONTROL_NEXT": () => (/* binding */ NODENAME_CONTROL_NEXT),
/* harmony export */   "NODENAME_CONTROL_SUBMIT": () => (/* binding */ NODENAME_CONTROL_SUBMIT),
/* harmony export */   "NODENAME_CONTROL_SUMMARY": () => (/* binding */ NODENAME_CONTROL_SUMMARY),
/* harmony export */   "NODENAME_FIELD": () => (/* binding */ NODENAME_FIELD),
/* harmony export */   "NODENAME_FORM": () => (/* binding */ NODENAME_FORM),
/* harmony export */   "NODENAME_LIST": () => (/* binding */ NODENAME_LIST),
/* harmony export */   "NODENAME_LIST_ADD_ROW": () => (/* binding */ NODENAME_LIST_ADD_ROW),
/* harmony export */   "NODENAME_LIST_DELETE_ROW": () => (/* binding */ NODENAME_LIST_DELETE_ROW),
/* harmony export */   "NODENAME_LIST_ROW": () => (/* binding */ NODENAME_LIST_ROW),
/* harmony export */   "NODENAME_LIST_ROWS": () => (/* binding */ NODENAME_LIST_ROWS),
/* harmony export */   "NODENAME_MESSAGE": () => (/* binding */ NODENAME_MESSAGE),
/* harmony export */   "NODENAME_PAGE": () => (/* binding */ NODENAME_PAGE),
/* harmony export */   "NODENAME_PROGESSBAR": () => (/* binding */ NODENAME_PROGESSBAR),
/* harmony export */   "NODENAME_STEP": () => (/* binding */ NODENAME_STEP),
/* harmony export */   "NODENAME_SUBMIT_ACTION": () => (/* binding */ NODENAME_SUBMIT_ACTION),
/* harmony export */   "NODENAME_VALIDATION": () => (/* binding */ NODENAME_VALIDATION),
/* harmony export */   "REQUIREDSTATES": () => (/* binding */ REQUIREDSTATES),
/* harmony export */   "SPECIALVARS": () => (/* binding */ SPECIALVARS),
/* harmony export */   "TRIGGER_TIMEOUT": () => (/* binding */ TRIGGER_TIMEOUT)
/* harmony export */ });
const HTML_TAG_PREFIX = "d-";
const TRIGGER_TIMEOUT = 10;
const EVENTHANDLE_TIMEOUT = 10;
const EVENTHANDLE_INPUT_TIMEOUT = 50 * EVENTHANDLE_TIMEOUT;

const NODENAME_FORM = `${HTML_TAG_PREFIX}form`;
const NODENAME_SUBMIT_ACTION = `${HTML_TAG_PREFIX}submit-action`;
const NODENAME_PAGE = `${HTML_TAG_PREFIX}page`;
const NODENAME_FIELD = `${HTML_TAG_PREFIX}field`;
const NODENAME_CONTAINER = `${HTML_TAG_PREFIX}container`;

const NODENAME_LIST = `${HTML_TAG_PREFIX}list`;
const NODENAME_LIST_ROWS= `${HTML_TAG_PREFIX}rows`;
const NODENAME_LIST_ROW= `${HTML_TAG_PREFIX}row`;
const NODENAME_LIST_ADD_ROW= `${HTML_TAG_PREFIX}add-row`;
const NODENAME_LIST_DELETE_ROW= `${HTML_TAG_PREFIX}delete-row`;

const NODENAME_PROGESSBAR = `${HTML_TAG_PREFIX}progress-bar`;
const NODENAME_STEP = `${HTML_TAG_PREFIX}step`;

const NODENAME_VALIDATION = `${HTML_TAG_PREFIX}validation`;
const NODENAME_MESSAGE = `${HTML_TAG_PREFIX}message`;

const NODENAME_CONTROL = `${HTML_TAG_PREFIX}control`;
const NODENAME_CONTROL_BACK = `${HTML_TAG_PREFIX}control-back`;
const NODENAME_CONTROL_NEXT = `${HTML_TAG_PREFIX}control-next`;
const NODENAME_CONTROL_CANCEL = `${HTML_TAG_PREFIX}control-cancel`;
const NODENAME_CONTROL_SUMMARY = `${HTML_TAG_PREFIX}control-summary`;
const NODENAME_CONTROL_SUBMIT = `${HTML_TAG_PREFIX}control-submit`;


const FORMSTATE_INIT = "init";
const FORMSTATE_VALIDATING = "validating";
const FORMSTATE_INPUT = "input";
const FORMSTATE_SUMMARY = "summary";
const FORMSTATE_FINISHED = "finished";
const FORMSTATES = {
	init: FORMSTATE_INIT,
	validating: FORMSTATE_VALIDATING,
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

const EVENT_FIELD_INITIALIZED = `${EVENT_PREFIX}field-initialized`;
const EVENT_FIELD_REMOVED = `${EVENT_PREFIX}field-removed`;

const EVENT_PAGE_INITIALIZED = `${EVENT_PREFIX}page-initialized`;
const EVENT_PAGE_REMOVED = `${EVENT_PREFIX}page-removed`;

const EVENT_VALIDATION_INITIALIZED = `${EVENT_PREFIX}validation-initialized`;
const EVENT_VALIDATION_REMOVED = `${EVENT_PREFIX}validation-removed`;

const EVENT_MESSAGE_INITIALIZED = `${EVENT_PREFIX}message-initialized`;
const EVENT_MESSAGE_REMOVED = `${EVENT_PREFIX}message-removed`;

const EVENT_ACTIVE_STATE_CHANGED = `${EVENT_PREFIX}active-state-changed`;
const EVENT_VALID_STATE_CHANGED = `${EVENT_PREFIX}valid-state-changed`;
const EVENT_EDITABLE_STATE_CHANGED = `${EVENT_PREFIX}editable-state-changed`;


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
const ATTRIBUTE_EVALUATE = "evaluate";
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/ValidationHelper */ "./src/utils/ValidationHelper.js");








const ATTRIBUTES = [];
class Container extends _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTAINER;
	}

	#fields = null;
	#value = new Map();

	constructor(options) {
		super(options);
		const root = this.root;
		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] && (!this.#fields || !this.#fields.has(field)))
					this.#fields = null;
				event.stopPropagation();
			}
		});

		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_REMOVED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] && this.#fields && this.#fields.has(field))
					this.#fields.delete(field);

				event.stopPropagation();
			}
		});

		this.addValidation(async ({ data }) => await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_6__.validateFields)(data, this.fields));
	}

	get fields() {
		if(!this.#fields)
			this.#fields = new Set((0,_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_2__.findFields)(this));

		return Array.from(this.#fields);
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
		const map = this.#value;
		map.clear();
		const fields = this.fields;
		if (fields) {
			await Promise.all(fields.map(field => {
				const name = field.name;
				const fieldValue = name ? (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.valueHelper)(value, field.name) : value;
				if(fieldValue)
					map.set(field, fieldValue);
				return field.value(fieldValue);
			}));
		}

		let data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.fieldValueMapToObject)(this.#value, fields);
		if (Object.getOwnPropertyNames(data).length == 0) data = null;

		return data;
	}

	async childValueChanged(field, value) {
		//console.log(`${this.nodeName}.childValueChanged(${field.name}):`, {field, value});
		value = await value;
		const map = this.#value;
		if (field) {
			if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value)) {
				//console.log(`delete ${field.name}`);
				map.delete(field);
			}
			else {
				//console.log(`set ${field.name} = ${value}`);
				map.set(field, value);
			}
		
		}
		let data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.fieldValueMapToObject)(map, this.fields);
		//console.log("data: ",data);
		if (Object.getOwnPropertyNames(data).length == 0) data = null;

		await super.childValueChanged(field, value);
		await this.publishValue(data);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_4__.define)(Container);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/controls/index.js");




const BUTTONDUMMY = {
	active: true,
	disabled: true,
};

const ATTRIBUTES = [];
class Control extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL;
	}

	#form;
	#back;
	#next;
	#summary;
	#submit;
	#initialized = false;

	constructor() {
		super();
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM);
			this.#back = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_BACK).first() || BUTTONDUMMY;
			this.#next = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_NEXT).first() || BUTTONDUMMY;
			this.#summary = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUMMARY).first() || BUTTONDUMMY;
			this.#submit = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUBMIT).first() || BUTTONDUMMY;

			this.#form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_INITIALIZED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED], () => {
				this.update();
			});

			this.#initialized = true;
		}
	}

	

	async update() {
		const form = this.#form;
		const state = form.state;
		const back = this.#back;
		const next = this.#next;
		const summary = this.#summary;
		const submit = this.#submit

		// basic control setup
		back.active = true;
		back.disabled = true;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if(state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING)
			return;

		const { activePageIndex, activePage, nextPage, pages, useSummaryPage } = form;	
		const hasNextPage = (await nextPage) != null;

		if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED) {
			back.disabled = true;
			submit.active = true;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY) {
			back.disabled = false;
			submit.active = true;
			submit.disabled = !form.valid;
		} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			back.disabled = activePageIndex <= 0;

			if (hasNextPage || (!activePage.valid && activePageIndex + 1 < pages.length)) {
				next.active = true;
				next.disabled = !activePage.valid;
			} else if (useSummaryPage && state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
				summary.active = true;
				summary.disabled = !activePage.valid;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Control);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");





const ATTRIBUTES = ["file-format"];

class Field extends _BaseField__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FIELD;
	}

	#initialized = false;
	#wrapper;

	constructor(options) {
		super(options);
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.publishValue(event.detail);
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.#wrapper = (0,_wrapper__WEBPACK_IMPORTED_MODULE_2__.findWrapper)(this);
			if (this.#wrapper){
				this.addValidation(async () => this.#wrapper.valid);
				this.publishValue(this.#wrapper.value);
			}
		}
	}

	readonlyUpdated() {
		if (this.#wrapper) this.#wrapper.readonly = this.readonly;
	}

	async acceptValue(value) {
		return this.#wrapper ? this.#wrapper.acceptValue(value) : false;
	}

	async normalizeValue(value) {
		if (this.#wrapper) return this.#wrapper.normalizeValue(value);

		return value;
	}

	async updatedValue(value) {
		await this.ready;
		value = await value;
		const wrapper = this.#wrapper;
		if (wrapper){
			const current = wrapper.value || null;
			if(current != value)
				await wrapper.updatedValue(value);
		}
		await super.updatedValue(value);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_3__.define)(Field);
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
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Control */ "./src/Control.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./submitActions/DefaultFormSubmitAction */ "./src/submitActions/DefaultFormSubmitAction.js");
/* harmony import */ var _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./submitActions/SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/ValidationHelper */ "./src/utils/ValidationHelper.js");















const _submitActions = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_7__.privatePropertyAccessor)("submitAction");

const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_USE_SUMMARY_PAGE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ENDPOINT, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_METHOD, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STATE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

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
			try {
				const result = (await action.execute(data)) || new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__.STATE_SUCCESS);
				results.push(result);
				if (result.state == _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__.STATE_FAIL) return results;
			} catch (e) {
				results.push(new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__.STATE_FAIL, e));
				return results;
			}
		}
	}
	return results;
};

class Form extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM;
	}

	#initialized = false;
	#state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INIT;
	#pages;
	#value = new Map();
	#data = {};
	#validation = null;
	#hasNextValidation = false;

	constructor() {
		super();
		const root = this.root;
		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PAGE_INITIALIZED, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});

		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PAGE_REMOVED, (event) => {
			const page = event.target;
			this.#pages = null;
			this.childValueChanged(page, null);

			event.preventDefault();
			event.stopPropagation();
		});

		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_INITIALIZED));
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.activePageIndex = -1;

			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INIT;

			this.useSummaryPage = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_USE_SUMMARY_PAGE);

			this.activePageIndex = -1;
			if (this.pages.length > 0) this.toNextPage();			
		}
	}

	get pages() {
		if (!this.#pages) this.#pages = Array.from(this.root.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_PAGE));

		return this.#pages;
	}

	get state() {
		return this.#state;
	}

	set state(state) {
		const actual = this.#state;
		if (state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING) {
			if (actual == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT && state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) readonly(this, true);
			else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT && state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
				readonly(this, false);
				if (this.activePage) this.activePage.active = true;
			}
		}
		this.#state = state;

		if (actual != state) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STATE, state);
	}

	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	async value(data) {
		await this.ready;
		if (this.#validation) await this.#validation;
		if (arguments.length == 0) return this.#data;

		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			await Promise.all(this.pages.map(page => {				
				const name = page.name;
				return name ? page.value((0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_11__.valueHelper)(data, name)) : page.value(data);
			}));

			await this.#validate();
		}else{
			return new Promise((resolve) => {
				const handle = (event) => {
					event.stopPropagation();
					this.removeOn(handle, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED);
					resolve(this.value(data));
				}
				this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED, handle)
			});
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;

			this.scrollIntoView();
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED);
		}
	}

	get prevPage() {
		return (async () => {			
			const pages = this.pages;
			const start = this.activePageIndex - 1;
			const data = await this.value();
			for (let i = start; i >= 0; i--) {
				const page = pages[i];
				await page.validate(data);
				if (page.condition) return page;
			}

			return null;
		})();
	}

	get nextPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex + 1;
			const data = await this.value();
			if (pages) {
				for (let i = start; i < pages.length; i++) {
					const page = pages[i];
					await page.validate(data);
					if (page.condition) return page;
				}
			}
			return null;
		})();
	}

	async toPrevPage() {
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY;
	}

	get submitActions() {
		let actions = _submitActions(this);
		if (!actions) {
			actions = [];
			let endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ENDPOINT);
			if (endpoint) {
				const method = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_METHOD) || "post";
				this.append(new _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_9__["default"](endpoint, method));
			}

			const childs = this.children;
			for (let child of childs) {
				if (child instanceof _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_8__["default"]) actions.push(child);
			}
			_submitActions(this, actions);
		}

		return actions;
	}

	async submit() {
		const data = await this.value();
		const valid = await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_12__.validateFields)(data, this.pages);
		if (!valid) return;

		if (!this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT)) this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED;

		const actions = this.submitActions;
		if (actions) {
			const results = await executeActions(actions, data);
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT, data);
	}

	#validate(page) {
		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING;
			return (this.#validation = new Promise((resolved) => {
				setTimeout(async () => {
					const data = this.#data;//await fieldValueMapToObject(this.#value);
					
					const valid = page ? page.validate(data) : await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_12__.validateFields)(data, this.pages);

					if (!this.#hasNextValidation) this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;

					this.validation = null;
					resolved(valid);
				}, 10);
			}));
		} else if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING) {
			this.#validation.then(async () => {
				this.#hasNextValidation = false;
				await this.#validate(page);
			});
		}
	}

	async childValueChanged(field, value) {
		await this.ready;		
		value = await value;
		const map = this.#value;
		//console.log(`form.childValueChanged(${field.name})`, { field, value });
		if (field) {
			if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_6__.noValue)(value)) map.delete(field);
			else map.set(field, value);
		}

		this.#data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_11__.fieldValueMapToObject)(this.#value, this.pages);

		const activePage = this.activePage;
		if (activePage) await this.#validate(activePage);
		else await this.#validate();
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Form);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED];

class FormButton extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	#initialized = false;
	#form;

	constructor() {
		super();

		this.on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			if (this.active && !this.disabled) this.execute();
		});
	}

	async init() {
		await super.init();
		if (this.#initialized) {
			this.active = false;
			this.disabled = false;
			this.#initialized = true;
		}
	}

	get form() {
		if (!this.#form)
			this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM);

		return this.#form;
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, active ? "" : null);
	}

	get disabled() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED);
	}

	set disabled(disabled) {
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED, disabled ? "" : null);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseField */ "./src/BaseField.js");
/* harmony import */ var _list_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/Row */ "./src/list/Row.js");
/* harmony import */ var _list_AddRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/AddRow */ "./src/list/AddRow.js");
/* harmony import */ var _list_DeleteRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/DeleteRow */ "./src/list/DeleteRow.js");
/* harmony import */ var _list_Rows__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list/Rows */ "./src/list/Rows.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/ValidationHelper */ "./src/utils/ValidationHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");











const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX];

const buildData = async (rows, values) => {
	let data = [];
	for (let row of rows) data.push(values.get(row));

	if (data.length == 0) data = null;

	return data;
};

class List extends _BaseField__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST;
	}

	#template;
	#container;
	#values = new Map();
	#addRowButton;
	#initialized = false;

	constructor(options) {
		super(options);

		const root = this.root;
		root.on(_list_AddRow__WEBPACK_IMPORTED_MODULE_5__.EVENT__INITIALIZED__BUTTON__ADDROW, (event) => {
			this.#addRowButton = event.target;
			event.stopPropagation();
		});


		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED, (event) => {
			const target = event.target;
			if(target != this){
				event.preventDefault();
				event.stopPropagation();
			}
		});

		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_ADD, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { readonly } = this;
			if (!readonly) this.createRow();
		});

		root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_DELETE, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { rows, readonly } = this;
			if (!readonly) {
				const row = event.target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROW);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();
				}
			}
		});

		this.addValidation(async () => {
			const { rows, min, max, readonly } = this;
			const length = rows.length;
			if (this.#addRowButton && !readonly) {
				if (length == max) this.#addRowButton.disabled = true;
				else if (length < max) this.#addRowButton.disabled = false;
			}
			return min <= length && length <= max;
		});

		this.addValidation(async (data) => {
			return await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_8__.validateFields)(data, this.rows);
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {			
			this.#initialized = true;
			const rowTemplate = this.find("template").first();
			if(rowTemplate)
				this.#template = rowTemplate.content;
				
			this.#container = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROWS).first();
		}
	}

	readonlyUpdated() {
		const { readonly } = this;
		for (let row of this.rows) {
			row.readonly = readonly;
		}
	}

	get rows() {
		return Array.from(this.#container.children);
	}

	get min() {
		if (this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN)) return Math.max(0, parseInt(this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN)));
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

	async createRow(value) {
		const row = document.importNode(this.#template, true).children[0];
		await this.#container.append(row);

		if (value) await row.value(value);

		return row;
	}

	async updatedValue(values) {
		this.#values.clear();
		this.#container.empty();
		if (values) await Promise.all(values.map(value => this.createRow(value)));

		return await buildData(this.rows, this.#values);
	}

	async childValueChanged(row, value) {
		value = await value;
		const values = this.#values;

		if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_9__.noValue)(value)) this.#values.delete(row);
		else this.#values.set(row, value);

		await super.childValueChanged(row, value);
		const data = await buildData(this.rows, values);
		await this.publishValue(data);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(List);
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");




const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];



class Message extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_2__.NODENAME_MESSAGE;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.EVENT_MESSAGE_INITIALIZED);
	}

	async destroy(){
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.EVENT_MESSAGE_REMOVED);
		await super.destroy();
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

	async update(data) {
		await this.ready;
		this.active = await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_0__.ExpressionResolver.resolve(this.condition, data, false);
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Message);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container */ "./src/Container.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STEP];

class Page extends _Container__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Container__WEBPACK_IMPORTED_MODULE_2__["default"].observedAttributes);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_PAGE;
	}
	
	constructor(options) {
		super(options);
		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PAGE_INITIALIZED));
	}

	async destroy(){
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PAGE_REMOVED);
		await super.destroy();
	}

	get step(){
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STEP);
	}
	
	conditionUpdated(){}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Page);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Step */ "./src/Step.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS];

const firstStepPageIndex = (pages, step, activePage) => {
	for (let page of pages) {
		if (page.step == step && page.condition) return page;
		else if (page == activePage) return;
	}

	return null;
};

class ProgressBar extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_PROGESSBAR;
	}

	#form;
	#steps;
	#initialized = false;
	constructor() {
		super();
		this.on("click", ({ target }) => {
			if (!this.#form) return;
			if (target == this) return;			
			const step = target.is(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_STEP) ? target : target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_STEP);
			const form = this.#form;

			if (!step) return;

			const {state, pages, activePage} = form;
			const stepName = step.name;
			if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT || state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) form.activePage = page;
			}
		});
	}

	async init() {
		await super.init();
		this.progress = 0;
		if (!this.#initialized) {
			const form = this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM);
			this.#steps = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_STEP);
			this.#form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED,_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED], () => {
				const state = form.state;
				if(_Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING == state)
					return;

					
				const {activePageIndex, activePage, pages} = form;
				if (!activePage) 
					return;

				const count = pages.length;
				const pageStep = activePage ? activePage.step : _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INIT;
				const progress = Math.floor((activePageIndex * 100) / count);

				for (let step of this.steps) {
					const name = step.name;
					if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
						step.active = name == pageStep;
						step.readonly = false;
					} else if (state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY) {
						step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY;
						step.readonly = false;
					} else {
						step.active = name == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED;
						step.readonly = true;
					}
				}

				this.progress = state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY || state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED ? 100 : progress;

				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_PROGRESSBAR_CHANGED);
			});

			this.#initialized = true;
		}
	}

	get steps(){
		return Array.from(this.#steps);
	}

	get progress() {
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS);
	}

	set progress(progress) {
		if (this.style.setProperty) this.style.setProperty("--progress", progress + "%");
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_PROGRESS, Math.max(0, Math.min(progress, 100)));
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(ProgressBar);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY];

class Step extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_STEP;
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

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(Step);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Step);


/***/ }),

/***/ "./src/Validation.js":
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION];


class Validation extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_VALIDATION;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.active = false;
		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_INITIALIZED));
	}

	async destroy() {
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_REMOVED);
		await super.destroy();
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, undefined);
	}

	get condition() {
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION);
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Validation);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validation);


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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [];
class BackButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_BACK;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toPrevPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackButton);
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(BackButton);


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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [];
class NextButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_NEXT;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextButton);
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(NextButton);


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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [];
class SubmitButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUBMIT;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.submit();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitButton);
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(SubmitButton);


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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [];
class SummaryButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUMMARY;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.toNextPage();
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryButton);
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(SummaryButton);


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
/* harmony export */   "SubmitButton": () => (/* reexport safe */ _SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "SummaryButton": () => (/* reexport safe */ _SummaryButton__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _BackButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackButton */ "./src/controls/BackButton.js");
/* harmony import */ var _NextButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NextButton */ "./src/controls/NextButton.js");
/* harmony import */ var _SummaryButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SummaryButton */ "./src/controls/SummaryButton.js");
/* harmony import */ var _SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitButton */ "./src/controls/SubmitButton.js");








/***/ }),

/***/ "./src/handels/ConditionHandle.js":
/*!****************************************!*\
  !*** ./src/handels/ConditionHandle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");



class ConditionHandle {

    #base;
    #condition;

    constructor(base){  
        this.#base = base;
    }

    get condition(){
        if(!this.#condition)
            this.#condition = this.#base.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION) || false;

        return this.#condition;
    }

    async validate(data){
        const base = this.#base;        
        let condition = this.condition;
        const current = base.condition;
        
        //console.log(`condition(${base.name})`, condition, data);        
        
        condition = condition ? await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(condition, data, false) : true;
        if(condition != current)
            base.condition = condition

        //console.log(`condition(${base.name}) result:`, condition);
        return condition;
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConditionHandle);

/***/ }),

/***/ "./src/handels/EditableHandle.js":
/*!***************************************!*\
  !*** ./src/handels/EditableHandle.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");



class EditableHandle {
	#base;
	#condition = null;

	constructor(base) {
		this.#base = base;
	}

	get condition() {
		if (this.#condition == null)
			this.#condition = this.#base.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE_CONDITION) || "";

		return this.#condition;
	}

	async validate(data) {
        let editable = true;
		const current = this.#base.editable;
        /*const {hasValue, required} = this.#base;
        
        if(!hasValue && required)
            editable = true;
        else*/ if(this.condition)
            editable = await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(this.condition, data, false);

		if (editable != current) this.#base.editable = editable;

		return editable;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditableHandle);


/***/ }),

/***/ "./src/handels/MessageHandle.js":
/*!**************************************!*\
  !*** ./src/handels/MessageHandle.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");



class MessageHandle {

    #messages = new Set();

    constructor(base){
        base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_MESSAGE_INITIALIZED, (event) =>{
            event.preventDefault();
            event.stopPropagation();
            const target = event.target;
            this.#messages.add(target);
        });

        base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_MESSAGE_REMOVED, (event) =>{            
            event.preventDefault();
            event.stopPropagation();
            const target = event.target;
            this.#messages.delete(target);
        }); 
    }

    async validate(data) {
        for(let message of this.#messages)
            message.update(data);
    }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageHandle);

/***/ }),

/***/ "./src/handels/ValidationHandle.js":
/*!*****************************************!*\
  !*** ./src/handels/ValidationHandle.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");



const validateCustomValidations = async (validations, data, base) => {
	let valid = true;
	for (let check of validations) {
		if (!(await check({ data, base }))) valid = false;
	}
	return valid;
};

class ValidationHandle {
	#base;
	#validations = new Set();
	#customs = new Set();

	constructor(base) {
		this.#base = base;
		base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_INITIALIZED, (event) => {
			event.stopPropagation();
			this.#validations.add(event.target);
		});

		base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_REMOVED, (event) => {
			event.stopPropagation();
			this.#validations.delete(event.target);
		});
	}

	addCustomValidation(validation) {
		this.#customs.add(validation);
	}

	async validate(data) {
		const base = this.#base;
		const customs = this.#customs;
		const validations = this.#validations;
		const currentValid = this.#base.valid;
		const { hasValue, required, condition, editable } = this.#base;

		//console.log(`${base.nodeName}(${base.name}) validate:`, { hasValue, required, condition, editable, currentValid }, data, base.nodeName);
		let valid = true;
		if (condition) {
			valid = required ? hasValue : true;

			if (!(await validateCustomValidations(customs, data, base))) valid = false;

			for (let validation of validations) {
				if (valid && hasValue) {
					const test = await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(validation.condition, data, true);
					validation.active = !test;
					if (!test) valid = false;
				} else validation.active = false;
			}
		}

		base.valid = valid;

		//console.log(`${base.nodeName}(${base.name}) validate result:`, {valid});
		return valid;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationHandle);


/***/ }),

/***/ "./src/list/AddRow.js":
/*!****************************!*\
  !*** ./src/list/AddRow.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT__INITIALIZED__BUTTON__ADDROW": () => (/* binding */ EVENT__INITIALIZED__BUTTON__ADDROW),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const EVENT__INITIALIZED__BUTTON__ADDROW = `${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ADD_ROW}:initialized`;

const ATTRIBUTES = [];
class AddRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME(){
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ADD_ROW;
	}

	constructor() {
		super();
		this.ready.then(() => this.trigger(EVENT__INITIALIZED__BUTTON__ADDROW))
	}

	async init() {
		await super.init();
		this.active = true;
	}

	execute() {
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_ADD);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(AddRow);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");




const ATTRIBUTES = [];

class DeleteRow extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_DELETE_ROW;
	}

	constructor() {
		super();
	}

	async init(){
		await super.init();
		this.active	= true;
	}

	execute() {
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_LIST_ROW_DELETE);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_2__.define)(DeleteRow);
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
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROW;
	}	
	
	constructor(options) {
		super(options);
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
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");



const ATTRIBUTES = [];
class ListRows extends _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROWS;
	}

	constructor() {
		super();
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(ListRows);
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
/* harmony export */   "STATE_FAIL": () => (/* binding */ STATE_FAIL),
/* harmony export */   "STATE_SUCCESS": () => (/* binding */ STATE_SUCCESS),
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
/* harmony export */   "fieldValueMapToObject": () => (/* binding */ fieldValueMapToObject),
/* harmony export */   "rebuildDataByFields": () => (/* binding */ rebuildDataByFields),
/* harmony export */   "updateData": () => (/* binding */ updateData),
/* harmony export */   "valueHelper": () => (/* binding */ valueHelper)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseField */ "./src/BaseField.js");




const updateData = async (data, name, value) => {
	if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value)) {
		if (name) valueHelper(data, name, value);
		else Object.assign(data, value);
	}
	return data;
};

const fieldValueMapToObject = async (map, fieldOrder) => {	
	//console.log("fieldValueMapToObject: ", map, fieldOrder);
	let data = {};
	if (fieldOrder) {
		for (let field of fieldOrder) {
			const name = field.name;
			const value = map.get(field);
			data = await updateData(data, name, value);
		}
	} else {
		for (let [{ name }, value] of map) {
			data = await updateData(data, name, value);
		}
	}

	return data;
};

const rebuildDataByFields = async (fields) => {
	let data = {};
	for (let field of fields) {
		const value = await field.value();
		if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value)) {
			const name = field.name;
			data = await updateData(data, name, value);
		}
	}
	return data;
};

const evaluationData = async (base) => {
	await base.ready;
	const data = {};
	data[_Constants__WEBPACK_IMPORTED_MODULE_0__.SPECIALVARS.CURRENTVALUE] = (0,_BaseField__WEBPACK_IMPORTED_MODULE_2__._value)(base);

	let row = base.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROW);
	let temp = data;
	while (row) {
		temp[_Constants__WEBPACK_IMPORTED_MODULE_0__.SPECIALVARS.CURRENTLISTROW] = await (0,_BaseField__WEBPACK_IMPORTED_MODULE_2__._value)(row);
		temp = temp[_Constants__WEBPACK_IMPORTED_MODULE_0__.SPECIALVARS.CURRENTLISTROW];
		row = row.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROW);
	}

	return data;
};

const NAME_SPLITTER = /\./g;
const valueHelper = function (data, name, value) {
	const names = name.split(NAME_SPLITTER);
	if (arguments.length == 2) return getValue(data, names);

	const del = (0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value);
	if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(data) && del) return data;

	return setValue(del, data, value, names);
};

const setValue = (remove, data, value, names) => {
	if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(data) && remove) return null;

	const name = names.shift();
	if (names.length == 0) {
		if (remove) delete data[name];
		else data[name] = value;
	} else {
		if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(data[name])) data[name] = {};
		setValue(remove, data[name], value, names);
	}

	return data;
};

const getValue = (data, names) => {
	if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(data)) return null;
	if (names.length == 0) return data;

	const name = names.shift();
	return getValue(data[name], names);
};


/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeEventCopy": () => (/* binding */ makeEventCopy),
/* harmony export */   "toEvents": () => (/* binding */ toEvents),
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
/* harmony export */   "findFields": () => (/* binding */ findFields),
/* harmony export */   "findValidations": () => (/* binding */ findValidations),
/* harmony export */   "treeFilter": () => (/* binding */ treeFilter)
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
/* harmony export */   "updateActiveState": () => (/* binding */ updateActiveState),
/* harmony export */   "updateConditionState": () => (/* binding */ updateConditionState),
/* harmony export */   "updateEditableState": () => (/* binding */ updateEditableState),
/* harmony export */   "updateReadonlyState": () => (/* binding */ updateReadonlyState),
/* harmony export */   "updateValidState": () => (/* binding */ updateValidState)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const updateValidState = (target, valid) => {
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

	target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALID_STATE_CHANGED);
};

const updateConditionState = (target, valid) => {
	if (typeof valid === "undefined" || valid == null) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, null);
	} else if (valid) {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, "");
	} else {
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_VALID, null);
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID, "");
	}

	target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_CONDITION_STATE_CHANGED);
};

const updateActiveState = (target, active, initial = false) => {
	const oldState = target.active;
	active ? target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, null);
	if (oldState != active || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTIVE_STATE_CHANGED);
};

const updateReadonlyState = (target, readonly, initial = false) => {
	const oldState = target.readonly;
	if (readonly) 
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, "");
	else
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, null);
	
	if (oldState != readonly || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_EDITABLE_STATE_CHANGED);
};

const updateEditableState = (target, editable, initial = false) => {
	const oldState = target.editable;
	if (editable) 
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, "");
	else
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, null);

	if (oldState != editable || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_EDITABLE_STATE_CHANGED);
};

/***/ }),

/***/ "./src/utils/ValidationHelper.js":
/*!***************************************!*\
  !*** ./src/utils/ValidationHelper.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateFields": () => (/* binding */ validateFields)
/* harmony export */ });
const validateFields = async (data, fields) => {
    return (await Promise.all(fields.map(field => field.validate(data))))
        .reduce((valid, fieldValid) => valid ? fieldValid: false, true);
}

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

		//field.trigger(EVENT_FIELD_INPUT, this.value);
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
		const currentValue =  this.input.val();
		if (this.field.value != this.value)
			this.input.val(value ? value : currentValue);
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





const INPUTSELECTOR = 'input:not([type="file"],[type="radio"],[type="checkbox"],[type="button"],[type="submit"],[type="reset"]),input:not([type]), textarea';

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
	
	#defaultValue;
	
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
/* harmony export */   "findWrapper": () => (/* binding */ findWrapper),
/* harmony export */   "wrappers": () => (/* binding */ wrappers)
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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseField": () => (/* reexport safe */ _src_BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "BaseSubmitAction": () => (/* reexport safe */ _src_submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Container": () => (/* reexport safe */ _src_Container__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Field": () => (/* reexport safe */ _src_Field__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Form": () => (/* reexport safe */ _src_Form__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "List": () => (/* reexport safe */ _src_List__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Page": () => (/* reexport safe */ _src_Page__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "SubmitActionResult": () => (/* reexport safe */ _src_submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var _src_BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/BaseField */ "./src/BaseField.js");
/* harmony import */ var _src_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Field */ "./src/Field.js");
/* harmony import */ var _src_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Container */ "./src/Container.js");
/* harmony import */ var _src_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/List */ "./src/List.js");
/* harmony import */ var _src_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Page */ "./src/Page.js");
/* harmony import */ var _src_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Form */ "./src/Form.js");
/* harmony import */ var _src_submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _src_submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/submitActions/SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");










})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNSO0FBQ1E7QUFDVjtBQUNEO0FBQ0M7QUFDc0M7QUFDSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvaGFuZGVscy9FZGl0YWJsZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvTWVzc2FnZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0NoZWNrYm94LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9GaWxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9SYWRpby5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvU2VsZWN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9UZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9XcmFwcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xyXG5cdGNvbnN0cnVjdG9yKGtleSwgY29udGV4dCl7XHJcblx0XHR0aGlzLmtleSA9IGtleTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0fVxyXG5cdFxyXG5cdGdldCBrZXlEZWZpbmVkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5rZXkgaW4gdGhpcy5jb250ZXh0OyBcclxuXHR9XHJcblx0XHJcblx0Z2V0IGhhc1ZhbHVlKCl7XHJcblx0XHRyZXR1cm4gISF0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRnZXQgdmFsdWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgdmFsdWUoZGF0YSl7XHJcblx0XHR0aGlzLmNvbnRleHRbdGhpcy5rZXldID0gZGF0YTtcclxuXHR9XHJcblx0XHJcblx0c2V0IGFwcGVuZChkYXRhKSB7XHJcblx0XHRpZighdGhpcy5oYXNWYWx1ZSlcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRcdHZhbHVlLnB1c2goZGF0YSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZW1vdmUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgbG9hZChkYXRhLCBrZXksIGNyZWF0ZT10cnVlKSB7XHJcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XHJcblx0XHRjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiXFwuXCIpO1xyXG5cdFx0bGV0IG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcclxuXHRcdFx0aWYoIWNvbnRleHRbbmFtZV0pe1xyXG5cdFx0XHRcdGlmKCFjcmVhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRjb250ZXh0W25hbWVdID0ge31cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Y29udGV4dCA9IGNvbnRleHRbbmFtZV07XHJcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xyXG5cdH1cclxufTsiLCJpbXBvcnQgT2JqZWN0UHJvcGVydHkgZnJvbSBcIi4vT2JqZWN0UHJvcGVydHkuanNcIjtcclxuLyoqXHJcbiAqIGFwcGVuZCBhIHByb3BlcnkgdmFsdWUgdG8gYW4gb2JqZWN0LiBJZiBwcm9wZXJ5IGV4aXN0cyBpdHMgd291bGQgYmUgY29udmVydGVkIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKlxyXG4gKiAgQHJldHVybiByZXR1cm5zIHRoZSBjaGFuZ2VkIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKTtcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICpcclxuICogQHJldHVybiBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNQb2pvID0gZnVuY3Rpb24gKGFPYmplY3QpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGFPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgYU9iamVjdCAhPSBudWxsICYmIGFPYmplY3QuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIHNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuXHRpZighdGFyZ2V0KVxyXG5cdFx0dGFyZ2V0ID0ge307XHJcblxyXG5cdGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcblx0XHRpZiAoaXNQb2pvKHNvdXJjZSkpIHtcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNQb2pvKHRhcmdldFtrZXldKSkgbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuXHRcdFx0XHRlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbiAoeyBuYW1lcywgYWxsb3dlZCB9KSB7XHJcblx0cmV0dXJuIChuYW1lLCB2YWx1ZSwgY29udGV4dCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5hbWVzLmluY2x1ZGVzKG5hbWUpID09PSBhbGxvd2VkO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7IGRlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdIH0gPSB7fV0gPSBhcmd1bWVudHM7XHJcblx0Y29uc3QgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5IHx8IHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHBhcmVudHMuaW5jbHVkZXNbdmFsdWVdIHx8IHZhbHVlID09IGRhdGEpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlIHJlc3VsdFtuYW1lXSA9IGZpbHRlcih2YWx1ZSwgcHJvcEZpbHRlciwgeyBkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6IHBhcmVudHMuY29uY2F0KGRhdGEpIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZWYWx1ZSA9IChvLCBuYW1lLCB2YWx1ZSkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHR2YWx1ZSxcclxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlZkdldCA9IChvLCBuYW1lLCBnZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvLFxyXG5cdGFwcGVuZCxcclxuXHRtZXJnZSxcclxuXHRmaWx0ZXIsXHJcblx0YnVpbGRQcm9wZXJ0eUZpbHRlcixcclxuXHRkZWZWYWx1ZSxcclxuXHRkZWZHZXQsXHJcblx0ZGVmR2V0U2V0LFxyXG59O1xyXG4iLCJjb25zdCBQUklWQVRFX1BST1BFUlRJRVMgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVN0b3JlID0gKG9iaikgPT4ge1xyXG5cdGlmKFBSSVZBVEVfUFJPUEVSVElFUy5oYXMob2JqKSlcclxuXHRcdHJldHVybiBQUklWQVRFX1BST1BFUlRJRVMuZ2V0KG9iaik7XHJcblx0XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdFBSSVZBVEVfUFJPUEVSVElFUy5zZXQob2JqLCBkYXRhKTtcclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XHJcblx0Y29uc3QgZGF0YSA9IHByaXZhdGVTdG9yZShvYmopO1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpXHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpXHJcblx0XHRyZXR1cm4gZGF0YVtuYW1lXTtcclxuXHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpXHJcblx0XHRkYXRhW25hbWVdID0gdmFsdWU7XHJcblx0ZWxzZVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IGFsbG93ZWQgc2l6ZSBvZiBhcmd1bWVudHMhXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yID0gKHZhcm5hbWUpID0+IHtcclxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZiwgdmFsdWUpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAyKVxyXG5cdFx0XHRwcml2YXRlUHJvcGVydHkoc2VsZiwgdmFybmFtZSwgdmFsdWUpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gcHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUpO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7cHJpdmF0ZVByb3BlcnR5LCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciwgcHJpdmF0ZVN0b3JlfTsiLCJpbXBvcnQge2RlZlZhbHVlLCBkZWZHZXR9IGZyb20gXCIuL09iamVjdFV0aWxzXCJcclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IChmbiwgbXMpID0+e1xyXG5cdGxldCBjYW5jZWxlZCA9IGZhbHNlO1xyXG5cdGxldCB0aW1lb3V0ID0gbnVsbDtcclxuXHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT4ge1xyXG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0Zm4ocixlKTtcclxuXHRcdH0sIG1zKVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0aGVuID0gcHJvbWlzZS50aGVuO1xyXG5cdHByb21pc2UudGhlbiA9IChmbikgPT4ge1xyXG5cdFx0dGhlbi5jYWxsKHByb21pc2UsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYoIXRoaXMuY2FuY2VsZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZuKHJlc3VsdCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZlZhbHVlKHByb21pc2UsIFwiY2FuY2VsXCIsICgpID0+IHtcclxuXHRcdGlmKHRpbWVvdXQpe1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdGNhbmNlbGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRkZWZHZXQocHJvbWlzZSwgY2FuY2VsZCwgKCkgPT4gY2FuY2VsZWQpO1xyXG5cclxuXHRyZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBsYXp5UHJvbWlzZSA9ICgpID0+IHtcclxuXHRcdGxldCBwcm9taXNlUmVzb2x2ZSA9IG51bGw7XHJcblx0XHRsZXQgcHJvbWlzZUVycm9yID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdFx0cHJvbWlzZVJlc29sdmUgPSByO1xyXG5cdFx0XHRwcm9taXNlRXJyb3IgPSBlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXJyb3IgPSBmYWxzZTtcclxuXHRcdGxldCB2YWx1ZSA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRkZWZWYWx1ZShwcm9taXNlLCBcInJlc29sdmVcIiwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHR2YWx1ZSA9IHJlc3VsdDtcclxuXHRcdFx0cmVzb2x2ZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xyXG5cdFx0XHRcdGVycm9yID0gdHJ1ZTtcclxuXHRcdFx0XHRwcm9taXNlRXJyb3IodmFsdWUpO1xyXG5cdFx0XHR9IGVsc2UgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwidmFsdWVcIiwgKCkgPT4gdmFsdWUpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwiZXJyb3JcIiwgKCkgPT4gZXJyb3IpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwicmVzb2x2ZWRcIiwgKCkgPT4gcmVzb2x2ZWQpO1xyXG5cclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0bGF6eVByb21pc2UsXHJcblx0dGltZW91dFByb21pc2VcclxufVxyXG4iLCIvL3RoZSBzb2x1dGlvbiBpcyBmb3VuZCBoZXJlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZFxyXG5leHBvcnQgY29uc3QgVVVJRF9TQ0hFTUEgPSBcInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHV1aWQgPSAoKSA9PiB7XHJcblx0Y29uc3QgYnVmID0gbmV3IFVpbnQzMkFycmF5KDQpO1xyXG5cdHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ1Zik7XHJcblx0bGV0IGlkeCA9IC0xO1xyXG5cdHJldHVybiBVVUlEX1NDSEVNQS5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XHJcblx0XHRpZHgrKztcclxuXHRcdGNvbnN0IHIgPSAoYnVmW2lkeCA+PiAzXSA+PiAoKGlkeCAlIDgpICogNCkpICYgMTU7XHJcblx0XHRjb25zdCB2ID0gYyA9PSBcInhcIiA/IHIgOiAociAmIDB4MykgfCAweDg7XHJcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHV1aWQgfTtcclxuIiwiZXhwb3J0IGNvbnN0IG5vVmFsdWUgPSAodmFsdWUpID0+IHtcblx0cmV0dXJuIHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGVtdHB5T3JOb1ZhbHVlU3RyaW5nID0gKHZhbHVlKSA9PiB7XHRcblx0cmV0dXJuIG5vVmFsdWUodmFsdWUpIHx8IHZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRub1ZhbHVlLFxuXHRlbXRweU9yTm9WYWx1ZVN0cmluZ1xufTsiLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCIuL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL3NyYy9Db250ZXh0XCI7XG5cbmV4cG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciwgQ29udGV4dCB9O1xuIiwiY29uc3Qgc2Vla0F0Q2hhaW4gPSAocmVzb2x2ZXIsIHByb3BlcnR5KSA9PiB7XG5cdHdoaWxlKHJlc29sdmVyKXtcblx0XHRjb25zdCBkZWYgPSByZXNvbHZlci5wcm94eS5oYW5kbGUuZ2V0UHJvcGVydHlEZWYocHJvcGVydHksIGZhbHNlKTtcblx0XHRpZihkZWYpXG5cdFx0XHRyZXR1cm4gZGVmO1xuXHRcdFxuXHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xuXHR9XHRcblx0cmV0dXJuIHsgZGF0YTogbnVsbCwgcmVzb2x2ZXI6IG51bGwsIGRlZmluZWQ6IGZhbHNlIH07XG59XG5cbmNsYXNzIEhhbmRsZSB7XG5cdGNvbnN0cnVjdG9yKGRhdGEsIHJlc29sdmVyKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0Z2V0UHJvcGVydHlEZWYocHJvcGVydHksIHNlZWsgPSB0cnVlKSB7XG5cdFx0aWYgKHRoaXMuY2FjaGUuaGFzKHByb3BlcnR5KSlcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLmdldChwcm9wZXJ0eSk7XG5cdFx0XG5cdFx0bGV0IGRlZiA9IG51bGxcblx0XHRpZiAodGhpcy5kYXRhICYmIHByb3BlcnR5IGluIHRoaXMuZGF0YSlcblx0XHRcdGRlZiA9IHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9O1xuXHRcdGVsc2UgaWYoc2Vlaylcblx0XHRcdGRlZiA9IHNlZWtBdENoYWluKHRoaXMucmVzb2x2ZXIucGFyZW50LCBwcm9wZXJ0eSk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0aWYoZGVmLmRlZmluZWQpXG5cdFx0XHR0aGlzLmNhY2hlLnNldChwcm9wZXJ0eSwgZGVmKTtcblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0aGFzUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRyZXR1cm4gZGVmaW5lZDtcblx0fVxuXHRnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuXHRcdC8vQFRPRE8gd3JpdGUgdGVzdHMhISFcdFxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRhdGEgPyBkYXRhW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcblx0fVxuXHRzZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkYXRhLCBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRpZiAoZGVmaW5lZClcblx0XHRcdGRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhKVxuXHRcdFx0XHR0aGlzLmRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kYXRhID0ge31cblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9KTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXHRcdFxuXHRcdHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkIGZ1bmN0aW9uIVwiKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHQge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0LCByZXNvbHZlcikge1xuXHRcdHRoaXMuaGFuZGxlID0gbmV3IEhhbmRsZShjb250ZXh0LCByZXNvbHZlcik7XHRcdFxuXHRcdHRoaXMuZGF0YSA9IG5ldyBQcm94eSh0aGlzLmhhbmRsZSwge1xuXHRcdFx0aGFzOiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5oYXNQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5nZXRQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZGVsZXRlUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9AVE9ETyBuZWVkIHRvIHN1cHBvcnQgdGhlIG90aGVyIHByb3h5IGFjdGlvbnNcdFx0XG5cdFx0fSk7O1xuXHR9XG5cdFxuXHR1cGRhdGVEYXRhKGRhdGEpe1xuXHRcdHRoaXMuaGFuZGxlLnVwZGF0ZURhdGEoZGF0YSlcdFx0XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmhhbmRsZS5yZXNldENhY2hlKCk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdFZhbHVlIHtcblx0Y29uc3RydWN0b3IodmFsdWUpe1xuXHRcdHRoaXMuaGFzVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XHRcbn07IiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzXCJcclxuaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzXCJcclxuaW1wb3J0IERlZmF1bHRWYWx1ZSBmcm9tIFwiLi9EZWZhdWx0VmFsdWUuanNcIjtcclxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vQ29udGV4dC5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IEVYRUNVVElPTl9XQVJOX1RJTUVPVVQgPSAxMDAwO1xyXG5jb25zdCBFWFBSRVNTSU9OID0gLyhcXFxcPykoXFwkXFx7KChbYS16QS1aMC05XFwtX1xcc10rKTo6KT8oW15cXHtcXH1dKylcXH0pLztcclxuY29uc3QgTUFUQ0hfRVNDQVBFRCA9IDE7XHJcbmNvbnN0IE1BVENIX0ZVTExfRVhQUkVTU0lPTiA9IDI7XHJcbmNvbnN0IE1BVENIX0VYUFJFU1NJT05fU0NPUEUgPSA0O1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVCA9IDU7XHJcblxyXG5jb25zdCBERUZBVUxUX05PVF9ERUZJTkVEID0gbmV3IERlZmF1bHRWYWx1ZSgpO1xyXG5jb25zdCB0b0RlZmF1bHRWYWx1ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUpXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdHJldHVybiBuZXcgRGVmYXVsdFZhbHVlKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbihhU3RhdGVtZW50LCBhQ29udGV4dCkge1xyXG5cdGlmICh0eXBlb2YgYVN0YXRlbWVudCAhPT0gXCJzdHJpbmdcIilcclxuXHRcdHJldHVybiBhU3RhdGVtZW50O1xyXG5cdFx0XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbihcImNvbnRleHRcIiwgXHJcbmBcclxucmV0dXJuIChhc3luYyAoY29udGV4dCkgPT4ge1xyXG5cdHRyeXsgXHJcblx0XHR3aXRoKGNvbnRleHQpe1xyXG5cdFx0XHQgcmV0dXJuICR7YVN0YXRlbWVudH1cclxuXHRcdH1cclxuXHR9Y2F0Y2goZSl7XHJcblx0XHR0aHJvdyBlO1xyXG5cdH1cclxufSkoY29udGV4dClgXHJcblx0KTtcclxuXHRcclxuXHRsZXQgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRjb25zb2xlLndhcm4oXCJsb25nIHJ1bm5pbmcgc3RhdGVtZW50OlwiLCBhU3RhdGVtZW50LCBuZXcgRXJyb3IoKSk7XHJcblx0fSwgRVhFQ1VUSU9OX1dBUk5fVElNRU9VVClcclxuXHRsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG5cdHRyeXtcclxuXHRcdHJlc3VsdCA9IGF3YWl0IGV4cHJlc3Npb24oYUNvbnRleHQpO1xyXG5cdH1jYXRjaChlKXt9XHJcblx0XHJcblx0aWYodGltZW91dClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlID0gYXN5bmMgZnVuY3Rpb24oYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKVxyXG5cdFx0cmV0dXJuIGFSZXNvbHZlci5wYXJlbnQgPyByZXNvbHZlKGFSZXNvbHZlci5wYXJlbnQsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkgOiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoYUV4cHJlc3Npb24sIGFSZXNvbHZlci5wcm94eS5kYXRhKTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHRlbHNlIGlmIChhRGVmYXVsdCBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSAmJiBhRGVmYXVsdC5oYXNWYWx1ZSlcclxuXHRcdHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYXRjaCA9IGFzeW5jIChyZXNvbHZlciwgbWF0Y2gsIGRlZmF1bHRWYWx1ZSkgPT4ge1xyXG5cdGlmKG1hdGNoW01BVENIX0VTQ0FQRURdKVxyXG5cdFx0cmV0dXJuIG1hdGNoW01BVENIX0ZVTExfRVhQUkVTU0lPTl07IFxyXG5cdFx0XHJcblx0cmV0dXJuIHJlc29sdmUocmVzb2x2ZXIsIG1hdGNoW01BVENIX0VYUFJFU1NJT05fU1RBVEVNRU5UXSwgbm9ybWFsaXplKG1hdGNoW01BVENIX0VYUFJFU1NJT05fU0NPUEVdKSwgZGVmYXVsdFZhbHVlKTtcclxufVxyXG5cclxuY29uc3Qgbm9ybWFsaXplID0gdmFsdWUgPT4ge1xyXG5cdGlmICh2YWx1ZSkge1xyXG5cdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcblx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID09IDAgPyBudWxsIDogdmFsdWU7XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyIHtcclxuXHRjb25zdHJ1Y3Rvcih7IGNvbnRleHQgPSBHTE9CQUwsIHBhcmVudCA9IG51bGwsIG5hbWUgPSBudWxsIH0pIHtcclxuXHRcdHRoaXMucGFyZW50ID0gKHBhcmVudCBpbnN0YW5jZW9mIEV4cHJlc3Npb25SZXNvbHZlcikgPyBwYXJlbnQgOiBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0XHR0aGlzLnByb3h5ID0gbmV3IENvbnRleHQodGhpcy5jb250ZXh0LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGdldCBjaGFpbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldCBlZmZlY3RpdmVDaGFpbigpIHtcclxuXHRcdGlmICghdGhpcy5jb250ZXh0KVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiA6IFwiXCI7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgY29udGV4dENoYWluKCkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRsZXQgcmVzb2x2ZXIgPSB0aGlzO1xyXG5cdFx0d2hpbGUgKHJlc29sdmVyKSB7XHJcblx0XHRcdGlmIChyZXNvbHZlci5jb250ZXh0KVxyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKHJlc29sdmVyLmNvbnRleHQpO1xyXG5cclxuXHRcdFx0cmVzb2x2ZXIgPSByZXNvbHZlci5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGdldERhdGEoa2V5LCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQuZ2V0RGF0YShrZXksIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQodGhpcy5jb250ZXh0LCBrZXksIGZhbHNlKTtcclxuXHRcdFx0cmV0dXJuIHByb3BlcnR5ID8gcHJvcGVydHkudmFsdWUgOiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQudXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYodGhpcy5jb250ZXh0ID09IG51bGwgfHwgdHlwZW9mIHRoaXMuY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIil7XHJcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0ge307XHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLnByb3h5LnVwZGF0ZURhdGEodGhpcy5jb250ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQodGhpcy5jb250ZXh0LCBrZXkpO1xyXG5cdFx0XHRwcm9wZXJ0eS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLnByb3h5LnJlc2V0Q2FjaGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpIHtcclxuXHRcdGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdFx0dGhpcy5wYXJlbnQubWVyZ2VDb250ZXh0KGNvbnRleHQsIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQgPyBPYmplY3RVdGlscy5tZXJnZSh0aGlzLmNvbnRleHQsIGNvbnRleHQpIDogY29udGV4dDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFEZWZhdWx0KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWMoYUV4cHJlc3Npb24pO1xyXG5cdFx0XHRpZiAobWF0Y2gpXHJcblx0XHRcdFx0cmV0dXJuIGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlKHRoaXMsIG5vcm1hbGl6ZShhRXhwcmVzc2lvbiksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBhdCBleGVjdXRpbmcgc3RhdG1lbnRcXFwiXCIsIGFFeHByZXNzaW9uLCBcIlxcXCI6XCIsIGUpO1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlLmhhc1ZhbHVlID8gZGVmYXVsdFZhbHVlLnZhbHVlIDogYUV4cHJlc3Npb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYURlZmF1bHQpIHtcclxuXHRcdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0XHRsZXQgdGVtcCA9IGFUZXh0OyAvLyByZXF1aXJlZCB0byBwcmV2ZW50IGluZmluaXR5IGxvb3BcclxuXHRcdGxldCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZXh0KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORURcclxuXHRcdHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0dGVtcCA9IHRlbXAuc3BsaXQobWF0Y2hbMF0pLmpvaW4oKTsgLy8gcmVtb3ZlIGN1cnJlbnQgbWF0Y2ggZm9yIG5leHQgbG9vcFxyXG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChtYXRjaFswXSkuam9pbih0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IChyZXN1bHQgPT0gbnVsbCA/IFwibnVsbFwiIDogcmVzdWx0KSk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZShhRXhwcmVzc2lvbiwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoe2NvbnRleHQsIHByb3BGaWx0ZXIsIG9wdGlvbj17ZGVlcDp0cnVlfSwgbmFtZSwgcGFyZW50fSl7XHJcblx0XHRjb250ZXh0ID0gT2JqZWN0VXRpbHMuZmlsdGVyKHtkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb259KTtcclxuXHRcdHJldHVybiBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHtjb250ZXh0LCBuYW1lLCBwYXJlbnR9KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IENvbXBvbmVudCAsIHtjb21wb25lbnRCYXNlT2Z9IGZyb20gXCIuL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7ZGVmaW5lfSBmcm9tIFwiLi9zcmMvdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyXCI7XG5cbmV4cG9ydCB7Q29tcG9uZW50LCBjb21wb25lbnRCYXNlT2YsIGRlZmluZX07XG4iLCJpbXBvcnQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHNcIjtcbmltcG9ydCB7IHV1aWQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRFwiO1xuaW1wb3J0IHsgaW5pdFRpbWVvdXQsIHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5cbmNvbnN0IF9yZWFkeSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicmVhZHlcIik7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluaXQgPSAoY29tcG9uZW50KSA9PiB7XG5cdGxldCB0aW1lb3V0ID0gVElNRU9VVFMuZ2V0KGNvbXBvbmVudCk7XG5cdGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0VElNRU9VVFMuZ2V0KGNvbXBvbmVudCwgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0VElNRU9VVFMuZGVsZXRlKGNvbXBvbmVudCk7XG5cdFx0dHJ5e1xuXHRcdFx0YXdhaXQgY29tcG9uZW50LmluaXQoKTtcblx0XHRcdGNvbXBvbmVudC5yZWFkeS5yZXNvbHZlKCk7XG5cdFx0fWNhdGNoKGUpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNhbid0IGluaXRpYWxpemUgY29tcG9uZW50IVwiLCBjb21wb25lbnQsIGUpO1xuXHRcdFx0Y29tcG9uZW50LnJlYWR5KHJlc29sdmUoZSkpO1xuXHRcdH1cblx0XHRjb21wb25lbnQudHJpZ2dlcihjb21wb25lbnRFdmVudG5hbWUoXCJpbml0aWFsemVkXCIsIGNvbXBvbmVudCkpO1xuXHR9LCBpbml0VGltZW91dCkpO1x0XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVUlEID0gKHByZWZpeCwgc3VmZml4KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cdGxldCBpZCA9IG51bGw7XG4gICAgd2hpbGUoY291bnQgPCAxMDApe1xuXHRcdGlkID0gYCR7cHJlZml4ID8gcHJlZml4IDogXCJcIn0ke3V1aWQoKX0ke3N1ZmZpeCA/IHN1ZmZpeCA6IFwiXCJ9YDtcblx0XHRpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKVxuXHRcdFx0cmV0dXJuIGlkO1xuXG5cdFx0Y291bnQrKztcblx0fVxuXHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcihcIlRvIG1hbnkgcmV0cmllcyB0byBjcmVhdGUgYW4gdW5pcXVlIGlkIC0gY3JlYXRlZCBpZCBpcyBub3QgdW5pcXVlIVwiKSk7XG5cdHJldHVybiBpZDtcbn07XG5cblxuXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT57XG5cdHJldHVybiBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBodG1sQmFzZVR5cGUge1xuXHRcdGNvbnN0cnVjdG9yKHtzaGFkb3dSb290ID0gZmFsc2UsIGNvbnRlbnQgPSBudWxsLCBjcmVhdGVVSUQgPSBmYWxzZSwgdWlkUHJlZml4ID0gXCJpZC1cIiwgdWlkU3VmZml4ID0gXCJcIn0gPSB7fSkge1xuXHRcdFx0c3VwZXIoKTtcblx0XHRcdF9yZWFkeSh0aGlzLCBsYXp5UHJvbWlzZSgpKTtcblx0XG5cdFx0XHRpZihjcmVhdGVVSUQpXG5cdFx0XHRcdHRoaXMuYXR0cihcImlkXCIsIGNyZWF0ZVVJRCh1aWRQcmVmaXgsIHVpZFN1ZmZpeCkpO1xuXHRcblx0XHRcdGlmKHNoYWRvd1Jvb3QpXG5cdFx0XHRcdHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOm9wZW59KTtcblx0XHRcdFxuXHRcdFx0aWYoY29udGVudClcblx0XHRcdFx0dGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJvb3QoKXtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cdFxuXHRcdGdldCByZWFkeSgpe1xuXHRcdFx0cmV0dXJuIF9yZWFkeSh0aGlzKTtcblx0XHR9XG5cdFxuXHRcdGFzeW5jIGluaXQoKSB7fVxuXHRcblx0XHRhc3luYyBkZXN0cm95KCkge1xuXHRcdFx0aWYodGhpcy5yZWFkeS5yZXNvbHZlZClcblx0XHRcdF9yZWFkeSh0aGlzLCBsYXp5UHJvbWlzZSgpKTtcblx0XHR9XG5cdFxuXHRcdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0aWYgKHRoaXMub3duZXJEb2N1bWVudCA9PSBkb2N1bWVudCAmJiB0aGlzLmlzQ29ubmVjdGVkKSBpbml0KHRoaXMpO1xuXHRcdH1cblx0XG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblx0XG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpe1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xufSBcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZihjbGF6eiA9PSBudWxsKXtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59XG5cbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTAwO1xyXG5leHBvcnQgY29uc3QgdHJpZ2dlclRpbWVvdXQgPSAxMDA7XHJcbiIsImltcG9ydCB7IGNvbXBvbmVudFByZWZpeCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHRvTm9kZU5hbWUgPSAobmFtZSwgcHJlZml4KSA9PiB7XG5cdGlmKHR5cGVvZiBwcmVmaXggPT09IFwic3RyaW5nXCIpXG5cdFx0cmV0dXJuIHByZWZpeCArIG5hbWU7XG5cdFx0XG5cdHJldHVybiBjb21wb25lbnRQcmVmaXggKyBuYW1lO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlZmluZSA9IGZ1bmN0aW9uKGNsYXp6LCBvcHRpb25zKSB7XG5cdGNvbnN0IG5vZGVuYW1lID0gY2xhenouTk9ERU5BTUU7XG5cdGlmICghY3VzdG9tRWxlbWVudHMuZ2V0KG5vZGVuYW1lKSkge1xuXHRcdGN1c3RvbUVsZW1lbnRzLmRlZmluZShub2RlbmFtZSwgY2xhenosIG9wdGlvbnMpO1xuXHR9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZTsgXG4iLCJpbXBvcnQge2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRFdmVudG5hbWUgPSAoZXZlbnRUeXBlLCBub2RlICkgPT4ge1x0XG5cdGxldCBub2RlbmFtZSA9IFwidW5zdXBwb3J0ZWRcIjtcblx0aWYodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlO1xuXHRlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcblx0XHRub2RlbmFtZSA9IG5vZGUubm9kZU5hbWU7XG5cdGVsc2UgaWYodHlwZW9mIG5vZGUuTk9ERU5BTUUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlLk5PREVOQU1FO1xuXHRlbHNlIHRocm93IG5ldyBFcnJvcihgJHt0eXBlb2Ygbm9kZX0gaXMgbm90IHN1cHBvcnRlZCBhcyBwYXJhbWV0ZXIgXCJub2RlXCIhYCk7XG5cdFxuICAgcmV0dXJuIGAke25vZGVuYW1lLnRvTG93ZXJDYXNlKCl9OiR7ZXZlbnRUeXBlfWA7Ly91c2UgQCBhcyBzZXBhcnRvciBhbmQgbm90IDpcbn07XG5cblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUgKSA9PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudEV2ZW50bmFtZShgJHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0tJHthdHRyaWJ1dGV9YCwgbm9kZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9IiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgXHJcblx0QVRUUklCVVRFX0FDVElWRSwgXHJcblx0QVRUUklCVVRFX1JFQURPTkxZLCBcclxuXHRBVFRSSUJVVEVfRVZBTFVBVEUsXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTiwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04sIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRVxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcclxuaW1wb3J0IENvbmRpdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL0NvbmRpdGlvbkhhbmRsZVwiO1xyXG5pbXBvcnQgRWRpdGFibGVIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9FZGl0YWJsZUhhbmRsZVwiO1xyXG5pbXBvcnQgVmFsaWRhdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL1ZhbGlkYXRpb25IYW5kbGVcIjtcclxuaW1wb3J0IE1lc3NhZ2VIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9NZXNzYWdlSGFuZGxlXCI7XHJcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUsIHVwZGF0ZUNvbmRpdGlvblN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlLCB1cGRhdGVSZWFkb25seVN0YXRlLCB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IF9mb3JtID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJmb3JtXCIpO1xyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSwgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OXTtcclxuXHJcbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdCNjb25kaXRpb25IYW5kbGU7XHJcblx0I2VkaXRhYmxlSGFuZGxlO1xyXG5cdCN2YWxpZGF0aW9uSGFuZGxlO1xyXG5cdCNtZXNzYWdlSGFuZGxlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLiNtZXNzYWdlSGFuZGxlID0gbmV3IE1lc3NhZ2VIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiNjb25kaXRpb25IYW5kbGUgPSBuZXcgQ29uZGl0aW9uSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jZWRpdGFibGVIYW5kbGUgPSBuZXcgRWRpdGFibGVIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiN2YWxpZGF0aW9uSGFuZGxlID0gbmV3IFZhbGlkYXRpb25IYW5kbGUodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRWYWxpZGF0aW9uKHZhbGlkYXRpb24pIHtcclxuXHRcdHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUuYWRkQ3VzdG9tVmFsaWRhdGlvbih2YWxpZGF0aW9uKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcdFx0XHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9KCR7dGhpcy5uYW1lfSkudmFsaWRhdGU6YCwgZGF0YSlcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfRVZBTFVBVEUsIFwiXCIpO1xyXG5cdFx0Y29uc3QgY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIGF3YWl0IGV2YWx1YXRpb25EYXRhKHRoaXMpKTtcclxuXHRcdGF3YWl0IHRoaXMuI2NvbmRpdGlvbkhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdGF3YWl0IHRoaXMuI2VkaXRhYmxlSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cdFx0YXdhaXQgdGhpcy4jdmFsaWRhdGlvbkhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfRVZBTFVBVEUsIG51bGwpO1xyXG5cclxuXHRcdGF3YWl0IHRoaXMuI21lc3NhZ2VIYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudmFsaWQ7XHJcblx0fVxyXG5cclxuXHRnZXQgZm9ybSgpIHtcclxuXHRcdGxldCBmb3JtID0gX2Zvcm0odGhpcyk7XHJcblx0XHRpZiAoIWZvcm0pIHtcclxuXHRcdFx0Zm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cdFx0XHRfZm9ybSh0aGlzLCBmb3JtKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb3JtO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XHJcblx0XHRpZiAoY3VycmVudCAhPSBhY3RpdmUpIHtcclxuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcclxuXHRcdFx0dGhpcy5hY3RpdmVVcGRhdGVkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY3RpdmVVcGRhdGVkKCkge31cclxuXHJcblx0Z2V0IHJlYWRvbmx5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRUFET05MWSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdGlmKCF0aGlzLmVkaXRhYmxlKVxyXG5cdFx0XHR1cGRhdGVSZWFkb25seVN0YXRlKHRoaXMsIHRydWUsICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dXBkYXRlUmVhZG9ubHlTdGF0ZSh0aGlzLCByZWFkb25seSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xyXG5cdFx0dGhpcy5yZWFkb25seVVwZGF0ZWQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlYWRvbmx5VXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCBlZGl0YWJsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRURJVEFCTEUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGVkaXRhYmxlKGVkaXRhYmxlKSB7XHJcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsIGVkaXRhYmxlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblx0XHR0aGlzLmVkaXRhYmxlVXBkYXRlZCgpO1x0XHRcclxuXHRcdHRoaXMucmVhZG9ubHkgPSAhZWRpdGFibGU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBlZGl0YWJsZVVwZGF0ZWQoKSB7XHJcblx0fVxyXG5cclxuXHRzZXQgY29uZGl0aW9uKGNvbmRpdGlvbil7XHJcblx0XHR1cGRhdGVDb25kaXRpb25TdGF0ZSh0aGlzLCBjb25kaXRpb24pO1xyXG5cdFx0dGhpcy5jb25kaXRpb25VcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCB2YWxpZCh2YWxpZCl7XHJcblx0XHR1cGRhdGVWYWxpZFN0YXRlKHRoaXMsIHZhbGlkKTtcclxuXHRcdHRoaXMudmFsaWRVcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1ZBTElEKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkVXBkYXRlZCgpe31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcclxuIiwiaW1wb3J0IHsgRVZFTlRfRklFTERfSU5JVElBTElaRUQsIEVWRU5UX0ZJRUxEX1JFTU9WRUQsIEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELCBBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1JFUVVJUkVELCBBVFRSSUJVVEVfTk9WQUxVRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XG5cbmNvbnN0IF9wYXJlbnQgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInBhcmVudFwiKTtcbmV4cG9ydCBjb25zdCBfdmFsdWUgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInZhbHVlXCIpO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9OT1ZBTFVFXTtcblxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRGaWVsZCA9IChmaWVsZCkgPT4ge1xuXHRsZXQgcGFyZW50ID0gZmllbGQucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiBwYXJlbnQ7XG5cblx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHVwZGF0ZUhhc1ZhbHVlID0gKGhhc1ZhbHVlLCBmaWVsZCkgPT4ge1xuXHRmaWVsZC5hdHRyKEFUVFJJQlVURV9OT1ZBTFVFLCAhaGFzVmFsdWUgPyBcIlwiIDogbnVsbCk7XG59O1xuXG5jbGFzcyBCYXNlRmllbGQgZXh0ZW5kcyBCYXNlIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2Uub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdGNvbnN0IHt2YWx1ZX0gPSBvcHRpb25zO1xuXHRcdF92YWx1ZSh0aGlzLCB2YWx1ZSk7XG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCkpO1xuXHR9XG5cblx0YXN5bmMgZGVzdHJveSgpIHtcdFx0XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUobnVsbCk7XG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0ZJRUxEX1JFTU9WRUQpO1xuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcblx0fVxuXG5cdGdldCBwYXJlbnRGaWVsZCgpIHtcblx0XHRsZXQgcGFyZW50ID0gX3BhcmVudCh0aGlzKTtcblx0XHRpZiAoIXBhcmVudCkge1xuXHRcdFx0cGFyZW50ID0gZmluZFBhcmVudEZpZWxkKHRoaXMpO1xuXHRcdFx0X3BhcmVudCh0aGlzLCBwYXJlbnQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGFyZW50O1xuXHR9XG5cblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHtcblx0XHR0aGlzLmFjdGl2ZSA9IHRoaXMuY29uZGl0aW9uO1xuXHRcdHJldHVybiB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcblx0fVxuXG5cdGdldCByZXF1aXJlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFUVVJUkVEKTtcblx0fVxuXG5cdGdldCBoYXNWYWx1ZSgpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9OT1ZBTFVFKTtcblx0fVxuXG5cdGFzeW5jIHZhbHVlKHZhbHVlKSB7XG5cdFx0Y29uc3Qge2NvbmRpdGlvbiwgdmFsaWQsIHJlYWR5fSA9IHRoaXM7XG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbHVlOiBgLCBhcmd1bWVudHMsIHtjb25kaXRpb24sIHZhbGlkfSk7XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuICAhY29uZGl0aW9uIHx8ICF2YWxpZCA/IG51bGwgOiBfdmFsdWUodGhpcyk7XHRcdFxuXHRcdFxuXHRcdGF3YWl0IHJlYWR5O1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblxuXHRcdGlmIChhd2FpdCB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB8fCB2YWx1ZTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT0gdmFsdWUpIHtcdFx0XHRcdFxuXHRcdFx0XHR2YWx1ZSA9IGF3YWl0IHRoaXMudXBkYXRlZFZhbHVlKHZhbHVlKSB8fCB2YWx1ZTtcdFx0XHRcdFxuXHRcdFx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgdmFsaWRhdGUoZGF0YSl7XG5cdFx0Y29uc3QgY3VycmVudENvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xuXHRcdGNvbnN0IGN1cnJlbnRWYWxpZCA9IHRoaXMudmFsaWQ7XG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCBzdXBlci52YWxpZGF0ZShkYXRhKTtcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcblx0XHRjb25zdCBoYXNDaGFuZ2UgPSBjdXJyZW50Q29uZGl0aW9uICE9IGNvbmRpdGlvbiB8fCBjdXJyZW50VmFsaWQgIT0gdmFsaWQ7XG5cdFx0aWYoaGFzQ2hhbmdlKVxuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkgeyB9XG5cblx0YXN5bmMgcHVibGlzaFZhbHVlKHZhbHVlKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRsZXQgdXBkYXRlZCA9IGZhbHNlO1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblx0XHR2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHZhbHVlIDogY3VycmVudFZhbHVlO1xuXHRcdGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHZhbHVlID0gbnVsbDtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgY3VycmVudFZhbHVlICE9IHZhbHVlKXtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcblx0XHR9XG5cblx0XHR1cGRhdGVIYXNWYWx1ZSghbm9WYWx1ZSh2YWx1ZSksIHRoaXMpO1xuXG5cdFx0Y29uc3QgcHVibGlzaW5nID0gdGhpcy5jb25kaXRpb24gJiYgKHRoaXMudmFsaWQgfHwgdXBkYXRlZCk7XG5cdFx0Y29uc3QgcHVibGlzaFZhbHVlID0gcHVibGlzaW5nID8gdmFsdWUgOiBudWxsXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnB1Ymxpc2hWYWx1ZTpgLCB7dXBkYXRlZCwgcHVibGlzaW5nLCBwdWJsaXNoVmFsdWV9KTtcblx0XHRpZih1cGRhdGVkKXtcblx0XHRcdGlmICh0aGlzLnBhcmVudEZpZWxkKSBhd2FpdCB0aGlzLnBhcmVudEZpZWxkLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIHB1Ymxpc2hWYWx1ZSk7XG5cdFx0XHRlbHNlIGF3YWl0IHRoaXMuZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCh0aGlzLCBwdWJsaXNoVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge31cbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcbiIsImV4cG9ydCBjb25zdCBIVE1MX1RBR19QUkVGSVggPSBcImQtXCI7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgPSA1MCAqIEVWRU5USEFORExFX1RJTUVPVVQ7XG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GT1JNID0gYCR7SFRNTF9UQUdfUFJFRklYfWZvcm1gO1xuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1NVQk1JVF9BQ1RJT04gPSBgJHtIVE1MX1RBR19QUkVGSVh9c3VibWl0LWFjdGlvbmA7XG5leHBvcnQgY29uc3QgTk9ERU5BTUVfUEFHRSA9IGAke0hUTUxfVEFHX1BSRUZJWH1wYWdlYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GSUVMRCA9IGAke0hUTUxfVEFHX1BSRUZJWH1maWVsZGA7XG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVEFJTkVSID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRhaW5lcmA7XG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUID0gYCR7SFRNTF9UQUdfUFJFRklYfWxpc3RgO1xuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfUk9XUz0gYCR7SFRNTF9UQUdfUFJFRklYfXJvd3NgO1xuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfUk9XPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93YDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX0FERF9ST1c9IGAke0hUTUxfVEFHX1BSRUZJWH1hZGQtcm93YDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX0RFTEVURV9ST1c9IGAke0hUTUxfVEFHX1BSRUZJWH1kZWxldGUtcm93YDtcblxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BST0dFU1NCQVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9cHJvZ3Jlc3MtYmFyYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9TVEVQID0gYCR7SFRNTF9UQUdfUFJFRklYfXN0ZXBgO1xuXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfVkFMSURBVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH12YWxpZGF0aW9uYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9NRVNTQUdFID0gYCR7SFRNTF9UQUdfUFJFRklYfW1lc3NhZ2VgO1xuXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX0JBQ0sgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1iYWNrYDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX05FWFQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1uZXh0YDtcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX0NBTkNFTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWNhbmNlbGA7XG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtc3VtbWFyeWA7XG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdWJtaXRgO1xuXG5cbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5JVCA9IFwiaW5pdFwiO1xuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9WQUxJREFUSU5HID0gXCJ2YWxpZGF0aW5nXCI7XG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0lOUFVUID0gXCJpbnB1dFwiO1xuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9TVU1NQVJZID0gXCJzdW1tYXJ5XCI7XG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0ZJTklTSEVEID0gXCJmaW5pc2hlZFwiO1xuZXhwb3J0IGNvbnN0IEZPUk1TVEFURVMgPSB7XG5cdGluaXQ6IEZPUk1TVEFURV9JTklULFxuXHR2YWxpZGF0aW5nOiBGT1JNU1RBVEVfVkFMSURBVElORyxcblx0aW5wdXQ6IEZPUk1TVEFURV9JTlBVVCxcblx0c3VtbWFyeTogRk9STVNUQVRFX1NVTU1BUlksXG5cdGZpbmlzaGVkOiBGT1JNU1RBVEVfRklOSVNIRUQsXG59O1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURTVEFURVMgPSB7XG5cdGFsd2F5czogXCJhbHdheXNcIixcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtLVwiO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRSA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplZGA7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04gPSBgJHtFVkVOVF9JTklUSUFMSVpFfXN1Ym1pdC1hY3Rpb25gO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVCA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVF9SRVNVTFRTID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdC1yZXN1bHRzYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9FWEVDVVRFX1ZBTElEQVRFID0gYCR7RVZFTlRfUFJFRklYfWV4ZWN1dGUtdmFsaWRhdGVgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWNvbmRpdGlvbi1zdGF0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9BTExfUFVCTElTSF9WQUxVRSA9IGAke0VWRU5UX1BSRUZJWH1hbGwtcHVibGlzaC12YWx1ZWA7XG5leHBvcnQgY29uc3QgRVZFTlRfVkFMVUVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC12YWx1ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9TSVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c2l0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c3RhdGUtY2hhbmdlZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5QVVQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5wdXRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0FERCA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1hZGRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0RFTEVURSA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1kZWxldGVgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9cHJvZ3Jlc3MtYmFyLWNoYW5nZWRgO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5pdGlhbGl6ZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0ZJRUxEX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtcmVtb3ZlZGA7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfXBhZ2UtaW5pdGlhbGl6ZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1BBR0VfUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH1wYWdlLXJlbW92ZWRgO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZGF0aW9uLWluaXRpYWxpemVkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWRhdGlvbi1yZW1vdmVkYDtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9bWVzc2FnZS1pbml0aWFsaXplZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfTUVTU0FHRV9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfW1lc3NhZ2UtcmVtb3ZlZGA7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1hY3RpdmUtc3RhdGUtY2hhbmdlZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZC1zdGF0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWVkaXRhYmxlLXN0YXRlLWNoYW5nZWRgO1xuXG5cbmV4cG9ydCBjb25zdCBTUEVDSUFMVkFSUyA9IHtcblx0Q1VSUkVOVFZBTFVFOiBcIiR2YWx1ZVwiLFxuXHRDVVJSRU5UTElTVFJPVzogXCIkaXRlbVwiLFxufTtcblxuLy9BVFRSSUJVVEVTXG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTkFNRSA9IFwibmFtZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FTkRQT0lOVCA9IFwiZW5kcG9pbnRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUVUSE9EID0gXCJtZXRob2RcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RBVEUgPSBcInN0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RFUCA9IFwic3RlcFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFID0gXCJ1c2Utc3VtbWFyeS1wYWdlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUID0gXCJpbnB1dC1tb2RlLWFmdGVyLXN1Ym1pdFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRCA9IFwicmVxdWlyZWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRURfT05fQUNUSVZFX09OTFkgPSBcInJlcXVpcmVkLW9uLWFjdGl2ZS1vbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0RJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRSA9IFwiZWRpdGFibGVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OID0gXCJlZGl0YWJsZS1jb25kaXRpb25cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVBRE9OTFkgPSBcInJlYWRvbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlZBTElEID0gXCJpbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VWQUxVQVRFID0gXCJldmFsdWF0ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQgPSBcImNvbmRpdGlvbi12YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCA9IFwiY29uZGl0aW9uLWludmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUlOID0gXCJtaW5cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUFYID0gXCJtYXhcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUFJPR1JFU1MgPSBcInByb2dyZXNzXCI7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVfQ09OVEFJTkVSLCBcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsIFxuXHRFVkVOVF9GSUVMRF9SRU1PVkVEIFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgQmFzZUZpZWxkLCB7IF92YWx1ZSB9IGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IHZhbHVlSGVscGVyLCBmaWVsZFZhbHVlTWFwVG9PYmplY3QgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVEFJTkVSO1xuXHR9XG5cblx0I2ZpZWxkcyA9IG51bGw7XG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcblx0XHRyb290Lm9uKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0aWYgKGZpZWxkICE9IHRoaXMpIHtcblx0XHRcdFx0aWYgKGZpZWxkIGluc3RhbmNlb2YgQmFzZUZpZWxkICYmICghdGhpcy4jZmllbGRzIHx8ICF0aGlzLiNmaWVsZHMuaGFzKGZpZWxkKSkpXG5cdFx0XHRcdFx0dGhpcy4jZmllbGRzID0gbnVsbDtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyb290Lm9uKEVWRU5UX0ZJRUxEX1JFTU9WRUQsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xuXHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQgJiYgdGhpcy4jZmllbGRzICYmIHRoaXMuI2ZpZWxkcy5oYXMoZmllbGQpKVxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcy5kZWxldGUoZmllbGQpO1xuXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICh7IGRhdGEgfSkgPT4gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5maWVsZHMpKTtcblx0fVxuXG5cdGdldCBmaWVsZHMoKSB7XG5cdFx0aWYoIXRoaXMuI2ZpZWxkcylcblx0XHRcdHRoaXMuI2ZpZWxkcyA9IG5ldyBTZXQoZmluZEZpZWxkcyh0aGlzKSk7XG5cblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNmaWVsZHMpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGNvbnN0IHsgcmVhZG9ubHksIGZpZWxkcyB9ID0gdGhpcztcblx0XHRpZiAoZmllbGRzKVxuXHRcdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG5cdFx0XHRcdGZpZWxkLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0XHR9XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1xuXHRcdG1hcC5jbGVhcigpO1xuXHRcdGNvbnN0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xuXHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoZmllbGQgPT4ge1xuXHRcdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcblx0XHRcdFx0Y29uc3QgZmllbGRWYWx1ZSA9IG5hbWUgPyB2YWx1ZUhlbHBlcih2YWx1ZSwgZmllbGQubmFtZSkgOiB2YWx1ZTtcblx0XHRcdFx0aWYoZmllbGRWYWx1ZSlcblx0XHRcdFx0XHRtYXAuc2V0KGZpZWxkLCBmaWVsZFZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIGZpZWxkLnZhbHVlKGZpZWxkVmFsdWUpO1xuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdGxldCBkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KHRoaXMuI3ZhbHVlLCBmaWVsZHMpO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5sZW5ndGggPT0gMCkgZGF0YSA9IG51bGw7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xuXHRcdC8vY29uc29sZS5sb2coYCR7dGhpcy5ub2RlTmFtZX0uY2hpbGRWYWx1ZUNoYW5nZWQoJHtmaWVsZC5uYW1lfSk6YCwge2ZpZWxkLCB2YWx1ZX0pO1xuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XG5cdFx0aWYgKGZpZWxkKSB7XG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhgZGVsZXRlICR7ZmllbGQubmFtZX1gKTtcblx0XHRcdFx0bWFwLmRlbGV0ZShmaWVsZCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhgc2V0ICR7ZmllbGQubmFtZX0gPSAke3ZhbHVlfWApO1xuXHRcdFx0XHRtYXAuc2V0KGZpZWxkLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XG5cdFx0fVxuXHRcdGxldCBkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KG1hcCwgdGhpcy5maWVsZHMpO1xuXHRcdC8vY29uc29sZS5sb2coXCJkYXRhOiBcIixkYXRhKTtcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xuXG5cdFx0YXdhaXQgc3VwZXIuY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKTtcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZShkYXRhKTtcblx0fVxufVxuXG5kZWZpbmUoQ29udGFpbmVyKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbiIsImltcG9ydCB7IFxuXHRGT1JNU1RBVEVfSU5JVCxcblx0Rk9STVNUQVRFX0lOUFVULFxuXHRGT1JNU1RBVEVfVkFMSURBVElORyxcblx0Rk9STVNUQVRFX1NVTU1BUlksXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXG5cdE5PREVOQU1FX0NPTlRST0wsXG5cdE5PREVOQU1FX0NPTlRST0xfQkFDSyxcblx0Tk9ERU5BTUVfQ09OVFJPTF9ORVhULFxuXHROT0RFTkFNRV9DT05UUk9MX0NBTkNFTCxcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQsIFxuXHROT0RFTkFNRV9GT1JNLFxuXHRFVkVOVF9JTklUSUFMSVpFRCxcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXG5cdE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWVxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCBcIi4vY29udHJvbHNcIjtcblxuY29uc3QgQlVUVE9ORFVNTVkgPSB7XG5cdGFjdGl2ZTogdHJ1ZSxcblx0ZGlzYWJsZWQ6IHRydWUsXG59O1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MO1xuXHR9XG5cblx0I2Zvcm07XG5cdCNiYWNrO1xuXHQjbmV4dDtcblx0I3N1bW1hcnk7XG5cdCNzdWJtaXQ7XG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XG5cdFx0XHR0aGlzLiNiYWNrID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfQkFDSykuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblx0XHRcdHRoaXMuI25leHQgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9ORVhUKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xuXHRcdFx0dGhpcy4jc3VtbWFyeSA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cdFx0XHR0aGlzLiNzdWJtaXQgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cblx0XHRcdHRoaXMuI2Zvcm0ub24oW0VWRU5UX0lOSVRJQUxJWkVELCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsIEVWRU5UX1NJVEVfQ0hBTkdFRF0sICgpID0+IHtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0XG5cblx0YXN5bmMgdXBkYXRlKCkge1xuXHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtO1xuXHRcdGNvbnN0IHN0YXRlID0gZm9ybS5zdGF0ZTtcblx0XHRjb25zdCBiYWNrID0gdGhpcy4jYmFjaztcblx0XHRjb25zdCBuZXh0ID0gdGhpcy4jbmV4dDtcblx0XHRjb25zdCBzdW1tYXJ5ID0gdGhpcy4jc3VtbWFyeTtcblx0XHRjb25zdCBzdWJtaXQgPSB0aGlzLiNzdWJtaXRcblxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XG5cdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdW1tYXJ5LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xuXG5cdFx0aWYoc3RhdGUgPT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRjb25zdCB7IGFjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgbmV4dFBhZ2UsIHBhZ2VzLCB1c2VTdW1tYXJ5UGFnZSB9ID0gZm9ybTtcdFxuXHRcdGNvbnN0IGhhc05leHRQYWdlID0gKGF3YWl0IG5leHRQYWdlKSAhPSBudWxsO1xuXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCkge1xuXHRcdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XG5cblx0XHRcdGlmIChoYXNOZXh0UGFnZSB8fCAoIWFjdGl2ZVBhZ2UudmFsaWQgJiYgYWN0aXZlUGFnZUluZGV4ICsgMSA8IHBhZ2VzLmxlbmd0aCkpIHtcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKHVzZVN1bW1hcnlQYWdlICYmIHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xuXHRcdFx0XHRzdW1tYXJ5LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdHN1bW1hcnkuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbmRlZmluZShDb250cm9sKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2w7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVfRklFTEQsIFxuXHRFVkVOVF9GSUVMRF9JTlBVVCBcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQmFzZUZpZWxkLCB7X3ZhbHVlfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCB7IGZpbmRXcmFwcGVyIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtcImZpbGUtZm9ybWF0XCJdO1xuXG5jbGFzcyBGaWVsZCBleHRlbmRzIEJhc2VGaWVsZCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZJRUxEO1xuXHR9XG5cblx0I2luaXRpYWxpemVkID0gZmFsc2U7XG5cdCN3cmFwcGVyO1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLm9uKEVWRU5UX0ZJRUxEX0lOUFVULCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHVibGlzaFZhbHVlKGV2ZW50LmRldGFpbCk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHR0aGlzLiN3cmFwcGVyID0gZmluZFdyYXBwZXIodGhpcyk7XG5cdFx0XHRpZiAodGhpcy4jd3JhcHBlcil7XG5cdFx0XHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoKSA9PiB0aGlzLiN3cmFwcGVyLnZhbGlkKTtcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUodGhpcy4jd3JhcHBlci52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGlmICh0aGlzLiN3cmFwcGVyKSB0aGlzLiN3cmFwcGVyLnJlYWRvbmx5ID0gdGhpcy5yZWFkb25seTtcblx0fVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRoaXMuI3dyYXBwZXIgPyB0aGlzLiN3cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xuXHR9XG5cblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy4jd3JhcHBlcikgcmV0dXJuIHRoaXMuI3dyYXBwZXIubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xuXHRcdGNvbnN0IHdyYXBwZXIgPSB0aGlzLiN3cmFwcGVyO1xuXHRcdGlmICh3cmFwcGVyKXtcblx0XHRcdGNvbnN0IGN1cnJlbnQgPSB3cmFwcGVyLnZhbHVlIHx8IG51bGw7XG5cdFx0XHRpZihjdXJyZW50ICE9IHZhbHVlKVxuXHRcdFx0XHRhd2FpdCB3cmFwcGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdGF3YWl0IHN1cGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdH1cbn1cblxuZGVmaW5lKEZpZWxkKTtcbmV4cG9ydCBkZWZhdWx0IEZpZWxkO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgTk9ERU5BTUVfUEFHRSwgRVZFTlRfSU5JVElBTElaRUQsIEVWRU5UX1BBR0VfSU5JVElBTElaRUQsIEVWRU5UX1BBR0VfUkVNT1ZFRCwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBFVkVOVF9TSVRFX0NIQU5HRUQsIEVWRU5UX1NVQk1JVCwgRVZFTlRfU1VCTUlUX1JFU1VMVFMsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCwgRk9STVNUQVRFX0lOUFVULCBGT1JNU1RBVEVfU1VNTUFSWSwgRk9STVNUQVRFX1ZBTElEQVRJTkcsIEZPUk1TVEFURV9JTklULCBGT1JNU1RBVEVfRklOSVNIRUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xuaW1wb3J0IFwiLi9NZXNzYWdlXCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uXCI7XG5pbXBvcnQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9EZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMIGFzIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgU1RBVEVfU1VDQ0VTUyBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHsgdmFsdWVIZWxwZXIsIGZpZWxkVmFsdWVNYXBUb09iamVjdCB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcbmltcG9ydCB7IHZhbGlkYXRlRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlclwiO1xuXG5jb25zdCBfc3VibWl0QWN0aW9ucyA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwic3VibWl0QWN0aW9uXCIpO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVF07XG5cbmNvbnN0IHJlYWRvbmx5ID0gKGZvcm0sIHJlYWRvbmx5KSA9PiB7XG5cdGZvciAobGV0IHBhZ2Ugb2YgZm9ybS5wYWdlcykge1xuXHRcdHBhZ2UucmVhZG9ubHkgPSByZWFkb25seTtcblx0XHRwYWdlLmFjdGl2ZSA9IHJlYWRvbmx5O1xuXHR9XG59O1xuXG5jb25zdCBleGVjdXRlQWN0aW9ucyA9IGFzeW5jIChhY3Rpb25zLCBkYXRhKSA9PiB7XG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0Zm9yIChsZXQgYWN0aW9uIG9mIGFjdGlvbnMpIHtcblx0XHRjb25zdCBhY2NlcHQgPSBhd2FpdCBhY3Rpb24uYWNjZXB0KGRhdGEpO1xuXHRcdGlmIChhY2NlcHQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IChhd2FpdCBhY3Rpb24uZXhlY3V0ZShkYXRhKSkgfHwgbmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfU1VDQ0VTUyk7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRpZiAocmVzdWx0LnN0YXRlID09IEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCkgcmV0dXJuIHJlc3VsdHM7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9GQUlMLCBlKSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZPUk07XG5cdH1cblxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblx0I3N0YXRlID0gRk9STVNUQVRFX0lOSVQ7XG5cdCNwYWdlcztcblx0I3ZhbHVlID0gbmV3IE1hcCgpO1xuXHQjZGF0YSA9IHt9O1xuXHQjdmFsaWRhdGlvbiA9IG51bGw7XG5cdCNoYXNOZXh0VmFsaWRhdGlvbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcblx0XHRyb290Lm9uKEVWRU5UX1BBR0VfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH0pO1xuXG5cdFx0cm9vdC5vbihFVkVOVF9QQUdFX1JFTU9WRUQsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgcGFnZSA9IGV2ZW50LnRhcmdldDtcblx0XHRcdHRoaXMuI3BhZ2VzID0gbnVsbDtcblx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQocGFnZSwgbnVsbCk7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KTtcblxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRUQpKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XG5cblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5JVDtcblxuXHRcdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcblxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcblx0XHRcdGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA+IDApIHRoaXMudG9OZXh0UGFnZSgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXG5cdGdldCBwYWdlcygpIHtcblx0XHRpZiAoIXRoaXMuI3BhZ2VzKSB0aGlzLiNwYWdlcyA9IEFycmF5LmZyb20odGhpcy5yb290LmZpbmQoTk9ERU5BTUVfUEFHRSkpO1xuXG5cdFx0cmV0dXJuIHRoaXMuI3BhZ2VzO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzLiNzdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuI3N0YXRlO1xuXHRcdGlmIChzdGF0ZSAhPSBGT1JNU1RBVEVfVkFMSURBVElORykge1xuXHRcdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSByZWFkb25seSh0aGlzLCB0cnVlKTtcblx0XHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XG5cdFx0XHRcdHJlYWRvbmx5KHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0aWYgKHRoaXMuYWN0aXZlUGFnZSkgdGhpcy5hY3RpdmVQYWdlLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuI3N0YXRlID0gc3RhdGU7XG5cblx0XHRpZiAoYWN0dWFsICE9IHN0YXRlKSB0aGlzLnRyaWdnZXIoRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEKTtcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1NUQVRFLCBzdGF0ZSk7XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSBpZiAocGFnZS5jb25kaXRpb24gJiYgIXBhZ2UudmFsaWQpIHJldHVybiBmYWxzZTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0YXN5bmMgdmFsdWUoZGF0YSkge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24pIGF3YWl0IHRoaXMuI3ZhbGlkYXRpb247XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIHRoaXMuI2RhdGE7XG5cblx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKHRoaXMucGFnZXMubWFwKHBhZ2UgPT4ge1x0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBwYWdlLm5hbWU7XG5cdFx0XHRcdHJldHVybiBuYW1lID8gcGFnZS52YWx1ZSh2YWx1ZUhlbHBlcihkYXRhLCBuYW1lKSkgOiBwYWdlLnZhbHVlKGRhdGEpO1xuXHRcdFx0fSkpO1xuXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZSA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlT24oaGFuZGxlLCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xuXHRcdFx0XHRcdHJlc29sdmUodGhpcy52YWx1ZShkYXRhKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5vbihFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsIGhhbmRsZSlcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmVQYWdlKCkge1xuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZVBhZ2U7XG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCB8fCB0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkge1xuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IHRoaXMucGFnZXMuaW5kZXhPZihwYWdlKTtcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkgdGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcblxuXHRcdFx0dGhpcy5zY3JvbGxJbnRvVmlldygpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NJVEVfQ0hBTkdFRCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHByZXZQYWdlKCkge1xuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1x0XHRcdFxuXHRcdFx0Y29uc3QgcGFnZXMgPSB0aGlzLnBhZ2VzO1xuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAtIDE7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gcGFnZXNbaV07XG5cdFx0XHRcdGF3YWl0IHBhZ2UudmFsaWRhdGUoZGF0YSk7XG5cdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0pKCk7XG5cdH1cblxuXHRnZXQgbmV4dFBhZ2UoKSB7XG5cdFx0cmV0dXJuIChhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XG5cdFx0XHRjb25zdCBzdGFydCA9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICsgMTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XG5cdFx0XHRpZiAocGFnZXMpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBwYWdlID0gcGFnZXNbaV07XG5cdFx0XHRcdFx0YXdhaXQgcGFnZS52YWxpZGF0ZShkYXRhKTtcblx0XHRcdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KSgpO1xuXHR9XG5cblx0YXN5bmMgdG9QcmV2UGFnZSgpIHtcblx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xuXHRcdFx0aWYgKHByZXYpIHRoaXMuYWN0aXZlUGFnZSA9IHByZXY7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgdG9OZXh0UGFnZSgpIHtcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcblx0XHRpZiAobmV4dCkge1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlID0gbmV4dDtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnVzZVN1bW1hcnlQYWdlKSB7XG5cdFx0XHR0aGlzLnN1bW1hcnkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdWJtaXQoKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyBzdW1tYXJ5KCkge1xuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfU1VNTUFSWTtcblx0fVxuXG5cdGdldCBzdWJtaXRBY3Rpb25zKCkge1xuXHRcdGxldCBhY3Rpb25zID0gX3N1Ym1pdEFjdGlvbnModGhpcyk7XG5cdFx0aWYgKCFhY3Rpb25zKSB7XG5cdFx0XHRhY3Rpb25zID0gW107XG5cdFx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmF0dHIoQVRUUklCVVRFX0VORFBPSU5UKTtcblx0XHRcdGlmIChlbmRwb2ludCkge1xuXHRcdFx0XHRjb25zdCBtZXRob2QgPSB0aGlzLmF0dHIoQVRUUklCVVRFX01FVEhPRCkgfHwgXCJwb3N0XCI7XG5cdFx0XHRcdHRoaXMuYXBwZW5kKG5ldyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbihlbmRwb2ludCwgbWV0aG9kKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuY2hpbGRyZW47XG5cdFx0XHRmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHMpIHtcblx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQmFzZVN1Ym1pdEFjdGlvbikgYWN0aW9ucy5wdXNoKGNoaWxkKTtcblx0XHRcdH1cblx0XHRcdF9zdWJtaXRBY3Rpb25zKHRoaXMsIGFjdGlvbnMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY3Rpb25zO1xuXHR9XG5cblx0YXN5bmMgc3VibWl0KCkge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhkYXRhLCB0aGlzLnBhZ2VzKTtcblx0XHRpZiAoIXZhbGlkKSByZXR1cm47XG5cblx0XHRpZiAoIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCkpIHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfRklOSVNIRUQ7XG5cblx0XHRjb25zdCBhY3Rpb25zID0gdGhpcy5zdWJtaXRBY3Rpb25zO1xuXHRcdGlmIChhY3Rpb25zKSB7XG5cdFx0XHRjb25zdCByZXN1bHRzID0gYXdhaXQgZXhlY3V0ZUFjdGlvbnMoYWN0aW9ucywgZGF0YSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlUX1JFU1VMVFMsIHJlc3VsdHMpO1xuXHRcdH1cblxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TVUJNSVQsIGRhdGEpO1xuXHR9XG5cblx0I3ZhbGlkYXRlKHBhZ2UpIHtcblx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfVkFMSURBVElORztcblx0XHRcdHJldHVybiAodGhpcy4jdmFsaWRhdGlvbiA9IG5ldyBQcm9taXNlKChyZXNvbHZlZCkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gdGhpcy4jZGF0YTsvL2F3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdCh0aGlzLiN2YWx1ZSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y29uc3QgdmFsaWQgPSBwYWdlID8gcGFnZS52YWxpZGF0ZShkYXRhKSA6IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucGFnZXMpO1xuXG5cdFx0XHRcdFx0aWYgKCF0aGlzLiNoYXNOZXh0VmFsaWRhdGlvbikgdGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcblxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGlvbiA9IG51bGw7XG5cdFx0XHRcdFx0cmVzb2x2ZWQodmFsaWQpO1xuXHRcdFx0XHR9LCAxMCk7XG5cdFx0XHR9KSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURV9WQUxJREFUSU5HKSB7XG5cdFx0XHR0aGlzLiN2YWxpZGF0aW9uLnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLiNoYXNOZXh0VmFsaWRhdGlvbiA9IGZhbHNlO1xuXHRcdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZShwYWdlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHRcdFxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XG5cdFx0Ly9jb25zb2xlLmxvZyhgZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KWAsIHsgZmllbGQsIHZhbHVlIH0pO1xuXHRcdGlmIChmaWVsZCkge1xuXHRcdFx0aWYgKG5vVmFsdWUodmFsdWUpKSBtYXAuZGVsZXRlKGZpZWxkKTtcblx0XHRcdGVsc2UgbWFwLnNldChmaWVsZCwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdHRoaXMuI2RhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIHRoaXMucGFnZXMpO1xuXG5cdFx0Y29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuYWN0aXZlUGFnZTtcblx0XHRpZiAoYWN0aXZlUGFnZSkgYXdhaXQgdGhpcy4jdmFsaWRhdGUoYWN0aXZlUGFnZSk7XG5cdFx0ZWxzZSBhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xuXHR9XG59XG5kZWZpbmUoRm9ybSk7XG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRF07XG5cbmNsYXNzIEZvcm1CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xuXHQjZm9ybTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuZGlzYWJsZWQpIHRoaXMuZXhlY3V0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0aWYgKHRoaXMuI2luaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdGdldCBmb3JtKCkge1xuXHRcdGlmICghdGhpcy4jZm9ybSlcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcblxuXHRcdHJldHVybiB0aGlzLiNmb3JtO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBhY3RpdmUgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgZGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9ESVNBQkxFRCk7XG5cdH1cblxuXHRzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBkaXNhYmxlZCA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJleGVjdXRlXCIpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtQnV0dG9uO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVfTElTVCwgTk9ERU5BTUVfTElTVF9ST1dTLCBOT0RFTkFNRV9MSVNUX1JPVywgTk9ERU5BTUVfTElTVF9BRERfUk9XLCBOT0RFTkFNRV9MSVNUX0RFTEVURV9ST1csIEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCBFVkVOVF9MSVNUX1JPV19BREQsIEVWRU5UX0xJU1RfUk9XX0RFTEVURSwgQVRUUklCVVRFX01JTiwgQVRUUklCVVRFX01BWCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5pbXBvcnQgQmFzZUZpZWxkLCB7IF92YWx1ZSB9IGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFJvdyBmcm9tIFwiLi9saXN0L1Jvd1wiO1xuaW1wb3J0IEFkZFJvdywge0VWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1d9IGZyb20gXCIuL2xpc3QvQWRkUm93XCI7XG5pbXBvcnQgXCIuL2xpc3QvRGVsZXRlUm93XCI7XG5pbXBvcnQgXCIuL2xpc3QvUm93c1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX01JTiwgQVRUUklCVVRFX01BWF07XG5cbmNvbnN0IGJ1aWxkRGF0YSA9IGFzeW5jIChyb3dzLCB2YWx1ZXMpID0+IHtcblx0bGV0IGRhdGEgPSBbXTtcblx0Zm9yIChsZXQgcm93IG9mIHJvd3MpIGRhdGEucHVzaCh2YWx1ZXMuZ2V0KHJvdykpO1xuXG5cdGlmIChkYXRhLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUO1xuXHR9XG5cblx0I3RlbXBsYXRlO1xuXHQjY29udGFpbmVyO1xuXHQjdmFsdWVzID0gbmV3IE1hcCgpO1xuXHQjYWRkUm93QnV0dG9uO1xuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xuXHRcdHJvb3Qub24oRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVywgKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLiNhZGRSb3dCdXR0b24gPSBldmVudC50YXJnZXQ7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KTtcblxuXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRpZih0YXJnZXQgIT0gdGhpcyl7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cm9vdC5vbihFVkVOVF9MSVNUX1JPV19BREQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xuXHRcdFx0aWYgKCFyZWFkb25seSkgdGhpcy5jcmVhdGVSb3coKTtcblx0XHR9KTtcblxuXHRcdHJvb3Qub24oRVZFTlRfTElTVF9ST1dfREVMRVRFLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgeyByb3dzLCByZWFkb25seSB9ID0gdGhpcztcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudChOT0RFTkFNRV9MSVNUX1JPVyk7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRcdFx0cm93LnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgeyByb3dzLCBtaW4sIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcblx0XHRcdGlmICh0aGlzLiNhZGRSb3dCdXR0b24gJiYgIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGlmIChsZW5ndGggPT0gbWF4KSB0aGlzLiNhZGRSb3dCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRlbHNlIGlmIChsZW5ndGggPCBtYXgpIHRoaXMuI2FkZFJvd0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1pbiA8PSBsZW5ndGggJiYgbGVuZ3RoIDw9IG1heDtcblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoZGF0YSkgPT4ge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucm93cyk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHRjb25zdCByb3dUZW1wbGF0ZSA9IHRoaXMuZmluZChcInRlbXBsYXRlXCIpLmZpcnN0KCk7XG5cdFx0XHRpZihyb3dUZW1wbGF0ZSlcblx0XHRcdFx0dGhpcy4jdGVtcGxhdGUgPSByb3dUZW1wbGF0ZS5jb250ZW50O1xuXHRcdFx0XHRcblx0XHRcdHRoaXMuI2NvbnRhaW5lciA9IHRoaXMuZmluZChOT0RFTkFNRV9MSVNUX1JPV1MpLmZpcnN0KCk7XG5cdFx0fVxuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0Zm9yIChsZXQgcm93IG9mIHRoaXMucm93cykge1xuXHRcdFx0cm93LnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHJvd3MoKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jY29udGFpbmVyLmNoaWxkcmVuKTtcblx0fVxuXG5cdGdldCBtaW4oKSB7XG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NSU4pKSByZXR1cm4gTWF0aC5tYXgoMCwgcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NSU4pKSk7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRnZXQgbWF4KCkge1xuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUFYKSkgcmV0dXJuIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUFYKSk7XG5cdFx0cmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gIXZhbHVlIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZSA/IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKSA6IG51bGw7XG5cdH1cblxuXHRhc3luYyBjcmVhdGVSb3codmFsdWUpIHtcblx0XHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuI3RlbXBsYXRlLCB0cnVlKS5jaGlsZHJlblswXTtcblx0XHRhd2FpdCB0aGlzLiNjb250YWluZXIuYXBwZW5kKHJvdyk7XG5cblx0XHRpZiAodmFsdWUpIGF3YWl0IHJvdy52YWx1ZSh2YWx1ZSk7XG5cblx0XHRyZXR1cm4gcm93O1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlcykge1xuXHRcdHRoaXMuI3ZhbHVlcy5jbGVhcigpO1xuXHRcdHRoaXMuI2NvbnRhaW5lci5lbXB0eSgpO1xuXHRcdGlmICh2YWx1ZXMpIGF3YWl0IFByb21pc2UuYWxsKHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy5jcmVhdGVSb3codmFsdWUpKSk7XG5cblx0XHRyZXR1cm4gYXdhaXQgYnVpbGREYXRhKHRoaXMucm93cywgdGhpcy4jdmFsdWVzKTtcblx0fVxuXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgdmFsdWUpIHtcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xuXHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuI3ZhbHVlcztcblxuXHRcdGlmIChub1ZhbHVlKHZhbHVlKSkgdGhpcy4jdmFsdWVzLmRlbGV0ZShyb3cpO1xuXHRcdGVsc2UgdGhpcy4jdmFsdWVzLnNldChyb3csIHZhbHVlKTtcblxuXHRcdGF3YWl0IHN1cGVyLmNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgdmFsdWUpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBidWlsZERhdGEodGhpcy5yb3dzLCB2YWx1ZXMpO1xuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGRhdGEpO1xuXHR9XG59XG5cbmRlZmluZShMaXN0KTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQge0V4cHJlc3Npb25SZXNvbHZlcn0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgXG5cdE5PREVOQU1FX01FU1NBR0UsXG5cdEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsXG5cdEVWRU5UX01FU1NBR0VfUkVNT1ZFRFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuXG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX01FU1NBR0U7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQpO1xuXHR9XG5cblx0YXN5bmMgZGVzdHJveSgpe1xuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9NRVNTQUdFX1JFTU9WRUQpO1xuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIHVuZGVmaW5lZCk7XG5cdH1cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cdH1cblxuXHRhc3luYyB1cGRhdGUoZGF0YSkge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHR9XG59XG5kZWZpbmUoTWVzc2FnZSk7XG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FX1BBR0UsICBcblx0QVRUUklCVVRFX1NURVAsIFxuXHRFVkVOVF9QQUdFX0lOSVRJQUxJWkVELFxuXHRFVkVOVF9QQUdFX1JFTU9WRURcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9Db250YWluZXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XG5cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb250YWluZXIge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9QQUdFO1xuXHR9XG5cdFxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9QQUdFX0lOSVRJQUxJWkVEKSk7XG5cdH1cblxuXHRhc3luYyBkZXN0cm95KCl7XG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1BBR0VfUkVNT1ZFRCk7XG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xuXHR9XG5cblx0Z2V0IHN0ZXAoKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9TVEVQKTtcblx0fVxuXHRcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cbn1cbmRlZmluZShQYWdlKTtcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVfRk9STSwgXG5cdE5PREVOQU1FX1BST0dFU1NCQVIsXG5cdE5PREVOQU1FX1NURVAsXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VELFxuXHRGT1JNU1RBVEVfSU5JVCxcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXG5cdEZPUk1TVEFURV9JTlBVVCxcblx0Rk9STVNUQVRFX1NVTU1BUlksXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXG5cdEFUVFJJQlVURV9QUk9HUkVTUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtDb21wb25lbnQgLGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5pbXBvcnQgXCIuL1N0ZXBcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfUFJPR1JFU1NdO1xuXG5jb25zdCBmaXJzdFN0ZXBQYWdlSW5kZXggPSAocGFnZXMsIHN0ZXAsIGFjdGl2ZVBhZ2UpID0+IHtcblx0Zm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xuXHRcdGlmIChwYWdlLnN0ZXAgPT0gc3RlcCAmJiBwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XG5cdFx0ZWxzZSBpZiAocGFnZSA9PSBhY3RpdmVQYWdlKSByZXR1cm47XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9QUk9HRVNTQkFSO1xuXHR9XG5cblx0I2Zvcm07XG5cdCNzdGVwcztcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMuI2Zvcm0pIHJldHVybjtcblx0XHRcdGlmICh0YXJnZXQgPT0gdGhpcykgcmV0dXJuO1x0XHRcdFxuXHRcdFx0Y29uc3Qgc3RlcCA9IHRhcmdldC5pcyhOT0RFTkFNRV9TVEVQKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVfU1RFUCk7XG5cdFx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybTtcblxuXHRcdFx0aWYgKCFzdGVwKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHtzdGF0ZSwgcGFnZXMsIGFjdGl2ZVBhZ2V9ID0gZm9ybTtcblx0XHRcdGNvbnN0IHN0ZXBOYW1lID0gc3RlcC5uYW1lO1xuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xuXHRcdFx0XHRjb25zdCBwYWdlID0gZmlyc3RTdGVwUGFnZUluZGV4KHBhZ2VzLCBzdGVwTmFtZSwgYWN0aXZlUGFnZSk7XG5cdFx0XHRcdGlmIChwYWdlKSBmb3JtLmFjdGl2ZVBhZ2UgPSBwYWdlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5wcm9ncmVzcyA9IDA7XG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xuXHRcdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcblx0XHRcdHRoaXMuI3N0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FX1NURVApO1xuXHRcdFx0dGhpcy4jZm9ybS5vbihbRVZFTlRfU0lURV9DSEFOR0VELEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRF0sICgpID0+IHtcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSBmb3JtLnN0YXRlO1xuXHRcdFx0XHRpZihGT1JNU1RBVEVfVkFMSURBVElORyA9PSBzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3Qge2FjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgcGFnZXN9ID0gZm9ybTtcblx0XHRcdFx0aWYgKCFhY3RpdmVQYWdlKSBcblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0Y29uc3QgY291bnQgPSBwYWdlcy5sZW5ndGg7XG5cdFx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURV9JTklUO1xuXHRcdFx0XHRjb25zdCBwcm9ncmVzcyA9IE1hdGguZmxvb3IoKGFjdGl2ZVBhZ2VJbmRleCAqIDEwMCkgLyBjb3VudCk7XG5cblx0XHRcdFx0Zm9yIChsZXQgc3RlcCBvZiB0aGlzLnN0ZXBzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHN0ZXAubmFtZTtcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gcGFnZVN0ZXA7XG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURV9TVU1NQVJZO1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFX0ZJTklTSEVEO1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZIHx8IHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCA/IDEwMCA6IHByb2dyZXNzO1xuXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHN0ZXBzKCl7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jc3RlcHMpO1xuXHR9XG5cblx0Z2V0IHByb2dyZXNzKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTKTtcblx0fVxuXG5cdHNldCBwcm9ncmVzcyhwcm9ncmVzcykge1xuXHRcdGlmICh0aGlzLnN0eWxlLnNldFByb3BlcnR5KSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wcm9ncmVzc1wiLCBwcm9ncmVzcyArIFwiJVwiKTtcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTLCBNYXRoLm1heCgwLCBNYXRoLm1pbihwcm9ncmVzcywgMTAwKSkpO1xuXHR9XG59XG5cbmRlZmluZShQcm9ncmVzc0Jhcik7XG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRV9TVEVQLCBcblx0QVRUUklCVVRFX05BTUUsIFxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcblx0QVRUUklCVVRFX1JFQURPTkxZIFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCB7Q29tcG9uZW50LCBkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWV07XG5cbmNsYXNzIFN0ZXAgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX1NURVA7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cbiAgICBnZXQgbmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9OQU1FKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcblx0XHRpZiAoY3VycmVudCAhPSBhY3RpdmUpIHtcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHJlYWRvbmx5KCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0cmVhZG9ubHkgPyB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xuXHR9XG59XG5cbmRlZmluZShTdGVwKTtcbmV4cG9ydCBkZWZhdWx0IFN0ZXA7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVfVkFMSURBVElPTixcblx0RVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCxcblx0RVZFTlRfVkFMSURBVElPTl9SRU1PVkVELFxuXHRBVFRSSUJVVEVfQUNUSVZFLFxuXHRBVFRSSUJVVEVfQ09ORElUSU9OXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtDb21wb25lbnQsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcblxuXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9WQUxJREFUSU9OO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVEKSk7XG5cdH1cblxuXHRhc3luYyBkZXN0cm95KCkge1xuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQpO1xuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIHVuZGVmaW5lZCk7XG5cdH1cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cdH1cbn1cbmRlZmluZShWYWxpZGF0aW9uKTtcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9DT05UUk9MX0JBQ0sgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIEJhY2tCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX0JBQ0s7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvUHJldlBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFja0J1dHRvbjtcclxuZGVmaW5lKEJhY2tCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9DT05UUk9MX05FWFQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIE5leHRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfTkVYVDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QnV0dG9uO1xyXG5kZWZpbmUoTmV4dEJ1dHRvbik7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfU1VCTUlUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX1NVQk1JVDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS5zdWJtaXQoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QnV0dG9uO1xyXG5kZWZpbmUoU3VibWl0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWVxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5QnV0dG9uO1xuZGVmaW5lKFN1bW1hcnlCdXR0b24pO1xuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xuaW1wb3J0IE5leHRCdXR0b24gZnJvbSBcIi4vTmV4dEJ1dHRvblwiO1xuaW1wb3J0IFN1bW1hcnlCdXR0b24gZnJvbSBcIi4vU3VtbWFyeUJ1dHRvblwiO1xuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcblxuZXhwb3J0IHtcblx0QmFja0J1dHRvbixcblx0TmV4dEJ1dHRvbixcblx0U3VtbWFyeUJ1dHRvbixcblx0U3VibWl0QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY2xhc3MgQ29uZGl0aW9uSGFuZGxlIHtcclxuXHJcbiAgICAjYmFzZTtcclxuICAgICNjb25kaXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7ICBcclxuICAgICAgICB0aGlzLiNiYXNlID0gYmFzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZGl0aW9uKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuI2NvbmRpdGlvbilcclxuICAgICAgICAgICAgdGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBiYXNlLmNvbmRpdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KWAsIGNvbmRpdGlvbiwgZGF0YSk7ICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XHJcbiAgICAgICAgaWYoY29uZGl0aW9uICE9IGN1cnJlbnQpXHJcbiAgICAgICAgICAgIGJhc2UuY29uZGl0aW9uID0gY29uZGl0aW9uXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coYGNvbmRpdGlvbigke2Jhc2UubmFtZX0pIHJlc3VsdDpgLCBjb25kaXRpb24pO1xyXG4gICAgICAgIHJldHVybiBjb25kaXRpb247XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25kaXRpb25IYW5kbGU7IiwiaW1wb3J0IHsgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jbGFzcyBFZGl0YWJsZUhhbmRsZSB7XHJcblx0I2Jhc2U7XHJcblx0I2NvbmRpdGlvbiA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcclxuXHRcdHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLiNjb25kaXRpb24gPT0gbnVsbClcclxuXHRcdFx0dGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pIHx8IFwiXCI7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBsZXQgZWRpdGFibGUgPSB0cnVlO1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuI2Jhc2UuZWRpdGFibGU7XHJcbiAgICAgICAgLypjb25zdCB7aGFzVmFsdWUsIHJlcXVpcmVkfSA9IHRoaXMuI2Jhc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWhhc1ZhbHVlICYmIHJlcXVpcmVkKVxyXG4gICAgICAgICAgICBlZGl0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgZWxzZSovIGlmKHRoaXMuY29uZGl0aW9uKVxyXG4gICAgICAgICAgICBlZGl0YWJsZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKGVkaXRhYmxlICE9IGN1cnJlbnQpIHRoaXMuI2Jhc2UuZWRpdGFibGUgPSBlZGl0YWJsZTtcclxuXHJcblx0XHRyZXR1cm4gZWRpdGFibGU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0YWJsZUhhbmRsZTtcclxuIiwiaW1wb3J0IHtcclxuICAgIEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsIFxyXG4gICAgRVZFTlRfTUVTU0FHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VIYW5kbGUge1xyXG5cclxuICAgICNtZXNzYWdlcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlKXtcclxuICAgICAgICBiYXNlLm9uKEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsIChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuI21lc3NhZ2VzLmFkZCh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBiYXNlLm9uKEVWRU5UX01FU1NBR0VfUkVNT1ZFRCwgKGV2ZW50KSA9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy4jbWVzc2FnZXMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgdGhpcy4jbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UudXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUhhbmRsZTsiLCJpbXBvcnQgeyBFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVELCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY29uc3QgdmFsaWRhdGVDdXN0b21WYWxpZGF0aW9ucyA9IGFzeW5jICh2YWxpZGF0aW9ucywgZGF0YSwgYmFzZSkgPT4ge1xyXG5cdGxldCB2YWxpZCA9IHRydWU7XHJcblx0Zm9yIChsZXQgY2hlY2sgb2YgdmFsaWRhdGlvbnMpIHtcclxuXHRcdGlmICghKGF3YWl0IGNoZWNrKHsgZGF0YSwgYmFzZSB9KSkpIHZhbGlkID0gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB2YWxpZDtcclxufTtcclxuXHJcbmNsYXNzIFZhbGlkYXRpb25IYW5kbGUge1xyXG5cdCNiYXNlO1xyXG5cdCN2YWxpZGF0aW9ucyA9IG5ldyBTZXQoKTtcclxuXHQjY3VzdG9tcyA9IG5ldyBTZXQoKTtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblx0XHRiYXNlLm9uKEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbnMuYWRkKGV2ZW50LnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRiYXNlLm9uKEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0aGlzLiN2YWxpZGF0aW9ucy5kZWxldGUoZXZlbnQudGFyZ2V0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YWRkQ3VzdG9tVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XHJcblx0XHR0aGlzLiNjdXN0b21zLmFkZCh2YWxpZGF0aW9uKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgY3VzdG9tcyA9IHRoaXMuI2N1c3RvbXM7XHJcblx0XHRjb25zdCB2YWxpZGF0aW9ucyA9IHRoaXMuI3ZhbGlkYXRpb25zO1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbGlkID0gdGhpcy4jYmFzZS52YWxpZDtcclxuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkLCBjb25kaXRpb24sIGVkaXRhYmxlIH0gPSB0aGlzLiNiYXNlO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7YmFzZS5ub2RlTmFtZX0oJHtiYXNlLm5hbWV9KSB2YWxpZGF0ZTpgLCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSwgY3VycmVudFZhbGlkIH0sIGRhdGEsIGJhc2Uubm9kZU5hbWUpO1xyXG5cdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChjb25kaXRpb24pIHtcclxuXHRcdFx0dmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcclxuXHJcblx0XHRcdGlmICghKGF3YWl0IHZhbGlkYXRlQ3VzdG9tVmFsaWRhdGlvbnMoY3VzdG9tcywgZGF0YSwgYmFzZSkpKSB2YWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgdmFsaWRhdGlvbiBvZiB2YWxpZGF0aW9ucykge1xyXG5cdFx0XHRcdGlmICh2YWxpZCAmJiBoYXNWYWx1ZSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHZhbGlkYXRpb24uY29uZGl0aW9uLCBkYXRhLCB0cnVlKTtcclxuXHRcdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gIXRlc3Q7XHJcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHZhbGlkYXRpb24uYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLnZhbGlkID0gdmFsaWQ7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHtiYXNlLm5vZGVOYW1lfSgke2Jhc2UubmFtZX0pIHZhbGlkYXRlIHJlc3VsdDpgLCB7dmFsaWR9KTtcclxuXHRcdHJldHVybiB2YWxpZDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb25IYW5kbGU7XHJcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRV9MSVNUX0FERF9ST1csIFxuXHRFVkVOVF9MSVNUX1JPV19BRERcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XID0gYCR7Tk9ERU5BTUVfTElTVF9BRERfUk9XfTppbml0aWFsaXplZGA7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIEFkZFJvdyBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCl7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfQUREX1JPVztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XKSlcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0xJU1RfUk9XX0FERCk7XG5cdH1cbn1cblxuZGVmaW5lKEFkZFJvdyk7XG5leHBvcnQgZGVmYXVsdCBBZGRSb3c7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XLFxuXHRFVkVOVF9MSVNUX1JPV19ERUxFVEVcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCl7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlXHQ9IHRydWU7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9MSVNUX1JPV19ERUxFVEUpO1xuXHR9XG59XG5cbmRlZmluZShEZWxldGVSb3cpO1xuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FX0xJU1RfUk9XXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xuaW1wb3J0IERlbGV0ZVJvdyBmcm9tIFwiLi9EZWxldGVSb3dcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgTGlzdFJvdyBleHRlbmRzIENvbnRhaW5lciB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfUk9XO1xuXHR9XHRcblx0XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93Lk5PREVOQU1FLCBMaXN0Um93KTtcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9MSVNUX1JPV1MgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIExpc3RSb3dzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX1JPV1M7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG59XG5cbmRlZmluZShMaXN0Um93cyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xyXG5pbXBvcnQgeyBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04sIE5PREVOQU1FX0ZPUk0sIEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcblxyXG4vLyBwcml2YXRlIG1lbWJlclxyXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcclxuXHJcbi8vIGxvZ2ljXHJcbmNsYXNzIEJhc2VTdWJtaXRBY3Rpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRjb25zdCBmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRfZm9ybSh0aGlzLCBmb3JtKTtcclxuXHRcdGlmIChmb3JtKSB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OKTtcclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0cmV0dXJuIF9mb3JtKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgYWNjZXB0KGRhdGEgPSB7fSkge1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG4gICAgICAgIGlmKGNvbmRpdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE92ZXJyaWRlIHRoaXMgZnVuY3Rpb24hXHJcblx0ICovXHJcblx0YXN5bmMgZXhlY3V0ZShkYXRhID0ge30pIHtcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KFNUQVRFX0ZBSUwsIFwibm90IGltcGxlbWVudGVkXCIpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYXNlU3VibWl0QWN0aW9uO1xyXG4iLCJpbXBvcnQge2RlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfU1VDQ0VTUywgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IE5PREVOQU1FID0gYCR7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0tZGVmYXVsdGA7XG5cbmNsYXNzIERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGV4dGVuZHMgQmFzZVN1Ym1pdEFjdGlvbiB7XG5cbiAgICBzdGF0aWMgZ2V0IE5PREVOQU1FKCkgeyByZXR1cm4gTk9ERU5BTUU7fVxuXG5cblx0Y29uc3RydWN0b3IoZW5kcG9pbnQsIG1ldGhvZCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xuXHRcdHRoaXMubWV0aG9kID0gbWV0aG9kO1xuXHR9XG5cblx0YXN5bmMgZXhlY3V0ZShkYXRhKSB7XHRcdFxuXHRcdGxldCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQ7XG5cdFx0ZW5kcG9pbnQgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZVRleHQoZW5kcG9pbnQsIGRhdGEsIGVuZHBvaW50KTtcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCBsb2NhdGlvbik7XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuXHRcdFx0bWV0aG9kOiB0aGlzLm1ldGhvZCxcblx0XHRcdGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcblx0XHRcdG1vZGU6IFwiY29yc1wiLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcblx0XHR9KTtcdFx0XG5cdFx0XHRcblx0XHRyZXR1cm4gbmV3IFN1Ym1pdEFjdGlvblJlc3VsdCh0aGlzLCByZXNwb25zZS5vayA/IFNUQVRFX1NVQ0NFU1MgOiBTVEFURV9GQUlMLCByZXNwb25zZSk7XHRcdFxuXHR9XG59O1xuXG5kZWZpbmUoRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24pO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb247XG4iLCJleHBvcnQgY29uc3QgU1RBVEVfU1VDQ0VTUyA9IFwic3VjY2Vzc1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0ZBSUwgPSBcImZhaWxcIjtcblxuY2xhc3MgU3VibWl0QWN0aW9uUmVzdWx0IHtcblxuICAgIHN0YXRpYyBnZXQgU1RBVEVfU1VDQ0VTUygpe3JldHVybiBTVEFURV9TVUNDRVNTO31cbiAgICBzdGF0aWMgZ2V0IFNUQVRFX0ZBSUwoKXtyZXR1cm4gU1RBVEVfRkFJTDt9XG5cbiAgICBjb25zdHJ1Y3RvcihhY3Rpb24sIHN0YXRlLCBtZXNzYWdlLCBkYXRhKXtcblx0XHR0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH07ICAgIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QWN0aW9uUmVzdWx0OyIsImltcG9ydCB7IFNQRUNJQUxWQVJTLCBOT0RFTkFNRV9MSVNUX1JPVyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcbmltcG9ydCB7IF92YWx1ZSB9IGZyb20gXCIuLi9CYXNlRmllbGRcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURhdGEgPSBhc3luYyAoZGF0YSwgbmFtZSwgdmFsdWUpID0+IHtcblx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xuXHRcdGlmIChuYW1lKSB2YWx1ZUhlbHBlcihkYXRhLCBuYW1lLCB2YWx1ZSk7XG5cdFx0ZWxzZSBPYmplY3QuYXNzaWduKGRhdGEsIHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QgPSBhc3luYyAobWFwLCBmaWVsZE9yZGVyKSA9PiB7XHRcblx0Ly9jb25zb2xlLmxvZyhcImZpZWxkVmFsdWVNYXBUb09iamVjdDogXCIsIG1hcCwgZmllbGRPcmRlcik7XG5cdGxldCBkYXRhID0ge307XG5cdGlmIChmaWVsZE9yZGVyKSB7XG5cdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRPcmRlcikge1xuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IG1hcC5nZXQoZmllbGQpO1xuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IgKGxldCBbeyBuYW1lIH0sIHZhbHVlXSBvZiBtYXApIHtcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWJ1aWxkRGF0YUJ5RmllbGRzID0gYXN5bmMgKGZpZWxkcykgPT4ge1xuXHRsZXQgZGF0YSA9IHt9O1xuXHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGF3YWl0IGZpZWxkLnZhbHVlKCk7XG5cdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XG5cdFx0XHRkYXRhID0gYXdhaXQgdXBkYXRlRGF0YShkYXRhLCBuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRpb25EYXRhID0gYXN5bmMgKGJhc2UpID0+IHtcblx0YXdhaXQgYmFzZS5yZWFkeTtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRkYXRhW1NQRUNJQUxWQVJTLkNVUlJFTlRWQUxVRV0gPSBfdmFsdWUoYmFzZSk7XG5cblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcblx0bGV0IHRlbXAgPSBkYXRhO1xuXHR3aGlsZSAocm93KSB7XG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCBfdmFsdWUocm93KTtcblx0XHR0ZW1wID0gdGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV107XG5cdFx0cm93ID0gcm93LnBhcmVudChOT0RFTkFNRV9MSVNUX1JPVyk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IE5BTUVfU1BMSVRURVIgPSAvXFwuL2c7XG5leHBvcnQgY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbiAoZGF0YSwgbmFtZSwgdmFsdWUpIHtcblx0Y29uc3QgbmFtZXMgPSBuYW1lLnNwbGl0KE5BTUVfU1BMSVRURVIpO1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gZ2V0VmFsdWUoZGF0YSwgbmFtZXMpO1xuXG5cdGNvbnN0IGRlbCA9IG5vVmFsdWUodmFsdWUpO1xuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiBkZWwpIHJldHVybiBkYXRhO1xuXG5cdHJldHVybiBzZXRWYWx1ZShkZWwsIGRhdGEsIHZhbHVlLCBuYW1lcyk7XG59O1xuXG5jb25zdCBzZXRWYWx1ZSA9IChyZW1vdmUsIGRhdGEsIHZhbHVlLCBuYW1lcykgPT4ge1xuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiByZW1vdmUpIHJldHVybiBudWxsO1xuXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHtcblx0XHRpZiAocmVtb3ZlKSBkZWxldGUgZGF0YVtuYW1lXTtcblx0XHRlbHNlIGRhdGFbbmFtZV0gPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRpZiAobm9WYWx1ZShkYXRhW25hbWVdKSkgZGF0YVtuYW1lXSA9IHt9O1xuXHRcdHNldFZhbHVlKHJlbW92ZSwgZGF0YVtuYW1lXSwgdmFsdWUsIG5hbWVzKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgZ2V0VmFsdWUgPSAoZGF0YSwgbmFtZXMpID0+IHtcblx0aWYgKG5vVmFsdWUoZGF0YSkpIHJldHVybiBudWxsO1xuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHJldHVybiBkYXRhO1xuXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xuXHRyZXR1cm4gZ2V0VmFsdWUoZGF0YVtuYW1lXSwgbmFtZXMpO1xufTtcbiIsImltcG9ydCB7RVZFTlRIQU5ETEVfVElNRU9VVH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiXG5cbmV4cG9ydCBjb25zdCB0b0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFyZ3VtZW50cykuam9pbihcIiBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZUV2ZW50Q29weSA9IChldmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcbiAgICAgICAgY3VycmVudFRhcmdldDogZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgZXhwbGljaXRPcmlnaW5hbFRhcmdldDogZXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCxcbiAgICAgICAgb3JpZ2luYWxUYXJnZXQgOiBldmVudC5vcmlnaW5hbFRhcmdldCxcbiAgICAgICAgc3JjRWxlbWVudDogZXZlbnQuc3JjRWxlbWVudCxcbiAgICAgICAgdGltZVN0YW1wOiBldmVudC50aW1lU3RhbXBcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgdG9UaW1lb3V0SGFuZGxlID0gKGhhbmRsZSwgcHJldmVudERlZmF1bHQsIHN0b3BQcm9wYWdhdGlvbiwgdGltZW91dCkgPT4ge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBjb25zdCBwcmV2ZW50ID0gdHlwZW9mIHByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgPyBwcmV2ZW50RGVmYXVsdCA6ICgpID0+IHByZXZlbnREZWZhdWx0O1xuICAgIGNvbnN0IHN0b3AgPSB0eXBlb2Ygc3RvcFByb3BhZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIgPyBzdG9wUHJvcGFnYXRpb24gOiAoKSA9PiBzdG9wUHJvcGFnYXRpb247XG5cbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmKHByZXZlbnQoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYoc3RvcChldmVudCkpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBldmVudENvcHkgPSBtYWtlRXZlbnRDb3B5KGV2ZW50KTtcblxuICAgICAgICBpZihpZClcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWQgPSBudWxsO1xuICAgICAgICAgICAgaGFuZGxlKGV2ZW50Q29weSk7XG4gICAgICAgIH0sIHRpbWVvdXQgfHwgRVZFTlRIQU5ETEVfVElNRU9VVCk7XG5cbiAgICB9XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IHRyZWVGaWx0ZXIgPSAoeyByb290LCBmaWx0ZXIgfSkgPT4ge1xuXHRsZXQgZWxlbWVudHMgPSBbXTtcblx0cm9vdC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0Y29uc3QgeyBhY2NlcHQsIHN0b3AgPSBmYWxzZSB9ID0gZmlsdGVyKGVsZW1lbnQpO1xuXG5cdFx0aWYgKGFjY2VwdCkgZWxlbWVudHMucHVzaChlbGVtZW50KTtcblxuXHRcdGlmICghc3RvcCkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gdHJlZUZpbHRlcih7IHJvb3Q6IGVsZW1lbnQsIGZpbHRlciB9KTtcblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQocmVzdWx0KTtcblx0XHRcdGVsc2UgaWYgKHJlc3VsdCkgZWxlbWVudHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRGaWVsZHMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFZhbGlkYXRpb25zID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVmFsaWRhdGlvbikgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0lOVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXHJcblx0QVRUUklCVVRFX0VESVRBQkxFLCBBVFRSSUJVVEVfUkVBRE9OTFkgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZhbGlkU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCkgPT4ge1xyXG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcclxuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIFwiXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgXCJcIik7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xyXG5cdH1cclxuXHJcblx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ29uZGl0aW9uU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCkgPT4ge1xyXG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIG51bGwpO1xyXG5cdH0gZWxzZSBpZiAodmFsaWQpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcIlwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFwiXCIpO1xyXG5cdH1cclxuXHJcblx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFjdGl2ZVN0YXRlID0gKHRhcmdldCwgYWN0aXZlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcclxuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5hY3RpdmU7XHJcblx0YWN0aXZlID8gdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBudWxsKTtcclxuXHRpZiAob2xkU3RhdGUgIT0gYWN0aXZlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVSZWFkb25seVN0YXRlID0gKHRhcmdldCwgcmVhZG9ubHksIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnJlYWRvbmx5O1xyXG5cdGlmIChyZWFkb25seSkgXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xyXG5cdGVsc2VcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0XHJcblx0aWYgKG9sZFN0YXRlICE9IHJlYWRvbmx5IHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuZWRpdGFibGU7XHJcblx0aWYgKGVkaXRhYmxlKSBcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgXCJcIik7XHJcblx0ZWxzZVxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcclxuXHJcblx0aWYgKG9sZFN0YXRlICE9IGVkaXRhYmxlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59OyIsImV4cG9ydCBjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IGFzeW5jIChkYXRhLCBmaWVsZHMpID0+IHtcclxuICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoZmllbGRzLm1hcChmaWVsZCA9PiBmaWVsZC52YWxpZGF0ZShkYXRhKSkpKVxyXG4gICAgICAgIC5yZWR1Y2UoKHZhbGlkLCBmaWVsZFZhbGlkKSA9PiB2YWxpZCA/IGZpZWxkVmFsaWQ6IGZhbHNlLCB0cnVlKTtcclxufSIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2JveCBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XG5cdFx0cmV0dXJuIGlucHV0Lmxlbmd0aCA9PSAxID8gaW5wdXQuZmlyc3QoKSA6IGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0dGhpcy5tdWx0aXBsZSA9IGlucHV0IGluc3RhbmNlb2YgTm9kZUxpc3Q7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5QVVRcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcblxuY29uc3QgX3ZhbHVlID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJ2YWx1ZVwiKTtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiZmlsZVwiXSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gKGZpbGUsIHJlYWRGbk5hbWUpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG5cdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxuXHRcdFx0XHR0eXBlOiBmaWxlLnR5cGUsXG5cdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdFxuXHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHJlYWRlcltyZWFkRm5OYW1lXShmaWxlKTtcblx0fSk7XG59O1xuXG4vL3JlYWRBc0RhdGFVUkxcblxuY29uc3QgRk9STUFUID0ge1xuXHRcImZvcm0taW5wdXRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHJldHVybiBmaWxlO1xuXHR9LFxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJkYXRhLXVybC1iYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRcImJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLnN1YnN0cihyZXN1bHQuZGF0YS5pbmRleE9mKFwiLFwiKSArIDEpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNvbnN0IHJlYWRGaWxlcyA9IGFzeW5jIChmaWxlcywgZm9ybWF0LCBtdWx0aXBsZSkgPT4ge1xuXHRsZXQgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpXG5cdFx0cmVzdWx0LnB1c2goYXdhaXQgRk9STUFUW2Zvcm1hdF0oZmlsZSkpO1xuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIG51bGw7XG5cblxuXHRyZXR1cm4gbXVsdGlwbGUgPyByZXN1bHQgOiByZXN1bHRbMF07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dC5tdWx0aXBsZTtcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gZmllbGQuYXR0cihcImZpbGUtbmFtZS10YXJnZXRcIik7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IHRoaXMuZmlsZW5hbWVUYXJnZXQgPyBmaWVsZC5maW5kKHRoaXMuZmlsZW5hbWVUYXJnZXQpLmZpcnN0KCkgOiBudWxsO1xuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcblxuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlcy5sZW5ndGggIT0gMClcblx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdH07XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlICA9PT0gXCJvYmplY3RcIjtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSBfdmFsdWUodGhpcyk7XG5cdFx0aWYgKHZhbHVlICE9IGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKVxuXHRcdFx0aWYoIXZhbHVlKVx0XHRcdFxuXHRcdFx0XHR0aGlzLmlucHV0LnZhbHVlID0gbnVsbDtcblxuXHRcdFx0Y29uc3QgZmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0O1xuXHRcdFx0aWYgKGZpbGVuYW1lKSB7XG5cdFx0XHRcdGZpbGVuYW1lLmVtcHR5KCk7XG5cdFx0XHRcdGlmKHZhbHVlKXtcblx0XHRcdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlbmFtZS5hcHBlbmQoYDxzcGFuPiR7ZmlsZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIF92YWx1ZSh0aGlzKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcblxuY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0XHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWUudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5QVVQsXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1x0XHRcblx0fVxuXG5cdFxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0LCBjaGFuZ2VkXCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0Ly9maWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMuaW5wdXQubXVsdGlwbGUgPyB0aGlzLmlucHV0LnZhbCgpIDogdGhpcy5pbnB1dC52YWx1ZSk7XG5cdH1cblx0XG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZih0aGlzLmlucHV0Lm11bHRpcGxlKXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoID4gMCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxuXHRcdFx0fVx0XHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLmlucHV0Lm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogY3VycmVudFZhbHVlKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dDpub3QoW3R5cGU9XCJmaWxlXCJdLFt0eXBlPVwicmFkaW9cIl0sW3R5cGU9XCJjaGVja2JveFwiXSxbdHlwZT1cImJ1dHRvblwiXSxbdHlwZT1cInN1Ym1pdFwiXSxbdHlwZT1cInJlc2V0XCJdKSxpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEnO1xuXG5jb25zdCBERUZBVUxUVFlQRSA9IFwidGV4dFwiO1xuXG5jb25zdCB0ZXh0ID0gKGlucHV0KSA9PiB7XG5cdHJldHVybiBcdHtcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjsgXG5cdFx0fSxcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlID0gdmFsdWU7IFxuXHRcdH0sXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fTtcbn07XG5jb25zdCBudW1iZXIgPSAoaW5wdXQpID0+e1xuXHRyZXR1cm4ge1xuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xuXHRcdH0sXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzTnVtYmVyO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT57XG5cdFx0XHRpbnB1dC52YWx1ZUFzTnVtYmVyID0gdmFsdWU7XG5cdFx0fSxcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHR9O1xufTtcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcblx0cmV0dXJuIHtcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcblx0XHR9LFxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XG5cdFx0XHRpbnB1dC52YWx1ZUFzRGF0ZSA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHR9O1xufTtcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGUsIHRpbWU6IGRhdGUsIHJhbmdlOm51bWJlciB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy50eXBlID0gKFRZUEVTW3R5cGVdIHx8IFRZUEVTW0RFRkFVTFRUWVBFXSkoaW5wdXQpO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXG5cdFx0XHQpLFxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUuYWNjZXB0KHZhbHVlKTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUubm9ybWFsaXplKHZhbHVlKTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKVxuXHRcdFx0dGhpcy50eXBlLnNldFZhbHVlKHZhbHVlKVxuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gXCIuLi9GaWVsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIHtcblx0XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpeyByZXR1cm4gbnVsbDt9XG5cdFxuXHQjZGVmYXVsdFZhbHVlO1xuXHRcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0dGhpcy5maWVsZCA9IGZpZWxkO1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7IH1cblxuXHRzZXQgcmVhZG9ubHkoZGlzYWJsZWQpIHsgfVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHtcblx0fVxuXHRcblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdGdldCB2YWxpZCgpe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vc3JjL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IEZpZWxkIGZyb20gXCIuL3NyYy9GaWVsZFwiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9zcmMvQ29udGFpbmVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9zcmMvTGlzdFwiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vc3JjL1BhZ2VcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vc3JjL0Zvcm1cIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL3NyYy9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQgZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvU3VibWl0QWN0aW9uUmVzdWx0XCI7XG5cbmV4cG9ydCB7Rm9ybSwgUGFnZSwgQmFzZUZpZWxkLCBGaWVsZCwgTGlzdCwgQ29udGFpbmVyLCBCYXNlU3VibWl0QWN0aW9uLCBTdWJtaXRBY3Rpb25SZXN1bHR9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==