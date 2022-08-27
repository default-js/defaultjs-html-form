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
            this.#condition = this.#base.attr(ATTRIBUTE_CONDITION) || false;

        return this.#condition;
    }

    async validate(data){
        const base = this.#base;        
        let condition = this.condition;
        const current = base.condition;
        
        //console.log(`condition(${base.name})`, condition, data);        
        
        condition = condition ? await ExpressionResolver.resolve(condition, data, false) : true;
        if(condition != current)
            base.condition = condition

        //console.log(`condition(${base.name}) result:`, condition);
        return condition;
    }
};

export default ConditionHandle;