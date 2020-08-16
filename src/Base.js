import { NODENAMES, CONDITIONSTATES, EVENTS } from "./Constants";
import Condition from "./Condition";
import {ATTRIBUTE_CONDITION} from "./Condition";
import Validator from "./Validator";

export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_READONLY = "readonly";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION];

const init = (base) => {
	base.form = base.parent(NODENAMES.Form);
	base._condition = new Condition(base);
	base._validator = new Validator(base);
}

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
			this.trigger(EVENTS.changeAttributeEventBuilder(name));
			this.trigger(EVENTS.change);
		}
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active
			? this.attr(ATTRIBUTE_ACTIVE, "")
			: this.attr(ATTRIBUTE_ACTIVE, undefined);
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
		return this._condition.valid;
	}

	get valid() {
		return true;
	}
}

export default Base;
