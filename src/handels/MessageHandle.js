import {
    EVENT_MESSAGE_REMOVED,
    NODENAME_MESSAGE
} from "../Constants";
import { addAllToSet } from "../utils/DataHelper.js";
import {findMessages} from "../utils/MessageHelper.js";




class MessageHandle {

    #base = null;
    #messages = new Set();

    constructor(base){
        this.#base = base;

        base.on(EVENT_MESSAGE_REMOVED, (event) =>{            
            event.preventDefault();
            event.stopPropagation();
            const target = event.target;
            this.#messages.delete(target);
        }); 
    }

    async init(){
        const base = this.#base;
		const { form, id, name } = base;
		const messages = this.messages;
		if (id && id.length != 0) {
			addAllToSet(messages, form.find(`${NODENAME_MESSAGE}[for="${id}"]`));
			addAllToSet(messages, form.find(`${NODENAME_MESSAGE}[for="#${id}"]`));
		}

		if (name && name.length != 0) {
			addAllToSet(messages, form.find(`${NODENAME_MESSAGE}[for="${name}"]`));
		}

		addAllToSet(messages, findMessages(base));

    }

    get messages(){
        return this.#messages;
    }

    async validate(data) {
        for(let message of this.#messages)
            message.update(data);
    }

};
export default MessageHandle;