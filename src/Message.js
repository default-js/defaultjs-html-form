import {ExpressionResolver} from "@default-js/defaultjs-expression-language";
import {Component, define} from "@default-js/defaultjs-html-components";
import { 
	NODENAME_MESSAGE,
	EVENT_MESSAGE_INITIALIZED,
	EVENT_MESSAGE_REMOVED
} from "./Constants";

export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];



class Message extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME_MESSAGE;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
	}

	async destroy(){
		this.trigger(EVENT_MESSAGE_REMOVED);
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

	async update(data) {
		await this.ready;
		this.active = await ExpressionResolver.resolve(this.condition, data, false);
	}
}
define(Message);
export default Message;
