import {WHEEL, LEFTMOUSE, MIDDLEMOUSE, RIGHTMOUSE} from "lewibs-keylogger";

export class Mouse {
    #element;
    #x;
    #y;

    constructor() {
        this.#element = makeMouse();
    }

    show() {
        document.body.append(this.#element);
    }

    hide() {
        this.#element.remove();
    }

    dispatchMouseEvent(type, key, x=this.#x, y=this.#y) {
        dispatchMouseEvent(type, key, x, y);
    }

    update(x,y) {
        this.#x = x;
        this.#y = y;

        this.hide();
        this.#element = updateMouse(this.#element, x, y);
        this.show();
    }
}

function makeEvent(type, key, x, y) {
    return new MouseEvent(type, {
        'key': key,
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y,
        'clientX': x,
        'clientY': y,
    });
}

function dispatchEvent(type, key, x, y) {
    const ev = makeEvent(type, key, x, y);
    const el = document.elementFromPoint(x, y);
    el.dispatchEvent(ev);
}

export function dispatchWheelEvent(type, key, x, y) {

}

export function dispatchMouseEvent(type, key, x, y) {
    if (type === LEFTMOUSE) {
        key = 
    }

    dispatchEvent(type, key, x, y);
}

function updateMouse(mouse, x, y) {
    return makeMouse(mouse.id, x, y);
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