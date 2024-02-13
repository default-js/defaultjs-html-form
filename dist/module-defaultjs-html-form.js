/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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





/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js":
/*!************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ValueHelper.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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











/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js ***!
  \*******************************************************************************/
/***/ (() => {

if (!Map.prototype.toObject)
	Map.prototype.toObject = function () {
		const object = {};
		for (const [key, value] of this.entries()) object[key] = value instanceof Map ? value.toObject() : value;

		return object;
	};


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js ***!
  \**********************************************************************************/
/***/ (() => {

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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./String.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js");
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_String_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/Map.js");
/* harmony import */ var _Map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Map_js__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/* harmony import */ var _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @default-js/defaultjs-common-utils */ "./node_modules/@default-js/defaultjs-common-utils/index.js");











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
		if (!this.editable) (0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, true, !this.ready.resolved);
		else (0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, readonly, !this.ready.resolved);
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


/***/ }),

/***/ "./src/BaseField.js":
/*!**************************!*\
  !*** ./src/BaseField.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _submitActions_BaseSubmitAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./submitActions/BaseSubmitAction */ "./src/submitActions/BaseSubmitAction.js");
/* harmony import */ var _submitActions_DefaultFormSubmitAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./submitActions/DefaultFormSubmitAction */ "./src/submitActions/DefaultFormSubmitAction.js");
/* harmony import */ var _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./submitActions/SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _utils_DataHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/DataHelper */ "./src/utils/DataHelper.js");
/* harmony import */ var _utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/ValidationHelper */ "./src/utils/ValidationHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @default-js/defaultjs-common-utils */ "./node_modules/@default-js/defaultjs-common-utils/index.js");
















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
			let promise = _default_js_defaultjs_common_utils__WEBPACK_IMPORTED_MODULE_13__.PromiseUtils.lazyPromise();
			const action = async () => {
				const data = this.#data;//await fieldValueMapToObject(this.#value);
						
				const valid = page ? await page.validate(data) : await (0,_utils_ValidationHelper__WEBPACK_IMPORTED_MODULE_12__.validateFields)(data, this.pages);			
				
				promise.resolve(valid);
				
				if (this.#validation == promise) {
					this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_INPUT;
					this.validation = null;					
				}
			};

			
			if(this.#validation == null){
				setTimeout(action, 10);				
				this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_VALIDATING;
			}
			else 	
				this.#validation.then(action);

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

"use strict";
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

"use strict";
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

"use strict";
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


/***/ }),

/***/ "./src/Step.js":
/*!*********************!*\
  !*** ./src/Step.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/Validation.js":
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ "./src/controls/NextButton.js":
/*!************************************!*\
  !*** ./src/controls/NextButton.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/controls/SubmitButton.js":
/*!**************************************!*\
  !*** ./src/controls/SubmitButton.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ "./src/controls/index.js":
/*!*******************************!*\
  !*** ./src/controls/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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








/***/ }),

/***/ "./src/handels/ConditionHandle.js":
/*!****************************************!*\
  !*** ./src/handels/ConditionHandle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

"use strict";
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

"use strict";
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


/***/ }),

/***/ "./src/list/DeleteRow.js":
/*!*******************************!*\
  !*** ./src/list/DeleteRow.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/list/Row.js":
/*!*************************!*\
  !*** ./src/list/Row.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/list/Rows.js":
/*!**************************!*\
  !*** ./src/list/Rows.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/submitActions/BaseSubmitAction.js":
/*!***********************************************!*\
  !*** ./src/submitActions/BaseSubmitAction.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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


/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/utils/NodeHelper.js":
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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


/***/ }),

/***/ "./src/wrapper/File.js":
/*!*****************************!*\
  !*** ./src/wrapper/File.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ "./src/wrapper/Select.js":
/*!*******************************!*\
  !*** ./src/wrapper/Select.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./src/wrapper/Text.js":
/*!*****************************!*\
  !*** ./src/wrapper/Text.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

"use strict";
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLWRlZmF1bHRqcy1odG1sLWZvcm0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVHOztBQUViOzs7Ozs7Ozs7Ozs7Ozs7O0FDRjFGO0FBQ0EsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQSxVQUFVO0FBQ1YsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZCQUE2QjtBQUNqQyxJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLFFBQVEsaUJBQWlCLEVBQUU7QUFDL0IsSUFBSSxRQUFRLGlCQUFpQixFQUFFO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdEdkI7QUFDQSxXQUFXLHFCQUFNLHlCQUF5QixxQkFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUNQTjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG1CQUFtQiwwREFBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNSO0FBQ1E7QUFDVjtBQUNEO0FBQ0M7QUFDc0M7QUFDSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9qYXZhc2NyaXB0L01hcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvamF2YXNjcmlwdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvaGFuZGVscy9FZGl0YWJsZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvTWVzc2FnZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9TdGF0ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvQ2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0ZpbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1JhZGlvLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1RleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1dyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR0xPQkFMLCBPYmplY3RVdGlscywgRXNjYXBlciwgVmFsdWVIZWxwZXIsIFByb21pc2VVdGlscywgUHJpdmF0ZVByb3BlcnR5LCBVVUlEIH0gZnJvbSBcIi4vc3JjXCI7XG5cbmV4cG9ydCB7IEdMT0JBTCwgT2JqZWN0VXRpbHMsIEVzY2FwZXIsIFZhbHVlSGVscGVyLCBQcm9taXNlVXRpbHMsIFByaXZhdGVQcm9wZXJ0eSwgVVVJRCB9O1xuIiwiLy8gcmVxdWlyZWQgdG8gYnVpbGQgdGhlIGludGVybmFsIGVzY2FwZSBmaWx0ZXIgZm9yIHJlZ2V4XG5jb25zdCBSRUdFWENIQVJNQVAgPSBbXCJcXFxcXCIsXCI/XCIsXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiKFwiLCBcIilcIiwgXCIuXCIsIFwiXlwiLCBcIiRcIl1cblx0Lm1hcChjaGFyID0+IHsgXG5cdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKFwiXFxcXFwiICtjaGFyLCBcImdcIiksIHYgOiBcIlxcXFxcIiArIGNoYXJ9O1xuXHR9KTtcblxuXG5jb25zdCBtYXBwaW5nID0gKGFUZXh0LCB0aGVGaWx0ZXJzKSA9PiB7XG5cdGxldCB0ZXh0ID0gYVRleHQ7XG5cdHRoZUZpbHRlcnMuZm9yRWFjaChpdGVtID0+IHtcblx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGl0ZW0uZiwgaXRlbS52KTtcblx0fSk7XG5cdHJldHVybiB0ZXh0O1xufTtcblxuY29uc3QgYnVpbGRVbmVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcInVuZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmVzY2FwZWQsIFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uY2hhcn1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5cbmNvbnN0IGJ1aWxkRXNjYXBlTGlzdCA9IChhQ2hhck1hcCwgaXNDYXNlU2Vuc2l0aXYpID0+IHtcblx0Y29uc3Qgb3B0aW9uID0gaXNDYXNlU2Vuc2l0aXYgPyBcIm1nXCIgOiBcIm1naVwiOyBcblx0cmV0dXJuIGFDaGFyTWFwLm1hcChpdGVtID0+IHtcblx0XHRpZighaXRlbS5hdCB8fCBpdGVtLmF0ID09IFwiZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmNoYXIsUkVHRVhDSEFSTUFQKSwgb3B0aW9uKSwgdjogaXRlbS5lc2NhcGVkfVxuXHR9KS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xufTtcbmNsYXNzIEVzY2FwZXIge1xuXHRjb25zdHJ1Y3Rvcihlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KXtcblx0XHR0aGlzLmVzY2FwZU1hcCA9IGJ1aWxkRXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHRcdHRoaXMudW5lc2NhcGVNYXAgPSBidWlsZFVuZXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHR9XG5cdFxuXHRlc2NhcGUoYVRleHQpe1xuXHRcdHJldHVybiBtYXBwaW5nKGFUZXh0LCB0aGlzLmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHVuZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy51bmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHN0YXRpYyBSRUdFWFBfRVNDQVBFUigpe1xuXHRcdHJldHVybiBuZXcgRXNjYXBlcihbXG5cdFx0XHR7Y2hhcjogXCJcXFxcXCIsIGVzY2FwZWQgOiBcIlxcXFxcXFxcXCJ9LFxuXHRcdFx0e2NoYXI6IFwiP1wiLCBlc2NhcGVkIDogXCJcXFxcP1wifSxcblx0XHRcdHtjaGFyOiBcIltcIiwgZXNjYXBlZCA6IFwiXFxcXFtcIn0sXG5cdFx0XHR7Y2hhcjogXCJdXCIsIGVzY2FwZWQgOiBcIlxcXFxdXCJ9LFxuXHRcdFx0e2NoYXI6IFwie1wiLCBlc2NhcGVkIDogXCJcXFxce1wifSxcblx0XHRcdHtjaGFyOiBcIn1cIiwgZXNjYXBlZCA6IFwiXFxcXH1cIn0sXG5cdFx0XHR7Y2hhcjogXCIoXCIsIGVzY2FwZWQgOiBcIlxcXFwoXCJ9LFxuXHRcdFx0e2NoYXI6IFwiKVwiLCBlc2NhcGVkIDogXCJcXFxcKVwifSxcblx0XHRcdHtjaGFyOiBcIi5cIiwgZXNjYXBlZCA6IFwiXFxcXC5cIn0sXG5cdFx0XHR7Y2hhcjogXCJeXCIsIGVzY2FwZWQgOiBcIlxcXFxeXCJ9LFxuXHRcdFx0e2NoYXI6IFwiJFwiLCBlc2NhcGVkIDogXCJcXFxcJFwifVxuXHRcdF0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzY2FwZXI7XG5cbiIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5cclxuY29uc3QgZXF1YWxBcnJheVNldCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGNvbnN0IGxlbmd0aCA9IGEubGVuZ3RoO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXHJcblx0XHRpZiAoIWVxdWFsUG9qbyhhW2ldLCBiW2ldKSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZmFsc2VcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE1hcCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIGEua2V5cygpKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYS5nZXQoa2V5KSwgYi5nZXQoa2V5KSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxDbGFzc2VzID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBjbGF6ekEgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSk7XHJcblx0Y29uc3QgY2xhenpCID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpO1xyXG5cdGlmIChjbGF6ekEgIT0gY2xhenpCKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGlmICghY2xhenpBKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGF6ekEpO1xyXG5cdGNvbnN0IHByb3BlcnRpZXNCID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpCKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE9iamVjdCA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3Qua2V5cyhhKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5rZXlzKGIpO1xyXG5cclxuXHRpZiAocHJvcGVydGllc0EubGVuZ3RoICE9PSBwcm9wZXJ0aWVzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBwcm9wZXJ0aWVzQSkge1xyXG5cdFx0Y29uc3QgdmFsdWVBID0gYVtrZXldO1xyXG5cdFx0Y29uc3QgdmFsdWVCID0gYltrZXldO1xyXG5cclxuXHRcdGlmICghZXF1YWxQb2pvKHZhbHVlQSwgdmFsdWVCKSkgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IChvYmplY3QpID0+IHtcclxuXHRyZXR1cm4gb2JqZWN0ID09IG51bGwgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9IChvYmplY3QpID0+IHtcclxuXHRpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcclxuXHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdGNhc2UgXCJiaWdpbnRcIjpcclxuXHRcdGNhc2UgXCJib29sZWFuXCI6XHJcblx0XHRjYXNlIFwic3RyaW5nXCI6XHJcblx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmKGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdCkpXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmICghb2JqZWN0LmNvbnN0cnVjdG9yIHx8IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBlcXVhbFBvam8gLT4gY29tcGFyZXMgb25seSBwb2pvcywgYXJyYXksIHNldCwgbWFwIGFuZCBwcmltaXRpdmVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXF1YWxQb2pvID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBudWxsQSA9IGlzTnVsbE9yVW5kZWZpbmVkKGEpO1xyXG5cdGNvbnN0IG51bGxCID0gaXNOdWxsT3JVbmRlZmluZWQoYik7XHJcblx0aWYgKG51bGxBIHx8IG51bGxCKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0aWYgKGlzUHJpbWl0aXZlKGEpIHx8IGlzUHJpbWl0aXZlKGIpKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0Y29uc3QgdHlwZUEgPSB0eXBlb2YgYTtcclxuXHRjb25zdCB0eXBlQiA9IHR5cGVvZiBiO1xyXG5cdGlmICh0eXBlQSAhPSB0eXBlQikgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh0eXBlQSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYSA9PT0gYjtcclxuXHQvL2lmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcblx0Ly9pZiAoYSBpbnN0YW5jZW9mIEFycmF5IHx8IGEgaW5zdGFuY2VvZiBTZXQpIHJldHVybiBlcXVhbEFycmF5U2V0KGEsIGIpO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBNYXApIHJldHVybiBlcXVhbE1hcChhLCBiKTtcclxuXHJcblx0cmV0dXJuIGVxdWFsT2JqZWN0KGEsIGIpICYmIGVxdWFsQ2xhc3NlcyhhLCBiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICpcclxuICogQHJldHVybiBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNQb2pvID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmICghaXNPYmplY3Qob2JqZWN0KSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFwcGVuZCBhIHByb3BlcnkgdmFsdWUgdG8gYW4gb2JqZWN0LiBJZiBwcm9wZXJ5IGV4aXN0cyBpdHMgd291bGQgYmUgY29udmVydGVkIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKlxyXG4gKiAgQHJldHVybiByZXR1cm5zIHRoZSBjaGFuZ2VkIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKTtcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIHNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuXHRpZiAoIXRhcmdldCkgdGFyZ2V0ID0ge307XHJcblxyXG5cdGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcblx0XHRpZiAoaXNQb2pvKHNvdXJjZSkpIHtcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNQb2pvKHRhcmdldFtrZXldKSkgbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuXHRcdFx0XHRlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbiAoeyBuYW1lcywgYWxsb3dlZCB9KSB7XHJcblx0cmV0dXJuIChuYW1lLCB2YWx1ZSwgY29udGV4dCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5hbWVzLmluY2x1ZGVzKG5hbWUpID09PSBhbGxvd2VkO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7IGRlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdIH0gPSB7fV0gPSBhcmd1bWVudHM7XHJcblx0Y29uc3QgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5IHx8IHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHBhcmVudHMuaW5jbHVkZXNbdmFsdWVdIHx8IHZhbHVlID09IGRhdGEpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlIHJlc3VsdFtuYW1lXSA9IGZpbHRlcih2YWx1ZSwgcHJvcEZpbHRlciwgeyBkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6IHBhcmVudHMuY29uY2F0KGRhdGEpIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZWYWx1ZSA9IChvLCBuYW1lLCB2YWx1ZSkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHR2YWx1ZSxcclxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlZkdldCA9IChvLCBuYW1lLCBnZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNOdWxsT3JVbmRlZmluZWQsXHJcblx0aXNPYmplY3QsXHJcblx0ZXF1YWxQb2pvLFxyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciA9ICh2YXJuYW1lKSA9PiB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGYsIHZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMilcclxuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lKTtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IsIHByaXZhdGVTdG9yZX07IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiaW1wb3J0IFwiLi9qYXZhc2NyaXB0XCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiLi9PYmplY3RVdGlsc1wiO1xyXG5pbXBvcnQgR0xPQkFMIGZyb20gXCIuL0dsb2JhbFwiO1xyXG5pbXBvcnQgRXNjYXBlciBmcm9tIFwiLi9Fc2NhcGVyXCI7XHJcbmltcG9ydCBWYWx1ZUhlbHBlciBmcm9tIFwiLi9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgUHJvbWlzZVV0aWxzIGZyb20gXCIuL1Byb21pc2VVdGlsc1wiO1xyXG5pbXBvcnQgUHJpdmF0ZVByb3BlcnR5IGZyb20gXCIuL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgVVVJRCBmcm9tIFwiLi9VVUlEXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEdMT0JBTCAsXHJcblx0T2JqZWN0VXRpbHMsXHJcblx0RXNjYXBlcixcclxuXHRWYWx1ZUhlbHBlcixcclxuXHRQcm9taXNlVXRpbHMsXHJcblx0UHJpdmF0ZVByb3BlcnR5LFxyXG5cdFVVSURcclxufTsiLCJpZiAoIU1hcC5wcm90b3R5cGUudG9PYmplY3QpXHJcblx0TWFwLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IG9iamVjdCA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIG9iamVjdFtrZXldID0gdmFsdWUgaW5zdGFuY2VvZiBNYXAgPyB2YWx1ZS50b09iamVjdCgpIDogdmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIG9iamVjdDtcclxuXHR9O1xyXG4iLCJpZiAoIVN0cmluZy5wcm90b3R5cGUuaGFzaGNvZGUpXHJcblx0U3RyaW5nLnByb3RvdHlwZS5oYXNoY29kZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdFxyXG5cdFx0bGV0IGhhc2ggPSAwO1xyXG5cdFx0Y29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IGMgPSB0aGlzLmNoYXJDb2RlQXQoaSk7XHJcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGM7XHJcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGFzaDtcclxuXHR9OyIsImltcG9ydCBcIi4vU3RyaW5nLmpzXCI7XHJcbmltcG9ydCBcIi4vTWFwLmpzXCI7IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9zcmMvQ29udGV4dFwiO1xuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIENvbnRleHQgfTtcbiIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVN0YXRlbWVudDtcclxuXHRcdFxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIFxyXG5gXHJcbnJldHVybiAoYXN5bmMgKGNvbnRleHQpID0+IHtcclxuXHR0cnl7IFxyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0IHJldHVybiAke2FTdGF0ZW1lbnR9XHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cdFx0dGhyb3cgZTtcclxuXHR9XHJcbn0pKGNvbnRleHQpYFxyXG5cdCk7XHJcblx0XHJcblx0bGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0Y29uc29sZS53YXJuKFwibG9uZyBydW5uaW5nIHN0YXRlbWVudDpcIiwgYVN0YXRlbWVudCwgbmV3IEVycm9yKCkpO1xyXG5cdH0sIEVYRUNVVElPTl9XQVJOX1RJTUVPVVQpXHJcblx0bGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHR0cnl7XHJcblx0XHRyZXN1bHQgPSBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZihtYXRjaFtNQVRDSF9FU0NBUEVEXSlcclxuXHRcdHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dOyBcclxuXHRcdFxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn1cclxuXHJcbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlciB7XHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IChwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIpID8gcGFyZW50IDogbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdFx0dGhpcy5wcm94eSA9IG5ldyBDb250ZXh0KHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2hhaW4oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dClcclxuXHRcdFx0XHRyZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IHt9O1x0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHRcdHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhRGVmYXVsdCkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKGFFeHByZXNzaW9uKTtcclxuXHRcdFx0aWYgKG1hdGNoKVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XFxcIlwiLCBhRXhwcmVzc2lvbiwgXCJcXFwiOlwiLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEXHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdHRlbXAgPSB0ZW1wLnNwbGl0KG1hdGNoWzBdKS5qb2luKCk7IC8vIHJlbW92ZSBjdXJyZW50IG1hdGNoIGZvciBuZXh0IGxvb3BcclxuXHRcdFx0dGV4dCA9IHRleHQuc3BsaXQobWF0Y2hbMF0pLmpvaW4odHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAocmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCkpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHtjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb249e2RlZXA6dHJ1ZX0sIG5hbWUsIHBhcmVudH0pe1xyXG5cdFx0Y29udGV4dCA9IE9iamVjdFV0aWxzLmZpbHRlcih7ZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9ufSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7Y29udGV4dCwgbmFtZSwgcGFyZW50fSk7XHJcblx0fVxyXG59OyIsImltcG9ydCBDb21wb25lbnQgLCB7Y29tcG9uZW50QmFzZU9mfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50XCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuXG5leHBvcnQge0NvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBkZWZpbmV9O1xuIiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSURcIjtcbmltcG9ydCB7IGluaXRUaW1lb3V0LCB0cmlnZ2VyVGltZW91dCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlclwiO1xuXG5jb25zdCBUSU1FT1VUUyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBpbml0ID0gKGNvbXBvbmVudCkgPT4ge1xuXHRsZXQgdGltZW91dCA9IFRJTUVPVVRTLmdldChjb21wb25lbnQpO1xuXHRpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFRJTUVPVVRTLmdldChjb21wb25lbnQsIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFRJTUVPVVRTLmRlbGV0ZShjb21wb25lbnQpO1xuXHRcdHRyeXtcblx0XHRcdGF3YWl0IGNvbXBvbmVudC5pbml0KCk7XG5cdFx0XHRjb21wb25lbnQucmVhZHkucmVzb2x2ZSgpO1xuXHRcdH1jYXRjaChlKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW4ndCBpbml0aWFsaXplIGNvbXBvbmVudCFcIiwgY29tcG9uZW50LCBlKTtcblx0XHRcdGNvbXBvbmVudC5yZWFkeShyZXNvbHZlKGUpKTtcblx0XHR9XG5cdFx0Y29tcG9uZW50LnRyaWdnZXIoY29tcG9uZW50RXZlbnRuYW1lKFwiaW5pdGlhbHplZFwiLCBjb21wb25lbnQpKTtcblx0fSwgaW5pdFRpbWVvdXQpKTtcdFxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuICAgIHdoaWxlKGNvdW50IDwgMTAwKXtcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XG5cdFx0aWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSlcblx0XHRcdHJldHVybiBpZDtcblxuXHRcdGNvdW50Kys7XG5cdH1cblx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJUbyBtYW55IHJldHJpZXMgdG8gY3JlYXRlIGFuIHVuaXF1ZSBpZCAtIGNyZWF0ZWQgaWQgaXMgbm90IHVuaXF1ZSFcIikpO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG5cblxuY29uc3QgYnVpbGRDbGFzcyA9IChodG1sQmFzZVR5cGUpID0+e1xuXHRyZXR1cm4gY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgaHRtbEJhc2VUeXBlIHtcblxuXHRcdCNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0Y29uc3RydWN0b3Ioe3NoYWRvd1Jvb3QgPSBmYWxzZSwgY29udGVudCA9IG51bGwsIGNyZWF0ZVVJRCA9IGZhbHNlLCB1aWRQcmVmaXggPSBcImlkLVwiLCB1aWRTdWZmaXggPSBcIlwifSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcblx0XHRcdGlmKGNyZWF0ZVVJRClcblx0XHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cdFxuXHRcdFx0aWYoc2hhZG93Um9vdClcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KTtcblx0XHRcdFxuXHRcdFx0aWYoY29udGVudClcblx0XHRcdFx0dGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJvb3QoKXtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cdFxuXHRcdGdldCByZWFkeSgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5O1xuXHRcdH1cblx0XG5cdFx0YXN5bmMgaW5pdCgpIHt9XG5cdFxuXHRcdGFzeW5jIGRlc3Ryb3koKSB7XG5cdFx0XHRpZih0aGlzLnJlYWR5LnJlc29sdmVkKVxuXHRcdFx0dGhpcy4jcmVhZHkgPSAgbGF6eVByb21pc2UoKTtcblx0XHR9XG5cdFxuXHRcdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0aWYgKHRoaXMub3duZXJEb2N1bWVudCA9PSBkb2N1bWVudCAmJiB0aGlzLmlzQ29ubmVjdGVkKSBpbml0KHRoaXMpO1xuXHRcdH1cblx0XG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblx0XG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpe1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xufSBcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZihjbGF6eiA9PSBudWxsKXtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59XG5cbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTA7XHJcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwO1xyXG4iLCJpbXBvcnQgeyBjb21wb25lbnRQcmVmaXggfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCB0b05vZGVOYW1lID0gKG5hbWUsIHByZWZpeCkgPT4ge1xuXHRpZih0eXBlb2YgcHJlZml4ID09PSBcInN0cmluZ1wiKVxuXHRcdHJldHVybiBwcmVmaXggKyBuYW1lO1xuXHRcdFxuXHRyZXR1cm4gY29tcG9uZW50UHJlZml4ICsgbmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbihjbGF6eiwgb3B0aW9ucykge1xuXHRjb25zdCBub2RlbmFtZSA9IGNsYXp6Lk5PREVOQU1FO1xuXHRpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChub2RlbmFtZSkpIHtcblx0XHRjdXN0b21FbGVtZW50cy5kZWZpbmUobm9kZW5hbWUsIGNsYXp6LCBvcHRpb25zKTtcblx0fVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmU7IFxuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSApID0+IHtcdFxuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYCR7dHlwZW9mIG5vZGV9IGlzIG5vdCBzdXBwb3J0ZWQgYXMgcGFyYW1ldGVyIFwibm9kZVwiIWApO1xuXHRcbiAgIHJldHVybiBgJHtub2RlbmFtZS50b0xvd2VyQ2FzZSgpfToke2V2ZW50VHlwZX1gOy8vdXNlIEAgYXMgc2VwYXJ0b3IgYW5kIG5vdCA6XG59O1xuXG5cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgPSAoYXR0cmlidXRlLCBub2RlICkgPT4ge1xuICAgIHJldHVybiBjb21wb25lbnRFdmVudG5hbWUoYCR7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9LSR7YXR0cmlidXRlfWAsIG5vZGUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge2NvbXBvbmVudEV2ZW50bmFtZSwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lfSIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSwgQVRUUklCVVRFX0VWQUxVQVRFLCBBVFRSSUJVVEVfQ09ORElUSU9OLCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIEFUVFJJQlVURV9WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiwgQVRUUklCVVRFX0VESVRBQkxFLCBFVkVOVF9JTlRFUk5BTF9TVEFSVF9WQUxJREFUSU9OLCBFVkVOVF9JTlRFUk5BTF9GSU5JU0hfVkFMSURBVElPTiB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcclxuaW1wb3J0IENvbmRpdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL0NvbmRpdGlvbkhhbmRsZVwiO1xyXG5pbXBvcnQgRWRpdGFibGVIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9FZGl0YWJsZUhhbmRsZVwiO1xyXG5pbXBvcnQgVmFsaWRhdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL1ZhbGlkYXRpb25IYW5kbGVcIjtcclxuaW1wb3J0IE1lc3NhZ2VIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9NZXNzYWdlSGFuZGxlXCI7XHJcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUsIHVwZGF0ZUNvbmRpdGlvblN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlLCB1cGRhdGVSZWFkb25seVN0YXRlLCB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgVVVJRCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzXCI7XHJcblxyXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTl07XHJcblxyXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0I2NvbmRpdGlvbkhhbmRsZTtcclxuXHQjZWRpdGFibGVIYW5kbGU7XHJcblx0I3ZhbGlkYXRpb25IYW5kbGU7XHJcblx0I21lc3NhZ2VIYW5kbGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuI21lc3NhZ2VIYW5kbGUgPSBuZXcgTWVzc2FnZUhhbmRsZSh0aGlzKTtcclxuXHRcdHRoaXMuI2NvbmRpdGlvbkhhbmRsZSA9IG5ldyBDb25kaXRpb25IYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiNlZGl0YWJsZUhhbmRsZSA9IG5ldyBFZGl0YWJsZUhhbmRsZSh0aGlzKTtcclxuXHRcdHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUgPSBuZXcgVmFsaWRhdGlvbkhhbmRsZSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGFkZFZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbkhhbmRsZS5hZGRDdXN0b21WYWxpZGF0aW9uKHZhbGlkYXRpb24pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbGlkYXRlOmAsIGRhdGEpXHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBcIlwiKTtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzKSk7XHJcblx0XHRhd2FpdCB0aGlzLiNjb25kaXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHRhd2FpdCB0aGlzLiNlZGl0YWJsZUhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBudWxsKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLiNtZXNzYWdlSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcy52YWxpZDtcclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0bGV0IGZvcm0gPSBfZm9ybSh0aGlzKTtcclxuXHRcdGlmICghZm9ybSkge1xyXG5cdFx0XHRmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdF9mb3JtKHRoaXMsIGZvcm0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvcm07XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcclxuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xyXG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xyXG5cdFx0XHR0aGlzLmFjdGl2ZVVwZGF0ZWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjdGl2ZVVwZGF0ZWQoKSB7fVxyXG5cclxuXHRnZXQgcmVhZG9ubHkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0aWYgKCF0aGlzLmVkaXRhYmxlKSB1cGRhdGVSZWFkb25seVN0YXRlKHRoaXMsIHRydWUsICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcclxuXHRcdGVsc2UgdXBkYXRlUmVhZG9ubHlTdGF0ZSh0aGlzLCByZWFkb25seSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xyXG5cdFx0dGhpcy5yZWFkb25seVVwZGF0ZWQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlYWRvbmx5VXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCBlZGl0YWJsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRURJVEFCTEUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGVkaXRhYmxlKGVkaXRhYmxlKSB7XHJcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsIGVkaXRhYmxlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblx0XHR0aGlzLmVkaXRhYmxlVXBkYXRlZCgpO1xyXG5cdFx0dGhpcy5yZWFkb25seSA9ICFlZGl0YWJsZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGVkaXRhYmxlVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCBjb25kaXRpb24oY29uZGl0aW9uKSB7XHJcblx0XHR1cGRhdGVDb25kaXRpb25TdGF0ZSh0aGlzLCBjb25kaXRpb24pO1xyXG5cdFx0dGhpcy5jb25kaXRpb25VcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCB2YWxpZCh2YWxpZCkge1xyXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0aGlzLCB2YWxpZCk7XHJcblx0XHR0aGlzLnZhbGlkVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZFVwZGF0ZWQoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgRVZFTlRfRklFTERfUkVNT1ZFRCwgRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQsIEFUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9OT1ZBTFVFIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcclxuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XHJcbmltcG9ydCB7IGRhdGFJc05vVmFsdWUgfSBmcm9tIFwiLi91dGlscy9WYWx1ZUhlbHBlclwiO1xyXG5cclxuY29uc3QgX3BhcmVudCA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicGFyZW50XCIpO1xyXG5leHBvcnQgY29uc3QgX3ZhbHVlID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJ2YWx1ZVwiKTtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRGaWVsZCA9IChmaWVsZCkgPT4ge1xyXG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG5cdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiBwYXJlbnQ7XHJcblxyXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XHJcblx0ZmllbGQuYXR0cihBVFRSSUJVVEVfTk9WQUxVRSwgIWhhc1ZhbHVlID8gXCJcIiA6IG51bGwpO1xyXG59O1xyXG5cclxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZS5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdGNvbnN0IHt2YWx1ZX0gPSBvcHRpb25zO1xyXG5cdFx0X3ZhbHVlKHRoaXMsIHZhbHVlIHx8IG51bGwpO1x0XHRcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfRklFTERfSU5JVElBTElaRUQpKTtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKSB7XHRcdFxyXG5cdFx0dGhpcy5wdWJsaXNoVmFsdWUobnVsbCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfRklFTERfUkVNT1ZFRCk7XHJcblx0fVxyXG5cclxuXHRnZXQgcGFyZW50RmllbGQoKSB7XHJcblx0XHRsZXQgcGFyZW50ID0gX3BhcmVudCh0aGlzKTtcclxuXHRcdGlmICghcGFyZW50KSB7XHJcblx0XHRcdHBhcmVudCA9IGZpbmRQYXJlbnRGaWVsZCh0aGlzKTtcclxuXHRcdFx0X3BhcmVudCh0aGlzLCBwYXJlbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHBhcmVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNvbmRpdGlvblVwZGF0ZWQoKSB7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXMucHVibGlzaFZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfTkFNRSk7XHJcblx0fVxyXG5cclxuXHRnZXQgcmVxdWlyZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFUVVJUkVEKTtcclxuXHR9XHJcblxyXG5cdGdldCBoYXNWYWx1ZSgpIHtcclxuXHRcdHJldHVybiAhdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX05PVkFMVUUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsdWUodmFsdWUpIHtcclxuXHRcdGNvbnN0IHtjb25kaXRpb24sIHZhbGlkLCByZWFkeX0gPSB0aGlzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbHVlOiBgLCBhcmd1bWVudHMsIHtjb25kaXRpb24sIHZhbGlkfSk7XHJcblxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuICAhY29uZGl0aW9uIHx8ICF2YWxpZCA/IG51bGwgOiBfdmFsdWUodGhpcyk7XHRcdFxyXG5cdFx0XHJcblx0XHRhd2FpdCByZWFkeTtcclxuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcclxuXHJcblx0XHRpZiAoYXdhaXQgdGhpcy5hY2NlcHRWYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0dmFsdWUgPSBhd2FpdCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB8fCB2YWx1ZTtcclxuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSAhPSB2YWx1ZSkge1x0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy51cGRhdGVkVmFsdWUodmFsdWUpO1x0XHRcdFx0XHJcblx0XHRcdFx0aWYodHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0O1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSl7XHJcblx0XHRjb25zdCBjdXJyZW50Q29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRjb25zdCBjdXJyZW50VmFsaWQgPSB0aGlzLnZhbGlkO1xyXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCBzdXBlci52YWxpZGF0ZShkYXRhKTtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGN1cnJlbnRDb25kaXRpb24gIT0gY29uZGl0aW9uLCAgY3VycmVudFZhbGlkICE9IHZhbGlkKTtcclxuXHJcblx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGNvbmRpdGlvbkNoYW5nZSwgdmFsaWRhdGlvbkNoYW5nZWQpe1xyXG5cdFx0Y29uc3QgaGFzQ2hhbmdlID0gY29uZGl0aW9uQ2hhbmdlIHx8IHZhbGlkYXRpb25DaGFuZ2VkO1xyXG5cdFx0aWYoaGFzQ2hhbmdlKVxyXG5cdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7IFxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcHVibGlzaFZhbHVlKHZhbHVlKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKGBjYWxsICR7dGhpcy5ub2RlTmFtZX0oJHt0aGlzLm5hbWV9KS5wdWJsaXNoVmFsdWU6YCwge2FyZ3VtZW50czogYXJndW1lbnRzLmxlbmd0aCwgdmFsdWV9KTtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHZhbHVlID0gX3ZhbHVlKHRoaXMpO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coXCJ3b3JrIHdpdGggVmFsdWU6XCIsIHZhbHVlKVx0XHRcclxuXHRcdGNvbnN0IG5vVmFsdWUgPSBkYXRhSXNOb1ZhbHVlKHZhbHVlKTtcdFx0XHRcdFxyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRjb25zdCByZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQ7XHJcblx0XHR2YWx1ZSA9IHJlcXVpcmVkICYmIG5vVmFsdWUgPyBudWxsIDogdmFsdWU7XHRcdFxyXG5cdFx0XHJcblx0XHRpZighY29uZGl0aW9uKVxyXG5cdFx0XHR2YWx1ZSA9IG51bGw7XHJcblx0XHRlbHNlXHJcblx0XHRcdF92YWx1ZSh0aGlzLCB2YWx1ZSk7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnB1Ymxpc2hWYWx1ZTpgLCB7cmVxdWlyZWQsIGNvbmRpdGlvbiwgbm9WYWx1ZSwgdmFsdWV9KTtcclxuXHJcblx0XHR1cGRhdGVIYXNWYWx1ZSghbm9WYWx1ZSwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMucGFyZW50RmllbGQpIGF3YWl0IHRoaXMucGFyZW50RmllbGQuY2hpbGRWYWx1ZUNoYW5nZWQodGhpcywgdmFsdWUpO1xyXG5cdFx0ZWxzZSBpZih0aGlzLmZvcm0pIGF3YWl0IHRoaXMuZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCh0aGlzLCB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcclxuIiwiZXhwb3J0IGNvbnN0IEhUTUxfVEFHX1BSRUZJWCA9IFwiZC1cIjtcclxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCA9IDUwICogRVZFTlRIQU5ETEVfVElNRU9VVDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GT1JNID0gYCR7SFRNTF9UQUdfUFJFRklYfWZvcm1gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfU1VCTUlUX0FDVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH1zdWJtaXQtYWN0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9cGFnZWA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GSUVMRCA9IGAke0hUTUxfVEFHX1BSRUZJWH1maWVsZGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UQUlORVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udGFpbmVyYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUID0gYCR7SFRNTF9UQUdfUFJFRklYfWxpc3RgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTElTVF9ST1dTPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93c2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfXJvd2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX0FERF9ST1c9IGAke0hUTUxfVEFHX1BSRUZJWH1hZGQtcm93YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfWRlbGV0ZS1yb3dgO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BST0dFU1NCQVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9cHJvZ3Jlc3MtYmFyYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1NURVAgPSBgJHtIVE1MX1RBR19QUkVGSVh9c3RlcGA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfVkFMSURBVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH12YWxpZGF0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX01FU1NBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9bWVzc2FnZWA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfQkFDSyA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWJhY2tgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9ORVhUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtbmV4dGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX0NBTkNFTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWNhbmNlbGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdW1tYXJ5YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfU1VCTUlUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtc3VibWl0YDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0lOSVQgPSBcImluaXRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9WQUxJREFUSU5HID0gXCJ2YWxpZGF0aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5QVVQgPSBcImlucHV0XCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfU1VNTUFSWSA9IFwic3VtbWFyeVwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0ZJTklTSEVEID0gXCJmaW5pc2hlZFwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFUyA9IHtcclxuXHRpbml0OiBGT1JNU1RBVEVfSU5JVCxcclxuXHR2YWxpZGF0aW5nOiBGT1JNU1RBVEVfVkFMSURBVElORyxcclxuXHRpbnB1dDogRk9STVNUQVRFX0lOUFVULFxyXG5cdHN1bW1hcnk6IEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdGZpbmlzaGVkOiBGT1JNU1RBVEVfRklOSVNIRUQsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgUkVRVUlSRURTVEFURVMgPSB7XHJcblx0YWx3YXlzOiBcImFsd2F5c1wiLFxyXG5cdG9uQWN0aXZlOiBcIm9uLWFjdGl2ZVwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX1BSRUZJWCA9IEhUTUxfVEFHX1BSRUZJWCArIFwiZm9ybS1cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFID0gYCR7RVZFTlRfUFJFRklYfWluaXRpYWxpemVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9aW5pdGlhbGl6ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTiA9IGAke0VWRU5UX0lOSVRJQUxJWkV9c3VibWl0LWFjdGlvbmA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TVUJNSVQgPSBgJHtFVkVOVF9QUkVGSVh9c3VibWl0YDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1NVQk1JVF9SRVNVTFRTID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdC1yZXN1bHRzYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0VYRUNVVEVfVkFMSURBVEUgPSBgJHtFVkVOVF9QUkVGSVh9ZXhlY3V0ZS12YWxpZGF0ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1jb25kaXRpb24tc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9BTExfUFVCTElTSF9WQUxVRSA9IGAke0VWRU5UX1BSRUZJWH1hbGwtcHVibGlzaC12YWx1ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxVRV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXZhbHVlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU0lURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXNpdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTlBVVCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbnB1dGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9MSVNUX1JPV19BREQgPSBgJHtFVkVOVF9QUkVGSVh9bGlzdC1yb3ctYWRkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0RFTEVURSA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1kZWxldGVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1wcm9ncmVzcy1iYXItY2hhbmdlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfRklFTERfUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfXBhZ2UtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfUEFHRV9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfXBhZ2UtcmVtb3ZlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZGF0aW9uLWluaXRpYWxpemVkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZGF0aW9uLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9bWVzc2FnZS1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9NRVNTQUdFX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9bWVzc2FnZS1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1hY3RpdmUtc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXZhbGlkLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1lZGl0YWJsZS1zdGF0ZS1jaGFuZ2VkYDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgU1BFQ0lBTFZBUlMgPSB7XHJcblx0Q1VSUkVOVFZBTFVFOiBcIiR2YWx1ZVwiLFxyXG5cdENVUlJFTlRMSVNUUk9XOiBcIiRpdGVtXCIsXHJcbn07XHJcblxyXG4vL0FUVFJJQlVURVNcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTkFNRSA9IFwibmFtZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VORFBPSU5UID0gXCJlbmRwb2ludFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01FVEhPRCA9IFwibWV0aG9kXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RBVEUgPSBcInN0YXRlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1NURVAgPSBcInN0ZXBcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFID0gXCJ1c2Utc3VtbWFyeS1wYWdlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQgPSBcImlucHV0LW1vZGUtYWZ0ZXItc3VibWl0XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRUQgPSBcInJlcXVpcmVkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVRVUlSRURfT05fQUNUSVZFX09OTFkgPSBcInJlcXVpcmVkLW9uLWFjdGl2ZS1vbmx5XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0RJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VESVRBQkxFID0gXCJlZGl0YWJsZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiA9IFwiZWRpdGFibGUtY29uZGl0aW9uXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUkVBRE9OTFkgPSBcInJlYWRvbmx5XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTk9WQUxVRSA9IFwibm8tdmFsdWVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9WQUxJRCA9IFwidmFsaWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JTlZBTElEID0gXCJpbnZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfRVZBTFVBVEUgPSBcImV2YWx1YXRlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElEID0gXCJjb25kaXRpb24tdmFsaWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCA9IFwiY29uZGl0aW9uLWludmFsaWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NSU4gPSBcIm1pblwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX01BWCA9IFwibWF4XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfUFJPR1JFU1MgPSBcInByb2dyZXNzXCI7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0NPTlRBSU5FUiwgXHJcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsIFxyXG5cdEVWRU5UX0ZJRUxEX1JFTU9WRUQgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGVtdHB5T3JOb1ZhbHVlU3RyaW5nLCBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XHJcbmltcG9ydCBCYXNlRmllbGQsIHsgX3ZhbHVlIH0gZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IHZhbHVlSGVscGVyLCBmaWVsZFZhbHVlTWFwVG9PYmplY3QgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UQUlORVI7XHJcblx0fVxyXG5cclxuXHQjZmllbGRzID0gbnVsbDtcclxuXHQjdmFsdWUgPSBuZXcgTWFwKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0aWYgKGZpZWxkICE9IHRoaXMpIHtcclxuXHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQgJiYgKCF0aGlzLiNmaWVsZHMgfHwgIXRoaXMuI2ZpZWxkcy5oYXMoZmllbGQpKSlcclxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcyA9IG51bGw7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xyXG5cdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCAmJiB0aGlzLiNmaWVsZHMgJiYgdGhpcy4jZmllbGRzLmhhcyhmaWVsZCkpXHJcblx0XHRcdFx0XHR0aGlzLiNmaWVsZHMuZGVsZXRlKGZpZWxkKTtcclxuXHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoeyBkYXRhIH0pID0+IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMuZmllbGRzKSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmllbGRzKCkge1xyXG5cdFx0aWYoIXRoaXMuI2ZpZWxkcylcclxuXHRcdFx0dGhpcy4jZmllbGRzID0gbmV3IFNldChmaW5kRmllbGRzKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNmaWVsZHMpO1xyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0Y29uc3QgeyByZWFkb25seSwgZmllbGRzIH0gPSB0aGlzO1xyXG5cdFx0aWYgKGZpZWxkcylcclxuXHRcdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XHJcblx0XHRcdFx0ZmllbGQucmVhZG9ubHkgPSByZWFkb25seTtcclxuXHRcdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XHJcblx0XHRtYXAuY2xlYXIoKTtcclxuXHRcdGNvbnN0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xyXG5cdFx0aWYgKGZpZWxkcykge1xyXG5cdFx0XHRhd2FpdCBQcm9taXNlLmFsbChmaWVsZHMubWFwKGFzeW5jIChmaWVsZCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBmaWVsZC5uYW1lO1xyXG5cdFx0XHRcdGNvbnN0IGZpZWxkVmFsdWUgPSBuYW1lID8gdmFsdWVIZWxwZXIodmFsdWUsIGZpZWxkLm5hbWUpIDogdmFsdWU7XHJcblx0XHRcdFx0aWYoIW5vVmFsdWUoZmllbGRWYWx1ZSkpXHJcblx0XHRcdFx0XHRtYXAuc2V0KGZpZWxkLCBmaWVsZFZhbHVlKTtcclxuXHRcdFx0XHRhd2FpdCBmaWVsZC52YWx1ZShmaWVsZFZhbHVlKTtcclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KHRoaXMuI3ZhbHVlLCBmaWVsZHMpO1xyXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KTpgLCB7ZmllbGQsIHZhbHVlfSk7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1x0XHRcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1x0XHRcclxuXHRcdFxyXG5cdFx0aWYgKGZpZWxkKSB7XHJcblx0XHRcdGNvbnN0IGhhc0ZpZWxkID0gbWFwLmhhcyhmaWVsZCk7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IG1hcC5nZXQoZmllbGQpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKHtuYW1lOiBmaWVsZC5uYW1lLCBjdXJyZW50VmFsdWUsIHZhbHVlLCBoYXNGaWVsZH0pXHJcblxyXG5cdFx0XHRpZihoYXNGaWVsZCAmJiBjdXJyZW50VmFsdWUgPT0gdmFsdWUpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGBkZWxldGUgJHtmaWVsZC5uYW1lfWApO1xyXG5cdFx0XHRcdG1hcC5kZWxldGUoZmllbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYHNldCAke2ZpZWxkLm5hbWV9ID0gJHt2YWx1ZX1gKTtcclxuXHRcdFx0XHRtYXAuc2V0KGZpZWxkLCB2YWx1ZSk7XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0fVx0XHJcblxyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QobWFwLCB0aGlzLmZpZWxkcyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiZGF0YTogXCIsZGF0YSk7XHJcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGRhdGEpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKENvbnRhaW5lcik7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Rk9STVNUQVRFX0lOSVQsXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXHJcblx0Tk9ERU5BTUVfQ09OVFJPTCxcclxuXHROT0RFTkFNRV9DT05UUk9MX0JBQ0ssXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9ORVhULFxyXG5cdE5PREVOQU1FX0NPTlRST0xfQ0FOQ0VMLFxyXG5cdE5PREVOQU1FX0NPTlRST0xfU1VCTUlULCBcclxuXHROT0RFTkFNRV9GT1JNLFxyXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IFwiLi9jb250cm9sc1wiO1xyXG5cclxuY29uc3QgQlVUVE9ORFVNTVkgPSB7XHJcblx0YWN0aXZlOiB0cnVlLFxyXG5cdGRpc2FibGVkOiB0cnVlLFxyXG59O1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MO1xyXG5cdH1cclxuXHJcblx0I2Zvcm07XHJcblx0I2JhY2s7XHJcblx0I25leHQ7XHJcblx0I3N1bW1hcnk7XHJcblx0I3N1Ym1pdDtcclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0dGhpcy4jZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cdFx0XHR0aGlzLiNiYWNrID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfQkFDSykuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHRcdFx0dGhpcy4jbmV4dCA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX05FWFQpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblx0XHRcdHRoaXMuI3N1bW1hcnkgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xyXG5cdFx0XHR0aGlzLiNzdWJtaXQgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblxyXG5cdFx0XHR0aGlzLiNmb3JtLm9uKFtFVkVOVF9JTklUSUFMSVpFRCwgRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBFVkVOVF9TSVRFX0NIQU5HRURdLCAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0YXN5bmMgdXBkYXRlKCkge1xyXG5cdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm07XHJcblx0XHRjb25zdCBzdGF0ZSA9IGZvcm0uc3RhdGU7XHJcblx0XHRjb25zdCBiYWNrID0gdGhpcy4jYmFjaztcclxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLiNuZXh0O1xyXG5cdFx0Y29uc3Qgc3VtbWFyeSA9IHRoaXMuI3N1bW1hcnk7XHJcblx0XHRjb25zdCBzdWJtaXQgPSB0aGlzLiNzdWJtaXRcclxuXHJcblx0XHQvLyBiYXNpYyBjb250cm9sIHNldHVwXHJcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdG5leHQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdHN1bW1hcnkuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRzdW1tYXJ5LmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdHN1Ym1pdC5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0aWYoc3RhdGUgPT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRjb25zdCB7IGFjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgbmV4dFBhZ2UsIHBhZ2VzLCB1c2VTdW1tYXJ5UGFnZSB9ID0gZm9ybTtcdFxyXG5cdFx0Y29uc3QgaGFzTmV4dFBhZ2UgPSAoYXdhaXQgbmV4dFBhZ2UpICE9IG51bGw7XHJcblxyXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCkge1xyXG5cdFx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XHJcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xyXG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2VJbmRleCA8PSAwO1xyXG5cclxuXHRcdFx0aWYgKGhhc05leHRQYWdlIHx8ICghYWN0aXZlUGFnZS52YWxpZCAmJiBhY3RpdmVQYWdlSW5kZXggKyAxIDwgcGFnZXMubGVuZ3RoKSkge1xyXG5cdFx0XHRcdG5leHQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gIWFjdGl2ZVBhZ2UudmFsaWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAodXNlU3VtbWFyeVBhZ2UgJiYgc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0c3VtbWFyeS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdHN1bW1hcnkuZGlzYWJsZWQgPSAhYWN0aXZlUGFnZS52YWxpZDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5kZWZpbmUoQ29udHJvbCk7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2w7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0ZJRUxELCBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCBcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCwge192YWx1ZX0gZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCB7IGZpbmRXcmFwcGVyIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBlbXRweU9yTm9WYWx1ZVN0cmluZywgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtcImZpbGUtZm9ybWF0XCJdO1xyXG5cclxuY2xhc3MgRmllbGQgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9GSUVMRDtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCN3cmFwcGVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMub24oRVZFTlRfRklFTERfSU5QVVQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoZXZlbnQuZGV0YWlsIHx8IG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuI3dyYXBwZXIgPSBmaW5kV3JhcHBlcih0aGlzKTtcclxuXHRcdFx0aWYgKHRoaXMuI3dyYXBwZXIpe1xyXG5cdFx0XHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoKSA9PiB0aGlzLiN3cmFwcGVyLnZhbGlkKTtcclxuXHRcdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZSh0aGlzLiN3cmFwcGVyLnZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0aWYgKHRoaXMuI3dyYXBwZXIpIHRoaXMuI3dyYXBwZXIucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0aGlzLiN3cmFwcGVyID8gdGhpcy4jd3JhcHBlci5hY2NlcHRWYWx1ZSh2YWx1ZSkgOiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy4jd3JhcHBlcikgcmV0dXJuIHRoaXMuI3dyYXBwZXIubm9ybWFsaXplVmFsdWUodmFsdWUpO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gdGhpcy4jd3JhcHBlcjtcclxuXHRcdGlmICh3cmFwcGVyKXtcclxuXHRcdFx0Y29uc3QgY3VycmVudCA9IHdyYXBwZXIudmFsdWUgfHwgbnVsbDtcclxuXHRcdFx0aWYoY3VycmVudCAhPSB2YWx1ZSlcclxuXHRcdFx0XHRhd2FpdCB3cmFwcGVyLnVwZGF0ZWRWYWx1ZSh2YWx1ZSk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBzdXBlci51cGRhdGVkVmFsdWUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjb25kaXRpb25DaGFuZ2UsIHZhbGlkYXRpb25DaGFuZ2VkKXtcdFx0XHJcblx0XHRpZihjb25kaXRpb25DaGFuZ2UgJiYgdGhpcy5jb25kaXRpb24pe1x0XHRcdFxyXG5cdFx0XHRjb25zdCB3cmFwcGVyID0gdGhpcy4jd3JhcHBlcjtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB3cmFwcGVyLnZhbHVlIHx8IG51bGw7XHJcblx0XHRcdC8vY29uc29sZS5sb2coYHZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoJHt0aGlzLm5hbWV9ICgke2NvbmRpdGlvbkNoYW5nZX0sICR7dmFsaWRhdGlvbkNoYW5nZWR9KSAtPiAke3ZhbHVlfWApXHJcblx0XHRcdF92YWx1ZSh0aGlzLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzdXBlci52YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGNvbmRpdGlvbkNoYW5nZSwgdmFsaWRhdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKEZpZWxkKTtcclxuZXhwb3J0IGRlZmF1bHQgRmllbGQ7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIE5PREVOQU1FX1BBR0UsIEVWRU5UX0lOSVRJQUxJWkVELCBFVkVOVF9QQUdFX0lOSVRJQUxJWkVELCBFVkVOVF9QQUdFX1JFTU9WRUQsIEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCwgRVZFTlRfU0lURV9DSEFOR0VELCBFVkVOVF9TVUJNSVQsIEVWRU5UX1NVQk1JVF9SRVNVTFRTLCBBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsIEFUVFJJQlVURV9FTkRQT0lOVCwgQVRUUklCVVRFX01FVEhPRCwgQVRUUklCVVRFX1NUQVRFLCBBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQsIEZPUk1TVEFURV9JTlBVVCwgRk9STVNUQVRFX1NVTU1BUlksIEZPUk1TVEFURV9WQUxJREFUSU5HLCBGT1JNU1RBVEVfSU5JVCwgRk9STVNUQVRFX0ZJTklTSEVELCBFVkVOVF9JTlRFUk5BTF9TVEFSVF9WQUxJREFUSU9OLCBFVkVOVF9JTlRFUk5BTF9GSU5JU0hfVkFMSURBVElPTiB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xyXG5pbXBvcnQgXCIuL01lc3NhZ2VcIjtcclxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vUGFnZVwiO1xyXG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcclxuaW1wb3J0IFwiLi9Qcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgQmFzZVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGZyb20gXCIuL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMIGFzIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgU1RBVEVfU1VDQ0VTUyBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xyXG5pbXBvcnQgeyB2YWx1ZUhlbHBlciwgZmllbGRWYWx1ZU1hcFRvT2JqZWN0IH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IHsgUHJvbWlzZVV0aWxzIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHNcIjtcclxuXHJcbmNvbnN0IF9zdWJtaXRBY3Rpb25zID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJzdWJtaXRBY3Rpb25cIik7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX0VORFBPSU5ULCBBVFRSSUJVVEVfTUVUSE9ELCBBVFRSSUJVVEVfU1RBVEUsIEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVF07XHJcblxyXG5jb25zdCByZWFkb25seSA9IChmb3JtLCByZWFkb25seSkgPT4ge1xyXG5cdGZvciAobGV0IHBhZ2Ugb2YgZm9ybS5wYWdlcykge1xyXG5cdFx0cGFnZS5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0cGFnZS5hY3RpdmUgPSByZWFkb25seTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBleGVjdXRlQWN0aW9ucyA9IGFzeW5jIChhY3Rpb25zLCBkYXRhKSA9PiB7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cdGZvciAobGV0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XHJcblx0XHRjb25zdCBhY2NlcHQgPSBhd2FpdCBhY3Rpb24uYWNjZXB0KGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IChhd2FpdCBhY3Rpb24uZXhlY3V0ZShkYXRhKSkgfHwgbmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfU1VDQ0VTUyk7XHJcblx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdFx0aWYgKHJlc3VsdC5zdGF0ZSA9PSBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwpIHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0cmVzdWx0cy5wdXNoKG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQoYWN0aW9uLCBBQ1RJT05fU1VCTUlUX1NUQVRFX0ZBSUwsIGUpKTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbmNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZPUk07XHJcblx0fVxyXG5cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQjc3RhdGUgPSBGT1JNU1RBVEVfSU5JVDtcclxuXHQjcGFnZXM7XHJcblx0I3ZhbHVlID0gbmV3IE1hcCgpO1xyXG5cdCNkYXRhID0ge307XHJcblx0I3ZhbGlkYXRpb24gPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xyXG5cdFx0XHJcblx0XHRyb290Lm9uKEVWRU5UX1BBR0VfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfUEFHRV9SRU1PVkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgcGFnZSA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0dGhpcy4jcGFnZXMgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmNoaWxkVmFsdWVDaGFuZ2VkKHBhZ2UsIG51bGwpO1xyXG5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX0lOSVRJQUxJWkVEKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XHJcblxyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOSVQ7XHJcblxyXG5cdFx0XHR0aGlzLnVzZVN1bW1hcnlQYWdlID0gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UpO1xyXG5cclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSAtMTtcclxuXHRcdFx0aWYgKHRoaXMucGFnZXMubGVuZ3RoID4gMCkgdGhpcy50b05leHRQYWdlKCk7XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcGFnZXMoKSB7XHJcblx0XHRpZiAoIXRoaXMuI3BhZ2VzKSB0aGlzLiNwYWdlcyA9IEFycmF5LmZyb20odGhpcy5yb290LmZpbmQoTk9ERU5BTUVfUEFHRSkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLiNwYWdlcztcclxuXHR9XHJcblxyXG5cdGdldCBzdGF0ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNzdGF0ZTtcclxuXHR9XHJcblxyXG5cdHNldCBzdGF0ZShzdGF0ZSkge1xyXG5cdFx0Y29uc3QgYWN0dWFsID0gdGhpcy4jc3RhdGU7XHJcblx0XHRpZiAoc3RhdGUgIT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpIHtcclxuXHRcdFx0aWYgKGFjdHVhbCA9PSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSByZWFkb25seSh0aGlzLCB0cnVlKTtcclxuXHRcdFx0ZWxzZSBpZiAoYWN0dWFsICE9IEZPUk1TVEFURV9JTlBVVCAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0XHRyZWFkb25seSh0aGlzLCBmYWxzZSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuYWN0aXZlUGFnZSkgdGhpcy5hY3RpdmVQYWdlLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuI3N0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0aWYgKGFjdHVhbCAhPSBzdGF0ZSkgdGhpcy50cmlnZ2VyKEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1NUQVRFLCBzdGF0ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWQoKSB7XHJcblx0XHRmb3IgKGxldCBwYWdlIG9mIHRoaXMucGFnZXMpIGlmIChwYWdlLmNvbmRpdGlvbiAmJiAhcGFnZS52YWxpZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsdWUoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uKSBhd2FpdCB0aGlzLiN2YWxpZGF0aW9uO1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIHRoaXMuI2RhdGE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKHRoaXMucGFnZXMubWFwKHBhZ2UgPT4ge1x0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHBhZ2UubmFtZTtcclxuXHRcdFx0XHRyZXR1cm4gbmFtZSA/IHBhZ2UudmFsdWUodmFsdWVIZWxwZXIoZGF0YSwgbmFtZSkpIDogcGFnZS52YWx1ZShkYXRhKTtcclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0YXdhaXQgdGhpcy4jdmFsaWRhdGUoKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0XHRjb25zdCBoYW5kbGUgPSAoZXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVPbihoYW5kbGUsIEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHRoaXMudmFsdWUoZGF0YSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLm9uKEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCwgaGFuZGxlKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmVQYWdlKCkge1xyXG5cdFx0aWYgKDAgPD0gdGhpcy5hY3RpdmVQYWdlSW5kZXggJiYgdGhpcy5hY3RpdmVQYWdlSW5kZXggPCB0aGlzLnBhZ2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMucGFnZXNbdGhpcy5hY3RpdmVQYWdlSW5kZXhdO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZVBhZ2UocGFnZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlUGFnZTtcclxuXHRcdGlmIChwYWdlICE9IGN1cnJlbnQgfHwgdGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0aWYgKGN1cnJlbnQpIGN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gdGhpcy5wYWdlcy5pbmRleE9mKHBhZ2UpO1xyXG5cdFx0XHRwYWdlLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkgdGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHJcblx0XHRcdHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NJVEVfQ0hBTkdFRCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcHJldlBhZ2UoKSB7XHJcblx0XHRyZXR1cm4gKGFzeW5jICgpID0+IHtcdFx0XHRcclxuXHRcdFx0Y29uc3QgcGFnZXMgPSB0aGlzLnBhZ2VzO1xyXG5cdFx0XHRjb25zdCBzdGFydCA9IHRoaXMuYWN0aXZlUGFnZUluZGV4IC0gMTtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudmFsdWUoKTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBwYWdlc1tpXTtcclxuXHRcdFx0XHRhd2FpdCBwYWdlLnZhbGlkYXRlKGRhdGEpO1xyXG5cdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdGdldCBuZXh0UGFnZSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggKyAxO1xyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xyXG5cdFx0XHRpZiAocGFnZXMpIHtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Y29uc3QgcGFnZSA9IHBhZ2VzW2ldO1xyXG5cdFx0XHRcdFx0YXdhaXQgcGFnZS52YWxpZGF0ZShkYXRhKTtcclxuXHRcdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHRvUHJldlBhZ2UoKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xyXG5cdFx0XHRpZiAocHJldikgdGhpcy5hY3RpdmVQYWdlID0gcHJldjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XHJcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcclxuXHRcdGlmIChuZXh0KSB7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcclxuXHRcdFx0dGhpcy5zdW1tYXJ5KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgc3VtbWFyeSgpIHtcclxuXHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfU1VNTUFSWTtcclxuXHR9XHJcblxyXG5cdGdldCBzdWJtaXRBY3Rpb25zKCkge1xyXG5cdFx0bGV0IGFjdGlvbnMgPSBfc3VibWl0QWN0aW9ucyh0aGlzKTtcclxuXHRcdGlmICghYWN0aW9ucykge1xyXG5cdFx0XHRhY3Rpb25zID0gW107XHJcblx0XHRcdGxldCBlbmRwb2ludCA9IHRoaXMuYXR0cihBVFRSSUJVVEVfRU5EUE9JTlQpO1xyXG5cdFx0XHRpZiAoZW5kcG9pbnQpIHtcclxuXHRcdFx0XHRjb25zdCBtZXRob2QgPSB0aGlzLmF0dHIoQVRUUklCVVRFX01FVEhPRCkgfHwgXCJwb3N0XCI7XHJcblx0XHRcdFx0dGhpcy5hcHBlbmQobmV3IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKGVuZHBvaW50LCBtZXRob2QpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5jaGlsZHJlbjtcclxuXHRcdFx0Zm9yIChsZXQgY2hpbGQgb2YgY2hpbGRzKSB7XHJcblx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQmFzZVN1Ym1pdEFjdGlvbikgYWN0aW9ucy5wdXNoKGNoaWxkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfc3VibWl0QWN0aW9ucyh0aGlzLCBhY3Rpb25zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYWN0aW9ucztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHN1Ym1pdCgpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnZhbHVlKCk7XHJcblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucGFnZXMpO1xyXG5cdFx0aWYgKCF2YWxpZCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUKSkgdGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9GSU5JU0hFRDtcclxuXHJcblx0XHRjb25zdCBhY3Rpb25zID0gdGhpcy5zdWJtaXRBY3Rpb25zO1xyXG5cdFx0aWYgKGFjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IGV4ZWN1dGVBY3Rpb25zKGFjdGlvbnMsIGRhdGEpO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlUX1JFU1VMVFMsIHJlc3VsdHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9TVUJNSVQsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0I3ZhbGlkYXRlKHBhZ2UpIHtcclxuXHRcdFx0bGV0IHByb21pc2UgPSBQcm9taXNlVXRpbHMubGF6eVByb21pc2UoKTtcclxuXHRcdFx0Y29uc3QgYWN0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLiNkYXRhOy8vYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KHRoaXMuI3ZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3QgdmFsaWQgPSBwYWdlID8gYXdhaXQgcGFnZS52YWxpZGF0ZShkYXRhKSA6IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucGFnZXMpO1x0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHByb21pc2UucmVzb2x2ZSh2YWxpZCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKHRoaXMuI3ZhbGlkYXRpb24gPT0gcHJvbWlzZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGlvbiA9IG51bGw7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdFxyXG5cdFx0XHRpZih0aGlzLiN2YWxpZGF0aW9uID09IG51bGwpe1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoYWN0aW9uLCAxMCk7XHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX1ZBTElEQVRJTkc7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBcdFxyXG5cdFx0XHRcdHRoaXMuI3ZhbGlkYXRpb24udGhlbihhY3Rpb24pO1xyXG5cclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbiA9IHByb21pc2U7XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChmaWVsZCwgdmFsdWUpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHRcdFxyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KWAsIHsgZmllbGQsIHZhbHVlIH0pO1xyXG5cdFx0aWYgKGZpZWxkKSB7XHJcblx0XHRcdGlmIChub1ZhbHVlKHZhbHVlKSkgbWFwLmRlbGV0ZShmaWVsZCk7XHJcblx0XHRcdGVsc2UgbWFwLnNldChmaWVsZCwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuI2RhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIHRoaXMucGFnZXMpO1xyXG5cclxuXHRcdGNvbnN0IGFjdGl2ZVBhZ2UgPSB0aGlzLmFjdGl2ZVBhZ2U7XHJcblx0XHRpZiAoYWN0aXZlUGFnZSkgYXdhaXQgdGhpcy4jdmFsaWRhdGUoYWN0aXZlUGFnZSk7XHJcblx0XHRlbHNlIGF3YWl0IHRoaXMuI3ZhbGlkYXRlKCk7XHJcblx0fVxyXG59XHJcbmRlZmluZShGb3JtKTtcclxuZXhwb3J0IGRlZmF1bHQgRm9ybTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0RJU0FCTEVEIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRF07XHJcblxyXG5jbGFzcyBGb3JtQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I2Zvcm07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLmRpc2FibGVkKSB0aGlzLmV4ZWN1dGUoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICh0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0aWYgKCF0aGlzLiNmb3JtKVxyXG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2Zvcm07XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBhY3RpdmUgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgZGlzYWJsZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0RJU0FCTEVEKTtcclxuXHR9XHJcblxyXG5cdHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9ESVNBQkxFRCwgZGlzYWJsZWQgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJleGVjdXRlXCIpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBGb3JtQnV0dG9uO1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9MSVNULCBOT0RFTkFNRV9MSVNUX1JPV1MsIE5PREVOQU1FX0xJU1RfUk9XLCBOT0RFTkFNRV9MSVNUX0FERF9ST1csIE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVywgRVZFTlRfRklFTERfSU5JVElBTElaRUQsIEVWRU5UX0xJU1RfUk9XX0FERCwgRVZFTlRfTElTVF9ST1dfREVMRVRFLCBBVFRSSUJVVEVfTUlOLCBBVFRSSUJVVEVfTUFYIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRyZWVGaWx0ZXIgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBCYXNlRmllbGQsIHsgX3ZhbHVlIH0gZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCBSb3cgZnJvbSBcIi4vbGlzdC9Sb3dcIjtcclxuaW1wb3J0IEFkZFJvdywge0VWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1d9IGZyb20gXCIuL2xpc3QvQWRkUm93XCI7XHJcbmltcG9ydCBcIi4vbGlzdC9EZWxldGVSb3dcIjtcclxuaW1wb3J0IFwiLi9saXN0L1Jvd3NcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX01JTiwgQVRUUklCVVRFX01BWF07XHJcblxyXG5jb25zdCBidWlsZERhdGEgPSBhc3luYyAocm93cywgdmFsdWVzKSA9PiB7XHJcblx0bGV0IGRhdGEgPSBbXTtcclxuXHRmb3IgKGxldCByb3cgb2Ygcm93cykgZGF0YS5wdXNoKHZhbHVlcy5nZXQocm93KSk7XHJcblxyXG5cdGlmIChkYXRhLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jbGFzcyBMaXN0IGV4dGVuZHMgQmFzZUZpZWxkIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChCYXNlRmllbGQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVDtcclxuXHR9XHJcblxyXG5cdCN0ZW1wbGF0ZTtcclxuXHQjY29udGFpbmVyO1xyXG5cdCN2YWx1ZXMgPSBuZXcgTWFwKCk7XHJcblx0I2FkZFJvd0J1dHRvbjtcclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVywgKGV2ZW50KSA9PiB7XHJcblx0XHRcdHRoaXMuI2FkZFJvd0J1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0aWYodGFyZ2V0ICE9IHRoaXMpe1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfTElTVF9ST1dfQURELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB0aGlzLmNyZWF0ZVJvdygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9MSVNUX1JPV19ERUxFVEUsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdGNvbnN0IHsgcm93cywgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRcdGlmICghcmVhZG9ubHkpIHtcclxuXHRcdFx0XHRjb25zdCByb3cgPSBldmVudC50YXJnZXQucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9IHJvd3MuaW5kZXhPZihyb3cpO1xyXG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCB7IHJvd3MsIG1pbiwgbWF4LCByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdFx0Y29uc3QgbGVuZ3RoID0gcm93cy5sZW5ndGg7XHJcblx0XHRcdGlmICh0aGlzLiNhZGRSb3dCdXR0b24gJiYgIXJlYWRvbmx5KSB7XHJcblx0XHRcdFx0aWYgKGxlbmd0aCA9PSBtYXgpIHRoaXMuI2FkZFJvd0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0ZWxzZSBpZiAobGVuZ3RoIDwgbWF4KSB0aGlzLiNhZGRSb3dCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbWluIDw9IGxlbmd0aCAmJiBsZW5ndGggPD0gbWF4O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jIChkYXRhKSA9PiB7XHJcblx0XHRcdHJldHVybiBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhkYXRhLCB0aGlzLnJvd3MpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1x0XHRcdFxyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdGNvbnN0IHJvd1RlbXBsYXRlID0gdGhpcy5maW5kKFwidGVtcGxhdGVcIikuZmlyc3QoKTtcclxuXHRcdFx0aWYocm93VGVtcGxhdGUpXHJcblx0XHRcdFx0dGhpcy4jdGVtcGxhdGUgPSByb3dUZW1wbGF0ZS5jb250ZW50O1xyXG5cclxuXHRcdFx0dGhpcy4jY29udGFpbmVyID0gdGhpcy5maW5kKE5PREVOQU1FX0xJU1RfUk9XUykuZmlyc3QoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcclxuXHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRmb3IgKGxldCByb3cgb2YgdGhpcy5yb3dzKSB7XHJcblx0XHRcdHJvdy5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHJvd3MoKSB7XHJcblx0XHRpZih0aGlzLiNjb250YWluZXIpXHJcblx0XHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuI2NvbnRhaW5lci5jaGlsZHJlbik7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fVxyXG5cclxuXHRnZXQgbWluKCkge1xyXG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NSU4pKSByZXR1cm4gTWF0aC5tYXgoMCwgcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NSU4pKSk7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdGdldCBtYXgoKSB7XHJcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01BWCkpIHJldHVybiBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01BWCkpO1xyXG5cdFx0cmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiAhdmFsdWUgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSkgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlUm93KHZhbHVlKSB7XHJcblx0XHRjb25zdCByb3cgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuI3RlbXBsYXRlLCB0cnVlKS5jaGlsZHJlblswXTtcclxuXHRcdGF3YWl0IHRoaXMuI2NvbnRhaW5lci5hcHBlbmQocm93KTtcclxuXHJcblx0XHRpZiAodmFsdWUpIGF3YWl0IHJvdy52YWx1ZSh2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJvdztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZXMpIHtcclxuXHRcdHRoaXMuI3ZhbHVlcy5jbGVhcigpO1xyXG5cdFx0dGhpcy4jY29udGFpbmVyLmVtcHR5KCk7XHJcblx0XHRpZiAodmFsdWVzKSBhd2FpdCBQcm9taXNlLmFsbCh2YWx1ZXMubWFwKHZhbHVlID0+IHRoaXMuY3JlYXRlUm93KHZhbHVlKSkpO1xyXG5cclxuXHRcdHJldHVybiBhd2FpdCBidWlsZERhdGEodGhpcy5yb3dzLCB0aGlzLiN2YWx1ZXMpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQocm93LCB2YWx1ZSkge1xyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuI3ZhbHVlcztcclxuXHJcblx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHRoaXMuI3ZhbHVlcy5kZWxldGUocm93KTtcclxuXHRcdGVsc2UgdGhpcy4jdmFsdWVzLnNldChyb3csIHZhbHVlKTtcclxuXHJcblx0XHRhd2FpdCBzdXBlci5jaGlsZFZhbHVlQ2hhbmdlZChyb3csIHZhbHVlKTtcclxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBidWlsZERhdGEodGhpcy5yb3dzLCB2YWx1ZXMpO1xyXG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoZGF0YSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoTGlzdCk7XHJcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XHJcbiIsImltcG9ydCB7RXhwcmVzc2lvblJlc29sdmVyfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHtDb21wb25lbnQsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTUVTU0FHRSxcclxuXHRFVkVOVF9NRVNTQUdFX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX01FU1NBR0VfUkVNT1ZFRFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX0NPTkRJVElPTl07XHJcblxyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX01FU1NBR0U7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVzdHJveSgpe1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX01FU1NBR0VfUkVNT1ZFRCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZShkYXRhKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0dGhpcy5hY3RpdmUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoTWVzc2FnZSk7XHJcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX1BBR0UsICBcclxuXHRBVFRSSUJVVEVfU1RFUCwgXHJcblx0RVZFTlRfUEFHRV9JTklUSUFMSVpFRCxcclxuXHRFVkVOVF9QQUdFX1JFTU9WRURcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9Db250YWluZXJcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1NURVBdO1xyXG5cclxuY2xhc3MgUGFnZSBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1BBR0U7XHJcblx0fVxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9QQUdFX0lOSVRJQUxJWkVEKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCl7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfUEFHRV9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBzdGVwKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9TVEVQKTtcclxuXHR9XHJcblx0XHJcblx0Y29uZGl0aW9uVXBkYXRlZCgpe31cclxufVxyXG5kZWZpbmUoUGFnZSk7XHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0ZPUk0sIFxyXG5cdE5PREVOQU1FX1BST0dFU1NCQVIsXHJcblx0Tk9ERU5BTUVfU1RFUCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQsXHJcblx0Rk9STVNUQVRFX0lOSVQsXHJcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXHJcblx0QVRUUklCVVRFX1BST0dSRVNTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50ICxkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgXCIuL1N0ZXBcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX1BST0dSRVNTXTtcclxuXHJcbmNvbnN0IGZpcnN0U3RlcFBhZ2VJbmRleCA9IChwYWdlcywgc3RlcCwgYWN0aXZlUGFnZSkgPT4ge1xyXG5cdGZvciAobGV0IHBhZ2Ugb2YgcGFnZXMpIHtcclxuXHRcdGlmIChwYWdlLnN0ZXAgPT0gc3RlcCAmJiBwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRlbHNlIGlmIChwYWdlID09IGFjdGl2ZVBhZ2UpIHJldHVybjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1BST0dFU1NCQVI7XHJcblx0fVxyXG5cclxuXHQjZm9ybTtcclxuXHQjc3RlcHM7XHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy4jZm9ybSkgcmV0dXJuO1xyXG5cdFx0XHRpZiAodGFyZ2V0ID09IHRoaXMpIHJldHVybjtcdFx0XHRcclxuXHRcdFx0Y29uc3Qgc3RlcCA9IHRhcmdldC5pcyhOT0RFTkFNRV9TVEVQKSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnQoTk9ERU5BTUVfU1RFUCk7XHJcblx0XHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtO1xyXG5cclxuXHRcdFx0aWYgKCFzdGVwKSByZXR1cm47XHJcblxyXG5cdFx0XHRjb25zdCB7c3RhdGUsIHBhZ2VzLCBhY3RpdmVQYWdlfSA9IGZvcm07XHJcblx0XHRcdGNvbnN0IHN0ZXBOYW1lID0gc3RlcC5uYW1lO1xyXG5cdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUIHx8IHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IGZpcnN0U3RlcFBhZ2VJbmRleChwYWdlcywgc3RlcE5hbWUsIGFjdGl2ZVBhZ2UpO1xyXG5cdFx0XHRcdGlmIChwYWdlKSBmb3JtLmFjdGl2ZVBhZ2UgPSBwYWdlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLnByb2dyZXNzID0gMDtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0Y29uc3QgZm9ybSA9IHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0dGhpcy4jc3RlcHMgPSB0aGlzLmZpbmQoTk9ERU5BTUVfU1RFUCk7XHJcblx0XHRcdHRoaXMuI2Zvcm0ub24oW0VWRU5UX1NJVEVfQ0hBTkdFRCxFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRURdLCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhdGUgPSBmb3JtLnN0YXRlO1xyXG5cdFx0XHRcdGlmKEZPUk1TVEFURV9WQUxJREFUSU5HID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnN0IHthY3RpdmVQYWdlSW5kZXgsIGFjdGl2ZVBhZ2UsIHBhZ2VzfSA9IGZvcm07XHJcblx0XHRcdFx0aWYgKCFhY3RpdmVQYWdlKSBcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0Y29uc3QgY291bnQgPSBwYWdlcy5sZW5ndGg7XHJcblx0XHRcdFx0Y29uc3QgcGFnZVN0ZXAgPSBhY3RpdmVQYWdlID8gYWN0aXZlUGFnZS5zdGVwIDogRk9STVNUQVRFX0lOSVQ7XHJcblx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKChhY3RpdmVQYWdlSW5kZXggKiAxMDApIC8gY291bnQpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBzdGVwIG9mIHRoaXMuc3RlcHMpIHtcclxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzdGVwLm5hbWU7XHJcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBwYWdlU3RlcDtcclxuXHRcdFx0XHRcdFx0c3RlcC5yZWFkb25seSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFX1NVTU1BUlk7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHN0ZXAuYWN0aXZlID0gbmFtZSA9PSBGT1JNU1RBVEVfRklOSVNIRUQ7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZIHx8IHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCA/IDEwMCA6IHByb2dyZXNzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfUFJPR1JFU1NCQVJfQ0hBTkdFRCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHN0ZXBzKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNzdGVwcyk7XHJcblx0fVxyXG5cclxuXHRnZXQgcHJvZ3Jlc3MoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9QUk9HUkVTUyk7XHJcblx0fVxyXG5cclxuXHRzZXQgcHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcclxuXHRcdGlmICh0aGlzLnN0eWxlLnNldFByb3BlcnR5KSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wcm9ncmVzc1wiLCBwcm9ncmVzcyArIFwiJVwiKTtcclxuXHRcdHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MsIE1hdGgubWF4KDAsIE1hdGgubWluKHByb2dyZXNzLCAxMDApKSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoUHJvZ3Jlc3NCYXIpO1xyXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfU1RFUCwgXHJcblx0QVRUUklCVVRFX05BTUUsIFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9SRUFET05MWSBcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUgfSBmcm9tIFwiLi91dGlscy9TdGF0ZUhlbHBlclwiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTkFNRSwgQVRUUklCVVRFX0FDVElWRSwgQVRUUklCVVRFX1JFQURPTkxZXTtcclxuXHJcbmNsYXNzIFN0ZXAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX1NURVA7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuICAgIGdldCBuYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfTkFNRSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcmVhZG9ubHkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0cmVhZG9ubHkgPyB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBcIlwiKSA6IHRoaXMuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIG51bGwpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKFN0ZXApO1xyXG5leHBvcnQgZGVmYXVsdCBTdGVwO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9WQUxJREFUSU9OLFxyXG5cdEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQsXHJcblx0RVZFTlRfVkFMSURBVElPTl9SRU1PVkVELFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTlxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcclxuXHJcblxyXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9WQUxJREFUSU9OO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfVkFMSURBVElPTl9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoVmFsaWRhdGlvbik7XHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfQkFDSyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQmFja0J1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfQkFDSztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xyXG5kZWZpbmUoQmFja0J1dHRvbik7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfTkVYVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9ORVhUO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5leHRCdXR0b247XHJcbmRlZmluZShOZXh0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIFN1Ym1pdEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfU1VCTUlUO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRCdXR0b247XHJcbmRlZmluZShTdWJtaXRCdXR0b24pO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9DT05UUk9MX1NVTU1BUllcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIFN1bW1hcnlCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9OZXh0UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5QnV0dG9uO1xyXG5kZWZpbmUoU3VtbWFyeUJ1dHRvbik7XHJcbiIsImltcG9ydCBCYWNrQnV0dG9uIGZyb20gXCIuL0JhY2tCdXR0b25cIjtcbmltcG9ydCBOZXh0QnV0dG9uIGZyb20gXCIuL05leHRCdXR0b25cIjtcbmltcG9ydCBTdW1tYXJ5QnV0dG9uIGZyb20gXCIuL1N1bW1hcnlCdXR0b25cIjtcbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSBcIi4vU3VibWl0QnV0dG9uXCI7XG5cbmV4cG9ydCB7XG5cdEJhY2tCdXR0b24sXG5cdE5leHRCdXR0b24sXG5cdFN1bW1hcnlCdXR0b24sXG5cdFN1Ym1pdEJ1dHRvbixcbn07XG4iLCJpbXBvcnQgeyBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNsYXNzIENvbmRpdGlvbkhhbmRsZSB7XHJcblxyXG4gICAgI2Jhc2U7XHJcbiAgICAjY29uZGl0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2UpeyAgXHJcbiAgICAgICAgdGhpcy4jYmFzZSA9IGJhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbmRpdGlvbigpe1xyXG4gICAgICAgIGlmKCF0aGlzLiNjb25kaXRpb24pXHJcbiAgICAgICAgICAgIHRoaXMuI2NvbmRpdGlvbiA9IHRoaXMuI2Jhc2UuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB2YWxpZGF0ZShkYXRhKXtcclxuICAgICAgICBjb25zdCBiYXNlID0gdGhpcy4jYmFzZTsgICAgICAgIFxyXG4gICAgICAgIGxldCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gYmFzZS5jb25kaXRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgY29uZGl0aW9uKCR7YmFzZS5uYW1lfSlgLCBjb25kaXRpb24sIGRhdGEpOyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xyXG4gICAgICAgIGlmKGNvbmRpdGlvbiAhPSBjdXJyZW50KVxyXG4gICAgICAgICAgICBiYXNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvblxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KSByZXN1bHQ6YCwgY29uZGl0aW9uKTtcclxuICAgICAgICByZXR1cm4gY29uZGl0aW9uO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZGl0aW9uSGFuZGxlOyIsImltcG9ydCB7IEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY2xhc3MgRWRpdGFibGVIYW5kbGUge1xyXG5cdCNiYXNlO1xyXG5cdCNjb25kaXRpb24gPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihiYXNlKSB7XHJcblx0XHR0aGlzLiNiYXNlID0gYmFzZTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRpZiAodGhpcy4jY29uZGl0aW9uID09IG51bGwpXHJcblx0XHRcdHRoaXMuI2NvbmRpdGlvbiA9IHRoaXMuI2Jhc2UuYXR0cihBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OKSB8fCBcIlwiO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLiNjb25kaXRpb247XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcbiAgICAgICAgbGV0IGVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLiNiYXNlLmVkaXRhYmxlO1xyXG4gICAgICAgIC8qY29uc3Qge2hhc1ZhbHVlLCByZXF1aXJlZH0gPSB0aGlzLiNiYXNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFoYXNWYWx1ZSAmJiByZXF1aXJlZClcclxuICAgICAgICAgICAgZWRpdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIGVsc2UqLyBpZih0aGlzLmNvbmRpdGlvbilcclxuICAgICAgICAgICAgZWRpdGFibGUgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpO1xyXG5cclxuXHRcdGlmIChlZGl0YWJsZSAhPSBjdXJyZW50KSB0aGlzLiNiYXNlLmVkaXRhYmxlID0gZWRpdGFibGU7XHJcblxyXG5cdFx0cmV0dXJuIGVkaXRhYmxlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRWRpdGFibGVIYW5kbGU7XHJcbiIsImltcG9ydCB7XHJcbiAgICBFVkVOVF9NRVNTQUdFX0lOSVRJQUxJWkVELCBcclxuICAgIEVWRU5UX01FU1NBR0VfUkVNT1ZFRFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlSGFuZGxlIHtcclxuXHJcbiAgICAjbWVzc2FnZXMgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7XHJcbiAgICAgICAgYmFzZS5vbihFVkVOVF9NRVNTQUdFX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLiNtZXNzYWdlcy5hZGQodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmFzZS5vbihFVkVOVF9NRVNTQUdFX1JFTU9WRUQsIChldmVudCkgPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuI21lc3NhZ2VzLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcbiAgICAgICAgZm9yKGxldCBtZXNzYWdlIG9mIHRoaXMuI21lc3NhZ2VzKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VIYW5kbGU7IiwiaW1wb3J0IHsgRVZFTlRfVkFMSURBVElPTl9JTklUSUFMSVpFRCwgRVZFTlRfVkFMSURBVElPTl9SRU1PVkVEIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNvbnN0IHZhbGlkYXRlQ3VzdG9tVmFsaWRhdGlvbnMgPSBhc3luYyAodmFsaWRhdGlvbnMsIGRhdGEsIGJhc2UpID0+IHtcclxuXHRsZXQgdmFsaWQgPSB0cnVlO1xyXG5cdGZvciAobGV0IGNoZWNrIG9mIHZhbGlkYXRpb25zKSB7XHJcblx0XHRpZiAoIShhd2FpdCBjaGVjayh7IGRhdGEsIGJhc2UgfSkpKSB2YWxpZCA9IGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdmFsaWQ7XHJcbn07XHJcblxyXG5jbGFzcyBWYWxpZGF0aW9uSGFuZGxlIHtcclxuXHQjYmFzZTtcclxuXHQjdmFsaWRhdGlvbnMgPSBuZXcgU2V0KCk7XHJcblx0I2N1c3RvbXMgPSBuZXcgU2V0KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcclxuXHRcdHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG5cdFx0YmFzZS5vbihFVkVOVF9WQUxJREFUSU9OX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdHRoaXMuI3ZhbGlkYXRpb25zLmFkZChldmVudC50YXJnZXQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0YmFzZS5vbihFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbnMuZGVsZXRlKGV2ZW50LnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFkZEN1c3RvbVZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jY3VzdG9tcy5hZGQodmFsaWRhdGlvbik7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IGN1c3RvbXMgPSB0aGlzLiNjdXN0b21zO1xyXG5cdFx0Y29uc3QgdmFsaWRhdGlvbnMgPSB0aGlzLiN2YWxpZGF0aW9ucztcclxuXHRcdGNvbnN0IGN1cnJlbnRWYWxpZCA9IHRoaXMuI2Jhc2UudmFsaWQ7XHJcblx0XHRjb25zdCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSB9ID0gdGhpcy4jYmFzZTtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke2Jhc2Uubm9kZU5hbWV9KCR7YmFzZS5uYW1lfSkgdmFsaWRhdGU6YCwgeyBoYXNWYWx1ZSwgcmVxdWlyZWQsIGNvbmRpdGlvbiwgZWRpdGFibGUsIGN1cnJlbnRWYWxpZCB9LCBkYXRhLCBiYXNlLm5vZGVOYW1lKTtcclxuXHRcdGxldCB2YWxpZCA9IHRydWU7XHJcblx0XHRpZiAoY29uZGl0aW9uKSB7XHJcblx0XHRcdHZhbGlkID0gcmVxdWlyZWQgPyBoYXNWYWx1ZSA6IHRydWU7XHJcblxyXG5cdFx0XHRpZiAoIShhd2FpdCB2YWxpZGF0ZUN1c3RvbVZhbGlkYXRpb25zKGN1c3RvbXMsIGRhdGEsIGJhc2UpKSkgdmFsaWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGZvciAobGV0IHZhbGlkYXRpb24gb2YgdmFsaWRhdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAodmFsaWQgJiYgaGFzVmFsdWUpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHRlc3QgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh2YWxpZGF0aW9uLmNvbmRpdGlvbiwgZGF0YSwgdHJ1ZSk7XHJcblx0XHRcdFx0XHR2YWxpZGF0aW9uLmFjdGl2ZSA9ICF0ZXN0O1xyXG5cdFx0XHRcdFx0aWYgKCF0ZXN0KSB2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH0gZWxzZSB2YWxpZGF0aW9uLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YmFzZS52YWxpZCA9IHZhbGlkO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7YmFzZS5ub2RlTmFtZX0oJHtiYXNlLm5hbWV9KSB2YWxpZGF0ZSByZXN1bHQ6YCwge3ZhbGlkfSk7XHJcblx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uSGFuZGxlO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9MSVNUX0FERF9ST1csIFxyXG5cdEVWRU5UX0xJU1RfUk9XX0FERFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XID0gYCR7Tk9ERU5BTUVfTElTVF9BRERfUk9XfTppbml0aWFsaXplZGA7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIEFkZFJvdyBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpe1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfQUREX1JPVztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVykpXHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9MSVNUX1JPV19BREQpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKEFkZFJvdyk7XHJcbmV4cG9ydCBkZWZhdWx0IEFkZFJvdztcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XLFxyXG5cdEVWRU5UX0xJU1RfUk9XX0RFTEVURVxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuXHJcbmNsYXNzIERlbGV0ZVJvdyBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEFUVFJJQlVURVMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX0RFTEVURV9ST1c7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLmFjdGl2ZVx0PSB0cnVlO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9MSVNUX1JPV19ERUxFVEUpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKERlbGV0ZVJvdyk7XHJcbmV4cG9ydCBkZWZhdWx0IERlbGV0ZVJvdztcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTElTVF9ST1dcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4uL0NvbnRhaW5lclwiO1xyXG5pbXBvcnQgRGVsZXRlUm93IGZyb20gXCIuL0RlbGV0ZVJvd1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBMaXN0Um93IGV4dGVuZHMgQ29udGFpbmVyIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChDb250YWluZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9ST1c7XHJcblx0fVx0XHJcblx0XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKExpc3RSb3cuTk9ERU5BTUUsIExpc3RSb3cpO1xyXG5leHBvcnQgZGVmYXVsdCBMaXN0Um93O1xyXG4iLCJpbXBvcnQgeyBOT0RFTkFNRV9MSVNUX1JPV1MgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTGlzdFJvd3MgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfUk9XUztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShMaXN0Um93cyk7XHJcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3dzO1xyXG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcclxuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX0ZBSUwgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHsgRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OLCBOT0RFTkFNRV9GT1JNLCBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuLy8gcHJpdmF0ZSBtZW1iZXJcclxuY29uc3QgX2Zvcm0gPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcImZvcm1cIik7XHJcblxyXG4vLyBsb2dpY1xyXG5jbGFzcyBCYXNlU3VibWl0QWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0Y29uc3QgZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cdFx0X2Zvcm0odGhpcywgZm9ybSk7XHJcblx0XHRpZiAoZm9ybSkgdGhpcy50cmlnZ2VyKEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTik7XHJcblx0fVxyXG5cclxuXHRnZXQgZm9ybSgpIHtcclxuXHRcdHJldHVybiBfZm9ybSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjY2VwdChkYXRhID0ge30pIHtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcclxuICAgICAgICBpZihjb25kaXRpb24pXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIVxyXG5cdCAqL1xyXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSA9IHt9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFN1Ym1pdEFjdGlvblJlc3VsdChTVEFURV9GQUlMLCBcIm5vdCBpbXBsZW1lbnRlZFwiKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQmFzZVN1Ym1pdEFjdGlvbjtcclxuIiwiaW1wb3J0IHtkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9TVUNDRVNTLCBTVEFURV9GQUlMIH0gZnJvbSBcIi4vU3VibWl0QWN0aW9uUmVzdWx0XCI7XHJcbmltcG9ydCB7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNvbnN0IE5PREVOQU1FID0gYCR7Tk9ERU5BTUVfU1VCTUlUX0FDVElPTn0tZGVmYXVsdGA7XHJcblxyXG5jbGFzcyBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbiBleHRlbmRzIEJhc2VTdWJtaXRBY3Rpb24ge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7IHJldHVybiBOT0RFTkFNRTt9XHJcblxyXG5cclxuXHRjb25zdHJ1Y3RvcihlbmRwb2ludCwgbWV0aG9kKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xyXG5cdFx0dGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcblx0fVxyXG5cclxuXHRhc3luYyBleGVjdXRlKGRhdGEpIHtcdFx0XHJcblx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50O1xyXG5cdFx0ZW5kcG9pbnQgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZVRleHQoZW5kcG9pbnQsIGRhdGEsIGVuZHBvaW50KTtcclxuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIGxvY2F0aW9uKTtcclxuXHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG5cdFx0XHRjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcblx0XHRcdG1vZGU6IFwiY29yc1wiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG5cdFx0fSk7XHRcdFxyXG5cdFx0XHRcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KHRoaXMsIHJlc3BvbnNlLm9rID8gU1RBVEVfU1VDQ0VTUyA6IFNUQVRFX0ZBSUwsIHJlc3BvbnNlKTtcdFx0XHJcblx0fVxyXG59O1xyXG5cclxuZGVmaW5lKERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb247XHJcbiIsImV4cG9ydCBjb25zdCBTVEFURV9TVUNDRVNTID0gXCJzdWNjZXNzXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRkFJTCA9IFwiZmFpbFwiO1xuXG5jbGFzcyBTdWJtaXRBY3Rpb25SZXN1bHQge1xuXG4gICAgc3RhdGljIGdldCBTVEFURV9TVUNDRVNTKCl7cmV0dXJuIFNUQVRFX1NVQ0NFU1M7fVxuICAgIHN0YXRpYyBnZXQgU1RBVEVfRkFJTCgpe3JldHVybiBTVEFURV9GQUlMO31cblxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbiwgc3RhdGUsIG1lc3NhZ2UsIGRhdGEpe1xuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfTsgICAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRBY3Rpb25SZXN1bHQ7IiwiaW1wb3J0IHsgU1BFQ0lBTFZBUlMsIE5PREVOQU1FX0xJU1RfUk9XIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IF92YWx1ZSB9IGZyb20gXCIuLi9CYXNlRmllbGRcIjtcclxuXHJcbi8qKlxyXG4qIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBvYmplY3RzIGFuZCByZXR1cm5zIG5ldyBvYmplY3QuIERvZXMgbm90IG1vZGlmeVxyXG4qIG9iamVjdHMgKGltbXV0YWJsZSkgYW5kIG1lcmdlcyBhcnJheXMgdmlhIGNvbmNhdGVuYXRpb24uXHJcbipcclxuKiBAcGFyYW0gey4uLm9iamVjdH0gb2JqZWN0cyAtIE9iamVjdHMgdG8gbWVyZ2VcclxuKiBAcmV0dXJucyB7b2JqZWN0fSBOZXcgb2JqZWN0IHdpdGggbWVyZ2VkIGtleS92YWx1ZXNcclxuKi9cclxuZnVuY3Rpb24gbWVyZ2VEZWVwKC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblx0XHJcblx0cmV0dXJuIG9iamVjdHMucmVkdWNlKChwcmV2LCBvYmopID0+IHtcclxuXHQgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdGNvbnN0IG9WYWwgPSBvYmpba2V5XTtcclxuXHRcdFxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHQgIHByZXZba2V5XSA9IG1lcmdlRGVlcChwVmFsLCBvVmFsKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBvVmFsO1xyXG5cdFx0fVxyXG5cdCAgfSk7XHJcblx0ICBcclxuXHQgIHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxuICB9XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZURhdGEgPSBhc3luYyAoZGF0YSwgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRpZiAoIW5vVmFsdWUodmFsdWUpKSB7XHJcblx0XHRpZiAobmFtZSkgdmFsdWVIZWxwZXIoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0ZWxzZSBkYXRhID0gbWVyZ2VEZWVwKGRhdGEsIHZhbHVlKTtcclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmllbGRWYWx1ZU1hcFRvT2JqZWN0ID0gYXN5bmMgKG1hcCwgZmllbGRPcmRlcikgPT4ge1x0XHJcblx0Ly9jb25zb2xlLmxvZyhcImZpZWxkVmFsdWVNYXBUb09iamVjdDogXCIsIG1hcCwgZmllbGRPcmRlcik7XHJcblx0bGV0IGRhdGEgPSB7fTtcclxuXHRpZiAoZmllbGRPcmRlcikge1xyXG5cdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRPcmRlcikge1xyXG5cdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBtYXAuZ2V0KGZpZWxkKTtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRmb3IgKGxldCBbeyBuYW1lIH0sIHZhbHVlXSBvZiBtYXApIHtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVidWlsZERhdGFCeUZpZWxkcyA9IGFzeW5jIChmaWVsZHMpID0+IHtcclxuXHRsZXQgZGF0YSA9IHt9O1xyXG5cdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBhd2FpdCBmaWVsZC52YWx1ZSgpO1xyXG5cdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBldmFsdWF0aW9uRGF0YSA9IGFzeW5jIChiYXNlKSA9PiB7XHJcblx0YXdhaXQgYmFzZS5yZWFkeTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0ZGF0YVtTUEVDSUFMVkFSUy5DVVJSRU5UVkFMVUVdID0gX3ZhbHVlKGJhc2UpO1xyXG5cclxuXHRsZXQgcm93ID0gYmFzZS5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdGxldCB0ZW1wID0gZGF0YTtcclxuXHR3aGlsZSAocm93KSB7XHJcblx0XHR0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXSA9IGF3YWl0IF92YWx1ZShyb3cpO1xyXG5cdFx0dGVtcCA9IHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddO1xyXG5cdFx0cm93ID0gcm93LnBhcmVudChOT0RFTkFNRV9MSVNUX1JPVyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IE5BTUVfU1BMSVRURVIgPSAvXFwuL2c7XHJcbmV4cG9ydCBjb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uIChkYXRhLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IG5hbWVzID0gbmFtZS5zcGxpdChOQU1FX1NQTElUVEVSKTtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gZ2V0VmFsdWUoZGF0YSwgbmFtZXMpO1xyXG5cclxuXHRjb25zdCBkZWwgPSBub1ZhbHVlKHZhbHVlKTtcclxuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiBkZWwpIHJldHVybiBkYXRhO1xyXG5cclxuXHRyZXR1cm4gc2V0VmFsdWUoZGVsLCBkYXRhLCB2YWx1ZSwgbmFtZXMpO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0VmFsdWUgPSAocmVtb3ZlLCBkYXRhLCB2YWx1ZSwgbmFtZXMpID0+IHtcclxuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiByZW1vdmUpIHJldHVybiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xyXG5cdGlmIChuYW1lcy5sZW5ndGggPT0gMCkge1xyXG5cdFx0aWYgKHJlbW92ZSkgZGVsZXRlIGRhdGFbbmFtZV07XHJcblx0XHRlbHNlIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZGF0YVtuYW1lXSA9IGRhdGFbbmFtZV0gfHwge307XHJcblx0XHRzZXRWYWx1ZShyZW1vdmUsIGRhdGFbbmFtZV0sIHZhbHVlLCBuYW1lcyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IGdldFZhbHVlID0gKGRhdGEsIG5hbWVzKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkpIHJldHVybiBudWxsO1xyXG5cdGlmIChuYW1lcy5sZW5ndGggPT0gMCkgcmV0dXJuIGRhdGE7XHJcblxyXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xyXG5cdHJldHVybiBnZXRWYWx1ZShkYXRhW25hbWVdLCBuYW1lcyk7XHJcbn07XHJcbiIsImltcG9ydCB7RVZFTlRIQU5ETEVfVElNRU9VVH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiXG5cbmV4cG9ydCBjb25zdCB0b0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFyZ3VtZW50cykuam9pbihcIiBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZUV2ZW50Q29weSA9IChldmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcbiAgICAgICAgY3VycmVudFRhcmdldDogZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgZXhwbGljaXRPcmlnaW5hbFRhcmdldDogZXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCxcbiAgICAgICAgb3JpZ2luYWxUYXJnZXQgOiBldmVudC5vcmlnaW5hbFRhcmdldCxcbiAgICAgICAgc3JjRWxlbWVudDogZXZlbnQuc3JjRWxlbWVudCxcbiAgICAgICAgdGltZVN0YW1wOiBldmVudC50aW1lU3RhbXBcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgdG9UaW1lb3V0SGFuZGxlID0gKGhhbmRsZSwgcHJldmVudERlZmF1bHQsIHN0b3BQcm9wYWdhdGlvbiwgdGltZW91dCkgPT4ge1xuICAgIGxldCBpZCA9IG51bGw7XG5cbiAgICBjb25zdCBwcmV2ZW50ID0gdHlwZW9mIHByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgPyBwcmV2ZW50RGVmYXVsdCA6ICgpID0+IHByZXZlbnREZWZhdWx0O1xuICAgIGNvbnN0IHN0b3AgPSB0eXBlb2Ygc3RvcFByb3BhZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIgPyBzdG9wUHJvcGFnYXRpb24gOiAoKSA9PiBzdG9wUHJvcGFnYXRpb247XG5cbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmKHByZXZlbnQoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYoc3RvcChldmVudCkpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBldmVudENvcHkgPSBtYWtlRXZlbnRDb3B5KGV2ZW50KTtcblxuICAgICAgICBpZihpZClcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWQgPSBudWxsO1xuICAgICAgICAgICAgaGFuZGxlKGV2ZW50Q29weSk7XG4gICAgICAgIH0sIHRpbWVvdXQgfHwgRVZFTlRIQU5ETEVfVElNRU9VVCk7XG5cbiAgICB9XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcblxuZXhwb3J0IGNvbnN0IHRyZWVGaWx0ZXIgPSAoeyByb290LCBmaWx0ZXIgfSkgPT4ge1xuXHRsZXQgZWxlbWVudHMgPSBbXTtcblx0cm9vdC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0Y29uc3QgeyBhY2NlcHQsIHN0b3AgPSBmYWxzZSB9ID0gZmlsdGVyKGVsZW1lbnQpO1xuXG5cdFx0aWYgKGFjY2VwdCkgZWxlbWVudHMucHVzaChlbGVtZW50KTtcblxuXHRcdGlmICghc3RvcCkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gdHJlZUZpbHRlcih7IHJvb3Q6IGVsZW1lbnQsIGZpbHRlciB9KTtcblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQocmVzdWx0KTtcblx0XHRcdGVsc2UgaWYgKHJlc3VsdCkgZWxlbWVudHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRGaWVsZHMgPSAocm9vdCkgPT4ge1xuXHRyZXR1cm4gdHJlZUZpbHRlcih7XG5cdFx0cm9vdCxcblx0XHRmaWx0ZXI6IChlbGVtZW50KSA9PiB7XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFZhbGlkYXRpb25zID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VGaWVsZCkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0XHRlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVmFsaWRhdGlvbikgcmV0dXJuIHsgYWNjZXB0OiB0cnVlLCBzdG9wOiB0cnVlIH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XG5cdFx0fSxcblx0fSk7XG59O1xuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxyXG5cdEFUVFJJQlVURV9BQ1RJVkUsIFxyXG5cdEFUVFJJQlVURV9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0lOVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXHJcblx0QVRUUklCVVRFX0VESVRBQkxFLCBBVFRSSUJVVEVfUkVBRE9OTFkgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZhbGlkU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCkgPT4ge1xyXG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcclxuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIFwiXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgXCJcIik7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xyXG5cdH1cclxuXHJcblx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ29uZGl0aW9uU3RhdGUgPSAodGFyZ2V0LCB2YWxpZCkgPT4ge1xyXG5cdGlmICh0eXBlb2YgdmFsaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsaWQgPT0gbnVsbCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIG51bGwpO1xyXG5cdH0gZWxzZSBpZiAodmFsaWQpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcIlwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFwiXCIpO1xyXG5cdH1cclxuXHJcblx0dGFyZ2V0LnRyaWdnZXIoRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFjdGl2ZVN0YXRlID0gKHRhcmdldCwgYWN0aXZlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcclxuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5hY3RpdmU7XHJcblx0YWN0aXZlID8gdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBudWxsKTtcclxuXHRpZiAob2xkU3RhdGUgIT0gYWN0aXZlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVSZWFkb25seVN0YXRlID0gKHRhcmdldCwgcmVhZG9ubHksIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnJlYWRvbmx5O1xyXG5cdGlmIChyZWFkb25seSkgXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xyXG5cdGVsc2VcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0XHJcblx0aWYgKG9sZFN0YXRlICE9IHJlYWRvbmx5IHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuZWRpdGFibGU7XHJcblx0aWYgKGVkaXRhYmxlKSBcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgXCJcIik7XHJcblx0ZWxzZVxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcclxuXHJcblx0aWYgKG9sZFN0YXRlICE9IGVkaXRhYmxlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59OyIsImV4cG9ydCBjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IGFzeW5jIChkYXRhLCBmaWVsZHMpID0+IHtcclxuICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoZmllbGRzLm1hcChmaWVsZCA9PiBmaWVsZC52YWxpZGF0ZShkYXRhKSkpKVxyXG4gICAgICAgIC5yZWR1Y2UoKHZhbGlkLCBmaWVsZFZhbGlkKSA9PiB2YWxpZCA/IGZpZWxkVmFsaWQ6IGZhbHNlLCB0cnVlKTtcclxufSIsImltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhSXNOb1ZhbHVlID0gKHZhbHVlKSA9PiB7ICAgIFxyXG4gICAgaWYobm9WYWx1ZSh2YWx1ZSkgKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcbiAgICBpZih0eXBlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgU2V0ICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgTWFwICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHR5cGUgPT0gXCJvYmplY3RcIiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBcclxuICAgIHJldHVybiBmYWxzZTtcclxufSIsImltcG9ydCB7IFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxyXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xyXG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xyXG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWVzID0gW107XHJcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBcblx0RVZFTlRfRklFTERfSU5QVVRcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcblxuY29uc3QgX3ZhbHVlID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJ2YWx1ZVwiKTtcblxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiZmlsZVwiXSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gKGZpbGUsIHJlYWRGbk5hbWUpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG5cdFx0XHRyZXNvbHZlKHtcblx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxuXHRcdFx0XHR0eXBlOiBmaWxlLnR5cGUsXG5cdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdFxuXHRcdFx0fSk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHJlYWRlcltyZWFkRm5OYW1lXShmaWxlKTtcblx0fSk7XG59O1xuXG4vL3JlYWRBc0RhdGFVUkxcblxuY29uc3QgRk9STUFUID0ge1xuXHRcImZvcm0taW5wdXRcIjogYXN5bmMgKGZpbGUpID0+IHtcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHJldHVybiBmaWxlO1xuXHR9LFxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZm9ybWF0ID0gXCJkYXRhLXVybC1iYXNlNjRcIjtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRcImJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUsIFwicmVhZEFzRGF0YVVSTFwiKTtcblx0XHRyZXN1bHQuZGF0YSA9IHJlc3VsdC5kYXRhLnN1YnN0cihyZXN1bHQuZGF0YS5pbmRleE9mKFwiLFwiKSArIDEpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNvbnN0IHJlYWRGaWxlcyA9IGFzeW5jIChmaWxlcywgZm9ybWF0LCBtdWx0aXBsZSkgPT4ge1xuXHRsZXQgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpXG5cdFx0cmVzdWx0LnB1c2goYXdhaXQgRk9STUFUW2Zvcm1hdF0oZmlsZSkpO1xuXG5cdGlmIChyZXN1bHQubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIG51bGw7XG5cblxuXHRyZXR1cm4gbXVsdGlwbGUgPyByZXN1bHQgOiByZXN1bHRbMF07XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFdyYXBwZXIge1xuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dC5tdWx0aXBsZTtcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gZmllbGQuYXR0cihcImZpbGUtbmFtZS10YXJnZXRcIik7XG5cdFx0dGhpcy5maWxlbmFtZVRhcmdldCA9IHRoaXMuZmlsZW5hbWVUYXJnZXQgPyBmaWVsZC5maW5kKHRoaXMuZmlsZW5hbWVUYXJnZXQpLmZpcnN0KCkgOiBudWxsO1xuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcblxuXHRcdGlucHV0Lm9uKFxuXHRcdFx0XCJpbnB1dFwiLFxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxuXHRcdFx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0cnVlXG5cdFx0XHQpXG5cdFx0KTtcblxuXHRcdGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlcy5sZW5ndGggIT0gMClcblx0XHRcdHRoaXMudXBkYXRlZFZhbHVlKGF3YWl0IHJlYWRGaWxlcyhpbnB1dC5maWxlcywgZm9ybWF0LCBtdWx0aXBsZSkpO1xuXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XG5cdH07XG5cblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XG5cdH1cblxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlICA9PT0gXCJvYmplY3RcIjtcblx0fVxuXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSBfdmFsdWUodGhpcyk7XG5cdFx0aWYgKHZhbHVlICE9IGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0X3ZhbHVlKHRoaXMsIHZhbHVlKVxuXHRcdFx0aWYoIXZhbHVlKVx0XHRcdFxuXHRcdFx0XHR0aGlzLmlucHV0LnZhbHVlID0gbnVsbDtcblxuXHRcdFx0Y29uc3QgZmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0O1xuXHRcdFx0aWYgKGZpbGVuYW1lKSB7XG5cdFx0XHRcdGZpbGVuYW1lLmVtcHR5KCk7XG5cdFx0XHRcdGlmKHZhbHVlKXtcblx0XHRcdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRmaWxlbmFtZS5hcHBlbmQoYDxzcGFuPiR7ZmlsZS5uYW1lfTwvc3Bhbj5gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblxuXHRnZXQgdmFsdWUoKSB7XG5cdFx0cmV0dXJuIF92YWx1ZSh0aGlzKTtcblx0fVxuXG5cdGdldCB2YWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnB1dC5jaGVja1ZhbGlkaXR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxyXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nO1xyXG5cclxuY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xyXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvIGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xyXG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gaW5wdXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZSArIGdldFJhbmRvbUludCgpO1xyXG5cdFx0Zm9yIChsZXQgcmFkaW8gb2YgaW5wdXQpIHJhZGlvLm5hbWUgPSBuYW1lO1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblxyXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xyXG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XHJcblx0XHRyZXR1cm4gdmFsdWUudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcclxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnc2VsZWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1x0XHRcclxuXHR9XHJcblxyXG5cdFxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dCwgY2hhbmdlZFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHJcblx0XHQvL2ZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMuaW5wdXQubXVsdGlwbGUgPyB0aGlzLmlucHV0LnZhbCgpIDogdGhpcy5pbnB1dC52YWx1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0aWYodGhpcy5pbnB1dC5tdWx0aXBsZSl7XHJcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoID4gMCk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1x0XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5pbnB1dC5tdWx0aXBsZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICB0aGlzLmlucHV0LnZhbCgpO1xyXG5cdFx0aWYgKHRoaXMuZmllbGQudmFsdWUgIT0gdGhpcy52YWx1ZSlcclxuXHRcdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IGN1cnJlbnRWYWx1ZSk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEVWRU5UX0ZJRUxEX0lOUFVULCBFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0Om5vdChbdHlwZT1cImZpbGVcIl0sW3R5cGU9XCJyYWRpb1wiXSxbdHlwZT1cImNoZWNrYm94XCJdLFt0eXBlPVwiYnV0dG9uXCJdLFt0eXBlPVwic3VibWl0XCJdLFt0eXBlPVwicmVzZXRcIl0pLGlucHV0Om5vdChbdHlwZV0pLCB0ZXh0YXJlYSc7XHJcblxyXG5jb25zdCBERUZBVUxUVFlQRSA9IFwidGV4dFwiO1xyXG5cclxuY29uc3QgdGV4dCA9IChpbnB1dCkgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiAoaW5wdXQudmFsdWUgPSB2YWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59O1xyXG5jb25zdCBudW1iZXIgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc051bWJlcjtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNOdW1iZXIgPSB2YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAoIW5vVmFsdWUodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IGRhdGV0aW1lID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aW5wdXQudmFsdWUgPSB2YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAodmFsdWUpIHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59O1xyXG5cclxuY29uc3QgZGF0ZSA9IChpbnB1dCkgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNEYXRlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IFRJTUVGT1JNQVQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImRlZmF1bHRcIiwgIHtcclxuICBob3VyOiBcIm51bWVyaWNcIixcclxuICBtaW51dGU6IFwibnVtZXJpY1wiXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHRpbWUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWUgPyBuZXcgRGF0ZShgMTk3MC0wMS0wMVQke2lucHV0LnZhbHVlfWApIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlID0gVElNRUZPUk1BVC5mb3JtYXQodmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGV0aW1lLCAgXCJkYXRldGltZS1sb2NhbGVcIjogZGF0ZXRpbWUsIGRhdGUsIHRpbWUsIHJhbmdlOiBudW1iZXIgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR0aGlzLnR5cGUgPSAoVFlQRVNbdHlwZV0gfHwgVFlQRVNbREVGQVVMVFRZUEVdKShpbnB1dCk7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5ub3JtYWxpemUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcclxuXHRcdGlmICh2YWx1ZSAhPSBjdXJyZW50VmFsdWUpIHRoaXMudHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSBcIi4uL0ZpZWxkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIHtcclxuXHRcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKXsgcmV0dXJuIG51bGw7fVxyXG5cdFxyXG5cdCNkZWZhdWx0VmFsdWU7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XHJcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7IH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KGRpc2FibGVkKSB7IH1cclxuXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbGlkKCl7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IFRleHQgZnJvbSBcIi4vVGV4dFwiO1xuaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL0NoZWNrYm94XCI7XG5pbXBvcnQgUmFkaW8gZnJvbSBcIi4vUmFkaW9cIjtcbmltcG9ydCBGaWxlIGZyb20gXCIuL0ZpbGVcIjtcbmltcG9ydCBTZWxlY3QgZnJvbSBcIi4vU2VsZWN0XCI7XG5cbmV4cG9ydCBjb25zdCB3cmFwcGVycyA9IFtUZXh0LCBDaGVja2JveCwgUmFkaW8sIEZpbGUsIFNlbGVjdF07XG5cbmV4cG9ydCBjb25zdCBmaW5kV3JhcHBlciA9IChmaWVsZCkgPT4ge1xuXHRmb3IgKGxldCB3cmFwcGVyIG9mIHdyYXBwZXJzKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSB3cmFwcGVyLmZpbmRJbnB1dChmaWVsZCk7XG5cdFx0aWYgKGlucHV0KSByZXR1cm4gbmV3IHdyYXBwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vc3JjL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IEZpZWxkIGZyb20gXCIuL3NyYy9GaWVsZFwiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9zcmMvQ29udGFpbmVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9zcmMvTGlzdFwiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vc3JjL1BhZ2VcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vc3JjL0Zvcm1cIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL3NyYy9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQgZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvU3VibWl0QWN0aW9uUmVzdWx0XCI7XG5cbmV4cG9ydCB7Rm9ybSwgUGFnZSwgQmFzZUZpZWxkLCBGaWVsZCwgTGlzdCwgQ29udGFpbmVyLCBCYXNlU3VibWl0QWN0aW9uLCBTdWJtaXRBY3Rpb25SZXN1bHR9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==