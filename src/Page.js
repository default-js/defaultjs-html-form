import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { STATES, NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import Base from "./Base";
import Field from "./Field";
import "./fields";
import Container from "./Container";
import List from "./List";

const ATTRIBUTES = ["step", "active", "readonly", "condition"];

const render = (page) => {};

class Page extends Base {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.init();
	}

	init() {
		this.on(EVENTS.changeValue, (event) => {});
		this.fields = findFields(this);
	}

	connectedCallback() {
		this.trigger(EVENTS.initialize);
	}

	disconnectedCallback() {}

	adoptedCallback() {
		this.trigger(EVENTS.initialize);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(EVENTS.change);
			render(this);
		}
	}

	async value(value) {
		const data = {};
		for (let field of this.fields) {
			if (await field.valid())
				data[field.name] =
					typeof field.value === "function" ? await field.value() : field.value;
		}

		return data;
	}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
