import NodeNames from "../NodeNames";
import ControlButton from "./ControlButton";

const ATTRIBUTES = [];
class BackButton extends ControlButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	execute(){
		this.form.toPrevPage();
	}
}
export default BackButton;
window.customElements.define(NodeNames.BackButton, BackButton);
