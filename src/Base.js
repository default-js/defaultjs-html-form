import { NODENAMES, TRIGGER_TIMEOUT, EVENTS , ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID } from "./Constants";
import Condition from "./Condition";
import {updateActiveState} from "./utils/StateHelper";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID];

const init = (base) => {
	base.form = base.parent(NODENAMES.Form);
	base.active = true;
	base._condition = new Condition(base);
};

class Base extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(base) {
		init(base);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Base.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		updateActiveState(this, active);
	}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}
	set readonly(readonly) {
		readonly ? this.attr(ATTRIBUTE_READONLY, "") : this.attr(ATTRIBUTE_READONLY, undefined);
	}

	get condition() {
		if (this.hasAttribute(ATTRIBUTE_CONDITION_INVALID)) return false;
		return true;
	}

	get valid() {
		return true;
	}
}

export default Base;
