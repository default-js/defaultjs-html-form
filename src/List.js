import "@default-js/defaultjs-extdom";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_MAX } from "./Constants";
import { toTimeoutHandle } from "./utils/EventHelper";
import { treeFilter } from "./utils/NodeHelper";
import Field from "./Field";
import Row from "./list/Row";
import AddRow from "./list/AddRow";
import DeleteRow from "./list/DeleteRow";
import Rows from "./list/Rows";

const ATTRIBUTES = [ATTRIBUTE_MAX];

const init = (list) => {
	const { container, template, validator } = list;
	const addButton = treeFilter({
		root: list,
		filter: (element) => {
			if (element instanceof AddRow) return { accept: true, stop: true };
			else if (element instanceof Field) return { accept: false, stop: true };
			return { accept: false };
		},
	})[0];

	validator.addCustomCheck(async ({ data, target }) => {
		const length = list.rows.length;
		const max = list.max;

		if (length == max) addButton.disabled = true;
		else if (length < max) addButton.disabled = false;

		return length <= max;
	});

	list.on(EVENTS.initialize, (event) => {
		event.preventDefault();
		event.stopPropagation();
	});

	list.on(EVENTS.listRowAdd, (event) => {
		const row = new Row();
		container.append(row);
		row.append(document.importNode(template.content, true).childNodes);

		row.trigger(TRIGGER_TIMEOUT, EVENTS.changeValue);

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

	get max() {
		if (this.hasAttribute(ATTRIBUTE_MAX)) return parseInt(this.attr(ATTRIBUTE_MAX));
		return Number.NaN;
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
