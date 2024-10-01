import { ATTRIBUTE_EDITABLE_CONDITION } from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

class EditableHandle {
	#base;
	#condition = null;

	constructor(base) {
		this.#base = base;
	}

	async init(){
	}

	get condition() {
		if (this.#condition == null) this.#condition = (this.#base.attr(ATTRIBUTE_EDITABLE_CONDITION) || "").trim();

		return this.#condition;
	}

	async validate(data) {
		let editable = true;
		const base = this.#base;
		const current = base.editable;
		const condition = this.condition;
		//console.log("validate editable:", {condition, data, base});
		try {
			editable = condition ? await ExpressionResolver.resolve(condition, data, false) : true;
		} catch (e) {
			editable = false;
		}

		if (editable != current) this.#base.editable = editable;

		return editable;
	}
}

export default EditableHandle;
