const ATTRIBUTES = ["name"];
class Base extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {}

	get name() {
		this.getAttribute(ATTRIBUTES[0]);
	}

	set name(name) {
		this.setAttribute(ATTRIBUTES[0], name);
	}

	connectedCallback() {
        this.render();
    }

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.render();
		this.trigger("change");
	}

	render() {}
}
