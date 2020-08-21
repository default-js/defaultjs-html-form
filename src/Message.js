import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Base from "./Base";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import { evaluationData } from "./utils/DataHelper";


export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_CONDITION = "condition";
const ATTRIBUTES = [ATTRIBUTE_ACTIVE, ATTRIBUTE_CONDITION];

export const findParentBase = (message) => {
	let parent = message.parentNode;
	while (parent) {
		if (parent instanceof Base) return parent;

		parent = parent.parentNode;
	}
	return null;
};

const init = (message) => {
	message.reference = findParentBase(message);
	message.form = message.parent(NODENAMES.Form);

	message.form.on(
		toEvents(EVENTS.changeValue, EVENTS.changeCondition),
		toTimeoutHandle((event) => {
			message.update();
		}),
	);
	message.update();
};

class Message extends HTMLElement {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static init(message) {
		init(message);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		Message.init(this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			this.trigger(TRIGGER_TIMEOUT, EVENTS.changeAttributeEventBuilder(name));
			this.trigger(TRIGGER_TIMEOUT, EVENTS.change);
		}
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

	async update() {
		const data = evaluationData(this.reference);
		this.active = await ExpressionResolver.resolve(this.condition, data, false);
	}
}
window.customElements.define(NODENAMES.Message, Message);
export default Message;
