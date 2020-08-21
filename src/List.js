import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import Field from "./Field";
import ListRow from "./list/ListRow";
import ListRowAdd from "./list/ListRowAdd";
import ListRowDelete from "./list/ListRowDelete";
import ListRows from "./list/ListRows";

const ATTRIBUTES = [];

const init = (list) => {
	const { container, template } = list;

	
	list.on(EVENTS.initialize, (event) => {
		event.preventDefault();
		event.stopPropagation();		
	});


	list.on(EVENTS.listRowAdd, (event) => {
		const row = new ListRow();
		container.append(row);
		row.append(document.importNode(template.content, true).childNodes);

		list.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);

		event.preventDefault();
		event.stopPropagation();
	});

	list.on(EVENTS.listRowDelete, (event) => {
		const row = event.target.parent(NODENAMES.ListRow);
		row.remove();

		list.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);

		event.preventDefault();
		event.stopPropagation();
	});

	list.on(
		EVENTS.changeValue,
		toTimeoutHandle((event) => {}),
	);
};

class List extends Field {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	static init(list) {
		Field.init(list);
		init(list);
	}

	constructor() {
		super();
		this.template = this.find("template").first();
		this.container = this.find(NODENAMES.ListRows).first();
	}

	connectedCallback() {
		List.init(this);
	}

	get rows() {
		if (this.condition) return this.container.children;
		return null;
	}

	get value() {
		if (!this.rows || this.rows.length == null) return null;

		const values = [];
		let hasValue = false;
		for (let row of this.rows) {
			if (row.valid) {
				const value = row.value;
				if (typeof value !== "undefined" && value != null) {
					values.push(value);
					hasValue = true;
				}
			}
		}
		if (!hasValue) return null;

		return ({}[this.name] = values);
	}

	set value(value) {}

	get valid() {
		if (this.rows)
			for (let row of this.rows) {
				if (!row.valid) return false;
			}
		return super.valid;
	}
}

customElements.define(NODENAMES.List, List);
export default List;
