function readLocalStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
