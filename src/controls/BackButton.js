import { NODENAME_CONTROL_BACK } from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class BackButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_CONTROL_BACK;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toPrevPage();
	}
}
export default BackButton;
define(BackButton);
