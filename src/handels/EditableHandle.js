import { ATTRIBUTE_EDITABLE_CONDITION } from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

class EditableHandle {
	#initialized = false;
	#base;
	#condition;

	constructor(base) {
		this.#base = base;
	}

	get condition() {
		if (!this.#initialized) {
			this.#condition = this.#base.attr(ATTRIBUTE_EDITABLE_CONDITION) || "";
			this.#initialized = true;
		}

		return this.#condition;
	}

	async validate(data) {
		const current = this.#base.editable;
		const editable = this.condition ? await ExpressionResolver.resolve(this.condition, data, false) : true;
		if (editable != current) this.#base.editable = editable;

		return editable;
	}
}

export default EditableHandle;
