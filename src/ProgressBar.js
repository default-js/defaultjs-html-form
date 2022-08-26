import { 
	NODENAME_FORM, 
	NODENAME_PROGESSBAR,
	NODENAME_STEP,
	EVENT_SITE_CHANGED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_PROGRESSBAR_CHANGED,
	FORMSTATE_INIT,
	FORMSTATE_VALIDATING,
	FORMSTATE_INPUT,
	FORMSTATE_SUMMARY,
	FORMSTATE_FINISHED, 
	ATTRIBUTE_PROGRESS } from "./Constants";
import {Component ,define } from "@default-js/defaultjs-html-components";
import "./Step";

const ATTRIBUTES = [ATTRIBUTE_PROGRESS];

const firstStepPageIndex = (pages, step, activePage) => {
	for (let page of pages) {
		if (page.step == step && page.condition) return page;
		else if (page == activePage) return;
	}

	return null;
};

class ProgressBar extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_PROGESSBAR;
	}

	#form;
	#steps;
	#initialized = false;
	constructor() {
		super();
		this.on("click", ({ target }) => {
			if (!this.#form) return;
			if (target == this) return;			
			const step = target.is(NODENAME_STEP) ? target : target.parent(NODENAME_STEP);
			const form = this.#form;

			if (!step) return;

			const {state, pages, activePage} = form;
			const stepName = step.name;
			if (state == FORMSTATE_INPUT || state == FORMSTATE_SUMMARY) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) form.activePage = page;
			}
		});
	}

	async init() {
		await super.init();
		this.progress = 0;
		if (!this.#initialized) {
			const form = this.#form = this.parent(NODENAME_FORM);
			this.#steps = this.find(NODENAME_STEP);
			this.#form.on([EVENT_SITE_CHANGED,EVENT_FORM_STATE_CHANGED], () => {
				const state = form.state;
				if(FORMSTATE_VALIDATING == state)
					return;

					
				const {activePageIndex, activePage, pages} = form;
				if (!activePage) 
					return;

				const count = pages.length;
				const pageStep = activePage ? activePage.step : FORMSTATE_INIT;
				const progress = Math.floor((activePageIndex * 100) / count);

				for (let step of this.steps) {
					const name = step.name;
					if (state == FORMSTATE_INPUT) {
						step.active = name == pageStep;
						step.readonly = false;
					} else if (state == FORMSTATE_SUMMARY) {
						step.active = name == FORMSTATE_SUMMARY;
						step.readonly = false;
					} else {
						step.active = name == FORMSTATE_FINISHED;
						step.readonly = true;
					}
				}

				this.progress = state == FORMSTATE_SUMMARY || state == FORMSTATE_FINISHED ? 100 : progress;

				this.trigger(EVENT_PROGRESSBAR_CHANGED);
			});

			this.#initialized = true;
		}
	}

	get steps(){
		return Array.from(this.#steps);
	}

	get progress() {
		return this.attr(ATTRIBUTE_PROGRESS);
	}

	set progress(progress) {
		if (this.style.setProperty) this.style.setProperty("--progress", progress + "%");
		this.attr(ATTRIBUTE_PROGRESS, Math.max(0, Math.min(progress, 100)));
	}
}

define(ProgressBar);
export default ProgressBar;
