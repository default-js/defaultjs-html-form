import NodeNames from "../NodeNames";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class SubmitButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}
}
export default SubmitButton;
window.customElements.define(NodeNames.SubmitButton, SubmitButton);
