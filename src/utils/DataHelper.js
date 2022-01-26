import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { SPECIALVARS, NODENAMES } from "../Constants"

export const evaluationData = async (base) => {
	await base.ready;
	const data = {};
	data[SPECIALVARS.CURRENTVALUE] = await base.value();

	let row = base.parent(NODENAMES.ListRow);
	let temp = data;
	while (row) {
		temp[SPECIALVARS.CURRENTLISTROW] = await row.value();
		temp = temp[SPECIALVARS.CURRENTLISTROW];
		row = row.parent(NODENAMES.ListRow);
	}
	
	return ObjectUtils.merge( data, await base.form.value());
};

const NAME_SPLITTER = /\./g;
export const valueHelper = function (data, name, value) {
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