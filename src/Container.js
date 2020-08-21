import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import Field from "./Field";
import { fields } from "..";

const ATTRIBUTES = [];

const init = (container) => {
	container.on(
		EVENTS.changeValue,
		toTimeoutHandle((event) => {}),
	);

	container.on(EVENTS.initialize, (event) => {
		const field = event.target;
		if (field instanceof Field) {
			if (container.fields.indexOf(field) < 0) {
				container.fields.push(field);
				container.trigger(100, EVENTS.changeValue);
			}

			event.preventDefault();
			event.stopPropagation();
		}
	});

	container.fields = findFields(container);
};

class Container extends Field {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	static init(container) {
		Field.init(container);
		init(container);
	}

	constructor() {
		super();
		this.fields = [];
	}

	connectedCallback() {
		Container.init(this);
	}
	
	readonlyUpdated() {
		const {readonly} = this;
		for (let field of this.fields) {
			field.readonly = readonly;
		}
	}

	get value() {
		if (!this.fields || this.fields.length == null) return null;

		const values = {};
		let hasValue = false;
		for (let field of this.fields) {
			if (field.valid) {
				const value = field.value;
				if (typeof value !== "undefined" && value != null) {
					if (field.name) values[field.name] = value;
					else if (ObjectUtils.isPojo(value)) ObjectUtils.merge(values, value);
					hasValue = true;
				}
			}
		}
		if (!hasValue) return null;

		if (this.name) return ({}[this.name] = values);
		else return values;
	}

	set value(value) {
		for (let field of this.fields) {
			if (field.name) field.value = value[field.name];
			else if(field instanceof Container) field.value = value;
		}
	}

	get valid() {
		if (this.fields)
			for (let field of this.fields) {
				if (field.active && field.condition && !field.valid) return false;
			}
		return super.valid;
	}
}

customElements.define(NODENAMES.Container, Container);
export default Container;
