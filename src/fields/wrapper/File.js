import { EVENTS } from "../../Constants";
import { toTimeoutHandle } from "../../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="file"]';

const readFile = (file, readFnName) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("loadend", () => {
			resolve({
				name: file.name,
				type: file.type,
				size: file.size,
				data: reader.result
			});
		}, false);
		reader[readFnName](file);
	});
};

const updateInput = async (wrapper) => {
	console.log("update input");
	const {input, field, format} = wrapper; 
	if (input.files[0])
		wrapper.file = await FORMAT[format](input.files[0]);
	else
		wrapper.file = null;

	field.trigger(EVENTS.changeValue);
}

//readAsDataURL

const FORMAT = {
	"form-input": async (file) => { return file; },
	"data-url-base64": async (file) => {
		return readFile(file, "readAsDataURL");
	},
	"base64" : async (file) => {
		const result = await readFile(file, "readAsDataURL");
		console.log({result})
		result.data = result.data.substr(result.data.indexOf(",") + 1);
		console.log({result})
		return result;
	} 
}

const init = (wrapper) => {
	const { field } = wrapper;
	const input = (wrapper.input = field.find(INPUTSELECTOR).first());
	input.on(
		"input", (event) => {
			updateInput(wrapper);
		},
		false,
		true
	);

	if (input.files[0])
		updateInput(wrapper);
};

export default class File extends Wrapper {
	static accept(field) {
		return field.find(INPUTSELECTOR).length > 0;
	}

	constructor(field) {
		super(field);
		this.format = field.attr("file-format") || "data-url-base64";
		init(this);
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	get value() {
		return this.file;
	}

	set value(value) {
		this.file = value;
	}
}
