import { 
	NODENAME_CONTAINER, 
	EVENT_FIELD_INITIALIZED, 
	EVENT_FIELD_REMOVED 
} from "./Constants";
import { emtpyOrNoValueString, noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { findFields } from "./utils/NodeHelper";
import BaseField, { _value } from "./BaseField";
import { define } from "@default-js/defaultjs-html-components";
import { valueHelper, fieldValueMapToObject } from "./utils/DataHelper";
import { validateFields } from "./utils/ValidationHelper";

const ATTRIBUTES = [];
class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAME_CONTAINER;
	}

	#fields = null;
	#value = new Map();

	constructor(options) {
		super(options);
		const root = this.root;
		root.on(EVENT_FIELD_INITIALIZED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof BaseField && (!this.#fields || !this.#fields.has(field)))
					this.#fields = null;
				event.stopPropagation();
			}
		});

		root.on(EVENT_FIELD_REMOVED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof BaseField && this.#fields && this.#fields.has(field))
					this.#fields.delete(field);

				event.stopPropagation();
			}
		});

		this.addValidation(async ({ data }) => await validateFields(data, this.fields));
	}

	get fields() {
		if(!this.#fields)
			this.#fields = new Set(findFields(this));

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
		const map = this.#value;
		map.clear();
		const fields = this.fields;
		if (fields) {
			await Promise.all(fields.map(async (field) => {
				const name = field.name;
				const fieldValue = name ? valueHelper(value, field.name) : value;
				if(!noValue(fieldValue))
					map.set(field, fieldValue);
				await field.value(fieldValue);
			}));
		}

		let data = await fieldValueMapToObject(this.#value, fields);
		if (Object.getOwnPropertyNames(data).length == 0) data = null;

		return data;
	}


	async childValueChanged(field, value) {
		//console.log(`${this.nodeName}.childValueChanged(${field.name}):`, {field, value});
		value = await value;		
		const map = this.#value;		
		
		if (field) {
			const hasField = map.has(field);
			const currentValue = map.get(field);
			//console.log({name: field.name, currentValue, value, hasField})

			if(hasField && currentValue == value)
				return;
			if (noValue(value)) {
				//console.log(`delete ${field.name}`);
				map.delete(field);
			}
			else {
				//console.log(`set ${field.name} = ${value}`);
				map.set(field, value);
			}				
		}

		let data = await fieldValueMapToObject(map, this.fields);
		//console.log("data: ",data);
		if (Object.getOwnPropertyNames(data).length == 0) data = null;
		await this.publishValue(data);
	}
}

define(Container);
export default Container;
