export function pxToRatio(x, y) {
    return [x/window.innerWidth, y/window.innerHeight];
}

export function ratioToPx(x, y) {
    return [x*window.innerWidth, y*window.innerHeight];
}