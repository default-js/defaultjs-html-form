import { 
	NODENAME_LIST_ADD_ROW, 
	EVENT_LIST_ROW_ADD
} from "../Constants";
import FormButton from "../FormButton";
import { define } from "@default-js/defaultjs-html-components";

export const EVENT__INITIALIZED__BUTTON__ADDROW = `${NODENAME_LIST_ADD_ROW}:initialized`;

const ATTRIBUTES = [];
class AddRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME(){
		return NODENAME_LIST_ADD_ROW;
	}

	constructor() {
		super();
		this.ready.then(() => this.trigger(EVENT__INITIALIZED__BUTTON__ADDROW))
	}

	async init() {
		await super.init();
		this.active = true;
	}

	execute() {
		this.trigger(EVENT_LIST_ROW_ADD);
	}
}

define(AddRow);
export default AddRow;
