import {EVENTHANDLE_TIMEOUT} from "../Constants"

export const toEvents = function() {
    return Array.from(arguments).join(" ");
};

export const toTimeoutHandle = (handle) => {
    let timeout = null;
    return (event) => {
        if(timeout)
            clearTimeout(timeout);

        setTimeout(() => {
            timeout = null;
            handle(event);
        }, EVENTHANDLE_TIMEOUT);
    }
};