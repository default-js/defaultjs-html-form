import { NODENAMES, EVENT_FIELD_INITIALIZED, EVENT_VALUE_CHANGED } from "./Constants";
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
	#fields = [];

	constructor(value = null) {
		super(value);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#fields = findFields(this);
			this.on(EVENT_FIELD_INITIALIZED, (event) => {
				const field = event.target;
				if (field != this) {
					if (field instanceof BaseField) {
						if (this.#fields.indexOf(field) < 0) {
							this.#fields.push(field);
							refreshValue(this, this.#fields);
						}
					}

					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.addValidation(async ({ data, base }) => {
				const { fields } = base;
				if (fields) {
					const length = fields.length;
					for (let i = 0; i < length; i++) {
						const field = fields[i];
						if (field.condition && !field.valid) return false;
					}
				}

				return true;
			});
			this.#initialized = true;
		}
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
		const fields = this.#fields;
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
