import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY, ATTRIBUTE_NOVALUE } from "./Constants";
import Base from "./Base";
import Validator from "./Validator";
import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";

const PRIVATE_PARENT = "parent";
const PRIVATE_VALUE = "value";
const PRIVATE_VALIDATOR = "validator";

export const _value = function (self, value) {
	if (arguments.length == 2) privateProperty(self, PRIVATE_VALUE, value);
	else return privateProperty(self, PRIVATE_VALUE);
};

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
		_value(this, value);

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
			privateProperty(this, PRIVATE_PARENT, findParentField(this));
			privateProperty(this, PRIVATE_VALIDATOR, new Validator(this));			

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

	get validator() {
		return privateProperty(this, PRIVATE_VALIDATOR);
	}

	get parentField() {
		return privateProperty(this, PRIVATE_PARENT);
	}

	conditionUpdated() {
		this.active = this.condition;
		(async () => {
			this.publishValue();
		})();
	}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		const value = _value(this);
		return value != null && typeof value !== "undefined";
	}

	async value(value) {
		if (arguments.length == 0) return _value(this);

		await this.ready;
		const currentValue = _value(this);

		if (await this.acceptValue(value)) {
			value = await this.normalizeValue(value);
			if (currentValue != value) {
				_value(this, value);
				await this.updatedValue(value);				
				await this.validate();
				await this.publishValue();
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
		await this.ready;
		chain.push(this);
		if (this.parentField) await this.parentField.childValueChanged(this, chain);
		else this.trigger(EVENTS.valueChanged, chain);
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async updatedValue() {}
	async childValueChanged(child, chain) {}
}
export default BaseField;
