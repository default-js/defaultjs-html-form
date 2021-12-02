import { NODENAMES, EVENTS, ATTRIBUTE_STEP } from "./Constants";
import Container from "./Container";
import defineElement from "./utils/DefineElement";

const ATTRIBUTES = [ATTRIBUTE_STEP];

class Page extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}

	static get NODENAME() {
		return NODENAMES.Page;
	}

	constructor(value) {
		super(value);
	}

	async init() {
		await super.init();
	}

	get step(){
		return this.attr(ATTRIBUTE_STEP);
	}
	
	conditionUpdated(){}
}
defineElement(Page);
export default Page;
