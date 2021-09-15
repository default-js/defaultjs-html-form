/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \******************************************************************************************************************************/
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

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \**************************************************************************************************************************************/
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

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectProperty.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
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

/***/ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \**********************************************************************************************************************************/
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

/***/ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \*******************************************************************************************************************************/
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
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

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
 * @param aTarget:object the target object to merging into
 * @param aSources:object
 *
 * @return object returns the target object
 */
const merge = function (aTarget) {
	for (let i = 1; i < arguments.length; i++) {
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach((aKey) => {
			if (isPojo(aTarget[aKey])) merge(aTarget[aKey], source[aKey]);
			else aTarget[aKey] = source[aKey];
		});
	}

	return aTarget;
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
		enumerable: false
	});
};
const defGet = (o, name, get) => {
	Object.defineProperty(o, name, {
		get,
		configurable: false,
		enumerable: false
	});
};

const defGetSet = (o, name, get, set) => {
	Object.defineProperty(o, name, {
		get,
		set,
		configurable: false,
		enumerable: false
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
	defGetSet
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js ***!
  \***********************************************************************************************************************************/
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

/***/ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutPromise": () => (/* binding */ timeoutPromise),
/* harmony export */   "lazyPromise": () => (/* binding */ lazyPromise),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectUtils */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");


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

/***/ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/UUID.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \************************************************************************************************************************/
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

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Component.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Component.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUID": () => (/* binding */ createUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
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
		id = `${prefix}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__.uuid)()}${suffix}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};


class Component extends HTMLElement {
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
}

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
	
   return `${nodename.toLowerCase()}:${eventType}`;
};


const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix + "-" + attribute, node);
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-html-components/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");

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
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");




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
		if (!this.__form__)
			this.__form__ = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.Form);
		return this.__form__;
	}

	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__.updateActiveState)(this, active);
			this.activeUpdated();
		}
	}

	activeUpdated() {
	}

	get readonly() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__.updateEditableState)(this, !readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}

	readonlyUpdated() { }
	
	get editable(){
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE);		
	}
	
	set editable(editable){		
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__.updateEditableState)(this, editable, !this.ready.resolved);
		this.editableUpdated();		
	}
	
	editableUpdated(){
		this.readonlyUpdated();
	}

	get condition() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID);
	}

	conditionUpdated() {

	}

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
/* harmony export */   "findParentField": () => (/* binding */ findParentField),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_StateHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/StateHelper */ "./src/utils/StateHelper.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Validator */ "./src/Validator.js");






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

class BaseField extends _Base__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Base__WEBPACK_IMPORTED_MODULE_3__["default"].observedAttributes);
	}

	constructor(value = null) {
		super();
		this.__value__ = value;
		this.__valueChanged__ = true;

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
			this.parentField = findParentField(this);
			this.validator = new _Validator__WEBPACK_IMPORTED_MODULE_4__["default"](this);

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
		const value = this.__value__;
		return value != null && typeof value !== "undefined";
	}

	async value() {
		if(arguments.length == 0)
			return this.__value__;
		let value = arguments[0];
		await this.ready;

		if (await this.acceptValue(value)) {
			value = (await this.normalizeValue(value));
			if (this.__value__ != value) {
				this.__value__ = value;
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
		chain.push(this);
		if(this.parentField)
			await this.parentField.childValueChanged(this, chain)
		else
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.valueChanged, chain);
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async updatedValue() {}
	async childValueChanged(child, chain){}
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
		this.__value__ = {};
		const { fields } = this;
		if (fields)
			for (let field of fields) {				
				if (field.name) await field.value(valueHelper(value, field.name));
				else if (field instanceof Container) await field.value(value);
			}
	}

	async childValueChanged(field, chain) {
		await this.ready;
		const name = await field.name;
		const value = await field.value();
		if (name) valueHelper(this.__value__, name, value);
		else if (value != null) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge(this.__value__, value);

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
		this.__valueChanged__ = true;
		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.input, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const value = event.detail ? event.detail : null;
			const valueChanged = !this.__valueChanged__ ? this.__value__ != value :  true;
			if (valueChanged) {
				this.__valueChanged__ = valueChanged;
				this.__value__ = value;
				(async () => {
					await this.validate();
					await this.publishValue();
				})();
			}
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
		
		this.__valueChanged__ = true;
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
		this.__valueChanged__ = true;
		if (this.wrapper) await this.wrapper.updatedValue(value);
	}

	async publishValue(chain = []) {
		if (this.__valueChanged__) {
			await super.publishValue(chain);			
			this.__valueChanged__ = false;
		}
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
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_DefineElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/DefineElement */ "./src/utils/DefineElement.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Message */ "./src/Message.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Control */ "./src/Control.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.js");











const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_USE_SUMMARY_PAGE, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_ENDPOINT, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_METHOD, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_STATE, _Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

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
		return _Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAMES.Form;
	}

	constructor() {
		super();
		this.__data__ = {};
		this.__state__ = null;
		this.on(
			_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.valueChanged,
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_5__.toTimeoutHandle)(
				async (event) => {
					const field = event.target;
					const name = await field.name;
					const value = await field.value();
					if (name) this.__data__[name] = value;
					else if (value != null) _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_2__["default"].merge(this.__data__, value);

					this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.executeValidate, event.detail);
				},
				true,
				true,
			),
		);
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
		}

		this.activePageIndex = -1;
		if (this.pages.length > 0) this.toNextPage();
	}

	get state() {
		return this.__state__;
	}

	set state(state) {
		const actual = this.state;
		if (actual == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input && state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) readonly(this, true);
		else if (actual != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input && state == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		this.__state__ = state;

		if (actual != state) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.formStateChanged);
		this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_STATE, this.__state__);
	}

	get valid() {
		for (let page of this.pages) if (!page.valid) return false;

		return true;
	}

	async data() {
		if (arguments.length == 0) return this.__data__;

		const data = arguments[0];
		await this.ready;

		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) {
			this.__data__ = {}; //data;
			for (let page of this.pages) {
				await page.value(null);// reset all values
				if (page.name) await page.value(data[page.name]);
				else await page.value(data);
			}

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.allPublishValue);
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
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input) this.state = _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input;

			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.siteChanged);
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

	async submit() {
		this.state = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.input : _Constants__WEBPACK_IMPORTED_MODULE_3__.FORMSTATES.finished;
		const data = this.data;

		let endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_ENDPOINT);
		if (endpoint) {
			endpoint = await _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_1__["default"].resolveText(endpoint, data, endpoint);
			const url = new URL(endpoint, location.href);

			return await fetch(url.toString(), {
				method: (this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_METHOD) || "post").toLowerCase(),
				credentials: "include",
				mode: "cors",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENTS.submit, data);
	}
}
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

		this.on(
			_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.valueChanged,
				(event) => {
					const row = event.target;
					if (row instanceof _list_Row__WEBPACK_IMPORTED_MODULE_6__["default"]) {
						event.preventDefault();
						event.stopPropagation();
				
						const chain = event.detail;
						this.childValueChanged(row, chain);
					}
				}
		);

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowAdd, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { readonly, __value__ } = this;
			if (!readonly) {
				const row = createRow(this);
				__value__.push(row.value);

				this.validate();
				this.publishValue();
			}
		});

		this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENTS.listRowDelete, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { rows, readonly, __value__ } = this;
			if (!readonly) {
				const row = event.target.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRow);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();
					rows.splice(index, 1);
					__value__.splice(index, 1);

					this.validate();
					this.publishValue();
				}
			}
		});
	}

	async init() {
		await super.init();
		this.__value__ = [];
		const ready = this.ready;
		if (!ready.resolved) {
			this.template = this.find("template").first();
			this.container = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAMES.ListRows).first();
			const { container, template, validator } = this;
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
		this.__value__ = value;

		if(value)
			for (let val of value) await createRow(this, val);
	}

	async childValueChanged(row, chain){
		await this.ready;
		const rows = this.rows;
		const value  = await row.value();

		const index = rows.indexOf(row);
		if(!this.__value__)
			this.__value__ = [];
			
		this.__value__[index] = value;

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
	const data = {};
	data[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTVALUE] = await base.value();

	let row = base.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__.NODENAMES.ListRow);
	let temp = data;
	while (row) {
		temp[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTLISTROW] = await row.value();
		temp = temp[_Constants__WEBPACK_IMPORTED_MODULE_1__.SPECIALVARS.CURRENTLISTROW];
		row = row.parent(_Constants__WEBPACK_IMPORTED_MODULE_1__.NODENAMES.ListRow);
	}

	return _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__["default"].merge( data, await base.form.data());
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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* reexport safe */ _src_Form__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Page": () => (/* reexport safe */ _src_Page__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "BaseField": () => (/* reexport safe */ _src_BaseField__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Field": () => (/* reexport safe */ _src_Field__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "List": () => (/* reexport safe */ _src_List__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Container": () => (/* reexport safe */ _src_Container__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _src_BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/BaseField */ "./src/BaseField.js");
/* harmony import */ var _src_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Field */ "./src/Field.js");
/* harmony import */ var _src_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Container */ "./src/Container.js");
/* harmony import */ var _src_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/List */ "./src/List.js");
/* harmony import */ var _src_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Page */ "./src/Page.js");
/* harmony import */ var _src_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Form */ "./src/Form.js");








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNsQzBCO0FBQ1E7QUFDTjtBQUNGO0FBQ0k7O0FBRXZCLGtCQUFrQiw2Q0FBSSxFQUFFLGlEQUFRLEVBQUUsOENBQUssRUFBRSw2Q0FBSSxFQUFFLCtDQUFNOztBQUVyRDtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNSO0FBQ1E7QUFDVjtBQUNEO0FBQ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL3V0aWxzL1dlYWtEYXRhLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQmFzZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2VGaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0NvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9GaWVsZC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Zvcm0uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvTGlzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9QYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9TdGVwLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvVmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL0JhY2tCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9OZXh0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VibWl0QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvU3VtbWFyeUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9BZGRSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L0RlbGV0ZVJvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9Sb3dzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvRGF0YUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RlZmluZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1JhZGlvLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uIChhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYoIXRhcmdldClcclxuXHRcdHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IG5vVmFsdWUgPSAodmFsdWUpID0+IHtcblx0cmV0dXJuIHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGVtdHB5T3JOb1ZhbHVlU3RyaW5nID0gKHZhbHVlKSA9PiB7XHRcblx0cmV0dXJuIG5vVmFsdWUodmFsdWUpIHx8IHZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRub1ZhbHVlLFxuXHRlbXRweU9yTm9WYWx1ZVN0cmluZ1xufTsiLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xuXHRcdHRoaXMua2V5ID0ga2V5O1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdH1cblx0XG5cdGdldCBrZXlEZWZpbmVkKCl7XG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXG5cdH1cblx0XG5cdGdldCBoYXNWYWx1ZSgpe1xuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xuXHR9XG5cdFxuXHRzZXQgdmFsdWUoZGF0YSl7XG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XG5cdH1cblx0XG5cdHNldCBhcHBlbmQoZGF0YSkge1xuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xuXHRcdH1cblx0fVxuXHRcblx0cmVtb3ZlKCl7XG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcblx0XHRcdFx0aWYoIWNyZWF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xuXHR9XG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICogXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKiAgXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24oYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSlcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqIFxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqIFxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbihhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXIgXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqIFxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICogXHJcbiAqIEBwYXJhbSBhVGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIGFTb3VyY2VzOm9iamVjdFxyXG4gKiBcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24oYVRhcmdldCkge1xyXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goYUtleSA9PiB7XHJcblx0XHRcdGlmIChpc1Bvam8oYVRhcmdldFthS2V5XSkpXHJcblx0XHRcdFx0bWVyZ2UoYVRhcmdldFthS2V5XSwgc291cmNlW2FLZXldKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFUYXJnZXRbYUtleV0gPSBzb3VyY2VbYUtleV07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbih7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwge2RlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpXHJcblx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCJcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XHJcblx0XHRcdFx0fHwgdmFsdWUgaW5zdGFuY2VvZiBNYXBcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldFxyXG5cdFx0XHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwXHJcblx0XHRcdFx0fHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV1cclxuXHRcdFx0XHR8fCB2YWx1ZSA9PSBkYXRhKVxyXG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7ZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiAgcGFyZW50cy5jb25jYXQoZGF0YSl9KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvLFxyXG5cdGFwcGVuZCxcclxuXHRtZXJnZSxcclxuXHRmaWx0ZXIsXHJcblx0YnVpbGRQcm9wZXJ0eUZpbHRlclxyXG59OyIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0bGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHR0cnl7XHJcblx0XHRyZXN1bHQgPSBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZihtYXRjaFtNQVRDSF9FU0NBUEVEXSlcclxuXHRcdHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dOyBcclxuXHRcdFxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn1cclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XFxcIlwiLCBhRXhwcmVzc2lvbiwgXCJcXFwiOlwiLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEXHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdHRlbXAgPSB0ZW1wLnNwbGl0KG1hdGNoWzBdKS5qb2luKCk7IC8vIHJlbW92ZSBjdXJyZW50IG1hdGNoIGZvciBuZXh0IGxvb3BcclxuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQobWF0Y2hbMF0pLmpvaW4odHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAocmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCkpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHtjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb249e2RlZXA6dHJ1ZX0sIG5hbWUsIHBhcmVudH0pe1xyXG5cdFx0Y29udGV4dCA9IE9iamVjdFV0aWxzLmZpbHRlcih7ZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9ufSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7Y29udGV4dCwgbmFtZSwgcGFyZW50fSk7XHJcblx0fVxyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uIChhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIGFUYXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gYVNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uIChhVGFyZ2V0KSB7XHJcblx0Zm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoYUtleSkgPT4ge1xyXG5cdFx0XHRpZiAoaXNQb2pvKGFUYXJnZXRbYUtleV0pKSBtZXJnZShhVGFyZ2V0W2FLZXldLCBzb3VyY2VbYUtleV0pO1xyXG5cdFx0XHRlbHNlIGFUYXJnZXRbYUtleV0gPSBzb3VyY2VbYUtleV07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uICh7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgW2RhdGEsIHByb3BGaWx0ZXIsIHsgZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW10gfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XHJcblx0XHRjb25zdCBhY2NlcHQgPSBwcm9wRmlsdGVyKG5hbWUsIHZhbHVlLCBkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQgJiYgKCFkZWVwIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdGVsc2UgaWYgKGFjY2VwdCAmJiBkZWVwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdGlmICh0eXBlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV0gfHwgdmFsdWUgPT0gZGF0YSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2UgcmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7IGRlZXAsIHJlY3Vyc2l2ZSwgcGFyZW50czogcGFyZW50cy5jb25jYXQoZGF0YSkgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZlZhbHVlID0gKG8sIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdHZhbHVlLFxyXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2VcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXRcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgcHJpdmF0ZVN0b3JlID0gKG9iaikgPT4ge1xyXG5cdGlmKFBSSVZBVEVfUFJPUEVSVElFUy5oYXMob2JqKSlcclxuXHRcdHJldHVybiBQUklWQVRFX1BST1BFUlRJRVMuZ2V0KG9iaik7XHJcblx0XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdFBSSVZBVEVfUFJPUEVSVElFUy5zZXQob2JqLCBkYXRhKTtcclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XHJcblx0Y29uc3QgZGF0YSA9IHByaXZhdGVTdG9yZShvYmopO1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpXHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpXHJcblx0XHRyZXR1cm4gZGF0YVtuYW1lXTtcclxuXHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpXHJcblx0XHRkYXRhW25hbWVdID0gdmFsdWU7XHJcblx0ZWxzZVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IGFsbG93ZWQgc2l6ZSBvZiBhcmd1bWVudHMhXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eX0iLCJpbXBvcnQge2RlZlZhbHVlLCBkZWZHZXR9IGZyb20gXCIuL09iamVjdFV0aWxzXCJcclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IChmbiwgbXMpID0+e1xyXG5cdGxldCBjYW5jZWxlZCA9IGZhbHNlO1xyXG5cdGxldCB0aW1lb3V0ID0gbnVsbDtcclxuXHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT4ge1xyXG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0Zm4ocixlKTtcclxuXHRcdH0sIG1zKVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0aGVuID0gcHJvbWlzZS50aGVuO1xyXG5cdHByb21pc2UudGhlbiA9IChmbikgPT4ge1xyXG5cdFx0dGhlbi5jYWxsKHByb21pc2UsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYoIXRoaXMuY2FuY2VsZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZuKHJlc3VsdCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZlZhbHVlKHByb21pc2UsIFwiY2FuY2VsXCIsICgpID0+IHtcclxuXHRcdGlmKHRpbWVvdXQpe1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdGNhbmNlbGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRkZWZHZXQocHJvbWlzZSwgY2FuY2VsZCwgKCkgPT4gY2FuY2VsZWQpO1xyXG5cclxuXHRyZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBsYXp5UHJvbWlzZSA9ICgpID0+IHtcclxuXHRcdGxldCBwcm9taXNlUmVzb2x2ZSA9IG51bGw7XHJcblx0XHRsZXQgcHJvbWlzZUVycm9yID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdFx0cHJvbWlzZVJlc29sdmUgPSByO1xyXG5cdFx0XHRwcm9taXNlRXJyb3IgPSBlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXJyb3IgPSBmYWxzZTtcclxuXHRcdGxldCB2YWx1ZSA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRkZWZWYWx1ZShwcm9taXNlLCBcInJlc29sdmVcIiwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHR2YWx1ZSA9IHJlc3VsdDtcclxuXHRcdFx0cmVzb2x2ZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xyXG5cdFx0XHRcdGVycm9yID0gdHJ1ZTtcclxuXHRcdFx0XHRwcm9taXNlRXJyb3IodmFsdWUpO1xyXG5cdFx0XHR9IGVsc2UgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwidmFsdWVcIiwgKCkgPT4gdmFsdWUpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwiZXJyb3JcIiwgKCkgPT4gZXJyb3IpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwicmVzb2x2ZWRcIiwgKCkgPT4gcmVzb2x2ZWQpO1xyXG5cclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0bGF6eVByb21pc2UsXHJcblx0dGltZW91dFByb21pc2VcclxufVxyXG4iLCIvL3RoZSBzb2x1dGlvbiBpcyBmb3VuZCBoZXJlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZFxyXG5leHBvcnQgY29uc3QgVVVJRF9TQ0hFTUEgPSBcInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHV1aWQgPSAoKSA9PiB7XHJcblx0Y29uc3QgYnVmID0gbmV3IFVpbnQzMkFycmF5KDQpO1xyXG5cdHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ1Zik7XHJcblx0bGV0IGlkeCA9IC0xO1xyXG5cdHJldHVybiBVVUlEX1NDSEVNQS5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XHJcblx0XHRpZHgrKztcclxuXHRcdGNvbnN0IHIgPSAoYnVmW2lkeCA+PiAzXSA+PiAoKGlkeCAlIDgpICogNCkpICYgMTU7XHJcblx0XHRjb25zdCB2ID0gYyA9PSBcInhcIiA/IHIgOiAociAmIDB4MykgfCAweDg7XHJcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHV1aWQgfTtcclxuIiwiaW1wb3J0IHtwcml2YXRlUHJvcGVydHkgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHNcIjtcbmltcG9ydCB7IHV1aWQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRFwiO1xuaW1wb3J0IHsgaW5pdFRpbWVvdXQsIHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV2Vha0RhdGEgZnJvbSBcIi4vdXRpbHMvV2Vha0RhdGFcIjtcblxuY29uc3QgUFJJVkFURV9SRUFEWSA9IFwicmVhZHlcIjtcblxuY29uc3QgVElNRU9VVFMgPSBuZXcgV2Vha0RhdGEoKTtcbmNvbnN0IGluaXQgPSAoY29tcG9uZW50KSA9PiB7XG5cdGNvbnN0IGRhdGEgPSBUSU1FT1VUUy5kYXRhKGNvbXBvbmVudCk7XG5cdGlmIChkYXRhLmluaXRpYWxpemUpIGNsZWFyVGltZW91dChkYXRhLmluaXRpYWxpemUpO1xuXG5cdGRhdGEuaW5pdGlhbGl6ZSA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdGRlbGV0ZSBkYXRhLmluaXRpYWxpemU7XG5cblx0XHRhd2FpdCBjb21wb25lbnQuaW5pdCgpO1xuXHRcdGNvbXBvbmVudC5yZWFkeS5yZXNvbHZlKCk7XG5cdFx0Y29tcG9uZW50LnRyaWdnZXIoY29tcG9uZW50RXZlbnRuYW1lKFwiaW5pdGlhbHplZFwiLCBjb21wb25lbnQpKTtcblx0fSwgaW5pdFRpbWVvdXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuICAgIHdoaWxlKGNvdW50IDwgMTAwKXtcblx0XHRpZCA9IGAke3ByZWZpeH0ke3V1aWQoKX0ke3N1ZmZpeH1gO1xuXHRcdGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpXG5cdFx0XHRyZXR1cm4gaWQ7XG5cblx0XHRjb3VudCsrO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcblx0cmV0dXJuIGlkO1xufTtcblxuXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHtzaGFkb3dSb290ID0gZmFsc2UsIGNvbnRlbnQgPSBudWxsLCBjcmVhdGVVSUQgPSBmYWxzZSwgdWlkUHJlZml4ID0gXCJpZC1cIiwgdWlkU3VmZml4ID0gXCJcIn0gPSB7fSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0cHJpdmF0ZVByb3BlcnR5KHRoaXMsIFBSSVZBVEVfUkVBRFksIGxhenlQcm9taXNlKCkpO1xuXG5cdFx0aWYoY3JlYXRlVUlEKVxuXHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cblx0XHRpZihzaGFkb3dSb290KVxuXHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6b3Blbn0pO1xuXHRcdFxuXHRcdGlmKGNvbnRlbnQpXG5cdFx0XHR0aGlzLnJvb3QuYXBwZW5kKHR5cGVvZiBjb250ZW50ID09PSBcImZ1bmN0aW9uXCIgPyBjb250ZW50KHRoaXMpIDogY29udGVudCk7XG5cdH1cblxuXHRnZXQgcm9vdCgpe1xuXHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0fVxuXG5cdGdldCByZWFkeSgpe1xuXHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkodGhpcywgUFJJVkFURV9SRUFEWSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge31cblxuXHRhc3luYyBkZXN0cm95KCkge1xuXHRcdGlmKHRoaXMucmVhZHkucmVzb2x2ZWQpXG5cdFx0XHRwcml2YXRlUHJvcGVydHkodGhpcywgUFJJVkFURV9SRUFEWSwgbGF6eVByb21pc2UoKSk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRpZiAodGhpcy5vd25lckRvY3VtZW50ID09IGRvY3VtZW50KSBpbml0KHRoaXMpO1xuXHR9XG5cblx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2soKTtcblx0fVxuXG5cdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBjb21wb25lbnRFdmVudG5hbWUoXCJjaGFuZ2VcIiwgdGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7XG5cdFx0dGhpcy5kZXN0cm95KCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIiwiZXhwb3J0IGNvbnN0IGNvbXBvbmVudFByZWZpeCA9IFwiZC1cIjtcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeCA9IFwiYXR0cmlidXRlLVwiO1xuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTAwO1xuZXhwb3J0IGNvbnN0IHRyaWdnZXJUaW1lb3V0ID0gMTAwO1xuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSApID0+IHtcdFxuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IodHlwZW9mIG5vZGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkIGFzIHByYW0gbm9kZSFcIik7XG5cdFxuICAgcmV0dXJuIGAke25vZGVuYW1lLnRvTG93ZXJDYXNlKCl9OiR7ZXZlbnRUeXBlfWA7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgPSAoYXR0cmlidXRlLCBub2RlICkgPT4ge1xuICAgIHJldHVybiBjb21wb25lbnRFdmVudG5hbWUoYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggKyBcIi1cIiArIGF0dHJpYnV0ZSwgbm9kZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9IiwiaW1wb3J0IHsgZGVmVmFsdWUgfSBmcm9tXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vha0RhdGEge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkZWZWYWx1ZSh0aGlzLCBcIndlYWttYXBcIiwgbmV3IFdlYWtNYXAoKSk7XG5cdH1cblxuXHRkYXRhKHJlZmVyZW5jZSkge1xuXHRcdGxldCBkYXRhID0gdGhpcy53ZWFrbWFwLmdldChyZWZlcmVuY2UpO1xuXHRcdGlmICghZGF0YSkge1xuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0dGhpcy53ZWFrbWFwLnNldChyZWZlcmVuY2UsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHZhbHVlKHJlZmVyZW5jZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHJldHVybiB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldO1xuXHRcdGVsc2UgdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XSA9IHZhbHVlO1xuXHR9XG59O1xuXG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIFRSSUdHRVJfVElNRU9VVCwgRVZFTlRTLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgQVRUUklCVVRFX0VESVRBQkxFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTl07XG5cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0fVxuXG5cdGdldCBmb3JtKCkge1xuXHRcdGlmICghdGhpcy5fX2Zvcm1fXylcblx0XHRcdHRoaXMuX19mb3JtX18gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0cmV0dXJuIHRoaXMuX19mb3JtX187XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcblx0XHRcdHRoaXMuYWN0aXZlVXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdGFjdGl2ZVVwZGF0ZWQoKSB7XG5cdH1cblxuXHRnZXQgcmVhZG9ubHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRUFET05MWSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsICFyZWFkb25seSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xuXHRcdHRoaXMucmVhZG9ubHlVcGRhdGVkKCk7XG5cdH1cblxuXHRyZWFkb25seVVwZGF0ZWQoKSB7IH1cblx0XG5cdGdldCBlZGl0YWJsZSgpe1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRURJVEFCTEUpO1x0XHRcblx0fVxuXHRcblx0c2V0IGVkaXRhYmxlKGVkaXRhYmxlKXtcdFx0XG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCBlZGl0YWJsZSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xuXHRcdHRoaXMuZWRpdGFibGVVcGRhdGVkKCk7XHRcdFxuXHR9XG5cdFxuXHRlZGl0YWJsZVVwZGF0ZWQoKXtcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xuXHR9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge1xuXG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSwgQVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSBcIi4vVmFsaWRhdG9yXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEZpZWxkID0gKGZpZWxkKSA9PiB7XG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHBhcmVudDtcblxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XG5cdGZpZWxkLmF0dHIoQVRUUklCVVRFX05PVkFMVUUsICFoYXNWYWx1ZSA/IFwiXCIgOiBudWxsKTtcbn07XG5cbmNsYXNzIEJhc2VGaWVsZCBleHRlbmRzIEJhc2Uge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZS5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXHRcdHRoaXMuX192YWx1ZUNoYW5nZWRfXyA9IHRydWU7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5jb25kaXRpb25TdGF0ZUNoYW5nZWQsIChldmVudCkgPT4ge1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMucGFyZW50RmllbGQgPSBmaW5kUGFyZW50RmllbGQodGhpcyk7XG5cdFx0XHR0aGlzLnZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IodGhpcyk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLCBhc3luYyAoZXZlbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBldmVudC5kZXRhaWw7XG5cdFx0XHRcdGlmIChjaGFpbi5pbmRleE9mKHRoaXMpIDwgMCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLnZhbGlkO1xuXHRcdFx0XHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50ICE9IHZhbGlkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZm9ybS5vbihFVkVOVFMuYWxsUHVibGlzaFZhbHVlLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdH1cblxuXHRjb25kaXRpb25VcGRhdGVkKCkge1xuXHRcdHRoaXMuYWN0aXZlID0gdGhpcy5jb25kaXRpb247XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX05BTUUpO1xuXHR9XG5cblx0Z2V0IHJlcXVpcmVkKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVRVUlSRUQpO1xuXHR9XG5cblx0Z2V0IGhhc1ZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5fX3ZhbHVlX187XG5cdFx0cmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiO1xuXHR9XG5cblx0YXN5bmMgdmFsdWUoKSB7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIHRoaXMuX192YWx1ZV9fO1xuXHRcdGxldCB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXG5cdFx0aWYgKGF3YWl0IHRoaXMuYWNjZXB0VmFsdWUodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IChhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKSk7XG5cdFx0XHRpZiAodGhpcy5fX3ZhbHVlX18gIT0gdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5fX3ZhbHVlX18gPSB2YWx1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVkVmFsdWUodmFsdWUpO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0XHRcdH1cdFx0XHRcblx0XHR9XG5cdH1cblxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcblx0XHR1cGRhdGVIYXNWYWx1ZSh0aGlzLmhhc1ZhbHVlLCB0aGlzKTtcblx0XHRpZiAoIXRoaXMudmFsaWRhdG9yKSByZXR1cm4gZmFsc2U7XG5cblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKCk7XG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9XG5cblx0YXN5bmMgcHVibGlzaFZhbHVlKGNoYWluID0gW10pIHtcblx0XHRjaGFpbi5wdXNoKHRoaXMpO1xuXHRcdGlmKHRoaXMucGFyZW50RmllbGQpXG5cdFx0XHRhd2FpdCB0aGlzLnBhcmVudEZpZWxkLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIGNoYWluKVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMudmFsdWVDaGFuZ2VkLCBjaGFpbik7XG5cdH1cblxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUoKSB7fVxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChjaGlsZCwgY2hhaW4pe31cbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcbiIsImV4cG9ydCBjb25zdCBIVE1MX1RBR19QUkVGSVggPSBcImQtXCI7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xuZXhwb3J0IGNvbnN0IEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgPSA1MCAqIEVWRU5USEFORExFX1RJTUVPVVQ7XG5cbmV4cG9ydCBjb25zdCBOT0RFTkFNRVMgPSB7XG5cdEZvcm06IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybVwiLFxuXHRDb250cm9sOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2xcIixcblx0QmFja0J1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLWJhY2tcIixcblx0TmV4dEJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLW5leHRcIixcblx0U3VtbWFyeUJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLXN1bW1hcnlcIixcblx0U3VibWl0QnV0dG9uOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRyb2wtc3VibWl0XCIsXG5cdENhbmNlbEJ1dHRvbjogSFRNTF9UQUdfUFJFRklYICsgXCJjb250cm9sLWNhbmNlbFwiLFxuXHRQYWdlOiBIVE1MX1RBR19QUkVGSVggKyBcInBhZ2VcIixcblx0RmllbGQ6IEhUTUxfVEFHX1BSRUZJWCArIFwiZmllbGRcIixcblx0V3JhcHBlckZpZWxkOiBIVE1MX1RBR19QUkVGSVggKyBcIndyYXBwZXItZmllbGRcIixcblx0TGlzdDogSFRNTF9UQUdfUFJFRklYICsgXCJsaXN0XCIsXG5cdExpc3RSb3dzOiBIVE1MX1RBR19QUkVGSVggKyBcInJvd3NcIixcblx0TGlzdFJvdzogSFRNTF9UQUdfUFJFRklYICsgXCJyb3dcIixcblx0QnV0dG9uQWRkUm93OiBIVE1MX1RBR19QUkVGSVggKyBcImFkZC1yb3dcIixcblx0QnV0dG9uRGVsZXRlUm93OiBIVE1MX1RBR19QUkVGSVggKyBcImRlbGV0ZS1yb3dcIixcblx0Q29udGFpbmVyOiBIVE1MX1RBR19QUkVGSVggKyBcImNvbnRhaW5lclwiLFxuXHRWYWxpZGF0aW9uOiBIVE1MX1RBR19QUkVGSVggKyBcInZhbGlkYXRpb25cIixcblx0TWVzc2FnZTogSFRNTF9UQUdfUFJFRklYICsgXCJtZXNzYWdlXCIsXG5cdFByb2dyZXNzQmFyOiBIVE1MX1RBR19QUkVGSVggKyBcInByb2dyZXNzLWJhclwiLFxuXHRTdGVwOiBIVE1MX1RBR19QUkVGSVggKyBcInN0ZXBcIixcbn07XG5leHBvcnQgY29uc3QgRk9STVNUQVRFUyA9IHtcblx0aW5pdDogXCJpbml0XCIsXG5cdGlucHV0OiBcImlucHV0XCIsXG5cdHN1bW1hcnk6IFwic3VtbWFyeVwiLFxuXHRmaW5pc2hlZDogXCJmaW5pc2hlZFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEU1RBVEVTID0ge1xuXHRhbHdheXM6IFwiYWx3YXlzXCIsXG5cdG9uQWN0aXZlOiBcIm9uLWFjdGl2ZVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1BSRUZJWCA9IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybS1cIjtcblxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IHtcblx0aW5pdGlhbGl6ZTogRVZFTlRfUFJFRklYICsgXCJpbml0aWFsaXplXCIsXG5cdC8qIGZpcmVkIGJ5IGNoYW5nZSB2YWx1ZSBmcm9tIGFuIGZpZWxkIGltcGxlbWVudGF0aW9uXG5cdCAqIGFuZCBjb25zdW1lZCBieSB0aGUgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mXG5cdCAqIEJhc2VGaWVsZCB0byBtYWtlIHZhbGlkYXRpb24gYW5kIGZpcmUgdmFsdWVDaGFuZ2VkXG5cdCAqIGV2ZW50XG5cdCAqL1xuXHRpbnB1dDogRVZFTlRfUFJFRklYICsgXCJmaWVsZC1pbnB1dFwiLFxuXHQvKiBpbnRlcm5hbCBldmVudCBmb3IgcHVibGlzaCB0aGF0IGEgdmFsdWUgb2YgZmllbGQgaGFzIGNoYW5nZWQgKGV2ZW50IGFmdGVyIHZhbGlkYXRpb24pICovXG5cdHZhbHVlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJmaWVsZC12YWx1ZS1jaGFuZ2VkXCIsXG5cdC8qIGludGVybmFsIGV2ZW50IHRvIHN0YXJ0IHZhbGlkYXRpb24gYXQgZWxlbWVudHMgLT4gb25seSBmaXJlZCBhdCBmb3JtKi9cblx0ZXhlY3V0ZVZhbGlkYXRlOiBFVkVOVF9QUkVGSVggKyBcImV4ZWN1dGUtdmFsaWRhdGVcIixcblx0LyogKi9cblx0YWN0aXZlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImFjdGl2ZS1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdGNvbmRpdGlvblN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJjb25kaXRpb24tc3RhdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHR2YWxpZFN0YXRlQ2hhbmdlZDogRVZFTlRfUFJFRklYICsgXCJ2YWxpZC1zdGF0ZS1jaGFuZ2VkXCIsXG5cdC8qICovXG5cdHNpdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcInNpdGUtY2hhbmdlZFwiLFxuXHQvKiAqL1xuXHRmb3JtU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcInN0YXRlLWNoYW5nZWRcIixcblx0LyogKi9cblx0YWxsUHVibGlzaFZhbHVlOiBFVkVOVF9QUkVGSVggKyBcImFsbC1wdWJsaXNoLXZhbHVlXCIsXG5cdC8qICovXG5cdHN1Ym1pdDogRVZFTlRfUFJFRklYICsgXCJzdWJtaXRcIixcblx0LyogKi9cblx0cHJvZ3Jlc3NiYXJDaGFuZ2VkIDogRVZFTlRfUFJFRklYICsgXCJwcm9ncmVzcy1iYXItY2hhbmdlZFwiLFxuXG5cdC8vb2xkIG5lZWQgdG8gYmUgcmVmYWN0b3JlZFxuXG5cdGFkZGVkOiBFVkVOVF9QUkVGSVggKyBcImFkZGVkXCIsXG5cdGNoYW5nZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2VcIixcblx0Y2hhbmdlQXR0cmlidXRlRXZlbnRCdWlsZGVyOiAobmFtZSkgPT4ge1xuXHRcdHJldHVybiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS1hdHRyaWJ1dGUtXCIgKyBuYW1lO1xuXHR9LFxuXHRjaGFuZ2VBY3RpdmU6IEVWRU5UX1BSRUZJWCArIFwiY2hhbmdlLWFjdGl2ZVwiLFxuXHRjaGFuZ2VWYWx1ZTogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtdmFsdWVcIixcblx0Y2hhbmdlQ29uZGl0aW9uOiBFVkVOVF9QUkVGSVggKyBcImNoYW5nZS1jb25kaXRpb25cIixcblx0Y2hhbmdlVmFsaWRhdGlvbjogRVZFTlRfUFJFRklYICsgXCJjaGFuZ2UtdmFsaWRhdGlvblwiLFxuXG5cdC8vTElTVCBFVkVOVFNcblx0bGlzdFJvd0FkZDogRVZFTlRfUFJFRklYICsgXCJsaXN0LXJvdy1hZGRcIixcblx0bGlzdFJvd0RlbGV0ZTogRVZFTlRfUFJFRklYICsgXCJsaXN0LXJvdy1kZWxldGVcIixcblx0XG5cdGVkaXRhYmxlU3RhdGVDaGFuZ2VkOiBFVkVOVF9QUkVGSVggKyBcImVkaXRhYmxlLXN0YXRlLWNoYW5nZWRcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNQRUNJQUxWQVJTID0ge1xuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCIsXG59O1xuXG4vL0FUVFJJQlVURVNcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OQU1FID0gXCJuYW1lXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VORFBPSU5UID0gXCJlbmRwb2ludFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NRVRIT0QgPSBcIm1ldGhvZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEFURSA9IFwic3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQgPSBcImlucHV0LW1vZGUtYWZ0ZXItc3VibWl0XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEID0gXCJyZXF1aXJlZFwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSA9IFwicmVxdWlyZWQtb24tYWN0aXZlLW9ubHlcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VESVRBQkxFID0gXCJlZGl0YWJsZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04gPSBcImVkaXRhYmxlLWNvbmRpdGlvblwiO1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRUFET05MWSA9IFwicmVhZG9ubHlcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTk9WQUxVRSA9IFwibm8tdmFsdWVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMSUQgPSBcInZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOVkFMSUQgPSBcImludmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElEID0gXCJjb25kaXRpb24tdmFsaWRcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQgPSBcImNvbmRpdGlvbi1pbnZhbGlkXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01BWCA9IFwibWF4XCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiO1xuIiwiaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xuaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xuXG5jb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uIChkYXRhLCBuYW1lLCB2YWx1ZSkge1xuXHRpZiAoZGF0YSA9PSBudWxsIHx8IHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCB1cGRhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcblxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XG5cdHdoaWxlIChuYW1lcy5sZW5ndGggPiAxKSB7XG5cdFx0Y29uc3Qga2V5ID0gbmFtZXMuc2hpZnQoKTtcblx0XHRsZXQgdGVtcCA9IGRhdGFba2V5XTtcblx0XHRjb25zdCBoYXMgPSB0eXBlb2YgdGVtcCAhPT0gXCJ1bmRlZmllbmRcIiAmJiB0ZW1wICE9IG51bGw7XG5cdFx0aWYgKCFoYXMgJiYgIXVwZGF0ZSkgcmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAoIWhhcyAmJiB1cGRhdGUpIHRlbXAgPSBkYXRhW2tleV0gPSB7fTtcblxuXHRcdGRhdGEgPSB0ZW1wO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSkgZGF0YVtuYW1lc1swXV0gPSB2YWx1ZTtcblx0ZWxzZSByZXR1cm4gZGF0YVtuYW1lc1swXV0gPyBkYXRhW25hbWVzWzBdXSA6IG51bGw7XG59O1xuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQ29udGFpbmVyO1xuXHR9XG5cblx0Y29uc3RydWN0b3IodmFsdWUgPSBudWxsKSB7XG5cdFx0c3VwZXIodmFsdWUgPyB2YWx1ZSA6IHt9KTtcblx0XHR0aGlzLmZpZWxkcyA9IFtdO1xuXHRcdHRoaXMub24oRVZFTlRTLnZhbHVlQ2hhbmdlZCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGNvbnN0IGNoYWluID0gZXZlbnQuZGV0YWlsO1xuXHRcdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCBjaGFpbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5maWVsZHMgPSBmaW5kRmllbGRzKHRoaXMpO1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMub24oRVZFTlRTLmluaXRpYWxpemUsIChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IHRoaXMpIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpZWxkcy5pbmRleE9mKGZpZWxkKSA8IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5maWVsZHMucHVzaChmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLnZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoeyBkYXRhLCBiYXNlIH0pID0+IHtcblx0XHRcdFx0Y29uc3QgeyBmaWVsZHMgfSA9IGJhc2U7XG5cdFx0XHRcdGlmIChmaWVsZHMpIHtcblx0XHRcdFx0XHRjb25zdCBsZW5ndGggPSBmaWVsZHMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGZpZWxkLmNvbmRpdGlvbiAmJiAhZmllbGQudmFsaWQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XG5cdFx0aWYgKGZpZWxkcylcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xuXHRcdFx0fVxuXHR9XG5cblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy5fX3ZhbHVlX18gPSB7fTtcblx0XHRjb25zdCB7IGZpZWxkcyB9ID0gdGhpcztcblx0XHRpZiAoZmllbGRzKVxuXHRcdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XHRcdFx0XHRcblx0XHRcdFx0aWYgKGZpZWxkLm5hbWUpIGF3YWl0IGZpZWxkLnZhbHVlKHZhbHVlSGVscGVyKHZhbHVlLCBmaWVsZC5uYW1lKSk7XG5cdFx0XHRcdGVsc2UgaWYgKGZpZWxkIGluc3RhbmNlb2YgQ29udGFpbmVyKSBhd2FpdCBmaWVsZC52YWx1ZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdH1cblxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgY2hhaW4pIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IG5hbWUgPSBhd2FpdCBmaWVsZC5uYW1lO1xuXHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcblx0XHRpZiAobmFtZSkgdmFsdWVIZWxwZXIodGhpcy5fX3ZhbHVlX18sIG5hbWUsIHZhbHVlKTtcblx0XHRlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSBPYmplY3RVdGlscy5tZXJnZSh0aGlzLl9fdmFsdWVfXywgdmFsdWUpO1xuXG5cdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdHRoaXMucHVibGlzaFZhbHVlKGNoYWluKTtcblx0fVxufVxuXG5kZWZpbmVFbGVtZW50KENvbnRhaW5lcik7XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iLCJpbXBvcnQgeyBGT1JNU1RBVEVTLCBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgXCIuL2NvbnRyb2xzXCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEJVVFRPTkRVTU1ZID0ge1xuXHRhY3RpdmU6IHRydWUsXG5cdGRpc2FibGVkOiB0cnVlLFxufTtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xuY2xhc3MgQ29udHJvbCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkNvbnRyb2w7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0aWYgKCF0aGlzLnJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0XHR0aGlzLmJhY2sgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLkJhY2tCdXR0b24pLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cdFx0XHR0aGlzLm5leHQgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLk5leHRCdXR0b24pLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cdFx0XHR0aGlzLnN1bW1hcnkgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLlN1bW1hcnlCdXR0b24pLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XG5cdFx0XHR0aGlzLnN1Ym1pdCA9IHRoaXMuZmluZChOT0RFTkFNRVMuU3VibWl0QnV0dG9uKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xuXG5cdFx0XHR0aGlzLmZvcm0ub24oW0VWRU5UUy52YWxpZFN0YXRlQ2hhbmdlZCwgRVZFTlRTLmNvbmRpdGlvblN0YXRlQ2hhbmdlZF0sIChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgUGFnZSkgdGhpcy51cGRhdGUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmZvcm0ub24oW0VWRU5UUy5mb3JtU3RhdGVDaGFuZ2VkLCBFVkVOVFMuc2l0ZUNoYW5nZWRdLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHRjb25zdCB7IGJhY2ssIG5leHQsIHN1bW1hcnksIHN1Ym1pdCwgZm9ybSB9ID0gdGhpcztcblx0XHRjb25zdCB7IGFjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgbmV4dFBhZ2UsIHBhZ2VzLCB1c2VTdW1tYXJ5UGFnZSwgc3RhdGUgfSA9IGZvcm07XG5cblx0XHQvLyBiYXNpYyBjb250cm9sIHNldHVwXG5cdFx0YmFjay5hY3RpdmUgPSB0cnVlO1xuXHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xuXHRcdG5leHQuYWN0aXZlID0gZmFsc2U7XG5cdFx0bmV4dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0c3VtbWFyeS5hY3RpdmUgPSBmYWxzZTtcblx0XHRzdW1tYXJ5LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRzdWJtaXQuYWN0aXZlID0gZmFsc2U7XG5cdFx0c3VibWl0LmRpc2FibGVkID0gdHJ1ZTtcblxuXHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVTLmZpbmlzaGVkKSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRiYWNrLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2VJbmRleCA8PSAwO1xuXG5cdFx0XHRpZiAobmV4dFBhZ2UgfHwgKCFhY3RpdmVQYWdlLnZhbGlkICYmIGFjdGl2ZVBhZ2VJbmRleCArIDEgPCBwYWdlcy5sZW5ndGgpKSB7XG5cdFx0XHRcdG5leHQuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0bmV4dC5kaXNhYmxlZCA9ICFhY3RpdmVQYWdlLnZhbGlkO1xuXHRcdFx0fSBlbHNlIGlmICh1c2VTdW1tYXJ5UGFnZSAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVTLmlucHV0KSB7XG5cdFx0XHRcdHN1bW1hcnkuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0c3VtbWFyeS5kaXNhYmxlZCA9ICFhY3RpdmVQYWdlLnZhbGlkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuZGVmaW5lRWxlbWVudChDb250cm9sKTtcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2w7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VUIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IHsgZmluZFdyYXBwZXIgfSBmcm9tIFwiLi93cmFwcGVyXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXCJmaWxlLWZvcm1hdFwiXTtcblxuY2xhc3MgRmllbGQgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuRmllbGQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX192YWx1ZUNoYW5nZWRfXyA9IHRydWU7XG5cdFx0dGhpcy5vbihFVkVOVFMuaW5wdXQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbCA/IGV2ZW50LmRldGFpbCA6IG51bGw7XG5cdFx0XHRjb25zdCB2YWx1ZUNoYW5nZWQgPSAhdGhpcy5fX3ZhbHVlQ2hhbmdlZF9fID8gdGhpcy5fX3ZhbHVlX18gIT0gdmFsdWUgOiAgdHJ1ZTtcblx0XHRcdGlmICh2YWx1ZUNoYW5nZWQpIHtcblx0XHRcdFx0dGhpcy5fX3ZhbHVlQ2hhbmdlZF9fID0gdmFsdWVDaGFuZ2VkO1xuXHRcdFx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXHRcdFx0XHQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGUoKTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xuXHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdFxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0dGhpcy53cmFwcGVyID0gZmluZFdyYXBwZXIodGhpcyk7XG5cdFx0XHRpZiAodGhpcy53cmFwcGVyKVxuXHRcdFx0XHR0aGlzLnZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMud3JhcHBlci52YWxpZDtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuX192YWx1ZUNoYW5nZWRfXyA9IHRydWU7XG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUoKTtcblx0fVxuXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKSB0aGlzLndyYXBwZXIucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuXHR9XG5cblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gdGhpcy53cmFwcGVyID8gdGhpcy53cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xuXHR9XG5cblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy53cmFwcGVyKSByZXR1cm4gdGhpcy53cmFwcGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1x0XHRcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1x0XHRcblx0XHR0aGlzLl9fdmFsdWVDaGFuZ2VkX18gPSB0cnVlO1xuXHRcdGlmICh0aGlzLndyYXBwZXIpIGF3YWl0IHRoaXMud3JhcHBlci51cGRhdGVkVmFsdWUodmFsdWUpO1xuXHR9XG5cblx0YXN5bmMgcHVibGlzaFZhbHVlKGNoYWluID0gW10pIHtcblx0XHRpZiAodGhpcy5fX3ZhbHVlQ2hhbmdlZF9fKSB7XG5cdFx0XHRhd2FpdCBzdXBlci5wdWJsaXNoVmFsdWUoY2hhaW4pO1x0XHRcdFxuXHRcdFx0dGhpcy5fX3ZhbHVlQ2hhbmdlZF9fID0gZmFsc2U7XG5cdFx0fVxuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoRmllbGQpO1xuZXhwb3J0IGRlZmF1bHQgRmllbGQ7XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IEZPUk1TVEFURVMsIE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xuaW1wb3J0IFwiLi9QYWdlXCI7XG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVRdO1xuXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xuXHRmb3IgKGxldCBwYWdlIG9mIGZvcm0ucGFnZXMpIHtcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcblx0fVxufTtcblxuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLkZvcm07XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX19kYXRhX18gPSB7fTtcblx0XHR0aGlzLl9fc3RhdGVfXyA9IG51bGw7XG5cdFx0dGhpcy5vbihcblx0XHRcdEVWRU5UUy52YWx1ZUNoYW5nZWQsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdGFzeW5jIChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBhd2FpdCBmaWVsZC5uYW1lO1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcblx0XHRcdFx0XHRpZiAobmFtZSkgdGhpcy5fX2RhdGFfX1tuYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIE9iamVjdFV0aWxzLm1lcmdlKHRoaXMuX19kYXRhX18sIHZhbHVlKTtcblxuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVFMuZXhlY3V0ZVZhbGlkYXRlLCBldmVudC5kZXRhaWwpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuaW5pdDtcblx0XHRjb25zdCByZWFkeSA9IHRoaXMucmVhZHk7XG5cdFx0aWYgKCFyZWFkeS5yZXNvbHZlZCkge1xuXHRcdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XG5cblx0XHRcdHRoaXMudXNlU3VtbWFyeVBhZ2UgPSB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSk7XG5cdFx0XHR0aGlzLnBhZ2VzID0gdGhpcy5maW5kKE5PREVOQU1FUy5QYWdlKTtcblx0XHR9XG5cblx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xuXHRcdGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA+IDApIHRoaXMudG9OZXh0UGFnZSgpO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzLl9fc3RhdGVfXztcblx0fVxuXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHJlYWRvbmx5KHRoaXMsIHRydWUpO1xuXHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVTLmlucHV0ICYmIHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHJlYWRvbmx5KHRoaXMsIGZhbHNlKTtcblx0XHRcdGlmICh0aGlzLmFjdGl2ZVBhZ2UpIHRoaXMuYWN0aXZlUGFnZS5hY3RpdmUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLl9fc3RhdGVfXyA9IHN0YXRlO1xuXG5cdFx0aWYgKGFjdHVhbCAhPSBzdGF0ZSkgdGhpcy50cmlnZ2VyKEVWRU5UUy5mb3JtU3RhdGVDaGFuZ2VkKTtcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1NUQVRFLCB0aGlzLl9fc3RhdGVfXyk7XG5cdH1cblxuXHRnZXQgdmFsaWQoKSB7XG5cdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSBpZiAoIXBhZ2UudmFsaWQpIHJldHVybiBmYWxzZTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0YXN5bmMgZGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm4gdGhpcy5fX2RhdGFfXztcblxuXHRcdGNvbnN0IGRhdGEgPSBhcmd1bWVudHNbMF07XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblxuXHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdHRoaXMuX19kYXRhX18gPSB7fTsgLy9kYXRhO1xuXHRcdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSB7XG5cdFx0XHRcdGF3YWl0IHBhZ2UudmFsdWUobnVsbCk7Ly8gcmVzZXQgYWxsIHZhbHVlc1xuXHRcdFx0XHRpZiAocGFnZS5uYW1lKSBhd2FpdCBwYWdlLnZhbHVlKGRhdGFbcGFnZS5uYW1lXSk7XG5cdFx0XHRcdGVsc2UgYXdhaXQgcGFnZS52YWx1ZShkYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5hbGxQdWJsaXNoVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBhY3RpdmVQYWdlKCkge1xuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZVBhZ2U7XG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCkge1xuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IHRoaXMucGFnZXMuaW5kZXhPZihwYWdlKTtcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURVMuaW5wdXQpIHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLnNpdGVDaGFuZ2VkKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcHJldlBhZ2UoKSB7XG5cdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAtIDE7XG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpID49IDA7IGktLSkge1xuXHRcdFx0Y29uc3QgcGFnZSA9IHRoaXMucGFnZXNbaV07XG5cdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGdldCBuZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy5wYWdlcykge1xuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCArIDE7XG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuXHRcdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFzeW5jIHRvUHJldlBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURVMuaW5wdXQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xuXHRcdFx0aWYgKHByZXYpIHRoaXMuYWN0aXZlUGFnZSA9IHByZXY7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgdG9OZXh0UGFnZSgpIHtcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcblx0XHRpZiAobmV4dCkge1xuXHRcdFx0dGhpcy5hY3RpdmVQYWdlID0gbmV4dDtcblx0XHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURVMuaW5pdCkgdGhpcy5fc3RhdGUgPSBGT1JNU1RBVEVTLmlucHV0O1xuXHRcdH0gZWxzZSBpZiAodGhpcy51c2VTdW1tYXJ5UGFnZSkge1xuXHRcdFx0dGhpcy5zdW1tYXJ5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3VibWl0KCk7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgc3VtbWFyeSgpIHtcblx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFUy5zdW1tYXJ5O1xuXHR9XG5cblx0YXN5bmMgc3VibWl0KCkge1xuXHRcdHRoaXMuc3RhdGUgPSB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQpID8gRk9STVNUQVRFUy5pbnB1dCA6IEZPUk1TVEFURVMuZmluaXNoZWQ7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcblxuXHRcdGxldCBlbmRwb2ludCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfRU5EUE9JTlQpO1xuXHRcdGlmIChlbmRwb2ludCkge1xuXHRcdFx0ZW5kcG9pbnQgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZVRleHQoZW5kcG9pbnQsIGRhdGEsIGVuZHBvaW50KTtcblx0XHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIGxvY2F0aW9uLmhyZWYpO1xuXG5cdFx0XHRyZXR1cm4gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcblx0XHRcdFx0bWV0aG9kOiAodGhpcy5hdHRyKEFUVFJJQlVURV9NRVRIT0QpIHx8IFwicG9zdFwiKS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG5cdFx0XHRcdG1vZGU6IFwiY29yc1wiLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UUy5zdWJtaXQsIGRhdGEpO1xuXHR9XG59XG5kZWZpbmVFbGVtZW50KEZvcm0pO1xuZXhwb3J0IGRlZmF1bHQgRm9ybTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRURdO1xuXG5jbGFzcyBGb3JtQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChidXR0b24pIHtcblx0XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0aWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLmRpc2FibGVkKSB0aGlzLmV4ZWN1dGUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FUy5Gb3JtKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XG5cdH1cblxuXHRnZXQgZGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9ESVNBQkxFRCk7XG5cdH1cblxuXHRzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcblx0XHRkaXNhYmxlZCA/IHRoaXMuYXR0cihBVFRSSUJVVEVfRElTQUJMRUQsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9ESVNBQkxFRCwgbnVsbCk7XG5cdH1cblxuXHRleGVjdXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiZXhlY3V0ZVwiKTtcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybUJ1dHRvbjtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9NQVgsIEFUVFJJQlVURV9JTlZBTElEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgUm93IGZyb20gXCIuL2xpc3QvUm93XCI7XG5pbXBvcnQgQWRkUm93IGZyb20gXCIuL2xpc3QvQWRkUm93XCI7XG5pbXBvcnQgRGVsZXRlUm93IGZyb20gXCIuL2xpc3QvRGVsZXRlUm93XCI7XG5pbXBvcnQgUm93cyBmcm9tIFwiLi9saXN0L1Jvd3NcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTUFYXTtcblxuY29uc3QgZmluZEFkZEJ1dHRvbiA9IChsaXN0KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290OiBsaXN0LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQWRkUm93KSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogZmFsc2UsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KVswXTtcbn07XG5cbmNvbnN0IGNyZWF0ZVJvdyA9IGFzeW5jIChsaXN0LCB2YWx1ZSkgPT4ge1xuXHRjb25zdCB7IGNvbnRhaW5lciwgdGVtcGxhdGUgfSA9IGxpc3Q7XG5cdGNvbnN0IHJvdyA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSkuY2hpbGRyZW5bMF07XG5cdGNvbnRhaW5lci5hcHBlbmQocm93KTtcblxuXHRpZiAodmFsdWUpIGF3YWl0IHJvdy52YWx1ZSh2YWx1ZSk7XG5cblx0cmV0dXJuIHJvdztcbn07XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTGlzdDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHZhbHVlID0gbnVsbCkge1xuXHRcdHN1cGVyKHZhbHVlID8gdmFsdWUgOiBbXSk7XG5cblx0XHR0aGlzLm9uKFxuXHRcdFx0RVZFTlRTLnZhbHVlQ2hhbmdlZCxcblx0XHRcdFx0KGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHRcdGlmIChyb3cgaW5zdGFuY2VvZiBSb3cpIHtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBjaGFpbiA9IGV2ZW50LmRldGFpbDtcblx0XHRcdFx0XHRcdHRoaXMuY2hpbGRWYWx1ZUNoYW5nZWQocm93LCBjaGFpbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0KTtcblxuXHRcdHRoaXMub24oRVZFTlRTLmxpc3RSb3dBZGQsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5LCBfX3ZhbHVlX18gfSA9IHRoaXM7XG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XG5cdFx0XHRcdGNvbnN0IHJvdyA9IGNyZWF0ZVJvdyh0aGlzKTtcblx0XHRcdFx0X192YWx1ZV9fLnB1c2gocm93LnZhbHVlKTtcblxuXHRcdFx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKEVWRU5UUy5saXN0Um93RGVsZXRlLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Y29uc3QgeyByb3dzLCByZWFkb25seSwgX192YWx1ZV9fIH0gPSB0aGlzO1xuXHRcdFx0aWYgKCFyZWFkb25seSkge1xuXHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdFx0XHRyb3cucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cm93cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdF9fdmFsdWVfXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuX192YWx1ZV9fID0gW107XG5cdFx0Y29uc3QgcmVhZHkgPSB0aGlzLnJlYWR5O1xuXHRcdGlmICghcmVhZHkucmVzb2x2ZWQpIHtcblx0XHRcdHRoaXMudGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xuXHRcdFx0dGhpcy5jb250YWluZXIgPSB0aGlzLmZpbmQoTk9ERU5BTUVTLkxpc3RSb3dzKS5maXJzdCgpO1xuXHRcdFx0Y29uc3QgeyBjb250YWluZXIsIHRlbXBsYXRlLCB2YWxpZGF0b3IgfSA9IHRoaXM7XG5cdFx0XHRjb25zdCBhZGRCdXR0b24gPSBmaW5kQWRkQnV0dG9uKHRoaXMpO1xuXG5cdFx0XHR2YWxpZGF0b3IuYWRkQ3VzdG9tQ2hlY2soYXN5bmMgKHt9KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgcm93cywgbWF4LCByZWFkb25seSB9ID0gdGhpcztcblx0XHRcdFx0Y29uc3QgbGVuZ3RoID0gcm93cy5sZW5ndGg7XG5cdFx0XHRcdGlmICghcmVhZG9ubHkpIHtcblx0XHRcdFx0XHRpZiAobGVuZ3RoID09IG1heCkgYWRkQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRlbHNlIGlmIChsZW5ndGggPCBtYXgpIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBsZW5ndGggPD0gbWF4O1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhbGlkYXRvci5hZGRDdXN0b21DaGVjayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgcm93cyB9ID0gdGhpcztcblx0XHRcdFx0aWYgKHJvd3MpXG5cdFx0XHRcdFx0Zm9yIChsZXQgcm93IG9mIHJvd3MpIHtcblx0XHRcdFx0XHRcdGlmICghcm93LnZhbGlkKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHRcdHRoaXMucHVibGlzaFZhbHVlKCk7XG5cdH1cblxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XG5cdFx0Y29uc3QgeyByZWFkb25seSB9ID0gdGhpcztcblx0XHRmb3IgKGxldCByb3cgb2YgdGhpcy5yb3dzKSB7XG5cdFx0XHRyb3cucmVhZG9ubHkgPSByZWFkb25seTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcm93cygpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5jaGlsZHJlbik7XG5cdH1cblxuXHRnZXQgbWF4KCkge1xuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUFYKSkgcmV0dXJuIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUFYKSk7XG5cdFx0cmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gIXZhbHVlIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZSA/IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKSA6IG51bGw7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5yZW1vdmUoKTtcblx0XHR0aGlzLl9fdmFsdWVfXyA9IHZhbHVlO1xuXG5cdFx0aWYodmFsdWUpXG5cdFx0XHRmb3IgKGxldCB2YWwgb2YgdmFsdWUpIGF3YWl0IGNyZWF0ZVJvdyh0aGlzLCB2YWwpO1xuXHR9XG5cblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQocm93LCBjaGFpbil7XG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcblx0XHRjb25zdCByb3dzID0gdGhpcy5yb3dzO1xuXHRcdGNvbnN0IHZhbHVlICA9IGF3YWl0IHJvdy52YWx1ZSgpO1xuXG5cdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcblx0XHRpZighdGhpcy5fX3ZhbHVlX18pXG5cdFx0XHR0aGlzLl9fdmFsdWVfXyA9IFtdO1xuXHRcdFx0XG5cdFx0dGhpcy5fX3ZhbHVlX19baW5kZXhdID0gdmFsdWU7XG5cblx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlKCk7XG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoY2hhaW4pO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoTGlzdCk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUywgVFJJR0dFUl9USU1FT1VUIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b0V2ZW50cywgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xuXG5leHBvcnQgY29uc3QgZmluZFBhcmVudEJhc2UgPSAobWVzc2FnZSkgPT4ge1xuXHRsZXQgcGFyZW50ID0gbWVzc2FnZS5wYXJlbnROb2RlO1xuXHR3aGlsZSAocGFyZW50KSB7XG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIEJhc2UpIHJldHVybiBwYXJlbnQ7XG5cblx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5NZXNzYWdlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcdFx0XG5cblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XHRcdFx0XG5cdFx0XHR0aGlzLnJlZmVyZW5jZSA9IGZpbmRQYXJlbnRCYXNlKHRoaXMpO1xuXHRcdFx0dGhpcy5mb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVTLkZvcm0pO1xuXHRcdFx0dGhpcy5mb3JtLm9uKEVWRU5UUy5leGVjdXRlVmFsaWRhdGUsICgpID0+IHtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcblx0fVxuXG5cdGdldCBjb25kaXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZSgpIHtcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzLnJlZmVyZW5jZSk7XG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xuXHR9XG59XG5kZWZpbmVFbGVtZW50KE1lc3NhZ2UpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBBVFRSSUJVVEVfU1RFUCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XG5cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb250YWluZXIge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuUGFnZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0fVxuXG5cdGdldCBzdGVwKCl7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfU1RFUCk7XG5cdH1cblx0XG5cdGNvbmRpdGlvblVwZGF0ZWQoKXt9XG59XG5kZWZpbmVFbGVtZW50KFBhZ2UpO1xuZXhwb3J0IGRlZmF1bHQgUGFnZTtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEZPUk1TVEFURVMsIHByb2dyZXNzLCBBVFRSSUJVVEVfUFJPR1JFU1MgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuaW1wb3J0IFwiLi9TdGVwXCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1BST0dSRVNTXTtcblxuY29uc3QgZmlyc3RTdGVwUGFnZUluZGV4ID0gKHBhZ2VzLCBzdGVwLCBhY3RpdmVQYWdlKSA9PiB7XG5cdGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcblx0XHRpZiAocGFnZS5zdGVwID09IHN0ZXAgJiYgcGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xuXHRcdGVsc2UgaWYgKHBhZ2UgPT0gYWN0aXZlUGFnZSkgcmV0dXJuO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLlByb2dyZXNzQmFyO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmZvcm0pIHJldHVybjtcblx0XHRcdGlmICh0YXJnZXQgPT0gdGhpcykgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBzdGVwID0gdGFyZ2V0LmlzKE5PREVOQU1FUy5TdGVwKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVTLlN0ZXApLmZpcnN0KCk7XG5cblx0XHRcdGlmICghc3RlcCkgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBzdGF0ZSA9IHRoaXMuZm9ybS5zdGF0ZTtcblx0XHRcdGNvbnN0IHBhZ2VzID0gdGhpcy5mb3JtLnBhZ2VzO1xuXHRcdFx0Y29uc3QgYWN0aXZlUGFnZUluZGV4ID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2VJbmRleDtcblx0XHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmZvcm0uYWN0aXZlUGFnZTtcblx0XHRcdGNvbnN0IHN0ZXBOYW1lID0gc3RlcC5uYW1lO1xuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQgfHwgc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5KSB7XG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBmaXJzdFN0ZXBQYWdlSW5kZXgocGFnZXMsIHN0ZXBOYW1lLCBhY3RpdmVQYWdlKTtcblx0XHRcdFx0aWYgKHBhZ2UpIHRoaXMuZm9ybS5hY3RpdmVQYWdlID0gcGFnZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdGNvbnN0IHJlYWR5ID0gdGhpcy5yZWFkeTtcblx0XHR0aGlzLnByb2dyZXNzID0gMDtcblx0XHRpZiAoIXJlYWR5LnJlc29sdmVkKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRVMuRm9ybSk7XG5cdFx0XHR0aGlzLnN0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FUy5TdGVwKTtcblx0XHRcdHRoaXMuZm9ybS5vbihbRVZFTlRTLmluaXRpYWxpemUsIEVWRU5UUy5zaXRlQ2hhbmdlZCwgRVZFTlRTLmZvcm1TdGF0ZUNoYW5nZWRdLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHN0YXRlID0gdGhpcy5mb3JtLnN0YXRlO1xuXHRcdFx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2U7XG5cdFx0XHRcdGlmICghYWN0aXZlUGFnZSkgcmV0dXJuO1xuXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5mb3JtLmFjdGl2ZVBhZ2VJbmRleDtcblx0XHRcdFx0Y29uc3QgY291bnQgPSB0aGlzLmZvcm0ucGFnZXMubGVuZ3RoO1xuXHRcdFx0XHRjb25zdCBwYWdlU3RlcCA9IGFjdGl2ZVBhZ2UgPyBhY3RpdmVQYWdlLnN0ZXAgOiBGT1JNU1RBVEVTLmluaXQ7XG5cdFx0XHRcdGNvbnN0IHByb2dyZXNzID0gTWF0aC5mbG9vcigoaW5kZXggKiAxMDApIC8gY291bnQpO1xuXG5cdFx0XHRcdGZvciAobGV0IHN0ZXAgb2YgdGhpcy5zdGVwcykge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzdGVwLm5hbWU7XG5cdFx0XHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURVMuaW5wdXQpIHtcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBwYWdlU3RlcDtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURVMuc3VtbWFyeSkge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURVMuc3VtbWFyeTtcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURVMuZmluaXNoZWQ7XG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnByb2dyZXNzID0gc3RhdGUgPT0gRk9STVNUQVRFUy5zdW1tYXJ5IHx8IHN0YXRlID09IEZPUk1TVEFURVMuZmluaXNoZWQgPyAxMDAgOiBwcm9ncmVzcztcblxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRTLnByb2dyZXNzYmFyQ2hhbmdlZCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcHJvZ3Jlc3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MpO1xuXHR9XG5cblx0c2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XG5cdFx0aWYgKHRoaXMuc3R5bGUuc2V0UHJvcGVydHkpIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXByb2dyZXNzXCIsIHByb2dyZXNzICsgXCIlXCIpO1xuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MsIE1hdGgubWF4KDAsIE1hdGgubWluKHByb2dyZXNzLCAxMDApKSk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChQcm9ncmVzc0Jhcik7XG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFkgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZXTtcblxuY2xhc3MgU3RlcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuU3RlcDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuICAgIGdldCBuYW1lKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX05BTUUpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xuXHRcdFx0dXBkYXRlQWN0aXZlU3RhdGUodGhpcywgYWN0aXZlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgcmVhZG9ubHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRUFET05MWSk7XG5cdH1cblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHRyZWFkb25seSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChTdGVwKTtcbmV4cG9ydCBkZWZhdWx0IFN0ZXA7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0NPTkRJVElPTl07XG5cblxuY2xhc3MgVmFsaWRhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRyZXR1cm4gTk9ERU5BTUVTLlZhbGlkYXRpb247XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xuXHR9XG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIHVuZGVmaW5lZCk7XG5cdH1cblxuXHRnZXQgY29uZGl0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cdH1cbn1cbmRlZmluZUVsZW1lbnQoVmFsaWRhdGlvbik7XG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uO1xuIiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IHsgRVZFTlRTLCBUUklHR0VSX1RJTUVPVVQsIE5PREVOQU1FUywgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgRk9STVNUQVRFUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IFwiLi9WYWxpZGF0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVDb25kaXRpb25TdGF0ZSwgdXBkYXRlVmFsaWRTdGF0ZSB9IGZyb20gXCIuL3V0aWxzL1N0YXRlSGVscGVyXCJcbmltcG9ydCB7IGZpbmRWYWxpZGF0aW9ucyB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xuXG5cbmNvbnN0IHVwZGF0ZVJlYWRvbmx5ID0gYXN5bmMgKHsgZGF0YSwgdmFsaWQsIGJhc2UsIGNvbmRpdGlvbiB9KSA9PiB7XG5cdGNvbnN0IHsgZm9ybSB9ID0gYmFzZTtcblx0aWYgKGZvcm0uc3RhdGUgPT0gRk9STVNUQVRFUy5pbnB1dCkge1xuXHRcdGlmICghdmFsaWQpXG5cdFx0XHRiYXNlLnJlYWRvbmx5ID0gZmFsc2U7XG5cdFx0ZWxzZSBpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRjb25zdCB0ZXN0ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XG5cdFx0XHRiYXNlLmVkaXRhYmxlID0gdGVzdDtcblx0XHRcdHJldHVybiB0ZXN0O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsaWQ7XG59XG5cbmNsYXNzIFZhbGlkYXRvciB7XG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcblx0XHR0aGlzLmluaXRhbCA9IHRydWU7XG5cdFx0dGhpcy5iYXNlID0gYmFzZTtcblx0XHR0aGlzLmN1c3RvbUNoZWNrcyA9IFtdO1xuXHRcdHRoaXMudmFsaWRhdGlvbnMgPSBmaW5kVmFsaWRhdGlvbnMoYmFzZSkgfHwgW107XG5cdFx0dGhpcy5jb25kaXRpb24gPSBiYXNlLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XG5cdFx0dGhpcy5lZGl0YWJsZUNvbmRpdGlvbiA9IGJhc2UuYXR0cihBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OKTtcblxuXHR9XG5cblx0YWRkQ3VzdG9tQ2hlY2soY2hlY2spIHtcblx0XHR0aGlzLmN1c3RvbUNoZWNrcy5wdXNoKGNoZWNrKTtcblx0fVxuXG5cdGdldCBmb3JtKCkge1xuXHRcdHJldHVybiB0aGlzLmJhc2UuZm9ybTtcblx0fVxuXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xuXHRcdGNvbnN0IHsgYmFzZSwgdmFsaWRhdGlvbnMsIGN1c3RvbUNoZWNrcywgY29uZGl0aW9uLCBlZGl0YWJsZUNvbmRpdGlvbiB9ID0gdGhpcztcblx0XHRjb25zdCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgcmVxdWlyZWRPbmx5T25BY3RpdmUgfSA9IGJhc2U7XG5cdFx0Y29uc3QgaGFzQ2hlY2tzID0gY3VzdG9tQ2hlY2tzLmxlbmd0aCA+IDAgfHwgdmFsaWRhdGlvbnMubGVuZ3RoID4gMDtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgZXZhbHVhdGlvbkRhdGEoYmFzZSk7XG5cdFx0Y29uc3QgaW5pdGlhbCA9IHRoaXMuaW5pdGFsO1xuXHRcdHRoaXMuaW5pdGFsID0gZmFsc2U7XG5cblxuXHRcdGNvbnN0IGNvbmRpdGlvblZhbGlkID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xuXHRcdHVwZGF0ZUNvbmRpdGlvblN0YXRlKGJhc2UsIGNvbmRpdGlvblZhbGlkLCB0aGlzLmluaXRhbCk7XG5cblx0XHRsZXQgdmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcblx0XHRpZiAoY29uZGl0aW9uVmFsaWQpIHtcblx0XHRcdGlmICh2YWxpZClcblx0XHRcdFx0Zm9yIChsZXQgY2hlY2sgb2YgY3VzdG9tQ2hlY2tzKSB7XG5cdFx0XHRcdFx0Y29uc3QgdGVzdCA9IGF3YWl0IGNoZWNrKHsgZGF0YSwgYmFzZSB9KTtcblx0XHRcdFx0XHRpZiAoIXRlc3QpIHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgdmFsaWRhdGlvbiBvZiB2YWxpZGF0aW9ucykge1xuXHRcdFx0XHRpZiAodmFsaWQgJiYgaGFzVmFsdWUpIHtcblx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUodmFsaWRhdGlvbi5jb25kaXRpb24sIGRhdGEsIHRydWUpO1xuXHRcdFx0XHRcdHZhbGlkYXRpb24uYWN0aXZlID0gIXRlc3Q7XG5cdFx0XHRcdFx0aWYgKCF0ZXN0KSB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHR2YWxpZGF0aW9uLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlZGl0YWJsZSA9IHVwZGF0ZVJlYWRvbmx5KHsgZGF0YSwgdmFsaWQsIGJhc2UsIGNvbmRpdGlvbjogZWRpdGFibGVDb25kaXRpb24gfSk7XG5cdFx0XHRpZighZWRpdGFibGUpXG5cdFx0XHRcdHZhbGlkID0gdHJ1ZTtcblx0XHRcdHVwZGF0ZVZhbGlkU3RhdGUoYmFzZSwgdmFsaWQsIHRoaXMuaW5pdGFsKTtcblx0XHRcdFxuXHRcdH1cblx0XHRyZXR1cm4gdmFsaWQ7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0b3I7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIEJhY2tCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CYWNrQnV0dG9uO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b1ByZXZQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tCdXR0b247XHJcbmRlZmluZUVsZW1lbnQoQmFja0J1dHRvbik7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IGRlZmluZUVsZW1lbnQgZnJvbSBcIi4uL3V0aWxzL0RlZmluZUVsZW1lbnRcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVTLk5leHRCdXR0b247XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEJ1dHRvbjtcclxuZGVmaW5lRWxlbWVudChOZXh0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRVMuU3VibWl0QnV0dG9uO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRCdXR0b247XHJcbmRlZmluZUVsZW1lbnQoU3VibWl0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIFN1bW1hcnlCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuU3VtbWFyeUJ1dHRvbjtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5QnV0dG9uO1xuZGVmaW5lRWxlbWVudChTdW1tYXJ5QnV0dG9uKTtcbiIsImltcG9ydCBCYWNrQnV0dG9uIGZyb20gXCIuL0JhY2tCdXR0b25cIjtcbmltcG9ydCBOZXh0QnV0dG9uIGZyb20gXCIuL05leHRCdXR0b25cIjtcbmltcG9ydCBTdW1tYXJ5QnV0dG9uIGZyb20gXCIuL1N1bW1hcnlCdXR0b25cIjtcbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSBcIi4vU3VibWl0QnV0dG9uXCI7XG5cbmV4cG9ydCB7XG5cdEJhY2tCdXR0b24sXG5cdE5leHRCdXR0b24sXG5cdFN1bW1hcnlCdXR0b24sXG5cdFN1Ym1pdEJ1dHRvbixcbn07XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XG5pbXBvcnQgZGVmaW5lRWxlbWVudCBmcm9tIFwiLi4vdXRpbHMvRGVmaW5lRWxlbWVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBBZGRSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xuXHR9XG5cblx0c3RhdGljIGdldCBOT0RFTkFNRSgpe1xuXHRcdHJldHVybiBOT0RFTkFNRVMuQnV0dG9uQWRkUm93O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblx0fVxuXG5cdGV4ZWN1dGUoKSB7XG5cdFx0dGhpcy50cmlnZ2VyKDEwMCwgRVZFTlRTLmxpc3RSb3dBZGQpO1xuXHR9XG59XG5cbmRlZmluZUVsZW1lbnQoQWRkUm93KTtcbmV4cG9ydCBkZWZhdWx0IEFkZFJvdztcbiIsImltcG9ydCB7IE5PREVOQU1FUywgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcbmltcG9ydCBkZWZpbmVFbGVtZW50IGZyb20gXCIuLi91dGlscy9EZWZpbmVFbGVtZW50XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcblxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5CdXR0b25EZWxldGVSb3c7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpe1xuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcblx0XHR0aGlzLmFjdGl2ZVx0PSB0cnVlO1xuXHR9XG5cblx0ZXhlY3V0ZSgpIHtcblx0XHR0aGlzLnRyaWdnZXIoMTAwLCBFVkVOVFMubGlzdFJvd0RlbGV0ZSk7XG5cdH1cbn1cblxuZGVmaW5lRWxlbWVudChEZWxldGVSb3cpO1xuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xuIiwiaW1wb3J0IHsgTk9ERU5BTUVTLCBFVkVOVFMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuLi9Db250YWluZXJcIjtcbmltcG9ydCBEZWxldGVSb3cgZnJvbSBcIi4vRGVsZXRlUm93XCI7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcbmNsYXNzIExpc3RSb3cgZXh0ZW5kcyBDb250YWluZXIge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRVMuTGlzdFJvdztcblx0fVxuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XG5cblx0Z2V0IGNvbmRpdGlvbigpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93Lk5PREVOQU1FLCBMaXN0Um93KTtcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XG4iLCJpbXBvcnQgeyBOT0RFTkFNRVMsIEVWRU5UUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW107XG5jbGFzcyBMaXN0Um93cyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FUy5MaXN0Um93cztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKExpc3RSb3dzLk5PREVOQU1FLCBMaXN0Um93cyk7XG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcbiIsImltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmltcG9ydCB7IFNQRUNJQUxWQVJTLCBOT0RFTkFNRVMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRpb25EYXRhID0gYXN5bmMgKGJhc2UpID0+IHtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRkYXRhW1NQRUNJQUxWQVJTLkNVUlJFTlRWQUxVRV0gPSBhd2FpdCBiYXNlLnZhbHVlKCk7XG5cblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FUy5MaXN0Um93KTtcblx0bGV0IHRlbXAgPSBkYXRhO1xuXHR3aGlsZSAocm93KSB7XG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCByb3cudmFsdWUoKTtcblx0XHR0ZW1wID0gdGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV107XG5cdFx0cm93ID0gcm93LnBhcmVudChOT0RFTkFNRVMuTGlzdFJvdyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UoIGRhdGEsIGF3YWl0IGJhc2UuZm9ybS5kYXRhKCkpO1xufSIsImV4cG9ydCBkZWZhdWx0IChOb2RlKSA9PiB7XHJcbiAgICBpZighd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldChOb2RlLk5PREVOQU1FKSlcclxuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE5vZGUuTk9ERU5BTUUsIE5vZGUpO1xyXG59IiwiaW1wb3J0IHtFVkVOVEhBTkRMRV9USU1FT1VUfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJndW1lbnRzKS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlRXZlbnRDb3B5ID0gKGV2ZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgIGRldGFpbDogZXZlbnQuZGV0YWlsLFxuICAgICAgICBjdXJyZW50VGFyZ2V0OiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0OiBldmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBvcmlnaW5hbFRhcmdldCA6IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBzcmNFbGVtZW50OiBldmVudC5zcmNFbGVtZW50LFxuICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB0b1RpbWVvdXRIYW5kbGUgPSAoaGFuZGxlLCBwcmV2ZW50RGVmYXVsdCwgc3RvcFByb3BhZ2F0aW9uLCB0aW1lb3V0KSA9PiB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZlbnQgPSB0eXBlb2YgcHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiA/IHByZXZlbnREZWZhdWx0IDogKCkgPT4gcHJldmVudERlZmF1bHQ7XG4gICAgY29uc3Qgc3RvcCA9IHR5cGVvZiBzdG9wUHJvcGFnYXRpb24gPT09IFwiZnVuY3Rpb25cIiA/IHN0b3BQcm9wYWdhdGlvbiA6ICgpID0+IHN0b3BQcm9wYWdhdGlvbjtcblxuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYocHJldmVudChldmVudCkpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZihzdG9wKGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50Q29weSA9IG1ha2VFdmVudENvcHkoZXZlbnQpO1xuXG4gICAgICAgIGlmKGlkKVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZCA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGUoZXZlbnRDb3B5KTtcbiAgICAgICAgfSwgdGltZW91dCB8fCBFVkVOVEhBTkRMRV9USU1FT1VUKTtcblxuICAgIH1cbn07IiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi4vQmFzZUZpZWxkXCI7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi4vVmFsaWRhdGlvblwiO1xuXG5leHBvcnQgY29uc3QgdHJlZUZpbHRlciA9ICh7IHJvb3QsIGZpbHRlciB9KSA9PiB7XG5cdGxldCBlbGVtZW50cyA9IFtdO1xuXHRyb290LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB7IGFjY2VwdCwgc3RvcCA9IGZhbHNlIH0gPSBmaWx0ZXIoZWxlbWVudCk7XG5cblx0XHRpZiAoYWNjZXB0KSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSB0cmVlRmlsdGVyKHsgcm9vdDogZWxlbWVudCwgZmlsdGVyIH0pO1xuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0KSBlbGVtZW50cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEZpZWxkcyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kVmFsaWRhdGlvbnMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAocm9vdCAhPSBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBWYWxpZGF0aW9uKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG4iLCJpbXBvcnQgeyBFVkVOVFMsIFRSSUdHRVJfVElNRU9VVCwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1ZBTElELCBBVFRSSUJVVEVfSU5WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBBVFRSSUJVVEVfRURJVEFCTEUsIEFUVFJJQlVURV9SRUFET05MWSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZhbGlkU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnZhbGlkO1xuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcblx0fSBlbHNlIGlmICh2YWxpZCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIFwiXCIpO1xuXHR9IGVsc2Uge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBcIlwiKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xuXHR9XG5cblx0aWYgKG9sZFN0YXRlICE9IHZhbGlkIHx8IGluaXRpYWwpeyBcblx0XHR0YXJnZXQudHJpZ2dlcihFVkVOVFMudmFsaWRTdGF0ZUNoYW5nZWQpO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQ29uZGl0aW9uU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdFxuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5jb25kaXRpb247XG5cdGlmICh2YWxpZCkge1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXCJcIik7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcIlwiKTtcblx0fVxuXHRpZiAob2xkU3RhdGUgIT0gdmFsaWQgfHwgaW5pdGlhbCkge1x0XHRcblx0XHR0YXJnZXQudHJpZ2dlcihFVkVOVFMuY29uZGl0aW9uU3RhdGVDaGFuZ2VkKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFjdGl2ZVN0YXRlID0gKHRhcmdldCwgYWN0aXZlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuYWN0aXZlO1xuXHRhY3RpdmUgPyB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xuXHRpZiAob2xkU3RhdGUgIT0gYWN0aXZlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UUy5hY3RpdmVTdGF0ZUNoYW5nZWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmVkaXRhYmxlO1xuXHRpZiAoZWRpdGFibGUpIHtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfRURJVEFCTEUsIFwiXCIpO1xuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XG5cdH0gZWxzZSB7XG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xuXHR9XG5cdGlmIChvbGRTdGF0ZSAhPSBlZGl0YWJsZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVFMuZWRpdGFibGVTdGF0ZUNoYW5nZWQpO1xufTsiLCJpbXBvcnQgeyBFVkVOVFMsIEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cdFx0dmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHtcblx0XHRcdHZhbHVlcy5wdXNoKHZhbHVlKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB2YWx1ZXM7XG5cdH1cblxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHRcdGVsc2V7XG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImZpbGVcIl0nO1xuXG5jb25zdCByZWFkRmlsZSA9IChmaWxlLCByZWFkRm5OYW1lKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRyZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgKCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSh7XG5cdFx0XHRcdG5hbWU6IGZpbGUubmFtZSxcblx0XHRcdFx0dHlwZTogZmlsZS50eXBlLFxuXHRcdFx0XHRzaXplOiBmaWxlLnNpemUsXG5cdFx0XHRcdGRhdGE6IHJlYWRlci5yZXN1bHRcblx0XHRcdH0pO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRyZWFkZXJbcmVhZEZuTmFtZV0oZmlsZSk7XG5cdH0pO1xufTtcblxuLy9yZWFkQXNEYXRhVVJMXG5cbmNvbnN0IEZPUk1BVCA9IHtcblx0XCJmb3JtLWlucHV0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0ZmlsZS5mb3JtYXQgPSBcImZvcm0taW5wdXRcIjtcblx0XHRyZXR1cm4gZmlsZTtcblx0fSxcblx0XCJkYXRhLXVybC1iYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiZGF0YS11cmwtYmFzZTY0XCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0XCJiYXNlNjRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkRmlsZShmaWxlLCBcInJlYWRBc0RhdGFVUkxcIik7XG5cdFx0cmVzdWx0LmRhdGEgPSByZXN1bHQuZGF0YS5zdWJzdHIocmVzdWx0LmRhdGEuaW5kZXhPZihcIixcIikgKyAxKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJiYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5jb25zdCByZWFkRmlsZXMgPSBhc3luYyAoZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpID0+IHtcblx0bGV0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBmaWxlIG9mIGZpbGVzKVxuXHRcdHJlc3VsdC5wdXNoKGF3YWl0IEZPUk1BVFtmb3JtYXRdKGZpbGUpKTtcblxuXHRpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKVxuXHRcdHJldHVybiBudWxsO1xuXG5cblx0cmV0dXJuIG11bHRpcGxlID8gcmVzdWx0IDogcmVzdWx0WzBdO1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQubXVsdGlwbGU7XG5cdFx0dGhpcy5mb3JtYXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1mb3JtYXRcIikgfHwgXCJmb3JtLWlucHV0XCI7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IGZpZWxkLmF0dHIoXCJmaWxlLW5hbWUtdGFyZ2V0XCIpO1xuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0ID8gZmllbGQuZmluZCh0aGlzLmZpbGVuYW1lVGFyZ2V0KS5maXJzdCgpIDogbnVsbDtcblx0XHRjb25zdCB7IGZvcm1hdCwgbXVsdGlwbGUgfSA9IHRoaXM7XG5cblx0XHRpbnB1dC5vbihcblx0XHRcdFwiaW5wdXRcIixcblx0XHRcdHRvVGltZW91dEhhbmRsZShcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKVxuXHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy52YWx1ZSk7XG5cdH07XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgXCJvYmplY3RcIjtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPSB0aGlzLl9fdmFsdWVfXykge1xuXHRcdFx0dGhpcy5fX3ZhbHVlX18gPSB2YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMuZmlsZW5hbWVUYXJnZXQgJiYgdmFsdWUpIHtcblx0XHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBmaWxlIG9mIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0LmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0LmFwcGVuZChgPHNwYW4+JHt2YWx1ZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX192YWx1ZV9fO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5cbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcblxuY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XG59O1xuXG5jb25zdCBpbml0ID0gKHdyYXBwZXIpID0+IHtcblx0Y29uc3QgeyBmaWVsZCB9ID0gd3JhcHBlcjtcblx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcblx0Y29uc3QgaW5wdXQgPSAod3JhcHBlci5pbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikpO1xuXHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XG5cdGlucHV0Lm9uKFxuXHRcdFwiY2hhbmdlXCIsXG5cdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5jaGFuZ2VWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0KVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8gZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdGNvbnN0IG5hbWUgPSBmaWVsZC5uYW1lICsgZ2V0UmFuZG9tSW50KCk7XG5cdFx0Zm9yIChsZXQgcmFkaW8gb2YgaW5wdXQpIHJhZGlvLm5hbWUgPSBuYW1lO1xuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxuXHRcdFx0KVxuXHRcdCk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdH1cblxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWUudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUpXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdzZWxlY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0LCBjaGFuZ2VkXCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRTLmlucHV0LCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMuaW5wdXQubXVsdGlwbGUgPyB0aGlzLmlucHV0LnZhbCgpIDogdGhpcy5pbnB1dC52YWx1ZSk7XG5cdH1cblx0XG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZih0aGlzLmlucHV0Lm11bHRpcGxlKXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoID4gMCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdH0gZWxzZXtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxuXHRcdFx0fVx0XHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmICh0aGlzLmlucHV0Lm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUywgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0Om5vdChbdHlwZT1cImZpbGVcIl0pOm5vdChbdHlwZT1cInJhZGlvXCJdKTpub3QoW3R5cGU9XCJjaGVja2JveFwiXSkgLGlucHV0Om5vdChbdHlwZV0pLCB0ZXh0YXJlYSc7XG5cbmNvbnN0IERFRkFVTFRUWVBFID0gXCJ0ZXh0XCI7XG5cbmNvbnN0IHRleHQgPSB7XG5cdGFjY2VwdDogKHZhbHVlKSA9PiB7XG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcblx0fSxcblx0dmFsdWU6IChpbnB1dCkgPT4ge1xuXHRcdHJldHVybiBpbnB1dC52YWx1ZTtcblx0fSxcblx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG59O1xuY29uc3QgbnVtYmVyID0ge1xuXHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG5cdH0sXG5cdHZhbHVlOiAoaW5wdXQpID0+IHtcblx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc051bWJlcjtcblx0fSxcblx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcblx0XHRpZiAoIW5vVmFsdWUodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpKSByZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcbn07XG5jb25zdCBkYXRlID0ge1xuXHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xuXHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGU7XG5cdH0sXG5cdHZhbHVlOiAoaW5wdXQpID0+IHtcblx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XG5cdH0sXG5cdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XG5cdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWU7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcbn07XG5jb25zdCBUWVBFUyA9IHsgdGV4dCwgbnVtYmVyLCBkYXRlLCB0aW1lOiBkYXRlIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcblx0XHRjb25zdCB0eXBlID0gKGZpZWxkLmF0dHIoXCJpbnB1dC10eXBlXCIpIHx8IGlucHV0LmF0dHIoXCJ0eXBlXCIpIHx8IERFRkFVTFRUWVBFKS50cmltKCkudG9Mb3dlckNhc2UoKTtcblx0XHR0aGlzLnR5cGUgPSBUWVBFU1t0eXBlXSB8fCBUWVBFU1tERUZBVUxUVFlQRV07XG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UUy5pbnB1dCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0KSxcblx0XHQpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVFMuaW5wdXQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xuXHR9XG5cblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5ub3JtYWxpemUodmFsdWUpO1xuXHR9XG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPSB0aGlzLmlucHV0LnZhbHVlKVxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xuXHR9XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZS52YWx1ZSh0aGlzLmlucHV0KTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCBGaWVsZCBmcm9tIFwiLi4vRmllbGRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XG5cdFxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKXsgcmV0dXJuIG51bGw7fVxuXHRcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0dGhpcy5maWVsZCA9IGZpZWxkO1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7IH1cblxuXHRzZXQgcmVhZG9ubHkoZGlzYWJsZWQpIHsgfVxuXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHtcblx0fVxuXHRcblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdGdldCB2YWxpZCgpe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vc3JjL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IEZpZWxkIGZyb20gXCIuL3NyYy9GaWVsZFwiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9zcmMvQ29udGFpbmVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9zcmMvTGlzdFwiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vc3JjL1BhZ2VcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vc3JjL0Zvcm1cIjtcblxuZXhwb3J0IHtGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXJ9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==