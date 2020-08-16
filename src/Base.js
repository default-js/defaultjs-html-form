import { NODENAMES, TRIGGER_TIMEOUT, EVENTS } from "./Constants";
import Condition from "./Condition";
import {ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID} from "./Condition";

export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_READONLY = "readonly";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID];

const init = (base) => {
	base.active = true;
	base.form = base.parent(NODENAMES.Form);
	base._condition = new Condition(base);
};

class Base extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(oldValue != newValue){
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active
			? this.attr(ATTRIBUTE_ACTIVE, "")
			: this.attr(ATTRIBUTE_ACTIVE, undefined);
		this.trigger(TRIGGER_TIMEOUT, EVENTS.changeActive);
	}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}
	set readonly(readonly) {
		readonly
			? this.attr(ATTRIBUTE_READONLY, "")
			: this.attr(ATTRIBUTE_READONLY, undefined);
	}

	get condition(){
		if (this.hasAttribute(ATTRIBUTE_CONDITION_INVALID)) return false;
		return true;
	}

	get valid() {
		return true;
	}
}

export default Base;
