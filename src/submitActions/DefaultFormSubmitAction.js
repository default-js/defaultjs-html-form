import {define} from "@default-js/defaultjs-html-components";
import BaseSubmitAction from "./BaseSubmitAction";
import SubmitActionResult, { STATE_SUCCESS, STATE_FAIL } from "./SubmitActionResult";
import {NODENAME_SUBMIT_ACTION} from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

const NODENAME = `${NODENAME_SUBMIT_ACTION}-default`;

class DefaultFormSubmitAction extends BaseSubmitAction {

    static get NODENAME() { return NODENAME;}


	constructor(endpoint, method) {
		super();
		this.endpoint = endpoint;
		this.method = method;
	}

	async execute(data) {		
		let endpoint = this.endpoint;
		endpoint = await ExpressionResolver.resolveText(endpoint, data, endpoint);
		const url = new URL(endpoint, location);

		const response = await fetch(url, {
			method: this.method,
			credentials: "include",
			mode: "cors",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		});		
			
		return new SubmitActionResult(this, response.ok ? STATE_SUCCESS : STATE_FAIL, response);		
	}
};

define(DefaultFormSubmitAction);
export default DefaultFormSubmitAction;
