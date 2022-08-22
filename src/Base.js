import { NODENAMES, 
	ATTRIBUTE_ACTIVE, 
	ATTRIBUTE_READONLY, 
	ATTRIBUTE_EVALUATE,
	ATTRIBUTE_CONDITION, 
	ATTRIBUTE_CONDITION_VALID, 
	ATTRIBUTE_CONDITION_INVALID, 
	ATTRIBUTE_VALID, 
	ATTRIBUTE_EDITABLE_CONDITION, 
	ATTRIBUTE_EDITABLE, 
	EVENT_MESSAGE_INITIALIZED 
} from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";
import Validator from "./Validator";
import Condition from "./Condition";
import MessageHandle from "./handels/MessageHandle";
import { evaluationData } from "./utils/DataHelper";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { updateActiveState, updateEditableState } from "./utils/StateHelper";

const _form = privatePropertyAccessor("form");
const _messages = privatePropertyAccessor("messages");
const _condition = privatePropertyAccessor("condition");
const _validator = privatePropertyAccessor("validator");
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_EDITABLE_CONDITION];

class Base extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	#initialized = false;
	#messageHandle;

	constructor() {
		super();
		_messages(this, []);
		this.root.on(EVENT_MESSAGE_INITIALIZED, (event) => {
			event.stopPropagation();
			_messages(this).push(event.target);
		});
		this.#messageHandle = new MessageHandle(this);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			
			_condition(this, new Condition(this, this.attr(ATTRIBUTE_CONDITION)));
			_validator(this, new Validator(this));
		}
	}


	addValidation(validation) {
		_validator(this).addCustomCheck(validation);
	}

	async validate(data) {
		this.attr(ATTRIBUTE_EVALUATE, "");
		const context = Object.assign({}, data, await evaluationData(this));
		const currentCondition = this.condition;
		const condition = await _condition(this).validate(context, currentCondition);
		if(!condition)
			return false;

		const valid = await _validator(this).validate(context);
		this.attr(ATTRIBUTE_EVALUATE, null);

		return valid;
	}

	get form() {
		let form = _form(this);
		if (!form) {
			form = this.parent(NODENAMES.Form);
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

	get condition() {
		return !this.hasAttribute(ATTRIBUTE_CONDITION_INVALID);
	}

	async conditionUpdated() {}

	get valid() {
		return this.hasAttribute(ATTRIBUTE_VALID);
	}
}

export default Base;
