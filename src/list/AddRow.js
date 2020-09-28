import { NODENAMES, EVENTS } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];
class AddRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME(){
		return NODENAMES.ButtonAddRow;
	}

	constructor() {
		super();
	}

	async init() {
		FormButton.init(this);
		this.active = true;
	}

	execute() {
		this.trigger(100, EVENTS.listRowAdd);
	}
}

defineElement(AddRow);
export default AddRow;
