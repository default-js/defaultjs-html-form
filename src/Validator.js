import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { EVENTS, TRIGGER_TIMEOUT, NODENAMES, ATTRIBUTE_CONDITION } from "./Constants";
import Validation from "./Validation";
import { updateConditionState } from "./utils/StateHelper"
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";

class Validator {
	constructor(base) {
		this.target = base;
		this.customChecks = [];
		this.validations = findValidations(base) || [];
		this.condition = base.attr(ATTRIBUTE_CONDITION);

		base.form.on(
			EVENTS.executeValidate,
			toTimeoutHandle((event) => {
				console.log("on", EVENTS.executeValidate, { event, target: this.target })
				this.validate();
			})
		);
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

		const conditionValid = condition ? ExpressionResolver.resolve(condition, data, false) : true;
		if (target.condition != conditionValid)
			updateConditionState(target, conditionValid);

		if (!condition)
			return true;

		if (!hasValue && required)
			return false;

		if (!hasChecks)
			return true;


		let valid = true;
		for (let check of this.customChecks) {
			const test = await check({ data, target });
			if (!test) valid = false;
		}
		for (let validation of validations) {
			if (!hasValue || !active) validation.active = false;
			else {
				const test = await ExpressionResolver.resolve(validation.condition, data, true);
				validation.active = !test;
				if (!test) valid = false;
			}
		}

		return valid;
	}
}

export default Validator;
