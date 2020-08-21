import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";


const ATTRIBUTES = [];

const init = (button) => {
	button.on("click", (event) => {
        button.trigger(100, EVENTS.listRowAdd);
    });
};

class ListRowAdd extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(listRowAdd){
		init(listRowAdd);
	}

	constructor() {
		super();		
	}

	connectedCallback() {
		ListRowAdd.init(this);
	}
}

customElements.define(NODENAMES.ListRowAdd, ListRowAdd);
export default ListRowAdd;
