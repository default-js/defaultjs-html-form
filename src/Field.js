import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "./Constants";
import Base from "./Base";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTES = [ATTRIBUTE_NAME];

const init = (field) => {
}

class Field extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes) ;
	}

	constructor() {
		super();
		init(this);
	}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	set name(name) {
		this.setAttribute(ATTRIBUTE_NAME, name);
	}

	get value() {
		return null;
	}

	set value(value){
		this.trigger(EVENTS.changeValue);
	}
}

customElements.define(NODENAMES.Field, Field);
export default Field;
