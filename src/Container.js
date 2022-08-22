import { NODENAMES, EVENT_FIELD_INITIALIZED, EVENT_FIELD_REMOVED } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import BaseField, { _value } from "./BaseField";
import defineElement from "./utils/DefineElement";
import { valueHelper } from "./utils/DataHelper";

const ATTRIBUTES = [];

const refreshValue = async (self, fields) => {
	const data = {};

	for (let field of fields) {
		if (field.condition && field.hasValue) {
			const name = field.name;
			const value = await field.value();
			if (name) valueHelper(data, name, value);
			else Object.assign(data, value);
		}
	}

	if (Object.getOwnPropertyNames(data).length > 0) _value(self, data);
	else _value(self, null);
};

class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Container;
	}

	#initialized = false;
	#fields = new Set();

	constructor(value = null) {
		super(value);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			findFields(this).forEach(field => this.#fields.add(field));			
			this.on(EVENT_FIELD_INITIALIZED, (event) => {
				const field = event.target;
				if (field != this) {
					if (field instanceof BaseField) {
						this.#fields.add(field);
						refreshValue(this, this.fields);
					}
					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.on(EVENT_FIELD_REMOVED, (event) => {
				const field = event.target;
				if (field != this) {
					if (field instanceof BaseField) {
						this.#fields.delete(field)
						refreshValue(this, this.#fields);
					}

					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.addValidation(async ({ data }) => {
				const fields = this.#fields;
				const valid = true;
				for (let field of fields)
					if (!field.validate(data)) valid = false;

				return valid;
			});

			await refreshValue(this, this.fields);
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

			await refreshValue(this, this.#fields);
		}
	}

	async childValueChanged(field, value) {
		await this.ready;
		await refreshValue(this, this.#fields);
		await super.childValueChanged(field, value);

		await this.publishValue();
	}
}

defineElement(Container);
export default Container;
