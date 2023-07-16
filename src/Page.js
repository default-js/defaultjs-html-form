import { 
	NODENAME_PAGE,  
	ATTRIBUTE_STEP, 
	EVENT_PAGE_INITIALIZED,
	EVENT_PAGE_REMOVED
} from "./Constants";
import { define } from "@default-js/defaultjs-html-components";
import Container from "./Container";

const ATTRIBUTES = [ATTRIBUTE_STEP];

class Page extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}

	static get NODENAME() {
		return NODENAME_PAGE;
	}
	
	constructor(options) {
		super(options);
		this.ready.then(() => this.trigger(EVENT_PAGE_INITIALIZED));
	}

	async destroy(){
		this.trigger(EVENT_PAGE_REMOVED);
		await super.destroy();
	}

	get step(){
		return this.attr(ATTRIBUTE_STEP);
	}
	
	conditionUpdated(){}
}
define(Page);
export default Page;
