import { ATTRIBUTE_CONDITION } from "../Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";

class ConditionHandle {

    #base;
    #condition;

    constructor(base){  
        this.#base = base;
    }

    get condition(){
        if(!this.#condition)
            this.#condition = this.#base.attr(ATTRIBUTE_CONDITION) || "";

        return this.#condition;
    }

    async validate(data){
        const current = this.#base.condition;                 
        const condition = this.#condition ? await ExpressionResolver.resolve(this.#condition, data, false) : true;
        if(condition != current)
            this.#base.condition = condition

        return condition;
    }
};

export default ConditionHandle;