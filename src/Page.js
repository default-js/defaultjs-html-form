import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { STATES, NODENAMES, EVENTS } from "./Constants";
import { findFields } from "./utils/NodeHelper";
import Base from "./Base";
import Field from "./Field";
import "./fields";
import Container from "./Container";
import List from "./List";

export const ATTRIBUTE_STEP = "step";
const ATTRIBUTES = [ATTRIBUTE_STEP];

const init = (page) => {
	page.active = false;
	page.on(EVENTS.changeValue, (event) => {});
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
		return true;
	}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
