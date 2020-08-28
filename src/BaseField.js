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
	}

	async init() {
		await this.initBaseField();
	}

	async initBaseField() {
		await this.initBase();

		this.parentField = findParentField(this);
		this.validator = new Validator(this);

		/*this.on([EVENTS.conditionStateChanged, EVENTS.validStateChanged],
			(event) => {
				if (event.target == this)
					console.log(event.type, { field: this, event });
			}
		);*/


		this.on(EVENTS.conditionStateChanged,
			(event) => {
				if (event.target == this) this.conditionUpdated();
			}
		);

		this.on(EVENTS.input,
			toTimeoutHandle(
				(event) => {
					if (event.target == this) {
						this.__value__ = event.detail ? event.detail[0] : null;
						this.validate();
						this.publishValue();
					}
				},
				false,
				true
			)
		);

		this.form.on(
			EVENTS.executeValidate,
			async (event) => {
				const chain = event.detail[0];
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					if (current != valid)
						this.publishValue();
				}
			}
		);

		this.validate();
	}

	conditionUpdated() {
		this.active = this.condition;
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
				this.validate();
				this.publishValue();
			}
		}
	}

	async validate() {
		updateHasValue(this.hasValue, this);
		const valid = await this.validator.validate();
		return valid;
	}

	async publishValue(chain = []) {
		chain.push(this);
		let value = null;
		//if (this.condition)
		value = this.value;

		setTimeout(() => {
			this.trigger(EVENTS.valueChanged, chain);
		}, TRIGGER_TIMEOUT);
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
