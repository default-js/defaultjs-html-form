import { 
    EVENT_VALIDATION_INITIALIZED, 
    EVENT_VALIDATION_REMOVED 
} from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";


const validateCustomValidations = async (validations, data, base) => {
	let valid = true;
	for (let check of validations) {
		if (!(await check({ data, base }))) valid = false;
	}
	return valid;
};

class ValidationHandle {
	#base;
	#validations = new Set();
	#customs = new Set();

	constructor(base) {
		this.#base = base;
		base.on(EVENT_VALIDATION_INITIALIZED, (event) => {
			event.stopPropagation();
			this.#validations.add(event.target);
		});

		base.on(EVENT_VALIDATION_REMOVED, (event) => {
			event.stopPropagation();
			this.#validations.delete(event.target);
		});
	}

	addCustomValidation(validation) {
		this.#customs.add(validation);
	}

	async validate(data) {
		const base = this.#base;
		const customs = this.#customs;
		const validations = this.#validations;
        const current = this.#base.valid;        
		const { hasValue, required, condition, editable } = this.#base;

        let valid = true;
		if (!editable) {
			valid = required ? hasValue : true;

			if (condition) {
				if (valid) valid = await validateCustomValidations(customs, data, base);

				for (let validation of validations) {
					if (valid && hasValue) {
						const test = await ExpressionResolver.resolve(validation.condition, data, true);
						validation.active = !test;
						if (!test) valid = false;
					} else validation.active = false;
				}
			}
		}

        if(valid != current)
            this.#base.valid = valid;

		return valid;
	}
}

export default ValidationHandle;
