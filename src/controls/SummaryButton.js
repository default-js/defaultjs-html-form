import NodeNames from "../NodeNames";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class SummaryButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}
}
export default SummaryButton;
window.customElements.define(NodeNames.SummaryButton, SummaryButton);