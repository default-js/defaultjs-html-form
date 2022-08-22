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
			#base.readonly = false;
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
	#base;
	#customChecks = [];
	#validations;
	#editableCondition;

	constructor(base) {
		this.#base = base;

		this.#validations = findValidations(base) || [];
		this.#editableCondition = base.attr(ATTRIBUTE_EDITABLE_CONDITION);
	}

	addCustomCheck(check) {
		this.#customChecks.push(check);
	}

	get form() {
		return this.#base.form;
	}

	async #validateCustom(data) {
		const base = this.#base;
		const customChecks = this.#customChecks;
		let valid = true;
		for (let check of customChecks) {
			if (!(await check({ data, base }))) 
				valid = false;
		}
		return valid;
	}

	async validate(data) {		
		const base = this.#base;
		const validations = this.#validations;
		const editableCondition = this.#editableCondition;
		const { hasValue, required, condition } = this.#base;

		console.log("updateValidState:", {base, data});

		let valid = required ? hasValue : true;

		if (condition) {
			if (valid) valid = await this.#validateCustom(data);

			for (let validation of validations) {
				if (valid && hasValue) {
					const test = await ExpressionResolver.resolve(validation.condition, data, true);
					validation.active = !test;
					if (!test) valid = false;
				} else validation.active = false;
			}

			const editable = await updateReadonly({ data, valid, base, condition: editableCondition });
			if (!editable) valid = true;
		}

		updateValidState(base, valid);

		return valid;
	}
}

export default Validator;
