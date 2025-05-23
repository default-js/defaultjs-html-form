import { EVENT_FIELD_INPUT } from "../Constants";
import { toTimeoutHandle } from "../utils/EventHelper";
import Wrapper from "./Wrapper";

const INPUTSELECTOR = 'input[type="file"]';

const readFile = (file, readFnName) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener(
			"loadend",
			() => {
				resolve({
					name: file.name,
					type: file.type,
					size: file.size,
					data: reader.result,
				});
			},
			false,
		);
		reader[readFnName](file);
	});
};

//readAsDataURL

const FORMAT = {
	"form-input": async (file) => {
		file.format = "form-input";
		return file;
	},
	"data-url-base64": async (file) => {
		const result = await readFile(file, "readAsDataURL");
		result.format = "data-url-base64";
		return result;
	},
	base64: async (file) => {
		const result = await readFile(file, "readAsDataURL");
		result.data = result.data.substr(result.data.indexOf(",") + 1);
		result.format = "base64";
		return result;
	},
};

const readFiles = async (files, format, multiple) => {
	let result = [];
	for (let file of files) result.push(await FORMAT[format](file));

	if (result.length == 0) return null;

	return multiple ? result : result[0];
};

export default class File extends Wrapper {
	static findInput(field) {
		return field.find(INPUTSELECTOR).first();
	}

	#value = null;
	constructor(field, input) {
		super(field, input);
	}

	async init() {
		await super.init();
		const { field, input } = this;
		this.multiple = input.multiple;
		this.format = field.attr("file-format") || "form-input";
		this.filenameTarget = field.attr("file-name-target");
		this.filenameTarget = this.filenameTarget ? field.find(this.filenameTarget).first() : null;
		const { format, multiple } = this;

		input.on(
			"input",
			toTimeoutHandle(
				async () => {
					this.updatedValue(await readFiles(input.files, format, multiple));
					field.trigger(EVENT_FIELD_INPUT, this.value);
				},
				false,
				true,
			),
		);
		if (input.files && input.files.length != 0) this.updatedValue(await readFiles(input.files, format, multiple));

		field.trigger(EVENT_FIELD_INPUT, this.value);
	}

	set readonly(readonly) {
		this.input.attr("disabled", readonly ? "" : null);
	}

	acceptValue(value) {
		if (value == null || typeof value === "undefined") return true;
		else if (this.multiple) return value instanceof Array;
		else return typeof value === "object";
	}

	normalizeValue(value) {
		if (value == null || typeof value === "undefined") return null;
		else if (this.multiple) return value.length != 0 ? value : null;
		else return value;
	}

	updatedValue(value) {
		const currentValue = this.#value;
		if (value != currentValue) {
			this.#value = value;
			if (!value) this.input.value = null;

			const filename = this.filenameTarget;
			if (filename) {
				filename.empty();
				if (value) {
					if (this.multiple) {
						for (let file of value) {
							filename.append(`<span>${file.name}</span>`);
						}
					} else filename.append(`<span>${value.name}</span>`);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

	get valid() {
		return this.input.checkValidity();
	}
}
