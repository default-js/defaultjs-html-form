import { NODENAME_CONTROL_SUBMIT } from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class SubmitButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_CONTROL_SUBMIT;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.submit();
	}
}
export default SubmitButton;
define(SubmitButton);
