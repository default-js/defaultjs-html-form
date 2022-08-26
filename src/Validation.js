import { 
	NODENAME_VALIDATION,
	EVENT_VALIDATION_INITIALIZED,
	EVENT_VALIDATION_REMOVED,
	ATTRIBUTE_ACTIVE,
	ATTRIBUTE_CONDITION
} from "./Constants";
import {Component, define} from "@default-js/defaultjs-html-components";

const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];


class Validation extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_VALIDATION;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.active = false;
		this.ready.then(() => this.trigger(EVENT_VALIDATION_INITIALIZED));
	}

	async destroy() {
		this.trigger(EVENT_VALIDATION_REMOVED);
		await super.destroy();
	}

	get active() {
		return this.hasAttribute(ATTRIBUTE_ACTIVE);
	}
	set active(active) {
		active ? this.attr(ATTRIBUTE_ACTIVE, "") : this.attr(ATTRIBUTE_ACTIVE, undefined);
	}

	get condition() {
		return this.attr(ATTRIBUTE_CONDITION);
	}
}
define(Validation);
export default Validation;
