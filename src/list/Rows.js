import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";


const ATTRIBUTES = [];

const init = (element) => {
};

class ListRows extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static init(listRows){
		init(listRows);
	}

	constructor() {
		super();		
	}

	connectedCallback() {
		ListRows.init(this);
	}
}

customElements.define(NODENAMES.ListRows, ListRows);
export default ListRows;
