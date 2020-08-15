import NodeNames from "../NodeNames";
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
		console.log("hier")
		this.form.toNextPage();
	}
}
export default NextButton;
window.customElements.define(NodeNames.NextButton, NextButton);
