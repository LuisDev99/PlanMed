/* All helper functions used throughout the pages */

/**
 * This function reads the local storage from the key, 
 * parses the json and returns an object.
 * 
 * @param {string} key The key to look up in the local storage (which should be 'user')
 * @returns {object}
 */
function GetUserFromLocalStorage(key) {

    const userJson = localStorage.getItem(key);
    const user = JSON.parse(userJson);

    return user;
}

export default GetUserFromLocalStorage;
