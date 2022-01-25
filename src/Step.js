import { 
	NODENAMES, 
	ATTRIBUTE_NAME, 
	ATTRIBUTE_ACTIVE, 
	ATTRIBUTE_READONLY 
} from "./Constants";
import { updateActiveState } from "./utils/StateHelper";
import defineElement from "./utils/DefineElement";

const ATTRIBUTES = [ATTRIBUTE_NAME, ATTRIBUTE_ACTIVE, ATTRIBUTE_READONLY];

class Step extends HTMLElement {
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

defineElement(Step);
export default Step;
