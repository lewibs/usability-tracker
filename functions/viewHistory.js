import Mouse from "../classes/Mouse";
import { ratioToPx } from "./window";

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
        const event = eventObj.event;
        const type = event.type;
        const key = event.currentKey;

        let action = ()=>{};
        switch (type) {
            case "mousemove":
                action = function mousemove() {
                    //console.log("mousemove")
                    info.mouse.update(...getMouseXY(event));
                }
                break;
            case "mousedown":
                action = function mousedown() {
                    //console.log("mousedown");
                    info.mouse.mouseDown(key, ...getMouseXY(event));
                }
                break;
            case 'mouseup':
                action = function mouseup() {
                    //console.log("mouseup");
                    info.mouse.mouseUp(key, ...getMouseXY(event));
                }
                break;
            case 'keydown':
                action = function keydown() {
                    //console.log("keydown");
                    info.mouse.keyDown(key, ...getMouseXY(event));
                }
                break;
            case 'keyup':
                action = function keyup() {
                    //console.log("keyup");
                    info.mouse.keyUp(key, ...getMouseXY(event));
                }
                break;
            case 'wheel':
                action = function wheel() {
                    //console.log("wheel");
                    info.mouse.wheel(key, ...getWheelXY(event));
                }
                break;
            default:
                action = function unknown(){
                    console.warn(`unknown user action: ${type}`);
                }
        }

        return {
            action: action,
            delay: delay,
        }
    }

    return attachKillAction(history.map(make));
}

function getMouseXY(event) {
    return ratioToPx(event.ratioX, event.ratioY);
}

function getWheelXY(event) {
    debugger;
    return ratioToPx(event.wheelRatioX, event.wheelRatioY);
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

function attachKillAction(history) {
    return updateTail(
        history,
        (tail)=>{tail.action = doBoth(tail.action, killAction)},
    );
}