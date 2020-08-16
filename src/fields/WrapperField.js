import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Field from "../Field";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTES = [ATTRIBUTE_NAME];

class WrapperField extends Field {
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

	init() {
		this.on("change input", (event) => {			
			this.trigger(EVENTS.changeValue);
			event.preventDefault();
			event.stopPropagation();
		});
		this.input = this.find("input").first();
	}

	async value(value) {
		if (arguments.length != 0) {
			this.input.value = value;
			this.trigger(EVENTS.changeValue);
		} else return this.input.value;
	}
}

customElements.define(NODENAMES.WrapperField, WrapperField);
export default WrapperField;
