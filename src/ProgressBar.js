import { NODENAMES, EVENTS, TRIGGER_TIMEOUT, FORMSTATES, progress, ATTRIBUTE_PROGRESS } from "./Constants";
import "./Step";

const ATTRIBUTES = [ATTRIBUTE_PROGRESS];

const firstStepPageIndex = (pages, step, activePage) => {
	for (let page of pages) {
		if (page.step == step && page.condition) return page;
		else if (page == activePage) return;
	}

	return null;
};

class ProgressBar extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
        super();
        this.progress = 0;

		this.on("click", ({ target }) => {
            if (!this.form) return;
            if(target == this) return;

            const step = target.is(NODENAMES.Step) ? target : target.parent(NODENAMES.Step).first();
            
			if (!step) return;

			const state = this.form.state;
			const pages = this.form.pages;
			const activePageIndex = this.form.activePageIndex;
			const activePage = this.form.activePage;
			const stepName = step.name;
			if (state == FORMSTATES.input || state == FORMSTATES.summary) {
				const page = firstStepPageIndex(pages, stepName, activePage);
				if (page) this.form.activePage = page;
			}
		});
	}

	connectedCallback() {
		this.form = this.parent(NODENAMES.Form);
		this.steps = this.find(NODENAMES.Step);
		this.form.on([EVENTS.initialize, EVENTS.siteChanged, EVENTS.formStateChanged], () => {
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
            
            this.trigger(EVENTS.progressbarChanged);
		});
	}

	get progress() {
		return this.attr(ATTRIBUTE_PROGRESS);
	}

	set progress(progress) {
        if(this.style.setProperty)
            this.style.setProperty("--progress", progress + "%");
		this.attr(ATTRIBUTE_PROGRESS, Math.max(0, Math.min(progress, 100)));
	}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
	}
}

window.customElements.define(NODENAMES.ProgressBar, ProgressBar);
export default ProgressBar;
