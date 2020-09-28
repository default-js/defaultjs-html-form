import { NODENAMES, EVENTS } from "../Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";

const ATTRIBUTES = [];
class ListRows extends Component {
	static get observedAttributes() {
		return ATTRIBUTES.concat(ATTRIBUTES);
	}

	static get NODENAME() {
		return NODENAMES.ListRows;
	}

	constructor() {
		super();
	}
}

customElements.define(ListRows.NODENAME, ListRows);
export default ListRows;
