import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Field from "../Field";

const init = (container) => {}

class Container extends Field {
	constructor() {
		super();
		init(this);
	}
}

customElements.define(NODENAMES.Container, Container);
export default Container;
