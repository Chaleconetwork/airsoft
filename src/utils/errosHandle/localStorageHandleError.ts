const isBrowser = typeof window !== 'undefined';

const getToken = () => {
    if (isBrowser) {
        return localStorage.getItem('authToken');
    }
    return null;
};

const setToken = (token: string) => {
    if (isBrowser) {
        localStorage.setItem('authToken', token);
    }
};

const removeToken = () => {
    if (isBrowser) {
        localStorage.removeItem('authToken');
    }
};
