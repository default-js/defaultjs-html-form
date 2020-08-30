import { NODENAMES, EVENTS, ATTRIBUTE_STEP } from "./Constants";
import Container from "./Container";

const ATTRIBUTES = [ATTRIBUTE_STEP];

class Page extends Container {
	static get observedAttributes() {
		return ATTRIBUTES.concat(Container.observedAttributes);
	}

	constructor() {
		super();
	}

	async init() {
		await this.initPage();
	}

	async initPage() {
		await this.initContainer();
	}	
	
	conditionUpdated(){}
}
window.customElements.define(NODENAMES.Page, Page);
export default Page;
