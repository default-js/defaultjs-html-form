import { 
	FORMSTATES, 
	NODENAMES, 
	EVENT_INITIALIZED,
	EVENT_VALUE_CHANGED,
	EVENT_CONDITION_STATE_CHANGED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_SITE_CHANGED
} from "./Constants";
import Component from "@default-js/defaultjs-html-components/src/Component";
import "./controls";
import Page from "./Page";
import defineElement from "./utils/DefineElement";

const BUTTONDUMMY = {
	active: true,
	disabled: true,
};

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
		await super.init();
		if (!this.ready.resolved) {
			this.form = this.parent(NODENAMES.Form);
			this.back = this.find(NODENAMES.BackButton).first() || BUTTONDUMMY;
			this.next = this.find(NODENAMES.NextButton).first() || BUTTONDUMMY;
			this.summary = this.find(NODENAMES.SummaryButton).first() || BUTTONDUMMY;
			this.submit = this.find(NODENAMES.SubmitButton).first() || BUTTONDUMMY;

			this.form.on([EVENT_INITIALIZED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED], (event) => {
				this.update();
			});
		}
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
