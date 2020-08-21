import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Container from "../Container";

const ATTRIBUTES = [];

const init = (row) => {};

class ListRow extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}
	static init(listRow) {
		Container.init(listRow);
		init(listRow);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		ListRow.init(this);
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
