import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY, ATTRIBUTE_NOVALUE } from "./Constants";
import { toTimeoutHandle } from "./utils/EventHelper";
import { updateValidState } from "./utils/StateHelper";
import Base from "./Base";
import Validator from "./Validator";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_NOVALUE];

export const findParentField = (field) => {
	let parent = field.parentNode;
	while (parent) {
		if (parent instanceof BaseField) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const updateHasValue = (hasValue, field) => {
	field.attr(ATTRIBUTE_NOVALUE, !hasValue ? "" : null);
}

class BaseField extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
	}

	constructor() {
		super();
		this.__value__ = null;
		updateHasValue(this.hasValue, this);
	}

	async init() {
		await this.initBaseField();
	}

	async initBaseField() {
		await this.initBase();

		this.parentField = findParentField(this);
		this.validator = new Validator(this);

		this.on(
			EVENTS.changeCondition,
			toTimeoutHandle((event) => {
				if (event.target == this) {
					this.active = this.condition;
				}
			}),
		);
	}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		return this.__value__ != null && typeof this.__value__ !== "undefined";
	}

	get value() {
		return this.__value__;
	}

	set value(value) {
		if (this.__value__ != value && this.acceptValue(value)) {
			value = this.normalizeValue(value);
			if (this.__value__ != value) {
				this.__value__ = value;
				this.updatedValue(value);
				updateHasValue(this.hasValue, this);
				this.validator.validate().then((valid) => {
					updateValidState(this, valid);
					this.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);
				});
			}
		}
	}

	acceptValue(value) {
		return true;
	}

	normalizeValue(value) {
		return value;
	}

	async updatedValue() { }
}
export default BaseField;
