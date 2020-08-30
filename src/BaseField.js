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

	constructor(value = null) {
		super();
		this.__value__ = value;
	}

	async init() {
		await this.initBaseField();
	}

	async initBaseField() {
		await this.initBase();

		this.parentField = findParentField(this);
		this.validator = new Validator(this);

		this.on(EVENTS.conditionStateChanged,
			(event) => {
				if (event.target == this) this.conditionUpdated();
			}
		);

		this.on(EVENTS.input,
			(event) => {
				if (event.target == this) {
					this.__value__ = event.detail ? event.detail[0] : null;
					this.validate();
					this.publishValue();
				}
			}
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
		
		this.form.on(EVENTS.allPublishValue, ()=> {
			this.publishValue();
		});

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
		const value = this.value;
		return value != null && typeof value !== "undefined";
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
		if (!this.validator)
			return false;

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
