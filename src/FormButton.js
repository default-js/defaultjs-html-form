import { NODENAMES, ATTRIBUTE_ACTIVE,ATTRIBUTE_DISABLED } from "./Constants";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED];

const init = (button) => {
	button.form = button.parent(NODENAMES.Form);
	button.active = true;
	button.disabled = false;
	button.on("click", (event) => {
		if (button.active && !button.disabled) button.execute();
		event.preventDefault();
		event.stopPropagation();
	});
};

class FormButton extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(controlButton) {
		init(controlButton);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		FormButton.init(this);
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
		active ? this.attr(ATTRIBUTE_ACTIVE, "") : this.attr(ATTRIBUTE_ACTIVE, null);
	}

	get disabled() {
		return this.hasAttribute(ATTRIBUTE_DISABLED);
	}

	set disabled(disabled) {
		disabled ? this.attr(ATTRIBUTE_DISABLED, "") : this.attr(ATTRIBUTE_DISABLED, undefined);
	}

	execute() {
		console.log("execute");
	}
}
export default FormButton;
