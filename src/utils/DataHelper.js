import { SPECIALVARS, NODENAME_LIST_ROW } from "../Constants";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";

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


export const updateData = async (data, name, value) => {
	if (!noValue(value)) {
		if (name) valueHelper(data, name, value);
		else data = mergeDeep(data, value);
	}
	return data;
};

export const fieldValueMapToObject = async (map, fieldOrder) => {	
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

export const rebuildDataByFields = async (fields) => {
	let data = {};
	for (let field of fields) {
		const value = await field.value();
		if (!noValue(value)) {
			const name = field.name;
			data = await updateData(data, name, value);
		}
	}
	return data;
};

export const evaluationData = async (base) => {
	await base.ready;
	const data = {};
	data[SPECIALVARS.CURRENTVALUE] = await base.rawValue();

	let row = base.parent(NODENAME_LIST_ROW);
	let temp = data;
	while (row) {
		temp[SPECIALVARS.CURRENTLISTROW] = await row.rawValue();
		temp = temp[SPECIALVARS.CURRENTLISTROW];
		row = row.parent(NODENAME_LIST_ROW);
	}

	return data;
};

const NAME_SPLITTER = /\./g;
export const valueHelper = function (data, name, value) {
	const names = name.split(NAME_SPLITTER);
	if (arguments.length == 2) return getValue(data, names);

	const del = noValue(value);
	if (noValue(data) && del) return data;

	return setValue(del, data, value, names);
};

const setValue = (remove, data, value, names) => {
	if (noValue(data) && remove) return null;
	
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
	if (noValue(data)) return null;
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
export const addAllToArray = (aTarget, aSource) => {
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
export const addAllToSet = (aTarget, aSource) => {
	if (aSource != null) {
		for (let source of aSource){
			aTarget.add(source);
		}
	}

	return aTarget;
};
