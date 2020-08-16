import {NODENAMES} from "../Constants";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class NextButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	execute(){
		this.form.toNextPage();
	}
}
export default NextButton;
window.customElements.define(NODENAMES.NextButton, NextButton);
