import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";

const ATTRIBUTES = [];
class SubmitButton extends FormButton {
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
		this.form.submit();
	}
}
export default SubmitButton;
window.customElements.define(NODENAMES.SubmitButton, SubmitButton);
