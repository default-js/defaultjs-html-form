import { 
	FORMSTATE_INPUT,
	FORMSTATE_VALIDATING,
	FORMSTATE_SUMMARY,
	FORMSTATE_FINISHED, 
	NODENAME_CONTROL,
	NODENAME_CONTROL_BACK,
	NODENAME_CONTROL_NEXT,
	NODENAME_CONTROL_SUBMIT, 
	NODENAME_FORM,
	EVENT_INITIALIZED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_SITE_CHANGED,
	NODENAME_CONTROL_SUMMARY
} from "./Constants";
import { Component, define } from "@default-js/defaultjs-html-components";
import "./FormButton";
import "./controls";


const BUTTONDUMMY = {
	active: false,
	disabled: false,
};

class SubmitWrapper{

	#submits;
	#active = false;
	#disabled = false;

	/**
	 * 
	 * @param {Array<FormButton>} theSubmits 
	 */
	constructor(theSubmits){
		this.#submits = theSubmits;
		this.#submits.forEach(button => {
			button.active = this.#active;
			button.disabled = this.#disabled;
		});
	}

	get active(){
		return this.#active;
	}

	set active(aValue){
		this.#active = aValue
		this.#submits.forEach(button =>	button.active = this.#active);
	}

	get disabled(){
		return this.#disabled;
	}

	set disabled(aValue){
		this.#disabled = aValue
		this.#submits.forEach(button =>	button.disabled = this.#disabled);
	}
}

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
			this.#initialized = true;
			this.#form = this.parent(NODENAME_FORM);
			this.#back = this.find(NODENAME_CONTROL_BACK).first() || BUTTONDUMMY;
			this.#next = this.find(NODENAME_CONTROL_NEXT).first() || BUTTONDUMMY;
			this.#summary = this.find(NODENAME_CONTROL_SUMMARY).first() || BUTTONDUMMY;
			this.#submit = new SubmitWrapper(this.find(NODENAME_CONTROL_SUBMIT) || [BUTTONDUMMY]);

			this.#form.on([EVENT_INITIALIZED, EVENT_FORM_STATE_CHANGED, EVENT_SITE_CHANGED], () => {
				this.update();
			});
		}
	}

	

	async update() {
		const form = this.#form;
		const state = form.state;
		const back = this.#back;
		const next = this.#next;
		const summary = this.#summary;
		const submit = this.#submit;

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
