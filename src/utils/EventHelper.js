import {EVENTHANDLE_TIMEOUT} from "../Constants"

export const toEvents = function() {
    return Array.from(arguments).join(" ");
};

export const toTimeoutHandle = (handle, preventDefault, stopPropagation, timeout) => {
    let id = null;
    return function(event) {
        if(id)
            clearTimeout(id);

        id = setTimeout(() => {
            id = null;
            handle(event);
        }, timeout || EVENTHANDLE_TIMEOUT);

        if(preventDefault)
            event.preventDefault();
        if(stopPropagation)
            event.stopPropagation();
    }
};