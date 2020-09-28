import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];
class NextButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	
	static get NODENAME() {
		return NODENAMES.NextButton;
	}

	constructor() {
		super();
	}

	execute() {
		this.form.toNextPage();
	}
}
export default NextButton;
defineElement(NextButton);
