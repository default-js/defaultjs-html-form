import NodeNames from "./NodeNames";
import Page from "./Page";
import Control from "./Control";
import State from "./State";

const ATTRIBUTES = ["name"];

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
		this.on("change", (event) => {
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
		this.trigger("change");
	}

	init() {
        this.state = State.init;
		this.useSummaryPage = this.hasAttribute("use-summary-page");
		this.control = this.find(NodeNames.Control).first();
		this.pages = this.find(NodeNames.Page);
		this.activePageIndex = -1;
		if (this.pages.length > 0) {
            this.toNextPage();
        }
	}

	get valid() {}

	get data() {}

	set data(data) {}

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

	get prevPage() {
		const start = this.activePageIndex - 1;
		for (let i = start; i >= 0; i--)
			if (this.pages[i].condition) return this.pages[i];
		return null;
	}

	get nextPage() {
		const start = this.activePageIndex + 1;
		for (let i = start; i < this.pages.length; i++) {
			if (this.pages[i].condition) return this.pages[i];
		}
		return null;
	}

	toPrevPage() {
		const prev = this.prevPage;
		if (prev) this.activePage = prev;
	}

	toNextPage() {
		const next = this.nextPage;
		if (next) this.activePage = next;
	}

	summary() {
        this.state = State.summary;
        updateControls(this);
    }

	submit() {
        this.state = State.finished;
        updateControls(this);
    }
}
window.customElements.define(NodeNames.Form, Form);
export default Form;
