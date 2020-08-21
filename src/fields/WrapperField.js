import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "../Constants";
import Field from "../Field";
import { toEvents, toTimeoutHandle } from "../utils/EventHelper";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTES = [ATTRIBUTE_NAME];

const init = (field) => {
	field.input = field.find("input").first();
	field.on(
		"change input",
		toTimeoutHandle((event) => {
			field.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
			event.stopPropagation();
		}),
	);
	if (field.input.value) field.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
};

class WrapperField extends Field {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	static init(wrapperField) {
		Field.init(wrapperField);
		init(wrapperField);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		WrapperField.init(this);
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
