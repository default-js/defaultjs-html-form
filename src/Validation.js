import { NODENAMES, EVENTS } from "./Constants";

export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];

const init = (validation) =>{
    validation.active = false;
};

class Validation extends HTMLElement{
    static get observedAttributes() {
		return ATTRIBUTES;
	}

    constructor(){
        super();
        init(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
		if(oldValue != newValue){
			this.trigger(EVENTS.changeAttributeEventBuilder(name));
			this.trigger(EVENTS.change);
		}
	}

    get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active
			? this.attr(ATTRIBUTE_ACTIVE, "")
			: this.attr(ATTRIBUTE_ACTIVE, undefined);
	}

    get condition(){
        return this.attr(ATTRIBUTE_CONDITION);
    }

}
window.customElements.define(NODENAMES.Validation, Validation);
export default Validation;