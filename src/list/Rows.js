import { NODENAME_LIST_ROWS } from "../Constants";
import { Component, define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class ListRows extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_LIST_ROWS;
	}

	constructor() {
		super();
	}
}

define(ListRows);
export default ListRows;
