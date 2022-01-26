/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* reexport safe */ _src_Form__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Page": () => (/* reexport safe */ _src_Page__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "BaseField": () => (/* reexport safe */ _src_BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Field": () => (/* reexport safe */ _src_Field__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "List": () => (/* reexport safe */ _src_List__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Container": () => (/* reexport safe */ _src_Container__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "BaseSubmitAction": () => (/* reexport safe */ _src_submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_6__["default"]),
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











/***/ }),

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
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./index.js");



_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.form = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.form || {
	VERSION : "1.2.20",
	Form: _index__WEBPACK_IMPORTED_MODULE_1__.Form,
	Page: _index__WEBPACK_IMPORTED_MODULE_1__.Page,
	BaseField: _index__WEBPACK_IMPORTED_MODULE_1__.BaseField,
	Field: _index__WEBPACK_IMPORTED_MODULE_1__.Field,
	Container: _index__WEBPACK_IMPORTED_MODULE_1__.Container,
	List: _index__WEBPACK_IMPORTED_MODULE_1__.List,
	BaseSubmitAction: _index__WEBPACK_IMPORTED_MODULE_1__.BaseSubmitAction, 
	SubmitActionResult: _index__WEBPACK_IMPORTED_MODULE_1__.SubmitActionResult
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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anMtaHRtbC1mb3JtLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL3V0aWxzL0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQmFzZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2VGaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9GaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Zvcm0uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvTGlzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9QYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9TdGVwLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvVmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL0JhY2tCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9OZXh0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VibWl0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VtbWFyeUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9BZGRSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L0RlbGV0ZVJvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9Sb3dzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvc3VibWl0QWN0aW9ucy9EZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvU3VibWl0QWN0aW9uUmVzdWx0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvRGF0YUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RlZmluZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1JhZGlvLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2Jyb3dzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCBmcm9tIFwiLi9zcmMvc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcblxuZXhwb3J0IHtGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXIsIEJhc2VTdWJtaXRBY3Rpb24sIFN1Ym1pdEFjdGlvblJlc3VsdH07IiwiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcclxuXHRpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsO1xyXG5cdGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB3aW5kb3c7XHRcclxuXHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0cmV0dXJuIHt9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR0xPQkFMOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uIChhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYoIXRhcmdldClcclxuXHRcdHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciA9ICh2YXJuYW1lKSA9PiB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGYsIHZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMilcclxuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lKTtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IsIHByaXZhdGVTdG9yZX07IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9zcmMvQ29udGV4dFwiO1xuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIENvbnRleHQgfTtcbiIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0bGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHR0cnl7XHJcblx0XHRyZXN1bHQgPSBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZihtYXRjaFtNQVRDSF9FU0NBUEVEXSlcclxuXHRcdHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dOyBcclxuXHRcdFxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn1cclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XFxcIlwiLCBhRXhwcmVzc2lvbiwgXCJcXFwiOlwiLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEXHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdHRlbXAgPSB0ZW1wLnNwbGl0KG1hdGNoWzBdKS5qb2luKCk7IC8vIHJlbW92ZSBjdXJyZW50IG1hdGNoIGZvciBuZXh0IGxvb3BcclxuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQobWF0Y2hbMF0pLmpvaW4odHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAocmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCkpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHtjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb249e2RlZXA6dHJ1ZX0sIG5hbWUsIHBhcmVudH0pe1xyXG5cdFx0Y29udGV4dCA9IE9iamVjdFV0aWxzLmZpbHRlcih7ZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9ufSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7Y29udGV4dCwgbmFtZSwgcGFyZW50fSk7XHJcblx0fVxyXG59OyIsImltcG9ydCBDb21wb25lbnQgLCB7Y29tcG9uZW50QmFzZU9mfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuXG5leHBvcnQge0NvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBkZWZpbmV9O1xuIiwiaW1wb3J0IHtwcml2YXRlUHJvcGVydHksIHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSURcIjtcbmltcG9ydCB7IGluaXRUaW1lb3V0LCB0cmlnZ2VyVGltZW91dCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuXG5jb25zdCBfcmVhZHkgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInJlYWR5XCIpO1xuXG5jb25zdCBUSU1FT1VUUyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBpbml0ID0gKGNvbXBvbmVudCkgPT4ge1xuXHRsZXQgdGltZW91dCA9IFRJTUVPVVRTLmdldChjb21wb25lbnQpO1xuXHRpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFRJTUVPVVRTLmdldChjb21wb25lbnQsIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFRJTUVPVVRTLmRlbGV0ZShjb21wb25lbnQpO1xuXHRcdHRyeXtcblx0XHRcdGF3YWl0IGNvbXBvbmVudC5pbml0KCk7XG5cdFx0XHRjb21wb25lbnQucmVhZHkucmVzb2x2ZSgpO1xuXHRcdH1jYXRjaChlKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW4ndCBpbml0aWFsaXplIGNvbXBvbmVudCFcIiwgY29tcG9uZW50LCBlKTtcblx0XHRcdGNvbXBvbmVudC5yZWFkeShyZXNvbHZlKGUpKTtcblx0XHR9XG5cdFx0Y29tcG9uZW50LnRyaWdnZXIoY29tcG9uZW50RXZlbnRuYW1lKFwiaW5pdGlhbHplZFwiLCBjb21wb25lbnQpKTtcblx0fSwgaW5pdFRpbWVvdXQpKTtcdFxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuICAgIHdoaWxlKGNvdW50IDwgMTAwKXtcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XG5cdFx0aWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSlcblx0XHRcdHJldHVybiBpZDtcblxuXHRcdGNvdW50Kys7XG5cdH1cblx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJUbyBtYW55IHJldHJpZXMgdG8gY3JlYXRlIGFuIHVuaXF1ZSBpZCAtIGNyZWF0ZWQgaWQgaXMgbm90IHVuaXF1ZSFcIikpO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG5cblxuY29uc3QgYnVpbGRDbGFzcyA9IChodG1sQmFzZVR5cGUpID0+e1xuXHRyZXR1cm4gY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgaHRtbEJhc2VUeXBlIHtcblx0XHRjb25zdHJ1Y3Rvcih7c2hhZG93Um9vdCA9IGZhbHNlLCBjb250ZW50ID0gbnVsbCwgY3JlYXRlVUlEID0gZmFsc2UsIHVpZFByZWZpeCA9IFwiaWQtXCIsIHVpZFN1ZmZpeCA9IFwiXCJ9ID0ge30pIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHRfcmVhZHkodGhpcywgbGF6eVByb21pc2UoKSk7XG5cdFxuXHRcdFx0aWYoY3JlYXRlVUlEKVxuXHRcdFx0XHR0aGlzLmF0dHIoXCJpZFwiLCBjcmVhdGVVSUQodWlkUHJlZml4LCB1aWRTdWZmaXgpKTtcblx0XG5cdFx0XHRpZihzaGFkb3dSb290KVxuXHRcdFx0XHR0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTpvcGVufSk7XG5cdFx0XHRcblx0XHRcdGlmKGNvbnRlbnQpXG5cdFx0XHRcdHRoaXMucm9vdC5hcHBlbmQodHlwZW9mIGNvbnRlbnQgPT09IFwiZnVuY3Rpb25cIiA/IGNvbnRlbnQodGhpcykgOiBjb250ZW50KTtcblx0XHR9XG5cdFxuXHRcdGdldCByb290KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5zaGFkb3dSb290IHx8IHRoaXM7XG5cdFx0fVxuXHRcblx0XHRnZXQgcmVhZHkoKXtcblx0XHRcdHJldHVybiBfcmVhZHkodGhpcyk7XG5cdFx0fVxuXHRcblx0XHRhc3luYyBpbml0KCkge31cblx0XG5cdFx0YXN5bmMgZGVzdHJveSgpIHtcblx0XHRcdGlmKHRoaXMucmVhZHkucmVzb2x2ZWQpXG5cdFx0XHRfcmVhZHkodGhpcywgbGF6eVByb21pc2UoKSk7XG5cdFx0fVxuXHRcblx0XHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdGlmICh0aGlzLm93bmVyRG9jdW1lbnQgPT0gZG9jdW1lbnQpIGluaXQodGhpcyk7XG5cdFx0fVxuXHRcblx0XHRhZG9wdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cdFx0fVxuXHRcblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZShuYW1lLCB0aGlzKSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgY29tcG9uZW50RXZlbnRuYW1lKFwiY2hhbmdlXCIsIHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdFxuXHRcdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7XG5cdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHR9XG5cdH07XG59IFxuXG5jb25zdCBDTEFaWk1BUCA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEJhc2VPZiA9IChodG1sQmFzZVR5cGUpID0+IHtcblx0bGV0IGNsYXp6ID0gQ0xBWlpNQVAuZ2V0KGh0bWxCYXNlVHlwZSk7XG5cdGlmKGNsYXp6ID09IG51bGwpe1xuXHRcdGNsYXp6ID0gYnVpbGRDbGFzcyhodG1sQmFzZVR5cGUpO1xuXHRcdENMQVpaTUFQLnNldChodG1sQmFzZVR5cGUsIGNsYXp6KTtcblx0fVxuXG5cdHJldHVybiBjbGF6ejtcbn1cblxuY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50QmFzZU9mKEhUTUxFbGVtZW50KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcbiIsImV4cG9ydCBjb25zdCBjb21wb25lbnRQcmVmaXggPSBcImQtXCI7XHJcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeCA9IFwiYXR0cmlidXRlLVwiO1xyXG5leHBvcnQgY29uc3QgaW5pdFRpbWVvdXQgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwMDtcclxuIiwiaW1wb3J0IHsgY29tcG9uZW50UHJlZml4IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdG9Ob2RlTmFtZSA9IChuYW1lLCBwcmVmaXgpID0+IHtcblx0aWYodHlwZW9mIHByZWZpeCA9PT0gXCJzdHJpbmdcIilcblx0XHRyZXR1cm4gcHJlZml4ICsgbmFtZTtcblx0XHRcblx0cmV0dXJuIGNvbXBvbmVudFByZWZpeCArIG5hbWU7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmaW5lID0gZnVuY3Rpb24oY2xhenosIG9wdGlvbnMpIHtcblx0Y29uc3Qgbm9kZW5hbWUgPSBjbGF6ei5OT0RFTkFNRTtcblx0aWYgKCFjdXN0b21FbGVtZW50cy5nZXQobm9kZW5hbWUpKSB7XG5cdFx0Y3VzdG9tRWxlbWVudHMuZGVmaW5lKG5vZGVuYW1lLCBjbGF6eiwgb3B0aW9ucyk7XG5cdH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lOyBcbiIsImltcG9ydCB7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEV2ZW50bmFtZSA9IChldmVudFR5cGUsIG5vZGUgKSA9PiB7XHRcblx0bGV0IG5vZGVuYW1lID0gXCJ1bnN1cHBvcnRlZFwiO1xuXHRpZih0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGU7XG5cdGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuXHRcdG5vZGVuYW1lID0gbm9kZS5ub2RlTmFtZTtcblx0ZWxzZSBpZih0eXBlb2Ygbm9kZS5OT0RFTkFNRSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGUuTk9ERU5BTUU7XG5cdGVsc2UgdGhyb3cgbmV3IEVycm9yKGAke3R5cGVvZiBub2RlfSBpcyBub3Qgc3VwcG9ydGVkIGFzIHBhcmFtZXRlciBcIm5vZGVcIiFgKTtcblx0XG4gICByZXR1cm4gYCR7bm9kZW5hbWUudG9Mb3dlckNhc2UoKX06JHtldmVudFR5cGV9YDsvL3VzZSBAIGFzIHNlcGFydG9yIGFuZCBub3QgOlxufTtcblxuXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lID0gKGF0dHJpYnV0ZSwgbm9kZSApID0+IHtcbiAgICByZXR1cm4gY29tcG9uZW50RXZlbnRuYW1lKGAke2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fS0ke2F0dHJpYnV0ZX1gLCBub2RlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtjb21wb25lbnRFdmVudG5hbWUsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZX0iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCBcblx0QVRUUklCVVRFX0FDVElWRSwgXG5cdEFUVFJJQlVURV9SRUFET05MWSwgXG5cdEFUVFJJQlVURV9DT05ESVRJT04sIFxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcblx0QVRUUklCVVRFX1ZBTElELCBcblx0QVRUUklCVVRFX0lOVkFMSUQsIFxuXHRBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OLCBcblx0QVRUUklCVVRFX0VESVRBQkxFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUsIHVwZGF0ZUVkaXRhYmxlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTl07XG5cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XHRcdFxuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdH1cblxuXHRnZXQgZm9ybSgpIHtcblx0XHRsZXQgZm9ybSA9IF9mb3JtKHRoaXMpO1xuXHRcdGlmICghZm9ybSkge1xuXHRcdFx0Zm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0XHRcdF9mb3JtKHRoaXMsIGZvcm0pO1xuXHRcdH1cblx0XHRyZXR1cm4gZm9ybTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmU7XG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xuXHRcdFx0dGhpcy5hY3RpdmVVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0YWN0aXZlVXBkYXRlZCgpIHt9XG5cblx0Z2V0IHJlYWRvbmx5KCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCAhcmVhZG9ubHksICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge31cblxuXHRnZXQgZWRpdGFibGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9FRElUQUJMRSk7XG5cdH1cblxuXHRzZXQgZWRpdGFibGUoZWRpdGFibGUpIHtcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsIGVkaXRhYmxlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XG5cdFx0dGhpcy5lZGl0YWJsZVVwZGF0ZWQoKTtcblx0fVxuXG5cdGVkaXRhYmxlVXBkYXRlZCgpIHtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge31cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCxcblx0RVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX0VYRUNVVEVfVkFMSURBVEUsXG5cdEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFLFxuXHRFVkVOVF9WQUxVRV9DSEFOR0VELFxuXHRBVFRSSUJVVEVfTkFNRSwgXG5cdEFUVFJJQlVURV9SRVFVSVJFRCwgXG5cdEFUVFJJQlVURV9OT1ZBTFVFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gXCIuL1ZhbGlkYXRvclwiO1xuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5cblxuY29uc3QgX3BhcmVudCA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicGFyZW50XCIpO1xuZXhwb3J0IGNvbnN0IF92YWx1ZSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwidmFsdWVcIik7XG5jb25zdCBfdmFsaWRhdG9yID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJ2YWxpZGF0b3JcIik7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEZpZWxkID0gKGZpZWxkKSA9PiB7XG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHBhcmVudDtcblxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XG5cdGZpZWxkLmF0dHIoQVRUUklCVVRFX05PVkFMVUUsICFoYXNWYWx1ZSA/IFwiXCIgOiBudWxsKTtcbn07XG5cbmNsYXNzIEJhc2VGaWVsZCBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZS5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRfdmFsdWUodGhpcywgdmFsdWUpO1xuXG5cdFx0dGhpcy5vbihFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMpIHtcblx0XHRcdFx0dGhpcy5jb25kaXRpb25VcGRhdGVkKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1x0XHRcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1x0XHRcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHRfcGFyZW50KHRoaXMsIGZpbmRQYXJlbnRGaWVsZCh0aGlzKSk7XG5cdFx0XHRfdmFsaWRhdG9yKHRoaXMsIG5ldyBWYWxpZGF0b3IodGhpcykpO1x0XHRcdFxuXHRcdFx0XG5cdFx0XHR0aGlzLmZvcm0ub24oRVZFTlRfRVhFQ1VURV9WQUxJREFURSwgYXN5bmMgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNoYWluID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHRpZiAoY2hhaW4uaW5kZXhPZih0aGlzKSA8IDApIHtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy52YWxpZDtcblx0XHRcdFx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcblx0XHRcdFx0XHRpZiAoY3VycmVudCAhPSB2YWxpZCAmJiBjb25kaXRpb24pIHtcblx0XHRcdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5mb3JtLm9uKEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVhZHkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZWFkeS50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcdFx0XHRcblx0XHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQgdmFsaWRhdG9yKCkge1xuXHRcdHJldHVybiBfdmFsaWRhdG9yKHRoaXMpO1xuXHR9XG5cblx0Z2V0IHBhcmVudEZpZWxkKCkge1xuXHRcdHJldHVybiBfcGFyZW50KHRoaXMpO1xuXHR9XG5cblx0Y29uZGl0aW9uVXBkYXRlZCgpIHtcblx0XHR0aGlzLmFjdGl2ZSA9IHRoaXMuY29uZGl0aW9uO1xuXHRcdChhc3luYyAoKSA9PiB7XG5cdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdH0pKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX05BTUUpO1xuXHR9XG5cblx0Z2V0IHJlcXVpcmVkKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVRVUlSRUQpO1xuXHR9XG5cblx0Z2V0IGhhc1ZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gX3ZhbHVlKHRoaXMpO1xuXHRcdHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcblx0fVxuXG5cdGFzeW5jIHZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIF92YWx1ZSh0aGlzKTtcblxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gX3ZhbHVlKHRoaXMpO1xuXG5cdFx0aWYgKGF3YWl0IHRoaXMuYWNjZXB0VmFsdWUodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IGF3YWl0IHRoaXMubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSAhPSB2YWx1ZSkge1xuXHRcdFx0XHRfdmFsdWUodGhpcywgdmFsdWUpO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XHRcdFx0XHRcblx0XHRcdFx0YXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xuXHRcdHVwZGF0ZUhhc1ZhbHVlKHRoaXMuaGFzVmFsdWUsIHRoaXMpO1xuXHRcdGlmICghdGhpcy52YWxpZGF0b3IpIHJldHVybiBmYWxzZTtcblxuXHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoKTtcdFx0XG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9XG5cblx0YXN5bmMgcHVibGlzaFZhbHVlKGNoYWluID0gW10pIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNoYWluLnB1c2godGhpcyk7XG5cdFx0aWYgKHRoaXMucGFyZW50RmllbGQpIGF3YWl0IHRoaXMucGFyZW50RmllbGQuY2hpbGRWYWx1ZUNoYW5nZWQodGhpcywgY2hhaW4pO1xuXHRcdGVsc2UgdGhpcy50cmlnZ2VyKEVWRU5UX1ZBTFVFX0NIQU5HRUQsIGNoYWluKTtcblx0fVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHt9XG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGNoaWxkLCBjaGFpbikge31cbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcbiIsImV4cG9ydCBjb25zdCBIVE1MX1RBR19QUkVGSVggPSBcImQtXCI7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgPSA1MCAqIEVWRU5USEFORExFX1RJTUVPVVQ7XG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GT1JNID0gYCR7SFRNTF9UQUdfUFJFRklYfWZvcm1gO1xuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1NVQk1JVF9BQ1RJT04gPSBgJHtIVE1MX1RBR19QUkVGSVh9c3VibWl0LWFjdGlvbmA7XG5cblxuZXhwb3J0IGNvbnN0IE5PREVOQU1FUyA9IHtcblx0Rm9ybTogTk9ERU5BTUVfRk9STSxcblx0Q29udHJvbDogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sXCIsXG5cdEJhY2tCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1iYWNrXCIsXG5cdE5leHRCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1uZXh0XCIsXG5cdFN1bW1hcnlCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1zdW1tYXJ5XCIsXG5cdFN1Ym1pdEJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLXN1Ym1pdFwiLFxuXHRDYW5jZWxCdXR0b246IEhUTUxfVEFHX1BSRUZJWCArIFwiY29udHJvbC1jYW5jZWxcIixcblx0UGFnZTogSFRNTF9UQUdfUFJFRklYICsgXCJwYWdlXCIsXG5cdEZpZWxkOiBIVE1MX1RBR19QUkVGSVggKyBcImZpZWxkXCIsXG5cdFdyYXBwZXJGaWVsZDogSFRNTF9UQUdfUFJFRklYICsgXCJ3cmFwcGVyLWZpZWxkXCIsXG5cdExpc3Q6IEhUTUxfVEFHX1BSRUZJWCArIFwibGlzdFwiLFxuXHRMaXN0Um93czogSFRNTF9UQUdfUFJFRklYICsgXCJyb3dzXCIsXG5cdExpc3RSb3c6IEhUTUxfVEFHX1BSRUZJWCArIFwicm93XCIsXG5cdEJ1dHRvbkFkZFJvdzogSFRNTF9UQUdfUFJFRklYICsgXCJhZGQtcm93XCIsXG5cdEJ1dHRvbkRlbGV0ZVJvdzogSFRNTF9UQUdfUFJFRklYICsgXCJkZWxldGUtcm93XCIsXG5cdENvbnRhaW5lcjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250YWluZXJcIixcblx0VmFsaWRhdGlvbjogSFRNTF9UQUdfUFJFRklYICsgXCJ2YWxpZGF0aW9uXCIsXG5cdE1lc3NhZ2U6IEhUTUxfVEFHX1BSRUZJWCArIFwibWVzc2FnZVwiLFxuXHRQcm9ncmVzc0JhcjogSFRNTF9UQUdfUFJFRklYICsgXCJwcm9ncmVzcy1iYXJcIixcblx0U3RlcDogSFRNTF9UQUdfUFJFRklYICsgXCJzdGVwXCIsXG5cdFN1Ym1pdEFjdGlvbjogTk9ERU5BTUVfU1VCTUlUX0FDVElPTixcbn07XG5cbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5JVCA9IFwiaW5pdFwiO1xuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9JTlBVVCA9IFwiaW5wdXRcIjtcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfU1VNTUFSWSA9IFwic3VtbWFyeVwiO1xuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9GSU5JU0hFRCA9IFwiZmluaXNoZWRcIjtcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVTID0ge1xuXHRpbml0OiBGT1JNU1RBVEVfSU5JVCxcblx0aW5wdXQ6IEZPUk1TVEFURV9JTlBVVCxcblx0c3VtbWFyeTogRk9STVNUQVRFX1NVTU1BUlksXG5cdGZpbmlzaGVkOiBGT1JNU1RBVEVfRklOSVNIRUQsXG59O1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURTVEFURVMgPSB7XG5cdGFsd2F5czogXCJhbHdheXNcIixcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtLVwiO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRSA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5pdGlhbGl6ZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTiA9IGAke0VWRU5UX0lOSVRJQUxJWkV9c3VibWl0LWFjdGlvbmA7XG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdGA7XG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUX1JFU1VMVFMgPSBgJHtFVkVOVF9QUkVGSVh9c3VibWl0LXJlc3VsdHNgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0VYRUNVVEVfVkFMSURBVEUgPSBgJHtFVkVOVF9QUkVGSVh9ZXhlY3V0ZS12YWxpZGF0ZWA7XG5leHBvcnQgY29uc3QgRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9Y29uZGl0aW9uLXN0YXRlLWNoYW5nZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFID0gYCR7RVZFTlRfUFJFRklYfWFsbC1wdWJsaXNoLXZhbHVlYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxVRV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXZhbHVlLWNoYW5nZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1NJVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1zaXRlLWNoYW5nZWRgO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1zdGF0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTlBVVCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbnB1dGA7XG5leHBvcnQgY29uc3QgRVZFTlRfTElTVF9ST1dfQUREID0gYCR7RVZFTlRfUFJFRklYfWxpc3Qtcm93LWFkZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfTElTVF9ST1dfREVMRVRFID0gYCR7RVZFTlRfUFJFRklYfWxpc3Qtcm93LWRlbGV0ZWA7XG5leHBvcnQgY29uc3QgRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1wcm9ncmVzcy1iYXItY2hhbmdlZGA7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1hY3RpdmUtc3RhdGUtY2hhbmdlZGA7XG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZC1zdGF0ZS1jaGFuZ2VkYDtcbmV4cG9ydCBjb25zdCBFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWVkaXRhYmxlLXN0YXRlLWNoYW5nZWRgO1xuXG5leHBvcnQgY29uc3QgRVZFTlRTID0ge1xuXHRpbml0aWFsaXplOiBFVkVOVF9JTklUSUFMSVpFLFxuXHRpbml0aWFsaXplZDogRVZFTlRfSU5JVElBTElaRUQsXG5cdGZpZWxkSW5pdGlhbGl6ZWQgOiBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCxcblx0LyogZmlyZWQgYnkgY2hhbmdlIHZhbHVlIGZyb20gYW4gZmllbGQgaW1wbGVtZW50YXRpb25cblx0ICogYW5kIGNvbnN1bWVkIGJ5IHRoZSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24gb2Zcblx0ICogQmFzZUZpZWxkIHRvIG1ha2UgdmFsaWRhdGlvbiBhbmQgZmlyZSB2YWx1ZUNoYW5nZWRcblx0ICogZXZlbnRcblx0ICovXG5cdGlucHV0OiBFVkVOVF9GSUVMRF9JTlBVVCwvL2RlcHJlY2F0ZWRcblx0ZmllbGRJbnB1dCA6IEVWRU5UX0ZJRUxEX0lOUFVULFxuXHQvKiBpbnRlcm5hbCBldmVudCBmb3IgcHVibGlzaCB0aGF0IGEgdmFsdWUgb2YgZmllbGQgaGFzIGNoYW5nZWQgKGV2ZW50IGFmdGVyIHZhbGlkYXRpb24pICovXG5cdHZhbHVlQ2hhbmdlZDogRVZFTlRfVkFMVUVfQ0hBTkdFRCxcblx0LyogaW50ZXJuYWwgZXZlbnQgdG8gc3RhcnQgdmFsaWRhdGlvbiBhdCBlbGVtZW50cyAtPiBvbmx5IGZpcmVkIGF0IGZvcm0qL1xuXHRleGVjdXRlVmFsaWRhdGU6IEVWRU5UX0VYRUNVVEVfVkFMSURBVEUsXG5cdC8qICovXG5cdGFjdGl2ZVN0YXRlQ2hhbmdlZDogRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQsXG5cdC8qICovXG5cdGNvbmRpdGlvblN0YXRlQ2hhbmdlZDogRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsXG5cdC8qICovXG5cdHZhbGlkU3RhdGVDaGFuZ2VkOiBFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VELFxuXHQvKiAqL1xuXHRzaXRlQ2hhbmdlZDogRVZFTlRfU0lURV9DSEFOR0VELFxuXHQvKiAqL1xuXHRmb3JtU3RhdGVDaGFuZ2VkOiBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXG5cdC8qICovXG5cdGFsbFB1Ymxpc2hWYWx1ZTogRVZFTlRfQUxMX1BVQkxJU0hfVkFMVUUsXG5cdC8qICovXG5cdHN1Ym1pdDogRVZFTlRfU1VCTUlULFxuXHQvKiAqL1xuXHRzdWJtaXRSZXN1bHRzOiBFVkVOVF9TVUJNSVRfUkVTVUxUUyxcblx0LyogKi9cblx0cHJvZ3Jlc3NiYXJDaGFuZ2VkIDogRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCxcblxuXHQvL29sZCBuZWVkIHRvIGJlIHJlZmFjdG9yZWRcblxuXHRhZGRlZDogRVZFTlRfUFJFRklYICsgXCJhZGRlZFwiLFxuXHRjaGFuZ2U6IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlXCIsXG5cdGNoYW5nZUF0dHJpYnV0ZUV2ZW50QnVpbGRlcjogKG5hbWUpID0+IHtcblx0XHRyZXR1cm4gRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtYXR0cmlidXRlLVwiICsgbmFtZTtcblx0fSxcblx0Y2hhbmdlQWN0aXZlOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS1hY3RpdmVcIixcblx0Y2hhbmdlVmFsdWU6IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLXZhbHVlXCIsXG5cdGNoYW5nZUNvbmRpdGlvbjogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtY29uZGl0aW9uXCIsXG5cdGNoYW5nZVZhbGlkYXRpb246IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLXZhbGlkYXRpb25cIixcblxuXHQvL0xJU1QgRVZFTlRTXG5cdGxpc3RSb3dBZGQ6IEVWRU5UX0xJU1RfUk9XX0FERCxcblx0bGlzdFJvd0RlbGV0ZTogRVZFTlRfTElTVF9ST1dfREVMRVRFLFxuXHRcblx0ZWRpdGFibGVTdGF0ZUNoYW5nZWQ6IEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQsXG5cblx0Ly8gT3RoZXIgRXZlbnRzXG5cdGluaXRpYWxpemVTdWJtaXRBY3Rpb246IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTlxufTtcblxuXG5cbmV4cG9ydCBjb25zdCBTUEVDSUFMVkFSUyA9IHtcblx0Q1VSUkVOVFZBTFVFOiBcIiR2YWx1ZVwiLFxuXHRDVVJSRU5UTElTVFJPVzogXCIkaXRlbVwiLFxufTtcblxuLy9BVFRSSUJVVEVTXG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTkFNRSA9IFwibmFtZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FTkRQT0lOVCA9IFwiZW5kcG9pbnRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUVUSE9EID0gXCJtZXRob2RcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RBVEUgPSBcInN0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RFUCA9IFwic3RlcFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFID0gXCJ1c2Utc3VtbWFyeS1wYWdlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUID0gXCJpbnB1dC1tb2RlLWFmdGVyLXN1Ym1pdFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRCA9IFwicmVxdWlyZWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRURfT05fQUNUSVZFX09OTFkgPSBcInJlcXVpcmVkLW9uLWFjdGl2ZS1vbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0RJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRSA9IFwiZWRpdGFibGVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OID0gXCJlZGl0YWJsZS1jb25kaXRpb25cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVBRE9OTFkgPSBcInJlYWRvbmx5XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlZBTElEID0gXCJpbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCA9IFwiY29uZGl0aW9uLXZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEID0gXCJjb25kaXRpb24taW52YWxpZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NSU4gPSBcIm1pblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NQVggPSBcIm1heFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIjtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVMsXG5cdEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELFxuXHRFVkVOVF9WQUxVRV9DSEFOR0VELFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgQmFzZUZpZWxkLCB7IF92YWx1ZSB9IGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IHsgdmFsdWVIZWxwZXIgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuXG5cblxuY29uc3QgcmVmcmVzaFZhbHVlID0gYXN5bmMgKHNlbGYpID0+IHtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRjb25zdCBmaWVsZHMgPSBzZWxmLmZpZWxkcztcblxuXHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcblx0XHRpZiAoZmllbGQuY29uZGl0aW9uICYmIGZpZWxkLmhhc1ZhbHVlKSB7XG5cdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcblx0XHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcblx0XHRcdGlmIChuYW1lKSB2YWx1ZUhlbHBlcihkYXRhLCBuYW1lLCB2YWx1ZSk7XG5cdFx0XHRlbHNlIE9iamVjdC5hc3NpZ24oZGF0YSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5sZW5ndGggPiAwKSBfdmFsdWUoc2VsZiwgZGF0YSk7XG5cdGVsc2UgX3ZhbHVlKHNlbGYsIG51bGwpO1xufTtcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkNvbnRhaW5lcjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlID0gbnVsbCkge1xuXHRcdHN1cGVyKHZhbHVlKTtcblx0XHR0aGlzLmZpZWxkcyA9IFtdO1xuXHRcdHRoaXMub24oRVZFTlRfVkFMVUVfQ0hBTkdFRCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGNvbnN0IGNoYWluID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCBjaGFpbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5maWVsZHMgPSBmaW5kRmllbGRzKHRoaXMpO1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMub24oRVZFTlRfRklFTERfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0aWYgKGZpZWxkICE9IHRoaXMpIHtcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZmllbGRzLmluZGV4T2YoZmllbGQpIDwgMCl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZmllbGRzLnB1c2goZmllbGQpO1xuXHRcdFx0XHRcdFx0XHRyZWZyZXNoVmFsdWUodGhpcylcblx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMudmFsaWRhdG9yLmFkZEN1c3RvbUNoZWNrKGFzeW5jICh7IGRhdGEsIGJhc2UgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IGZpZWxkcyB9ID0gYmFzZTtcblx0XHRcdFx0aWYgKGZpZWxkcykge1xuXHRcdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGZpZWxkcy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmllbGQgPSBmaWVsZHNbaV07XG5cdFx0XHRcdFx0XHRpZiAoZmllbGQuY29uZGl0aW9uICYmICFmaWVsZC52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGNvbnN0IHsgcmVhZG9ubHksIGZpZWxkcyB9ID0gdGhpcztcblx0XHRpZiAoZmllbGRzKVxuXHRcdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG5cdFx0XHRcdGZpZWxkLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0XHR9XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xuXHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZmllbGQubmFtZSkgYXdhaXQgZmllbGQudmFsdWUodmFsdWVIZWxwZXIodmFsdWUsIGZpZWxkLm5hbWUpKTtcblx0XHRcdFx0ZWxzZSBpZiAoZmllbGQgaW5zdGFuY2VvZiBDb250YWluZXIpIGF3YWl0IGZpZWxkLnZhbHVlKHZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgcmVmcmVzaFZhbHVlKHRoaXMpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCBjaGFpbikge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cblx0XHRhd2FpdCByZWZyZXNoVmFsdWUodGhpcyk7XG5cblx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoY2hhaW4pO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoQ29udGFpbmVyKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbiIsImltcG9ydCB7IFxuXHRGT1JNU1RBVEVTLCBcblx0Tk9ERU5BTUVTLCBcblx0RVZFTlRfSU5JVElBTElaRUQsXG5cdEVWRU5UX1ZBTFVFX0NIQU5HRUQsXG5cdEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IFwiLi9jb250cm9sc1wiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBCVVRUT05EVU1NWSA9IHtcblx0YWN0aXZlOiB0cnVlLFxuXHRkaXNhYmxlZDogdHJ1ZSxcbn07XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIENvbnRyb2wgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5Db250cm9sO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGlmICghdGhpcy5yZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0dGhpcy5mb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHRcdFx0dGhpcy5iYWNrID0gdGhpcy5maW5kKE5PREVOQU1FUy5CYWNrQnV0dG9uKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xuXHRcdFx0dGhpcy5uZXh0ID0gdGhpcy5maW5kKE5PREVOQU1FUy5OZXh0QnV0dG9uKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xuXHRcdFx0dGhpcy5zdW1tYXJ5ID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdW1tYXJ5QnV0dG9uKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xuXHRcdFx0dGhpcy5zdWJtaXQgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLlN1Ym1pdEJ1dHRvbikuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcblxuXHRcdFx0dGhpcy5mb3JtLm9uKFtFVkVOVF9JTklUSUFMSVpFRCwgRVZFTlRfVkFMVUVfQ0hBTkdFRCwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCwgRVZFTlRfU0lURV9DSEFOR0VEXSwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Y29uc3QgeyBiYWNrLCBuZXh0LCBzdW1tYXJ5LCBzdWJtaXQsIGZvcm0gfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBhY3RpdmVQYWdlSW5kZXgsIGFjdGl2ZVBhZ2UsIG5leHRQYWdlLCBwYWdlcywgdXNlU3VtbWFyeVBhZ2UsIHN0YXRlIH0gPSBmb3JtO1xuXG5cdFx0Ly8gYmFzaWMgY29udHJvbCBzZXR1cFxuXHRcdGJhY2suYWN0aXZlID0gdHJ1ZTtcblx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRuZXh0LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdG5leHQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1bW1hcnkuYWN0aXZlID0gZmFsc2U7XG5cdFx0c3VtbWFyeS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0c3VibWl0LmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHN1Ym1pdC5kaXNhYmxlZCA9IHRydWU7XG5cblx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5maW5pc2hlZCkge1xuXHRcdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURVMuc3VtbWFyeSkge1xuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBhY3RpdmVQYWdlSW5kZXggPD0gMDtcblxuXHRcdFx0aWYgKG5leHRQYWdlIHx8ICghYWN0aXZlUGFnZS52YWxpZCAmJiBhY3RpdmVQYWdlSW5kZXggKyAxIDwgcGFnZXMubGVuZ3RoKSkge1xuXHRcdFx0XHRuZXh0LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdG5leHQuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcblx0XHRcdH0gZWxzZSBpZiAodXNlU3VtbWFyeVBhZ2UgJiYgc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0XHRzdW1tYXJ5LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdHN1bW1hcnkuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbmRlZmluZUVsZW1lbnQoQ29udHJvbCk7XG5leHBvcnQgZGVmYXVsdCBDb250cm9sO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVF9GSUVMRF9JTlBVVCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCB7IGZpbmRXcmFwcGVyIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW1wiZmlsZS1mb3JtYXRcIl07XG5cbmNsYXNzIEZpZWxkIGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkZpZWxkO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIodmFsdWUpO1xuXHRcdHRoaXMub24oRVZFTlRfRklFTERfSU5QVVQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwgPyBldmVudC5kZXRhaWwgOiBudWxsO1xuXHRcdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgY3VycmVudCA9IGF3YWl0IHRoaXMudmFsdWUoKTtcdFx0XHRcdFxuXHRcdFx0XHRpZiAoY3VycmVudCAhPSB2YWx1ZSkgdGhpcy52YWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMud3JhcHBlciA9IGZpbmRXcmFwcGVyKHRoaXMpO1xuXHRcdFx0aWYgKHRoaXMud3JhcHBlcilcblx0XHRcdFx0dGhpcy52YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLndyYXBwZXIudmFsaWQ7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKSB0aGlzLndyYXBwZXIucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuXHR9XG5cblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdGhpcy53cmFwcGVyID8gdGhpcy53cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xuXHR9XG5cblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKSByZXR1cm4gdGhpcy53cmFwcGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGF3YWl0IHRoaXMucmVhZHk7XG5cdFx0aWYgKHRoaXMud3JhcHBlcikgYXdhaXQgdGhpcy53cmFwcGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChGaWVsZCk7XG5leHBvcnQgZGVmYXVsdCBGaWVsZDtcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQge1xuXHRGT1JNU1RBVEVTLFxuXHROT0RFTkFNRVMsXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxuXHRFVkVOVF9WQUxVRV9DSEFOR0VELFxuXHRFVkVOVF9FWEVDVVRFX1ZBTElEQVRFLFxuXHRFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcblx0RVZFTlRfU1VCTUlULFxuXHRFVkVOVF9TVUJNSVRfUkVTVUxUUyxcblx0QVRUUklCVVRFX05BTUUsXG5cdEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFLFxuXHRBVFRSSUJVVEVfRU5EUE9JTlQsXG5cdEFUVFJJQlVURV9NRVRIT0QsXG5cdEFUVFJJQlVURV9TVEFURSxcblx0QVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IFwiLi9NZXNzYWdlXCI7XG5pbXBvcnQgXCIuL1BhZ2VcIjtcbmltcG9ydCBcIi4vQ29udHJvbFwiO1xuaW1wb3J0IFwiLi9Qcm9ncmVzc0JhclwiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uXCI7XG5pbXBvcnQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9EZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMIGFzIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgU1RBVEVfU1VDQ0VTUyBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHsgdmFsdWVIZWxwZXIgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cbmNvbnN0IF9zdWJtaXRBY3Rpb25zID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJzdWJtaXRBY3Rpb25cIik7XG5jb25zdCBfc3RhdGUgPSAgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJzdGF0ZVwiKTtcblxuY29uc3QgY29sbGVjdERhdGEgPSBhc3luYyAoc2VsZikgPT4ge1xuXHRhd2FpdCBzZWxmLnJlYWR5O1xuXHRjb25zdCBkYXRhID0ge307XG5cdGNvbnN0IHBhZ2VzID0gc2VsZi5wYWdlcztcblxuXHRmb3IgKGxldCBwYWdlIG9mIHBhZ2VzKSB7XG5cdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSB7XG5cdFx0XHRjb25zdCBuYW1lID0gcGFnZS5uYW1lO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBhd2FpdCBwYWdlLnZhbHVlKCk7XG5cdFx0XHRjb25zdCBoYXNWYWx1ZSA9IHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiO1xuXHRcdFx0aWYgKG5hbWUgJiYgaGFzVmFsdWUpICB2YWx1ZUhlbHBlcihkYXRhLCBuYW1lLCB2YWx1ZSk7XG5cdFx0XHRlbHNlIGlmIChoYXNWYWx1ZSkgT2JqZWN0VXRpbHMubWVyZ2UoZGF0YSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVRdO1xuXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xuXHRmb3IgKGxldCBwYWdlIG9mIGZvcm0ucGFnZXMpIHtcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcblx0fVxufTtcblxuY29uc3QgZXhlY3V0ZUFjdGlvbnMgPSBhc3luYyAoYWN0aW9ucywgZGF0YSkgPT4ge1xuXHRjb25zdCByZXN1bHRzID0gW107XG5cdGZvciAobGV0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG5cdFx0Y29uc3QgYWNjZXB0ID0gYXdhaXQgYWN0aW9uLmFjY2VwdChkYXRhKTtcblx0XHRpZiAoYWNjZXB0KSB7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFjdGlvbi5leGVjdXRlKGRhdGEpIHx8IG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQoYWN0aW9uLCBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MpO1xuXHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0aWYgKHJlc3VsdC5zdGF0ZSA9PSBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwpXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlc3VsdHMucHVzaChuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9GQUlMLCBlKSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5Gb3JtO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRfc3RhdGUodGhpcywgbnVsbCk7XG5cblx0XHR0aGlzLm9uKEVWRU5UX1ZBTFVFX0NIQU5HRUQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRjb25zdCBkZXRhaWwgPSBldmVudC5kZXRhaWw7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfRVhFQ1VURV9WQUxJREFURSwgZGV0YWlsKTtcblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmluaXQ7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMudXNlU3VtbWFyeVBhZ2UgPSB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSk7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xuXG5cdFx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xuXHRcdFx0dGhpcy5wYWdlcyA9IHRoaXMuZmluZChOT0RFTkFNRVMuUGFnZSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRUQpO1xuXHRcdH1cblxuXHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XG5cdFx0aWYgKHRoaXMucGFnZXMubGVuZ3RoID4gMCkgdGhpcy50b05leHRQYWdlKCk7XG5cdH1cblxuXHRnZXQgc3RhdGUoKSB7XG5cdFx0cmV0dXJuIF9zdGF0ZSh0aGlzKTtcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHJlYWRvbmx5KHRoaXMsIHRydWUpO1xuXHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHJlYWRvbmx5KHRoaXMsIGZhbHNlKTtcblx0XHRcdGlmICh0aGlzLmFjdGl2ZVBhZ2UpIHRoaXMuYWN0aXZlUGFnZS5hY3RpdmUgPSB0cnVlO1xuXHRcdH1cblx0XHRfc3RhdGUodGhpcywgc3RhdGUpO1xuXG5cdFx0aWYgKGFjdHVhbCAhPSBzdGF0ZSkgdGhpcy50cmlnZ2VyKEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCk7XG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9TVEFURSwgc3RhdGUpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdGZvciAobGV0IHBhZ2Ugb2YgdGhpcy5wYWdlcykgaWYgKHBhZ2UuY29uZGl0aW9uICYmICFwYWdlLnZhbGlkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGFzeW5jIHZhbHVlKGRhdGEpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm4gY29sbGVjdERhdGEodGhpcyk7XG5cblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdGZvciAobGV0IHBhZ2Ugb2YgdGhpcy5wYWdlcykge1xuXHRcdFx0XHRjb25zdCBuYW1lID0gcGFnZS5uYW1lO1xuXHRcdFx0XHQvL2F3YWl0IHBhZ2UudmFsdWUobnVsbCk7IC8vIHJlc2V0IGFsbCB2YWx1ZXNcdFx0XHRcdFx0XG5cdFx0XHRcdGlmIChuYW1lKSBhd2FpdCBwYWdlLnZhbHVlKCB2YWx1ZUhlbHBlcihkYXRhLCBuYW1lKSApO1xuXHRcdFx0XHRlbHNlIGF3YWl0IHBhZ2UudmFsdWUoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGFjdGl2ZVBhZ2UoKSB7XG5cdFx0aWYgKDAgPD0gdGhpcy5hY3RpdmVQYWdlSW5kZXggJiYgdGhpcy5hY3RpdmVQYWdlSW5kZXggPCB0aGlzLnBhZ2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMucGFnZXNbdGhpcy5hY3RpdmVQYWdlSW5kZXhdO1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRzZXQgYWN0aXZlUGFnZShwYWdlKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlUGFnZTtcblx0XHRpZiAocGFnZSAhPSBjdXJyZW50IHx8IHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IHRoaXMucGFnZXMuaW5kZXhPZihwYWdlKTtcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXG5cdFx0XHR0aGlzLnNjcm9sbEludG9WaWV3KCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU0lURV9DSEFOR0VEKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcHJldlBhZ2UoKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAtIDE7XG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpID49IDA7IGktLSkge1xuXHRcdFx0Y29uc3QgcGFnZSA9IHRoaXMucGFnZXNbaV07XG5cdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGdldCBuZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy5wYWdlcykge1xuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCArIDE7XG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFzeW5jIHRvUHJldlBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuaW5wdXQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xuXHRcdFx0aWYgKHByZXYpIHRoaXMuYWN0aXZlUGFnZSA9IHByZXY7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgdG9OZXh0UGFnZSgpIHtcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcblx0XHRpZiAobmV4dCkge1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlID0gbmV4dDtcblx0XHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5pdCkgdGhpcy5fc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSBpZiAodGhpcy51c2VTdW1tYXJ5UGFnZSkge1xuXHRcdFx0dGhpcy5zdW1tYXJ5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3VibWl0KCk7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgc3VtbWFyeSgpIHtcblx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5zdW1tYXJ5O1xuXHR9XG5cblx0Z2V0IHN1Ym1pdEFjdGlvbnMoKSB7XG5cdFx0bGV0IGFjdGlvbnMgPSBfc3VibWl0QWN0aW9ucyh0aGlzKTtcblx0XHRpZiAoIWFjdGlvbnMpIHtcblx0XHRcdGFjdGlvbnMgPSBbXTtcblx0XHRcdGxldCBlbmRwb2ludCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfRU5EUE9JTlQpO1xuXHRcdFx0aWYgKGVuZHBvaW50KSB7XG5cdFx0XHRcdGNvbnN0IG1ldGhvZCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfTUVUSE9EKSB8fCBcInBvc3RcIjtcblx0XHRcdFx0dGhpcy5hcHBlbmQobmV3IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKGVuZHBvaW50LCBtZXRob2QpKTtcblx0XHRcdH1cblxuXG5cdFx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLmNoaWxkcmVuO1xuXHRcdFx0Zm9yIChsZXQgY2hpbGQgb2YgY2hpbGRzKSB7XG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEJhc2VTdWJtaXRBY3Rpb24pIGFjdGlvbnMucHVzaChjaGlsZCk7XG5cdFx0XHR9XG5cdFx0XHRfc3VibWl0QWN0aW9ucyh0aGlzLCBhY3Rpb25zKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWN0aW9ucztcblx0fVxuXG5cdGFzeW5jIHN1Ym1pdCgpIHtcblx0XHR0aGlzLnN0YXRlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUKSA/IEZPUk1TVEFURVMuaW5wdXQgOiBGT1JNU1RBVEVTLmZpbmlzaGVkO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XG5cblx0XHRjb25zdCBhY3Rpb25zID0gdGhpcy5zdWJtaXRBY3Rpb25zO1xuXHRcdGlmIChhY3Rpb25zKSB7XG5cdFx0XHRjb25zdCByZXN1bHRzID0gYXdhaXQgZXhlY3V0ZUFjdGlvbnMoYWN0aW9ucywgZGF0YSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlUX1JFU1VMVFMsIHJlc3VsdHMpO1xuXHRcdH1cblxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TVUJNSVQsIGRhdGEpO1xuXHR9XG59O1xuZGVmaW5lRWxlbWVudChGb3JtKTtcbmV4cG9ydCBkZWZhdWx0IEZvcm07XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEXTtcblxuY2xhc3MgRm9ybUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGluaXQoYnV0dG9uKSB7XG5cdFxuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5kaXNhYmxlZCkgdGhpcy5leGVjdXRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xuXHR9XG5cblx0Z2V0IGRpc2FibGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRElTQUJMRUQpO1xuXHR9XG5cblx0c2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG5cdFx0ZGlzYWJsZWQgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfRElTQUJMRUQsIG51bGwpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHRjb25zb2xlLmxvZyhcImV4ZWN1dGVcIik7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZvcm1CdXR0b247XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCBcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsXG5cdEVWRU5UX1ZBTFVFX0NIQU5HRUQsXG5cdEVWRU5UX0xJU1RfUk9XX0FERCxcblx0RVZFTlRfTElTVF9ST1dfREVMRVRFLFxuXHRBVFRSSUJVVEVfTUlOLCBcblx0QVRUUklCVVRFX01BWCBcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0cmVlRmlsdGVyIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCBSb3cgZnJvbSBcIi4vbGlzdC9Sb3dcIjtcbmltcG9ydCBBZGRSb3cgZnJvbSBcIi4vbGlzdC9BZGRSb3dcIjtcbmltcG9ydCBcIi4vbGlzdC9EZWxldGVSb3dcIjtcbmltcG9ydCBcIi4vbGlzdC9Sb3dzXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX01JTiwgQVRUUklCVVRFX01BWF07XG5cbmNvbnN0IGZpbmRBZGRCdXR0b24gPSAobGlzdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdDogbGlzdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFkZFJvdykgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSlbMF07XG59O1xuXG5jb25zdCBjcmVhdGVSb3cgPSBhc3luYyAobGlzdCwgdmFsdWUpID0+IHtcblx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlIH0gPSBsaXN0O1xuXHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpLmNoaWxkcmVuWzBdO1xuXHRjb250YWluZXIuYXBwZW5kKHJvdyk7XG5cblx0aWYgKHZhbHVlKSBhd2FpdCByb3cudmFsdWUodmFsdWUpO1xuXG5cdHJldHVybiByb3c7XG59O1xuXG5jbGFzcyBMaXN0IGV4dGVuZHMgQmFzZUZpZWxkIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkxpc3Q7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih2YWx1ZSA9IG51bGwpIHtcblx0XHRzdXBlcih2YWx1ZSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KTtcblxuXHRcdHRoaXMub24oRVZFTlRfVkFMVUVfQ0hBTkdFRCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQ7XG5cdFx0XHRpZiAocm93IGluc3RhbmNlb2YgUm93KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGNvbnN0IGNoYWluID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgY2hhaW4pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbihFVkVOVF9MSVNUX1JPV19BREQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5fSA9IHRoaXM7XG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGNvbnN0IHJvdyA9IGNyZWF0ZVJvdyh0aGlzKTtcblx0XHRcdFx0dGhpcy5jaGlsZFZhbHVlQ2hhbmdlZCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbihFVkVOVF9MSVNUX1JPV19ERUxFVEUsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjb25zdCB7IHJvd3MsIHJlYWRvbmx5fSA9IHRoaXM7XG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnQoTk9ERU5BTUVTLkxpc3RSb3cpO1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHJvd3MuaW5kZXhPZihyb3cpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdHJvdy5yZW1vdmUoKTtcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHRcdFxuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLnRlbXBsYXRlID0gdGhpcy5maW5kKFwidGVtcGxhdGVcIikuZmlyc3QoKTtcblx0XHRcdHRoaXMuY29udGFpbmVyID0gdGhpcy5maW5kKE5PREVOQU1FUy5MaXN0Um93cykuZmlyc3QoKTtcblx0XHRcdGNvbnN0IHZhbGlkYXRvciAgPSB0aGlzLnZhbGlkYXRvcjtcblx0XHRcdGNvbnN0IGFkZEJ1dHRvbiA9IGZpbmRBZGRCdXR0b24odGhpcyk7XG5cblx0XHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoe30pID0+IHtcblx0XHRcdFx0Y29uc3QgeyByb3dzLCBtaW4sIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0XHRcdGNvbnN0IGxlbmd0aCA9IHJvd3MubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIXJlYWRvbmx5KSB7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChsZW5ndGggPT0gbWF4KSBhZGRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGVsc2UgaWYgKGxlbmd0aCA8IG1heCkgYWRkQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1pbiA8PSBsZW5ndGggJiYgbGVuZ3RoIDw9IG1heDtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IHJvd3MgfSA9IHRoaXM7XG5cdFx0XHRcdGlmIChyb3dzKVxuXHRcdFx0XHRcdGZvciAobGV0IHJvdyBvZiByb3dzKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXJvdy52YWxpZCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMudmFsaWRhdGUoKTtcblx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHR9XG5cblx0cmVhZG9ubHlVcGRhdGVkKCkge1xuXHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XG5cdFx0Zm9yIChsZXQgcm93IG9mIHRoaXMucm93cykge1xuXHRcdFx0cm93LnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHJvd3MoKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5jb250YWluZXIuY2hpbGRyZW4pO1xuXHR9XG5cblx0Z2V0IG1pbigpIHtcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01JTikpXG5cdFx0XHRyZXR1cm4gTWF0aC5tYXgoMCwgcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NSU4pKSk7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRnZXQgbWF4KCkge1xuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUFYKSkgcmV0dXJuIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUFYKSk7XG5cdFx0cmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gIXZhbHVlIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZSA/IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKSA6IG51bGw7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5yZW1vdmUoKTtcblx0XHRpZiAodmFsdWUpIGZvciAobGV0IHZhbCBvZiB2YWx1ZSkgYXdhaXQgY3JlYXRlUm93KHRoaXMsIHZhbCk7XG5cdH1cblxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChyb3csIGNoYWluKSB7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRcblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblxuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3Mpe1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBhd2FpdCByb3cudmFsdWUoKTtcblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSlcblx0XHR9XG5cblx0XHRpZih2YWx1ZXMubGVuZ3RoID4gMClcblx0XHRcdF92YWx1ZSh0aGlzLCB2YWx1ZXMpO1xuXHRcdGVsc2Vcblx0XHRcdF92YWx1ZSh0aGlzLCBudWxsKTtcblxuXHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZShjaGFpbik7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChMaXN0KTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IFxuXHROT0RFTkFNRVMsIFxuXHRFVkVOVF9FWEVDVVRFX1ZBTElEQVRFIFxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEJhc2UgPSAobWVzc2FnZSkgPT4ge1xuXHRsZXQgcGFyZW50ID0gbWVzc2FnZS5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2UpIHJldHVybiBwYXJlbnQ7XG5cblx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5NZXNzYWdlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcdFx0XG5cblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XHRcdFx0XG5cdFx0XHR0aGlzLnJlZmVyZW5jZSA9IGZpbmRQYXJlbnRCYXNlKHRoaXMpO1xuXHRcdFx0dGhpcy5mb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHRcdFx0dGhpcy5mb3JtLm9uKEVWRU5UX0VYRUNVVEVfVkFMSURBVEUsICgpID0+IHtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmVhZHkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XHRcdFxuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZSgpIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzLnJlZmVyZW5jZSk7XG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHR9XG59XG5kZWZpbmVFbGVtZW50KE1lc3NhZ2UpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVMsICBcblx0QVRUUklCVVRFX1NURVAgXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XG5cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb250YWluZXIge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuUGFnZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0c3VwZXIodmFsdWUpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdH1cblxuXHRnZXQgc3RlcCgpe1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX1NURVApO1xuXHR9XG5cdFxuXHRjb25kaXRpb25VcGRhdGVkKCl7fVxufVxuZGVmaW5lRWxlbWVudChQYWdlKTtcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTLCBcblx0RVZFTlRfU0lURV9DSEFOR0VELFxuXHRFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQsXG5cdEZPUk1TVEFURVMsIFxuXHRBVFRSSUJVVEVfUFJPR1JFU1MgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IFwiLi9TdGVwXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1BST0dSRVNTXTtcblxuY29uc3QgZmlyc3RTdGVwUGFnZUluZGV4ID0gKHBhZ2VzLCBzdGVwLCBhY3RpdmVQYWdlKSA9PiB7XG5cdGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcblx0XHRpZiAocGFnZS5zdGVwID09IHN0ZXAgJiYgcGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdGVsc2UgaWYgKHBhZ2UgPT0gYWN0aXZlUGFnZSkgcmV0dXJuO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLlByb2dyZXNzQmFyO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmZvcm0pIHJldHVybjtcblx0XHRcdGlmICh0YXJnZXQgPT0gdGhpcykgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBzdGVwID0gdGFyZ2V0LmlzKE5PREVOQU1FUy5TdGVwKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVTLlN0ZXApO1xuXG5cdFx0XHRpZiAoIXN0ZXApIHJldHVybjtcblxuXHRcdFx0Y29uc3Qgc3RhdGUgPSB0aGlzLmZvcm0uc3RhdGU7XG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMuZm9ybS5wYWdlcztcblx0XHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmZvcm0uYWN0aXZlUGFnZTtcblx0XHRcdGNvbnN0IHN0ZXBOYW1lID0gc3RlcC5uYW1lO1xuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQgfHwgc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBmaXJzdFN0ZXBQYWdlSW5kZXgocGFnZXMsIHN0ZXBOYW1lLCBhY3RpdmVQYWdlKTtcblx0XHRcdFx0aWYgKHBhZ2UpIHRoaXMuZm9ybS5hY3RpdmVQYWdlID0gcGFnZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHR0aGlzLnByb2dyZXNzID0gMDtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0XHR0aGlzLnN0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdGVwKTtcblx0XHRcdHRoaXMuZm9ybS5vbihbRVZFTlRfU0lURV9DSEFOR0VELEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRF0sICgpID0+IHtcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSB0aGlzLmZvcm0uc3RhdGU7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmZvcm0uYWN0aXZlUGFnZTtcblx0XHRcdFx0aWYgKCFhY3RpdmVQYWdlKSByZXR1cm47XG5cblx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLmZvcm0uYWN0aXZlUGFnZUluZGV4O1xuXHRcdFx0XHRjb25zdCBjb3VudCA9IHRoaXMuZm9ybS5wYWdlcy5sZW5ndGg7XG5cdFx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURVMuaW5pdDtcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKChpbmRleCAqIDEwMCkgLyBjb3VudCk7XG5cblx0XHRcdFx0Zm9yIChsZXQgc3RlcCBvZiB0aGlzLnN0ZXBzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHN0ZXAubmFtZTtcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IHBhZ2VTdGVwO1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5O1xuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFUy5maW5pc2hlZDtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucHJvZ3Jlc3MgPSBzdGF0ZSA9PSBGT1JNU1RBVEVTLnN1bW1hcnkgfHwgc3RhdGUgPT0gRk9STVNUQVRFUy5maW5pc2hlZCA/IDEwMCA6IHByb2dyZXNzO1xuXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldCBwcm9ncmVzcygpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUyk7XG5cdH1cblxuXHRzZXQgcHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcblx0XHRpZiAodGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSkgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgKyBcIiVcIik7XG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUywgTWF0aC5tYXgoMCwgTWF0aC5taW4ocHJvZ3Jlc3MsIDEwMCkpKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KFByb2dyZXNzQmFyKTtcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FUywgXG5cdEFUVFJJQlVURV9OQU1FLCBcblx0QVRUUklCVVRFX0FDVElWRSwgXG5cdEFUVFJJQlVURV9SRUFET05MWSBcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVBY3RpdmVTdGF0ZSB9IGZyb20gXCIuL3V0aWxzL1N0YXRlSGVscGVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWV07XG5cbmNsYXNzIFN0ZXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLlN0ZXA7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cbiAgICBnZXQgbmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9OQU1FKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcblx0XHRpZiAoY3VycmVudCAhPSBhY3RpdmUpIHtcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHJlYWRvbmx5KCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0cmVhZG9ubHkgPyB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoU3RlcCk7XG5leHBvcnQgZGVmYXVsdCBTdGVwO1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FU1xufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xuXG5cbmNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5WYWxpZGF0aW9uO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuXHR9XG59XG5kZWZpbmVFbGVtZW50KFZhbGlkYXRpb24pO1xuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbjtcbiIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCB7IEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04sIEZPUk1TVEFURVMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgdXBkYXRlQ29uZGl0aW9uU3RhdGUsIHVwZGF0ZVZhbGlkU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xuaW1wb3J0IHsgZmluZFZhbGlkYXRpb25zIH0gZnJvbSBcIi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XG5cbmNvbnN0IHVwZGF0ZVJlYWRvbmx5ID0gYXN5bmMgKHsgZGF0YSwgdmFsaWQsIGJhc2UsIGNvbmRpdGlvbiB9KSA9PiB7XG5cdGNvbnN0IHsgZm9ybSB9ID0gYmFzZTtcblx0aWYgKGZvcm0uc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdC8qaWYgKCF2YWxpZClcblx0XHRcdGJhc2UucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRlbHNlICovXG5cdFx0aWYgKGNvbmRpdGlvbikge1xuXHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHRcdFx0YmFzZS5lZGl0YWJsZSA9IHRlc3Q7XG5cdFx0XHRyZXR1cm4gdGVzdDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuXG5jbGFzcyBWYWxpZGF0b3Ige1xuXHRjb25zdHJ1Y3RvcihiYXNlKSB7XG5cdFx0dGhpcy5pbml0YWwgPSB0cnVlO1xuXHRcdHRoaXMuYmFzZSA9IGJhc2U7XG5cdFx0dGhpcy5jdXN0b21DaGVja3MgPSBbXTtcblx0XHR0aGlzLnZhbGlkYXRpb25zID0gZmluZFZhbGlkYXRpb25zKGJhc2UpIHx8IFtdO1xuXHRcdHRoaXMuY29uZGl0aW9uID0gYmFzZS5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuXHRcdHRoaXMuZWRpdGFibGVDb25kaXRpb24gPSBiYXNlLmF0dHIoQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTik7XG5cdH1cblxuXHRhZGRDdXN0b21DaGVjayhjaGVjaykge1xuXHRcdHRoaXMuY3VzdG9tQ2hlY2tzLnB1c2goY2hlY2spO1xuXHR9XG5cblx0Z2V0IGZvcm0oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYmFzZS5mb3JtO1xuXHR9XG5cblx0YXN5bmMgdmFsaWRhdGUoKSB7XG5cdFx0Y29uc3QgeyBiYXNlLCB2YWxpZGF0aW9ucywgY3VzdG9tQ2hlY2tzLCBjb25kaXRpb24sIGVkaXRhYmxlQ29uZGl0aW9uIH0gPSB0aGlzO1xuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkIH0gPSBiYXNlO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBldmFsdWF0aW9uRGF0YShiYXNlKTtcblx0XHRjb25zdCBpbml0aWFsID0gdGhpcy5pbml0YWw7XG5cdFx0dGhpcy5pbml0YWwgPSBmYWxzZTtcblxuXHRcdGNvbnN0IGNvbmRpdGlvblZhbGlkID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xuXHRcdHVwZGF0ZUNvbmRpdGlvblN0YXRlKGJhc2UsIGNvbmRpdGlvblZhbGlkLCBpbml0aWFsKTtcblxuXHRcdGxldCB2YWxpZCA9IHJlcXVpcmVkID8gaGFzVmFsdWUgOiB0cnVlO1xuXHRcdGlmIChjb25kaXRpb25WYWxpZCkge1xuXHRcdFx0aWYgKHZhbGlkKVxuXHRcdFx0XHRmb3IgKGxldCBjaGVjayBvZiBjdXN0b21DaGVja3MpIHtcblx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gYXdhaXQgY2hlY2soeyBkYXRhLCBiYXNlIH0pO1xuXHRcdFx0XHRcdGlmICghdGVzdCkgdmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCB2YWxpZGF0aW9uIG9mIHZhbGlkYXRpb25zKSB7XG5cdFx0XHRcdGlmICh2YWxpZCAmJiBoYXNWYWx1ZSkge1xuXHRcdFx0XHRcdGNvbnN0IHRlc3QgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh2YWxpZGF0aW9uLmNvbmRpdGlvbiwgZGF0YSwgdHJ1ZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGlvbi5hY3RpdmUgPSAhdGVzdDtcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZSB2YWxpZGF0aW9uLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlZGl0YWJsZSA9IGF3YWl0IHVwZGF0ZVJlYWRvbmx5KHsgZGF0YSwgdmFsaWQsIGJhc2UsIGNvbmRpdGlvbjogZWRpdGFibGVDb25kaXRpb24gfSk7XG5cdFx0XHRpZiAoIWVkaXRhYmxlKSB2YWxpZCA9IHRydWU7XG5cblx0XHRcdHVwZGF0ZVZhbGlkU3RhdGUoYmFzZSwgdmFsaWQsIGluaXRpYWwpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0b3I7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgQmFja0J1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXHRcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkJhY2tCdXR0b247XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xuZGVmaW5lRWxlbWVudChCYWNrQnV0dG9uKTtcbiIsImltcG9ydCB7IE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTmV4dEJ1dHRvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5leHRCdXR0b247XG5kZWZpbmVFbGVtZW50KE5leHRCdXR0b24pO1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIFN1Ym1pdEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdWJtaXRCdXR0b247XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdWJtaXRCdXR0b247XG5kZWZpbmVFbGVtZW50KFN1Ym1pdEJ1dHRvbik7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5TdW1tYXJ5QnV0dG9uO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnlCdXR0b247XG5kZWZpbmVFbGVtZW50KFN1bW1hcnlCdXR0b24pO1xuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xuaW1wb3J0IE5leHRCdXR0b24gZnJvbSBcIi4vTmV4dEJ1dHRvblwiO1xuaW1wb3J0IFN1bW1hcnlCdXR0b24gZnJvbSBcIi4vU3VtbWFyeUJ1dHRvblwiO1xuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcblxuZXhwb3J0IHtcblx0QmFja0J1dHRvbixcblx0TmV4dEJ1dHRvbixcblx0U3VtbWFyeUJ1dHRvbixcblx0U3VibWl0QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVMsIFxuXHRFVkVOVF9MSVNUX1JPV19BRERcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIEFkZFJvdyBleHRlbmRzIEZvcm1CdXR0b24ge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCl7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CdXR0b25BZGRSb3c7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVF9MSVNUX1JPV19BREQpO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoQWRkUm93KTtcbmV4cG9ydCBkZWZhdWx0IEFkZFJvdztcbiIsImltcG9ydCB7IFxuXHROT0RFTkFNRVMsXG5cdEVWRU5UX0xJU1RfUk9XX0RFTEVURVxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jbGFzcyBEZWxldGVSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkJ1dHRvbkRlbGV0ZVJvdztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCl7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlXHQ9IHRydWU7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdHRoaXMudHJpZ2dlcigxMDAsIEVWRU5UX0xJU1RfUk9XX0RFTEVURSk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChEZWxldGVSb3cpO1xuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xuIiwiaW1wb3J0IHsgXG5cdE5PREVOQU1FU1xufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCBEZWxldGVSb3cgZnJvbSBcIi4vRGVsZXRlUm93XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIExpc3RSb3cgZXh0ZW5kcyBDb250YWluZXIge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTGlzdFJvdztcblx0fVxuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93Lk5PREVOQU1FLCBMaXN0Um93KTtcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XG4iLCJpbXBvcnQgeyBcblx0Tk9ERU5BTUVTXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBMaXN0Um93cyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5MaXN0Um93cztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKExpc3RSb3dzLk5PREVOQU1FLCBMaXN0Um93cyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHsgRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OLCBOT0RFTkFNRV9GT1JNLCBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG4vLyBwcml2YXRlIG1lbWJlclxuY29uc3QgX2Zvcm0gPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcImZvcm1cIik7XG5cbi8vIGxvZ2ljXG5jbGFzcyBCYXNlU3VibWl0QWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IGZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcblx0XHRfZm9ybSh0aGlzLCBmb3JtKTtcblx0XHRpZiAoZm9ybSkgdGhpcy50cmlnZ2VyKEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTik7XG5cdH1cblxuXHRnZXQgZm9ybSgpIHtcblx0XHRyZXR1cm4gX2Zvcm0odGhpcyk7XG5cdH1cblxuXHRhc3luYyBhY2NlcHQoZGF0YSA9IHt9KSB7XG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xuICAgICAgICBpZihjb25kaXRpb24pXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiFcblx0ICovXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQoU1RBVEVfRkFJTCwgXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VTdWJtaXRBY3Rpb247XG4iLCJpbXBvcnQge2RlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfU1VDQ0VTUywgU1RBVEVfRkFJTCB9IGZyb20gXCIuL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuaW1wb3J0IHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IE5PREVOQU1FID0gYCR7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0tZGVmYXVsdGA7XG5cbmNsYXNzIERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGV4dGVuZHMgQmFzZVN1Ym1pdEFjdGlvbiB7XG5cbiAgICBzdGF0aWMgZ2V0IE5PREVOQU1FKCkgeyByZXR1cm4gTk9ERU5BTUU7fVxuXG5cblx0Y29uc3RydWN0b3IoZW5kcG9pbnQsIG1ldGhvZCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xuXHRcdHRoaXMubWV0aG9kID0gbWV0aG9kO1xuXHR9XG5cblx0YXN5bmMgZXhlY3V0ZShkYXRhKSB7XHRcdFxuXHRcdGxldCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQ7XG5cdFx0ZW5kcG9pbnQgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZVRleHQoZW5kcG9pbnQsIGRhdGEsIGVuZHBvaW50KTtcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCBsb2NhdGlvbik7XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuXHRcdFx0bWV0aG9kOiB0aGlzLm1ldGhvZCxcblx0XHRcdGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcblx0XHRcdG1vZGU6IFwiY29yc1wiLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcblx0XHR9KTtcdFx0XG5cdFx0XHRcblx0XHRyZXR1cm4gbmV3IFN1Ym1pdEFjdGlvblJlc3VsdCh0aGlzLCByZXNwb25zZS5vayA/IFNUQVRFX1NVQ0NFU1MgOiBTVEFURV9GQUlMLCByZXNwb25zZSk7XHRcdFxuXHR9XG59O1xuXG5kZWZpbmUoRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24pO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb247XG4iLCJleHBvcnQgY29uc3QgU1RBVEVfU1VDQ0VTUyA9IFwic3VjY2Vzc1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0ZBSUwgPSBcImZhaWxcIjtcblxuY2xhc3MgU3VibWl0QWN0aW9uUmVzdWx0IHtcblxuICAgIHN0YXRpYyBnZXQgU1RBVEVfU1VDQ0VTUygpe3JldHVybiBTVEFURV9TVUNDRVNTO31cbiAgICBzdGF0aWMgZ2V0IFNUQVRFX0ZBSUwoKXtyZXR1cm4gU1RBVEVfRkFJTDt9XG5cbiAgICBjb25zdHJ1Y3RvcihhY3Rpb24sIHN0YXRlLCBtZXNzYWdlLCBkYXRhKXtcblx0XHR0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH07ICAgIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QWN0aW9uUmVzdWx0OyIsImltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IFNQRUNJQUxWQVJTLCBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRpb25EYXRhID0gYXN5bmMgKGJhc2UpID0+IHtcblx0YXdhaXQgYmFzZS5yZWFkeTtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRkYXRhW1NQRUNJQUxWQVJTLkNVUlJFTlRWQUxVRV0gPSBhd2FpdCBiYXNlLnZhbHVlKCk7XG5cblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0bGV0IHRlbXAgPSBkYXRhO1xuXHR3aGlsZSAocm93KSB7XG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCByb3cudmFsdWUoKTtcblx0XHR0ZW1wID0gdGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV107XG5cdFx0cm93ID0gcm93LnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdH1cblx0XG5cdHJldHVybiBPYmplY3RVdGlscy5tZXJnZSggZGF0YSwgYXdhaXQgYmFzZS5mb3JtLnZhbHVlKCkpO1xufTtcblxuY29uc3QgTkFNRV9TUExJVFRFUiA9IC9cXC4vZztcbmV4cG9ydCBjb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uIChkYXRhLCBuYW1lLCB2YWx1ZSkge1xuXHRpZiAoZGF0YSA9PSBudWxsIHx8IHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCB1cGRhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcblxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XG5cdHdoaWxlIChuYW1lcy5sZW5ndGggPiAxKSB7XG5cdFx0Y29uc3Qga2V5ID0gbmFtZXMuc2hpZnQoKTtcblx0XHRsZXQgdGVtcCA9IGRhdGFba2V5XTtcblx0XHRjb25zdCBoYXMgPSB0eXBlb2YgdGVtcCAhPT0gXCJ1bmRlZmllbmRcIiAmJiB0ZW1wICE9IG51bGw7XG5cdFx0aWYgKCFoYXMgJiYgIXVwZGF0ZSkgcmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAoIWhhcyAmJiB1cGRhdGUpIHRlbXAgPSBkYXRhW2tleV0gPSB7fTtcblxuXHRcdGRhdGEgPSB0ZW1wO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSkgZGF0YVtuYW1lc1swXV0gPSB2YWx1ZTtcblx0ZWxzZSByZXR1cm4gZGF0YVtuYW1lc1swXV0gPyBkYXRhW25hbWVzWzBdXSA6IG51bGw7XG59OyIsImV4cG9ydCBkZWZhdWx0IChOb2RlKSA9PiB7XG4gICAgaWYoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoTm9kZS5OT0RFTkFNRSkpXG4gICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoTm9kZS5OT0RFTkFNRSwgTm9kZSk7XG59IiwiaW1wb3J0IHtFVkVOVEhBTkRMRV9USU1FT1VUfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJndW1lbnRzKS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlRXZlbnRDb3B5ID0gKGV2ZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgIGRldGFpbDogZXZlbnQuZGV0YWlsLFxuICAgICAgICBjdXJyZW50VGFyZ2V0OiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0OiBldmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBvcmlnaW5hbFRhcmdldCA6IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBzcmNFbGVtZW50OiBldmVudC5zcmNFbGVtZW50LFxuICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB0b1RpbWVvdXRIYW5kbGUgPSAoaGFuZGxlLCBwcmV2ZW50RGVmYXVsdCwgc3RvcFByb3BhZ2F0aW9uLCB0aW1lb3V0KSA9PiB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZlbnQgPSB0eXBlb2YgcHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiA/IHByZXZlbnREZWZhdWx0IDogKCkgPT4gcHJldmVudERlZmF1bHQ7XG4gICAgY29uc3Qgc3RvcCA9IHR5cGVvZiBzdG9wUHJvcGFnYXRpb24gPT09IFwiZnVuY3Rpb25cIiA/IHN0b3BQcm9wYWdhdGlvbiA6ICgpID0+IHN0b3BQcm9wYWdhdGlvbjtcblxuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYocHJldmVudChldmVudCkpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZihzdG9wKGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50Q29weSA9IG1ha2VFdmVudENvcHkoZXZlbnQpO1xuXG4gICAgICAgIGlmKGlkKVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZCA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGUoZXZlbnRDb3B5KTtcbiAgICAgICAgfSwgdGltZW91dCB8fCBFVkVOVEhBTkRMRV9USU1FT1VUKTtcblxuICAgIH1cbn07IiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi4vVmFsaWRhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgdHJlZUZpbHRlciA9ICh7IHJvb3QsIGZpbHRlciB9KSA9PiB7XG5cdGxldCBlbGVtZW50cyA9IFtdO1xuXHRyb290LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB7IGFjY2VwdCwgc3RvcCA9IGZhbHNlIH0gPSBmaWx0ZXIoZWxlbWVudCk7XG5cblx0XHRpZiAoYWNjZXB0KSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSB0cmVlRmlsdGVyKHsgcm9vdDogZWxlbWVudCwgZmlsdGVyIH0pO1xuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0KSBlbGVtZW50cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEZpZWxkcyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kVmFsaWRhdGlvbnMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAocm9vdCAhPSBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBWYWxpZGF0aW9uKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcblx0RVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsXG5cdEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VELFxuXHRFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcblx0QVRUUklCVVRFX1ZBTElELCBcblx0QVRUUklCVVRFX0lOVkFMSUQsIFxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcblx0QVRUUklCVVRFX0VESVRBQkxFLCBBVFRSSUJVVEVfUkVBRE9OTFkgXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZhbGlkU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnZhbGlkO1xuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcblx0fSBlbHNlIGlmICh2YWxpZCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIFwiXCIpO1xuXHR9IGVsc2Uge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBcIlwiKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xuXHR9XG5cblx0aWYgKG9sZFN0YXRlICE9IHZhbGlkIHx8IGluaXRpYWwpeyBcblx0XHR0YXJnZXQudHJpZ2dlcihFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VEKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbmRpdGlvblN0YXRlID0gKHRhcmdldCwgdmFsaWQsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuY29uZGl0aW9uO1xuXHRpZiAodmFsaWQpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFwiXCIpO1xuXHR9IGVsc2Uge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIG51bGwpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXCJcIik7XG5cdH1cblx0aWYgKG9sZFN0YXRlICE9IHZhbGlkIHx8IGluaXRpYWwpIHtcdFx0XG5cdFx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQWN0aXZlU3RhdGUgPSAodGFyZ2V0LCBhY3RpdmUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5hY3RpdmU7XG5cdGFjdGl2ZSA/IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XG5cdGlmIChvbGRTdGF0ZSAhPSBhY3RpdmUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmVkaXRhYmxlO1xuXHRpZiAoZWRpdGFibGUpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfRURJVEFCTEUsIFwiXCIpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xuXHR9XG5cdGlmIChvbGRTdGF0ZSAhPSBlZGl0YWJsZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEKTtcbn07IiwiaW1wb3J0IHsgXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcblxuXHRcdGNvbnN0IHZhbHVlcyA9IFtdO1xuXHRcdHZhbHVlLmZvckVhY2goKHZhbHVlKSA9PiB7XG5cdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdmFsdWVzO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLm11bHRpcGxlKSB7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNle1xuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuXG5jb25zdCBfdmFsdWUgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInZhbHVlXCIpO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJmaWxlXCJdJztcblxuY29uc3QgcmVhZEZpbGUgPSAoZmlsZSwgcmVhZEZuTmFtZSkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0cmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsICgpID0+IHtcblx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRuYW1lOiBmaWxlLm5hbWUsXG5cdFx0XHRcdHR5cGU6IGZpbGUudHlwZSxcblx0XHRcdFx0c2l6ZTogZmlsZS5zaXplLFxuXHRcdFx0XHRkYXRhOiByZWFkZXIucmVzdWx0XG5cdFx0XHR9KTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0cmVhZGVyW3JlYWRGbk5hbWVdKGZpbGUpO1xuXHR9KTtcbn07XG5cbi8vcmVhZEFzRGF0YVVSTFxuXG5jb25zdCBGT1JNQVQgPSB7XG5cdFwiZm9ybS1pbnB1dFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGZpbGUuZm9ybWF0ID0gXCJmb3JtLWlucHV0XCI7XG5cdFx0cmV0dXJuIGZpbGU7XG5cdH0sXG5cdFwiZGF0YS11cmwtYmFzZTY0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImRhdGEtdXJsLWJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cdFwiYmFzZTY0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xuXHRcdHJlc3VsdC5kYXRhID0gcmVzdWx0LmRhdGEuc3Vic3RyKHJlc3VsdC5kYXRhLmluZGV4T2YoXCIsXCIpICsgMSk7XG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiYmFzZTY0XCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufTtcblxuY29uc3QgcmVhZEZpbGVzID0gYXN5bmMgKGZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSA9PiB7XG5cdGxldCByZXN1bHQgPSBbXTtcblx0Zm9yIChsZXQgZmlsZSBvZiBmaWxlcylcblx0XHRyZXN1bHQucHVzaChhd2FpdCBGT1JNQVRbZm9ybWF0XShmaWxlKSk7XG5cblx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMClcblx0XHRyZXR1cm4gbnVsbDtcblxuXG5cdHJldHVybiBtdWx0aXBsZSA/IHJlc3VsdCA6IHJlc3VsdFswXTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlIGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0dGhpcy5tdWx0aXBsZSA9IGlucHV0Lm11bHRpcGxlO1xuXHRcdHRoaXMuZm9ybWF0ID0gZmllbGQuYXR0cihcImZpbGUtZm9ybWF0XCIpIHx8IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1uYW1lLXRhcmdldFwiKTtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gdGhpcy5maWxlbmFtZVRhcmdldCA/IGZpZWxkLmZpbmQodGhpcy5maWxlbmFtZVRhcmdldCkuZmlyc3QoKSA6IG51bGw7XG5cdFx0Y29uc3QgeyBmb3JtYXQsIG11bHRpcGxlIH0gPSB0aGlzO1xuXG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKVxuXHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0fTtcblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgID09PSBcIm9iamVjdFwiO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKSB7XG5cdFx0XHRfdmFsdWUodGhpcywgdmFsdWUpXG5cdFx0XHRpZighdmFsdWUpXHRcdFx0XG5cdFx0XHRcdHRoaXMuaW5wdXQudmFsdWUgPSBudWxsO1xuXG5cdFx0XHRjb25zdCBmaWxlbmFtZSA9IHRoaXMuZmlsZW5hbWVUYXJnZXQ7XG5cdFx0XHRpZiAoZmlsZW5hbWUpIHtcblx0XHRcdFx0ZmlsZW5hbWUuZW1wdHkoKTtcblx0XHRcdFx0aWYodmFsdWUpe1xuXHRcdFx0XHRcdGlmICh0aGlzLm11bHRpcGxlKSB7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBmaWxlIG9mIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGVuYW1lLmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRmaWxlbmFtZS5hcHBlbmQoYDxzcGFuPiR7dmFsdWUubmFtZX08L3NwYW4+YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gX3ZhbHVlKHRoaXMpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nO1xuXG5jb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvIGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZSArIGdldFJhbmRvbUludCgpO1xuXHRcdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xuXHRcdHJldHVybiB2YWx1ZS52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNle1xuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnc2VsZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dCwgY2hhbmdlZFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy5pbnB1dC5tdWx0aXBsZSA/IHRoaXMuaW5wdXQudmFsKCkgOiB0aGlzLmlucHV0LnZhbHVlKTtcblx0fVxuXHRcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGggPiAwKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0fSBlbHNle1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1x0XG5cdFx0XHR9XHRcdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dDpub3QoW3R5cGU9XCJmaWxlXCJdKTpub3QoW3R5cGU9XCJyYWRpb1wiXSk6bm90KFt0eXBlPVwiY2hlY2tib3hcIl0pICxpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEnO1xuXG5jb25zdCBERUZBVUxUVFlQRSA9IFwidGV4dFwiO1xuXG5jb25zdCB0ZXh0ID0gKGlucHV0KSA9PiB7XG5cdHJldHVybiBcdHtcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjsgXG5cdFx0fSxcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlID0gdmFsdWU7IFxuXHRcdH0sXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fTtcbn07XG5jb25zdCBudW1iZXIgPSAoaW5wdXQpID0+e1xuXHRyZXR1cm4ge1xuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xuXHRcdH0sXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzTnVtYmVyO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT57XG5cdFx0XHRpbnB1dC52YWx1ZUFzTnVtYmVyID0gdmFsdWU7XG5cdFx0fSxcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHR9O1xufTtcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcblx0cmV0dXJuIHtcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcblx0XHR9LFxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XG5cdFx0XHRpbnB1dC52YWx1ZUFzRGF0ZSA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHR9O1xufTtcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGUsIHRpbWU6IGRhdGUsIHJhbmdlOm51bWJlciB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy50eXBlID0gKFRZUEVTW3R5cGVdIHx8IFRZUEVTW0RFRkFVTFRUWVBFXSkoaW5wdXQpO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXG5cdFx0XHQpLFxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUuYWNjZXB0KHZhbHVlKTtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLnR5cGUubm9ybWFsaXplKHZhbHVlKTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKVxuXHRcdFx0dGhpcy50eXBlLnNldFZhbHVlKHZhbHVlKVxuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gXCIuLi9GaWVsZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIHtcblx0XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpeyByZXR1cm4gbnVsbDt9XG5cdFxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpIHsgfVxuXG5cdHNldCByZWFkb25seShkaXNhYmxlZCkgeyB9XG5cblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkge1xuXHR9XG5cdFxuXHRnZXQgdmFsdWUoKXtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRcblx0Z2V0IHZhbGlkKCl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsImltcG9ydCBUZXh0IGZyb20gXCIuL1RleHRcIjtcbmltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9DaGVja2JveFwiO1xuaW1wb3J0IFJhZGlvIGZyb20gXCIuL1JhZGlvXCI7XG5pbXBvcnQgRmlsZSBmcm9tIFwiLi9GaWxlXCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gXCIuL1NlbGVjdFwiO1xuXG5leHBvcnQgY29uc3Qgd3JhcHBlcnMgPSBbVGV4dCwgQ2hlY2tib3gsIFJhZGlvLCBGaWxlLCBTZWxlY3RdO1xuXG5leHBvcnQgY29uc3QgZmluZFdyYXBwZXIgPSAoZmllbGQpID0+IHtcblx0Zm9yIChsZXQgd3JhcHBlciBvZiB3cmFwcGVycykge1xuXHRcdGNvbnN0IGlucHV0ID0gd3JhcHBlci5maW5kSW5wdXQoZmllbGQpO1xuXHRcdGlmIChpbnB1dCkgcmV0dXJuIG5ldyB3cmFwcGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsXCI7XG5pbXBvcnQge0Zvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIExpc3QsIENvbnRhaW5lciwgQmFzZVN1Ym1pdEFjdGlvbiwgU3VibWl0QWN0aW9uUmVzdWx0fSBmcm9tIFwiLi9pbmRleFwiXG5cbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sID0gR0xPQkFMLmRlZmF1bHRqcy5odG1sIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sLmZvcm0gPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwuZm9ybSB8fCB7XG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcblx0Rm9ybSxcblx0UGFnZSxcblx0QmFzZUZpZWxkLFxuXHRGaWVsZCxcblx0Q29udGFpbmVyLFxuXHRMaXN0LFxuXHRCYXNlU3VibWl0QWN0aW9uLCBcblx0U3VibWl0QWN0aW9uUmVzdWx0XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==