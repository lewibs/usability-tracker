import keylogger from "lewibs-keylogger";
import {blockPush, affixCallbackToArray} from "../functions/array";
import { pxToRatio } from "./Mouse";

export class Keylogger {
    #keylogger = undefined;

    constructor(
        onUpdate,
        filter=a=>true,
    ) {
        this.#keylogger = new keylogger();

        //blibks passwords
        blockPush(this.#keylogger.history, blockPassword, filter);

        //saves the ratio of x and y so that it can be used later on any screen size
        affixCallbackToArray(this.#keylogger.history, function (e) {
            [e.event.ratioX, e.event.ratioY] = pxToRatio(e.event.clientX, e.event.clientY);
            return e;
        });

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