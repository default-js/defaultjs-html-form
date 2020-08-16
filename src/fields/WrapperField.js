import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Field from "../Field";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTES = [ATTRIBUTE_NAME];

const init = (field) => {
	field.on("change input", (event) => {
		field.trigger(EVENTS.changeValue);
		event.preventDefault();
		event.stopPropagation();
	});
	field.input = field.find("input").first();
};

class WrapperField extends Field {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	constructor() {
		super();
		init(this);
	}

	get value() {		
		return this.input.value;
	}

	set value(value){
		this.input.value = value;
		this.trigger(EVENTS.changeValue);
	}
}

customElements.define(NODENAMES.WrapperField, WrapperField);
export default WrapperField;
