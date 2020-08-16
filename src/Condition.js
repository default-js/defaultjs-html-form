import { EVENTS } from "./Constants";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";

export const ATTRIBUTE_CONDITION = "condition";
export const ATTRIBUTE_CONDITION_VALID = "condition-valid";
export const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";

const setState = (target, valid, initial=false) => {
	const oldState = target.condition;
	if (valid) {
		target.attr(ATTRIBUTE_CONDITION_INVALID, null);
		target.attr(ATTRIBUTE_CONDITION_VALID, "");
	} else {
		target.attr(ATTRIBUTE_CONDITION_VALID, null);
		target.attr(ATTRIBUTE_CONDITION_INVALID, "");
	}
	if (oldState != valid || initial) target.trigger(EVENTS.changeCondition);
};

const init = (condition) => {
	const { target, form } = condition;

	const expression = target.attr(ATTRIBUTE_CONDITION);
	if (typeof expression === "string" && expression.trim().length > 0) {
		condition.expression = expression.trim();
		setState(target, false);
		form.on(EVENTS.changeValue, (event) => {
			if (event.target != target) {
				ExpressionResolver.resolve(condition.expression, form.data, false)
					.then((state) => {
						setState(target, state);
					})["catch"](() => setState(target, false));
			}
		});
	} else setState(target, true, true);
};

class Condition {
	constructor(base) {
		this.target = base;
		init(this);
	}

	get form() {
		return this.target.form;
	}
}
export default Condition;
