import keylogger from "lewibs-keylogger";
import {blockPush, affixCallbackToArray} from "../functions/array";

export class Keylogger {
    #keylogger = undefined;

    constructor(
        onUpdate,
        filter=a=>true,
    ) {
        this.#keylogger = new keylogger();

        blockPush(this.#keylogger.history, blockPassword, filter);

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