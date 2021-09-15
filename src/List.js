import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_MAX, ATTRIBUTE_INVALID } from "./Constants";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { toTimeoutHandle } from "./utils/EventHelper";
import { treeFilter } from "./utils/NodeHelper";
import defineElement from "./utils/DefineElement";
import BaseField from "./BaseField";
import Row from "./list/Row";
import AddRow from "./list/AddRow";
import DeleteRow from "./list/DeleteRow";
import Rows from "./list/Rows";

const ATTRIBUTES = [ATTRIBUTE_MAX];

const findAddButton = (list) => {
	return treeFilter({
		root: list,
		filter: (element) => {
			if (element instanceof AddRow) return { accept: true, stop: true };
			else if (element instanceof BaseField) return { accept: false, stop: true };
			return { accept: false };
		},
	})[0];
};

const createRow = async (list, value) => {
	const { container, template } = list;
	const row = document.importNode(template.content, true).children[0];
	container.append(row);

	if (value) await row.value(value);

	return row;
};

class List extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.List;
	}

	constructor(value = null) {
		super(value ? value : []);

		this.on(
			EVENTS.valueChanged,
				(event) => {
					const row = event.target;
					if (row instanceof Row) {
						event.preventDefault();
						event.stopPropagation();
				
						const chain = event.detail;
						this.childValueChanged(row, chain);
					}
				}
		);

		this.on(EVENTS.listRowAdd, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { readonly, __value__ } = this;
			if (!readonly) {
				const row = createRow(this);
				__value__.push(row.value);

				this.validate();
				this.publishValue();
			}
		});

		this.on(EVENTS.listRowDelete, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const { rows, readonly, __value__ } = this;
			if (!readonly) {
				const row = event.target.parent(NODENAMES.ListRow);
				const index = rows.indexOf(row);
				if (index >= 0) {
					row.remove();
					rows.splice(index, 1);
					__value__.splice(index, 1);

					this.validate();
					this.publishValue();
				}
			}
		});
	}

	async init() {
		await super.init();
		this.__value__ = [];
		const ready = this.ready;
		if (!ready.resolved) {
			this.template = this.find("template").first();
			this.container = this.find(NODENAMES.ListRows).first();
			const { container, template, validator } = this;
			const addButton = findAddButton(this);

			validator.addCustomCheck(async ({}) => {
				const { rows, max, readonly } = this;
				const length = rows.length;
				if (!readonly) {
					if (length == max) addButton.disabled = true;
					else if (length < max) addButton.disabled = false;
				}
				return length <= max;
			});

			validator.addCustomCheck(async () => {
				const { rows } = this;
				if (rows)
					for (let row of rows) {
						if (!row.valid) return false;
					}

				return true;
			});
		}

		this.validate();
		this.publishValue();
	}

	readonlyUpdated() {
		const { readonly } = this;
		for (let row of this.rows) {
			row.readonly = readonly;
		}
	}

	get rows() {
		return Array.from(this.container.children);
	}

	get max() {
		if (this.hasAttribute(ATTRIBUTE_MAX)) return parseInt(this.attr(ATTRIBUTE_MAX));
		return Number.MAX_SAFE_INTEGER;
	}

	acceptValue(value) {
		return !value || value instanceof Array;
	}

	normalizeValue(value) {
		return value ? value.filter((item) => !!item) : null;
	}

	async updatedValue(value) {
		this.container.children.remove();
		this.__value__ = value;

		if(value)
			for (let val of value) await createRow(this, val);
	}

	async childValueChanged(row, chain){
		await this.ready;
		const rows = this.rows;
		const value  = await row.value();

		const index = rows.indexOf(row);
		if(!this.__value__)
			this.__value__ = [];
			
		this.__value__[index] = value;

		await this.validate();
		await this.publishValue(chain);
	}
}

defineElement(List);
export default List;
