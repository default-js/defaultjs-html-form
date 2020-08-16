import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import { NODENAMES, EVENTS } from "./Constants";
import {toEvents} from "./utils/EventHelper";


export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];

const init = (message) =>{
    message.form = message.parent(NODENAMES.Form);

    message.form.on(toEvents(EVENTS.changeValue, EVENTS.changeCondition), (event) => {
        message.update();
    });
    message.update();
};

class Message extends HTMLElement{
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

    async update(){
        const data = this.form.data;
        this.active = await ExpressionResolver.resolve(this.condition, data, false);
    }

}
window.customElements.define(NODENAMES.Message, Message);
export default Message;