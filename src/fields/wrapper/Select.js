import { EVENTS } from "../../Constants";
import { toTimeoutHandle } from "../../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'select';

const init = (wrapper) => {
	const { field } = wrapper;
	const input = (wrapper.input = field.find(INPUTSELECTOR).first());
	input.on(
		"change input",
		toTimeoutHandle((event) => {
			field.trigger(EVENTS.changeValue);
		}),
		false,
		true,
	);
};

export default class Text extends Wrapper {
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
		return this.input.value;
	}

	set value(value) {
		this.input.value = value;
	}
}
