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
        const [x,y] = ratioToPx(event.ratioX, event.ratioY);

        //how to handle:
        //"wheel"
        //"leftmouse"
        //"middlemouse"
        //"rightmouse"

        let action = ()=>{};
        switch (event.type) {
            case "mousemove":
                action = function mousemove() {
                    console.log("mousemove")
                    info.mouse.update(x, y);
                }
                break;
            case "mousedown":
                action = function mousedown() {
                    console.log("mousedown");
                    info.mouse.click(x,y);
                }
                break;
            case 'mouseup':
                action = function mouseup() {
                    console.log("mouseup");
                }
                break;
            case 'keydown':
                action = function keydown() {
                    console.log("keydown");
                }
                break;
            case 'keyup':
                action = function keyup() {
                    console.log("keyup");
                }
                break;
            default:
                action = function unknown(){
                    console.warn(`unknown user action: ${event.type}`);
                }
        }

        return {
            action: action,
            delay: delay,
        }
    }

    return attachKillAction(history.map(make));
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