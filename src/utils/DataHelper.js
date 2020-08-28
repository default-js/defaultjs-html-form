import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { SPECIALVARS, NODENAMES } from "../Constants"

export const evaluationData = (base) => {
	const data = {};
	data[SPECIALVARS.CURRENTVALUE] = base.value;

	let row = base.parent(NODENAMES.ListRow);
	let temp = data;
	while (row) {
		temp[SPECIALVARS.CURRENTLISTROW] = row.value
		temp = temp[SPECIALVARS.CURRENTLISTROW];
		row = row.parent(NODENAMES.ListRow);
	}

	return ObjectUtils.merge( data,base.form.data);
}