export function isAuthentiacated() {
    const token = localStorage.getItem('authToken');
    return token !== null;
}

export function getUserType() {
    const userType = localStorage.getItem('userType');
    return userType || 'guest'; // Default to 'guest' if no userType is found
}