import { 
	EVENT_FIELD_INITIALIZED,
	EVENT_CONDITION_STATE_CHANGED,
	EVENT_EXECUTE_VALIDATE,
	EVENT_ALL_PUBLISH_VALUE,
	EVENT_VALUE_CHANGED,
	ATTRIBUTE_NAME, 
	ATTRIBUTE_REQUIRED, 
	ATTRIBUTE_NOVALUE } from "./Constants";
import Base from "./Base";
import Validator from "./Validator";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";


const _parent = privatePropertyAccessor("parent");
export const _value = privatePropertyAccessor("value");
const _validator = privatePropertyAccessor("validator");

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

		this.on(EVENT_CONDITION_STATE_CHANGED, (event) => {
			if (event.target == this) {
				this.conditionUpdated();
			}
		});
	}

	async init() {		
		await super.init();
		const ready = this.ready;		
		if (!ready.resolved) {
			_parent(this, findParentField(this));
			_validator(this, new Validator(this));			
			
			this.form.on(EVENT_EXECUTE_VALIDATE, async (event) => {
				const chain = event.detail;
				if (chain.indexOf(this) < 0) {
					const current = this.valid;
					const valid = await this.validate();
					const condition = this.condition;
					if (current != valid && condition) {
						this.publishValue();
					}
				}
			});

			this.form.on(EVENT_ALL_PUBLISH_VALUE, () => {
				this.publishValue();
			});

			ready.then(() => {
				this.trigger(EVENT_FIELD_INITIALIZED);
			});
		}

		ready.then(async () => {
			await this.validate();			
			await this.publishValue();
		});
	}

	get validator() {
		return _validator(this);
	}

	get parentField() {
		return _parent(this);
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
		else this.trigger(EVENT_VALUE_CHANGED, chain);
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
