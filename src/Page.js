import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS, ATTRIBUTE_STEP } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import Base from "./Base";
import BaseField from "./BaseField";
import Container from "./Container";
import List from "./List";

const ATTRIBUTES = [ATTRIBUTE_STEP];

class Page extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
	}

	constructor() {
		super();
	}

	async init() {
		await this.initPage();
	}

	async initPage() {
		await this.initBase();

		this.fields = findFields(this);

		this.on(EVENTS.initialize, (event) => {
			const field = event.target;
			if (field instanceof BaseField) {
				if (this.fields.indexOf(field) < 0) {
					this.fields.push(field);
					this.trigger(100, EVENTS.changeValue);
				}

				event.preventDefault();
				event.stopPropagation();
			}
		});
	}

	readonlyUpdated() {
		if (this.fields)
			for (let field of this.fields) {
				field.readonly = this.readonly;
			}
	}

	get value() {
		if (!this.fields || this.fields.length == null) return null;

		const values = {};
		for (let field of this.fields) {
			if (field.active && field.condition && field.valid) {
				const value = field.value;
				if (value != null && typeof value !== "undefined") {
					if (field.name) values[field.name] = value;
					else if (ObjectUtils.isPojo(value)) ObjectUtils.merge(values, value);
				}
			}
		}
		return values;
	}

	set value(value) {
		for (let field of this.fields) {
			if (field.name) field.value = value[field.name];
			else if (field instanceof Container) field.value = value;
		}
	}

	get valid() {
		if (this.fields) {
			const length = this.fields.length;
			for (let i = 0; i < length; i++) {
				const field = this.fields[i];
				if (field.active && field.condition && !field.valid)
					return false;
			}
		}

		return true;
	}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
