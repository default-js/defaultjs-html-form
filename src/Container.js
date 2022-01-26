import { 
	NODENAMES,
	EVENT_FIELD_INITIALIZED,
	EVENT_VALUE_CHANGED,
} from "./Constants";
import { findFields } from "./utils/NodeHelper";
import BaseField, { _value } from "./BaseField";
import defineElement from "./utils/DefineElement";
import { valueHelper } from "./utils/DataHelper";

const ATTRIBUTES = [];




const refreshValue = async (self) => {
	const data = {};
	const fields = self.fields;

	for (let field of fields) {
		if (field.condition && field.hasValue) {
			const name = field.name;
			const value = await field.value();
			if (name) valueHelper(data, name, value);
			else Object.assign(data, value);
		}
	}

	if (Object.getOwnPropertyNames(data).length > 0) _value(self, data);
	else _value(self, null);
};

class Container extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Container;
	}

	constructor(value = null) {
		super(value);
		this.fields = [];
		this.on(EVENT_VALUE_CHANGED, (event) => {
			const field = event.target;
			if (field != this) {
				event.preventDefault();
				event.stopPropagation();

				const chain = event.detail;
				this.childValueChanged(field, chain);
			}
		});
	}

	async init() {
		const ready = this.ready;
		await super.init();
		this.fields = findFields(this);
		if (!ready.resolved) {
			this.on(EVENT_FIELD_INITIALIZED, (event) => {
				const field = event.target;
				if (field != this) {				
					if (field instanceof BaseField) {
						if (this.fields.indexOf(field) < 0){
							this.fields.push(field);
							refreshValue(this)
						}						
					}
					
					event.preventDefault();
					event.stopPropagation();
				}
			});

			this.validator.addCustomCheck(async ({ data, base }) => {
				const { fields } = base;
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
	}

	readonlyUpdated() {
		const { readonly, fields } = this;
		if (fields)
			for (let field of fields) {
				field.readonly = readonly;
			}
	}

	async updatedValue(value) {
		await this.ready;
		const fields = this.fields;
		if (fields) {
			for (let field of fields) {
				if (field.name) await field.value(valueHelper(value, field.name));
				else if (field instanceof Container) await field.value(value);
			}

			await refreshValue(this);
		}
	}

	async childValueChanged(field, chain) {
		await this.ready;

		await refreshValue(this);

		await this.validate();
		await this.publishValue(chain);
	}
}

defineElement(Container);
export default Container;
