import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT} from "../Constants";
import Field from "../Field";
import { findWrapper } from "./wrapper";

const ATTRIBUTES = ["file-format"];

const init = (field) => {
	field.wrapper = findWrapper(field) || {hasValue : false, value: null};
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
		Field.init(this);
		WrapperField.init(this);
	}
	
    readonlyUpdated(){
		this.wrapper.readonly = this.readonly;
	}

	get hasValue() {
		if(this.wrapper) return this.wrapper.hasValue
		return false;
	}

	get value() {
		return this.wrapper.value;
	}

	set value(value) {		
		if (this.wrapper && this.wrapper.value != value) {
			this.wrapper.value = value;
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
		}
	}
}

customElements.define(NODENAMES.WrapperField, WrapperField);
export default WrapperField;
