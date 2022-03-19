import store from "../store";

export default {
    info(message) {
        if (store.debug) {
            console.log(`INFO - `, message);
        }
    },
    debug(message) {
        if (store.debug) {
            console.log(`DEBUG - `, message);
        }
    },
};
