import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";

const ATTRIBUTES = [];
class NextButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static init(button) {
		FormButton.init(button);
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
export default NextButton;
window.customElements.define(NODENAMES.NextButton, NextButton);
