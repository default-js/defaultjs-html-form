import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import BaseField from "./BaseField";
import defineElement from "./utils/DefineElement";


const ATTRIBUTES = [];

const NAME_SPLITTER = /\./g;

const valueHelper = function (data, name, value) {
	if (data == null || typeof data === "undefined") return null;

	const update = arguments.length > 2;

	const names = name.split(NAME_SPLITTER);
	while (names.length > 1) {
		const key = names.shift();
		let temp = data[key];
		const has = typeof temp !== "undefiend" && temp != null;
		if (!has && !update) return null;
		else if (!has && update) temp = data[key] = {};

		data = temp;
	}

	if (update) data[names[0]] = value;
	else return data[names[0]] ? data[names[0]] : null;
};

class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Container;
	}

	constructor(value = null) {
		super(value ? value : {});
		this.fields = [];

		this.on(EVENTS.valueChanged, (event) => {
			if (event.target != this) {
				const { name, value } = event.target;

				if (name) valueHelper(this.__value__, name, value);
				else if (value != null) ObjectUtils.merge(this.__value__, value);

				this.validate();
				this.publishValue(event.detail[0]);

				event.preventDefault();
				event.stopPropagation();
			}
		});
	}

	async init() {
		await this.initContainer();
	}

	async initContainer() {
		await this.initBaseField();

		this.fields = findFields(this);
		this.on(EVENTS.initialize, (event) => {
			if (event.target != this) {
				const field = event.target;
				if (field instanceof BaseField) {
					if (this.fields.indexOf(field) < 0) {
						this.fields.push(field);
					}

					event.preventDefault();
					event.stopPropagation();
				}
			}
		});

		this.validator.addCustomCheck(async ({ data, target }) => {
			const { fields } = target;
			if (fields) {
				const length = fields.length;
				for (let i = 0; i < length; i++) {
					const field = fields[i];
					if (field.condition && !field.valid) return false;
				}
			}

			return true;
		});
	}

	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	async updatedValue(value) {
		this.__value__ = {};
		const { fields } = this;
		if (fields)
			for (let field of fields) {
				if (field.name) field.value = valueHelper(value, field.name);
				else if (field instanceof Container) field.value = value;
			}
	}
}

defineElement(Container);
export default Container;
