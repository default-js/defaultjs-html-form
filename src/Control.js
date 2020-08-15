import NodeNames from "./NodeNames";
import State from "./State";
import {
	BackButton,
	NextButton,
	SummaryButton,
	SubmitButton,
	CancelButton,
} from "./controls";

const ATTRIBUTES = [];

class Control extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.back = this.find(NodeNames.BackButton).first();
		this.next = this.find(NodeNames.NextButton).first();
		this.summary = this.find(NodeNames.SummaryButton).first();
		this.submit = this.find(NodeNames.SubmitButton).first();
	}

	connectedCallback() {}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.trigger("change");
	}

	get form() {
		return this.parent(NodeNames.Form);
	}

	update() {
        const form = this.form;
		const {
			control,
			activePageIndex,
			activePage,
			nextPage,
			pages,
			useSummaryPage,
			state
		} = form;
		const { back, next, summary, submit } = this;

		// basic control setup
		back.active = true;
		back.disabled = activePageIndex <= 0;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if (state == State.finished) {
            back.disabled = true;
            submit.active = true;
		} else if (
			nextPage ||
			(!activePage.valid && activePageIndex + 1 < pages.length)
		) {
			next.active = true;
			next.disabled = !activePage.valid;
			form.state = State.input;
		} else if (useSummaryPage && state == State.input) {
			summary.active = true;
			summary.disabled = !activePage.valid;
			form.state = State.summary;
		} else {
			submit.active = true;
			submit.disabled = false;
			form.state = State.submit;
		}
	}
}
window.customElements.define(NodeNames.Control, Control);
export default Control;
