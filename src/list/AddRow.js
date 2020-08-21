import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import FormButton from "../FormButton";


const ATTRIBUTES = [];
class AddRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	
	static init(button) {
		FormButton.init(button);
	}

	constructor() {
		super();		
	}

	connectedCallback() {
		AddRow.init(this);
	}

	execute(){
		this.trigger(100, EVENTS.listRowAdd);
	}
}

customElements.define(NODENAMES.ButtonAddRow, AddRow);
export default AddRow;
