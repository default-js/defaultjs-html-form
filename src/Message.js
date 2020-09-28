import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Base from "./Base";
import Component from "@default-js/defaultjs-html-components/src/Component";
import { NODENAMES, EVENTS, TRIGGER_TIMEOUT } from "./Constants";
import { toEvents, toTimeoutHandle } from "./utils/EventHelper";
import { evaluationData } from "./utils/DataHelper";
import defineElement from "./utils/DefineElement";

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

class Message extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAMES.Message;
	}

	constructor() {
		super();
	}

	async init() {
		this.reference = findParentBase(this);
		this.form = this.parent(NODENAMES.Form);

		this.form.on(EVENTS.executeValidate, () => {
			this.update();
		});
		this.update();
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
		await this.ready;
		const data = evaluationData(this.reference);
		this.active = await ExpressionResolver.resolve(this.condition, data, false);
	}
}
defineElement(Message);
export default Message;
