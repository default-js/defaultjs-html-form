import { 
	SPECIALVARS, 
	NODENAME_LIST_ROW 
} from "../Constants";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { _value } from "../BaseField";

export const updateData = async (data, name, value) => {
	if (!noValue(value)) {
		if (name) valueHelper(data, name, value);
		else Object.assign(data, value);
	}
	return data;
};

export const fieldValueMapToObject = async (map) => {
	let data = {};
	for (let [{ name }, value] of map) data = await updateData(data, name, value);

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
	data[SPECIALVARS.CURRENTVALUE] = _value(base);

	let row = base.parent(NODENAME_LIST_ROW);
	let temp = data;
	while (row) {
		temp[SPECIALVARS.CURRENTLISTROW] = await _value(row);
		temp = temp[SPECIALVARS.CURRENTLISTROW];
		row = row.parent(NODENAME_LIST_ROW);
	}

	return data;
};

const NAME_SPLITTER = /\./g;
export const valueHelper = function (data, name, value) {
	const update = arguments.length > 2;
	if (!update && noValue(data)) return null;

	const names = name.split(NAME_SPLITTER);
	if (value == null || typeof value === "undefined") {
		delete data[names[0]];
		return null;
	}

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
