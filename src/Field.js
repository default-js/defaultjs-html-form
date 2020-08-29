import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import BaseField from "./BaseField";
import { findWrapper } from "./wrapper";

const ATTRIBUTES = ["file-format"];

class Field extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
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
		this.validator.addCustomCheck(async () => {
			return this.wrapper.valid;
		});
	}

	readonlyUpdated() {
		if (this.wrapper)
			this.wrapper.readonly = this.readonly;
	}

	acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	normalizeValue(value) {
		if (this.wrapper)
			return this.wrapper.normalizeValue(value);

		return value;
	}

	updatedValue(value) {
		if (this.wrapper)
			this.wrapper.updatedValue(value);
	}
}

customElements.define(NODENAMES.Field, Field);
export default Field;
