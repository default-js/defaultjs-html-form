import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import BaseField from "./BaseField";
import { findWrapper } from "./wrapper";
import defineElement from "./utils/DefineElement";

const ATTRIBUTES = ["file-format"];

class Field extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME(){
		return NODENAMES.Field;
	}

	constructor() {
		super();
	}

	async init() {
		await this.initField();
	}

	async initField() {
		await this.initBaseField();
		this.wrapper = findWrapper(this);
		if (this.wrapper)
			this.validator.addCustomCheck(async () => {
				return this.wrapper.valid;
			});
	}

	readonlyUpdated() {
		if (this.wrapper) this.wrapper.readonly = this.readonly;
	}

	acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	normalizeValue(value) {
		if (this.wrapper) return this.wrapper.normalizeValue(value);

		return value;
	}

	updatedValue(value) {
		if (this.wrapper) this.wrapper.updatedValue(value);
	}
}

defineElement(Field);
export default Field;
