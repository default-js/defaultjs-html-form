import Component from "@default-js/defaultjs-html-components/src/Component";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";
import SubmitActionResult, { STATE_FAIL,STATE_SUCCESS } from "./SubmitActionResult";
import { EVENT_INITIALIZE_SUBMIT_ACTION, NODENAME_FORM, ATTRIBUTE_CONDITION } from "../Constants";

// private member
const _form = privatePropertyAccessor("form");

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
		FAIL : STATE_FAIL,
		SUCCESS : STATE_SUCCESS
	}
	
	constructor() {
		super();
	}

	async init() {
		await super.init();
		const form = this.parent(NODENAME_FORM);
		_form(this, form);
		if (form) this.trigger(EVENT_INITIALIZE_SUBMIT_ACTION);
	}

	get form() {
		return _form(this);
	}

	async accept(data = {}) {
		const condition = this.attr(ATTRIBUTE_CONDITION);
        if(condition)
            return await ExpressionResolver.resolve(condition, data, false);
            
        return true;
	}

	/**
	 * Override this function!
	 */
	async execute(data = {}) {
		return new SubmitActionResult(STATE_FAIL, "not implemented");
	}
}
export default BaseSubmitAction;
