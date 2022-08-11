import {LEFTMOUSE, MIDDLEMOUSE, RIGHTMOUSE} from "lewibs-keylogger";

export class Mouse {
    #element;

    constructor() {
        this.#element = makeMouse();
    }

    show() {
        document.body.append(this.#element);
    }

    hide() {
        this.#element.remove();
    }

    keyDown(key, x, y) {
        dispatchKeyEvent("keydown", key, x, y);
    }

    keyUp(key, x, y) {
        dispatchKeyEvent("keyup", key, x, y);
    }

    mouseDown(key, x, y) {
        dispatchMouseEvent("mousedown", key, x, y);
    }

    mouseUp(key, x, y) {
        dispatchMouseEvent("mouseup", key, x, y);
    }

    wheel(key, x, y) {
        dispatchWheelEvent("wheel", key, x, y);
    }

    update(x,y) {
        this.hide();
        this.#element = updateMouse(this.#element, x, y);
        this.show();
    }
}

function makeMouseEvent(type, key, x, y) {
    const props = makeEventProps({
        key: key,
        clientX: x,
        clientY: y,
    });

    return new MouseEvent(type, props);
}

function makeKeyboardEvent(type, key, x, y) {
    const props = makeEventProps({
        key: key,
        clientX: x,
        clientY: y,
    });

    return new KeyboardEvent(type, props);
}

function makeWheelEvent(type, key, x, y) {
    const props = makeEventProps({
        key: key,
        deltaX: x,
        deltaY: y,
    });

    return new WheelEvent(type, props);
}

function makeEventProps(props) {
    return Object.assign({
        'view': window,
        'bubbles': true,
        'cancelable': true
    }, props);
}

const lastLocation = {x:0,y:0}
function updateLocation(x,y) {
    lastLocation.x = x;
    lastLocation.y = y;
}

function dispatchKeyEvent(type, key, x, y) {
    const event = makeKeyboardEvent(type, key, x, y);
    document.elementFromPoint(lastLocation.x,lastLocation.y).dispatchEvent(event);
}

function dispatchWheelEvent(type, key, x, y) {
    const event = makeWheelEvent(type, key, x, y);
    document.elementFromPoint(lastLocation.x,lastLocation.y).dispatchEvent(event);
}

function dispatchMouseEvent(type, key, x, y) {
    if (key === LEFTMOUSE) {
        key = 1;
    } else if (key === MIDDLEMOUSE) {
        key = 2;
    } else if (key === RIGHTMOUSE) {
        key = 3;
    }

    updateLocation(x,y);

    if (key = 1 && (type === "mousedown" || type === "click")) {
        document.elementFromPoint(x,y).click();
    } else {
        const event = makeMouseEvent(type, key, x, y);
        document.elementFromPoint(x,y).dispatchEvent(event);
    }
}

function updateMouse(mouseElement, x, y) {
    return makeMouse(mouseElement.id, x, y);
}

function makeMouse(id, x=0, y=0) {
    let mouse = document.createElement('div');
    mouse.id = id || makeID();
    mouse.innerHTML = 'X';
    
    [
        ['display', 'flex'],
        ['justify-content', 'center'],
        ['align-items', 'center'],
        ['background-color', 'red'],
        ['color', 'white'],
        ['border-radius', '1em'],
        ['height', '1em'],
        ['width', '1em'],
        ['position', 'absolute'],
        ['left', `${x}px`],
        ['top', `${y}px`],
    ].forEach((s)=>{
        mouse.style[s[0]] = s[1];
    });

    return mouse;
}

let MOUSEIDCOUNT = 0;
function makeID() {
    MOUSEIDCOUNT++;
    return `mouse-user-test-${MOUSEIDCOUNT}`;
}


export default Mouse;