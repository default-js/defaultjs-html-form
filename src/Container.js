import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import BaseField from "./BaseField";

const ATTRIBUTES = [];

class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	constructor() {
		super();
		this.fields = [];
	}

	async init() {
		await initContainer();
	}


	async initContainer() {
		await initBaseField();
		
		this.fields = findFields(this);
		this.on(EVENTS.initialize, (event) => {
			const field = event.target;
			if (field instanceof BaseField) {
				if (this.fields.indexOf(field) < 0) {
					this.fields.push(field);
					this.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
				}

				event.preventDefault();
				event.stopPropagation();
			}
		});

		this.validator.addCustomCheck(async ({ data, target }) => {
			const { fields } = target;
			if (fields) {
				const length = fields.length;
				for (let i = 0; i < length; i++) {
					const field = fields[i];
					if (field.active && field.condition && !field.valid) return false;
				}
			}

			return true;
		});
	}


	readonlyUpdated() {
		const { readonly } = this;
		for (let field of this.fields) {
			field.readonly = readonly;
		}
	}

	get value() {
		if (!this.fields || this.fields.length == null) return null;

		const values = {};
		let hasValue = false;
		for (let field of this.fields) {
			if (field.valid) {
				const value = field.value;
				if (typeof value !== "undefined" && value != null) {
					if (field.name) values[field.name] = value;
					else if (ObjectUtils.isPojo(value)) ObjectUtils.merge(values, value);
					hasValue = true;
				}
			}
		}
		if (!hasValue) return null;

		if (this.name) return ({}[this.name] = values);
		else return values;
	}

	set value(value) {
		for (let field of this.fields) {
			if (field.name) field.value = value[field.name];
			else if (field instanceof Container) field.value = value;
		}
	}
}

customElements.define(NODENAMES.Container, Container);
export default Container;
