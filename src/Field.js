import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY, ATTRIBUTE_NOVALUE, ATTRIBUTE_VALID, ATTRIBUTE_INVALID } from "./Constants";
import { toTimeoutHandle } from "./utils/EventHelper";
import Base from "./Base";
import Validator from "./Validator";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_NOVALUE];

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

	field.on(
		EVENTS.changeCondition,
		toTimeoutHandle((event) => {
			if (event.target == field) {
				field.active = field.condition;
				field.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
			}
		}),
	);

	field.on(
		EVENTS.changeValue,
		toTimeoutHandle((event) => {
			if (event.target == field) {
				if (field.hasValue) field.attr(ATTRIBUTE_NOVALUE, null);
				else field.attr(ATTRIBUTE_NOVALUE, "");
			}
		}),
	);

	field.validator = new Validator(field);

	field.trigger(EVENTS.initialize);
};

class Field extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
	}

	static init(field) {
		Base.init(field);
		init(field);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Field.init(this);
	}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		const value = this.value;
		return value != null && typeof value !== "undefined";
	}

	get value() {
		return this.name;
	}

	set value(value) {
		this.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
	}

	get valid() {
		if (!this.condition) return false;
		if (this.hasAttribute(ATTRIBUTE_INVALID)) return false;
		return true;
	}
}

customElements.define(NODENAMES.Field, Field);
export default Field;
