import { EVENT_FIELD_INITIALIZED, 
	EVENT_FIELD_REMOVED, 
	EVENT_VALUE_UPDATED,
	ATTRIBUTE_NAME, 
	ATTRIBUTE_REQUIRED, 
	ATTRIBUTE_NOVALUE } from "./Constants";
import Base from "./Base";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { dataIsNoValue } from "./utils/ValueHelper";

const _parent = privatePropertyAccessor("parent");

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

/**
 * basic field class - extend custom fields by this class
 *
 * @class BaseField
 * @typedef {BaseField}
 * @extends {Base}
 * @example
 * class CustomField extend BaseField{
 * 	constructor(option = {}){
 * 		super(option);
 * 	}
 *
 * 	async init(){
 * 		await super.init();
 * 		//your custom code
 * 	}
 * }
 */
class BaseField extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Base.observedAttributes);
	}

	#value = null;

	/**
	 * Creates an instance of BaseField.
	 *
	 * @constructor
	 * @param {{}} [options={}]
	 */
	constructor(options = {}) {
		super(options);
		const { value } = options;
		this.#value = value;
		this.root.on(EVENT_VALUE_UPDATED, (event) => {
			event.stopPropagation();
			event.preventDefault();
		});
	}

	/**
	 * Override this function to initialize the custom field.
	 *
	 * @async
	 * @returns {Promise<void>}
	 *
	 * @example
	 * class CustomField extend BaseField{
	 * 	constructor(option = {}){
	 * 		super(option);
	 * 	}
	 *
	 * 	async init(){
	 * 		await super.init();
	 * 		//your custom code
	 * 	}
	 * }
	 */
	async init() {
		this.ready.then(() => this.trigger(EVENT_FIELD_INITIALIZED));
		await super.init();
	}

	/**
	 * Is called by destroying the component.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async destroy() {
		this.publishValue(null);
		await super.destroy();
		this.trigger(EVENT_FIELD_REMOVED);
	}

	/**
	 * Get parent field.
	 *
	 * @readonly
	 * @type {BaseField}
	 */
	get parentField() {
		let parent = _parent(this);
		if (!parent) {
			parent = findParentField(this);
			_parent(this, parent);
		}
		return parent;
	}

	/**
	 * Is called if the condition state updated.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async conditionUpdated() {
		this.active = this.condition;
		await this.publishValue();
	}

	/**
	 * Get name of field.
	 *
	 * @readonly
	 * @type {string}
	 */
	get name() {
		return this.getAttribute(ATTRIBUTE_NAME);
	}

	/**
	 * Is field required.
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get required() {
		return this.hasAttribute(ATTRIBUTE_REQUIRED);
	}

	/**
	 * Has field a value.
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get hasValue() {
		return !this.hasAttribute(ATTRIBUTE_NOVALUE);
	}

	/**
	 * Get or set the raw value to field. (only for internal use)
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>|Promise<void>}
	 *
	 * @example
	 * await field.rawValue("value") // set the value of to "value"
	 * await field.rawValue() // returns the current value of field
	 */
	async rawValue(value) {
		if (arguments.length === 0) return this.#value;
		else this.#value = await value;
	}

	/**
	 * Get or set value to field.
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>|Promise<void>}
	 *
	 * @example
	 * await field.value("value") // set the value of to "value"
	 * await field.value() // returns the current value of field
	 */
	async value(value) {
		const { condition, valid, ready } = this;
		//console.log(`${this.nodeName}(${this.name}).value: `, arguments, {condition, valid});
		const currentValue = await this.rawValue();

		if (arguments.length == 0) return !condition || !valid ? null : currentValue;

		await ready;
		const accepted = await this.acceptValue(value);
		if (accepted) {
			value = (await this.normalizeValue(value)) || value;
			if (currentValue != value) {
				const result = await this.updatedValue(value);
				if (typeof result !== "undefined") value = result;

				//await this.rawValue(value);
				await this.publishValue(value);
			}
		}
	}

	/**
	 * Validate the field by given data context.
	 *
	 * @async
	 * @param {object} data
	 * @returns {Promise<boolean>}
	 */
	async validate(data) {
		const currentCondition = this.condition;
		const currentValid = this.valid;
		const valid = await super.validate(data);
		const condition = this.condition;
		this.validationStateChanged(currentCondition != condition, currentValid != valid);

		return valid;
	}

	/**
	 * Is called, if the validation state is changed
	 *
	 * @async
	 * @param {boolean} conditionChange
	 * @param {boolean} validationChanged
	 * @returns {Promise<void>}
	 */
	async validationStateChanged(conditionChange, validationChanged) {
		const hasChange = conditionChange || validationChanged;
		if (hasChange) this.publishValue();
	}

	/**
	 * Is called, if the value of field is updated
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>}
	 */
	async updatedValue(value) {
		this.trigger(EVENT_VALUE_UPDATED, value)
		return value;
	}

	/**
	 * Publish the value to the parent field or to form. If the value of custom field changed, call this function with the new value.
	 *
	 * @async
	 * @param {?*} value - default is the current value, if value available, then the value would be set as current value
	 * @returns {Promise<void>}
	 */
	async publishValue(value) {
		//console.log(`call ${this.nodeName}(${this.name}).publishValue:`, {arguments: arguments.length, value});
		await this.ready;
		if (arguments.length === 0) value = await this.rawValue();
		else await this.rawValue(value);

		//console.log("work with Value:", value)
		const noValue = dataIsNoValue(value);
		const condition = this.condition;
		const required = this.required;
		value = (required && noValue) || !condition ? null : value;

		//console.log(`${this.nodeName}(${this.name}).publishValue:`, {required, condition, noValue, value});

		updateHasValue(!noValue, this);

		if (this.parentField) await this.parentField.childValueChanged(this, value);
		else if (this.form) await this.form.childValueChanged(this, value);
	}

	/**
	 * is called to check if the value is accepted. Can be override!
	 * 
	 * @async
	 * @param {*} value
	 * @returns {Promise<boolean>}
	 */
	async acceptValue(value) {
		return true;
	}

	/**
	 * is called to normalize value for field.
	 *
	 * @async
	 * @param {*} value
	 * @returns {Promise<*>}
	 */
	async normalizeValue(value) {
		return value;
	}

	/**
	 * would be called by child fields
	 *
	 * @async
	 * @param {BaseField} field
	 * @param {*} value
	 * @returns {Promise<void>}
	 */
	async childValueChanged(field, value) {}
}
export default BaseField;
