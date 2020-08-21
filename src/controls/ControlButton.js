import { NODENAMES } from "../Constants";

const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_DISABLED = "disabled";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED];

const init = (controlButton) => {
	controlButton.form = controlButton.parent(NODENAMES.Form);
	controlButton.active = false;
	controlButton.disabled = true;
	controlButton.on("click", (event) => {
		if (controlButton.active && !controlButton.disabled) controlButton.execute();
		event.preventDefault();
		event.stopPropagation();
	});
};

class ControlButton extends HTMLElement {
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
		ControlButton.init(this);
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
export default ControlButton;
