import { NODENAME_FORM, NODENAME_PAGE, EVENT_INITIALIZED, EVENT_FIELD_INITIALIZED, EVENT_FIELD_REMOVED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED, EVENT_SUBMIT, EVENT_SUBMIT_RESULTS, ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT, FORMSTATE_INPUT, FORMSTATE_SUMMARY, FORMSTATE_VALIDATING, FORMSTATE_INIT, FORMSTATE_FINISHED } from "./Constants";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { Component, define } from "@default-js/defaultjs-html-components";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";

import "./Message";
import Page from "./Page";
import "./Control";
import "./ProgressBar";
import BaseSubmitAction from "./submitActions/BaseSubmitAction";
import DefaultFormSubmitAction from "./submitActions/DefaultFormSubmitAction";
import SubmitActionResult, { STATE_FAIL as ACTION_SUBMIT_STATE_FAIL, STATE_SUCCESS as ACTION_SUBMIT_STATE_SUCCESS } from "./submitActions/SubmitActionResult";
import { valueHelper, fieldValueMapToObject } from "./utils/DataHelper";

const _submitActions = privatePropertyAccessor("submitAction");

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
		return NODENAME_FORM;
	}

	#initialized = false;
	#state = FORMSTATE_INIT;
	#pages = new Set();
	#value = new Map();
	#validation = null;
	#hasNextValidation = false;

	constructor() {
		super();
		this.on(EVENT_FIELD_INITIALIZED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof Page) {
					this.#pages.add(field);
				}
				event.preventDefault();
				event.stopPropagation();
			}
		});

		this.on(EVENT_FIELD_REMOVED, (event) => {
			const field = event.target;
			if (field != this) {
				if (field instanceof Page) this.#pages.delete(field);

				event.preventDefault();
				event.stopPropagation();
			}
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.activePageIndex = -1;

			this.state = FORMSTATE_INIT;

			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
			this.find(NODENAME_PAGE).forEach((page) => this.#pages.add(page));

			this.activePageIndex = -1;
			if (this.pages.length > 0) this.toNextPage();

			this.ready.then(() => {
				this.trigger(EVENT_INITIALIZED);
			});
		}
	}

	get pages() {
		return Array.from(this.#pages);
	}

	get state() {
		return this.#state;
	}

	set state(state) {
		const actual = this.#state;
		if (state != FORMSTATE_VALIDATING) {
			if (actual == FORMSTATE_INPUT && state != FORMSTATE_INPUT) readonly(this, true);
			else if (actual != FORMSTATE_INPUT && state == FORMSTATE_INPUT) {
				readonly(this, false);
				if (this.activePage) this.activePage.active = true;
			}
		}
		this.#state = state;

		if (actual != state) this.trigger(EVENT_FORM_STATE_CHANGED);
		this.attr(ATTRIBUTE_STATE, state);
	}

	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	async value(data) {
		await this.ready;
		if(this.#validation) await this.#validation;
		if (arguments.length == 0)return await fieldValueMapToObject(this.#value);

		
		if (this.state == FORMSTATE_INIT) {
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
		if (page != current || this.state != FORMSTATE_INIT) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != FORMSTATE_INIT) this.state = FORMSTATE_INIT;

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
		if (this.state != FORMSTATE_INIT) {
			this.state = FORMSTATE_INIT;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) {
			this.activePage = next;
			this.state = FORMSTATE_INPUT;
		} else if (this.useSummaryPage) {
			this.summary();
		} else {
			this.submit();
		}
	}

	async summary() {
		this.state = FORMSTATE_SUMMARY;
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
		this.state = this.hasAttribute(ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? FORMSTATE_INIT : FORMSTATE_FINISHED;
		const data = await this.value();

		const actions = this.submitActions;
		if (actions) {
			const results = await executeActions(actions, data);
			this.trigger(EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(EVENT_SUBMIT, data);
	}

	#validate() {
		if (this.state == FORMSTATE_INPUT) {
			this.state = FORMSTATE_VALIDATING;
			this.#validation = new Promise((resolved) => {
				setTimeout(async () => {					
					const data = await fieldValueMapToObject(this.#value);
	
					let valid = false;
					const pages = this.pages;
					for (let page of pages) if (await page.validate(data)) valid = false;
	
					if(!this.#hasNextValidation)
						this.state = FORMSTATE_INPUT;
	
					this.validation = null;
					resolved();
				}, 10);
			});			
		} else if(this.state == FORMSTATE_VALIDATING){
			this.#validation.then(() => {
				this.#hasNextValidation = false;
				this.#validate();
			})
		}
	}

	async childValueChanged(field, value) {
		const map = this.#value;
		console.log("form.childValueChanged", { field, value });
		if (field) {
			if (noValue(value)) map.delete(field);
			else map.set(field, value);
		}

		await this.ready;		
		this.#validate();
	}
}
define(Form);
export default Form;
