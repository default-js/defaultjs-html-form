import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];
class BackButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return NODENAMES.BackButton;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toPrevPage();
	}
}
export default BackButton;
defineElement(BackButton);
