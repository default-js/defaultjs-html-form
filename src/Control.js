import { FORMSTATES, NODENAMES, EVENTS } from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import { BackButton, NextButton, SummaryButton, SubmitButton, CancelButton } from "./controls";
import Page from "./Page";
import defineElement from "./utils/DefineElement";

const ATTRIBUTES = [];
class Control extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.Control;
	}

	constructor() {
		super();
	}

	async init() {
		this.form = this.parent(NODENAMES.Form);
		this.back = this.find(NODENAMES.BackButton).first();
		this.next = this.find(NODENAMES.NextButton).first();
		this.summary = this.find(NODENAMES.SummaryButton).first();
		this.submit = this.find(NODENAMES.SubmitButton).first();

		this.form.on([EVENTS.validStateChanged, EVENTS.conditionStateChanged], (event) => {
			if (event.target instanceof Page) this.update();
		});

		this.form.on([EVENTS.formStateChanged, EVENTS.siteChanged], (event) => {
			this.update();
		});
	}

	update() {
		const { back, next, summary, submit, form } = this;
		const { activePageIndex, activePage, nextPage, pages, useSummaryPage, state } = form;

		// basic control setup
		back.active = true;
		back.disabled = true;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if (state == FORMSTATES.finished) {
			back.disabled = true;
			submit.active = true;
		} else if (state == FORMSTATES.summary) {
			back.disabled = false;
			submit.active = true;
			submit.disabled = !form.valid;
		} else if (state == FORMSTATES.input) {
			back.disabled = activePageIndex <= 0;

			if (nextPage || (!activePage.valid && activePageIndex + 1 < pages.length)) {
				next.active = true;
				next.disabled = !activePage.valid;
			} else if (useSummaryPage && state == FORMSTATES.input) {
				summary.active = true;
				summary.disabled = !activePage.valid;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}
	}
}
defineElement(Control);
export default Control;
