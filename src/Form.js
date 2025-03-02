import {
	/** Nodenames */
	NODENAME_FORM,
	NODENAME_PAGE,
	/**Events */
	EVENT_INITIALIZED,
	EVENT_PAGE_INITIALIZED,
	EVENT_PAGE_REMOVED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_SITE_CHANGED,
	EVENT_SUBMIT,
	EVENT_SUBMIT_RESULTS,
	/**Attribute */
	ATTRIBUTE_NAME,
	ATTRIBUTE_USE_SUMMARY_PAGE,
	ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT,
	ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD,
	ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT,
	ATTRIBUTE_STATE,
	ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT,
	/**Formstates */
	FORMSTATE_INPUT,
	FORMSTATE_SUMMARY,
	FORMSTATE_VALIDATING,
	FORMSTATE_INIT,
	FORMSTATE_FINISHED,
	FORMSTATE_SUBMITTING,
} from "./Constants";
import { Component, define } from "@default-js/defaultjs-html-components";
import "./Message";
import "./Message";
import Page from "./Page";
import "./Control";
import "./ProgressBar";
import ValueHelper, { noValue } from "@default-js/defaultjs-common-utils/src/ValueHelper";
import BaseSubmitAction from "./submitActions/BaseSubmitAction";
import DefaultFormSubmitAction from "./submitActions/DefaultFormSubmitAction";
import SubmitActionResult, { STATE_FAIL as ACTION_SUBMIT_STATE_FAIL, STATE_SUCCESS as ACTION_SUBMIT_STATE_SUCCESS } from "./submitActions/SubmitActionResult";
import { valueHelper, fieldValueMapToObject } from "./utils/DataHelper";
import { validateFields } from "./utils/ValidationHelper";
import { ObjectUtils, PromiseUtils } from "@default-js/defaultjs-common-utils";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT, ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT, ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

const executeActions = async (actions, data, context) => {
	const results = [];
	for (let action of actions) {
		const accept = await action.accept(data);
		if (accept) {
			try {
				const result = (await action.execute(data, context)) || new SubmitActionResult(action, ACTION_SUBMIT_STATE_SUCCESS, null, data, context);
				results.push(result);
				if (result.state == ACTION_SUBMIT_STATE_FAIL) return results;
				if(typeof result.data !== "undefined" && result.data != null)
					data = result.data;
				if(typeof result.context !== "undefined" && result.data != context)
					data = result.data;
			} catch (e) {
				results.push(new SubmitActionResult(action, ACTION_SUBMIT_STATE_FAIL, e));
				return results;
			}
		}
	}
	return results;
};

/**
 * form class
 *
 * @class Form
 * @typedef {Form}
 * @extends {Component}
 */
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
	#data = {};
	#validation = null;
	#submitActions = null;

	/**
	 * Creates an instance of Form.
	 *
	 * @constructor
	 */
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

		this.ready.then(() => this.trigger(EVENT_INITIALIZED));
	}

	/**
	 * init form component
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#initialized = true;
			this.activePageIndex = -1;

			this.state = FORMSTATE_INIT;

			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);

			this.activePageIndex = -1;
			if (this.pages.length > 0) this.toNextPage();
		}
	}

	/**
	 * get pages of form
	 *
	 * @readonly
	 * @type {Page[]}
	 */
	get pages() {
		if (!this.#pages) this.#pages = Array.from(this.root.find(NODENAME_PAGE));

		return this.#pages;
	}

	/**
	 * form state
	 *
	 * @type {string}
	 */
	get state() {
		return this.#state;
	}

	/**
	 * form state
	 */
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

	/**
	 * is form valid
	 *
	 * @readonly
	 * @type {boolean}
	 */
	get valid() {
		for (let page of this.pages) if (page.condition && !page.valid) return false;

		return true;
	}

	/**
	 * get or set value of form
	 *
	 * @async
	 * @param {?object} data - form data
	 * @returns {Promise<object>|Promise<void>}
	 *
	 * @example
	 * await form.value() // returns the current value of form
	 * await form.value({test:"value"}) // set value to form
	 *
	 */
	async value(data) {
		await this.ready;
		if (this.#validation) await this.#validation;
		if (arguments.length == 0) return this.#data;

		if (this.state == FORMSTATE_INPUT) {
			await Promise.all(
				this.pages.map((page) => {
					const name = page.name;
					return name ? page.value(valueHelper(data, name)) : page.value(data);
				}),
			);

			await this.#validate();
		} else {
			return await new Promise((resolve) => {
				const handle = (event) => {
					event.stopPropagation();
					this.removeOn(handle, EVENT_FORM_STATE_CHANGED);
					resolve(this.value(data));
				};
				this.on(EVENT_FORM_STATE_CHANGED, handle);
			});
		}
	}

	/**
	 * get current active page
	 *
	 * @type {Page}
	 */
	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	/**
	 * set current active page
	 *
	 * @type {Page}
	 */
	set activePage(page) {
		const current = this.activePage;
		if (page != current || this.state != FORMSTATE_INPUT) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != FORMSTATE_INPUT) this.state = FORMSTATE_INPUT;

			if (current) this.scrollIntoView();
			this.trigger(EVENT_SITE_CHANGED);
		}
	}

	/**
	 * first valid previous page of current active page
	 *
	 * @readonly
	 * @type {Page}
	 */
	get prevPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex - 1;
			for (let i = start; i >= 0; i--) {
				const page = pages[i];
				await this.#validate(page);
				if (page.condition) return page;
			}

			return null;
		})();
	}

	/**
	 * get next valid page of current active page
	 *
	 * @readonly
	 * @type {Page}
	 */
	get nextPage() {
		return (async () => {
			const pages = this.pages;
			const start = this.activePageIndex + 1;
			if (pages) {
				for (let i = start; i < pages.length; i++) {
					const page = pages[i];
					await page.validate(this.#data);
					if (page.condition) return page;
				}
			}
			return null;
		})();
	}

	/**
	 * change active page to first valid previous page
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async toPrevPage() {
		if (this.state != FORMSTATE_INPUT) {
			this.state = FORMSTATE_INPUT;
		} else {
			const prev = await this.prevPage;
			if (prev) this.activePage = prev;
		}
	}

	/**
	 * change active page to next vaild page
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
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

	/**
	 * switch form into summary state
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async summary() {
		this.state = FORMSTATE_SUMMARY;
	}

	/**
	 * get all form submit actions
	 *
	 * @readonly
	 * @type {DefaultFormSubmitAction[]}
	 */
	get submitActions() {
		if (!this.#submitActions) {
			const actions = [];
			const endpoint = this.attr(ATTRIBUTE_SUBMIT_ACTION__REQUEST_ENDPOINT);
			if (endpoint) {
				const method = this.attr(ATTRIBUTE_SUBMIT_ACTION__REQUEST_METHOD) || "post";
				this.append(new DefaultFormSubmitAction(endpoint, method));
			}

			const childs = this.children;
			for (let child of childs) {
				if (child instanceof BaseSubmitAction) actions.push(child);
			}
			this.#submitActions = actions;
		}

		return this.#submitActions;
	}

	/**
	 * submit form
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async submit({ data = null, actions = [], context = {} } = {}) {
		const currentState = this.state;
		this.state = FORMSTATE_SUBMITTING;
		let formdata = await this.value();
		const valid = await validateFields(formdata, this.pages);
		if (!valid) return;

		if (data) formdata = ObjectUtils.merge(formdata, data);

		actions = actions.concat(this.submitActions);
		if (actions) {
			const results = await executeActions(actions, formdata);
			this.trigger(EVENT_SUBMIT_RESULTS, results);
		}

		this.trigger(EVENT_SUBMIT, formdata);

		const customSubmittedEvent = (this.attr(ATTRIBUTE_SUBMIT_ACTION__CUSTOM_SUBMITTED_EVENT) || "").trim();
		if (customSubmittedEvent.length > 0) this.trigger(customSubmittedEvent, formdata);

		this.state = this.hasAttribute(ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? currentState : FORMSTATE_FINISHED;
	}

	async validate() {
		await this.#validate();
	}

	async #validate(page) {
		const promise = PromiseUtils.lazyPromise();
		const action = async () => {
			const data = this.#data; //await fieldValueMapToObject(this.#value);

			const valid = page ? await page.validate(data) : await validateFields(data, this.pages);

			promise.resolve(valid);

			if (this.#validation == promise) {
				this.state = FORMSTATE_INPUT;
				this.#validation = null;
			}
		};

		if (this.#validation == null) {
			setTimeout(action, 1);
			this.state = FORMSTATE_VALIDATING;
		} else this.#validation.then(action);

		this.#validation = promise;
		return promise;
	}

	async childValueChanged(field, value) {
		await this.ready;
		value = await value;
		const map = this.#value;
		//console.log(`form.childValueChanged(${field.name})`, { field, value });
		if (field) {
			if (noValue(value)) map.delete(field);
			else map.set(field, value);
		}

		this.#data = await fieldValueMapToObject(this.#value, this.pages);

		const activePage = this.activePage;
		if (activePage) await this.#validate(activePage);
		else await this.#validate();
	}
}
define(Form);
export default Form;
