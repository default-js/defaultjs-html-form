import { EVENTS } from "../Constants";
import { toTimeoutHandle } from "../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="text"], input[type="password"], input[type="email"], input[type="tel"], input:not([type]), textarea';

export default class Text extends Wrapper {
	static accept(field) {
		return field.find(INPUTSELECTOR).length > 0;
	}

	constructor(field) {
		super(field);
	}

	init() {
		const { field } = this;
		const input = (this.input = field.find(INPUTSELECTOR).first());
		input.on(
			"input",
			toTimeoutHandle(
				() => {
					field.trigger(EVENTS.input, this.normalizeValue(input.value));
				},
				false,
				true
			)
		);

		field.trigger(EVENTS.input, this.normalizeValue(input.value));
	}

	normalizeValue(value) {
		return value && value.trim().length > 0 ? value : null;
	}

	acceptValue(value) {
		return value == null || typeof value === "undefined" || typeof value === "string";
	}

	updatedValue(value) {
		if (this.field.value != this.input.value)
			this.input.value = value ? value : null;
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.input.value;
	}
}
