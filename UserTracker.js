import Keylogger from "./Keylogger";
import Mouse from './Mouse';

export class UserTracker {
    #keylogger;
    #mouse;

    constructor(filters, history, onUpdate) {
        this.#keylogger = new Keylogger(filters, history, onUpdate);
        this.#mouse = new Mouse();

        window.addEventListener('mousemove', (e)=>{
            this.#mouse.update(e.clientX, e.clientY);
        });
    }

    get history() {
        return this.#keylogger.history;
    }

    watchUser() {
        this.history.forEach(his => {
            console.log(his);
        });
    }
}

export default UserTracker;