import { EVENTS } from "../Constants";
import { toTimeoutHandle } from "../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="checkbox"]';

const init = (wrapper) => {
	const { field } = wrapper;
	wrapper.input = field.find(INPUTSELECTOR);
	if (wrapper.input.length == 1) wrapper.input = wrapper.input.first();
	wrapper.input.on(
		"change input",
		toTimeoutHandle(() => {
			field.trigger( EVENTS.changeValue);
		}),
		false,
		true,
	);
};

export default class Checkbox extends Wrapper {
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

		const values = [];
		value.forEach((value) => {
			values.push(value);
		});

		return values;
	}

	set value(value) {
		this.input.val(value);
	}
}
