import Keylogger from "./Keylogger";
import {viewHistory} from "../functions/viewHistory";
import { v4 as uuidv4 } from 'uuid';

const LOCALTAG = "lewibs-UserTracker-usrID";

export class UserTracker {
    #keylogger;
    #id;

    constructor(onUpdate, filter, storageTag=LOCALTAG) {
        //sets and gets id
        //makes sure that the users session is maintained in the case that the window changes
        //or its sent to the backend
        this.#id = localStorage.getItem(storageTag) || (()=>{
            localStorage.setItem(storageTag, uuidv4());
            return uuidv4();
        })();

        this.#keylogger = new Keylogger(this.#id, onUpdate, filter);
    }

    get history() {
        return this.#keylogger.history;
    }

    replay(history=this.history) {
        viewHistory(history);
    }

    toString() {
        return JSON.stringify(this.#keylogger.history)
    }
}

export default UserTracker;