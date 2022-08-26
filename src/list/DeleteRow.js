import { 
	NODENAME_LIST_DELETE_ROW,
	EVENT_LIST_ROW_DELETE
} from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];

class DeleteRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return NODENAME_LIST_DELETE_ROW;
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

define(DeleteRow);
export default DeleteRow;
