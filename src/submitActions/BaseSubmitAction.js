import Component from "@default-js/defaultjs-html-components/src/Component";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";
import SubmitActionResult, { STATE_FAIL, STATE_SUCCESS } from "./SubmitActionResult";
import { EVENT_INITIALIZE_SUBMIT_ACTION, NODENAME_FORM, ATTRIBUTE_CONDITION } from "../Constants";

// logic
/**
 * BaseSubmitAction class
 *
 * @class BaseSubmitAction
 * @typedef {BaseSubmitAction}
 * @extends {Component}
 */
class BaseSubmitAction extends Component {
	static STATES = {
		FAIL: STATE_FAIL,
		SUCCESS: STATE_SUCCESS,
	};

	constructor() {
		super();
	}

	#initialized = false;
	#form;

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.style.display = "none";
			this.#form = this.parent(NODENAME_FORM);
			if (this.#form) this.trigger(EVENT_INITIALIZE_SUBMIT_ACTION);
		}
	}

	get form() {
		return this.#form;
	}

	async accept(data = {}) {
		const condition = this.attr(ATTRIBUTE_CONDITION);
		if (condition) return await ExpressionResolver.resolve(condition, data, false);

		return true;
	}

	/**
	 * @abstract
	 * @param {*} data 
	 * @param {*} context 
	 * @param {import("../Form").FormResultOption} formResultOption 
	 * @returns {SubmitActionResult}
	 */
	async execute(data = {}, context = {}, formResultOption) {
		return new SubmitActionResult(STATE_FAIL, "not implemented", null, data, context, formResultOption);
	}
}
export default BaseSubmitAction;
