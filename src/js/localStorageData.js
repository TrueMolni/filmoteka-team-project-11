export function loadDataFromLS (localStorageKey) {
    try {
        let string = localStorage.getItem(localStorageKey);
        if (!string) {
        string = '[]';
        }
        const data = JSON.parse(string);
        if (Array.isArray(data)) {
        return data;
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
};

export function setDataToLS (localStorageKey, object) {
    try {
        if (Array.isArray(object)) {
        const string = JSON.stringify(object);
        localStorage.setItem(localStorageKey, string);
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Set LocalStorage error: ', err);
    }
};