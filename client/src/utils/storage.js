export const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data);
    const encodedData = btoa(dataAsString);
    localStorage.setItem(key, encodedData);
}

export const getStorage = (key) => {
    const value = localStorage.getItem(key);
    const decodedData = atob(value);
    return JSON.parse(decodedData);
}

export const clearStorage = (key) => {
    localStorage.removeItem(key);
}

export const storageHasData = () => localStorage.length > 0;