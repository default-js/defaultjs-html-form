import { 
	NODENAMES, 
	ATTRIBUTE_ACTIVE, 
	ATTRIBUTE_READONLY, 
	ATTRIBUTE_CONDITION, 
	ATTRIBUTE_CONDITION_VALID, 
	ATTRIBUTE_CONDITION_INVALID, 
	ATTRIBUTE_VALID, 
	ATTRIBUTE_INVALID, 
	ATTRIBUTE_EDITABLE_CONDITION, 
	ATTRIBUTE_EDITABLE } from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { updateActiveState, updateEditableState } from "./utils/StateHelper";

const _form = privatePropertyAccessor("form");

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_EDITABLE_CONDITION];

class Base extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();		
	}

	async init() {
		await super.init();
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

	activeUpdated() {}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		updateEditableState(this, !readonly, !this.ready.resolved);
		this.readonlyUpdated();
	}

	readonlyUpdated() {}

	get editable() {
		return this.hasAttribute(ATTRIBUTE_EDITABLE);
	}

	set editable(editable) {
		updateEditableState(this, editable, !this.ready.resolved);
		this.editableUpdated();
	}

	editableUpdated() {
		this.readonlyUpdated();
	}

	get condition() {
		return !this.hasAttribute(ATTRIBUTE_CONDITION_INVALID);
	}

	conditionUpdated() {}

	get valid() {
		return this.hasAttribute(ATTRIBUTE_VALID);
	}
}

export default Base;
