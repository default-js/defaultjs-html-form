import { NODENAMES, EVENT_FIELD_INPUT } from "./Constants";
import BaseField, {_value} from "./BaseField";
import { findWrapper } from "./wrapper";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = ["file-format"];

class Field extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Field;
	}

	#initialized = false;

	constructor(value = null) {
		super(value);
		this.on(EVENT_FIELD_INPUT, (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.publishValue(event.detail);
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.wrapper = findWrapper(this);
			if (this.wrapper)
				this.addValidation(async () => this.wrapper.valid);
		}
	}

	readonlyUpdated() {
		if (this.wrapper) this.wrapper.readonly = this.readonly;
	}

	async acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	async normalizeValue(value) {
		if (this.wrapper) return this.wrapper.normalizeValue(value);

		return value;
	}

	async updatedValue(value) {
		await this.ready;
		if (this.wrapper){
			const current = await this.wrapper.value();
			if(current != value)
				await this.wrapper.updatedValue(value);
		}
		await super.updateValue(value);
	}
}

define(Field);
export default Field;
