import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { FORMSTATES, NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import Message from "./Message";
import Page from "./Page";
import Control from "./Control";

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
const ATTRIBUTES = [ATTRIBUTE_NAME];

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

	valid() {
		for (let page of this.pages) if (!page.valid) return false;

		return true;
	}

	get data() {
		const data = {};
		for (let page of this.pages) {
			let value = null;
			if (page.condition && page.valid) value = page.value;
			else if (page == this.activePage) value = page.value;
			if (value != null && typeof value !== "undefined") ObjectUtils.merge(data, value);
			if (page == this.activePage) return data;
		}

		return data;
	}

	set data(data){
		for (let page of this.pages) {
			page.value = data
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length) return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		if (page) {
			const current = this.activePage;
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
