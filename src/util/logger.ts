import store from "../store";

export default {
    info(message: string) {
        if (store.debug) {
            console.log(`INFO - `, message);
        }
    },
    debug(message: string) {
        if (store.debug) {
            console.debug(`DEBUG - `, message);
        }
    },
};
