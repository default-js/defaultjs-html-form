import "@default-js/defaultjs-extdom";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { STATES, NODENAMES, EVENTS } from "./Constants";
import Page from "./Page";
import Control from "./Control";

const ATTRIBUTE_NAME = "name";
const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
const ATTRIBUTES = [ATTRIBUTE_NAME];

const render = (form) => {};

const updateControls = (form) => {
	form.control.update();
};

class Form extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.on(EVENTS.change, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});
	}

	connectedCallback() {
		this.init();
		render(this);
	}

	disconnectedCallback() {}

	adoptedCallback() {
		render(this);
	}

	attributeChangedCallback() {
		this.trigger(EVENTS.change);
	}

	init() {
		this.state = STATES.init;
		this.useSummaryPage = this.hasAttribute(ATTRIBUTE_USE_SUMMARY_PAGE);
		this.control = this.find(NODENAMES.Control).first();
		this.pages = this.find(NODENAMES.Page);
		this.activePageIndex = -1;
		if (this.pages.length > 0) {
			this.toNextPage();
		}
	}

	async valid() {}

	async data(data) {
		if (arguments.length == 0) {
			const data = {};
			for (let page of this.pages) {
				if ((await page.valid()) || page == this.activePage)
					ObjectUtils.merge(data, await page.value());
			}

			return data;
		} else {
			//TODO set data logic
		}
	}

	get activePage() {
		if (0 <= this.activePageIndex && this.activePageIndex < this.pages.length)
			return this.pages[this.activePageIndex];

		return null;
	}

	set activePage(page) {
		if (page) {
			const current = this.activePage;
			if (current) current.active = false;
			this.activePageIndex = this.pages.indexOf(page);
			page.active = true;
			updateControls(this);
		}
	}

	async prevPage() {
		const start = this.activePageIndex - 1;
		for (let i = start; i >= 0; i--) {
			const page = this.pages[i];
			if (await page.condition()) return page;
		}
		return null;
	}

	async nextPage() {
		const start = this.activePageIndex + 1;
		for (let i = start; i < this.pages.length; i++) {
			if (await this.pages[i].condition()) return this.pages[i];
		}
		return null;
	}

	async toPrevPage() {
		const prev = await this.prevPage();
		if (prev) this.activePage = prev;
	}

	async toNextPage() {
		const next = await this.nextPage();
		if (next) this.activePage = next;
	}

	summary() {
		this.state = STATES.summary;
		updateControls(this);
	}

	submit() {
		this.state = STATES.finished;
		updateControls(this);
	}
}
window.customElements.define(NODENAMES.Form, Form);
export default Form;
