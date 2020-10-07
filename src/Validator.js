import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { EVENTS, TRIGGER_TIMEOUT, NODENAMES, ATTRIBUTE_CONDITION, ATTRIBUTE_EDITABLE_CONDITION, FORMSTATES } from "./Constants";
import Validation from "./Validation";
import { updateConditionState, updateValidState } from "./utils/StateHelper"
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";


const updateReadonly = async ({ data, valid, base, condition }) => {
	const { form } = base;
	if (form.state == FORMSTATES.input) {
		if (!valid)
			base.readonly = false;
		else if (condition) {
			const test = await ExpressionResolver.resolve(condition, data, false);
			base.editable = test;
			return test;
		}
	}
	return valid;
}

class Validator {
	constructor(base) {
		this.inital = true;
		this.base = base;
		this.customChecks = [];
		this.validations = findValidations(base) || [];
		this.condition = base.attr(ATTRIBUTE_CONDITION);
		this.editableCondition = base.attr(ATTRIBUTE_EDITABLE_CONDITION);

	}

	addCustomCheck(check) {
		this.customChecks.push(check);
	}

	get form() {
		return this.base.form;
	}

	async validate() {
		const { base, validations, customChecks, condition, editableCondition } = this;
		const { hasValue, required, requiredOnlyOnActive } = base;
		const hasChecks = customChecks.length > 0 || validations.length > 0;
		const data = evaluationData(base);


		const conditionValid = condition ? await ExpressionResolver.resolve(condition, data, false) : true;
		updateConditionState(base, conditionValid, this.inital);

		let valid = required ? hasValue : true;
		if (conditionValid) {
			if (valid)
				for (let check of customChecks) {
					const test = await check({ data, base });
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

			const editable = updateReadonly({ data, valid, base, condition: editableCondition });
			if(!editable)
				valid = true;
			updateValidState(base, valid, this.inital);
			this.inital = false;
		}
		return valid;

	}
}

export default Validator;
