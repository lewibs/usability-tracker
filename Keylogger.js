import keylogger from "lewibs-keylogger";
import {blockPush, affixCallbackToArray} from "./functions";

export class Keylogger {
    #keylogger = undefined;

    constructor(
        filter=a=>true,
        history=[],
        onUpdate,
    ) {
        this.#keylogger = new keylogger();
        this.#keylogger.history = history;

        blockPush(this.#keylogger.history, filter, blockPassword);

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