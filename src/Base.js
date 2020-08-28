import { NODENAMES, TRIGGER_TIMEOUT, EVENTS, ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID, ATTRIBUTE_VALID, ATTRIBUTE_INVALID } from "./Constants";
import { updateActiveState } from "./utils/StateHelper";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID];

class Base extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {
		await this.initBase();
	}

	async initBase() {
		this.form = this.parent(NODENAMES.Form);
	}

	connectedCallback() {
		Promise.resolve(this.init())
			.then(() => {
				this.trigger(EVENTS.initialize);
			});
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
		const current = this.active;
		if (current != active) {
			updateActiveState(this, active);
			this.activeUpdated();
		}
	}

	activeUpdated() {
	}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		readonly ? this.attr(ATTRIBUTE_READONLY, "") : this.attr(ATTRIBUTE_READONLY, null);
		this.readonlyUpdated();
	}

	readonlyUpdated() { }

	get condition() {
		return !this.hasAttribute(ATTRIBUTE_CONDITION_INVALID);
	}

	conditionUpdated() {

	}

	get valid() {
		return this.hasAttribute(ATTRIBUTE_VALID);
	}
}

export default Base;
