import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "./Constants";
import Base from "./Base";
import Validator from "./Validator";
import { ATTRIBUTE_VAILD, ATTRIBUTE_INVAILD } from "./Validator";

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_REQUIRED = "required";
export const ATTRIBUTE_NO_VALUE = "no-value";
const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_NO_VALUE];

export const findParentField = (field) => {
	let parent = field.parentNode;
	while (parent) {
		if (parent instanceof Field) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const init = (field) => {
	field.parentField = findParentField(field);

	field.on(EVENTS.changeCondition, (event) => {
		if (event.target == field) {
			field.active = field.condition;
			field.trigger(EVENTS.changeValue);
		}
	});

	field.on(EVENTS.changeValue, (event) => {
		if (event.target == field) {
			if (field.hasValue) field.attr(ATTRIBUTE_NO_VALUE, null);
			else field.attr(ATTRIBUTE_NO_VALUE, "");
		}
	});

	field._validator = new Validator(field);
};

class Field extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
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

	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		return false;
	}

	get value() {
		return null;
	}

	set value(value) {
		this.trigger(EVENTS.changeValue);
	}

	get valid() {
		if (this.hasAttribute(ATTRIBUTE_INVAILD)) return false;
		return true;
	}
}

customElements.define(NODENAMES.Field, Field);
export default Field;
