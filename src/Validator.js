import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { ATTRIBUTE_CONDITION, ATTRIBUTE_EDITABLE_CONDITION, FORMSTATES } from "./Constants";
import "./Validation";
import { updateConditionState, updateValidState } from "./utils/StateHelper";
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";

const updateReadonly = async ({ data, valid, base, condition }) => {
	const { form } = base;
	if (form.state == FORMSTATES.input) {
		/*if (!valid)
			base.readonly = false;
		else */
		if (condition) {
			const test = await ExpressionResolver.resolve(condition, data, false);
			base.editable = test;
			return test;
		}
	}
	return true;
};

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

	async validate(data) {
		const { base, validations, customChecks, condition, editableCondition } = this;
		const { hasValue, required } = base;		
		const initial = this.inital;
		this.inital = false;

		let valid = required ? hasValue : true;
		if (condition) {
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
				} else validation.active = false;
			}

			const editable = await updateReadonly({ data, valid, base, condition: editableCondition });
			if (!editable) valid = true;

			updateValidState(base, valid, initial);
		}

		return valid;
	}
}

export default Validator;
