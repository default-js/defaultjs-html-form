import NodeNames from "./NodeNames";
import {BackButton, NextButton, SummaryButton, SubmitButton, CancelButton} from "./controls";

const ATTRIBUTES = [];

const render = (control) => {
};

class Control extends HTMLElement {

    static get observedAttributes() {
		return ATTRIBUTES;
	}

    constructor(){
        super();
        this.on("change",(event) => {
            event.preventDefault();
            event.stopPropagation();
        });
        this.on("execute",(event) => {
            console.log(event);

            event.preventDefault();
            event.stopPropagation();
        })

    }

    connectedCallback() {
        render(this);
    }

	disconnectedCallback() {}

	adoptedCallback() {
        render(this);
    }

	attributeChangedCallback() {
		this.trigger("change");
	}
}
window.customElements.define(NodeNames.control, Control);
export default Control;