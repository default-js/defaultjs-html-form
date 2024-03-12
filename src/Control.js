import { 
	FORMSTATE_INIT,
	FORMSTATE_INPUT,
	FORMSTATE_VALIDATING,
	FORMSTATE_SUMMARY,
	FORMSTATE_FINISHED, 
	NODENAME_CONTROL,
	NODENAME_CONTROL_BACK,
	NODENAME_CONTROL_NEXT,
	NODENAME_CONTROL_CANCEL,
	NODENAME_CONTROL_SUBMIT, 
	NODENAME_FORM,
	EVENT_INITIALIZED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_SITE_CHANGED,
	NODENAME_CONTROL_SUMMARY
} from "./Constants";
import { Component, define } from "@default-js/defaultjs-html-components";
import "./controls";

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
		return NODENAME_CONTROL;
	}

	#form;
	#back;
	#next;
	#summary;
	#submit;
	#initialized = false;

	constructor() {
		super();
	}

	async init() {
		await super.init();
		if (!this.#initialized) {
			this.#form = this.parent(NODENAME_FORM);
			this.#back = this.find(NODENAME_CONTROL_BACK).first() || BUTTONDUMMY;
			this.#next = this.find(NODENAME_CONTROL_NEXT).first() || BUTTONDUMMY;
			this.#summary = this.find(NODENAME_CONTROL_SUMMARY).first() || BUTTONDUMMY;
			this.#submit = this.find(NODENAME_CONTROL_SUBMIT).first() || BUTTONDUMMY;

			this.#form.on([EVENT_INITIALIZED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED], () => {
				this.update();
			});

			this.#initialized = true;
		}
	}

	

	async update() {
		const form = this.#form;
		const state = form.state;
		const back = this.#back;
		const next = this.#next;
		const summary = this.#summary;
		const submit = this.#submit

		// basic control setup
		back.active = true;
		back.disabled = true;
		next.active = false;
		next.disabled = true;
		summary.active = false;
		summary.disabled = true;
		submit.active = false;
		submit.disabled = true;

		if(state == FORMSTATE_VALIDATING)
			return;

		const { activePageIndex, activePage, nextPage, pages, useSummaryPage } = form;	
		const hasNextPage = (await nextPage) != null;

		if (state == FORMSTATE_FINISHED) {
			back.disabled = true;
			submit.active = true;
		} else if (state == FORMSTATE_SUMMARY) {
			back.disabled = false;
			submit.active = true;
			submit.disabled = !form.valid;
		} else if (state == FORMSTATE_INPUT) {
			back.disabled = activePageIndex <= 0;

			if (hasNextPage || (!activePage.valid && activePageIndex + 1 < pages.length)) {
				next.active = true;
				next.disabled = activePage ? !activePage.valid : true;
			} else if (useSummaryPage && state == FORMSTATE_INPUT) {
				summary.active = true;
				summary.disabled = activePage ? !activePage.valid : true;
			} else {
				submit.active = true;
				submit.disabled = !form.valid;
			}
		}
	}
}
define(Control);
export default Control;
