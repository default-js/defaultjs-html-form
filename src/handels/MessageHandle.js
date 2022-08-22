import {
    EVENT_MESSAGE_INITIALIZED, 
    EVENT_MESSAGE_REMOVED
} from "../Constants";


class MessageHandle {

    #messages = new Set();

    constructor(base){
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
        for(let message of this.#messages)
            message.update(data);
    }

};
export default MessageHandle;