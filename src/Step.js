import { 
	NODENAMES, 
	ATTRIBUTE_NAME, 
	ATTRIBUTE_ACTIVE, 
	ATTRIBUTE_READONLY 
} from "./Constants";
import { updateActiveState } from "./utils/StateHelper";
import {Component, define} from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY];

class Step extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.Step;
	}

	constructor() {
		super();
	}

    get name(){
        return this.attr(ATTRIBUTE_NAME);
    }
    
    get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (current != active) {
			updateActiveState(this, active);
		}
	}

	get readonly() {
		return this.hasAttribute(ATTRIBUTE_READONLY);
	}

	set readonly(readonly) {
		readonly ? this.attr(ATTRIBUTE_READONLY, "") : this.attr(ATTRIBUTE_READONLY, null);
	}
}

define(Step);
export default Step;
