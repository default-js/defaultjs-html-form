import {NODENAMES} from "../Constants";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class SummaryButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}
	execute(){
		this.form.summary();
	}
}
export default SummaryButton;
window.customElements.define(NODENAMES.SummaryButton, SummaryButton);
