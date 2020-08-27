import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { EVENTS, TRIGGER_TIMEOUT, NODENAMES } from "./Constants";
import Validation from "./Validation";
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";

const init = (validator) => {
	const { target, form } = validator;
	validator.validations = findValidations(target) || [];
	
	form.on(
		[EVENTS.changeValue],
		toTimeoutHandle((event) => {
			if(event.target != target)
				validator.validate();
		})
	);
};

class Validator {
	constructor(base) {
		this.target = base;
		this.customChecks = [];
		init(this);
	}

	addCustomCheck(check) {
		this.customChecks.push(check);
	}

	get form() {
		return this.target.form;
	}

	async validate() {
		const { target, validations , customChecks} = this;
		const { hasValue, required, requiredOnlyOnActive, active } = target;
		
		const hasChecks = customChecks.length > 0 || validations.length > 0;
		
		if(!active)
			return true;
		
		if(!hasChecks)
			return hasValue || !required;
		

		const data = evaluationData(target);
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
