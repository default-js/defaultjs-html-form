import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { EVENTS, TRIGGER_TIMEOUT, NODENAMES, ATTRIBUTE_CONDITION } from "./Constants";
import Validation from "./Validation";
import { updateConditionState, updateValidState } from "./utils/StateHelper"
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";

class Validator {
	constructor(base) {
		this.inital = true;
		this.target = base;
		this.customChecks = [];
		this.validations = findValidations(base) || [];
		this.condition = base.attr(ATTRIBUTE_CONDITION);

	}

	addCustomCheck(check) {
		this.customChecks.push(check);
	}

	get form() {
		return this.target.form;
	}

	async validate() {
		const { target, validations, customChecks, condition } = this;
		const { hasValue, required, requiredOnlyOnActive } = target;
		const hasChecks = customChecks.length > 0 || validations.length > 0;
		const data = evaluationData(target);
		

		const conditionValid = condition ? await ExpressionResolver.resolve(condition, data, false) : true;
		updateConditionState(target, conditionValid, this.inital);
j

		let valid = required ? hasValue : true;
			
		if (valid)
			for (let check of customChecks) {
				const test = await check({ data, target });
				if (!test) valid = false;
			}

		for (let validation of validations) {
			if (valid && hasValue) {
				const test = await ExpressionResolver.resolve(validation.condition, data, true);
				validation.active = !test;
				if (!test) valid = false;
			} else
				validation.active = false;
		}

		updateValidState(target, valid, this.inital);
		this.inital = false;

		return valid;
	}
}

export default Validator;
