import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Container from "../Container";
import DeleteRow from "./DeleteRow";

const ATTRIBUTES = [];

class ListRow extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}
	
	constructor() {
		super();
	}

	get active() {
		return true;
	}
	set active(active) {}

	get condition() {
		return true;
	}

	get name() {
		return null;
	}
}

customElements.define(NODENAMES.ListRow, ListRow);
export default ListRow;
