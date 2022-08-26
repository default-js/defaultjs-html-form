import { NODENAME_FORM, 
	ATTRIBUTE_ACTIVE, 
	ATTRIBUTE_READONLY, 
	ATTRIBUTE_EVALUATE,
	ATTRIBUTE_CONDITION, 
	ATTRIBUTE_CONDITION_VALID, 
	ATTRIBUTE_CONDITION_INVALID, 
	ATTRIBUTE_VALID, 
	ATTRIBUTE_EDITABLE_CONDITION, 
	ATTRIBUTE_EDITABLE
} from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";
import ConditionHandle from "./handels/ConditionHandle";
import EditableHandle from "./handels/EditableHandle";
import ValidationHandle from "./handels/ValidationHandle";
import MessageHandle from "./handels/MessageHandle";
import { evaluationData } from "./utils/DataHelper";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { updateActiveState, updateConditionState, updateEditableState, updateValidState } from "./utils/StateHelper";




const _form = privatePropertyAccessor("form");
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_EDITABLE_CONDITION];

class Base extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	#initialized = false;
	
	#conditionHandle;
	#editableHandle;
	#validationHandle;
	#messageHandle;

	constructor() {
		super();
		this.#messageHandle = new MessageHandle(this);
		this.#conditionHandle = new ConditionHandle(this);
		this.#editableHandle = new EditableHandle(this);
		this.#validationHandle = new ValidationHandle(this);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
		}
	}


	addValidation(validation) {
		this.#validationHandle.addCustomValidation(validation);
	}

	async validate(data) {		
		console.log(`${this.nodeName}(${this.name}).validate:`, data)
		this.attr(ATTRIBUTE_EVALUATE, "");
		const context = Object.assign({}, data, await evaluationData(this));
		await this.#conditionHandle.validate(context);
		await this.#editableHandle.validate(context);
		await this.#validationHandle.validate(context);
		this.attr(ATTRIBUTE_EVALUATE, null);

		await this.#messageHandle.validate(context);

		return this.valid;
	}

	get form() {
		let form = _form(this);
		if (!form) {
			form = this.parent(NODENAME_FORM);
			_form(this, form);
		}
		return form;
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			updateActiveState(this, active);
			this.activeUpdated();
		}
	}

	async activeUpdated() {}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		updateEditableState(this, !readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}

	async readonlyUpdated() {}

	get editable() {
		return this.hasAttribute(ATTRIBUTE_EDITABLE);
	}

	set editable(editable) {
		updateEditableState(this, editable, !this.ready.resolved);
		this.editableUpdated();
	}

	async editableUpdated() {
		this.readonlyUpdated();
	}

	set condition(condition){
		updateConditionState(this, condition);
		this.conditionUpdated();
	}

	get condition() {
		return !this.hasAttribute(ATTRIBUTE_CONDITION_INVALID);
	}

	async conditionUpdated() {}

	set valid(valid){
		updateValidState(this, valid);
		this.validUpdated();
	}

	get valid() {
		return this.hasAttribute(ATTRIBUTE_VALID);
	}

	async validUpdated(){}
}

export default Base;
