import { NODENAME_FORM, NODENAME_PAGE, EVENT_INITIALIZED, EVENT_PAGE_INITIALIZED, EVENT_PAGE_REMOVED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED, EVENT_SUBMIT, EVENT_SUBMIT_RESULTS, ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT, FORMSTATE_INPUT, FORMSTATE_SUMMARY, FORMSTATE_VALIDATING, FORMSTATE_INIT, FORMSTATE_FINISHED } from "./Constants";
import { Component, define } from "@default-js/defaultjs-html-components";
import "./Message";
import "./Message";
import Page from "./Page";
import "./Control";
import "./ProgressBar";
import { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import BaseSubmitAction from "./submitActions/BaseSubmitAction";
import DefaultFormSubmitAction from "./submitActions/DefaultFormSubmitAction";
import SubmitActionResult, { STATE_FAIL as ACTION_SUBMIT_STATE_FAIL, STATE_SUCCESS as ACTION_SUBMIT_STATE_SUCCESS } from "./submitActions/SubmitActionResult";
import { valueHelper, fieldValueMapToObject } from "./utils/DataHelper";
import { validateFields } from "./utils/ValidationHelper";

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

const prevPage = async (pages, startIndex, data) => {
	for (let i = startIndex; i >= 0; i--) {
		const page = pages[i];
		await page.validate(await data);
		if (page.condition) return page;
	}

	return null;
};

const nextPage = async (pages, startIndex, data) => {
	if (pages) {
		for (let i = startIndex; i < pages.length; i++) {
			const page = pages[i];
			await page.validate(await data);
			if (page.condition) return page;
		}
	}
	return null;
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
	#pages;
	#value = new Map();
	#validation = null;
	#hasNextValidation = false;

	constructor() {
		super();
		const root = this.root;
		root.on(EVENT_PAGE_INITIALIZED, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});

		root.on(EVENT_PAGE_REMOVED, (event) => {
			const page = event.target;
			this.#pages = null;
			this.childValueChanged(page, null);

			event.preventDefault();
			event.stopPropagation();
		});
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.activePageIndex = -1;

			this.state = FORMSTATE_INIT;

			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);

			this.activePageIndex = -1;
			if (this.pages.length > 0) this.toNextPage();

			this.ready.then(() => {
				this.trigger(EVENT_INITIALIZED);
			});
		}
	}

	get pages() {
		if (!this.#pages) this.#pages = Array.from(this.root.find(NODENAME_PAGE));

		return this.#pages;
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
		if (this.#validation) await this.#validation;
		if (arguments.length == 0) return await fieldValueMapToObject(this.#value, this.pages);

		if (this.state == FORMSTATE_INPUT) {
			for (let page of this.pages) {
				const name = page.name;
				//await page.value(null); // reset all values
				if (name) await page.value(valueHelper(data, name));
				else await page.value(data);
			}

			await this.#validate();
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != FORMSTATE_INPUT) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != FORMSTATE_INPUT) this.state = FORMSTATE_INPUT;

			this.scrollIntoView();
			this.trigger(EVENT_SITE_CHANGED);
		}
	}

	get prevPage() {
		return (async () => {			
			const pages = this.pages;
			const start = this.activePageIndex - 1;
			const data = await this.value();
			for (let i = start; i >= 0; i--) {
				const page = pages[i];
				await page.validate(data);
				if (page.condition) return page;
			}

			return null;
		})();
	}

	get nextPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex + 1;
			const data = await this.value();
			if (pages) {
				for (let i = start; i < pages.length; i++) {
					const page = pages[i];
					await page.validate(data);
					if (page.condition) return page;
				}
			}
			return null;
		})();
	}

	async toPrevPage() {
		if (this.state != FORMSTATE_INPUT) {
			this.state = FORMSTATE_INPUT;
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
		const data = await this.value();
		const valid = await validateFields(data, this.pages);
		if (!valid) return;

		if (!this.hasAttribute(ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT)) this.state = FORMSTATE_FINISHED;

		const actions = this.submitActions;
		if (actions) {
			const results = await executeActions(actions, data);
			this.trigger(EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(EVENT_SUBMIT, data);
	}

	#validate(page) {
		if (this.state == FORMSTATE_INPUT) {
			this.state = FORMSTATE_VALIDATING;
			return (this.#validation = new Promise((resolved) => {
				setTimeout(async () => {
					const data = await fieldValueMapToObject(this.#value);
					
					const valid = page ? page.validate(data) : await validateFields(data, this.pages);

					if (!this.#hasNextValidation) this.state = FORMSTATE_INPUT;

					this.validation = null;
					resolved(valid);
				}, 10);
			}));
		} else if (this.state == FORMSTATE_VALIDATING) {
			this.#validation.then(async () => {
				this.#hasNextValidation = false;
				await this.#validate();
			});
		}
	}

	async childValueChanged(field, value) {
		value = await value;
		const map = this.#value;
		//console.log("form.childValueChanged", { field, value });
		if (field) {
			if (noValue(value)) map.delete(field);
			else map.set(field, value);
		}

		await this.ready;
		const activePage = this.activePage;
		if (activePage) await this.#validate(activePage);
		else await this.#validate();
	}
}
define(Form);
export default Form;
