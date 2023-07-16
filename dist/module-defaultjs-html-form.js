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
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   defGet: () => (/* binding */ defGet),
/* harmony export */   defGetSet: () => (/* binding */ defGetSet),
/* harmony export */   defValue: () => (/* binding */ defValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   equalPojo: () => (/* binding */ equalPojo),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   isNullOrUndefined: () => (/* binding */ isNullOrUndefined),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPojo: () => (/* binding */ isPojo),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");


const equalArraySet = (a, b) => {
	if (a.length !== b.length) return false;
	const length = a.length;
	for (let i = 0; i < length; i++)
		if (!equalPojo(a[i], b[i])) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalMap = (a, b) => {
	if (a.length !== b.length) return false;
	for (const key of a.keys())
		if (!equalPojo(a.get(key), b.get(key))) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalClasses = (a, b) => {
	const clazzA = Object.getPrototypeOf(a);
	const clazzB = Object.getPrototypeOf(b);
	if (clazzA != clazzB) return false;

	if (!clazzA) return true;

	const propertiesA = Object.getOwnPropertyNames(clazzA);
	const propertiesB = Object.getOwnPropertyNames(clazzB);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const equalObject = (a, b) => {
	const propertiesA = Object.keys(a);
	const propertiesB = Object.keys(b);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const isNullOrUndefined = (object) => {
	return object == null || typeof object === "undefined";
};

const isPrimitive = (object) => {
	if (object == null) return true;

	const type = typeof object;
	switch (type) {
		case "number":
		case "bigint":
		case "boolean":
		case "string":
		case "undefined":
			return true;
	}

	return false;
};

const isObject = (object) => {
	if(isNullOrUndefined(object))
		return false;

	return typeof object === "object" && (!object.constructor || object.constructor.name === "Object");
};

/**
 * equalPojo -> compares only pojos, array, set, map and primitives
 */
const equalPojo = (a, b) => {
	const nullA = isNullOrUndefined(a);
	const nullB = isNullOrUndefined(b);
	if (nullA || nullB) return a === b;

	if (isPrimitive(a) || isPrimitive(b)) return a === b;

	const typeA = typeof a;
	const typeB = typeof b;
	if (typeA != typeB) return false;
	if (typeA === "function") return a === b;
	//if (a.constructor !== b.constructor) return false;
	//if (a instanceof Array || a instanceof Set) return equalArraySet(a, b);
	//if (a instanceof Map) return equalMap(a, b);

	return equalObject(a, b) && equalClasses(a, b);
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 *
 * @param aObject:object the object to be testing
 *
 * @return boolean
 */
const isPojo = (object) => {
	if (!isObject(object)) return false;

	for (const key in object) {
		const value = object[key];
		if (typeof value === "function") return false;
	}

	return true;
};

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
	if (!target) target = {};

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
	isNullOrUndefined,
	isObject,
	equalPojo,
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
/* harmony export */   privateProperty: () => (/* binding */ privateProperty),
/* harmony export */   privatePropertyAccessor: () => (/* binding */ privatePropertyAccessor),
/* harmony export */   privateStore: () => (/* binding */ privateStore)
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
/* harmony export */   lazyPromise: () => (/* binding */ lazyPromise),
/* harmony export */   timeoutPromise: () => (/* binding */ timeoutPromise)
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
/* harmony export */   UUID_SCHEMA: () => (/* binding */ UUID_SCHEMA),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   uuid: () => (/* binding */ uuid)
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
/* harmony export */   emtpyOrNoValueString: () => (/* binding */ emtpyOrNoValueString),
/* harmony export */   noValue: () => (/* binding */ noValue)
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
/* harmony export */   Context: () => (/* reexport safe */ _src_Context__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ExpressionResolver: () => (/* reexport safe */ _src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__["default"])
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
/* harmony export */   Component: () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   componentBaseOf: () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_0__.componentBaseOf),
/* harmony export */   define: () => (/* reexport safe */ _src_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__.define)
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
/* harmony export */   componentBaseOf: () => (/* binding */ componentBaseOf),
/* harmony export */   createUID: () => (/* binding */ createUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper */ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js");





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
		component.trigger((0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.componentEventname)("initialzed", component));
	}, _Constants__WEBPACK_IMPORTED_MODULE_2__.initTimeout));	
};

const createUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
    while(count < 100){
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__.uuid)()}${suffix ? suffix : ""}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};



const buildClass = (htmlBaseType) =>{
	return class Component extends htmlBaseType {

		#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
			super();
	
			if(createUID)
				this.attr("id", createUID(uidPrefix, uidSuffix));
	
			if(shadowRoot)
				this.attachShadow({mode:"open"});
			
			if(content)
				this.root.append(typeof content === "function" ? content(this) : content);
		}
	
		get root(){
			return this.shadowRoot || this;
		}
	
		get ready(){
			return this.#ready;
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
			this.#ready =  (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		}
	
		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected) init(this);
		}
	
		adoptedCallback() {
			this.connectedCallback();
		}
	
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.attributeChangeEventname)(name, this));
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.componentEventname)("change", this));
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
/* harmony export */   attributeChangeEventPrefix: () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   componentPrefix: () => (/* binding */ componentPrefix),
/* harmony export */   initTimeout: () => (/* binding */ initTimeout),
/* harmony export */   triggerTimeout: () => (/* binding */ triggerTimeout)
/* harmony export */ });
const componentPrefix = "d-";
const attributeChangeEventPrefix = "attribute-";
const initTimeout = 10;
const triggerTimeout = 10;


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   define: () => (/* binding */ define),
/* harmony export */   toNodeName: () => (/* binding */ toNodeName)
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
/* harmony export */   attributeChangeEventname: () => (/* binding */ attributeChangeEventname),
/* harmony export */   componentEventname: () => (/* binding */ componentEventname),
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
/* harmony export */   _value: () => (/* binding */ _value),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findParentField: () => (/* binding */ findParentField)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _utils_ValueHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ValueHelper */ "./src/utils/ValueHelper.js");





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
		_value(this, value || null);		
	}

	async init(){
		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED));
		await super.init();
	}

	async destroy() {		
		this.publishValue(null);
		await super.destroy();
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_REMOVED);
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
				const result = await this.updatedValue(value);				
				if(typeof result !== "undefined")
					value = result;
				await this.publishValue(value);
			}
		}
	}

	async validate(data){
		const currentCondition = this.condition;
		const currentValid = this.valid;
		const valid = await super.validate(data);
		const condition = this.condition;
		this.validationStateChanged(currentCondition != condition,  currentValid != valid);

		return valid;
	}

	async validationStateChanged(conditionChange, validationChanged){
		const hasChange = conditionChange || validationChanged;
		if(hasChange)
			this.publishValue();
	}

	async updatedValue(value) { 
		return value;
	}

	async publishValue(value) {
		//console.log(`call ${this.nodeName}(${this.name}).publishValue:`, {arguments: arguments.length, value});
		await this.ready;
		if(arguments.length == 0)
			value = _value(this);

		//console.log("work with Value:", value)		
		const noValue = (0,_utils_ValueHelper__WEBPACK_IMPORTED_MODULE_3__.dataIsNoValue)(value);				
		const condition = this.condition;
		const required = this.required;
		value = required && noValue ? null : value;		
		
		if(!condition)
			value = null;
		else
			_value(this, value);

		//console.log(`${this.nodeName}(${this.name}).publishValue:`, {required, condition, noValue, value});

		updateHasValue(!noValue, this);

		if (this.parentField) await this.parentField.childValueChanged(this, value);
		else if(this.form) await this.form.childValueChanged(this, value);
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
/* harmony export */   ATTRIBUTE_ACTIVE: () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   ATTRIBUTE_CONDITION: () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   ATTRIBUTE_CONDITION_INVALID: () => (/* binding */ ATTRIBUTE_CONDITION_INVALID),
/* harmony export */   ATTRIBUTE_CONDITION_VALID: () => (/* binding */ ATTRIBUTE_CONDITION_VALID),
/* harmony export */   ATTRIBUTE_DISABLED: () => (/* binding */ ATTRIBUTE_DISABLED),
/* harmony export */   ATTRIBUTE_EDITABLE: () => (/* binding */ ATTRIBUTE_EDITABLE),
/* harmony export */   ATTRIBUTE_EDITABLE_CONDITION: () => (/* binding */ ATTRIBUTE_EDITABLE_CONDITION),
/* harmony export */   ATTRIBUTE_ENDPOINT: () => (/* binding */ ATTRIBUTE_ENDPOINT),
/* harmony export */   ATTRIBUTE_EVALUATE: () => (/* binding */ ATTRIBUTE_EVALUATE),
/* harmony export */   ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT: () => (/* binding */ ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT),
/* harmony export */   ATTRIBUTE_INVALID: () => (/* binding */ ATTRIBUTE_INVALID),
/* harmony export */   ATTRIBUTE_MAX: () => (/* binding */ ATTRIBUTE_MAX),
/* harmony export */   ATTRIBUTE_METHOD: () => (/* binding */ ATTRIBUTE_METHOD),
/* harmony export */   ATTRIBUTE_MIN: () => (/* binding */ ATTRIBUTE_MIN),
/* harmony export */   ATTRIBUTE_NAME: () => (/* binding */ ATTRIBUTE_NAME),
/* harmony export */   ATTRIBUTE_NOVALUE: () => (/* binding */ ATTRIBUTE_NOVALUE),
/* harmony export */   ATTRIBUTE_PROGRESS: () => (/* binding */ ATTRIBUTE_PROGRESS),
/* harmony export */   ATTRIBUTE_READONLY: () => (/* binding */ ATTRIBUTE_READONLY),
/* harmony export */   ATTRIBUTE_REQUIRED: () => (/* binding */ ATTRIBUTE_REQUIRED),
/* harmony export */   ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY: () => (/* binding */ ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY),
/* harmony export */   ATTRIBUTE_STATE: () => (/* binding */ ATTRIBUTE_STATE),
/* harmony export */   ATTRIBUTE_STEP: () => (/* binding */ ATTRIBUTE_STEP),
/* harmony export */   ATTRIBUTE_USE_SUMMARY_PAGE: () => (/* binding */ ATTRIBUTE_USE_SUMMARY_PAGE),
/* harmony export */   ATTRIBUTE_VALID: () => (/* binding */ ATTRIBUTE_VALID),
/* harmony export */   EVENTHANDLE_INPUT_TIMEOUT: () => (/* binding */ EVENTHANDLE_INPUT_TIMEOUT),
/* harmony export */   EVENTHANDLE_TIMEOUT: () => (/* binding */ EVENTHANDLE_TIMEOUT),
/* harmony export */   EVENT_ACTIVE_STATE_CHANGED: () => (/* binding */ EVENT_ACTIVE_STATE_CHANGED),
/* harmony export */   EVENT_ALL_PUBLISH_VALUE: () => (/* binding */ EVENT_ALL_PUBLISH_VALUE),
/* harmony export */   EVENT_CONDITION_STATE_CHANGED: () => (/* binding */ EVENT_CONDITION_STATE_CHANGED),
/* harmony export */   EVENT_EDITABLE_STATE_CHANGED: () => (/* binding */ EVENT_EDITABLE_STATE_CHANGED),
/* harmony export */   EVENT_EXECUTE_VALIDATE: () => (/* binding */ EVENT_EXECUTE_VALIDATE),
/* harmony export */   EVENT_FIELD_INITIALIZED: () => (/* binding */ EVENT_FIELD_INITIALIZED),
/* harmony export */   EVENT_FIELD_INPUT: () => (/* binding */ EVENT_FIELD_INPUT),
/* harmony export */   EVENT_FIELD_REMOVED: () => (/* binding */ EVENT_FIELD_REMOVED),
/* harmony export */   EVENT_FORM_STATE_CHANGED: () => (/* binding */ EVENT_FORM_STATE_CHANGED),
/* harmony export */   EVENT_INITIALIZE: () => (/* binding */ EVENT_INITIALIZE),
/* harmony export */   EVENT_INITIALIZED: () => (/* binding */ EVENT_INITIALIZED),
/* harmony export */   EVENT_INITIALIZE_SUBMIT_ACTION: () => (/* binding */ EVENT_INITIALIZE_SUBMIT_ACTION),
/* harmony export */   EVENT_LIST_ROW_ADD: () => (/* binding */ EVENT_LIST_ROW_ADD),
/* harmony export */   EVENT_LIST_ROW_DELETE: () => (/* binding */ EVENT_LIST_ROW_DELETE),
/* harmony export */   EVENT_MESSAGE_INITIALIZED: () => (/* binding */ EVENT_MESSAGE_INITIALIZED),
/* harmony export */   EVENT_MESSAGE_REMOVED: () => (/* binding */ EVENT_MESSAGE_REMOVED),
/* harmony export */   EVENT_PAGE_INITIALIZED: () => (/* binding */ EVENT_PAGE_INITIALIZED),
/* harmony export */   EVENT_PAGE_REMOVED: () => (/* binding */ EVENT_PAGE_REMOVED),
/* harmony export */   EVENT_PREFIX: () => (/* binding */ EVENT_PREFIX),
/* harmony export */   EVENT_PROGRESSBAR_CHANGED: () => (/* binding */ EVENT_PROGRESSBAR_CHANGED),
/* harmony export */   EVENT_SITE_CHANGED: () => (/* binding */ EVENT_SITE_CHANGED),
/* harmony export */   EVENT_SUBMIT: () => (/* binding */ EVENT_SUBMIT),
/* harmony export */   EVENT_SUBMIT_RESULTS: () => (/* binding */ EVENT_SUBMIT_RESULTS),
/* harmony export */   EVENT_VALIDATION_INITIALIZED: () => (/* binding */ EVENT_VALIDATION_INITIALIZED),
/* harmony export */   EVENT_VALIDATION_REMOVED: () => (/* binding */ EVENT_VALIDATION_REMOVED),
/* harmony export */   EVENT_VALID_STATE_CHANGED: () => (/* binding */ EVENT_VALID_STATE_CHANGED),
/* harmony export */   EVENT_VALUE_CHANGED: () => (/* binding */ EVENT_VALUE_CHANGED),
/* harmony export */   FORMSTATES: () => (/* binding */ FORMSTATES),
/* harmony export */   FORMSTATE_FINISHED: () => (/* binding */ FORMSTATE_FINISHED),
/* harmony export */   FORMSTATE_INIT: () => (/* binding */ FORMSTATE_INIT),
/* harmony export */   FORMSTATE_INPUT: () => (/* binding */ FORMSTATE_INPUT),
/* harmony export */   FORMSTATE_SUMMARY: () => (/* binding */ FORMSTATE_SUMMARY),
/* harmony export */   FORMSTATE_VALIDATING: () => (/* binding */ FORMSTATE_VALIDATING),
/* harmony export */   HTML_TAG_PREFIX: () => (/* binding */ HTML_TAG_PREFIX),
/* harmony export */   NODENAME_CONTAINER: () => (/* binding */ NODENAME_CONTAINER),
/* harmony export */   NODENAME_CONTROL: () => (/* binding */ NODENAME_CONTROL),
/* harmony export */   NODENAME_CONTROL_BACK: () => (/* binding */ NODENAME_CONTROL_BACK),
/* harmony export */   NODENAME_CONTROL_CANCEL: () => (/* binding */ NODENAME_CONTROL_CANCEL),
/* harmony export */   NODENAME_CONTROL_NEXT: () => (/* binding */ NODENAME_CONTROL_NEXT),
/* harmony export */   NODENAME_CONTROL_SUBMIT: () => (/* binding */ NODENAME_CONTROL_SUBMIT),
/* harmony export */   NODENAME_CONTROL_SUMMARY: () => (/* binding */ NODENAME_CONTROL_SUMMARY),
/* harmony export */   NODENAME_FIELD: () => (/* binding */ NODENAME_FIELD),
/* harmony export */   NODENAME_FORM: () => (/* binding */ NODENAME_FORM),
/* harmony export */   NODENAME_LIST: () => (/* binding */ NODENAME_LIST),
/* harmony export */   NODENAME_LIST_ADD_ROW: () => (/* binding */ NODENAME_LIST_ADD_ROW),
/* harmony export */   NODENAME_LIST_DELETE_ROW: () => (/* binding */ NODENAME_LIST_DELETE_ROW),
/* harmony export */   NODENAME_LIST_ROW: () => (/* binding */ NODENAME_LIST_ROW),
/* harmony export */   NODENAME_LIST_ROWS: () => (/* binding */ NODENAME_LIST_ROWS),
/* harmony export */   NODENAME_MESSAGE: () => (/* binding */ NODENAME_MESSAGE),
/* harmony export */   NODENAME_PAGE: () => (/* binding */ NODENAME_PAGE),
/* harmony export */   NODENAME_PROGESSBAR: () => (/* binding */ NODENAME_PROGESSBAR),
/* harmony export */   NODENAME_STEP: () => (/* binding */ NODENAME_STEP),
/* harmony export */   NODENAME_SUBMIT_ACTION: () => (/* binding */ NODENAME_SUBMIT_ACTION),
/* harmony export */   NODENAME_VALIDATION: () => (/* binding */ NODENAME_VALIDATION),
/* harmony export */   REQUIREDSTATES: () => (/* binding */ REQUIREDSTATES),
/* harmony export */   SPECIALVARS: () => (/* binding */ SPECIALVARS),
/* harmony export */   TRIGGER_TIMEOUT: () => (/* binding */ TRIGGER_TIMEOUT)
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
			await Promise.all(fields.map(async (field) => {
				const name = field.name;
				const fieldValue = name ? (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_5__.valueHelper)(value, field.name) : value;
				if(!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(fieldValue))
					map.set(field, fieldValue);
				await field.value(fieldValue);
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
			const hasField = map.has(field);
			const currentValue = map.get(field);
			//console.log({name: field.name, currentValue, value, hasField})

			if(hasField && currentValue == value)
				return;
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");






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
			this.publishValue(event.detail || null);
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

	async validationStateChanged(conditionChange, validationChanged){		
		if(conditionChange && this.condition){			
			const wrapper = this.#wrapper;
			const value = wrapper.value || null;
			//console.log(`validationStateChanged(${this.name} (${conditionChange}, ${validationChanged}) -> ${value}`)
			(0,_BaseField__WEBPACK_IMPORTED_MODULE_1__._value)(this, value);
		}
		
		return super.validationStateChanged(conditionChange, validationChanged);
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
		if(this.#container)
			return Array.from(this.#container.children);
		return [];
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
/* harmony export */   ATTRIBUTE_ACTIVE: () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   ATTRIBUTE_CONDITION: () => (/* binding */ ATTRIBUTE_CONDITION),
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
/* harmony export */   BackButton: () => (/* reexport safe */ _BackButton__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   NextButton: () => (/* reexport safe */ _NextButton__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   SubmitButton: () => (/* reexport safe */ _SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   SummaryButton: () => (/* reexport safe */ _SummaryButton__WEBPACK_IMPORTED_MODULE_2__["default"])
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
/* harmony export */   EVENT__INITIALIZED__BUTTON__ADDROW: () => (/* binding */ EVENT__INITIALIZED__BUTTON__ADDROW),
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
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");






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
		endpoint = await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_4__.ExpressionResolver.resolveText(endpoint, data, endpoint);
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
/* harmony export */   STATE_FAIL: () => (/* binding */ STATE_FAIL),
/* harmony export */   STATE_SUCCESS: () => (/* binding */ STATE_SUCCESS),
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
/* harmony export */   evaluationData: () => (/* binding */ evaluationData),
/* harmony export */   fieldValueMapToObject: () => (/* binding */ fieldValueMapToObject),
/* harmony export */   rebuildDataByFields: () => (/* binding */ rebuildDataByFields),
/* harmony export */   updateData: () => (/* binding */ updateData),
/* harmony export */   valueHelper: () => (/* binding */ valueHelper)
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
/* harmony export */   makeEventCopy: () => (/* binding */ makeEventCopy),
/* harmony export */   toEvents: () => (/* binding */ toEvents),
/* harmony export */   toTimeoutHandle: () => (/* binding */ toTimeoutHandle)
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
/* harmony export */   findFields: () => (/* binding */ findFields),
/* harmony export */   findValidations: () => (/* binding */ findValidations),
/* harmony export */   treeFilter: () => (/* binding */ treeFilter)
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
/* harmony export */   updateActiveState: () => (/* binding */ updateActiveState),
/* harmony export */   updateConditionState: () => (/* binding */ updateConditionState),
/* harmony export */   updateEditableState: () => (/* binding */ updateEditableState),
/* harmony export */   updateReadonlyState: () => (/* binding */ updateReadonlyState),
/* harmony export */   updateValidState: () => (/* binding */ updateValidState)
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
/* harmony export */   validateFields: () => (/* binding */ validateFields)
/* harmony export */ });
const validateFields = async (data, fields) => {
    return (await Promise.all(fields.map(field => field.validate(data))))
        .reduce((valid, fieldValid) => valid ? fieldValid: false, true);
}

/***/ }),

/***/ "./src/utils/ValueHelper.js":
/*!**********************************!*\
  !*** ./src/utils/ValueHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataIsNoValue: () => (/* binding */ dataIsNoValue)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");


const dataIsNoValue = (value) => {    
    if((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__.noValue)(value) )
        return true;

    const type = typeof value;
    if(type === "string" && value.trim().length == 0)
        return true;
    if(value instanceof Date)
        return false;
    if(value instanceof Array &&  value.length == 0)
        return true;
    if(value instanceof Set &&  value.length == 0)
        return true;
    if(value instanceof Map &&  value.length == 0)
        return true;
    if(type == "object" && Object.getOwnPropertyNames(value).length == 0)
        return true;
    
    return false;
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
	return {
		accept: (value) => {
			return typeof value === "string";
		},
		getValue: () => {
			return input.value;
		},
		setValue: (value) => {
			return (input.value = value);
		},
		normalize: (value) => {
			if (value) {
				value = value.trim();
				return value.length > 0 ? value : null;
			}

			return null;
		},
	};
};
const number = (input) => {
	return {
		accept: (value) => {
			return typeof value === "number";
		},
		getValue: () => {
			return input.valueAsNumber;
		},
		setValue: (value) => {
			input.valueAsNumber = value;
		},
		normalize: (value) => {
			if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value) && !Number.isNaN(value)) return value;

			return null;
		},
	};
};

const datetime = (input) => {
	return {
		accept: (value) => {
			return typeof value === "string";
		},
		getValue: () => {
			return input.value;
		},
		setValue: (value) => {
			input.value = value;
		},
		normalize: (value) => {
			if (value) return value;

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

const TIMEFORMAT = new Intl.DateTimeFormat("default",  {
  hour: "numeric",
  minute: "numeric"
});


const time = (input) => {
	return {
		accept: (value) => {
			return value instanceof Date;
		},
		getValue: () => {
			return input.value ? new Date(`1970-01-01T${input.value}`) : null;
		},
		setValue: (value) => {
			input.value = TIMEFORMAT.format(value);
		},
		normalize: (value) => {
			if (value) return value;

			return null;
		},
	};
};
const TYPES = { text, number, datetime,  "datetime-locale": datetime, date, time, range: number };

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
				_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTHANDLE_INPUT_TIMEOUT,
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
		const currentValue = this.type.getValue();
		if (value != currentValue) this.type.setValue(value);
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
/* harmony export */   findWrapper: () => (/* binding */ findWrapper),
/* harmony export */   wrappers: () => (/* binding */ wrappers)
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
/* harmony export */   BaseField: () => (/* reexport safe */ _src_BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   BaseSubmitAction: () => (/* reexport safe */ _src_submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Container: () => (/* reexport safe */ _src_Container__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Field: () => (/* reexport safe */ _src_Field__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Form: () => (/* reexport safe */ _src_Form__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   List: () => (/* reexport safe */ _src_List__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Page: () => (/* reexport safe */ _src_Page__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   SubmitActionResult: () => (/* reexport safe */ _src_submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_7__["default"])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNSO0FBQ1E7QUFDVjtBQUNEO0FBQ0M7QUFDc0M7QUFDSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvaGFuZGVscy9FZGl0YWJsZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvTWVzc2FnZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1JhZGlvLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5cclxuY29uc3QgZXF1YWxBcnJheVNldCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGNvbnN0IGxlbmd0aCA9IGEubGVuZ3RoO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXHJcblx0XHRpZiAoIWVxdWFsUG9qbyhhW2ldLCBiW2ldKSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZmFsc2VcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE1hcCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIGEua2V5cygpKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYS5nZXQoa2V5KSwgYi5nZXQoa2V5KSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxDbGFzc2VzID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBjbGF6ekEgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSk7XHJcblx0Y29uc3QgY2xhenpCID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpO1xyXG5cdGlmIChjbGF6ekEgIT0gY2xhenpCKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGlmICghY2xhenpBKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGF6ekEpO1xyXG5cdGNvbnN0IHByb3BlcnRpZXNCID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpCKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE9iamVjdCA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3Qua2V5cyhhKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5rZXlzKGIpO1xyXG5cclxuXHRpZiAocHJvcGVydGllc0EubGVuZ3RoICE9PSBwcm9wZXJ0aWVzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBwcm9wZXJ0aWVzQSkge1xyXG5cdFx0Y29uc3QgdmFsdWVBID0gYVtrZXldO1xyXG5cdFx0Y29uc3QgdmFsdWVCID0gYltrZXldO1xyXG5cclxuXHRcdGlmICghZXF1YWxQb2pvKHZhbHVlQSwgdmFsdWVCKSkgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IChvYmplY3QpID0+IHtcclxuXHRyZXR1cm4gb2JqZWN0ID09IG51bGwgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9IChvYmplY3QpID0+IHtcclxuXHRpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcclxuXHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdGNhc2UgXCJiaWdpbnRcIjpcclxuXHRcdGNhc2UgXCJib29sZWFuXCI6XHJcblx0XHRjYXNlIFwic3RyaW5nXCI6XHJcblx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmKGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdCkpXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmICghb2JqZWN0LmNvbnN0cnVjdG9yIHx8IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBlcXVhbFBvam8gLT4gY29tcGFyZXMgb25seSBwb2pvcywgYXJyYXksIHNldCwgbWFwIGFuZCBwcmltaXRpdmVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXF1YWxQb2pvID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBudWxsQSA9IGlzTnVsbE9yVW5kZWZpbmVkKGEpO1xyXG5cdGNvbnN0IG51bGxCID0gaXNOdWxsT3JVbmRlZmluZWQoYik7XHJcblx0aWYgKG51bGxBIHx8IG51bGxCKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0aWYgKGlzUHJpbWl0aXZlKGEpIHx8IGlzUHJpbWl0aXZlKGIpKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0Y29uc3QgdHlwZUEgPSB0eXBlb2YgYTtcclxuXHRjb25zdCB0eXBlQiA9IHR5cGVvZiBiO1xyXG5cdGlmICh0eXBlQSAhPSB0eXBlQikgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh0eXBlQSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYSA9PT0gYjtcclxuXHQvL2lmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcblx0Ly9pZiAoYSBpbnN0YW5jZW9mIEFycmF5IHx8IGEgaW5zdGFuY2VvZiBTZXQpIHJldHVybiBlcXVhbEFycmF5U2V0KGEsIGIpO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBNYXApIHJldHVybiBlcXVhbE1hcChhLCBiKTtcclxuXHJcblx0cmV0dXJuIGVxdWFsT2JqZWN0KGEsIGIpICYmIGVxdWFsQ2xhc3NlcyhhLCBiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICpcclxuICogQHJldHVybiBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNQb2pvID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmICghaXNPYmplY3Qob2JqZWN0KSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFwcGVuZCBhIHByb3BlcnkgdmFsdWUgdG8gYW4gb2JqZWN0LiBJZiBwcm9wZXJ5IGV4aXN0cyBpdHMgd291bGQgYmUgY29udmVydGVkIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKlxyXG4gKiAgQHJldHVybiByZXR1cm5zIHRoZSBjaGFuZ2VkIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKTtcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIHNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuXHRpZiAoIXRhcmdldCkgdGFyZ2V0ID0ge307XHJcblxyXG5cdGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcblx0XHRpZiAoaXNQb2pvKHNvdXJjZSkpIHtcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNQb2pvKHRhcmdldFtrZXldKSkgbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuXHRcdFx0XHRlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbiAoeyBuYW1lcywgYWxsb3dlZCB9KSB7XHJcblx0cmV0dXJuIChuYW1lLCB2YWx1ZSwgY29udGV4dCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5hbWVzLmluY2x1ZGVzKG5hbWUpID09PSBhbGxvd2VkO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7IGRlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdIH0gPSB7fV0gPSBhcmd1bWVudHM7XHJcblx0Y29uc3QgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5IHx8IHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHBhcmVudHMuaW5jbHVkZXNbdmFsdWVdIHx8IHZhbHVlID09IGRhdGEpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlIHJlc3VsdFtuYW1lXSA9IGZpbHRlcih2YWx1ZSwgcHJvcEZpbHRlciwgeyBkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6IHBhcmVudHMuY29uY2F0KGRhdGEpIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZWYWx1ZSA9IChvLCBuYW1lLCB2YWx1ZSkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHR2YWx1ZSxcclxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlZkdldCA9IChvLCBuYW1lLCBnZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNOdWxsT3JVbmRlZmluZWQsXHJcblx0aXNPYmplY3QsXHJcblx0ZXF1YWxQb2pvLFxyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciA9ICh2YXJuYW1lKSA9PiB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGYsIHZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMilcclxuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lKTtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IsIHByaXZhdGVTdG9yZX07IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9zcmMvQ29udGV4dFwiO1xuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIENvbnRleHQgfTtcbiIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0bGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHR0cnl7XHJcblx0XHRyZXN1bHQgPSBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZihtYXRjaFtNQVRDSF9FU0NBUEVEXSlcclxuXHRcdHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dOyBcclxuXHRcdFxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn1cclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XFxcIlwiLCBhRXhwcmVzc2lvbiwgXCJcXFwiOlwiLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEXHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdHRlbXAgPSB0ZW1wLnNwbGl0KG1hdGNoWzBdKS5qb2luKCk7IC8vIHJlbW92ZSBjdXJyZW50IG1hdGNoIGZvciBuZXh0IGxvb3BcclxuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQobWF0Y2hbMF0pLmpvaW4odHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAocmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCkpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHtjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb249e2RlZXA6dHJ1ZX0sIG5hbWUsIHBhcmVudH0pe1xyXG5cdFx0Y29udGV4dCA9IE9iamVjdFV0aWxzLmZpbHRlcih7ZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9ufSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7Y29udGV4dCwgbmFtZSwgcGFyZW50fSk7XHJcblx0fVxyXG59OyIsImltcG9ydCBDb21wb25lbnQgLCB7Y29tcG9uZW50QmFzZU9mfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuXG5leHBvcnQge0NvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBkZWZpbmV9O1xuIiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSURcIjtcbmltcG9ydCB7IGluaXRUaW1lb3V0LCB0cmlnZ2VyVGltZW91dCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuXG5jb25zdCBUSU1FT1VUUyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBpbml0ID0gKGNvbXBvbmVudCkgPT4ge1xuXHRsZXQgdGltZW91dCA9IFRJTUVPVVRTLmdldChjb21wb25lbnQpO1xuXHRpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFRJTUVPVVRTLmdldChjb21wb25lbnQsIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFRJTUVPVVRTLmRlbGV0ZShjb21wb25lbnQpO1xuXHRcdHRyeXtcblx0XHRcdGF3YWl0IGNvbXBvbmVudC5pbml0KCk7XG5cdFx0XHRjb21wb25lbnQucmVhZHkucmVzb2x2ZSgpO1xuXHRcdH1jYXRjaChlKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW4ndCBpbml0aWFsaXplIGNvbXBvbmVudCFcIiwgY29tcG9uZW50LCBlKTtcblx0XHRcdGNvbXBvbmVudC5yZWFkeShyZXNvbHZlKGUpKTtcblx0XHR9XG5cdFx0Y29tcG9uZW50LnRyaWdnZXIoY29tcG9uZW50RXZlbnRuYW1lKFwiaW5pdGlhbHplZFwiLCBjb21wb25lbnQpKTtcblx0fSwgaW5pdFRpbWVvdXQpKTtcdFxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuICAgIHdoaWxlKGNvdW50IDwgMTAwKXtcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XG5cdFx0aWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSlcblx0XHRcdHJldHVybiBpZDtcblxuXHRcdGNvdW50Kys7XG5cdH1cblx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJUbyBtYW55IHJldHJpZXMgdG8gY3JlYXRlIGFuIHVuaXF1ZSBpZCAtIGNyZWF0ZWQgaWQgaXMgbm90IHVuaXF1ZSFcIikpO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG5cblxuY29uc3QgYnVpbGRDbGFzcyA9IChodG1sQmFzZVR5cGUpID0+e1xuXHRyZXR1cm4gY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgaHRtbEJhc2VUeXBlIHtcblxuXHRcdCNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0Y29uc3RydWN0b3Ioe3NoYWRvd1Jvb3QgPSBmYWxzZSwgY29udGVudCA9IG51bGwsIGNyZWF0ZVVJRCA9IGZhbHNlLCB1aWRQcmVmaXggPSBcImlkLVwiLCB1aWRTdWZmaXggPSBcIlwifSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcblx0XHRcdGlmKGNyZWF0ZVVJRClcblx0XHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cdFxuXHRcdFx0aWYoc2hhZG93Um9vdClcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KTtcblx0XHRcdFxuXHRcdFx0aWYoY29udGVudClcblx0XHRcdFx0dGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJvb3QoKXtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cdFxuXHRcdGdldCByZWFkeSgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5O1xuXHRcdH1cblx0XG5cdFx0YXN5bmMgaW5pdCgpIHt9XG5cdFxuXHRcdGFzeW5jIGRlc3Ryb3koKSB7XG5cdFx0XHRpZih0aGlzLnJlYWR5LnJlc29sdmVkKVxuXHRcdFx0dGhpcy4jcmVhZHkgPSAgbGF6eVByb21pc2UoKTtcblx0XHR9XG5cdFxuXHRcdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0aWYgKHRoaXMub3duZXJEb2N1bWVudCA9PSBkb2N1bWVudCAmJiB0aGlzLmlzQ29ubmVjdGVkKSBpbml0KHRoaXMpO1xuXHRcdH1cblx0XG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblx0XG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpe1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xufSBcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZihjbGF6eiA9PSBudWxsKXtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59XG5cbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTA7XHJcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwO1xyXG4iLCJpbXBvcnQgeyBjb21wb25lbnRQcmVmaXggfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCB0b05vZGVOYW1lID0gKG5hbWUsIHByZWZpeCkgPT4ge1xuXHRpZih0eXBlb2YgcHJlZml4ID09PSBcInN0cmluZ1wiKVxuXHRcdHJldHVybiBwcmVmaXggKyBuYW1lO1xuXHRcdFxuXHRyZXR1cm4gY29tcG9uZW50UHJlZml4ICsgbmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbihjbGF6eiwgb3B0aW9ucykge1xuXHRjb25zdCBub2RlbmFtZSA9IGNsYXp6Lk5PREVOQU1FO1xuXHRpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChub2RlbmFtZSkpIHtcblx0XHRjdXN0b21FbGVtZW50cy5kZWZpbmUobm9kZW5hbWUsIGNsYXp6LCBvcHRpb25zKTtcblx0fVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmU7IFxuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSApID0+IHtcdFxuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYCR7dHlwZW9mIG5vZGV9IGlzIG5vdCBzdXBwb3J0ZWQgYXMgcGFyYW1ldGVyIFwibm9kZVwiIWApO1xuXHRcbiAgIHJldHVybiBgJHtub2RlbmFtZS50b0xvd2VyQ2FzZSgpfToke2V2ZW50VHlwZX1gOy8vdXNlIEAgYXMgc2VwYXJ0b3IgYW5kIG5vdCA6XG59O1xuXG5cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgPSAoYXR0cmlidXRlLCBub2RlICkgPT4ge1xuICAgIHJldHVybiBjb21wb25lbnRFdmVudG5hbWUoYCR7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9LSR7YXR0cmlidXRlfWAsIG5vZGUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge2NvbXBvbmVudEV2ZW50bmFtZSwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lfSIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9SRUFET05MWSwgXHJcblx0QVRUUklCVVRFX0VWQUxVQVRFLFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT04sIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXHJcblx0QVRUUklCVVRFX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OLCBcclxuXHRBVFRSSUJVVEVfRURJVEFCTEVcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XHJcbmltcG9ydCBDb25kaXRpb25IYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9Db25kaXRpb25IYW5kbGVcIjtcclxuaW1wb3J0IEVkaXRhYmxlSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvRWRpdGFibGVIYW5kbGVcIjtcclxuaW1wb3J0IFZhbGlkYXRpb25IYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9WYWxpZGF0aW9uSGFuZGxlXCI7XHJcbmltcG9ydCBNZXNzYWdlSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvTWVzc2FnZUhhbmRsZVwiO1xyXG5pbXBvcnQgeyBldmFsdWF0aW9uRGF0YSB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XHJcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlLCB1cGRhdGVDb25kaXRpb25TdGF0ZSwgdXBkYXRlRWRpdGFibGVTdGF0ZSwgdXBkYXRlUmVhZG9ubHlTdGF0ZSwgdXBkYXRlVmFsaWRTdGF0ZSB9IGZyb20gXCIuL3V0aWxzL1N0YXRlSGVscGVyXCI7XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTl07XHJcblxyXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHRcclxuXHQjY29uZGl0aW9uSGFuZGxlO1xyXG5cdCNlZGl0YWJsZUhhbmRsZTtcclxuXHQjdmFsaWRhdGlvbkhhbmRsZTtcclxuXHQjbWVzc2FnZUhhbmRsZTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy4jbWVzc2FnZUhhbmRsZSA9IG5ldyBNZXNzYWdlSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jY29uZGl0aW9uSGFuZGxlID0gbmV3IENvbmRpdGlvbkhhbmRsZSh0aGlzKTtcclxuXHRcdHRoaXMuI2VkaXRhYmxlSGFuZGxlID0gbmV3IEVkaXRhYmxlSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbkhhbmRsZSA9IG5ldyBWYWxpZGF0aW9uSGFuZGxlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YWRkVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XHJcblx0XHR0aGlzLiN2YWxpZGF0aW9uSGFuZGxlLmFkZEN1c3RvbVZhbGlkYXRpb24odmFsaWRhdGlvbik7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHRcdFxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbGlkYXRlOmAsIGRhdGEpXHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBcIlwiKTtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzKSk7XHJcblx0XHRhd2FpdCB0aGlzLiNjb25kaXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHRhd2FpdCB0aGlzLiNlZGl0YWJsZUhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBudWxsKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLiNtZXNzYWdlSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRsZXQgZm9ybSA9IF9mb3JtKHRoaXMpO1xyXG5cdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdGZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0X2Zvcm0odGhpcywgZm9ybSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XHJcblx0XHRcdHRoaXMuYWN0aXZlVXBkYXRlZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgYWN0aXZlVXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCByZWFkb25seSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHRpZighdGhpcy5lZGl0YWJsZSlcclxuXHRcdFx0dXBkYXRlUmVhZG9ubHlTdGF0ZSh0aGlzLCB0cnVlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHVwZGF0ZVJlYWRvbmx5U3RhdGUodGhpcywgcmVhZG9ubHksICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcclxuXHRcdHRoaXMucmVhZG9ubHlVcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZWFkb25seVVwZGF0ZWQoKSB7fVxyXG5cclxuXHRnZXQgZWRpdGFibGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0VESVRBQkxFKTtcclxuXHR9XHJcblxyXG5cdHNldCBlZGl0YWJsZShlZGl0YWJsZSkge1xyXG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCBlZGl0YWJsZSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xyXG5cdFx0dGhpcy5lZGl0YWJsZVVwZGF0ZWQoKTtcdFx0XHJcblx0XHR0aGlzLnJlYWRvbmx5ID0gIWVkaXRhYmxlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZWRpdGFibGVVcGRhdGVkKCkge1xyXG5cdH1cclxuXHJcblx0c2V0IGNvbmRpdGlvbihjb25kaXRpb24pe1xyXG5cdFx0dXBkYXRlQ29uZGl0aW9uU3RhdGUodGhpcywgY29uZGl0aW9uKTtcclxuXHRcdHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiAhdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNvbmRpdGlvblVwZGF0ZWQoKSB7fVxyXG5cclxuXHRzZXQgdmFsaWQodmFsaWQpe1xyXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0aGlzLCB2YWxpZCk7XHJcblx0XHR0aGlzLnZhbGlkVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZFVwZGF0ZWQoKXt9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2U7XHJcbiIsImltcG9ydCB7IEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCBFVkVOVF9GSUVMRF9SRU1PVkVELCBFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCwgQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgZGF0YUlzTm9WYWx1ZSB9IGZyb20gXCIuL3V0aWxzL1ZhbHVlSGVscGVyXCI7XHJcblxyXG5jb25zdCBfcGFyZW50ID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJwYXJlbnRcIik7XHJcbmV4cG9ydCBjb25zdCBfdmFsdWUgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInZhbHVlXCIpO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1JFUVVJUkVELCBBVFRSSUJVVEVfTk9WQUxVRV07XHJcblxyXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEZpZWxkID0gKGZpZWxkKSA9PiB7XHJcblx0bGV0IHBhcmVudCA9IGZpZWxkLnBhcmVudE5vZGU7XHJcblx0d2hpbGUgKHBhcmVudCkge1xyXG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHBhcmVudDtcclxuXHJcblx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVIYXNWYWx1ZSA9IChoYXNWYWx1ZSwgZmllbGQpID0+IHtcclxuXHRmaWVsZC5hdHRyKEFUVFJJQlVURV9OT1ZBTFVFLCAhaGFzVmFsdWUgPyBcIlwiIDogbnVsbCk7XHJcbn07XHJcblxyXG5jbGFzcyBCYXNlRmllbGQgZXh0ZW5kcyBCYXNlIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3Qge3ZhbHVlfSA9IG9wdGlvbnM7XHJcblx0XHRfdmFsdWUodGhpcywgdmFsdWUgfHwgbnVsbCk7XHRcdFxyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCkpO1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVzdHJveSgpIHtcdFx0XHJcblx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShudWxsKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9SRU1PVkVEKTtcclxuXHR9XHJcblxyXG5cdGdldCBwYXJlbnRGaWVsZCgpIHtcclxuXHRcdGxldCBwYXJlbnQgPSBfcGFyZW50KHRoaXMpO1xyXG5cdFx0aWYgKCFwYXJlbnQpIHtcclxuXHRcdFx0cGFyZW50ID0gZmluZFBhcmVudEZpZWxkKHRoaXMpO1xyXG5cdFx0XHRfcGFyZW50KHRoaXMsIHBhcmVudCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHtcclxuXHRcdHRoaXMuYWN0aXZlID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRyZXR1cm4gdGhpcy5wdWJsaXNoVmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcclxuXHR9XHJcblxyXG5cdGdldCByZXF1aXJlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVRVUlSRUQpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhhc1ZhbHVlKCkge1xyXG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTk9WQUxVRSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3Qge2NvbmRpdGlvbiwgdmFsaWQsIHJlYWR5fSA9IHRoaXM7XHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9KCR7dGhpcy5uYW1lfSkudmFsdWU6IGAsIGFyZ3VtZW50cywge2NvbmRpdGlvbiwgdmFsaWR9KTtcclxuXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gICFjb25kaXRpb24gfHwgIXZhbGlkID8gbnVsbCA6IF92YWx1ZSh0aGlzKTtcdFx0XHJcblx0XHRcclxuXHRcdGF3YWl0IHJlYWR5O1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gX3ZhbHVlKHRoaXMpO1xyXG5cclxuXHRcdGlmIChhd2FpdCB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKSkge1xyXG5cdFx0XHR2YWx1ZSA9IGF3YWl0IHRoaXMubm9ybWFsaXplVmFsdWUodmFsdWUpIHx8IHZhbHVlO1xyXG5cdFx0XHRpZiAoY3VycmVudFZhbHVlICE9IHZhbHVlKSB7XHRcdFx0XHRcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XHRcdFx0XHRcclxuXHRcdFx0XHRpZih0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKXtcclxuXHRcdGNvbnN0IGN1cnJlbnRDb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdGNvbnN0IGN1cnJlbnRWYWxpZCA9IHRoaXMudmFsaWQ7XHJcblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHN1cGVyLnZhbGlkYXRlKGRhdGEpO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHR0aGlzLnZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY3VycmVudENvbmRpdGlvbiAhPSBjb25kaXRpb24sICBjdXJyZW50VmFsaWQgIT0gdmFsaWQpO1xyXG5cclxuXHRcdHJldHVybiB2YWxpZDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY29uZGl0aW9uQ2hhbmdlLCB2YWxpZGF0aW9uQ2hhbmdlZCl7XHJcblx0XHRjb25zdCBoYXNDaGFuZ2UgPSBjb25kaXRpb25DaGFuZ2UgfHwgdmFsaWRhdGlvbkNoYW5nZWQ7XHJcblx0XHRpZihoYXNDaGFuZ2UpXHJcblx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHsgXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBwdWJsaXNoVmFsdWUodmFsdWUpIHtcclxuXHRcdC8vY29uc29sZS5sb2coYGNhbGwgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnB1Ymxpc2hWYWx1ZTpgLCB7YXJndW1lbnRzOiBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZX0pO1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0dmFsdWUgPSBfdmFsdWUodGhpcyk7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIndvcmsgd2l0aCBWYWx1ZTpcIiwgdmFsdWUpXHRcdFxyXG5cdFx0Y29uc3Qgbm9WYWx1ZSA9IGRhdGFJc05vVmFsdWUodmFsdWUpO1x0XHRcdFx0XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdGNvbnN0IHJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZDtcclxuXHRcdHZhbHVlID0gcmVxdWlyZWQgJiYgbm9WYWx1ZSA/IG51bGwgOiB2YWx1ZTtcdFx0XHJcblx0XHRcclxuXHRcdGlmKCFjb25kaXRpb24pXHJcblx0XHRcdHZhbHVlID0gbnVsbDtcclxuXHRcdGVsc2VcclxuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9KCR7dGhpcy5uYW1lfSkucHVibGlzaFZhbHVlOmAsIHtyZXF1aXJlZCwgY29uZGl0aW9uLCBub1ZhbHVlLCB2YWx1ZX0pO1xyXG5cclxuXHRcdHVwZGF0ZUhhc1ZhbHVlKCFub1ZhbHVlLCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5wYXJlbnRGaWVsZCkgYXdhaXQgdGhpcy5wYXJlbnRGaWVsZC5jaGlsZFZhbHVlQ2hhbmdlZCh0aGlzLCB2YWx1ZSk7XHJcblx0XHRlbHNlIGlmKHRoaXMuZm9ybSkgYXdhaXQgdGhpcy5mb3JtLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgdmFsdWUpIHt9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFzZUZpZWxkO1xyXG4iLCJleHBvcnQgY29uc3QgSFRNTF9UQUdfUFJFRklYID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVEhBTkRMRV9USU1FT1VUID0gMTA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUID0gNTAgKiBFVkVOVEhBTkRMRV9USU1FT1VUO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0ZPUk0gPSBgJHtIVE1MX1RBR19QUkVGSVh9Zm9ybWA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9TVUJNSVRfQUNUSU9OID0gYCR7SFRNTF9UQUdfUFJFRklYfXN1Ym1pdC1hY3Rpb25gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfUEFHRSA9IGAke0hUTUxfVEFHX1BSRUZJWH1wYWdlYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0ZJRUxEID0gYCR7SFRNTF9UQUdfUFJFRklYfWZpZWxkYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRBSU5FUiA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250YWluZXJgO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1QgPSBgJHtIVE1MX1RBR19QUkVGSVh9bGlzdGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX1JPV1M9IGAke0hUTUxfVEFHX1BSRUZJWH1yb3dzYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfUk9XPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfQUREX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfWFkZC1yb3dgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XPSBgJHtIVE1MX1RBR19QUkVGSVh9ZGVsZXRlLXJvd2A7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfUFJPR0VTU0JBUiA9IGAke0hUTUxfVEFHX1BSRUZJWH1wcm9ncmVzcy1iYXJgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfU1RFUCA9IGAke0hUTUxfVEFHX1BSRUZJWH1zdGVwYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9WQUxJREFUSU9OID0gYCR7SFRNTF9UQUdfUFJFRklYfXZhbGlkYXRpb25gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTUVTU0FHRSA9IGAke0hUTUxfVEFHX1BSRUZJWH1tZXNzYWdlYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2xgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9CQUNLID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtYmFja2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX05FWFQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1uZXh0YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfQ0FOQ0VMID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtY2FuY2VsYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWSA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLXN1bW1hcnlgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdWJtaXRgO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5JVCA9IFwiaW5pdFwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX1ZBTElEQVRJTkcgPSBcInZhbGlkYXRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9JTlBVVCA9IFwiaW5wdXRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9TVU1NQVJZID0gXCJzdW1tYXJ5XCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfRklOSVNIRUQgPSBcImZpbmlzaGVkXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVTID0ge1xyXG5cdGluaXQ6IEZPUk1TVEFURV9JTklULFxyXG5cdHZhbGlkYXRpbmc6IEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdGlucHV0OiBGT1JNU1RBVEVfSU5QVVQsXHJcblx0c3VtbWFyeTogRk9STVNUQVRFX1NVTU1BUlksXHJcblx0ZmluaXNoZWQ6IEZPUk1TVEFURV9GSU5JU0hFRCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBSRVFVSVJFRFNUQVRFUyA9IHtcclxuXHRhbHdheXM6IFwiYWx3YXlzXCIsXHJcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtLVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkUgPSBgJHtFVkVOVF9QUkVGSVh9aW5pdGlhbGl6ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OID0gYCR7RVZFTlRfSU5JVElBTElaRX1zdWJtaXQtYWN0aW9uYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVCA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUX1JFU1VMVFMgPSBgJHtFVkVOVF9QUkVGSVh9c3VibWl0LXJlc3VsdHNgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfRVhFQ1VURV9WQUxJREFURSA9IGAke0VWRU5UX1BSRUZJWH1leGVjdXRlLXZhbGlkYXRlYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWNvbmRpdGlvbi1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFID0gYCR7RVZFTlRfUFJFRklYfWFsbC1wdWJsaXNoLXZhbHVlYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTFVFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtdmFsdWUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TSVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c2l0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZJRUxEX0lOUFVUID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLWlucHV0YDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0FERCA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1hZGRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTElTVF9ST1dfREVMRVRFID0gYCR7RVZFTlRfUFJFRklYfWxpc3Qtcm93LWRlbGV0ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXByb2dyZXNzLWJhci1jaGFuZ2VkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX1BBR0VfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfXZhbGlkYXRpb24taW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURBVElPTl9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfXZhbGlkYXRpb24tcmVtb3ZlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfTUVTU0FHRV9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1tZXNzYWdlLWluaXRpYWxpemVkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX01FU1NBR0VfUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH1tZXNzYWdlLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWFjdGl2ZS1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWQtc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWVkaXRhYmxlLXN0YXRlLWNoYW5nZWRgO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTUEVDSUFMVkFSUyA9IHtcclxuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXHJcblx0Q1VSUkVOVExJU1RST1c6IFwiJGl0ZW1cIixcclxufTtcclxuXHJcbi8vQVRUUklCVVRFU1xyXG5cclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OQU1FID0gXCJuYW1lXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRU5EUE9JTlQgPSBcImVuZHBvaW50XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUVUSE9EID0gXCJtZXRob2RcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEFURSA9IFwic3RhdGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RFUCA9IFwic3RlcFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCA9IFwiaW5wdXQtbW9kZS1hZnRlci1zdWJtaXRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRCA9IFwicmVxdWlyZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSA9IFwicmVxdWlyZWQtb24tYWN0aXZlLW9ubHlcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEUgPSBcImVkaXRhYmxlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OID0gXCJlZGl0YWJsZS1jb25kaXRpb25cIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRUFET05MWSA9IFwicmVhZG9ubHlcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OT1ZBTFVFID0gXCJuby12YWx1ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOVkFMSUQgPSBcImludmFsaWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FVkFMVUFURSA9IFwiZXZhbHVhdGVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQgPSBcImNvbmRpdGlvbi12YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEID0gXCJjb25kaXRpb24taW52YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01JTiA9IFwibWluXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUFYID0gXCJtYXhcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfQ09OVEFJTkVSLCBcclxuXHRFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgXHJcblx0RVZFTlRfRklFTERfUkVNT1ZFRCBcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgZW10cHlPck5vVmFsdWVTdHJpbmcsIG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgZmluZEZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgdmFsdWVIZWxwZXIsIGZpZWxkVmFsdWVNYXBUb09iamVjdCB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2VGaWVsZCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRBSU5FUjtcclxuXHR9XHJcblxyXG5cdCNmaWVsZHMgPSBudWxsO1xyXG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xyXG5cdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCAmJiAoIXRoaXMuI2ZpZWxkcyB8fCAhdGhpcy4jZmllbGRzLmhhcyhmaWVsZCkpKVxyXG5cdFx0XHRcdFx0dGhpcy4jZmllbGRzID0gbnVsbDtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9SRU1PVkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XHJcblx0XHRcdFx0aWYgKGZpZWxkIGluc3RhbmNlb2YgQmFzZUZpZWxkICYmIHRoaXMuI2ZpZWxkcyAmJiB0aGlzLiNmaWVsZHMuaGFzKGZpZWxkKSlcclxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcy5kZWxldGUoZmllbGQpO1xyXG5cclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICh7IGRhdGEgfSkgPT4gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5maWVsZHMpKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWVsZHMoKSB7XHJcblx0XHRpZighdGhpcy4jZmllbGRzKVxyXG5cdFx0XHR0aGlzLiNmaWVsZHMgPSBuZXcgU2V0KGZpbmRGaWVsZHModGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuI2ZpZWxkcyk7XHJcblx0fVxyXG5cclxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XHJcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XHJcblx0XHRpZiAoZmllbGRzKVxyXG5cdFx0XHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRjb25zdCBtYXAgPSB0aGlzLiN2YWx1ZTtcclxuXHRcdG1hcC5jbGVhcigpO1xyXG5cdFx0Y29uc3QgZmllbGRzID0gdGhpcy5maWVsZHM7XHJcblx0XHRpZiAoZmllbGRzKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoYXN5bmMgKGZpZWxkKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdFx0Y29uc3QgZmllbGRWYWx1ZSA9IG5hbWUgPyB2YWx1ZUhlbHBlcih2YWx1ZSwgZmllbGQubmFtZSkgOiB2YWx1ZTtcclxuXHRcdFx0XHRpZighbm9WYWx1ZShmaWVsZFZhbHVlKSlcclxuXHRcdFx0XHRcdG1hcC5zZXQoZmllbGQsIGZpZWxkVmFsdWUpO1xyXG5cdFx0XHRcdGF3YWl0IGZpZWxkLnZhbHVlKGZpZWxkVmFsdWUpO1xyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIGZpZWxkcyk7XHJcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9LmNoaWxkVmFsdWVDaGFuZ2VkKCR7ZmllbGQubmFtZX0pOmAsIHtmaWVsZCwgdmFsdWV9KTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHRcdFxyXG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XHRcdFxyXG5cdFx0XHJcblx0XHRpZiAoZmllbGQpIHtcclxuXHRcdFx0Y29uc3QgaGFzRmllbGQgPSBtYXAuaGFzKGZpZWxkKTtcclxuXHRcdFx0Y29uc3QgY3VycmVudFZhbHVlID0gbWFwLmdldChmaWVsZCk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coe25hbWU6IGZpZWxkLm5hbWUsIGN1cnJlbnRWYWx1ZSwgdmFsdWUsIGhhc0ZpZWxkfSlcclxuXHJcblx0XHRcdGlmKGhhc0ZpZWxkICYmIGN1cnJlbnRWYWx1ZSA9PSB2YWx1ZSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGlmIChub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYGRlbGV0ZSAke2ZpZWxkLm5hbWV9YCk7XHJcblx0XHRcdFx0bWFwLmRlbGV0ZShmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhgc2V0ICR7ZmllbGQubmFtZX0gPSAke3ZhbHVlfWApO1xyXG5cdFx0XHRcdG1hcC5zZXQoZmllbGQsIHZhbHVlKTtcclxuXHRcdFx0fVx0XHRcdFx0XHJcblx0XHR9XHRcclxuXHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdChtYXAsIHRoaXMuZmllbGRzKTtcclxuXHRcdC8vY29uc29sZS5sb2coXCJkYXRhOiBcIixkYXRhKTtcclxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5sZW5ndGggPT0gMCkgZGF0YSA9IG51bGw7XHJcblxyXG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoZGF0YSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoQ29udGFpbmVyKTtcclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgeyBcclxuXHRGT1JNU1RBVEVfSU5JVCxcclxuXHRGT1JNU1RBVEVfSU5QVVQsXHJcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0Rk9STVNUQVRFX1NVTU1BUlksXHJcblx0Rk9STVNUQVRFX0ZJTklTSEVELCBcclxuXHROT0RFTkFNRV9DT05UUk9MLFxyXG5cdE5PREVOQU1FX0NPTlRST0xfQkFDSyxcclxuXHROT0RFTkFNRV9DT05UUk9MX05FWFQsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9DQU5DRUwsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQsIFxyXG5cdE5PREVOQU1FX0ZPUk0sXHJcblx0RVZFTlRfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcclxuXHROT0RFTkFNRV9DT05UUk9MX1NVTU1BUllcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgXCIuL2NvbnRyb2xzXCI7XHJcblxyXG5jb25zdCBCVVRUT05EVU1NWSA9IHtcclxuXHRhY3RpdmU6IHRydWUsXHJcblx0ZGlzYWJsZWQ6IHRydWUsXHJcbn07XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIENvbnRyb2wgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0w7XHJcblx0fVxyXG5cclxuXHQjZm9ybTtcclxuXHQjYmFjaztcclxuXHQjbmV4dDtcclxuXHQjc3VtbWFyeTtcclxuXHQjc3VibWl0O1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdHRoaXMuI2JhY2sgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9CQUNLKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xyXG5cdFx0XHR0aGlzLiNuZXh0ID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfTkVYVCkuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHRcdFx0dGhpcy4jc3VtbWFyeSA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblx0XHRcdHRoaXMuI3N1Ym1pdCA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX1NVQk1JVCkuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHJcblx0XHRcdHRoaXMuI2Zvcm0ub24oW0VWRU5UX0lOSVRJQUxJWkVELCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsIEVWRU5UX1NJVEVfQ0hBTkdFRF0sICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFxyXG5cclxuXHRhc3luYyB1cGRhdGUoKSB7XHJcblx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybTtcclxuXHRcdGNvbnN0IHN0YXRlID0gZm9ybS5zdGF0ZTtcclxuXHRcdGNvbnN0IGJhY2sgPSB0aGlzLiNiYWNrO1xyXG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMuI25leHQ7XHJcblx0XHRjb25zdCBzdW1tYXJ5ID0gdGhpcy4jc3VtbWFyeTtcclxuXHRcdGNvbnN0IHN1Ym1pdCA9IHRoaXMuI3N1Ym1pdFxyXG5cclxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcclxuXHRcdGJhY2suYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdG5leHQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0c3VtbWFyeS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0c3VibWl0LmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0c3VibWl0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0XHRpZihzdGF0ZSA9PSBGT1JNU1RBVEVfVkFMSURBVElORylcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgYWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBuZXh0UGFnZSwgcGFnZXMsIHVzZVN1bW1hcnlQYWdlIH0gPSBmb3JtO1x0XHJcblx0XHRjb25zdCBoYXNOZXh0UGFnZSA9IChhd2FpdCBuZXh0UGFnZSkgIT0gbnVsbDtcclxuXHJcblx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0ZJTklTSEVEKSB7XHJcblx0XHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkpIHtcclxuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XHJcblxyXG5cdFx0XHRpZiAoaGFzTmV4dFBhZ2UgfHwgKCFhY3RpdmVQYWdlLnZhbGlkICYmIGFjdGl2ZVBhZ2VJbmRleCArIDEgPCBwYWdlcy5sZW5ndGgpKSB7XHJcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdG5leHQuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcclxuXHRcdFx0fSBlbHNlIGlmICh1c2VTdW1tYXJ5UGFnZSAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0XHRzdW1tYXJ5LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0c3VtbWFyeS5kaXNhYmxlZCA9ICFhY3RpdmVQYWdlLnZhbGlkO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmRlZmluZShDb250cm9sKTtcclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbDtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfRklFTEQsIFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVUIFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQmFzZUZpZWxkLCB7X3ZhbHVlfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IHsgZmluZFdyYXBwZXIgfSBmcm9tIFwiLi93cmFwcGVyXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IGVtdHB5T3JOb1ZhbHVlU3RyaW5nLCBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW1wiZmlsZS1mb3JtYXRcIl07XHJcblxyXG5jbGFzcyBGaWVsZCBleHRlbmRzIEJhc2VGaWVsZCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZJRUxEO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I3dyYXBwZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5vbihFVkVOVF9GSUVMRF9JTlBVVCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShldmVudC5kZXRhaWwgfHwgbnVsbCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy4jd3JhcHBlciA9IGZpbmRXcmFwcGVyKHRoaXMpO1xyXG5cdFx0XHRpZiAodGhpcy4jd3JhcHBlcil7XHJcblx0XHRcdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICgpID0+IHRoaXMuI3dyYXBwZXIudmFsaWQpO1xyXG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKHRoaXMuI3dyYXBwZXIudmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XHJcblx0XHRpZiAodGhpcy4jd3JhcHBlcikgdGhpcy4jd3JhcHBlci5yZWFkb25seSA9IHRoaXMucmVhZG9ubHk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3dyYXBwZXIgPyB0aGlzLiN3cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLiN3cmFwcGVyKSByZXR1cm4gdGhpcy4jd3JhcHBlci5ub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IHdyYXBwZXIgPSB0aGlzLiN3cmFwcGVyO1xyXG5cdFx0aWYgKHdyYXBwZXIpe1xyXG5cdFx0XHRjb25zdCBjdXJyZW50ID0gd3JhcHBlci52YWx1ZSB8fCBudWxsO1xyXG5cdFx0XHRpZihjdXJyZW50ICE9IHZhbHVlKVxyXG5cdFx0XHRcdGF3YWl0IHdyYXBwZXIudXBkYXRlZFZhbHVlKHZhbHVlKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IHN1cGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGNvbmRpdGlvbkNoYW5nZSwgdmFsaWRhdGlvbkNoYW5nZWQpe1x0XHRcclxuXHRcdGlmKGNvbmRpdGlvbkNoYW5nZSAmJiB0aGlzLmNvbmRpdGlvbil7XHRcdFx0XHJcblx0XHRcdGNvbnN0IHdyYXBwZXIgPSB0aGlzLiN3cmFwcGVyO1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHdyYXBwZXIudmFsdWUgfHwgbnVsbDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZCgke3RoaXMubmFtZX0gKCR7Y29uZGl0aW9uQ2hhbmdlfSwgJHt2YWxpZGF0aW9uQ2hhbmdlZH0pIC0+ICR7dmFsdWV9YClcclxuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHN1cGVyLnZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY29uZGl0aW9uQ2hhbmdlLCB2YWxpZGF0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoRmllbGQpO1xyXG5leHBvcnQgZGVmYXVsdCBGaWVsZDtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgTk9ERU5BTUVfUEFHRSwgRVZFTlRfSU5JVElBTElaRUQsIEVWRU5UX1BBR0VfSU5JVElBTElaRUQsIEVWRU5UX1BBR0VfUkVNT1ZFRCwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBFVkVOVF9TSVRFX0NIQU5HRUQsIEVWRU5UX1NVQk1JVCwgRVZFTlRfU1VCTUlUX1JFU1VMVFMsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCwgRk9STVNUQVRFX0lOUFVULCBGT1JNU1RBVEVfU1VNTUFSWSwgRk9STVNUQVRFX1ZBTElEQVRJTkcsIEZPUk1TVEFURV9JTklULCBGT1JNU1RBVEVfRklOSVNIRUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgXCIuL01lc3NhZ2VcIjtcclxuaW1wb3J0IFwiLi9NZXNzYWdlXCI7XHJcbmltcG9ydCBQYWdlIGZyb20gXCIuL1BhZ2VcIjtcclxuaW1wb3J0IFwiLi9Db250cm9sXCI7XHJcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uXCI7XHJcbmltcG9ydCBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL0RlZmF1bHRGb3JtU3VibWl0QWN0aW9uXCI7XHJcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwsIFNUQVRFX1NVQ0NFU1MgYXMgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHsgdmFsdWVIZWxwZXIsIGZpZWxkVmFsdWVNYXBUb09iamVjdCB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XHJcblxyXG5jb25zdCBfc3VibWl0QWN0aW9ucyA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwic3VibWl0QWN0aW9uXCIpO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVRdO1xyXG5cclxuY29uc3QgcmVhZG9ubHkgPSAoZm9ybSwgcmVhZG9ubHkpID0+IHtcclxuXHRmb3IgKGxldCBwYWdlIG9mIGZvcm0ucGFnZXMpIHtcclxuXHRcdHBhZ2UucmVhZG9ubHkgPSByZWFkb25seTtcclxuXHRcdHBhZ2UuYWN0aXZlID0gcmVhZG9ubHk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgZXhlY3V0ZUFjdGlvbnMgPSBhc3luYyAoYWN0aW9ucywgZGF0YSkgPT4ge1xyXG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcclxuXHRmb3IgKGxldCBhY3Rpb24gb2YgYWN0aW9ucykge1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gYXdhaXQgYWN0aW9uLmFjY2VwdChkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSAoYXdhaXQgYWN0aW9uLmV4ZWN1dGUoZGF0YSkpIHx8IG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQoYWN0aW9uLCBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MpO1xyXG5cdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHRcdGlmIChyZXN1bHQuc3RhdGUgPT0gQUNUSU9OX1NVQk1JVF9TVEFURV9GQUlMKSByZXR1cm4gcmVzdWx0cztcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdHJlc3VsdHMucHVzaChuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9GQUlMLCBlKSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdHM7XHJcbn07XHJcblxyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9GT1JNO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I3N0YXRlID0gRk9STVNUQVRFX0lOSVQ7XHJcblx0I3BhZ2VzO1xyXG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcclxuXHQjZGF0YSA9IHt9O1xyXG5cdCN2YWxpZGF0aW9uID0gbnVsbDtcclxuXHQjaGFzTmV4dFZhbGlkYXRpb24gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfUEFHRV9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9QQUdFX1JFTU9WRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCBwYWdlID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHR0aGlzLiNwYWdlcyA9IG51bGw7XHJcblx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQocGFnZSwgbnVsbCk7XHJcblxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRUQpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcclxuXHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5JVDtcclxuXHJcblx0XHRcdHRoaXMudXNlU3VtbWFyeVBhZ2UgPSB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSk7XHJcblxyXG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xyXG5cdFx0XHRpZiAodGhpcy5wYWdlcy5sZW5ndGggPiAwKSB0aGlzLnRvTmV4dFBhZ2UoKTtcdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBwYWdlcygpIHtcclxuXHRcdGlmICghdGhpcy4jcGFnZXMpIHRoaXMuI3BhZ2VzID0gQXJyYXkuZnJvbSh0aGlzLnJvb3QuZmluZChOT0RFTkFNRV9QQUdFKSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI3BhZ2VzO1xyXG5cdH1cclxuXHJcblx0Z2V0IHN0YXRlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3N0YXRlO1xyXG5cdH1cclxuXHJcblx0c2V0IHN0YXRlKHN0YXRlKSB7XHJcblx0XHRjb25zdCBhY3R1YWwgPSB0aGlzLiNzdGF0ZTtcclxuXHRcdGlmIChzdGF0ZSAhPSBGT1JNU1RBVEVfVkFMSURBVElORykge1xyXG5cdFx0XHRpZiAoYWN0dWFsID09IEZPUk1TVEFURV9JTlBVVCAmJiBzdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHJlYWRvbmx5KHRoaXMsIHRydWUpO1xyXG5cdFx0XHRlbHNlIGlmIChhY3R1YWwgIT0gRk9STVNUQVRFX0lOUFVUICYmIHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRcdHJlYWRvbmx5KHRoaXMsIGZhbHNlKTtcclxuXHRcdFx0XHRpZiAodGhpcy5hY3RpdmVQYWdlKSB0aGlzLmFjdGl2ZVBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy4jc3RhdGUgPSBzdGF0ZTtcclxuXHJcblx0XHRpZiAoYWN0dWFsICE9IHN0YXRlKSB0aGlzLnRyaWdnZXIoRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEKTtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfU1RBVEUsIHN0YXRlKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWxpZCgpIHtcclxuXHRcdGZvciAobGV0IHBhZ2Ugb2YgdGhpcy5wYWdlcykgaWYgKHBhZ2UuY29uZGl0aW9uICYmICFwYWdlLnZhbGlkKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWx1ZShkYXRhKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24pIGF3YWl0IHRoaXMuI3ZhbGlkYXRpb247XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm4gdGhpcy4jZGF0YTtcclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwodGhpcy5wYWdlcy5tYXAocGFnZSA9PiB7XHRcdFx0XHRcclxuXHRcdFx0XHRjb25zdCBuYW1lID0gcGFnZS5uYW1lO1xyXG5cdFx0XHRcdHJldHVybiBuYW1lID8gcGFnZS52YWx1ZSh2YWx1ZUhlbHBlcihkYXRhLCBuYW1lKSkgOiBwYWdlLnZhbHVlKGRhdGEpO1xyXG5cdFx0XHR9KSk7XHJcblxyXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGhhbmRsZSA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZU9uKGhhbmRsZSwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEKTtcclxuXHRcdFx0XHRcdHJlc29sdmUodGhpcy52YWx1ZShkYXRhKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMub24oRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBoYW5kbGUpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZVBhZ2UoKSB7XHJcblx0XHRpZiAoMCA8PSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAmJiB0aGlzLmFjdGl2ZVBhZ2VJbmRleCA8IHRoaXMucGFnZXMubGVuZ3RoKSByZXR1cm4gdGhpcy5wYWdlc1t0aGlzLmFjdGl2ZVBhZ2VJbmRleF07XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlUGFnZShwYWdlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmVQYWdlO1xyXG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCB8fCB0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRpZiAoY3VycmVudCkgY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XHJcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSB0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cclxuXHRcdFx0dGhpcy5zY3JvbGxJbnRvVmlldygpO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU0lURV9DSEFOR0VEKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBwcmV2UGFnZSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1x0XHRcdFxyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IHBhZ2VzW2ldO1xyXG5cdFx0XHRcdGF3YWl0IHBhZ2UudmFsaWRhdGUoZGF0YSk7XHJcblx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IG5leHRQYWdlKCkge1xyXG5cdFx0cmV0dXJuIChhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHBhZ2VzID0gdGhpcy5wYWdlcztcclxuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCArIDE7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XHJcblx0XHRcdGlmIChwYWdlcykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRjb25zdCBwYWdlID0gcGFnZXNbaV07XHJcblx0XHRcdFx0XHRhd2FpdCBwYWdlLnZhbGlkYXRlKGRhdGEpO1xyXG5cdFx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdG9QcmV2UGFnZSgpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJldiA9IGF3YWl0IHRoaXMucHJldlBhZ2U7XHJcblx0XHRcdGlmIChwcmV2KSB0aGlzLmFjdGl2ZVBhZ2UgPSBwcmV2O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdG9OZXh0UGFnZSgpIHtcclxuXHRcdGNvbnN0IG5leHQgPSBhd2FpdCB0aGlzLm5leHRQYWdlO1xyXG5cdFx0aWYgKG5leHQpIHtcclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlID0gbmV4dDtcclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy51c2VTdW1tYXJ5UGFnZSkge1xyXG5cdFx0XHR0aGlzLnN1bW1hcnkoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyBzdW1tYXJ5KCkge1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9TVU1NQVJZO1xyXG5cdH1cclxuXHJcblx0Z2V0IHN1Ym1pdEFjdGlvbnMoKSB7XHJcblx0XHRsZXQgYWN0aW9ucyA9IF9zdWJtaXRBY3Rpb25zKHRoaXMpO1xyXG5cdFx0aWYgKCFhY3Rpb25zKSB7XHJcblx0XHRcdGFjdGlvbnMgPSBbXTtcclxuXHRcdFx0bGV0IGVuZHBvaW50ID0gdGhpcy5hdHRyKEFUVFJJQlVURV9FTkRQT0lOVCk7XHJcblx0XHRcdGlmIChlbmRwb2ludCkge1xyXG5cdFx0XHRcdGNvbnN0IG1ldGhvZCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfTUVUSE9EKSB8fCBcInBvc3RcIjtcclxuXHRcdFx0XHR0aGlzLmFwcGVuZChuZXcgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24oZW5kcG9pbnQsIG1ldGhvZCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLmNoaWxkcmVuO1xyXG5cdFx0XHRmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHMpIHtcclxuXHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBCYXNlU3VibWl0QWN0aW9uKSBhY3Rpb25zLnB1c2goY2hpbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF9zdWJtaXRBY3Rpb25zKHRoaXMsIGFjdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhY3Rpb25zO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc3VibWl0KCkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudmFsdWUoKTtcclxuXHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5wYWdlcyk7XHJcblx0XHRpZiAoIXZhbGlkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQpKSB0aGlzLnN0YXRlID0gRk9STVNUQVRFX0ZJTklTSEVEO1xyXG5cclxuXHRcdGNvbnN0IGFjdGlvbnMgPSB0aGlzLnN1Ym1pdEFjdGlvbnM7XHJcblx0XHRpZiAoYWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gYXdhaXQgZXhlY3V0ZUFjdGlvbnMoYWN0aW9ucywgZGF0YSk7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TVUJNSVRfUkVTVUxUUywgcmVzdWx0cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NVQk1JVCwgZGF0YSk7XHJcblx0fVxyXG5cclxuXHQjdmFsaWRhdGUocGFnZSkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfVkFMSURBVElORztcclxuXHRcdFx0cmV0dXJuICh0aGlzLiN2YWxpZGF0aW9uID0gbmV3IFByb21pc2UoKHJlc29sdmVkKSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gdGhpcy4jZGF0YTsvL2F3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdCh0aGlzLiN2YWx1ZSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGNvbnN0IHZhbGlkID0gcGFnZSA/IHBhZ2UudmFsaWRhdGUoZGF0YSkgOiBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhkYXRhLCB0aGlzLnBhZ2VzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuI2hhc05leHRWYWxpZGF0aW9uKSB0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGlvbiA9IG51bGw7XHJcblx0XHRcdFx0XHRyZXNvbHZlZCh2YWxpZCk7XHJcblx0XHRcdFx0fSwgMTApO1xyXG5cdFx0XHR9KSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpIHtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbi50aGVuKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLiNoYXNOZXh0VmFsaWRhdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRlKHBhZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcdFx0XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xyXG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XHJcblx0XHQvL2NvbnNvbGUubG9nKGBmb3JtLmNoaWxkVmFsdWVDaGFuZ2VkKCR7ZmllbGQubmFtZX0pYCwgeyBmaWVsZCwgdmFsdWUgfSk7XHJcblx0XHRpZiAoZmllbGQpIHtcclxuXHRcdFx0aWYgKG5vVmFsdWUodmFsdWUpKSBtYXAuZGVsZXRlKGZpZWxkKTtcclxuXHRcdFx0ZWxzZSBtYXAuc2V0KGZpZWxkLCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4jZGF0YSA9IGF3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdCh0aGlzLiN2YWx1ZSwgdGhpcy5wYWdlcyk7XHJcblxyXG5cdFx0Y29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuYWN0aXZlUGFnZTtcclxuXHRcdGlmIChhY3RpdmVQYWdlKSBhd2FpdCB0aGlzLiN2YWxpZGF0ZShhY3RpdmVQYWdlKTtcclxuXHRcdGVsc2UgYXdhaXQgdGhpcy4jdmFsaWRhdGUoKTtcclxuXHR9XHJcbn1cclxuZGVmaW5lKEZvcm0pO1xyXG5leHBvcnQgZGVmYXVsdCBGb3JtO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9GT1JNLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRUQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEXTtcclxuXHJcbmNsYXNzIEZvcm1CdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQjZm9ybTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuZGlzYWJsZWQpIHRoaXMuZXhlY3V0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKHRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRpZiAoIXRoaXMuI2Zvcm0pXHJcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIGFjdGl2ZSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCBkaXNhYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRElTQUJMRUQpO1xyXG5cdH1cclxuXHJcblx0c2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBkaXNhYmxlZCA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcImV4ZWN1dGVcIik7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm1CdXR0b247XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0xJU1QsIE5PREVOQU1FX0xJU1RfUk9XUywgTk9ERU5BTUVfTElTVF9ST1csIE5PREVOQU1FX0xJU1RfQUREX1JPVywgTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XLCBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgRVZFTlRfTElTVF9ST1dfQURELCBFVkVOVF9MSVNUX1JPV19ERUxFVEUsIEFUVFJJQlVURV9NSU4sIEFUVFJJQlVURV9NQVggfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9saXN0L1Jvd1wiO1xyXG5pbXBvcnQgQWRkUm93LCB7RVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPV30gZnJvbSBcIi4vbGlzdC9BZGRSb3dcIjtcclxuaW1wb3J0IFwiLi9saXN0L0RlbGV0ZVJvd1wiO1xyXG5pbXBvcnQgXCIuL2xpc3QvUm93c1wiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTUlOLCBBVFRSSUJVVEVfTUFYXTtcclxuXHJcbmNvbnN0IGJ1aWxkRGF0YSA9IGFzeW5jIChyb3dzLCB2YWx1ZXMpID0+IHtcclxuXHRsZXQgZGF0YSA9IFtdO1xyXG5cdGZvciAobGV0IHJvdyBvZiByb3dzKSBkYXRhLnB1c2godmFsdWVzLmdldChyb3cpKTtcclxuXHJcblx0aWYgKGRhdGEubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUO1xyXG5cdH1cclxuXHJcblx0I3RlbXBsYXRlO1xyXG5cdCNjb250YWluZXI7XHJcblx0I3ZhbHVlcyA9IG5ldyBNYXAoKTtcclxuXHQjYWRkUm93QnV0dG9uO1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHJcblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xyXG5cdFx0cm9vdC5vbihFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0dGhpcy4jYWRkUm93QnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZih0YXJnZXQgIT0gdGhpcyl7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9MSVNUX1JPV19BREQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRcdGlmICghcmVhZG9ubHkpIHRoaXMuY3JlYXRlUm93KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX0xJU1RfUk9XX0RFTEVURSwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0Y29uc3QgeyByb3dzLCByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdFx0aWYgKCFyZWFkb25seSkge1xyXG5cdFx0XHRcdGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XHJcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRcdHJvdy5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHsgcm93cywgbWluLCBtYXgsIHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcclxuXHRcdFx0aWYgKHRoaXMuI2FkZFJvd0J1dHRvbiAmJiAhcmVhZG9ubHkpIHtcclxuXHRcdFx0XHRpZiAobGVuZ3RoID09IG1heCkgdGhpcy4jYWRkUm93QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRlbHNlIGlmIChsZW5ndGggPCBtYXgpIHRoaXMuI2FkZFJvd0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtaW4gPD0gbGVuZ3RoICYmIGxlbmd0aCA8PSBtYXg7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKGRhdGEpID0+IHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucm93cyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0Y29uc3Qgcm93VGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xyXG5cdFx0XHRpZihyb3dUZW1wbGF0ZSlcclxuXHRcdFx0XHR0aGlzLiN0ZW1wbGF0ZSA9IHJvd1RlbXBsYXRlLmNvbnRlbnQ7XHJcblxyXG5cdFx0XHR0aGlzLiNjb250YWluZXIgPSB0aGlzLmZpbmQoTk9ERU5BTUVfTElTVF9ST1dTKS5maXJzdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0Y29uc3QgeyByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3MpIHtcclxuXHRcdFx0cm93LnJlYWRvbmx5ID0gcmVhZG9ubHk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcm93cygpIHtcclxuXHRcdGlmKHRoaXMuI2NvbnRhaW5lcilcclxuXHRcdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jY29udGFpbmVyLmNoaWxkcmVuKTtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdGdldCBtaW4oKSB7XHJcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01JTikpIHJldHVybiBNYXRoLm1heCgwLCBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01JTikpKTtcclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0Z2V0IG1heCgpIHtcclxuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUFYKSkgcmV0dXJuIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUFYKSk7XHJcblx0XHRyZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuICF2YWx1ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZSA/IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKSA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGVSb3codmFsdWUpIHtcclxuXHRcdGNvbnN0IHJvdyA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy4jdGVtcGxhdGUsIHRydWUpLmNoaWxkcmVuWzBdO1xyXG5cdFx0YXdhaXQgdGhpcy4jY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkgYXdhaXQgcm93LnZhbHVlKHZhbHVlKTtcclxuXHJcblx0XHRyZXR1cm4gcm93O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlcykge1xyXG5cdFx0dGhpcy4jdmFsdWVzLmNsZWFyKCk7XHJcblx0XHR0aGlzLiNjb250YWluZXIuZW1wdHkoKTtcclxuXHRcdGlmICh2YWx1ZXMpIGF3YWl0IFByb21pc2UuYWxsKHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy5jcmVhdGVSb3codmFsdWUpKSk7XHJcblxyXG5cdFx0cmV0dXJuIGF3YWl0IGJ1aWxkRGF0YSh0aGlzLnJvd3MsIHRoaXMuI3ZhbHVlcyk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChyb3csIHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xyXG5cdFx0Y29uc3QgdmFsdWVzID0gdGhpcy4jdmFsdWVzO1xyXG5cclxuXHRcdGlmIChub1ZhbHVlKHZhbHVlKSkgdGhpcy4jdmFsdWVzLmRlbGV0ZShyb3cpO1xyXG5cdFx0ZWxzZSB0aGlzLiN2YWx1ZXMuc2V0KHJvdywgdmFsdWUpO1xyXG5cclxuXHRcdGF3YWl0IHN1cGVyLmNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgdmFsdWUpO1xyXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGJ1aWxkRGF0YSh0aGlzLnJvd3MsIHZhbHVlcyk7XHJcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZShkYXRhKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShMaXN0KTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdDtcclxuIiwiaW1wb3J0IHtFeHByZXNzaW9uUmVzb2x2ZXJ9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBcclxuXHROT0RFTkFNRV9NRVNTQUdFLFxyXG5cdEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfTUVTU0FHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcclxuXHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTUVTU0FHRTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTUVTU0FHRV9JTklUSUFMSVpFRCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCl7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTUVTU0FHRV9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGRhdGEpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblx0fVxyXG59XHJcbmRlZmluZShNZXNzYWdlKTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfUEFHRSwgIFxyXG5cdEFUVFJJQlVURV9TVEVQLCBcclxuXHRFVkVOVF9QQUdFX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX1BBR0VfUkVNT1ZFRFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XHJcblxyXG5jbGFzcyBQYWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfUEFHRTtcclxuXHR9XHJcblx0XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX1BBR0VfSU5JVElBTElaRUQpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKXtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9QQUdFX1JFTU9WRUQpO1xyXG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHN0ZXAoKXtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX1NURVApO1xyXG5cdH1cclxuXHRcclxuXHRjb25kaXRpb25VcGRhdGVkKCl7fVxyXG59XHJcbmRlZmluZShQYWdlKTtcclxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfRk9STSwgXHJcblx0Tk9ERU5BTUVfUFJPR0VTU0JBUixcclxuXHROT0RFTkFNRV9TVEVQLFxyXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCxcclxuXHRGT1JNU1RBVEVfSU5JVCxcclxuXHRGT1JNU1RBVEVfVkFMSURBVElORyxcclxuXHRGT1JNU1RBVEVfSU5QVVQsXHJcblx0Rk9STVNUQVRFX1NVTU1BUlksXHJcblx0Rk9STVNUQVRFX0ZJTklTSEVELCBcclxuXHRBVFRSSUJVVEVfUFJPR1JFU1MgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHtDb21wb25lbnQgLGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBcIi4vU3RlcFwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfUFJPR1JFU1NdO1xyXG5cclxuY29uc3QgZmlyc3RTdGVwUGFnZUluZGV4ID0gKHBhZ2VzLCBzdGVwLCBhY3RpdmVQYWdlKSA9PiB7XHJcblx0Zm9yIChsZXQgcGFnZSBvZiBwYWdlcykge1xyXG5cdFx0aWYgKHBhZ2Uuc3RlcCA9PSBzdGVwICYmIHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcclxuXHRcdGVsc2UgaWYgKHBhZ2UgPT0gYWN0aXZlUGFnZSkgcmV0dXJuO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfUFJPR0VTU0JBUjtcclxuXHR9XHJcblxyXG5cdCNmb3JtO1xyXG5cdCNzdGVwcztcclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLiNmb3JtKSByZXR1cm47XHJcblx0XHRcdGlmICh0YXJnZXQgPT0gdGhpcykgcmV0dXJuO1x0XHRcdFxyXG5cdFx0XHRjb25zdCBzdGVwID0gdGFyZ2V0LmlzKE5PREVOQU1FX1NURVApID8gdGFyZ2V0IDogdGFyZ2V0LnBhcmVudChOT0RFTkFNRV9TVEVQKTtcclxuXHRcdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm07XHJcblxyXG5cdFx0XHRpZiAoIXN0ZXApIHJldHVybjtcclxuXHJcblx0XHRcdGNvbnN0IHtzdGF0ZSwgcGFnZXMsIGFjdGl2ZVBhZ2V9ID0gZm9ybTtcclxuXHRcdFx0Y29uc3Qgc3RlcE5hbWUgPSBzdGVwLm5hbWU7XHJcblx0XHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQgfHwgc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkpIHtcclxuXHRcdFx0XHRjb25zdCBwYWdlID0gZmlyc3RTdGVwUGFnZUluZGV4KHBhZ2VzLCBzdGVwTmFtZSwgYWN0aXZlUGFnZSk7XHJcblx0XHRcdFx0aWYgKHBhZ2UpIGZvcm0uYWN0aXZlUGFnZSA9IHBhZ2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMucHJvZ3Jlc3MgPSAwO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cdFx0XHR0aGlzLiNzdGVwcyA9IHRoaXMuZmluZChOT0RFTkFNRV9TVEVQKTtcclxuXHRcdFx0dGhpcy4jZm9ybS5vbihbRVZFTlRfU0lURV9DSEFOR0VELEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRF0sICgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzdGF0ZSA9IGZvcm0uc3RhdGU7XHJcblx0XHRcdFx0aWYoRk9STVNUQVRFX1ZBTElEQVRJTkcgPT0gc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3Qge2FjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgcGFnZXN9ID0gZm9ybTtcclxuXHRcdFx0XHRpZiAoIWFjdGl2ZVBhZ2UpIFxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRjb25zdCBjb3VudCA9IHBhZ2VzLmxlbmd0aDtcclxuXHRcdFx0XHRjb25zdCBwYWdlU3RlcCA9IGFjdGl2ZVBhZ2UgPyBhY3RpdmVQYWdlLnN0ZXAgOiBGT1JNU1RBVEVfSU5JVDtcclxuXHRcdFx0XHRjb25zdCBwcm9ncmVzcyA9IE1hdGguZmxvb3IoKGFjdGl2ZVBhZ2VJbmRleCAqIDEwMCkgLyBjb3VudCk7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IHN0ZXAgb2YgdGhpcy5zdGVwcykge1xyXG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHN0ZXAubmFtZTtcclxuXHRcdFx0XHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IHBhZ2VTdGVwO1xyXG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XHJcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBGT1JNU1RBVEVfU1VNTUFSWTtcclxuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURV9GSU5JU0hFRDtcclxuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnByb2dyZXNzID0gc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkgfHwgc3RhdGUgPT0gRk9STVNUQVRFX0ZJTklTSEVEID8gMTAwIDogcHJvZ3Jlc3M7XHJcblxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgc3RlcHMoKXtcclxuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuI3N0ZXBzKTtcclxuXHR9XHJcblxyXG5cdGdldCBwcm9ncmVzcygpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTKTtcclxuXHR9XHJcblxyXG5cdHNldCBwcm9ncmVzcyhwcm9ncmVzcykge1xyXG5cdFx0aWYgKHRoaXMuc3R5bGUuc2V0UHJvcGVydHkpIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXByb2dyZXNzXCIsIHByb2dyZXNzICsgXCIlXCIpO1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUywgTWF0aC5tYXgoMCwgTWF0aC5taW4ocHJvZ3Jlc3MsIDEwMCkpKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShQcm9ncmVzc0Jhcik7XHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9TVEVQLCBcclxuXHRBVFRSSUJVVEVfTkFNRSwgXHJcblx0QVRUUklCVVRFX0FDVElWRSwgXHJcblx0QVRUUklCVVRFX1JFQURPTkxZIFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB1cGRhdGVBY3RpdmVTdGF0ZSB9IGZyb20gXCIuL3V0aWxzL1N0YXRlSGVscGVyXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFldO1xyXG5cclxuY2xhc3MgU3RlcCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfU1RFUDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG4gICAgZ2V0IG5hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9OQU1FKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XHJcblx0XHRpZiAoY3VycmVudCAhPSBhY3RpdmUpIHtcclxuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCByZWFkb25seSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHRyZWFkb25seSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoU3RlcCk7XHJcbmV4cG9ydCBkZWZhdWx0IFN0ZXA7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX1ZBTElEQVRJT04sXHJcblx0RVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCxcclxuXHRFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsXHJcblx0QVRUUklCVVRFX0FDVElWRSxcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xyXG5cclxuXHJcbmNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1ZBTElEQVRJT047XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVzdHJveSgpIHtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQpO1xyXG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0fVxyXG59XHJcbmRlZmluZShWYWxpZGF0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbjtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9CQUNLIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBCYWNrQnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9CQUNLO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b1ByZXZQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tCdXR0b247XHJcbmRlZmluZShCYWNrQnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9ORVhUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX05FWFQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEJ1dHRvbjtcclxuZGVmaW5lKE5leHRCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9DT05UUk9MX1NVQk1JVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgU3VibWl0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0uc3VibWl0KCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN1Ym1pdEJ1dHRvbjtcclxuZGVmaW5lKFN1Ym1pdEJ1dHRvbik7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWVxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnlCdXR0b247XHJcbmRlZmluZShTdW1tYXJ5QnV0dG9uKTtcclxuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xuaW1wb3J0IE5leHRCdXR0b24gZnJvbSBcIi4vTmV4dEJ1dHRvblwiO1xuaW1wb3J0IFN1bW1hcnlCdXR0b24gZnJvbSBcIi4vU3VtbWFyeUJ1dHRvblwiO1xuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcblxuZXhwb3J0IHtcblx0QmFja0J1dHRvbixcblx0TmV4dEJ1dHRvbixcblx0U3VtbWFyeUJ1dHRvbixcblx0U3VibWl0QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY2xhc3MgQ29uZGl0aW9uSGFuZGxlIHtcclxuXHJcbiAgICAjYmFzZTtcclxuICAgICNjb25kaXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7ICBcclxuICAgICAgICB0aGlzLiNiYXNlID0gYmFzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZGl0aW9uKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuI2NvbmRpdGlvbilcclxuICAgICAgICAgICAgdGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBiYXNlLmNvbmRpdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KWAsIGNvbmRpdGlvbiwgZGF0YSk7ICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XHJcbiAgICAgICAgaWYoY29uZGl0aW9uICE9IGN1cnJlbnQpXHJcbiAgICAgICAgICAgIGJhc2UuY29uZGl0aW9uID0gY29uZGl0aW9uXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coYGNvbmRpdGlvbigke2Jhc2UubmFtZX0pIHJlc3VsdDpgLCBjb25kaXRpb24pO1xyXG4gICAgICAgIHJldHVybiBjb25kaXRpb247XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25kaXRpb25IYW5kbGU7IiwiaW1wb3J0IHsgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jbGFzcyBFZGl0YWJsZUhhbmRsZSB7XHJcblx0I2Jhc2U7XHJcblx0I2NvbmRpdGlvbiA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcclxuXHRcdHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLiNjb25kaXRpb24gPT0gbnVsbClcclxuXHRcdFx0dGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pIHx8IFwiXCI7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBsZXQgZWRpdGFibGUgPSB0cnVlO1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuI2Jhc2UuZWRpdGFibGU7XHJcbiAgICAgICAgLypjb25zdCB7aGFzVmFsdWUsIHJlcXVpcmVkfSA9IHRoaXMuI2Jhc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWhhc1ZhbHVlICYmIHJlcXVpcmVkKVxyXG4gICAgICAgICAgICBlZGl0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgZWxzZSovIGlmKHRoaXMuY29uZGl0aW9uKVxyXG4gICAgICAgICAgICBlZGl0YWJsZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKGVkaXRhYmxlICE9IGN1cnJlbnQpIHRoaXMuI2Jhc2UuZWRpdGFibGUgPSBlZGl0YWJsZTtcclxuXHJcblx0XHRyZXR1cm4gZWRpdGFibGU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0YWJsZUhhbmRsZTtcclxuIiwiaW1wb3J0IHtcclxuICAgIEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsIFxyXG4gICAgRVZFTlRfTUVTU0FHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VIYW5kbGUge1xyXG5cclxuICAgICNtZXNzYWdlcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlKXtcclxuICAgICAgICBiYXNlLm9uKEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsIChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuI21lc3NhZ2VzLmFkZCh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBiYXNlLm9uKEVWRU5UX01FU1NBR0VfUkVNT1ZFRCwgKGV2ZW50KSA9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy4jbWVzc2FnZXMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgdGhpcy4jbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UudXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUhhbmRsZTsiLCJpbXBvcnQgeyBFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVELCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY29uc3QgdmFsaWRhdGVDdXN0b21WYWxpZGF0aW9ucyA9IGFzeW5jICh2YWxpZGF0aW9ucywgZGF0YSwgYmFzZSkgPT4ge1xyXG5cdGxldCB2YWxpZCA9IHRydWU7XHJcblx0Zm9yIChsZXQgY2hlY2sgb2YgdmFsaWRhdGlvbnMpIHtcclxuXHRcdGlmICghKGF3YWl0IGNoZWNrKHsgZGF0YSwgYmFzZSB9KSkpIHZhbGlkID0gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB2YWxpZDtcclxufTtcclxuXHJcbmNsYXNzIFZhbGlkYXRpb25IYW5kbGUge1xyXG5cdCNiYXNlO1xyXG5cdCN2YWxpZGF0aW9ucyA9IG5ldyBTZXQoKTtcclxuXHQjY3VzdG9tcyA9IG5ldyBTZXQoKTtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblx0XHRiYXNlLm9uKEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbnMuYWRkKGV2ZW50LnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRiYXNlLm9uKEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0aGlzLiN2YWxpZGF0aW9ucy5kZWxldGUoZXZlbnQudGFyZ2V0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YWRkQ3VzdG9tVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XHJcblx0XHR0aGlzLiNjdXN0b21zLmFkZCh2YWxpZGF0aW9uKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgY3VzdG9tcyA9IHRoaXMuI2N1c3RvbXM7XHJcblx0XHRjb25zdCB2YWxpZGF0aW9ucyA9IHRoaXMuI3ZhbGlkYXRpb25zO1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbGlkID0gdGhpcy4jYmFzZS52YWxpZDtcclxuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkLCBjb25kaXRpb24sIGVkaXRhYmxlIH0gPSB0aGlzLiNiYXNlO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7YmFzZS5ub2RlTmFtZX0oJHtiYXNlLm5hbWV9KSB2YWxpZGF0ZTpgLCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSwgY3VycmVudFZhbGlkIH0sIGRhdGEsIGJhc2Uubm9kZU5hbWUpO1xyXG5cdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChjb25kaXRpb24pIHtcclxuXHRcdFx0dmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcclxuXHJcblx0XHRcdGlmICghKGF3YWl0IHZhbGlkYXRlQ3VzdG9tVmFsaWRhdGlvbnMoY3VzdG9tcywgZGF0YSwgYmFzZSkpKSB2YWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgdmFsaWRhdGlvbiBvZiB2YWxpZGF0aW9ucykge1xyXG5cdFx0XHRcdGlmICh2YWxpZCAmJiBoYXNWYWx1ZSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHZhbGlkYXRpb24uY29uZGl0aW9uLCBkYXRhLCB0cnVlKTtcclxuXHRcdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gIXRlc3Q7XHJcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHZhbGlkYXRpb24uYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLnZhbGlkID0gdmFsaWQ7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHtiYXNlLm5vZGVOYW1lfSgke2Jhc2UubmFtZX0pIHZhbGlkYXRlIHJlc3VsdDpgLCB7dmFsaWR9KTtcclxuXHRcdHJldHVybiB2YWxpZDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb25IYW5kbGU7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfQUREX1JPVywgXHJcblx0RVZFTlRfTElTVF9ST1dfQUREXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1cgPSBgJHtOT0RFTkFNRV9MSVNUX0FERF9ST1d9OmluaXRpYWxpemVkYDtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQWRkUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCl7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9BRERfUk9XO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XKSlcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0xJU1RfUk9XX0FERCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoQWRkUm93KTtcclxuZXhwb3J0IGRlZmF1bHQgQWRkUm93O1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9MSVNUX0RFTEVURV9ST1csXHJcblx0RVZFTlRfTElTVF9ST1dfREVMRVRFXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5cclxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlXHQ9IHRydWU7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0xJU1RfUk9XX0RFTEVURSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoRGVsZXRlUm93KTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9MSVNUX1JPV1xyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi4vQ29udGFpbmVyXCI7XHJcbmltcG9ydCBEZWxldGVSb3cgZnJvbSBcIi4vRGVsZXRlUm93XCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIExpc3RSb3cgZXh0ZW5kcyBDb250YWluZXIge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX1JPVztcclxuXHR9XHRcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTGlzdFJvdy5OT0RFTkFNRSwgTGlzdFJvdyk7XHJcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0xJU1RfUk9XUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBMaXN0Um93cyBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9ST1dTO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKExpc3RSb3dzKTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdFJvd3M7XHJcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xyXG5pbXBvcnQgeyBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04sIE5PREVOQU1FX0ZPUk0sIEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcblxyXG4vLyBwcml2YXRlIG1lbWJlclxyXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcclxuXHJcbi8vIGxvZ2ljXHJcbmNsYXNzIEJhc2VTdWJtaXRBY3Rpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRjb25zdCBmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRfZm9ybSh0aGlzLCBmb3JtKTtcclxuXHRcdGlmIChmb3JtKSB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OKTtcclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0cmV0dXJuIF9mb3JtKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgYWNjZXB0KGRhdGEgPSB7fSkge1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG4gICAgICAgIGlmKGNvbmRpdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE92ZXJyaWRlIHRoaXMgZnVuY3Rpb24hXHJcblx0ICovXHJcblx0YXN5bmMgZXhlY3V0ZShkYXRhID0ge30pIHtcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KFNUQVRFX0ZBSUwsIFwibm90IGltcGxlbWVudGVkXCIpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYXNlU3VibWl0QWN0aW9uO1xyXG4iLCJpbXBvcnQge2RlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfU1VDQ0VTUywgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcblxuY29uc3QgTk9ERU5BTUUgPSBgJHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfS1kZWZhdWx0YDtcblxuY2xhc3MgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24gZXh0ZW5kcyBCYXNlU3VibWl0QWN0aW9uIHtcblxuICAgIHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7IHJldHVybiBOT0RFTkFNRTt9XG5cblxuXHRjb25zdHJ1Y3RvcihlbmRwb2ludCwgbWV0aG9kKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG5cdFx0dGhpcy5tZXRob2QgPSBtZXRob2Q7XG5cdH1cblxuXHRhc3luYyBleGVjdXRlKGRhdGEpIHtcdFx0XG5cdFx0bGV0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludDtcblx0XHRlbmRwb2ludCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlVGV4dChlbmRwb2ludCwgZGF0YSwgZW5kcG9pbnQpO1xuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIGxvY2F0aW9uKTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxuXHRcdFx0Y3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuXHRcdFx0bW9kZTogXCJjb3JzXCIsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuXHRcdH0pO1x0XHRcblx0XHRcdFxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KHRoaXMsIHJlc3BvbnNlLm9rID8gU1RBVEVfU1VDQ0VTUyA6IFNUQVRFX0ZBSUwsIHJlc3BvbnNlKTtcdFx0XG5cdH1cbn07XG5cbmRlZmluZShEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbik7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbjtcbiIsImV4cG9ydCBjb25zdCBTVEFURV9TVUNDRVNTID0gXCJzdWNjZXNzXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRkFJTCA9IFwiZmFpbFwiO1xuXG5jbGFzcyBTdWJtaXRBY3Rpb25SZXN1bHQge1xuXG4gICAgc3RhdGljIGdldCBTVEFURV9TVUNDRVNTKCl7cmV0dXJuIFNUQVRFX1NVQ0NFU1M7fVxuICAgIHN0YXRpYyBnZXQgU1RBVEVfRkFJTCgpe3JldHVybiBTVEFURV9GQUlMO31cblxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbiwgc3RhdGUsIG1lc3NhZ2UsIGRhdGEpe1xuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfTsgICAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRBY3Rpb25SZXN1bHQ7IiwiaW1wb3J0IHsgU1BFQ0lBTFZBUlMsIE5PREVOQU1FX0xJU1RfUk9XIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IF92YWx1ZSB9IGZyb20gXCIuLi9CYXNlRmllbGRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVEYXRhID0gYXN5bmMgKGRhdGEsIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0aWYgKG5hbWUpIHZhbHVlSGVscGVyKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2UgT2JqZWN0LmFzc2lnbihkYXRhLCB2YWx1ZSk7XHJcblx0fVxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpZWxkVmFsdWVNYXBUb09iamVjdCA9IGFzeW5jIChtYXAsIGZpZWxkT3JkZXIpID0+IHtcdFxyXG5cdC8vY29uc29sZS5sb2coXCJmaWVsZFZhbHVlTWFwVG9PYmplY3Q6IFwiLCBtYXAsIGZpZWxkT3JkZXIpO1xyXG5cdGxldCBkYXRhID0ge307XHJcblx0aWYgKGZpZWxkT3JkZXIpIHtcclxuXHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkT3JkZXIpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gbWFwLmdldChmaWVsZCk7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Zm9yIChsZXQgW3sgbmFtZSB9LCB2YWx1ZV0gb2YgbWFwKSB7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYnVpbGREYXRhQnlGaWVsZHMgPSBhc3luYyAoZmllbGRzKSA9PiB7XHJcblx0bGV0IGRhdGEgPSB7fTtcclxuXHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcclxuXHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXZhbHVhdGlvbkRhdGEgPSBhc3luYyAoYmFzZSkgPT4ge1xyXG5cdGF3YWl0IGJhc2UucmVhZHk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGRhdGFbU1BFQ0lBTFZBUlMuQ1VSUkVOVFZBTFVFXSA9IF92YWx1ZShiYXNlKTtcclxuXHJcblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcclxuXHRsZXQgdGVtcCA9IGRhdGE7XHJcblx0d2hpbGUgKHJvdykge1xyXG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCBfdmFsdWUocm93KTtcclxuXHRcdHRlbXAgPSB0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXTtcclxuXHRcdHJvdyA9IHJvdy5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xyXG5leHBvcnQgY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbiAoZGF0YSwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcmV0dXJuIGdldFZhbHVlKGRhdGEsIG5hbWVzKTtcclxuXHJcblx0Y29uc3QgZGVsID0gbm9WYWx1ZSh2YWx1ZSk7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgZGVsKSByZXR1cm4gZGF0YTtcclxuXHJcblx0cmV0dXJuIHNldFZhbHVlKGRlbCwgZGF0YSwgdmFsdWUsIG5hbWVzKTtcclxufTtcclxuXHJcbmNvbnN0IHNldFZhbHVlID0gKHJlbW92ZSwgZGF0YSwgdmFsdWUsIG5hbWVzKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgcmVtb3ZlKSByZXR1cm4gbnVsbDtcclxuXHJcblx0Y29uc3QgbmFtZSA9IG5hbWVzLnNoaWZ0KCk7XHJcblx0aWYgKG5hbWVzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRpZiAocmVtb3ZlKSBkZWxldGUgZGF0YVtuYW1lXTtcclxuXHRcdGVsc2UgZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAobm9WYWx1ZShkYXRhW25hbWVdKSkgZGF0YVtuYW1lXSA9IHt9O1xyXG5cdFx0c2V0VmFsdWUocmVtb3ZlLCBkYXRhW25hbWVdLCB2YWx1ZSwgbmFtZXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBnZXRWYWx1ZSA9IChkYXRhLCBuYW1lcykgPT4ge1xyXG5cdGlmIChub1ZhbHVlKGRhdGEpKSByZXR1cm4gbnVsbDtcclxuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHJldHVybiBkYXRhO1xyXG5cclxuXHRjb25zdCBuYW1lID0gbmFtZXMuc2hpZnQoKTtcclxuXHRyZXR1cm4gZ2V0VmFsdWUoZGF0YVtuYW1lXSwgbmFtZXMpO1xyXG59O1xyXG4iLCJpbXBvcnQge0VWRU5USEFORExFX1RJTUVPVVR9IGZyb20gXCIuLi9Db25zdGFudHNcIlxuXG5leHBvcnQgY29uc3QgdG9FdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcmd1bWVudHMpLmpvaW4oXCIgXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VFdmVudENvcHkgPSAoZXZlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXG4gICAgICAgIGN1cnJlbnRUYXJnZXQ6IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ6IGV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIG9yaWdpbmFsVGFyZ2V0IDogZXZlbnQub3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIHNyY0VsZW1lbnQ6IGV2ZW50LnNyY0VsZW1lbnQsXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvVGltZW91dEhhbmRsZSA9IChoYW5kbGUsIHByZXZlbnREZWZhdWx0LCBzdG9wUHJvcGFnYXRpb24sIHRpbWVvdXQpID0+IHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmVudCA9IHR5cGVvZiBwcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiID8gcHJldmVudERlZmF1bHQgOiAoKSA9PiBwcmV2ZW50RGVmYXVsdDtcbiAgICBjb25zdCBzdG9wID0gdHlwZW9mIHN0b3BQcm9wYWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiID8gc3RvcFByb3BhZ2F0aW9uIDogKCkgPT4gc3RvcFByb3BhZ2F0aW9uO1xuXG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICBpZihwcmV2ZW50KGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHN0b3AoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZXZlbnRDb3B5ID0gbWFrZUV2ZW50Q29weShldmVudCk7XG5cbiAgICAgICAgaWYoaWQpXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlkID0gbnVsbDtcbiAgICAgICAgICAgIGhhbmRsZShldmVudENvcHkpO1xuICAgICAgICB9LCB0aW1lb3V0IHx8IEVWRU5USEFORExFX1RJTUVPVVQpO1xuXG4gICAgfVxufTsiLCJpbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuLi9CYXNlRmllbGRcIjtcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gXCIuLi9WYWxpZGF0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCB0cmVlRmlsdGVyID0gKHsgcm9vdCwgZmlsdGVyIH0pID0+IHtcblx0bGV0IGVsZW1lbnRzID0gW107XG5cdHJvb3QuY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdGNvbnN0IHsgYWNjZXB0LCBzdG9wID0gZmFsc2UgfSA9IGZpbHRlcihlbGVtZW50KTtcblxuXHRcdGlmIChhY2NlcHQpIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cblx0XHRpZiAoIXN0b3ApIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IHRyZWVGaWx0ZXIoeyByb290OiBlbGVtZW50LCBmaWx0ZXIgfSk7XG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHJlc3VsdCk7XG5cdFx0XHRlbHNlIGlmIChyZXN1bHQpIGVsZW1lbnRzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBlbGVtZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kRmllbGRzID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRWYWxpZGF0aW9ucyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChyb290ICE9IGVsZW1lbnQpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogZmFsc2UsIHN0b3A6IHRydWUgfTtcblx0XHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFZhbGlkYXRpb24pIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pO1xufTtcbiIsImltcG9ydCB7IFxyXG5cdEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCxcclxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcclxuXHRBVFRSSUJVVEVfVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRSwgQVRUUklCVVRFX1JFQURPTkxZIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVWYWxpZFN0YXRlID0gKHRhcmdldCwgdmFsaWQpID0+IHtcclxuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XHJcblx0fSBlbHNlIGlmICh2YWxpZCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBcIlwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIFwiXCIpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcclxuXHR9XHJcblxyXG5cdHRhcmdldC50cmlnZ2VyKEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbmRpdGlvblN0YXRlID0gKHRhcmdldCwgdmFsaWQpID0+IHtcclxuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcclxuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXCJcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcIlwiKTtcclxuXHR9XHJcblxyXG5cdHRhcmdldC50cmlnZ2VyKEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVBY3RpdmVTdGF0ZSA9ICh0YXJnZXQsIGFjdGl2ZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuYWN0aXZlO1xyXG5cdGFjdGl2ZSA/IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XHJcblx0aWYgKG9sZFN0YXRlICE9IGFjdGl2ZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUmVhZG9ubHlTdGF0ZSA9ICh0YXJnZXQsIHJlYWRvbmx5LCBpbml0aWFsID0gZmFsc2UpID0+IHtcclxuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5yZWFkb25seTtcclxuXHRpZiAocmVhZG9ubHkpIFxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKTtcclxuXHRlbHNlXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xyXG5cdFxyXG5cdGlmIChvbGRTdGF0ZSAhPSByZWFkb25seSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFZGl0YWJsZVN0YXRlID0gKHRhcmdldCwgZWRpdGFibGUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmVkaXRhYmxlO1xyXG5cdGlmIChlZGl0YWJsZSkgXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfRURJVEFCTEUsIFwiXCIpO1xyXG5cdGVsc2VcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgbnVsbCk7XHJcblxyXG5cdGlmIChvbGRTdGF0ZSAhPSBlZGl0YWJsZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEKTtcclxufTsiLCJleHBvcnQgY29uc3QgdmFsaWRhdGVGaWVsZHMgPSBhc3luYyAoZGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoZmllbGQgPT4gZmllbGQudmFsaWRhdGUoZGF0YSkpKSlcclxuICAgICAgICAucmVkdWNlKCh2YWxpZCwgZmllbGRWYWxpZCkgPT4gdmFsaWQgPyBmaWVsZFZhbGlkOiBmYWxzZSwgdHJ1ZSk7XHJcbn0iLCJpbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0YUlzTm9WYWx1ZSA9ICh2YWx1ZSkgPT4geyAgICBcclxuICAgIGlmKG5vVmFsdWUodmFsdWUpIClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG4gICAgaWYodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAgdmFsdWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIFNldCAmJiAgdmFsdWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiAgdmFsdWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBpZih0eXBlID09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcclxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2JveCBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcclxuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIGlucHV0Lmxlbmd0aCA9PSAxID8gaW5wdXQuZmlyc3QoKSA6IGlucHV0O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0dGhpcy5tdWx0aXBsZSA9IGlucHV0IGluc3RhbmNlb2YgTm9kZUxpc3Q7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHJcblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XHJcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcclxuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlcyA9IFtdO1xyXG5cdFx0dmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlcztcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcclxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgXG5cdEVWRU5UX0ZJRUxEX0lOUFVUXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5cbmNvbnN0IF92YWx1ZSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwidmFsdWVcIik7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImZpbGVcIl0nO1xuXG5jb25zdCByZWFkRmlsZSA9IChmaWxlLCByZWFkRm5OYW1lKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRyZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgKCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSh7XG5cdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0dHlwZTogZmlsZS50eXBlLFxuXHRcdFx0XHRzaXplOiBmaWxlLnNpemUsXG5cdFx0XHRcdGRhdGE6IHJlYWRlci5yZXN1bHRcblx0XHRcdH0pO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRyZWFkZXJbcmVhZEZuTmFtZV0oZmlsZSk7XG5cdH0pO1xufTtcblxuLy9yZWFkQXNEYXRhVVJMXG5cbmNvbnN0IEZPUk1BVCA9IHtcblx0XCJmb3JtLWlucHV0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0ZmlsZS5mb3JtYXQgPSBcImZvcm0taW5wdXRcIjtcblx0XHRyZXR1cm4gZmlsZTtcblx0fSxcblx0XCJkYXRhLXVybC1iYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiZGF0YS11cmwtYmFzZTY0XCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0XCJiYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmRhdGEgPSByZXN1bHQuZGF0YS5zdWJzdHIocmVzdWx0LmRhdGEuaW5kZXhPZihcIixcIikgKyAxKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJiYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5jb25zdCByZWFkRmlsZXMgPSBhc3luYyAoZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpID0+IHtcblx0bGV0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBmaWxlIG9mIGZpbGVzKVxuXHRcdHJlc3VsdC5wdXNoKGF3YWl0IEZPUk1BVFtmb3JtYXRdKGZpbGUpKTtcblxuXHRpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKVxuXHRcdHJldHVybiBudWxsO1xuXG5cblx0cmV0dXJuIG11bHRpcGxlID8gcmVzdWx0IDogcmVzdWx0WzBdO1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQubXVsdGlwbGU7XG5cdFx0dGhpcy5mb3JtYXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1mb3JtYXRcIikgfHwgXCJmb3JtLWlucHV0XCI7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IGZpZWxkLmF0dHIoXCJmaWxlLW5hbWUtdGFyZ2V0XCIpO1xuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0ID8gZmllbGQuZmluZCh0aGlzLmZpbGVuYW1lVGFyZ2V0KS5maXJzdCgpIDogbnVsbDtcblx0XHRjb25zdCB7IGZvcm1hdCwgbXVsdGlwbGUgfSA9IHRoaXM7XG5cblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXMubGVuZ3RoICE9IDApXG5cdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xuXHR9O1xuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSAgPT09IFwib2JqZWN0XCI7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gX3ZhbHVlKHRoaXMpO1xuXHRcdGlmICh2YWx1ZSAhPSBjdXJyZW50VmFsdWUpIHtcblx0XHRcdF92YWx1ZSh0aGlzLCB2YWx1ZSlcblx0XHRcdGlmKCF2YWx1ZSlcdFx0XHRcblx0XHRcdFx0dGhpcy5pbnB1dC52YWx1ZSA9IG51bGw7XG5cblx0XHRcdGNvbnN0IGZpbGVuYW1lID0gdGhpcy5maWxlbmFtZVRhcmdldDtcblx0XHRcdGlmIChmaWxlbmFtZSkge1xuXHRcdFx0XHRmaWxlbmFtZS5lbXB0eSgpO1xuXHRcdFx0XHRpZih2YWx1ZSl7XG5cdFx0XHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdGZvciAobGV0IGZpbGUgb2YgdmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke2ZpbGUubmFtZX08L3NwYW4+YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGZpbGVuYW1lLmFwcGVuZChgPHNwYW4+JHt2YWx1ZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiBfdmFsdWUodGhpcyk7XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcclxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcclxuXHJcbmNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcclxuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIGlucHV0O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcclxuXHRcdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XHJcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcclxuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIHZhbHVlLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfRklFTERfSU5QVVQsXHJcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcdFx0XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly9maWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLmlucHV0Lm11bHRpcGxlID8gdGhpcy5pbnB1dC52YWwoKSA6IHRoaXMuaW5wdXQudmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiBpdGVtICYmIGl0ZW0udHJpbSgpLmxlbmd0aCA+IDApO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxyXG5cdFx0XHR9XHRcdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSAgdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXHJcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBjdXJyZW50VmFsdWUpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTlBVVCwgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dDpub3QoW3R5cGU9XCJmaWxlXCJdLFt0eXBlPVwicmFkaW9cIl0sW3R5cGU9XCJjaGVja2JveFwiXSxbdHlwZT1cImJ1dHRvblwiXSxbdHlwZT1cInN1Ym1pdFwiXSxbdHlwZT1cInJlc2V0XCJdKSxpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEnO1xyXG5cclxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcclxuXHJcbmNvbnN0IHRleHQgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKGlucHV0LnZhbHVlID0gdmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuY29uc3QgbnVtYmVyID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlQXNOdW1iZXI7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZUFzTnVtYmVyID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcblxyXG5jb25zdCBkYXRldGltZSA9IChpbnB1dCkgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZUFzRGF0ZSA9IHZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcblxyXG5jb25zdCBUSU1FRk9STUFUID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJkZWZhdWx0XCIsICB7XHJcbiAgaG91cjogXCJudW1lcmljXCIsXHJcbiAgbWludXRlOiBcIm51bWVyaWNcIlxyXG59KTtcclxuXHJcblxyXG5jb25zdCB0aW1lID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGU7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlID8gbmV3IERhdGUoYDE5NzAtMDEtMDFUJHtpbnB1dC52YWx1ZX1gKSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZSA9IFRJTUVGT1JNQVQuZm9ybWF0KHZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59O1xyXG5jb25zdCBUWVBFUyA9IHsgdGV4dCwgbnVtYmVyLCBkYXRldGltZSwgIFwiZGF0ZXRpbWUtbG9jYWxlXCI6IGRhdGV0aW1lLCBkYXRlLCB0aW1lLCByYW5nZTogbnVtYmVyIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcclxuXHRcdGNvbnN0IHR5cGUgPSAoZmllbGQuYXR0cihcImlucHV0LXR5cGVcIikgfHwgaW5wdXQuYXR0cihcInR5cGVcIikgfHwgREVGQVVMVFRZUEUpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0dGhpcy50eXBlID0gKFRZUEVTW3R5cGVdIHx8IFRZUEVTW0RFRkFVTFRUWVBFXSkoaW5wdXQpO1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VULFxyXG5cdFx0XHQpLFxyXG5cdFx0KTtcclxuXHJcblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB0cnVlO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnR5cGUuYWNjZXB0KHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnR5cGUubm9ybWFsaXplKHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gdGhpcy50eXBlLmdldFZhbHVlKCk7XHJcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKSB0aGlzLnR5cGUuc2V0VmFsdWUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWxpZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IEZpZWxkIGZyb20gXCIuLi9GaWVsZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XHJcblx0XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCl7IHJldHVybiBudWxsO31cclxuXHRcclxuXHQjZGVmYXVsdFZhbHVlO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0dGhpcy5maWVsZCA9IGZpZWxkO1xyXG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkgeyB9XHJcblxyXG5cdHNldCByZWFkb25seShkaXNhYmxlZCkgeyB9XHJcblxyXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUoKSB7XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWxpZCgpe1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBUZXh0IGZyb20gXCIuL1RleHRcIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9DaGVja2JveFwiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL1JhZGlvXCI7XG5pbXBvcnQgRmlsZSBmcm9tIFwiLi9GaWxlXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL1NlbGVjdFwiO1xuXG5leHBvcnQgY29uc3Qgd3JhcHBlcnMgPSBbVGV4dCwgQ2hlY2tib3gsIFJhZGlvLCBGaWxlLCBTZWxlY3RdO1xuXG5leHBvcnQgY29uc3QgZmluZFdyYXBwZXIgPSAoZmllbGQpID0+IHtcblx0Zm9yIChsZXQgd3JhcHBlciBvZiB3cmFwcGVycykge1xuXHRcdGNvbnN0IGlucHV0ID0gd3JhcHBlci5maW5kSW5wdXQoZmllbGQpO1xuXHRcdGlmIChpbnB1dCkgcmV0dXJuIG5ldyB3cmFwcGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCBmcm9tIFwiLi9zcmMvc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcblxuZXhwb3J0IHtGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXIsIEJhc2VTdWJtaXRBY3Rpb24sIFN1Ym1pdEFjdGlvblJlc3VsdH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9