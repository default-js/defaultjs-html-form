import NodeNames from "../NodeNames";

const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_DISABLED = "disabled";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED];

class ControlButton extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.init();
	}

	connectedCallback() {	
	}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {}

	init() {
		this.active = false;
		this.disabled = true;		
		this.on("click", (event) => {
			if(this.active && !this.disabled)
				this.execute();
			event.preventDefault();
			event.stopPropagation();
		});
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		active
			? this.attr(ATTRIBUTE_ACTIVE, "")
			: this.attr(ATTRIBUTE_ACTIVE, null);
	}

	get disabled() {
		return this.hasAttribute(ATTRIBUTE_DISABLED);
	}

	set disabled(disabled) {
		disabled
			? this.attr(ATTRIBUTE_DISABLED, "")
			: this.attr(ATTRIBUTE_DISABLED, undefined);
	}

	get form() {
		return this.parent(NodeNames.Form);
	}

	execute() {
		console.log("execute");
	}
}
export default ControlButton;
