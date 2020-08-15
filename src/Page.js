import "@default-js/defaultjs-extdom";
import constants from "./Constants";
import Events from "./Events";
import Base from "./Base";

export const NODENAME = constants.HTML_TAG_PREFIX + "page";
const ATTRIBUTES = ["step", "active", "readonly", "condition"];

const render = (page) => {};

class Page extends Base {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.trigger(Events.initialize);
	}

	disconnectedCallback() {}

	adoptedCallback() {
		this.trigger(Events.initialize);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger("change");
			render(this);
		}
	}
}
window.customElements.define(constants.HTML_TAG_PREFIX + "page", Page);

export default Page;
