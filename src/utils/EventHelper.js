import {EVENTHANDLE_TIMEOUT} from "../Constants"

export const toEvents = function() {
    return Array.from(arguments).join(" ");
};

export const toTimeoutHandle = (handle, preventDefault, stopPropagation) => {
    let timeout = null;
    return function(event) {
        if(timeout)
            clearTimeout(timeout);

        timeout = setTimeout(function() {
            timeout = null;
            handle(event);
        }, EVENTHANDLE_TIMEOUT);

        if(preventDefault)
            event.preventDefault();
        if(stopPropagation)
            event.stopPropagation();
    }
};