export class Mouse {
    #element;
    #x;
    #y;

    constructor() {
        this.#element = makeMouse();
    }

    click(x=this.#x, y=this.#y) {
        click(x, y);
    }

    show() {
        document.body.append(this.#element);
    }

    hide() {
        this.#element.remove();
    }

    update(x,y) {
        this.#x = x;
        this.#y = y;

        this.hide();
        this.#element = updateMouse(this.#element, x, y);
        this.show();
    }
}

function click(x, y)
{
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
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

export function pxToRatio(x, y) {
    return [x/window.innerWidth, y/window.innerHeight];
}

export function ratioToPx(x, y) {
    return [x*window.innerWidth, y*window.innerHeight];
}


export default Mouse;