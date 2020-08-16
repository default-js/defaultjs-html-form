import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { STATES, NODENAMES, EVENTS } from "./Constants";
import Message from "./Message";
import Page from "./Page";
import Control from "./Control";

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
const ATTRIBUTES = [ATTRIBUTE_NAME];

const changeSite = (form) => {
	form.trigger(EVENTS.changeSite);
};

const init = (form) => {
	form.state = STATES.init;
	form.useSummaryPage = form.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
	form.pages = form.find(NODENAMES.Page);
	form.activePageIndex = -1;
	if (form.pages.length > 0) form.toNextPage();
};

class Form extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(EVENTS.changeAttributeEventBuilder(name));
			this.trigger(EVENTS.change);
		}
	}

	valid() {
		for (let page of this.pages) if (!page.valid) return false;

		return true;
	}

	get data() {
		const data = {};
		for (let page of this.pages) {
			if (page.condition) ObjectUtils.merge(data, page.value);
			else if (page == this.activePage) break;
		}

		return data;
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
		this.state = STATES.summary;
		changeSite(this);
	}

	submit() {
		this.state = STATES.finished;
		changeSite(this);
	}
}
window.customElements.define(NODENAMES.Form, Form);
export default Form;
