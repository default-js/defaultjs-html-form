import { EVENTS } from "../Constants";
import { toTimeoutHandle } from "../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="radio"]';

const getRandomInt = () => {
	return Math.floor(Math.random() * Date.now());
};

const init = (wrapper) => {
	const { field } = wrapper;
	const name = field.name + getRandomInt();
	const input = (wrapper.input = field.find(INPUTSELECTOR));
	for (let radio of input) radio.name = name;
	input.on(
		"change",
		toTimeoutHandle(
			() => {
				field.trigger(EVENTS.changeValue);
			}
		)
	);
};

export default class Radio extends Wrapper {
	static accept(field) {
		return field.find(INPUTSELECTOR).length > 0;
	}
	constructor(field) {
		super(field);
		init(this);
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

	set value(value) {
		this.input.val(value);
	}
}
