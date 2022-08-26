import { NODENAME_FORM, ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED } from "./Constants";
import { Component } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_DISABLED];

class FormButton extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	#initialized = false;
	#form;

	constructor() {
		super();

		this.on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			if (this.active && !this.disabled) this.execute();
		});
	}

	async init() {
		await super.init();
		if (this.#initialized) {
			this.active = false;
			this.disabled = false;
			this.#initialized = true;
		}
	}

	get form() {
		if (!this.#form)
			this.#form = this.parent(NODENAME_FORM);

		return this.#form;
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		this.attr(ATTRIBUTE_ACTIVE, active ? "" : null);
	}

	get disabled() {
		return this.hasAttribute(ATTRIBUTE_DISABLED);
	}

	set disabled(disabled) {
		this.attr(ATTRIBUTE_DISABLED, disabled ? "" : null);
	}

	execute() {
		console.log("execute");
	}
}
export default FormButton;
