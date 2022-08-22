import {
ATTRIBUTE_EDITABLE
} from "../Constants";
import { updateEditableState } from "../utils/StateHelper";

class EditableHandle{

    #base;
    #condition;

    constructor(base){  
        this.#base = base;
    }

    get condition(){
        if(!this.#condition)
            this.#condition = this.#base.attr(ATTRIBUTE_EDITABLE) || "";

        return this.#condition;
    }

    async validate(data){
        const current = this.#base.condition;                 
        const editable = this.#condition ? await ExpressionResolver.resolve(this.#condition, data, false) : true;
        if(editable != current)
            this.#base.editable = editable;

        return editable;
    }

};

export default EditableHandle;

