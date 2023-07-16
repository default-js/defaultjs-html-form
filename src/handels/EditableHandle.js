import { ATTRIBUTE_EDITABLE_CONDITION } from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

class EditableHandle {
	#base;
	#condition = null;

	constructor(base) {
		this.#base = base;
	}

	get condition() {
		if (this.#condition == null)
			this.#condition = this.#base.attr(ATTRIBUTE_EDITABLE_CONDITION) || "";

		return this.#condition;
	}

	async validate(data) {
        let editable = true;
		const current = this.#base.editable;
        /*const {hasValue, required} = this.#base;
        
        if(!hasValue && required)
            editable = true;
        else*/ if(this.condition)
            editable = await ExpressionResolver.resolve(this.condition, data, false);

		if (editable != current) this.#base.editable = editable;

		return editable;
	}
}

export default EditableHandle;
