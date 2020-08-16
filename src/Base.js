import { NODENAMES } from "./Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

const ATTRIBUTE_ACTIVE = "active";
const ATTRIBUTE_READONLY = "readonly";
const ATTRIBUTE_CONDITION = "condition";

class Base extends HTMLElement {
	constructor() {
		super();
	}

	get form() {
		return this.parent(NODENAMES.Form).first();
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active
			? this.attr(ATTRIBUTE_ACTIVE, "")
			: this.attr(ATTRIBUTE_ACTIVE, undefined);
	}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}
	set readonly(readonly) {
		readonly
			? this.attr(ATTRIBUTE_READONLY, "")
			: this.attr(ATTRIBUTE_READONLY, undefined);
	}

	async condition() {
		if (this.hasAttribute(ATTRIBUTE_CONDITION)) {
			const condition = this.attr(ATTRIBUTE_CONDITION);
			if (typeof condition === "string" && condition.trim().length > 0) {
				return ExpressionResolver.resolve(condition, this.form.data, false);
			}
		}
		return true;
	}

	async valid() {
		return true;
	}

	async value(value) {
		if (arguments == 0) return null;
	}
}

export default Base;
