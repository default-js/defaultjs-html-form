/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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











/***/ }),

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
/* harmony import */ var _ExpressionResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");


const seekAtChain = (resolver, property) => {
	while(resolver){
		const def = resolver.proxy.handle.getPropertyDef(property, false);
		if(def)
			return def;
		
		resolver = resolver.parent;
	}	
	return { data: null, resolver: null, defined: false };
}

/**
 * cached proxy handle
 *
 * @class CachedProxyHandle
 * @typedef {CachedProxyHandle}
 */
class CachedProxyHandle {
	/**
	 * Creates an instance of Handle.
	 *
	 * @constructor
	 * @param {object} data
	 * @param {ExpressionResolver} resolver
	 */
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

/**
 * Context object to handle data access
 *
 * @export
 * @class Context
 * @typedef {Context}
 */
class Context {

	#handle = null;
	#data = null;

	/**
	 * Creates an instance of Context.
	 *
	 * @constructor
	 * @param {object} context
	 * @param {ExpressionResolver} resolver
	 */
	constructor(context, resolver) {
		this.#handle = new CachedProxyHandle(context, resolver);		
		this.#data = new Proxy(this.#handle, {
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
	
	get data(){
		return this.#data;
	}

	get handle(){
		return this.#handle;
	}

	/**
	 * update data
	 *
	 * @param {*} data
	 */
	updateData(data){
		this.#handle.updateData(data)		
	}
	
	/**
	 * reset cache
	 */
	resetCache(){
		this.#handle.resetCache();
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

const EXPRESSION_CACHE = new Map();

const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const toDefaultValue = (value) => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]) return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"](value);
};

const getOrCreateFunction = (aStatement) => {
	if(EXPRESSION_CACHE.has(aStatement))
		return EXPRESSION_CACHE.get(aStatement);

	const expression = new Function(
		"context",
		`
return (async (context) => {
	try{ 
		with(context){
			 return ${aStatement}
		}
	}catch(e){
		throw e;
	}
})(context);`,
	);

	EXPRESSION_CACHE.set(aStatement, expression);

	return expression;
}

const execute = async function (aStatement, aContext) {
	if (typeof aStatement !== "string") return aStatement;
	aStatement = normalize(aStatement);
	if (aStatement == null) return aStatement;

	try {
		const expression = getOrCreateFunction(aStatement);
		return await expression(aContext);
	} catch (e) {
		console.error(`Error by statement "${aStatement}":`, e)
	}
};

const resolve = async function (aResolver, aExpression, aFilter, aDefault) {
	if (aFilter && aResolver.name != aFilter) return aResolver.parent ? resolve(aResolver.parent, aExpression, aFilter, aDefault) : null;

	const result = await execute(aExpression, aResolver.proxy.data);
	if (result !== null && typeof result !== "undefined") return result;
	else if (aDefault instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"] && aDefault.hasValue) return aDefault.value;
};

const resolveMatch = async (resolver, match, defaultValue) => {
	if (match[MATCH_ESCAPED]) return match[MATCH_FULL_EXPRESSION];

	return resolve(resolver, match[MATCH_EXPRESSION_STATEMENT], normalize(match[MATCH_EXPRESSION_SCOPE]), defaultValue);
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
	 * Creates an instance of ExpressionResolver.
	 * @date 3/10/2024 - 7:27:57 PM
	 *
	 * @constructor
	 * @param {{ context?: any; parent?: any; name?: any; }} param0
	 * @param {object} [param0.context=GLOBAL]
	 * @param {ExpressionResolver} [param0.parent=null]
	 * @param {?string} [param0.name=null]
	 */
	constructor({ context = _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"], parent = null, name = null }) {
		this.parent = parent instanceof ExpressionResolver ? parent : null;
		this.name = name;
		this.context = context;
		this.proxy = new _Context_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.context, this);
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
		if (!this.context) return this.parent ? this.parent.effectiveChain : "";
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
		if (!key) return;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.getData(key, filter);
		} else {
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key, false);
			return property ? property.value : null;
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
			if (this.context == null || typeof this.context === "undefined") {
				this.context = {};
				this.proxy.updateData(this.context);
			}
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key);
			property.value = value;
			this.proxy.resetCache();
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
		} else {
			this.context = this.context ? _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].merge(this.context, context) : context;
		}
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
			const match = EXPRESSION.exec(aExpression);
			if (match) return await resolveMatch(this, match, defaultValue);
			else return await resolve(this, normalize(aExpression), null, defaultValue);
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
			const result = await resolveMatch(this, match, defaultValue);
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
		context = _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].filter({ data: context, propFilter, option });
		return new ExpressionResolver({ context, name, parent });
	}
}


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./node_modules/@default-js/defaultjs-extdom/src/index.js");


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/Global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/Global.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs || {};
_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom || {
	VERSION : "2.6.31",
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
/* harmony export */   createUUID: () => (/* binding */ createUUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper */ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js");




/*
const PRIVATE_READY = privatePropertyAccessor("ready");

const TIMEOUTS = new WeakMap();
const init = (component) => {
	let timeout = TIMEOUTS.get(component);
	if (timeout) clearTimeout(timeout);

	TIMEOUTS.get(component, setTimeout(async () => {
		TIMEOUTS.delete(component);
		const ready = PRIVATE_READY(component);
		try{
			await component.init();
			ready.resolve();
		}catch(e){
			console.error("Can't initialize component!", component, e);
			ready.resolve(e);
		}
		component.trigger(componentEventname("initialzed", component));
	}, initTimeout));	
};
*/

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
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__.uuid)()}${suffix ? suffix : ""}`;
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
			this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
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
			if (this.ready.resolved) this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
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
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.attributeChangeEventname)(name, this));
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.componentEventname)("change", this));
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
    return componentEventname(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node, separator);
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
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		//console.log("change readonly: ", {readonly, editable: this.editable, this: this});
		(0,_utils_StateHelper__WEBPACK_IMPORTED_MODULE_8__.updateReadonlyState)(this, !this.editable ?  true : readonly, !this.ready.resolved);

		this.readonlyUpdated();
	}

	async readonlyUpdated() {}

	get editable() {
		return this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE);
	}

	set editable(editable) {
		//console.log("change editable: ", editable, this);
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

		if (arguments.length == 0) return !condition || !valid ? null : currentValue;

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
			const current = wrapper.value || null;
			if(current != value)
				await wrapper.updatedValue(value);
			
			await super.updatedValue(wrapper.value);
		}
	}

	async validationStateChanged(conditionChange, validationChanged){		
		if(conditionChange && this.condition){			
			const wrapper = this.#wrapper;
			const value = wrapper.value || null;
			//console.log(`validationStateChanged(${this.name} (${conditionChange}, ${validationChanged}) -> ${value}`)
			this.rawValue(value);
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

const executeActions = async (actions, data, context) => {
	const results = [];
	for (let action of actions) {
		const accept = await action.accept(data);
		if (accept) {
			try {
				const result = (await action.execute(data, context)) || new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_SUCCESS, null, data, context);
				results.push(result);
				if (result.state == _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_FAIL) return results;
				if(typeof result.data !== "undefined" && result.data != null)
					data = result.data;
				if(typeof result.context !== "undefined" && result.data != context)
					data = result.data;
			} catch (e) {
				results.push(new _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__["default"](action, _submitActions_SubmitActionResult__WEBPACK_IMPORTED_MODULE_9__.STATE_FAIL, e));
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
		if (arguments.length == 0) return this.#data;

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

		actions = actions.concat(this.submitActions);
		if (actions) {
			const results = await executeActions(actions, formdata, context);
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_SUBMIT, formdata);

		const customSubmittedEvent = (this.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT) || "").trim();
		if (customSubmittedEvent.length > 0) this.trigger(customSubmittedEvent, formdata);

		this.state = this.hasAttribute(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? currentState : _Constants__WEBPACK_IMPORTED_MODULE_0__.FORMSTATE_FINISHED;
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
	 * Override this function!
	 */
	async execute(data = {}, context = {}) {
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__["default"](_SubmitActionResult__WEBPACK_IMPORTED_MODULE_2__.STATE_FAIL, "not implemented", null, data, context);
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

    constructor(action, state, message, data, context){
		this.action = action;
        this.state = state;
        this.message = message;
        this.data = data;
        this.context = context;
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

/***/ "./src/utils/MessageHelper.js":
/*!************************************!*\
  !*** ./src/utils/MessageHelper.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/utils/ValidationHelper.js":
/*!***************************************!*\
  !*** ./src/utils/ValidationHelper.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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




const INPUTSELECTOR = 'input[type="file"]';

const readFile = (file, readFnName) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener(
			"loadend",
			() => {
				resolve({
					name: file.name,
					type: file.type,
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

class File extends _Wrapper__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
			(0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_1__.toTimeoutHandle)(
				async () => {
					this.updatedValue(await readFiles(input.files, format, multiple));
					field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
				},
				false,
				true,
			),
		);
		if (input.files && input.files.length != 0) this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_FIELD_INPUT, this.value);
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseField: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.BaseField),
/* harmony export */   BaseSubmitAction: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.BaseSubmitAction),
/* harmony export */   Container: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.Container),
/* harmony export */   Field: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.Field),
/* harmony export */   Form: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.Form),
/* harmony export */   List: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.List),
/* harmony export */   Page: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.Page),
/* harmony export */   SubmitActionResult: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.SubmitActionResult)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./index.js");




_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html.form = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html.form || {
	VERSION: "2.6.31",
	Form: _index__WEBPACK_IMPORTED_MODULE_2__.Form,
	Page: _index__WEBPACK_IMPORTED_MODULE_2__.Page,
	BaseField: _index__WEBPACK_IMPORTED_MODULE_2__.BaseField,
	Field: _index__WEBPACK_IMPORTED_MODULE_2__.Field,
	Container: _index__WEBPACK_IMPORTED_MODULE_2__.Container,
	List: _index__WEBPACK_IMPORTED_MODULE_2__.List,
	BaseSubmitAction: _index__WEBPACK_IMPORTED_MODULE_2__.BaseSubmitAction,
	SubmitActionResult: _index__WEBPACK_IMPORTED_MODULE_2__.SubmitActionResult,
};



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1kZWZhdWx0anMtaHRtbC1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1I7QUFDUTtBQUNWO0FBQ0Q7QUFDQztBQUNzQztBQUNJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQK0I7O0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGMUY7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBLFVBQVU7QUFDVixFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkJBQTZCO0FBQ2pDLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksUUFBUSxpQkFBaUIsRUFBRTtBQUMvQixJQUFJLFFBQVEsaUJBQWlCLEVBQUU7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0R2QjtBQUNBLFdBQVcscUJBQU0seUJBQXlCLHFCQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7OztBQ1BOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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cUZBQU07QUFDOUIscUZBQU0sdUJBQXVCLHFGQUFNO0FBQ25DLGFBQWEsUUFBUTtBQUNyQixLQUFLO0FBQ0wsS0FBSztBQUNMLFVBQVU7QUFDVixNQUFNO0FBQ04sVUFBVTtBQUNWLEtBQUs7QUFDTCxpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25COztBQUUrRiIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Fc2NhcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvamF2YXNjcmlwdC9NYXAuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9qYXZhc2NyaXB0L1N0cmluZy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9Db250ZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0RlZmF1bHRWYWx1ZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0RvY3VtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0RvY3VtZW50RnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9FdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MSW5wdXRFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxTZWxlY3RFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxUZXh0QXJlYUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSHRtbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Ob2RlTGlzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9EYXRhU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0V2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1Nob3dIaWRlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvRGVsZWdhdGVyQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvdXRpbHMvRXZlbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQmFzZUZpZWxkLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQ29udGFpbmVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0ZpZWxkLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Zvcm1CdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9MaXN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Qcm9ncmVzc0Jhci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1N0ZXAuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvQmFja0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL05leHRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9TdWJtaXRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9TdW1tYXJ5QnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9oYW5kZWxzL0NvbmRpdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvRWRpdGFibGVIYW5kbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9oYW5kZWxzL01lc3NhZ2VIYW5kbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9oYW5kZWxzL1ZhbGlkYXRpb25IYW5kbGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L0FkZFJvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvRGVsZXRlUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9Sb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvd3MuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL0RlZmF1bHRGb3JtU3VibWl0QWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9EYXRhSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvRXZlbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9NZXNzYWdlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvTm9kZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL1N0YXRlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvVmFsaWRhdGlvbkhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9DaGVja2JveC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvRmlsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvUmFkaW8uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvVGV4dC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvV3JhcHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9icm93c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vc3JjL0Jhc2VGaWVsZFwiO1xuaW1wb3J0IEZpZWxkIGZyb20gXCIuL3NyYy9GaWVsZFwiO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9zcmMvQ29udGFpbmVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9zcmMvTGlzdFwiO1xuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vc3JjL1BhZ2VcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vc3JjL0Zvcm1cIjtcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuL3NyYy9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcbmltcG9ydCBTdWJtaXRBY3Rpb25SZXN1bHQgZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvU3VibWl0QWN0aW9uUmVzdWx0XCI7XG5cbmV4cG9ydCB7Rm9ybSwgUGFnZSwgQmFzZUZpZWxkLCBGaWVsZCwgTGlzdCwgQ29udGFpbmVyLCBCYXNlU3VibWl0QWN0aW9uLCBTdWJtaXRBY3Rpb25SZXN1bHR9OyIsImltcG9ydCB7IEdMT0JBTCwgT2JqZWN0VXRpbHMsIEVzY2FwZXIsIFZhbHVlSGVscGVyLCBQcm9taXNlVXRpbHMsIFByaXZhdGVQcm9wZXJ0eSwgVVVJRCB9IGZyb20gXCIuL3NyY1wiO1xuXG5leHBvcnQgeyBHTE9CQUwsIE9iamVjdFV0aWxzLCBFc2NhcGVyLCBWYWx1ZUhlbHBlciwgUHJvbWlzZVV0aWxzLCBQcml2YXRlUHJvcGVydHksIFVVSUQgfTtcbiIsIi8vIHJlcXVpcmVkIHRvIGJ1aWxkIHRoZSBpbnRlcm5hbCBlc2NhcGUgZmlsdGVyIGZvciByZWdleFxuY29uc3QgUkVHRVhDSEFSTUFQID0gW1wiXFxcXFwiLFwiP1wiLFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIihcIiwgXCIpXCIsIFwiLlwiLCBcIl5cIiwgXCIkXCJdXG5cdC5tYXAoY2hhciA9PiB7IFxuXHRcdHJldHVybiB7ZjogbmV3IFJlZ0V4cChcIlxcXFxcIiArY2hhciwgXCJnXCIpLCB2IDogXCJcXFxcXCIgKyBjaGFyfTtcblx0fSk7XG5cblxuY29uc3QgbWFwcGluZyA9IChhVGV4dCwgdGhlRmlsdGVycykgPT4ge1xuXHRsZXQgdGV4dCA9IGFUZXh0O1xuXHR0aGVGaWx0ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0dGV4dCA9IHRleHQucmVwbGFjZShpdGVtLmYsIGl0ZW0udik7XG5cdH0pO1xuXHRyZXR1cm4gdGV4dDtcbn07XG5cbmNvbnN0IGJ1aWxkVW5lc2NhcGVMaXN0ID0gKGFDaGFyTWFwLCBpc0Nhc2VTZW5zaXRpdikgPT4ge1xuXHRjb25zdCBvcHRpb24gPSBpc0Nhc2VTZW5zaXRpdiA/IFwibWdcIiA6IFwibWdpXCI7IFxuXHRyZXR1cm4gYUNoYXJNYXAubWFwKGl0ZW0gPT4ge1xuXHRcdGlmKCFpdGVtLmF0IHx8IGl0ZW0uYXQgPT0gXCJ1bmVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5lc2NhcGVkLCBSRUdFWENIQVJNQVApLCBvcHRpb24pLCB2OiBpdGVtLmNoYXJ9XG5cdH0pLmZpbHRlcihpdGVtID0+ICEhaXRlbSk7XG59O1xuXG5jb25zdCBidWlsZEVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcImVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5jaGFyLFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uZXNjYXBlZH1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5jbGFzcyBFc2NhcGVyIHtcblx0Y29uc3RydWN0b3IoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdil7XG5cdFx0dGhpcy5lc2NhcGVNYXAgPSBidWlsZEVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0XHR0aGlzLnVuZXNjYXBlTWFwID0gYnVpbGRVbmVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0fVxuXHRcblx0ZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHR1bmVzY2FwZShhVGV4dCl7XG5cdFx0cmV0dXJuIG1hcHBpbmcoYVRleHQsIHRoaXMudW5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHRzdGF0aWMgUkVHRVhQX0VTQ0FQRVIoKXtcblx0XHRyZXR1cm4gbmV3IEVzY2FwZXIoW1xuXHRcdFx0e2NoYXI6IFwiXFxcXFwiLCBlc2NhcGVkIDogXCJcXFxcXFxcXFwifSxcblx0XHRcdHtjaGFyOiBcIj9cIiwgZXNjYXBlZCA6IFwiXFxcXD9cIn0sXG5cdFx0XHR7Y2hhcjogXCJbXCIsIGVzY2FwZWQgOiBcIlxcXFxbXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXVwiLCBlc2NhcGVkIDogXCJcXFxcXVwifSxcblx0XHRcdHtjaGFyOiBcIntcIiwgZXNjYXBlZCA6IFwiXFxcXHtcIn0sXG5cdFx0XHR7Y2hhcjogXCJ9XCIsIGVzY2FwZWQgOiBcIlxcXFx9XCJ9LFxuXHRcdFx0e2NoYXI6IFwiKFwiLCBlc2NhcGVkIDogXCJcXFxcKFwifSxcblx0XHRcdHtjaGFyOiBcIilcIiwgZXNjYXBlZCA6IFwiXFxcXClcIn0sXG5cdFx0XHR7Y2hhcjogXCIuXCIsIGVzY2FwZWQgOiBcIlxcXFwuXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXlwiLCBlc2NhcGVkIDogXCJcXFxcXlwifSxcblx0XHRcdHtjaGFyOiBcIiRcIiwgZXNjYXBlZCA6IFwiXFxcXCRcIn1cblx0XHRdKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFc2NhcGVyO1xuXG4iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xyXG5cdGNvbnN0cnVjdG9yKGtleSwgY29udGV4dCl7XHJcblx0XHR0aGlzLmtleSA9IGtleTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0fVxyXG5cdFxyXG5cdGdldCBrZXlEZWZpbmVkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5rZXkgaW4gdGhpcy5jb250ZXh0OyBcclxuXHR9XHJcblx0XHJcblx0Z2V0IGhhc1ZhbHVlKCl7XHJcblx0XHRyZXR1cm4gISF0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRnZXQgdmFsdWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgdmFsdWUoZGF0YSl7XHJcblx0XHR0aGlzLmNvbnRleHRbdGhpcy5rZXldID0gZGF0YTtcclxuXHR9XHJcblx0XHJcblx0c2V0IGFwcGVuZChkYXRhKSB7XHJcblx0XHRpZighdGhpcy5oYXNWYWx1ZSlcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRcdHZhbHVlLnB1c2goZGF0YSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZW1vdmUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgbG9hZChkYXRhLCBrZXksIGNyZWF0ZT10cnVlKSB7XHJcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XHJcblx0XHRjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiXFwuXCIpO1xyXG5cdFx0bGV0IG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcclxuXHRcdFx0aWYoIWNvbnRleHRbbmFtZV0pe1xyXG5cdFx0XHRcdGlmKCFjcmVhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRjb250ZXh0W25hbWVdID0ge31cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Y29udGV4dCA9IGNvbnRleHRbbmFtZV07XHJcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xyXG5cdH1cclxufTsiLCJpbXBvcnQgT2JqZWN0UHJvcGVydHkgZnJvbSBcIi4vT2JqZWN0UHJvcGVydHkuanNcIjtcclxuXHJcbmNvbnN0IGVxdWFsQXJyYXlTZXQgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRjb25zdCBsZW5ndGggPSBhLmxlbmd0aDtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYVtpXSwgYltpXSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxNYXAgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBhLmtleXMoKSlcclxuXHRcdGlmICghZXF1YWxQb2pvKGEuZ2V0KGtleSksIGIuZ2V0KGtleSkpKSB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJmYWxzZVwiKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVxdWFsQ2xhc3NlcyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgY2xhenpBID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpO1xyXG5cdGNvbnN0IGNsYXp6QiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihiKTtcclxuXHRpZiAoY2xhenpBICE9IGNsYXp6QikgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRpZiAoIWNsYXp6QSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpBKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsYXp6Qik7XHJcblxyXG5cdGlmIChwcm9wZXJ0aWVzQS5sZW5ndGggIT09IHByb3BlcnRpZXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIHByb3BlcnRpZXNBKSB7XHJcblx0XHRjb25zdCB2YWx1ZUEgPSBhW2tleV07XHJcblx0XHRjb25zdCB2YWx1ZUIgPSBiW2tleV07XHJcblxyXG5cdFx0aWYgKCFlcXVhbFBvam8odmFsdWVBLCB2YWx1ZUIpKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxPYmplY3QgPSAoYSwgYikgPT4ge1xyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmtleXMoYSk7XHJcblx0Y29uc3QgcHJvcGVydGllc0IgPSBPYmplY3Qua2V5cyhiKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSAob2JqZWN0KSA9PiB7XHJcblx0cmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IHR5cGVvZiBvYmplY3QgPT09IFwidW5kZWZpbmVkXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNQcmltaXRpdmUgPSAob2JqZWN0KSA9PiB7XHJcblx0aWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XHJcblx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRjYXNlIFwibnVtYmVyXCI6XHJcblx0XHRjYXNlIFwiYmlnaW50XCI6XHJcblx0XHRjYXNlIFwiYm9vbGVhblwiOlxyXG5cdFx0Y2FzZSBcInN0cmluZ1wiOlxyXG5cdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IChvYmplY3QpID0+IHtcclxuXHRpZihpc051bGxPclVuZGVmaW5lZChvYmplY3QpKVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJiAoIW9iamVjdC5jb25zdHJ1Y3RvciB8fCBvYmplY3QuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogZXF1YWxQb2pvIC0+IGNvbXBhcmVzIG9ubHkgcG9qb3MsIGFycmF5LCBzZXQsIG1hcCBhbmQgcHJpbWl0aXZlc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVxdWFsUG9qbyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgbnVsbEEgPSBpc051bGxPclVuZGVmaW5lZChhKTtcclxuXHRjb25zdCBudWxsQiA9IGlzTnVsbE9yVW5kZWZpbmVkKGIpO1xyXG5cdGlmIChudWxsQSB8fCBudWxsQikgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGlmIChpc1ByaW1pdGl2ZShhKSB8fCBpc1ByaW1pdGl2ZShiKSkgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGNvbnN0IHR5cGVBID0gdHlwZW9mIGE7XHJcblx0Y29uc3QgdHlwZUIgPSB0eXBlb2YgYjtcclxuXHRpZiAodHlwZUEgIT0gdHlwZUIpIHJldHVybiBmYWxzZTtcclxuXHRpZiAodHlwZUEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGEgPT09IGI7XHJcblx0Ly9pZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBBcnJheSB8fCBhIGluc3RhbmNlb2YgU2V0KSByZXR1cm4gZXF1YWxBcnJheVNldChhLCBiKTtcclxuXHQvL2lmIChhIGluc3RhbmNlb2YgTWFwKSByZXR1cm4gZXF1YWxNYXAoYSwgYik7XHJcblxyXG5cdHJldHVybiBlcXVhbE9iamVjdChhLCBiKSAmJiBlcXVhbENsYXNzZXMoYSwgYik7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IChvYmplY3QpID0+IHtcclxuXHRpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHJldHVybiBmYWxzZTtcclxuXHJcblx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYgKCF0YXJnZXQpIHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzTnVsbE9yVW5kZWZpbmVkLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGVxdWFsUG9qbyxcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IG5ldyBXZWFrTWFwKCk7XHJcbmV4cG9ydCBjb25zdCBwcml2YXRlU3RvcmUgPSAob2JqKSA9PiB7XHJcblx0aWYoUFJJVkFURV9QUk9QRVJUSUVTLmhhcyhvYmopKVxyXG5cdFx0cmV0dXJuIFBSSVZBVEVfUFJPUEVSVElFUy5nZXQob2JqKTtcclxuXHRcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0UFJJVkFURV9QUk9QRVJUSUVTLnNldChvYmosIGRhdGEpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXZhdGVQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBkYXRhID0gcHJpdmF0ZVN0b3JlKG9iaik7XHJcblx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMilcclxuXHRcdHJldHVybiBkYXRhW25hbWVdO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcclxuXHRcdGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuXHRlbHNlXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYWxsb3dlZCBzaXplIG9mIGFyZ3VtZW50cyFcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgPSAodmFybmFtZSkgPT4ge1xyXG5cdHJldHVybiBmdW5jdGlvbihzZWxmLCB2YWx1ZSl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDIpXHJcblx0XHRcdHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lLCB2YWx1ZSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkoc2VsZiwgdmFybmFtZSk7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtwcml2YXRlUHJvcGVydHksIHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yLCBwcml2YXRlU3RvcmV9OyIsImltcG9ydCB7ZGVmVmFsdWUsIGRlZkdldH0gZnJvbSBcIi4vT2JqZWN0VXRpbHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVvdXRQcm9taXNlID0gKGZuLCBtcykgPT57XHJcblx0bGV0IGNhbmNlbGVkID0gZmFsc2U7XHJcblx0bGV0IHRpbWVvdXQgPSBudWxsO1xyXG5cdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCk9PiB7XHJcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRmbihyLGUpO1xyXG5cdFx0fSwgbXMpXHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHRoZW4gPSBwcm9taXNlLnRoZW47XHJcblx0cHJvbWlzZS50aGVuID0gKGZuKSA9PiB7XHJcblx0XHR0aGVuLmNhbGwocHJvbWlzZSwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZighdGhpcy5jYW5jZWxlZClcclxuXHRcdFx0XHRyZXR1cm4gZm4ocmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVmVmFsdWUocHJvbWlzZSwgXCJjYW5jZWxcIiwgKCkgPT4ge1xyXG5cdFx0aWYodGltZW91dCl7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0Y2FuY2VsZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGRlZkdldChwcm9taXNlLCBjYW5jZWxkLCAoKSA9PiBjYW5jZWxlZCk7XHJcblxyXG5cdHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxhenlQcm9taXNlID0gKCkgPT4ge1xyXG5cdFx0bGV0IHByb21pc2VSZXNvbHZlID0gbnVsbDtcclxuXHRcdGxldCBwcm9taXNlRXJyb3IgPSBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0XHRwcm9taXNlUmVzb2x2ZSA9IHI7XHJcblx0XHRcdHByb21pc2VFcnJvciA9IGU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdGxldCBlcnJvciA9IGZhbHNlO1xyXG5cdFx0bGV0IHZhbHVlID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGRlZlZhbHVlKHByb21pc2UsIFwicmVzb2x2ZVwiLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdHZhbHVlID0gcmVzdWx0O1xyXG5cdFx0XHRyZXNvbHZlZCA9IHRydWU7XHJcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRcdFx0ZXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdHByb21pc2VFcnJvcih2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJ2YWx1ZVwiLCAoKSA9PiB2YWx1ZSk7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJlcnJvclwiLCAoKSA9PiBlcnJvcik7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJyZXNvbHZlZFwiLCAoKSA9PiByZXNvbHZlZCk7XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2U7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRsYXp5UHJvbWlzZSxcclxuXHR0aW1lb3V0UHJvbWlzZVxyXG59XHJcbiIsIi8vdGhlIHNvbHV0aW9uIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkXHJcbmV4cG9ydCBjb25zdCBVVUlEX1NDSEVNQSA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpID0+IHtcclxuXHRjb25zdCBidWYgPSBuZXcgVWludDMyQXJyYXkoNCk7XHJcblx0d2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmKTtcclxuXHRsZXQgaWR4ID0gLTE7XHJcblx0cmV0dXJuIFVVSURfU0NIRU1BLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuXHRcdGlkeCsrO1xyXG5cdFx0Y29uc3QgciA9IChidWZbaWR4ID4+IDNdID4+ICgoaWR4ICUgOCkgKiA0KSkgJiAxNTtcclxuXHRcdGNvbnN0IHYgPSBjID09IFwieFwiID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgdXVpZCB9O1xyXG4iLCJleHBvcnQgY29uc3Qgbm9WYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuXHRyZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XG59O1xuXG5leHBvcnQgY29uc3QgZW10cHlPck5vVmFsdWVTdHJpbmcgPSAodmFsdWUpID0+IHtcdFxuXHRyZXR1cm4gbm9WYWx1ZSh2YWx1ZSkgfHwgdmFsdWUudHJpbSgpLmxlbmd0aCA9PSAwO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5vVmFsdWUsXG5cdGVtdHB5T3JOb1ZhbHVlU3RyaW5nXG59OyIsImltcG9ydCBcIi4vamF2YXNjcmlwdFwiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIi4vT2JqZWN0VXRpbHNcIjtcclxuaW1wb3J0IEdMT0JBTCBmcm9tIFwiLi9HbG9iYWxcIjtcclxuaW1wb3J0IEVzY2FwZXIgZnJvbSBcIi4vRXNjYXBlclwiO1xyXG5pbXBvcnQgVmFsdWVIZWxwZXIgZnJvbSBcIi4vVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IFByb21pc2VVdGlscyBmcm9tIFwiLi9Qcm9taXNlVXRpbHNcIjtcclxuaW1wb3J0IFByaXZhdGVQcm9wZXJ0eSBmcm9tIFwiLi9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IFVVSUQgZnJvbSBcIi4vVVVJRFwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRHTE9CQUwgLFxyXG5cdE9iamVjdFV0aWxzLFxyXG5cdEVzY2FwZXIsXHJcblx0VmFsdWVIZWxwZXIsXHJcblx0UHJvbWlzZVV0aWxzLFxyXG5cdFByaXZhdGVQcm9wZXJ0eSxcclxuXHRVVUlEXHJcbn07IiwiaWYgKCFNYXAucHJvdG90eXBlLnRvT2JqZWN0KVxyXG5cdE1hcC5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBvYmplY3QgPSB7fTtcclxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSBvYmplY3Rba2V5XSA9IHZhbHVlIGluc3RhbmNlb2YgTWFwID8gdmFsdWUudG9PYmplY3QoKSA6IHZhbHVlO1xyXG5cclxuXHRcdHJldHVybiBvYmplY3Q7XHJcblx0fTtcclxuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLmhhc2hjb2RlKVxyXG5cdFN0cmluZy5wcm90b3R5cGUuaGFzaGNvZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcclxuXHRcdGxldCBoYXNoID0gMDtcclxuXHRcdGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBjID0gdGhpcy5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjO1xyXG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc2g7XHJcblx0fTsiLCJpbXBvcnQgXCIuL1N0cmluZy5qc1wiO1xyXG5pbXBvcnQgXCIuL01hcC5qc1wiOyIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIi4vc3JjL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vc3JjL0NvbnRleHRcIjtcblxuZXhwb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyLCBDb250ZXh0IH07XG4iLCJpbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCIuL0V4cHJlc3Npb25SZXNvbHZlclwiO1xuXG5jb25zdCBzZWVrQXRDaGFpbiA9IChyZXNvbHZlciwgcHJvcGVydHkpID0+IHtcblx0d2hpbGUocmVzb2x2ZXIpe1xuXHRcdGNvbnN0IGRlZiA9IHJlc29sdmVyLnByb3h5LmhhbmRsZS5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSwgZmFsc2UpO1xuXHRcdGlmKGRlZilcblx0XHRcdHJldHVybiBkZWY7XG5cdFx0XG5cdFx0cmVzb2x2ZXIgPSByZXNvbHZlci5wYXJlbnQ7XG5cdH1cdFxuXHRyZXR1cm4geyBkYXRhOiBudWxsLCByZXNvbHZlcjogbnVsbCwgZGVmaW5lZDogZmFsc2UgfTtcbn1cblxuLyoqXG4gKiBjYWNoZWQgcHJveHkgaGFuZGxlXG4gKlxuICogQGNsYXNzIENhY2hlZFByb3h5SGFuZGxlXG4gKiBAdHlwZWRlZiB7Q2FjaGVkUHJveHlIYW5kbGV9XG4gKi9cbmNsYXNzIENhY2hlZFByb3h5SGFuZGxlIHtcblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSGFuZGxlLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGFcblx0ICogQHBhcmFtIHtFeHByZXNzaW9uUmVzb2x2ZXJ9IHJlc29sdmVyXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG4vKipcbiAqIENvbnRleHQgb2JqZWN0IHRvIGhhbmRsZSBkYXRhIGFjY2Vzc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDb250ZXh0XG4gKiBAdHlwZWRlZiB7Q29udGV4dH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCB7XG5cblx0I2hhbmRsZSA9IG51bGw7XG5cdCNkYXRhID0gbnVsbDtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb250ZXh0LlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcblx0ICogQHBhcmFtIHtFeHByZXNzaW9uUmVzb2x2ZXJ9IHJlc29sdmVyXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0LCByZXNvbHZlcikge1xuXHRcdHRoaXMuI2hhbmRsZSA9IG5ldyBDYWNoZWRQcm94eUhhbmRsZShjb250ZXh0LCByZXNvbHZlcik7XHRcdFxuXHRcdHRoaXMuI2RhdGEgPSBuZXcgUHJveHkodGhpcy4jaGFuZGxlLCB7XG5cdFx0XHRoYXM6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmhhc1Byb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmdldFByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5LCB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbihkYXRhLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YS5kZWxldGVQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHR9XG5cdFx0XHQvL0BUT0RPIG5lZWQgdG8gc3VwcG9ydCB0aGUgb3RoZXIgcHJveHkgYWN0aW9uc1x0XHRcblx0XHR9KTs7XG5cdH1cblx0XG5cdGdldCBkYXRhKCl7XG5cdFx0cmV0dXJuIHRoaXMuI2RhdGE7XG5cdH1cblxuXHRnZXQgaGFuZGxlKCl7XG5cdFx0cmV0dXJuIHRoaXMuI2hhbmRsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiB1cGRhdGUgZGF0YVxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IGRhdGFcblx0ICovXG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy4jaGFuZGxlLnVwZGF0ZURhdGEoZGF0YSlcdFx0XG5cdH1cblx0XG5cdC8qKlxuXHQgKiByZXNldCBjYWNoZVxuXHQgKi9cblx0cmVzZXRDYWNoZSgpe1xuXHRcdHRoaXMuI2hhbmRsZS5yZXNldENhY2hlKCk7XG5cdH1cbn07IiwiLyoqXG4gKiBvYmplY3QgZm9yIGRlZmF1bHQgdmFsdWVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgRGVmYXVsdFZhbHVlXG4gKiBAdHlwZWRlZiB7RGVmYXVsdFZhbHVlfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZhdWx0VmFsdWUge1xuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEZWZhdWx0VmFsdWUuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSl7XG5cdFx0dGhpcy5oYXNWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cdFxufTsiLCJpbXBvcnQgR0xPQkFMIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanNcIjtcclxuaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzXCI7XHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcbmNvbnN0IEVYRUNVVElPTl9XQVJOX1RJTUVPVVQgPSAxMDAwO1xyXG5jb25zdCBFWFBSRVNTSU9OID0gLyhcXFxcPykoXFwkXFx7KChbYS16QS1aMC05XFwtX1xcc10rKTo6KT8oW15cXHtcXH1dKylcXH0pLztcclxuY29uc3QgTUFUQ0hfRVNDQVBFRCA9IDE7XHJcbmNvbnN0IE1BVENIX0ZVTExfRVhQUkVTU0lPTiA9IDI7XHJcbmNvbnN0IE1BVENIX0VYUFJFU1NJT05fU0NPUEUgPSA0O1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVCA9IDU7XHJcblxyXG5jb25zdCBFWFBSRVNTSU9OX0NBQ0hFID0gbmV3IE1hcCgpO1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSAodmFsdWUpID0+IHtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUpIHJldHVybiB2YWx1ZTtcclxuXHJcblx0cmV0dXJuIG5ldyBEZWZhdWx0VmFsdWUodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0T3JDcmVhdGVGdW5jdGlvbiA9IChhU3RhdGVtZW50KSA9PiB7XHJcblx0aWYoRVhQUkVTU0lPTl9DQUNIRS5oYXMoYVN0YXRlbWVudCkpXHJcblx0XHRyZXR1cm4gRVhQUkVTU0lPTl9DQUNIRS5nZXQoYVN0YXRlbWVudCk7XHJcblxyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgRnVuY3Rpb24oXHJcblx0XHRcImNvbnRleHRcIixcclxuXHRcdGBcclxucmV0dXJuIChhc3luYyAoY29udGV4dCkgPT4ge1xyXG5cdHRyeXsgXHJcblx0XHR3aXRoKGNvbnRleHQpe1xyXG5cdFx0XHQgcmV0dXJuICR7YVN0YXRlbWVudH1cclxuXHRcdH1cclxuXHR9Y2F0Y2goZSl7XHJcblx0XHR0aHJvdyBlO1xyXG5cdH1cclxufSkoY29udGV4dCk7YCxcclxuXHQpO1xyXG5cclxuXHRFWFBSRVNTSU9OX0NBQ0hFLnNldChhU3RhdGVtZW50LCBleHByZXNzaW9uKTtcclxuXHJcblx0cmV0dXJuIGV4cHJlc3Npb247XHJcbn1cclxuXHJcbmNvbnN0IGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiAoYVN0YXRlbWVudCwgYUNvbnRleHQpIHtcclxuXHRpZiAodHlwZW9mIGFTdGF0ZW1lbnQgIT09IFwic3RyaW5nXCIpIHJldHVybiBhU3RhdGVtZW50O1xyXG5cdGFTdGF0ZW1lbnQgPSBub3JtYWxpemUoYVN0YXRlbWVudCk7XHJcblx0aWYgKGFTdGF0ZW1lbnQgPT0gbnVsbCkgcmV0dXJuIGFTdGF0ZW1lbnQ7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBleHByZXNzaW9uID0gZ2V0T3JDcmVhdGVGdW5jdGlvbihhU3RhdGVtZW50KTtcclxuXHRcdHJldHVybiBhd2FpdCBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBieSBzdGF0ZW1lbnQgXCIke2FTdGF0ZW1lbnR9XCI6YCwgZSlcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlID0gYXN5bmMgZnVuY3Rpb24gKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcikgcmV0dXJuIGFSZXNvbHZlci5wYXJlbnQgPyByZXNvbHZlKGFSZXNvbHZlci5wYXJlbnQsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkgOiBudWxsO1xyXG5cclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gcmVzdWx0O1xyXG5cdGVsc2UgaWYgKGFEZWZhdWx0IGluc3RhbmNlb2YgRGVmYXVsdFZhbHVlICYmIGFEZWZhdWx0Lmhhc1ZhbHVlKSByZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWF0Y2ggPSBhc3luYyAocmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZiAobWF0Y2hbTUFUQ0hfRVNDQVBFRF0pIHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dO1xyXG5cclxuXHRyZXR1cm4gcmVzb2x2ZShyZXNvbHZlciwgbWF0Y2hbTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlRdLCBub3JtYWxpemUobWF0Y2hbTUFUQ0hfRVhQUkVTU0lPTl9TQ09QRV0pLCBkZWZhdWx0VmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplID0gKHZhbHVlKSA9PiB7XHJcblx0aWYgKHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuXHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPT0gMCA/IG51bGwgOiB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhwcmVzc2lvblJlc29sdmVyXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEV4cHJlc3Npb25SZXNvbHZlclxyXG4gKiBAdHlwZWRlZiB7RXhwcmVzc2lvblJlc29sdmVyfVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV4cHJlc3Npb25SZXNvbHZlci5cclxuXHQgKiBAZGF0ZSAzLzEwLzIwMjQgLSA3OjI3OjU3IFBNXHJcblx0ICpcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge3sgY29udGV4dD86IGFueTsgcGFyZW50PzogYW55OyBuYW1lPzogYW55OyB9fSBwYXJhbTBcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtMC5jb250ZXh0PUdMT0JBTF1cclxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gW3BhcmFtMC5wYXJlbnQ9bnVsbF1cclxuXHQgKiBAcGFyYW0gez9zdHJpbmd9IFtwYXJhbTAubmFtZT1udWxsXVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHsgY29udGV4dCA9IEdMT0JBTCwgcGFyZW50ID0gbnVsbCwgbmFtZSA9IG51bGwgfSkge1xyXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQgaW5zdGFuY2VvZiBFeHByZXNzaW9uUmVzb2x2ZXIgPyBwYXJlbnQgOiBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0XHR0aGlzLnByb3h5ID0gbmV3IENvbnRleHQodGhpcy5jb250ZXh0LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBjaGFpbiBwYXRoXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBjaGFpbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBlZmZlY3RpdmUgY2hhaW4gcGF0aFxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKi9cclxuXHRnZXQgZWZmZWN0aXZlQ2hhaW4oKSB7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gOiBcIlwiO1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZWZmZWN0aXZlQ2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGNvbnRleHQgY2hhaW5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEByZXR1cm5zIHtDb250ZXh0W119XHJcblx0ICovXHJcblx0Z2V0IGNvbnRleHRDaGFpbigpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0bGV0IHJlc29sdmVyID0gdGhpcztcclxuXHRcdHdoaWxlIChyZXNvbHZlcikge1xyXG5cdFx0XHRpZiAocmVzb2x2ZXIuY29udGV4dCkgcmVzdWx0LnB1c2gocmVzb2x2ZXIuY29udGV4dCk7XHJcblxyXG5cdFx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGRhdGEgZnJvbSBjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcblx0ICogQHBhcmFtIHs/c3RyaW5nfSBmaWx0ZXJcclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKi9cclxuXHRnZXREYXRhKGtleSwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIWtleSkgcmV0dXJuO1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5nZXREYXRhKGtleSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZCh0aGlzLmNvbnRleHQsIGtleSwgZmFsc2UpO1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkgPyBwcm9wZXJ0eS52YWx1ZSA6IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiB1cGRhdGUgZGF0YSBhdCBjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICovXHJcblx0dXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KSByZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50LnVwZGF0ZURhdGEoa2V5LCB2YWx1ZSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRleHQgPT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5jb250ZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0ge307XHJcblx0XHRcdFx0dGhpcy5wcm94eS51cGRhdGVEYXRhKHRoaXMuY29udGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5KTtcclxuXHRcdFx0cHJvcGVydHkudmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5wcm94eS5yZXNldENhY2hlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBtZXJnZSBjb250ZXh0IG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcclxuXHQgKiBAcGFyYW0gez9zdHJpbmd9IGZpbHRlclxyXG5cdCAqL1xyXG5cdG1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpIHtcclxuXHRcdGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50Lm1lcmdlQ29udGV4dChjb250ZXh0LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0ID8gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5jb250ZXh0LCBjb250ZXh0KSA6IGNvbnRleHQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlZCBhbiBleHByZXNzaW9uIHN0cmluZyB0byBkYXRhXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez8qfSBhRGVmYXVsdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFEZWZhdWx0KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWMoYUV4cHJlc3Npb24pO1xyXG5cdFx0XHRpZiAobWF0Y2gpIHJldHVybiBhd2FpdCByZXNvbHZlTWF0Y2godGhpcywgbWF0Y2gsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHRcdGVsc2UgcmV0dXJuIGF3YWl0IHJlc29sdmUodGhpcywgbm9ybWFsaXplKGFFeHByZXNzaW9uKSwgbnVsbCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3IgYXQgZXhlY3V0aW5nIHN0YXRtZW50XCInLCBhRXhwcmVzc2lvbiwgJ1wiOicsIGUpO1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlLmhhc1ZhbHVlID8gZGVmYXVsdFZhbHVlLnZhbHVlIDogYUV4cHJlc3Npb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXBsYWNlIGFsbCBleHByZXNzaW9ucyBhdCBhIHN0cmluZ1x0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVRleHRcclxuXHQgKiBAcGFyYW0gez8qfSBhRGVmYXVsdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhRGVmYXVsdCkge1xyXG5cdFx0bGV0IHRleHQgPSBhVGV4dDtcclxuXHRcdGxldCB0ZW1wID0gYVRleHQ7IC8vIHJlcXVpcmVkIHRvIHByZXZlbnQgaW5maW5pdHkgbG9vcFxyXG5cdFx0bGV0IG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRleHQpO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0dGVtcCA9IHRlbXAuc3BsaXQobWF0Y2hbMF0pLmpvaW4oKTsgLy8gcmVtb3ZlIGN1cnJlbnQgbWF0Y2ggZm9yIG5leHQgbG9vcFxyXG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChtYXRjaFswXSkuam9pbih0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IHJlc3VsdCA9PSBudWxsID8gXCJudWxsXCIgOiByZXN1bHQpO1xyXG5cdFx0XHRtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZW1wKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVzb2x2ZSBhbiBleHByZXNzaW9uIHN0cmluZyB0byBkYXRhXHJcblx0ICpcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFFeHByZXNzaW9uXHJcblx0ICogQHBhcmFtIHs/b2JqZWN0fSBhQ29udGV4dFxyXG5cdCAqIEBwYXJhbSB7Pyp9IGFEZWZhdWx0XHJcblx0ICogQHBhcmFtIHs/bnVtYmVyfSBhVGltZW91dFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlKGFFeHByZXNzaW9uLCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKSk7XHJcblx0XHRcdFx0fSwgYVRpbWVvdXQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShhRXhwcmVzc2lvbiwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHJlcGxhY2UgZXhwcmVzc2lvbiBhdCB0ZXh0XHJcblx0ICpcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFUZXh0XHJcblx0ICogQHBhcmFtIHs/b2JqZWN0fSBhQ29udGV4dFxyXG5cdCAqIEBwYXJhbSB7Pyp9IGFEZWZhdWx0XHJcblx0ICogQHBhcmFtIHs/bnVtYmVyfSBhVGltZW91dFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlVGV4dChhVGV4dCwgZGVmYXVsdFZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGJ1aWxkIGEgc2VjdXJlIGNvbnRleHQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAc3RhdGljXHJcblx0IFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBhcmdcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gYXJnLmNvbnRleHRcclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhcmcucHJvcEZpbHRlclxyXG5cdCAqIEBwYXJhbSB7eyBkZWVwOiBib29sZWFuOyB9fSBbYXJnLm9wdGlvbj17IGRlZXA6IHRydWUgfV1cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXJnLm5hbWVcclxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gYXJnLnBhcmVudFxyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9XHJcblx0ICovXHJcblx0c3RhdGljIGJ1aWxkU2VjdXJlKHsgY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9uID0geyBkZWVwOiB0cnVlIH0sIG5hbWUsIHBhcmVudCB9KSB7XHJcblx0XHRjb250ZXh0ID0gT2JqZWN0VXRpbHMuZmlsdGVyKHsgZGF0YTogY29udGV4dCwgcHJvcEZpbHRlciwgb3B0aW9uIH0pO1xyXG5cdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0LCBuYW1lLCBwYXJlbnQgfSk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7IiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzL1V0aWxzXCI7XHJcblxyXG5VdGlscy5nbG9iYWwuZGVmYXVsdGpzID0gVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcyB8fCB7fTtcclxuVXRpbHMuZ2xvYmFsLmRlZmF1bHRqcy5leHRkb20gPSBVdGlscy5nbG9iYWwuZGVmYXVsdGpzLmV4dGRvbSB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdHV0aWxzIDoge1xyXG5cdFx0VXRpbHM6IFV0aWxzXHJcblx0fVxyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLmZpbmQgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQuZmluZC5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5yZWFkeSA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5yZWFkeS5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5jcmVhdGUgPSBmdW5jdGlvbihhQ29udGVudCwgYXNUZW1wbGF0ZSkge1xyXG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdICE9PSBcInN0cmluZ1wiKVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmchXCIpO1xyXG5cdFxyXG5cdGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG5cdHRlbXBsYXRlLmlubmVySFRNTCA9IGFDb250ZW50O1xyXG5cdGlmKGFzVGVtcGxhdGUpXHJcblx0XHRyZXR1cm4gdGVtcGxhdGU7XHJcblx0XHJcblx0cmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSkuY2hpbGROb2RlcztcclxufTtcclxuXHJcblV0aWxzLmdsb2JhbC5zY3JpcHQgPSBmdW5jdGlvbihhRmlsZSwgYVRhcmdldCkge1xyXG5cdGlmKGFGaWxlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoYUZpbGUubWFwKGZpbGUgPT4gVXRpbHMuZ2xvYmFsLnNjcmlwdChmaWxlLCBhVGFyZ2V0KSkpO1xyXG5cdFxyXG5cdGlmKHR5cGVvZiBhRmlsZSA9PT0gXCJzdHJpbmdcIilcdFxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyLGUpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7cigpfTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImxvYWQgZXJyb3IhXCIpfTtcclxuXHRcdFx0IWFUYXJnZXQgPyBkb2N1bWVudC5ib2R5LmFwcGVuZChzY3JpcHQpIDogYVRhcmdldC5hcHBlbmQoc2NyaXB0KTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IGFGaWxlO1xyXG5cdFx0fSk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwiRmlyc3QgcGFyYW1ldGVyIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBhIHN0cmluZyFcIik7XHJcbn07IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IFJlYWR5RXZlbnRTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudCwgUXVlcnlTdXBwb3J0LCBSZWFkeUV2ZW50U3VwcG9ydCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb2N1bWVudC50cmlnZ2VyKFwicmVhZHlcIikpO1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudEZyYWdtZW50LCBRdWVyeVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpO1xyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IEF0dHJpYnV0ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEVsZW1lbnQsUXVlcnlTdXBwb3J0LCBBdHRyaWJ1dGVTdXBwb3J0LCBNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcbmltcG9ydCBFdmVudFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnRcIjtcblxuZXh0ZW5kUHJvdG90eXBlKEV2ZW50VGFyZ2V0LCBFdmVudFN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgSHRtbENsYXNzU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnRcIjtcclxuaW1wb3J0IFNob3dIaWRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1Nob3dIaWRlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MRWxlbWVudCwgSHRtbENsYXNzU3VwcG9ydCwgU2hvd0hpZGVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MSW5wdXRFbGVtZW50LFZhbHVlU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTFNlbGVjdEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MVGV4dEFyZWFFbGVtZW50LEV4dGVuZGVyKFwiVmFsdWVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gYXJndW1lbnRzWzBdXHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcdFxyXG59KSk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XHJcbmltcG9ydCBMaXN0U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTENvbGxlY3Rpb24sIExpc3RTdXBwb3J0KTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxpbmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBjYWxsaW5nID09PSBcImZ1bmN0aW9uXCI7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IG5vZGUgPSB0aGlzW2ldO1xyXG5cdFx0bGV0XHRyZXN1bHQ7XHJcblx0XHRpZihpc0Z1bmN0aW9uKVxyXG5cdFx0XHRyZXN1bHQgPSBjYWxsaW5nLmFwcGx5KFtub2RlXS5jb25jYXQoYXJncykpO1xyXG5cdFx0ZWxzZSBpZih0eXBlb2Ygbm9kZVtjYWxsaW5nXSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRyZXN1bHQgPSBub2RlW2NhbGxpbmddLmFwcGx5KG5vZGUsIGFyZ3MpO1xyXG5cdFx0XHJcblx0XHRpZihyZXN1bHQpXHJcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0aWYodHlwZW9mIG5vZGUudmFsID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlLnZhbCgpO1xyXG5cdFx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHRcdHJlc3VsdC5zZXQoKG5vZGUubmFtZSB8fCBub2RlLmlkIHx8IG5vZGUuc2VsZWN0b3IoKSksIG5vZGUudmFsKCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9XHJcblx0ZWxzZVxyXG5cdFx0SFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmFwcGx5VG8uYXBwbHkodGhpcywgW1widmFsXCJdLmNvbmNhdChBcnJheS5mcm9tKGFyZ3VtZW50cykpKTtcclxufTtcclxuXHJcbkhUTUxDb2xsZWN0aW9uLmZyb20gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGxldCBjb3VudGVyID0gMDtcclxuXHRcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0aWYodHlwZW9mIGFyZyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcmcgIT0gbnVsbCl7XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG5cdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0ZWxzZSBpZihhcmcgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbiB8fCBhcmcgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBhcmcgaW5zdGFuY2VvZiBBcnJheSl7XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRpZihhcmdbaV0gJiYgYXJnW2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe1xyXG5cdFx0XHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZ1tpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGRhdGEubGVuZ3RoID0ge3ZhbHVlOiBjb3VudGVyfTtcclxuXHRyZXR1cm4gIE9iamVjdC5jcmVhdGUoSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLCBkYXRhKTtcclxufTtcclxuXHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xyXG5cdGxldCByZXN1bHRzID0gW107XHRcclxuXHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRpZihub2RlICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xyXG5cdFx0XHRpZihyZXN1bHQpeyBcclxuXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcclxuXHRcdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChBcnJheS5mcm9tKHJlc3VsdCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdGlmKHJlc3VsdHMubGVuZ3RoID09PSAwKVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRlbHNlIGlmKHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCByZXN1bHRzWzBdIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pXHJcblx0XHRyZXR1cm4gSFRNTENvbGxlY3Rpb24uZnJvbS5hcHBseShudWxsLCByZXN1bHRzKTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxufSxIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUsIE5vZGUucHJvdG90eXBlLCBIVE1MRWxlbWVudC5wcm90b3R5cGUsIEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlLCBFbGVtZW50LnByb3RvdHlwZSwgRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEYXRhU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0RhdGFTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKE5vZGUsRGF0YVN1cHBvcnQsTWFuaXB1bGF0aW9uU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XHJcbmltcG9ydCBMaXN0U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZUxpc3QsIExpc3RTdXBwb3J0KTtcclxuXHJcbk5vZGVMaXN0LnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxpbmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBjYWxsaW5nID09PSBcImZ1bmN0aW9uXCI7XHJcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IG5vZGUgPSB0aGlzW2ldO1xyXG5cdFx0bGV0XHRyZXN1bHQ7XHJcblx0XHRpZihpc0Z1bmN0aW9uKVxyXG5cdFx0XHRyZXN1bHQgPSBjYWxsaW5nLmFwcGx5KFtub2RlXS5jb25jYXQoYXJncykpO1xyXG5cdFx0ZWxzZSBpZih0eXBlb2Ygbm9kZVtjYWxsaW5nXSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRyZXN1bHQgPSBub2RlW2NhbGxpbmddLmFwcGx5KG5vZGUsIGFyZ3MpO1xyXG5cdFx0XHJcblx0XHRpZihyZXN1bHQpXHJcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbk5vZGVMaXN0LnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0aWYodHlwZW9mIG5vZGUudmFsID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlLnZhbCgpO1xyXG5cdFx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHRcdHJlc3VsdC5zZXQoKG5vZGUubmFtZSB8fCBub2RlLmlkIHx8IG5vZGUuc2VsZWN0b3IoKSksIG5vZGUudmFsKCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9XHJcblx0ZWxzZVxyXG5cdFx0Tm9kZUxpc3QucHJvdG90eXBlLmFwcGx5VG8uYXBwbHkodGhpcywgW1widmFsXCJdLmNvbmNhdChBcnJheS5mcm9tKGFyZ3VtZW50cykpKTtcclxufTtcclxuXHJcbk5vZGVMaXN0LmZyb20gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGxldCBjb3VudGVyID0gMDtcclxuXHRcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0aWYodHlwZW9mIGFyZyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcmcgIT0gbnVsbCl7XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmcsIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRlbHNlIGlmKGFyZyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGFyZyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IGFyZyBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmKGFyZ1tpXSAmJiBhcmdbaV0gaW5zdGFuY2VvZiBOb2RlKXtcclxuXHRcdFx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmdbaV0sIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRkYXRhLmxlbmd0aCA9IHt2YWx1ZTogY291bnRlcn07XHJcblx0cmV0dXJuICBPYmplY3QuY3JlYXRlKE5vZGVMaXN0LnByb3RvdHlwZSwgZGF0YSk7XHJcbn07XHJcblxyXG5cclxuRGVsZWdhdGVyQnVpbGRlcihmdW5jdGlvbihhRnVuY3Rpb25OYW1lLCB0aGVBcmd1bWVudHMpIHtcclxuXHRsZXQgcmVzdWx0cyA9IFtdO1x0XHJcblx0dGhpcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0aWYobm9kZSAmJiB0eXBlb2Ygbm9kZVthRnVuY3Rpb25OYW1lXSA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xyXG5cdFx0XHRpZihyZXN1bHQpeyBcclxuXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBOb2RlTGlzdClcclxuXHRcdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChBcnJheS5mcm9tKHJlc3VsdCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdGlmKHJlc3VsdHMubGVuZ3RoID09PSAwKVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRlbHNlIGlmKHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBOb2RlIHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBOb2RlTGlzdClcclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKHJlc3VsdHMpO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG59LE5vZGVMaXN0LnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJBdHRyaWJ1dGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZXMoKSA/ICgoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0ge307XHJcblx0XHRcdFx0dGhpcy5nZXRBdHRyaWJ1dGVOYW1lcygpLmZvckVhY2gobmFtZSA9PiB7XHJcblx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHR9KSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwidW5kZWZpbmVkXCIgfHwgYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKGFyZ3VtZW50c1swXSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJEYXRhU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCBkYXRhID0ge307XHJcblx0XHRpZiAodHlwZW9mIHRoaXMuZGF0YXNldCAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0Zm9yIChuYW1lIGluIHRoaXMuZGF0YXNldClcclxuXHRcdFx0XHRkYXRhW25hbWVdID0gdGhpcy5kYXRhc2V0W25hbWVdO1xyXG5cclxuXHRcdHRoaXMuZGF0YSA9IChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhW2FyZ3VtZW50c1swXV07XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwidW5kZWZpbmVkXCIgfHwgYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdFx0ZGVsZXRlIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGRhdGFbYXJndW1lbnRzWzBdXSA9IGFyZ3VtZW50c1sxXTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSkuYmluZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwO1xyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJFdmVudFN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdGNvbnN0IEVWRU5UU1BMSVRFUiA9IC8oXFxzKyl8KFxccyosXFxzKikvO1xyXG5cdGNvbnN0IGdldFdyYXBwZXJIYW5kbGVNYXAgPSAoZWxlbWVudCkgPT4ge1xyXG5cdFx0aWYgKCFlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fKSBlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fID0gbmV3IE1hcCgpO1xyXG5cclxuXHRcdHJldHVybiBlbGVtZW50Ll9fd3JhcHBlcmhhbmRsZW1hcF9fO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGdldFRyaWdnZXJUaW1lb3V0cyA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRpZiAoIWVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX18pIGVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX18gPSB7fTtcclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXztcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZW1vdmVXcmFwcGVyID0gKGVsZW1lbnQsIGRhdGEsIGV2ZW50VHlwZXMpID0+IHtcclxuXHRcdGNvbnN0IHsgd3JhcHBlciwgb3B0aW9uLCBldmVudHMsIGhhbmRsZSB9ID0gZGF0YTtcclxuXHRcdGNvbnN0IGNhcHR1cmUgPSBvcHRpb24uY2FwdHVyZTtcclxuXHRcdGlmIChldmVudFR5cGVzKSB7XHJcblx0XHRcdGV2ZW50VHlwZXMgPSB0eXBlb2YgZXZlbnRUeXBlcyA9PT0gXCJzdHJpbmdcIiA/IGV2ZW50VHlwZXMuc3BsaXQoRVZFTlRTUExJVEVSKSA6IGV2ZW50VHlwZXM7XHJcblx0XHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50VHlwZXMpIHtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBjYXB0dXJlKTtcclxuXHRcdFx0XHRcdGV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZXZlbnRzLmxlbmd0aCA9PSAwKSBnZXRXcmFwcGVySGFuZGxlTWFwKGVsZW1lbnQpLmRlbGV0ZShoYW5kbGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIGNhcHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGdldFdyYXBwZXJIYW5kbGVNYXAoZWxlbWVudCkuZGVsZXRlKGhhbmRsZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB0aHJvdyBuZXcgRXJyb3IoXCJUb28gbGVzcyBhcmd1bWVudHMhXCIpO1xyXG5cclxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZXZlbnRzID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIgPyBhcmdzLnNoaWZ0KCkuc3BsaXQoRVZFTlRTUExJVEVSKSA6IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IGZpbHRlciA9IHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiID8gYXJncy5zaGlmdCgpIDogbnVsbDtcclxuXHRcdGNvbnN0IGhhbmRsZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IG9wdGlvbiA9IHR5cGVvZiBhcmdzWzBdID09PSBcInVuZGVmaW5lZFwiID8geyBjYXB0dXJlOiBmYWxzZSwgb25jZTogZmFsc2UsIHBhc3NpdmU6IGZhbHNlIH0gOiB0eXBlb2YgYXJnc1swXSA9PT0gXCJib29sZWFuXCIgPyB7IGNhcHR1cmU6IGFyZ3Muc2hpZnQoKSwgb25jZTogZmFsc2UsIHBhc3NpdmU6IGZhbHNlIH0gOiBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChmaWx0ZXIpIHtcclxuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXQuaXMgPT09IFwiZnVuY3Rpb25cIiAmJiAhdGFyZ2V0LmlzKGZpbHRlcikpIHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBoYW5kbGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHRcdFx0aWYgKG9wdGlvbi5vbmNlKSByZW1vdmVXcmFwcGVyKHRoaXMsIHdyYXBwZXIpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHRnZXRXcmFwcGVySGFuZGxlTWFwKHRoaXMpLnNldChoYW5kbGUsIHsgaGFuZGxlLCB3cmFwcGVyOiB3cmFwcGVyLCBldmVudHMsIG9wdGlvbiB9KTtcclxuXHJcblx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBvcHRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5yZW1vdmVPbiA9IGZ1bmN0aW9uIChoYW5kbGUsIGV2ZW50LCBjYXB0dXJlKSB7XHJcblx0XHRjb25zdCBkYXRhID0gZ2V0V3JhcHBlckhhbmRsZU1hcCh0aGlzKS5nZXQoaGFuZGxlKTtcclxuXHRcdGlmIChkYXRhKSByZW1vdmVXcmFwcGVyKHRoaXMsIGRhdGEsIGV2ZW50KTtcclxuXHRcdGVsc2UgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZSwgZXZlbnQsIGNhcHR1cmUpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGNvbnN0IHRpbWVvdXQgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJudW1iZXJcIiA/IGFyZ3Muc2hpZnQoKSA6IC0xO1xyXG5cdFx0aWYgKHRpbWVvdXQgPj0gMCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJnc1swXTtcclxuXHRcdFx0Y29uc3QgdGltZW91dHMgPSBnZXRUcmlnZ2VyVGltZW91dHModGhpcyk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXRpZCA9IHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRpZiAodGltZW91dGlkKSBjbGVhclRpbWVvdXQodGltZW91dGlkKTtcclxuXHJcblx0XHRcdHRpbWVvdXRzW3R5cGVdID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0ZGVsZXRlIHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHRjb25zdCBkZWxlZ2F0ZSA9IGFyZ3NbMF0gaW5zdGFuY2VvZiBFdmVudCA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhcmdzLmxlbmd0aCA+PSAxID8gKGFyZ3MubGVuZ3RoID09IDEgPyBhcmdzLnNoaWZ0KCkgOiBhcmdzKSA6IGRlbGVnYXRlO1xyXG5cdFx0XHRjb25zdCBldmVudCA9IGRhdGEgPyBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSwgZGV0YWlsOiBkYXRhIH0pIDogbmV3IEV2ZW50KHR5cGUsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XHJcblxyXG5cdFx0XHRpZiAoZGVsZWdhdGUpIGV2ZW50LmRlbGVnYXRlZEV2ZW50ID0gZGVsZWdhdGU7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiSHRtbENsYXNzU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cyxjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QudG9nZ2xlKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgY2xhenogPT4gdGhpcy5jbGFzc0xpc3QudG9nZ2xlKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkxpc3RTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcdFxyXG5cdFByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oKSB7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0aWYodGhpc1tpXSA9PSBhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIGk7XHJcblx0XHRcclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmZvckVhY2guYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1swXTtcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5sZW5ndGggPiAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi91dGlscy9VdGlsc1wiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTWFuaXB1bGF0aW9uU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKXtcclxuXHRcdGxldCBub2RlcyA9IHRoaXMuY2hpbGROb2Rlc1xyXG5cdFx0d2hpbGUobm9kZXMubGVuZ3RoICE9IDApXHRcdFx0XHJcblx0XHRcdG5vZGVzWzBdLnJlbW92ZSh0cnVlKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGlsZE5vZGVzO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0XHRpZihhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMub3V0ZXJIVE1MO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBcclxuXHRcdFx0QXJyYXkuZnJvbShhcmd1bWVudHMpLmZvckVhY2goY29udGVudCA9PiB7XHJcblx0XHRcdFx0dGhpcy5lbXB0eSgpO1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0ZWxzZSBpZihjb250ZW50IGluc3RhbmNlb2YgTm9kZSB8fCBjb250ZW50IGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29udGVudCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKXtcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0Y29uc3QgYXBwZW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnN0IGFwcGVuZCA9IFByb3RvdHlwZS5hcHBlbmRDaGlsZC5iaW5kKHRoaXMpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGxldCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0dGhpcy5hcHBlbmRDaGlsZChhcmcpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0Y3JlYXRlKGFyZykuZm9yRWFjaChhcHBlbmQpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGFwcGVuZCk7XHJcblx0XHR9XHJcblx0fTtcdFxyXG5cdFByb3RvdHlwZS5hcHBlbmQgPSBhcHBlbmQ7XHJcblx0XHJcblx0Y29uc3QgcHJlcGVuZCA9IGZ1bmN0aW9uKGFGaXJzdEVsZW1lbnQsIGFFbGVtZW50KXtcclxuXHRcdHRoaXMuaW5zZXJ0QmVmb3JlKGFFbGVtZW50LCBhRmlyc3RFbGVtZW50KTtcclxuXHR9O1xyXG5cdFByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPT0gMClcclxuXHRcdFx0YXBwZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgZmlyc3QgPSB0aGlzLmNoaWxkTm9kZXMuZmlyc3QoKTtcclxuXHRcdFx0Y29uc3QgaW5zZXJ0ID0gcHJlcGVuZC5iaW5kKHRoaXMsIGZpcnN0KTtcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0Y29uc3QgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0XHRpbnNlcnQoYXJnKTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnQpO1xyXG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoIDwgMSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5zdWZmaWNpZW50IGFyZ3VtZW50cyEgT25lIG9yIHR3byBub2RlcyByZXF1aXJlZCFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHRoaXMucGFyZW50Tm9kZSA6IHRoaXM7XHJcblx0XHRjb25zdCBvbGROb2RlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gdGhpcyA6IGFyZ3VtZW50c1swXTtcclxuXHRcdGNvbnN0IG5ld05vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHNbMV07XHJcblx0XHRcclxuXHRcdGlmKG5ld05vZGUgaW5zdGFuY2VvZiBBcnJheSB8fCBuZXdOb2RlIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgbmV3Tm9kZSBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKXtcclxuXHRcdFx0bmV3Tm9kZS5mb3JFYWNoKGFJdGVtID0+IHBhcmVudC5pbnNlcnRCZWZvcmUoYUl0ZW0sIG9sZE5vZGUpKTtcclxuXHRcdFx0b2xkTm9kZS5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZChuZXdOb2RlLG9sZE5vZGUpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMucGFyZW50Tm9kZSA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBpbnNlcnQgbm9kZXMgYWZ0ZXIgdGhpcyBub2RlISBQYXJlbnQgbm9kZSBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmc7XHJcblx0XHRpZihuZXh0KVxyXG5cdFx0XHRQcm90b3R5cGUuYmVmb3JlLmFwcGx5KG5leHQsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlXHJcblx0XHRcdFByb3RvdHlwZS5hcHBlbmQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMucGFyZW50Tm9kZSA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBpbnNlcnQgbm9kZXMgYWZ0ZXIgdGhpcyBub2RlISBQYXJlbnQgbm9kZSBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0Y29uc3QgaW5zZXJ0ZXIgPSAobm9kZSkgPT4ge3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcyk7fVxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGNvbnN0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRpbnNlcnRlcihhcmcpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0ZXIpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydGVyKTtcclxuXHRcdH1cclxuXHR9O1x0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHBhcmVudFNlbGVjdG9yID0gLzpwYXJlbnQoXFwoXFxcIihbXlxcKV0qKVxcXCJcXCkpPy9pO1xyXG5jb25zdCBxdWVyeUV4ZWN1dGVyID0gZnVuY3Rpb24gKGFFbGVtZW50LCBhU2VsZWN0b3IpIHtcclxuXHRsZXQgbWF0Y2ggPSBwYXJlbnRTZWxlY3Rvci5leGVjKGFTZWxlY3Rvcik7XHJcblx0aWYgKG1hdGNoKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gYUVsZW1lbnQ7XHJcblx0XHRpZiAobWF0Y2guaW5kZXggPiAwKSB7XHJcblx0XHRcdHJlc3VsdCA9IGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yLnN1YnN0cigwLCBtYXRjaC5pbmRleCkpO1xyXG5cdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblx0XHR9XHJcblx0XHRyZXN1bHQgPSByZXN1bHQucGFyZW50KG1hdGNoWzJdKTtcclxuXHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0bGV0IG5leHRTZWxlY3RvciA9IGFTZWxlY3Rvci5zdWJzdHIobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpLnRyaW0oKTtcclxuXHRcdFx0aWYgKG5leHRTZWxlY3Rvci5sZW5ndGggPiAwKSByZXN1bHQgPSByZXN1bHQuZmluZChuZXh0U2VsZWN0b3IpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9IGVsc2UgcmV0dXJuIGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yKTtcclxufTtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlF1ZXJ5U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0UHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgbm9kZXMgPSBbXTtcclxuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdHdoaWxlIChhcmcpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gcXVlcnlFeGVjdXRlcih0aGlzLCBhcmcpO1xyXG5cdFx0XHRcdGlmIChyZXN1bHQpIG5vZGVzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCByZXN1bHQgPSBOb2RlTGlzdC5mcm9tLmFwcGx5KG51bGwsIG5vZGVzKTtcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmlzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcInN0cmluZ1wiKSByZXR1cm4gdGhpcy5tYXRjaGVzKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcblx0XHRcdFx0bGV0IGZpbHRlciA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlci5sZW5ndGg7IGkrKykgaWYgKHRoaXMubWF0Y2hlcyhmaWx0ZXJbaV0pKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgcmV0dXJuIHRoaXMuaXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgaWdub3JlU2hhZG93Um9vdCkge1xyXG5cdFx0aWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVybiBudWxsO1xyXG5cdFx0aWdub3JlU2hhZG93Um9vdCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJib29sZWFuXCIgPyBzZWxlY3RvciA6IGlnbm9yZVNoYWRvd1Jvb3Q7XHJcblx0XHRzZWxlY3RvciA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiA/IHNlbGVjdG9yIDogbnVsbDtcclxuXHJcblx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgJiYgaWdub3JlU2hhZG93Um9vdCkgcGFyZW50ID0gcGFyZW50Lmhvc3Q7XHJcblxyXG5cdFx0aWYgKHNlbGVjdG9yKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0d2hpbGUgKHBhcmVudCAmJiAhcGFyZW50LmlzKHNlbGVjdG9yKSkgcGFyZW50ID0gcGFyZW50LnBhcmVudChzZWxlY3RvciwgaWdub3JlU2hhZG93Um9vdCk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwidGhpczpcIiwgdGhpcywgXCJwYXJlbnQ6XCIsIHBhcmVudCwgXCJlcnJvcjpcIiwgZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcmVudDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnQ7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnBhcmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gbmV3IEFycmF5KCk7XHJcblx0XHRsZXQgcGFyZW50ID0gUHJvdG90eXBlLnBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0d2hpbGUgKHBhcmVudCkge1xyXG5cdFx0XHRyZXN1bHQucHVzaChwYXJlbnQpO1xyXG5cdFx0XHRwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHBhcmVudCwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShyZXN1bHQpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5zZWxlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmICh0aGlzLmlkKSByZXR1cm4gXCIjXCIgKyB0aGlzLmlkO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBzZWxlY3RvciA9IHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQoKTtcclxuXHRcdFx0aWYgKHBhcmVudCkge1xyXG5cdFx0XHRcdGxldCBzYW1lVGFnU2libGluZ3MgPSBwYXJlbnQuZmluZChcIjpzY29wZT5cIiArIHNlbGVjdG9yKTtcclxuXHRcdFx0XHRpZiAoc2FtZVRhZ1NpYmxpbmdzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcclxuXHRcdFx0XHRcdGxldCBpbmRleCA9IHNhbWVUYWdTaWJsaW5ncy5pbmRleE9mKHRoaXMpO1xyXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gMCkgc2VsZWN0b3IgKz0gXCI6bnRoLWNoaWxkKFwiICsgKGluZGV4ICsgMSkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IHBhcmVudFNlbGVjdG9yID0gcGFyZW50LnNlbGVjdG9yKCk7XHJcblx0XHRcdFx0cmV0dXJuIHBhcmVudFNlbGVjdG9yID8gcGFyZW50U2VsZWN0b3IgKyBcIj5cIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvc2VzdHMoYVF1ZXJ5KS5maXJzdCgpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5jbG9zZXN0cyA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKHJlc3VsdC5sZW5ndGggIT0gMCkgcmV0dXJuIHJlc3VsdDtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG5cdFx0aWYgKHBhcmVudCkgcmV0dXJuIHBhcmVudC5jbG9zZXN0cyhhUXVlcnkpO1xyXG5cclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKFtdKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUubmVzdGVkID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0aWYgKHRoaXMuaXMoYVF1ZXJ5KSkgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcyk7XHJcblxyXG5cdFx0bGV0IG5lc3RlZCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKG5lc3RlZCAmJiBuZXN0ZWQubGVuZ3RoID4gMCkgcmV0dXJuIG5lc3RlZDtcclxuXHRcdGVsc2UgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcy5wYXJlbnQoYVF1ZXJ5KSk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlJlYWR5RXZlbnRTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24oYUZ1bmN0aW9uLCBvbmNlKXtcdFxyXG5cdFx0dGhpcy5vbihcInJlYWR5XCIsIGFGdW5jdGlvbiwgb25jZSk7XHJcblx0XHRpZihkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIilcdFx0XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVhZHlcIik7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IEhJREVWQUxVRSA9IFwibm9uZVwiO1xyXG5cclxuY29uc3QgaXNIaWRkZW4gPSAoZWxlbWVudCkgPT4ge1xyXG5cdHJldHVybiBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09IEhJREVWQUxVRVxyXG59O1xyXG5cclxuY29uc3QgaW5pdCA9IChlbGVtZW50KSA9PiB7XHRcclxuXHRsZXQgZGlzcGxheSA9ICFpc0hpZGRlbihlbGVtZW50KSA/IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA6IFwiXCI7XHJcblx0XHJcblx0ZWxlbWVudC5zaG93ID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblx0XHJcblx0ZWxlbWVudC5oaWRlID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBISURFVkFMVUU7XHJcblx0XHRyZXR1cm4gdGhpcztcdFx0XHJcblx0fSkuYmluZChlbGVtZW50KTtcclxuXHRcclxuXHRyZXR1cm4gZWxlbWVudDtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJTaG93SGlkZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGluaXQodGhpcykuc2hvdy5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLmhpZGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS50b2dnbGVTaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaXNIaWRkZW4odGhpcykgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xyXG5cdH07XHJcblxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBJbnB1dFR5cGVzID0gW1xyXG5cdHtcclxuXHRcdHNlbGVjdG9yIDogXCJzZWxlY3RcIixcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0XHR0aGlzLmZpbmQoXCJvcHRpb25cIikuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdGlmKG9wdGlvbi5zZWxlY3RlZClcclxuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG9wdGlvbi52YWx1ZSk7XHJcblx0XHRcdH0pO1x0XHRcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHRcclxuXHRcdFx0bGV0IHZhbHVlcyA9IFtdO1xyXG5cdFx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0XHRsZXQgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHR3aGlsZShhcmcpe1xyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoYXJnKSlcclxuXHRcdFx0XHRcdHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoYXJnKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR2YWx1ZXMucHVzaChhcmcpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVzO1xyXG5cdFx0XHR0aGlzLmZpbmQoXCJvcHRpb25cIikuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkID0gdmFsdWVzLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwKTtcdFx0XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcclxuXHRcdH1cdFx0XHRcclxuXHR9LFxyXG5cdHtcclxuXHRcdHNlbGVjdG9yIDogXCJpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdXCIsXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZih0aGlzLnZhbHVlID09IFwib25cIiB8fCB0aGlzLnZhbHVlID09IFwib2ZmXCIpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuXHRcdFx0ZWxzZSBpZih0aGlzLmNoZWNrZWQpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHRpZih0eXBlb2YgYVZhbHVlID09PSBcImJvb2xlYW5cIilcclxuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSBhVmFsdWU7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSB0aGlzLnZhbHVlID09IGFWYWx1ZTtcclxuXHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KGFWYWx1ZSkpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlLmluZGV4T2YodGhpcy52YWx1ZSkgPj0gMDtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHJcblx0fVxyXG5dO1xyXG5cclxuY29uc3QgRGVmYXVsdElucHV0VHlwZSA9IHtcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdHRoaXMudmFsdWUgPSBhVmFsdWU7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImlucHV0XCIpO1xyXG5cdFx0fVx0XHJcbn07XHJcblxyXG5jb25zdCBnZXRJbnB1dFR5cGUgPSBmdW5jdGlvbihhRWxlbWVudCl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IElucHV0VHlwZXMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihhRWxlbWVudC5pcyhJbnB1dFR5cGVzW2ldLnNlbGVjdG9yKSlcclxuXHRcdFx0cmV0dXJuIElucHV0VHlwZXNbaV07XHRcdFxyXG5cdHJldHVybiBEZWZhdWx0SW5wdXRUeXBlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlZhbHVlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHJcblx0UHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHR5cGUgPSBnZXRJbnB1dFR5cGUodGhpcyk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0eXBlLmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0eXBlLnNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IFwiLi9kb20vRXZlbnRUYXJnZXRcIjtcclxuaW1wb3J0IFwiLi9kb20vTm9kZVwiO1xyXG5pbXBvcnQgXCIuL2RvbS9FbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50RnJhZ21lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTElucHV0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxTZWxlY3RFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVMaXN0XCI7XHJcbmltcG9ydCBcIi4vZG9tL0h0bWxDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBcIi4vR2xvYmFsXCI7XHJcbiIsImNvbnN0IERlbGVnYXRlckJ1aWxkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xyXG5cdGNvbnN0IHNvdXJjZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRhcmdzLmZvckVhY2goIHRhcmdldCA9PntcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcclxuXHRcdC5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cdFx0XHRjb25zdCBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIG5hbWUpO1xyXG5cdFx0XHRpZiAodHlwZW9mIHNvdXJjZVtuYW1lXSA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgcHJvcC52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBuYW1lLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdH07XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBEZWxlZ2F0ZXJCdWlsZGVyOyIsImNvbnN0IGV4dGVuZFByb3RvdHlwZSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1x0XHJcblx0d2hpbGUoYXJncy5sZW5ndGggPiAwKXtcclxuXHRcdGNvbnN0IGV4dGVuZGVyID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0ZXh0ZW5kZXIodHlwZSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kUHJvdG90eXBlOyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgRVhURU5TSU9OU19NQVAgPSBVdGlscy5nbG9iYWxWYXIoXCJfX19ET01fQVBJX0VYVEVOU0lPTl9NQVBfX19cIiwge30pO1xyXG5jb25zdCBFeHRlbmRlciA9IGZ1bmN0aW9uKGFOYW1lLCBhRXh0ZW50aW9uKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24oYVR5cGUpe1x0XHJcblx0XHRsZXQgZXh0ZW5zaW9ucyA9IEVYVEVOU0lPTlNfTUFQW2FUeXBlLm5hbWVdO1xyXG5cdFx0aWYoIWV4dGVuc2lvbnMpXHJcblx0XHRcdGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFthVHlwZS5uYW1lXSA9IHt9O1x0XHRcclxuXHRcdFxyXG5cdFx0aWYoIWV4dGVuc2lvbnNbYU5hbWVdKXtcclxuXHRcdFx0ZXh0ZW5zaW9uc1thTmFtZV0gPSB0cnVlO1xyXG5cdFx0XHRhRXh0ZW50aW9uKGFUeXBlLnByb3RvdHlwZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdGNvbnNvbGUud2FybihcImR1cGxpY2F0ZWQgbG9hZCBvZiBleHRlbnNpb24gXFxcIlwiICsgYU5hbWUgKyBcIlxcXCIhXCIpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVyOyIsImNvbnN0IFV0aWxzID0ge1xyXG5cdGdsb2JhbCA6ICgoKSA9PiB7XHJcblx0XHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1xyXG5cdFx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRcdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRcdHJldHVybiB7fTtcdFx0XHJcblx0fSkoKSxcclxuXHRnbG9iYWxWYXIgOiBmdW5jdGlvbihhTmFtZSwgYUluaXRWYWx1ZSl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBVdGlscy5nbG9iYWxbYU5hbWVdID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRVdGlscy5nbG9iYWxbYU5hbWVdID0gYUluaXRWYWx1ZTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIFV0aWxzLmdsb2JhbFthTmFtZV07XHRcdFxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyIsImltcG9ydCBDb21wb25lbnQgLCB7Y29tcG9uZW50QmFzZU9mLCBjcmVhdGVVVUlEfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50LmpzXCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qc1wiO1xuXG5cbmV4cG9ydCB7Q29tcG9uZW50LCBjb21wb25lbnRCYXNlT2YsIGRlZmluZSwgY3JlYXRlVVVJRH07XG4iLCJpbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHNcIjtcbmltcG9ydCB7IHV1aWQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRFwiO1xuaW1wb3J0IHsgdHJpZ2dlclRpbWVvdXQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSwgY29tcG9uZW50RXZlbnRuYW1lIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbi8qXG5jb25zdCBQUklWQVRFX1JFQURZID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJyZWFkeVwiKTtcblxuY29uc3QgVElNRU9VVFMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgaW5pdCA9IChjb21wb25lbnQpID0+IHtcblx0bGV0IHRpbWVvdXQgPSBUSU1FT1VUUy5nZXQoY29tcG9uZW50KTtcblx0aWYgKHRpbWVvdXQpIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuXHRUSU1FT1VUUy5nZXQoY29tcG9uZW50LCBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRUSU1FT1VUUy5kZWxldGUoY29tcG9uZW50KTtcblx0XHRjb25zdCByZWFkeSA9IFBSSVZBVEVfUkVBRFkoY29tcG9uZW50KTtcblx0XHR0cnl7XG5cdFx0XHRhd2FpdCBjb21wb25lbnQuaW5pdCgpO1xuXHRcdFx0cmVhZHkucmVzb2x2ZSgpO1xuXHRcdH1jYXRjaChlKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW4ndCBpbml0aWFsaXplIGNvbXBvbmVudCFcIiwgY29tcG9uZW50LCBlKTtcblx0XHRcdHJlYWR5LnJlc29sdmUoZSk7XG5cdFx0fVxuXHRcdGNvbXBvbmVudC50cmlnZ2VyKGNvbXBvbmVudEV2ZW50bmFtZShcImluaXRpYWx6ZWRcIiwgY29tcG9uZW50KSk7XG5cdH0sIGluaXRUaW1lb3V0KSk7XHRcbn07XG4qL1xuXG4vKipcbiAqIEBmdW5jdGlvbiBjcmVhdGVVSURcbiAqIFxuICogY3JlYXRlIGFuIHVuaXF1ZSBpZGVudGlmaXJlLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ByZWZpeF0gXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N1ZmZpeF1cbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuXHR3aGlsZSAoY291bnQgPCAxMDApIHtcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XG5cdFx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybiBpZDtcblxuXHRcdGNvdW50Kys7XG5cdH1cblx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJUbyBtYW55IHJldHJpZXMgdG8gY3JlYXRlIGFuIHVuaXF1ZSBpZCAtIGNyZWF0ZWQgaWQgaXMgbm90IHVuaXF1ZSFcIikpO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xuXHRjb25zdCBjbGF6eiA9IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIGh0bWxCYXNlVHlwZSB7XG5cblx0XHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubm9kZU5hbWUudG9Mb3dlcmNhc2UoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHQjcmVhZHkgPSBudWxsO1xuXHRcdCNwb3N0Q29uc3RydWN0cyA9IFtdO1xuXG5cdFx0Y29uc3RydWN0b3IoeyBzaGFkb3dSb290ID0gZmFsc2UsIGNvbnRlbnQgPSBudWxsLCBjcmVhdGVVSUQgPSBmYWxzZSwgdWlkUHJlZml4ID0gXCJpZC1cIiwgdWlkU3VmZml4ID0gXCJcIiwgcG9zdENvbnN0dWN0cyA9IG51bGwgfSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy4jcmVhZHkgPSBsYXp5UHJvbWlzZSgpO1xuXHRcdFx0aWYgKGNyZWF0ZVVJRCkgdGhpcy4jcG9zdENvbnN0cnVjdHMucHVzaChhc3luYyAoKSA9PiB0aGlzLmF0dHIoXCJpZFwiLCBjcmVhdGVVVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSkpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2hhZG93Um9vdCkgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcblxuXHRcdFx0aWYgKGNvbnRlbnQpIHRoaXMucm9vdC5hcHBlbmQodHlwZW9mIGNvbnRlbnQgPT09IFwiZnVuY3Rpb25cIiA/IGNvbnRlbnQodGhpcykgOiBjb250ZW50KTtcblxuXHRcdFx0aWYocG9zdENvbnN0dWN0cyBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRmb3IobGV0IHBvc3Qgb2YgcG9zdENvbnN0dWN0cylcblx0XHRcdFx0XHRpZih0eXBlb2YgcG9zdCA9PT0gXCJmdW5jdGlvblwiKVxuXHRcdFx0XHRcdFx0dGhpcy4jcG9zdENvbnN0cnVjdHMucHVzaChwb3N0KVxuXHRcdH1cblxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEFycmF5IG9mIHBvc3QgY29uc3RydWN0IGZ1bmN0aW9uc1xuXHRcdCAqXG5cdFx0ICogQHJlYWRvbmx5XG5cdFx0ICogQHR5cGUge0FycmF5PEZ1bmN0aW9uPn1cblx0XHQgKi9cblx0XHRnZXQgcG9zdENvbnN0cnVjdHMoKXtcblx0XHRcdHJldHVybiB0aGlzLiNwb3N0Q29uc3RydWN0cztcblx0XHR9XG5cblx0XHRcblx0XHQvKipcblx0XHQgKiByb290XG5cdFx0ICpcblx0XHQgKiBAcmVhZG9ubHlcblx0XHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR8U2hhZG93Um9vdH1cblx0XHQgKi9cblx0XHRnZXQgcm9vdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cblx0XHRcblx0XHQvKipcblx0XHQgKiByZWFkeVxuXHRcdCAqXG5cdFx0ICogQHJlYWRvbmx5XG5cdFx0ICogQHR5cGUge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0Z2V0IHJlYWR5KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBmdW5jdGlvbiBpbml0XG5cdFx0ICogQGFzeW5jXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0XHQgKi9cblx0XHRhc3luYyBpbml0KCkge1xuXHRcdFx0Zm9yIChsZXQgZnVuYyBvZiB0aGlzLiNwb3N0Q29uc3RydWN0cykgYXdhaXQgZnVuYyh0aGlzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBcblx0XHQgKi9cblx0XHRhc3luYyBkZXN0cm95KCkge1xuXHRcdFx0aWYgKHRoaXMucmVhZHkucmVzb2x2ZWQpIHRoaXMuI3JlYWR5ID0gbGF6eVByb21pc2UoKTtcblx0XHR9XG5cblx0XHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdGlmICh0aGlzLm93bmVyRG9jdW1lbnQgPT0gZG9jdW1lbnQgJiYgdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdFx0Ly9pbml0KHRoaXMpXG5cdFx0XHRcdHRoaXMuaW5pdCgpXG5cdFx0XHRcdFx0LnRoZW4oKHZhbHVlKSA9PiB0aGlzLiNyZWFkeS5yZXNvbHZlKHZhbHVlKSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB0aGlzLiNyZWFkeS5yZXNvbHZlKGVycm9yKSk7XG5cdFx0fVxuXG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblxuXHRcdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lKG5hbWUsIHRoaXMpKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBjb21wb25lbnRFdmVudG5hbWUoXCJjaGFuZ2VcIiwgdGhpcykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBjbGF6ejtcbn07XG5cbmNvbnN0IENMQVpaTUFQID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50QmFzZU9mID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xuXHRsZXQgY2xhenogPSBDTEFaWk1BUC5nZXQoaHRtbEJhc2VUeXBlKTtcblx0aWYgKGNsYXp6ID09IG51bGwpIHtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59O1xuXG5jb25zdCBDb21wb25lbnQgPSBjb21wb25lbnRCYXNlT2YoSFRNTEVsZW1lbnQpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTA7XHJcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwO1xyXG4iLCJpbXBvcnQgeyBjb21wb25lbnRQcmVmaXggfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCB0b05vZGVOYW1lID0gKG5hbWUsIHByZWZpeCkgPT4ge1xuXHRpZih0eXBlb2YgcHJlZml4ID09PSBcInN0cmluZ1wiKVxuXHRcdHJldHVybiBwcmVmaXggKyBuYW1lO1xuXHRcdFxuXHRyZXR1cm4gY29tcG9uZW50UHJlZml4ICsgbmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbihjbGF6eiwgb3B0aW9ucykge1xuXHRjb25zdCBub2RlbmFtZSA9IGNsYXp6Lk5PREVOQU1FO1xuXHRpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChub2RlbmFtZSkpIHtcblx0XHRjdXN0b21FbGVtZW50cy5kZWZpbmUobm9kZW5hbWUsIGNsYXp6LCBvcHRpb25zKTtcblx0fVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmU7IFxuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBmdW5jdGlvbiBjb21wb25lbnRFdmVudG5hbWVcbiAqIFxuICogY3JlYXRlcyBhbiBldmVudCBuYW1lIGZvciBhbiBjb21wb25lbnRcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fENvbXBvbmVudH0gbm9kZSBcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VwYXJhdG9yXSBkZWZhdWx0IGlzIFwiOlwiXG4gKiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSwgc2VwYXJhdG9yID0gXCI6XCIgKSA9PiB7XHRcblx0bGV0IG5vZGVuYW1lID0gXCJ1bnN1cHBvcnRlZFwiO1xuXHRpZih0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGU7XG5cdGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuXHRcdG5vZGVuYW1lID0gbm9kZS5ub2RlTmFtZTtcblx0ZWxzZSBpZih0eXBlb2Ygbm9kZS5OT0RFTkFNRSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGUuTk9ERU5BTUU7XG5cdGVsc2UgdGhyb3cgbmV3IEVycm9yKGAke3R5cGVvZiBub2RlfSBpcyBub3Qgc3VwcG9ydGVkIGFzIHBhcmFtZXRlciBcIm5vZGVcIiFgKTtcblx0XG4gICByZXR1cm4gYCR7bm9kZW5hbWUudG9Mb3dlckNhc2UoKX0ke3NlcGFyYXRvcn0ke2V2ZW50VHlwZX1gOy8vdXNlIEAgYXMgc2VwYXJ0b3IgYW5kIG5vdCA6XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvbiBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWVcbiAqICAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZSBcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fENvbXBvbmVudH0gbm9kZSBcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VwYXJhdG9yXSBkZWZhdWx0IGlzIFwiOlwiXG4gKiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgPSAoYXR0cmlidXRlLCBub2RlLCBzZXBhcmF0b3IgPSBcIjpcIiAgKSA9PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudEV2ZW50bmFtZShgJHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0tJHthdHRyaWJ1dGV9YCwgbm9kZSwgc2VwYXJhdG9yKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtjb21wb25lbnRFdmVudG5hbWUsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZX0iLCJpbXBvcnQgeyBOT0RFTkFNRV9GT1JNLCBcclxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcclxuXHRBVFRSSUJVVEVfUkVBRE9OTFksIFxyXG5cdEFUVFJJQlVURV9FVkFMVUFURSwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTiwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04sIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnRcIjtcclxuaW1wb3J0IENvbmRpdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL0NvbmRpdGlvbkhhbmRsZVwiO1xyXG5pbXBvcnQgRWRpdGFibGVIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9FZGl0YWJsZUhhbmRsZVwiO1xyXG5pbXBvcnQgVmFsaWRhdGlvbkhhbmRsZSBmcm9tIFwiLi9oYW5kZWxzL1ZhbGlkYXRpb25IYW5kbGVcIjtcclxuaW1wb3J0IE1lc3NhZ2VIYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9NZXNzYWdlSGFuZGxlXCI7XHJcbmltcG9ydCB7IGV2YWx1YXRpb25EYXRhIH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgdXBkYXRlQWN0aXZlU3RhdGUsIHVwZGF0ZUNvbmRpdGlvblN0YXRlLCB1cGRhdGVFZGl0YWJsZVN0YXRlLCB1cGRhdGVSZWFkb25seVN0YXRlLCB1cGRhdGVWYWxpZFN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuXHJcbmNvbnN0IF9mb3JtID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJmb3JtXCIpO1xyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWSwgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OXTtcclxuXHJcbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHQvKiogQHR5cGUge2Jvb2xlYW59ICovXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0LyoqIEB0eXBlIHtDb25kaXRpb25IYW5kbGV9ICovXHJcblx0I2NvbmRpdGlvbkhhbmRsZTtcclxuXHQvKiogQHR5cGUge0VkaXRhYmxlSGFuZGxlfSAqL1xyXG5cdCNlZGl0YWJsZUhhbmRsZTtcdFxyXG5cdC8qKiBAdHlwZSB7VmFsaWRhdGlvbkhhbmRsZX0gKi9cclxuXHQjdmFsaWRhdGlvbkhhbmRsZTtcdFxyXG5cdC8qKiBAdHlwZSB7TWVzc2FnZUhhbmRsZX0qL1xyXG5cdCNtZXNzYWdlSGFuZGxlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLiNtZXNzYWdlSGFuZGxlID0gbmV3IE1lc3NhZ2VIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiNjb25kaXRpb25IYW5kbGUgPSBuZXcgQ29uZGl0aW9uSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jZWRpdGFibGVIYW5kbGUgPSBuZXcgRWRpdGFibGVIYW5kbGUodGhpcyk7XHJcblx0XHR0aGlzLiN2YWxpZGF0aW9uSGFuZGxlID0gbmV3IFZhbGlkYXRpb25IYW5kbGUodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdGF3YWl0IHRoaXMuI2NvbmRpdGlvbkhhbmRsZS5pbml0KCk7XHJcblx0XHRcdGF3YWl0IHRoaXMuI21lc3NhZ2VIYW5kbGUuaW5pdCgpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0aW9uSGFuZGxlLmluaXQoKTtcclxuXHRcdFx0YXdhaXQgdGhpcy4jZWRpdGFibGVIYW5kbGUuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkge1xyXG5cdFx0cmV0dXJuIChzdXBlci5pZCB8fCBcIlwiKS50cmltKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiAoc3VwZXIubmFtZSB8fCBcIlwiKS50cmltKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWRhdGlvbkhhbmRsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiN2YWxpZGF0aW9uSGFuZGxlO1xyXG5cdH1cclxuXHJcblx0Z2V0IG1lc3NhZ2VIYW5kbGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jbWVzc2FnZUhhbmRsZTtcclxuXHR9XHJcblxyXG5cdGFkZFZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbkhhbmRsZS5hZGRDdXN0b21WYWxpZGF0aW9uKHZhbGlkYXRpb24pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbGlkYXRlOmAsIGRhdGEpXHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBcIlwiKTtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBhd2FpdCBldmFsdWF0aW9uRGF0YSh0aGlzKSk7XHJcblx0XHRhd2FpdCB0aGlzLiNjb25kaXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHRhd2FpdCB0aGlzLiNlZGl0YWJsZUhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0VWQUxVQVRFLCBudWxsKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLiNtZXNzYWdlSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnZhbGlkO1xyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRsZXQgZm9ybSA9IF9mb3JtKHRoaXMpO1xyXG5cdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdGZvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0X2Zvcm0odGhpcywgZm9ybSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0aWYgKGN1cnJlbnQgIT0gYWN0aXZlKSB7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZVN0YXRlKHRoaXMsIGFjdGl2ZSk7XHJcblx0XHRcdHRoaXMuYWN0aXZlVXBkYXRlZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgYWN0aXZlVXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCByZWFkb25seSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVBRE9OTFkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiY2hhbmdlIHJlYWRvbmx5OiBcIiwge3JlYWRvbmx5LCBlZGl0YWJsZTogdGhpcy5lZGl0YWJsZSwgdGhpczogdGhpc30pO1xyXG5cdFx0dXBkYXRlUmVhZG9ubHlTdGF0ZSh0aGlzLCAhdGhpcy5lZGl0YWJsZSA/ICB0cnVlIDogcmVhZG9ubHksICF0aGlzLnJlYWR5LnJlc29sdmVkKTtcclxuXHJcblx0XHR0aGlzLnJlYWRvbmx5VXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVhZG9ubHlVcGRhdGVkKCkge31cclxuXHJcblx0Z2V0IGVkaXRhYmxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9FRElUQUJMRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgZWRpdGFibGUoZWRpdGFibGUpIHtcclxuXHRcdC8vY29uc29sZS5sb2coXCJjaGFuZ2UgZWRpdGFibGU6IFwiLCBlZGl0YWJsZSwgdGhpcyk7XHJcblx0XHR1cGRhdGVFZGl0YWJsZVN0YXRlKHRoaXMsIGVkaXRhYmxlLCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblx0XHR0aGlzLmVkaXRhYmxlVXBkYXRlZCgpO1xyXG5cdFx0dGhpcy5yZWFkb25seSA9ICFlZGl0YWJsZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGVkaXRhYmxlVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCBjb25kaXRpb24oY29uZGl0aW9uKSB7XHJcblx0XHR1cGRhdGVDb25kaXRpb25TdGF0ZSh0aGlzLCBjb25kaXRpb24pO1xyXG5cdFx0dGhpcy5jb25kaXRpb25VcGRhdGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuICF0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHt9XHJcblxyXG5cdHNldCB2YWxpZCh2YWxpZCkge1xyXG5cdFx0dXBkYXRlVmFsaWRTdGF0ZSh0aGlzLCB2YWxpZCk7XHJcblx0XHR0aGlzLnZhbGlkVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9WQUxJRCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZFVwZGF0ZWQoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgXHJcblx0RVZFTlRfRklFTERfUkVNT1ZFRCwgXHJcblx0RVZFTlRfVkFMVUVfVVBEQVRFRCxcclxuXHRBVFRSSUJVVEVfTkFNRSwgXHJcblx0QVRUUklCVVRFX1JFUVVJUkVELCBcclxuXHRBVFRSSUJVVEVfTk9WQUxVRSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBkYXRhSXNOb1ZhbHVlIH0gZnJvbSBcIi4vdXRpbHMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmNvbnN0IF9wYXJlbnQgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInBhcmVudFwiKTtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9SRVFVSVJFRCwgQVRUUklCVVRFX05PVkFMVUVdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRGaWVsZCA9IChmaWVsZCkgPT4ge1xyXG5cdGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG5cdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiBwYXJlbnQ7XHJcblxyXG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlSGFzVmFsdWUgPSAoaGFzVmFsdWUsIGZpZWxkKSA9PiB7XHJcblx0ZmllbGQuYXR0cihBVFRSSUJVVEVfTk9WQUxVRSwgIWhhc1ZhbHVlID8gXCJcIiA6IG51bGwpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGJhc2ljIGZpZWxkIGNsYXNzIC0gZXh0ZW5kIGN1c3RvbSBmaWVsZHMgYnkgdGhpcyBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgQmFzZUZpZWxkXHJcbiAqIEB0eXBlZGVmIHtCYXNlRmllbGR9XHJcbiAqIEBleHRlbmRzIHtCYXNlfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjbGFzcyBDdXN0b21GaWVsZCBleHRlbmQgQmFzZUZpZWxke1xyXG4gKiBcdGNvbnN0cnVjdG9yKG9wdGlvbiA9IHt9KXtcclxuICogXHRcdHN1cGVyKG9wdGlvbik7XHJcbiAqIFx0fVxyXG4gKlxyXG4gKiBcdGFzeW5jIGluaXQoKXtcclxuICogXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuICogXHRcdC8veW91ciBjdXN0b20gY29kZVxyXG4gKiBcdH1cclxuICogfVxyXG4gKi9cclxuY2xhc3MgQmFzZUZpZWxkIGV4dGVuZHMgQmFzZSB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZS5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0I3ZhbHVlID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlRmllbGQuXHJcblx0ICpcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge3t9fSBbb3B0aW9ucz17fV1cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3QgeyB2YWx1ZSB9ID0gb3B0aW9ucztcclxuXHRcdHRoaXMuI3ZhbHVlID0gdmFsdWU7XHJcblx0XHR0aGlzLnJvb3Qub24oRVZFTlRfVkFMVUVfVVBEQVRFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIHRvIGluaXRpYWxpemUgdGhlIGN1c3RvbSBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBjbGFzcyBDdXN0b21GaWVsZCBleHRlbmQgQmFzZUZpZWxke1xyXG5cdCAqIFx0Y29uc3RydWN0b3Iob3B0aW9uID0ge30pe1xyXG5cdCAqIFx0XHRzdXBlcihvcHRpb24pO1xyXG5cdCAqIFx0fVxyXG5cdCAqXHJcblx0ICogXHRhc3luYyBpbml0KCl7XHJcblx0ICogXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHQgKiBcdFx0Ly95b3VyIGN1c3RvbSBjb2RlXHJcblx0ICogXHR9XHJcblx0ICogfVxyXG5cdCAqL1xyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVEKSk7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQgYnkgZGVzdHJveWluZyB0aGUgY29tcG9uZW50LlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgZGVzdHJveSgpIHtcclxuXHRcdHRoaXMucHVibGlzaFZhbHVlKG51bGwpO1xyXG5cdFx0YXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0ZJRUxEX1JFTU9WRUQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHBhcmVudCBmaWVsZC5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtCYXNlRmllbGR9XHJcblx0ICovXHJcblx0Z2V0IHBhcmVudEZpZWxkKCkge1xyXG5cdFx0bGV0IHBhcmVudCA9IF9wYXJlbnQodGhpcyk7XHJcblx0XHRpZiAoIXBhcmVudCkge1xyXG5cdFx0XHRwYXJlbnQgPSBmaW5kUGFyZW50RmllbGQodGhpcyk7XHJcblx0XHRcdF9wYXJlbnQodGhpcywgcGFyZW50KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQgaWYgdGhlIGNvbmRpdGlvbiBzdGF0ZSB1cGRhdGVkLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgY29uZGl0aW9uVXBkYXRlZCgpIHtcclxuXHRcdHRoaXMuYWN0aXZlID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IG5hbWUgb2YgZmllbGQuXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9OQU1FKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIGZpZWxkIHJlcXVpcmVkLlxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Z2V0IHJlcXVpcmVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRVFVSVJFRCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgZmllbGQgYSB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGdldCBoYXNWYWx1ZSgpIHtcclxuXHRcdHJldHVybiAhdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX05PVkFMVUUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IG9yIHNldCB0aGUgcmF3IHZhbHVlIHRvIGZpZWxkLiAob25seSBmb3IgaW50ZXJuYWwgdXNlKVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fFByb21pc2U8dm9pZD59XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIGF3YWl0IGZpZWxkLnJhd1ZhbHVlKFwidmFsdWVcIikgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0byBcInZhbHVlXCJcclxuXHQgKiBhd2FpdCBmaWVsZC5yYXdWYWx1ZSgpIC8vIHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgZmllbGRcclxuXHQgKi9cclxuXHRhc3luYyByYXdWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLiN2YWx1ZTtcclxuXHRcdGVsc2UgdGhpcy4jdmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBvciBzZXQgdmFsdWUgdG8gZmllbGQuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj58UHJvbWlzZTx2b2lkPn1cclxuXHQgKlxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogYXdhaXQgZmllbGQudmFsdWUoXCJ2YWx1ZVwiKSAvLyBzZXQgdGhlIHZhbHVlIG9mIHRvIFwidmFsdWVcIlxyXG5cdCAqIGF3YWl0IGZpZWxkLnZhbHVlKCkgLy8gcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiBmaWVsZFxyXG5cdCAqL1xyXG5cdGFzeW5jIHZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCB7IGNvbmRpdGlvbiwgdmFsaWQsIHJlYWR5IH0gPSB0aGlzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnZhbHVlOiBgLCBhcmd1bWVudHMsIHtjb25kaXRpb24sIHZhbGlkfSk7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSBhd2FpdCB0aGlzLnJhd1ZhbHVlKCk7XHJcblxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuICFjb25kaXRpb24gfHwgIXZhbGlkID8gbnVsbCA6IGN1cnJlbnRWYWx1ZTtcclxuXHJcblx0XHRhd2FpdCByZWFkeTtcclxuXHRcdGNvbnN0IGFjY2VwdGVkID0gYXdhaXQgdGhpcy5hY2NlcHRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRpZiAoYWNjZXB0ZWQpIHtcclxuXHRcdFx0dmFsdWUgPSAoYXdhaXQgdGhpcy5ub3JtYWxpemVWYWx1ZSh2YWx1ZSkpIHx8IHZhbHVlO1xyXG5cdFx0XHRpZiAoY3VycmVudFZhbHVlICE9IHZhbHVlKSB7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy51cGRhdGVkVmFsdWUodmFsdWUpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZSA9IHJlc3VsdDtcclxuXHJcblx0XHRcdFx0Ly9hd2FpdCB0aGlzLnJhd1ZhbHVlKHZhbHVlKTtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlIHRoZSBmaWVsZCBieSBnaXZlbiBkYXRhIGNvbnRleHQuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRDb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdGNvbnN0IGN1cnJlbnRWYWxpZCA9IHRoaXMudmFsaWQ7XHJcblx0XHRjb25zdCB2YWxpZCA9IGF3YWl0IHN1cGVyLnZhbGlkYXRlKGRhdGEpO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHR0aGlzLnZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY3VycmVudENvbmRpdGlvbiAhPSBjb25kaXRpb24sIGN1cnJlbnRWYWxpZCAhPSB2YWxpZCk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbGlkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgY2FsbGVkLCBpZiB0aGUgdmFsaWRhdGlvbiBzdGF0ZSBpcyBjaGFuZ2VkXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmRpdGlvbkNoYW5nZVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsaWRhdGlvbkNoYW5nZWRcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyB2YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGNvbmRpdGlvbkNoYW5nZSwgdmFsaWRhdGlvbkNoYW5nZWQpIHtcclxuXHRcdGNvbnN0IGhhc0NoYW5nZSA9IGNvbmRpdGlvbkNoYW5nZSB8fCB2YWxpZGF0aW9uQ2hhbmdlZDtcclxuXHRcdGlmIChoYXNDaGFuZ2UpIHRoaXMucHVibGlzaFZhbHVlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBjYWxsZWQsIGlmIHRoZSB2YWx1ZSBvZiBmaWVsZCBpcyB1cGRhdGVkXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfVkFMVUVfVVBEQVRFRCwgdmFsdWUpXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQdWJsaXNoIHRoZSB2YWx1ZSB0byB0aGUgcGFyZW50IGZpZWxkIG9yIHRvIGZvcm0uIElmIHRoZSB2YWx1ZSBvZiBjdXN0b20gZmllbGQgY2hhbmdlZCwgY2FsbCB0aGlzIGZ1bmN0aW9uIHdpdGggdGhlIG5ldyB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7Pyp9IHZhbHVlIC0gZGVmYXVsdCBpcyB0aGUgY3VycmVudCB2YWx1ZSwgaWYgdmFsdWUgYXZhaWxhYmxlLCB0aGVuIHRoZSB2YWx1ZSB3b3VsZCBiZSBzZXQgYXMgY3VycmVudCB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHB1Ymxpc2hWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgY2FsbCAke3RoaXMubm9kZU5hbWV9KCR7dGhpcy5uYW1lfSkucHVibGlzaFZhbHVlOmAsIHthcmd1bWVudHM6IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlfSk7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHZhbHVlID0gYXdhaXQgdGhpcy5yYXdWYWx1ZSgpO1xyXG5cdFx0ZWxzZSBhd2FpdCB0aGlzLnJhd1ZhbHVlKHZhbHVlKTtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKFwid29yayB3aXRoIFZhbHVlOlwiLCB2YWx1ZSlcclxuXHRcdGNvbnN0IG5vVmFsdWUgPSBkYXRhSXNOb1ZhbHVlKHZhbHVlKTtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0Y29uc3QgcmVxdWlyZWQgPSB0aGlzLnJlcXVpcmVkO1xyXG5cdFx0dmFsdWUgPSAocmVxdWlyZWQgJiYgbm9WYWx1ZSkgfHwgIWNvbmRpdGlvbiA/IG51bGwgOiB2YWx1ZTtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9KCR7dGhpcy5uYW1lfSkucHVibGlzaFZhbHVlOmAsIHtyZXF1aXJlZCwgY29uZGl0aW9uLCBub1ZhbHVlLCB2YWx1ZX0pO1xyXG5cclxuXHRcdHVwZGF0ZUhhc1ZhbHVlKCFub1ZhbHVlLCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5wYXJlbnRGaWVsZCkgYXdhaXQgdGhpcy5wYXJlbnRGaWVsZC5jaGlsZFZhbHVlQ2hhbmdlZCh0aGlzLCB2YWx1ZSk7XHJcblx0XHRlbHNlIGlmICh0aGlzLmZvcm0pIGF3YWl0IHRoaXMuZm9ybS5jaGlsZFZhbHVlQ2hhbmdlZCh0aGlzLCB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBpcyBjYWxsZWQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGFjY2VwdGVkLiBDYW4gYmUgb3ZlcnJpZGUhXHJcblx0ICogXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGlzIGNhbGxlZCB0byBub3JtYWxpemUgdmFsdWUgZm9yIGZpZWxkLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiB3b3VsZCBiZSBjYWxsZWQgYnkgY2hpbGQgZmllbGRzXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge0Jhc2VGaWVsZH0gZmllbGRcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcclxuIiwiZXhwb3J0IGNvbnN0IEhUTUxfVEFHX1BSRUZJWCA9IFwiZC1cIjtcclxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCA9IDEwICogRVZFTlRIQU5ETEVfVElNRU9VVDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GT1JNID0gYCR7SFRNTF9UQUdfUFJFRklYfWZvcm1gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfU1VCTUlUX0FDVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH1zdWJtaXQtYWN0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9cGFnZWA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GSUVMRCA9IGAke0hUTUxfVEFHX1BSRUZJWH1maWVsZGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UQUlORVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udGFpbmVyYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUID0gYCR7SFRNTF9UQUdfUFJFRklYfWxpc3RgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTElTVF9ST1dTPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93c2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfXJvd2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX0FERF9ST1c9IGAke0hUTUxfVEFHX1BSRUZJWH1hZGQtcm93YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfWRlbGV0ZS1yb3dgO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BST0dFU1NCQVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9cHJvZ3Jlc3MtYmFyYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1NURVAgPSBgJHtIVE1MX1RBR19QUkVGSVh9c3RlcGA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfVkFMSURBVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH12YWxpZGF0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX01FU1NBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9bWVzc2FnZWA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfQkFDSyA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWJhY2tgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9ORVhUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtbmV4dGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX0NBTkNFTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWNhbmNlbGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdW1tYXJ5YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfU1VCTUlUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtc3VibWl0YDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0lOSVQgPSBcImluaXRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9WQUxJREFUSU5HID0gXCJ2YWxpZGF0aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5QVVQgPSBcImlucHV0XCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfU1VNTUFSWSA9IFwic3VtbWFyeVwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX1NVQk1JVFRJTkcgPSBcInN1Ym1pdHRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9GSU5JU0hFRCA9IFwiZmluaXNoZWRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURVMgPSB7XHJcblx0aW5pdDogRk9STVNUQVRFX0lOSVQsXHJcblx0dmFsaWRhdGluZzogRk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0aW5wdXQ6IEZPUk1TVEFURV9JTlBVVCxcclxuXHRzdW1tYXJ5OiBGT1JNU1RBVEVfU1VNTUFSWSxcclxuXHRzdWJtaXR0aW5nOiBGT1JNU1RBVEVfU1VCTUlUVElORyxcclxuXHRmaW5pc2hlZDogRk9STVNUQVRFX0ZJTklTSEVELFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEU1RBVEVTID0ge1xyXG5cdGFsd2F5czogXCJhbHdheXNcIixcclxuXHRvbkFjdGl2ZTogXCJvbi1hY3RpdmVcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QUkVGSVggPSBIVE1MX1RBR19QUkVGSVggKyBcImZvcm0tXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRSA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfWluaXRpYWxpemVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04gPSBgJHtFVkVOVF9JTklUSUFMSVpFfXN1Ym1pdC1hY3Rpb25gO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TVUJNSVRfUkVTVUxUUyA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXQtcmVzdWx0c2A7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9FWEVDVVRFX1ZBTElEQVRFID0gYCR7RVZFTlRfUFJFRklYfWV4ZWN1dGUtdmFsaWRhdGVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9Y29uZGl0aW9uLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfQUxMX1BVQkxJU0hfVkFMVUUgPSBgJHtFVkVOVF9QUkVGSVh9YWxsLXB1Ymxpc2gtdmFsdWVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMVUVfVVBEQVRFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC12YWx1ZS11cGRhdGVkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTFVFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtdmFsdWUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TSVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c2l0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZJRUxEX0lOUFVUID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLWlucHV0YDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0FERCA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1hZGRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTElTVF9ST1dfREVMRVRFID0gYCR7RVZFTlRfUFJFRklYfWxpc3Qtcm93LWRlbGV0ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXByb2dyZXNzLWJhci1jaGFuZ2VkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX1BBR0VfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1yZW1vdmVkYDtcclxuXHJcbi8vZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWRhdGlvbi1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWRhdGlvbi1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9NRVNTQUdFX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfW1lc3NhZ2UtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTUVTU0FHRV9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfW1lc3NhZ2UtcmVtb3ZlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9YWN0aXZlLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZC1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZWRpdGFibGUtc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9SRUFET05MWV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXJlYWRvbmx5LXN0YXRlLWNoYW5nZWRgO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTUEVDSUFMVkFSUyA9IHtcclxuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXHJcblx0Q1VSUkVOVExJU1RST1c6IFwiJGl0ZW1cIixcclxufTtcclxuXHJcbi8vQVRUUklCVVRFU1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05BTUUgPSBcIm5hbWVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5UID0gXCJjdXN0b20tc3VibWl0dGVkLWV2ZW50XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9FTkRQT0lOVCA9IFwiZW5kcG9pbnRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX01FVEhPRCA9IFwibWV0aG9kXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RBVEUgPSBcInN0YXRlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSA9IFwidXNlLXN1bW1hcnktcGFnZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUID0gXCJpbnB1dC1tb2RlLWFmdGVyLXN1Ym1pdFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEID0gXCJyZXF1aXJlZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEX09OX0FDVElWRV9PTkxZID0gXCJyZXF1aXJlZC1vbi1hY3RpdmUtb25seVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRSA9IFwiZWRpdGFibGVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04gPSBcImVkaXRhYmxlLWNvbmRpdGlvblwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFQURPTkxZID0gXCJyZWFkb25seVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMSUQgPSBcInZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5WQUxJRCA9IFwiaW52YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VWQUxVQVRFID0gXCJldmFsdWF0ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCA9IFwiY29uZGl0aW9uLXZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQgPSBcImNvbmRpdGlvbi1pbnZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUlOID0gXCJtaW5cIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NQVggPSBcIm1heFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0ZPUiA9IFwiZm9yXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMVUUgPSBcInZhbHVlXCI7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0NPTlRBSU5FUiwgXHJcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsIFxyXG5cdEVWRU5UX0ZJRUxEX1JFTU9WRUQgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgZmluZEZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgdmFsdWVIZWxwZXIsIGZpZWxkVmFsdWVNYXBUb09iamVjdCB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGVGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9WYWxpZGF0aW9uSGVscGVyXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2VGaWVsZCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRBSU5FUjtcclxuXHR9XHJcblxyXG5cdCNmaWVsZHMgPSBudWxsO1xyXG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xyXG5cdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCAmJiAoIXRoaXMuI2ZpZWxkcyB8fCAhdGhpcy4jZmllbGRzLmhhcyhmaWVsZCkpKVxyXG5cdFx0XHRcdFx0dGhpcy4jZmllbGRzID0gbnVsbDtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9GSUVMRF9SRU1PVkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdGlmIChmaWVsZCAhPSB0aGlzKSB7XHJcblx0XHRcdFx0aWYgKGZpZWxkIGluc3RhbmNlb2YgQmFzZUZpZWxkICYmIHRoaXMuI2ZpZWxkcyAmJiB0aGlzLiNmaWVsZHMuaGFzKGZpZWxkKSlcclxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcy5kZWxldGUoZmllbGQpO1xyXG5cclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICh7IGRhdGEgfSkgPT4gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5maWVsZHMpKTtcclxuXHR9XHJcblxyXG5cdGdldCBmaWVsZHMoKSB7XHJcblx0XHRpZighdGhpcy4jZmllbGRzKVxyXG5cdFx0XHR0aGlzLiNmaWVsZHMgPSBuZXcgU2V0KGZpbmRGaWVsZHModGhpcykpO1xyXG5cclxuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuI2ZpZWxkcyk7XHJcblx0fVxyXG5cclxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XHJcblx0XHRjb25zdCB7IHJlYWRvbmx5LCBmaWVsZHMgfSA9IHRoaXM7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwicmVhZG9ubHlVcGRhdGVkOlwiLCB7IHJlYWRvbmx5LCBmaWVsZHMgfSlcclxuXHRcdGlmIChmaWVsZHMpXHJcblx0XHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xyXG5cdFx0XHRcdGZpZWxkLnJlYWRvbmx5ID0gcmVhZG9ubHk7XHJcblx0XHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1xyXG5cdFx0bWFwLmNsZWFyKCk7XHJcblx0XHRjb25zdCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcclxuXHRcdGlmIChmaWVsZHMpIHtcclxuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoZmllbGRzLm1hcChhc3luYyAoZmllbGQpID0+IHtcclxuXHRcdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcclxuXHRcdFx0XHRjb25zdCBmaWVsZFZhbHVlID0gbmFtZSA/IHZhbHVlSGVscGVyKHZhbHVlLCBmaWVsZC5uYW1lKSA6IHZhbHVlO1xyXG5cdFx0XHRcdGlmKCFub1ZhbHVlKGZpZWxkVmFsdWUpKVxyXG5cdFx0XHRcdFx0bWFwLnNldChmaWVsZCwgZmllbGRWYWx1ZSk7XHJcblx0XHRcdFx0YXdhaXQgZmllbGQudmFsdWUoZmllbGRWYWx1ZSk7XHJcblx0XHRcdH0pKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IGZpZWxkVmFsdWVNYXBUb09iamVjdCh0aGlzLiN2YWx1ZSwgZmllbGRzKTtcclxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5sZW5ndGggPT0gMCkgZGF0YSA9IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKGAke3RoaXMubm9kZU5hbWV9LmNoaWxkVmFsdWVDaGFuZ2VkKCR7ZmllbGQubmFtZX0pOmAsIHtmaWVsZCwgdmFsdWV9KTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHRcdFxyXG5cdFx0Y29uc3QgbWFwID0gdGhpcy4jdmFsdWU7XHRcdFxyXG5cdFx0XHJcblx0XHRpZiAoZmllbGQpIHtcclxuXHRcdFx0Y29uc3QgaGFzRmllbGQgPSBtYXAuaGFzKGZpZWxkKTtcclxuXHRcdFx0Y29uc3QgY3VycmVudFZhbHVlID0gbWFwLmdldChmaWVsZCk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coe25hbWU6IGZpZWxkLm5hbWUsIGN1cnJlbnRWYWx1ZSwgdmFsdWUsIGhhc0ZpZWxkfSlcclxuXHJcblx0XHRcdGlmKGhhc0ZpZWxkICYmIGN1cnJlbnRWYWx1ZSA9PSB2YWx1ZSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGlmIChub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYGRlbGV0ZSAke2ZpZWxkLm5hbWV9YCk7XHJcblx0XHRcdFx0bWFwLmRlbGV0ZShmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhgc2V0ICR7ZmllbGQubmFtZX0gPSAke3ZhbHVlfWApO1xyXG5cdFx0XHRcdG1hcC5zZXQoZmllbGQsIHZhbHVlKTtcclxuXHRcdFx0fVx0XHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QobWFwLCB0aGlzLmZpZWxkcyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiZGF0YTogXCIsZGF0YSk7XHJcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoZGF0YSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoQ29udGFpbmVyKTtcclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCJpbXBvcnQgeyBcclxuXHRGT1JNU1RBVEVfSU5QVVQsXHJcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0Rk9STVNUQVRFX1NVTU1BUlksXHJcblx0Rk9STVNUQVRFX0ZJTklTSEVELCBcclxuXHROT0RFTkFNRV9DT05UUk9MLFxyXG5cdE5PREVOQU1FX0NPTlRST0xfQkFDSyxcclxuXHROT0RFTkFNRV9DT05UUk9MX05FWFQsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQsIFxyXG5cdE5PREVOQU1FX0ZPUk0sXHJcblx0RVZFTlRfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcclxuXHROT0RFTkFNRV9DT05UUk9MX1NVTU1BUllcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgXCIuL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IFwiLi9jb250cm9sc1wiO1xyXG5cclxuXHJcbmNvbnN0IEJVVFRPTkRVTU1ZID0ge1xyXG5cdGFjdGl2ZTogZmFsc2UsXHJcblx0ZGlzYWJsZWQ6IGZhbHNlLFxyXG59O1xyXG5cclxuY2xhc3MgU3VibWl0V3JhcHBlcntcclxuXHJcblx0I3N1Ym1pdHM7XHJcblx0I2FjdGl2ZSA9IGZhbHNlO1xyXG5cdCNkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0FycmF5PEZvcm1CdXR0b24+fSB0aGVTdWJtaXRzIFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHRoZVN1Ym1pdHMpe1xyXG5cdFx0dGhpcy4jc3VibWl0cyA9IHRoZVN1Ym1pdHM7XHJcblx0XHR0aGlzLiNzdWJtaXRzLmZvckVhY2goYnV0dG9uID0+IHtcclxuXHRcdFx0YnV0dG9uLmFjdGl2ZSA9IHRoaXMuI2FjdGl2ZTtcclxuXHRcdFx0YnV0dG9uLmRpc2FibGVkID0gdGhpcy4jZGlzYWJsZWQ7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKXtcclxuXHRcdHJldHVybiB0aGlzLiNhY3RpdmU7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFWYWx1ZSl7XHJcblx0XHR0aGlzLiNhY3RpdmUgPSBhVmFsdWVcclxuXHRcdHRoaXMuI3N1Ym1pdHMuZm9yRWFjaChidXR0b24gPT5cdGJ1dHRvbi5hY3RpdmUgPSB0aGlzLiNhY3RpdmUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGRpc2FibGVkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy4jZGlzYWJsZWQ7XHJcblx0fVxyXG5cclxuXHRzZXQgZGlzYWJsZWQoYVZhbHVlKXtcclxuXHRcdHRoaXMuI2Rpc2FibGVkID0gYVZhbHVlXHJcblx0XHR0aGlzLiNzdWJtaXRzLmZvckVhY2goYnV0dG9uID0+XHRidXR0b24uZGlzYWJsZWQgPSB0aGlzLiNkaXNhYmxlZCk7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIENvbnRyb2wgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0w7XHJcblx0fVxyXG5cclxuXHQjZm9ybTtcclxuXHQjYmFjaztcclxuXHQjbmV4dDtcclxuXHQjc3VtbWFyeTtcclxuXHQjc3VibWl0O1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHRcdFx0dGhpcy4jYmFjayA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX0JBQ0spLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblx0XHRcdHRoaXMuI25leHQgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9ORVhUKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xyXG5cdFx0XHR0aGlzLiNzdW1tYXJ5ID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWSkuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHRcdFx0dGhpcy4jc3VibWl0ID0gbmV3IFN1Ym1pdFdyYXBwZXIodGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfU1VCTUlUKSB8fCBbQlVUVE9ORFVNTVldKTtcclxuXHJcblx0XHRcdHRoaXMuI2Zvcm0ub24oW0VWRU5UX0lOSVRJQUxJWkVELCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQsIEVWRU5UX1NJVEVfQ0hBTkdFRF0sICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFxyXG5cclxuXHRhc3luYyB1cGRhdGUoKSB7XHJcblx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybTtcclxuXHRcdGNvbnN0IHN0YXRlID0gZm9ybS5zdGF0ZTtcclxuXHRcdGNvbnN0IGJhY2sgPSB0aGlzLiNiYWNrO1xyXG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMuI25leHQ7XHJcblx0XHRjb25zdCBzdW1tYXJ5ID0gdGhpcy4jc3VtbWFyeTtcclxuXHRcdGNvbnN0IHN1Ym1pdCA9IHRoaXMuI3N1Ym1pdDtcclxuXHJcblx0XHQvLyBiYXNpYyBjb250cm9sIHNldHVwXHJcblx0XHRiYWNrLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdG5leHQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRuZXh0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdHN1bW1hcnkuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRzdW1tYXJ5LmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdHN1Ym1pdC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdHN1Ym1pdC5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0aWYoc3RhdGUgPT0gRk9STVNUQVRFX1ZBTElEQVRJTkcpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRjb25zdCB7IGFjdGl2ZVBhZ2VJbmRleCwgYWN0aXZlUGFnZSwgbmV4dFBhZ2UsIHBhZ2VzLCB1c2VTdW1tYXJ5UGFnZSB9ID0gZm9ybTtcdFxyXG5cdFx0Y29uc3QgaGFzTmV4dFBhZ2UgPSAoYXdhaXQgbmV4dFBhZ2UpICE9IG51bGw7XHJcblxyXG5cdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9GSU5JU0hFRCkge1xyXG5cdFx0XHRiYWNrLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9TVU1NQVJZKSB7XHJcblx0XHRcdGJhY2suZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHN1Ym1pdC5kaXNhYmxlZCA9ICFmb3JtLnZhbGlkO1xyXG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2VJbmRleCA8PSAwO1xyXG5cclxuXHRcdFx0aWYgKGhhc05leHRQYWdlIHx8ICghYWN0aXZlUGFnZS52YWxpZCAmJiBhY3RpdmVQYWdlSW5kZXggKyAxIDwgcGFnZXMubGVuZ3RoKSkge1xyXG5cdFx0XHRcdG5leHQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRuZXh0LmRpc2FibGVkID0gYWN0aXZlUGFnZSA/ICFhY3RpdmVQYWdlLnZhbGlkIDogdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmICh1c2VTdW1tYXJ5UGFnZSAmJiBzdGF0ZSA9PSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0XHRzdW1tYXJ5LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0c3VtbWFyeS5kaXNhYmxlZCA9IGFjdGl2ZVBhZ2UgPyAhYWN0aXZlUGFnZS52YWxpZCA6IHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3VibWl0LmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZGVmaW5lKENvbnRyb2wpO1xyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9GSUVMRCwgXHJcblx0RVZFTlRfRklFTERfSU5QVVQgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCB7IGZpbmRXcmFwcGVyIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtcImZpbGUtZm9ybWF0XCJdO1xyXG5cclxuY2xhc3MgRmllbGQgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9GSUVMRDtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCN3cmFwcGVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMub24oRVZFTlRfRklFTERfSU5QVVQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUoZXZlbnQuZGV0YWlsIHx8IG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLiN3cmFwcGVyID0gZmluZFdyYXBwZXIodGhpcyk7XHJcblx0XHRcdGlmICh0aGlzLiN3cmFwcGVyKXtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLiN3cmFwcGVyLmluaXQoKTtcclxuXHRcdFx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKCkgPT4gdGhpcy4jd3JhcHBlci52YWxpZCk7XHJcblx0XHRcdFx0dGhpcy5wdWJsaXNoVmFsdWUodGhpcy4jd3JhcHBlci52YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlYWRvbmx5VXBkYXRlZCgpIHtcclxuXHRcdGlmICh0aGlzLiN3cmFwcGVyKSB0aGlzLiN3cmFwcGVyLnJlYWRvbmx5ID0gdGhpcy5yZWFkb25seTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jd3JhcHBlciA/IHRoaXMuI3dyYXBwZXIuYWNjZXB0VmFsdWUodmFsdWUpIDogZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMuI3dyYXBwZXIpIHJldHVybiB0aGlzLiN3cmFwcGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcclxuXHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xyXG5cdFx0Y29uc3Qgd3JhcHBlciA9IHRoaXMuI3dyYXBwZXI7XHJcblx0XHRpZiAod3JhcHBlcil7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnQgPSB3cmFwcGVyLnZhbHVlIHx8IG51bGw7XHJcblx0XHRcdGlmKGN1cnJlbnQgIT0gdmFsdWUpXHJcblx0XHRcdFx0YXdhaXQgd3JhcHBlci51cGRhdGVkVmFsdWUodmFsdWUpO1xyXG5cdFx0XHRcclxuXHRcdFx0YXdhaXQgc3VwZXIudXBkYXRlZFZhbHVlKHdyYXBwZXIudmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjb25kaXRpb25DaGFuZ2UsIHZhbGlkYXRpb25DaGFuZ2VkKXtcdFx0XHJcblx0XHRpZihjb25kaXRpb25DaGFuZ2UgJiYgdGhpcy5jb25kaXRpb24pe1x0XHRcdFxyXG5cdFx0XHRjb25zdCB3cmFwcGVyID0gdGhpcy4jd3JhcHBlcjtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB3cmFwcGVyLnZhbHVlIHx8IG51bGw7XHJcblx0XHRcdC8vY29uc29sZS5sb2coYHZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoJHt0aGlzLm5hbWV9ICgke2NvbmRpdGlvbkNoYW5nZX0sICR7dmFsaWRhdGlvbkNoYW5nZWR9KSAtPiAke3ZhbHVlfWApXHJcblx0XHRcdHRoaXMucmF3VmFsdWUodmFsdWUpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gc3VwZXIudmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjb25kaXRpb25DaGFuZ2UsIHZhbGlkYXRpb25DaGFuZ2VkKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShGaWVsZCk7XHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkO1xyXG4iLCJpbXBvcnQge1xyXG5cdC8qKiBOb2RlbmFtZXMgKi9cclxuXHROT0RFTkFNRV9GT1JNLFxyXG5cdE5PREVOQU1FX1BBR0UsXHJcblx0LyoqRXZlbnRzICovXHJcblx0RVZFTlRfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfUEFHRV9JTklUSUFMSVpFRCxcclxuXHRFVkVOVF9QQUdFX1JFTU9WRUQsXHJcblx0RVZFTlRfRk9STV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1NJVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9TVUJNSVQsXHJcblx0RVZFTlRfU1VCTUlUX1JFU1VMVFMsXHJcblx0LyoqQXR0cmlidXRlICovXHJcblx0QVRUUklCVVRFX05BTUUsXHJcblx0QVRUUklCVVRFX1VTRV9TVU1NQVJZX1BBR0UsXHJcblx0QVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX0NVU1RPTV9TVUJNSVRURURfRVZFTlQsXHJcblx0QVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX1JFUVVFU1RfTUVUSE9ELFxyXG5cdEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX0VORFBPSU5ULFxyXG5cdEFUVFJJQlVURV9TVEFURSxcclxuXHRBVFRSSUJVVEVfSU5QVVRfTU9ERV9BRlRFUl9TVUJNSVQsXHJcblx0LyoqRm9ybXN0YXRlcyAqL1xyXG5cdEZPUk1TVEFURV9JTlBVVCxcclxuXHRGT1JNU1RBVEVfU1VNTUFSWSxcclxuXHRGT1JNU1RBVEVfVkFMSURBVElORyxcclxuXHRGT1JNU1RBVEVfSU5JVCxcclxuXHRGT1JNU1RBVEVfRklOSVNIRUQsXHJcblx0Rk9STVNUQVRFX1NVQk1JVFRJTkcsXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IFwiLi9NZXNzYWdlXCI7XHJcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xyXG5pbXBvcnQgXCIuL1BhZ2VcIjtcclxuaW1wb3J0IFwiLi9Db250cm9sXCI7XHJcbmltcG9ydCBcIi4vUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgQmFzZVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGZyb20gXCIuL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMIGFzIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgU1RBVEVfU1VDQ0VTUyBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xyXG5pbXBvcnQgeyB2YWx1ZUhlbHBlciwgZmllbGRWYWx1ZU1hcFRvT2JqZWN0IH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFByb21pc2VVdGlscyB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX0NVU1RPTV9TVUJNSVRURURfRVZFTlQsIEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX0VORFBPSU5ULCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9NRVRIT0QsIEFUVFJJQlVURV9TVEFURSwgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUXTtcclxuXHJcbmNvbnN0IHJlYWRvbmx5ID0gKGZvcm0sIHJlYWRvbmx5KSA9PiB7XHJcblx0Zm9yIChsZXQgcGFnZSBvZiBmb3JtLnBhZ2VzKSB7XHJcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XHJcblx0XHRwYWdlLmFjdGl2ZSA9IHJlYWRvbmx5O1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGVBY3Rpb25zID0gYXN5bmMgKGFjdGlvbnMsIGRhdGEsIGNvbnRleHQpID0+IHtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yIChsZXQgYWN0aW9uIG9mIGFjdGlvbnMpIHtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IGF3YWl0IGFjdGlvbi5hY2NlcHQoZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0KSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gKGF3YWl0IGFjdGlvbi5leGVjdXRlKGRhdGEsIGNvbnRleHQpKSB8fCBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTLCBudWxsLCBkYXRhLCBjb250ZXh0KTtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0XHRpZiAocmVzdWx0LnN0YXRlID09IEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCkgcmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdFx0aWYodHlwZW9mIHJlc3VsdC5kYXRhICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5kYXRhICE9IG51bGwpXHJcblx0XHRcdFx0XHRkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdFx0aWYodHlwZW9mIHJlc3VsdC5jb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5kYXRhICE9IGNvbnRleHQpXHJcblx0XHRcdFx0XHRkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gobmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgZSkpO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGZvcm0gY2xhc3NcclxuICpcclxuICogQGNsYXNzIEZvcm1cclxuICogQHR5cGVkZWYge0Zvcm19XHJcbiAqIEBleHRlbmRzIHtDb21wb25lbnR9XHJcbiAqL1xyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9GT1JNO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I3N0YXRlID0gRk9STVNUQVRFX0lOSVQ7XHJcblx0I3BhZ2VzO1xyXG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcclxuXHQjZGF0YSA9IHt9O1xyXG5cdCN2YWxpZGF0aW9uID0gbnVsbDtcclxuXHQjc3VibWl0QWN0aW9ucyA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRm9ybS5cclxuXHQgKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLnJvb3Q7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9QQUdFX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX1BBR0VfUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IHBhZ2UgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdHRoaXMuI3BhZ2VzID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jaGlsZFZhbHVlQ2hhbmdlZChwYWdlLCBudWxsKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9JTklUSUFMSVpFRCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaW5pdCBmb3JtIGNvbXBvbmVudFxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xyXG5cclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTklUO1xyXG5cclxuXHRcdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcclxuXHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA+IDApIHRoaXMudG9OZXh0UGFnZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IHBhZ2VzIG9mIGZvcm1cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQYWdlW119XHJcblx0ICovXHJcblx0Z2V0IHBhZ2VzKCkge1xyXG5cdFx0aWYgKCF0aGlzLiNwYWdlcykgdGhpcy4jcGFnZXMgPSBBcnJheS5mcm9tKHRoaXMucm9vdC5maW5kKE5PREVOQU1FX1BBR0UpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBmb3JtIHN0YXRlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBzdGF0ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNzdGF0ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGZvcm0gc3RhdGVcclxuXHQgKi9cclxuXHRzZXQgc3RhdGUoc3RhdGUpIHtcclxuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuI3N0YXRlO1xyXG5cdFx0aWYgKHN0YXRlICE9IEZPUk1TVEFURV9WQUxJREFUSU5HKSB7XHJcblx0XHRcdGlmIChhY3R1YWwgPT0gRk9STVNUQVRFX0lOUFVUICYmIHN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkgcmVhZG9ubHkodGhpcywgdHJ1ZSk7XHJcblx0XHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0cmVhZG9ubHkodGhpcywgZmFsc2UpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmFjdGl2ZVBhZ2UpIHRoaXMuYWN0aXZlUGFnZS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLiNzdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3R1YWwgIT0gc3RhdGUpIHRoaXMudHJpZ2dlcihFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9TVEFURSwgc3RhdGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaXMgZm9ybSB2YWxpZFxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSBpZiAocGFnZS5jb25kaXRpb24gJiYgIXBhZ2UudmFsaWQpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBvciBzZXQgdmFsdWUgb2YgZm9ybVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHs/b2JqZWN0fSBkYXRhIC0gZm9ybSBkYXRhXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0PnxQcm9taXNlPHZvaWQ+fVxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBhd2FpdCBmb3JtLnZhbHVlKCkgLy8gcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiBmb3JtXHJcblx0ICogYXdhaXQgZm9ybS52YWx1ZSh7dGVzdDpcInZhbHVlXCJ9KSAvLyBzZXQgdmFsdWUgdG8gZm9ybVxyXG5cdCAqXHJcblx0ICovXHJcblx0YXN5bmMgdmFsdWUoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uKSBhd2FpdCB0aGlzLiN2YWxpZGF0aW9uO1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIHRoaXMuI2RhdGE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKFxyXG5cdFx0XHRcdHRoaXMucGFnZXMubWFwKChwYWdlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gcGFnZS5uYW1lO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5hbWUgPyBwYWdlLnZhbHVlKHZhbHVlSGVscGVyKGRhdGEsIG5hbWUpKSA6IHBhZ2UudmFsdWUoZGF0YSk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgaGFuZGxlID0gKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMucmVtb3ZlT24oaGFuZGxlLCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLnZhbHVlKGRhdGEpKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMub24oRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBoYW5kbGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBjdXJyZW50IGFjdGl2ZSBwYWdlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UGFnZX1cclxuXHQgKi9cclxuXHRnZXQgYWN0aXZlUGFnZSgpIHtcclxuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldCBjdXJyZW50IGFjdGl2ZSBwYWdlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UGFnZX1cclxuXHQgKi9cclxuXHRzZXQgYWN0aXZlUGFnZShwYWdlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmVQYWdlO1xyXG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCB8fCB0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRpZiAoY3VycmVudCkgY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XHJcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSB0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NJVEVfQ0hBTkdFRCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBmaXJzdCB2YWxpZCBwcmV2aW91cyBwYWdlIG9mIGN1cnJlbnQgYWN0aXZlIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQYWdlfVxyXG5cdCAqL1xyXG5cdGdldCBwcmV2UGFnZSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IHBhZ2VzW2ldO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRlKHBhZ2UpO1xyXG5cdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBuZXh0IHZhbGlkIHBhZ2Ugb2YgY3VycmVudCBhY3RpdmUgcGFnZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge1BhZ2V9XHJcblx0ICovXHJcblx0Z2V0IG5leHRQYWdlKCkge1xyXG5cdFx0cmV0dXJuIChhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHBhZ2VzID0gdGhpcy5wYWdlcztcclxuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCArIDE7XHJcblx0XHRcdGlmIChwYWdlcykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRjb25zdCBwYWdlID0gcGFnZXNbaV07XHJcblx0XHRcdFx0XHRhd2FpdCBwYWdlLnZhbGlkYXRlKHRoaXMuI2RhdGEpO1xyXG5cdFx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogY2hhbmdlIGFjdGl2ZSBwYWdlIHRvIGZpcnN0IHZhbGlkIHByZXZpb3VzIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHRvUHJldlBhZ2UoKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xyXG5cdFx0XHRpZiAocHJldikgdGhpcy5hY3RpdmVQYWdlID0gcHJldjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGNoYW5nZSBhY3RpdmUgcGFnZSB0byBuZXh0IHZhaWxkIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XHJcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcclxuXHRcdGlmIChuZXh0KSB7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcclxuXHRcdFx0dGhpcy5zdW1tYXJ5KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3dpdGNoIGZvcm0gaW50byBzdW1tYXJ5IHN0YXRlXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBzdW1tYXJ5KCkge1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9TVU1NQVJZO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGFsbCBmb3JtIHN1Ym1pdCBhY3Rpb25zXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7RGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25bXX1cclxuXHQgKi9cclxuXHRnZXQgc3VibWl0QWN0aW9ucygpIHtcclxuXHRcdGlmICghdGhpcy4jc3VibWl0QWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW107XHJcblx0XHRcdGNvbnN0IGVuZHBvaW50ID0gdGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX0VORFBPSU5UKTtcclxuXHRcdFx0aWYgKGVuZHBvaW50KSB7XHJcblx0XHRcdFx0Y29uc3QgbWV0aG9kID0gdGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX01FVEhPRCkgfHwgXCJwb3N0XCI7XHJcblx0XHRcdFx0dGhpcy5hcHBlbmQobmV3IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKGVuZHBvaW50LCBtZXRob2QpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5jaGlsZHJlbjtcclxuXHRcdFx0Zm9yIChsZXQgY2hpbGQgb2YgY2hpbGRzKSB7XHJcblx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQmFzZVN1Ym1pdEFjdGlvbikgYWN0aW9ucy5wdXNoKGNoaWxkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiNzdWJtaXRBY3Rpb25zID0gYWN0aW9ucztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jc3VibWl0QWN0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN1Ym1pdCBmb3JtXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBzdWJtaXQoeyBkYXRhID0gbnVsbCwgYWN0aW9ucyA9IFtdLCBjb250ZXh0ID0ge30gfSA9IHt9KSB7XHJcblx0XHRjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9TVUJNSVRUSU5HO1xyXG5cdFx0bGV0IGZvcm1kYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xyXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhmb3JtZGF0YSwgdGhpcy5wYWdlcyk7XHJcblx0XHRpZiAoIXZhbGlkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKGRhdGEpIGZvcm1kYXRhID0gT2JqZWN0VXRpbHMubWVyZ2UoZm9ybWRhdGEsIGRhdGEpO1xyXG5cclxuXHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdCh0aGlzLnN1Ym1pdEFjdGlvbnMpO1xyXG5cdFx0aWYgKGFjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IGV4ZWN1dGVBY3Rpb25zKGFjdGlvbnMsIGZvcm1kYXRhLCBjb250ZXh0KTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NVQk1JVF9SRVNVTFRTLCByZXN1bHRzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlULCBmb3JtZGF0YSk7XHJcblxyXG5cdFx0Y29uc3QgY3VzdG9tU3VibWl0dGVkRXZlbnQgPSAodGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5UKSB8fCBcIlwiKS50cmltKCk7XHJcblx0XHRpZiAoY3VzdG9tU3VibWl0dGVkRXZlbnQubGVuZ3RoID4gMCkgdGhpcy50cmlnZ2VyKGN1c3RvbVN1Ym1pdHRlZEV2ZW50LCBmb3JtZGF0YSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCkgPyBjdXJyZW50U3RhdGUgOiBGT1JNU1RBVEVfRklOSVNIRUQ7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjdmFsaWRhdGUocGFnZSkge1xyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IFByb21pc2VVdGlscy5sYXp5UHJvbWlzZSgpO1xyXG5cdFx0Y29uc3QgYWN0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBkYXRhID0gdGhpcy4jZGF0YTsgLy9hd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUpO1xyXG5cclxuXHRcdFx0Y29uc3QgdmFsaWQgPSBwYWdlID8gYXdhaXQgcGFnZS52YWxpZGF0ZShkYXRhKSA6IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucGFnZXMpO1xyXG5cclxuXHRcdFx0cHJvbWlzZS5yZXNvbHZlKHZhbGlkKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uID09IHByb21pc2UpIHtcclxuXHRcdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cdFx0XHRcdHRoaXMuI3ZhbGlkYXRpb24gPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uID09IG51bGwpIHtcclxuXHRcdFx0c2V0VGltZW91dChhY3Rpb24sIDEpO1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX1ZBTElEQVRJTkc7XHJcblx0XHR9IGVsc2UgdGhpcy4jdmFsaWRhdGlvbi50aGVuKGFjdGlvbik7XHJcblxyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbiA9IHByb21pc2U7XHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0XHRjb25zdCBtYXAgPSB0aGlzLiN2YWx1ZTtcclxuXHRcdC8vY29uc29sZS5sb2coYGZvcm0uY2hpbGRWYWx1ZUNoYW5nZWQoJHtmaWVsZC5uYW1lfSlgLCB7IGZpZWxkLCB2YWx1ZSB9KTtcclxuXHRcdGlmIChmaWVsZCkge1xyXG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIG1hcC5kZWxldGUoZmllbGQpO1xyXG5cdFx0XHRlbHNlIG1hcC5zZXQoZmllbGQsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiNkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KHRoaXMuI3ZhbHVlLCB0aGlzLnBhZ2VzKTtcclxuXHJcblx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5hY3RpdmVQYWdlO1xyXG5cdFx0aWYgKGFjdGl2ZVBhZ2UpIGF3YWl0IHRoaXMuI3ZhbGlkYXRlKGFjdGl2ZVBhZ2UpO1xyXG5cdFx0ZWxzZSBhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoRm9ybSk7XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRURdO1xyXG5cclxuLyoqXHJcbiAqIGJhc2ljIGZvcm0gYnV0dG9uIGNsYXNzXHJcbiAqIEBkYXRlIDMvMTMvMjAyNCAtIDEyOjE4OjI3IEFNXHJcbiAqXHJcbiAqIEBjbGFzcyBGb3JtQnV0dG9uXHJcbiAqIEB0eXBlZGVmIHtGb3JtQnV0dG9ufVxyXG4gKiBAZXh0ZW5kcyB7Q29tcG9uZW50fVxyXG4gKi9cclxuY2xhc3MgRm9ybUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNmb3JtO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHRcclxuXHJcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLmRpc2FibGVkKSB0aGlzLmV4ZWN1dGUoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdHRoaXMuYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmF0dHIoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKHRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRpZiAoIXRoaXMuI2Zvcm0pXHJcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIGFjdGl2ZSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCBkaXNhYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRElTQUJMRUQpO1xyXG5cdH1cclxuXHJcblx0c2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBkaXNhYmxlZCA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcImV4ZWN1dGVcIik7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm1CdXR0b247XHJcbiIsImltcG9ydCB7IFxyXG5cdC8vTk9ERSBOQU1FU1xyXG5cdE5PREVOQU1FX0xJU1QsIFxyXG5cdE5PREVOQU1FX0xJU1RfUk9XUywgXHJcblx0Tk9ERU5BTUVfTElTVF9ST1csIFxyXG5cdC8vRVZFTlQgTkFNRVNcclxuXHRFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgXHJcblx0RVZFTlRfTElTVF9ST1dfQURELCBcclxuXHRFVkVOVF9MSVNUX1JPV19ERUxFVEUsIFxyXG5cdC8vQVRUUklCVVRFIE5BTUVTXHJcblx0QVRUUklCVVRFX01JTiwgXHJcblx0QVRUUklCVVRFX01BWCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9pbmRleC5qc1wiO1xyXG5pbXBvcnQgQmFzZUZpZWxkIGZyb20gXCIuL0Jhc2VGaWVsZC5qc1wiO1xyXG5pbXBvcnQgXCIuL2xpc3QvRGVsZXRlUm93LmpzXCI7XHJcbmltcG9ydCBcIi4vbGlzdC9Sb3dzLmpzXCI7XHJcbmltcG9ydCBcIi4vbGlzdC9Sb3cuanNcIjtcclxuaW1wb3J0IFwiLi9saXN0L0FkZFJvdy5qc1wiO1xyXG5pbXBvcnQge0VWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1d9IGZyb20gXCIuL2xpc3QvQWRkUm93LmpzXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlci5qc1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9NSU4sIEFUVFJJQlVURV9NQVhdO1xyXG5cclxuY29uc3QgYnVpbGREYXRhID0gYXN5bmMgKHJvd3MsIHZhbHVlcykgPT4ge1xyXG5cdGxldCBkYXRhID0gW107XHJcblx0Zm9yIChsZXQgcm93IG9mIHJvd3MpIGRhdGEucHVzaCh2YWx1ZXMuZ2V0KHJvdykpO1xyXG5cclxuXHRpZiAoZGF0YS5sZW5ndGggPT0gMCkgZGF0YSA9IG51bGw7XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuY2xhc3MgTGlzdCBleHRlbmRzIEJhc2VGaWVsZCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1Q7XHJcblx0fVxyXG5cclxuXHQjdGVtcGxhdGU7XHJcblx0I2NvbnRhaW5lcjtcclxuXHQjdmFsdWVzID0gbmV3IE1hcCgpO1xyXG5cdCNhZGRSb3dCdXR0b247XHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLnJvb3Q7XHJcblx0XHRyb290Lm9uKEVWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1csIChldmVudCkgPT4ge1xyXG5cdFx0XHR0aGlzLiNhZGRSb3dCdXR0b24gPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdGlmKHRhcmdldCAhPSB0aGlzKXtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX0xJU1RfUk9XX0FERCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0Y29uc3QgeyByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdFx0aWYgKCFyZWFkb25seSkgdGhpcy5jcmVhdGVSb3coKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfTElTVF9ST1dfREVMRVRFLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRjb25zdCB7IHJvd3MsIHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0XHRpZiAoIXJlYWRvbmx5KSB7XHJcblx0XHRcdFx0Y29uc3Qgcm93ID0gZXZlbnQudGFyZ2V0LnBhcmVudChOT0RFTkFNRV9MSVNUX1JPVyk7XHJcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcclxuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICgpID0+IHtcclxuXHRcdFx0Y29uc3QgeyByb3dzLCBtaW4sIG1heCwgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRcdGNvbnN0IGxlbmd0aCA9IHJvd3MubGVuZ3RoO1xyXG5cdFx0XHRpZiAodGhpcy4jYWRkUm93QnV0dG9uICYmICFyZWFkb25seSkge1xyXG5cdFx0XHRcdGlmIChsZW5ndGggPT0gbWF4KSB0aGlzLiNhZGRSb3dCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGxlbmd0aCA8IG1heCkgdGhpcy4jYWRkUm93QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1pbiA8PSBsZW5ndGggJiYgbGVuZ3RoIDw9IG1heDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoZGF0YSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gYXdhaXQgdmFsaWRhdGVGaWVsZHMoZGF0YSwgdGhpcy5yb3dzKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcdFx0XHRcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHRjb25zdCByb3dUZW1wbGF0ZSA9IHRoaXMuZmluZChcInRlbXBsYXRlXCIpLmZpcnN0KCk7XHJcblx0XHRcdGlmKHJvd1RlbXBsYXRlKVxyXG5cdFx0XHRcdHRoaXMuI3RlbXBsYXRlID0gcm93VGVtcGxhdGUuY29udGVudDtcclxuXHJcblx0XHRcdHRoaXMuI2NvbnRhaW5lciA9IHRoaXMuZmluZChOT0RFTkFNRV9MSVNUX1JPV1MpLmZpcnN0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XHJcblx0XHRjb25zdCB7IHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0Zm9yIChsZXQgcm93IG9mIHRoaXMucm93cykge1xyXG5cdFx0XHRyb3cucmVhZG9ubHkgPSByZWFkb25seTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCByb3dzKCkge1xyXG5cdFx0aWYodGhpcy4jY29udGFpbmVyKVxyXG5cdFx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNjb250YWluZXIuY2hpbGRyZW4pO1xyXG5cdFx0cmV0dXJuIFtdO1xyXG5cdH1cclxuXHJcblx0Z2V0IG1pbigpIHtcclxuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUlOKSkgcmV0dXJuIE1hdGgubWF4KDAsIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUlOKSkpO1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cclxuXHRnZXQgbWF4KCkge1xyXG5cdFx0aWYgKHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9NQVgpKSByZXR1cm4gcGFyc2VJbnQodGhpcy5hdHRyKEFUVFJJQlVURV9NQVgpKTtcclxuXHRcdHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gIXZhbHVlIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcblx0fVxyXG5cclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlID8gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0pIDogbnVsbDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZVJvdyh2YWx1ZSkge1xyXG5cdFx0Y29uc3Qgcm93ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLiN0ZW1wbGF0ZSwgdHJ1ZSkuY2hpbGRyZW5bMF07XHJcblx0XHRhd2FpdCB0aGlzLiNjb250YWluZXIuYXBwZW5kKHJvdyk7XHJcblxyXG5cdFx0aWYgKHZhbHVlKSBhd2FpdCByb3cudmFsdWUodmFsdWUpO1xyXG5cclxuXHRcdHJldHVybiByb3c7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWVzKSB7XHJcblx0XHR0aGlzLiN2YWx1ZXMuY2xlYXIoKTtcclxuXHRcdHRoaXMuI2NvbnRhaW5lci5lbXB0eSgpO1xyXG5cdFx0aWYgKHZhbHVlcykgYXdhaXQgUHJvbWlzZS5hbGwodmFsdWVzLm1hcCh2YWx1ZSA9PiB0aGlzLmNyZWF0ZVJvdyh2YWx1ZSkpKTtcclxuXHJcblx0XHRyZXR1cm4gYXdhaXQgYnVpbGREYXRhKHRoaXMucm93cywgdGhpcy4jdmFsdWVzKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgdmFsdWUpIHtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLiN2YWx1ZXM7XHJcblxyXG5cdFx0aWYgKG5vVmFsdWUodmFsdWUpKSB0aGlzLiN2YWx1ZXMuZGVsZXRlKHJvdyk7XHJcblx0XHRlbHNlIHRoaXMuI3ZhbHVlcy5zZXQocm93LCB2YWx1ZSk7XHJcblxyXG5cdFx0YXdhaXQgc3VwZXIuY2hpbGRWYWx1ZUNoYW5nZWQocm93LCB2YWx1ZSk7XHJcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgYnVpbGREYXRhKHRoaXMucm93cywgdmFsdWVzKTtcclxuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGRhdGEpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKExpc3QpO1xyXG5leHBvcnQgZGVmYXVsdCBMaXN0O1xyXG4iLCJpbXBvcnQge0V4cHJlc3Npb25SZXNvbHZlcn0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50LCBkZWZpbmV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFxyXG5cdE5PREVOQU1FX01FU1NBR0UsXHJcblx0RVZFTlRfTUVTU0FHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcclxuXHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTUVTU0FHRTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCl7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTUVTU0FHRV9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGRhdGEpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblx0fVxyXG59XHJcbmRlZmluZShNZXNzYWdlKTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfUEFHRSwgIFxyXG5cdEFUVFJJQlVURV9TVEVQLCBcclxuXHRFVkVOVF9QQUdFX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX1BBR0VfUkVNT1ZFRFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XHJcblxyXG4vKipcclxuICogcGFnZSBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgUGFnZVxyXG4gKiBAdHlwZWRlZiB7UGFnZX1cclxuICogQGV4dGVuZHMge0NvbnRhaW5lcn1cclxuICovXHJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb250YWluZXIge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9QQUdFO1xyXG5cdH1cclxuXHRcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfUEFHRV9JTklUSUFMSVpFRCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVzdHJveSgpe1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1BBR0VfUkVNT1ZFRCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHRnZXQgc3RlcCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfU1RFUCk7XHJcblx0fVxyXG5cdFxyXG5cdGNvbmRpdGlvblVwZGF0ZWQoKXt9XHJcbn1cclxuZGVmaW5lKFBhZ2UpO1xyXG5leHBvcnQgZGVmYXVsdCBQYWdlO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9GT1JNLCBcclxuXHROT0RFTkFNRV9QUk9HRVNTQkFSLFxyXG5cdE5PREVOQU1FX1NURVAsXHJcblx0RVZFTlRfU0lURV9DSEFOR0VELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VELFxyXG5cdEZPUk1TVEFURV9JTklULFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9JTlBVVCxcclxuXHRGT1JNU1RBVEVfU1VNTUFSWSxcclxuXHRGT1JNU1RBVEVfRklOSVNIRUQsIFxyXG5cdEFUVFJJQlVURV9QUk9HUkVTUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQge0NvbXBvbmVudCAsZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IFwiLi9TdGVwXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9QUk9HUkVTU107XHJcblxyXG5jb25zdCBmaXJzdFN0ZXBQYWdlSW5kZXggPSAocGFnZXMsIHN0ZXAsIGFjdGl2ZVBhZ2UpID0+IHtcclxuXHRmb3IgKGxldCBwYWdlIG9mIHBhZ2VzKSB7XHJcblx0XHRpZiAocGFnZS5zdGVwID09IHN0ZXAgJiYgcGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xyXG5cdFx0ZWxzZSBpZiAocGFnZSA9PSBhY3RpdmVQYWdlKSByZXR1cm47XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9QUk9HRVNTQkFSO1xyXG5cdH1cclxuXHJcblx0I2Zvcm07XHJcblx0I3N0ZXBzO1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuI2Zvcm0pIHJldHVybjtcclxuXHRcdFx0aWYgKHRhcmdldCA9PSB0aGlzKSByZXR1cm47XHRcdFx0XHJcblx0XHRcdGNvbnN0IHN0ZXAgPSB0YXJnZXQuaXMoTk9ERU5BTUVfU1RFUCkgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50KE5PREVOQU1FX1NURVApO1xyXG5cdFx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybTtcclxuXHJcblx0XHRcdGlmICghc3RlcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0Y29uc3Qge3N0YXRlLCBwYWdlcywgYWN0aXZlUGFnZX0gPSBmb3JtO1xyXG5cdFx0XHRjb25zdCBzdGVwTmFtZSA9IHN0ZXAubmFtZTtcclxuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBmaXJzdFN0ZXBQYWdlSW5kZXgocGFnZXMsIHN0ZXBOYW1lLCBhY3RpdmVQYWdlKTtcclxuXHRcdFx0XHRpZiAocGFnZSkgZm9ybS5hY3RpdmVQYWdlID0gcGFnZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5wcm9ncmVzcyA9IDA7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdHRoaXMuI3N0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FX1NURVApO1xyXG5cdFx0XHR0aGlzLiNmb3JtLm9uKFtFVkVOVF9TSVRFX0NIQU5HRUQsRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEXSwgKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHN0YXRlID0gZm9ybS5zdGF0ZTtcclxuXHRcdFx0XHRpZihGT1JNU1RBVEVfVkFMSURBVElORyA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRjb25zdCB7YWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBwYWdlc30gPSBmb3JtO1xyXG5cdFx0XHRcdGlmICghYWN0aXZlUGFnZSkgXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdGNvbnN0IGNvdW50ID0gcGFnZXMubGVuZ3RoO1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURV9JTklUO1xyXG5cdFx0XHRcdGNvbnN0IHByb2dyZXNzID0gTWF0aC5mbG9vcigoYWN0aXZlUGFnZUluZGV4ICogMTAwKSAvIGNvdW50KTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgc3RlcCBvZiB0aGlzLnN0ZXBzKSB7XHJcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3RlcC5uYW1lO1xyXG5cdFx0XHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gcGFnZVN0ZXA7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkpIHtcclxuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURV9TVU1NQVJZO1xyXG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFX0ZJTklTSEVEO1xyXG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMucHJvZ3Jlc3MgPSBzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVfRklOSVNIRUQgPyAxMDAgOiBwcm9ncmVzcztcclxuXHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBzdGVwcygpe1xyXG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jc3RlcHMpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHByb2dyZXNzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MpO1xyXG5cdH1cclxuXHJcblx0c2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XHJcblx0XHRpZiAodGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSkgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgKyBcIiVcIik7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTLCBNYXRoLm1heCgwLCBNYXRoLm1pbihwcm9ncmVzcywgMTAwKSkpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKFByb2dyZXNzQmFyKTtcclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX1NURVAsIFxyXG5cdEFUVFJJQlVURV9OQU1FLCBcclxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcclxuXHRBVFRSSUJVVEVfUkVBRE9OTFkgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuaW1wb3J0IHtDb21wb25lbnQsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWV07XHJcblxyXG5jbGFzcyBTdGVwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9TVEVQO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX05BTUUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcclxuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xyXG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHJlYWRvbmx5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRUFET05MWSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShTdGVwKTtcclxuZXhwb3J0IGRlZmF1bHQgU3RlcDtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfVkFMSURBVElPTiwgRVZFTlRfVkFMSURBVElPTl9SRU1PVkVELCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xyXG4vKipcclxuICogQHR5cGVkZWYgVmFsaWRhdGlvbk9wdGlvblxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5oYXNWYWx1ZVxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5yZXF1aXJlZFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5jb25kaXRpb25cclxuICogQHByb3BlcnR5IHtib29sZWFufSBvcHRpb24uZWRpdGFibGVcclxuICogQHByb3BlcnR5IHtvYmplY3R9IG9wdGlvbi5kYXRhXHJcbiAqIEBwcm9wZXJ0eSB7QmFzZX0gb3B0aW9uLmJhc2VcclxuICovXHJcblxyXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9WQUxJREFUSU9OO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBhY3RpdmUgc3RhdGVcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzZXQgYWN0aXZlIHN0YXRlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogY29uZGl0aW9uIHN0cmluZyBmb3IgZXZhbHVhdGlvblxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHZhbGlkYXRlXHJcblx0ICogXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtWYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuXHQgKi9cclxuXHRhc3luYyB2YWxpZGF0ZSh7IGhhc1ZhbHVlLCBkYXRhIH0pIHtcclxuXHRcdGNvbnN0IHZhbGlkID0gaGFzVmFsdWUgPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpIDogdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZlID0gIXZhbGlkO1xyXG5cdFx0cmV0dXJuIHZhbGlkO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoVmFsaWRhdGlvbik7XHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfQkFDSyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQmFja0J1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfQkFDSztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xyXG5kZWZpbmUoQmFja0J1dHRvbik7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfTkVYVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9ORVhUO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5leHRCdXR0b247XHJcbmRlZmluZShOZXh0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQsIEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCBCYXNlU3VibWl0QWN0aW9uIGZyb20gXCIuLi9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgU3VibWl0QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQ7XHJcblx0fVxyXG5cclxuXHQjaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHQjY29uZGl0aW9uO1xyXG5cdCNzdWJtaXRBY3Rpb25zO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblxyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKHRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcdFx0XHRcclxuXHRcdFx0dGhpcy4jY29uZGl0aW9uID0gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGlvbnMoKSB7XHJcblx0XHRpZiAoIXRoaXMuI3N1Ym1pdEFjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IFtdO1xyXG5cdFx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLmNoaWxkcmVuO1xyXG5cdFx0XHRmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHMpIHtcclxuXHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBCYXNlU3VibWl0QWN0aW9uKSBhY3Rpb25zLnB1c2goY2hpbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuI3N1Ym1pdEFjdGlvbnMgPSBhY3Rpb25zO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLiNzdWJtaXRBY3Rpb25zO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuXHR9XHJcblx0XHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS5zdWJtaXQoe2FjdGlvbnM6dGhpcy5hY3Rpb25zfSk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN1Ym1pdEJ1dHRvbjtcclxuZGVmaW5lKFN1Ym1pdEJ1dHRvbik7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWVxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgU3VtbWFyeUJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfU1VNTUFSWTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnlCdXR0b247XHJcbmRlZmluZShTdW1tYXJ5QnV0dG9uKTtcclxuIiwiaW1wb3J0IEJhY2tCdXR0b24gZnJvbSBcIi4vQmFja0J1dHRvblwiO1xuaW1wb3J0IE5leHRCdXR0b24gZnJvbSBcIi4vTmV4dEJ1dHRvblwiO1xuaW1wb3J0IFN1bW1hcnlCdXR0b24gZnJvbSBcIi4vU3VtbWFyeUJ1dHRvblwiO1xuaW1wb3J0IFN1Ym1pdEJ1dHRvbiBmcm9tIFwiLi9TdWJtaXRCdXR0b25cIjtcblxuZXhwb3J0IHtcblx0QmFja0J1dHRvbixcblx0TmV4dEJ1dHRvbixcblx0U3VtbWFyeUJ1dHRvbixcblx0U3VibWl0QnV0dG9uLFxufTtcbiIsImltcG9ydCB7IEFUVFJJQlVURV9DT05ESVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY2xhc3MgQ29uZGl0aW9uSGFuZGxlIHtcclxuXHJcbiAgICAjYmFzZTtcclxuICAgICNjb25kaXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7ICBcclxuICAgICAgICB0aGlzLiNiYXNlID0gYmFzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0KCl7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbmRpdGlvbigpe1xyXG4gICAgICAgIGlmKCF0aGlzLiNjb25kaXRpb24pXHJcbiAgICAgICAgICAgIHRoaXMuI2NvbmRpdGlvbiA9IHRoaXMuI2Jhc2UuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB2YWxpZGF0ZShkYXRhKXtcclxuICAgICAgICBjb25zdCBiYXNlID0gdGhpcy4jYmFzZTsgICAgICAgIFxyXG4gICAgICAgIGxldCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gYmFzZS5jb25kaXRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgY29uZGl0aW9uKCR7YmFzZS5uYW1lfSlgLCBjb25kaXRpb24sIGRhdGEpOyAgICAgICAgXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XHJcbiAgICAgICAgfSBjYXRjaHtcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb25kaXRpb24gIT0gY3VycmVudClcclxuICAgICAgICAgICAgYmFzZS5jb25kaXRpb24gPSBjb25kaXRpb25cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgY29uZGl0aW9uKCR7YmFzZS5uYW1lfSkgcmVzdWx0OmAsIGNvbmRpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbjsgICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25kaXRpb25IYW5kbGU7IiwiaW1wb3J0IHsgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jbGFzcyBFZGl0YWJsZUhhbmRsZSB7XHJcblx0I2Jhc2U7XHJcblx0I2NvbmRpdGlvbiA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcclxuXHRcdHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLiNjb25kaXRpb24gPT0gbnVsbCkgdGhpcy4jY29uZGl0aW9uID0gKHRoaXMuI2Jhc2UuYXR0cihBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OKSB8fCBcIlwiKS50cmltKCkgfHwgZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbmRpdGlvbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuXHRcdGxldCBlZGl0YWJsZSA9IHRydWU7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSBiYXNlLmVkaXRhYmxlO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHQvL2NvbnNvbGUubG9nKFwidmFsaWRhdGUgZWRpdGFibGU6XCIsIHtjb25kaXRpb24sIGRhdGEsIGJhc2V9KTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGVkaXRhYmxlID0gY29uZGl0aW9uID8gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSkgOiB0cnVlO1xyXG5cdFx0fSBjYXRjaCB7XHJcblx0XHRcdGVkaXRhYmxlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGVkaXRhYmxlICE9IGN1cnJlbnQpIHRoaXMuI2Jhc2UuZWRpdGFibGUgPSBlZGl0YWJsZTtcclxuXHJcblx0XHRyZXR1cm4gZWRpdGFibGU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0YWJsZUhhbmRsZTtcclxuIiwiaW1wb3J0IHtcclxuICAgIEVWRU5UX01FU1NBR0VfUkVNT1ZFRCxcclxuICAgIE5PREVOQU1FX01FU1NBR0VcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFkZEFsbFRvU2V0IH0gZnJvbSBcIi4uL3V0aWxzL0RhdGFIZWxwZXIuanNcIjtcclxuaW1wb3J0IHtmaW5kTWVzc2FnZXN9IGZyb20gXCIuLi91dGlscy9NZXNzYWdlSGVscGVyLmpzXCI7XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlSGFuZGxlIHtcclxuXHJcbiAgICAjYmFzZSA9IG51bGw7XHJcbiAgICAjbWVzc2FnZXMgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7XHJcbiAgICAgICAgdGhpcy4jYmFzZSA9IGJhc2U7XHJcblxyXG4gICAgICAgIGJhc2Uub24oRVZFTlRfTUVTU0FHRV9SRU1PVkVELCAoZXZlbnQpID0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLiNtZXNzYWdlcy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICB9KTsgXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdCgpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgeyBmb3JtLCBpZCwgbmFtZSB9ID0gYmFzZTtcclxuXHRcdGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlcztcclxuXHRcdGlmIChpZCAmJiBpZC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZm9ybS5maW5kKGAke05PREVOQU1FX01FU1NBR0V9W2Zvcj1cIiR7aWR9XCJdYCkpO1xyXG5cdFx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZm9ybS5maW5kKGAke05PREVOQU1FX01FU1NBR0V9W2Zvcj1cIiMke2lkfVwiXWApKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZSAmJiBuYW1lLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGFkZEFsbFRvU2V0KG1lc3NhZ2VzLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfTUVTU0FHRX1bZm9yPVwiJHtuYW1lfVwiXWApKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZmluZE1lc3NhZ2VzKGJhc2UpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI21lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgdGhpcy4jbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UudXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUhhbmRsZTsiLCJpbXBvcnQgeyBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIE5PREVOQU1FX1ZBTElEQVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFkZEFsbFRvU2V0IH0gZnJvbSBcIi4uL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgZmluZFZhbGlkYXRpb25zIH0gZnJvbSBcIi4uL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IFwiLi4vQmFzZVwiO1xyXG5pbXBvcnQgXCIuLi9WYWxpZGF0aW9uXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgdHlwZSBpcyBjYWxsZWQgYHJlcXVlc3RDYWxsYmFja2AgYW5kIGlzIGRpc3BsYXllZCBhcyBhIGdsb2JhbCBzeW1ib2wuXHJcbiAqXHJcbiAqIEBjYWxsYmFjayBDdXN0b21WYWxpZGF0aW9uXHJcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vVmFsaWRhdGlvblwiKS5WYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuICovXHJcblxyXG4vKipcclxuICogQGFzeW5jXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBcclxuICogZXhlY3V0ZSBjdXN0b20gdmFsaWRhdGlvbiBjYWxsYmFjayBmdW5jdGlvbnNcclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSB2YWxpZGF0aW9uc1xyXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL1ZhbGlkYXRpb25cIikuVmFsaWRhdGlvbk9wdGlvbn0gb3B0aW9uXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gKi9cclxuY29uc3QgdmFsaWRhdGVDdXN0b21WYWxpZGF0aW9ucyA9IGFzeW5jICh2YWxpZGF0aW9ucywgb3B0aW9uKSA9PiB7XHJcblx0aWYgKCh2YWxpZGF0aW9ucy5zaXplID09IDApKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvbWlzZXMgPSBhd2FpdCBQcm9taXNlLmFsbChBcnJheS5mcm9tKHZhbGlkYXRpb25zKS5tYXAoKHZhbGlkYXRpb24pID0+IHZhbGlkYXRpb24ob3B0aW9uKSkpO1xyXG5cdHJldHVybiBwcm9taXNlcy5ldmVyeSgodmFsaWQpID0+IHZhbGlkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAYXN5bmNcclxuICogQGZ1bmN0aW9uXHJcbiAqIFxyXG4gKiBleGVjdXRlIHZhbGlkYXRpb25zXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PFZhbGlkYXRpb24+fSB2YWxpZGF0aW9uc1xyXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL1ZhbGlkYXRpb25cIikuVmFsaWRhdGlvbk9wdGlvbn0gb3B0aW9uXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gKi9cclxuY29uc3QgdmFsaWRhdGVWYWxpZGF0aW9ucyA9IGFzeW5jICh2YWxpZGF0aW9ucywgb3B0aW9uKSA9PiB7XHJcblx0aWYgKCh2YWxpZGF0aW9ucy5zaXplID09IDApKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvbWlzZXMgPSBhd2FpdCBQcm9taXNlLmFsbChBcnJheS5mcm9tKHZhbGlkYXRpb25zKS5tYXAoKHZhbGlkYXRpb24pID0+IHZhbGlkYXRpb24udmFsaWRhdGUob3B0aW9uKSkpO1xyXG5cdHJldHVybiBwcm9taXNlcy5ldmVyeSgodmFsaWQpID0+IHZhbGlkKTtcclxufTtcclxuXHJcbmNsYXNzIFZhbGlkYXRpb25IYW5kbGUge1xyXG5cdC8qKlxyXG5cdCAqIFJlZmVyZW5jZSBiYXNlIG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHR5cGUge0Jhc2V9XHJcblx0ICovXHJcblx0I2Jhc2UgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZXNjcmlwdGlvbiBwbGFjZWhvbGRlclxyXG5cdCAqXHJcblx0ICogQHR5cGUge1NldDxWYWxpZGF0aW9uPn1cclxuXHQgKi9cclxuXHQjdmFsaWRhdGlvbnMgPSBuZXcgU2V0KCk7XHJcblx0I2N1c3RvbXMgPSBuZXcgU2V0KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJhc2UpIHtcclxuXHRcdHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG5cclxuXHRcdGJhc2Uub24oRVZFTlRfVkFMSURBVElPTl9SRU1PVkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdHRoaXMuI3ZhbGlkYXRpb25zLmRlbGV0ZShldmVudC50YXJnZXQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0Y29uc3QgYmFzZSA9IHRoaXMuI2Jhc2U7XHJcblx0XHRjb25zdCB7IGZvcm0sIGlkLCBuYW1lIH0gPSBiYXNlO1xyXG5cdFx0Y29uc3QgdmFsaWRhdGlvbnMgPSB0aGlzLnZhbGlkYXRpb25zO1xyXG5cdFx0aWYgKGlkICYmIGlkLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGFkZEFsbFRvU2V0KHZhbGlkYXRpb25zLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfVkFMSURBVElPTn1bZm9yPVwiJHtpZH1cIl1gKSk7XHJcblx0XHRcdGFkZEFsbFRvU2V0KHZhbGlkYXRpb25zLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfVkFMSURBVElPTn1bZm9yPVwiIyR7aWR9XCJdYCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuYW1lICYmIG5hbWUubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9WQUxJREFUSU9OfVtmb3I9XCIke25hbWV9XCJdYCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZEFsbFRvU2V0KHZhbGlkYXRpb25zLCBmaW5kVmFsaWRhdGlvbnMoYmFzZSkpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkYXRpb25zKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3ZhbGlkYXRpb25zO1xyXG5cdH1cclxuXHJcblx0Z2V0IGN1c3RvbVZhbGlkYXRpb25zKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2N1c3RvbXM7XHJcblx0fVxyXG5cclxuXHRhZGRDdXN0b21WYWxpZGF0aW9uKHZhbGlkYXRpb24pIHtcclxuXHRcdHRoaXMuI2N1c3RvbXMuYWRkKHZhbGlkYXRpb24pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0Y29uc3QgYmFzZSA9IHRoaXMuI2Jhc2U7XHJcblx0XHRjb25zdCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSB9ID0gYmFzZTtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke2Jhc2Uubm9kZU5hbWV9KCR7YmFzZS5uYW1lfSkgdmFsaWRhdGU6YCwgeyBoYXNWYWx1ZSwgcmVxdWlyZWQsIGNvbmRpdGlvbiwgZWRpdGFibGUsIGN1cnJlbnRWYWxpZCB9LCBkYXRhKTtcclxuXHRcdGxldCB2YWxpZCA9IHRydWU7XHJcblx0XHRpZiAoY29uZGl0aW9uKSB7XHJcblx0XHRcdHZhbGlkID0gcmVxdWlyZWQgPyBoYXNWYWx1ZSA6IHRydWU7XHJcblxyXG5cdFx0XHRjb25zdCBvcHRpb24gPXtcclxuXHRcdFx0XHRoYXNWYWx1ZTogaGFzVmFsdWUsIFxyXG5cdFx0XHRcdHJlcXVpcmVkOiByZXF1aXJlZCwgXHJcblx0XHRcdFx0Y29uZGl0aW9uOiBjb25kaXRpb24sIFxyXG5cdFx0XHRcdGVkaXRhYmxlOiBlZGl0YWJsZSxcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGJhc2VcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJ2YWxpZGF0aW9uIG9wdGlvbjpcIiwgb3B0aW9uKVxyXG5cclxuXHRcdFx0dmFsaWQgPSBhd2FpdCB2YWxpZGF0ZUN1c3RvbVZhbGlkYXRpb25zKHRoaXMuI2N1c3RvbXMsIG9wdGlvbikgJiYgdmFsaWQ7XHJcblx0XHRcdHZhbGlkID0gYXdhaXQgdmFsaWRhdGVWYWxpZGF0aW9ucyh0aGlzLiN2YWxpZGF0aW9ucywgb3B0aW9uKSAmJiB2YWxpZDtcclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLnZhbGlkID0gdmFsaWQ7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHtiYXNlLm5vZGVOYW1lfSgke2Jhc2UubmFtZX0pIHZhbGlkYXRlIHJlc3VsdDpgLCB7dmFsaWR9KTtcclxuXHRcdHJldHVybiB2YWxpZDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb25IYW5kbGU7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfQUREX1JPVywgXHJcblx0RVZFTlRfTElTVF9ST1dfQUREXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1cgPSBgJHtOT0RFTkFNRV9MSVNUX0FERF9ST1d9OmluaXRpYWxpemVkYDtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQWRkUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCl7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9BRERfUk9XO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XKSlcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0xJU1RfUk9XX0FERCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoQWRkUm93KTtcclxuZXhwb3J0IGRlZmF1bHQgQWRkUm93O1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9MSVNUX0RFTEVURV9ST1csXHJcblx0RVZFTlRfTElTVF9ST1dfREVMRVRFXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5cclxuY2xhc3MgRGVsZXRlUm93IGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQVRUUklCVVRFUyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlXHQ9IHRydWU7XHJcblx0fVxyXG5cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0xJU1RfUk9XX0RFTEVURSk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoRGVsZXRlUm93KTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZXRlUm93O1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9MSVNUX1JPV1xyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi4vQ29udGFpbmVyXCI7XHJcbmltcG9ydCBcIi4vRGVsZXRlUm93XCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIExpc3RSb3cgZXh0ZW5kcyBDb250YWluZXIge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX1JPVztcclxuXHR9XHRcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHt9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTGlzdFJvdy5OT0RFTkFNRSwgTGlzdFJvdyk7XHJcbmV4cG9ydCBkZWZhdWx0IExpc3RSb3c7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0xJU1RfUk9XUyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBMaXN0Um93cyBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9ST1dTO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKExpc3RSb3dzKTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdFJvd3M7XHJcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMLCBTVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vU3VibWl0QWN0aW9uUmVzdWx0XCI7XHJcbmltcG9ydCB7IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTiwgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcbi8vIGxvZ2ljXHJcbi8qKlxyXG4gKiBCYXNlU3VibWl0QWN0aW9uIGNsYXNzXHJcbiAqXHJcbiAqIEBjbGFzcyBCYXNlU3VibWl0QWN0aW9uXHJcbiAqIEB0eXBlZGVmIHtCYXNlU3VibWl0QWN0aW9ufVxyXG4gKiBAZXh0ZW5kcyB7Q29tcG9uZW50fVxyXG4gKi9cclxuY2xhc3MgQmFzZVN1Ym1pdEFjdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIFNUQVRFUyA9IHtcclxuXHRcdEZBSUw6IFNUQVRFX0ZBSUwsXHJcblx0XHRTVUNDRVNTOiBTVEFURV9TVUNDRVNTLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNmb3JtO1xyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdGlmICh0aGlzLiNmb3JtKSB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2Zvcm07XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NlcHQoZGF0YSA9IHt9KSB7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0XHRpZiAoY29uZGl0aW9uKSByZXR1cm4gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIVxyXG5cdCAqL1xyXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSA9IHt9LCBjb250ZXh0ID0ge30pIHtcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KFNUQVRFX0ZBSUwsIFwibm90IGltcGxlbWVudGVkXCIsIG51bGwsIGRhdGEsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYXNlU3VibWl0QWN0aW9uO1xyXG4iLCJpbXBvcnQge2RlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vQmFzZVN1Ym1pdEFjdGlvblwiO1xyXG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX1NVQ0NFU1MsIFNUQVRFX0ZBSUwgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY29uc3QgTk9ERU5BTUUgPSBgJHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfS1kZWZhdWx0YDtcclxuXHJcbmNsYXNzIERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGV4dGVuZHMgQmFzZVN1Ym1pdEFjdGlvbiB7XHJcblxyXG4gICAgc3RhdGljIGdldCBOT0RFTkFNRSgpIHsgcmV0dXJuIE5PREVOQU1FO31cclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKGVuZHBvaW50LCBtZXRob2QpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XHJcblx0XHR0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSA9IHt9LCBjb250ZXh0ID0ge30pIHtcdFx0XHJcblx0XHRsZXQgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50O1xyXG5cdFx0ZW5kcG9pbnQgPSBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZVRleHQoZW5kcG9pbnQsIGRhdGEsIGVuZHBvaW50KTtcclxuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIGxvY2F0aW9uKTtcclxuXHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG5cdFx0XHRjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcblx0XHRcdG1vZGU6IFwiY29yc1wiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG5cdFx0fSk7XHRcdFxyXG5cdFx0XHRcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KHRoaXMsIHJlc3BvbnNlLm9rID8gU1RBVEVfU1VDQ0VTUyA6IFNUQVRFX0ZBSUwsIHJlc3BvbnNlLCBkYXRhLCBjb250ZXh0KTtcdFx0XHJcblx0fVxyXG59O1xyXG5cclxuZGVmaW5lKERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb247XHJcbiIsImV4cG9ydCBjb25zdCBTVEFURV9TVUNDRVNTID0gXCJzdWNjZXNzXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRkFJTCA9IFwiZmFpbFwiO1xuXG5jbGFzcyBTdWJtaXRBY3Rpb25SZXN1bHQge1xuXG4gICAgc3RhdGljIGdldCBTVEFURV9TVUNDRVNTKCl7cmV0dXJuIFNUQVRFX1NVQ0NFU1M7fVxuICAgIHN0YXRpYyBnZXQgU1RBVEVfRkFJTCgpe3JldHVybiBTVEFURV9GQUlMO31cblxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbiwgc3RhdGUsIG1lc3NhZ2UsIGRhdGEsIGNvbnRleHQpe1xuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfTsgICAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXRBY3Rpb25SZXN1bHQ7IiwiaW1wb3J0IHsgU1BFQ0lBTFZBUlMsIE5PREVOQU1FX0xJU1RfUk9XIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcblxyXG4vKipcclxuKiBQZXJmb3JtcyBhIGRlZXAgbWVyZ2Ugb2Ygb2JqZWN0cyBhbmQgcmV0dXJucyBuZXcgb2JqZWN0LiBEb2VzIG5vdCBtb2RpZnlcclxuKiBvYmplY3RzIChpbW11dGFibGUpIGFuZCBtZXJnZXMgYXJyYXlzIHZpYSBjb25jYXRlbmF0aW9uLlxyXG4qXHJcbiogQHBhcmFtIHsuLi5vYmplY3R9IG9iamVjdHMgLSBPYmplY3RzIHRvIG1lcmdlXHJcbiogQHJldHVybnMge29iamVjdH0gTmV3IG9iamVjdCB3aXRoIG1lcmdlZCBrZXkvdmFsdWVzXHJcbiovXHJcbmZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XHJcblx0Y29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cdFxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0ICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XHJcblx0XHRjb25zdCBvVmFsID0gb2JqW2tleV07XHJcblx0XHRcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcclxuXHRcdCAgcHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdCAgcHJldltrZXldID0gb1ZhbDtcclxuXHRcdH1cclxuXHQgIH0pO1xyXG5cdCAgXHJcblx0ICByZXR1cm4gcHJldjtcclxuXHR9LCB7fSk7XHJcbiAgfVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVEYXRhID0gYXN5bmMgKGRhdGEsIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0aWYgKG5hbWUpIHZhbHVlSGVscGVyKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2UgZGF0YSA9IG1lcmdlRGVlcChkYXRhLCB2YWx1ZSk7XHJcblx0fVxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpZWxkVmFsdWVNYXBUb09iamVjdCA9IGFzeW5jIChtYXAsIGZpZWxkT3JkZXIpID0+IHtcdFxyXG5cdC8vY29uc29sZS5sb2coXCJmaWVsZFZhbHVlTWFwVG9PYmplY3Q6IFwiLCBtYXAsIGZpZWxkT3JkZXIpO1xyXG5cdGxldCBkYXRhID0ge307XHJcblx0aWYgKGZpZWxkT3JkZXIpIHtcclxuXHRcdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkT3JkZXIpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gbWFwLmdldChmaWVsZCk7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Zm9yIChsZXQgW3sgbmFtZSB9LCB2YWx1ZV0gb2YgbWFwKSB7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYnVpbGREYXRhQnlGaWVsZHMgPSBhc3luYyAoZmllbGRzKSA9PiB7XHJcblx0bGV0IGRhdGEgPSB7fTtcclxuXHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gYXdhaXQgZmllbGQudmFsdWUoKTtcclxuXHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdGRhdGEgPSBhd2FpdCB1cGRhdGVEYXRhKGRhdGEsIG5hbWUsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXZhbHVhdGlvbkRhdGEgPSBhc3luYyAoYmFzZSkgPT4ge1xyXG5cdGF3YWl0IGJhc2UucmVhZHk7XHJcblx0Y29uc3QgZGF0YSA9IHt9O1xyXG5cdGRhdGFbU1BFQ0lBTFZBUlMuQ1VSUkVOVFZBTFVFXSA9IGF3YWl0IGJhc2UucmF3VmFsdWUoKTtcclxuXHJcblx0bGV0IHJvdyA9IGJhc2UucGFyZW50KE5PREVOQU1FX0xJU1RfUk9XKTtcclxuXHRsZXQgdGVtcCA9IGRhdGE7XHJcblx0d2hpbGUgKHJvdykge1xyXG5cdFx0dGVtcFtTUEVDSUFMVkFSUy5DVVJSRU5UTElTVFJPV10gPSBhd2FpdCByb3cucmF3VmFsdWUoKTtcclxuXHRcdHRlbXAgPSB0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXTtcclxuXHRcdHJvdyA9IHJvdy5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBOQU1FX1NQTElUVEVSID0gL1xcLi9nO1xyXG5leHBvcnQgY29uc3QgdmFsdWVIZWxwZXIgPSBmdW5jdGlvbiAoZGF0YSwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBuYW1lcyA9IG5hbWUuc3BsaXQoTkFNRV9TUExJVFRFUik7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcmV0dXJuIGdldFZhbHVlKGRhdGEsIG5hbWVzKTtcclxuXHJcblx0Y29uc3QgZGVsID0gbm9WYWx1ZSh2YWx1ZSk7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgZGVsKSByZXR1cm4gZGF0YTtcclxuXHJcblx0cmV0dXJuIHNldFZhbHVlKGRlbCwgZGF0YSwgdmFsdWUsIG5hbWVzKTtcclxufTtcclxuXHJcbmNvbnN0IHNldFZhbHVlID0gKHJlbW92ZSwgZGF0YSwgdmFsdWUsIG5hbWVzKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkgJiYgcmVtb3ZlKSByZXR1cm4gbnVsbDtcclxuXHRcclxuXHRjb25zdCBuYW1lID0gbmFtZXMuc2hpZnQoKTtcclxuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHtcclxuXHRcdGlmIChyZW1vdmUpIGRlbGV0ZSBkYXRhW25hbWVdO1xyXG5cdFx0ZWxzZSBkYXRhW25hbWVdID0gdmFsdWU7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRhdGFbbmFtZV0gPSBkYXRhW25hbWVdIHx8IHt9O1xyXG5cdFx0c2V0VmFsdWUocmVtb3ZlLCBkYXRhW25hbWVdLCB2YWx1ZSwgbmFtZXMpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBnZXRWYWx1ZSA9IChkYXRhLCBuYW1lcykgPT4ge1xyXG5cdGlmIChub1ZhbHVlKGRhdGEpKSByZXR1cm4gbnVsbDtcclxuXHRpZiAobmFtZXMubGVuZ3RoID09IDApIHJldHVybiBkYXRhO1xyXG5cclxuXHRjb25zdCBuYW1lID0gbmFtZXMuc2hpZnQoKTtcclxuXHRyZXR1cm4gZ2V0VmFsdWUoZGF0YVtuYW1lXSwgbmFtZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvbiBhZGRBbGxUb0FycmF5XHJcbiAqIFxyXG4gKiAgTWVyZ2UgYSBzb3VyY2Ugc2V0IGludG8gYSB0YXJnZXQgc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFUYXJnZXRcclxuICogQHBhcmFtIHtJdGVyYWJsZTwqPn0gYVNvdXJjZVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U2V0PCo+fSByZXR1cm5zIHRoZSB0YXJnZXQgc2V0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYWRkQWxsVG9BcnJheSA9IChhVGFyZ2V0LCBhU291cmNlKSA9PiB7XHJcblx0aWYgKGFTb3VyY2UgIT0gbnVsbCkge1xyXG5cdFx0Zm9yIChsZXQgc291cmNlIG9mIGFTb3VyY2UpIGFUYXJnZXQucHVzaChzb3VyY2UpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGFUYXJnZXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uIGFkZEFsbFRvU2V0XHJcbiAqIFxyXG4gKiAgTWVyZ2UgYSBzb3VyY2Ugc2V0IGludG8gYSB0YXJnZXQgc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U2V0PCo+fSBhVGFyZ2V0XHJcbiAqIEBwYXJhbSB7SXRlcmFibGU8Kj59IGFTb3VyY2VcclxuICpcclxuICogQHJldHVybnMge1NldDwqPn0gcmV0dXJucyB0aGUgdGFyZ2V0IHNldFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFkZEFsbFRvU2V0ID0gKGFUYXJnZXQsIGFTb3VyY2UpID0+IHtcclxuXHRpZiAoYVNvdXJjZSAhPSBudWxsKSB7XHJcblx0XHRmb3IgKGxldCBzb3VyY2Ugb2YgYVNvdXJjZSl7XHJcblx0XHRcdGFUYXJnZXQuYWRkKHNvdXJjZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYVRhcmdldDtcclxufTtcclxuIiwiaW1wb3J0IHtFVkVOVEhBTkRMRV9USU1FT1VUfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCJcblxuZXhwb3J0IGNvbnN0IHRvRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJndW1lbnRzKS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlRXZlbnRDb3B5ID0gKGV2ZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgIGRldGFpbDogZXZlbnQuZGV0YWlsLFxuICAgICAgICBjdXJyZW50VGFyZ2V0OiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0OiBldmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBvcmlnaW5hbFRhcmdldCA6IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICBzcmNFbGVtZW50OiBldmVudC5zcmNFbGVtZW50LFxuICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB0b1RpbWVvdXRIYW5kbGUgPSAoaGFuZGxlLCBwcmV2ZW50RGVmYXVsdCwgc3RvcFByb3BhZ2F0aW9uLCB0aW1lb3V0KSA9PiB7XG4gICAgbGV0IGlkID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZlbnQgPSB0eXBlb2YgcHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiA/IHByZXZlbnREZWZhdWx0IDogKCkgPT4gcHJldmVudERlZmF1bHQ7XG4gICAgY29uc3Qgc3RvcCA9IHR5cGVvZiBzdG9wUHJvcGFnYXRpb24gPT09IFwiZnVuY3Rpb25cIiA/IHN0b3BQcm9wYWdhdGlvbiA6ICgpID0+IHN0b3BQcm9wYWdhdGlvbjtcblxuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYocHJldmVudChldmVudCkpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZihzdG9wKGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50Q29weSA9IG1ha2VFdmVudENvcHkoZXZlbnQpO1xuXG4gICAgICAgIGlmKGlkKVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZCA9IG51bGw7XG4gICAgICAgICAgICBoYW5kbGUoZXZlbnRDb3B5KTtcbiAgICAgICAgfSwgdGltZW91dCB8fCBFVkVOVEhBTkRMRV9USU1FT1VUKTtcblxuICAgIH1cbn07IiwiaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL05vZGVIZWxwZXIuanNcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL0Jhc2UuanNcIjtcclxuaW1wb3J0IHsgQVRUUklCVVRFX0ZPUiB9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4uL01lc3NhZ2UuanNcIjtcclxuXHJcbi8qKiBcclxuICogQGZ1bmN0aW9uIGZpbmRNZXNzYWdlc1xyXG4gKiBcclxuICogRmluZCBhbGwgbWVzc2FnZXMgb2Ygcm9vdCBhcyBjaGlsZHJlbiBvbiBkb20gdHJlZVxyXG4gKiBcclxuICogQHBhcmFtIHtCYXNlfSByb290IFxyXG4gKiBcclxuICogQHJldHVybnMge0FycmF5PFZhbGlkYXRpb24+fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbmRNZXNzYWdlcyA9IChyb290KSA9PiB7XHJcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xyXG5cdFx0cm9vdCxcclxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xyXG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZSkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBNZXNzYWdlICYmIGVsZW1lbnQuYXR0cihBVFRSSUJVVEVfRk9SKSA9PSBudWxsKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59OyIsImltcG9ydCBCYXNlRmllbGQgZnJvbSBcIi4uL0Jhc2VGaWVsZFwiO1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbiBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbi5yb290IFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9uLmZpbHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3QgdHJlZUZpbHRlciA9ICh7IHJvb3QsIGZpbHRlciB9KSA9PiB7XG5cdGxldCBlbGVtZW50cyA9IFtdO1xuXHRyb290LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRjb25zdCB7IGFjY2VwdCwgc3RvcCA9IGZhbHNlIH0gPSBmaWx0ZXIoZWxlbWVudCk7XG5cblx0XHRpZiAoYWNjZXB0KSBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSB0cmVlRmlsdGVyKHsgcm9vdDogZWxlbWVudCwgZmlsdGVyIH0pO1xuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChyZXN1bHQpO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0KSBlbGVtZW50cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEZpZWxkcyA9IChyb290KSA9PiB7XG5cdHJldHVybiB0cmVlRmlsdGVyKHtcblx0XHRyb290LFxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcblx0XHR9LFxuXHR9KTtcbn07XG5cblxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9FRElUQUJMRV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX1JFQURPTkxZX1NUQVRFX0NIQU5HRUQsXHJcblx0QVRUUklCVVRFX0FDVElWRSwgXHJcblx0QVRUUklCVVRFX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfSU5WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXHJcblx0QVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfRURJVEFCTEUsIEFUVFJJQlVURV9SRUFET05MWSBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlVmFsaWRTdGF0ZSA9ICh0YXJnZXQsIHZhbGlkKSA9PiB7XHJcblx0aWYgKHR5cGVvZiB2YWxpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWxpZCA9PSBudWxsKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfVkFMSUQsIG51bGwpO1xyXG5cdH0gZWxzZSBpZiAodmFsaWQpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgXCJcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBcIlwiKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XHJcblx0fVxyXG5cclxuXHR0YXJnZXQudHJpZ2dlcihFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDb25kaXRpb25TdGF0ZSA9ICh0YXJnZXQsIHZhbGlkKSA9PiB7XHJcblx0aWYgKHR5cGVvZiB2YWxpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWxpZCA9PSBudWxsKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgbnVsbCk7XHJcblx0fSBlbHNlIGlmICh2YWxpZCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIFwiXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgXCJcIik7XHJcblx0fVxyXG5cclxuXHR0YXJnZXQudHJpZ2dlcihFVkVOVF9DT05ESVRJT05fU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQWN0aXZlU3RhdGUgPSAodGFyZ2V0LCBhY3RpdmUsIGluaXRpYWwgPSBmYWxzZSkgPT4ge1xyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LmFjdGl2ZTtcclxuXHRhY3RpdmUgPyB0YXJnZXQuYXR0cihBVFRSSUJVVEVfQUNUSVZFLCBcIlwiKSA6IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xyXG5cdGlmIChvbGRTdGF0ZSAhPSBhY3RpdmUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVJlYWRvbmx5U3RhdGUgPSAodGFyZ2V0LCByZWFkb25seSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Ly9jb25zb2xlLmxvZyhcInVwZGF0ZVJlYWRvbmx5U3RhdGVcIiwge3RhcmdldCwgcmVhZG9ubHl9KVxyXG5cdGNvbnN0IG9sZFN0YXRlID0gdGFyZ2V0LnJlYWRvbmx5O1xyXG5cdGlmIChyZWFkb25seSkgXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfUkVBRE9OTFksIFwiXCIpO1xyXG5cdGVsc2VcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgbnVsbCk7XHJcblx0XHJcblx0aWYgKG9sZFN0YXRlICE9IHJlYWRvbmx5IHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX1JFQURPTkxZX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVkaXRhYmxlU3RhdGUgPSAodGFyZ2V0LCBlZGl0YWJsZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuZWRpdGFibGU7XHJcblx0aWYgKGVkaXRhYmxlKSBcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9FRElUQUJMRSwgXCJcIik7XHJcblx0ZWxzZVxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBudWxsKTtcclxuXHJcblx0aWYgKG9sZFN0YXRlICE9IGVkaXRhYmxlIHx8IGluaXRpYWwpIHRhcmdldC50cmlnZ2VyKEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQpO1xyXG59OyIsImltcG9ydCB7IHRyZWVGaWx0ZXIgfSBmcm9tIFwiLi9Ob2RlSGVscGVyLmpzXCI7XHJcbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gXCIuLi9WYWxpZGF0aW9uXCI7XHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9CYXNlXCI7XHJcbmltcG9ydCB7IEFUVFJJQlVURV9GT1IgfSBmcm9tIFwiLi4vQ29uc3RhbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVGaWVsZHMgPSBhc3luYyAoZGF0YSwgZmllbGRzKSA9PiB7XHJcbiAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoZmllbGQgPT4gZmllbGQudmFsaWRhdGUoZGF0YSkpKSlcclxuICAgICAgICAucmVkdWNlKCh2YWxpZCwgZmllbGRWYWxpZCkgPT4gdmFsaWQgPyBmaWVsZFZhbGlkOiBmYWxzZSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKiBcclxuICogQGZ1bmN0aW9uIGZpbmRWYWxpZGF0aW9uc1xyXG4gKiBcclxuICogRmluZCBhbGwgdmFsaWRhdGlvbnMgb2Ygcm9vdCBhcyBjaGlsZHJlbiBvbiBkb20gdHJlZVxyXG4gKiBcclxuICogQHBhcmFtIHtCYXNlfSByb290IFxyXG4gKiBcclxuICogQHJldHVybnMge0FycmF5PFZhbGlkYXRpb24+fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbmRWYWxpZGF0aW9ucyA9IChyb290KSA9PiB7XHJcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xyXG5cdFx0cm9vdCxcclxuXHRcdGZpbHRlcjogKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKHJvb3QgIT0gZWxlbWVudCkge1xyXG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmFzZSkgcmV0dXJuIHsgYWNjZXB0OiBmYWxzZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBWYWxpZGF0aW9uICYmIGVsZW1lbnQuYXR0cihBVFRSSUJVVEVfRk9SKSA9PSBudWxsKSByZXR1cm4geyBhY2NlcHQ6IHRydWUsIHN0b3A6IHRydWUgfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4geyBhY2NlcHQ6IGZhbHNlIH07XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59OyIsImltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhSXNOb1ZhbHVlID0gKHZhbHVlKSA9PiB7ICAgIFxyXG4gICAgaWYobm9WYWx1ZSh2YWx1ZSkgKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcbiAgICBpZih0eXBlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgU2V0ICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgTWFwICYmICB2YWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKHR5cGUgPT0gXCJvYmplY3RcIiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBcclxuICAgIHJldHVybiBmYWxzZTtcclxufSIsImltcG9ydCB7IFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxyXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0Y29uc3QgaW5wdXQgPSBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpO1xyXG5cdFx0aWYgKGlucHV0Lmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gaW5wdXQubGVuZ3RoID09IDEgPyBpbnB1dC5maXJzdCgpIDogaW5wdXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQgaW5zdGFuY2VvZiBOb2RlTGlzdDtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KHJlYWRvbmx5KSB7XHJcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIHZhbHVlO1xyXG5cdFx0aWYgKHZhbHVlLnNpemUgPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWVzID0gW107XHJcblx0XHR2YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5tdWx0aXBsZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiAhIWl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImJvb2xlYW5cIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0dGhpcy5pbnB1dC52YWwodmFsdWUgPyB2YWx1ZSA6IG51bGwpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTlBVVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cImZpbGVcIl0nO1xyXG5cclxuY29uc3QgcmVhZEZpbGUgPSAoZmlsZSwgcmVhZEZuTmFtZSkgPT4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcImxvYWRlbmRcIixcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0bmFtZTogZmlsZS5uYW1lLFxyXG5cdFx0XHRcdFx0dHlwZTogZmlsZS50eXBlLFxyXG5cdFx0XHRcdFx0c2l6ZTogZmlsZS5zaXplLFxyXG5cdFx0XHRcdFx0ZGF0YTogcmVhZGVyLnJlc3VsdCxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHQpO1xyXG5cdFx0cmVhZGVyW3JlYWRGbk5hbWVdKGZpbGUpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLy9yZWFkQXNEYXRhVVJMXHJcblxyXG5jb25zdCBGT1JNQVQgPSB7XHJcblx0XCJmb3JtLWlucHV0XCI6IGFzeW5jIChmaWxlKSA9PiB7XHJcblx0XHRmaWxlLmZvcm1hdCA9IFwiZm9ybS1pbnB1dFwiO1xyXG5cdFx0cmV0dXJuIGZpbGU7XHJcblx0fSxcclxuXHRcImRhdGEtdXJsLWJhc2U2NFwiOiBhc3luYyAoZmlsZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xyXG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiZGF0YS11cmwtYmFzZTY0XCI7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0sXHJcblx0YmFzZTY0OiBhc3luYyAoZmlsZSkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xyXG5cdFx0cmVzdWx0LmRhdGEgPSByZXN1bHQuZGF0YS5zdWJzdHIocmVzdWx0LmRhdGEuaW5kZXhPZihcIixcIikgKyAxKTtcclxuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImJhc2U2NFwiO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9LFxyXG59O1xyXG5cclxuY29uc3QgcmVhZEZpbGVzID0gYXN5bmMgKGZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSA9PiB7XHJcblx0bGV0IHJlc3VsdCA9IFtdO1xyXG5cdGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHJlc3VsdC5wdXNoKGF3YWl0IEZPUk1BVFtmb3JtYXRdKGZpbGUpKTtcclxuXHJcblx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdHJldHVybiBtdWx0aXBsZSA/IHJlc3VsdCA6IHJlc3VsdFswXTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xyXG5cdH1cclxuXHJcblx0I3ZhbHVlID0gbnVsbDtcclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XHJcblx0XHR0aGlzLm11bHRpcGxlID0gaW5wdXQubXVsdGlwbGU7XHJcblx0XHR0aGlzLmZvcm1hdCA9IGZpZWxkLmF0dHIoXCJmaWxlLWZvcm1hdFwiKSB8fCBcImZvcm0taW5wdXRcIjtcclxuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1uYW1lLXRhcmdldFwiKTtcclxuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0ID8gZmllbGQuZmluZCh0aGlzLmZpbGVuYW1lVGFyZ2V0KS5maXJzdCgpIDogbnVsbDtcclxuXHRcdGNvbnN0IHsgZm9ybWF0LCBtdWx0aXBsZSB9ID0gdGhpcztcclxuXHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0YXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKSB0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcclxuXHJcblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZSByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKSByZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XHJcblx0XHRlbHNlIHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gdGhpcy4jdmFsdWU7XHJcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKSB7XHJcblx0XHRcdHRoaXMuI3ZhbHVlID0gdmFsdWU7XHJcblx0XHRcdGlmICghdmFsdWUpIHRoaXMuaW5wdXQudmFsdWUgPSBudWxsO1xyXG5cclxuXHRcdFx0Y29uc3QgZmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lVGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmlsZW5hbWUpIHtcclxuXHRcdFx0XHRmaWxlbmFtZS5lbXB0eSgpO1xyXG5cdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMubXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGVuYW1lLmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgZmlsZW5hbWUuYXBwZW5kKGA8c3Bhbj4ke3ZhbHVlLm5hbWV9PC9zcGFuPmApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3ZhbHVlO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCxcclxuXHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJztcclxuXHJcbmNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpbyBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdGNvbnN0IGlucHV0ID0gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKTtcclxuXHRcdGlmIChpbnB1dC5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIGlucHV0O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHRzdXBlcihmaWVsZCwgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWUgKyBnZXRSYW5kb21JbnQoKTtcclxuXHRcdGZvciAobGV0IHJhZGlvIG9mIGlucHV0KSByYWRpby5uYW1lID0gbmFtZTtcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0XCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsKCk7XHJcblx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkpIHJldHVybiB2YWx1ZTtcclxuXHRcdGlmICh2YWx1ZS5zaXplID09IDApIHJldHVybiBudWxsO1xyXG5cdFx0cmV0dXJuIHZhbHVlLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcclxuXHR9XHJcblxyXG5cdG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBudWxsKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfRklFTERfSU5QVVQsXHJcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ3NlbGVjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgV3JhcHBlciB7XHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCkge1xyXG5cdFx0cmV0dXJuIGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUikuZmlyc3QoKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcdFx0XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXQsIGNoYW5nZWRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMudmFsdWUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly9maWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0dGhpcy5pbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgcmVhZG9ubHkgPyBcIlwiIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLmlucHV0Lm11bHRpcGxlID8gdGhpcy5pbnB1dC52YWwoKSA6IHRoaXMuaW5wdXQudmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdGlmKHRoaXMuaW5wdXQubXVsdGlwbGUpe1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiBpdGVtICYmIGl0ZW0udHJpbSgpLmxlbmd0aCA+IDApO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggIT0gMCA/IHZhbHVlIDogbnVsbDtcdFxyXG5cdFx0XHR9XHRcdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgaWYgKHRoaXMuaW5wdXQubXVsdGlwbGUpXHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSAgdGhpcy5pbnB1dC52YWwoKTtcclxuXHRcdGlmICh0aGlzLmZpZWxkLnZhbHVlICE9IHRoaXMudmFsdWUpXHJcblx0XHRcdHRoaXMuaW5wdXQudmFsKHZhbHVlID8gdmFsdWUgOiBjdXJyZW50VmFsdWUpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBFVkVOVF9GSUVMRF9JTlBVVCwgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdpbnB1dDpub3QoW3R5cGU9XCJmaWxlXCJdLFt0eXBlPVwicmFkaW9cIl0sW3R5cGU9XCJjaGVja2JveFwiXSxbdHlwZT1cImJ1dHRvblwiXSxbdHlwZT1cInN1Ym1pdFwiXSxbdHlwZT1cInJlc2V0XCJdKSxpbnB1dDpub3QoW3R5cGVdKSwgdGV4dGFyZWEnO1xyXG5cclxuY29uc3QgREVGQVVMVFRZUEUgPSBcInRleHRcIjtcclxuXHJcbmNvbnN0IHRleHQgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gKGlucHV0LnZhbHVlID0gdmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuY29uc3QgbnVtYmVyID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlQXNOdW1iZXI7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZUFzTnVtYmVyID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSAmJiAhTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbi8qXHJcbmNvbnN0IGRhdGV0aW1lID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XHJcblx0XHR9LFxyXG5cdFx0c2V0VmFsdWU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpbnB1dC52YWx1ZUFzRGF0ZSA9IHZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07Ki9cclxuXHJcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNEYXRlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IFRJTUVGT1JNQVQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImRlZmF1bHRcIiwgIHtcclxuICBob3VyOiBcIm51bWVyaWNcIixcclxuICBtaW51dGU6IFwibnVtZXJpY1wiXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHRpbWUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWUgPyBuZXcgRGF0ZShgMTk3MC0wMS0wMVQke2lucHV0LnZhbHVlfWApIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlID0gVElNRUZPUk1BVC5mb3JtYXQodmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGV0aW1lOmRhdGUsIFwiZGF0ZXRpbWUtbG9jYWxcIjogZGF0ZSwgZGF0ZSwgdGltZSwgcmFuZ2U6IG51bWJlciB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1x0XHRcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR0aGlzLnR5cGUgPSAoVFlQRVNbdHlwZV0gfHwgVFlQRVNbREVGQVVMVFRZUEVdKShpbnB1dCk7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5ub3JtYWxpemUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcclxuXHRcdGlmICh2YWx1ZSAhPSBjdXJyZW50VmFsdWUpIHRoaXMudHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgXCIuLi9GaWVsZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtGaWVsZH0gZmllbGQgXHJcblx0ICogQHJldHVybnMgXHJcblx0ICovXHJcblx0c3RhdGljIGZpbmRJbnB1dChmaWVsZCl7IHJldHVybiBudWxsO31cclxuXHRcclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudHxIVE1MU2VsZWN0RWxlbWVudH0gaW5wdXQgXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XHJcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAYXN5bmNcclxuXHQgKi9cclxuXHRhc3luYyBpbml0KCkgeyB9XHJcblxyXG5cdFxyXG5cclxuXHQvKipcclxuXHQgKiBEZXNjcmlwdGlvbiBwbGFjZWhvbGRlclxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c2V0IHJlYWRvbmx5KGRpc2FibGVkKSB7IH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gXHJcblx0ICovXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuXHQgKi9cclxuXHRhc3luYyBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICovXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKCkge1xyXG5cdH1cclxuXHJcblx0XHJcblx0LyoqXHJcblx0ICogRGVzY3JpcHRpb24gcGxhY2Vob2xkZXJcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHsqfVxyXG5cdCAqL1xyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIERlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRnZXQgdmFsaWQoKXtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgVGV4dCBmcm9tIFwiLi9UZXh0XCI7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSBcIi4vQ2hlY2tib3hcIjtcbmltcG9ydCBSYWRpbyBmcm9tIFwiLi9SYWRpb1wiO1xuaW1wb3J0IEZpbGUgZnJvbSBcIi4vRmlsZVwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi9TZWxlY3RcIjtcblxuZXhwb3J0IGNvbnN0IHdyYXBwZXJzID0gW1RleHQsIENoZWNrYm94LCBSYWRpbywgRmlsZSwgU2VsZWN0XTtcblxuZXhwb3J0IGNvbnN0IGZpbmRXcmFwcGVyID0gKGZpZWxkKSA9PiB7XG5cdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnMpIHtcblx0XHRjb25zdCBpbnB1dCA9IHdyYXBwZXIuZmluZElucHV0KGZpZWxkKTtcblx0XHRpZiAoaW5wdXQpIHJldHVybiBuZXcgd3JhcHBlcihmaWVsZCwgaW5wdXQpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbVwiO1xuaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsXCI7XG5pbXBvcnQgeyBGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXIsIEJhc2VTdWJtaXRBY3Rpb24sIFN1Ym1pdEFjdGlvblJlc3VsdCB9IGZyb20gXCIuL2luZGV4XCI7XG5cbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sID0gR0xPQkFMLmRlZmF1bHRqcy5odG1sIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sLmZvcm0gPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwuZm9ybSB8fCB7XG5cdFZFUlNJT046IFwiJHt2ZXJzaW9ufVwiLFxuXHRGb3JtLFxuXHRQYWdlLFxuXHRCYXNlRmllbGQsXG5cdEZpZWxkLFxuXHRDb250YWluZXIsXG5cdExpc3QsXG5cdEJhc2VTdWJtaXRBY3Rpb24sXG5cdFN1Ym1pdEFjdGlvblJlc3VsdCxcbn07XG5cbmV4cG9ydCB7IEZvcm0sIFBhZ2UsIEJhc2VGaWVsZCwgRmllbGQsIENvbnRhaW5lciwgTGlzdCwgQmFzZVN1Ym1pdEFjdGlvbiwgU3VibWl0QWN0aW9uUmVzdWx0IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=