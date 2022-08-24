import { 
	NODENAME_PAGE,  
	ATTRIBUTE_STEP 
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
define(Page);
export default Page;
