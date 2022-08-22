import {
    EVENT_MESSAGE_INITIALIZED, 
    EVENT_MESSAGE_REMOVED
} from "../Constants"

class MessageHandle {

    #base;
    #messages = new Set();

    constructor(base){
        this.#base = base;
        base.on(EVENT_MESSAGE_INITIALIZED, (event) =>{
            event.stopPropagation();
            const target = event.target;
            this.#messages.add(target);
        });

        base.on(EVENT_MESSAGE_REMOVED, (event) =>{
            event.stopPropagation();
            const target = event.target;
            this.#messages.delete(target);
        }); 
    }

    async validate(data) {

    }

};
export default MessageHandle;