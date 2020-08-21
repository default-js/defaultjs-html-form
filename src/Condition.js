import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_CONDITION, ATTRIBUTE_CONDITION_VALID, ATTRIBUTE_CONDITION_INVALID } from "./Constants";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import { evaluationData } from "./utils/DataHelper";
import {updateConditionState} from "./utils/StateHelper"

const init = (condition) => {
	const { target, form } = condition;

	const expression = target.attr(ATTRIBUTE_CONDITION);
	if (typeof expression === "string" && expression.trim().length > 0) {
		condition.expression = expression.trim();
		updateConditionState(target, false);
		form.on(
			EVENTS.changeValue,
			toTimeoutHandle((event) => {
				if (event.target != target) {
					const data = evaluationData(target);
					ExpressionResolver.resolve(condition.expression, data, false)
						.then((state) => {
							updateConditionState(target, state);
						})
						["catch"](() => updateConditionState(target, false));
				}
			}),
		);
	} else updateConditionState(target, true, true);
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
