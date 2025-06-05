// src/utils/localStorageService.js

const localStorageService = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e);
        }
    },
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.log(e);
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    },
    clear() {
        try {
            localStorage.clear();
        } catch (e) {
            console.log(e);
        }
    }
};

export default localStorageService;
