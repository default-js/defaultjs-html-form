import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];
class SubmitButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.SubmitButton;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.submit();
	}
}
export default SubmitButton;
defineElement(SubmitButton);
