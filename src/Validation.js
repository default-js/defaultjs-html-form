import { NODENAME_VALIDATION, EVENT_VALIDATION_REMOVED, ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION } from "./Constants";
import { Component, define } from "@default-js/defaultjs-html-components";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];
/**
 * @typedef ValidationOption
 * @property {boolean} option.hasValue
 * @property {boolean} option.required
 * @property {boolean} option.condition
 * @property {boolean} option.editable
 * @property {object} option.data
 * @property {Base} option.base
 */

class Validation extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_VALIDATION;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.active = false;
	}

	async destroy() {
		this.trigger(EVENT_VALIDATION_REMOVED);
		await super.destroy();
	}

	/**
	 * active state
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}

	/**
	 * set active state
	 *
	 * @type {boolean}
	 */
	set active(active) {
		active ? this.attr(ATTRIBUTE_ACTIVE, "") : this.attr(ATTRIBUTE_ACTIVE, null);
	}

	/**
	 * condition string for evaluation
	 *
	 * @readonly
	 * @type {string}
	 */
	get condition() {
		return this.attr(ATTRIBUTE_CONDITION);
	}

	/**
	 * validate
	 * 
	 * @async
	 * @param {ValidationOption} option
	 * @returns {Promise<boolean>}
	 */
	async validate({ hasValue, data }) {
		const valid = hasValue ? await ExpressionResolver.resolve(this.condition, data, false) : true;
		this.active = !valid;
		return valid;
	}
}
define(Validation);
export default Validation;
