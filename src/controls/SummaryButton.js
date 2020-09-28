import { NODENAMES } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];
class SummaryButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.SummaryButton;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.toNextPage();
	}
}
export default SummaryButton;
defineElement(SummaryButton);
