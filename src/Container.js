import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import BaseField from "./BaseField";

const ATTRIBUTES = [];

class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	constructor(value = null) {
		super(value ? value : {});
		this.fields = [];

		this.on(EVENTS.valueChanged,
			(event) => {
				if (event.target != this) {
					const { name, value } = event.target;
					
					if (name)
						this.__value__[name] = value
					else if (value != null)
						ObjectUtils.merge(this.__value__, value);

					this.validate();
					this.publishValue(event.detail[0]);

					event.preventDefault();
					event.stopPropagation();
				}
			}
		);
	}

	async init() {
		await this.initContainer();
	}

	async initContainer() {
		await this.initBaseField();

		this.fields = findFields(this);
		this.on(EVENTS.initialize, (event) => {
			if (event.target != this) {

				const field = event.target;
				if (field instanceof BaseField) {
					if (this.fields.indexOf(field) < 0) {
						this.fields.push(field);
					}

					event.preventDefault();
					event.stopPropagation();
				}
			}
		});

		this.validator.addCustomCheck(async ({ data, target }) => {
			const { fields } = target;
			if (fields) {
				const length = fields.length;
				for (let i = 0; i < length; i++) {
					const field = fields[i];
					if (field.condition && !field.valid) return false;
				}
			}

			return true;
		});
	}


	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	updatedValue() {
		const { value, fields } = this;
		if (fields)
			for (let field of fields) {
				if (field.name) field.value = value[field.name];
				else if (field instanceof Container) field.value = value;
			}
	}
}

customElements.define(NODENAMES.Container, Container);
export default Container;
