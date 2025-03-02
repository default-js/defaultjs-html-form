export const STATE_SUCCESS = "success";
export const STATE_FAIL = "fail";

class SubmitActionResult {

    static get STATE_SUCCESS(){return STATE_SUCCESS;}
    static get STATE_FAIL(){return STATE_FAIL;}

    constructor(action, state, message, data, context){
		this.action = action;
        this.state = state;
        this.message = message;
        this.data = data;
        this.context = context;
    };    
};

export default SubmitActionResult;