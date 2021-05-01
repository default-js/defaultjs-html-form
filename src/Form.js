import Component from "@default-js/defaultjs-html-components/src/Component";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { FORMSTATES, NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT } from "./Constants";
import defineElement from "./utils/DefineElement";
import { toTimeoutHandle } from "./utils/EventHelper";
import "./Message";
import "./Page";
import "./Control";
import "./ProgressBar";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE, ATTRIBUTE_ENDPOINT, ATTRIBUTE_METHOD, ATTRIBUTE_STATE, ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

class Form extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.Form;
	}

	constructor() {
		super();
		this.__data__ = {};
		this.__state__ = null;
		this.on(
			EVENTS.valueChanged,
			toTimeoutHandle(
				async (event) => {
					const field = event.target;
					const name = await field.name;
					const value = await field.value();
					if (name) this.__data__[name] = value;
					else if (value != null) ObjectUtils.merge(this.__data__, value);

					this.trigger(EVENTS.executeValidate, event.detail);
				},
				true,
				true,
			),
		);
	}

	async init() {
		await super.init();
		this.state = FORMSTATES.init;
		const ready = this.ready;
		if (!ready.resolved) {
			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
			this.activePageIndex = -1;

			this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
			this.pages = this.find(NODENAMES.Page);
		}

		this.activePageIndex = -1;
		if (this.pages.length > 0) this.toNextPage();
	}

	get state() {
		return this.__state__;
	}

	set state(state) {
		const actual = this.state;
		if (actual == FORMSTATES.input && state != FORMSTATES.input) readonly(this, true);
		else if (actual != FORMSTATES.input && state == FORMSTATES.input) {
			readonly(this, false);
			if (this.activePage) this.activePage.active = true;
		}
		this.__state__ = state;

		if (actual != state) this.trigger(EVENTS.formStateChanged);
		this.attr(ATTRIBUTE_STATE, this.__state__);
	}

	get valid() {
		for (let page of this.pages) if (!page.valid) return false;

		return true;
	}

	async data() {
		if (arguments.length == 0) return this.__data__;
		const data = arguments[0];
		await this.ready;
		if (this.state == FORMSTATES.input) {
			this.__data__ = {}; //data;
			for (let page of this.pages) {
				if (page.name) await page.value(data[page.name]);
				else await page.value(data);
			}

			this.trigger(EVENTS.allPublishValue);
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		const current = this.activePage;
		if (page != current) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			if (this.state != FORMSTATES.input) this.state = FORMSTATES.input;

			this.trigger(EVENTS.siteChanged);
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

	async submit() {
		this.state = this.hasAttribute(ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT) ? FORMSTATES.input : FORMSTATES.finished;
		const data = this.data;

		let endpoint = this.attr(ATTRIBUTE_ENDPOINT);
		if (endpoint) {
			endpoint = await ExpressionResolver.resolveText(endpoint, data, endpoint);
			const url = new URL(endpoint, location.href);

			return await fetch(url.toString(), {
				method: (this.attr(ATTRIBUTE_METHOD) || "post").toLowerCase(),
				credentials: "include",
				mode: "cors",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
		}

		this.trigger(EVENTS.submit, data);
	}
}
defineElement(Form);
export default Form;
