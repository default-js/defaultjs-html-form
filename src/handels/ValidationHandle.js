import { EVENT_VALIDATION_REMOVED, NODENAME_VALIDATION } from "../Constants";
import { addAllToSet } from "../utils/DataHelper";
import { findValidations } from "../utils/ValidationHelper";
import Base from "../Base";
import Validation from "../Validation";





/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback CustomValidation
 * @param {import("../Validation").ValidationOption} option
 */

/**
 * @async
 * @function
 * 
 * execute custom validation callback functions
 * 
 * @param {Array<Function>} validations
 * @param {import("../Validation").ValidationOption} option
 * @returns {Promise<boolean>}
 */
const validateCustomValidations = async (validations, option) => {
	if ((validations.size == 0)) return true;

	const promises = await Promise.all(Array.from(validations).map((validation) => validation(option)));
	return promises.every((valid) => valid);
};

/**
 * @async
 * @function
 * 
 * execute validations
 * 
 * @param {Array<Validation>} validations
 * @param {import("../Validation").ValidationOption} option
 * @returns {Promise<boolean>}
 */
const validateValidations = async (validations, option) => {
	if ((validations.size == 0)) return true;

	const promises = await Promise.all(Array.from(validations).map((validation) => validation.validate(option)));
	return promises.every((valid) => valid);
};

class ValidationHandle {
	/**
	 * Reference base object
	 *
	 * @type {Base}
	 */
	#base = null;

	/**
	 * Description placeholder
	 *
	 * @type {Set<Validation>}
	 */
	#validations = new Set();
	#customs = new Set();

	constructor(base) {
		this.#base = base;

		base.on(EVENT_VALIDATION_REMOVED, (event) => {
			event.stopPropagation();
			this.#validations.delete(event.target);
		});
	}

	async init() {
		const base = this.#base;
		const { form, id, name } = base;
		const validations = this.validations;
		if (id && id.length != 0) {
			addAllToSet(validations, form.find(`${NODENAME_VALIDATION}[for="${id}"]`));
			addAllToSet(validations, form.find(`${NODENAME_VALIDATION}[for="#${id}"]`));
		}

		if (name && name.length != 0) {
			addAllToSet(validations, form.find(`${NODENAME_VALIDATION}[for="${name}"]`));
		}

		addAllToSet(validations, findValidations(base));
	}

	get validations() {
		return this.#validations;
	}

	get customValidations() {
		return this.#customs;
	}

	addCustomValidation(validation) {
		this.#customs.add(validation);
	}

	async validate(data) {
		const base = this.#base;
		const { hasValue, required, condition, editable } = base;

		//console.log(`${base.nodeName}(${base.name}) validate:`, { hasValue, required, condition, editable, currentValid }, data);
		let valid = true;
		if (condition) {
			valid = required ? hasValue : true;

			const option ={
				hasValue: hasValue, 
				required: required, 
				condition: condition, 
				editable: editable,
				data,
				base
			};

			//console.log("validation option:", option)

			valid = await validateCustomValidations(this.#customs, option) && valid;
			valid = await validateValidations(this.#validations, option) && valid;
		}

		base.valid = valid;

		//console.log(`${base.nodeName}(${base.name}) validate result:`, {valid});
		return valid;
	}
}

export default ValidationHandle;
