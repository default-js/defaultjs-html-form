import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";


const ATTRIBUTES = [];

const init = (button) => {
	button.on("click", (event) => {
        button.trigger(100, EVENTS.listRowDelete);
    });
};

class ListRowDelete extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(listRowDelete){
		init(listRowDelete);
	}

	constructor() {
		super();		
	}

	connectedCallback() {
		ListRowDelete.init(this);
	}
}

customElements.define(NODENAMES.ListRowDelete, ListRowDelete);
export default ListRowDelete;
