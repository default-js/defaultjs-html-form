import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Component from "@default-js/defaultjs-html-components/src/Component";
import { 
	NODENAMES,
	EVENT_MESSAGE_INITIALIZED
} from "./Constants";
import defineElement from "./utils/DefineElement";

export const NODENAME = NODENAMES.Message;
export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];



class Message extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		this.trigger(EVENT_MESSAGE_INITIALIZED);
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
defineElement(Message);
export default Message;
