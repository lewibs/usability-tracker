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

    update(x,y) {
        this.hide();
        this.#element = updateMouse(this.#element, x, y);
        this.show();
    }
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