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
	if (field.input.value) field.trigger(EVENTS.changeValue);
};

class WrapperField extends Field {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	constructor() {
		super();
		init(this);
	}

	get hasValue() {
		if (this.input) return this.input.value == null || this.input.value.length > 0;

		return false;
	}

	get value() {
		if (this.input) return this.input.value;
		return null;
	}

	set value(value) {
		if (this.input) {
			this.input.value = value;
			this.trigger(EVENTS.changeValue);
		}
	}
}

customElements.define(NODENAMES.WrapperField, WrapperField);
export default WrapperField;
