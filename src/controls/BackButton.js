import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";

const ATTRIBUTES = [];
class BackButton extends FormButton {
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
		this.form.toPrevPage();
	}
}
export default BackButton;
window.customElements.define(NODENAMES.BackButton, BackButton);
