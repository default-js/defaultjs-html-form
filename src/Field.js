import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "./Constants";
import Base from "./Base";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTES = [ATTRIBUTE_NAME];

class Field extends Base {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.init();
	}

	connectedCallback() {}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.trigger(EVENTS.change);
	}

	init() {}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	set name(name) {
		this.setAttribute(ATTRIBUTE_NAME, name);
	}

	async value(value) {
		if (arguments != 0) {
			this.trigger(EVENTS.changeValue);
		} else return null;
	}
}

customElements.define(NODENAMES.Field, Field);
export default Field;
