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
};

class BaseField extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
	}

	constructor(value = null) {
		super();
		this.__value__ = value;
		this.__valueChanged__ = true;

		this.on(EVENTS.conditionStateChanged, (event) => {
			if (event.target == this) {
				this.conditionUpdated();
			}
		});
	}

	async init() {
		await super.init();
		const ready = this.ready;
		if (!ready.resolved) {
			this.parentField = findParentField(this);
			this.validator = new Validator(this);

			this.form.on(EVENTS.executeValidate, async (event) => {
				const chain = event.detail;
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					if (current != valid) {
						this.publishValue();
					}
				}
			});

			this.form.on(EVENTS.allPublishValue, () => {
				this.publishValue();
			});
		}

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
		const value = this.__value__;
		return value != null && typeof value !== "undefined";
	}

	async value() {
		if(arguments.length == 0)
			return this.__value__;
		let value = arguments[0];
		await this.ready;

		if (this.__value__ != value && (await this.acceptValue(value))) {
			value = (await this.normalizeValue(value));
			if (this.__value__ != value) {
				this.__value__ = value;
				await this.updatedValue(value);
				await this.validate();
				this.publishValue();
			}
		}
	}

	async validate() {
		updateHasValue(this.hasValue, this);
		if (!this.validator) return false;

		const valid = await this.validator.validate();
		return valid;
	}

	async publishValue(chain = []) {
		chain.push(this);
		if(this.parentField)
			await this.parentField.childValueChanged(this, chain)
		else
			this.trigger(EVENTS.valueChanged, chain);
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async updatedValue() {}
	async childValueChanged(child, chain){}
}
export default BaseField;
