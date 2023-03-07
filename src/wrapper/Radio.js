import { 
	EVENT_FIELD_INPUT,
	EVENTHANDLE_INPUT_TIMEOUT 
} from "../Constants";
import { toTimeoutHandle } from "../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="radio"]';

const getRandomInt = () => {
	return Math.floor(Math.random() * Date.now());
};

export default class Radio extends Wrapper {
	static findInput(field) {
		const input = field.find(INPUTSELECTOR);
		if (input.length == 0)
			return null;

		return input;
	}

	constructor(field, input) {
		super(field, input);
	}

	init() {
		const { field, input } = this;
		const name = field.name + getRandomInt();
		for (let radio of input) radio.name = name;
		input.on(
			"input",
			toTimeoutHandle(
				() => {
					field.trigger(EVENT_FIELD_INPUT, this.normalizeValue(this.value));
				},
				false,
				true,
				EVENTHANDLE_INPUT_TIMEOUT
			)
		);

		field.trigger(EVENT_FIELD_INPUT, this.normalizeValue(this.value));
	}


	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		const value = this.input.val();
		if (!(value instanceof Map)) return value;
		if (value.size == 0) return null;
		return value.values().next().value;
	}

	normalizeValue(value) {
		if (value)
			return value;

		return null;
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined")
			return true;
		else{
			const type = typeof value;
			return type === "string" || type === "boolean";
		}
	}

	updatedValue(value) {
		this.input.val(value ? value : null);
	}
}
