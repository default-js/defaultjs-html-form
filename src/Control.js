import { FORMSTATES, NODENAMES, EVENTS } from "./Constants";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import { BackButton, NextButton, SummaryButton, SubmitButton, CancelButton } from "./controls";

const ATTRIBUTES = [];

const init = (control) => {
	control.form = control.parent(NODENAMES.Form);
	control.back = control.find(NODENAMES.BackButton).first();
	control.next = control.find(NODENAMES.NextButton).first();
	control.summary = control.find(NODENAMES.SummaryButton).first();
	control.submit = control.find(NODENAMES.SubmitButton).first();

	control.form.on(
		toEvents(EVENTS.changeCondition, EVENTS.changeValidation, EVENTS.changeSite),
		toTimeoutHandle((event) => {
			control.update();
		}),
	);
};

class Control extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(control) {
		init(control);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Control.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}

	update() {
		const { back, next, summary, submit, form } = this;
		const { activePageIndex, activePage, nextPage, pages, useSummaryPage, state } = form;

		// basic control setup
		back.active = true;
		back.disabled = activePageIndex <= 0;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if (state == FORMSTATES.finished) {
			back.disabled = true;
			submit.active = true;
		} else if (nextPage || (!activePage.valid && activePageIndex + 1 < pages.length)) {
			next.active = true;
			next.disabled = !activePage.valid;
			form.state = FORMSTATES.input;
		} else if (useSummaryPage && state == FORMSTATES.input) {
			summary.active = true;
			summary.disabled = !activePage.valid;
			form.state = FORMSTATES.summary;
		} else {
			submit.active = true;
			submit.disabled = !form.valid;
			form.state = FORMSTATES.submit;
		}
	}
}
window.customElements.define(NODENAMES.Control, Control);
export default Control;
