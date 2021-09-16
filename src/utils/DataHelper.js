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
}