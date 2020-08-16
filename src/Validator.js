import { VALIDATIONSTATES, EVENTS } from "./Constants";
import ExpressionResolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Validation from "./Validation";
import { findValidations} from "./utils/NodeHelper";


const setState = (target, valid) => {
    if(typeof valid === "undefined"){        
		target.attr(VALIDATIONSTATES.invalid, null);
        target.attr(VALIDATIONSTATES.valid, null);
        target.attr(VALIDATIONSTATES.noValue, "");
    }else if (valid) {
        target.attr(VALIDATIONSTATES.noValue, null);
		target.attr(VALIDATIONSTATES.invalid, null);
		target.attr(VALIDATIONSTATES.valid, "");
	} else {
        target.attr(VALIDATIONSTATES.noValue, null);
		target.attr(VALIDATIONSTATES.valid, null);
		target.attr(VALIDATIONSTATES.invalid, "");
	}
};



const init = (validator) => {
    const {target, form} = validator;
    const validations = findValidations(target);    
    if(validations && validations.length > 0){        
        validator.validations = validations;
        target.on(EVENTS.changeValue, (event) => {
            validator.validate();
        });
    }
}


class Validator {
    constructor(base){
        this.target = base;
        init(this);
    }

    get form(){
        return this.target.form;
    }

    async validate(){

    }
}


export default Validator;