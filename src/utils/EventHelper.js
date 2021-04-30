import {EVENTHANDLE_TIMEOUT} from "../Constants"

export const toEvents = function() {
    return Array.from(arguments).join(" ");
};

export const makeEventCopy = (event) => {
    return {
        type: event.type,
        target: event.target,
        detail: event.detail,
        currentTarget: event.currentTarget,
        explicitOriginalTarget: event.explicitOriginalTarget,
        originalTarget : event.originalTarget,
        srcElement: event.srcElement,
        timeStamp: event.timeStamp
    };
}

export const toTimeoutHandle = (handle, preventDefault, stopPropagation, timeout) => {
    let id = null;
    return (event) => {
        if(preventDefault)
            event.preventDefault();
        if(stopPropagation)
            event.stopPropagation();

        const eventCopy = makeEventCopy(event);

        if(id)
            clearTimeout(id);
                    
        id = setTimeout(() => {
            id = null;
            handle(eventCopy);
        }, timeout || EVENTHANDLE_TIMEOUT);

    }
};