import {NODENAMES} from "../Constants";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class SubmitButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}
	execute(){
		this.form.submit();
	}
}
export default SubmitButton;
window.customElements.define(NODENAMES.SubmitButton, SubmitButton);
