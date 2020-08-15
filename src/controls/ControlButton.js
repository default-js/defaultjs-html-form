import NodeNames from "../NodeNames";
const ATTRIBUTES = [];
const render = (button) => {};

class ControlButton extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();

	
	}

	connectedCallback() {
		this.on("click", (event) => {
			console.log(event);
            this.execute();
			event.preventDefault();
			event.stopPropagation();
		});

		render(this);
	}

	disconnectedCallback() {}

	adoptedCallback() {
		render(this);
	}

	attributeChangedCallback() {
		this.trigger("change");
	}

	get form (){
		return this.parent(NodeNames.Form);
	}

	execute() {
		this.trigger("execute");
	}
}
export default ControlButton;
