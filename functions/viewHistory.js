import Mouse from "../classes/Mouse";

const info = {
    mouse: new Mouse(),
    running: false,
    basetime: 0,
    initialize: function(history) {
        this.running = true;
        this.basetime = history[0].time;
        this.mouse.show();
    },
    clean: function() {
        this.running = false;
        this.basetime = 0;
        this.mouse.hide();
    }
};

export function viewHistory(history=[{time:0}]) {
    if (!info.running) {
        info.initialize(history);
        makeActions(history).forEach(activateAction);
    }
}

function activateAction(action) {
    setTimeout(action.action, action.delay);
}

function makeActions(history) {
    function make(eventObj) {
        const delay = calculateDelay(eventObj.time, info.basetime);
        let action = function unknownAction() {
            console.warn("unknown user action");
        }

        if (eventObj.event.type === "mousemove") {
            action = function mousemove() {
                info.mouse.update(eventObj.event.x, eventObj.event.y);
            }
        }

        return {
            action: action,
            delay: delay,
        }
    }

    history = updateTail(
        history.map(make),
        (tail)=>{tail.action = doBoth(tail.action, killAction)},
    );

    return history;
}

function updateTail(arr, doOn) {
    const tail = arr[arr.length - 1];
    doOn(tail);
    return arr;
}

function calculateDelay(time, base) {
    return time - base;
}

function doBoth(old, func) {
    return (...args)=>{
        old(...args);
        func(...args);
    }
}

function killAction() {
    info.mouse.hide();
    info.clean();
}