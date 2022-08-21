import { NODENAMES, EVENT_FIELD_INPUT } from "./Constants";
import BaseField from "./BaseField";
import { findWrapper } from "./wrapper";
import defineElement from "./utils/DefineElement";

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
			const value = event.detail ? event.detail : null;
			(async () => {
				const current = await this.value();				
				if (current != value) this.value(value);
			})();
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.wrapper = findWrapper(this);
			if (this.wrapper)
				this.validator.addCustomCheck(async () => {
					return this.wrapper.valid;
				});
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
		if (this.wrapper) await this.wrapper.updatedValue(value);
	}
}

defineElement(Field);
export default Field;
