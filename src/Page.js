import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import Base from "./Base";
import "./fields";
import Field from "./Field";

export const ATTRIBUTE_STEP = "step";
const ATTRIBUTES = [ATTRIBUTE_STEP];

const init = (page) => {
	page.active = false;
	page.on(EVENTS.changeValue, toTimeoutHandle((event) => {}));
	page.fields = findFields(page);
};

class Page extends Base {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Field.observedAttributes);
	}

	constructor() {
		super();
		init(this);
	}

	get value() {
		const values = {};
		for (let field of this.fields) {
			if (field.valid) {
				const value = field.value;
				if (typeof value !== "undefined") values[field.name] = value;
			}
		}
		return values;
	}

	get valid(){
		for (let field of this.fields) {
			if (field.active && field.condition && !field.valid) {
				return false;
			}
		}
		return true;
	}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
