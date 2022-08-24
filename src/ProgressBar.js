import { 
	NODENAMES, 
	EVENT_SITE_CHANGED,
	EVENT_FORM_STATE_CHANGED,
	EVENT_PROGRESSBAR_CHANGED,
	FORMSTATES, 
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
		return NODENAMES.ProgressBar;
	}

	constructor() {
		super();

		this.on("click", ({ target }) => {
			if (!this.form) return;
			if (target == this) return;

			const step = target.is(NODENAMES.Step) ? target : target.parent(NODENAMES.Step);

			if (!step) return;

			const state = this.form.state;
			const pages = this.form.pages;
			const activePage = this.form.activePage;
			const stepName = step.name;
			if (state == FORMSTATES.input || state == FORMSTATES.summary) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) this.form.activePage = page;
			}
		});
	}

	async init() {
		await super.init();
		const ready = this.ready;
		this.progress = 0;
		if (!ready.resolved) {
			this.form = this.parent(NODENAMES.Form);
			this.steps = this.find(NODENAMES.Step);
			this.form.on([EVENT_SITE_CHANGED,EVENT_FORM_STATE_CHANGED], () => {
				const state = this.form.state;
				const activePage = this.form.activePage;
				if (!activePage) return;

				const index = this.form.activePageIndex;
				const count = this.form.pages.length;
				const pageStep = activePage ? activePage.step : FORMSTATES.init;
				const progress = Math.floor((index * 100) / count);

				for (let step of this.steps) {
					const name = step.name;
					if (state == FORMSTATES.input) {
						step.active = name == pageStep;
						step.readonly = false;
					} else if (state == FORMSTATES.summary) {
						step.active = name == FORMSTATES.summary;
						step.readonly = false;
					} else {
						step.active = name == FORMSTATES.finished;
						step.readonly = true;
					}
				}

				this.progress = state == FORMSTATES.summary || state == FORMSTATES.finished ? 100 : progress;

				this.trigger(EVENT_PROGRESSBAR_CHANGED);
			});
		}
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
