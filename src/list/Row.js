import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS } from "../Constants";
import Container from "../Container";
import DeleteRow from "./DeleteRow";

const ATTRIBUTES = [];

const init = (row) => {
};

class ListRow extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}
	static init(row) {
		Container.init(row);
		init(row);
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
