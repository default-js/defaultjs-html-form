import { CONDITIONSTATES, EVENTS } from "./Constants";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";

export const ATTRIBUTE_CONDITION = "condition";

const setState = (target, valid) => {
	if (valid) {
		target.attr(CONDITIONSTATES.invalid, null);
		target.attr(CONDITIONSTATES.valid, "");
	} else {
		target.attr(CONDITIONSTATES.valid, null);
		target.attr(CONDITIONSTATES.invalid, "");
	}
};

const init = (condition) => {
	const { target, form } = condition;

	const expression = target.attr(ATTRIBUTE_CONDITION);
	if (typeof expression === "string" && expression.trim().length > 0) {
		condition.expression = expression.trim();
		setState(target, false);
		form.on(EVENTS.changeValue, (event) => {
			ExpressionResolver.resolve(condition.expression, form.data, false)
				.then((state) => setState(target, state))
				["catch"](() => setState(target, false));
		});
	} else setState(target, true);
};

class Condition {
	constructor(base) {
		this.target = base;
		init(this);
	}

	get form() {
		return this.target.form;
	}

	get valid() {
		if (this.target.hasAttribute(CONDITIONSTATES.valid)) return true;
		return false;
	}
}
export default Condition;
