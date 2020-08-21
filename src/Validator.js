import { EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Validation from "./Validation";
import { findValidations } from "./utils/NodeHelper";
import { evaluationData } from "./utils/DataHelper";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import {updateValidState} from "./utils/StateHelper";

const init = (validator) => {
	const { target, form } = validator;
	const validations = (validator.validations = findValidations(target));
	if ((validations && validations.length > 0) || target.required) {
		form.on(
			toEvents(EVENTS.changeValue, EVENTS.changeActive),
			toTimeoutHandle((event) => {
				validator.validate();
			}),
		);
	}
	validator.validate();
};

class Validator {
	constructor(base) {
		this.target = base;
		init(this);
	}

	get form() {
		return this.target.form;
	}

	async validate() {
		const { target, validations } = this;
		const { hasValue, required, requiredOnlyOnActive, active } = target;
		const data = evaluationData(target);

		let valid = true;
		for (let validation of this.validations) {
			if (!hasValue || !active) validation.active = false;
			else {
				const test = await ExpressionResolver.resolve(validation.condition, data, true);
				validation.active = !test;
				if (!test) valid = false;
			}
		}

		if (!active) updateValidState(target, null);
		else if (!hasValue && required) updateValidState(target, false);
		else updateValidState(target, valid);
	}
}

export default Validator;
