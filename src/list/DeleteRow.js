import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import FormButton from "../FormButton";

const ATTRIBUTES = [];

class DeleteRow extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(button) {
		FormButton.init(button);
		button.active	= true;
	}

	constructor() {
		super();
	}

	connectedCallback() {
		DeleteRow.init(this);
	}

	execute() {
		this.trigger(100, EVENTS.listRowDelete);
	}
}

customElements.define(NODENAMES.ButtonDeleteRow, DeleteRow);
export default DeleteRow;
