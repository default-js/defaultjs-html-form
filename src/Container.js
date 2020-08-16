import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "./Constants";
import Field from "./Field";

class Container extends Field {
	constructor() {
		super();
	}

	connectedCallback() {}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.trigger(EVENTS.change);
	}
}

customElements.define(NODENAMES.Container, Container);
export default Container;
