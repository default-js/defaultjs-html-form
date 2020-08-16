import {STATES, NODENAMES} from "./Constants";
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
		this.back = this.find(NODENAMES.BackButton).first();
		this.next = this.find(NODENAMES.NextButton).first();
		this.summary = this.find(NODENAMES.SummaryButton).first();
		this.submit = this.find(NODENAMES.SubmitButton).first();
	}

	connectedCallback() {}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.trigger("change");
	}

	get form() {
		return this.parent(NODENAMES.Form);
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

		if (state == STATES.finished) {
            back.disabled = true;
            submit.active = true;
		} else if (
			nextPage ||
			(!activePage.valid && activePageIndex + 1 < pages.length)
		) {
			next.active = true;
			next.disabled = !activePage.valid;
			form.state = STATES.input;
		} else if (useSummaryPage && state == STATES.input) {
			summary.active = true;
			summary.disabled = !activePage.valid;
			form.state = STATES.summary;
		} else {
			submit.active = true;
			submit.disabled = false;
			form.state = STATES.submit;
		}
	}
}
window.customElements.define(NODENAMES.Control, Control);
export default Control;
