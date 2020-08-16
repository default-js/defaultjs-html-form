import { EVENTS } from "./Constants";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Validation from "./Validation";
import { findValidations } from "./utils/NodeHelper";

export const ATTRIBUTE_VAILD = "valid";
export const ATTRIBUTE_INVAILD = "invalid";

const setState = (target, valid) => {
    console.log("validate state:", target, valid);
	if (typeof valid === "undefined") {
		target.attr(ATTRIBUTE_INVAILD, null);
		target.attr(ATTRIBUTE_VAILD, null);
	} else if (valid) {
		target.attr(ATTRIBUTE_INVAILD, null);
		target.attr(ATTRIBUTE_VAILD, "");
	} else {
		target.attr(ATTRIBUTE_INVAILD, "");
		target.attr(ATTRIBUTE_VAILD, null);
	}
};

const init = (validator) => {
	const { target, form } = validator;
	const validations = (validator.validations = findValidations(target));
	if ((validations && validations.length > 0) || target.required) {
		form.on(EVENTS.changeValue + " " + EVENTS.changeActive, (event) => {
			validator.validate();
		});
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
        const data = this.form.data;
        data["$value"] = target.value;
        
        console.log("validate:", target);
        console.log("hasValue", hasValue, "required", required, "active", active);

		let valid = true;
		for (let validation of this.validations) {
			if (!hasValue || !active) validation.active = false;
			else {
                const test = await ExpressionResolver.resolve(validation.condition, data, true);
                validation.active = !test;
				if (!test) valid = false;
			}
		}

        if (!active) setState(target, null);
        else if (!hasValue && required)
            setState(target, false);
        else
            setState(target, valid);
	}
}

export default Validator;
