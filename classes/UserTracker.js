import Keylogger from "./Keylogger";
import {viewHistory} from "../functions/viewHistory";

export class UserTracker {
    #keylogger;

    constructor(onUpdate, filter) {
        this.#keylogger = new Keylogger(onUpdate, filter);

        //delete this
        window.goTime = ()=>{
            viewHistory(this.history);
        }
    }

    get history() {
        return this.#keylogger.history;
    }
}

export default UserTracker;