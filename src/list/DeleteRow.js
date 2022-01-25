import { 
	NODENAMES,
	EVENT_LIST_ROW_DELETE
} from "../Constants";
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
		await super.init();
		this.active	= true;
	}

	execute() {
		this.trigger(100, EVENT_LIST_ROW_DELETE);
	}
}

defineElement(DeleteRow);
export default DeleteRow;
