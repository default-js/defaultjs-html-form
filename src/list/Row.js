import { 
	NODENAME_LIST_ROW
} from "../Constants";
import Container from "../Container";
import DeleteRow from "./DeleteRow";

const ATTRIBUTES = [];
class ListRow extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}

	static get NODENAME() {
		return NODENAME_LIST_ROW;
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

customElements.define(ListRow.NODENAME, ListRow);
export default ListRow;
