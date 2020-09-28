import { NODENAMES, EVENTS } from "../Constants";
import FormButton from "../FormButton";
import defineElement from "../utils/DefineElement";

const ATTRIBUTES = [];

class DeleteRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return NODENAMES.ButtonDeleteRow;
	}

	constructor() {
		super();
	}

	async init(){
		FormButton.init(this);
		this.active	= true;
	}

	execute() {
		this.trigger(100, EVENTS.listRowDelete);
	}
}

defineElement(DeleteRow);
export default DeleteRow;
