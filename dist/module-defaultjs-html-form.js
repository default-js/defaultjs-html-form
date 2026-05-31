/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/index.js"
/*!******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/index.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Escaper: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.Escaper),
/* harmony export */   GLOBAL: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.GLOBAL),
/* harmony export */   ObjectUtils: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.ObjectUtils),
/* harmony export */   PrivateProperty: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.PrivateProperty),
/* harmony export */   PromiseUtils: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.PromiseUtils),
/* harmony export */   UUID: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.UUID),
/* harmony export */   ValueHelper: () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.ValueHelper)
/* harmony export */ });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./node_modules/@default-js/defaultjs-common-utils/src/index.js");





/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js"
/*!************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// required to build the internal escape filter for regex
const REGEXCHARMAP = ["\\","?","[", "]", "{", "}", "(", ")", ".", "^", "$"]
	.map(char => { 
		return {f: new RegExp("\\" +char, "g"), v : "\\" + char};
	});


const mapping = (aText, theFilters) => {
	let text = aText;
	theFilters.forEach(item => {
		text = text.replace(item.f, item.v);
	});
	return text;
};

const buildUnescapeList = (aCharMap, isCaseSensitiv) => {
	const option = isCaseSensitiv ? "mg" : "mgi"; 
	return aCharMap.map(item => {
		if(!item.at || item.at == "unescape")
			return {f: new RegExp(mapping(item.escaped, REGEXCHARMAP), option), v: item.char}
	}).filter(item => !!item);
};

const buildEscapeList = (aCharMap, isCaseSensitiv) => {
	const option = isCaseSensitiv ? "mg" : "mgi"; 
	return aCharMap.map(item => {
		if(!item.at || item.at == "escape")
			return {f: new RegExp(mapping(item.char,REGEXCHARMAP), option), v: item.escaped}
	}).filter(item => !!item);
};
class Escaper {
	constructor(escapeMap, isCaseSensitiv){
		this.escapeMap = buildEscapeList(escapeMap, isCaseSensitiv)
		this.unescapeMap = buildUnescapeList(escapeMap, isCaseSensitiv)
	}
	
	escape(aText){
		return mapping(aText, this.escapeMap);
	}
	
	unescape(aText){
		return mapping(aText, this.unescapeMap);
	}
	
	static REGEXP_ESCAPER(){
		return new Escaper([
			{char: "\\", escaped : "\\\\"},
			{char: "?", escaped : "\\?"},
			{char: "[", escaped : "\\["},
			{char: "]", escaped : "\\]"},
			{char: "{", escaped : "\\{"},
			{char: "}", escaped : "\\}"},
			{char: "(", escaped : "\\("},
			{char: ")", escaped : "\\)"},
			{char: ".", escaped : "\\."},
			{char: "^", escaped : "\\^"},
			{char: "$", escaped : "\\$"}
		]);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Escaper);



/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/index.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/index.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Escaper: () => (/* reexport safe */ _Escaper__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   GLOBAL: () => (/* reexport safe */ _Global__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ObjectUtils: () => (/* reexport safe */ _ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   PrivateProperty: () => (/* reexport safe */ _PrivateProperty__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   PromiseUtils: () => (/* reexport safe */ _PromiseUtils__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   UUID: () => (/* reexport safe */ _UUID__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   ValueHelper: () => (/* reexport safe */ _ValueHelper__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _javascript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./javascript */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/index.js");
/* harmony import */ var _ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _Escaper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Escaper */ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js");
/* harmony import */ var _ValueHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _PromiseUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _PrivateProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");











/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js ***!
  \*******************************************************************************/
() {

if (!Map.prototype.toObject)
	Map.prototype.toObject = function () {
		const object = {};
		for (const [key, value] of this.entries()) object[key] = value instanceof Map ? value.toObject() : value;

		return object;
	};


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js ***!
  \**********************************************************************************/
() {

if (!String.prototype.hashcode)
	String.prototype.hashcode = function() {
		if (this.length === 0)
			return 0;
		
		let hash = 0;
		const length = this.length;
		for (let i = 0; i < length; i++) {
			const c = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + c;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/index.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/index.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./String.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js");
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_String_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js");
/* harmony import */ var _Map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Map_js__WEBPACK_IMPORTED_MODULE_1__);



/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/index.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/index.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExecuterRegistry: () => (/* reexport module object */ _src_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   ExpressionResolver: () => (/* reexport safe */ _src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _src_executer_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/executer/index.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js");
/* harmony import */ var _src_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");







/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CodeCache)
/* harmony export */ });
/**
 * @typedef {Object} CacheEntry
 * @property {number} lastHit
 * @property {string} key
 * @property {Function} code
 */

/**
 * @typedef {Object} CodeCacheOptions
 * @property {number} [size=1000] - Maximum number of entries in the cache. If set to 0 or less, caching is disabled.
 */

/**
 * CodeCache class to manage caching of generated code snippets.
 */
class CodeCache {
	/** @type {boolean} */
	#disabled = false;
	/** @type {number} */
	#size = 0;
	/** @type {number} */
	#maxSize = 0;
	/** @type {Array<CacheEntry>} */
	#entries = [];
	/** @type {Map<string,CacheEntry} */
	#entryMap = new Map();

	
	 /**
	  * @param {CodeCacheOptions} options
	  */
	constructor({ size = 1000 } = {}) {
		if (size <= 0) this.#disabled = true;
		else {
			this.#size = size > 0 ? size : 1000;
			this.#maxSize = Math.floor(size * 1.1);
		}
	}

	 /**
	  * @param {CodeCacheOptions} options
	  */
	setup({ size = 1000 } = {}) {
		if (size <= 0){
			this.#disabled = true;
			this.clear();
		}
		else {
			this.#size = size > 0 ? size : 1000;
			this.#maxSize = Math.floor(size * 1.1);
			this.#trim();
		}
	}

	has(key) {
		if(this.#disabled) return false;
		return this.#entryMap.has(key);
	}

	get(key) {
		if(this.#disabled) return null;
		const data = this.#entryMap.get(key);
		if (data) {
			data.lastHit = Date.now();
			return data.value;
		}
		return null;
	}

	set(key, code) {
		if(this.#disabled) return;
		let entry = this.#entryMap.get(key);
		if (entry) {
			entry.count = Date.now();
			entry.value = code;
		} else {
			entry = {
				count: Date.now(),
				key,
				value: code,
			};
			this.#entries.push(entry);
			this.#entryMap.set(key, entry);
		}

		if (this.#entryMap.size >= this.#maxSize) this.#trim();
	}

	clear() {
		if(this.#disabled) return;
		this.#entries = [];
		this.#entryMap = new Map();
	}

	#trim() {
		console.debug(`Trimming code cache from ${this.#entries.length} entries to ${this.#size} entries.`);
		this.#entries.sort((a, b) => b.count - a.count);
		if (this.#entries.length >= this.#size) {
			const entriesToRemove = this.#entries.splice(this.#size);
			for (const entry of entriesToRemove) {
				this.#entryMap.delete(entry.key);
			}
		}
	}
};


/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DefaultValue)
/* harmony export */ });
/**
 * object for default value
 *
 * @export
 * @class DefaultValue
 * @typedef {DefaultValue}
 */
class DefaultValue {
	/**
	 * Creates an instance of DefaultValue.
	 *
	 * @constructor
	 * @param {*} value
	 */
	constructor(value){
		this.hasValue = arguments.length == 1;
		this.value = value;
	}	
};

/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/Executer.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Executer)
/* harmony export */ });
class Executer{

    #defaultContext;
    #execution;

    /**
     * 
     * @param {Object} option
     * @param {Object} option.defaultContext
     * @param {Function} option.execution
     */
    constructor({defaultContext, execution} = {}){
        this.#defaultContext = defaultContext || {};
        this.#execution = execution || (() => {throw new Error("not implemented")});
    }
    
    get defaultContext(){
        return this.#defaultContext;
    }
    
    execute(aStatement, aContext){
        return this.#execution(aStatement, aContext);
    }
};

/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js"
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getExecuter: () => (/* binding */ getExecuter),
/* harmony export */   registrate: () => (/* binding */ registrate)
/* harmony export */ });
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");


const EXECUTERS = new Map();

/**
 *
 * @param {string} aName
 * @param {Executer} anExecuter
 */
const registrate = (aName, anExecuter) => {
	EXECUTERS.set(aName, anExecuter);
};

/**
 *
 * @param {string} aName
 * @returns {Executer}
 */
const getExecuter = (aName) => {
	const executer = EXECUTERS.get(aName);
	if (!executer) throw new Error(`Executer "${aName}" is not registrated!`);
	return executer;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getExecuter);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js"
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExpressionResolver)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultValue.js */ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js");
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _executer_WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./executer/WithScopedExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js");
/* harmony import */ var _ResolverContextHandle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResolverContextHandle.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");








/** @type {Executer} */
let DEFAULT_EXECUTER = _executer_WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_4__["default"];

const EXECUTION_WARN_TIMEOUT = 1000;
const EXPRESSION = /(\\?)(\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\})/;
const MATCH_ESCAPED = 1;
const MATCH_FULL_EXPRESSION = 2;
const MATCH_EXPRESSION_SCOPE = 4;
const MATCH_EXPRESSION_STATEMENT = 5;

const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const toDefaultValue = (value) => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"]) return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"](value);
};

const execute = async function (anExecuter, aStatement, aContext) {
	if (typeof aStatement !== "string") return aStatement;
	aStatement = normalize(aStatement);
	if (aStatement == null) return aStatement;

	try {
		return await new Promise((resolve) => {
			const timeout = setTimeout(
				() =>
					console.warn(`Long running statement:
				"${aStatement}"
			`),
				EXECUTION_WARN_TIMEOUT,
			);
			resolve(
				(async () => {
					let result = undefined;
					try {
						result = await anExecuter.execute(aStatement, aContext);
					} catch (e) {
						console.warn(`Execution error on statement!
							statement: 
							${aStatement}
							error:
							${e}
							`)
					} finally {
						clearTimeout(timeout);
					}
					return result;
				})(),
			);
		});
	} catch (e) {
		console.error(`Error by statement "${aStatement}":`, e);
	}
};

const resolve = async function (aExecuter = DEFAULT_EXECUTER, aResolver, aExpression, aFilter, aDefault) {
	if (aFilter && aResolver.name != aFilter) return aResolver.parent ? resolve(aResolver.parent, aExpression, aFilter, aDefault, aExecuter) : null;

	const result = await execute(aExecuter, aExpression, aResolver.context);
	if (result !== null && typeof result !== "undefined") return result;
	else if (aDefault instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"] && aDefault.hasValue) return aDefault.value;
	return result;
};

const resolveMatch = async (aExecuter, resolver, match, defaultValue) => {
	if (match[MATCH_ESCAPED]) return match[MATCH_FULL_EXPRESSION];

	return resolve(aExecuter, resolver, match[MATCH_EXPRESSION_STATEMENT], normalize(match[MATCH_EXPRESSION_SCOPE]), defaultValue);
};

const normalize = (value) => {
	if (value) {
		value = value.trim();
		return value.length == 0 ? null : value;
	}
	return null;
};

/**
 * ExpressionResolver
 *
 * @export
 * @class ExpressionResolver
 * @typedef {ExpressionResolver}
 */
class ExpressionResolver {
	/**
	 * @param {string} anExecuterName
	 */
	static set defaultExecuter(anExecuter) {
		if ( anExecuter instanceof _Executer_js__WEBPACK_IMPORTED_MODULE_6__["default"]) DEFAULT_EXECUTER = anExecuter;
		else DEFAULT_EXECUTER = (0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__["default"])(anExecuter);
		console.info(`Changed default executer for ExpressionResolver!`);
	}

	static get defaultExecuter() {
		return DEFAULT_EXECUTER;
	}

	/** @type {string|null} */
	#name = null;
	/** @type {ExpressionResolver|null} */
	#parent = null;
	/** @type {function|null} */
	#executer = null;
	/** @type {Proxy|null} */
	#context = null;
	/** @type {ResolverContextHandle|null} */
	#contextHandle = null;

	/**
	 * Creates an instance of ExpressionResolver.
	 * @date 3/10/2024 - 7:27:57 PM
	 *
	 * @constructor
	 * @param {{ context?: any; parent?: any; name?: any; }} param0
	 * @param {object} [param0.context=GLOBAL]
	 * @param {ExpressionResolver} [param0.parent=null]
	 * @param {?string} [param0.name=null]
	 */
	constructor({ context = DEFAULT_EXECUTER.defaultContext, parent = null, name = null, executer } = {}) {		
		this.#executer = typeof executer === "string" ? (0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__["default"])(executer) : ExpressionResolver.defaultExecuter;
		this.#parent = parent instanceof ExpressionResolver ? parent : null;
		this.#name = name;
		this.#contextHandle = new _ResolverContextHandle_js__WEBPACK_IMPORTED_MODULE_5__["default"](context, this.#parent ? this.#parent.contextHandle : null);
		this.#context = this.#contextHandle.proxy;
	}

	get name() {
		return this.#name;
	}

	get parent() {
		return this.#parent;
	}

	get context() {
		return this.#context;
	}

	get contextHandle() {
		return this.#contextHandle;
	}

	/**
	 * get chain path
	 *
	 * @readonly
	 * @returns {string}
	 */
	get chain() {
		return this.parent ? this.parent.chain + "/" + this.name : "/" + this.name;
	}

	/**
	 * get effective chain path
	 *
	 * @readonly
	 * @returns {string}
	 */
	get effectiveChain() {
		return this.parent ? this.parent.effectiveChain + "/" + this.name : "/" + this.name;
	}

	/**
	 * get context chain
	 *
	 * @readonly
	 * @returns {Context[]}
	 */
	get contextChain() {
		const result = [];
		let resolver = this;
		while (resolver) {
			if (resolver.context) result.push(resolver.context);

			resolver = resolver.parent;
		}

		return result;
	}

	/**
	 * get data from context
	 *
	 * @param {string} key
	 * @param {?string} filter
	 * @returns {*}
	 */
	getData(key, filter) {		
		if (!key) return this.context;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.getData(key, filter);
		} else {
			return this.context[key];
		}
	}

	/**
	 * update data at context
	 *
	 * @param {string} key
	 * @param {*} value
	 * @param {?string} filter
	 */
	updateData(key, value, filter) {
		if (!key) return;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.updateData(key, value, filter);
		} else {
			this.context[key] = value;
		}
	}

	deleteData(key, filter) {
		if (!key) return;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.deleteDataData(key, filter);
		} else {
			delete this.context[key];
		}
	}

	/**
	 * merge context object
	 *
	 * @param {object} context
	 * @param {?string} filter
	 */	
	mergeContext(context, filter) {
		if (filter && filter != this.name) {
			if (this.parent) this.parent.mergeContext(context, filter);
		} else 
			this.#contextHandle.mergeData(context);
	}

	/**
	 * resolved an expression string to data
	 *
	 * @async
	 * @param {string} aExpression
	 * @param {?*} aDefault
	 * @returns {Promise<*>}
	 */
	async resolve(aExpression, aDefault) {
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		try {
			aExpression = aExpression.trim();
			if (aExpression.startsWith("\\${")) return aExpression.substring(1);
			else if (aExpression.startsWith("${") && aExpression.endsWith("}")) return await resolve(this.#executer, this, normalize(aExpression.substring(2, aExpression.length - 1)), null, defaultValue);			
			else return await resolve(this.#executer, this, normalize(aExpression), null, defaultValue);
		} catch (e) {
			console.error('error at executing statment"', aExpression, '":', e);
			return defaultValue.hasValue ? defaultValue.value : aExpression;
		}
	}

	/**
	 * replace all expressions at a string	 *
	 * @async
	 * @param {string} aText
	 * @param {?*} aDefault
	 * @returns {Promise<*>}
	 */
	async resolveText(aText, aDefault) {
		let text = aText;
		let temp = aText; // required to prevent infinity loop
		let match = EXPRESSION.exec(text);
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		while (match != null) {
			const result = await resolveMatch(this.#executer, this, match, defaultValue);
			temp = temp.split(match[0]).join(); // remove current match for next loop
			text = text.split(match[0]).join(typeof result === "undefined" ? "undefined" : result == null ? "null" : result);
			match = EXPRESSION.exec(temp);
		}
		return text;
	}

	/**
	 * resolve an expression string to data
	 *
	 * @static
	 * @async
	 * @param {string} aExpression
	 * @param {?object} aContext
	 * @param {?*} aDefault
	 * @param {?number} aTimeout
	 * @returns {Promise<*>}
	 */
	static async resolve(aExpression, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(resolver.resolve(aExpression, defaultValue));
				}, aTimeout);
			});

		return resolver.resolve(aExpression, defaultValue);
	}

	/**
	 * replace expression at text
	 *
	 * @static
	 * @async
	 * @param {string} aText
	 * @param {?object} aContext
	 * @param {?*} aDefault
	 * @param {?number} aTimeout
	 * @returns {Promise<*>}
	 */
	static async resolveText(aText, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(resolver.resolveText(aText, defaultValue));
				}, aTimeout);
			});

		return resolver.resolveText(aText, defaultValue);
	}

	/**
	 * build a secure context object
	 *
	 * @static
	 
	 * @param {object} arg
	 * @param {object} arg.context
	 * @param {function} arg.propFilter
	 * @param {{ deep: boolean; }} [arg.option={ deep: true }]
	 * @param {string} arg.name
	 * @param {ExpressionResolver} arg.parent
	 * @returns {object}
	 */
	static buildSecure({ context, propFilter, option = { deep: true }, name, parent }) {
		context = _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_1__["default"].filter({ data: context, propFilter, option });
		return new ExpressionResolver({ context, name, parent });
	}
}



/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js"
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResolverContextHandle)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _ExpressionResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");





const VARNAME_CHECK = /^[$_\p{ID_Start}][$\p{ID_Continue}]*$/u;
const RESERVED_WORDS = new Set([
	"break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "export",
	"extends", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "return", "super", "switch",
	"this", "throw", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface",
	"let", "package", "private", "protected", "public", "static", "await", "null", "true", "false", "constructor", "undefined"
]);

const createGlobalCacheWrapper = (handle) => {

	return {
		has: (property) => {
			return true;
		},
		get: (property) => {
			return _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"][property];
		},
		set: (property, value) => {
			return false;
		},
		delete: (property) => {
			return false;
		},
		keys: () => {
			return Object.getOwnPropertyNames(_default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
		}
	}	
}


/**
 * Context object to handle data access
 *
 * @export
 * @class ResolverContextHandle
 */
class ResolverContextHandle {
	/** @type {Proxy|null} */
	#proxy = null;
	/** @type {ResolverContextHandle|null} */
	#parent = null;
	/** @type {object|null} */
	#data = null;
	/** @type {Map<string,ResolverContextHandle>|null} */
	#cache = null;

	/**
	 * Creates an instance of Context.
	 *
	 * @constructor
	 * @param {object} data
	 * @param {ExpressionResolver} resolver
	 */
	constructor(data, parent) {
		this.#data = data || {};
		this.#parent = parent ? parent : null;
		this.#cache = this.#initPropertyCache();

		this.#proxy = new Proxy(this.#data, {
			has: (data, property) => {
				//console.log("has property:", property);
				return this.#getPropertyDef(property) != null;
			},
			get: (data, property) => {
				//console.log("get property:", property);
				const proxy = this.#getPropertyDef(property);
				return proxy ? proxy.#data[property] : undefined;
			},
			set: (data, property, value) => {
				//console.log("set property:", property, "=", value);
				this.#data[property] = value;
				this.#cache.set(property, this);
				return true;				
			},
			deleteProperty: (data, property) => {
				const propertyDef = this.#cache.get(property);
				if (propertyDef) {
					delete this.#data[property];
					this.#cache.delete(property);
				}
				return true;
			},
			ownKeys: (data) => {
				//console.log("ownKeys");
				const result = new Set();
				let proxy = this;
				while (proxy) {
					for (let key of proxy.#cache.keys()) {
						result.add(key);
					}
					proxy = proxy.#parent;
				}
				return Array.from(result);
			},

			//@TODO need to support the other proxy actions
		});
	}

	/**
	 * @readonly
	 * @type {Proxy}
	 */
	get proxy() {
		return this.#proxy;
	}

	/**
	 * @readonly
	 * @type {ResolverContextHandle|null}
	 */
	get parent() {
		return this.#parent;
	}

	updateData(data) {
		this.#data = data || {};
		this.#cache = this.#initPropertyCache();
	}

	mergeData(data) {
		if(typeof data !== 'object' || data == null) return;
		Object.assign(this.#data, data);
		this.#cache = this.#initPropertyCache();
	}

	resetCache() {
		this.#cache = this.#initPropertyCache();
	}

	/**
	 *
	 * @returns {Map<string,PropertyDefinition>}
	 */
	#initPropertyCache() {
		const data = this.#data;
		if(data == _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"]) 
			return createGlobalCacheWrapper(this);	

		const cache = new Map();
		let type = data;
		while(!(0,_default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(type)) {
			for (let name of Reflect.ownKeys(type)) {
				if(typeof name !== 'string')
					;//ignore non string property names
				else if(RESERVED_WORDS.has(name))
					;//ignore reserved words
				else if(!VARNAME_CHECK.test(name))	
					console.warn(`Variable name is illegal ${name}, variable irgnored!`);				
				else
					cache.set(name, this);					
			}
			type = Reflect.getPrototypeOf(type);
		}

		return cache;
	}

	/**
	 * @param {string} property
	 * @returns {ResolverContextHandle|null}
	 */
	#getPropertyDef(property) {
		if (this.#cache.has(property)) return this.#cache.get(property);
		let parent = this.#parent;
		while (parent) {
			if (parent.#cache.has(property)) return parent.#cache.get(property);
			parent = parent.#parent;
		}
		return null;
	}
}


/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js"
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js ***!
  \*************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setDebug: () => (/* binding */ setDebug),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




let DEBUG = false;
const EXECUTERNAME = "context-deconstruction-executer";

/**
 * 
 * @param {boolean} value 
 */
const setDebug = (value) => {
	DEBUG = value;
}

const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ size: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const generate = (aStatement, contextProperties) => {
	const code = `
return (async ({${contextProperties}}) => {
    try{
        return ${aStatement}
    }catch(e){
        throw e;
    }
})(context || {});`;

	if (DEBUG)
		console.log("genererated code: \n", code);

	return new Function("context", code);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement, contextProperties) => {
	const cacheKey = `${contextProperties}::${aStatement}`;
	if (EXPRESSION_CACHE.has(cacheKey)) {
		return EXPRESSION_CACHE.get(cacheKey);
	}
	const expression = generate(aStatement, contextProperties);
	EXPRESSION_CACHE.set(cacheKey, expression);
	return expression;
};

const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
	defaultContext: {},
	execution: (aStatement, aContext) => {
		const propertyNames = Object.getOwnPropertyNames(aContext || {});
		if(propertyNames.length > 50)
			console.warn(`High count of properties at first level, can be decrease the performence! count: ${propertyNames.length}`);

		const contextProperties = propertyNames.join(",");
		const expression = getOrCreateFunction(aStatement, contextProperties);
		return expression(aContext);
	},
});

(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js"
/*!******************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




const EXECUTERNAME = "context-object-executer";
const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ aSize: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const generate = (aStatement) => {
	const code = `
return (async (ctx) => {
    try{
        return ${aStatement}
    }catch(e){
        throw e;
    }
})(context || {});`;

	//console.log("code", code);

	return new Function("context", code);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement) => {

	const cacheKey = aStatement;

	if (EXPRESSION_CACHE.has(cacheKey)) {
		return EXPRESSION_CACHE.get(cacheKey);
	}
	const expression = generate(aStatement);
	EXPRESSION_CACHE.set(cacheKey, expression);
	return expression;
};

const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
	defaultContext: {},
	execution: (aStatement, aContext) => {
		const expression = getOrCreateFunction(aStatement);
	return expression(aContext);
	},
});

(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js"
/*!***************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




const EXECUTERNAME = "with-scoped-executer";
const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ aSize: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

let initialCall = true;

/**
 * 
 * @param {string} aStatement 
 * @returns {Function}
 */
const generate = (aStatement) => {
const code = `
	return (async (context) => {
		with(context){
			try{ 
				return ${aStatement}
			}catch(e){
				throw e;
			}
		}
	})(context || {});
`;
	//console.log("code", code);

	return new Function("context", code);
};

/**
 * 
 * @param {string} aStatement 
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement) => {
	if (EXPRESSION_CACHE.has(aStatement)) {
		return EXPRESSION_CACHE.get(aStatement);
	}
	const expression = generate(aStatement);
	EXPRESSION_CACHE.set(aStatement, expression);
	return expression;
};



const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({defaultContext: {}, execution: (aStatement, aContext) => {
		if(initialCall){
			initialCall = false;
			console.warn(new Error(`With Scoped expression execution is marked as deprecated.`));
		}

		const expression = getOrCreateFunction(aStatement);
		return expression(aContext);
	}});
(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WithScopedExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js");
/* harmony import */ var _ContextObjectExecuter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextObjectExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js");
/* harmony import */ var _ContextDeconstructorExecuter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContextDeconstructorExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js");
//import "./EsprimaExecuter.js";




/***/ },

/***/ "./node_modules/@default-js/defaultjs-html-components/index.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/index.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   componentBaseOf: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__.componentBaseOf),
/* harmony export */   createUUID: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__.createUUID),
/* harmony export */   define: () => (/* reexport safe */ _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__.define)
/* harmony export */ });
/* harmony import */ var _src_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Component.js */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utils/DefineComponentHelper.js */ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js");







/***/ },

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Component.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Component.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentBaseOf: () => (/* binding */ componentBaseOf),
/* harmony export */   createUUID: () => (/* binding */ createUUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID.js */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants.js */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");
/* harmony import */ var _utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper.js */ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js");





/**
 * @function createUID
 * 
 * create an unique identifire.
 * 
 * @param {string} [prefix] 
 * @param {string} [suffix]
 * @returns 
 */
const createUUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
	while (count < 100) {
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID_js__WEBPACK_IMPORTED_MODULE_1__.uuid)()}${suffix ? suffix : ""}`;
		if (!document.getElementById(id)) return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};

const buildClass = (htmlBaseType) => {
	const clazz = class Component extends htmlBaseType {

		static get NODENAME() {
			return this.nodeName.toLowercase();
		}

		static get observedAttributes() {
			return [];
		}

		#ready = null;
		#postConstructs = [];

		constructor({ shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = "", postConstucts = null } = {}) {
			super();
			this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
			if (createUID) this.#postConstructs.push(async () => this.attr("id", createUUID(uidPrefix, uidSuffix)));
			
			if (shadowRoot) this.attachShadow({ mode: "open" });

			if (content) this.root.append(typeof content === "function" ? content(this) : content);

			if(postConstucts instanceof Array)
				for(let post of postConstucts)
					if(typeof post === "function")
						this.#postConstructs.push(post)
		}

		
		/**
		 * Array of post construct functions
		 *
		 * @readonly
		 * @type {Array<Function>}
		 */
		get postConstructs(){
			return this.#postConstructs;
		}

		
		/**
		 * root
		 *
		 * @readonly
		 * @type {HTMLElement|ShadowRoot}
		 */
		get root() {
			return this.shadowRoot || this;
		}

		
		/**
		 * ready
		 *
		 * @readonly
		 * @type {Promise}
		 */
		get ready() {
			return this.#ready;
		}

		/**
		 * @function init
		 * @async
		 *
		 * @returns {Promise}
		 */
		async init() {
			for (let func of this.#postConstructs) await func(this);
		}

		/**
		 * 
		 */
		async destroy() {
			if (this.ready.resolved) this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		}

		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected)
				//init(this)
				this.init()
					.then((value) => this.#ready.resolve(value))
					.catch((error) => this.#ready.resolve(error));
		}

		adoptedCallback() {
			this.connectedCallback();
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants_js__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_3__.attributeChangeEventname)(name, this));
				this.trigger(_Constants_js__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_3__.componentEventname)("change", this));
			}
		}

		disconnectedCallback() {
			this.destroy();
		}
	};

	return clazz;
};

const CLAZZMAP = new Map();

const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if (clazz == null) {
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
};

const Component = componentBaseOf(HTMLElement);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Constants.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js"
/*!***********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   define: () => (/* binding */ define),
/* harmony export */   toNodeName: () => (/* binding */ toNodeName)
/* harmony export */ });
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants.js */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return _Constants_js__WEBPACK_IMPORTED_MODULE_0__.componentPrefix + name;
};

const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (define); 


/***/ },

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeChangeEventname: () => (/* binding */ attributeChangeEventname),
/* harmony export */   componentEventname: () => (/* binding */ componentEventname),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants.js */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


/**
 * @function componentEventname
 * 
 * creates an event name for an component
 * 
 * @param {string} eventType 
 * @param {string|HTMLElement|Component} node 
 * @param {string} [separator] default is ":"
 * 
 * @returns {string} 
 */
const componentEventname = (eventType, node, separator = ":" ) => {	
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);
	
   return `${nodename.toLowerCase()}${separator}${eventType}`;//use @ as separtor and not :
};

/**
 * @function attributeChangeEventname
 *  * 
 * @param {string} attribute 
 * @param {string|HTMLElement|Component} node 
 * @param {string} [separator] default is ":"
 * 
 * @returns {string}
 */
const attributeChangeEventname = (attribute, node, separator = ":"  ) => {
    return componentEventname(`${_Constants_js__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node, separator);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});

/***/ },

/***/ "./src/Base.js"
/*!*********************!*\
  !*** ./src/Base.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

	/** @type {boolean} */
	#initialized = false;
	/** @type {ConditionHandle} */
	#conditionHandle;
	/** @type {EditableHandle} */
	#editableHandle;	
	/** @type {ValidationHandle} */
	#validationHandle;	
	/** @type {MessageHandle}*/
	#messageHandle;

	#readonly = false;
	#editable = false;

	constructor() {
		super();
		this.#messageHandle = new _handels_MessageHandle__WEBPACK_IMPORTED_MODULE_5__["default"](this);
		this.#conditionHandle = new _handels_ConditionHandle__WEBPACK_IMPORTED_MODULE_2__["default"](this);
		this.#editableHandle = new _handels_EditableHandle__WEBPACK_IMPORTED_MODULE_3__["default"](this);
		this.#validationHandle = new _handels_ValidationHandle__WEBPACK_IMPORTED_MODULE_4__["default"](this);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			await this.#conditionHandle.init();
			await this.#messageHandle.init();
			await this.#validationHandle.init();
			await this.#editableHandle.init();
		}
	}

	get id() {
		return (super.id || "").trim();
	}

	get name() {
		return (super.name || "").trim();
	}

	get validationHandle() {
		return this.#validationHandle;
	}

	get messageHandle() {
		return this.#messageHandle;
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
		return this.#readonly;
	}

	set readonly(readonly) {
		//console.log("change readonly: ", {readonly, editable: this.editable, this: this});
		this.#readonly = readonly || !this.editable;
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, this.#readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}
	
	async readonlyUpdated() {}

	get editable() {
		return this.#editable;
	}

	set editable(editable) {
		//console.log("change editable: ", editable, this);
		this.#editable = editable;
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateEditableState)(this, editable, !this.ready.resolved);
		this.editableUpdated();
	}

	async editableUpdated() {}

	set condition(condition) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateConditionState)(this, condition);
		this.conditionUpdated();
	}

	get condition() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION_INVALID);
	}

	async conditionUpdated() {}

	set valid(valid) {
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateValidState)(this, valid);
		this.validUpdated();
	}

	get valid() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_VALID);
	}

	async validUpdated() {}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);


/***/ },

/***/ "./src/BaseField.js"
/*!**************************!*\
  !*** ./src/BaseField.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findParentField: () => (/* binding */ findParentField)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/Base.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _utils_ValueHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ValueHelper */ "./src/utils/ValueHelper.js");





const _parent = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_2__.privatePropertyAccessor)("parent");

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

/**
 * basic field class - extend custom fields by this class
 *
 * @class BaseField
 * @typedef {BaseField}
 * @extends {Base}
 * @example
 * class CustomField extend BaseField{
 * 	constructor(option = {}){
 * 		super(option);
 * 	}
 *
 * 	async init(){
 * 		await super.init();
 * 		//your custom code
 * 	}
 * }
 */
class BaseField extends _Base__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_Base__WEBPACK_IMPORTED_MODULE_1__["default"].observedAttributes);
	}

	#value = null;

	/**
	 * Creates an instance of BaseField.
	 *
	 * @constructor
	 * @param {{}} [options={}]
	 */
	constructor(options = {}) {
		super(options);
		const { value } = options;
		this.#value = value;
		this.root.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_UPDATED, (event) => {
			event.stopPropagation();
			event.preventDefault();
		});
	}

	/**
	 * Override this function to initialize the custom field.
	 *
	 * @async
	 * @returns {Promise<void>}
	 *
	 * @example
	 * class CustomField extend BaseField{
	 * 	constructor(option = {}){
	 * 		super(option);
	 * 	}
	 *
	 * 	async init(){
	 * 		await super.init();
	 * 		//your custom code
	 * 	}
	 * }
	 */
	async init() {
		this.ready.then(() => this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INITIALIZED));
		await super.init();
	}

	/**
	 * Is called by destroying the component.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async destroy() {
		this.publishValue(null);
		await super.destroy();
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_REMOVED);
	}

	/**
	 * Get parent field.
	 *
	 * @readonly
	 * @type {BaseField}
	 */
	get parentField() {
		let parent = _parent(this);
		if (!parent) {
			parent = findParentField(this);
			_parent(this, parent);
		}
		return parent;
	}

	/**
	 * Is called if the condition state updated.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async conditionUpdated() {
		this.active = this.condition;
		await this.publishValue();
	}

	/**
	 * Get name of field.
	 *
	 * @readonly
	 * @type {string}
	 */
	get name() {
		return this.getAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME);
	}

	/**
	 * Is field required.
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get required() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_REQUIRED);
	}

	/**
	 * Has field a value.
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get hasValue() {
		return !this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NOVALUE);
	}

	/**
	 * Get or set the raw value to field. (only for internal use)
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>|Promise<void>}
	 *
	 * @example
	 * await field.rawValue("value") // set the value of to "value"
	 * await field.rawValue() // returns the current value of field
	 */
	async rawValue(value) {
		if (arguments.length === 0) return this.#value;
		else this.#value = await value;
	}

	/**
	 * Get or set value to field.
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>|Promise<void>}
	 *
	 * @example
	 * await field.value("value") // set the value of to "value"
	 * await field.value() // returns the current value of field
	 */
	async value(value) {
		const { condition, valid, ready } = this;
		//console.log(`${this.nodeName}(${this.name}).value: `, arguments, {condition, valid});
		const currentValue = await this.rawValue();

		if (arguments.length == 0) return !condition || !valid ? null : structuredClone(currentValue);

		await ready;
		const accepted = await this.acceptValue(value);
		if (accepted) {
			value = (await this.normalizeValue(value)) || value;
			if (currentValue != value) {
				const result = await this.updatedValue(value);
				if (typeof result !== "undefined") value = result;

				//await this.rawValue(value);
				await this.publishValue(value);
			}
		}
	}

	/**
	 * Validate the field by given data context.
	 *
	 * @async
	 * @param {object} data
	 * @returns {Promise<boolean>}
	 */
	async validate(data) {
		const currentCondition = this.condition;
		const currentValid = this.valid;
		const valid = await super.validate(data);
		const condition = this.condition;
		this.validationStateChanged(currentCondition != condition, currentValid != valid);

		return valid;
	}

	/**
	 * Is called, if the validation state is changed
	 *
	 * @async
	 * @param {boolean} conditionChange
	 * @param {boolean} validationChanged
	 * @returns {Promise<void>}
	 */
	async validationStateChanged(conditionChange, validationChanged) {
		const hasChange = conditionChange || validationChanged;
		if (hasChange) this.publishValue();
	}

	/**
	 * Is called, if the value of field is updated
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>}
	 */
	async updatedValue(value) {
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALUE_UPDATED, value)
		return value;
	}

	/**
	 * Publish the value to the parent field or to form. If the value of custom field changed, call this function with the new value.
	 *
	 * @async
	 * @param {?*} value - default is the current value, if value available, then the value would be set as current value
	 * @returns {Promise<void>}
	 */
	async publishValue(value) {
		//console.log(`call ${this.nodeName}(${this.name}).publishValue:`, {arguments: arguments.length, value});
		await this.ready;
		if (arguments.length === 0) value = await this.rawValue();
		else await this.rawValue(value);

		//console.log("work with Value:", value)
		const noValue = (0,_utils_ValueHelper__WEBPACK_IMPORTED_MODULE_3__.dataIsNoValue)(value);
		const condition = this.condition;
		const required = this.required;
		value = (required && noValue) || !condition ? null : value;

		//console.log(`${this.nodeName}(${this.name}).publishValue:`, {required, condition, noValue, value});

		updateHasValue(!noValue, this);

		if (this.parentField) await this.parentField.childValueChanged(this, value);
		else if (this.form) await this.form.childValueChanged(this, value);
	}

	/**
	 * is called to check if the value is accepted. Can be override!
	 * 
	 * @async
	 * @param {*} value
	 * @returns {Promise<boolean>}
	 */
	async acceptValue(value) {
		return true;
	}

	/**
	 * is called to normalize value for field.
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>}
	 */
	async normalizeValue(value) {
		return value;
	}

	/**
	 * would be called by child fields
	 *
	 * @async
	 * @param {BaseField} field
	 * @param {*} value
	 * @returns {Promise<void>}
	 */
	async childValueChanged(field, value) {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseField);


/***/ },

/***/ "./src/Constants.js"
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ATTRIBUTE_ACTIVE: () => (/* binding */ ATTRIBUTE_ACTIVE),
/* harmony export */   ATTRIBUTE_CONDITION: () => (/* binding */ ATTRIBUTE_CONDITION),
/* harmony export */   ATTRIBUTE_CONDITION_INVALID: () => (/* binding */ ATTRIBUTE_CONDITION_INVALID),
/* harmony export */   ATTRIBUTE_CONDITION_VALID: () => (/* binding */ ATTRIBUTE_CONDITION_VALID),
/* harmony export */   ATTRIBUTE_DISABLED: () => (/* binding */ ATTRIBUTE_DISABLED),
/* harmony export */   ATTRIBUTE_EDITABLE: () => (/* binding */ ATTRIBUTE_EDITABLE),
/* harmony export */   ATTRIBUTE_EDITABLE_CONDITION: () => (/* binding */ ATTRIBUTE_EDITABLE_CONDITION),
/* harmony export */   ATTRIBUTE_EVALUATE: () => (/* binding */ ATTRIBUTE_EVALUATE),
/* harmony export */   ATTRIBUTE_FOR: () => (/* binding */ ATTRIBUTE_FOR),
/* harmony export */   ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT: () => (/* binding */ ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT),
/* harmony export */   ATTRIBUTE_INVALID: () => (/* binding */ ATTRIBUTE_INVALID),
/* harmony export */   ATTRIBUTE_MAX: () => (/* binding */ ATTRIBUTE_MAX),
/* harmony export */   ATTRIBUTE_MIN: () => (/* binding */ ATTRIBUTE_MIN),
/* harmony export */   ATTRIBUTE_NAME: () => (/* binding */ ATTRIBUTE_NAME),
/* harmony export */   ATTRIBUTE_NOVALUE: () => (/* binding */ ATTRIBUTE_NOVALUE),
/* harmony export */   ATTRIBUTE_PROGRESS: () => (/* binding */ ATTRIBUTE_PROGRESS),
/* harmony export */   ATTRIBUTE_READONLY: () => (/* binding */ ATTRIBUTE_READONLY),
/* harmony export */   ATTRIBUTE_REQUIRED: () => (/* binding */ ATTRIBUTE_REQUIRED),
/* harmony export */   ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY: () => (/* binding */ ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY),
/* harmony export */   ATTRIBUTE_STATE: () => (/* binding */ ATTRIBUTE_STATE),
/* harmony export */   ATTRIBUTE_STEP: () => (/* binding */ ATTRIBUTE_STEP),
/* harmony export */   ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT: () => (/* binding */ ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT),
/* harmony export */   ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT: () => (/* binding */ ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT),
/* harmony export */   ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD: () => (/* binding */ ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD),
/* harmony export */   ATTRIBUTE_USE_SUMMARY_PAGE: () => (/* binding */ ATTRIBUTE_USE_SUMMARY_PAGE),
/* harmony export */   ATTRIBUTE_VALID: () => (/* binding */ ATTRIBUTE_VALID),
/* harmony export */   ATTRIBUTE_VALUE: () => (/* binding */ ATTRIBUTE_VALUE),
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
/* harmony export */   EVENT_READONLY_STATE_CHANGED: () => (/* binding */ EVENT_READONLY_STATE_CHANGED),
/* harmony export */   EVENT_SITE_CHANGED: () => (/* binding */ EVENT_SITE_CHANGED),
/* harmony export */   EVENT_SUBMIT: () => (/* binding */ EVENT_SUBMIT),
/* harmony export */   EVENT_SUBMIT_RESULTS: () => (/* binding */ EVENT_SUBMIT_RESULTS),
/* harmony export */   EVENT_VALIDATION_REMOVED: () => (/* binding */ EVENT_VALIDATION_REMOVED),
/* harmony export */   EVENT_VALID_STATE_CHANGED: () => (/* binding */ EVENT_VALID_STATE_CHANGED),
/* harmony export */   EVENT_VALUE_CHANGED: () => (/* binding */ EVENT_VALUE_CHANGED),
/* harmony export */   EVENT_VALUE_UPDATED: () => (/* binding */ EVENT_VALUE_UPDATED),
/* harmony export */   FORMSTATES: () => (/* binding */ FORMSTATES),
/* harmony export */   FORMSTATE_FINISHED: () => (/* binding */ FORMSTATE_FINISHED),
/* harmony export */   FORMSTATE_INIT: () => (/* binding */ FORMSTATE_INIT),
/* harmony export */   FORMSTATE_INPUT: () => (/* binding */ FORMSTATE_INPUT),
/* harmony export */   FORMSTATE_SUBMITTING: () => (/* binding */ FORMSTATE_SUBMITTING),
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
const EVENTHANDLE_INPUT_TIMEOUT = 10 * EVENTHANDLE_TIMEOUT;

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
const FORMSTATE_SUBMITTING = "submitting";
const FORMSTATE_FINISHED = "finished";


/**
 * FORMSTATES 
 * @readonly
 * @enum {String}
 */
const FORMSTATES = {
	init: FORMSTATE_INIT,
	validating: FORMSTATE_VALIDATING,
	input: FORMSTATE_INPUT,
	summary: FORMSTATE_SUMMARY,
	submitting: FORMSTATE_SUBMITTING,
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
const EVENT_VALUE_UPDATED = `${EVENT_PREFIX}field-value-updated`;
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

//export const EVENT_VALIDATION_INITIALIZED = `${EVENT_PREFIX}validation-initialized`;
const EVENT_VALIDATION_REMOVED = `${EVENT_PREFIX}validation-removed`;

const EVENT_MESSAGE_INITIALIZED = `${EVENT_PREFIX}message-initialized`;
const EVENT_MESSAGE_REMOVED = `${EVENT_PREFIX}message-removed`;

const EVENT_ACTIVE_STATE_CHANGED = `${EVENT_PREFIX}active-state-changed`;
const EVENT_VALID_STATE_CHANGED = `${EVENT_PREFIX}valid-state-changed`;
const EVENT_EDITABLE_STATE_CHANGED = `${EVENT_PREFIX}editable-state-changed`;
const EVENT_READONLY_STATE_CHANGED = `${EVENT_PREFIX}readonly-state-changed`;


const SPECIALVARS = {
	CURRENTVALUE: "$value",
	CURRENTLISTROW: "$item",
};

//ATTRIBUTES
const ATTRIBUTE_NAME = "name";
const ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT = "custom-submitted-event";
const ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT = "endpoint";
const ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD = "method";
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
const ATTRIBUTE_FOR = "for";
const ATTRIBUTE_VALUE = "value";


/***/ },

/***/ "./src/Container.js"
/*!**************************!*\
  !*** ./src/Container.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
		//console.log("readonlyUpdated:", { readonly, fields })
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


/***/ },

/***/ "./src/Control.js"
/*!************************!*\
  !*** ./src/Control.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormButton */ "./src/FormButton.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls */ "./src/controls/index.js");






const BUTTONDUMMY = {
	active: false,
	disabled: false,
};

class SubmitWrapper{

	#submits;
	#active = false;
	#disabled = false;

	/**
	 * 
	 * @param {Array<FormButton>} theSubmits 
	 */
	constructor(theSubmits){
		this.#submits = theSubmits;
		this.#submits.forEach(button => {
			button.active = this.#active;
			button.disabled = this.#disabled;
		});
	}

	get active(){
		return this.#active;
	}

	set active(aValue){
		this.#active = aValue
		this.#submits.forEach(button =>	button.active = this.#active);
	}

	get disabled(){
		return this.#disabled;
	}

	set disabled(aValue){
		this.#disabled = aValue
		this.#submits.forEach(button =>	button.disabled = this.#disabled);
	}
}

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
			this.#initialized = true;
			this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_FORM);
			this.#back = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_BACK).first() || BUTTONDUMMY;
			this.#next = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_NEXT).first() || BUTTONDUMMY;
			this.#summary = this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUMMARY).first() || BUTTONDUMMY;
			this.#submit = new SubmitWrapper(this.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUBMIT) || [BUTTONDUMMY]);

			this.#form.on([_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_INITIALIZED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED], () => {
				this.update();
			});
		}
	}

	

	async update() {
		const form = this.#form;
		const state = form.state;
		const back = this.#back;
		const next = this.#next;
		const summary = this.#summary;
		const submit = this.#submit;

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
				next.disabled = activePage ? !activePage.valid : true;
			} else if (useSummaryPage && state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
				summary.active = true;
				summary.disabled = activePage ? !activePage.valid : true;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Control);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);


/***/ },

/***/ "./src/Field.js"
/*!**********************!*\
  !*** ./src/Field.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
				await this.#wrapper.init();
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
			const current = wrapper.value;
			if(current != value)
				await wrapper.updatedValue(value);
			
			await super.updatedValue(wrapper.value);
		}
	}

	async validationStateChanged(conditionChange, validationChanged){		
		if(conditionChange && this.condition){			
			const wrapper = this.#wrapper;
			const value = wrapper.value == null  || typeof wrapper.value === 'undefined' ?  null : wrapper.value;
			//console.log(`validationStateChanged(${this.name} (${conditionChange}, ${validationChanged}) -> ${value}`)
			this.rawValue(value);
		}
		
		return super.validationStateChanged(conditionChange, validationChanged);
	}
}

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_3__.define)(Field);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Field);


/***/ },

/***/ "./src/Form.js"
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./submitActions/DefaultFormSubmitAction */ "./src/submitActions/DefaultFormSubmitAction.js");
/* harmony import */ var _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./submitActions/SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/ValidationHelper */ "./src/utils/ValidationHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @default-js/defaultjs-common-utils */ "./node_modules/@default-js/defaultjs-common-utils/index.js");















const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_NAME, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_USE_SUMMARY_PAGE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STATE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

/**
 * @typedef {Object} FormResultOption
 *
 * @property {FORMSTATES} state
 *
 */


/**
 * Description placeholder
 *
 * @async
 * @param {BaseSubmitAction} actions
 * @param {Object} data
 * @param {Object} context
 * @param {FormResultOption} resultOption
 * @returns {Array<SubmitActionResult>}
 */
const executeActions = async (actions, data, context, resultOption) => {
	const results = [];

	for (let action of actions) {
		const accept = await action.accept(data);
		if (accept) {
			try {
				const result = (await action.execute(data, context, resultOption)) || new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_SUCCESS, null, data, context, resultOption);
				results.push(result);
				if (result.state == _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_FAIL) return results;
				if (typeof result.data !== "undefined" && result.data != null) data = result.data;
				if (typeof result.context !== "undefined" && result.data != context) data = result.data;
			} catch (e) {
				results.push(new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_FAIL, e, data, context, resultOption));
				return results;
			}
		}
	}
	return results;
};

/**
 * form class
 *
 * @class Form
 * @typedef {Form}
 * @extends {Component}
 */
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
	#submitActions = null;

	/**
	 * Creates an instance of Form.
	 *
	 * @constructor
	 */
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

	/**
	 * init form component
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
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

	/**
	 * get pages of form
	 *
	 * @readonly
	 * @type {Page[]}
	 */
	get pages() {
		if (!this.#pages) this.#pages = Array.from(this.root.find(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_PAGE));

		return this.#pages;
	}

	/**
	 * form state
	 *
	 * @type {string}
	 */
	get state() {
		return this.#state;
	}

	/**
	 * form state
	 */
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

	/**
	 * is form valid
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	/**
	 * get or set value of form
	 *
	 * @async
	 * @param {?object} data - form data
	 * @returns {Promise<object>|Promise<void>}
	 *
	 * @example
	 * await form.value() // returns the current value of form
	 * await form.value({test:"value"}) // set value to form
	 *
	 */
	async value(data) {
		await this.ready;
		if (this.#validation) await this.#validation;
		if (arguments.length == 0) return structuredClone(this.#data);

		if (this.state == _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			await Promise.all(
				this.pages.map((page) => {
					const name = page.name;
					return name ? page.value((0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_10__.valueHelper)(data, name)) : page.value(data);
				}),
			);

			await this.#validate();
		} else {
			return await new Promise((resolve) => {
				const handle = (event) => {
					event.stopPropagation();
					this.removeOn(handle, _Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED);
					resolve(this.value(data));
				};
				this.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FORM_STATE_CHANGED, handle);
			});
		}
	}

	/**
	 * get current active page
	 *
	 * @type {Page}
	 */
	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	/**
	 * set current active page
	 *
	 * @type {Page}
	 */
	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;

			if (current) this.scrollIntoView();
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SITE_CHANGED);
		}
	}

	/**
	 * first valid previous page of current active page
	 *
	 * @readonly
	 * @type {Page}
	 */
	get prevPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex - 1;
			for (let i = start; i >= 0; i--) {
				const page = pages[i];
				await this.#validate(page);
				if (page.condition) return page;
			}

			return null;
		})();
	}

	/**
	 * get next valid page of current active page
	 *
	 * @readonly
	 * @type {Page}
	 */
	get nextPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex + 1;
			if (pages) {
				for (let i = start; i < pages.length; i++) {
					const page = pages[i];
					await page.validate(this.#data);
					if (page.condition) return page;
				}
			}
			return null;
		})();
	}

	/**
	 * change active page to first valid previous page
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async toPrevPage() {
		if (this.state != _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT) {
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	/**
	 * change active page to next vaild page
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
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

	/**
	 * switch form into summary state
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async summary() {
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUMMARY;
	}

	/**
	 * get all form submit actions
	 *
	 * @readonly
	 * @type {DefaultFormSubmitAction[]}
	 */
	get submitActions() {
		if (!this.#submitActions) {
			const actions = [];
			const endpoint = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT);
			if (endpoint) {
				const method = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD) || "post";
				this.append(new _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_8__["default"](endpoint, method));
			}

			const childs = this.children;
			for (let child of childs) {
				if (child instanceof _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_7__["default"]) actions.push(child);
			}
			this.#submitActions = actions;
		}

		return this.#submitActions;
	}

	/**
	 * submit form
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async submit({ data = null, actions = [], context = {} } = {}) {
		const currentState = this.state;
		this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_SUBMITTING;
		let formdata = await this.value();
		const valid = await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_11__.validateFields)(formdata, this.pages);
		if (!valid) return;

		if (data) formdata = _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_12__.ObjectUtils.merge(formdata, data);

		/**
		 * @type {FormResultOption}
		 */
		const resultOption = {
			state: this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT : _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED,
		};

		actions = actions.concat(this.submitActions);
		if (actions) {
			const results = await executeActions(actions, formdata, context, resultOption);
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT_RESULTS, results);
		}

		this.state = resultOption.state;

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT, formdata);

		const customSubmittedEvent = (this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT) || "").trim();
		if (customSubmittedEvent.length > 0) this.trigger(customSubmittedEvent, formdata);
	}

	async validate() {
		await this.#validate();
	}

	async #validate(page) {
		const promise = _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_12__.PromiseUtils.lazyPromise();
		const action = async () => {
			const data = this.#data; //await fieldValueMapToObject(this.#value);

			const valid = page ? await page.validate(data) : await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_11__.validateFields)(data, this.pages);

			promise.resolve(valid);

			if (this.#validation == promise) {
				this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;
				this.#validation = null;
			}
		};

		if (this.#validation == null) {
			setTimeout(action, 1);
			this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING;
		} else this.#validation.then(action);

		this.#validation = promise;
		return promise;
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

		this.#data = await (0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_10__.fieldValueMapToObject)(this.#value, this.pages);

		const activePage = this.activePage;
		if (activePage) await this.#validate(activePage);
		else await this.#validate();
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Form);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);


/***/ },

/***/ "./src/FormButton.js"
/*!***************************!*\
  !*** ./src/FormButton.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");



const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_DISABLED];

/**
 * basic form button class
 * @date 3/13/2024 - 12:18:27 AM
 *
 * @class FormButton
 * @typedef {FormButton}
 * @extends {Component}
 */
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
		this.attr("tabindex","0").attr("role", "button");
		await super.init();
		if (this.#initialized) {			
			this.#initialized = true;
			this.active = false;
			this.disabled = false;
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


/***/ },

/***/ "./src/List.js"
/*!*********************!*\
  !*** ./src/List.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components/index.js */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _BaseField_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField.js */ "./src/BaseField.js");
/* harmony import */ var _list_DeleteRow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list/DeleteRow.js */ "./src/list/DeleteRow.js");
/* harmony import */ var _list_Rows_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/Rows.js */ "./src/list/Rows.js");
/* harmony import */ var _list_Row_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/Row.js */ "./src/list/Row.js");
/* harmony import */ var _list_AddRow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/AddRow.js */ "./src/list/AddRow.js");
/* harmony import */ var _utils_ValidationHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/ValidationHelper.js */ "./src/utils/ValidationHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");











const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MIN, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_MAX];

const buildData = async (rows, values) => {
	let data = [];
	for (let row of rows) data.push(values.get(row));

	if (data.length == 0) data = null;

	return data;
};

class List extends _BaseField_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES.concat(_BaseField_js__WEBPACK_IMPORTED_MODULE_2__["default"].observedAttributes);
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
		root.on(_list_AddRow_js__WEBPACK_IMPORTED_MODULE_6__.EVENT__INITIALIZED__BUTTON__ADDROW, (event) => {
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
			return await (0,_utils_ValidationHelper_js__WEBPACK_IMPORTED_MODULE_7__.validateFields)(data, this.rows);
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

		if ((0,_default_js_defaultjs_common_utils_src_ValueHelper_js__WEBPACK_IMPORTED_MODULE_8__.noValue)(value)) this.#values.delete(row);
		else this.#values.set(row, value);

		await super.childValueChanged(row, value);
		const data = await buildData(this.rows, values);
		await this.publishValue(data);
	}
}

(0,_default_js_defaultjs_html_components_index_js__WEBPACK_IMPORTED_MODULE_1__.define)(List);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);


/***/ },

/***/ "./src/Message.js"
/*!************************!*\
  !*** ./src/Message.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/Page.js"
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container */ "./src/Container.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_STEP];

/**
 * page class
 *
 * @class Page
 * @typedef {Page}
 * @extends {Container}
 */
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


/***/ },

/***/ "./src/ProgressBar.js"
/*!****************************!*\
  !*** ./src/ProgressBar.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/Step.js"
/*!*********************!*\
  !*** ./src/Step.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/Validation.js"
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");




const ATTRIBUTES = [_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, _Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION];
/**
 * @typedef ValidationOption
 * @property {boolean} option.hasValue
 * @property {boolean} option.required
 * @property {boolean} option.condition
 * @property {boolean} option.editable
 * @property {object} option.data
 * @property {Base} option.base
 */

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
	}

	async destroy() {
		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_REMOVED);
		await super.destroy();
	}

	/**
	 * active state
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get active() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE);
	}

	/**
	 * set active state
	 *
	 * @type {boolean}
	 */
	set active(active) {
		active ? this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, "") : this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTIVE, null);
	}

	/**
	 * condition string for evaluation
	 *
	 * @readonly
	 * @type {string}
	 */
	get condition() {
		return this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION);
	}

	/**
	 * validate
	 * 
	 * @async
	 * @param {ValidationOption} option
	 * @returns {Promise<boolean>}
	 */
	async validate({ hasValue, data }) {
		const valid = hasValue ? await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__.ExpressionResolver.resolve(this.condition, data, false) : true;
		this.active = !valid;
		return valid;
	}
}
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(Validation);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validation);


/***/ },

/***/ "./src/controls/BackButton.js"
/*!************************************!*\
  !*** ./src/controls/BackButton.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/controls/NextButton.js"
/*!************************************!*\
  !*** ./src/controls/NextButton.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/controls/SubmitButton.js"
/*!**************************************!*\
  !*** ./src/controls/SubmitButton.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _FormButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormButton */ "./src/FormButton.js");
/* harmony import */ var _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");





const ATTRIBUTES = [];
class SubmitButton extends _FormButton__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_CONTROL_SUBMIT;
	}

	#initialized = false;
	#condition;
	#submitActions;

	constructor() {
		super();
	}

	async init(){

		await super.init();
		if (this.#initialized) {			
			this.#initialized = true;			
			this.#condition = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_CONDITION);
		}
	}

	get actions() {
		if (!this.#submitActions) {
			const actions = [];
			const childs = this.children;
			for (let child of childs) {
				if (child instanceof _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_2__["default"]) actions.push(child);
			}
			this.#submitActions = actions;
		}

		return this.#submitActions;
	}

	get condition(){
		return this.#condition;
	}
	
	execute() {
		this.form.submit({actions:this.actions});
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitButton);
(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_3__.define)(SubmitButton);


/***/ },

/***/ "./src/controls/SummaryButton.js"
/*!***************************************!*\
  !*** ./src/controls/SummaryButton.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/controls/index.js"
/*!*******************************!*\
  !*** ./src/controls/index.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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








/***/ },

/***/ "./src/handels/ConditionHandle.js"
/*!****************************************!*\
  !*** ./src/handels/ConditionHandle.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    async init(){
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
        try{
            condition = condition ? await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(condition, data, false) : true;
        } catch{
            condition = false;
        }

        if(condition != current)
            base.condition = condition

        //console.log(`condition(${base.name}) result:`, condition);
        return condition;       
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConditionHandle);

/***/ },

/***/ "./src/handels/EditableHandle.js"
/*!***************************************!*\
  !*** ./src/handels/EditableHandle.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

	async init(){
	}

	get condition() {
		if (this.#condition == null) this.#condition = (this.#base.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE_CONDITION) || "").trim() || false;

		return this.#condition;
	}

	async validate(data) {
		let editable = true;
		const base = this.#base;
		const current = base.editable;
		const condition = this.condition;
		//console.log("validate editable:", {condition, data, base});
		try {
			editable = condition ? await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(condition, data, false) : true;
		} catch {
			editable = false;
		}

		if (editable != current) this.#base.editable = editable;

		return editable;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditableHandle);


/***/ },

/***/ "./src/handels/MessageHandle.js"
/*!**************************************!*\
  !*** ./src/handels/MessageHandle.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_DataHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DataHelper.js */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_MessageHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/MessageHelper.js */ "./src/utils/MessageHelper.js");







class MessageHandle {

    #base = null;
    #messages = new Set();

    constructor(base){
        this.#base = base;

        base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_MESSAGE_REMOVED, (event) =>{            
            event.preventDefault();
            event.stopPropagation();
            const target = event.target;
            this.#messages.delete(target);
        }); 
    }

    async init(){
        const base = this.#base;
		const { form, id, name } = base;
		const messages = this.messages;
		if (id && id.length != 0) {
			(0,_utils_DataHelper_js__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(messages, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_MESSAGE}[for="${id}"]`));
			(0,_utils_DataHelper_js__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(messages, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_MESSAGE}[for="#${id}"]`));
		}

		if (name && name.length != 0) {
			(0,_utils_DataHelper_js__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(messages, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_MESSAGE}[for="${name}"]`));
		}

		(0,_utils_DataHelper_js__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(messages, (0,_utils_MessageHelper_js__WEBPACK_IMPORTED_MODULE_2__.findMessages)(base));

    }

    get messages(){
        return this.#messages;
    }

    async validate(data) {
        for(let message of this.#messages)
            message.update(data);
    }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageHandle);

/***/ },

/***/ "./src/handels/ValidationHandle.js"
/*!*****************************************!*\
  !*** ./src/handels/ValidationHandle.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ValidationHelper */ "./src/utils/ValidationHelper.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Base */ "./src/Base.js");
/* harmony import */ var _Validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Validation */ "./src/Validation.js");










/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback CustomValidation
 * @param {import("../Validation").ValidationOption} option
 */

/**
 * @async
 * @function
 * 
 * execute custom validation callback functions
 * 
 * @param {Array<Function>} validations
 * @param {import("../Validation").ValidationOption} option
 * @returns {Promise<boolean>}
 */
const validateCustomValidations = async (validations, option) => {
	if ((validations.size == 0)) return true;

	const promises = await Promise.all(Array.from(validations).map((validation) => validation(option)));
	return promises.every((valid) => valid);
};

/**
 * @async
 * @function
 * 
 * execute validations
 * 
 * @param {Array<Validation>} validations
 * @param {import("../Validation").ValidationOption} option
 * @returns {Promise<boolean>}
 */
const validateValidations = async (validations, option) => {
	if ((validations.size == 0)) return true;

	const promises = await Promise.all(Array.from(validations).map((validation) => validation.validate(option)));
	return promises.every((valid) => valid);
};

class ValidationHandle {
	/**
	 * Reference base object
	 *
	 * @type {Base}
	 */
	#base = null;

	/**
	 * Description placeholder
	 *
	 * @type {Set<Validation>}
	 */
	#validations = new Set();
	#customs = new Set();

	constructor(base) {
		this.#base = base;

		base.on(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_VALIDATION_REMOVED, (event) => {
			event.stopPropagation();
			this.#validations.delete(event.target);
		});
	}

	async init() {
		const base = this.#base;
		const { form, id, name } = base;
		const validations = this.validations;
		if (id && id.length != 0) {
			(0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(validations, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_VALIDATION}[for="${id}"]`));
			(0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(validations, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_VALIDATION}[for="#${id}"]`));
		}

		if (name && name.length != 0) {
			(0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(validations, form.find(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_VALIDATION}[for="${name}"]`));
		}

		(0,_utils_DataHelper__WEBPACK_IMPORTED_MODULE_1__.addAllToSet)(validations, (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_2__.findValidations)(base));
	}

	get validations() {
		return this.#validations;
	}

	get customValidations() {
		return this.#customs;
	}

	addCustomValidation(validation) {
		this.#customs.add(validation);
	}

	async validate(data) {
		const base = this.#base;
		const { hasValue, required, condition, editable } = base;

		//console.log(`${base.nodeName}(${base.name}) validate:`, { hasValue, required, condition, editable, currentValid }, data);
		let valid = true;
		if (condition) {
			valid = required ? hasValue : true;

			const option ={
				hasValue: hasValue, 
				required: required, 
				condition: condition, 
				editable: editable,
				data,
				base
			};

			//console.log("validation option:", option)

			valid = await validateCustomValidations(this.#customs, option) && valid;
			valid = await validateValidations(this.#validations, option) && valid;
		}

		base.valid = valid;

		//console.log(`${base.nodeName}(${base.name}) validate result:`, {valid});
		return valid;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationHandle);


/***/ },

/***/ "./src/list/AddRow.js"
/*!****************************!*\
  !*** ./src/list/AddRow.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/list/DeleteRow.js"
/*!*******************************!*\
  !*** ./src/list/DeleteRow.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/list/Row.js"
/*!*************************!*\
  !*** ./src/list/Row.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/list/Rows.js"
/*!**************************!*\
  !*** ./src/list/Rows.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/submitActions/BaseSubmitAction.js"
/*!***********************************************!*\
  !*** ./src/submitActions/BaseSubmitAction.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Component */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");





// logic
/**
 * BaseSubmitAction class
 *
 * @class BaseSubmitAction
 * @typedef {BaseSubmitAction}
 * @extends {Component}
 */
class BaseSubmitAction extends _default_js_defaultjs_html_components_src_Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static STATES = {
		FAIL: _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_FAIL,
		SUCCESS: _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_SUCCESS,
	};

	constructor() {
		super();
	}

	#initialized = false;
	#form;

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.style.display = "none";
			this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_3__.NODENAME_FORM);
			if (this.#form) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.EVENT_INITIALIZE_SUBMIT_ACTION);
		}
	}

	get form() {
		return this.#form;
	}

	async accept(data = {}) {
		const condition = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_CONDITION);
		if (condition) return await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolve(condition, data, false);

		return true;
	}

	/**
	 * @abstract
	 * @param {*} data 
	 * @param {*} context 
	 * @param {import("../Form").FormResultOption} formResultOption 
	 * @returns {SubmitActionResult}
	 */
	async execute(data = {}, context = {}, formResultOption) {
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__["default"](_SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_FAIL, "not implemented", null, data, context, formResultOption);
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseSubmitAction);


/***/ },

/***/ "./src/submitActions/DefaultFormSubmitAction.js"
/*!******************************************************!*\
  !*** ./src/submitActions/DefaultFormSubmitAction.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

	async execute(data = {}, context = {}) {		
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
			
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__["default"](this, response.ok ? _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_SUCCESS : _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_FAIL, response, data, context);		
	}
};

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_0__.define)(DefaultFormSubmitAction);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DefaultFormSubmitAction);


/***/ },

/***/ "./src/submitActions/SubmitActionResult.js"
/*!*************************************************!*\
  !*** ./src/submitActions/SubmitActionResult.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STATE_FAIL: () => (/* binding */ STATE_FAIL),
/* harmony export */   STATE_SUCCESS: () => (/* binding */ STATE_SUCCESS),
/* harmony export */   SubmitActionResultState: () => (/* binding */ SubmitActionResultState),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _BaseSubmitAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");



const STATE_SUCCESS = "success";
const STATE_FAIL = "fail";

/**
 * SubmitActionResultState
 * @readonly
 * @enum {string}
 */
const SubmitActionResultState = {
	success: STATE_SUCCESS,
	fail: STATE_FAIL,
};

/**
 * Description placeholder
 *
 * @class SubmitActionResult
 * @typedef {SubmitActionResult}
 */
class SubmitActionResult {
	static STATE_SUCCESS = STATE_SUCCESS;
	static STATE_FAIL = STATE_FAIL;

	#resultOption;

	/**
	 * @constructor
	 * @param {BaseSubmitAction} action
	 * @param {SubmitActionResultState} state
	 * @param {string} message
	 * @param {Object} data
	 * @param {Object} context
	 * @param {import("../Form").FormResultOption} resultOption
	 */
	constructor(action, state, message, data, context, resultOption) {
		this.action = action;
		this.state = state;
		this.message = message;
		this.data = data;
		this.context = context;
		this.#resultOption = resultOption;
	}

	get resultOption() {
		return this.#resultOption;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitActionResult);


/***/ },

/***/ "./src/utils/DataHelper.js"
/*!*********************************!*\
  !*** ./src/utils/DataHelper.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAllToArray: () => (/* binding */ addAllToArray),
/* harmony export */   addAllToSet: () => (/* binding */ addAllToSet),
/* harmony export */   evaluationData: () => (/* binding */ evaluationData),
/* harmony export */   fieldValueMapToObject: () => (/* binding */ fieldValueMapToObject),
/* harmony export */   rebuildDataByFields: () => (/* binding */ rebuildDataByFields),
/* harmony export */   updateData: () => (/* binding */ updateData),
/* harmony export */   valueHelper: () => (/* binding */ valueHelper)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");



/**
* Performs a deep merge of objects and returns new object. Does not modify
* objects (immutable) and merges arrays via concatenation.
*
* @param {...object} objects - Objects to merge
* @returns {object} New object with merged key/values
*/
function mergeDeep(...objects) {
	const isObject = obj => obj && typeof obj === 'object';
	
	return objects.reduce((prev, obj) => {
	  Object.keys(obj).forEach(key => {
		const pVal = prev[key];
		const oVal = obj[key];
		
		if (Array.isArray(pVal) && Array.isArray(oVal)) {
		  prev[key] = pVal.concat(...oVal);
		}
		else if (isObject(pVal) && isObject(oVal)) {
		  prev[key] = mergeDeep(pVal, oVal);
		}
		else {
		  prev[key] = oVal;
		}
	  });
	  
	  return prev;
	}, {});
  }


const updateData = async (data, name, value) => {
	if (!(0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_1__.noValue)(value)) {
		if (name) valueHelper(data, name, value);
		else data = mergeDeep(data, value);
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
	data[_Constants__WEBPACK_IMPORTED_MODULE_0__.SPECIALVARS.CURRENTVALUE] = await base.rawValue();

	let row = base.parent(_Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME_LIST_ROW);
	let temp = data;
	while (row) {
		temp[_Constants__WEBPACK_IMPORTED_MODULE_0__.SPECIALVARS.CURRENTLISTROW] = await row.rawValue();
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
		data[name] = data[name] || {};
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

/**
 * @function addAllToArray
 * 
 *  Merge a source set into a target set
 *
 * @param {Array<*>} aTarget
 * @param {Iterable<*>} aSource
 *
 * @returns {Set<*>} returns the target set
 */
const addAllToArray = (aTarget, aSource) => {
	if (aSource != null) {
		for (let source of aSource) aTarget.push(source);
	}

	return aTarget;
};

/**
 * @function addAllToSet
 * 
 *  Merge a source set into a target set
 *
 * @param {Set<*>} aTarget
 * @param {Iterable<*>} aSource
 *
 * @returns {Set<*>} returns the target set
 */
const addAllToSet = (aTarget, aSource) => {
	if (aSource != null) {
		for (let source of aSource){
			aTarget.add(source);
		}
	}

	return aTarget;
};


/***/ },

/***/ "./src/utils/EventHelper.js"
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ },

/***/ "./src/utils/MessageHelper.js"
/*!************************************!*\
  !*** ./src/utils/MessageHelper.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findMessages: () => (/* binding */ findMessages)
/* harmony export */ });
/* harmony import */ var _NodeHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeHelper.js */ "./src/utils/NodeHelper.js");
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Base.js */ "./src/Base.js");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Constants.js */ "./src/Constants.js");
/* harmony import */ var _Message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Message.js */ "./src/Message.js");





/** 
 * @function findMessages
 * 
 * Find all messages of root as children on dom tree
 * 
 * @param {Base} root 
 * 
 * @returns {Array<Validation>}
 */
const findMessages = (root) => {
	return (0,_NodeHelper_js__WEBPACK_IMPORTED_MODULE_0__.treeFilter)({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof _Base_js__WEBPACK_IMPORTED_MODULE_1__["default"]) return { accept: false, stop: true };
				else if (element instanceof _Message_js__WEBPACK_IMPORTED_MODULE_3__["default"] && element.attr(_Constants_js__WEBPACK_IMPORTED_MODULE_2__.ATTRIBUTE_FOR) == null) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};

/***/ },

/***/ "./src/utils/NodeHelper.js"
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findFields: () => (/* binding */ findFields),
/* harmony export */   treeFilter: () => (/* binding */ treeFilter)
/* harmony export */ });
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseField */ "./src/BaseField.js");


/**
 * 
 * @param {object} option 
 * @param {HTMLElement} option.root 
 * @param {Function} option.filter 
 * @returns 
 */
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




/***/ },

/***/ "./src/utils/StateHelper.js"
/*!**********************************!*\
  !*** ./src/utils/StateHelper.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
	//console.log("updateReadonlyState", {target, readonly})
	const oldState = target.readonly;
	if (readonly) 
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, "");
	else
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY, null);
	
	if (oldState != readonly || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_READONLY_STATE_CHANGED);
};

const updateEditableState = (target, editable, initial = false) => {
	const oldState = target.editable;
	if (editable) 
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, "");
	else
		target.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE, null);

	if (oldState != editable || initial) target.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_EDITABLE_STATE_CHANGED);
};

/***/ },

/***/ "./src/utils/ValidationHelper.js"
/*!***************************************!*\
  !*** ./src/utils/ValidationHelper.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findValidations: () => (/* binding */ findValidations),
/* harmony export */   validateFields: () => (/* binding */ validateFields)
/* harmony export */ });
/* harmony import */ var _NodeHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeHelper.js */ "./src/utils/NodeHelper.js");
/* harmony import */ var _Validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Validation */ "./src/Validation.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base */ "./src/Base.js");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Constants.js */ "./src/Constants.js");





const validateFields = async (data, fields) => {
    return (await Promise.all(fields.map(field => field.validate(data))))
        .reduce((valid, fieldValid) => valid ? fieldValid: false, true);
}

/** 
 * @function findValidations
 * 
 * Find all validations of root as children on dom tree
 * 
 * @param {Base} root 
 * 
 * @returns {Array<Validation>}
 */
const findValidations = (root) => {
	return (0,_NodeHelper_js__WEBPACK_IMPORTED_MODULE_0__.treeFilter)({
		root,
		filter: (element) => {
			if (root != element) {
				if (element instanceof _Base__WEBPACK_IMPORTED_MODULE_2__["default"]) return { accept: false, stop: true };
				else if (element instanceof _Validation__WEBPACK_IMPORTED_MODULE_1__["default"] && element.attr(_Constants_js__WEBPACK_IMPORTED_MODULE_3__.ATTRIBUTE_FOR) == null) return { accept: true, stop: true };
			}
			return { accept: false };
		},
	});
};

/***/ },

/***/ "./src/utils/ValueHelper.js"
/*!**********************************!*\
  !*** ./src/utils/ValueHelper.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataIsNoValue: () => (/* binding */ dataIsNoValue)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");


const dataIsNoValue = (value) => {
	if ((0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__.noValue)(value)) return true;

	const type = typeof value;
	if (type === "number" && isNaN(value)) return true;
	if (type === "boolean") return false;
	if (type === "string" && value.trim().length == 0) return true;
	if (value instanceof Date) return false;
	if (value instanceof Array && value.length == 0) return true;
	if (value instanceof Set && value.length == 0) return true;
	if (value instanceof Map && value.length == 0) return true;
	if (type == "object" && Object.getOwnPropertyNames(value).length == 0) return true;

	return false;
};


/***/ },

/***/ "./src/wrapper/Checkbox.js"
/*!*********************************!*\
  !*** ./src/wrapper/Checkbox.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/wrapper/File.js"
/*!*****************************!*\
  !*** ./src/wrapper/File.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ File)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ValueHelper */ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _Wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Wrapper */ "./src/wrapper/Wrapper.js");





const INPUTSELECTOR = 'input[type="file"]';

const readFile = (file, readFnName) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener(
			"loadend",
			() => {
				resolve({
					name: file.name,
					type: (0,_default_js_defaultjs_common_utils_src_ValueHelper__WEBPACK_IMPORTED_MODULE_0__.emtpyOrNoValueString)(file.type) ?	"application/octet-stream" : file.type,
					size: file.size,
					data: reader.result,
				});
			},
			false,
		);
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
	base64: async (file) => {
		const result = await readFile(file, "readAsDataURL");
		result.data = result.data.substr(result.data.indexOf(",") + 1);
		result.format = "base64";
		return result;
	},
};

const readFiles = async (files, format, multiple) => {
	let result = [];
	for (let file of files) result.push(await FORMAT[format](file));

	if (result.length == 0) return null;

	return multiple ? result : result[0];
};

class File extends _Wrapper__WEBPACK_IMPORTED_MODULE_3__["default"] {
	static findInput(field) {
		return field.find(INPUTSELECTOR).first();
	}

	#value = null;
	constructor(field, input) {
		super(field, input);
	}

	async init() {
		await super.init();
		const { field, input } = this;
		this.multiple = input.multiple;
		this.format = field.attr("file-format") || "form-input";
		this.filenameTarget = field.attr("file-name-target");
		this.filenameTarget = this.filenameTarget ? field.find(this.filenameTarget).first() : null;
		const { format, multiple } = this;

		input.on(
			"input",
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__.toTimeoutHandle)(
				async () => {
					this.updatedValue(await readFiles(input.files, format, multiple));
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__.EVENT_FIELD_INPUT, this.value);
				},
				false,
				true,
			),
		);
		if (input.files && input.files.length != 0) this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_1__.EVENT_FIELD_INPUT, this.value);
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined") return true;
		else if (this.multiple) return value instanceof Array;
		else return typeof value === "object";
	}

	normalizeValue(value) {
		if (value == null || typeof value === "undefined") return null;
		else if (this.multiple) return value.length != 0 ? value : null;
		else return value;
	}

	updatedValue(value) {
		const currentValue = this.#value;
		if (value != currentValue) {
			this.#value = value;
			if (!value) this.input.value = null;

			const filename = this.filenameTarget;
			if (filename) {
				filename.empty();
				if (value) {
					if (this.multiple) {
						for (let file of value) {
							filename.append(`<span>${file.name}</span>`);
						}
					} else filename.append(`<span>${value.name}</span>`);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

	get valid() {
		return this.input.checkValidity();
	}
}


/***/ },

/***/ "./src/wrapper/Radio.js"
/*!******************************!*\
  !*** ./src/wrapper/Radio.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/wrapper/Select.js"
/*!*******************************!*\
  !*** ./src/wrapper/Select.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/wrapper/Text.js"
/*!*****************************!*\
  !*** ./src/wrapper/Text.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
			return Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber;
		},
		setValue: (value) => {
			input.valueAsNumber = value;
		},
		normalize: (value) => {
			if (!Number.isNaN(value)) return value;

			return null;
		},
	};
};
/*
const datetime = (input) => {
	return {
		accept: (value) => {
			return value instanceof Date || typeof value === "string" || typeof value === "number";
		},
		getValue: () => {
			return input.valueAsDate;
		},
		setValue: (value) => {
			input.valueAsDate = value;
		},
		normalize: (value) => {
			if (value) return value instanceof Date ? value : new Date(value);

			return null;
		},
	};
};*/

const date = (input) => {
	return {
		accept: (value) => {
			return value instanceof Date || typeof value === "string" || typeof value === "number";
		},
		getValue: () => {
			return input.valueAsDate;
		},
		setValue: (value) => {
			input.valueAsDate = value;
		},
		normalize: (value) => {
			if (value) return value instanceof Date ? value : new Date(value);

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
const TYPES = { text, number, datetime:date, "datetime-local": date, date, time, range: number };

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


/***/ },

/***/ "./src/wrapper/Wrapper.js"
/*!********************************!*\
  !*** ./src/wrapper/Wrapper.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Field */ "./src/Field.js");


class Wrapper {
	
	/**
	 * 
	 * @param {Field} field 
	 * @returns 
	 */
	static findInput(field){ return null;}
	
	/**
	 * 
	 * @param {Field} field 
	 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} input 
	 */
	constructor(field, input) {
		this.field = field;
		this.input = input;
	}

	/**
	 * @async
	 */
	async init() { }

	

	/**
	 * Description placeholder
	 *
	 * @type {boolean}
	 */
	set readonly(disabled) { }

	/**
	 * 
	 * @param {*} value 
	 * @returns {Promise<boolean>} 
	 */
	async acceptValue(value) {
		return true;
	}

	/**
	 * 
	 * @param {*} value 
	 * @returns {Promise<*>}
	 */
	async normalizeValue(value) {
		return value;
	}

	/**
	 * 
	 */
	async updatedValue() {
	}

	
	/**
	 * Description placeholder
	 *
	 * @readonly
	 * @type {*}
	 */
	get value(){
		return null;
	}
	
	
	/**
	 * Description placeholder
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get valid(){
		return true;
	}
}


/***/ },

/***/ "./src/wrapper/index.js"
/*!******************************!*\
  !*** ./src/wrapper/index.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLWRlZmF1bHRqcy1odG1sLWZvcm0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVHOztBQUViOzs7Ozs7Ozs7Ozs7Ozs7O0FDRjFGO0FBQ0EsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQSxVQUFVO0FBQ1YsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZCQUE2QjtBQUNqQyxJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLFFBQVEsaUJBQWlCLEVBQUU7QUFDL0IsSUFBSSxRQUFRLGlCQUFpQixFQUFFO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdEdkI7QUFDQSxXQUFXLHFCQUFNLHlCQUF5QixxQkFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7OztBQ1BOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsMERBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNSO0FBQ1E7QUFDVjtBQUNEO0FBQ0M7QUFDc0M7QUFDSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9qYXZhc2NyaXB0L01hcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvamF2YXNjcmlwdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvZGVDYWNoZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhlY3V0ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhlY3V0ZXJSZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvUmVzb2x2ZXJDb250ZXh0SGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL2V4ZWN1dGVyL0NvbnRleHREZWNvbnN0cnVjdG9yRXhlY3V0ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvZXhlY3V0ZXIvQ29udGV4dE9iamVjdEV4ZWN1dGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL2V4ZWN1dGVyL1dpdGhTY29wZWRFeGVjdXRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9leGVjdXRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvaGFuZGVscy9FZGl0YWJsZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvTWVzc2FnZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL01lc3NhZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9Ob2RlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvU3RhdGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9WYWxpZGF0aW9uSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvVmFsdWVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0NoZWNrYm94LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9GaWxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9SYWRpby5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvU2VsZWN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9UZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9XcmFwcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdMT0JBTCwgT2JqZWN0VXRpbHMsIEVzY2FwZXIsIFZhbHVlSGVscGVyLCBQcm9taXNlVXRpbHMsIFByaXZhdGVQcm9wZXJ0eSwgVVVJRCB9IGZyb20gXCIuL3NyY1wiO1xuXG5leHBvcnQgeyBHTE9CQUwsIE9iamVjdFV0aWxzLCBFc2NhcGVyLCBWYWx1ZUhlbHBlciwgUHJvbWlzZVV0aWxzLCBQcml2YXRlUHJvcGVydHksIFVVSUQgfTtcbiIsIi8vIHJlcXVpcmVkIHRvIGJ1aWxkIHRoZSBpbnRlcm5hbCBlc2NhcGUgZmlsdGVyIGZvciByZWdleFxuY29uc3QgUkVHRVhDSEFSTUFQID0gW1wiXFxcXFwiLFwiP1wiLFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIihcIiwgXCIpXCIsIFwiLlwiLCBcIl5cIiwgXCIkXCJdXG5cdC5tYXAoY2hhciA9PiB7IFxuXHRcdHJldHVybiB7ZjogbmV3IFJlZ0V4cChcIlxcXFxcIiArY2hhciwgXCJnXCIpLCB2IDogXCJcXFxcXCIgKyBjaGFyfTtcblx0fSk7XG5cblxuY29uc3QgbWFwcGluZyA9IChhVGV4dCwgdGhlRmlsdGVycykgPT4ge1xuXHRsZXQgdGV4dCA9IGFUZXh0O1xuXHR0aGVGaWx0ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0dGV4dCA9IHRleHQucmVwbGFjZShpdGVtLmYsIGl0ZW0udik7XG5cdH0pO1xuXHRyZXR1cm4gdGV4dDtcbn07XG5cbmNvbnN0IGJ1aWxkVW5lc2NhcGVMaXN0ID0gKGFDaGFyTWFwLCBpc0Nhc2VTZW5zaXRpdikgPT4ge1xuXHRjb25zdCBvcHRpb24gPSBpc0Nhc2VTZW5zaXRpdiA/IFwibWdcIiA6IFwibWdpXCI7IFxuXHRyZXR1cm4gYUNoYXJNYXAubWFwKGl0ZW0gPT4ge1xuXHRcdGlmKCFpdGVtLmF0IHx8IGl0ZW0uYXQgPT0gXCJ1bmVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5lc2NhcGVkLCBSRUdFWENIQVJNQVApLCBvcHRpb24pLCB2OiBpdGVtLmNoYXJ9XG5cdH0pLmZpbHRlcihpdGVtID0+ICEhaXRlbSk7XG59O1xuXG5jb25zdCBidWlsZEVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcImVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5jaGFyLFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uZXNjYXBlZH1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5jbGFzcyBFc2NhcGVyIHtcblx0Y29uc3RydWN0b3IoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdil7XG5cdFx0dGhpcy5lc2NhcGVNYXAgPSBidWlsZEVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0XHR0aGlzLnVuZXNjYXBlTWFwID0gYnVpbGRVbmVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0fVxuXHRcblx0ZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHR1bmVzY2FwZShhVGV4dCl7XG5cdFx0cmV0dXJuIG1hcHBpbmcoYVRleHQsIHRoaXMudW5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHRzdGF0aWMgUkVHRVhQX0VTQ0FQRVIoKXtcblx0XHRyZXR1cm4gbmV3IEVzY2FwZXIoW1xuXHRcdFx0e2NoYXI6IFwiXFxcXFwiLCBlc2NhcGVkIDogXCJcXFxcXFxcXFwifSxcblx0XHRcdHtjaGFyOiBcIj9cIiwgZXNjYXBlZCA6IFwiXFxcXD9cIn0sXG5cdFx0XHR7Y2hhcjogXCJbXCIsIGVzY2FwZWQgOiBcIlxcXFxbXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXVwiLCBlc2NhcGVkIDogXCJcXFxcXVwifSxcblx0XHRcdHtjaGFyOiBcIntcIiwgZXNjYXBlZCA6IFwiXFxcXHtcIn0sXG5cdFx0XHR7Y2hhcjogXCJ9XCIsIGVzY2FwZWQgOiBcIlxcXFx9XCJ9LFxuXHRcdFx0e2NoYXI6IFwiKFwiLCBlc2NhcGVkIDogXCJcXFxcKFwifSxcblx0XHRcdHtjaGFyOiBcIilcIiwgZXNjYXBlZCA6IFwiXFxcXClcIn0sXG5cdFx0XHR7Y2hhcjogXCIuXCIsIGVzY2FwZWQgOiBcIlxcXFwuXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXlwiLCBlc2NhcGVkIDogXCJcXFxcXlwifSxcblx0XHRcdHtjaGFyOiBcIiRcIiwgZXNjYXBlZCA6IFwiXFxcXCRcIn1cblx0XHRdKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFc2NhcGVyO1xuXG4iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xyXG5cdGNvbnN0cnVjdG9yKGtleSwgY29udGV4dCl7XHJcblx0XHR0aGlzLmtleSA9IGtleTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0fVxyXG5cdFxyXG5cdGdldCBrZXlEZWZpbmVkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5rZXkgaW4gdGhpcy5jb250ZXh0OyBcclxuXHR9XHJcblx0XHJcblx0Z2V0IGhhc1ZhbHVlKCl7XHJcblx0XHRyZXR1cm4gISF0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRnZXQgdmFsdWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgdmFsdWUoZGF0YSl7XHJcblx0XHR0aGlzLmNvbnRleHRbdGhpcy5rZXldID0gZGF0YTtcclxuXHR9XHJcblx0XHJcblx0c2V0IGFwcGVuZChkYXRhKSB7XHJcblx0XHRpZighdGhpcy5oYXNWYWx1ZSlcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRcdHZhbHVlLnB1c2goZGF0YSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZW1vdmUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgbG9hZChkYXRhLCBrZXksIGNyZWF0ZT10cnVlKSB7XHJcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XHJcblx0XHRjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiXFwuXCIpO1xyXG5cdFx0bGV0IG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcclxuXHRcdFx0aWYoIWNvbnRleHRbbmFtZV0pe1xyXG5cdFx0XHRcdGlmKCFjcmVhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRjb250ZXh0W25hbWVdID0ge31cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Y29udGV4dCA9IGNvbnRleHRbbmFtZV07XHJcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xyXG5cdH1cclxufTsiLCJpbXBvcnQgT2JqZWN0UHJvcGVydHkgZnJvbSBcIi4vT2JqZWN0UHJvcGVydHkuanNcIjtcclxuXHJcbmNvbnN0IGVxdWFsQXJyYXlTZXQgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRjb25zdCBsZW5ndGggPSBhLmxlbmd0aDtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYVtpXSwgYltpXSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxNYXAgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBhLmtleXMoKSlcclxuXHRcdGlmICghZXF1YWxQb2pvKGEuZ2V0KGtleSksIGIuZ2V0KGtleSkpKSB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJmYWxzZVwiKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVxdWFsQ2xhc3NlcyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgY2xhenpBID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpO1xyXG5cdGNvbnN0IGNsYXp6QiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihiKTtcclxuXHRpZiAoY2xhenpBICE9IGNsYXp6QikgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRpZiAoIWNsYXp6QSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpBKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsYXp6Qik7XHJcblxyXG5cdGlmIChwcm9wZXJ0aWVzQS5sZW5ndGggIT09IHByb3BlcnRpZXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIHByb3BlcnRpZXNBKSB7XHJcblx0XHRjb25zdCB2YWx1ZUEgPSBhW2tleV07XHJcblx0XHRjb25zdCB2YWx1ZUIgPSBiW2tleV07XHJcblxyXG5cdFx0aWYgKCFlcXVhbFBvam8odmFsdWVBLCB2YWx1ZUIpKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxPYmplY3QgPSAoYSwgYikgPT4ge1xyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmtleXMoYSk7XHJcblx0Y29uc3QgcHJvcGVydGllc0IgPSBPYmplY3Qua2V5cyhiKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSAob2JqZWN0KSA9PiB7XHJcblx0cmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IHR5cGVvZiBvYmplY3QgPT09IFwidW5kZWZpbmVkXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNQcmltaXRpdmUgPSAob2JqZWN0KSA9PiB7XHJcblx0aWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XHJcblx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRjYXNlIFwibnVtYmVyXCI6XHJcblx0XHRjYXNlIFwiYmlnaW50XCI6XHJcblx0XHRjYXNlIFwiYm9vbGVhblwiOlxyXG5cdFx0Y2FzZSBcInN0cmluZ1wiOlxyXG5cdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IChvYmplY3QpID0+IHtcclxuXHRpZihpc051bGxPclVuZGVmaW5lZChvYmplY3QpKVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJiAoIW9iamVjdC5jb25zdHJ1Y3RvciB8fCBvYmplY3QuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogZXF1YWxQb2pvIC0+IGNvbXBhcmVzIG9ubHkgcG9qb3MsIGFycmF5LCBzZXQsIG1hcCBhbmQgcHJpbWl0aXZlc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVxdWFsUG9qbyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgbnVsbEEgPSBpc051bGxPclVuZGVmaW5lZChhKTtcclxuXHRjb25zdCBudWxsQiA9IGlzTnVsbE9yVW5kZWZpbmVkKGIpO1xyXG5cdGlmIChudWxsQSB8fCBudWxsQikgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGlmIChpc1ByaW1pdGl2ZShhKSB8fCBpc1ByaW1pdGl2ZShiKSkgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGNvbnN0IHR5cGVBID0gdHlwZW9mIGE7XHJcblx0Y29uc3QgdHlwZUIgPSB0eXBlb2YgYjtcclxuXHRpZiAodHlwZUEgIT0gdHlwZUIpIHJldHVybiBmYWxzZTtcclxuXHRpZiAodHlwZUEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGEgPT09IGI7XHJcblx0Ly9pZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBBcnJheSB8fCBhIGluc3RhbmNlb2YgU2V0KSByZXR1cm4gZXF1YWxBcnJheVNldChhLCBiKTtcclxuXHQvL2lmIChhIGluc3RhbmNlb2YgTWFwKSByZXR1cm4gZXF1YWxNYXAoYSwgYik7XHJcblxyXG5cdHJldHVybiBlcXVhbE9iamVjdChhLCBiKSAmJiBlcXVhbENsYXNzZXMoYSwgYik7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IChvYmplY3QpID0+IHtcclxuXHRpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHJldHVybiBmYWxzZTtcclxuXHJcblx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYgKCF0YXJnZXQpIHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzTnVsbE9yVW5kZWZpbmVkLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGVxdWFsUG9qbyxcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IG5ldyBXZWFrTWFwKCk7XHJcbmV4cG9ydCBjb25zdCBwcml2YXRlU3RvcmUgPSAob2JqKSA9PiB7XHJcblx0aWYoUFJJVkFURV9QUk9QRVJUSUVTLmhhcyhvYmopKVxyXG5cdFx0cmV0dXJuIFBSSVZBVEVfUFJPUEVSVElFUy5nZXQob2JqKTtcclxuXHRcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0UFJJVkFURV9QUk9QRVJUSUVTLnNldChvYmosIGRhdGEpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXZhdGVQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBkYXRhID0gcHJpdmF0ZVN0b3JlKG9iaik7XHJcblx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMilcclxuXHRcdHJldHVybiBkYXRhW25hbWVdO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcclxuXHRcdGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuXHRlbHNlXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYWxsb3dlZCBzaXplIG9mIGFyZ3VtZW50cyFcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgPSAodmFybmFtZSkgPT4ge1xyXG5cdHJldHVybiBmdW5jdGlvbihzZWxmLCB2YWx1ZSl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDIpXHJcblx0XHRcdHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lLCB2YWx1ZSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkoc2VsZiwgdmFybmFtZSk7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtwcml2YXRlUHJvcGVydHksIHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yLCBwcml2YXRlU3RvcmV9OyIsImltcG9ydCB7ZGVmVmFsdWUsIGRlZkdldH0gZnJvbSBcIi4vT2JqZWN0VXRpbHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVvdXRQcm9taXNlID0gKGZuLCBtcykgPT57XHJcblx0bGV0IGNhbmNlbGVkID0gZmFsc2U7XHJcblx0bGV0IHRpbWVvdXQgPSBudWxsO1xyXG5cdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCk9PiB7XHJcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRmbihyLGUpO1xyXG5cdFx0fSwgbXMpXHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHRoZW4gPSBwcm9taXNlLnRoZW47XHJcblx0cHJvbWlzZS50aGVuID0gKGZuKSA9PiB7XHJcblx0XHR0aGVuLmNhbGwocHJvbWlzZSwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZighdGhpcy5jYW5jZWxlZClcclxuXHRcdFx0XHRyZXR1cm4gZm4ocmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVmVmFsdWUocHJvbWlzZSwgXCJjYW5jZWxcIiwgKCkgPT4ge1xyXG5cdFx0aWYodGltZW91dCl7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0Y2FuY2VsZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGRlZkdldChwcm9taXNlLCBjYW5jZWxkLCAoKSA9PiBjYW5jZWxlZCk7XHJcblxyXG5cdHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxhenlQcm9taXNlID0gKCkgPT4ge1xyXG5cdFx0bGV0IHByb21pc2VSZXNvbHZlID0gbnVsbDtcclxuXHRcdGxldCBwcm9taXNlRXJyb3IgPSBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0XHRwcm9taXNlUmVzb2x2ZSA9IHI7XHJcblx0XHRcdHByb21pc2VFcnJvciA9IGU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdGxldCBlcnJvciA9IGZhbHNlO1xyXG5cdFx0bGV0IHZhbHVlID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGRlZlZhbHVlKHByb21pc2UsIFwicmVzb2x2ZVwiLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdHZhbHVlID0gcmVzdWx0O1xyXG5cdFx0XHRyZXNvbHZlZCA9IHRydWU7XHJcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRcdFx0ZXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdHByb21pc2VFcnJvcih2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJ2YWx1ZVwiLCAoKSA9PiB2YWx1ZSk7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJlcnJvclwiLCAoKSA9PiBlcnJvcik7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJyZXNvbHZlZFwiLCAoKSA9PiByZXNvbHZlZCk7XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2U7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRsYXp5UHJvbWlzZSxcclxuXHR0aW1lb3V0UHJvbWlzZVxyXG59XHJcbiIsIi8vdGhlIHNvbHV0aW9uIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkXHJcbmV4cG9ydCBjb25zdCBVVUlEX1NDSEVNQSA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpID0+IHtcclxuXHRjb25zdCBidWYgPSBuZXcgVWludDMyQXJyYXkoNCk7XHJcblx0d2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmKTtcclxuXHRsZXQgaWR4ID0gLTE7XHJcblx0cmV0dXJuIFVVSURfU0NIRU1BLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuXHRcdGlkeCsrO1xyXG5cdFx0Y29uc3QgciA9IChidWZbaWR4ID4+IDNdID4+ICgoaWR4ICUgOCkgKiA0KSkgJiAxNTtcclxuXHRcdGNvbnN0IHYgPSBjID09IFwieFwiID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgdXVpZCB9O1xyXG4iLCJleHBvcnQgY29uc3Qgbm9WYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuXHRyZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XG59O1xuXG5leHBvcnQgY29uc3QgZW10cHlPck5vVmFsdWVTdHJpbmcgPSAodmFsdWUpID0+IHtcdFxuXHRyZXR1cm4gbm9WYWx1ZSh2YWx1ZSkgfHwgdmFsdWUudHJpbSgpLmxlbmd0aCA9PSAwO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5vVmFsdWUsXG5cdGVtdHB5T3JOb1ZhbHVlU3RyaW5nXG59OyIsImltcG9ydCBcIi4vamF2YXNjcmlwdFwiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIi4vT2JqZWN0VXRpbHNcIjtcclxuaW1wb3J0IEdMT0JBTCBmcm9tIFwiLi9HbG9iYWxcIjtcclxuaW1wb3J0IEVzY2FwZXIgZnJvbSBcIi4vRXNjYXBlclwiO1xyXG5pbXBvcnQgVmFsdWVIZWxwZXIgZnJvbSBcIi4vVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IFByb21pc2VVdGlscyBmcm9tIFwiLi9Qcm9taXNlVXRpbHNcIjtcclxuaW1wb3J0IFByaXZhdGVQcm9wZXJ0eSBmcm9tIFwiLi9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IFVVSUQgZnJvbSBcIi4vVVVJRFwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRHTE9CQUwgLFxyXG5cdE9iamVjdFV0aWxzLFxyXG5cdEVzY2FwZXIsXHJcblx0VmFsdWVIZWxwZXIsXHJcblx0UHJvbWlzZVV0aWxzLFxyXG5cdFByaXZhdGVQcm9wZXJ0eSxcclxuXHRVVUlEXHJcbn07IiwiaWYgKCFNYXAucHJvdG90eXBlLnRvT2JqZWN0KVxyXG5cdE1hcC5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBvYmplY3QgPSB7fTtcclxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSBvYmplY3Rba2V5XSA9IHZhbHVlIGluc3RhbmNlb2YgTWFwID8gdmFsdWUudG9PYmplY3QoKSA6IHZhbHVlO1xyXG5cclxuXHRcdHJldHVybiBvYmplY3Q7XHJcblx0fTtcclxuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLmhhc2hjb2RlKVxyXG5cdFN0cmluZy5wcm90b3R5cGUuaGFzaGNvZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcclxuXHRcdGxldCBoYXNoID0gMDtcclxuXHRcdGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBjID0gdGhpcy5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjO1xyXG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc2g7XHJcblx0fTsiLCJpbXBvcnQgXCIuL1N0cmluZy5qc1wiO1xyXG5pbXBvcnQgXCIuL01hcC5qc1wiOyIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIi4vc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qc1wiO1xuaW1wb3J0IFwiLi9zcmMvZXhlY3V0ZXIvaW5kZXguanNcIjtcbmltcG9ydCAqIGFzIEV4ZWN1dGVyUmVnaXN0cnkgZnJvbSBcIi4vc3JjL0V4ZWN1dGVyUmVnaXN0cnkuanNcIlxuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIEV4ZWN1dGVyUmVnaXN0cnkgfTtcbiIsIi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDYWNoZUVudHJ5XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsYXN0SGl0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBrZXlcclxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gY29kZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb2RlQ2FjaGVPcHRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2l6ZT0xMDAwXSAtIE1heGltdW0gbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhlIGNhY2hlLiBJZiBzZXQgdG8gMCBvciBsZXNzLCBjYWNoaW5nIGlzIGRpc2FibGVkLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb2RlQ2FjaGUgY2xhc3MgdG8gbWFuYWdlIGNhY2hpbmcgb2YgZ2VuZXJhdGVkIGNvZGUgc25pcHBldHMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlQ2FjaGUge1xyXG5cdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuXHQjZGlzYWJsZWQgPSBmYWxzZTtcclxuXHQvKiogQHR5cGUge251bWJlcn0gKi9cclxuXHQjc2l6ZSA9IDA7XHJcblx0LyoqIEB0eXBlIHtudW1iZXJ9ICovXHJcblx0I21heFNpemUgPSAwO1xyXG5cdC8qKiBAdHlwZSB7QXJyYXk8Q2FjaGVFbnRyeT59ICovXHJcblx0I2VudHJpZXMgPSBbXTtcclxuXHQvKiogQHR5cGUge01hcDxzdHJpbmcsQ2FjaGVFbnRyeX0gKi9cclxuXHQjZW50cnlNYXAgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFxyXG5cdCAvKipcclxuXHQgICogQHBhcmFtIHtDb2RlQ2FjaGVPcHRpb25zfSBvcHRpb25zXHJcblx0ICAqL1xyXG5cdGNvbnN0cnVjdG9yKHsgc2l6ZSA9IDEwMDAgfSA9IHt9KSB7XHJcblx0XHRpZiAoc2l6ZSA8PSAwKSB0aGlzLiNkaXNhYmxlZCA9IHRydWU7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy4jc2l6ZSA9IHNpemUgPiAwID8gc2l6ZSA6IDEwMDA7XHJcblx0XHRcdHRoaXMuI21heFNpemUgPSBNYXRoLmZsb29yKHNpemUgKiAxLjEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0IC8qKlxyXG5cdCAgKiBAcGFyYW0ge0NvZGVDYWNoZU9wdGlvbnN9IG9wdGlvbnNcclxuXHQgICovXHJcblx0c2V0dXAoeyBzaXplID0gMTAwMCB9ID0ge30pIHtcclxuXHRcdGlmIChzaXplIDw9IDApe1xyXG5cdFx0XHR0aGlzLiNkaXNhYmxlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xlYXIoKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLiNzaXplID0gc2l6ZSA+IDAgPyBzaXplIDogMTAwMDtcclxuXHRcdFx0dGhpcy4jbWF4U2l6ZSA9IE1hdGguZmxvb3Ioc2l6ZSAqIDEuMSk7XHJcblx0XHRcdHRoaXMuI3RyaW0oKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhhcyhrZXkpIHtcclxuXHRcdGlmKHRoaXMuI2Rpc2FibGVkKSByZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4gdGhpcy4jZW50cnlNYXAuaGFzKGtleSk7XHJcblx0fVxyXG5cclxuXHRnZXQoa2V5KSB7XHJcblx0XHRpZih0aGlzLiNkaXNhYmxlZCkgcmV0dXJuIG51bGw7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy4jZW50cnlNYXAuZ2V0KGtleSk7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRkYXRhLmxhc3RIaXQgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRyZXR1cm4gZGF0YS52YWx1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0c2V0KGtleSwgY29kZSkge1xyXG5cdFx0aWYodGhpcy4jZGlzYWJsZWQpIHJldHVybjtcclxuXHRcdGxldCBlbnRyeSA9IHRoaXMuI2VudHJ5TWFwLmdldChrZXkpO1xyXG5cdFx0aWYgKGVudHJ5KSB7XHJcblx0XHRcdGVudHJ5LmNvdW50ID0gRGF0ZS5ub3coKTtcclxuXHRcdFx0ZW50cnkudmFsdWUgPSBjb2RlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZW50cnkgPSB7XHJcblx0XHRcdFx0Y291bnQ6IERhdGUubm93KCksXHJcblx0XHRcdFx0a2V5LFxyXG5cdFx0XHRcdHZhbHVlOiBjb2RlLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLiNlbnRyaWVzLnB1c2goZW50cnkpO1xyXG5cdFx0XHR0aGlzLiNlbnRyeU1hcC5zZXQoa2V5LCBlbnRyeSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuI2VudHJ5TWFwLnNpemUgPj0gdGhpcy4jbWF4U2l6ZSkgdGhpcy4jdHJpbSgpO1xyXG5cdH1cclxuXHJcblx0Y2xlYXIoKSB7XHJcblx0XHRpZih0aGlzLiNkaXNhYmxlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy4jZW50cmllcyA9IFtdO1xyXG5cdFx0dGhpcy4jZW50cnlNYXAgPSBuZXcgTWFwKCk7XHJcblx0fVxyXG5cclxuXHQjdHJpbSgpIHtcclxuXHRcdGNvbnNvbGUuZGVidWcoYFRyaW1taW5nIGNvZGUgY2FjaGUgZnJvbSAke3RoaXMuI2VudHJpZXMubGVuZ3RofSBlbnRyaWVzIHRvICR7dGhpcy4jc2l6ZX0gZW50cmllcy5gKTtcclxuXHRcdHRoaXMuI2VudHJpZXMuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpO1xyXG5cdFx0aWYgKHRoaXMuI2VudHJpZXMubGVuZ3RoID49IHRoaXMuI3NpemUpIHtcclxuXHRcdFx0Y29uc3QgZW50cmllc1RvUmVtb3ZlID0gdGhpcy4jZW50cmllcy5zcGxpY2UodGhpcy4jc2l6ZSk7XHJcblx0XHRcdGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllc1RvUmVtb3ZlKSB7XHJcblx0XHRcdFx0dGhpcy4jZW50cnlNYXAuZGVsZXRlKGVudHJ5LmtleSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiIsIi8qKlxuICogb2JqZWN0IGZvciBkZWZhdWx0IHZhbHVlXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIERlZmF1bHRWYWx1ZVxuICogQHR5cGVkZWYge0RlZmF1bHRWYWx1ZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdFZhbHVlIHtcblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGVmYXVsdFZhbHVlLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKi9cblx0Y29uc3RydWN0b3IodmFsdWUpe1xuXHRcdHRoaXMuaGFzVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XHRcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhlY3V0ZXJ7XHJcblxyXG4gICAgI2RlZmF1bHRDb250ZXh0O1xyXG4gICAgI2V4ZWN1dGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvblxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbi5kZWZhdWx0Q29udGV4dFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9uLmV4ZWN1dGlvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih7ZGVmYXVsdENvbnRleHQsIGV4ZWN1dGlvbn0gPSB7fSl7XHJcbiAgICAgICAgdGhpcy4jZGVmYXVsdENvbnRleHQgPSBkZWZhdWx0Q29udGV4dCB8fCB7fTtcclxuICAgICAgICB0aGlzLiNleGVjdXRpb24gPSBleGVjdXRpb24gfHwgKCgpID0+IHt0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIil9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlZmF1bHRDb250ZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2RlZmF1bHRDb250ZXh0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleGVjdXRlKGFTdGF0ZW1lbnQsIGFDb250ZXh0KXtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZXhlY3V0aW9uKGFTdGF0ZW1lbnQsIGFDb250ZXh0KTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgRXhlY3V0ZXIgZnJvbSBcIi4vRXhlY3V0ZXIuanNcIjtcclxuXHJcbmNvbnN0IEVYRUNVVEVSUyA9IG5ldyBNYXAoKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYU5hbWVcclxuICogQHBhcmFtIHtFeGVjdXRlcn0gYW5FeGVjdXRlclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdHJhdGUgPSAoYU5hbWUsIGFuRXhlY3V0ZXIpID0+IHtcclxuXHRFWEVDVVRFUlMuc2V0KGFOYW1lLCBhbkV4ZWN1dGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYU5hbWVcclxuICogQHJldHVybnMge0V4ZWN1dGVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEV4ZWN1dGVyID0gKGFOYW1lKSA9PiB7XHJcblx0Y29uc3QgZXhlY3V0ZXIgPSBFWEVDVVRFUlMuZ2V0KGFOYW1lKTtcclxuXHRpZiAoIWV4ZWN1dGVyKSB0aHJvdyBuZXcgRXJyb3IoYEV4ZWN1dGVyIFwiJHthTmFtZX1cIiBpcyBub3QgcmVnaXN0cmF0ZWQhYCk7XHJcblx0cmV0dXJuIGV4ZWN1dGVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0RXhlY3V0ZXI7XHJcbiIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzXCI7XHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBnZXRFeGVjdXRlclR5cGUgZnJvbSBcIi4vRXhlY3V0ZXJSZWdpc3RyeS5qc1wiO1xyXG5pbXBvcnQgRGVmYXVsdEV4ZWN1dGVyIGZyb20gXCIuL2V4ZWN1dGVyL1dpdGhTY29wZWRFeGVjdXRlci5qc1wiO1xyXG5pbXBvcnQgQ29udGV4dFByb3h5IGZyb20gXCIuL1Jlc29sdmVyQ29udGV4dEhhbmRsZS5qc1wiO1xyXG5pbXBvcnQgRXhlY3V0ZXIgZnJvbSBcIi4vRXhlY3V0ZXIuanNcIjtcclxuXHJcbi8qKiBAdHlwZSB7RXhlY3V0ZXJ9ICovXHJcbmxldCBERUZBVUxUX0VYRUNVVEVSID0gRGVmYXVsdEV4ZWN1dGVyO1xyXG5cclxuY29uc3QgRVhFQ1VUSU9OX1dBUk5fVElNRU9VVCA9IDEwMDA7XHJcbmNvbnN0IEVYUFJFU1NJT04gPSAvKFxcXFw/KShcXCRcXHsoKFthLXpBLVowLTlcXC1fXFxzXSspOjopPyhbXlxce1xcfV0rKVxcfSkvO1xyXG5jb25zdCBNQVRDSF9FU0NBUEVEID0gMTtcclxuY29uc3QgTUFUQ0hfRlVMTF9FWFBSRVNTSU9OID0gMjtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TQ09QRSA9IDQ7XHJcbmNvbnN0IE1BVENIX0VYUFJFU1NJT05fU1RBVEVNRU5UID0gNTtcclxuXHJcbmNvbnN0IERFRkFVTFRfTk9UX0RFRklORUQgPSBuZXcgRGVmYXVsdFZhbHVlKCk7XHJcbmNvbnN0IHRvRGVmYXVsdFZhbHVlID0gKHZhbHVlKSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdHJldHVybiBuZXcgRGVmYXVsdFZhbHVlKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiAoYW5FeGVjdXRlciwgYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpIHJldHVybiBhU3RhdGVtZW50O1xyXG5cdGFTdGF0ZW1lbnQgPSBub3JtYWxpemUoYVN0YXRlbWVudCk7XHJcblx0aWYgKGFTdGF0ZW1lbnQgPT0gbnVsbCkgcmV0dXJuIGFTdGF0ZW1lbnQ7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRyZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0Y29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoXHJcblx0XHRcdFx0KCkgPT5cclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTG9uZyBydW5uaW5nIHN0YXRlbWVudDpcclxuXHRcdFx0XHRcIiR7YVN0YXRlbWVudH1cIlxyXG5cdFx0XHRgKSxcclxuXHRcdFx0XHRFWEVDVVRJT05fV0FSTl9USU1FT1VULFxyXG5cdFx0XHQpO1xyXG5cdFx0XHRyZXNvbHZlKFxyXG5cdFx0XHRcdChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gYXdhaXQgYW5FeGVjdXRlci5leGVjdXRlKGFTdGF0ZW1lbnQsIGFDb250ZXh0KTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGBFeGVjdXRpb24gZXJyb3Igb24gc3RhdGVtZW50IVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlbWVudDogXHJcblx0XHRcdFx0XHRcdFx0JHthU3RhdGVtZW50fVxyXG5cdFx0XHRcdFx0XHRcdGVycm9yOlxyXG5cdFx0XHRcdFx0XHRcdCR7ZX1cclxuXHRcdFx0XHRcdFx0XHRgKVxyXG5cdFx0XHRcdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0XHR9KSgpLFxyXG5cdFx0XHQpO1xyXG5cdFx0fSk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgYnkgc3RhdGVtZW50IFwiJHthU3RhdGVtZW50fVwiOmAsIGUpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmUgPSBhc3luYyBmdW5jdGlvbiAoYUV4ZWN1dGVyID0gREVGQVVMVF9FWEVDVVRFUiwgYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKSByZXR1cm4gYVJlc29sdmVyLnBhcmVudCA/IHJlc29sdmUoYVJlc29sdmVyLnBhcmVudCwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0LCBhRXhlY3V0ZXIpIDogbnVsbDtcclxuXHJcblx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZShhRXhlY3V0ZXIsIGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIuY29udGV4dCk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gcmVzdWx0O1xyXG5cdGVsc2UgaWYgKGFEZWZhdWx0IGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlICYmIGFEZWZhdWx0Lmhhc1ZhbHVlKSByZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYXRjaCA9IGFzeW5jIChhRXhlY3V0ZXIsIHJlc29sdmVyLCBtYXRjaCwgZGVmYXVsdFZhbHVlKSA9PiB7XHJcblx0aWYgKG1hdGNoW01BVENIX0VTQ0FQRURdKSByZXR1cm4gbWF0Y2hbTUFUQ0hfRlVMTF9FWFBSRVNTSU9OXTtcclxuXHJcblx0cmV0dXJuIHJlc29sdmUoYUV4ZWN1dGVyLCByZXNvbHZlciwgbWF0Y2hbTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlRdLCBub3JtYWxpemUobWF0Y2hbTUFUQ0hfRVhQUkVTU0lPTl9TQ09QRV0pLCBkZWZhdWx0VmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplID0gKHZhbHVlKSA9PiB7XHJcblx0aWYgKHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuXHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPT0gMCA/IG51bGwgOiB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhwcmVzc2lvblJlc29sdmVyXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlclxyXG4gKiBAdHlwZWRlZiB7RXhwcmVzc2lvblJlc29sdmVyfVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyIHtcclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYW5FeGVjdXRlck5hbWVcclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0IGRlZmF1bHRFeGVjdXRlcihhbkV4ZWN1dGVyKSB7XHJcblx0XHRpZiAoIGFuRXhlY3V0ZXIgaW5zdGFuY2VvZiBFeGVjdXRlcikgREVGQVVMVF9FWEVDVVRFUiA9IGFuRXhlY3V0ZXI7XHJcblx0XHRlbHNlIERFRkFVTFRfRVhFQ1VURVIgPSBnZXRFeGVjdXRlclR5cGUoYW5FeGVjdXRlcik7XHJcblx0XHRjb25zb2xlLmluZm8oYENoYW5nZWQgZGVmYXVsdCBleGVjdXRlciBmb3IgRXhwcmVzc2lvblJlc29sdmVyIWApO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBkZWZhdWx0RXhlY3V0ZXIoKSB7XHJcblx0XHRyZXR1cm4gREVGQVVMVF9FWEVDVVRFUjtcclxuXHR9XHJcblxyXG5cdC8qKiBAdHlwZSB7c3RyaW5nfG51bGx9ICovXHJcblx0I25hbWUgPSBudWxsO1xyXG5cdC8qKiBAdHlwZSB7RXhwcmVzc2lvblJlc29sdmVyfG51bGx9ICovXHJcblx0I3BhcmVudCA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtmdW5jdGlvbnxudWxsfSAqL1xyXG5cdCNleGVjdXRlciA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtQcm94eXxudWxsfSAqL1xyXG5cdCNjb250ZXh0ID0gbnVsbDtcclxuXHQvKiogQHR5cGUge1Jlc29sdmVyQ29udGV4dEhhbmRsZXxudWxsfSAqL1xyXG5cdCNjb250ZXh0SGFuZGxlID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFeHByZXNzaW9uUmVzb2x2ZXIuXHJcblx0ICogQGRhdGUgMy8xMC8yMDI0IC0gNzoyNzo1NyBQTVxyXG5cdCAqXHJcblx0ICogQGNvbnN0cnVjdG9yXHJcblx0ICogQHBhcmFtIHt7IGNvbnRleHQ/OiBhbnk7IHBhcmVudD86IGFueTsgbmFtZT86IGFueTsgfX0gcGFyYW0wXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbTAuY29udGV4dD1HTE9CQUxdXHJcblx0ICogQHBhcmFtIHtFeHByZXNzaW9uUmVzb2x2ZXJ9IFtwYXJhbTAucGFyZW50PW51bGxdXHJcblx0ICogQHBhcmFtIHs/c3RyaW5nfSBbcGFyYW0wLm5hbWU9bnVsbF1cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih7IGNvbnRleHQgPSBERUZBVUxUX0VYRUNVVEVSLmRlZmF1bHRDb250ZXh0LCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCwgZXhlY3V0ZXIgfSA9IHt9KSB7XHRcdFxyXG5cdFx0dGhpcy4jZXhlY3V0ZXIgPSB0eXBlb2YgZXhlY3V0ZXIgPT09IFwic3RyaW5nXCIgPyBnZXRFeGVjdXRlclR5cGUoZXhlY3V0ZXIpIDogRXhwcmVzc2lvblJlc29sdmVyLmRlZmF1bHRFeGVjdXRlcjtcclxuXHRcdHRoaXMuI3BhcmVudCA9IHBhcmVudCBpbnN0YW5jZW9mIEV4cHJlc3Npb25SZXNvbHZlciA/IHBhcmVudCA6IG51bGw7XHJcblx0XHR0aGlzLiNuYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuI2NvbnRleHRIYW5kbGUgPSBuZXcgQ29udGV4dFByb3h5KGNvbnRleHQsIHRoaXMuI3BhcmVudCA/IHRoaXMuI3BhcmVudC5jb250ZXh0SGFuZGxlIDogbnVsbCk7XHJcblx0XHR0aGlzLiNjb250ZXh0ID0gdGhpcy4jY29udGV4dEhhbmRsZS5wcm94eTtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI25hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgcGFyZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3BhcmVudDtcclxuXHR9XHJcblxyXG5cdGdldCBjb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbnRleHQ7XHJcblx0fVxyXG5cclxuXHRnZXQgY29udGV4dEhhbmRsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNjb250ZXh0SGFuZGxlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGNoYWluIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0IGNoYWluKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuY2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGVmZmVjdGl2ZSBjaGFpbiBwYXRoXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBlZmZlY3RpdmVDaGFpbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmVmZmVjdGl2ZUNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBjb250ZXh0IGNoYWluXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7Q29udGV4dFtdfVxyXG5cdCAqL1xyXG5cdGdldCBjb250ZXh0Q2hhaW4oKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdGxldCByZXNvbHZlciA9IHRoaXM7XHJcblx0XHR3aGlsZSAocmVzb2x2ZXIpIHtcclxuXHRcdFx0aWYgKHJlc29sdmVyLmNvbnRleHQpIHJlc3VsdC5wdXNoKHJlc29sdmVyLmNvbnRleHQpO1xyXG5cclxuXHRcdFx0cmVzb2x2ZXIgPSByZXNvbHZlci5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBkYXRhIGZyb20gY29udGV4dFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICovXHJcblx0Z2V0RGF0YShrZXksIGZpbHRlcikge1x0XHRcclxuXHRcdGlmICgha2V5KSByZXR1cm4gdGhpcy5jb250ZXh0O1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5nZXREYXRhKGtleSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRleHRba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHVwZGF0ZSBkYXRhIGF0IGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHBhcmFtIHs/c3RyaW5nfSBmaWx0ZXJcclxuXHQgKi9cclxuXHR1cGRhdGVEYXRhKGtleSwgdmFsdWUsIGZpbHRlcikge1xyXG5cdFx0aWYgKCFrZXkpIHJldHVybjtcclxuXHRcdGVsc2UgaWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQudXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0W2tleV0gPSB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRlbGV0ZURhdGEoa2V5LCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KSByZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50LmRlbGV0ZURhdGFEYXRhKGtleSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmNvbnRleHRba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIG1lcmdlIGNvbnRleHQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICovXHRcclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5tZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSBcclxuXHRcdFx0dGhpcy4jY29udGV4dEhhbmRsZS5tZXJnZURhdGEoY29udGV4dCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlZCBhbiBleHByZXNzaW9uIHN0cmluZyB0byBkYXRhXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez8qfSBhRGVmYXVsdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFEZWZhdWx0KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YUV4cHJlc3Npb24gPSBhRXhwcmVzc2lvbi50cmltKCk7XHJcblx0XHRcdGlmIChhRXhwcmVzc2lvbi5zdGFydHNXaXRoKFwiXFxcXCR7XCIpKSByZXR1cm4gYUV4cHJlc3Npb24uc3Vic3RyaW5nKDEpO1xyXG5cdFx0XHRlbHNlIGlmIChhRXhwcmVzc2lvbi5zdGFydHNXaXRoKFwiJHtcIikgJiYgYUV4cHJlc3Npb24uZW5kc1dpdGgoXCJ9XCIpKSByZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLiNleGVjdXRlciwgdGhpcywgbm9ybWFsaXplKGFFeHByZXNzaW9uLnN1YnN0cmluZygyLCBhRXhwcmVzc2lvbi5sZW5ndGggLSAxKSksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHRcdFx0XHJcblx0XHRcdGVsc2UgcmV0dXJuIGF3YWl0IHJlc29sdmUodGhpcy4jZXhlY3V0ZXIsIHRoaXMsIG5vcm1hbGl6ZShhRXhwcmVzc2lvbiksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGF0IGV4ZWN1dGluZyBzdGF0bWVudFwiJywgYUV4cHJlc3Npb24sICdcIjonLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVwbGFjZSBhbGwgZXhwcmVzc2lvbnMgYXQgYSBzdHJpbmdcdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFUZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuXHQgKi9cclxuXHRhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYURlZmF1bHQpIHtcclxuXHRcdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0XHRsZXQgdGVtcCA9IGFUZXh0OyAvLyByZXF1aXJlZCB0byBwcmV2ZW50IGluZmluaXR5IGxvb3BcclxuXHRcdGxldCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZXh0KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcy4jZXhlY3V0ZXIsIHRoaXMsIG1hdGNoLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHR0ZW1wID0gdGVtcC5zcGxpdChtYXRjaFswXSkuam9pbigpOyAvLyByZW1vdmUgY3VycmVudCBtYXRjaCBmb3IgbmV4dCBsb29wXHJcblx0XHRcdHRleHQgPSB0ZXh0LnNwbGl0KG1hdGNoWzBdKS5qb2luKHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogcmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlIGFuIGV4cHJlc3Npb24gc3RyaW5nIHRvIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVwbGFjZSBleHByZXNzaW9uIGF0IHRleHRcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVRleHRcclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYnVpbGQgYSBzZWN1cmUgY29udGV4dCBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGFyZ1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBhcmcuY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFyZy5wcm9wRmlsdGVyXHJcblx0ICogQHBhcmFtIHt7IGRlZXA6IGJvb2xlYW47IH19IFthcmcub3B0aW9uPXsgZGVlcDogdHJ1ZSB9XVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhcmcubmFtZVxyXG5cdCAqIEBwYXJhbSB7RXhwcmVzc2lvblJlc29sdmVyfSBhcmcucGFyZW50XHJcblx0ICogQHJldHVybnMge29iamVjdH1cclxuXHQgKi9cclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoeyBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gPSB7IGRlZXA6IHRydWUgfSwgbmFtZSwgcGFyZW50IH0pIHtcclxuXHRcdGNvbnRleHQgPSBPYmplY3RVdGlscy5maWx0ZXIoeyBkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gfSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQsIG5hbWUsIHBhcmVudCB9KTtcclxuXHR9XHJcbn1cclxuXHJcbiIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiO1xyXG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCIuL0V4cHJlc3Npb25SZXNvbHZlclwiO1xyXG5pbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFZBUk5BTUVfQ0hFQ0sgPSAvXlskX1xccHtJRF9TdGFydH1dWyRcXHB7SURfQ29udGludWV9XSokL3U7XHJcbmNvbnN0IFJFU0VSVkVEX1dPUkRTID0gbmV3IFNldChbXHJcblx0XCJicmVha1wiLCBcImNhc2VcIiwgXCJjYXRjaFwiLCBcImNsYXNzXCIsIFwiY29uc3RcIiwgXCJjb250aW51ZVwiLCBcImRlYnVnZ2VyXCIsIFwiZGVmYXVsdFwiLCBcImRlbGV0ZVwiLCBcImRvXCIsIFwiZWxzZVwiLCBcImV4cG9ydFwiLFxyXG5cdFwiZXh0ZW5kc1wiLCBcImZpbmFsbHlcIiwgXCJmb3JcIiwgXCJmdW5jdGlvblwiLCBcImlmXCIsIFwiaW1wb3J0XCIsIFwiaW5cIiwgXCJpbnN0YW5jZW9mXCIsIFwibmV3XCIsIFwicmV0dXJuXCIsIFwic3VwZXJcIiwgXCJzd2l0Y2hcIixcclxuXHRcInRoaXNcIiwgXCJ0aHJvd1wiLCBcInRyeVwiLCBcInR5cGVvZlwiLCBcInZhclwiLCBcInZvaWRcIiwgXCJ3aGlsZVwiLCBcIndpdGhcIiwgXCJ5aWVsZFwiLCBcImVudW1cIiwgXCJpbXBsZW1lbnRzXCIsIFwiaW50ZXJmYWNlXCIsXHJcblx0XCJsZXRcIiwgXCJwYWNrYWdlXCIsIFwicHJpdmF0ZVwiLCBcInByb3RlY3RlZFwiLCBcInB1YmxpY1wiLCBcInN0YXRpY1wiLCBcImF3YWl0XCIsIFwibnVsbFwiLCBcInRydWVcIiwgXCJmYWxzZVwiLCBcImNvbnN0cnVjdG9yXCIsIFwidW5kZWZpbmVkXCJcclxuXSk7XHJcblxyXG5jb25zdCBjcmVhdGVHbG9iYWxDYWNoZVdyYXBwZXIgPSAoaGFuZGxlKSA9PiB7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRoYXM6IChwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRnZXQ6IChwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gR0xPQkFMW3Byb3BlcnR5XTtcclxuXHRcdH0sXHJcblx0XHRzZXQ6IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGRlbGV0ZTogKHByb3BlcnR5KSA9PiB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRrZXlzOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhHTE9CQUwpO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnRleHQgb2JqZWN0IHRvIGhhbmRsZSBkYXRhIGFjY2Vzc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBSZXNvbHZlckNvbnRleHRIYW5kbGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc29sdmVyQ29udGV4dEhhbmRsZSB7XHJcblx0LyoqIEB0eXBlIHtQcm94eXxudWxsfSAqL1xyXG5cdCNwcm94eSA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtSZXNvbHZlckNvbnRleHRIYW5kbGV8bnVsbH0gKi9cclxuXHQjcGFyZW50ID0gbnVsbDtcclxuXHQvKiogQHR5cGUge29iamVjdHxudWxsfSAqL1xyXG5cdCNkYXRhID0gbnVsbDtcclxuXHQvKiogQHR5cGUge01hcDxzdHJpbmcsUmVzb2x2ZXJDb250ZXh0SGFuZGxlPnxudWxsfSAqL1xyXG5cdCNjYWNoZSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcblx0ICogQHBhcmFtIHtFeHByZXNzaW9uUmVzb2x2ZXJ9IHJlc29sdmVyXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZGF0YSwgcGFyZW50KSB7XHJcblx0XHR0aGlzLiNkYXRhID0gZGF0YSB8fCB7fTtcclxuXHRcdHRoaXMuI3BhcmVudCA9IHBhcmVudCA/IHBhcmVudCA6IG51bGw7XHJcblx0XHR0aGlzLiNjYWNoZSA9IHRoaXMuI2luaXRQcm9wZXJ0eUNhY2hlKCk7XHJcblxyXG5cdFx0dGhpcy4jcHJveHkgPSBuZXcgUHJveHkodGhpcy4jZGF0YSwge1xyXG5cdFx0XHRoYXM6IChkYXRhLCBwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJoYXMgcHJvcGVydHk6XCIsIHByb3BlcnR5KTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy4jZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpICE9IG51bGw7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldDogKGRhdGEsIHByb3BlcnR5KSA9PiB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImdldCBwcm9wZXJ0eTpcIiwgcHJvcGVydHkpO1xyXG5cdFx0XHRcdGNvbnN0IHByb3h5ID0gdGhpcy4jZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xyXG5cdFx0XHRcdHJldHVybiBwcm94eSA/IHByb3h5LiNkYXRhW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0OiAoZGF0YSwgcHJvcGVydHksIHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcInNldCBwcm9wZXJ0eTpcIiwgcHJvcGVydHksIFwiPVwiLCB2YWx1ZSk7XHJcblx0XHRcdFx0dGhpcy4jZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuXHRcdFx0XHR0aGlzLiNjYWNoZS5zZXQocHJvcGVydHksIHRoaXMpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1x0XHRcdFx0XHJcblx0XHRcdH0sXHJcblx0XHRcdGRlbGV0ZVByb3BlcnR5OiAoZGF0YSwgcHJvcGVydHkpID0+IHtcclxuXHRcdFx0XHRjb25zdCBwcm9wZXJ0eURlZiA9IHRoaXMuI2NhY2hlLmdldChwcm9wZXJ0eSk7XHJcblx0XHRcdFx0aWYgKHByb3BlcnR5RGVmKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy4jZGF0YVtwcm9wZXJ0eV07XHJcblx0XHRcdFx0XHR0aGlzLiNjYWNoZS5kZWxldGUocHJvcGVydHkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHRcdFx0b3duS2V5czogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwib3duS2V5c1wiKTtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgU2V0KCk7XHJcblx0XHRcdFx0bGV0IHByb3h5ID0gdGhpcztcclxuXHRcdFx0XHR3aGlsZSAocHJveHkpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IGtleSBvZiBwcm94eS4jY2FjaGUua2V5cygpKSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdC5hZGQoa2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHByb3h5ID0gcHJveHkuI3BhcmVudDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIEFycmF5LmZyb20ocmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQcm94eX1cclxuXHQgKi9cclxuXHRnZXQgcHJveHkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcHJveHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7UmVzb2x2ZXJDb250ZXh0SGFuZGxlfG51bGx9XHJcblx0ICovXHJcblx0Z2V0IHBhcmVudCgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNwYXJlbnQ7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVEYXRhKGRhdGEpIHtcclxuXHRcdHRoaXMuI2RhdGEgPSBkYXRhIHx8IHt9O1xyXG5cdFx0dGhpcy4jY2FjaGUgPSB0aGlzLiNpbml0UHJvcGVydHlDYWNoZSgpO1xyXG5cdH1cclxuXHJcblx0bWVyZ2VEYXRhKGRhdGEpIHtcclxuXHRcdGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyB8fCBkYXRhID09IG51bGwpIHJldHVybjtcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy4jZGF0YSwgZGF0YSk7XHJcblx0XHR0aGlzLiNjYWNoZSA9IHRoaXMuI2luaXRQcm9wZXJ0eUNhY2hlKCk7XHJcblx0fVxyXG5cclxuXHRyZXNldENhY2hlKCkge1xyXG5cdFx0dGhpcy4jY2FjaGUgPSB0aGlzLiNpbml0UHJvcGVydHlDYWNoZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7TWFwPHN0cmluZyxQcm9wZXJ0eURlZmluaXRpb24+fVxyXG5cdCAqL1xyXG5cdCNpbml0UHJvcGVydHlDYWNoZSgpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiNkYXRhO1xyXG5cdFx0aWYoZGF0YSA9PSBHTE9CQUwpIFxyXG5cdFx0XHRyZXR1cm4gY3JlYXRlR2xvYmFsQ2FjaGVXcmFwcGVyKHRoaXMpO1x0XHJcblxyXG5cdFx0Y29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XHJcblx0XHRsZXQgdHlwZSA9IGRhdGE7XHJcblx0XHR3aGlsZSghaXNOdWxsT3JVbmRlZmluZWQodHlwZSkpIHtcclxuXHRcdFx0Zm9yIChsZXQgbmFtZSBvZiBSZWZsZWN0Lm93bktleXModHlwZSkpIHtcclxuXHRcdFx0XHRpZih0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpXHJcblx0XHRcdFx0XHQ7Ly9pZ25vcmUgbm9uIHN0cmluZyBwcm9wZXJ0eSBuYW1lc1xyXG5cdFx0XHRcdGVsc2UgaWYoUkVTRVJWRURfV09SRFMuaGFzKG5hbWUpKVxyXG5cdFx0XHRcdFx0Oy8vaWdub3JlIHJlc2VydmVkIHdvcmRzXHJcblx0XHRcdFx0ZWxzZSBpZighVkFSTkFNRV9DSEVDSy50ZXN0KG5hbWUpKVx0XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYFZhcmlhYmxlIG5hbWUgaXMgaWxsZWdhbCAke25hbWV9LCB2YXJpYWJsZSBpcmdub3JlZCFgKTtcdFx0XHRcdFxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGNhY2hlLnNldChuYW1lLCB0aGlzKTtcdFx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0dHlwZSA9IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodHlwZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNhY2hlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XHJcblx0ICogQHJldHVybnMge1Jlc29sdmVyQ29udGV4dEhhbmRsZXxudWxsfVxyXG5cdCAqL1xyXG5cdCNnZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSkge1xyXG5cdFx0aWYgKHRoaXMuI2NhY2hlLmhhcyhwcm9wZXJ0eSkpIHJldHVybiB0aGlzLiNjYWNoZS5nZXQocHJvcGVydHkpO1xyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMuI3BhcmVudDtcclxuXHRcdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdFx0aWYgKHBhcmVudC4jY2FjaGUuaGFzKHByb3BlcnR5KSkgcmV0dXJuIHBhcmVudC4jY2FjaGUuZ2V0KHByb3BlcnR5KTtcclxuXHRcdFx0cGFyZW50ID0gcGFyZW50LiNwYXJlbnQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmVnaXN0cmF0ZSB9IGZyb20gXCIuLi9FeGVjdXRlclJlZ2lzdHJ5LmpzXCI7XHJcbmltcG9ydCBFeGVjdXRlciBmcm9tIFwiLi4vRXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IENvZGVDYWNoZSBmcm9tIFwiLi4vQ29kZUNhY2hlLmpzXCI7XHJcblxyXG5sZXQgREVCVUcgPSBmYWxzZTtcclxuZXhwb3J0IGNvbnN0IEVYRUNVVEVSTkFNRSA9IFwiY29udGV4dC1kZWNvbnN0cnVjdGlvbi1leGVjdXRlclwiO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldERlYnVnID0gKHZhbHVlKSA9PiB7XHJcblx0REVCVUcgPSB2YWx1ZTtcclxufVxyXG5cclxuY29uc3QgRVhQUkVTU0lPTl9DQUNIRSA9IG5ldyBDb2RlQ2FjaGUoeyBzaXplOiA1MDAwIH0pO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9Db2RlQ2FjaGUuanMnKS5Db2RlQ2FjaGVPcHRpb25zfSBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0dXBFeGVjdXRlciA9IChvcHRpb25zKSA9PiB7XHJcblx0RVhQUkVTU0lPTl9DQUNIRS5zZXR1cChvcHRpb25zKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVN0YXRlbWVudFxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBnZW5lcmF0ZSA9IChhU3RhdGVtZW50LCBjb250ZXh0UHJvcGVydGllcykgPT4ge1xyXG5cdGNvbnN0IGNvZGUgPSBgXHJcbnJldHVybiAoYXN5bmMgKHske2NvbnRleHRQcm9wZXJ0aWVzfX0pID0+IHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gJHthU3RhdGVtZW50fVxyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbn0pKGNvbnRleHQgfHwge30pO2A7XHJcblxyXG5cdGlmIChERUJVRylcclxuXHRcdGNvbnNvbGUubG9nKFwiZ2VuZXJlcmF0ZWQgY29kZTogXFxuXCIsIGNvZGUpO1xyXG5cclxuXHRyZXR1cm4gbmV3IEZ1bmN0aW9uKFwiY29udGV4dFwiLCBjb2RlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVN0YXRlbWVudFxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBnZXRPckNyZWF0ZUZ1bmN0aW9uID0gKGFTdGF0ZW1lbnQsIGNvbnRleHRQcm9wZXJ0aWVzKSA9PiB7XHJcblx0Y29uc3QgY2FjaGVLZXkgPSBgJHtjb250ZXh0UHJvcGVydGllc306OiR7YVN0YXRlbWVudH1gO1xyXG5cdGlmIChFWFBSRVNTSU9OX0NBQ0hFLmhhcyhjYWNoZUtleSkpIHtcclxuXHRcdHJldHVybiBFWFBSRVNTSU9OX0NBQ0hFLmdldChjYWNoZUtleSk7XHJcblx0fVxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBnZW5lcmF0ZShhU3RhdGVtZW50LCBjb250ZXh0UHJvcGVydGllcyk7XHJcblx0RVhQUkVTU0lPTl9DQUNIRS5zZXQoY2FjaGVLZXksIGV4cHJlc3Npb24pO1xyXG5cdHJldHVybiBleHByZXNzaW9uO1xyXG59O1xyXG5cclxuY29uc3QgRVhFQ1VURVIgPSBuZXcgRXhlY3V0ZXIoe1xyXG5cdGRlZmF1bHRDb250ZXh0OiB7fSxcclxuXHRleGVjdXRpb246IChhU3RhdGVtZW50LCBhQ29udGV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFDb250ZXh0IHx8IHt9KTtcclxuXHRcdGlmKHByb3BlcnR5TmFtZXMubGVuZ3RoID4gNTApXHJcblx0XHRcdGNvbnNvbGUud2FybihgSGlnaCBjb3VudCBvZiBwcm9wZXJ0aWVzIGF0IGZpcnN0IGxldmVsLCBjYW4gYmUgZGVjcmVhc2UgdGhlIHBlcmZvcm1lbmNlISBjb3VudDogJHtwcm9wZXJ0eU5hbWVzLmxlbmd0aH1gKTtcclxuXHJcblx0XHRjb25zdCBjb250ZXh0UHJvcGVydGllcyA9IHByb3BlcnR5TmFtZXMuam9pbihcIixcIik7XHJcblx0XHRjb25zdCBleHByZXNzaW9uID0gZ2V0T3JDcmVhdGVGdW5jdGlvbihhU3RhdGVtZW50LCBjb250ZXh0UHJvcGVydGllcyk7XHJcblx0XHRyZXR1cm4gZXhwcmVzc2lvbihhQ29udGV4dCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5yZWdpc3RyYXRlKEVYRUNVVEVSTkFNRSwgRVhFQ1VURVIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRVhFQ1VURVI7XHJcbiIsImltcG9ydCB7IHJlZ2lzdHJhdGUgfSBmcm9tIFwiLi4vRXhlY3V0ZXJSZWdpc3RyeS5qc1wiO1xyXG5pbXBvcnQgRXhlY3V0ZXIgZnJvbSBcIi4uL0V4ZWN1dGVyLmpzXCI7XHJcbmltcG9ydCBDb2RlQ2FjaGUgZnJvbSBcIi4uL0NvZGVDYWNoZS5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVYRUNVVEVSTkFNRSA9IFwiY29udGV4dC1vYmplY3QtZXhlY3V0ZXJcIjtcclxuY29uc3QgRVhQUkVTU0lPTl9DQUNIRSA9IG5ldyBDb2RlQ2FjaGUoeyBhU2l6ZTogNTAwMCB9KTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vQ29kZUNhY2hlLmpzJykuQ29kZUNhY2hlT3B0aW9uc30gb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldHVwRXhlY3V0ZXIgPSAob3B0aW9ucykgPT4ge1xyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0dXAob3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTdGF0ZW1lbnRcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZ2VuZXJhdGUgPSAoYVN0YXRlbWVudCkgPT4ge1xyXG5cdGNvbnN0IGNvZGUgPSBgXHJcbnJldHVybiAoYXN5bmMgKGN0eCkgPT4ge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiAke2FTdGF0ZW1lbnR9XHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxufSkoY29udGV4dCB8fCB7fSk7YDtcclxuXHJcblx0Ly9jb25zb2xlLmxvZyhcImNvZGVcIiwgY29kZSk7XHJcblxyXG5cdHJldHVybiBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIGNvZGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU3RhdGVtZW50XHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGdldE9yQ3JlYXRlRnVuY3Rpb24gPSAoYVN0YXRlbWVudCkgPT4ge1xyXG5cclxuXHRjb25zdCBjYWNoZUtleSA9IGFTdGF0ZW1lbnQ7XHJcblxyXG5cdGlmIChFWFBSRVNTSU9OX0NBQ0hFLmhhcyhjYWNoZUtleSkpIHtcclxuXHRcdHJldHVybiBFWFBSRVNTSU9OX0NBQ0hFLmdldChjYWNoZUtleSk7XHJcblx0fVxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBnZW5lcmF0ZShhU3RhdGVtZW50KTtcclxuXHRFWFBSRVNTSU9OX0NBQ0hFLnNldChjYWNoZUtleSwgZXhwcmVzc2lvbik7XHJcblx0cmV0dXJuIGV4cHJlc3Npb247XHJcbn07XHJcblxyXG5jb25zdCBFWEVDVVRFUiA9IG5ldyBFeGVjdXRlcih7XHJcblx0ZGVmYXVsdENvbnRleHQ6IHt9LFxyXG5cdGV4ZWN1dGlvbjogKGFTdGF0ZW1lbnQsIGFDb250ZXh0KSA9PiB7XHJcblx0XHRjb25zdCBleHByZXNzaW9uID0gZ2V0T3JDcmVhdGVGdW5jdGlvbihhU3RhdGVtZW50KTtcclxuXHRyZXR1cm4gZXhwcmVzc2lvbihhQ29udGV4dCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5yZWdpc3RyYXRlKEVYRUNVVEVSTkFNRSwgRVhFQ1VURVIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRVhFQ1VURVI7IiwiaW1wb3J0IHtyZWdpc3RyYXRlfSBmcm9tIFwiLi4vRXhlY3V0ZXJSZWdpc3RyeS5qc1wiO1xyXG5pbXBvcnQgRXhlY3V0ZXIgZnJvbSBcIi4uL0V4ZWN1dGVyLmpzXCI7XHJcbmltcG9ydCBDb2RlQ2FjaGUgZnJvbSBcIi4uL0NvZGVDYWNoZS5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVYRUNVVEVSTkFNRSA9IFwid2l0aC1zY29wZWQtZXhlY3V0ZXJcIjtcclxuY29uc3QgRVhQUkVTU0lPTl9DQUNIRSA9IG5ldyBDb2RlQ2FjaGUoeyBhU2l6ZTogNTAwMCB9KTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vQ29kZUNhY2hlLmpzJykuQ29kZUNhY2hlT3B0aW9uc30gb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldHVwRXhlY3V0ZXIgPSAob3B0aW9ucykgPT4ge1xyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0dXAob3B0aW9ucyk7XHJcbn07XHJcblxyXG5sZXQgaW5pdGlhbENhbGwgPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVN0YXRlbWVudCBcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZ2VuZXJhdGUgPSAoYVN0YXRlbWVudCkgPT4ge1xyXG5jb25zdCBjb2RlID0gYFxyXG5cdHJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHRcdHdpdGgoY29udGV4dCl7XHJcblx0XHRcdHRyeXsgXHJcblx0XHRcdFx0cmV0dXJuICR7YVN0YXRlbWVudH1cclxuXHRcdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRcdHRocm93IGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KShjb250ZXh0IHx8IHt9KTtcclxuYDtcclxuXHQvL2NvbnNvbGUubG9nKFwiY29kZVwiLCBjb2RlKTtcclxuXHJcblx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImNvbnRleHRcIiwgY29kZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU3RhdGVtZW50IFxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBnZXRPckNyZWF0ZUZ1bmN0aW9uID0gKGFTdGF0ZW1lbnQpID0+IHtcclxuXHRpZiAoRVhQUkVTU0lPTl9DQUNIRS5oYXMoYVN0YXRlbWVudCkpIHtcclxuXHRcdHJldHVybiBFWFBSRVNTSU9OX0NBQ0hFLmdldChhU3RhdGVtZW50KTtcclxuXHR9XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IGdlbmVyYXRlKGFTdGF0ZW1lbnQpO1xyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0KGFTdGF0ZW1lbnQsIGV4cHJlc3Npb24pO1xyXG5cdHJldHVybiBleHByZXNzaW9uO1xyXG59O1xyXG5cclxuXHJcblxyXG5jb25zdCBFWEVDVVRFUiA9IG5ldyBFeGVjdXRlcih7ZGVmYXVsdENvbnRleHQ6IHt9LCBleGVjdXRpb246IChhU3RhdGVtZW50LCBhQ29udGV4dCkgPT4ge1xyXG5cdFx0aWYoaW5pdGlhbENhbGwpe1xyXG5cdFx0XHRpbml0aWFsQ2FsbCA9IGZhbHNlO1xyXG5cdFx0XHRjb25zb2xlLndhcm4obmV3IEVycm9yKGBXaXRoIFNjb3BlZCBleHByZXNzaW9uIGV4ZWN1dGlvbiBpcyBtYXJrZWQgYXMgZGVwcmVjYXRlZC5gKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZXhwcmVzc2lvbiA9IGdldE9yQ3JlYXRlRnVuY3Rpb24oYVN0YXRlbWVudCk7XHJcblx0XHRyZXR1cm4gZXhwcmVzc2lvbihhQ29udGV4dCk7XHJcblx0fX0pO1xyXG5yZWdpc3RyYXRlKEVYRUNVVEVSTkFNRSwgRVhFQ1VURVIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRVhFQ1VURVI7XHJcbiIsIi8vaW1wb3J0IFwiLi9Fc3ByaW1hRXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IFwiLi9XaXRoU2NvcGVkRXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IFwiLi9Db250ZXh0T2JqZWN0RXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IFwiLi9Db250ZXh0RGVjb25zdHJ1Y3RvckV4ZWN1dGVyLmpzXCI7IiwiaW1wb3J0IENvbXBvbmVudCAsIHtjb21wb25lbnRCYXNlT2YsIGNyZWF0ZVVVSUR9IGZyb20gXCIuL3NyYy9Db21wb25lbnQuanNcIjtcbmltcG9ydCB7ZGVmaW5lfSBmcm9tIFwiLi9zcmMvdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzXCI7XG5cblxuZXhwb3J0IHtDb21wb25lbnQsIGNvbXBvbmVudEJhc2VPZiwgZGVmaW5lLCBjcmVhdGVVVUlEfTtcbiIsImltcG9ydCB7IGxhenlQcm9taXNlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qc1wiO1xyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanNcIjtcclxuaW1wb3J0IHsgdHJpZ2dlclRpbWVvdXQgfSBmcm9tIFwiLi9Db25zdGFudHMuanNcIjtcclxuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlci5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvbiBjcmVhdGVVSURcclxuICogXHJcbiAqIGNyZWF0ZSBhbiB1bmlxdWUgaWRlbnRpZmlyZS5cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSBcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzdWZmaXhdXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAocHJlZml4LCBzdWZmaXgpID0+IHtcclxuXHRsZXQgY291bnQgPSAwO1xyXG5cdGxldCBpZCA9IG51bGw7XHJcblx0d2hpbGUgKGNvdW50IDwgMTAwKSB7XHJcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XHJcblx0XHRpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuIGlkO1xyXG5cclxuXHRcdGNvdW50Kys7XHJcblx0fVxyXG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcclxuXHRyZXR1cm4gaWQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xyXG5cdGNvbnN0IGNsYXp6ID0gY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgaHRtbEJhc2VUeXBlIHtcclxuXHJcblx0XHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ub2RlTmFtZS50b0xvd2VyY2FzZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblxyXG5cdFx0I3JlYWR5ID0gbnVsbDtcclxuXHRcdCNwb3N0Q29uc3RydWN0cyA9IFtdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHsgc2hhZG93Um9vdCA9IGZhbHNlLCBjb250ZW50ID0gbnVsbCwgY3JlYXRlVUlEID0gZmFsc2UsIHVpZFByZWZpeCA9IFwiaWQtXCIsIHVpZFN1ZmZpeCA9IFwiXCIsIHBvc3RDb25zdHVjdHMgPSBudWxsIH0gPSB7fSkge1xyXG5cdFx0XHRzdXBlcigpO1xyXG5cdFx0XHR0aGlzLiNyZWFkeSA9IGxhenlQcm9taXNlKCk7XHJcblx0XHRcdGlmIChjcmVhdGVVSUQpIHRoaXMuI3Bvc3RDb25zdHJ1Y3RzLnB1c2goYXN5bmMgKCkgPT4gdGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVVVJRCh1aWRQcmVmaXgsIHVpZFN1ZmZpeCkpKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChzaGFkb3dSb290KSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xyXG5cclxuXHRcdFx0aWYgKGNvbnRlbnQpIHRoaXMucm9vdC5hcHBlbmQodHlwZW9mIGNvbnRlbnQgPT09IFwiZnVuY3Rpb25cIiA/IGNvbnRlbnQodGhpcykgOiBjb250ZW50KTtcclxuXHJcblx0XHRcdGlmKHBvc3RDb25zdHVjdHMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRmb3IobGV0IHBvc3Qgb2YgcG9zdENvbnN0dWN0cylcclxuXHRcdFx0XHRcdGlmKHR5cGVvZiBwb3N0ID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRcdHRoaXMuI3Bvc3RDb25zdHJ1Y3RzLnB1c2gocG9zdClcclxuXHRcdH1cclxuXHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQXJyYXkgb2YgcG9zdCBjb25zdHJ1Y3QgZnVuY3Rpb25zXHJcblx0XHQgKlxyXG5cdFx0ICogQHJlYWRvbmx5XHJcblx0XHQgKiBAdHlwZSB7QXJyYXk8RnVuY3Rpb24+fVxyXG5cdFx0ICovXHJcblx0XHRnZXQgcG9zdENvbnN0cnVjdHMoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuI3Bvc3RDb25zdHJ1Y3RzO1xyXG5cdFx0fVxyXG5cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiByb290XHJcblx0XHQgKlxyXG5cdFx0ICogQHJlYWRvbmx5XHJcblx0XHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR8U2hhZG93Um9vdH1cclxuXHRcdCAqL1xyXG5cdFx0Z2V0IHJvb3QoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogcmVhZHlcclxuXHRcdCAqXHJcblx0XHQgKiBAcmVhZG9ubHlcclxuXHRcdCAqIEB0eXBlIHtQcm9taXNlfVxyXG5cdFx0ICovXHJcblx0XHRnZXQgcmVhZHkoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLiNyZWFkeTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEBmdW5jdGlvbiBpbml0XHJcblx0XHQgKiBAYXN5bmNcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHRcdCAqL1xyXG5cdFx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdFx0Zm9yIChsZXQgZnVuYyBvZiB0aGlzLiNwb3N0Q29uc3RydWN0cykgYXdhaXQgZnVuYyh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFxyXG5cdFx0ICovXHJcblx0XHRhc3luYyBkZXN0cm95KCkge1xyXG5cdFx0XHRpZiAodGhpcy5yZWFkeS5yZXNvbHZlZCkgdGhpcy4jcmVhZHkgPSBsYXp5UHJvbWlzZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG5cdFx0XHRpZiAodGhpcy5vd25lckRvY3VtZW50ID09IGRvY3VtZW50ICYmIHRoaXMuaXNDb25uZWN0ZWQpXHJcblx0XHRcdFx0Ly9pbml0KHRoaXMpXHJcblx0XHRcdFx0dGhpcy5pbml0KClcclxuXHRcdFx0XHRcdC50aGVuKCh2YWx1ZSkgPT4gdGhpcy4jcmVhZHkucmVzb2x2ZSh2YWx1ZSkpXHJcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB0aGlzLiNyZWFkeS5yZXNvbHZlKGVycm9yKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xyXG5cdFx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG5cdFx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lKG5hbWUsIHRoaXMpKTtcclxuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuXHRcdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIGNsYXp6O1xyXG59O1xyXG5cclxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XHJcblxyXG5leHBvcnQgY29uc3QgY29tcG9uZW50QmFzZU9mID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xyXG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xyXG5cdGlmIChjbGF6eiA9PSBudWxsKSB7XHJcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcclxuXHRcdENMQVpaTUFQLnNldChodG1sQmFzZVR5cGUsIGNsYXp6KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjbGF6ejtcclxufTtcclxuXHJcbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XHJcbiIsImV4cG9ydCBjb25zdCBjb21wb25lbnRQcmVmaXggPSBcImQtXCI7XHJcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeCA9IFwiYXR0cmlidXRlLVwiO1xyXG5leHBvcnQgY29uc3QgaW5pdFRpbWVvdXQgPSAxMDtcclxuZXhwb3J0IGNvbnN0IHRyaWdnZXJUaW1lb3V0ID0gMTA7XHJcbiIsImltcG9ydCB7IGNvbXBvbmVudFByZWZpeCB9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcblxuZXhwb3J0IGNvbnN0IHRvTm9kZU5hbWUgPSAobmFtZSwgcHJlZml4KSA9PiB7XG5cdGlmKHR5cGVvZiBwcmVmaXggPT09IFwic3RyaW5nXCIpXG5cdFx0cmV0dXJuIHByZWZpeCArIG5hbWU7XG5cdFx0XG5cdHJldHVybiBjb21wb25lbnRQcmVmaXggKyBuYW1lO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlZmluZSA9IGZ1bmN0aW9uKGNsYXp6LCBvcHRpb25zKSB7XG5cdGNvbnN0IG5vZGVuYW1lID0gY2xhenouTk9ERU5BTUU7XG5cdGlmICghY3VzdG9tRWxlbWVudHMuZ2V0KG5vZGVuYW1lKSkge1xuXHRcdGN1c3RvbUVsZW1lbnRzLmRlZmluZShub2RlbmFtZSwgY2xhenosIG9wdGlvbnMpO1xuXHR9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZTsgXG4iLCJpbXBvcnQge2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fSBmcm9tIFwiLi4vQ29uc3RhbnRzLmpzXCI7XG5cbi8qKlxuICogQGZ1bmN0aW9uIGNvbXBvbmVudEV2ZW50bmFtZVxuICogXG4gKiBjcmVhdGVzIGFuIGV2ZW50IG5hbWUgZm9yIGFuIGNvbXBvbmVudFxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIFxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8Q29tcG9uZW50fSBub2RlIFxuICogQHBhcmFtIHtzdHJpbmd9IFtzZXBhcmF0b3JdIGRlZmF1bHQgaXMgXCI6XCJcbiAqIFxuICogQHJldHVybnMge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb25lbnRFdmVudG5hbWUgPSAoZXZlbnRUeXBlLCBub2RlLCBzZXBhcmF0b3IgPSBcIjpcIiApID0+IHtcdFxuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYCR7dHlwZW9mIG5vZGV9IGlzIG5vdCBzdXBwb3J0ZWQgYXMgcGFyYW1ldGVyIFwibm9kZVwiIWApO1xuXHRcbiAgIHJldHVybiBgJHtub2RlbmFtZS50b0xvd2VyQ2FzZSgpfSR7c2VwYXJhdG9yfSR7ZXZlbnRUeXBlfWA7Ly91c2UgQCBhcyBzZXBhcnRvciBhbmQgbm90IDpcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZVxuICogICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlIFxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8Q29tcG9uZW50fSBub2RlIFxuICogQHBhcmFtIHtzdHJpbmd9IFtzZXBhcmF0b3JdIGRlZmF1bHQgaXMgXCI6XCJcbiAqIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUsIHNlcGFyYXRvciA9IFwiOlwiICApID0+IHtcbiAgICByZXR1cm4gY29tcG9uZW50RXZlbnRuYW1lKGAke2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fS0ke2F0dHJpYnV0ZX1gLCBub2RlLCBzZXBhcmF0b3IpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge2NvbXBvbmVudEV2ZW50bmFtZSwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lfSIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9SRUFET05MWSwgXHJcblx0QVRUUklCVVRFX0VWQUxVQVRFLCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OLCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgXHJcblx0QVRUUklCVVRFX0VESVRBQkxFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgQ29uZGl0aW9uSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlXCI7XHJcbmltcG9ydCBFZGl0YWJsZUhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL0VkaXRhYmxlSGFuZGxlXCI7XHJcbmltcG9ydCBWYWxpZGF0aW9uSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZVwiO1xyXG5pbXBvcnQgTWVzc2FnZUhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL01lc3NhZ2VIYW5kbGVcIjtcclxuaW1wb3J0IHsgZXZhbHVhdGlvbkRhdGEgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XHJcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyB1cGRhdGVBY3RpdmVTdGF0ZSwgdXBkYXRlQ29uZGl0aW9uU3RhdGUsIHVwZGF0ZUVkaXRhYmxlU3RhdGUsIHVwZGF0ZVJlYWRvbmx5U3RhdGUsIHVwZGF0ZVZhbGlkU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xyXG5cclxuY29uc3QgX2Zvcm0gPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcImZvcm1cIik7XHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZLCBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT05dO1xyXG5cclxuY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQvKiogQHR5cGUge0NvbmRpdGlvbkhhbmRsZX0gKi9cclxuXHQjY29uZGl0aW9uSGFuZGxlO1xyXG5cdC8qKiBAdHlwZSB7RWRpdGFibGVIYW5kbGV9ICovXHJcblx0I2VkaXRhYmxlSGFuZGxlO1x0XHJcblx0LyoqIEB0eXBlIHtWYWxpZGF0aW9uSGFuZGxlfSAqL1xyXG5cdCN2YWxpZGF0aW9uSGFuZGxlO1x0XHJcblx0LyoqIEB0eXBlIHtNZXNzYWdlSGFuZGxlfSovXHJcblx0I21lc3NhZ2VIYW5kbGU7XHJcblxyXG5cdCNyZWFkb25seSA9IGZhbHNlO1xyXG5cdCNlZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLiNtZXNzYWdlSGFuZGxlID0gbmV3IE1lc3NhZ2VIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiNjb25kaXRpb25IYW5kbGUgPSBuZXcgQ29uZGl0aW9uSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jZWRpdGFibGVIYW5kbGUgPSBuZXcgRWRpdGFibGVIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiN2YWxpZGF0aW9uSGFuZGxlID0gbmV3IFZhbGlkYXRpb25IYW5kbGUodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdGF3YWl0IHRoaXMuI2NvbmRpdGlvbkhhbmRsZS5pbml0KCk7XHJcblx0XHRcdGF3YWl0IHRoaXMuI21lc3NhZ2VIYW5kbGUuaW5pdCgpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0aW9uSGFuZGxlLmluaXQoKTtcclxuXHRcdFx0YXdhaXQgdGhpcy4jZWRpdGFibGVIYW5kbGUuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkge1xyXG5cdFx0cmV0dXJuIChzdXBlci5pZCB8fCBcIlwiKS50cmltKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiAoc3VwZXIubmFtZSB8fCBcIlwiKS50cmltKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWRhdGlvbkhhbmRsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiN2YWxpZGF0aW9uSGFuZGxlO1xyXG5cdH1cclxuXHJcblx0Z2V0IG1lc3NhZ2VIYW5kbGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jbWVzc2FnZUhhbmRsZTtcclxuXHR9XHJcblxyXG5cdGFkZFZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbkhhbmRsZS5hZGRDdXN0b21WYWxpZGF0aW9uKHZhbGlkYXRpb24pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbGlkYXRlOmAsIGRhdGEpXHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBcIlwiKTtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzKSk7XHJcblx0XHRhd2FpdCB0aGlzLiNjb25kaXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHRhd2FpdCB0aGlzLiNlZGl0YWJsZUhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBudWxsKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLiNtZXNzYWdlSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRsZXQgZm9ybSA9IF9mb3JtKHRoaXMpO1xyXG5cdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdGZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0X2Zvcm0odGhpcywgZm9ybSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XHJcblx0XHRcdHRoaXMuYWN0aXZlVXBkYXRlZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgYWN0aXZlVXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCByZWFkb25seSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNyZWFkb25seTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcImNoYW5nZSByZWFkb25seTogXCIsIHtyZWFkb25seSwgZWRpdGFibGU6IHRoaXMuZWRpdGFibGUsIHRoaXM6IHRoaXN9KTtcclxuXHRcdHRoaXMuI3JlYWRvbmx5ID0gcmVhZG9ubHkgfHwgIXRoaXMuZWRpdGFibGU7XHJcblx0XHR1cGRhdGVSZWFkb25seVN0YXRlKHRoaXMsIHRoaXMuI3JlYWRvbmx5LCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xyXG5cdH1cclxuXHRcclxuXHRhc3luYyByZWFkb25seVVwZGF0ZWQoKSB7fVxyXG5cclxuXHRnZXQgZWRpdGFibGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZWRpdGFibGU7XHJcblx0fVxyXG5cclxuXHRzZXQgZWRpdGFibGUoZWRpdGFibGUpIHtcclxuXHRcdC8vY29uc29sZS5sb2coXCJjaGFuZ2UgZWRpdGFibGU6IFwiLCBlZGl0YWJsZSwgdGhpcyk7XHJcblx0XHR0aGlzLiNlZGl0YWJsZSA9IGVkaXRhYmxlO1xyXG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCBlZGl0YWJsZSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xyXG5cdFx0dGhpcy5lZGl0YWJsZVVwZGF0ZWQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGVkaXRhYmxlVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCBjb25kaXRpb24oY29uZGl0aW9uKSB7XHJcblx0XHR1cGRhdGVDb25kaXRpb25TdGF0ZSh0aGlzLCBjb25kaXRpb24pO1xyXG5cdFx0dGhpcy5jb25kaXRpb25VcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCB2YWxpZCh2YWxpZCkge1xyXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0aGlzLCB2YWxpZCk7XHJcblx0XHR0aGlzLnZhbGlkVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZFVwZGF0ZWQoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgXHJcblx0RVZFTlRfRklFTERfUkVNT1ZFRCwgXHJcblx0RVZFTlRfVkFMVUVfVVBEQVRFRCxcclxuXHRBVFRSSUJVVEVfTkFNRSwgXHJcblx0QVRUUklCVVRFX1JFUVVJUkVELCBcclxuXHRBVFRSSUJVVEVfTk9WQUxVRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBkYXRhSXNOb1ZhbHVlIH0gZnJvbSBcIi4vdXRpbHMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmNvbnN0IF9wYXJlbnQgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInBhcmVudFwiKTtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRGaWVsZCA9IChmaWVsZCkgPT4ge1xyXG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG5cdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiBwYXJlbnQ7XHJcblxyXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XHJcblx0ZmllbGQuYXR0cihBVFRSSUJVVEVfTk9WQUxVRSwgIWhhc1ZhbHVlID8gXCJcIiA6IG51bGwpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGJhc2ljIGZpZWxkIGNsYXNzIC0gZXh0ZW5kIGN1c3RvbSBmaWVsZHMgYnkgdGhpcyBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgQmFzZUZpZWxkXHJcbiAqIEB0eXBlZGVmIHtCYXNlRmllbGR9XHJcbiAqIEBleHRlbmRzIHtCYXNlfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjbGFzcyBDdXN0b21GaWVsZCBleHRlbmQgQmFzZUZpZWxke1xyXG4gKiBcdGNvbnN0cnVjdG9yKG9wdGlvbiA9IHt9KXtcclxuICogXHRcdHN1cGVyKG9wdGlvbik7XHJcbiAqIFx0fVxyXG4gKlxyXG4gKiBcdGFzeW5jIGluaXQoKXtcclxuICogXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuICogXHRcdC8veW91ciBjdXN0b20gY29kZVxyXG4gKiBcdH1cclxuICogfVxyXG4gKi9cclxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZS5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0I3ZhbHVlID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlRmllbGQuXHJcblx0ICpcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge3t9fSBbb3B0aW9ucz17fV1cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gb3B0aW9ucztcclxuXHRcdHRoaXMuI3ZhbHVlID0gdmFsdWU7XHJcblx0XHR0aGlzLnJvb3Qub24oRVZFTlRfVkFMVUVfVVBEQVRFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIHRvIGluaXRpYWxpemUgdGhlIGN1c3RvbSBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBjbGFzcyBDdXN0b21GaWVsZCBleHRlbmQgQmFzZUZpZWxke1xyXG5cdCAqIFx0Y29uc3RydWN0b3Iob3B0aW9uID0ge30pe1xyXG5cdCAqIFx0XHRzdXBlcihvcHRpb24pO1xyXG5cdCAqIFx0fVxyXG5cdCAqXHJcblx0ICogXHRhc3luYyBpbml0KCl7XHJcblx0ICogXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHQgKiBcdFx0Ly95b3VyIGN1c3RvbSBjb2RlXHJcblx0ICogXHR9XHJcblx0ICogfVxyXG5cdCAqL1xyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVEKSk7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQgYnkgZGVzdHJveWluZyB0aGUgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgZGVzdHJveSgpIHtcclxuXHRcdHRoaXMucHVibGlzaFZhbHVlKG51bGwpO1xyXG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0ZJRUxEX1JFTU9WRUQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHBhcmVudCBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtCYXNlRmllbGR9XHJcblx0ICovXHJcblx0Z2V0IHBhcmVudEZpZWxkKCkge1xyXG5cdFx0bGV0IHBhcmVudCA9IF9wYXJlbnQodGhpcyk7XHJcblx0XHRpZiAoIXBhcmVudCkge1xyXG5cdFx0XHRwYXJlbnQgPSBmaW5kUGFyZW50RmllbGQodGhpcyk7XHJcblx0XHRcdF9wYXJlbnQodGhpcywgcGFyZW50KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQgaWYgdGhlIGNvbmRpdGlvbiBzdGF0ZSB1cGRhdGVkLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHtcclxuXHRcdHRoaXMuYWN0aXZlID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IG5hbWUgb2YgZmllbGQuXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIGZpZWxkIHJlcXVpcmVkLlxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Z2V0IHJlcXVpcmVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRVFVSVJFRCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgZmllbGQgYSB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGdldCBoYXNWYWx1ZSgpIHtcclxuXHRcdHJldHVybiAhdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX05PVkFMVUUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IG9yIHNldCB0aGUgcmF3IHZhbHVlIHRvIGZpZWxkLiAob25seSBmb3IgaW50ZXJuYWwgdXNlKVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fFByb21pc2U8dm9pZD59XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIGF3YWl0IGZpZWxkLnJhd1ZhbHVlKFwidmFsdWVcIikgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0byBcInZhbHVlXCJcclxuXHQgKiBhd2FpdCBmaWVsZC5yYXdWYWx1ZSgpIC8vIHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgZmllbGRcclxuXHQgKi9cclxuXHRhc3luYyByYXdWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLiN2YWx1ZTtcclxuXHRcdGVsc2UgdGhpcy4jdmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBvciBzZXQgdmFsdWUgdG8gZmllbGQuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj58UHJvbWlzZTx2b2lkPn1cclxuXHQgKlxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogYXdhaXQgZmllbGQudmFsdWUoXCJ2YWx1ZVwiKSAvLyBzZXQgdGhlIHZhbHVlIG9mIHRvIFwidmFsdWVcIlxyXG5cdCAqIGF3YWl0IGZpZWxkLnZhbHVlKCkgLy8gcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiBmaWVsZFxyXG5cdCAqL1xyXG5cdGFzeW5jIHZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCB7IGNvbmRpdGlvbiwgdmFsaWQsIHJlYWR5IH0gPSB0aGlzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbHVlOiBgLCBhcmd1bWVudHMsIHtjb25kaXRpb24sIHZhbGlkfSk7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSBhd2FpdCB0aGlzLnJhd1ZhbHVlKCk7XHJcblxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuICFjb25kaXRpb24gfHwgIXZhbGlkID8gbnVsbCA6IHN0cnVjdHVyZWRDbG9uZShjdXJyZW50VmFsdWUpO1xyXG5cclxuXHRcdGF3YWl0IHJlYWR5O1xyXG5cdFx0Y29uc3QgYWNjZXB0ZWQgPSBhd2FpdCB0aGlzLmFjY2VwdFZhbHVlKHZhbHVlKTtcclxuXHRcdGlmIChhY2NlcHRlZCkge1xyXG5cdFx0XHR2YWx1ZSA9IChhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKSkgfHwgdmFsdWU7XHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT0gdmFsdWUpIHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpIHZhbHVlID0gcmVzdWx0O1xyXG5cclxuXHRcdFx0XHQvL2F3YWl0IHRoaXMucmF3VmFsdWUodmFsdWUpO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVmFsaWRhdGUgdGhlIGZpZWxkIGJ5IGdpdmVuIGRhdGEgY29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcblx0ICovXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0Y29uc3QgY3VycmVudENvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbGlkID0gdGhpcy52YWxpZDtcclxuXHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgc3VwZXIudmFsaWRhdGUoZGF0YSk7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdHRoaXMudmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjdXJyZW50Q29uZGl0aW9uICE9IGNvbmRpdGlvbiwgY3VycmVudFZhbGlkICE9IHZhbGlkKTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQsIGlmIHRoZSB2YWxpZGF0aW9uIHN0YXRlIGlzIGNoYW5nZWRcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uZGl0aW9uQ2hhbmdlXHJcblx0ICogQHBhcmFtIHtib29sZWFufSB2YWxpZGF0aW9uQ2hhbmdlZFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY29uZGl0aW9uQ2hhbmdlLCB2YWxpZGF0aW9uQ2hhbmdlZCkge1xyXG5cdFx0Y29uc3QgaGFzQ2hhbmdlID0gY29uZGl0aW9uQ2hhbmdlIHx8IHZhbGlkYXRpb25DaGFuZ2VkO1xyXG5cdFx0aWYgKGhhc0NoYW5nZSkgdGhpcy5wdWJsaXNoVmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIGNhbGxlZCwgaWYgdGhlIHZhbHVlIG9mIGZpZWxkIGlzIHVwZGF0ZWRcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuXHQgKi9cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9WQUxVRV9VUERBVEVELCB2YWx1ZSlcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFB1Ymxpc2ggdGhlIHZhbHVlIHRvIHRoZSBwYXJlbnQgZmllbGQgb3IgdG8gZm9ybS4gSWYgdGhlIHZhbHVlIG9mIGN1c3RvbSBmaWVsZCBjaGFuZ2VkLCBjYWxsIHRoaXMgZnVuY3Rpb24gd2l0aCB0aGUgbmV3IHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHs/Kn0gdmFsdWUgLSBkZWZhdWx0IGlzIHRoZSBjdXJyZW50IHZhbHVlLCBpZiB2YWx1ZSBhdmFpbGFibGUsIHRoZW4gdGhlIHZhbHVlIHdvdWxkIGJlIHNldCBhcyBjdXJyZW50IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgcHVibGlzaFZhbHVlKHZhbHVlKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKGBjYWxsICR7dGhpcy5ub2RlTmFtZX0oJHt0aGlzLm5hbWV9KS5wdWJsaXNoVmFsdWU6YCwge2FyZ3VtZW50czogYXJndW1lbnRzLmxlbmd0aCwgdmFsdWV9KTtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgdmFsdWUgPSBhd2FpdCB0aGlzLnJhd1ZhbHVlKCk7XHJcblx0XHRlbHNlIGF3YWl0IHRoaXMucmF3VmFsdWUodmFsdWUpO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coXCJ3b3JrIHdpdGggVmFsdWU6XCIsIHZhbHVlKVxyXG5cdFx0Y29uc3Qgbm9WYWx1ZSA9IGRhdGFJc05vVmFsdWUodmFsdWUpO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRjb25zdCByZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQ7XHJcblx0XHR2YWx1ZSA9IChyZXF1aXJlZCAmJiBub1ZhbHVlKSB8fCAhY29uZGl0aW9uID8gbnVsbCA6IHZhbHVlO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7dGhpcy5ub2RlTmFtZX0oJHt0aGlzLm5hbWV9KS5wdWJsaXNoVmFsdWU6YCwge3JlcXVpcmVkLCBjb25kaXRpb24sIG5vVmFsdWUsIHZhbHVlfSk7XHJcblxyXG5cdFx0dXBkYXRlSGFzVmFsdWUoIW5vVmFsdWUsIHRoaXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLnBhcmVudEZpZWxkKSBhd2FpdCB0aGlzLnBhcmVudEZpZWxkLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIHZhbHVlKTtcclxuXHRcdGVsc2UgaWYgKHRoaXMuZm9ybSkgYXdhaXQgdGhpcy5mb3JtLmNoaWxkVmFsdWVDaGFuZ2VkKHRoaXMsIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGlzIGNhbGxlZCB0byBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYWNjZXB0ZWQuIENhbiBiZSBvdmVycmlkZSFcclxuXHQgKiBcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcblx0ICovXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaXMgY2FsbGVkIHRvIG5vcm1hbGl6ZSB2YWx1ZSBmb3IgZmllbGQuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHdvdWxkIGJlIGNhbGxlZCBieSBjaGlsZCBmaWVsZHNcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7QmFzZUZpZWxkfSBmaWVsZFxyXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgdmFsdWUpIHt9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFzZUZpZWxkO1xyXG4iLCJleHBvcnQgY29uc3QgSFRNTF9UQUdfUFJFRklYID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgVFJJR0dFUl9USU1FT1VUID0gMTA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVEhBTkRMRV9USU1FT1VUID0gMTA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUID0gMTAgKiBFVkVOVEhBTkRMRV9USU1FT1VUO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0ZPUk0gPSBgJHtIVE1MX1RBR19QUkVGSVh9Zm9ybWA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9TVUJNSVRfQUNUSU9OID0gYCR7SFRNTF9UQUdfUFJFRklYfXN1Ym1pdC1hY3Rpb25gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfUEFHRSA9IGAke0hUTUxfVEFHX1BSRUZJWH1wYWdlYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0ZJRUxEID0gYCR7SFRNTF9UQUdfUFJFRklYfWZpZWxkYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRBSU5FUiA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250YWluZXJgO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1QgPSBgJHtIVE1MX1RBR19QUkVGSVh9bGlzdGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX1JPV1M9IGAke0hUTUxfVEFHX1BSRUZJWH1yb3dzYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfUk9XPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfQUREX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfWFkZC1yb3dgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XPSBgJHtIVE1MX1RBR19QUkVGSVh9ZGVsZXRlLXJvd2A7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfUFJPR0VTU0JBUiA9IGAke0hUTUxfVEFHX1BSRUZJWH1wcm9ncmVzcy1iYXJgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfU1RFUCA9IGAke0hUTUxfVEFHX1BSRUZJWH1zdGVwYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9WQUxJREFUSU9OID0gYCR7SFRNTF9UQUdfUFJFRklYfXZhbGlkYXRpb25gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTUVTU0FHRSA9IGAke0hUTUxfVEFHX1BSRUZJWH1tZXNzYWdlYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2xgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9CQUNLID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtYmFja2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX05FWFQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1uZXh0YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfQ0FOQ0VMID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtY2FuY2VsYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWSA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLXN1bW1hcnlgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdWJtaXRgO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5JVCA9IFwiaW5pdFwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX1ZBTElEQVRJTkcgPSBcInZhbGlkYXRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9JTlBVVCA9IFwiaW5wdXRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9TVU1NQVJZID0gXCJzdW1tYXJ5XCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfU1VCTUlUVElORyA9IFwic3VibWl0dGluZ1wiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0ZJTklTSEVEID0gXCJmaW5pc2hlZFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBGT1JNU1RBVEVTIFxyXG4gKiBAcmVhZG9ubHlcclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVTID0ge1xyXG5cdGluaXQ6IEZPUk1TVEFURV9JTklULFxyXG5cdHZhbGlkYXRpbmc6IEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdGlucHV0OiBGT1JNU1RBVEVfSU5QVVQsXHJcblx0c3VtbWFyeTogRk9STVNUQVRFX1NVTU1BUlksXHJcblx0c3VibWl0dGluZzogRk9STVNUQVRFX1NVQk1JVFRJTkcsXHJcblx0ZmluaXNoZWQ6IEZPUk1TVEFURV9GSU5JU0hFRCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBSRVFVSVJFRFNUQVRFUyA9IHtcclxuXHRhbHdheXM6IFwiYWx3YXlzXCIsXHJcblx0b25BY3RpdmU6IFwib24tYWN0aXZlXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfUFJFRklYID0gSFRNTF9UQUdfUFJFRklYICsgXCJmb3JtLVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkUgPSBgJHtFVkVOVF9QUkVGSVh9aW5pdGlhbGl6ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OID0gYCR7RVZFTlRfSU5JVElBTElaRX1zdWJtaXQtYWN0aW9uYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVCA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUX1JFU1VMVFMgPSBgJHtFVkVOVF9QUkVGSVh9c3VibWl0LXJlc3VsdHNgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfRVhFQ1VURV9WQUxJREFURSA9IGAke0VWRU5UX1BSRUZJWH1leGVjdXRlLXZhbGlkYXRlYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWNvbmRpdGlvbi1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0FMTF9QVUJMSVNIX1ZBTFVFID0gYCR7RVZFTlRfUFJFRklYfWFsbC1wdWJsaXNoLXZhbHVlYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTFVFX1VQREFURUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtdmFsdWUtdXBkYXRlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxVRV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXZhbHVlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU0lURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXNpdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTlBVVCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbnB1dGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9MSVNUX1JPV19BREQgPSBgJHtFVkVOVF9QUkVGSVh9bGlzdC1yb3ctYWRkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0RFTEVURSA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1kZWxldGVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1wcm9ncmVzcy1iYXItY2hhbmdlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfXBhZ2UtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfUEFHRV9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfXBhZ2UtcmVtb3ZlZGA7XHJcblxyXG4vL2V4cG9ydCBjb25zdCBFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfXZhbGlkYXRpb24taW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURBVElPTl9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfXZhbGlkYXRpb24tcmVtb3ZlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfTUVTU0FHRV9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1tZXNzYWdlLWluaXRpYWxpemVkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX01FU1NBR0VfUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH1tZXNzYWdlLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWFjdGl2ZS1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWQtc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWVkaXRhYmxlLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfUkVBRE9OTFlfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1yZWFkb25seS1zdGF0ZS1jaGFuZ2VkYDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgU1BFQ0lBTFZBUlMgPSB7XHJcblx0Q1VSUkVOVFZBTFVFOiBcIiR2YWx1ZVwiLFxyXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCIsXHJcbn07XHJcblxyXG4vL0FUVFJJQlVURVNcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OQU1FID0gXCJuYW1lXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fQ1VTVE9NX1NVQk1JVFRFRF9FVkVOVCA9IFwiY3VzdG9tLXN1Ym1pdHRlZC1ldmVudFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX1JFUVVFU1RfRU5EUE9JTlQgPSBcImVuZHBvaW50XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9NRVRIT0QgPSBcIm1ldGhvZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1NUQVRFID0gXCJzdGF0ZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RFUCA9IFwic3RlcFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UgPSBcInVzZS1zdW1tYXJ5LXBhZ2VcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCA9IFwiaW5wdXQtbW9kZS1hZnRlci1zdWJtaXRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRCA9IFwicmVxdWlyZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRVFVSVJFRF9PTl9BQ1RJVkVfT05MWSA9IFwicmVxdWlyZWQtb24tYWN0aXZlLW9ubHlcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEUgPSBcImVkaXRhYmxlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OID0gXCJlZGl0YWJsZS1jb25kaXRpb25cIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9SRUFET05MWSA9IFwicmVhZG9ubHlcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9OT1ZBTFVFID0gXCJuby12YWx1ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTElEID0gXCJ2YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOVkFMSUQgPSBcImludmFsaWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FVkFMVUFURSA9IFwiZXZhbHVhdGVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQgPSBcImNvbmRpdGlvbi12YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEID0gXCJjb25kaXRpb24taW52YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01JTiA9IFwibWluXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUFYID0gXCJtYXhcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9GT1IgPSBcImZvclwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1ZBTFVFID0gXCJ2YWx1ZVwiO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9DT05UQUlORVIsIFxyXG5cdEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCBcclxuXHRFVkVOVF9GSUVMRF9SRU1PVkVEIFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XHJcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IHZhbHVlSGVscGVyLCBmaWVsZFZhbHVlTWFwVG9PYmplY3QgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UQUlORVI7XHJcblx0fVxyXG5cclxuXHQjZmllbGRzID0gbnVsbDtcclxuXHQjdmFsdWUgPSBuZXcgTWFwKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0aWYgKGZpZWxkICE9IHRoaXMpIHtcclxuXHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQgJiYgKCF0aGlzLiNmaWVsZHMgfHwgIXRoaXMuI2ZpZWxkcy5oYXMoZmllbGQpKSlcclxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcyA9IG51bGw7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xyXG5cdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCAmJiB0aGlzLiNmaWVsZHMgJiYgdGhpcy4jZmllbGRzLmhhcyhmaWVsZCkpXHJcblx0XHRcdFx0XHR0aGlzLiNmaWVsZHMuZGVsZXRlKGZpZWxkKTtcclxuXHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoeyBkYXRhIH0pID0+IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMuZmllbGRzKSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmllbGRzKCkge1xyXG5cdFx0aWYoIXRoaXMuI2ZpZWxkcylcclxuXHRcdFx0dGhpcy4jZmllbGRzID0gbmV3IFNldChmaW5kRmllbGRzKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNmaWVsZHMpO1xyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0Y29uc3QgeyByZWFkb25seSwgZmllbGRzIH0gPSB0aGlzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcInJlYWRvbmx5VXBkYXRlZDpcIiwgeyByZWFkb25seSwgZmllbGRzIH0pXHJcblx0XHRpZiAoZmllbGRzKVxyXG5cdFx0XHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRjb25zdCBtYXAgPSB0aGlzLiN2YWx1ZTtcclxuXHRcdG1hcC5jbGVhcigpO1xyXG5cdFx0Y29uc3QgZmllbGRzID0gdGhpcy5maWVsZHM7XHJcblx0XHRpZiAoZmllbGRzKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoYXN5bmMgKGZpZWxkKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdFx0Y29uc3QgZmllbGRWYWx1ZSA9IG5hbWUgPyB2YWx1ZUhlbHBlcih2YWx1ZSwgZmllbGQubmFtZSkgOiB2YWx1ZTtcclxuXHRcdFx0XHRpZighbm9WYWx1ZShmaWVsZFZhbHVlKSlcclxuXHRcdFx0XHRcdG1hcC5zZXQoZmllbGQsIGZpZWxkVmFsdWUpO1xyXG5cdFx0XHRcdGF3YWl0IGZpZWxkLnZhbHVlKGZpZWxkVmFsdWUpO1xyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIGZpZWxkcyk7XHJcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KTpgLCB7ZmllbGQsIHZhbHVlfSk7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1x0XHRcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1x0XHRcclxuXHRcdFxyXG5cdFx0aWYgKGZpZWxkKSB7XHJcblx0XHRcdGNvbnN0IGhhc0ZpZWxkID0gbWFwLmhhcyhmaWVsZCk7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IG1hcC5nZXQoZmllbGQpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKHtuYW1lOiBmaWVsZC5uYW1lLCBjdXJyZW50VmFsdWUsIHZhbHVlLCBoYXNGaWVsZH0pXHJcblxyXG5cdFx0XHRpZihoYXNGaWVsZCAmJiBjdXJyZW50VmFsdWUgPT0gdmFsdWUpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGBkZWxldGUgJHtmaWVsZC5uYW1lfWApO1xyXG5cdFx0XHRcdG1hcC5kZWxldGUoZmllbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYHNldCAke2ZpZWxkLm5hbWV9ID0gJHt2YWx1ZX1gKTtcclxuXHRcdFx0XHRtYXAuc2V0KGZpZWxkLCB2YWx1ZSk7XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KG1hcCwgdGhpcy5maWVsZHMpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcImRhdGE6IFwiLGRhdGEpO1xyXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcclxuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGRhdGEpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKENvbnRhaW5lcik7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXHJcblx0Tk9ERU5BTUVfQ09OVFJPTCxcclxuXHROT0RFTkFNRV9DT05UUk9MX0JBQ0ssXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9ORVhULFxyXG5cdE5PREVOQU1FX0NPTlRST0xfU1VCTUlULCBcclxuXHROT0RFTkFNRV9GT1JNLFxyXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IFwiLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCBcIi4vY29udHJvbHNcIjtcclxuXHJcblxyXG5jb25zdCBCVVRUT05EVU1NWSA9IHtcclxuXHRhY3RpdmU6IGZhbHNlLFxyXG5cdGRpc2FibGVkOiBmYWxzZSxcclxufTtcclxuXHJcbmNsYXNzIFN1Ym1pdFdyYXBwZXJ7XHJcblxyXG5cdCNzdWJtaXRzO1xyXG5cdCNhY3RpdmUgPSBmYWxzZTtcclxuXHQjZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtBcnJheTxGb3JtQnV0dG9uPn0gdGhlU3VibWl0cyBcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih0aGVTdWJtaXRzKXtcclxuXHRcdHRoaXMuI3N1Ym1pdHMgPSB0aGVTdWJtaXRzO1xyXG5cdFx0dGhpcy4jc3VibWl0cy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcblx0XHRcdGJ1dHRvbi5hY3RpdmUgPSB0aGlzLiNhY3RpdmU7XHJcblx0XHRcdGJ1dHRvbi5kaXNhYmxlZCA9IHRoaXMuI2Rpc2FibGVkO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy4jYWN0aXZlO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhVmFsdWUpe1xyXG5cdFx0dGhpcy4jYWN0aXZlID0gYVZhbHVlXHJcblx0XHR0aGlzLiNzdWJtaXRzLmZvckVhY2goYnV0dG9uID0+XHRidXR0b24uYWN0aXZlID0gdGhpcy4jYWN0aXZlKTtcclxuXHR9XHJcblxyXG5cdGdldCBkaXNhYmxlZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuI2Rpc2FibGVkO1xyXG5cdH1cclxuXHJcblx0c2V0IGRpc2FibGVkKGFWYWx1ZSl7XHJcblx0XHR0aGlzLiNkaXNhYmxlZCA9IGFWYWx1ZVxyXG5cdFx0dGhpcy4jc3VibWl0cy5mb3JFYWNoKGJ1dHRvbiA9Plx0YnV0dG9uLmRpc2FibGVkID0gdGhpcy4jZGlzYWJsZWQpO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MO1xyXG5cdH1cclxuXHJcblx0I2Zvcm07XHJcblx0I2JhY2s7XHJcblx0I25leHQ7XHJcblx0I3N1bW1hcnk7XHJcblx0I3N1Ym1pdDtcclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdHRoaXMuI2JhY2sgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9CQUNLKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xyXG5cdFx0XHR0aGlzLiNuZXh0ID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfTkVYVCkuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHRcdFx0dGhpcy4jc3VtbWFyeSA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblx0XHRcdHRoaXMuI3N1Ym1pdCA9IG5ldyBTdWJtaXRXcmFwcGVyKHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX1NVQk1JVCkgfHwgW0JVVFRPTkRVTU1ZXSk7XHJcblxyXG5cdFx0XHR0aGlzLiNmb3JtLm9uKFtFVkVOVF9JTklUSUFMSVpFRCwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBFVkVOVF9TSVRFX0NIQU5HRURdLCAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0YXN5bmMgdXBkYXRlKCkge1xyXG5cdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm07XHJcblx0XHRjb25zdCBzdGF0ZSA9IGZvcm0uc3RhdGU7XHJcblx0XHRjb25zdCBiYWNrID0gdGhpcy4jYmFjaztcclxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLiNuZXh0O1xyXG5cdFx0Y29uc3Qgc3VtbWFyeSA9IHRoaXMuI3N1bW1hcnk7XHJcblx0XHRjb25zdCBzdWJtaXQgPSB0aGlzLiNzdWJtaXQ7XHJcblxyXG5cdFx0Ly8gYmFzaWMgY29udHJvbCBzZXR1cFxyXG5cdFx0YmFjay5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRuZXh0LmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0bmV4dC5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRzdW1tYXJ5LmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0c3VtbWFyeS5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRzdWJtaXQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuXHRcdGlmKHN0YXRlID09IEZPUk1TVEFURV9WQUxJREFUSU5HKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgeyBhY3RpdmVQYWdlSW5kZXgsIGFjdGl2ZVBhZ2UsIG5leHRQYWdlLCBwYWdlcywgdXNlU3VtbWFyeVBhZ2UgfSA9IGZvcm07XHRcclxuXHRcdGNvbnN0IGhhc05leHRQYWdlID0gKGF3YWl0IG5leHRQYWdlKSAhPSBudWxsO1xyXG5cclxuXHRcdGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfRklOSVNIRUQpIHtcclxuXHRcdFx0YmFjay5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xyXG5cdFx0XHRiYWNrLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcclxuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBhY3RpdmVQYWdlSW5kZXggPD0gMDtcclxuXHJcblx0XHRcdGlmIChoYXNOZXh0UGFnZSB8fCAoIWFjdGl2ZVBhZ2UudmFsaWQgJiYgYWN0aXZlUGFnZUluZGV4ICsgMSA8IHBhZ2VzLmxlbmd0aCkpIHtcclxuXHRcdFx0XHRuZXh0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0bmV4dC5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2UgPyAhYWN0aXZlUGFnZS52YWxpZCA6IHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAodXNlU3VtbWFyeVBhZ2UgJiYgc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0c3VtbWFyeS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdHN1bW1hcnkuZGlzYWJsZWQgPSBhY3RpdmVQYWdlID8gIWFjdGl2ZVBhZ2UudmFsaWQgOiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN1Ym1pdC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmRlZmluZShDb250cm9sKTtcclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbDtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfRklFTEQsIFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVUIFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuL0Jhc2VGaWVsZFwiO1xyXG5pbXBvcnQgeyBmaW5kV3JhcHBlciB9IGZyb20gXCIuL3dyYXBwZXJcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXCJmaWxlLWZvcm1hdFwiXTtcclxuXHJcbmNsYXNzIEZpZWxkIGV4dGVuZHMgQmFzZUZpZWxkIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfRklFTEQ7XHJcblx0fVxyXG5cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQjd3JhcHBlcjtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLm9uKEVWRU5UX0ZJRUxEX0lOUFVULCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdHRoaXMucHVibGlzaFZhbHVlKGV2ZW50LmRldGFpbCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuI3dyYXBwZXIgPSBmaW5kV3JhcHBlcih0aGlzKTtcclxuXHRcdFx0aWYgKHRoaXMuI3dyYXBwZXIpe1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuI3dyYXBwZXIuaW5pdCgpO1xyXG5cdFx0XHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoKSA9PiB0aGlzLiN3cmFwcGVyLnZhbGlkKTtcclxuXHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSh0aGlzLiN3cmFwcGVyLnZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0aWYgKHRoaXMuI3dyYXBwZXIpIHRoaXMuI3dyYXBwZXIucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0aGlzLiN3cmFwcGVyID8gdGhpcy4jd3JhcHBlci5hY2NlcHRWYWx1ZSh2YWx1ZSkgOiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy4jd3JhcHBlcikgcmV0dXJuIHRoaXMuI3dyYXBwZXIubm9ybWFsaXplVmFsdWUodmFsdWUpO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gdGhpcy4jd3JhcHBlcjtcclxuXHRcdGlmICh3cmFwcGVyKXtcclxuXHRcdFx0Y29uc3QgY3VycmVudCA9IHdyYXBwZXIudmFsdWU7XHJcblx0XHRcdGlmKGN1cnJlbnQgIT0gdmFsdWUpXHJcblx0XHRcdFx0YXdhaXQgd3JhcHBlci51cGRhdGVkVmFsdWUodmFsdWUpO1xyXG5cdFx0XHRcclxuXHRcdFx0YXdhaXQgc3VwZXIudXBkYXRlZFZhbHVlKHdyYXBwZXIudmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjb25kaXRpb25DaGFuZ2UsIHZhbGlkYXRpb25DaGFuZ2VkKXtcdFx0XHJcblx0XHRpZihjb25kaXRpb25DaGFuZ2UgJiYgdGhpcy5jb25kaXRpb24pe1x0XHRcdFxyXG5cdFx0XHRjb25zdCB3cmFwcGVyID0gdGhpcy4jd3JhcHBlcjtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB3cmFwcGVyLnZhbHVlID09IG51bGwgIHx8IHR5cGVvZiB3cmFwcGVyLnZhbHVlID09PSAndW5kZWZpbmVkJyA/ICBudWxsIDogd3JhcHBlci52YWx1ZTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZCgke3RoaXMubmFtZX0gKCR7Y29uZGl0aW9uQ2hhbmdlfSwgJHt2YWxpZGF0aW9uQ2hhbmdlZH0pIC0+ICR7dmFsdWV9YClcclxuXHRcdFx0dGhpcy5yYXdWYWx1ZSh2YWx1ZSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzdXBlci52YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGNvbmRpdGlvbkNoYW5nZSwgdmFsaWRhdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKEZpZWxkKTtcclxuZXhwb3J0IGRlZmF1bHQgRmllbGQ7XHJcbiIsImltcG9ydCB7XHJcblx0LyoqIE5vZGVuYW1lcyAqL1xyXG5cdE5PREVOQU1FX0ZPUk0sXHJcblx0Tk9ERU5BTUVfUEFHRSxcclxuXHQvKipFdmVudHMgKi9cclxuXHRFVkVOVF9JTklUSUFMSVpFRCxcclxuXHRFVkVOVF9QQUdFX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX1BBR0VfUkVNT1ZFRCxcclxuXHRFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfU0lURV9DSEFOR0VELFxyXG5cdEVWRU5UX1NVQk1JVCxcclxuXHRFVkVOVF9TVUJNSVRfUkVTVUxUUyxcclxuXHQvKipBdHRyaWJ1dGUgKi9cclxuXHRBVFRSSUJVVEVfTkFNRSxcclxuXHRBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSxcclxuXHRBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fQ1VTVE9NX1NVQk1JVFRFRF9FVkVOVCxcclxuXHRBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9NRVRIT0QsXHJcblx0QVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX1JFUVVFU1RfRU5EUE9JTlQsXHJcblx0QVRUUklCVVRFX1NUQVRFLFxyXG5cdEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCxcclxuXHQvKipGb3Jtc3RhdGVzICovXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9JTklULFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCxcclxuXHRGT1JNU1RBVEVfU1VCTUlUVElORyxcclxuXHRGT1JNU1RBVEVTLFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xyXG5pbXBvcnQgXCIuL01lc3NhZ2VcIjtcclxuaW1wb3J0IFwiLi9QYWdlXCI7XHJcbmltcG9ydCBcIi4vQ29udHJvbFwiO1xyXG5pbXBvcnQgXCIuL1Byb2dyZXNzQmFyXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uXCI7XHJcbmltcG9ydCBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL0RlZmF1bHRGb3JtU3VibWl0QWN0aW9uXCI7XHJcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQsIHsgU1RBVEVfRkFJTCBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwsIFNUQVRFX1NVQ0NFU1MgYXMgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHsgdmFsdWVIZWxwZXIsIGZpZWxkVmFsdWVNYXBUb09iamVjdCB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBQcm9taXNlVXRpbHMgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlsc1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5ULCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9FTkRQT0lOVCwgQVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX1JFUVVFU1RfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVF07XHJcblxyXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xyXG5cdGZvciAobGV0IHBhZ2Ugb2YgZm9ybS5wYWdlcykge1xyXG5cdFx0cGFnZS5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogQHR5cGVkZWYge09iamVjdH0gRm9ybVJlc3VsdE9wdGlvblxyXG4gKlxyXG4gKiBAcHJvcGVydHkge0ZPUk1TVEFURVN9IHN0YXRlXHJcbiAqXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBEZXNjcmlwdGlvbiBwbGFjZWhvbGRlclxyXG4gKlxyXG4gKiBAYXN5bmNcclxuICogQHBhcmFtIHtCYXNlU3VibWl0QWN0aW9ufSBhY3Rpb25zXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XHJcbiAqIEBwYXJhbSB7Rm9ybVJlc3VsdE9wdGlvbn0gcmVzdWx0T3B0aW9uXHJcbiAqIEByZXR1cm5zIHtBcnJheTxTdWJtaXRBY3Rpb25SZXN1bHQ+fVxyXG4gKi9cclxuY29uc3QgZXhlY3V0ZUFjdGlvbnMgPSBhc3luYyAoYWN0aW9ucywgZGF0YSwgY29udGV4dCwgcmVzdWx0T3B0aW9uKSA9PiB7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cclxuXHRmb3IgKGxldCBhY3Rpb24gb2YgYWN0aW9ucykge1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gYXdhaXQgYWN0aW9uLmFjY2VwdChkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSAoYXdhaXQgYWN0aW9uLmV4ZWN1dGUoZGF0YSwgY29udGV4dCwgcmVzdWx0T3B0aW9uKSkgfHwgbmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfU1VDQ0VTUywgbnVsbCwgZGF0YSwgY29udGV4dCwgcmVzdWx0T3B0aW9uKTtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0XHRpZiAocmVzdWx0LnN0YXRlID09IEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCkgcmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiByZXN1bHQuZGF0YSAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQuZGF0YSAhPSBudWxsKSBkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiByZXN1bHQuY29udGV4dCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQuZGF0YSAhPSBjb250ZXh0KSBkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gobmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgZSwgZGF0YSwgY29udGV4dCwgcmVzdWx0T3B0aW9uKSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdHM7XHJcbn07XHJcblxyXG4vKipcclxuICogZm9ybSBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgRm9ybVxyXG4gKiBAdHlwZWRlZiB7Rm9ybX1cclxuICogQGV4dGVuZHMge0NvbXBvbmVudH1cclxuICovXHJcbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZPUk07XHJcblx0fVxyXG5cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQjc3RhdGUgPSBGT1JNU1RBVEVfSU5JVDtcclxuXHQjcGFnZXM7XHJcblx0I3ZhbHVlID0gbmV3IE1hcCgpO1xyXG5cdCNkYXRhID0ge307XHJcblx0I3ZhbGlkYXRpb24gPSBudWxsO1xyXG5cdCNzdWJtaXRBY3Rpb25zID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBGb3JtLlxyXG5cdCAqXHJcblx0ICogQGNvbnN0cnVjdG9yXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX1BBR0VfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfUEFHRV9SRU1PVkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgcGFnZSA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0dGhpcy4jcGFnZXMgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKHBhZ2UsIG51bGwpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX0lOSVRJQUxJWkVEKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBpbml0IGZvcm0gY29tcG9uZW50XHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XHJcblxyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOSVQ7XHJcblxyXG5cdFx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xyXG5cclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXMubGVuZ3RoID4gMCkgdGhpcy50b05leHRQYWdlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBnZXQgcGFnZXMgb2YgZm9ybVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge1BhZ2VbXX1cclxuXHQgKi9cclxuXHRnZXQgcGFnZXMoKSB7XHJcblx0XHRpZiAoIXRoaXMuI3BhZ2VzKSB0aGlzLiNwYWdlcyA9IEFycmF5LmZyb20odGhpcy5yb290LmZpbmQoTk9ERU5BTUVfUEFHRSkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLiNwYWdlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGZvcm0gc3RhdGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0IHN0YXRlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3N0YXRlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZm9ybSBzdGF0ZVxyXG5cdCAqL1xyXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xyXG5cdFx0Y29uc3QgYWN0dWFsID0gdGhpcy4jc3RhdGU7XHJcblx0XHRpZiAoc3RhdGUgIT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpIHtcclxuXHRcdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSByZWFkb25seSh0aGlzLCB0cnVlKTtcclxuXHRcdFx0ZWxzZSBpZiAoYWN0dWFsICE9IEZPUk1TVEFURV9JTlBVVCAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0XHRyZWFkb25seSh0aGlzLCBmYWxzZSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuYWN0aXZlUGFnZSkgdGhpcy5hY3RpdmVQYWdlLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuI3N0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGFjdHVhbCAhPSBzdGF0ZSkgdGhpcy50cmlnZ2VyKEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1NUQVRFLCBzdGF0ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBpcyBmb3JtIHZhbGlkXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRnZXQgdmFsaWQoKSB7XHJcblx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIGlmIChwYWdlLmNvbmRpdGlvbiAmJiAhcGFnZS52YWxpZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IG9yIHNldCB2YWx1ZSBvZiBmb3JtXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGRhdGEgLSBmb3JtIGRhdGFcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fFByb21pc2U8dm9pZD59XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIGF3YWl0IGZvcm0udmFsdWUoKSAvLyByZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIGZvcm1cclxuXHQgKiBhd2FpdCBmb3JtLnZhbHVlKHt0ZXN0OlwidmFsdWVcIn0pIC8vIHNldCB2YWx1ZSB0byBmb3JtXHJcblx0ICpcclxuXHQgKi9cclxuXHRhc3luYyB2YWx1ZShkYXRhKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24pIGF3YWl0IHRoaXMuI3ZhbGlkYXRpb247XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm4gc3RydWN0dXJlZENsb25lKHRoaXMuI2RhdGEpO1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRhd2FpdCBQcm9taXNlLmFsbChcclxuXHRcdFx0XHR0aGlzLnBhZ2VzLm1hcCgocGFnZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHBhZ2UubmFtZTtcclxuXHRcdFx0XHRcdHJldHVybiBuYW1lID8gcGFnZS52YWx1ZSh2YWx1ZUhlbHBlcihkYXRhLCBuYW1lKSkgOiBwYWdlLnZhbHVlKGRhdGEpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0YXdhaXQgdGhpcy4jdmFsaWRhdGUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGhhbmRsZSA9IChldmVudCkgPT4ge1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZU9uKGhhbmRsZSwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEKTtcclxuXHRcdFx0XHRcdHJlc29sdmUodGhpcy52YWx1ZShkYXRhKSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLm9uKEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCwgaGFuZGxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBnZXQgY3VycmVudCBhY3RpdmUgcGFnZVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1BhZ2V9XHJcblx0ICovXHJcblx0Z2V0IGFjdGl2ZVBhZ2UoKSB7XHJcblx0XHRpZiAoMCA8PSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCAmJiB0aGlzLmFjdGl2ZVBhZ2VJbmRleCA8IHRoaXMucGFnZXMubGVuZ3RoKSByZXR1cm4gdGhpcy5wYWdlc1t0aGlzLmFjdGl2ZVBhZ2VJbmRleF07XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzZXQgY3VycmVudCBhY3RpdmUgcGFnZVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1BhZ2V9XHJcblx0ICovXHJcblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlUGFnZTtcclxuXHRcdGlmIChwYWdlICE9IGN1cnJlbnQgfHwgdGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gdGhpcy5wYWdlcy5pbmRleE9mKHBhZ2UpO1xyXG5cdFx0XHRwYWdlLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkgdGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50KSB0aGlzLnNjcm9sbEludG9WaWV3KCk7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TSVRFX0NIQU5HRUQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZmlyc3QgdmFsaWQgcHJldmlvdXMgcGFnZSBvZiBjdXJyZW50IGFjdGl2ZSBwYWdlXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7UGFnZX1cclxuXHQgKi9cclxuXHRnZXQgcHJldlBhZ2UoKSB7XHJcblx0XHRyZXR1cm4gKGFzeW5jICgpID0+IHtcclxuXHRcdFx0Y29uc3QgcGFnZXMgPSB0aGlzLnBhZ2VzO1xyXG5cdFx0XHRjb25zdCBzdGFydCA9IHRoaXMuYWN0aXZlUGFnZUluZGV4IC0gMTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBwYWdlc1tpXTtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZShwYWdlKTtcclxuXHRcdFx0XHRpZiAocGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0pKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBnZXQgbmV4dCB2YWxpZCBwYWdlIG9mIGN1cnJlbnQgYWN0aXZlIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQYWdlfVxyXG5cdCAqL1xyXG5cdGdldCBuZXh0UGFnZSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xyXG5cdFx0XHRpZiAocGFnZXMpIHtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Y29uc3QgcGFnZSA9IHBhZ2VzW2ldO1xyXG5cdFx0XHRcdFx0YXdhaXQgcGFnZS52YWxpZGF0ZSh0aGlzLiNkYXRhKTtcclxuXHRcdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGNoYW5nZSBhY3RpdmUgcGFnZSB0byBmaXJzdCB2YWxpZCBwcmV2aW91cyBwYWdlXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyB0b1ByZXZQYWdlKCkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBwcmV2ID0gYXdhaXQgdGhpcy5wcmV2UGFnZTtcclxuXHRcdFx0aWYgKHByZXYpIHRoaXMuYWN0aXZlUGFnZSA9IHByZXY7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBjaGFuZ2UgYWN0aXZlIHBhZ2UgdG8gbmV4dCB2YWlsZCBwYWdlXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyB0b05leHRQYWdlKCkge1xyXG5cdFx0Y29uc3QgbmV4dCA9IGF3YWl0IHRoaXMubmV4dFBhZ2U7XHJcblx0XHRpZiAobmV4dCkge1xyXG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2UgPSBuZXh0O1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnVzZVN1bW1hcnlQYWdlKSB7XHJcblx0XHRcdHRoaXMuc3VtbWFyeSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN3aXRjaCBmb3JtIGludG8gc3VtbWFyeSBzdGF0ZVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgc3VtbWFyeSgpIHtcclxuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfU1VNTUFSWTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBhbGwgZm9ybSBzdWJtaXQgYWN0aW9uc1xyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge0RlZmF1bHRGb3JtU3VibWl0QWN0aW9uW119XHJcblx0ICovXHJcblx0Z2V0IHN1Ym1pdEFjdGlvbnMoKSB7XHJcblx0XHRpZiAoIXRoaXMuI3N1Ym1pdEFjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtdO1xyXG5cdFx0XHRjb25zdCBlbmRwb2ludCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9FTkRQT0lOVCk7XHJcblx0XHRcdGlmIChlbmRwb2ludCkge1xyXG5cdFx0XHRcdGNvbnN0IG1ldGhvZCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9NRVRIT0QpIHx8IFwicG9zdFwiO1xyXG5cdFx0XHRcdHRoaXMuYXBwZW5kKG5ldyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbihlbmRwb2ludCwgbWV0aG9kKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuY2hpbGRyZW47XHJcblx0XHRcdGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcykge1xyXG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEJhc2VTdWJtaXRBY3Rpb24pIGFjdGlvbnMucHVzaChjaGlsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4jc3VibWl0QWN0aW9ucyA9IGFjdGlvbnM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI3N1Ym1pdEFjdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzdWJtaXQgZm9ybVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgc3VibWl0KHsgZGF0YSA9IG51bGwsIGFjdGlvbnMgPSBbXSwgY29udGV4dCA9IHt9IH0gPSB7fSkge1xyXG5cdFx0Y29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfU1VCTUlUVElORztcclxuXHRcdGxldCBmb3JtZGF0YSA9IGF3YWl0IHRoaXMudmFsdWUoKTtcclxuXHRcdGNvbnN0IHZhbGlkID0gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZm9ybWRhdGEsIHRoaXMucGFnZXMpO1xyXG5cdFx0aWYgKCF2YWxpZCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChkYXRhKSBmb3JtZGF0YSA9IE9iamVjdFV0aWxzLm1lcmdlKGZvcm1kYXRhLCBkYXRhKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEB0eXBlIHtGb3JtUmVzdWx0T3B0aW9ufVxyXG5cdFx0ICovXHJcblx0XHRjb25zdCByZXN1bHRPcHRpb24gPSB7XHJcblx0XHRcdHN0YXRlOiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQpID8gRk9STVNUQVRFX0lOUFVUIDogRk9STVNUQVRFX0ZJTklTSEVELFxyXG5cdFx0fTtcclxuXHJcblx0XHRhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQodGhpcy5zdWJtaXRBY3Rpb25zKTtcclxuXHRcdGlmIChhY3Rpb25zKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBleGVjdXRlQWN0aW9ucyhhY3Rpb25zLCBmb3JtZGF0YSwgY29udGV4dCwgcmVzdWx0T3B0aW9uKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NVQk1JVF9SRVNVTFRTLCByZXN1bHRzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YXRlID0gcmVzdWx0T3B0aW9uLnN0YXRlO1xyXG5cclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TVUJNSVQsIGZvcm1kYXRhKTtcclxuXHJcblx0XHRjb25zdCBjdXN0b21TdWJtaXR0ZWRFdmVudCA9ICh0aGlzLmF0dHIoQVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX0NVU1RPTV9TVUJNSVRURURfRVZFTlQpIHx8IFwiXCIpLnRyaW0oKTtcclxuXHRcdGlmIChjdXN0b21TdWJtaXR0ZWRFdmVudC5sZW5ndGggPiAwKSB0aGlzLnRyaWdnZXIoY3VzdG9tU3VibWl0dGVkRXZlbnQsIGZvcm1kYXRhKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKCkge1xyXG5cdFx0YXdhaXQgdGhpcy4jdmFsaWRhdGUoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jICN2YWxpZGF0ZShwYWdlKSB7XHJcblx0XHRjb25zdCBwcm9taXNlID0gUHJvbWlzZVV0aWxzLmxhenlQcm9taXNlKCk7XHJcblx0XHRjb25zdCBhY3Rpb24gPSBhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLiNkYXRhOyAvL2F3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdCh0aGlzLiN2YWx1ZSk7XHJcblxyXG5cdFx0XHRjb25zdCB2YWxpZCA9IHBhZ2UgPyBhd2FpdCBwYWdlLnZhbGlkYXRlKGRhdGEpIDogYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5wYWdlcyk7XHJcblxyXG5cdFx0XHRwcm9taXNlLnJlc29sdmUodmFsaWQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24gPT0gcHJvbWlzZSkge1xyXG5cdFx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XHJcblx0XHRcdFx0dGhpcy4jdmFsaWRhdGlvbiA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24gPT0gbnVsbCkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGFjdGlvbiwgMSk7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfVkFMSURBVElORztcclxuXHRcdH0gZWxzZSB0aGlzLiN2YWxpZGF0aW9uLnRoZW4oYWN0aW9uKTtcclxuXHJcblx0XHR0aGlzLiN2YWxpZGF0aW9uID0gcHJvbWlzZTtcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KWAsIHsgZmllbGQsIHZhbHVlIH0pO1xyXG5cdFx0aWYgKGZpZWxkKSB7XHJcblx0XHRcdGlmIChub1ZhbHVlKHZhbHVlKSkgbWFwLmRlbGV0ZShmaWVsZCk7XHJcblx0XHRcdGVsc2UgbWFwLnNldChmaWVsZCwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuI2RhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIHRoaXMucGFnZXMpO1xyXG5cclxuXHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmFjdGl2ZVBhZ2U7XHJcblx0XHRpZiAoYWN0aXZlUGFnZSkgYXdhaXQgdGhpcy4jdmFsaWRhdGUoYWN0aXZlUGFnZSk7XHJcblx0XHRlbHNlIGF3YWl0IHRoaXMuI3ZhbGlkYXRlKCk7XHJcblx0fVxyXG59XHJcbmRlZmluZShGb3JtKTtcclxuZXhwb3J0IGRlZmF1bHQgRm9ybTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRF07XHJcblxyXG4vKipcclxuICogYmFzaWMgZm9ybSBidXR0b24gY2xhc3NcclxuICogQGRhdGUgMy8xMy8yMDI0IC0gMTI6MTg6MjcgQU1cclxuICpcclxuICogQGNsYXNzIEZvcm1CdXR0b25cclxuICogQHR5cGVkZWYge0Zvcm1CdXR0b259XHJcbiAqIEBleHRlbmRzIHtDb21wb25lbnR9XHJcbiAqL1xyXG5jbGFzcyBGb3JtQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I2Zvcm07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcdFxyXG5cclxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuZGlzYWJsZWQpIHRoaXMuZXhlY3V0ZSgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0dGhpcy5hdHRyKFwidGFiaW5kZXhcIixcIjBcIikuYXR0cihcInJvbGVcIiwgXCJidXR0b25cIik7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAodGhpcy4jaW5pdGlhbGl6ZWQpIHtcdFx0XHRcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgZm9ybSgpIHtcclxuXHRcdGlmICghdGhpcy4jZm9ybSlcclxuXHRcdFx0dGhpcy4jZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLiNmb3JtO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgYWN0aXZlID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGRpc2FibGVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9ESVNBQkxFRCk7XHJcblx0fVxyXG5cclxuXHRzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfRElTQUJMRUQsIGRpc2FibGVkID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiZXhlY3V0ZVwiKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRm9ybUJ1dHRvbjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Ly9OT0RFIE5BTUVTXHJcblx0Tk9ERU5BTUVfTElTVCwgXHJcblx0Tk9ERU5BTUVfTElTVF9ST1dTLCBcclxuXHROT0RFTkFNRV9MSVNUX1JPVywgXHJcblx0Ly9FVkVOVCBOQU1FU1xyXG5cdEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCBcclxuXHRFVkVOVF9MSVNUX1JPV19BREQsIFxyXG5cdEVWRU5UX0xJU1RfUk9XX0RFTEVURSwgXHJcblx0Ly9BVFRSSUJVVEUgTkFNRVNcclxuXHRBVFRSSUJVVEVfTUlOLCBcclxuXHRBVFRSSUJVVEVfTUFYIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL2luZGV4LmpzXCI7XHJcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkLmpzXCI7XHJcbmltcG9ydCBcIi4vbGlzdC9EZWxldGVSb3cuanNcIjtcclxuaW1wb3J0IFwiLi9saXN0L1Jvd3MuanNcIjtcclxuaW1wb3J0IFwiLi9saXN0L1Jvdy5qc1wiO1xyXG5pbXBvcnQgXCIuL2xpc3QvQWRkUm93LmpzXCI7XHJcbmltcG9ydCB7RVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPV30gZnJvbSBcIi4vbGlzdC9BZGRSb3cuanNcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyLmpzXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXIuanNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX01JTiwgQVRUUklCVVRFX01BWF07XHJcblxyXG5jb25zdCBidWlsZERhdGEgPSBhc3luYyAocm93cywgdmFsdWVzKSA9PiB7XHJcblx0bGV0IGRhdGEgPSBbXTtcclxuXHRmb3IgKGxldCByb3cgb2Ygcm93cykgZGF0YS5wdXNoKHZhbHVlcy5nZXQocm93KSk7XHJcblxyXG5cdGlmIChkYXRhLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jbGFzcyBMaXN0IGV4dGVuZHMgQmFzZUZpZWxkIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVDtcclxuXHR9XHJcblxyXG5cdCN0ZW1wbGF0ZTtcclxuXHQjY29udGFpbmVyO1xyXG5cdCN2YWx1ZXMgPSBuZXcgTWFwKCk7XHJcblx0I2FkZFJvd0J1dHRvbjtcclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVywgKGV2ZW50KSA9PiB7XHJcblx0XHRcdHRoaXMuI2FkZFJvd0J1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0aWYodGFyZ2V0ICE9IHRoaXMpe1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfTElTVF9ST1dfQURELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB0aGlzLmNyZWF0ZVJvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9MSVNUX1JPV19ERUxFVEUsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdGNvbnN0IHsgcm93cywgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcclxuXHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9IHJvd3MuaW5kZXhPZihyb3cpO1xyXG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCB7IHJvd3MsIG1pbiwgbWF4LCByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdFx0Y29uc3QgbGVuZ3RoID0gcm93cy5sZW5ndGg7XHJcblx0XHRcdGlmICh0aGlzLiNhZGRSb3dCdXR0b24gJiYgIXJlYWRvbmx5KSB7XHJcblx0XHRcdFx0aWYgKGxlbmd0aCA9PSBtYXgpIHRoaXMuI2FkZFJvd0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0ZWxzZSBpZiAobGVuZ3RoIDwgbWF4KSB0aGlzLiNhZGRSb3dCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbWluIDw9IGxlbmd0aCAmJiBsZW5ndGggPD0gbWF4O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jIChkYXRhKSA9PiB7XHJcblx0XHRcdHJldHVybiBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhkYXRhLCB0aGlzLnJvd3MpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1x0XHRcdFxyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdGNvbnN0IHJvd1RlbXBsYXRlID0gdGhpcy5maW5kKFwidGVtcGxhdGVcIikuZmlyc3QoKTtcclxuXHRcdFx0aWYocm93VGVtcGxhdGUpXHJcblx0XHRcdFx0dGhpcy4jdGVtcGxhdGUgPSByb3dUZW1wbGF0ZS5jb250ZW50O1xyXG5cclxuXHRcdFx0dGhpcy4jY29udGFpbmVyID0gdGhpcy5maW5kKE5PREVOQU1FX0xJU1RfUk9XUykuZmlyc3QoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcclxuXHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRmb3IgKGxldCByb3cgb2YgdGhpcy5yb3dzKSB7XHJcblx0XHRcdHJvdy5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHJvd3MoKSB7XHJcblx0XHRpZih0aGlzLiNjb250YWluZXIpXHJcblx0XHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuI2NvbnRhaW5lci5jaGlsZHJlbik7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fVxyXG5cclxuXHRnZXQgbWluKCkge1xyXG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NSU4pKSByZXR1cm4gTWF0aC5tYXgoMCwgcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NSU4pKSk7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdGdldCBtYXgoKSB7XHJcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01BWCkpIHJldHVybiBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01BWCkpO1xyXG5cdFx0cmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiAhdmFsdWUgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSkgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlUm93KHZhbHVlKSB7XHJcblx0XHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuI3RlbXBsYXRlLCB0cnVlKS5jaGlsZHJlblswXTtcclxuXHRcdGF3YWl0IHRoaXMuI2NvbnRhaW5lci5hcHBlbmQocm93KTtcclxuXHJcblx0XHRpZiAodmFsdWUpIGF3YWl0IHJvdy52YWx1ZSh2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJvdztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZXMpIHtcclxuXHRcdHRoaXMuI3ZhbHVlcy5jbGVhcigpO1xyXG5cdFx0dGhpcy4jY29udGFpbmVyLmVtcHR5KCk7XHJcblx0XHRpZiAodmFsdWVzKSBhd2FpdCBQcm9taXNlLmFsbCh2YWx1ZXMubWFwKHZhbHVlID0+IHRoaXMuY3JlYXRlUm93KHZhbHVlKSkpO1xyXG5cclxuXHRcdHJldHVybiBhd2FpdCBidWlsZERhdGEodGhpcy5yb3dzLCB0aGlzLiN2YWx1ZXMpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQocm93LCB2YWx1ZSkge1xyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuI3ZhbHVlcztcclxuXHJcblx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHRoaXMuI3ZhbHVlcy5kZWxldGUocm93KTtcclxuXHRcdGVsc2UgdGhpcy4jdmFsdWVzLnNldChyb3csIHZhbHVlKTtcclxuXHJcblx0XHRhd2FpdCBzdXBlci5jaGlsZFZhbHVlQ2hhbmdlZChyb3csIHZhbHVlKTtcclxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBidWlsZERhdGEodGhpcy5yb3dzLCB2YWx1ZXMpO1xyXG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoZGF0YSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoTGlzdCk7XHJcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XHJcbiIsImltcG9ydCB7RXhwcmVzc2lvblJlc29sdmVyfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHtDb21wb25lbnQsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTUVTU0FHRSxcclxuXHRFVkVOVF9NRVNTQUdFX1JFTU9WRURcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT04gPSBcImNvbmRpdGlvblwiO1xyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xyXG5cclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9NRVNTQUdFO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKXtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9NRVNTQUdFX1JFTU9WRUQpO1xyXG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGFjdGl2ZSA/IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCB1bmRlZmluZWQpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdHRoaXMuYWN0aXZlID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUodGhpcy5jb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcclxuXHR9XHJcbn1cclxuZGVmaW5lKE1lc3NhZ2UpO1xyXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9QQUdFLCAgXHJcblx0QVRUUklCVVRFX1NURVAsIFxyXG5cdEVWRU5UX1BBR0VfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfUEFHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vQ29udGFpbmVyXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9TVEVQXTtcclxuXHJcbi8qKlxyXG4gKiBwYWdlIGNsYXNzXHJcbiAqXHJcbiAqIEBjbGFzcyBQYWdlXHJcbiAqIEB0eXBlZGVmIHtQYWdlfVxyXG4gKiBAZXh0ZW5kcyB7Q29udGFpbmVyfVxyXG4gKi9cclxuY2xhc3MgUGFnZSBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1BBR0U7XHJcblx0fVxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9QQUdFX0lOSVRJQUxJWkVEKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCl7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfUEFHRV9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBzdGVwKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9TVEVQKTtcclxuXHR9XHJcblx0XHJcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cclxufVxyXG5kZWZpbmUoUGFnZSk7XHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0ZPUk0sIFxyXG5cdE5PREVOQU1FX1BST0dFU1NCQVIsXHJcblx0Tk9ERU5BTUVfU1RFUCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQsXHJcblx0Rk9STVNUQVRFX0lOSVQsXHJcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXHJcblx0QVRUUklCVVRFX1BST0dSRVNTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50ICxkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgXCIuL1N0ZXBcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1BST0dSRVNTXTtcclxuXHJcbmNvbnN0IGZpcnN0U3RlcFBhZ2VJbmRleCA9IChwYWdlcywgc3RlcCwgYWN0aXZlUGFnZSkgPT4ge1xyXG5cdGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcclxuXHRcdGlmIChwYWdlLnN0ZXAgPT0gc3RlcCAmJiBwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRlbHNlIGlmIChwYWdlID09IGFjdGl2ZVBhZ2UpIHJldHVybjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1BST0dFU1NCQVI7XHJcblx0fVxyXG5cclxuXHQjZm9ybTtcclxuXHQjc3RlcHM7XHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy4jZm9ybSkgcmV0dXJuO1xyXG5cdFx0XHRpZiAodGFyZ2V0ID09IHRoaXMpIHJldHVybjtcdFx0XHRcclxuXHRcdFx0Y29uc3Qgc3RlcCA9IHRhcmdldC5pcyhOT0RFTkFNRV9TVEVQKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVfU1RFUCk7XHJcblx0XHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtO1xyXG5cclxuXHRcdFx0aWYgKCFzdGVwKSByZXR1cm47XHJcblxyXG5cdFx0XHRjb25zdCB7c3RhdGUsIHBhZ2VzLCBhY3RpdmVQYWdlfSA9IGZvcm07XHJcblx0XHRcdGNvbnN0IHN0ZXBOYW1lID0gc3RlcC5uYW1lO1xyXG5cdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUIHx8IHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IGZpcnN0U3RlcFBhZ2VJbmRleChwYWdlcywgc3RlcE5hbWUsIGFjdGl2ZVBhZ2UpO1xyXG5cdFx0XHRcdGlmIChwYWdlKSBmb3JtLmFjdGl2ZVBhZ2UgPSBwYWdlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLnByb2dyZXNzID0gMDtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0dGhpcy4jc3RlcHMgPSB0aGlzLmZpbmQoTk9ERU5BTUVfU1RFUCk7XHJcblx0XHRcdHRoaXMuI2Zvcm0ub24oW0VWRU5UX1NJVEVfQ0hBTkdFRCxFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRURdLCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSBmb3JtLnN0YXRlO1xyXG5cdFx0XHRcdGlmKEZPUk1TVEFURV9WQUxJREFUSU5HID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnN0IHthY3RpdmVQYWdlSW5kZXgsIGFjdGl2ZVBhZ2UsIHBhZ2VzfSA9IGZvcm07XHJcblx0XHRcdFx0aWYgKCFhY3RpdmVQYWdlKSBcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0Y29uc3QgY291bnQgPSBwYWdlcy5sZW5ndGg7XHJcblx0XHRcdFx0Y29uc3QgcGFnZVN0ZXAgPSBhY3RpdmVQYWdlID8gYWN0aXZlUGFnZS5zdGVwIDogRk9STVNUQVRFX0lOSVQ7XHJcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKChhY3RpdmVQYWdlSW5kZXggKiAxMDApIC8gY291bnQpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBzdGVwIG9mIHRoaXMuc3RlcHMpIHtcclxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzdGVwLm5hbWU7XHJcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBwYWdlU3RlcDtcclxuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFX1NVTU1BUlk7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBGT1JNU1RBVEVfRklOSVNIRUQ7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZIHx8IHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCA/IDEwMCA6IHByb2dyZXNzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHN0ZXBzKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNzdGVwcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgcHJvZ3Jlc3MoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUyk7XHJcblx0fVxyXG5cclxuXHRzZXQgcHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcclxuXHRcdGlmICh0aGlzLnN0eWxlLnNldFByb3BlcnR5KSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wcm9ncmVzc1wiLCBwcm9ncmVzcyArIFwiJVwiKTtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MsIE1hdGgubWF4KDAsIE1hdGgubWluKHByb2dyZXNzLCAxMDApKSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoUHJvZ3Jlc3NCYXIpO1xyXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfU1RFUCwgXHJcblx0QVRUUklCVVRFX05BTUUsIFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9SRUFET05MWSBcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZXTtcclxuXHJcbmNsYXNzIFN0ZXAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1NURVA7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuICAgIGdldCBuYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfTkFNRSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcmVhZG9ubHkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0cmVhZG9ubHkgPyB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKFN0ZXApO1xyXG5leHBvcnQgZGVmYXVsdCBTdGVwO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9WQUxJREFUSU9OLCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0NPTkRJVElPTl07XHJcbi8qKlxyXG4gKiBAdHlwZWRlZiBWYWxpZGF0aW9uT3B0aW9uXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3B0aW9uLmhhc1ZhbHVlXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3B0aW9uLnJlcXVpcmVkXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3B0aW9uLmNvbmRpdGlvblxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5lZGl0YWJsZVxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gb3B0aW9uLmRhdGFcclxuICogQHByb3BlcnR5IHtCYXNlfSBvcHRpb24uYmFzZVxyXG4gKi9cclxuXHJcbmNsYXNzIFZhbGlkYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1ZBTElEQVRJT047XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfVkFMSURBVElPTl9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGFjdGl2ZSBzdGF0ZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQUNUSVZFKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldCBhY3RpdmUgc3RhdGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBjb25kaXRpb24gc3RyaW5nIGZvciBldmFsdWF0aW9uXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdmFsaWRhdGVcclxuXHQgKiBcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge1ZhbGlkYXRpb25PcHRpb259IG9wdGlvblxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHZhbGlkYXRlKHsgaGFzVmFsdWUsIGRhdGEgfSkge1xyXG5cdFx0Y29uc3QgdmFsaWQgPSBoYXNWYWx1ZSA/IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSAhdmFsaWQ7XHJcblx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0fVxyXG59XHJcbmRlZmluZShWYWxpZGF0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbjtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9CQUNLIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBCYWNrQnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9CQUNLO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b1ByZXZQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tCdXR0b247XHJcbmRlZmluZShCYWNrQnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9ORVhUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX05FWFQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEJ1dHRvbjtcclxuZGVmaW5lKE5leHRCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9DT05UUk9MX1NVQk1JVCwgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4uL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX1NVQk1JVDtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNjb25kaXRpb247XHJcblx0I3N1Ym1pdEFjdGlvbnM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAodGhpcy4jaW5pdGlhbGl6ZWQpIHtcdFx0XHRcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1x0XHRcdFxyXG5cdFx0XHR0aGlzLiNjb25kaXRpb24gPSB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aW9ucygpIHtcclxuXHRcdGlmICghdGhpcy4jc3VibWl0QWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW107XHJcblx0XHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuY2hpbGRyZW47XHJcblx0XHRcdGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcykge1xyXG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEJhc2VTdWJtaXRBY3Rpb24pIGFjdGlvbnMucHVzaChjaGlsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4jc3VibWl0QWN0aW9ucyA9IGFjdGlvbnM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI3N1Ym1pdEFjdGlvbnM7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG5cdH1cclxuXHRcclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCh7YWN0aW9uczp0aGlzLmFjdGlvbnN9KTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QnV0dG9uO1xyXG5kZWZpbmUoU3VibWl0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdW1tYXJ5QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3VtbWFyeUJ1dHRvbjtcclxuZGVmaW5lKFN1bW1hcnlCdXR0b24pO1xyXG4iLCJpbXBvcnQgQmFja0J1dHRvbiBmcm9tIFwiLi9CYWNrQnV0dG9uXCI7XG5pbXBvcnQgTmV4dEJ1dHRvbiBmcm9tIFwiLi9OZXh0QnV0dG9uXCI7XG5pbXBvcnQgU3VtbWFyeUJ1dHRvbiBmcm9tIFwiLi9TdW1tYXJ5QnV0dG9uXCI7XG5pbXBvcnQgU3VibWl0QnV0dG9uIGZyb20gXCIuL1N1Ym1pdEJ1dHRvblwiO1xuXG5leHBvcnQge1xuXHRCYWNrQnV0dG9uLFxuXHROZXh0QnV0dG9uLFxuXHRTdW1tYXJ5QnV0dG9uLFxuXHRTdWJtaXRCdXR0b24sXG59O1xuIiwiaW1wb3J0IHsgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jbGFzcyBDb25kaXRpb25IYW5kbGUge1xyXG5cclxuICAgICNiYXNlO1xyXG4gICAgI2NvbmRpdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlKXsgIFxyXG4gICAgICAgIHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXQoKXtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZGl0aW9uKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuI2NvbmRpdGlvbilcclxuICAgICAgICAgICAgdGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBiYXNlLmNvbmRpdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KWAsIGNvbmRpdGlvbiwgZGF0YSk7ICAgICAgICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvbiA/IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpIDogdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoe1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbmRpdGlvbiAhPSBjdXJyZW50KVxyXG4gICAgICAgICAgICBiYXNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvblxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KSByZXN1bHQ6YCwgY29uZGl0aW9uKTtcclxuICAgICAgICByZXR1cm4gY29uZGl0aW9uOyAgICAgICBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmRpdGlvbkhhbmRsZTsiLCJpbXBvcnQgeyBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNsYXNzIEVkaXRhYmxlSGFuZGxlIHtcclxuXHQjYmFzZTtcclxuXHQjY29uZGl0aW9uID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMuI2NvbmRpdGlvbiA9PSBudWxsKSB0aGlzLiNjb25kaXRpb24gPSAodGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pIHx8IFwiXCIpLnRyaW0oKSB8fCBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0bGV0IGVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IGJhc2UuZWRpdGFibGU7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdC8vY29uc29sZS5sb2coXCJ2YWxpZGF0ZSBlZGl0YWJsZTpcIiwge2NvbmRpdGlvbiwgZGF0YSwgYmFzZX0pO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZWRpdGFibGUgPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XHJcblx0XHR9IGNhdGNoIHtcclxuXHRcdFx0ZWRpdGFibGUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZWRpdGFibGUgIT0gY3VycmVudCkgdGhpcy4jYmFzZS5lZGl0YWJsZSA9IGVkaXRhYmxlO1xyXG5cclxuXHRcdHJldHVybiBlZGl0YWJsZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVkaXRhYmxlSGFuZGxlO1xyXG4iLCJpbXBvcnQge1xyXG4gICAgRVZFTlRfTUVTU0FHRV9SRU1PVkVELFxyXG4gICAgTk9ERU5BTUVfTUVTU0FHRVxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgYWRkQWxsVG9TZXQgfSBmcm9tIFwiLi4vdXRpbHMvRGF0YUhlbHBlci5qc1wiO1xyXG5pbXBvcnQge2ZpbmRNZXNzYWdlc30gZnJvbSBcIi4uL3V0aWxzL01lc3NhZ2VIZWxwZXIuanNcIjtcclxuXHJcblxyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VIYW5kbGUge1xyXG5cclxuICAgICNiYXNlID0gbnVsbDtcclxuICAgICNtZXNzYWdlcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlKXtcclxuICAgICAgICB0aGlzLiNiYXNlID0gYmFzZTtcclxuXHJcbiAgICAgICAgYmFzZS5vbihFVkVOVF9NRVNTQUdFX1JFTU9WRUQsIChldmVudCkgPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuI21lc3NhZ2VzLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0KCl7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuI2Jhc2U7XHJcblx0XHRjb25zdCB7IGZvcm0sIGlkLCBuYW1lIH0gPSBiYXNlO1xyXG5cdFx0Y29uc3QgbWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzO1xyXG5cdFx0aWYgKGlkICYmIGlkLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGFkZEFsbFRvU2V0KG1lc3NhZ2VzLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfTUVTU0FHRX1bZm9yPVwiJHtpZH1cIl1gKSk7XHJcblx0XHRcdGFkZEFsbFRvU2V0KG1lc3NhZ2VzLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfTUVTU0FHRX1bZm9yPVwiIyR7aWR9XCJdYCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuYW1lICYmIG5hbWUubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0YWRkQWxsVG9TZXQobWVzc2FnZXMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9NRVNTQUdFfVtmb3I9XCIke25hbWV9XCJdYCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZEFsbFRvU2V0KG1lc3NhZ2VzLCBmaW5kTWVzc2FnZXMoYmFzZSkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4jbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG4gICAgICAgIGZvcihsZXQgbWVzc2FnZSBvZiB0aGlzLiNtZXNzYWdlcylcclxuICAgICAgICAgICAgbWVzc2FnZS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlSGFuZGxlOyIsImltcG9ydCB7IEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCwgTk9ERU5BTUVfVkFMSURBVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgYWRkQWxsVG9TZXQgfSBmcm9tIFwiLi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyBmaW5kVmFsaWRhdGlvbnMgfSBmcm9tIFwiLi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlclwiO1xyXG5pbXBvcnQgXCIuLi9CYXNlXCI7XHJcbmltcG9ydCBcIi4uL1ZhbGlkYXRpb25cIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcmVxdWVzdENhbGxiYWNrYCBhbmQgaXMgZGlzcGxheWVkIGFzIGEgZ2xvYmFsIHN5bWJvbC5cclxuICpcclxuICogQGNhbGxiYWNrIEN1c3RvbVZhbGlkYXRpb25cclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9WYWxpZGF0aW9uXCIpLlZhbGlkYXRpb25PcHRpb259IG9wdGlvblxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYXN5bmNcclxuICogQGZ1bmN0aW9uXHJcbiAqIFxyXG4gKiBleGVjdXRlIGN1c3RvbSB2YWxpZGF0aW9uIGNhbGxiYWNrIGZ1bmN0aW9uc1xyXG4gKiBcclxuICogQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IHZhbGlkYXRpb25zXHJcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vVmFsaWRhdGlvblwiKS5WYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAqL1xyXG5jb25zdCB2YWxpZGF0ZUN1c3RvbVZhbGlkYXRpb25zID0gYXN5bmMgKHZhbGlkYXRpb25zLCBvcHRpb24pID0+IHtcclxuXHRpZiAoKHZhbGlkYXRpb25zLnNpemUgPT0gMCkpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCBwcm9taXNlcyA9IGF3YWl0IFByb21pc2UuYWxsKEFycmF5LmZyb20odmFsaWRhdGlvbnMpLm1hcCgodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbihvcHRpb24pKSk7XHJcblx0cmV0dXJuIHByb21pc2VzLmV2ZXJ5KCh2YWxpZCkgPT4gdmFsaWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBhc3luY1xyXG4gKiBAZnVuY3Rpb25cclxuICogXHJcbiAqIGV4ZWN1dGUgdmFsaWRhdGlvbnNcclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmFsaWRhdGlvbj59IHZhbGlkYXRpb25zXHJcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vVmFsaWRhdGlvblwiKS5WYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAqL1xyXG5jb25zdCB2YWxpZGF0ZVZhbGlkYXRpb25zID0gYXN5bmMgKHZhbGlkYXRpb25zLCBvcHRpb24pID0+IHtcclxuXHRpZiAoKHZhbGlkYXRpb25zLnNpemUgPT0gMCkpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCBwcm9taXNlcyA9IGF3YWl0IFByb21pc2UuYWxsKEFycmF5LmZyb20odmFsaWRhdGlvbnMpLm1hcCgodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi52YWxpZGF0ZShvcHRpb24pKSk7XHJcblx0cmV0dXJuIHByb21pc2VzLmV2ZXJ5KCh2YWxpZCkgPT4gdmFsaWQpO1xyXG59O1xyXG5cclxuY2xhc3MgVmFsaWRhdGlvbkhhbmRsZSB7XHJcblx0LyoqXHJcblx0ICogUmVmZXJlbmNlIGJhc2Ugb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7QmFzZX1cclxuXHQgKi9cclxuXHQjYmFzZSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7U2V0PFZhbGlkYXRpb24+fVxyXG5cdCAqL1xyXG5cdCN2YWxpZGF0aW9ucyA9IG5ldyBTZXQoKTtcclxuXHQjY3VzdG9tcyA9IG5ldyBTZXQoKTtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblxyXG5cdFx0YmFzZS5vbihFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbnMuZGVsZXRlKGV2ZW50LnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IHsgZm9ybSwgaWQsIG5hbWUgfSA9IGJhc2U7XHJcblx0XHRjb25zdCB2YWxpZGF0aW9ucyA9IHRoaXMudmFsaWRhdGlvbnM7XHJcblx0XHRpZiAoaWQgJiYgaWQubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9WQUxJREFUSU9OfVtmb3I9XCIke2lkfVwiXWApKTtcclxuXHRcdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9WQUxJREFUSU9OfVtmb3I9XCIjJHtpZH1cIl1gKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5hbWUgJiYgbmFtZS5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRhZGRBbGxUb1NldCh2YWxpZGF0aW9ucywgZm9ybS5maW5kKGAke05PREVOQU1FX1ZBTElEQVRJT059W2Zvcj1cIiR7bmFtZX1cIl1gKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZpbmRWYWxpZGF0aW9ucyhiYXNlKSk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWRhdGlvbnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdmFsaWRhdGlvbnM7XHJcblx0fVxyXG5cclxuXHRnZXQgY3VzdG9tVmFsaWRhdGlvbnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jY3VzdG9tcztcclxuXHR9XHJcblxyXG5cdGFkZEN1c3RvbVZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jY3VzdG9tcy5hZGQodmFsaWRhdGlvbik7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkLCBjb25kaXRpb24sIGVkaXRhYmxlIH0gPSBiYXNlO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7YmFzZS5ub2RlTmFtZX0oJHtiYXNlLm5hbWV9KSB2YWxpZGF0ZTpgLCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSwgY3VycmVudFZhbGlkIH0sIGRhdGEpO1xyXG5cdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChjb25kaXRpb24pIHtcclxuXHRcdFx0dmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcclxuXHJcblx0XHRcdGNvbnN0IG9wdGlvbiA9e1xyXG5cdFx0XHRcdGhhc1ZhbHVlOiBoYXNWYWx1ZSwgXHJcblx0XHRcdFx0cmVxdWlyZWQ6IHJlcXVpcmVkLCBcclxuXHRcdFx0XHRjb25kaXRpb246IGNvbmRpdGlvbiwgXHJcblx0XHRcdFx0ZWRpdGFibGU6IGVkaXRhYmxlLFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0YmFzZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcInZhbGlkYXRpb24gb3B0aW9uOlwiLCBvcHRpb24pXHJcblxyXG5cdFx0XHR2YWxpZCA9IGF3YWl0IHZhbGlkYXRlQ3VzdG9tVmFsaWRhdGlvbnModGhpcy4jY3VzdG9tcywgb3B0aW9uKSAmJiB2YWxpZDtcclxuXHRcdFx0dmFsaWQgPSBhd2FpdCB2YWxpZGF0ZVZhbGlkYXRpb25zKHRoaXMuI3ZhbGlkYXRpb25zLCBvcHRpb24pICYmIHZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UudmFsaWQgPSB2YWxpZDtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke2Jhc2Uubm9kZU5hbWV9KCR7YmFzZS5uYW1lfSkgdmFsaWRhdGUgcmVzdWx0OmAsIHt2YWxpZH0pO1xyXG5cdFx0cmV0dXJuIHZhbGlkO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbkhhbmRsZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTElTVF9BRERfUk9XLCBcclxuXHRFVkVOVF9MSVNUX1JPV19BRERcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVyA9IGAke05PREVOQU1FX0xJU1RfQUREX1JPV306aW5pdGlhbGl6ZWRgO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBBZGRSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKXtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX0FERF9ST1c7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1cpKVxyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTElTVF9ST1dfQUREKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShBZGRSb3cpO1xyXG5leHBvcnQgZGVmYXVsdCBBZGRSb3c7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVyxcclxuXHRFVkVOVF9MSVNUX1JPV19ERUxFVEVcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcblxyXG5jbGFzcyBEZWxldGVSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmVcdD0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTElTVF9ST1dfREVMRVRFKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShEZWxldGVSb3cpO1xyXG5leHBvcnQgZGVmYXVsdCBEZWxldGVSb3c7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfUk9XXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuLi9Db250YWluZXJcIjtcclxuaW1wb3J0IFwiLi9EZWxldGVSb3dcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTGlzdFJvdyBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfUk9XO1xyXG5cdH1cdFxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge31cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Z2V0IG5hbWUoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93Lk5PREVOQU1FLCBMaXN0Um93KTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdFJvdztcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfTElTVF9ST1dTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIExpc3RSb3dzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX1JPV1M7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoTGlzdFJvd3MpO1xyXG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcclxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX0ZBSUwsIFNUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHsgRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OLCBOT0RFTkFNRV9GT1JNLCBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuLy8gbG9naWNcclxuLyoqXHJcbiAqIEJhc2VTdWJtaXRBY3Rpb24gY2xhc3NcclxuICpcclxuICogQGNsYXNzIEJhc2VTdWJtaXRBY3Rpb25cclxuICogQHR5cGVkZWYge0Jhc2VTdWJtaXRBY3Rpb259XHJcbiAqIEBleHRlbmRzIHtDb21wb25lbnR9XHJcbiAqL1xyXG5jbGFzcyBCYXNlU3VibWl0QWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgU1RBVEVTID0ge1xyXG5cdFx0RkFJTDogU1RBVEVfRkFJTCxcclxuXHRcdFNVQ0NFU1M6IFNUQVRFX1NVQ0NFU1MsXHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I2Zvcm07XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0aWYgKHRoaXMuI2Zvcm0pIHRoaXMudHJpZ2dlcihFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZm9ybTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjY2VwdChkYXRhID0ge30pIHtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcclxuXHRcdGlmIChjb25kaXRpb24pIHJldHVybiBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBhYnN0cmFjdFxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuXHQgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcblx0ICogQHBhcmFtIHtpbXBvcnQoXCIuLi9Gb3JtXCIpLkZvcm1SZXN1bHRPcHRpb259IGZvcm1SZXN1bHRPcHRpb24gXHJcblx0ICogQHJldHVybnMge1N1Ym1pdEFjdGlvblJlc3VsdH1cclxuXHQgKi9cclxuXHRhc3luYyBleGVjdXRlKGRhdGEgPSB7fSwgY29udGV4dCA9IHt9LCBmb3JtUmVzdWx0T3B0aW9uKSB7XHJcblx0XHRyZXR1cm4gbmV3IFN1Ym1pdEFjdGlvblJlc3VsdChTVEFURV9GQUlMLCBcIm5vdCBpbXBsZW1lbnRlZFwiLCBudWxsLCBkYXRhLCBjb250ZXh0LCBmb3JtUmVzdWx0T3B0aW9uKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVN1Ym1pdEFjdGlvbjtcclxuIiwiaW1wb3J0IHtkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9TVUNDRVNTLCBTVEFURV9GQUlMIH0gZnJvbSBcIi4vU3VibWl0QWN0aW9uUmVzdWx0XCI7XHJcbmltcG9ydCB7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNvbnN0IE5PREVOQU1FID0gYCR7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0tZGVmYXVsdGA7XHJcblxyXG5jbGFzcyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbiBleHRlbmRzIEJhc2VTdWJtaXRBY3Rpb24ge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7IHJldHVybiBOT0RFTkFNRTt9XHJcblxyXG5cclxuXHRjb25zdHJ1Y3RvcihlbmRwb2ludCwgbWV0aG9kKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xyXG5cdFx0dGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcblx0fVxyXG5cclxuXHRhc3luYyBleGVjdXRlKGRhdGEgPSB7fSwgY29udGV4dCA9IHt9KSB7XHRcdFxyXG5cdFx0bGV0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludDtcclxuXHRcdGVuZHBvaW50ID0gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmVUZXh0KGVuZHBvaW50LCBkYXRhLCBlbmRwb2ludCk7XHJcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCBsb2NhdGlvbik7XHJcblxyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuXHRcdFx0bWV0aG9kOiB0aGlzLm1ldGhvZCxcclxuXHRcdFx0Y3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG5cdFx0XHRtb2RlOiBcImNvcnNcIixcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuXHRcdH0pO1x0XHRcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gbmV3IFN1Ym1pdEFjdGlvblJlc3VsdCh0aGlzLCByZXNwb25zZS5vayA/IFNUQVRFX1NVQ0NFU1MgOiBTVEFURV9GQUlMLCByZXNwb25zZSwgZGF0YSwgY29udGV4dCk7XHRcdFxyXG5cdH1cclxufTtcclxuXHJcbmRlZmluZShEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbik7XHJcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uO1xyXG4iLCJpbXBvcnQgeyBGT1JNU1RBVEVTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vQmFzZVN1Ym1pdEFjdGlvblwiO1xuXG5leHBvcnQgY29uc3QgU1RBVEVfU1VDQ0VTUyA9IFwic3VjY2Vzc1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0ZBSUwgPSBcImZhaWxcIjtcblxuLyoqXG4gKiBTdWJtaXRBY3Rpb25SZXN1bHRTdGF0ZVxuICogQHJlYWRvbmx5XG4gKiBAZW51bSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgU3VibWl0QWN0aW9uUmVzdWx0U3RhdGUgPSB7XG5cdHN1Y2Nlc3M6IFNUQVRFX1NVQ0NFU1MsXG5cdGZhaWw6IFNUQVRFX0ZBSUwsXG59O1xuXG4vKipcbiAqIERlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXG4gKlxuICogQGNsYXNzIFN1Ym1pdEFjdGlvblJlc3VsdFxuICogQHR5cGVkZWYge1N1Ym1pdEFjdGlvblJlc3VsdH1cbiAqL1xuY2xhc3MgU3VibWl0QWN0aW9uUmVzdWx0IHtcblx0c3RhdGljIFNUQVRFX1NVQ0NFU1MgPSBTVEFURV9TVUNDRVNTO1xuXHRzdGF0aWMgU1RBVEVfRkFJTCA9IFNUQVRFX0ZBSUw7XG5cblx0I3Jlc3VsdE9wdGlvbjtcblxuXHQvKipcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7QmFzZVN1Ym1pdEFjdGlvbn0gYWN0aW9uXG5cdCAqIEBwYXJhbSB7U3VibWl0QWN0aW9uUmVzdWx0U3RhdGV9IHN0YXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG5cdCAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vRm9ybVwiKS5Gb3JtUmVzdWx0T3B0aW9ufSByZXN1bHRPcHRpb25cblx0ICovXG5cdGNvbnN0cnVjdG9yKGFjdGlvbiwgc3RhdGUsIG1lc3NhZ2UsIGRhdGEsIGNvbnRleHQsIHJlc3VsdE9wdGlvbikge1xuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuXHRcdHRoaXMuc3RhdGUgPSBzdGF0ZTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblx0XHR0aGlzLiNyZXN1bHRPcHRpb24gPSByZXN1bHRPcHRpb247XG5cdH1cblxuXHRnZXQgcmVzdWx0T3B0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLiNyZXN1bHRPcHRpb247XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QWN0aW9uUmVzdWx0O1xuIiwiaW1wb3J0IHsgU1BFQ0lBTFZBUlMsIE5PREVOQU1FX0xJU1RfUk9XIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcblxyXG4vKipcclxuKiBQZXJmb3JtcyBhIGRlZXAgbWVyZ2Ugb2Ygb2JqZWN0cyBhbmQgcmV0dXJucyBuZXcgb2JqZWN0LiBEb2VzIG5vdCBtb2RpZnlcclxuKiBvYmplY3RzIChpbW11dGFibGUpIGFuZCBtZXJnZXMgYXJyYXlzIHZpYSBjb25jYXRlbmF0aW9uLlxyXG4qXHJcbiogQHBhcmFtIHsuLi5vYmplY3R9IG9iamVjdHMgLSBPYmplY3RzIHRvIG1lcmdlXHJcbiogQHJldHVybnMge29iamVjdH0gTmV3IG9iamVjdCB3aXRoIG1lcmdlZCBrZXkvdmFsdWVzXHJcbiovXHJcbmZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XHJcblx0Y29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cdFxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0ICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XHJcblx0XHRjb25zdCBvVmFsID0gb2JqW2tleV07XHJcblx0XHRcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcclxuXHRcdCAgcHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdCAgcHJldltrZXldID0gb1ZhbDtcclxuXHRcdH1cclxuXHQgIH0pO1xyXG5cdCAgXHJcblx0ICByZXR1cm4gcHJldjtcclxuXHR9LCB7fSk7XHJcbiAgfVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVEYXRhID0gYXN5bmMgKGRhdGEsIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0aWYgKG5hbWUpIHZhbHVlSGVscGVyKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2UgZGF0YSA9IG1lcmdlRGVlcChkYXRhLCB2YWx1ZSk7XHJcblx0fVxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpZWxkVmFsdWVNYXBUb09iamVjdCA9IGFzeW5jIChtYXAsIGZpZWxkT3JkZXIpID0+IHtcdFxyXG5cdC8vY29uc29sZS5sb2coXCJmaWVsZFZhbHVlTWFwVG9PYmplY3Q6IFwiLCBtYXAsIGZpZWxkT3JkZXIpO1xyXG5cdGxldCBkYXRhID0ge307XHJcblx0aWYgKGZpZWxkT3JkZXIpIHtcclxuXHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkT3JkZXIpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gbWFwLmdldChmaWVsZCk7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Zm9yIChsZXQgW3sgbmFtZSB9LCB2YWx1ZV0gb2YgbWFwKSB7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYnVpbGREYXRhQnlGaWVsZHMgPSBhc3luYyAoZmllbGRzKSA9PiB7XHJcblx0bGV0IGRhdGEgPSB7fTtcclxuXHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcclxuXHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXZhbHVhdGlvbkRhdGEgPSBhc3luYyAoYmFzZSkgPT4ge1xyXG5cdGF3YWl0IGJhc2UucmVhZHk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGRhdGFbU1BFQ0lBTFZBUlMuQ1VSUkVOVFZBTFVFXSA9IGF3YWl0IGJhc2UucmF3VmFsdWUoKTtcclxuXHJcblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcclxuXHRsZXQgdGVtcCA9IGRhdGE7XHJcblx0d2hpbGUgKHJvdykge1xyXG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCByb3cucmF3VmFsdWUoKTtcclxuXHRcdHRlbXAgPSB0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXTtcclxuXHRcdHJvdyA9IHJvdy5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xyXG5leHBvcnQgY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbiAoZGF0YSwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcmV0dXJuIGdldFZhbHVlKGRhdGEsIG5hbWVzKTtcclxuXHJcblx0Y29uc3QgZGVsID0gbm9WYWx1ZSh2YWx1ZSk7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgZGVsKSByZXR1cm4gZGF0YTtcclxuXHJcblx0cmV0dXJuIHNldFZhbHVlKGRlbCwgZGF0YSwgdmFsdWUsIG5hbWVzKTtcclxufTtcclxuXHJcbmNvbnN0IHNldFZhbHVlID0gKHJlbW92ZSwgZGF0YSwgdmFsdWUsIG5hbWVzKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgcmVtb3ZlKSByZXR1cm4gbnVsbDtcclxuXHRcclxuXHRjb25zdCBuYW1lID0gbmFtZXMuc2hpZnQoKTtcclxuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHtcclxuXHRcdGlmIChyZW1vdmUpIGRlbGV0ZSBkYXRhW25hbWVdO1xyXG5cdFx0ZWxzZSBkYXRhW25hbWVdID0gdmFsdWU7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRhdGFbbmFtZV0gPSBkYXRhW25hbWVdIHx8IHt9O1xyXG5cdFx0c2V0VmFsdWUocmVtb3ZlLCBkYXRhW25hbWVdLCB2YWx1ZSwgbmFtZXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBnZXRWYWx1ZSA9IChkYXRhLCBuYW1lcykgPT4ge1xyXG5cdGlmIChub1ZhbHVlKGRhdGEpKSByZXR1cm4gbnVsbDtcclxuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHJldHVybiBkYXRhO1xyXG5cclxuXHRjb25zdCBuYW1lID0gbmFtZXMuc2hpZnQoKTtcclxuXHRyZXR1cm4gZ2V0VmFsdWUoZGF0YVtuYW1lXSwgbmFtZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvbiBhZGRBbGxUb0FycmF5XHJcbiAqIFxyXG4gKiAgTWVyZ2UgYSBzb3VyY2Ugc2V0IGludG8gYSB0YXJnZXQgc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFUYXJnZXRcclxuICogQHBhcmFtIHtJdGVyYWJsZTwqPn0gYVNvdXJjZVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U2V0PCo+fSByZXR1cm5zIHRoZSB0YXJnZXQgc2V0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYWRkQWxsVG9BcnJheSA9IChhVGFyZ2V0LCBhU291cmNlKSA9PiB7XHJcblx0aWYgKGFTb3VyY2UgIT0gbnVsbCkge1xyXG5cdFx0Zm9yIChsZXQgc291cmNlIG9mIGFTb3VyY2UpIGFUYXJnZXQucHVzaChzb3VyY2UpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGFUYXJnZXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uIGFkZEFsbFRvU2V0XHJcbiAqIFxyXG4gKiAgTWVyZ2UgYSBzb3VyY2Ugc2V0IGludG8gYSB0YXJnZXQgc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U2V0PCo+fSBhVGFyZ2V0XHJcbiAqIEBwYXJhbSB7SXRlcmFibGU8Kj59IGFTb3VyY2VcclxuICpcclxuICogQHJldHVybnMge1NldDwqPn0gcmV0dXJucyB0aGUgdGFyZ2V0IHNldFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFkZEFsbFRvU2V0ID0gKGFUYXJnZXQsIGFTb3VyY2UpID0+IHtcclxuXHRpZiAoYVNvdXJjZSAhPSBudWxsKSB7XHJcblx0XHRmb3IgKGxldCBzb3VyY2Ugb2YgYVNvdXJjZSl7XHJcblx0XHRcdGFUYXJnZXQuYWRkKHNvdXJjZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYVRhcmdldDtcclxufTtcclxuIiwiaW1wb3J0IHtFVkVOVEhBTkRMRV9USU1FT1VUfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJndW1lbnRzKS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlRXZlbnRDb3B5ID0gKGV2ZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgIGRldGFpbDogZXZlbnQuZGV0YWlsLFxuICAgICAgICBjdXJyZW50VGFyZ2V0OiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0OiBldmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBvcmlnaW5hbFRhcmdldCA6IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBzcmNFbGVtZW50OiBldmVudC5zcmNFbGVtZW50LFxuICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB0b1RpbWVvdXRIYW5kbGUgPSAoaGFuZGxlLCBwcmV2ZW50RGVmYXVsdCwgc3RvcFByb3BhZ2F0aW9uLCB0aW1lb3V0KSA9PiB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZlbnQgPSB0eXBlb2YgcHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiA/IHByZXZlbnREZWZhdWx0IDogKCkgPT4gcHJldmVudERlZmF1bHQ7XG4gICAgY29uc3Qgc3RvcCA9IHR5cGVvZiBzdG9wUHJvcGFnYXRpb24gPT09IFwiZnVuY3Rpb25cIiA/IHN0b3BQcm9wYWdhdGlvbiA6ICgpID0+IHN0b3BQcm9wYWdhdGlvbjtcblxuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYocHJldmVudChldmVudCkpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZihzdG9wKGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50Q29weSA9IG1ha2VFdmVudENvcHkoZXZlbnQpO1xuXG4gICAgICAgIGlmKGlkKVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZCA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGUoZXZlbnRDb3B5KTtcbiAgICAgICAgfSwgdGltZW91dCB8fCBFVkVOVEhBTkRMRV9USU1FT1VUKTtcblxuICAgIH1cbn07IiwiaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL05vZGVIZWxwZXIuanNcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL0Jhc2UuanNcIjtcclxuaW1wb3J0IHsgQVRUUklCVVRFX0ZPUiB9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4uL01lc3NhZ2UuanNcIjtcclxuXHJcbi8qKiBcclxuICogQGZ1bmN0aW9uIGZpbmRNZXNzYWdlc1xyXG4gKiBcclxuICogRmluZCBhbGwgbWVzc2FnZXMgb2Ygcm9vdCBhcyBjaGlsZHJlbiBvbiBkb20gdHJlZVxyXG4gKiBcclxuICogQHBhcmFtIHtCYXNlfSByb290IFxyXG4gKiBcclxuICogQHJldHVybnMge0FycmF5PFZhbGlkYXRpb24+fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbmRNZXNzYWdlcyA9IChyb290KSA9PiB7XHJcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xyXG5cdFx0cm9vdCxcclxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xyXG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZSkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBNZXNzYWdlICYmIGVsZW1lbnQuYXR0cihBVFRSSUJVVEVfRk9SKSA9PSBudWxsKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbiBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbi5yb290IFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9uLmZpbHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3QgdHJlZUZpbHRlciA9ICh7IHJvb3QsIGZpbHRlciB9KSA9PiB7XG5cdGxldCBlbGVtZW50cyA9IFtdO1xuXHRyb290LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB7IGFjY2VwdCwgc3RvcCA9IGZhbHNlIH0gPSBmaWx0ZXIoZWxlbWVudCk7XG5cblx0XHRpZiAoYWNjZXB0KSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSB0cmVlRmlsdGVyKHsgcm9vdDogZWxlbWVudCwgZmlsdGVyIH0pO1xuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0KSBlbGVtZW50cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEZpZWxkcyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG5cblxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1JFQURPTkxZX1NUQVRFX0NIQU5HRUQsXHJcblx0QVRUUklCVVRFX0FDVElWRSwgXHJcblx0QVRUUklCVVRFX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfSU5WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfRURJVEFCTEUsIEFUVFJJQlVURV9SRUFET05MWSBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlVmFsaWRTdGF0ZSA9ICh0YXJnZXQsIHZhbGlkKSA9PiB7XHJcblx0aWYgKHR5cGVvZiB2YWxpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWxpZCA9PSBudWxsKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xyXG5cdH0gZWxzZSBpZiAodmFsaWQpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgXCJcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBcIlwiKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XHJcblx0fVxyXG5cclxuXHR0YXJnZXQudHJpZ2dlcihFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDb25kaXRpb25TdGF0ZSA9ICh0YXJnZXQsIHZhbGlkKSA9PiB7XHJcblx0aWYgKHR5cGVvZiB2YWxpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWxpZCA9PSBudWxsKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XHJcblx0fSBlbHNlIGlmICh2YWxpZCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFwiXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXCJcIik7XHJcblx0fVxyXG5cclxuXHR0YXJnZXQudHJpZ2dlcihFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQWN0aXZlU3RhdGUgPSAodGFyZ2V0LCBhY3RpdmUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmFjdGl2ZTtcclxuXHRhY3RpdmUgPyB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xyXG5cdGlmIChvbGRTdGF0ZSAhPSBhY3RpdmUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVJlYWRvbmx5U3RhdGUgPSAodGFyZ2V0LCByZWFkb25seSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Ly9jb25zb2xlLmxvZyhcInVwZGF0ZVJlYWRvbmx5U3RhdGVcIiwge3RhcmdldCwgcmVhZG9ubHl9KVxyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnJlYWRvbmx5O1xyXG5cdGlmIChyZWFkb25seSkgXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xyXG5cdGVsc2VcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0XHJcblx0aWYgKG9sZFN0YXRlICE9IHJlYWRvbmx5IHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX1JFQURPTkxZX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuZWRpdGFibGU7XHJcblx0aWYgKGVkaXRhYmxlKSBcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgXCJcIik7XHJcblx0ZWxzZVxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcclxuXHJcblx0aWYgKG9sZFN0YXRlICE9IGVkaXRhYmxlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59OyIsImltcG9ydCB7IHRyZWVGaWx0ZXIgfSBmcm9tIFwiLi9Ob2RlSGVscGVyLmpzXCI7XHJcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gXCIuLi9WYWxpZGF0aW9uXCI7XHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9CYXNlXCI7XHJcbmltcG9ydCB7IEFUVFJJQlVURV9GT1IgfSBmcm9tIFwiLi4vQ29uc3RhbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVGaWVsZHMgPSBhc3luYyAoZGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoZmllbGQgPT4gZmllbGQudmFsaWRhdGUoZGF0YSkpKSlcclxuICAgICAgICAucmVkdWNlKCh2YWxpZCwgZmllbGRWYWxpZCkgPT4gdmFsaWQgPyBmaWVsZFZhbGlkOiBmYWxzZSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKiBcclxuICogQGZ1bmN0aW9uIGZpbmRWYWxpZGF0aW9uc1xyXG4gKiBcclxuICogRmluZCBhbGwgdmFsaWRhdGlvbnMgb2Ygcm9vdCBhcyBjaGlsZHJlbiBvbiBkb20gdHJlZVxyXG4gKiBcclxuICogQHBhcmFtIHtCYXNlfSByb290IFxyXG4gKiBcclxuICogQHJldHVybnMge0FycmF5PFZhbGlkYXRpb24+fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbmRWYWxpZGF0aW9ucyA9IChyb290KSA9PiB7XHJcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xyXG5cdFx0cm9vdCxcclxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xyXG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZSkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBWYWxpZGF0aW9uICYmIGVsZW1lbnQuYXR0cihBVFRSSUJVVEVfRk9SKSA9PSBudWxsKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59OyIsImltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhSXNOb1ZhbHVlID0gKHZhbHVlKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUodmFsdWUpKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRpZiAodHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpc05hTih2YWx1ZSkpIHJldHVybiB0cnVlO1xyXG5cdGlmICh0eXBlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHZhbHVlLmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQgJiYgdmFsdWUubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiB2YWx1ZS5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XHJcblx0aWYgKHR5cGUgPT0gXCJvYmplY3RcIiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG5cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcbiIsImltcG9ydCB7IFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxyXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xyXG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xyXG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWVzID0gW107XHJcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBlbXRweU9yTm9WYWx1ZVN0cmluZyB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBFVkVOVF9GSUVMRF9JTlBVVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImZpbGVcIl0nO1xyXG5cclxuY29uc3QgcmVhZEZpbGUgPSAoZmlsZSwgcmVhZEZuTmFtZSkgPT4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcImxvYWRlbmRcIixcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxyXG5cdFx0XHRcdFx0dHlwZTogZW10cHlPck5vVmFsdWVTdHJpbmcoZmlsZS50eXBlKSA/XHRcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIDogZmlsZS50eXBlLFxyXG5cdFx0XHRcdFx0c2l6ZTogZmlsZS5zaXplLFxyXG5cdFx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdCxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHQpO1xyXG5cdFx0cmVhZGVyW3JlYWRGbk5hbWVdKGZpbGUpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLy9yZWFkQXNEYXRhVVJMXHJcblxyXG5jb25zdCBGT1JNQVQgPSB7XHJcblx0XCJmb3JtLWlucHV0XCI6IGFzeW5jIChmaWxlKSA9PiB7XHJcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xyXG5cdFx0cmV0dXJuIGZpbGU7XHJcblx0fSxcclxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xyXG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiZGF0YS11cmwtYmFzZTY0XCI7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0sXHJcblx0YmFzZTY0OiBhc3luYyAoZmlsZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xyXG5cdFx0cmVzdWx0LmRhdGEgPSByZXN1bHQuZGF0YS5zdWJzdHIocmVzdWx0LmRhdGEuaW5kZXhPZihcIixcIikgKyAxKTtcclxuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9LFxyXG59O1xyXG5cclxuY29uc3QgcmVhZEZpbGVzID0gYXN5bmMgKGZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSA9PiB7XHJcblx0bGV0IHJlc3VsdCA9IFtdO1xyXG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHJlc3VsdC5wdXNoKGF3YWl0IEZPUk1BVFtmb3JtYXRdKGZpbGUpKTtcclxuXHJcblx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdHJldHVybiBtdWx0aXBsZSA/IHJlc3VsdCA6IHJlc3VsdFswXTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xyXG5cdH1cclxuXHJcblx0I3ZhbHVlID0gbnVsbDtcclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQubXVsdGlwbGU7XHJcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcclxuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1uYW1lLXRhcmdldFwiKTtcclxuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0ID8gZmllbGQuZmluZCh0aGlzLmZpbGVuYW1lVGFyZ2V0KS5maXJzdCgpIDogbnVsbDtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcclxuXHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKSB0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcclxuXHJcblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZSByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKSByZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XHJcblx0XHRlbHNlIHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gdGhpcy4jdmFsdWU7XHJcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKSB7XHJcblx0XHRcdHRoaXMuI3ZhbHVlID0gdmFsdWU7XHJcblx0XHRcdGlmICghdmFsdWUpIHRoaXMuaW5wdXQudmFsdWUgPSBudWxsO1xyXG5cclxuXHRcdFx0Y29uc3QgZmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmlsZW5hbWUpIHtcclxuXHRcdFx0XHRmaWxlbmFtZS5lbXB0eSgpO1xyXG5cdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGVuYW1lLmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3ZhbHVlO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcclxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcclxuXHJcbmNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcclxuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIGlucHV0O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcclxuXHRcdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XHJcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcclxuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIHZhbHVlLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfRklFTERfSU5QVVQsXHJcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcdFx0XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly9maWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLmlucHV0Lm11bHRpcGxlID8gdGhpcy5pbnB1dC52YWwoKSA6IHRoaXMuaW5wdXQudmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiBpdGVtICYmIGl0ZW0udHJpbSgpLmxlbmd0aCA+IDApO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxyXG5cdFx0XHR9XHRcdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSAgdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXHJcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBjdXJyZW50VmFsdWUpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTlBVVCwgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dDpub3QoW3R5cGU9XCJmaWxlXCJdLFt0eXBlPVwicmFkaW9cIl0sW3R5cGU9XCJjaGVja2JveFwiXSxbdHlwZT1cImJ1dHRvblwiXSxbdHlwZT1cInN1Ym1pdFwiXSxbdHlwZT1cInJlc2V0XCJdKSxpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEnO1xyXG5cclxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcclxuXHJcbmNvbnN0IHRleHQgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKGlucHV0LnZhbHVlID0gdmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuY29uc3QgbnVtYmVyID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIE51bWJlci5pc05hTihpbnB1dC52YWx1ZUFzTnVtYmVyKSA/IG51bGwgOiBpbnB1dC52YWx1ZUFzTnVtYmVyO1xyXG5cdFx0fSxcclxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aW5wdXQudmFsdWVBc051bWJlciA9IHZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICghTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbi8qXHJcbmNvbnN0IGRhdGV0aW1lID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZUFzRGF0ZSA9IHZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07Ki9cclxuXHJcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNEYXRlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IFRJTUVGT1JNQVQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImRlZmF1bHRcIiwgIHtcclxuICBob3VyOiBcIm51bWVyaWNcIixcclxuICBtaW51dGU6IFwibnVtZXJpY1wiXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHRpbWUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWUgPyBuZXcgRGF0ZShgMTk3MC0wMS0wMVQke2lucHV0LnZhbHVlfWApIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlID0gVElNRUZPUk1BVC5mb3JtYXQodmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGV0aW1lOmRhdGUsIFwiZGF0ZXRpbWUtbG9jYWxcIjogZGF0ZSwgZGF0ZSwgdGltZSwgcmFuZ2U6IG51bWJlciB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1x0XHRcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR0aGlzLnR5cGUgPSAoVFlQRVNbdHlwZV0gfHwgVFlQRVNbREVGQVVMVFRZUEVdKShpbnB1dCk7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5ub3JtYWxpemUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcclxuXHRcdGlmICh2YWx1ZSAhPSBjdXJyZW50VmFsdWUpIHRoaXMudHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgXCIuLi9GaWVsZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtGaWVsZH0gZmllbGQgXHJcblx0ICogQHJldHVybnMgXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCl7IHJldHVybiBudWxsO31cclxuXHRcclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudHxIVE1MU2VsZWN0RWxlbWVudH0gaW5wdXQgXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XHJcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAYXN5bmNcclxuXHQgKi9cclxuXHRhc3luYyBpbml0KCkgeyB9XHJcblxyXG5cdFxyXG5cclxuXHQvKipcclxuXHQgKiBEZXNjcmlwdGlvbiBwbGFjZWhvbGRlclxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c2V0IHJlYWRvbmx5KGRpc2FibGVkKSB7IH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gXHJcblx0ICovXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuXHQgKi9cclxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICovXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkge1xyXG5cdH1cclxuXHJcblx0XHJcblx0LyoqXHJcblx0ICogRGVzY3JpcHRpb24gcGxhY2Vob2xkZXJcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHsqfVxyXG5cdCAqL1xyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIERlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRnZXQgdmFsaWQoKXtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuL3NyYy9CYXNlRmllbGRcIjtcbmltcG9ydCBGaWVsZCBmcm9tIFwiLi9zcmMvRmllbGRcIjtcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vc3JjL0NvbnRhaW5lclwiO1xuaW1wb3J0IExpc3QgZnJvbSBcIi4vc3JjL0xpc3RcIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuL3NyYy9QYWdlXCJcbmltcG9ydCBGb3JtIGZyb20gXCIuL3NyYy9Gb3JtXCI7XG5pbXBvcnQgQmFzZVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zcmMvc3VibWl0QWN0aW9ucy9CYXNlU3VibWl0QWN0aW9uXCI7XG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0IGZyb20gXCIuL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xuXG5leHBvcnQge0Zvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIExpc3QsIENvbnRhaW5lciwgQmFzZVN1Ym1pdEFjdGlvbiwgU3VibWl0QWN0aW9uUmVzdWx0fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=