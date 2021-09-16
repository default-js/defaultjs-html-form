import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import BaseField, {_value} from "./BaseField";
import { findWrapper } from "./wrapper";
import defineElement from "./utils/DefineElement";

const ATTRIBUTES = ["file-format"];

class Field extends BaseField {
	static get observedAttributes() {
		return ATTRIBUTES.concat(BaseField.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Field;
	}

	constructor() {
		super();
		this.on(EVENTS.input, (event) => {
			event.preventDefault();
			event.stopPropagation();

			const value = event.detail ? event.detail : null;
			if(_value(this) != value)
				this.value(value);
		});
	}
	
	async init() {
		await super.init();
		const ready = this.ready;
		if (!ready.resolved) {
			this.wrapper = findWrapper(this);
			if (this.wrapper)
				this.validator.addCustomCheck(async () => {
					return this.wrapper.valid;
				});
		}
		
		this.publishValue();
	}

	readonlyUpdated() {
		if (this.wrapper) this.wrapper.readonly = this.readonly;
	}

	async acceptValue(value) {
		return this.wrapper ? this.wrapper.acceptValue(value) : false;
	}

	async normalizeValue(value) {
		if (this.wrapper) return this.wrapper.normalizeValue(value);

		return value;
	}

	async updatedValue(value) {		
		await this.ready;	
		if (this.wrapper) await this.wrapper.updatedValue(value);
	}
}

defineElement(Field);
export default Field;
