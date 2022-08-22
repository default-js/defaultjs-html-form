import { 
	EVENT_FIELD_INITIALIZED,
	EVENT_FIELD_REMOVED,
	EVENT_CONDITION_STATE_CHANGED,
	ATTRIBUTE_NAME, 
	ATTRIBUTE_REQUIRED, 
	ATTRIBUTE_NOVALUE } from "./Constants";
import Base from "./Base";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";


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

	#initialized = false;

	constructor(value = null) {
		super();
		_value(this, value);
	}

	async init() {		
		await super.init();
		if (!this.#initialized ) {
			this.#initialized = true;			
			this.ready.then(() => this.trigger(EVENT_FIELD_INITIALIZED));
		}
	}

	
	async destroy(){
		this.trigger(EVENT_FIELD_REMOVED);
		await super.destroy();
	}

	get parentField() {
		let parent = _parent(this);
		if(!parent){
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
				await this.updateValue(value);
				await this.publishValue(value);
			}
		}
	}

	async updateValue(value){};

	async validate(data) {		
		updateHasValue(this.hasValue, this);
		return super.validate(data);
	}

	async publishValue() {		
		await this.ready;
		const value = await this.value();
		if (this.parentField) await this.parentField.childValueChanged(this, value);
		else this.form.childValueChanged(this, value);
	}

	async acceptValue(value) {
		return true;
	}

	async normalizeValue(value) {
		return value;
	}
	
	async childValueChanged(field, value) {}
};
export default BaseField;
