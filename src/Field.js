import Base from "./Base";

const ATTRIBUTES = ["name", "value"];
class Field extends Base {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
        super();
    }

	connectedCallback() {}

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {
		this.trigger("change");
	}

	get name() {
		this.getAttribute(ATTRIBUTES[0]);
	}

	set name(name) {
		this.setAttribute(ATTRIBUTES[0], name);
    }
    
    get value(){
        this.getAttribute(ATTRIBUTES[1]);
    }

    set value(value){
        this.setAttribute(ATTRIBUTES[1], name);
    }
}

customElements.define("defaultjs-field", Field);
export default Field;