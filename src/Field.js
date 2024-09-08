import { 
	NODENAME_FIELD, 
	EVENT_FIELD_INPUT 
} from "./Constants";
import BaseField from "./BaseField";
import { findWrapper } from "./wrapper";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = ["file-format"];

class Field extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAME_FIELD;
	}

	#initialized = false;
	#wrapper;

	constructor(options) {
		super(options);
		this.on(EVENT_FIELD_INPUT, (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.publishValue(event.detail || null);
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.#wrapper = findWrapper(this);
			if (this.#wrapper){
				this.addValidation(async () => this.#wrapper.valid);
				this.publishValue(this.#wrapper.value);
			}
		}
	}

	readonlyUpdated() {
		if (this.#wrapper) this.#wrapper.readonly = this.readonly;
	}

	async acceptValue(value) {
		return this.#wrapper ? this.#wrapper.acceptValue(value) : false;
	}

	async normalizeValue(value) {
		if (this.#wrapper) return this.#wrapper.normalizeValue(value);

		return value;
	}

	async updatedValue(value) {
		await this.ready;
		value = await value;
		const wrapper = this.#wrapper;
		if (wrapper){
			const current = wrapper.value || null;
			if(current != value)
				await wrapper.updatedValue(value);
			
			await super.updatedValue(wrapper.value);
		}
	}

	async validationStateChanged(conditionChange, validationChanged){		
		if(conditionChange && this.condition){			
			const wrapper = this.#wrapper;
			const value = wrapper.value || null;
			//console.log(`validationStateChanged(${this.name} (${conditionChange}, ${validationChanged}) -> ${value}`)
			this.rawValue(value);
		}
		
		return super.validationStateChanged(conditionChange, validationChanged);
	}
}

define(Field);
export default Field;
