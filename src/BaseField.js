import { EVENT_FIELD_INITIALIZED, EVENT_FIELD_REMOVED, EVENT_CONDITION_STATE_CHANGED, ATTRIBUTE_NAME, ATTRIBUTE_REQUIRED, ATTRIBUTE_NOVALUE } from "./Constants";
import Base from "./Base";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { noValue} from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { dataIsNoValue } from "./utils/ValueHelper";

const _parent = privatePropertyAccessor("parent");
export const _value = privatePropertyAccessor("value");

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

	constructor(options = {}) {
		super(options);
		const {value} = options;
		_value(this, value || null);
		this.ready.then(() => this.trigger(EVENT_FIELD_INITIALIZED));
	}

	async destroy() {		
		this.publishValue(null);
		this.trigger(EVENT_FIELD_REMOVED);
		await super.destroy();
	}

	get parentField() {
		let parent = _parent(this);
		if (!parent) {
			parent = findParentField(this);
			_parent(this, parent);
		}
		return parent;
	}

	async conditionUpdated() {
		this.active = this.condition;
		return this.publishValue();
	}

	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	get hasValue() {
		return !this.hasAttribute(ATTRIBUTE_NOVALUE);
	}

	async value(value) {
		const {condition, valid, ready} = this;
		//console.log(`${this.nodeName}(${this.name}).value: `, arguments, {condition, valid});

		if (arguments.length == 0)
			return  !condition || !valid ? null : _value(this);		
		
		await ready;
		const currentValue = _value(this);

		if (await this.acceptValue(value)) {
			value = await this.normalizeValue(value) || value;
			if (currentValue != value) {				
				value = await this.updatedValue(value) || value;				
				await this.publishValue(value);
			}
		}
	}

	async validate(data){
		const currentCondition = this.condition;
		const currentValid = this.valid;
		const valid = await super.validate(data);
		const condition = this.condition;
		const hasChange = currentCondition != condition || currentValid != valid;
		if(hasChange)
			this.publishValue(_value(this));

		return valid;
	}

	async updatedValue(value) { }

	async publishValue(value) {
		//console.log(`call ${this.nodeName}(${this.name}).publishValue:`, {value});
		await this.ready;
		if(arguments.length == 0)
			value = _value(this);		 
		
		const noValue = dataIsNoValue(value);				
		const condition = this.condition;
		const required = this.required;
		value = required && noValue ? null : value;		
		
		if(!condition)
			value = null;
		else
			_value(this, value);

		//console.log(`${this.nodeName}(${this.name}).publishValue:`, {required,condition, noValue, value});

		updateHasValue(!noValue, this);
		if (this.parentField) await this.parentField.childValueChanged(this, value);
		else await this.form.childValueChanged(this, value);



		/*
		let updated = false;
		const currentValue = _value(this);
		value = arguments.length == 1 ? value : currentValue;
		if(typeof value === "undefined")
			value = null;
		if(arguments.length == 1 && currentValue != value){
			updated = true;
			_value(this, value);
		}

		updateHasValue(!noValue(value), this);

		const publising = this.condition && (this.valid || updated);
		const publishValue = publising ? value : null
		console.log(`${this.nodeName}(${this.name}).publishValue:`, {updated, publising, publishValue});

		if(publising){
			if (this.parentField) await this.parentField.childValueChanged(this, publishValue);
			else await this.form.childValueChanged(this, publishValue);
		}
		*/
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}

	async childValueChanged(field, value) {}
}
export default BaseField;
