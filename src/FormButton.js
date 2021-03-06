import { NODENAMES, ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED } from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED];

class FormButton extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(button) {
	
	}

	constructor() {
		super();
		this.active = false;
		this.disabled = false;
		this.on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			if (this.active && !this.disabled) this.execute();
		});
	}

	async init() {
		await super.init();
		this.form = this.parent(NODENAMES.Form);
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
		disabled ? this.attr(ATTRIBUTE_DISABLED, "") : this.attr(ATTRIBUTE_DISABLED, null);
	}

	execute() {
		console.log("execute");
	}
}
export default FormButton;
