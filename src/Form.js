import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { FORMSTATES, NODENAMES, EVENTS, TRIGGER_TIMEOUT, ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE } from "./Constants";
import Message from "./Message";
import Page from "./Page";
import Control from "./Control";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_USE_SUMMARY_PAGE];

const readonly = (form, readonly) => {
	for (let page of form.pages) {
		page.readonly = readonly;
		page.active = readonly;
	}
};

const changeSite = (form) => {
	form.trigger(TRIGGER_TIMEOUT, EVENTS.changeSite);
};

const init = (form) => {
	form.state = FORMSTATES.init;
	form.useSummaryPage = form.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
	form.pages = form.find(NODENAMES.Page);
	form.activePageIndex = -1;
	if (form.pages.length > 0) form.toNextPage();
};

class Form extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(form) {
		init(form);
	}

	constructor() {
		super();
		this.__data__ = {};
		this.state = FORMSTATES.init;
		this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
		this.activePageIndex = -1;

		this.on(EVENTS.valueChanged,
			(event) => {
				if (event.target != this) {
					const { name, value } = event.target;
					console.log(EVENTS.valueChanged, { name, value, event })
					if (name)
						this.__data__[name] = value
					else if (value != null)
						ObjectUtils.merge(this.__data__, value);

					this.trigger(TRIGGER_TIMEOUT, EVENTS.executeValidate)

					event.preventDefault();
					event.stopPropagation();
				}
			}
		);
	}

	connectedCallback() {
		Form.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}

	get state() {
		return this._state;
	}

	set state(state) {
		const actual = this.state;
		if (actual == FORMSTATES.input && state != FORMSTATES.input) readonly(this, true);
		else if (actual != FORMSTATES.input && state == FORMSTATES.input) readonly(this, false);

		this._state = state;
	}

	valid() {
		for (let page of this.pages) {
			if (!page.valid) return false;
		}

		return true;
	}

	get data() {
		return this.__data__;
	}

	set data(data) {
		if (this.state == FORMSTATES.input) {
			this.__data__ = data;
			for (let page of this.pages) {				
				if(page.name)
					page.value = data[page.name];
				else
					page.value = data;
			}
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		if (this.state != FORMSTATES.input) this.state = FORMSTATES.input;

		const current = this.activePage;
		if (page != current) {
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			changeSite(this);
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
		const start = this.activePageIndex + 1;
		for (let i = start; i < this.pages.length; i++) {
			const page = this.pages[i];
			if (page.condition) return page;
		}
		return null;
	}

	async toPrevPage() {
		const prev = await this.prevPage;
		if (prev) this.activePage = prev;
	}

	async toNextPage() {
		const next = await this.nextPage;
		if (next) this.activePage = next;
	}

	summary() {
		this.state = FORMSTATES.summary;
		changeSite(this);
	}

	submit() {
		this.state = FORMSTATES.finished;
		changeSite(this);
	}
}
window.customElements.define(NODENAMES.Form, Form);
export default Form;
