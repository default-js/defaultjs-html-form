import { ATTRIBUTE_CONDITION } from "./Constants";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";
import { updateConditionState } from "./utils/StateHelper";

class Condition {

    #base;
    #condition;

    constructor(base, condition){  
        this.#base = base;      
        this.#condition = condition;
    }

    async validate(data, current){                 
        const condition = this.#condition ? await ExpressionResolver.resolve(this.#condition, data, false) : true;
        if(condition != current)
            updateConditionState(this.#base, condition);

        return condition;
    }

};

export default Condition;