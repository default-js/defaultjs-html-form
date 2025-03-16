import { NODENAME_CONTROL_SUBMIT, ATTRIBUTE_CONDITION } from "../Constants";
import FormButton from "../FormButton";
import BaseSubmitAction from "../submitActions/BaseSubmitAction";
import { define } from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [];
class SubmitButton extends FormButton {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_CONTROL_SUBMIT;
	}

	#initialized = false;
	#condition;
	#submitActions;

	constructor() {
		super();
	}

	async init(){

		await super.init();
		if (this.#initialized) {			
			this.#initialized = true;			
			this.#condition = this.attr(ATTRIBUTE_CONDITION);
		}
	}

	get actions() {
		if (!this.#submitActions) {
			const actions = [];
			const childs = this.children;
			for (let child of childs) {
				if (child instanceof BaseSubmitAction) actions.push(child);
			}
			this.#submitActions = actions;
		}

		return this.#submitActions;
	}

	get condition(){
		return this.#condition;
	}
	
	execute() {
		this.form.submit({actions:this.actions});
	}
}
export default SubmitButton;
define(SubmitButton);
