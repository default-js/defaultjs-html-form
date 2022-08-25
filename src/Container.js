import { NODENAMES, EVENT_FIELD_INITIALIZED, EVENT_FIELD_REMOVED } from "./Constants";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { findFields } from "./utils/NodeHelper";
import BaseField, { _value } from "./BaseField";
import { define } from "@default-js/defaultjs-html-components";
import { valueHelper, updateData, rebuildDataByFields, fieldValueMapToObject } from "./utils/DataHelper";
import { validateFields } from "./utils/ValidationHelper";



const ATTRIBUTES = [];
class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Container;
	}

	#initialized = false;
	#fields = new Set();
	#value = new Map();

	constructor(value = null) {
		super(value);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			findFields(this).forEach((field) => this.#fields.add(field));
			this.on(EVENT_FIELD_INITIALIZED, (event) => {
				const field = event.target;
				if (field != this) {
					if (field instanceof BaseField) {
						this.#fields.add(field);
					}
					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.on(EVENT_FIELD_REMOVED, (event) => {
				const field = event.target;
				if (field != this) {
					if (field instanceof BaseField) {
						this.#fields.delete(field);
						this.childValueChanged(field, null);
					}

					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.addValidation(async ({ data }) =>	await validateFields(data, this.fields));

			this.#initialized = true;
		}
	}

	get fields() {
		return Array.from(this.#fields);
	}

	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	async updatedValue(value) {
		await this.ready;
		const fields = this.fields;
		if (fields) {
			for (let field of fields) {
				if (field.name) await field.value(valueHelper(value, field.name));
				else if (field instanceof Container) await field.value(value);
			}
		}
	}

	async childValueChanged(field, value) {
		console.log(`${this.nodeName}.childValueChanged:`, {field, value});
		await this.ready;
		const map = this.#value;
		if (field) {
			if (noValue(value)) map.delete(field);
			else map.set(field, value);
		
		}
		let data = await fieldValueMapToObject(map);
		if (Object.getOwnPropertyNames(data).length == 0) data = null;

		await super.childValueChanged(field, value);
		await this.publishValue(data);
	}
}

define(Container);
export default Container;
