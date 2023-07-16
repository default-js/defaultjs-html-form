import { 
	NODENAME_CONTROL_SUMMARY
} from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class SummaryButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_CONTROL_SUMMARY;
	}

	constructor() {
		super();
	}
	execute() {
		this.form.toNextPage();
	}
}
export default SummaryButton;
define(SummaryButton);
