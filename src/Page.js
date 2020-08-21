import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS, ATTRIBUTE_STEP } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import Base from "./Base";
import "./fields";
import Field from "./Field";
import Container from "./Container";
import List from "./List";

const ATTRIBUTES = [ATTRIBUTE_STEP];

const init = (page) => {
	page.active = false;
	page.on(
		EVENTS.changeValue,
		toTimeoutHandle((event) => {}),
	);

	page.on(EVENTS.initialize, (event) => {
		const field = event.target;
		if (field instanceof Field) {
			if (page.fields.indexOf(field) < 0) {
				page.fields.push(field);
				page.trigger(100, EVENTS.changeValue);
			}

			event.preventDefault();
			event.stopPropagation();
		}
	});

	page.fields = findFields(page);
};

class Page extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	static init(page) {
		Base.init(page);
		init(page);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Page.init(this);
	}

	get value() {
		if (!this.fields || this.fields.length == null) return null;

		const values = {};
		for (let field of this.fields) {
			if (field.valid) {
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
			else if(field instanceof Container) field.value = value;
		}
	}

	get valid() {
		if (this.fields)
			for (let field of this.fields) {
				if (field.active && field.condition && !field.valid) return false;
			}
		return true;
	}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
