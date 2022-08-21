import Component from "@default-js/defaultjs-html-components/src/Component";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { FORMSTATES, NODENAMES, EVENT_INITIALIZED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED, EVENT_SUBMIT, EVENT_SUBMIT_RESULTS, ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT } from "./Constants";
import defineElement from "./utils/DefineElement";
import "./Message";
import "./Page";
import "./Control";
import "./ProgressBar";
import BaseSubmitAction from "./submitActions/BaseSubmitAction";
import DefaultFormSubmitAction from "./submitActions/DefaultFormSubmitAction";
import SubmitActionResult, { STATE_FAIL as ACTION_SUBMIT_STATE_FAIL, STATE_SUCCESS as ACTION_SUBMIT_STATE_SUCCESS } from "./submitActions/SubmitActionResult";
import { valueHelper } from "./utils/DataHelper";

const _submitActions = privatePropertyAccessor("submitAction");
const _state = privatePropertyAccessor("state");

const collectData = async (self) => {
	await self.ready;
	const data = {};
	const pages = self.pages;

	for (let page of pages) {
		if (page.condition) {
			const name = page.name;
			const value = await page.value();
			const hasValue = value != null && typeof value !== "undefined";
			if (name && hasValue) valueHelper(data, name, value);
			else if (hasValue) ObjectUtils.merge(data, value);
		}
	}

	return data;
};

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

const executeActions = async (actions, data) => {
	const results = [];
	for (let action of actions) {
		const accept = await action.accept(data);
		if (accept) {
			try {
				const result = (await action.execute(data)) || new SubmitActionResult(action, ACTION_SUBMIT_STATE_SUCCESS);
				results.push(result);
				if (result.state == ACTION_SUBMIT_STATE_FAIL) return results;
			} catch (e) {
				results.push(new SubmitActionResult(action, ACTION_SUBMIT_STATE_FAIL, e));
				return results;
			}
		}
	}
	return results;
};

class Form extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.Form;
	}

	#initialized = false;

	constructor() {
		super();
		_state(this, null);
	}

	async init() {
		await super.init();
		if (!this.#initialized) {			
			this.#initialized = true;
			this.activePageIndex = -1;

			this.state = FORMSTATES.init;
			
			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);			
			this.pages = this.find(NODENAMES.Page);			

			this.activePageIndex = -1;
			if (this.pages.length > 0) this.toNextPage();

			this.ready.then(() => {
				this.trigger(EVENT_INITIALIZED);
			});
		}
	}

	get state() {
		return _state(this);
	}

	set state(state) {
		const actual = this.state;
		if (actual == FORMSTATES.input && state != FORMSTATES.input) readonly(this, true);
		else if (actual != FORMSTATES.input && state == FORMSTATES.input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		_state(this, state);

		if (actual != state) this.trigger(EVENT_FORM_STATE_CHANGED);
		this.attr(ATTRIBUTE_STATE, state);
	}

	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	async value(data) {
		if (arguments.length == 0) return collectData(this);

		await this.ready;
		if (this.state == FORMSTATES.input) {
			for (let page of this.pages) {
				const name = page.name;
				//await page.value(null); // reset all values
				if (name) await page.value(valueHelper(data, name));
				else await page.value(data);
			}
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != FORMSTATES.input) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != FORMSTATES.input) this.state = FORMSTATES.input;

			this.scrollIntoView();
			this.trigger(EVENT_SITE_CHANGED);
		}
	}

	get prevPage() {
		const start = this.activePageIndex - 1;
		for (let i = start; i >= 0; i--) {
			const page = this.pages[i];
			if (page.condition) return page;
		}
		return null;
	}

	get nextPage() {
		if (this.pages) {
			const start = this.activePageIndex + 1;
			for (let i = start; i < this.pages.length; i++) {
				const page = this.pages[i];
				if (page.condition) return page;
			}
		}
		return null;
	}

	async toPrevPage() {
		if (this.state != FORMSTATES.input) {
			this.state = FORMSTATES.input;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			if (this.state == FORMSTATES.init) this._state = FORMSTATES.input;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = FORMSTATES.summary;
	}

	get submitActions() {
		let actions = _submitActions(this);
		if (!actions) {
			actions = [];
			let endpoint = this.attr(ATTRIBUTE_ENDPOINT);
			if (endpoint) {
				const method = this.attr(ATTRIBUTE_METHOD) || "post";
				this.append(new DefaultFormSubmitAction(endpoint, method));
			}

			const childs = this.children;
			for (let child of childs) {
				if (child instanceof BaseSubmitAction) actions.push(child);
			}
			_submitActions(this, actions);
		}

		return actions;
	}

	async submit() {
		this.state = this.hasAttribute(ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? FORMSTATES.input : FORMSTATES.finished;
		const data = await this.value();

		const actions = this.submitActions;
		if (actions) {
			const results = await executeActions(actions, data);
			this.trigger(EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(EVENT_SUBMIT, data);
	}

	async childValueChanged(field, value){
		await this.ready;
		const currentState = this.state;
		this.state = FORMSTATES.validating;
		let valid = false;
		const data = await collectData(this);
		const pages = this.pages;
		for (let page of pages) 
			if(await page.validate(data))
				valid = false;
		
		this.state = currentState;
	}
}
defineElement(Form);
export default Form;
