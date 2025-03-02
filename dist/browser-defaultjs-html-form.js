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
	VERSION : "2.6.26",
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");






const PRIVATE_READY = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_4__.privatePropertyAccessor)("ready");

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

		
		constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
			super();
			PRIVATE_READY(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)());
			
	
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
			return PRIVATE_READY(this);
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
				PRIVATE_READY(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)());
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
	 * @returns {boolean}
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
			const results = await executeActions(actions, formdata);
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
        } catch(e){
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
		if (this.#condition == null) this.#condition = (this.#base.attr(_Constants__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_EDITABLE_CONDITION) || "").trim();

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
		} catch (e) {
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
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitActionResult */ "./src/submitActions/SubmitActionResult.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");






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
		FAIL: _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__.STATE_FAIL,
		SUCCESS: _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__.STATE_SUCCESS,
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
			this.#form = this.parent(_Constants__WEBPACK_IMPORTED_MODULE_4__.NODENAME_FORM);
			if (this.#form) this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_4__.EVENT_INITIALIZE_SUBMIT_ACTION);
		}
	}

	get form() {
		return this.#form;
	}

	async accept(data = {}) {
		const condition = this.attr(_Constants__WEBPACK_IMPORTED_MODULE_4__.ATTRIBUTE_CONDITION);
		if (condition) return await _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_2__.ExpressionResolver.resolve(condition, data, false);

		return true;
	}

	/**
	 * Override this function!
	 */
	async execute(data = {}, context = {}) {
		return new _SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__["default"](_SubmitActionResult__WEBPACK_IMPORTED_MODULE_3__.STATE_FAIL, "not implemented", null, data, context);
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
	VERSION: "2.6.26",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1kZWZhdWx0anMtaHRtbC1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1I7QUFDUTtBQUNWO0FBQ0Q7QUFDQztBQUNzQztBQUNJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQK0I7O0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGMUY7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBLFVBQVU7QUFDVixFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkJBQTZCO0FBQ2pDLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksMkJBQTJCO0FBQy9CLElBQUksUUFBUSxpQkFBaUIsRUFBRTtBQUMvQixJQUFJLFFBQVEsaUJBQWlCLEVBQUU7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0R2QjtBQUNBLFdBQVcscUJBQU0seUJBQXlCLHFCQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7OztBQ1BOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQzZCO0FBQzJDOztBQUU5RyxxRkFBTSxhQUFhLHFGQUFNO0FBQ3pCLHFGQUFNLGtCQUFrQixxRkFBTTtBQUM5QixxRkFBTSx1QkFBdUIscUZBQU07QUFDbkMsYUFBYSxRQUFRO0FBQ3JCLEtBQUs7QUFDTCxLQUFLO0FBQ0wsVUFBVTtBQUNWLE1BQU07QUFDTixVQUFVO0FBQ1YsS0FBSztBQUNMLGlCQUFpQjtBQUNqQixtQkFBbUI7QUFDbkI7O0FBRStGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9qYXZhc2NyaXB0L01hcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvamF2YXNjcmlwdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRGVmYXVsdFZhbHVlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9FbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxJbnB1dEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTFNlbGVjdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTFRleHRBcmVhRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IdG1sQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Ob2RlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL05vZGVMaXN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvQXR0cmlidXRlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0RhdGFTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvRXZlbnRTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvSHRtbENsYXNzU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0xpc3RTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1JlYWR5RXZlbnRTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvRXh0ZW5kUHJvdG90eXBlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvRXh0ZW5kZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9CYXNlRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Db250cm9sLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9Gb3JtLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvRm9ybUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL0xpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9NZXNzYWdlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvUGFnZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvU3RlcC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9CYWNrQnV0dG9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvY29udHJvbHMvTmV4dEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2NvbnRyb2xzL1N1bW1hcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9jb250cm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvQ29uZGl0aW9uSGFuZGxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvaGFuZGVscy9FZGl0YWJsZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvTWVzc2FnZUhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2hhbmRlbHMvVmFsaWRhdGlvbkhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvQWRkUm93LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvbGlzdC9EZWxldGVSb3cuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9saXN0L1Jvdy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL2xpc3QvUm93cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL0RhdGFIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3V0aWxzL01lc3NhZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9Ob2RlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvU3RhdGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy91dGlscy9WYWxpZGF0aW9uSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvdXRpbHMvVmFsdWVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL3NyYy93cmFwcGVyL0NoZWNrYm94LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9GaWxlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9SYWRpby5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtLy4vc3JjL3dyYXBwZXIvU2VsZWN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9UZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9XcmFwcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vLi9zcmMvd3JhcHBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWZvcm0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1mb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtZm9ybS8uL2Jyb3dzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9zcmMvQmFzZUZpZWxkXCI7XG5pbXBvcnQgRmllbGQgZnJvbSBcIi4vc3JjL0ZpZWxkXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL3NyYy9Db250YWluZXJcIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL3NyYy9MaXN0XCI7XG5pbXBvcnQgUGFnZSBmcm9tIFwiLi9zcmMvUGFnZVwiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9zcmMvRm9ybVwiO1xuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vc3JjL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCBmcm9tIFwiLi9zcmMvc3VibWl0QWN0aW9ucy9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcblxuZXhwb3J0IHtGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBMaXN0LCBDb250YWluZXIsIEJhc2VTdWJtaXRBY3Rpb24sIFN1Ym1pdEFjdGlvblJlc3VsdH07IiwiaW1wb3J0IHsgR0xPQkFMLCBPYmplY3RVdGlscywgRXNjYXBlciwgVmFsdWVIZWxwZXIsIFByb21pc2VVdGlscywgUHJpdmF0ZVByb3BlcnR5LCBVVUlEIH0gZnJvbSBcIi4vc3JjXCI7XG5cbmV4cG9ydCB7IEdMT0JBTCwgT2JqZWN0VXRpbHMsIEVzY2FwZXIsIFZhbHVlSGVscGVyLCBQcm9taXNlVXRpbHMsIFByaXZhdGVQcm9wZXJ0eSwgVVVJRCB9O1xuIiwiLy8gcmVxdWlyZWQgdG8gYnVpbGQgdGhlIGludGVybmFsIGVzY2FwZSBmaWx0ZXIgZm9yIHJlZ2V4XG5jb25zdCBSRUdFWENIQVJNQVAgPSBbXCJcXFxcXCIsXCI/XCIsXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiKFwiLCBcIilcIiwgXCIuXCIsIFwiXlwiLCBcIiRcIl1cblx0Lm1hcChjaGFyID0+IHsgXG5cdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKFwiXFxcXFwiICtjaGFyLCBcImdcIiksIHYgOiBcIlxcXFxcIiArIGNoYXJ9O1xuXHR9KTtcblxuXG5jb25zdCBtYXBwaW5nID0gKGFUZXh0LCB0aGVGaWx0ZXJzKSA9PiB7XG5cdGxldCB0ZXh0ID0gYVRleHQ7XG5cdHRoZUZpbHRlcnMuZm9yRWFjaChpdGVtID0+IHtcblx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGl0ZW0uZiwgaXRlbS52KTtcblx0fSk7XG5cdHJldHVybiB0ZXh0O1xufTtcblxuY29uc3QgYnVpbGRVbmVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcInVuZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmVzY2FwZWQsIFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uY2hhcn1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5cbmNvbnN0IGJ1aWxkRXNjYXBlTGlzdCA9IChhQ2hhck1hcCwgaXNDYXNlU2Vuc2l0aXYpID0+IHtcblx0Y29uc3Qgb3B0aW9uID0gaXNDYXNlU2Vuc2l0aXYgPyBcIm1nXCIgOiBcIm1naVwiOyBcblx0cmV0dXJuIGFDaGFyTWFwLm1hcChpdGVtID0+IHtcblx0XHRpZighaXRlbS5hdCB8fCBpdGVtLmF0ID09IFwiZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmNoYXIsUkVHRVhDSEFSTUFQKSwgb3B0aW9uKSwgdjogaXRlbS5lc2NhcGVkfVxuXHR9KS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xufTtcbmNsYXNzIEVzY2FwZXIge1xuXHRjb25zdHJ1Y3Rvcihlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KXtcblx0XHR0aGlzLmVzY2FwZU1hcCA9IGJ1aWxkRXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHRcdHRoaXMudW5lc2NhcGVNYXAgPSBidWlsZFVuZXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHR9XG5cdFxuXHRlc2NhcGUoYVRleHQpe1xuXHRcdHJldHVybiBtYXBwaW5nKGFUZXh0LCB0aGlzLmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHVuZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy51bmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHN0YXRpYyBSRUdFWFBfRVNDQVBFUigpe1xuXHRcdHJldHVybiBuZXcgRXNjYXBlcihbXG5cdFx0XHR7Y2hhcjogXCJcXFxcXCIsIGVzY2FwZWQgOiBcIlxcXFxcXFxcXCJ9LFxuXHRcdFx0e2NoYXI6IFwiP1wiLCBlc2NhcGVkIDogXCJcXFxcP1wifSxcblx0XHRcdHtjaGFyOiBcIltcIiwgZXNjYXBlZCA6IFwiXFxcXFtcIn0sXG5cdFx0XHR7Y2hhcjogXCJdXCIsIGVzY2FwZWQgOiBcIlxcXFxdXCJ9LFxuXHRcdFx0e2NoYXI6IFwie1wiLCBlc2NhcGVkIDogXCJcXFxce1wifSxcblx0XHRcdHtjaGFyOiBcIn1cIiwgZXNjYXBlZCA6IFwiXFxcXH1cIn0sXG5cdFx0XHR7Y2hhcjogXCIoXCIsIGVzY2FwZWQgOiBcIlxcXFwoXCJ9LFxuXHRcdFx0e2NoYXI6IFwiKVwiLCBlc2NhcGVkIDogXCJcXFxcKVwifSxcblx0XHRcdHtjaGFyOiBcIi5cIiwgZXNjYXBlZCA6IFwiXFxcXC5cIn0sXG5cdFx0XHR7Y2hhcjogXCJeXCIsIGVzY2FwZWQgOiBcIlxcXFxeXCJ9LFxuXHRcdFx0e2NoYXI6IFwiJFwiLCBlc2NhcGVkIDogXCJcXFxcJFwifVxuXHRcdF0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzY2FwZXI7XG5cbiIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5cclxuY29uc3QgZXF1YWxBcnJheVNldCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGNvbnN0IGxlbmd0aCA9IGEubGVuZ3RoO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXHJcblx0XHRpZiAoIWVxdWFsUG9qbyhhW2ldLCBiW2ldKSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZmFsc2VcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE1hcCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIGEua2V5cygpKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYS5nZXQoa2V5KSwgYi5nZXQoa2V5KSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxDbGFzc2VzID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBjbGF6ekEgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSk7XHJcblx0Y29uc3QgY2xhenpCID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpO1xyXG5cdGlmIChjbGF6ekEgIT0gY2xhenpCKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGlmICghY2xhenpBKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGF6ekEpO1xyXG5cdGNvbnN0IHByb3BlcnRpZXNCID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpCKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE9iamVjdCA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3Qua2V5cyhhKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5rZXlzKGIpO1xyXG5cclxuXHRpZiAocHJvcGVydGllc0EubGVuZ3RoICE9PSBwcm9wZXJ0aWVzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBwcm9wZXJ0aWVzQSkge1xyXG5cdFx0Y29uc3QgdmFsdWVBID0gYVtrZXldO1xyXG5cdFx0Y29uc3QgdmFsdWVCID0gYltrZXldO1xyXG5cclxuXHRcdGlmICghZXF1YWxQb2pvKHZhbHVlQSwgdmFsdWVCKSkgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IChvYmplY3QpID0+IHtcclxuXHRyZXR1cm4gb2JqZWN0ID09IG51bGwgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9IChvYmplY3QpID0+IHtcclxuXHRpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcclxuXHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdGNhc2UgXCJiaWdpbnRcIjpcclxuXHRcdGNhc2UgXCJib29sZWFuXCI6XHJcblx0XHRjYXNlIFwic3RyaW5nXCI6XHJcblx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmKGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdCkpXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmICghb2JqZWN0LmNvbnN0cnVjdG9yIHx8IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBlcXVhbFBvam8gLT4gY29tcGFyZXMgb25seSBwb2pvcywgYXJyYXksIHNldCwgbWFwIGFuZCBwcmltaXRpdmVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXF1YWxQb2pvID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBudWxsQSA9IGlzTnVsbE9yVW5kZWZpbmVkKGEpO1xyXG5cdGNvbnN0IG51bGxCID0gaXNOdWxsT3JVbmRlZmluZWQoYik7XHJcblx0aWYgKG51bGxBIHx8IG51bGxCKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0aWYgKGlzUHJpbWl0aXZlKGEpIHx8IGlzUHJpbWl0aXZlKGIpKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0Y29uc3QgdHlwZUEgPSB0eXBlb2YgYTtcclxuXHRjb25zdCB0eXBlQiA9IHR5cGVvZiBiO1xyXG5cdGlmICh0eXBlQSAhPSB0eXBlQikgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh0eXBlQSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYSA9PT0gYjtcclxuXHQvL2lmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcblx0Ly9pZiAoYSBpbnN0YW5jZW9mIEFycmF5IHx8IGEgaW5zdGFuY2VvZiBTZXQpIHJldHVybiBlcXVhbEFycmF5U2V0KGEsIGIpO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBNYXApIHJldHVybiBlcXVhbE1hcChhLCBiKTtcclxuXHJcblx0cmV0dXJuIGVxdWFsT2JqZWN0KGEsIGIpICYmIGVxdWFsQ2xhc3NlcyhhLCBiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICpcclxuICogQHJldHVybiBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNQb2pvID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmICghaXNPYmplY3Qob2JqZWN0KSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFwcGVuZCBhIHByb3BlcnkgdmFsdWUgdG8gYW4gb2JqZWN0LiBJZiBwcm9wZXJ5IGV4aXN0cyBpdHMgd291bGQgYmUgY29udmVydGVkIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKlxyXG4gKiAgQHJldHVybiByZXR1cm5zIHRoZSBjaGFuZ2VkIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKTtcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIHNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuXHRpZiAoIXRhcmdldCkgdGFyZ2V0ID0ge307XHJcblxyXG5cdGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcblx0XHRpZiAoaXNQb2pvKHNvdXJjZSkpIHtcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNQb2pvKHRhcmdldFtrZXldKSkgbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuXHRcdFx0XHRlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbiAoeyBuYW1lcywgYWxsb3dlZCB9KSB7XHJcblx0cmV0dXJuIChuYW1lLCB2YWx1ZSwgY29udGV4dCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5hbWVzLmluY2x1ZGVzKG5hbWUpID09PSBhbGxvd2VkO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7IGRlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdIH0gPSB7fV0gPSBhcmd1bWVudHM7XHJcblx0Y29uc3QgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5IHx8IHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHBhcmVudHMuaW5jbHVkZXNbdmFsdWVdIHx8IHZhbHVlID09IGRhdGEpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlIHJlc3VsdFtuYW1lXSA9IGZpbHRlcih2YWx1ZSwgcHJvcEZpbHRlciwgeyBkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6IHBhcmVudHMuY29uY2F0KGRhdGEpIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZWYWx1ZSA9IChvLCBuYW1lLCB2YWx1ZSkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHR2YWx1ZSxcclxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlZkdldCA9IChvLCBuYW1lLCBnZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNOdWxsT3JVbmRlZmluZWQsXHJcblx0aXNPYmplY3QsXHJcblx0ZXF1YWxQb2pvLFxyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGNvbnN0IHByaXZhdGVTdG9yZSA9IChvYmopID0+IHtcclxuXHRpZihQUklWQVRFX1BST1BFUlRJRVMuaGFzKG9iaikpXHJcblx0XHRyZXR1cm4gUFJJVkFURV9QUk9QRVJUSUVTLmdldChvYmopO1xyXG5cdFxyXG5cdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRQUklWQVRFX1BST1BFUlRJRVMuc2V0KG9iaiwgZGF0YSk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IGRhdGEgPSBwcml2YXRlU3RvcmUob2JqKTtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKVxyXG5cdFx0cmV0dXJuIGRhdGFbbmFtZV07XHJcblx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKVxyXG5cdFx0ZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdGVsc2VcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhbGxvd2VkIHNpemUgb2YgYXJndW1lbnRzIVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciA9ICh2YXJuYW1lKSA9PiB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGYsIHZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMilcclxuXHRcdFx0cHJpdmF0ZVByb3BlcnR5KHNlbGYsIHZhcm5hbWUsIHZhbHVlKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lKTtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IsIHByaXZhdGVTdG9yZX07IiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImV4cG9ydCBjb25zdCBub1ZhbHVlID0gKHZhbHVlKSA9PiB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBlbXRweU9yTm9WYWx1ZVN0cmluZyA9ICh2YWx1ZSkgPT4ge1x0XG5cdHJldHVybiBub1ZhbHVlKHZhbHVlKSB8fCB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9WYWx1ZSxcblx0ZW10cHlPck5vVmFsdWVTdHJpbmdcbn07IiwiaW1wb3J0IFwiLi9qYXZhc2NyaXB0XCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiLi9PYmplY3RVdGlsc1wiO1xyXG5pbXBvcnQgR0xPQkFMIGZyb20gXCIuL0dsb2JhbFwiO1xyXG5pbXBvcnQgRXNjYXBlciBmcm9tIFwiLi9Fc2NhcGVyXCI7XHJcbmltcG9ydCBWYWx1ZUhlbHBlciBmcm9tIFwiLi9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgUHJvbWlzZVV0aWxzIGZyb20gXCIuL1Byb21pc2VVdGlsc1wiO1xyXG5pbXBvcnQgUHJpdmF0ZVByb3BlcnR5IGZyb20gXCIuL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgVVVJRCBmcm9tIFwiLi9VVUlEXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdEdMT0JBTCAsXHJcblx0T2JqZWN0VXRpbHMsXHJcblx0RXNjYXBlcixcclxuXHRWYWx1ZUhlbHBlcixcclxuXHRQcm9taXNlVXRpbHMsXHJcblx0UHJpdmF0ZVByb3BlcnR5LFxyXG5cdFVVSURcclxufTsiLCJpZiAoIU1hcC5wcm90b3R5cGUudG9PYmplY3QpXHJcblx0TWFwLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IG9iamVjdCA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIG9iamVjdFtrZXldID0gdmFsdWUgaW5zdGFuY2VvZiBNYXAgPyB2YWx1ZS50b09iamVjdCgpIDogdmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIG9iamVjdDtcclxuXHR9O1xyXG4iLCJpZiAoIVN0cmluZy5wcm90b3R5cGUuaGFzaGNvZGUpXHJcblx0U3RyaW5nLnByb3RvdHlwZS5oYXNoY29kZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdFxyXG5cdFx0bGV0IGhhc2ggPSAwO1xyXG5cdFx0Y29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IGMgPSB0aGlzLmNoYXJDb2RlQXQoaSk7XHJcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGM7XHJcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGFzaDtcclxuXHR9OyIsImltcG9ydCBcIi4vU3RyaW5nLmpzXCI7XHJcbmltcG9ydCBcIi4vTWFwLmpzXCI7IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9zcmMvQ29udGV4dFwiO1xuXG5leHBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIsIENvbnRleHQgfTtcbiIsImltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIi4vRXhwcmVzc2lvblJlc29sdmVyXCI7XG5cbmNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG4vKipcbiAqIGNhY2hlZCBwcm94eSBoYW5kbGVcbiAqXG4gKiBAY2xhc3MgQ2FjaGVkUHJveHlIYW5kbGVcbiAqIEB0eXBlZGVmIHtDYWNoZWRQcm94eUhhbmRsZX1cbiAqL1xuY2xhc3MgQ2FjaGVkUHJveHlIYW5kbGUge1xuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBIYW5kbGUuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gcmVzb2x2ZXJcblx0ICovXG5cdGNvbnN0cnVjdG9yKGRhdGEsIHJlc29sdmVyKSB7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLnJlc29sdmVyID0gcmVzb2x2ZXI7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHJlc2V0Q2FjaGUoKXtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cblx0Z2V0UHJvcGVydHlEZWYocHJvcGVydHksIHNlZWsgPSB0cnVlKSB7XG5cdFx0aWYgKHRoaXMuY2FjaGUuaGFzKHByb3BlcnR5KSlcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLmdldChwcm9wZXJ0eSk7XG5cdFx0XG5cdFx0bGV0IGRlZiA9IG51bGxcblx0XHRpZiAodGhpcy5kYXRhICYmIHByb3BlcnR5IGluIHRoaXMuZGF0YSlcblx0XHRcdGRlZiA9IHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9O1xuXHRcdGVsc2UgaWYoc2Vlaylcblx0XHRcdGRlZiA9IHNlZWtBdENoYWluKHRoaXMucmVzb2x2ZXIucGFyZW50LCBwcm9wZXJ0eSk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0aWYoZGVmLmRlZmluZWQpXG5cdFx0XHR0aGlzLmNhY2hlLnNldChwcm9wZXJ0eSwgZGVmKTtcblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0aGFzUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRyZXR1cm4gZGVmaW5lZDtcblx0fVxuXHRnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuXHRcdC8vQFRPRE8gd3JpdGUgdGVzdHMhISFcdFxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRhdGEgPyBkYXRhW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcblx0fVxuXHRzZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXG5cdFx0Y29uc3QgeyBkYXRhLCBkZWZpbmVkIH0gPSB0aGlzLmdldFByb3BlcnR5RGVmKHByb3BlcnR5KTtcblx0XHRpZiAoZGVmaW5lZClcblx0XHRcdGRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhKVxuXHRcdFx0XHR0aGlzLmRhdGFbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kYXRhID0ge31cblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIHsgZGF0YTogdGhpcy5kYXRhLCByZXNvbHZlcjogdGhpcy5yZXNvbHZlciwgZGVmaW5lZDogdHJ1ZSB9KTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlUHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXHRcdFxuXHRcdHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkIGZ1bmN0aW9uIVwiKVxuXHR9XG59XG5cbi8qKlxuICogQ29udGV4dCBvYmplY3QgdG8gaGFuZGxlIGRhdGEgYWNjZXNzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENvbnRleHRcbiAqIEB0eXBlZGVmIHtDb250ZXh0fVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblxuXHQjaGFuZGxlID0gbnVsbDtcblx0I2RhdGEgPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbnRleHQuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gcmVzb2x2ZXJcblx0ICovXG5cdGNvbnN0cnVjdG9yKGNvbnRleHQsIHJlc29sdmVyKSB7XG5cdFx0dGhpcy4jaGFuZGxlID0gbmV3IENhY2hlZFByb3h5SGFuZGxlKGNvbnRleHQsIHJlc29sdmVyKTtcdFx0XG5cdFx0dGhpcy4jZGF0YSA9IG5ldyBQcm94eSh0aGlzLiNoYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0Z2V0IGRhdGEoKXtcblx0XHRyZXR1cm4gdGhpcy4jZGF0YTtcblx0fVxuXG5cdGdldCBoYW5kbGUoKXtcblx0XHRyZXR1cm4gdGhpcy4jaGFuZGxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIHVwZGF0ZSBkYXRhXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxuXHQgKi9cblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLiNoYW5kbGUudXBkYXRlRGF0YShkYXRhKVx0XHRcblx0fVxuXHRcblx0LyoqXG5cdCAqIHJlc2V0IGNhY2hlXG5cdCAqL1xuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy4jaGFuZGxlLnJlc2V0Q2FjaGUoKTtcblx0fVxufTsiLCIvKipcbiAqIG9iamVjdCBmb3IgZGVmYXVsdCB2YWx1ZVxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBEZWZhdWx0VmFsdWVcbiAqIEB0eXBlZGVmIHtEZWZhdWx0VmFsdWV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERlZmF1bHRWYWx1ZS5cblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICovXG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiO1xyXG5pbXBvcnQgT2JqZWN0UHJvcGVydHkgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanNcIjtcclxuaW1wb3J0IERlZmF1bHRWYWx1ZSBmcm9tIFwiLi9EZWZhdWx0VmFsdWUuanNcIjtcclxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vQ29udGV4dC5qc1wiO1xyXG5cclxuY29uc3QgRVhFQ1VUSU9OX1dBUk5fVElNRU9VVCA9IDEwMDA7XHJcbmNvbnN0IEVYUFJFU1NJT04gPSAvKFxcXFw/KShcXCRcXHsoKFthLXpBLVowLTlcXC1fXFxzXSspOjopPyhbXlxce1xcfV0rKVxcfSkvO1xyXG5jb25zdCBNQVRDSF9FU0NBUEVEID0gMTtcclxuY29uc3QgTUFUQ0hfRlVMTF9FWFBSRVNTSU9OID0gMjtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TQ09QRSA9IDQ7XHJcbmNvbnN0IE1BVENIX0VYUFJFU1NJT05fU1RBVEVNRU5UID0gNTtcclxuXHJcbmNvbnN0IEVYUFJFU1NJT05fQ0FDSEUgPSBuZXcgTWFwKCk7XHJcblxyXG5jb25zdCBERUZBVUxUX05PVF9ERUZJTkVEID0gbmV3IERlZmF1bHRWYWx1ZSgpO1xyXG5jb25zdCB0b0RlZmF1bHRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xyXG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRyZXR1cm4gbmV3IERlZmF1bHRWYWx1ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRPckNyZWF0ZUZ1bmN0aW9uID0gKGFTdGF0ZW1lbnQpID0+IHtcclxuXHRpZihFWFBSRVNTSU9OX0NBQ0hFLmhhcyhhU3RhdGVtZW50KSlcclxuXHRcdHJldHVybiBFWFBSRVNTSU9OX0NBQ0hFLmdldChhU3RhdGVtZW50KTtcclxuXHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbihcclxuXHRcdFwiY29udGV4dFwiLFxyXG5cdFx0YFxyXG5yZXR1cm4gKGFzeW5jIChjb250ZXh0KSA9PiB7XHJcblx0dHJ5eyBcclxuXHRcdHdpdGgoY29udGV4dCl7XHJcblx0XHRcdCByZXR1cm4gJHthU3RhdGVtZW50fVxyXG5cdFx0fVxyXG5cdH1jYXRjaChlKXtcclxuXHRcdHRocm93IGU7XHJcblx0fVxyXG59KShjb250ZXh0KTtgLFxyXG5cdCk7XHJcblxyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0KGFTdGF0ZW1lbnQsIGV4cHJlc3Npb24pO1xyXG5cclxuXHRyZXR1cm4gZXhwcmVzc2lvbjtcclxufVxyXG5cclxuY29uc3QgZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uIChhU3RhdGVtZW50LCBhQ29udGV4dCkge1xyXG5cdGlmICh0eXBlb2YgYVN0YXRlbWVudCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGFTdGF0ZW1lbnQ7XHJcblx0YVN0YXRlbWVudCA9IG5vcm1hbGl6ZShhU3RhdGVtZW50KTtcclxuXHRpZiAoYVN0YXRlbWVudCA9PSBudWxsKSByZXR1cm4gYVN0YXRlbWVudDtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGV4cHJlc3Npb24gPSBnZXRPckNyZWF0ZUZ1bmN0aW9uKGFTdGF0ZW1lbnQpO1xyXG5cdFx0cmV0dXJuIGF3YWl0IGV4cHJlc3Npb24oYUNvbnRleHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGJ5IHN0YXRlbWVudCBcIiR7YVN0YXRlbWVudH1cIjpgLCBlKVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmUgPSBhc3luYyBmdW5jdGlvbiAoYVJlc29sdmVyLCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIHtcclxuXHRpZiAoYUZpbHRlciAmJiBhUmVzb2x2ZXIubmFtZSAhPSBhRmlsdGVyKSByZXR1cm4gYVJlc29sdmVyLnBhcmVudCA/IHJlc29sdmUoYVJlc29sdmVyLnBhcmVudCwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSA6IG51bGw7XHJcblxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGUoYUV4cHJlc3Npb24sIGFSZXNvbHZlci5wcm94eS5kYXRhKTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiByZXN1bHQ7XHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpIHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYXRjaCA9IGFzeW5jIChyZXNvbHZlciwgbWF0Y2gsIGRlZmF1bHRWYWx1ZSkgPT4ge1xyXG5cdGlmIChtYXRjaFtNQVRDSF9FU0NBUEVEXSkgcmV0dXJuIG1hdGNoW01BVENIX0ZVTExfRVhQUkVTU0lPTl07XHJcblxyXG5cdHJldHVybiByZXNvbHZlKHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemUgPSAodmFsdWUpID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeHByZXNzaW9uUmVzb2x2ZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyXHJcbiAqIEB0eXBlZGVmIHtFeHByZXNzaW9uUmVzb2x2ZXJ9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzaW9uUmVzb2x2ZXIge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRXhwcmVzc2lvblJlc29sdmVyLlxyXG5cdCAqIEBkYXRlIDMvMTAvMjAyNCAtIDc6Mjc6NTcgUE1cclxuXHQgKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7eyBjb250ZXh0PzogYW55OyBwYXJlbnQ/OiBhbnk7IG5hbWU/OiBhbnk7IH19IHBhcmFtMFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW0wLmNvbnRleHQ9R0xPQkFMXVxyXG5cdCAqIEBwYXJhbSB7RXhwcmVzc2lvblJlc29sdmVyfSBbcGFyYW0wLnBhcmVudD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gW3BhcmFtMC5uYW1lPW51bGxdXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoeyBjb250ZXh0ID0gR0xPQkFMLCBwYXJlbnQgPSBudWxsLCBuYW1lID0gbnVsbCB9KSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudCBpbnN0YW5jZW9mIEV4cHJlc3Npb25SZXNvbHZlciA/IHBhcmVudCA6IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHRcdHRoaXMucHJveHkgPSBuZXcgQ29udGV4dCh0aGlzLmNvbnRleHQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGNoYWluIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0IGNoYWluKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuY2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGVmZmVjdGl2ZSBjaGFpbiBwYXRoXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBlZmZlY3RpdmVDaGFpbigpIHtcclxuXHRcdGlmICghdGhpcy5jb250ZXh0KSByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiA6IFwiXCI7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5lZmZlY3RpdmVDaGFpbiArIFwiL1wiICsgdGhpcy5uYW1lIDogXCIvXCIgKyB0aGlzLm5hbWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBnZXQgY29udGV4dCBjaGFpblxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHJldHVybnMge0NvbnRleHRbXX1cclxuXHQgKi9cclxuXHRnZXQgY29udGV4dENoYWluKCkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRsZXQgcmVzb2x2ZXIgPSB0aGlzO1xyXG5cdFx0d2hpbGUgKHJlc29sdmVyKSB7XHJcblx0XHRcdGlmIChyZXNvbHZlci5jb250ZXh0KSByZXN1bHQucHVzaChyZXNvbHZlci5jb250ZXh0KTtcclxuXHJcblx0XHRcdHJlc29sdmVyID0gcmVzb2x2ZXIucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBnZXQgZGF0YSBmcm9tIGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuXHQgKiBAcGFyYW0gez9zdHJpbmd9IGZpbHRlclxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqL1xyXG5cdGdldERhdGEoa2V5LCBmaWx0ZXIpIHtcclxuXHRcdGlmICgha2V5KSByZXR1cm47XHJcblx0XHRlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyICE9IHRoaXMubmFtZSkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50LmdldERhdGEoa2V5LCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKHRoaXMuY29udGV4dCwga2V5LCBmYWxzZSk7XHJcblx0XHRcdHJldHVybiBwcm9wZXJ0eSA/IHByb3BlcnR5LnZhbHVlIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHVwZGF0ZSBkYXRhIGF0IGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHBhcmFtIHs/c3RyaW5nfSBmaWx0ZXJcclxuXHQgKi9cclxuXHR1cGRhdGVEYXRhKGtleSwgdmFsdWUsIGZpbHRlcikge1xyXG5cdFx0aWYgKCFrZXkpIHJldHVybjtcclxuXHRcdGVsc2UgaWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQudXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0aGlzLmNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRleHQgPSB7fTtcclxuXHRcdFx0XHR0aGlzLnByb3h5LnVwZGF0ZURhdGEodGhpcy5jb250ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQodGhpcy5jb250ZXh0LCBrZXkpO1xyXG5cdFx0XHRwcm9wZXJ0eS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLnByb3h5LnJlc2V0Q2FjaGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIG1lcmdlIGNvbnRleHQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICovXHJcblx0bWVyZ2VDb250ZXh0KGNvbnRleHQsIGZpbHRlcikge1xyXG5cdFx0aWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQubWVyZ2VDb250ZXh0KGNvbnRleHQsIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQgPyBPYmplY3RVdGlscy5tZXJnZSh0aGlzLmNvbnRleHQsIGNvbnRleHQpIDogY29udGV4dDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHJlc29sdmVkIGFuIGV4cHJlc3Npb24gc3RyaW5nIHRvIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhRXhwcmVzc2lvblxyXG5cdCAqIEBwYXJhbSB7Pyp9IGFEZWZhdWx0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0YXN5bmMgcmVzb2x2ZShhRXhwcmVzc2lvbiwgYURlZmF1bHQpIHtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyhhRXhwcmVzc2lvbik7XHJcblx0XHRcdGlmIChtYXRjaCkgcmV0dXJuIGF3YWl0IHJlc29sdmVNYXRjaCh0aGlzLCBtYXRjaCwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0ZWxzZSByZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBub3JtYWxpemUoYUV4cHJlc3Npb24pLCBudWxsLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvciBhdCBleGVjdXRpbmcgc3RhdG1lbnRcIicsIGFFeHByZXNzaW9uLCAnXCI6JywgZSk7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWUuaGFzVmFsdWUgPyBkZWZhdWx0VmFsdWUudmFsdWUgOiBhRXhwcmVzc2lvbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHJlcGxhY2UgYWxsIGV4cHJlc3Npb25zIGF0IGEgc3RyaW5nXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhVGV4dFxyXG5cdCAqIEBwYXJhbSB7Pyp9IGFEZWZhdWx0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0YXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFEZWZhdWx0KSB7XHJcblx0XHRsZXQgdGV4dCA9IGFUZXh0O1xyXG5cdFx0bGV0IHRlbXAgPSBhVGV4dDsgLy8gcmVxdWlyZWQgdG8gcHJldmVudCBpbmZpbml0eSBsb29wXHJcblx0XHRsZXQgbWF0Y2ggPSBFWFBSRVNTSU9OLmV4ZWModGV4dCk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0d2hpbGUgKG1hdGNoICE9IG51bGwpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzb2x2ZU1hdGNoKHRoaXMsIG1hdGNoLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHR0ZW1wID0gdGVtcC5zcGxpdChtYXRjaFswXSkuam9pbigpOyAvLyByZW1vdmUgY3VycmVudCBtYXRjaCBmb3IgbmV4dCBsb29wXHJcblx0XHRcdHRleHQgPSB0ZXh0LnNwbGl0KG1hdGNoWzBdKS5qb2luKHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogcmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlIGFuIGV4cHJlc3Npb24gc3RyaW5nIHRvIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVwbGFjZSBleHByZXNzaW9uIGF0IHRleHRcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVRleHRcclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYnVpbGQgYSBzZWN1cmUgY29udGV4dCBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGFyZ1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBhcmcuY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFyZy5wcm9wRmlsdGVyXHJcblx0ICogQHBhcmFtIHt7IGRlZXA6IGJvb2xlYW47IH19IFthcmcub3B0aW9uPXsgZGVlcDogdHJ1ZSB9XVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhcmcubmFtZVxyXG5cdCAqIEBwYXJhbSB7RXhwcmVzc2lvblJlc29sdmVyfSBhcmcucGFyZW50XHJcblx0ICogQHJldHVybnMge29iamVjdH1cclxuXHQgKi9cclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoeyBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gPSB7IGRlZXA6IHRydWUgfSwgbmFtZSwgcGFyZW50IH0pIHtcclxuXHRcdGNvbnRleHQgPSBPYmplY3RVdGlscy5maWx0ZXIoeyBkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gfSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQsIG5hbWUsIHBhcmVudCB9KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IFwiLi9zcmMvaW5kZXhcIjsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHMvVXRpbHNcIjtcclxuXHJcblV0aWxzLmdsb2JhbC5kZWZhdWx0anMgPSBVdGlscy5nbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5VdGlscy5nbG9iYWwuZGVmYXVsdGpzLmV4dGRvbSA9IFV0aWxzLmdsb2JhbC5kZWZhdWx0anMuZXh0ZG9tIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0dXRpbHMgOiB7XHJcblx0XHRVdGlsczogVXRpbHNcclxuXHR9XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwuZmluZCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5maW5kLmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIGRvY3VtZW50LnJlYWR5LmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLmNyZWF0ZSA9IGZ1bmN0aW9uKGFDb250ZW50LCBhc1RlbXBsYXRlKSB7XHJcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gIT09IFwic3RyaW5nXCIpXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZyFcIik7XHJcblx0XHJcblx0Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcblx0dGVtcGxhdGUuaW5uZXJIVE1MID0gYUNvbnRlbnQ7XHJcblx0aWYoYXNUZW1wbGF0ZSlcclxuXHRcdHJldHVybiB0ZW1wbGF0ZTtcclxuXHRcclxuXHRyZXR1cm4gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKS5jaGlsZE5vZGVzO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnNjcmlwdCA9IGZ1bmN0aW9uKGFGaWxlLCBhVGFyZ2V0KSB7XHJcblx0aWYoYUZpbGUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChhRmlsZS5tYXAoZmlsZSA9PiBVdGlscy5nbG9iYWwuc2NyaXB0KGZpbGUsIGFUYXJnZXQpKSk7XHJcblx0XHJcblx0aWYodHlwZW9mIGFGaWxlID09PSBcInN0cmluZ1wiKVx0XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHIsZSkgPT4ge1xyXG5cdFx0XHRjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG5cdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG5cdFx0XHRzY3JpcHQub25sb2FkID0gZnVuY3Rpb24oKXtyKCl9O1xyXG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwibG9hZCBlcnJvciFcIil9O1xyXG5cdFx0XHQhYVRhcmdldCA/IGRvY3VtZW50LmJvZHkuYXBwZW5kKHNjcmlwdCkgOiBhVGFyZ2V0LmFwcGVuZChzY3JpcHQpO1xyXG5cdFx0XHRzY3JpcHQuc3JjID0gYUZpbGU7XHJcblx0XHR9KTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJGaXJzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIVwiKTtcclxufTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgUmVhZHlFdmVudFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50LCBRdWVyeVN1cHBvcnQsIFJlYWR5RXZlbnRTdXBwb3J0KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvY3VtZW50LnRyaWdnZXIoXCJyZWFkeVwiKSk7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50RnJhZ21lbnQsIFF1ZXJ5U3VwcG9ydCwgTWFuaXB1bGF0aW9uU3VwcG9ydCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgQXR0cmlidXRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRWxlbWVudCxRdWVyeVN1cHBvcnQsIEF0dHJpYnV0ZVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xuaW1wb3J0IEV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0V2ZW50U3VwcG9ydFwiO1xuXG5leHRlbmRQcm90b3R5cGUoRXZlbnRUYXJnZXQsIEV2ZW50U3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBIdG1sQ2xhc3NTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvSHRtbENsYXNzU3VwcG9ydFwiO1xyXG5pbXBvcnQgU2hvd0hpZGVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxFbGVtZW50LCBIdG1sQ2xhc3NTdXBwb3J0LCBTaG93SGlkZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxJbnB1dEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MU2VsZWN0RWxlbWVudCxWYWx1ZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxUZXh0QXJlYUVsZW1lbnQsRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMudmFsdWUgPSBhcmd1bWVudHNbMF1cclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pKTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MQ29sbGVjdGlvbiwgTGlzdFN1cHBvcnQpO1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHRIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24uZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXHJcblx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmcsIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRlbHNlIGlmKGFyZyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IGFyZyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGFyZyBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmKGFyZ1tpXSAmJiBhcmdbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XHJcblx0XHRcdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnW2ldLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0ZGF0YS5sZW5ndGggPSB7dmFsdWU6IGNvdW50ZXJ9O1xyXG5cdHJldHVybiAgT2JqZWN0LmNyZWF0ZShIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUsIGRhdGEpO1xyXG59O1xyXG5cclxuXHJcbkRlbGVnYXRlckJ1aWxkZXIoZnVuY3Rpb24oYUZ1bmN0aW9uTmFtZSwgdGhlQXJndW1lbnRzKSB7XHJcblx0bGV0IHJlc3VsdHMgPSBbXTtcdFxyXG5cdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdGlmKG5vZGUgJiYgdHlwZW9mIG5vZGVbYUZ1bmN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGxldCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcclxuXHRcdHJldHVybiBIVE1MQ29sbGVjdGlvbi5mcm9tLmFwcGx5KG51bGwsIHJlc3VsdHMpO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG59LEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERhdGFTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRGF0YVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZSxEYXRhU3VwcG9ydCxNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShOb2RlTGlzdCwgTGlzdFN1cHBvcnQpO1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHROb2RlTGlzdC5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuTm9kZUxpc3QuZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZywgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdGVsc2UgaWYoYXJnIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgYXJnIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgYXJnIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYoYXJnW2ldICYmIGFyZ1tpXSBpbnN0YW5jZW9mIE5vZGUpe1xyXG5cdFx0XHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZ1tpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGRhdGEubGVuZ3RoID0ge3ZhbHVlOiBjb3VudGVyfTtcclxuXHRyZXR1cm4gIE9iamVjdC5jcmVhdGUoTm9kZUxpc3QucHJvdG90eXBlLCBkYXRhKTtcclxufTtcclxuXHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xyXG5cdGxldCByZXN1bHRzID0gW107XHRcclxuXHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRpZihub2RlICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGUgfHwgcmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0cyk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIHJlc3VsdHM7XHJcbn0sTm9kZUxpc3QucHJvdG90eXBlLCBOb2RlLnByb3RvdHlwZSwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgRWxlbWVudC5wcm90b3R5cGUsIEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkF0dHJpYnV0ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlcygpID8gKCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHR0aGlzLmdldEF0dHJpYnV0ZU5hbWVzKCkuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH0pKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkRhdGFTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5kYXRhc2V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRmb3IgKG5hbWUgaW4gdGhpcy5kYXRhc2V0KVxyXG5cdFx0XHRcdGRhdGFbbmFtZV0gPSB0aGlzLmRhdGFzZXRbbmFtZV07XHJcblxyXG5cdFx0dGhpcy5kYXRhID0gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0XHRkZWxldGUgZGF0YVthcmd1bWVudHNbMF1dO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0ZGF0YVthcmd1bWVudHNbMF1dID0gYXJndW1lbnRzWzFdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9KS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRhdGEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDA7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkV2ZW50U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0Y29uc3QgRVZFTlRTUExJVEVSID0gLyhcXHMrKXwoXFxzKixcXHMqKS87XHJcblx0Y29uc3QgZ2V0V3JhcHBlckhhbmRsZU1hcCA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRpZiAoIWVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18pIGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18gPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX187XHJcblx0fTtcclxuXHJcblx0Y29uc3QgZ2V0VHJpZ2dlclRpbWVvdXRzID0gKGVsZW1lbnQpID0+IHtcclxuXHRcdGlmICghZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXykgZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXyA9IHt9O1xyXG5cclxuXHRcdHJldHVybiBlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlbW92ZVdyYXBwZXIgPSAoZWxlbWVudCwgZGF0YSwgZXZlbnRUeXBlcykgPT4ge1xyXG5cdFx0Y29uc3QgeyB3cmFwcGVyLCBvcHRpb24sIGV2ZW50cywgaGFuZGxlIH0gPSBkYXRhO1xyXG5cdFx0Y29uc3QgY2FwdHVyZSA9IG9wdGlvbi5jYXB0dXJlO1xyXG5cdFx0aWYgKGV2ZW50VHlwZXMpIHtcclxuXHRcdFx0ZXZlbnRUeXBlcyA9IHR5cGVvZiBldmVudFR5cGVzID09PSBcInN0cmluZ1wiID8gZXZlbnRUeXBlcy5zcGxpdChFVkVOVFNQTElURVIpIDogZXZlbnRUeXBlcztcclxuXHRcdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRUeXBlcykge1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gZXZlbnRzLmluZGV4T2YoZXZlbnQpO1xyXG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIGNhcHR1cmUpO1xyXG5cdFx0XHRcdFx0ZXZlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChldmVudHMubGVuZ3RoID09IDApIGdldFdyYXBwZXJIYW5kbGVNYXAoZWxlbWVudCkuZGVsZXRlKGhhbmRsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgY2FwdHVyZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Z2V0V3JhcHBlckhhbmRsZU1hcChlbGVtZW50KS5kZWxldGUoaGFuZGxlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHRocm93IG5ldyBFcnJvcihcIlRvbyBsZXNzIGFyZ3VtZW50cyFcIik7XHJcblxyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBldmVudHMgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKS5zcGxpdChFVkVOVFNQTElURVIpIDogYXJncy5zaGlmdCgpO1xyXG5cdFx0Y29uc3QgZmlsdGVyID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIgPyBhcmdzLnNoaWZ0KCkgOiBudWxsO1xyXG5cdFx0Y29uc3QgaGFuZGxlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0Y29uc3Qgb3B0aW9uID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwidW5kZWZpbmVkXCIgPyB7IGNhcHR1cmU6IGZhbHNlLCBvbmNlOiBmYWxzZSwgcGFzc2l2ZTogZmFsc2UgfSA6IHR5cGVvZiBhcmdzWzBdID09PSBcImJvb2xlYW5cIiA/IHsgY2FwdHVyZTogYXJncy5zaGlmdCgpLCBvbmNlOiBmYWxzZSwgcGFzc2l2ZTogZmFsc2UgfSA6IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IHdyYXBwZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGZpbHRlcikge1xyXG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldC5pcyA9PT0gXCJmdW5jdGlvblwiICYmICF0YXJnZXQuaXMoZmlsdGVyKSkgcmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGhhbmRsZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRpZiAob3B0aW9uLm9uY2UpIHJlbW92ZVdyYXBwZXIodGhpcywgd3JhcHBlcik7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdGdldFdyYXBwZXJIYW5kbGVNYXAodGhpcykuc2V0KGhhbmRsZSwgeyBoYW5kbGUsIHdyYXBwZXI6IHdyYXBwZXIsIGV2ZW50cywgb3B0aW9uIH0pO1xyXG5cclxuXHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIG9wdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnJlbW92ZU9uID0gZnVuY3Rpb24gKGhhbmRsZSwgZXZlbnQsIGNhcHR1cmUpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBnZXRXcmFwcGVySGFuZGxlTWFwKHRoaXMpLmdldChoYW5kbGUpO1xyXG5cdFx0aWYgKGRhdGEpIHJlbW92ZVdyYXBwZXIodGhpcywgZGF0YSwgZXZlbnQpO1xyXG5cdFx0ZWxzZSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlLCBldmVudCwgY2FwdHVyZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0Y29uc3QgdGltZW91dCA9IHR5cGVvZiBhcmdzWzBdID09PSBcIm51bWJlclwiID8gYXJncy5zaGlmdCgpIDogLTE7XHJcblx0XHRpZiAodGltZW91dCA+PSAwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSBhcmdzWzBdO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0cyA9IGdldFRyaWdnZXJUaW1lb3V0cyh0aGlzKTtcclxuXHRcdFx0Y29uc3QgdGltZW91dGlkID0gdGltZW91dHNbdHlwZV07XHJcblx0XHRcdGlmICh0aW1lb3V0aWQpIGNsZWFyVGltZW91dCh0aW1lb3V0aWQpO1xyXG5cclxuXHRcdFx0dGltZW91dHNbdHlwZV0gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRkZWxldGUgdGltZW91dHNbdHlwZV07XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdGNvbnN0IGRlbGVnYXRlID0gYXJnc1swXSBpbnN0YW5jZW9mIEV2ZW50ID8gYXJncy5zaGlmdCgpIDogbnVsbDtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IGFyZ3MubGVuZ3RoID49IDEgPyAoYXJncy5sZW5ndGggPT0gMSA/IGFyZ3Muc2hpZnQoKSA6IGFyZ3MpIDogZGVsZWdhdGU7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gZGF0YSA/IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlLCBkZXRhaWw6IGRhdGEgfSkgOiBuZXcgRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcclxuXHJcblx0XHRcdGlmIChkZWxlZ2F0ZSkgZXZlbnQuZGVsZWdhdGVkRXZlbnQgPSBkZWxlZ2F0ZTtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJIdG1sQ2xhc3NTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LmFkZChjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsIGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcdFx0XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC50b2dnbGUoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC50b2dnbGUoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTGlzdFN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFx0XHJcblx0UHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbigpIHtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRpZih0aGlzW2ldID09IGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApXHJcblx0XHRcdHJldHVybiB0aGlzWzBdO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApXHJcblx0XHRcdHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL1V0aWxzXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJNYW5pcHVsYXRpb25TdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpe1xyXG5cdFx0bGV0IG5vZGVzID0gdGhpcy5jaGlsZE5vZGVzXHJcblx0XHR3aGlsZShub2Rlcy5sZW5ndGggIT0gMClcdFx0XHRcclxuXHRcdFx0bm9kZXNbMF0ucmVtb3ZlKHRydWUpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkTm9kZXM7XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdGlmKGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUw7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XHJcblx0XHRlbHNlIFxyXG5cdFx0XHRBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuXHRcdFx0XHR0aGlzLmVtcHR5KCk7XHJcblx0XHRcdFx0aWYodHlwZW9mIGNvbnRlbnQgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRlbHNlIGlmKGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlIHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb250ZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pe1xyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFx0XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRjb25zdCBhcHBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3QgYXBwZW5kID0gUHJvdG90eXBlLmFwcGVuZENoaWxkLmJpbmQodGhpcyk7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGFyZyk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRjcmVhdGUoYXJnKS5mb3JFYWNoKGFwcGVuZCk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goYXBwZW5kKTtcclxuXHRcdH1cclxuXHR9O1x0XHJcblx0UHJvdG90eXBlLmFwcGVuZCA9IGFwcGVuZDtcclxuXHRcclxuXHRjb25zdCBwcmVwZW5kID0gZnVuY3Rpb24oYUZpcnN0RWxlbWVudCwgYUVsZW1lbnQpe1xyXG5cdFx0dGhpcy5pbnNlcnRCZWZvcmUoYUVsZW1lbnQsIGFGaXJzdEVsZW1lbnQpO1xyXG5cdH07XHJcblx0UHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRhcHBlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCBmaXJzdCA9IHRoaXMuY2hpbGROb2Rlcy5maXJzdCgpO1xyXG5cdFx0XHRjb25zdCBpbnNlcnQgPSBwcmVwZW5kLmJpbmQodGhpcywgZmlyc3QpO1xyXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRjb25zdCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRcdGluc2VydChhcmcpO1xyXG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydCk7XHJcblx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnN1ZmZpY2llbnQgYXJndW1lbnRzISBPbmUgb3IgdHdvIG5vZGVzIHJlcXVpcmVkIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gdGhpcy5wYXJlbnROb2RlIDogdGhpcztcclxuXHRcdGNvbnN0IG9sZE5vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzIDogYXJndW1lbnRzWzBdO1xyXG5cdFx0Y29uc3QgbmV3Tm9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50c1sxXTtcclxuXHRcdFxyXG5cdFx0aWYobmV3Tm9kZSBpbnN0YW5jZW9mIEFycmF5IHx8IG5ld05vZGUgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBuZXdOb2RlIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pe1xyXG5cdFx0XHRuZXdOb2RlLmZvckVhY2goYUl0ZW0gPT4gcGFyZW50Lmluc2VydEJlZm9yZShhSXRlbSwgb2xkTm9kZSkpO1xyXG5cdFx0XHRvbGROb2RlLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRwYXJlbnQucmVwbGFjZUNoaWxkKG5ld05vZGUsb2xkTm9kZSk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5wYXJlbnROb2RlID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluc2VydCBub2RlcyBhZnRlciB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRjb25zdCBuZXh0ID0gdGhpcy5uZXh0U2libGluZztcclxuXHRcdGlmKG5leHQpXHJcblx0XHRcdFByb3RvdHlwZS5iZWZvcmUuYXBwbHkobmV4dCwgYXJndW1lbnRzKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0UHJvdG90eXBlLmFwcGVuZC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cyk7XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5wYXJlbnROb2RlID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluc2VydCBub2RlcyBhZnRlciB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRjb25zdCBpbnNlcnRlciA9IChub2RlKSA9PiB7cGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB0aGlzKTt9XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0Y29uc3QgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdGluc2VydGVyKGFyZyk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnRlcik7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0ZXIpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgcGFyZW50U2VsZWN0b3IgPSAvOnBhcmVudChcXChcXFwiKFteXFwpXSopXFxcIlxcKSk/L2k7XHJcbmNvbnN0IHF1ZXJ5RXhlY3V0ZXIgPSBmdW5jdGlvbiAoYUVsZW1lbnQsIGFTZWxlY3Rvcikge1xyXG5cdGxldCBtYXRjaCA9IHBhcmVudFNlbGVjdG9yLmV4ZWMoYVNlbGVjdG9yKTtcclxuXHRpZiAobWF0Y2gpIHtcclxuXHRcdGxldCByZXN1bHQgPSBhRWxlbWVudDtcclxuXHRcdGlmIChtYXRjaC5pbmRleCA+IDApIHtcclxuXHRcdFx0cmVzdWx0ID0gYUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChhU2VsZWN0b3Iuc3Vic3RyKDAsIG1hdGNoLmluZGV4KSk7XHJcblx0XHRcdGlmIChyZXN1bHQubGVuZ3RoID09IDApIHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQobWF0Y2hbMl0pO1xyXG5cdFx0aWYgKHJlc3VsdCkge1xyXG5cdFx0XHRsZXQgbmV4dFNlbGVjdG9yID0gYVNlbGVjdG9yLnN1YnN0cihtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCkudHJpbSgpO1xyXG5cdFx0XHRpZiAobmV4dFNlbGVjdG9yLmxlbmd0aCA+IDApIHJlc3VsdCA9IHJlc3VsdC5maW5kKG5leHRTZWxlY3Rvcik7XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH0gZWxzZSByZXR1cm4gYUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChhU2VsZWN0b3IpO1xyXG59O1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiUXVlcnlTdXBwb3J0XCIsIChQcm90b3R5cGUpID0+IHtcclxuXHRQcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxldCBub2RlcyA9IFtdO1xyXG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgYXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0d2hpbGUgKGFyZykge1xyXG5cdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdGxldCByZXN1bHQgPSBxdWVyeUV4ZWN1dGVyKHRoaXMsIGFyZyk7XHJcblx0XHRcdFx0aWYgKHJlc3VsdCkgbm9kZXMucHVzaChyZXN1bHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHJlc3VsdCA9IE5vZGVMaXN0LmZyb20uYXBwbHkobnVsbCwgbm9kZXMpO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuaXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50IHx8IHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSByZXR1cm4gZmFsc2U7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLm1hdGNoZXMoYXJndW1lbnRzWzBdKTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1swXS5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcclxuXHRcdFx0XHRsZXQgZmlsdGVyID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyLmxlbmd0aDsgaSsrKSBpZiAodGhpcy5tYXRjaGVzKGZpbHRlcltpXSkpIHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSByZXR1cm4gdGhpcy5pcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBpZ25vcmVTaGFkb3dSb290KSB7XHJcblx0XHRpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuIG51bGw7XHJcblx0XHRpZ25vcmVTaGFkb3dSb290ID0gdHlwZW9mIHNlbGVjdG9yID09PSBcImJvb2xlYW5cIiA/IHNlbGVjdG9yIDogaWdub3JlU2hhZG93Um9vdDtcclxuXHRcdHNlbGVjdG9yID0gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiID8gc2VsZWN0b3IgOiBudWxsO1xyXG5cclxuXHRcdGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCAmJiBpZ25vcmVTaGFkb3dSb290KSBwYXJlbnQgPSBwYXJlbnQuaG9zdDtcclxuXHJcblx0XHRpZiAoc2VsZWN0b3IpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR3aGlsZSAocGFyZW50ICYmICFwYXJlbnQuaXMoc2VsZWN0b3IpKSBwYXJlbnQgPSBwYXJlbnQucGFyZW50KHNlbGVjdG9yLCBpZ25vcmVTaGFkb3dSb290KTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJ0aGlzOlwiLCB0aGlzLCBcInBhcmVudDpcIiwgcGFyZW50LCBcImVycm9yOlwiLCBlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHBhcmVudDtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUucGFyZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGxldCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHRcdGxldCBwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR3aGlsZSAocGFyZW50KSB7XHJcblx0XHRcdHJlc3VsdC5wdXNoKHBhcmVudCk7XHJcblx0XHRcdHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKHJlc3VsdCk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnNlbGVjdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdGVsc2UgaWYgKHRoaXMuaWQpIHJldHVybiBcIiNcIiArIHRoaXMuaWQ7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0bGV0IHNlbGVjdG9yID0gdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudCgpO1xyXG5cdFx0XHRpZiAocGFyZW50KSB7XHJcblx0XHRcdFx0bGV0IHNhbWVUYWdTaWJsaW5ncyA9IHBhcmVudC5maW5kKFwiOnNjb3BlPlwiICsgc2VsZWN0b3IpO1xyXG5cdFx0XHRcdGlmIChzYW1lVGFnU2libGluZ3MgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xyXG5cdFx0XHRcdFx0bGV0IGluZGV4ID0gc2FtZVRhZ1NpYmxpbmdzLmluZGV4T2YodGhpcyk7XHJcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAwKSBzZWxlY3RvciArPSBcIjpudGgtY2hpbGQoXCIgKyAoaW5kZXggKyAxKSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgcGFyZW50U2VsZWN0b3IgPSBwYXJlbnQuc2VsZWN0b3IoKTtcclxuXHRcdFx0XHRyZXR1cm4gcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFwiPlwiICsgc2VsZWN0b3IgOiBzZWxlY3RvcjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc2VsZWN0b3I7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9zZXN0cyhhUXVlcnkpLmZpcnN0KCk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmNsb3Nlc3RzID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5maW5kKGFRdWVyeSk7XHJcblx0XHRpZiAocmVzdWx0Lmxlbmd0aCAhPSAwKSByZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcblx0XHRpZiAocGFyZW50KSByZXR1cm4gcGFyZW50LmNsb3Nlc3RzKGFRdWVyeSk7XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20oW10pO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5uZXN0ZWQgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRpZiAodGhpcy5pcyhhUXVlcnkpKSByZXR1cm4gTm9kZUxpc3QuZnJvbSh0aGlzKTtcclxuXHJcblx0XHRsZXQgbmVzdGVkID0gdGhpcy5maW5kKGFRdWVyeSk7XHJcblx0XHRpZiAobmVzdGVkICYmIG5lc3RlZC5sZW5ndGggPiAwKSByZXR1cm4gbmVzdGVkO1xyXG5cdFx0ZWxzZSByZXR1cm4gTm9kZUxpc3QuZnJvbSh0aGlzLnBhcmVudChhUXVlcnkpKTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiUmVhZHlFdmVudFN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbihhRnVuY3Rpb24sIG9uY2Upe1x0XHJcblx0XHR0aGlzLm9uKFwicmVhZHlcIiwgYUZ1bmN0aW9uLCBvbmNlKTtcclxuXHRcdGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKVx0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWFkeVwiKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgSElERVZBTFVFID0gXCJub25lXCI7XHJcblxyXG5jb25zdCBpc0hpZGRlbiA9IChlbGVtZW50KSA9PiB7XHJcblx0cmV0dXJuIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gSElERVZBTFVFXHJcbn07XHJcblxyXG5jb25zdCBpbml0ID0gKGVsZW1lbnQpID0+IHtcdFxyXG5cdGxldCBkaXNwbGF5ID0gIWlzSGlkZGVuKGVsZW1lbnQpID8gZWxlbWVudC5zdHlsZS5kaXNwbGF5IDogXCJcIjtcclxuXHRcclxuXHRlbGVtZW50LnNob3cgPSAoZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHRyZXR1cm4gdGhpcztcdFx0XHJcblx0fSkuYmluZChlbGVtZW50KTtcclxuXHRcclxuXHRlbGVtZW50LmhpZGUgPSAoZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IEhJREVWQUxVRTtcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9KS5iaW5kKGVsZW1lbnQpO1xyXG5cdFxyXG5cdHJldHVybiBlbGVtZW50O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlNob3dIaWRlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaW5pdCh0aGlzKS5zaG93LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGluaXQodGhpcykuaGlkZS5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnRvZ2dsZVNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpc0hpZGRlbih0aGlzKSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XHJcblx0fTtcclxuXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IElucHV0VHlwZXMgPSBbXHJcblx0e1xyXG5cdFx0c2VsZWN0b3IgOiBcInNlbGVjdFwiLFxyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRcdHRoaXMuZmluZChcIm9wdGlvblwiKS5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0aWYob3B0aW9uLnNlbGVjdGVkKVxyXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gob3B0aW9uLnZhbHVlKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oKXtcdFx0XHRcdFxyXG5cdFx0XHRsZXQgdmFsdWVzID0gW107XHJcblx0XHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRcdGxldCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdHdoaWxlKGFyZyl7XHJcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShhcmcpKVxyXG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWVzLmNvbmNhdChhcmcpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHZhbHVlcy5wdXNoKGFyZyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZXM7XHJcblx0XHRcdHRoaXMuZmluZChcIm9wdGlvblwiKS5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZXMuaW5kZXhPZihvcHRpb24udmFsdWUpID49IDApO1x0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0fVx0XHRcdFxyXG5cdH0sXHJcblx0e1xyXG5cdFx0c2VsZWN0b3IgOiBcImlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0sIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl1cIixcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKHRoaXMudmFsdWUgPT0gXCJvblwiIHx8IHRoaXMudmFsdWUgPT0gXCJvZmZcIilcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGVja2VkO1xyXG5cdFx0XHRlbHNlIGlmKHRoaXMuY2hlY2tlZClcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdGlmKHR5cGVvZiBhVmFsdWUgPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYVZhbHVlID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IHRoaXMudmFsdWUgPT0gYVZhbHVlO1xyXG5cdFx0XHRlbHNlIGlmKEFycmF5LmlzQXJyYXkoYVZhbHVlKSlcclxuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSBhVmFsdWUuaW5kZXhPZih0aGlzLnZhbHVlKSA+PSAwO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcclxuXHRcdH1cclxuXHR9XHJcbl07XHJcblxyXG5jb25zdCBEZWZhdWx0SW5wdXRUeXBlID0ge1xyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oYVZhbHVlKXtcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGFWYWx1ZTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKFwiaW5wdXRcIik7XHJcblx0XHR9XHRcclxufTtcclxuXHJcbmNvbnN0IGdldElucHV0VHlwZSA9IGZ1bmN0aW9uKGFFbGVtZW50KXtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgSW5wdXRUeXBlcy5sZW5ndGg7IGkrKylcclxuXHRcdGlmKGFFbGVtZW50LmlzKElucHV0VHlwZXNbaV0uc2VsZWN0b3IpKVxyXG5cdFx0XHRyZXR1cm4gSW5wdXRUeXBlc1tpXTtcdFx0XHJcblx0cmV0dXJuIERlZmF1bHRJbnB1dFR5cGU7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiVmFsdWVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgdHlwZSA9IGdldElucHV0VHlwZSh0aGlzKTtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHR5cGUuZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHR5cGUuc2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgXCIuL2RvbS9FdmVudFRhcmdldFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Ob2RlXCI7XHJcbmltcG9ydCBcIi4vZG9tL0VsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vRG9jdW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vRG9jdW1lbnRGcmFnbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MSW5wdXRFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxUZXh0QXJlYUVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTFNlbGVjdEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vTm9kZUxpc3RcIjtcclxuaW1wb3J0IFwiLi9kb20vSHRtbENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IFwiLi9HbG9iYWxcIjtcclxuIiwiY29uc3QgRGVsZWdhdGVyQnVpbGRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3Qgc291cmNlID0gYXJncy5zaGlmdCgpO1xyXG5cdGFyZ3MuZm9yRWFjaCggdGFyZ2V0ID0+e1xyXG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxyXG5cdFx0LmZvckVhY2gobmFtZSA9PiB7XHJcblx0XHRcdGNvbnN0IHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSk7XHJcblx0XHRcdGlmICh0eXBlb2Ygc291cmNlW25hbWVdID09PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBwcm9wLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0c291cmNlW25hbWVdID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIG5hbWUsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0fTtcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IERlbGVnYXRlckJ1aWxkZXI7IiwiY29uc3QgZXh0ZW5kUHJvdG90eXBlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IHR5cGUgPSBhcmdzLnNoaWZ0KCk7XHRcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgZXh0ZW5kZXIgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRleHRlbmRlcih0eXBlKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHRlbmRQcm90b3R5cGU7IiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCBFWFRFTlNJT05TX01BUCA9IFV0aWxzLmdsb2JhbFZhcihcIl9fX0RPTV9BUElfRVhURU5TSU9OX01BUF9fX1wiLCB7fSk7XHJcbmNvbnN0IEV4dGVuZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFFeHRlbnRpb24pe1xyXG5cdHJldHVybiBmdW5jdGlvbihhVHlwZSl7XHRcclxuXHRcdGxldCBleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbYVR5cGUubmFtZV07XHJcblx0XHRpZighZXh0ZW5zaW9ucylcclxuXHRcdFx0ZXh0ZW5zaW9ucyA9IEVYVEVOU0lPTlNfTUFQW2FUeXBlLm5hbWVdID0ge307XHRcdFxyXG5cdFx0XHJcblx0XHRpZighZXh0ZW5zaW9uc1thTmFtZV0pe1xyXG5cdFx0XHRleHRlbnNpb25zW2FOYW1lXSA9IHRydWU7XHJcblx0XHRcdGFFeHRlbnRpb24oYVR5cGUucHJvdG90eXBlKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0Y29uc29sZS53YXJuKFwiZHVwbGljYXRlZCBsb2FkIG9mIGV4dGVuc2lvbiBcXFwiXCIgKyBhTmFtZSArIFwiXFxcIiFcIik7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZXI7IiwiY29uc3QgVXRpbHMgPSB7XHJcblx0Z2xvYmFsIDogKCgpID0+IHtcclxuXHRcdGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB3aW5kb3c7XHJcblx0XHRpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsO1xyXG5cdFx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdFx0cmV0dXJuIHt9O1x0XHRcclxuXHR9KSgpLFxyXG5cdGdsb2JhbFZhciA6IGZ1bmN0aW9uKGFOYW1lLCBhSW5pdFZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIFV0aWxzLmdsb2JhbFthTmFtZV0gPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFV0aWxzLmdsb2JhbFthTmFtZV0gPSBhSW5pdFZhbHVlO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gVXRpbHMuZ2xvYmFsW2FOYW1lXTtcdFx0XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7IiwiaW1wb3J0IENvbXBvbmVudCAsIHtjb21wb25lbnRCYXNlT2Z9IGZyb20gXCIuL3NyYy9Db21wb25lbnRcIjtcbmltcG9ydCB7ZGVmaW5lfSBmcm9tIFwiLi9zcmMvdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyXCI7XG5cbmV4cG9ydCB7Q29tcG9uZW50LCBjb21wb25lbnRCYXNlT2YsIGRlZmluZX07XG4iLCJpbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHNcIjtcbmltcG9ydCB7IHV1aWQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRFwiO1xuaW1wb3J0IHsgaW5pdFRpbWVvdXQsIHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcblxuY29uc3QgUFJJVkFURV9SRUFEWSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicmVhZHlcIik7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluaXQgPSAoY29tcG9uZW50KSA9PiB7XG5cdGxldCB0aW1lb3V0ID0gVElNRU9VVFMuZ2V0KGNvbXBvbmVudCk7XG5cdGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0VElNRU9VVFMuZ2V0KGNvbXBvbmVudCwgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0VElNRU9VVFMuZGVsZXRlKGNvbXBvbmVudCk7XG5cdFx0Y29uc3QgcmVhZHkgPSBQUklWQVRFX1JFQURZKGNvbXBvbmVudCk7XG5cdFx0dHJ5e1xuXHRcdFx0YXdhaXQgY29tcG9uZW50LmluaXQoKTtcblx0XHRcdHJlYWR5LnJlc29sdmUoKTtcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBjb21wb25lbnQhXCIsIGNvbXBvbmVudCwgZSk7XG5cdFx0XHRyZWFkeS5yZXNvbHZlKGUpO1xuXHRcdH1cblx0XHRjb21wb25lbnQudHJpZ2dlcihjb21wb25lbnRFdmVudG5hbWUoXCJpbml0aWFsemVkXCIsIGNvbXBvbmVudCkpO1xuXHR9LCBpbml0VGltZW91dCkpO1x0XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVUlEID0gKHByZWZpeCwgc3VmZml4KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cdGxldCBpZCA9IG51bGw7XG4gICAgd2hpbGUoY291bnQgPCAxMDApe1xuXHRcdGlkID0gYCR7cHJlZml4ID8gcHJlZml4IDogXCJcIn0ke3V1aWQoKX0ke3N1ZmZpeCA/IHN1ZmZpeCA6IFwiXCJ9YDtcblx0XHRpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKVxuXHRcdFx0cmV0dXJuIGlkO1xuXG5cdFx0Y291bnQrKztcblx0fVxuXHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcihcIlRvIG1hbnkgcmV0cmllcyB0byBjcmVhdGUgYW4gdW5pcXVlIGlkIC0gY3JlYXRlZCBpZCBpcyBub3QgdW5pcXVlIVwiKSk7XG5cdHJldHVybiBpZDtcbn07XG5cblxuXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT57XG5cdHJldHVybiBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBodG1sQmFzZVR5cGUge1xuXG5cdFx0XG5cdFx0Y29uc3RydWN0b3Ioe3NoYWRvd1Jvb3QgPSBmYWxzZSwgY29udGVudCA9IG51bGwsIGNyZWF0ZVVJRCA9IGZhbHNlLCB1aWRQcmVmaXggPSBcImlkLVwiLCB1aWRTdWZmaXggPSBcIlwifSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0UFJJVkFURV9SRUFEWSh0aGlzLCBsYXp5UHJvbWlzZSgpKTtcblx0XHRcdFxuXHRcblx0XHRcdGlmKGNyZWF0ZVVJRClcblx0XHRcdFx0dGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSk7XG5cdFxuXHRcdFx0aWYoc2hhZG93Um9vdClcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KTtcblx0XHRcdFxuXHRcdFx0aWYoY29udGVudClcblx0XHRcdFx0dGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJvb3QoKXtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cdFxuXHRcdGdldCByZWFkeSgpe1xuXHRcdFx0cmV0dXJuIFBSSVZBVEVfUkVBRFkodGhpcyk7XG5cdFx0fVxuXHRcblx0XHRhc3luYyBpbml0KCkge31cblx0XG5cdFx0YXN5bmMgZGVzdHJveSgpIHtcblx0XHRcdGlmKHRoaXMucmVhZHkucmVzb2x2ZWQpXG5cdFx0XHRcdFBSSVZBVEVfUkVBRFkodGhpcywgbGF6eVByb21pc2UoKSk7XG5cdFx0fVxuXHRcblx0XHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdGlmICh0aGlzLm93bmVyRG9jdW1lbnQgPT0gZG9jdW1lbnQgJiYgdGhpcy5pc0Nvbm5lY3RlZCkgaW5pdCh0aGlzKTtcblx0XHR9XG5cdFxuXHRcdGFkb3B0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2soKTtcblx0XHR9XG5cdFxuXHRcdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lKG5hbWUsIHRoaXMpKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBjb21wb25lbnRFdmVudG5hbWUoXCJjaGFuZ2VcIiwgdGhpcykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XG5cdFx0ZGlzY29ubmVjdGVkQ2FsbGJhY2soKXtcblx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdH1cblx0fTtcbn0gXG5cbmNvbnN0IENMQVpaTUFQID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50QmFzZU9mID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xuXHRsZXQgY2xhenogPSBDTEFaWk1BUC5nZXQoaHRtbEJhc2VUeXBlKTtcblx0aWYoY2xhenogPT0gbnVsbCl7XG5cdFx0Y2xhenogPSBidWlsZENsYXNzKGh0bWxCYXNlVHlwZSk7XG5cdFx0Q0xBWlpNQVAuc2V0KGh0bWxCYXNlVHlwZSwgY2xhenopO1xuXHR9XG5cblx0cmV0dXJuIGNsYXp6O1xufVxuXG5jb25zdCBDb21wb25lbnQgPSBjb21wb25lbnRCYXNlT2YoSFRNTEVsZW1lbnQpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIiwiZXhwb3J0IGNvbnN0IGNvbXBvbmVudFByZWZpeCA9IFwiZC1cIjtcclxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4ID0gXCJhdHRyaWJ1dGUtXCI7XHJcbmV4cG9ydCBjb25zdCBpbml0VGltZW91dCA9IDEwO1xyXG5leHBvcnQgY29uc3QgdHJpZ2dlclRpbWVvdXQgPSAxMDtcclxuIiwiaW1wb3J0IHsgY29tcG9uZW50UHJlZml4IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdG9Ob2RlTmFtZSA9IChuYW1lLCBwcmVmaXgpID0+IHtcblx0aWYodHlwZW9mIHByZWZpeCA9PT0gXCJzdHJpbmdcIilcblx0XHRyZXR1cm4gcHJlZml4ICsgbmFtZTtcblx0XHRcblx0cmV0dXJuIGNvbXBvbmVudFByZWZpeCArIG5hbWU7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmaW5lID0gZnVuY3Rpb24oY2xhenosIG9wdGlvbnMpIHtcblx0Y29uc3Qgbm9kZW5hbWUgPSBjbGF6ei5OT0RFTkFNRTtcblx0aWYgKCFjdXN0b21FbGVtZW50cy5nZXQobm9kZW5hbWUpKSB7XG5cdFx0Y3VzdG9tRWxlbWVudHMuZGVmaW5lKG5vZGVuYW1lLCBjbGF6eiwgb3B0aW9ucyk7XG5cdH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lOyBcbiIsImltcG9ydCB7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEV2ZW50bmFtZSA9IChldmVudFR5cGUsIG5vZGUgKSA9PiB7XHRcblx0bGV0IG5vZGVuYW1lID0gXCJ1bnN1cHBvcnRlZFwiO1xuXHRpZih0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGU7XG5cdGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuXHRcdG5vZGVuYW1lID0gbm9kZS5ub2RlTmFtZTtcblx0ZWxzZSBpZih0eXBlb2Ygbm9kZS5OT0RFTkFNRSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGUuTk9ERU5BTUU7XG5cdGVsc2UgdGhyb3cgbmV3IEVycm9yKGAke3R5cGVvZiBub2RlfSBpcyBub3Qgc3VwcG9ydGVkIGFzIHBhcmFtZXRlciBcIm5vZGVcIiFgKTtcblx0XG4gICByZXR1cm4gYCR7bm9kZW5hbWUudG9Mb3dlckNhc2UoKX06JHtldmVudFR5cGV9YDsvL3VzZSBAIGFzIHNlcGFydG9yIGFuZCBub3QgOlxufTtcblxuXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lID0gKGF0dHJpYnV0ZSwgbm9kZSApID0+IHtcbiAgICByZXR1cm4gY29tcG9uZW50RXZlbnRuYW1lKGAke2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fS0ke2F0dHJpYnV0ZX1gLCBub2RlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtjb21wb25lbnRFdmVudG5hbWUsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZX0iLCJpbXBvcnQgeyBOT0RFTkFNRV9GT1JNLCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9FVkFMVUFURSwgQVRUUklCVVRFX0NPTkRJVElPTiwgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBBVFRSSUJVVEVfVkFMSUQsIEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04sIEFUVFJJQlVURV9FRElUQUJMRSwgRVZFTlRfSU5URVJOQUxfU1RBUlRfVkFMSURBVElPTiwgRVZFTlRfSU5URVJOQUxfRklOSVNIX1ZBTElEQVRJT04gfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XHJcbmltcG9ydCBDb25kaXRpb25IYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9Db25kaXRpb25IYW5kbGVcIjtcclxuaW1wb3J0IEVkaXRhYmxlSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvRWRpdGFibGVIYW5kbGVcIjtcclxuaW1wb3J0IFZhbGlkYXRpb25IYW5kbGUgZnJvbSBcIi4vaGFuZGVscy9WYWxpZGF0aW9uSGFuZGxlXCI7XHJcbmltcG9ydCBNZXNzYWdlSGFuZGxlIGZyb20gXCIuL2hhbmRlbHMvTWVzc2FnZUhhbmRsZVwiO1xyXG5pbXBvcnQgeyBldmFsdWF0aW9uRGF0YSB9IGZyb20gXCIuL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XHJcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlLCB1cGRhdGVDb25kaXRpb25TdGF0ZSwgdXBkYXRlRWRpdGFibGVTdGF0ZSwgdXBkYXRlUmVhZG9ubHlTdGF0ZSwgdXBkYXRlVmFsaWRTdGF0ZSB9IGZyb20gXCIuL3V0aWxzL1N0YXRlSGVscGVyXCI7XHJcblxyXG5jb25zdCBfZm9ybSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwiZm9ybVwiKTtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfUkVBRE9OTFksIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgQVRUUklCVVRFX0VESVRBQkxFX0NPTkRJVElPTl07XHJcblxyXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdC8qKiBAdHlwZSB7Q29uZGl0aW9uSGFuZGxlfSAqL1xyXG5cdCNjb25kaXRpb25IYW5kbGU7XHJcblx0LyoqIEB0eXBlIHtFZGl0YWJsZUhhbmRsZX0gKi9cclxuXHQjZWRpdGFibGVIYW5kbGU7XHRcclxuXHQvKiogQHR5cGUge1ZhbGlkYXRpb25IYW5kbGV9ICovXHJcblx0I3ZhbGlkYXRpb25IYW5kbGU7XHRcclxuXHQvKiogQHR5cGUge01lc3NhZ2VIYW5kbGV9Ki9cclxuXHQjbWVzc2FnZUhhbmRsZTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy4jbWVzc2FnZUhhbmRsZSA9IG5ldyBNZXNzYWdlSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jY29uZGl0aW9uSGFuZGxlID0gbmV3IENvbmRpdGlvbkhhbmRsZSh0aGlzKTtcclxuXHRcdHRoaXMuI2VkaXRhYmxlSGFuZGxlID0gbmV3IEVkaXRhYmxlSGFuZGxlKHRoaXMpO1xyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbkhhbmRsZSA9IG5ldyBWYWxpZGF0aW9uSGFuZGxlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHRhd2FpdCB0aGlzLiNjb25kaXRpb25IYW5kbGUuaW5pdCgpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLiNtZXNzYWdlSGFuZGxlLmluaXQoKTtcclxuXHRcdFx0YXdhaXQgdGhpcy4jdmFsaWRhdGlvbkhhbmRsZS5pbml0KCk7XHJcblx0XHRcdGF3YWl0IHRoaXMuI2VkaXRhYmxlSGFuZGxlLmluaXQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpIHtcclxuXHRcdHJldHVybiAoc3VwZXIuaWQgfHwgXCJcIikudHJpbSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IG5hbWUoKSB7XHJcblx0XHRyZXR1cm4gKHN1cGVyLm5hbWUgfHwgXCJcIikudHJpbSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkYXRpb25IYW5kbGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdmFsaWRhdGlvbkhhbmRsZTtcclxuXHR9XHJcblxyXG5cdGdldCBtZXNzYWdlSGFuZGxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI21lc3NhZ2VIYW5kbGU7XHJcblx0fVxyXG5cclxuXHRhZGRWYWxpZGF0aW9uKHZhbGlkYXRpb24pIHtcclxuXHRcdHRoaXMuI3ZhbGlkYXRpb25IYW5kbGUuYWRkQ3VzdG9tVmFsaWRhdGlvbih2YWxpZGF0aW9uKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuXHRcdC8vY29uc29sZS5sb2coYCR7dGhpcy5ub2RlTmFtZX0oJHt0aGlzLm5hbWV9KS52YWxpZGF0ZTpgLCBkYXRhKVxyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9FVkFMVUFURSwgXCJcIik7XHJcblx0XHRjb25zdCBjb250ZXh0ID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgYXdhaXQgZXZhbHVhdGlvbkRhdGEodGhpcykpO1xyXG5cdFx0YXdhaXQgdGhpcy4jY29uZGl0aW9uSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cdFx0YXdhaXQgdGhpcy4jZWRpdGFibGVIYW5kbGUudmFsaWRhdGUoY29udGV4dCk7XHJcblx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0aW9uSGFuZGxlLnZhbGlkYXRlKGNvbnRleHQpO1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9FVkFMVUFURSwgbnVsbCk7XHJcblxyXG5cdFx0YXdhaXQgdGhpcy4jbWVzc2FnZUhhbmRsZS52YWxpZGF0ZShjb250ZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy52YWxpZDtcclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0bGV0IGZvcm0gPSBfZm9ybSh0aGlzKTtcclxuXHRcdGlmICghZm9ybSkge1xyXG5cdFx0XHRmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdF9mb3JtKHRoaXMsIGZvcm0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvcm07XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcclxuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xyXG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xyXG5cdFx0XHR0aGlzLmFjdGl2ZVVwZGF0ZWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGFjdGl2ZVVwZGF0ZWQoKSB7fVxyXG5cclxuXHRnZXQgcmVhZG9ubHkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX1JFQURPTkxZKTtcclxuXHR9XHJcblxyXG5cdHNldCByZWFkb25seShyZWFkb25seSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcImNoYW5nZSByZWFkb25seTogXCIsIHtyZWFkb25seSwgZWRpdGFibGU6IHRoaXMuZWRpdGFibGUsIHRoaXM6IHRoaXN9KTtcclxuXHRcdHVwZGF0ZVJlYWRvbmx5U3RhdGUodGhpcywgIXRoaXMuZWRpdGFibGUgPyAgdHJ1ZSA6IHJlYWRvbmx5LCAhdGhpcy5yZWFkeS5yZXNvbHZlZCk7XHJcblxyXG5cdFx0dGhpcy5yZWFkb25seVVwZGF0ZWQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlYWRvbmx5VXBkYXRlZCgpIHt9XHJcblxyXG5cdGdldCBlZGl0YWJsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRURJVEFCTEUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGVkaXRhYmxlKGVkaXRhYmxlKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiY2hhbmdlIGVkaXRhYmxlOiBcIiwgZWRpdGFibGUsIHRoaXMpO1xyXG5cdFx0dXBkYXRlRWRpdGFibGVTdGF0ZSh0aGlzLCBlZGl0YWJsZSwgIXRoaXMucmVhZHkucmVzb2x2ZWQpO1xyXG5cdFx0dGhpcy5lZGl0YWJsZVVwZGF0ZWQoKTtcclxuXHRcdHRoaXMucmVhZG9ubHkgPSAhZWRpdGFibGU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBlZGl0YWJsZVVwZGF0ZWQoKSB7fVxyXG5cclxuXHRzZXQgY29uZGl0aW9uKGNvbmRpdGlvbikge1xyXG5cdFx0dXBkYXRlQ29uZGl0aW9uU3RhdGUodGhpcywgY29uZGl0aW9uKTtcclxuXHRcdHRoaXMuY29uZGl0aW9uVXBkYXRlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiAhdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElEKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNvbmRpdGlvblVwZGF0ZWQoKSB7fVxyXG5cclxuXHRzZXQgdmFsaWQodmFsaWQpIHtcclxuXHRcdHVwZGF0ZVZhbGlkU3RhdGUodGhpcywgdmFsaWQpO1xyXG5cdFx0dGhpcy52YWxpZFVwZGF0ZWQoKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWxpZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfVkFMSUQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRVcGRhdGVkKCkge31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcclxuIiwiaW1wb3J0IHsgRVZFTlRfRklFTERfSU5JVElBTElaRUQsIFxyXG5cdEVWRU5UX0ZJRUxEX1JFTU9WRUQsIFxyXG5cdEVWRU5UX1ZBTFVFX1VQREFURUQsXHJcblx0QVRUUklCVVRFX05BTUUsIFxyXG5cdEFUVFJJQlVURV9SRVFVSVJFRCwgXHJcblx0QVRUUklCVVRFX05PVkFMVUUgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xyXG5pbXBvcnQgeyBwcml2YXRlUHJvcGVydHlBY2Nlc3NvciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcml2YXRlUHJvcGVydHlcIjtcclxuaW1wb3J0IHsgZGF0YUlzTm9WYWx1ZSB9IGZyb20gXCIuL3V0aWxzL1ZhbHVlSGVscGVyXCI7XHJcblxyXG5jb25zdCBfcGFyZW50ID0gcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IoXCJwYXJlbnRcIik7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfUkVRVUlSRUQsIEFUVFJJQlVURV9OT1ZBTFVFXTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaW5kUGFyZW50RmllbGQgPSAoZmllbGQpID0+IHtcclxuXHRsZXQgcGFyZW50ID0gZmllbGQucGFyZW50Tm9kZTtcclxuXHR3aGlsZSAocGFyZW50KSB7XHJcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgQmFzZUZpZWxkKSByZXR1cm4gcGFyZW50O1xyXG5cclxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZUhhc1ZhbHVlID0gKGhhc1ZhbHVlLCBmaWVsZCkgPT4ge1xyXG5cdGZpZWxkLmF0dHIoQVRUUklCVVRFX05PVkFMVUUsICFoYXNWYWx1ZSA/IFwiXCIgOiBudWxsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBiYXNpYyBmaWVsZCBjbGFzcyAtIGV4dGVuZCBjdXN0b20gZmllbGRzIGJ5IHRoaXMgY2xhc3NcclxuICpcclxuICogQGNsYXNzIEJhc2VGaWVsZFxyXG4gKiBAdHlwZWRlZiB7QmFzZUZpZWxkfVxyXG4gKiBAZXh0ZW5kcyB7QmFzZX1cclxuICogQGV4YW1wbGVcclxuICogY2xhc3MgQ3VzdG9tRmllbGQgZXh0ZW5kIEJhc2VGaWVsZHtcclxuICogXHRjb25zdHJ1Y3RvcihvcHRpb24gPSB7fSl7XHJcbiAqIFx0XHRzdXBlcihvcHRpb24pO1xyXG4gKiBcdH1cclxuICpcclxuICogXHRhc3luYyBpbml0KCl7XHJcbiAqIFx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcbiAqIFx0XHQvL3lvdXIgY3VzdG9tIGNvZGVcclxuICogXHR9XHJcbiAqIH1cclxuICovXHJcbmNsYXNzIEJhc2VGaWVsZCBleHRlbmRzIEJhc2Uge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2Uub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcclxuXHR9XHJcblxyXG5cdCN2YWx1ZSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmFzZUZpZWxkLlxyXG5cdCAqXHJcblx0ICogQGNvbnN0cnVjdG9yXHJcblx0ICogQHBhcmFtIHt7fX0gW29wdGlvbnM9e31dXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdGNvbnN0IHsgdmFsdWUgfSA9IG9wdGlvbnM7XHJcblx0XHR0aGlzLiN2YWx1ZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5yb290Lm9uKEVWRU5UX1ZBTFVFX1VQREFURUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiB0byBpbml0aWFsaXplIHRoZSBjdXN0b20gZmllbGQuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKlxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogY2xhc3MgQ3VzdG9tRmllbGQgZXh0ZW5kIEJhc2VGaWVsZHtcclxuXHQgKiBcdGNvbnN0cnVjdG9yKG9wdGlvbiA9IHt9KXtcclxuXHQgKiBcdFx0c3VwZXIob3B0aW9uKTtcclxuXHQgKiBcdH1cclxuXHQgKlxyXG5cdCAqIFx0YXN5bmMgaW5pdCgpe1xyXG5cdCAqIFx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0ICogXHRcdC8veW91ciBjdXN0b20gY29kZVxyXG5cdCAqIFx0fVxyXG5cdCAqIH1cclxuXHQgKi9cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCkpO1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgY2FsbGVkIGJ5IGRlc3Ryb3lpbmcgdGhlIGNvbXBvbmVudC5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShudWxsKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMudHJpZ2dlcihFVkVOVF9GSUVMRF9SRU1PVkVEKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBwYXJlbnQgZmllbGQuXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7QmFzZUZpZWxkfVxyXG5cdCAqL1xyXG5cdGdldCBwYXJlbnRGaWVsZCgpIHtcclxuXHRcdGxldCBwYXJlbnQgPSBfcGFyZW50KHRoaXMpO1xyXG5cdFx0aWYgKCFwYXJlbnQpIHtcclxuXHRcdFx0cGFyZW50ID0gZmluZFBhcmVudEZpZWxkKHRoaXMpO1xyXG5cdFx0XHRfcGFyZW50KHRoaXMsIHBhcmVudCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgY2FsbGVkIGlmIHRoZSBjb25kaXRpb24gc3RhdGUgdXBkYXRlZC5cclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIGNvbmRpdGlvblVwZGF0ZWQoKSB7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBuYW1lIG9mIGZpZWxkLlxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfTkFNRSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyBmaWVsZCByZXF1aXJlZC5cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGdldCByZXF1aXJlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfUkVRVUlSRUQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFzIGZpZWxkIGEgdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRnZXQgaGFzVmFsdWUoKSB7XHJcblx0XHRyZXR1cm4gIXRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9OT1ZBTFVFKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBvciBzZXQgdGhlIHJhdyB2YWx1ZSB0byBmaWVsZC4gKG9ubHkgZm9yIGludGVybmFsIHVzZSlcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPnxQcm9taXNlPHZvaWQ+fVxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBhd2FpdCBmaWVsZC5yYXdWYWx1ZShcInZhbHVlXCIpIC8vIHNldCB0aGUgdmFsdWUgb2YgdG8gXCJ2YWx1ZVwiXHJcblx0ICogYXdhaXQgZmllbGQucmF3VmFsdWUoKSAvLyByZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIGZpZWxkXHJcblx0ICovXHJcblx0YXN5bmMgcmF3VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy4jdmFsdWU7XHJcblx0XHRlbHNlIHRoaXMuI3ZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgb3Igc2V0IHZhbHVlIHRvIGZpZWxkLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fFByb21pc2U8dm9pZD59XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIGF3YWl0IGZpZWxkLnZhbHVlKFwidmFsdWVcIikgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0byBcInZhbHVlXCJcclxuXHQgKiBhd2FpdCBmaWVsZC52YWx1ZSgpIC8vIHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgZmllbGRcclxuXHQgKi9cclxuXHRhc3luYyB2YWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3QgeyBjb25kaXRpb24sIHZhbGlkLCByZWFkeSB9ID0gdGhpcztcclxuXHRcdC8vY29uc29sZS5sb2coYCR7dGhpcy5ub2RlTmFtZX0oJHt0aGlzLm5hbWV9KS52YWx1ZTogYCwgYXJndW1lbnRzLCB7Y29uZGl0aW9uLCB2YWxpZH0pO1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gYXdhaXQgdGhpcy5yYXdWYWx1ZSgpO1xyXG5cclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApIHJldHVybiAhY29uZGl0aW9uIHx8ICF2YWxpZCA/IG51bGwgOiBjdXJyZW50VmFsdWU7XHJcblxyXG5cdFx0YXdhaXQgcmVhZHk7XHJcblx0XHRjb25zdCBhY2NlcHRlZCA9IGF3YWl0IHRoaXMuYWNjZXB0VmFsdWUodmFsdWUpO1xyXG5cdFx0aWYgKGFjY2VwdGVkKSB7XHJcblx0XHRcdHZhbHVlID0gKGF3YWl0IHRoaXMubm9ybWFsaXplVmFsdWUodmFsdWUpKSB8fCB2YWx1ZTtcclxuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSAhPSB2YWx1ZSkge1xyXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudXBkYXRlZFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSByZXN1bHQ7XHJcblxyXG5cdFx0XHRcdC8vYXdhaXQgdGhpcy5yYXdWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5wdWJsaXNoVmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSB0aGUgZmllbGQgYnkgZ2l2ZW4gZGF0YSBjb250ZXh0LlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGFcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuXHQgKi9cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcblx0XHRjb25zdCBjdXJyZW50Q29uZGl0aW9uID0gdGhpcy5jb25kaXRpb247XHJcblx0XHRjb25zdCBjdXJyZW50VmFsaWQgPSB0aGlzLnZhbGlkO1xyXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCBzdXBlci52YWxpZGF0ZShkYXRhKTtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG5cdFx0dGhpcy52YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKGN1cnJlbnRDb25kaXRpb24gIT0gY29uZGl0aW9uLCBjdXJyZW50VmFsaWQgIT0gdmFsaWQpO1xyXG5cclxuXHRcdHJldHVybiB2YWxpZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIGNhbGxlZCwgaWYgdGhlIHZhbGlkYXRpb24gc3RhdGUgaXMgY2hhbmdlZFxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBjb25kaXRpb25DaGFuZ2VcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbGlkYXRpb25DaGFuZ2VkXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgdmFsaWRhdGlvblN0YXRlQ2hhbmdlZChjb25kaXRpb25DaGFuZ2UsIHZhbGlkYXRpb25DaGFuZ2VkKSB7XHJcblx0XHRjb25zdCBoYXNDaGFuZ2UgPSBjb25kaXRpb25DaGFuZ2UgfHwgdmFsaWRhdGlvbkNoYW5nZWQ7XHJcblx0XHRpZiAoaGFzQ2hhbmdlKSB0aGlzLnB1Ymxpc2hWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXMgY2FsbGVkLCBpZiB0aGUgdmFsdWUgb2YgZmllbGQgaXMgdXBkYXRlZFxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1ZBTFVFX1VQREFURUQsIHZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHVibGlzaCB0aGUgdmFsdWUgdG8gdGhlIHBhcmVudCBmaWVsZCBvciB0byBmb3JtLiBJZiB0aGUgdmFsdWUgb2YgY3VzdG9tIGZpZWxkIGNoYW5nZWQsIGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIHRoZSBuZXcgdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0gez8qfSB2YWx1ZSAtIGRlZmF1bHQgaXMgdGhlIGN1cnJlbnQgdmFsdWUsIGlmIHZhbHVlIGF2YWlsYWJsZSwgdGhlbiB0aGUgdmFsdWUgd291bGQgYmUgc2V0IGFzIGN1cnJlbnQgdmFsdWVcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBwdWJsaXNoVmFsdWUodmFsdWUpIHtcclxuXHRcdC8vY29uc29sZS5sb2coYGNhbGwgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnB1Ymxpc2hWYWx1ZTpgLCB7YXJndW1lbnRzOiBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZX0pO1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB2YWx1ZSA9IGF3YWl0IHRoaXMucmF3VmFsdWUoKTtcclxuXHRcdGVsc2UgYXdhaXQgdGhpcy5yYXdWYWx1ZSh2YWx1ZSk7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIndvcmsgd2l0aCBWYWx1ZTpcIiwgdmFsdWUpXHJcblx0XHRjb25zdCBub1ZhbHVlID0gZGF0YUlzTm9WYWx1ZSh2YWx1ZSk7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdGNvbnN0IHJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZDtcclxuXHRcdHZhbHVlID0gKHJlcXVpcmVkICYmIG5vVmFsdWUpIHx8ICFjb25kaXRpb24gPyBudWxsIDogdmFsdWU7XHJcblxyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfSgke3RoaXMubmFtZX0pLnB1Ymxpc2hWYWx1ZTpgLCB7cmVxdWlyZWQsIGNvbmRpdGlvbiwgbm9WYWx1ZSwgdmFsdWV9KTtcclxuXHJcblx0XHR1cGRhdGVIYXNWYWx1ZSghbm9WYWx1ZSwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMucGFyZW50RmllbGQpIGF3YWl0IHRoaXMucGFyZW50RmllbGQuY2hpbGRWYWx1ZUNoYW5nZWQodGhpcywgdmFsdWUpO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5mb3JtKSBhd2FpdCB0aGlzLmZvcm0uY2hpbGRWYWx1ZUNoYW5nZWQodGhpcywgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaXMgY2FsbGVkIHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhY2NlcHRlZC4gQ2FuIGJlIG92ZXJyaWRlIVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGFzeW5jIGFjY2VwdFZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGlzIGNhbGxlZCB0byBub3JtYWxpemUgdmFsdWUgZm9yIGZpZWxkLlxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiB3b3VsZCBiZSBjYWxsZWQgYnkgY2hpbGQgZmllbGRzXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge0Jhc2VGaWVsZH0gZmllbGRcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgY2hpbGRWYWx1ZUNoYW5nZWQoZmllbGQsIHZhbHVlKSB7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VGaWVsZDtcclxuIiwiZXhwb3J0IGNvbnN0IEhUTUxfVEFHX1BSRUZJWCA9IFwiZC1cIjtcclxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfVElNRU9VVCA9IDEwO1xyXG5leHBvcnQgY29uc3QgRVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCA9IDEwICogRVZFTlRIQU5ETEVfVElNRU9VVDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GT1JNID0gYCR7SFRNTF9UQUdfUFJFRklYfWZvcm1gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfU1VCTUlUX0FDVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH1zdWJtaXQtYWN0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9cGFnZWA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9GSUVMRCA9IGAke0hUTUxfVEFHX1BSRUZJWH1maWVsZGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UQUlORVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udGFpbmVyYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUID0gYCR7SFRNTF9UQUdfUFJFRklYfWxpc3RgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfTElTVF9ST1dTPSBgJHtIVE1MX1RBR19QUkVGSVh9cm93c2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfXJvd2A7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9MSVNUX0FERF9ST1c9IGAke0hUTUxfVEFHX1BSRUZJWH1hZGQtcm93YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVz0gYCR7SFRNTF9UQUdfUFJFRklYfWRlbGV0ZS1yb3dgO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1BST0dFU1NCQVIgPSBgJHtIVE1MX1RBR19QUkVGSVh9cHJvZ3Jlc3MtYmFyYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX1NURVAgPSBgJHtIVE1MX1RBR19QUkVGSVh9c3RlcGA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfVkFMSURBVElPTiA9IGAke0hUTUxfVEFHX1BSRUZJWH12YWxpZGF0aW9uYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX01FU1NBR0UgPSBgJHtIVE1MX1RBR19QUkVGSVh9bWVzc2FnZWA7XHJcblxyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sYDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfQkFDSyA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWJhY2tgO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfQ09OVFJPTF9ORVhUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtbmV4dGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX0NBTkNFTCA9IGAke0hUTUxfVEFHX1BSRUZJWH1jb250cm9sLWNhbmNlbGA7XHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9DT05UUk9MX1NVTU1BUlkgPSBgJHtIVE1MX1RBR19QUkVGSVh9Y29udHJvbC1zdW1tYXJ5YDtcclxuZXhwb3J0IGNvbnN0IE5PREVOQU1FX0NPTlRST0xfU1VCTUlUID0gYCR7SFRNTF9UQUdfUFJFRklYfWNvbnRyb2wtc3VibWl0YDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX0lOSVQgPSBcImluaXRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9WQUxJREFUSU5HID0gXCJ2YWxpZGF0aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfSU5QVVQgPSBcImlucHV0XCI7XHJcbmV4cG9ydCBjb25zdCBGT1JNU1RBVEVfU1VNTUFSWSA9IFwic3VtbWFyeVwiO1xyXG5leHBvcnQgY29uc3QgRk9STVNUQVRFX1NVQk1JVFRJTkcgPSBcInN1Ym1pdHRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURV9GSU5JU0hFRCA9IFwiZmluaXNoZWRcIjtcclxuZXhwb3J0IGNvbnN0IEZPUk1TVEFURVMgPSB7XHJcblx0aW5pdDogRk9STVNUQVRFX0lOSVQsXHJcblx0dmFsaWRhdGluZzogRk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0aW5wdXQ6IEZPUk1TVEFURV9JTlBVVCxcclxuXHRzdW1tYXJ5OiBGT1JNU1RBVEVfU1VNTUFSWSxcclxuXHRzdWJtaXR0aW5nOiBGT1JNU1RBVEVfU1VCTUlUVElORyxcclxuXHRmaW5pc2hlZDogRk9STVNUQVRFX0ZJTklTSEVELFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEU1RBVEVTID0ge1xyXG5cdGFsd2F5czogXCJhbHdheXNcIixcclxuXHRvbkFjdGl2ZTogXCJvbi1hY3RpdmVcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QUkVGSVggPSBIVE1MX1RBR19QUkVGSVggKyBcImZvcm0tXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVElBTElaRSA9IGAke0VWRU5UX1BSRUZJWH1pbml0aWFsaXplYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfWluaXRpYWxpemVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUSUFMSVpFX1NVQk1JVF9BQ1RJT04gPSBgJHtFVkVOVF9JTklUSUFMSVpFfXN1Ym1pdC1hY3Rpb25gO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfU1VCTUlUID0gYCR7RVZFTlRfUFJFRklYfXN1Ym1pdGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TVUJNSVRfUkVTVUxUUyA9IGAke0VWRU5UX1BSRUZJWH1zdWJtaXQtcmVzdWx0c2A7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9FWEVDVVRFX1ZBTElEQVRFID0gYCR7RVZFTlRfUFJFRklYfWV4ZWN1dGUtdmFsaWRhdGVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfQ09ORElUSU9OX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9Y29uZGl0aW9uLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfQUxMX1BVQkxJU0hfVkFMVUUgPSBgJHtFVkVOVF9QUkVGSVh9YWxsLXB1Ymxpc2gtdmFsdWVgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMVUVfVVBEQVRFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC12YWx1ZS11cGRhdGVkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTFVFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZmllbGQtdmFsdWUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9TSVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9c2l0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0ZJRUxEX0lOUFVUID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLWlucHV0YDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0xJU1RfUk9XX0FERCA9IGAke0VWRU5UX1BSRUZJWH1saXN0LXJvdy1hZGRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTElTVF9ST1dfREVMRVRFID0gYCR7RVZFTlRfUFJFRklYfWxpc3Qtcm93LWRlbGV0ZWA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXByb2dyZXNzLWJhci1jaGFuZ2VkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCA9IGAke0VWRU5UX1BSRUZJWH1maWVsZC1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9GSUVMRF9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfWZpZWxkLXJlbW92ZWRgO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVWRU5UX1BBR0VfSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9QQUdFX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9cGFnZS1yZW1vdmVkYDtcclxuXHJcbi8vZXhwb3J0IGNvbnN0IEVWRU5UX1ZBTElEQVRJT05fSU5JVElBTElaRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWRhdGlvbi1pbml0aWFsaXplZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQgPSBgJHtFVkVOVF9QUkVGSVh9dmFsaWRhdGlvbi1yZW1vdmVkYDtcclxuXHJcbmV4cG9ydCBjb25zdCBFVkVOVF9NRVNTQUdFX0lOSVRJQUxJWkVEID0gYCR7RVZFTlRfUFJFRklYfW1lc3NhZ2UtaW5pdGlhbGl6ZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfTUVTU0FHRV9SRU1PVkVEID0gYCR7RVZFTlRfUFJFRklYfW1lc3NhZ2UtcmVtb3ZlZGA7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfQUNUSVZFX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9YWN0aXZlLXN0YXRlLWNoYW5nZWRgO1xyXG5leHBvcnQgY29uc3QgRVZFTlRfVkFMSURfU1RBVEVfQ0hBTkdFRCA9IGAke0VWRU5UX1BSRUZJWH12YWxpZC1zdGF0ZS1jaGFuZ2VkYDtcclxuZXhwb3J0IGNvbnN0IEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQgPSBgJHtFVkVOVF9QUkVGSVh9ZWRpdGFibGUtc3RhdGUtY2hhbmdlZGA7XHJcbmV4cG9ydCBjb25zdCBFVkVOVF9SRUFET05MWV9TVEFURV9DSEFOR0VEID0gYCR7RVZFTlRfUFJFRklYfXJlYWRvbmx5LXN0YXRlLWNoYW5nZWRgO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTUEVDSUFMVkFSUyA9IHtcclxuXHRDVVJSRU5UVkFMVUU6IFwiJHZhbHVlXCIsXHJcblx0Q1VSUkVOVExJU1RST1c6IFwiJGl0ZW1cIixcclxufTtcclxuXHJcbi8vQVRUUklCVVRFU1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05BTUUgPSBcIm5hbWVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5UID0gXCJjdXN0b20tc3VibWl0dGVkLWV2ZW50XCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9FTkRQT0lOVCA9IFwiZW5kcG9pbnRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX01FVEhPRCA9IFwibWV0aG9kXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfU1RBVEUgPSBcInN0YXRlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9TVEVQID0gXCJzdGVwXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSA9IFwidXNlLXN1bW1hcnktcGFnZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUID0gXCJpbnB1dC1tb2RlLWFmdGVyLXN1Ym1pdFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEID0gXCJyZXF1aXJlZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFUVVJUkVEX09OX0FDVElWRV9PTkxZID0gXCJyZXF1aXJlZC1vbi1hY3RpdmUtb25seVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQUNUSVZFID0gXCJhY3RpdmVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRSA9IFwiZWRpdGFibGVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04gPSBcImVkaXRhYmxlLWNvbmRpdGlvblwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1JFQURPTkxZID0gXCJyZWFkb25seVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX05PVkFMVUUgPSBcIm5vLXZhbHVlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMSUQgPSBcInZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfSU5WQUxJRCA9IFwiaW52YWxpZFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0VWQUxVQVRFID0gXCJldmFsdWF0ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCA9IFwiY29uZGl0aW9uLXZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQgPSBcImNvbmRpdGlvbi1pbnZhbGlkXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfTUlOID0gXCJtaW5cIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9NQVggPSBcIm1heFwiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiO1xyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0ZPUiA9IFwiZm9yXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfVkFMVUUgPSBcInZhbHVlXCI7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0NPTlRBSU5FUiwgXHJcblx0RVZFTlRfRklFTERfSU5JVElBTElaRUQsIFxyXG5cdEVWRU5UX0ZJRUxEX1JFTU9WRUQgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGVtdHB5T3JOb1ZhbHVlU3RyaW5nLCBub1ZhbHVlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ZhbHVlSGVscGVyXCI7XHJcbmltcG9ydCB7IGZpbmRGaWVsZHMgfSBmcm9tIFwiLi91dGlscy9Ob2RlSGVscGVyXCI7XHJcbmltcG9ydCBCYXNlRmllbGQsIHsgX3ZhbHVlIH0gZnJvbSBcIi4vQmFzZUZpZWxkXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IHZhbHVlSGVscGVyLCBmaWVsZFZhbHVlTWFwVG9PYmplY3QgfSBmcm9tIFwiLi91dGlscy9EYXRhSGVscGVyXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlRmllbGRzIH0gZnJvbSBcIi4vdXRpbHMvVmFsaWRhdGlvbkhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UQUlORVI7XHJcblx0fVxyXG5cclxuXHQjZmllbGRzID0gbnVsbDtcclxuXHQjdmFsdWUgPSBuZXcgTWFwKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMucm9vdDtcclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfSU5JVElBTElaRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0aWYgKGZpZWxkICE9IHRoaXMpIHtcclxuXHRcdFx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBCYXNlRmllbGQgJiYgKCF0aGlzLiNmaWVsZHMgfHwgIXRoaXMuI2ZpZWxkcy5oYXMoZmllbGQpKSlcclxuXHRcdFx0XHRcdHRoaXMuI2ZpZWxkcyA9IG51bGw7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJvb3Qub24oRVZFTlRfRklFTERfUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZWxkID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZiAoZmllbGQgIT0gdGhpcykge1xyXG5cdFx0XHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIEJhc2VGaWVsZCAmJiB0aGlzLiNmaWVsZHMgJiYgdGhpcy4jZmllbGRzLmhhcyhmaWVsZCkpXHJcblx0XHRcdFx0XHR0aGlzLiNmaWVsZHMuZGVsZXRlKGZpZWxkKTtcclxuXHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoeyBkYXRhIH0pID0+IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMuZmllbGRzKSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZmllbGRzKCkge1xyXG5cdFx0aWYoIXRoaXMuI2ZpZWxkcylcclxuXHRcdFx0dGhpcy4jZmllbGRzID0gbmV3IFNldChmaW5kRmllbGRzKHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiNmaWVsZHMpO1xyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0Y29uc3QgeyByZWFkb25seSwgZmllbGRzIH0gPSB0aGlzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcInJlYWRvbmx5VXBkYXRlZDpcIiwgeyByZWFkb25seSwgZmllbGRzIH0pXHJcblx0XHRpZiAoZmllbGRzKVxyXG5cdFx0XHRmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcclxuXHRcdFx0XHRmaWVsZC5yZWFkb25seSA9IHJlYWRvbmx5O1xyXG5cdFx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVkVmFsdWUodmFsdWUpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRjb25zdCBtYXAgPSB0aGlzLiN2YWx1ZTtcclxuXHRcdG1hcC5jbGVhcigpO1xyXG5cdFx0Y29uc3QgZmllbGRzID0gdGhpcy5maWVsZHM7XHJcblx0XHRpZiAoZmllbGRzKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKGZpZWxkcy5tYXAoYXN5bmMgKGZpZWxkKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGZpZWxkLm5hbWU7XHJcblx0XHRcdFx0Y29uc3QgZmllbGRWYWx1ZSA9IG5hbWUgPyB2YWx1ZUhlbHBlcih2YWx1ZSwgZmllbGQubmFtZSkgOiB2YWx1ZTtcclxuXHRcdFx0XHRpZighbm9WYWx1ZShmaWVsZFZhbHVlKSlcclxuXHRcdFx0XHRcdG1hcC5zZXQoZmllbGQsIGZpZWxkVmFsdWUpO1xyXG5cdFx0XHRcdGF3YWl0IGZpZWxkLnZhbHVlKGZpZWxkVmFsdWUpO1xyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUsIGZpZWxkcyk7XHJcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgJHt0aGlzLm5vZGVOYW1lfS5jaGlsZFZhbHVlQ2hhbmdlZCgke2ZpZWxkLm5hbWV9KTpgLCB7ZmllbGQsIHZhbHVlfSk7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1x0XHRcclxuXHRcdGNvbnN0IG1hcCA9IHRoaXMuI3ZhbHVlO1x0XHRcclxuXHRcdFxyXG5cdFx0aWYgKGZpZWxkKSB7XHJcblx0XHRcdGNvbnN0IGhhc0ZpZWxkID0gbWFwLmhhcyhmaWVsZCk7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IG1hcC5nZXQoZmllbGQpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKHtuYW1lOiBmaWVsZC5uYW1lLCBjdXJyZW50VmFsdWUsIHZhbHVlLCBoYXNGaWVsZH0pXHJcblxyXG5cdFx0XHRpZihoYXNGaWVsZCAmJiBjdXJyZW50VmFsdWUgPT0gdmFsdWUpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGBkZWxldGUgJHtmaWVsZC5uYW1lfWApO1xyXG5cdFx0XHRcdG1hcC5kZWxldGUoZmllbGQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYHNldCAke2ZpZWxkLm5hbWV9ID0gJHt2YWx1ZX1gKTtcclxuXHRcdFx0XHRtYXAuc2V0KGZpZWxkLCB2YWx1ZSk7XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KG1hcCwgdGhpcy5maWVsZHMpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcImRhdGE6IFwiLGRhdGEpO1xyXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLmxlbmd0aCA9PSAwKSBkYXRhID0gbnVsbDtcclxuXHRcdGF3YWl0IHRoaXMucHVibGlzaFZhbHVlKGRhdGEpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKENvbnRhaW5lcik7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcclxuIiwiaW1wb3J0IHsgXHJcblx0Rk9STVNUQVRFX0lOSVQsXHJcblx0Rk9STVNUQVRFX0lOUFVULFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9TVU1NQVJZLFxyXG5cdEZPUk1TVEFURV9GSU5JU0hFRCwgXHJcblx0Tk9ERU5BTUVfQ09OVFJPTCxcclxuXHROT0RFTkFNRV9DT05UUk9MX0JBQ0ssXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9ORVhULFxyXG5cdE5PREVOQU1FX0NPTlRST0xfQ0FOQ0VMLFxyXG5cdE5PREVOQU1FX0NPTlRST0xfU1VCTUlULCBcclxuXHROT0RFTkFNRV9GT1JNLFxyXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgXCIuL2NvbnRyb2xzXCI7XHJcblxyXG5cclxuY29uc3QgQlVUVE9ORFVNTVkgPSB7XHJcblx0YWN0aXZlOiBmYWxzZSxcclxuXHRkaXNhYmxlZDogZmFsc2UsXHJcbn07XHJcblxyXG5jbGFzcyBTdWJtaXRXcmFwcGVye1xyXG5cclxuXHQjc3VibWl0cztcclxuXHQjYWN0aXZlID0gZmFsc2U7XHJcblx0I2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8Rm9ybUJ1dHRvbj59IHRoZVN1Ym1pdHMgXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodGhlU3VibWl0cyl7XHJcblx0XHR0aGlzLiNzdWJtaXRzID0gdGhlU3VibWl0cztcclxuXHRcdHRoaXMuI3N1Ym1pdHMuZm9yRWFjaChidXR0b24gPT4ge1xyXG5cdFx0XHRidXR0b24uYWN0aXZlID0gdGhpcy4jYWN0aXZlO1xyXG5cdFx0XHRidXR0b24uZGlzYWJsZWQgPSB0aGlzLiNkaXNhYmxlZDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuI2FjdGl2ZTtcclxuXHR9XHJcblxyXG5cdHNldCBhY3RpdmUoYVZhbHVlKXtcclxuXHRcdHRoaXMuI2FjdGl2ZSA9IGFWYWx1ZVxyXG5cdFx0dGhpcy4jc3VibWl0cy5mb3JFYWNoKGJ1dHRvbiA9Plx0YnV0dG9uLmFjdGl2ZSA9IHRoaXMuI2FjdGl2ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZGlzYWJsZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLiNkaXNhYmxlZDtcclxuXHR9XHJcblxyXG5cdHNldCBkaXNhYmxlZChhVmFsdWUpe1xyXG5cdFx0dGhpcy4jZGlzYWJsZWQgPSBhVmFsdWVcclxuXHRcdHRoaXMuI3N1Ym1pdHMuZm9yRWFjaChidXR0b24gPT5cdGJ1dHRvbi5kaXNhYmxlZCA9IHRoaXMuI2Rpc2FibGVkKTtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQ29udHJvbCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTDtcclxuXHR9XHJcblxyXG5cdCNmb3JtO1xyXG5cdCNiYWNrO1xyXG5cdCNuZXh0O1xyXG5cdCNzdW1tYXJ5O1xyXG5cdCNzdWJtaXQ7XHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy4jZm9ybSA9IHRoaXMucGFyZW50KE5PREVOQU1FX0ZPUk0pO1xyXG5cdFx0XHR0aGlzLiNiYWNrID0gdGhpcy5maW5kKE5PREVOQU1FX0NPTlRST0xfQkFDSykuZmlyc3QoKSB8fCBCVVRUT05EVU1NWTtcclxuXHRcdFx0dGhpcy4jbmV4dCA9IHRoaXMuZmluZChOT0RFTkFNRV9DT05UUk9MX05FWFQpLmZpcnN0KCkgfHwgQlVUVE9ORFVNTVk7XHJcblx0XHRcdHRoaXMuI3N1bW1hcnkgPSB0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZKS5maXJzdCgpIHx8IEJVVFRPTkRVTU1ZO1xyXG5cdFx0XHR0aGlzLiNzdWJtaXQgPSBuZXcgU3VibWl0V3JhcHBlcih0aGlzLmZpbmQoTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQpIHx8IFtCVVRUT05EVU1NWV0pO1xyXG5cclxuXHRcdFx0dGhpcy4jZm9ybS5vbihbRVZFTlRfSU5JVElBTElaRUQsIEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCwgRVZFTlRfU0lURV9DSEFOR0VEXSwgKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0XHJcblxyXG5cdGFzeW5jIHVwZGF0ZSgpIHtcclxuXHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtO1xyXG5cdFx0Y29uc3Qgc3RhdGUgPSBmb3JtLnN0YXRlO1xyXG5cdFx0Y29uc3QgYmFjayA9IHRoaXMuI2JhY2s7XHJcblx0XHRjb25zdCBuZXh0ID0gdGhpcy4jbmV4dDtcclxuXHRcdGNvbnN0IHN1bW1hcnkgPSB0aGlzLiNzdW1tYXJ5O1xyXG5cdFx0Y29uc3Qgc3VibWl0ID0gdGhpcy4jc3VibWl0O1xyXG5cclxuXHRcdC8vIGJhc2ljIGNvbnRyb2wgc2V0dXBcclxuXHRcdGJhY2suYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0bmV4dC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdG5leHQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0c3VtbWFyeS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdHN1bW1hcnkuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0c3VibWl0LmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0c3VibWl0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblx0XHRpZihzdGF0ZSA9PSBGT1JNU1RBVEVfVkFMSURBVElORylcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IHsgYWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBuZXh0UGFnZSwgcGFnZXMsIHVzZVN1bW1hcnlQYWdlIH0gPSBmb3JtO1x0XHJcblx0XHRjb25zdCBoYXNOZXh0UGFnZSA9IChhd2FpdCBuZXh0UGFnZSkgIT0gbnVsbDtcclxuXHJcblx0XHRpZiAoc3RhdGUgPT0gRk9STVNUQVRFX0ZJTklTSEVEKSB7XHJcblx0XHRcdGJhY2suZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkpIHtcclxuXHRcdFx0YmFjay5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0c3VibWl0LmRpc2FibGVkID0gIWZvcm0udmFsaWQ7XHJcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRiYWNrLmRpc2FibGVkID0gYWN0aXZlUGFnZUluZGV4IDw9IDA7XHJcblxyXG5cdFx0XHRpZiAoaGFzTmV4dFBhZ2UgfHwgKCFhY3RpdmVQYWdlLnZhbGlkICYmIGFjdGl2ZVBhZ2VJbmRleCArIDEgPCBwYWdlcy5sZW5ndGgpKSB7XHJcblx0XHRcdFx0bmV4dC5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdG5leHQuZGlzYWJsZWQgPSBhY3RpdmVQYWdlID8gIWFjdGl2ZVBhZ2UudmFsaWQgOiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHVzZVN1bW1hcnlQYWdlICYmIHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRcdHN1bW1hcnkuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRzdW1tYXJ5LmRpc2FibGVkID0gYWN0aXZlUGFnZSA/ICFhY3RpdmVQYWdlLnZhbGlkIDogdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdWJtaXQuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRzdWJtaXQuZGlzYWJsZWQgPSAhZm9ybS52YWxpZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5kZWZpbmUoQ29udHJvbCk7XHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2w7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0ZJRUxELCBcclxuXHRFVkVOVF9GSUVMRF9JTlBVVCBcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IHsgZmluZFdyYXBwZXIgfSBmcm9tIFwiLi93cmFwcGVyXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW1wiZmlsZS1mb3JtYXRcIl07XHJcblxyXG5jbGFzcyBGaWVsZCBleHRlbmRzIEJhc2VGaWVsZCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQmFzZUZpZWxkLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0ZJRUxEO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I3dyYXBwZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5vbihFVkVOVF9GSUVMRF9JTlBVVCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0aGlzLnB1Ymxpc2hWYWx1ZShldmVudC5kZXRhaWwgfHwgbnVsbCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy4jd3JhcHBlciA9IGZpbmRXcmFwcGVyKHRoaXMpO1xyXG5cdFx0XHRpZiAodGhpcy4jd3JhcHBlcil7XHJcblx0XHRcdFx0dGhpcy5hZGRWYWxpZGF0aW9uKGFzeW5jICgpID0+IHRoaXMuI3dyYXBwZXIudmFsaWQpO1xyXG5cdFx0XHRcdHRoaXMucHVibGlzaFZhbHVlKHRoaXMuI3dyYXBwZXIudmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWFkb25seVVwZGF0ZWQoKSB7XHJcblx0XHRpZiAodGhpcy4jd3JhcHBlcikgdGhpcy4jd3JhcHBlci5yZWFkb25seSA9IHRoaXMucmVhZG9ubHk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3dyYXBwZXIgPyB0aGlzLiN3cmFwcGVyLmFjY2VwdFZhbHVlKHZhbHVlKSA6IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLiN3cmFwcGVyKSByZXR1cm4gdGhpcy4jd3JhcHBlci5ub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0dmFsdWUgPSBhd2FpdCB2YWx1ZTtcclxuXHRcdGNvbnN0IHdyYXBwZXIgPSB0aGlzLiN3cmFwcGVyO1xyXG5cdFx0aWYgKHdyYXBwZXIpe1xyXG5cdFx0XHRjb25zdCBjdXJyZW50ID0gd3JhcHBlci52YWx1ZSB8fCBudWxsO1xyXG5cdFx0XHRpZihjdXJyZW50ICE9IHZhbHVlKVxyXG5cdFx0XHRcdGF3YWl0IHdyYXBwZXIudXBkYXRlZFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0XHJcblx0XHRcdGF3YWl0IHN1cGVyLnVwZGF0ZWRWYWx1ZSh3cmFwcGVyLnZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY29uZGl0aW9uQ2hhbmdlLCB2YWxpZGF0aW9uQ2hhbmdlZCl7XHRcdFxyXG5cdFx0aWYoY29uZGl0aW9uQ2hhbmdlICYmIHRoaXMuY29uZGl0aW9uKXtcdFx0XHRcclxuXHRcdFx0Y29uc3Qgd3JhcHBlciA9IHRoaXMuI3dyYXBwZXI7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gd3JhcHBlci52YWx1ZSB8fCBudWxsO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGB2YWxpZGF0aW9uU3RhdGVDaGFuZ2VkKCR7dGhpcy5uYW1lfSAoJHtjb25kaXRpb25DaGFuZ2V9LCAke3ZhbGlkYXRpb25DaGFuZ2VkfSkgLT4gJHt2YWx1ZX1gKVxyXG5cdFx0XHR0aGlzLnJhd1ZhbHVlKHZhbHVlKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHN1cGVyLnZhbGlkYXRpb25TdGF0ZUNoYW5nZWQoY29uZGl0aW9uQ2hhbmdlLCB2YWxpZGF0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoRmllbGQpO1xyXG5leHBvcnQgZGVmYXVsdCBGaWVsZDtcclxuIiwiaW1wb3J0IHtcclxuXHQvKiogTm9kZW5hbWVzICovXHJcblx0Tk9ERU5BTUVfRk9STSxcclxuXHROT0RFTkFNRV9QQUdFLFxyXG5cdC8qKkV2ZW50cyAqL1xyXG5cdEVWRU5UX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX1BBR0VfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfUEFHRV9SRU1PVkVELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9TSVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfU1VCTUlULFxyXG5cdEVWRU5UX1NVQk1JVF9SRVNVTFRTLFxyXG5cdC8qKkF0dHJpYnV0ZSAqL1xyXG5cdEFUVFJJQlVURV9OQU1FLFxyXG5cdEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFLFxyXG5cdEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5ULFxyXG5cdEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX01FVEhPRCxcclxuXHRBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9FTkRQT0lOVCxcclxuXHRBVFRSSUJVVEVfU1RBVEUsXHJcblx0QVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlULFxyXG5cdC8qKkZvcm1zdGF0ZXMgKi9cclxuXHRGT1JNU1RBVEVfSU5QVVQsXHJcblx0Rk9STVNUQVRFX1NVTU1BUlksXHJcblx0Rk9STVNUQVRFX1ZBTElEQVRJTkcsXHJcblx0Rk9STVNUQVRFX0lOSVQsXHJcblx0Rk9STVNUQVRFX0ZJTklTSEVELFxyXG5cdEZPUk1TVEFURV9TVUJNSVRUSU5HLFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBcIi4vTWVzc2FnZVwiO1xyXG5pbXBvcnQgXCIuL01lc3NhZ2VcIjtcclxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4vUGFnZVwiO1xyXG5pbXBvcnQgXCIuL0NvbnRyb2xcIjtcclxuaW1wb3J0IFwiLi9Qcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgVmFsdWVIZWxwZXIsIHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5pbXBvcnQgQmFzZVN1Ym1pdEFjdGlvbiBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL0Jhc2VTdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGZyb20gXCIuL3N1Ym1pdEFjdGlvbnMvRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25cIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMIGFzIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgU1RBVEVfU1VDQ0VTUyBhcyBBQ1RJT05fU1VCTUlUX1NUQVRFX1NVQ0NFU1MgfSBmcm9tIFwiLi9zdWJtaXRBY3Rpb25zL1N1Ym1pdEFjdGlvblJlc3VsdFwiO1xyXG5pbXBvcnQgeyB2YWx1ZUhlbHBlciwgZmllbGRWYWx1ZU1hcFRvT2JqZWN0IH0gZnJvbSBcIi4vdXRpbHMvRGF0YUhlbHBlclwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFByb21pc2VVdGlscyB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9OQU1FLCBBVFRSSUJVVEVfVVNFX1NVTU1BUllfUEFHRSwgQVRUUklCVVRFX1NVQk1JVF9BQ1RJT05fX0NVU1RPTV9TVUJNSVRURURfRVZFTlQsIEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX0VORFBPSU5ULCBBVFRSSUJVVEVfU1VCTUlUX0FDVElPTl9fUkVRVUVTVF9NRVRIT0QsIEFUVFJJQlVURV9TVEFURSwgQVRUUklCVVRFX0lOUFVUX01PREVfQUZURVJfU1VCTUlUXTtcclxuXHJcbmNvbnN0IHJlYWRvbmx5ID0gKGZvcm0sIHJlYWRvbmx5KSA9PiB7XHJcblx0Zm9yIChsZXQgcGFnZSBvZiBmb3JtLnBhZ2VzKSB7XHJcblx0XHRwYWdlLnJlYWRvbmx5ID0gcmVhZG9ubHk7XHJcblx0XHRwYWdlLmFjdGl2ZSA9IHJlYWRvbmx5O1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGV4ZWN1dGVBY3Rpb25zID0gYXN5bmMgKGFjdGlvbnMsIGRhdGEsIGNvbnRleHQpID0+IHtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yIChsZXQgYWN0aW9uIG9mIGFjdGlvbnMpIHtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IGF3YWl0IGFjdGlvbi5hY2NlcHQoZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0KSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gKGF3YWl0IGFjdGlvbi5leGVjdXRlKGRhdGEsIGNvbnRleHQpKSB8fCBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KGFjdGlvbiwgQUNUSU9OX1NVQk1JVF9TVEFURV9TVUNDRVNTLCBudWxsLCBkYXRhLCBjb250ZXh0KTtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0XHRpZiAocmVzdWx0LnN0YXRlID09IEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCkgcmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdFx0aWYodHlwZW9mIHJlc3VsdC5kYXRhICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5kYXRhICE9IG51bGwpXHJcblx0XHRcdFx0XHRkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdFx0aWYodHlwZW9mIHJlc3VsdC5jb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5kYXRhICE9IGNvbnRleHQpXHJcblx0XHRcdFx0XHRkYXRhID0gcmVzdWx0LmRhdGE7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRyZXN1bHRzLnB1c2gobmV3IFN1Ym1pdEFjdGlvblJlc3VsdChhY3Rpb24sIEFDVElPTl9TVUJNSVRfU1RBVEVfRkFJTCwgZSkpO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGZvcm0gY2xhc3NcclxuICpcclxuICogQGNsYXNzIEZvcm1cclxuICogQHR5cGVkZWYge0Zvcm19XHJcbiAqIEBleHRlbmRzIHtDb21wb25lbnR9XHJcbiAqL1xyXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9GT1JNO1xyXG5cdH1cclxuXHJcblx0I2luaXRpYWxpemVkID0gZmFsc2U7XHJcblx0I3N0YXRlID0gRk9STVNUQVRFX0lOSVQ7XHJcblx0I3BhZ2VzO1xyXG5cdCN2YWx1ZSA9IG5ldyBNYXAoKTtcclxuXHQjZGF0YSA9IHt9O1xyXG5cdCN2YWxpZGF0aW9uID0gbnVsbDtcclxuXHQjc3VibWl0QWN0aW9ucyA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRm9ybS5cclxuXHQgKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLnJvb3Q7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9QQUdFX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX1BBR0VfUkVNT1ZFRCwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IHBhZ2UgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdHRoaXMuI3BhZ2VzID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jaGlsZFZhbHVlQ2hhbmdlZChwYWdlLCBudWxsKTtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZWFkeS50aGVuKCgpID0+IHRoaXMudHJpZ2dlcihFVkVOVF9JTklUSUFMSVpFRCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaW5pdCBmb3JtIGNvbXBvbmVudFxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcblx0ICovXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpIHtcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmFjdGl2ZVBhZ2VJbmRleCA9IC0xO1xyXG5cclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTklUO1xyXG5cclxuXHRcdFx0dGhpcy51c2VTdW1tYXJ5UGFnZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9VU0VfU1VNTUFSWV9QQUdFKTtcclxuXHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZUluZGV4ID0gLTE7XHJcblx0XHRcdGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA+IDApIHRoaXMudG9OZXh0UGFnZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IHBhZ2VzIG9mIGZvcm1cclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQYWdlW119XHJcblx0ICovXHJcblx0Z2V0IHBhZ2VzKCkge1xyXG5cdFx0aWYgKCF0aGlzLiNwYWdlcykgdGhpcy4jcGFnZXMgPSBBcnJheS5mcm9tKHRoaXMucm9vdC5maW5kKE5PREVOQU1FX1BBR0UpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jcGFnZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBmb3JtIHN0YXRlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBzdGF0ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNzdGF0ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGZvcm0gc3RhdGVcclxuXHQgKi9cclxuXHRzZXQgc3RhdGUoc3RhdGUpIHtcclxuXHRcdGNvbnN0IGFjdHVhbCA9IHRoaXMuI3N0YXRlO1xyXG5cdFx0aWYgKHN0YXRlICE9IEZPUk1TVEFURV9WQUxJREFUSU5HKSB7XHJcblx0XHRcdGlmIChhY3R1YWwgPT0gRk9STVNUQVRFX0lOUFVUICYmIHN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkgcmVhZG9ubHkodGhpcywgdHJ1ZSk7XHJcblx0XHRcdGVsc2UgaWYgKGFjdHVhbCAhPSBGT1JNU1RBVEVfSU5QVVQgJiYgc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdFx0cmVhZG9ubHkodGhpcywgZmFsc2UpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmFjdGl2ZVBhZ2UpIHRoaXMuYWN0aXZlUGFnZS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLiNzdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdGlmIChhY3R1YWwgIT0gc3RhdGUpIHRoaXMudHJpZ2dlcihFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9TVEFURSwgc3RhdGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogaXMgZm9ybSB2YWxpZFxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0Zm9yIChsZXQgcGFnZSBvZiB0aGlzLnBhZ2VzKSBpZiAocGFnZS5jb25kaXRpb24gJiYgIXBhZ2UudmFsaWQpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBvciBzZXQgdmFsdWUgb2YgZm9ybVxyXG5cdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHs/b2JqZWN0fSBkYXRhIC0gZm9ybSBkYXRhXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0PnxQcm9taXNlPHZvaWQ+fVxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBhd2FpdCBmb3JtLnZhbHVlKCkgLy8gcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiBmb3JtXHJcblx0ICogYXdhaXQgZm9ybS52YWx1ZSh7dGVzdDpcInZhbHVlXCJ9KSAvLyBzZXQgdmFsdWUgdG8gZm9ybVxyXG5cdCAqXHJcblx0ICovXHJcblx0YXN5bmMgdmFsdWUoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uKSBhd2FpdCB0aGlzLiN2YWxpZGF0aW9uO1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkgcmV0dXJuIHRoaXMuI2RhdGE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUgPT0gRk9STVNUQVRFX0lOUFVUKSB7XHJcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKFxyXG5cdFx0XHRcdHRoaXMucGFnZXMubWFwKChwYWdlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gcGFnZS5uYW1lO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5hbWUgPyBwYWdlLnZhbHVlKHZhbHVlSGVscGVyKGRhdGEsIG5hbWUpKSA6IHBhZ2UudmFsdWUoZGF0YSk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgaGFuZGxlID0gKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMucmVtb3ZlT24oaGFuZGxlLCBFVkVOVF9GT1JNX1NUQVRFX0NIQU5HRUQpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLnZhbHVlKGRhdGEpKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMub24oRVZFTlRfRk9STV9TVEFURV9DSEFOR0VELCBoYW5kbGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBjdXJyZW50IGFjdGl2ZSBwYWdlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UGFnZX1cclxuXHQgKi9cclxuXHRnZXQgYWN0aXZlUGFnZSgpIHtcclxuXHRcdGlmICgwIDw9IHRoaXMuYWN0aXZlUGFnZUluZGV4ICYmIHRoaXMuYWN0aXZlUGFnZUluZGV4IDwgdGhpcy5wYWdlcy5sZW5ndGgpIHJldHVybiB0aGlzLnBhZ2VzW3RoaXMuYWN0aXZlUGFnZUluZGV4XTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldCBjdXJyZW50IGFjdGl2ZSBwYWdlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UGFnZX1cclxuXHQgKi9cclxuXHRzZXQgYWN0aXZlUGFnZShwYWdlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5hY3RpdmVQYWdlO1xyXG5cdFx0aWYgKHBhZ2UgIT0gY3VycmVudCB8fCB0aGlzLnN0YXRlICE9IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRpZiAoY3VycmVudCkgY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hY3RpdmVQYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XHJcblx0XHRcdHBhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUgIT0gRk9STVNUQVRFX0lOUFVUKSB0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NJVEVfQ0hBTkdFRCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBmaXJzdCB2YWxpZCBwcmV2aW91cyBwYWdlIG9mIGN1cnJlbnQgYWN0aXZlIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQYWdlfVxyXG5cdCAqL1xyXG5cdGdldCBwcmV2UGFnZSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBwYWdlcyA9IHRoaXMucGFnZXM7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5hY3RpdmVQYWdlSW5kZXggLSAxO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0Y29uc3QgcGFnZSA9IHBhZ2VzW2ldO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRlKHBhZ2UpO1xyXG5cdFx0XHRcdGlmIChwYWdlLmNvbmRpdGlvbikgcmV0dXJuIHBhZ2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBuZXh0IHZhbGlkIHBhZ2Ugb2YgY3VycmVudCBhY3RpdmUgcGFnZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge1BhZ2V9XHJcblx0ICovXHJcblx0Z2V0IG5leHRQYWdlKCkge1xyXG5cdFx0cmV0dXJuIChhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHBhZ2VzID0gdGhpcy5wYWdlcztcclxuXHRcdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZVBhZ2VJbmRleCArIDE7XHJcblx0XHRcdGlmIChwYWdlcykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRjb25zdCBwYWdlID0gcGFnZXNbaV07XHJcblx0XHRcdFx0XHRhd2FpdCBwYWdlLnZhbGlkYXRlKHRoaXMuI2RhdGEpO1xyXG5cdFx0XHRcdFx0aWYgKHBhZ2UuY29uZGl0aW9uKSByZXR1cm4gcGFnZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogY2hhbmdlIGFjdGl2ZSBwYWdlIHRvIGZpcnN0IHZhbGlkIHByZXZpb3VzIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHRvUHJldlBhZ2UoKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZSAhPSBGT1JNU1RBVEVfSU5QVVQpIHtcclxuXHRcdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9JTlBVVDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHByZXYgPSBhd2FpdCB0aGlzLnByZXZQYWdlO1xyXG5cdFx0XHRpZiAocHJldikgdGhpcy5hY3RpdmVQYWdlID0gcHJldjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGNoYW5nZSBhY3RpdmUgcGFnZSB0byBuZXh0IHZhaWxkIHBhZ2VcclxuXHQgKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHRvTmV4dFBhZ2UoKSB7XHJcblx0XHRjb25zdCBuZXh0ID0gYXdhaXQgdGhpcy5uZXh0UGFnZTtcclxuXHRcdGlmIChuZXh0KSB7XHJcblx0XHRcdHRoaXMuYWN0aXZlUGFnZSA9IG5leHQ7XHJcblx0XHRcdHRoaXMuc3RhdGUgPSBGT1JNU1RBVEVfSU5QVVQ7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMudXNlU3VtbWFyeVBhZ2UpIHtcclxuXHRcdFx0dGhpcy5zdW1tYXJ5KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3dpdGNoIGZvcm0gaW50byBzdW1tYXJ5IHN0YXRlXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBzdW1tYXJ5KCkge1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9TVU1NQVJZO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGFsbCBmb3JtIHN1Ym1pdCBhY3Rpb25zXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7RGVmYXVsdEZvcm1TdWJtaXRBY3Rpb25bXX1cclxuXHQgKi9cclxuXHRnZXQgc3VibWl0QWN0aW9ucygpIHtcclxuXHRcdGlmICghdGhpcy4jc3VibWl0QWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW107XHJcblx0XHRcdGNvbnN0IGVuZHBvaW50ID0gdGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX0VORFBPSU5UKTtcclxuXHRcdFx0aWYgKGVuZHBvaW50KSB7XHJcblx0XHRcdFx0Y29uc3QgbWV0aG9kID0gdGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19SRVFVRVNUX01FVEhPRCkgfHwgXCJwb3N0XCI7XHJcblx0XHRcdFx0dGhpcy5hcHBlbmQobmV3IERlZmF1bHRGb3JtU3VibWl0QWN0aW9uKGVuZHBvaW50LCBtZXRob2QpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5jaGlsZHJlbjtcclxuXHRcdFx0Zm9yIChsZXQgY2hpbGQgb2YgY2hpbGRzKSB7XHJcblx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQmFzZVN1Ym1pdEFjdGlvbikgYWN0aW9ucy5wdXNoKGNoaWxkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiNzdWJtaXRBY3Rpb25zID0gYWN0aW9ucztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jc3VibWl0QWN0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN1Ym1pdCBmb3JtXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuXHQgKi9cclxuXHRhc3luYyBzdWJtaXQoeyBkYXRhID0gbnVsbCwgYWN0aW9ucyA9IFtdLCBjb250ZXh0ID0ge30gfSA9IHt9KSB7XHJcblx0XHRjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IEZPUk1TVEFURV9TVUJNSVRUSU5HO1xyXG5cdFx0bGV0IGZvcm1kYXRhID0gYXdhaXQgdGhpcy52YWx1ZSgpO1xyXG5cdFx0Y29uc3QgdmFsaWQgPSBhd2FpdCB2YWxpZGF0ZUZpZWxkcyhmb3JtZGF0YSwgdGhpcy5wYWdlcyk7XHJcblx0XHRpZiAoIXZhbGlkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKGRhdGEpIGZvcm1kYXRhID0gT2JqZWN0VXRpbHMubWVyZ2UoZm9ybWRhdGEsIGRhdGEpO1xyXG5cclxuXHRcdGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdCh0aGlzLnN1Ym1pdEFjdGlvbnMpO1xyXG5cdFx0aWYgKGFjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IGF3YWl0IGV4ZWN1dGVBY3Rpb25zKGFjdGlvbnMsIGZvcm1kYXRhKTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1NVQk1JVF9SRVNVTFRTLCByZXN1bHRzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfU1VCTUlULCBmb3JtZGF0YSk7XHJcblxyXG5cdFx0Y29uc3QgY3VzdG9tU3VibWl0dGVkRXZlbnQgPSAodGhpcy5hdHRyKEFUVFJJQlVURV9TVUJNSVRfQUNUSU9OX19DVVNUT01fU1VCTUlUVEVEX0VWRU5UKSB8fCBcIlwiKS50cmltKCk7XHJcblx0XHRpZiAoY3VzdG9tU3VibWl0dGVkRXZlbnQubGVuZ3RoID4gMCkgdGhpcy50cmlnZ2VyKGN1c3RvbVN1Ym1pdHRlZEV2ZW50LCBmb3JtZGF0YSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZSA9IHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9JTlBVVF9NT0RFX0FGVEVSX1NVQk1JVCkgPyBjdXJyZW50U3RhdGUgOiBGT1JNU1RBVEVfRklOSVNIRUQ7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZSgpIHtcclxuXHRcdGF3YWl0IHRoaXMuI3ZhbGlkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjdmFsaWRhdGUocGFnZSkge1xyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IFByb21pc2VVdGlscy5sYXp5UHJvbWlzZSgpO1xyXG5cdFx0Y29uc3QgYWN0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBkYXRhID0gdGhpcy4jZGF0YTsgLy9hd2FpdCBmaWVsZFZhbHVlTWFwVG9PYmplY3QodGhpcy4jdmFsdWUpO1xyXG5cclxuXHRcdFx0Y29uc3QgdmFsaWQgPSBwYWdlID8gYXdhaXQgcGFnZS52YWxpZGF0ZShkYXRhKSA6IGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucGFnZXMpO1xyXG5cclxuXHRcdFx0cHJvbWlzZS5yZXNvbHZlKHZhbGlkKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uID09IHByb21pc2UpIHtcclxuXHRcdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX0lOUFVUO1xyXG5cdFx0XHRcdHRoaXMuI3ZhbGlkYXRpb24gPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLiN2YWxpZGF0aW9uID09IG51bGwpIHtcclxuXHRcdFx0c2V0VGltZW91dChhY3Rpb24sIDEpO1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gRk9STVNUQVRFX1ZBTElEQVRJTkc7XHJcblx0XHR9IGVsc2UgdGhpcy4jdmFsaWRhdGlvbi50aGVuKGFjdGlvbik7XHJcblxyXG5cdFx0dGhpcy4jdmFsaWRhdGlvbiA9IHByb21pc2U7XHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNoaWxkVmFsdWVDaGFuZ2VkKGZpZWxkLCB2YWx1ZSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHRcdHZhbHVlID0gYXdhaXQgdmFsdWU7XHJcblx0XHRjb25zdCBtYXAgPSB0aGlzLiN2YWx1ZTtcclxuXHRcdC8vY29uc29sZS5sb2coYGZvcm0uY2hpbGRWYWx1ZUNoYW5nZWQoJHtmaWVsZC5uYW1lfSlgLCB7IGZpZWxkLCB2YWx1ZSB9KTtcclxuXHRcdGlmIChmaWVsZCkge1xyXG5cdFx0XHRpZiAobm9WYWx1ZSh2YWx1ZSkpIG1hcC5kZWxldGUoZmllbGQpO1xyXG5cdFx0XHRlbHNlIG1hcC5zZXQoZmllbGQsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiNkYXRhID0gYXdhaXQgZmllbGRWYWx1ZU1hcFRvT2JqZWN0KHRoaXMuI3ZhbHVlLCB0aGlzLnBhZ2VzKTtcclxuXHJcblx0XHRjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5hY3RpdmVQYWdlO1xyXG5cdFx0aWYgKGFjdGl2ZVBhZ2UpIGF3YWl0IHRoaXMuI3ZhbGlkYXRlKGFjdGl2ZVBhZ2UpO1xyXG5cdFx0ZWxzZSBhd2FpdCB0aGlzLiN2YWxpZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoRm9ybSk7XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm07XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0ZPUk0sIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9ESVNBQkxFRCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfRElTQUJMRURdO1xyXG5cclxuLyoqXHJcbiAqIGJhc2ljIGZvcm0gYnV0dG9uIGNsYXNzXHJcbiAqIEBkYXRlIDMvMTMvMjAyNCAtIDEyOjE4OjI3IEFNXHJcbiAqXHJcbiAqIEBjbGFzcyBGb3JtQnV0dG9uXHJcbiAqIEB0eXBlZGVmIHtGb3JtQnV0dG9ufVxyXG4gKiBAZXh0ZW5kcyB7Q29tcG9uZW50fVxyXG4gKi9cclxuY2xhc3MgRm9ybUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNmb3JtO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHRcclxuXHJcblx0XHR0aGlzLm9uKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLmRpc2FibGVkKSB0aGlzLmV4ZWN1dGUoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdHRoaXMuYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmF0dHIoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKHRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGZvcm0oKSB7XHJcblx0XHRpZiAoIXRoaXMuI2Zvcm0pXHJcblx0XHRcdHRoaXMuI2Zvcm0gPSB0aGlzLnBhcmVudChOT0RFTkFNRV9GT1JNKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jZm9ybTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0dGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIGFjdGl2ZSA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGdldCBkaXNhYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfRElTQUJMRUQpO1xyXG5cdH1cclxuXHJcblx0c2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX0RJU0FCTEVELCBkaXNhYmxlZCA/IFwiXCIgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcImV4ZWN1dGVcIik7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm1CdXR0b247XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0xJU1QsIE5PREVOQU1FX0xJU1RfUk9XUywgTk9ERU5BTUVfTElTVF9ST1csIE5PREVOQU1FX0xJU1RfQUREX1JPVywgTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XLCBFVkVOVF9GSUVMRF9JTklUSUFMSVpFRCwgRVZFTlRfTElTVF9ST1dfQURELCBFVkVOVF9MSVNUX1JPV19ERUxFVEUsIEFUVFJJQlVURV9NSU4sIEFUVFJJQlVURV9NQVggfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL3V0aWxzL05vZGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEJhc2VGaWVsZCwgeyBfdmFsdWUgfSBmcm9tIFwiLi9CYXNlRmllbGRcIjtcclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9saXN0L1Jvd1wiO1xyXG5pbXBvcnQgQWRkUm93LCB7RVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPV30gZnJvbSBcIi4vbGlzdC9BZGRSb3dcIjtcclxuaW1wb3J0IFwiLi9saXN0L0RlbGV0ZVJvd1wiO1xyXG5pbXBvcnQgXCIuL2xpc3QvUm93c1wiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUZpZWxkcyB9IGZyb20gXCIuL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfTUlOLCBBVFRSSUJVVEVfTUFYXTtcclxuXHJcbmNvbnN0IGJ1aWxkRGF0YSA9IGFzeW5jIChyb3dzLCB2YWx1ZXMpID0+IHtcclxuXHRsZXQgZGF0YSA9IFtdO1xyXG5cdGZvciAobGV0IHJvdyBvZiByb3dzKSBkYXRhLnB1c2godmFsdWVzLmdldChyb3cpKTtcclxuXHJcblx0aWYgKGRhdGEubGVuZ3RoID09IDApIGRhdGEgPSBudWxsO1xyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNsYXNzIExpc3QgZXh0ZW5kcyBCYXNlRmllbGQge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KEJhc2VGaWVsZC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUO1xyXG5cdH1cclxuXHJcblx0I3RlbXBsYXRlO1xyXG5cdCNjb250YWluZXI7XHJcblx0I3ZhbHVlcyA9IG5ldyBNYXAoKTtcclxuXHQjYWRkUm93QnV0dG9uO1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHJcblx0XHRjb25zdCByb290ID0gdGhpcy5yb290O1xyXG5cdFx0cm9vdC5vbihFVkVOVF9fSU5JVElBTElaRURfX0JVVFRPTl9fQUREUk9XLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0dGhpcy4jYWRkUm93QnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX0ZJRUxEX0lOSVRJQUxJWkVELCAoZXZlbnQpID0+IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0XHRpZih0YXJnZXQgIT0gdGhpcyl7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cm9vdC5vbihFVkVOVF9MSVNUX1JPV19BREQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdGNvbnN0IHsgcmVhZG9ubHkgfSA9IHRoaXM7XHJcblx0XHRcdGlmICghcmVhZG9ubHkpIHRoaXMuY3JlYXRlUm93KCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyb290Lm9uKEVWRU5UX0xJU1RfUk9XX0RFTEVURSwgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0Y29uc3QgeyByb3dzLCByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdFx0aWYgKCFyZWFkb25seSkge1xyXG5cdFx0XHRcdGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldC5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XHJcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRcdHJvdy5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkVmFsaWRhdGlvbihhc3luYyAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHsgcm93cywgbWluLCBtYXgsIHJlYWRvbmx5IH0gPSB0aGlzO1xyXG5cdFx0XHRjb25zdCBsZW5ndGggPSByb3dzLmxlbmd0aDtcclxuXHRcdFx0aWYgKHRoaXMuI2FkZFJvd0J1dHRvbiAmJiAhcmVhZG9ubHkpIHtcclxuXHRcdFx0XHRpZiAobGVuZ3RoID09IG1heCkgdGhpcy4jYWRkUm93QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRlbHNlIGlmIChsZW5ndGggPCBtYXgpIHRoaXMuI2FkZFJvd0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtaW4gPD0gbGVuZ3RoICYmIGxlbmd0aCA8PSBtYXg7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFZhbGlkYXRpb24oYXN5bmMgKGRhdGEpID0+IHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IHZhbGlkYXRlRmllbGRzKGRhdGEsIHRoaXMucm93cyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHRcdFx0XHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdFx0Y29uc3Qgcm93VGVtcGxhdGUgPSB0aGlzLmZpbmQoXCJ0ZW1wbGF0ZVwiKS5maXJzdCgpO1xyXG5cdFx0XHRpZihyb3dUZW1wbGF0ZSlcclxuXHRcdFx0XHR0aGlzLiN0ZW1wbGF0ZSA9IHJvd1RlbXBsYXRlLmNvbnRlbnQ7XHJcblxyXG5cdFx0XHR0aGlzLiNjb250YWluZXIgPSB0aGlzLmZpbmQoTk9ERU5BTUVfTElTVF9ST1dTKS5maXJzdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVhZG9ubHlVcGRhdGVkKCkge1xyXG5cdFx0Y29uc3QgeyByZWFkb25seSB9ID0gdGhpcztcclxuXHRcdGZvciAobGV0IHJvdyBvZiB0aGlzLnJvd3MpIHtcclxuXHRcdFx0cm93LnJlYWRvbmx5ID0gcmVhZG9ubHk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcm93cygpIHtcclxuXHRcdGlmKHRoaXMuI2NvbnRhaW5lcilcclxuXHRcdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jY29udGFpbmVyLmNoaWxkcmVuKTtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdGdldCBtaW4oKSB7XHJcblx0XHRpZiAodGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX01JTikpIHJldHVybiBNYXRoLm1heCgwLCBwYXJzZUludCh0aGlzLmF0dHIoQVRUUklCVVRFX01JTikpKTtcclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0Z2V0IG1heCgpIHtcclxuXHRcdGlmICh0aGlzLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfTUFYKSkgcmV0dXJuIHBhcnNlSW50KHRoaXMuYXR0cihBVFRSSUJVVEVfTUFYKSk7XHJcblx0XHRyZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuICF2YWx1ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZSA/IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gISFpdGVtKSA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGVSb3codmFsdWUpIHtcclxuXHRcdGNvbnN0IHJvdyA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy4jdGVtcGxhdGUsIHRydWUpLmNoaWxkcmVuWzBdO1xyXG5cdFx0YXdhaXQgdGhpcy4jY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkgYXdhaXQgcm93LnZhbHVlKHZhbHVlKTtcclxuXHJcblx0XHRyZXR1cm4gcm93O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlcykge1xyXG5cdFx0dGhpcy4jdmFsdWVzLmNsZWFyKCk7XHJcblx0XHR0aGlzLiNjb250YWluZXIuZW1wdHkoKTtcclxuXHRcdGlmICh2YWx1ZXMpIGF3YWl0IFByb21pc2UuYWxsKHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy5jcmVhdGVSb3codmFsdWUpKSk7XHJcblxyXG5cdFx0cmV0dXJuIGF3YWl0IGJ1aWxkRGF0YSh0aGlzLnJvd3MsIHRoaXMuI3ZhbHVlcyk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjaGlsZFZhbHVlQ2hhbmdlZChyb3csIHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IGF3YWl0IHZhbHVlO1xyXG5cdFx0Y29uc3QgdmFsdWVzID0gdGhpcy4jdmFsdWVzO1xyXG5cclxuXHRcdGlmIChub1ZhbHVlKHZhbHVlKSkgdGhpcy4jdmFsdWVzLmRlbGV0ZShyb3cpO1xyXG5cdFx0ZWxzZSB0aGlzLiN2YWx1ZXMuc2V0KHJvdywgdmFsdWUpO1xyXG5cclxuXHRcdGF3YWl0IHN1cGVyLmNoaWxkVmFsdWVDaGFuZ2VkKHJvdywgdmFsdWUpO1xyXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGJ1aWxkRGF0YSh0aGlzLnJvd3MsIHZhbHVlcyk7XHJcblx0XHRhd2FpdCB0aGlzLnB1Ymxpc2hWYWx1ZShkYXRhKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShMaXN0KTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdDtcclxuIiwiaW1wb3J0IHtFeHByZXNzaW9uUmVzb2x2ZXJ9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBcclxuXHROT0RFTkFNRV9NRVNTQUdFLFxyXG5cdEVWRU5UX01FU1NBR0VfSU5JVElBTElaRUQsXHJcblx0RVZFTlRfTUVTU0FHRV9SRU1PVkVEXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0FDVElWRSA9IFwiYWN0aXZlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVfQ09ORElUSU9OID0gXCJjb25kaXRpb25cIjtcclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OXTtcclxuXHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTUVTU0FHRTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCl7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTUVTU0FHRV9SRU1PVkVEKTtcclxuXHRcdGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XHJcblx0XHRhY3RpdmUgPyB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX0FDVElWRSwgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGRhdGEpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHR0aGlzLmFjdGl2ZSA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKHRoaXMuY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblx0fVxyXG59XHJcbmRlZmluZShNZXNzYWdlKTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfUEFHRSwgIFxyXG5cdEFUVFJJQlVURV9TVEVQLCBcclxuXHRFVkVOVF9QQUdFX0lOSVRJQUxJWkVELFxyXG5cdEVWRU5UX1BBR0VfUkVNT1ZFRFxyXG59IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL0NvbnRhaW5lclwiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSSUJVVEVfU1RFUF07XHJcblxyXG4vKipcclxuICogcGFnZSBjbGFzc1xyXG4gKlxyXG4gKiBAY2xhc3MgUGFnZVxyXG4gKiBAdHlwZWRlZiB7UGFnZX1cclxuICogQGV4dGVuZHMge0NvbnRhaW5lcn1cclxuICovXHJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb250YWluZXIge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVMuY29uY2F0KENvbnRhaW5lci5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9QQUdFO1xyXG5cdH1cclxuXHRcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMucmVhZHkudGhlbigoKSA9PiB0aGlzLnRyaWdnZXIoRVZFTlRfUEFHRV9JTklUSUFMSVpFRCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVzdHJveSgpe1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1BBR0VfUkVNT1ZFRCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHRnZXQgc3RlcCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfU1RFUCk7XHJcblx0fVxyXG5cdFxyXG5cdGNvbmRpdGlvblVwZGF0ZWQoKXt9XHJcbn1cclxuZGVmaW5lKFBhZ2UpO1xyXG5leHBvcnQgZGVmYXVsdCBQYWdlO1xyXG4iLCJpbXBvcnQgeyBcclxuXHROT0RFTkFNRV9GT1JNLCBcclxuXHROT0RFTkFNRV9QUk9HRVNTQkFSLFxyXG5cdE5PREVOQU1FX1NURVAsXHJcblx0RVZFTlRfU0lURV9DSEFOR0VELFxyXG5cdEVWRU5UX0ZPUk1fU1RBVEVfQ0hBTkdFRCxcclxuXHRFVkVOVF9QUk9HUkVTU0JBUl9DSEFOR0VELFxyXG5cdEZPUk1TVEFURV9JTklULFxyXG5cdEZPUk1TVEFURV9WQUxJREFUSU5HLFxyXG5cdEZPUk1TVEFURV9JTlBVVCxcclxuXHRGT1JNU1RBVEVfU1VNTUFSWSxcclxuXHRGT1JNU1RBVEVfRklOSVNIRUQsIFxyXG5cdEFUVFJJQlVURV9QUk9HUkVTUyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQge0NvbXBvbmVudCAsZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IFwiLi9TdGVwXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9QUk9HUkVTU107XHJcblxyXG5jb25zdCBmaXJzdFN0ZXBQYWdlSW5kZXggPSAocGFnZXMsIHN0ZXAsIGFjdGl2ZVBhZ2UpID0+IHtcclxuXHRmb3IgKGxldCBwYWdlIG9mIHBhZ2VzKSB7XHJcblx0XHRpZiAocGFnZS5zdGVwID09IHN0ZXAgJiYgcGFnZS5jb25kaXRpb24pIHJldHVybiBwYWdlO1xyXG5cdFx0ZWxzZSBpZiAocGFnZSA9PSBhY3RpdmVQYWdlKSByZXR1cm47XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9QUk9HRVNTQkFSO1xyXG5cdH1cclxuXHJcblx0I2Zvcm07XHJcblx0I3N0ZXBzO1xyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuI2Zvcm0pIHJldHVybjtcclxuXHRcdFx0aWYgKHRhcmdldCA9PSB0aGlzKSByZXR1cm47XHRcdFx0XHJcblx0XHRcdGNvbnN0IHN0ZXAgPSB0YXJnZXQuaXMoTk9ERU5BTUVfU1RFUCkgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50KE5PREVOQU1FX1NURVApO1xyXG5cdFx0XHRjb25zdCBmb3JtID0gdGhpcy4jZm9ybTtcclxuXHJcblx0XHRcdGlmICghc3RlcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0Y29uc3Qge3N0YXRlLCBwYWdlcywgYWN0aXZlUGFnZX0gPSBmb3JtO1xyXG5cdFx0XHRjb25zdCBzdGVwTmFtZSA9IHN0ZXAubmFtZTtcclxuXHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSkge1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2UgPSBmaXJzdFN0ZXBQYWdlSW5kZXgocGFnZXMsIHN0ZXBOYW1lLCBhY3RpdmVQYWdlKTtcclxuXHRcdFx0XHRpZiAocGFnZSkgZm9ybS5hY3RpdmVQYWdlID0gcGFnZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5wcm9ncmVzcyA9IDA7XHJcblx0XHRpZiAoIXRoaXMuI2luaXRpYWxpemVkKSB7XHJcblx0XHRcdGNvbnN0IGZvcm0gPSB0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdHRoaXMuI3N0ZXBzID0gdGhpcy5maW5kKE5PREVOQU1FX1NURVApO1xyXG5cdFx0XHR0aGlzLiNmb3JtLm9uKFtFVkVOVF9TSVRFX0NIQU5HRUQsRVZFTlRfRk9STV9TVEFURV9DSEFOR0VEXSwgKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHN0YXRlID0gZm9ybS5zdGF0ZTtcclxuXHRcdFx0XHRpZihGT1JNU1RBVEVfVkFMSURBVElORyA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRjb25zdCB7YWN0aXZlUGFnZUluZGV4LCBhY3RpdmVQYWdlLCBwYWdlc30gPSBmb3JtO1xyXG5cdFx0XHRcdGlmICghYWN0aXZlUGFnZSkgXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdGNvbnN0IGNvdW50ID0gcGFnZXMubGVuZ3RoO1xyXG5cdFx0XHRcdGNvbnN0IHBhZ2VTdGVwID0gYWN0aXZlUGFnZSA/IGFjdGl2ZVBhZ2Uuc3RlcCA6IEZPUk1TVEFURV9JTklUO1xyXG5cdFx0XHRcdGNvbnN0IHByb2dyZXNzID0gTWF0aC5mbG9vcigoYWN0aXZlUGFnZUluZGV4ICogMTAwKSAvIGNvdW50KTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgc3RlcCBvZiB0aGlzLnN0ZXBzKSB7XHJcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3RlcC5uYW1lO1xyXG5cdFx0XHRcdFx0aWYgKHN0YXRlID09IEZPUk1TVEFURV9JTlBVVCkge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gcGFnZVN0ZXA7XHJcblx0XHRcdFx0XHRcdHN0ZXAucmVhZG9ubHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT0gRk9STVNUQVRFX1NVTU1BUlkpIHtcclxuXHRcdFx0XHRcdFx0c3RlcC5hY3RpdmUgPSBuYW1lID09IEZPUk1TVEFURV9TVU1NQVJZO1xyXG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzdGVwLmFjdGl2ZSA9IG5hbWUgPT0gRk9STVNUQVRFX0ZJTklTSEVEO1xyXG5cdFx0XHRcdFx0XHRzdGVwLnJlYWRvbmx5ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMucHJvZ3Jlc3MgPSBzdGF0ZSA9PSBGT1JNU1RBVEVfU1VNTUFSWSB8fCBzdGF0ZSA9PSBGT1JNU1RBVEVfRklOSVNIRUQgPyAxMDAgOiBwcm9ncmVzcztcclxuXHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1BST0dSRVNTQkFSX0NIQU5HRUQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuI2luaXRpYWxpemVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBzdGVwcygpe1xyXG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy4jc3RlcHMpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHByb2dyZXNzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfUFJPR1JFU1MpO1xyXG5cdH1cclxuXHJcblx0c2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XHJcblx0XHRpZiAodGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSkgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgKyBcIiVcIik7XHJcblx0XHR0aGlzLmF0dHIoQVRUUklCVVRFX1BST0dSRVNTLCBNYXRoLm1heCgwLCBNYXRoLm1pbihwcm9ncmVzcywgMTAwKSkpO1xyXG5cdH1cclxufVxyXG5cclxuZGVmaW5lKFByb2dyZXNzQmFyKTtcclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX1NURVAsIFxyXG5cdEFUVFJJQlVURV9OQU1FLCBcclxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcclxuXHRBVFRSSUJVVEVfUkVBRE9OTFkgXHJcbn0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHVwZGF0ZUFjdGl2ZVN0YXRlIH0gZnJvbSBcIi4vdXRpbHMvU3RhdGVIZWxwZXJcIjtcclxuaW1wb3J0IHtDb21wb25lbnQsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbQVRUUklCVVRFX05BTUUsIEFUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9SRUFET05MWV07XHJcblxyXG5jbGFzcyBTdGVwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9TVEVQO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoQVRUUklCVVRFX05BTUUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgYWN0aXZlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9BQ1RJVkUpO1xyXG5cdH1cclxuXHJcblx0c2V0IGFjdGl2ZShhY3RpdmUpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLmFjdGl2ZTtcclxuXHRcdGlmIChjdXJyZW50ICE9IGFjdGl2ZSkge1xyXG5cdFx0XHR1cGRhdGVBY3RpdmVTdGF0ZSh0aGlzLCBhY3RpdmUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHJlYWRvbmx5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJJQlVURV9SRUFET05MWSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHJlYWRvbmx5ID8gdGhpcy5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIikgOiB0aGlzLmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShTdGVwKTtcclxuZXhwb3J0IGRlZmF1bHQgU3RlcDtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfVkFMSURBVElPTiwgRVZFTlRfVkFMSURBVElPTl9SRU1PVkVELCBBVFRSSUJVVEVfQUNUSVZFLCBBVFRSSUJVVEVfQ09ORElUSU9OIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJJQlVURV9BQ1RJVkUsIEFUVFJJQlVURV9DT05ESVRJT05dO1xyXG4vKipcclxuICogQHR5cGVkZWYgVmFsaWRhdGlvbk9wdGlvblxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5oYXNWYWx1ZVxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5yZXF1aXJlZFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wdGlvbi5jb25kaXRpb25cclxuICogQHByb3BlcnR5IHtib29sZWFufSBvcHRpb24uZWRpdGFibGVcclxuICogQHByb3BlcnR5IHtvYmplY3R9IG9wdGlvbi5kYXRhXHJcbiAqIEBwcm9wZXJ0eSB7QmFzZX0gb3B0aW9uLmJhc2VcclxuICovXHJcblxyXG5jbGFzcyBWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9WQUxJREFUSU9OO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZXN0cm95KCkge1xyXG5cdFx0dGhpcy50cmlnZ2VyKEVWRU5UX1ZBTElEQVRJT05fUkVNT1ZFRCk7XHJcblx0XHRhd2FpdCBzdXBlci5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBhY3RpdmUgc3RhdGVcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGdldCBhY3RpdmUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoQVRUUklCVVRFX0FDVElWRSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzZXQgYWN0aXZlIHN0YXRlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge1xyXG5cdFx0YWN0aXZlID8gdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGhpcy5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIG51bGwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogY29uZGl0aW9uIHN0cmluZyBmb3IgZXZhbHVhdGlvblxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHZhbGlkYXRlXHJcblx0ICogXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtWYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuXHQgKi9cclxuXHRhc3luYyB2YWxpZGF0ZSh7IGhhc1ZhbHVlLCBkYXRhIH0pIHtcclxuXHRcdGNvbnN0IHZhbGlkID0gaGFzVmFsdWUgPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZSh0aGlzLmNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpIDogdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZlID0gIXZhbGlkO1xyXG5cdFx0cmV0dXJuIHZhbGlkO1xyXG5cdH1cclxufVxyXG5kZWZpbmUoVmFsaWRhdGlvbik7XHJcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRpb247XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfQkFDSyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgQmFja0J1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0NPTlRST0xfQkFDSztcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLmZvcm0udG9QcmV2UGFnZSgpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYWNrQnV0dG9uO1xyXG5kZWZpbmUoQmFja0J1dHRvbik7XHJcbiIsImltcG9ydCB7IE5PREVOQU1FX0NPTlRST0xfTkVYVCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIEZvcm1CdXR0b24ge1xyXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9ORVhUO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZSgpIHtcclxuXHRcdHRoaXMuZm9ybS50b05leHRQYWdlKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5leHRCdXR0b247XHJcbmRlZmluZShOZXh0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfQ09OVFJPTF9TVUJNSVQsIEFUVFJJQlVURV9DT05ESVRJT04sIEFUVFJJQlVURV9WQUxVRSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvcm1CdXR0b24gZnJvbSBcIi4uL0Zvcm1CdXR0b25cIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4uL3N1Ym1pdEFjdGlvbnMvQmFzZVN1Ym1pdEFjdGlvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdWJtaXRCdXR0b24gZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9DT05UUk9MX1NVQk1JVDtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNjb25kaXRpb247XHJcblx0I3N1Ym1pdEFjdGlvbnM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHJcblx0XHRhd2FpdCBzdXBlci5pbml0KCk7XHJcblx0XHRpZiAodGhpcy4jaW5pdGlhbGl6ZWQpIHtcdFx0XHRcclxuXHRcdFx0dGhpcy4jaW5pdGlhbGl6ZWQgPSB0cnVlO1x0XHRcdFxyXG5cdFx0XHR0aGlzLiNjb25kaXRpb24gPSB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgYWN0aW9ucygpIHtcclxuXHRcdGlmICghdGhpcy4jc3VibWl0QWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCBhY3Rpb25zID0gW107XHJcblx0XHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuY2hpbGRyZW47XHJcblx0XHRcdGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcykge1xyXG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEJhc2VTdWJtaXRBY3Rpb24pIGFjdGlvbnMucHVzaChjaGlsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4jc3VibWl0QWN0aW9ucyA9IGFjdGlvbnM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI3N1Ym1pdEFjdGlvbnM7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG5cdH1cclxuXHRcclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnN1Ym1pdCh7YWN0aW9uczp0aGlzLmFjdGlvbnN9KTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3VibWl0QnV0dG9uO1xyXG5kZWZpbmUoU3VibWl0QnV0dG9uKTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9ybUJ1dHRvbiBmcm9tIFwiLi4vRm9ybUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBTdW1tYXJ5QnV0dG9uIGV4dGVuZHMgRm9ybUJ1dHRvbiB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfQ09OVFJPTF9TVU1NQVJZO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHRleGVjdXRlKCkge1xyXG5cdFx0dGhpcy5mb3JtLnRvTmV4dFBhZ2UoKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3VtbWFyeUJ1dHRvbjtcclxuZGVmaW5lKFN1bW1hcnlCdXR0b24pO1xyXG4iLCJpbXBvcnQgQmFja0J1dHRvbiBmcm9tIFwiLi9CYWNrQnV0dG9uXCI7XG5pbXBvcnQgTmV4dEJ1dHRvbiBmcm9tIFwiLi9OZXh0QnV0dG9uXCI7XG5pbXBvcnQgU3VtbWFyeUJ1dHRvbiBmcm9tIFwiLi9TdW1tYXJ5QnV0dG9uXCI7XG5pbXBvcnQgU3VibWl0QnV0dG9uIGZyb20gXCIuL1N1Ym1pdEJ1dHRvblwiO1xuXG5leHBvcnQge1xuXHRCYWNrQnV0dG9uLFxuXHROZXh0QnV0dG9uLFxuXHRTdW1tYXJ5QnV0dG9uLFxuXHRTdWJtaXRCdXR0b24sXG59O1xuIiwiaW1wb3J0IHsgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcblxyXG5jbGFzcyBDb25kaXRpb25IYW5kbGUge1xyXG5cclxuICAgICNiYXNlO1xyXG4gICAgI2NvbmRpdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlKXsgIFxyXG4gICAgICAgIHRoaXMuI2Jhc2UgPSBiYXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXQoKXtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZGl0aW9uKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuI2NvbmRpdGlvbilcclxuICAgICAgICAgICAgdGhpcy4jY29uZGl0aW9uID0gdGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9DT05ESVRJT04pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBiYXNlLmNvbmRpdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KWAsIGNvbmRpdGlvbiwgZGF0YSk7ICAgICAgICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvbiA/IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZGF0YSwgZmFsc2UpIDogdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbmRpdGlvbiAhPSBjdXJyZW50KVxyXG4gICAgICAgICAgICBiYXNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvblxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjb25kaXRpb24oJHtiYXNlLm5hbWV9KSByZXN1bHQ6YCwgY29uZGl0aW9uKTtcclxuICAgICAgICByZXR1cm4gY29uZGl0aW9uOyAgICAgICBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmRpdGlvbkhhbmRsZTsiLCJpbXBvcnQgeyBBVFRSSUJVVEVfRURJVEFCTEVfQ09ORElUSU9OIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuXHJcbmNsYXNzIEVkaXRhYmxlSGFuZGxlIHtcclxuXHQjYmFzZTtcclxuXHQjY29uZGl0aW9uID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMuI2NvbmRpdGlvbiA9PSBudWxsKSB0aGlzLiNjb25kaXRpb24gPSAodGhpcy4jYmFzZS5hdHRyKEFUVFJJQlVURV9FRElUQUJMRV9DT05ESVRJT04pIHx8IFwiXCIpLnRyaW0oKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jY29uZGl0aW9uO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdmFsaWRhdGUoZGF0YSkge1xyXG5cdFx0bGV0IGVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgY3VycmVudCA9IGJhc2UuZWRpdGFibGU7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbjtcclxuXHRcdC8vY29uc29sZS5sb2coXCJ2YWxpZGF0ZSBlZGl0YWJsZTpcIiwge2NvbmRpdGlvbiwgZGF0YSwgYmFzZX0pO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZWRpdGFibGUgPSBjb25kaXRpb24gPyBhd2FpdCBFeHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGRhdGEsIGZhbHNlKSA6IHRydWU7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGVkaXRhYmxlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGVkaXRhYmxlICE9IGN1cnJlbnQpIHRoaXMuI2Jhc2UuZWRpdGFibGUgPSBlZGl0YWJsZTtcclxuXHJcblx0XHRyZXR1cm4gZWRpdGFibGU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0YWJsZUhhbmRsZTtcclxuIiwiaW1wb3J0IHtcclxuICAgIEVWRU5UX01FU1NBR0VfUkVNT1ZFRCxcclxuICAgIE5PREVOQU1FX01FU1NBR0VcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFkZEFsbFRvU2V0IH0gZnJvbSBcIi4uL3V0aWxzL0RhdGFIZWxwZXIuanNcIjtcclxuaW1wb3J0IHtmaW5kTWVzc2FnZXN9IGZyb20gXCIuLi91dGlscy9NZXNzYWdlSGVscGVyLmpzXCI7XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlSGFuZGxlIHtcclxuXHJcbiAgICAjYmFzZSA9IG51bGw7XHJcbiAgICAjbWVzc2FnZXMgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZSl7XHJcbiAgICAgICAgdGhpcy4jYmFzZSA9IGJhc2U7XHJcblxyXG4gICAgICAgIGJhc2Uub24oRVZFTlRfTUVTU0FHRV9SRU1PVkVELCAoZXZlbnQpID0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLiNtZXNzYWdlcy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICB9KTsgXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdCgpe1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLiNiYXNlO1xyXG5cdFx0Y29uc3QgeyBmb3JtLCBpZCwgbmFtZSB9ID0gYmFzZTtcclxuXHRcdGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlcztcclxuXHRcdGlmIChpZCAmJiBpZC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZm9ybS5maW5kKGAke05PREVOQU1FX01FU1NBR0V9W2Zvcj1cIiR7aWR9XCJdYCkpO1xyXG5cdFx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZm9ybS5maW5kKGAke05PREVOQU1FX01FU1NBR0V9W2Zvcj1cIiMke2lkfVwiXWApKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmFtZSAmJiBuYW1lLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGFkZEFsbFRvU2V0KG1lc3NhZ2VzLCBmb3JtLmZpbmQoYCR7Tk9ERU5BTUVfTUVTU0FHRX1bZm9yPVwiJHtuYW1lfVwiXWApKTtcclxuXHRcdH1cclxuXHJcblx0XHRhZGRBbGxUb1NldChtZXNzYWdlcywgZmluZE1lc3NhZ2VzKGJhc2UpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI21lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlKGRhdGEpIHtcclxuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgdGhpcy4jbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UudXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUhhbmRsZTsiLCJpbXBvcnQgeyBFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIE5PREVOQU1FX1ZBTElEQVRJT04gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFkZEFsbFRvU2V0IH0gZnJvbSBcIi4uL3V0aWxzL0RhdGFIZWxwZXJcIjtcclxuaW1wb3J0IHsgZmluZFZhbGlkYXRpb25zIH0gZnJvbSBcIi4uL3V0aWxzL1ZhbGlkYXRpb25IZWxwZXJcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL0Jhc2VcIjtcclxuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcmVxdWVzdENhbGxiYWNrYCBhbmQgaXMgZGlzcGxheWVkIGFzIGEgZ2xvYmFsIHN5bWJvbC5cclxuICpcclxuICogQGNhbGxiYWNrIEN1c3RvbVZhbGlkYXRpb25cclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9WYWxpZGF0aW9uXCIpLlZhbGlkYXRpb25PcHRpb259IG9wdGlvblxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYXN5bmNcclxuICogQGZ1bmN0aW9uXHJcbiAqIFxyXG4gKiBleGVjdXRlIGN1c3RvbSB2YWxpZGF0aW9uIGNhbGxiYWNrIGZ1bmN0aW9uc1xyXG4gKiBcclxuICogQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IHZhbGlkYXRpb25zXHJcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vVmFsaWRhdGlvblwiKS5WYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAqL1xyXG5jb25zdCB2YWxpZGF0ZUN1c3RvbVZhbGlkYXRpb25zID0gYXN5bmMgKHZhbGlkYXRpb25zLCBvcHRpb24pID0+IHtcclxuXHRpZiAoKHZhbGlkYXRpb25zLnNpemUgPT0gMCkpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCBwcm9taXNlcyA9IGF3YWl0IFByb21pc2UuYWxsKEFycmF5LmZyb20odmFsaWRhdGlvbnMpLm1hcCgodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbihvcHRpb24pKSk7XHJcblx0cmV0dXJuIHByb21pc2VzLmV2ZXJ5KCh2YWxpZCkgPT4gdmFsaWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBhc3luY1xyXG4gKiBAZnVuY3Rpb25cclxuICogXHJcbiAqIGV4ZWN1dGUgdmFsaWRhdGlvbnNcclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmFsaWRhdGlvbj59IHZhbGlkYXRpb25zXHJcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vVmFsaWRhdGlvblwiKS5WYWxpZGF0aW9uT3B0aW9ufSBvcHRpb25cclxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAqL1xyXG5jb25zdCB2YWxpZGF0ZVZhbGlkYXRpb25zID0gYXN5bmMgKHZhbGlkYXRpb25zLCBvcHRpb24pID0+IHtcclxuXHRpZiAoKHZhbGlkYXRpb25zLnNpemUgPT0gMCkpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCBwcm9taXNlcyA9IGF3YWl0IFByb21pc2UuYWxsKEFycmF5LmZyb20odmFsaWRhdGlvbnMpLm1hcCgodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi52YWxpZGF0ZShvcHRpb24pKSk7XHJcblx0cmV0dXJuIHByb21pc2VzLmV2ZXJ5KCh2YWxpZCkgPT4gdmFsaWQpO1xyXG59O1xyXG5cclxuY2xhc3MgVmFsaWRhdGlvbkhhbmRsZSB7XHJcblx0LyoqXHJcblx0ICogUmVmZXJlbmNlIGJhc2Ugb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7QmFzZX1cclxuXHQgKi9cclxuXHQjYmFzZSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7U2V0PFZhbGlkYXRpb24+fVxyXG5cdCAqL1xyXG5cdCN2YWxpZGF0aW9ucyA9IG5ldyBTZXQoKTtcclxuXHQjY3VzdG9tcyA9IG5ldyBTZXQoKTtcclxuXHJcblx0Y29uc3RydWN0b3IoYmFzZSkge1xyXG5cdFx0dGhpcy4jYmFzZSA9IGJhc2U7XHJcblxyXG5cdFx0YmFzZS5vbihFVkVOVF9WQUxJREFUSU9OX1JFTU9WRUQsIChldmVudCkgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dGhpcy4jdmFsaWRhdGlvbnMuZGVsZXRlKGV2ZW50LnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IHsgZm9ybSwgaWQsIG5hbWUgfSA9IGJhc2U7XHJcblx0XHRjb25zdCB2YWxpZGF0aW9ucyA9IHRoaXMudmFsaWRhdGlvbnM7XHJcblx0XHRpZiAoaWQgJiYgaWQubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9WQUxJREFUSU9OfVtmb3I9XCIke2lkfVwiXWApKTtcclxuXHRcdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZvcm0uZmluZChgJHtOT0RFTkFNRV9WQUxJREFUSU9OfVtmb3I9XCIjJHtpZH1cIl1gKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5hbWUgJiYgbmFtZS5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRhZGRBbGxUb1NldCh2YWxpZGF0aW9ucywgZm9ybS5maW5kKGAke05PREVOQU1FX1ZBTElEQVRJT059W2Zvcj1cIiR7bmFtZX1cIl1gKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkQWxsVG9TZXQodmFsaWRhdGlvbnMsIGZpbmRWYWxpZGF0aW9ucyhiYXNlKSk7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsaWRhdGlvbnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdmFsaWRhdGlvbnM7XHJcblx0fVxyXG5cclxuXHRnZXQgY3VzdG9tVmFsaWRhdGlvbnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jY3VzdG9tcztcclxuXHR9XHJcblxyXG5cdGFkZEN1c3RvbVZhbGlkYXRpb24odmFsaWRhdGlvbikge1xyXG5cdFx0dGhpcy4jY3VzdG9tcy5hZGQodmFsaWRhdGlvbik7XHJcblx0fVxyXG5cclxuXHRhc3luYyB2YWxpZGF0ZShkYXRhKSB7XHJcblx0XHRjb25zdCBiYXNlID0gdGhpcy4jYmFzZTtcclxuXHRcdGNvbnN0IHsgaGFzVmFsdWUsIHJlcXVpcmVkLCBjb25kaXRpb24sIGVkaXRhYmxlIH0gPSBiYXNlO1xyXG5cclxuXHRcdC8vY29uc29sZS5sb2coYCR7YmFzZS5ub2RlTmFtZX0oJHtiYXNlLm5hbWV9KSB2YWxpZGF0ZTpgLCB7IGhhc1ZhbHVlLCByZXF1aXJlZCwgY29uZGl0aW9uLCBlZGl0YWJsZSwgY3VycmVudFZhbGlkIH0sIGRhdGEpO1xyXG5cdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChjb25kaXRpb24pIHtcclxuXHRcdFx0dmFsaWQgPSByZXF1aXJlZCA/IGhhc1ZhbHVlIDogdHJ1ZTtcclxuXHJcblx0XHRcdGNvbnN0IG9wdGlvbiA9e1xyXG5cdFx0XHRcdGhhc1ZhbHVlOiBoYXNWYWx1ZSwgXHJcblx0XHRcdFx0cmVxdWlyZWQ6IHJlcXVpcmVkLCBcclxuXHRcdFx0XHRjb25kaXRpb246IGNvbmRpdGlvbiwgXHJcblx0XHRcdFx0ZWRpdGFibGU6IGVkaXRhYmxlLFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0YmFzZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcInZhbGlkYXRpb24gb3B0aW9uOlwiLCBvcHRpb24pXHJcblxyXG5cdFx0XHR2YWxpZCA9IGF3YWl0IHZhbGlkYXRlQ3VzdG9tVmFsaWRhdGlvbnModGhpcy4jY3VzdG9tcywgb3B0aW9uKSAmJiB2YWxpZDtcclxuXHRcdFx0dmFsaWQgPSBhd2FpdCB2YWxpZGF0ZVZhbGlkYXRpb25zKHRoaXMuI3ZhbGlkYXRpb25zLCBvcHRpb24pICYmIHZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UudmFsaWQgPSB2YWxpZDtcclxuXHJcblx0XHQvL2NvbnNvbGUubG9nKGAke2Jhc2Uubm9kZU5hbWV9KCR7YmFzZS5uYW1lfSkgdmFsaWRhdGUgcmVzdWx0OmAsIHt2YWxpZH0pO1xyXG5cdFx0cmV0dXJuIHZhbGlkO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdGlvbkhhbmRsZTtcclxuIiwiaW1wb3J0IHsgXHJcblx0Tk9ERU5BTUVfTElTVF9BRERfUk9XLCBcclxuXHRFVkVOVF9MSVNUX1JPV19BRERcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVZFTlRfX0lOSVRJQUxJWkVEX19CVVRUT05fX0FERFJPVyA9IGAke05PREVOQU1FX0xJU1RfQUREX1JPV306aW5pdGlhbGl6ZWRgO1xyXG5cclxuY29uc3QgQVRUUklCVVRFUyA9IFtdO1xyXG5jbGFzcyBBZGRSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKXtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX0FERF9ST1c7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy50cmlnZ2VyKEVWRU5UX19JTklUSUFMSVpFRF9fQlVUVE9OX19BRERST1cpKVxyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHN1cGVyLmluaXQoKTtcclxuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTElTVF9ST1dfQUREKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShBZGRSb3cpO1xyXG5leHBvcnQgZGVmYXVsdCBBZGRSb3c7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfREVMRVRFX1JPVyxcclxuXHRFVkVOVF9MSVNUX1JPV19ERUxFVEVcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb3JtQnV0dG9uIGZyb20gXCIuLi9Gb3JtQnV0dG9uXCI7XHJcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcblxyXG5jbGFzcyBEZWxldGVSb3cgZXh0ZW5kcyBGb3JtQnV0dG9uIHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTLmNvbmNhdChBVFRSSUJVVEVTKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XHJcblx0XHRyZXR1cm4gTk9ERU5BTUVfTElTVF9ERUxFVEVfUk9XO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmVcdD0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfTElTVF9ST1dfREVMRVRFKTtcclxuXHR9XHJcbn1cclxuXHJcbmRlZmluZShEZWxldGVSb3cpO1xyXG5leHBvcnQgZGVmYXVsdCBEZWxldGVSb3c7XHJcbiIsImltcG9ydCB7IFxyXG5cdE5PREVOQU1FX0xJU1RfUk9XXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuLi9Db250YWluZXJcIjtcclxuaW1wb3J0IERlbGV0ZVJvdyBmcm9tIFwiLi9EZWxldGVSb3dcIjtcclxuXHJcbmNvbnN0IEFUVFJJQlVURVMgPSBbXTtcclxuY2xhc3MgTGlzdFJvdyBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcblx0XHRyZXR1cm4gQVRUUklCVVRFUy5jb25jYXQoQ29udGFpbmVyLm9ic2VydmVkQXR0cmlidXRlcyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xyXG5cdFx0cmV0dXJuIE5PREVOQU1FX0xJU1RfUk9XO1xyXG5cdH1cdFxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRzZXQgYWN0aXZlKGFjdGl2ZSkge31cclxuXHJcblx0Z2V0IGNvbmRpdGlvbigpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Z2V0IG5hbWUoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMaXN0Um93Lk5PREVOQU1FLCBMaXN0Um93KTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdFJvdztcclxuIiwiaW1wb3J0IHsgTk9ERU5BTUVfTElTVF9ST1dTIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVTID0gW107XHJcbmNsYXNzIExpc3RSb3dzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuXHRcdHJldHVybiBBVFRSSUJVVEVTO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcclxuXHRcdHJldHVybiBOT0RFTkFNRV9MSVNUX1JPV1M7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG59XHJcblxyXG5kZWZpbmUoTGlzdFJvd3MpO1xyXG5leHBvcnQgZGVmYXVsdCBMaXN0Um93cztcclxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2VcIjtcclxuaW1wb3J0IFN1Ym1pdEFjdGlvblJlc3VsdCwgeyBTVEFURV9GQUlMLCBTVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vU3VibWl0QWN0aW9uUmVzdWx0XCI7XHJcbmltcG9ydCB7IEVWRU5UX0lOSVRJQUxJWkVfU1VCTUlUX0FDVElPTiwgTk9ERU5BTUVfRk9STSwgQVRUUklCVVRFX0NPTkRJVElPTiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcbi8vIGxvZ2ljXHJcbi8qKlxyXG4gKiBCYXNlU3VibWl0QWN0aW9uIGNsYXNzXHJcbiAqXHJcbiAqIEBjbGFzcyBCYXNlU3VibWl0QWN0aW9uXHJcbiAqIEB0eXBlZGVmIHtCYXNlU3VibWl0QWN0aW9ufVxyXG4gKiBAZXh0ZW5kcyB7Q29tcG9uZW50fVxyXG4gKi9cclxuY2xhc3MgQmFzZVN1Ym1pdEFjdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0c3RhdGljIFNUQVRFUyA9IHtcclxuXHRcdEZBSUw6IFNUQVRFX0ZBSUwsXHJcblx0XHRTVUNDRVNTOiBTVEFURV9TVUNDRVNTLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdCNpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cdCNmb3JtO1xyXG5cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgc3VwZXIuaW5pdCgpO1xyXG5cdFx0aWYgKCF0aGlzLiNpbml0aWFsaXplZCkge1xyXG5cdFx0XHR0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHR0aGlzLiNmb3JtID0gdGhpcy5wYXJlbnQoTk9ERU5BTUVfRk9STSk7XHJcblx0XHRcdGlmICh0aGlzLiNmb3JtKSB0aGlzLnRyaWdnZXIoRVZFTlRfSU5JVElBTElaRV9TVUJNSVRfQUNUSU9OKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBmb3JtKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2Zvcm07XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NlcHQoZGF0YSA9IHt9KSB7XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTik7XHJcblx0XHRpZiAoY29uZGl0aW9uKSByZXR1cm4gYXdhaXQgRXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBkYXRhLCBmYWxzZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIVxyXG5cdCAqL1xyXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSA9IHt9LCBjb250ZXh0ID0ge30pIHtcclxuXHRcdHJldHVybiBuZXcgU3VibWl0QWN0aW9uUmVzdWx0KFNUQVRFX0ZBSUwsIFwibm90IGltcGxlbWVudGVkXCIsIG51bGwsIGRhdGEsIGNvbnRleHQpO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCYXNlU3VibWl0QWN0aW9uO1xyXG4iLCJpbXBvcnQge2RlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEJhc2VTdWJtaXRBY3Rpb24gZnJvbSBcIi4vQmFzZVN1Ym1pdEFjdGlvblwiO1xyXG5pbXBvcnQgU3VibWl0QWN0aW9uUmVzdWx0LCB7IFNUQVRFX1NVQ0NFU1MsIFNUQVRFX0ZBSUwgfSBmcm9tIFwiLi9TdWJtaXRBY3Rpb25SZXN1bHRcIjtcclxuaW1wb3J0IHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZVwiO1xyXG5cclxuY29uc3QgTk9ERU5BTUUgPSBgJHtOT0RFTkFNRV9TVUJNSVRfQUNUSU9OfS1kZWZhdWx0YDtcclxuXHJcbmNsYXNzIERlZmF1bHRGb3JtU3VibWl0QWN0aW9uIGV4dGVuZHMgQmFzZVN1Ym1pdEFjdGlvbiB7XHJcblxyXG4gICAgc3RhdGljIGdldCBOT0RFTkFNRSgpIHsgcmV0dXJuIE5PREVOQU1FO31cclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKGVuZHBvaW50LCBtZXRob2QpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XHJcblx0XHR0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGV4ZWN1dGUoZGF0YSkge1x0XHRcclxuXHRcdGxldCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnQ7XHJcblx0XHRlbmRwb2ludCA9IGF3YWl0IEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlVGV4dChlbmRwb2ludCwgZGF0YSwgZW5kcG9pbnQpO1xyXG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgbG9jYXRpb24pO1xyXG5cclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdG1ldGhvZDogdGhpcy5tZXRob2QsXHJcblx0XHRcdGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuXHRcdFx0bW9kZTogXCJjb3JzXCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0fSxcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcblx0XHR9KTtcdFx0XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBTdWJtaXRBY3Rpb25SZXN1bHQodGhpcywgcmVzcG9uc2Uub2sgPyBTVEFURV9TVUNDRVNTIDogU1RBVEVfRkFJTCwgcmVzcG9uc2UsIGRhdGEsIGNvbnRleHQpO1x0XHRcclxuXHR9XHJcbn07XHJcblxyXG5kZWZpbmUoRGVmYXVsdEZvcm1TdWJtaXRBY3Rpb24pO1xyXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0Rm9ybVN1Ym1pdEFjdGlvbjtcclxuIiwiZXhwb3J0IGNvbnN0IFNUQVRFX1NVQ0NFU1MgPSBcInN1Y2Nlc3NcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9GQUlMID0gXCJmYWlsXCI7XG5cbmNsYXNzIFN1Ym1pdEFjdGlvblJlc3VsdCB7XG5cbiAgICBzdGF0aWMgZ2V0IFNUQVRFX1NVQ0NFU1MoKXtyZXR1cm4gU1RBVEVfU1VDQ0VTUzt9XG4gICAgc3RhdGljIGdldCBTVEFURV9GQUlMKCl7cmV0dXJuIFNUQVRFX0ZBSUw7fVxuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uLCBzdGF0ZSwgbWVzc2FnZSwgZGF0YSwgY29udGV4dCl7XG5cdFx0dGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9OyAgICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pdEFjdGlvblJlc3VsdDsiLCJpbXBvcnQgeyBTUEVDSUFMVkFSUywgTk9ERU5BTUVfTElTVF9ST1cgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuXHJcbi8qKlxyXG4qIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBvYmplY3RzIGFuZCByZXR1cm5zIG5ldyBvYmplY3QuIERvZXMgbm90IG1vZGlmeVxyXG4qIG9iamVjdHMgKGltbXV0YWJsZSkgYW5kIG1lcmdlcyBhcnJheXMgdmlhIGNvbmNhdGVuYXRpb24uXHJcbipcclxuKiBAcGFyYW0gey4uLm9iamVjdH0gb2JqZWN0cyAtIE9iamVjdHMgdG8gbWVyZ2VcclxuKiBAcmV0dXJucyB7b2JqZWN0fSBOZXcgb2JqZWN0IHdpdGggbWVyZ2VkIGtleS92YWx1ZXNcclxuKi9cclxuZnVuY3Rpb24gbWVyZ2VEZWVwKC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblx0XHJcblx0cmV0dXJuIG9iamVjdHMucmVkdWNlKChwcmV2LCBvYmopID0+IHtcclxuXHQgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdGNvbnN0IG9WYWwgPSBvYmpba2V5XTtcclxuXHRcdFxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHQgIHByZXZba2V5XSA9IG1lcmdlRGVlcChwVmFsLCBvVmFsKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0ICBwcmV2W2tleV0gPSBvVmFsO1xyXG5cdFx0fVxyXG5cdCAgfSk7XHJcblx0ICBcclxuXHQgIHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxuICB9XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZURhdGEgPSBhc3luYyAoZGF0YSwgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRpZiAoIW5vVmFsdWUodmFsdWUpKSB7XHJcblx0XHRpZiAobmFtZSkgdmFsdWVIZWxwZXIoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0ZWxzZSBkYXRhID0gbWVyZ2VEZWVwKGRhdGEsIHZhbHVlKTtcclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmllbGRWYWx1ZU1hcFRvT2JqZWN0ID0gYXN5bmMgKG1hcCwgZmllbGRPcmRlcikgPT4ge1x0XHJcblx0Ly9jb25zb2xlLmxvZyhcImZpZWxkVmFsdWVNYXBUb09iamVjdDogXCIsIG1hcCwgZmllbGRPcmRlcik7XHJcblx0bGV0IGRhdGEgPSB7fTtcclxuXHRpZiAoZmllbGRPcmRlcikge1xyXG5cdFx0Zm9yIChsZXQgZmllbGQgb2YgZmllbGRPcmRlcikge1xyXG5cdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBtYXAuZ2V0KGZpZWxkKTtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRmb3IgKGxldCBbeyBuYW1lIH0sIHZhbHVlXSBvZiBtYXApIHtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVidWlsZERhdGFCeUZpZWxkcyA9IGFzeW5jIChmaWVsZHMpID0+IHtcclxuXHRsZXQgZGF0YSA9IHt9O1xyXG5cdGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBhd2FpdCBmaWVsZC52YWx1ZSgpO1xyXG5cdFx0aWYgKCFub1ZhbHVlKHZhbHVlKSkge1xyXG5cdFx0XHRjb25zdCBuYW1lID0gZmllbGQubmFtZTtcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IHVwZGF0ZURhdGEoZGF0YSwgbmFtZSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBldmFsdWF0aW9uRGF0YSA9IGFzeW5jIChiYXNlKSA9PiB7XHJcblx0YXdhaXQgYmFzZS5yZWFkeTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0ZGF0YVtTUEVDSUFMVkFSUy5DVVJSRU5UVkFMVUVdID0gYXdhaXQgYmFzZS5yYXdWYWx1ZSgpO1xyXG5cclxuXHRsZXQgcm93ID0gYmFzZS5wYXJlbnQoTk9ERU5BTUVfTElTVF9ST1cpO1xyXG5cdGxldCB0ZW1wID0gZGF0YTtcclxuXHR3aGlsZSAocm93KSB7XHJcblx0XHR0ZW1wW1NQRUNJQUxWQVJTLkNVUlJFTlRMSVNUUk9XXSA9IGF3YWl0IHJvdy5yYXdWYWx1ZSgpO1xyXG5cdFx0dGVtcCA9IHRlbXBbU1BFQ0lBTFZBUlMuQ1VSUkVOVExJU1RST1ddO1xyXG5cdFx0cm93ID0gcm93LnBhcmVudChOT0RFTkFNRV9MSVNUX1JPVyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IE5BTUVfU1BMSVRURVIgPSAvXFwuL2c7XHJcbmV4cG9ydCBjb25zdCB2YWx1ZUhlbHBlciA9IGZ1bmN0aW9uIChkYXRhLCBuYW1lLCB2YWx1ZSkge1xyXG5cdGNvbnN0IG5hbWVzID0gbmFtZS5zcGxpdChOQU1FX1NQTElUVEVSKTtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gZ2V0VmFsdWUoZGF0YSwgbmFtZXMpO1xyXG5cclxuXHRjb25zdCBkZWwgPSBub1ZhbHVlKHZhbHVlKTtcclxuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiBkZWwpIHJldHVybiBkYXRhO1xyXG5cclxuXHRyZXR1cm4gc2V0VmFsdWUoZGVsLCBkYXRhLCB2YWx1ZSwgbmFtZXMpO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0VmFsdWUgPSAocmVtb3ZlLCBkYXRhLCB2YWx1ZSwgbmFtZXMpID0+IHtcclxuXHRpZiAobm9WYWx1ZShkYXRhKSAmJiByZW1vdmUpIHJldHVybiBudWxsO1xyXG5cdFxyXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xyXG5cdGlmIChuYW1lcy5sZW5ndGggPT0gMCkge1xyXG5cdFx0aWYgKHJlbW92ZSkgZGVsZXRlIGRhdGFbbmFtZV07XHJcblx0XHRlbHNlIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZGF0YVtuYW1lXSA9IGRhdGFbbmFtZV0gfHwge307XHJcblx0XHRzZXRWYWx1ZShyZW1vdmUsIGRhdGFbbmFtZV0sIHZhbHVlLCBuYW1lcyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IGdldFZhbHVlID0gKGRhdGEsIG5hbWVzKSA9PiB7XHJcblx0aWYgKG5vVmFsdWUoZGF0YSkpIHJldHVybiBudWxsO1xyXG5cdGlmIChuYW1lcy5sZW5ndGggPT0gMCkgcmV0dXJuIGRhdGE7XHJcblxyXG5cdGNvbnN0IG5hbWUgPSBuYW1lcy5zaGlmdCgpO1xyXG5cdHJldHVybiBnZXRWYWx1ZShkYXRhW25hbWVdLCBuYW1lcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uIGFkZEFsbFRvQXJyYXlcclxuICogXHJcbiAqICBNZXJnZSBhIHNvdXJjZSBzZXQgaW50byBhIHRhcmdldCBzZXRcclxuICpcclxuICogQHBhcmFtIHtBcnJheTwqPn0gYVRhcmdldFxyXG4gKiBAcGFyYW0ge0l0ZXJhYmxlPCo+fSBhU291cmNlXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtTZXQ8Kj59IHJldHVybnMgdGhlIHRhcmdldCBzZXRcclxuICovXHJcbmV4cG9ydCBjb25zdCBhZGRBbGxUb0FycmF5ID0gKGFUYXJnZXQsIGFTb3VyY2UpID0+IHtcclxuXHRpZiAoYVNvdXJjZSAhPSBudWxsKSB7XHJcblx0XHRmb3IgKGxldCBzb3VyY2Ugb2YgYVNvdXJjZSkgYVRhcmdldC5wdXNoKHNvdXJjZSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYVRhcmdldDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb24gYWRkQWxsVG9TZXRcclxuICogXHJcbiAqICBNZXJnZSBhIHNvdXJjZSBzZXQgaW50byBhIHRhcmdldCBzZXRcclxuICpcclxuICogQHBhcmFtIHtTZXQ8Kj59IGFUYXJnZXRcclxuICogQHBhcmFtIHtJdGVyYWJsZTwqPn0gYVNvdXJjZVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U2V0PCo+fSByZXR1cm5zIHRoZSB0YXJnZXQgc2V0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYWRkQWxsVG9TZXQgPSAoYVRhcmdldCwgYVNvdXJjZSkgPT4ge1xyXG5cdGlmIChhU291cmNlICE9IG51bGwpIHtcclxuXHRcdGZvciAobGV0IHNvdXJjZSBvZiBhU291cmNlKXtcclxuXHRcdFx0YVRhcmdldC5hZGQoc291cmNlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59O1xyXG4iLCJpbXBvcnQge0VWRU5USEFORExFX1RJTUVPVVR9IGZyb20gXCIuLi9Db25zdGFudHNcIlxuXG5leHBvcnQgY29uc3QgdG9FdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcmd1bWVudHMpLmpvaW4oXCIgXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VFdmVudENvcHkgPSAoZXZlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXG4gICAgICAgIGN1cnJlbnRUYXJnZXQ6IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ6IGV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIG9yaWdpbmFsVGFyZ2V0IDogZXZlbnQub3JpZ2luYWxUYXJnZXQsXG4gICAgICAgIHNyY0VsZW1lbnQ6IGV2ZW50LnNyY0VsZW1lbnQsXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvVGltZW91dEhhbmRsZSA9IChoYW5kbGUsIHByZXZlbnREZWZhdWx0LCBzdG9wUHJvcGFnYXRpb24sIHRpbWVvdXQpID0+IHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmVudCA9IHR5cGVvZiBwcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiID8gcHJldmVudERlZmF1bHQgOiAoKSA9PiBwcmV2ZW50RGVmYXVsdDtcbiAgICBjb25zdCBzdG9wID0gdHlwZW9mIHN0b3BQcm9wYWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiID8gc3RvcFByb3BhZ2F0aW9uIDogKCkgPT4gc3RvcFByb3BhZ2F0aW9uO1xuXG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICBpZihwcmV2ZW50KGV2ZW50KSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHN0b3AoZXZlbnQpKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZXZlbnRDb3B5ID0gbWFrZUV2ZW50Q29weShldmVudCk7XG5cbiAgICAgICAgaWYoaWQpXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlkID0gbnVsbDtcbiAgICAgICAgICAgIGhhbmRsZShldmVudENvcHkpO1xuICAgICAgICB9LCB0aW1lb3V0IHx8IEVWRU5USEFORExFX1RJTUVPVVQpO1xuXG4gICAgfVxufTsiLCJpbXBvcnQgeyB0cmVlRmlsdGVyIH0gZnJvbSBcIi4vTm9kZUhlbHBlci5qc1wiO1xyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vQmFzZS5qc1wiO1xyXG5pbXBvcnQgeyBBVFRSSUJVVEVfRk9SIH0gZnJvbSBcIi4uL0NvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi4vTWVzc2FnZS5qc1wiO1xyXG5cclxuLyoqIFxyXG4gKiBAZnVuY3Rpb24gZmluZE1lc3NhZ2VzXHJcbiAqIFxyXG4gKiBGaW5kIGFsbCBtZXNzYWdlcyBvZiByb290IGFzIGNoaWxkcmVuIG9uIGRvbSB0cmVlXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0Jhc2V9IHJvb3QgXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7QXJyYXk8VmFsaWRhdGlvbj59XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZmluZE1lc3NhZ2VzID0gKHJvb3QpID0+IHtcclxuXHRyZXR1cm4gdHJlZUZpbHRlcih7XHJcblx0XHRyb290LFxyXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRpZiAocm9vdCAhPSBlbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XHJcblx0XHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIE1lc3NhZ2UgJiYgZWxlbWVudC5hdHRyKEFUVFJJQlVURV9GT1IpID09IG51bGwpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcclxuXHRcdH0sXHJcblx0fSk7XHJcbn07IiwiaW1wb3J0IEJhc2VGaWVsZCBmcm9tIFwiLi4vQmFzZUZpZWxkXCI7XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb3B0aW9uLnJvb3QgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb24uZmlsdGVyIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBjb25zdCB0cmVlRmlsdGVyID0gKHsgcm9vdCwgZmlsdGVyIH0pID0+IHtcblx0bGV0IGVsZW1lbnRzID0gW107XG5cdHJvb3QuY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdGNvbnN0IHsgYWNjZXB0LCBzdG9wID0gZmFsc2UgfSA9IGZpbHRlcihlbGVtZW50KTtcblxuXHRcdGlmIChhY2NlcHQpIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cblx0XHRpZiAoIXN0b3ApIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IHRyZWVGaWx0ZXIoeyByb290OiBlbGVtZW50LCBmaWx0ZXIgfSk7XG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHJlc3VsdCk7XG5cdFx0XHRlbHNlIGlmIChyZXN1bHQpIGVsZW1lbnRzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBlbGVtZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kRmllbGRzID0gKHJvb3QpID0+IHtcblx0cmV0dXJuIHRyZWVGaWx0ZXIoe1xuXHRcdHJvb3QsXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlRmllbGQpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xuXHRcdFx0cmV0dXJuIHsgYWNjZXB0OiBmYWxzZSB9O1xuXHRcdH0sXG5cdH0pO1xufTtcblxuXG4iLCJpbXBvcnQgeyBcclxuXHRFVkVOVF9WQUxJRF9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX0FDVElWRV9TVEFURV9DSEFOR0VELFxyXG5cdEVWRU5UX0VESVRBQkxFX1NUQVRFX0NIQU5HRUQsXHJcblx0RVZFTlRfUkVBRE9OTFlfU1RBVEVfQ0hBTkdFRCxcclxuXHRBVFRSSUJVVEVfQUNUSVZFLCBcclxuXHRBVFRSSUJVVEVfVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9JTlZBTElELCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBcclxuXHRBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIFxyXG5cdEFUVFJJQlVURV9FRElUQUJMRSwgQVRUUklCVVRFX1JFQURPTkxZIFxyXG59IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVWYWxpZFN0YXRlID0gKHRhcmdldCwgdmFsaWQpID0+IHtcclxuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9JTlZBTElELCBudWxsKTtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9WQUxJRCwgbnVsbCk7XHJcblx0fSBlbHNlIGlmICh2YWxpZCkge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBcIlwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0lOVkFMSUQsIFwiXCIpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1ZBTElELCBudWxsKTtcclxuXHR9XHJcblxyXG5cdHRhcmdldC50cmlnZ2VyKEVWRU5UX1ZBTElEX1NUQVRFX0NIQU5HRUQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbmRpdGlvblN0YXRlID0gKHRhcmdldCwgdmFsaWQpID0+IHtcclxuXHRpZiAodHlwZW9mIHZhbGlkID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbGlkID09IG51bGwpIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fSU5WQUxJRCwgbnVsbCk7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX1ZBTElELCBudWxsKTtcclxuXHR9IGVsc2UgaWYgKHZhbGlkKSB7XHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfQ09ORElUSU9OX0lOVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9WQUxJRCwgXCJcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9DT05ESVRJT05fVkFMSUQsIG51bGwpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0NPTkRJVElPTl9JTlZBTElELCBcIlwiKTtcclxuXHR9XHJcblxyXG5cdHRhcmdldC50cmlnZ2VyKEVWRU5UX0NPTkRJVElPTl9TVEFURV9DSEFOR0VEKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVBY3RpdmVTdGF0ZSA9ICh0YXJnZXQsIGFjdGl2ZSwgaW5pdGlhbCA9IGZhbHNlKSA9PiB7XHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQuYWN0aXZlO1xyXG5cdGFjdGl2ZSA/IHRhcmdldC5hdHRyKEFUVFJJQlVURV9BQ1RJVkUsIFwiXCIpIDogdGFyZ2V0LmF0dHIoQVRUUklCVVRFX0FDVElWRSwgbnVsbCk7XHJcblx0aWYgKG9sZFN0YXRlICE9IGFjdGl2ZSB8fCBpbml0aWFsKSB0YXJnZXQudHJpZ2dlcihFVkVOVF9BQ1RJVkVfU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUmVhZG9ubHlTdGF0ZSA9ICh0YXJnZXQsIHJlYWRvbmx5LCBpbml0aWFsID0gZmFsc2UpID0+IHtcclxuXHQvL2NvbnNvbGUubG9nKFwidXBkYXRlUmVhZG9ubHlTdGF0ZVwiLCB7dGFyZ2V0LCByZWFkb25seX0pXHJcblx0Y29uc3Qgb2xkU3RhdGUgPSB0YXJnZXQucmVhZG9ubHk7XHJcblx0aWYgKHJlYWRvbmx5KSBcclxuXHRcdHRhcmdldC5hdHRyKEFUVFJJQlVURV9SRUFET05MWSwgXCJcIik7XHJcblx0ZWxzZVxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX1JFQURPTkxZLCBudWxsKTtcclxuXHRcclxuXHRpZiAob2xkU3RhdGUgIT0gcmVhZG9ubHkgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfUkVBRE9OTFlfU1RBVEVfQ0hBTkdFRCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlRWRpdGFibGVTdGF0ZSA9ICh0YXJnZXQsIGVkaXRhYmxlLCBpbml0aWFsID0gZmFsc2UpID0+IHtcclxuXHRjb25zdCBvbGRTdGF0ZSA9IHRhcmdldC5lZGl0YWJsZTtcclxuXHRpZiAoZWRpdGFibGUpIFxyXG5cdFx0dGFyZ2V0LmF0dHIoQVRUUklCVVRFX0VESVRBQkxFLCBcIlwiKTtcclxuXHRlbHNlXHJcblx0XHR0YXJnZXQuYXR0cihBVFRSSUJVVEVfRURJVEFCTEUsIG51bGwpO1xyXG5cclxuXHRpZiAob2xkU3RhdGUgIT0gZWRpdGFibGUgfHwgaW5pdGlhbCkgdGFyZ2V0LnRyaWdnZXIoRVZFTlRfRURJVEFCTEVfU1RBVEVfQ0hBTkdFRCk7XHJcbn07IiwiaW1wb3J0IHsgdHJlZUZpbHRlciB9IGZyb20gXCIuL05vZGVIZWxwZXIuanNcIjtcclxuaW1wb3J0IFZhbGlkYXRpb24gZnJvbSBcIi4uL1ZhbGlkYXRpb25cIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL0Jhc2VcIjtcclxuaW1wb3J0IHsgQVRUUklCVVRFX0ZPUiB9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IGFzeW5jIChkYXRhLCBmaWVsZHMpID0+IHtcclxuICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoZmllbGRzLm1hcChmaWVsZCA9PiBmaWVsZC52YWxpZGF0ZShkYXRhKSkpKVxyXG4gICAgICAgIC5yZWR1Y2UoKHZhbGlkLCBmaWVsZFZhbGlkKSA9PiB2YWxpZCA/IGZpZWxkVmFsaWQ6IGZhbHNlLCB0cnVlKTtcclxufVxyXG5cclxuLyoqIFxyXG4gKiBAZnVuY3Rpb24gZmluZFZhbGlkYXRpb25zXHJcbiAqIFxyXG4gKiBGaW5kIGFsbCB2YWxpZGF0aW9ucyBvZiByb290IGFzIGNoaWxkcmVuIG9uIGRvbSB0cmVlXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0Jhc2V9IHJvb3QgXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7QXJyYXk8VmFsaWRhdGlvbj59XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZmluZFZhbGlkYXRpb25zID0gKHJvb3QpID0+IHtcclxuXHRyZXR1cm4gdHJlZUZpbHRlcih7XHJcblx0XHRyb290LFxyXG5cdFx0ZmlsdGVyOiAoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRpZiAocm9vdCAhPSBlbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4geyBhY2NlcHQ6IGZhbHNlLCBzdG9wOiB0cnVlIH07XHJcblx0XHRcdFx0ZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFZhbGlkYXRpb24gJiYgZWxlbWVudC5hdHRyKEFUVFJJQlVURV9GT1IpID09IG51bGwpIHJldHVybiB7IGFjY2VwdDogdHJ1ZSwgc3RvcDogdHJ1ZSB9O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB7IGFjY2VwdDogZmFsc2UgfTtcclxuXHRcdH0sXHJcblx0fSk7XHJcbn07IiwiaW1wb3J0IHsgbm9WYWx1ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9WYWx1ZUhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGFJc05vVmFsdWUgPSAodmFsdWUpID0+IHsgICAgXHJcbiAgICBpZihub1ZhbHVlKHZhbHVlKSApXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuICAgIGlmKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgIHZhbHVlLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgaWYodmFsdWUgaW5zdGFuY2VvZiBTZXQgJiYgIHZhbHVlLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgaWYodmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgIHZhbHVlLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgaWYodHlwZSA9PSBcIm9iamVjdFwiICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59IiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfRklFTERfSU5QVVQsXHJcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XHJcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcclxuXHRcdHJldHVybiBpbnB1dC5sZW5ndGggPT0gMSA/IGlucHV0LmZpcnN0KCkgOiBpbnB1dDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcclxuXHRcdHRoaXMubXVsdGlwbGUgPSBpbnB1dCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xyXG5cdFx0aW5wdXQub24oXHJcblx0XHRcdFwiaW5wdXRcIixcclxuXHRcdFx0dG9UaW1lb3V0SGFuZGxlKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFsc2UsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRFVkVOVEhBTkRMRV9JTlBVVF9USU1FT1VUXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblxyXG5cdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xyXG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XHJcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcclxuXHRcdHZhbHVlLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcblx0XHRcdHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZXM7XHJcblx0fVxyXG5cclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdGlmICh0aGlzLm11bHRpcGxlKSB7XHJcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGl0ZW0pID0+ICEhaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcclxuXHRcdGVsc2V7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFxuXHRFVkVOVF9GSUVMRF9JTlBVVFxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcbmltcG9ydCB7IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eVwiO1xuXG5jb25zdCBfdmFsdWUgPSBwcml2YXRlUHJvcGVydHlBY2Nlc3NvcihcInZhbHVlXCIpO1xuXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJmaWxlXCJdJztcblxuY29uc3QgcmVhZEZpbGUgPSAoZmlsZSwgcmVhZEZuTmFtZSkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0cmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsICgpID0+IHtcblx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRuYW1lOiBmaWxlLm5hbWUsXG5cdFx0XHRcdHR5cGU6IGZpbGUudHlwZSxcblx0XHRcdFx0c2l6ZTogZmlsZS5zaXplLFxuXHRcdFx0XHRkYXRhOiByZWFkZXIucmVzdWx0XG5cdFx0XHR9KTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0cmVhZGVyW3JlYWRGbk5hbWVdKGZpbGUpO1xuXHR9KTtcbn07XG5cbi8vcmVhZEFzRGF0YVVSTFxuXG5jb25zdCBGT1JNQVQgPSB7XG5cdFwiZm9ybS1pbnB1dFwiOiBhc3luYyAoZmlsZSkgPT4ge1xuXHRcdGZpbGUuZm9ybWF0ID0gXCJmb3JtLWlucHV0XCI7XG5cdFx0cmV0dXJuIGZpbGU7XG5cdH0sXG5cdFwiZGF0YS11cmwtYmFzZTY0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xuXHRcdHJlc3VsdC5mb3JtYXQgPSBcImRhdGEtdXJsLWJhc2U2NFwiO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cdFwiYmFzZTY0XCI6IGFzeW5jIChmaWxlKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZEZpbGUoZmlsZSwgXCJyZWFkQXNEYXRhVVJMXCIpO1xuXHRcdHJlc3VsdC5kYXRhID0gcmVzdWx0LmRhdGEuc3Vic3RyKHJlc3VsdC5kYXRhLmluZGV4T2YoXCIsXCIpICsgMSk7XG5cdFx0cmVzdWx0LmZvcm1hdCA9IFwiYmFzZTY0XCI7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufTtcblxuY29uc3QgcmVhZEZpbGVzID0gYXN5bmMgKGZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSA9PiB7XG5cdGxldCByZXN1bHQgPSBbXTtcblx0Zm9yIChsZXQgZmlsZSBvZiBmaWxlcylcblx0XHRyZXN1bHQucHVzaChhd2FpdCBGT1JNQVRbZm9ybWF0XShmaWxlKSk7XG5cblx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMClcblx0XHRyZXR1cm4gbnVsbDtcblxuXG5cdHJldHVybiBtdWx0aXBsZSA/IHJlc3VsdCA6IHJlc3VsdFswXTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlIGV4dGVuZHMgV3JhcHBlciB7XG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcblx0XHRyZXR1cm4gZmllbGQuZmluZChJTlBVVFNFTEVDVE9SKS5maXJzdCgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0Y29uc3QgeyBmaWVsZCwgaW5wdXQgfSA9IHRoaXM7XG5cdFx0dGhpcy5tdWx0aXBsZSA9IGlucHV0Lm11bHRpcGxlO1xuXHRcdHRoaXMuZm9ybWF0ID0gZmllbGQuYXR0cihcImZpbGUtZm9ybWF0XCIpIHx8IFwiZm9ybS1pbnB1dFwiO1xuXHRcdHRoaXMuZmlsZW5hbWVUYXJnZXQgPSBmaWVsZC5hdHRyKFwiZmlsZS1uYW1lLXRhcmdldFwiKTtcblx0XHR0aGlzLmZpbGVuYW1lVGFyZ2V0ID0gdGhpcy5maWxlbmFtZVRhcmdldCA/IGZpZWxkLmZpbmQodGhpcy5maWxlbmFtZVRhcmdldCkuZmlyc3QoKSA6IG51bGw7XG5cdFx0Y29uc3QgeyBmb3JtYXQsIG11bHRpcGxlIH0gPSB0aGlzO1xuXG5cdFx0aW5wdXQub24oXG5cdFx0XHRcImlucHV0XCIsXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXG5cdFx0XHRcdGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZWRWYWx1ZShhd2FpdCByZWFkRmlsZXMoaW5wdXQuZmlsZXMsIGZvcm1hdCwgbXVsdGlwbGUpKTtcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdHRydWVcblx0XHRcdClcblx0XHQpO1xuXG5cdFx0aWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCAhPSAwKVxuXHRcdFx0dGhpcy51cGRhdGVkVmFsdWUoYXdhaXQgcmVhZEZpbGVzKGlucHV0LmZpbGVzLCBmb3JtYXQsIG11bHRpcGxlKSk7XG5cblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcblx0fTtcblxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcblx0XHR0aGlzLmlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCByZWFkb25seSA/IFwiXCIgOiBudWxsKTtcblx0fVxuXG5cdGFjY2VwdFZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBpZiAodGhpcy5tdWx0aXBsZSlcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5O1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgID09PSBcIm9iamVjdFwiO1xuXHR9XG5cblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRlbHNlIGlmICh0aGlzLm11bHRpcGxlKVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCAhPSAwID8gdmFsdWUgOiBudWxsO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xuXHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IF92YWx1ZSh0aGlzKTtcblx0XHRpZiAodmFsdWUgIT0gY3VycmVudFZhbHVlKSB7XG5cdFx0XHRfdmFsdWUodGhpcywgdmFsdWUpXG5cdFx0XHRpZighdmFsdWUpXHRcdFx0XG5cdFx0XHRcdHRoaXMuaW5wdXQudmFsdWUgPSBudWxsO1xuXG5cdFx0XHRjb25zdCBmaWxlbmFtZSA9IHRoaXMuZmlsZW5hbWVUYXJnZXQ7XG5cdFx0XHRpZiAoZmlsZW5hbWUpIHtcblx0XHRcdFx0ZmlsZW5hbWUuZW1wdHkoKTtcblx0XHRcdFx0aWYodmFsdWUpe1xuXHRcdFx0XHRcdGlmICh0aGlzLm11bHRpcGxlKSB7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBmaWxlIG9mIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGVuYW1lLmFwcGVuZChgPHNwYW4+JHtmaWxlLm5hbWV9PC9zcGFuPmApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRmaWxlbmFtZS5hcHBlbmQoYDxzcGFuPiR7dmFsdWUubmFtZX08L3NwYW4+YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fVxuXG5cdGdldCB2YWx1ZSgpIHtcblx0XHRyZXR1cm4gX3ZhbHVlKHRoaXMpO1xuXHR9XG5cblx0Z2V0IHZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLmlucHV0LmNoZWNrVmFsaWRpdHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgXHJcblx0RVZFTlRfRklFTERfSU5QVVQsXHJcblx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVCBcclxufSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHRvVGltZW91dEhhbmRsZSB9IGZyb20gXCIuLi91dGlscy9FdmVudEhlbHBlclwiO1xyXG5pbXBvcnQgV3JhcHBlciBmcm9tIFwiLi9XcmFwcGVyXCI7XHJcblxyXG5jb25zdCBJTlBVVFNFTEVDVE9SID0gJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSc7XHJcblxyXG5jb25zdCBnZXRSYW5kb21JbnQgPSAoKSA9PiB7XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8gZXh0ZW5kcyBXcmFwcGVyIHtcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKSB7XHJcblx0XHRjb25zdCBpbnB1dCA9IGZpZWxkLmZpbmQoSU5QVVRTRUxFQ1RPUik7XHJcblx0XHRpZiAoaW5wdXQubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiBpbnB1dDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZpZWxkLCBpbnB1dCkge1xyXG5cdFx0c3VwZXIoZmllbGQsIGlucHV0KTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcclxuXHRcdGNvbnN0IG5hbWUgPSBmaWVsZC5uYW1lICsgZ2V0UmFuZG9tSW50KCk7XHJcblx0XHRmb3IgKGxldCByYWRpbyBvZiBpbnB1dCkgcmFkaW8ubmFtZSA9IG5hbWU7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVRcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHJcblx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLm5vcm1hbGl6ZVZhbHVlKHRoaXMudmFsdWUpKTtcclxuXHR9XHJcblxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbCgpO1xyXG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gdmFsdWU7XHJcblx0XHRpZiAodmFsdWUuc2l6ZSA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHRcdHJldHVybiB2YWx1ZS52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XHJcblx0fVxyXG5cclxuXHRub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRhY2NlcHRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2V7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdHJldHVybiB0eXBlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogbnVsbCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFxyXG5cdEVWRU5UX0ZJRUxEX0lOUFVULFxyXG5cdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgXHJcbn0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyB0b1RpbWVvdXRIYW5kbGUgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuY29uc3QgSU5QVVRTRUxFQ1RPUiA9ICdzZWxlY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHRcdFxyXG5cdH1cclxuXHJcblx0XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCB7IGZpZWxkLCBpbnB1dCB9ID0gdGhpcztcclxuXHRcdGlucHV0Lm9uKFxyXG5cdFx0XHRcImlucHV0LCBjaGFuZ2VkXCIsXHJcblx0XHRcdHRvVGltZW91dEhhbmRsZShcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRmaWVsZC50cmlnZ2VyKEVWRU5UX0ZJRUxEX0lOUFVULCB0aGlzLnZhbHVlKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0RVZFTlRIQU5ETEVfSU5QVVRfVElNRU9VVFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy52YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy5pbnB1dC5tdWx0aXBsZSA/IHRoaXMuaW5wdXQudmFsKCkgOiB0aGlzLmlucHV0LnZhbHVlKTtcclxuXHR9XHJcblx0XHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRpZih0aGlzLmlucHV0Lm11bHRpcGxlKXtcclxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGggPiAwKTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XHJcblx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoICE9IDAgPyB2YWx1ZSA6IG51bGw7XHRcclxuXHRcdFx0fVx0XHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGlmICh0aGlzLmlucHV0Lm11bHRpcGxlKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBcnJheTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZWRWYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gIHRoaXMuaW5wdXQudmFsKCk7XHJcblx0XHRpZiAodGhpcy5maWVsZC52YWx1ZSAhPSB0aGlzLnZhbHVlKVxyXG5cdFx0XHR0aGlzLmlucHV0LnZhbCh2YWx1ZSA/IHZhbHVlIDogY3VycmVudFZhbHVlKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgRVZFTlRfRklFTERfSU5QVVQsIEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IG5vVmFsdWUgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVmFsdWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgdG9UaW1lb3V0SGFuZGxlIH0gZnJvbSBcIi4uL3V0aWxzL0V2ZW50SGVscGVyXCI7XHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IElOUFVUU0VMRUNUT1IgPSAnaW5wdXQ6bm90KFt0eXBlPVwiZmlsZVwiXSxbdHlwZT1cInJhZGlvXCJdLFt0eXBlPVwiY2hlY2tib3hcIl0sW3R5cGU9XCJidXR0b25cIl0sW3R5cGU9XCJzdWJtaXRcIl0sW3R5cGU9XCJyZXNldFwiXSksaW5wdXQ6bm90KFt0eXBlXSksIHRleHRhcmVhJztcclxuXHJcbmNvbnN0IERFRkFVTFRUWVBFID0gXCJ0ZXh0XCI7XHJcblxyXG5jb25zdCB0ZXh0ID0gKGlucHV0KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGFjY2VwdDogKHZhbHVlKSA9PiB7XHJcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmFsdWU6ICgpID0+IHtcclxuXHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIChpbnB1dC52YWx1ZSA9IHZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRub3JtYWxpemU6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbmNvbnN0IG51bWJlciA9IChpbnB1dCkgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHRhY2NlcHQ6ICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzTnVtYmVyO1xyXG5cdFx0fSxcclxuXHRcdHNldFZhbHVlOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aW5wdXQudmFsdWVBc051bWJlciA9IHZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICghbm9WYWx1ZSh2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkpIHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59O1xyXG5cclxuY29uc3QgZGF0ZXRpbWUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNEYXRlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IGRhdGUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSxcclxuXHRcdGdldFZhbHVlOiAoKSA9PiB7XHJcblx0XHRcdHJldHVybiBpbnB1dC52YWx1ZUFzRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlQXNEYXRlID0gdmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0bm9ybWFsaXplOiAodmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlKSByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH0sXHJcblx0fTtcclxufTtcclxuXHJcbmNvbnN0IFRJTUVGT1JNQVQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImRlZmF1bHRcIiwgIHtcclxuICBob3VyOiBcIm51bWVyaWNcIixcclxuICBtaW51dGU6IFwibnVtZXJpY1wiXHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHRpbWUgPSAoaW5wdXQpID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YWNjZXB0OiAodmFsdWUpID0+IHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZTogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaW5wdXQudmFsdWUgPyBuZXcgRGF0ZShgMTk3MC0wMS0wMVQke2lucHV0LnZhbHVlfWApIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRzZXRWYWx1ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlucHV0LnZhbHVlID0gVElNRUZPUk1BVC5mb3JtYXQodmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdG5vcm1hbGl6ZTogKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH07XHJcbn07XHJcbmNvbnN0IFRZUEVTID0geyB0ZXh0LCBudW1iZXIsIGRhdGV0aW1lOmRhdGUsIFwiZGF0ZXRpbWUtbG9jYWxcIjogZGF0ZSwgZGF0ZSwgdGltZSwgcmFuZ2U6IG51bWJlciB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIFdyYXBwZXIge1xyXG5cdHN0YXRpYyBmaW5kSW5wdXQoZmllbGQpIHtcclxuXHRcdHJldHVybiBmaWVsZC5maW5kKElOUFVUU0VMRUNUT1IpLmZpcnN0KCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihmaWVsZCwgaW5wdXQpIHtcclxuXHRcdHN1cGVyKGZpZWxkLCBpbnB1dCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1x0XHRcclxuXHRcdGNvbnN0IHsgZmllbGQsIGlucHV0IH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgdHlwZSA9IChmaWVsZC5hdHRyKFwiaW5wdXQtdHlwZVwiKSB8fCBpbnB1dC5hdHRyKFwidHlwZVwiKSB8fCBERUZBVUxUVFlQRSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR0aGlzLnR5cGUgPSAoVFlQRVNbdHlwZV0gfHwgVFlQRVNbREVGQVVMVFRZUEVdKShpbnB1dCk7XHJcblx0XHRpbnB1dC5vbihcclxuXHRcdFx0XCJpbnB1dFwiLFxyXG5cdFx0XHR0b1RpbWVvdXRIYW5kbGUoXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0ZmllbGQudHJpZ2dlcihFVkVOVF9GSUVMRF9JTlBVVCwgdGhpcy5ub3JtYWxpemVWYWx1ZSh0aGlzLnZhbHVlKSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWxzZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdEVWRU5USEFORExFX0lOUFVUX1RJTUVPVVQsXHJcblx0XHRcdCksXHJcblx0XHQpO1xyXG5cclxuXHRcdGZpZWxkLnRyaWdnZXIoRVZFTlRfRklFTERfSU5QVVQsIHRoaXMubm9ybWFsaXplVmFsdWUodGhpcy52YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0YWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5hY2NlcHQodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0bm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5ub3JtYWxpemUodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlZFZhbHVlKHZhbHVlKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnR5cGUuZ2V0VmFsdWUoKTtcclxuXHRcdGlmICh2YWx1ZSAhPSBjdXJyZW50VmFsdWUpIHRoaXMudHlwZS5zZXRWYWx1ZSh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRzZXQgcmVhZG9ubHkocmVhZG9ubHkpIHtcclxuXHRcdHRoaXMuaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIHJlYWRvbmx5ID8gXCJcIiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudHlwZS5nZXRWYWx1ZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5wdXQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgRmllbGQgZnJvbSBcIi4uL0ZpZWxkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIHtcclxuXHRcclxuXHRzdGF0aWMgZmluZElucHV0KGZpZWxkKXsgcmV0dXJuIG51bGw7fVxyXG5cdFxyXG5cdCNkZWZhdWx0VmFsdWU7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoZmllbGQsIGlucHV0KSB7XHJcblx0XHR0aGlzLmZpZWxkID0gZmllbGQ7XHJcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7IH1cclxuXHJcblx0c2V0IHJlYWRvbmx5KGRpc2FibGVkKSB7IH1cclxuXHJcblx0YXN5bmMgYWNjZXB0VmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZWRWYWx1ZSgpIHtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbGlkKCl7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IFRleHQgZnJvbSBcIi4vVGV4dFwiO1xuaW1wb3J0IENoZWNrYm94IGZyb20gXCIuL0NoZWNrYm94XCI7XG5pbXBvcnQgUmFkaW8gZnJvbSBcIi4vUmFkaW9cIjtcbmltcG9ydCBGaWxlIGZyb20gXCIuL0ZpbGVcIjtcbmltcG9ydCBTZWxlY3QgZnJvbSBcIi4vU2VsZWN0XCI7XG5cbmV4cG9ydCBjb25zdCB3cmFwcGVycyA9IFtUZXh0LCBDaGVja2JveCwgUmFkaW8sIEZpbGUsIFNlbGVjdF07XG5cbmV4cG9ydCBjb25zdCBmaW5kV3JhcHBlciA9IChmaWVsZCkgPT4ge1xuXHRmb3IgKGxldCB3cmFwcGVyIG9mIHdyYXBwZXJzKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSB3cmFwcGVyLmZpbmRJbnB1dChmaWVsZCk7XG5cdFx0aWYgKGlucHV0KSByZXR1cm4gbmV3IHdyYXBwZXIoZmllbGQsIGlucHV0KTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb21cIjtcbmltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbFwiO1xuaW1wb3J0IHsgRm9ybSwgUGFnZSwgQmFzZUZpZWxkLCBGaWVsZCwgTGlzdCwgQ29udGFpbmVyLCBCYXNlU3VibWl0QWN0aW9uLCBTdWJtaXRBY3Rpb25SZXN1bHQgfSBmcm9tIFwiLi9pbmRleFwiO1xuXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcbkdMT0JBTC5kZWZhdWx0anMuaHRtbCA9IEdMT0JBTC5kZWZhdWx0anMuaHRtbCB8fCB7fTtcbkdMT0JBTC5kZWZhdWx0anMuaHRtbC5mb3JtID0gR0xPQkFMLmRlZmF1bHRqcy5odG1sLmZvcm0gfHwge1xuXHRWRVJTSU9OOiBcIiR7dmVyc2lvbn1cIixcblx0Rm9ybSxcblx0UGFnZSxcblx0QmFzZUZpZWxkLFxuXHRGaWVsZCxcblx0Q29udGFpbmVyLFxuXHRMaXN0LFxuXHRCYXNlU3VibWl0QWN0aW9uLFxuXHRTdWJtaXRBY3Rpb25SZXN1bHQsXG59O1xuXG5leHBvcnQgeyBGb3JtLCBQYWdlLCBCYXNlRmllbGQsIEZpZWxkLCBDb250YWluZXIsIExpc3QsIEJhc2VTdWJtaXRBY3Rpb24sIFN1Ym1pdEFjdGlvblJlc3VsdCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9