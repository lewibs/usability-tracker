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
    return makeEvent(type, {
        key: key,
        clientX: x,
        clientY: y,
    });
}

function makeKeyboardEvent(type, key, x, y) {
    return makeEvent(type, {
        key: key,
        clientX: x,
        clientY: y,
    });
}

function makeWheelEvent(type, key, x, y) {
    return makeEvent(type, {
        key: key,
        deltaX: x,
        deltaY: y,
    });
}

function makeEvent(type, props) {
    props = Object.assign({
        'view': window,
        'bubbles': true,
        'cancelable': true
    }, props);

    return new Event(type, props);
}

const lastLocation = {x:0,y:0}
function updateLocation(x,y) {
    lastLocation.x = x;
    lastLocation.y = y;
}

function dispatchEvent(event) {
    const element = document.elementFromPoint(lastLocation.x, lastLocation.y);
    element.dispatchEvent(event);
}

function dispatchKeyEvent(type, key, x, y) {
    dispatchEvent(makeKeyboardEvent(type, key, x, y));
}

function dispatchWheelEvent(type, key, x, y) {
    dispatchEvent(makeWheelEvent(type, key, x, y));
}

function dispatchMouseEvent(type, key, x, y) {
    if (type === LEFTMOUSE) {
        key = 1;
        updateLocation(x,y);
    } else if (type === MIDDLEMOUSE) {
        key = 2;
    } else if (type === RIGHTMOUSE) {
        key = 3;
    }

    dispatchEvent(makeMouseEvent(type, key, x, y));
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