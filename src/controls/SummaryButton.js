import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";

const ATTRIBUTES = [];
class SummaryButton extends FormButton {
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
		this.form.summary();
	}
}
export default SummaryButton;
window.customElements.define(NODENAMES.SummaryButton, SummaryButton);
