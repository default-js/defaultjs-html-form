import { NODENAME_CONTROL_NEXT } from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class NextButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return NODENAME_CONTROL_NEXT;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
export default NextButton;
define(NextButton);
