import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
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

	constructor() {
		super();
		this.__valueChanged__ = true;
		this.on(EVENTS.input, (event) => {
			console.log("field input", event);
			event.preventDefault();
			event.stopPropagation();

			const value = event.detail ? event.detail : null;
			const valueChanged = !this.__valueChanged__ ? this.__value__ != value :  true;
			if (valueChanged) {
				console.log("field input value changed");
				this.__valueChanged__ = valueChanged;
				this.__value__ = value;
				(async () => {
					await this.validate();
					await this.publishValue();
				})();
			}
		});
	}

	async init() {
		await super.init();
		const ready = this.ready;
		if (!ready.resolved) {
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
		this.__valueChanged__ = true;
		if (this.wrapper) await this.wrapper.updatedValue(value);
	}

	async publishValue(chain = []) {
		if (this.__valueChanged__) {
			this.__valueChanged__ = false;
			await super.publishValue(chain);
		}
	}
}

defineElement(Field);
export default Field;
