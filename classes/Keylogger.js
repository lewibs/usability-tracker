import keylogger from "lewibs-keylogger";
import {blockPush, affixCallbackToArray} from "../functions/array";
import { pxToRatio } from "../functions/window";

export class Keylogger {
    #keylogger = undefined;

    constructor(
        id="undefined-user",
        onUpdate,
        filter=a=>true,
    ) {
        this.#keylogger = new keylogger();

        //blocks passwords
        blockPush(this.#keylogger.history, blockPassword, filter);

        //attaches important fields
        affixCallbackToArray(this.#keylogger.history, function (e) {
            e.userID = id;
            e.type = e.event.type;
            e.event.currentKey = e.event.key;
            return e;
        });

        //saves the ratio of x and y so that it can be used later on any screen size
        affixCallbackToArray(this.#keylogger.history, function (e) {
            //mousemove
            [e.event.ratioX, e.event.ratioY] = pxToRatio(e.event.clientX, e.event.clientY);

            //wheelscroll
            console.log(e)
            e.event.wheelX = e.event.deltaX;
            e.event.wheelY = e.event.deltaY;
            [e.event.wheelRatioX, e.event.wheelRatioY] = pxToRatio(e.event.deltaX, e.event.deltaY);
            e.html = e.event.target.outerHTML;
            return e;
        });

        //attaches stringer
        affixCallbackToArray(this.#keylogger.history, function (e) {
            e.toString = ()=>JSON.stringify(e);
            return e;
        });

        //this should be last to make sure we get all the goods
        if (onUpdate) {
            affixCallbackToArray(this.#keylogger.history, onUpdate);
        }
    }

    get history() {
        return this.#keylogger.history;
    }
}

function blockPassword(arg) {
    if (arg.event.target.tagName === "INPUT") {
        if (arg.event.target.type === "password") {
            return false;
        }
    }

    return true;
}

export default Keylogger;