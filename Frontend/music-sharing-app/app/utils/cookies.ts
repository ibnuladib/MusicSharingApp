import Cookies from 'js-cookie';

const COOKIE_NAMES = {
    IS_LOGGED_IN: 'isLoggedIn',
    USER_ID: 'userId',
    USER_NAME: 'userName',
    USER_EMAIL: 'userEmail',
    ACCESS_TOKEN: 'access_token',
};

const COOKIE_OPTIONS = {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
};

export const setAuthCookies = (user: {
    id: number;
    fullName: string;
    email: string;
}, accessToken?: string) => {
    Cookies.set(COOKIE_NAMES.IS_LOGGED_IN, 'true', COOKIE_OPTIONS);
    Cookies.set(COOKIE_NAMES.USER_ID, user.id.toString(), COOKIE_OPTIONS);
    Cookies.set(COOKIE_NAMES.USER_NAME, user.fullName, COOKIE_OPTIONS);
    Cookies.set(COOKIE_NAMES.USER_EMAIL, user.email, COOKIE_OPTIONS);

    if (accessToken) {
        Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, COOKIE_OPTIONS);
    }
};


export const getAuthCookie = (key: keyof typeof COOKIE_NAMES): string | undefined => {
    return Cookies.get(COOKIE_NAMES[key]);
};

export const isLoggedIn = (): boolean => {
    return Cookies.get(COOKIE_NAMES.IS_LOGGED_IN) === 'true';
};
export const getUserId = (): string | null => {
    return Cookies.get(COOKIE_NAMES.USER_ID) || null;
};

export const getUserName = (): string | null => {
    return Cookies.get(COOKIE_NAMES.USER_NAME) || null;
};
export const getUserEmail = (): string | null => {
    return Cookies.get(COOKIE_NAMES.USER_EMAIL) || null;
};

export const getAccessToken = (): string | null => {
    return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN) || null;
};
export const clearAuthCookies = () => {
    Cookies.remove(COOKIE_NAMES.IS_LOGGED_IN);
    Cookies.remove(COOKIE_NAMES.USER_ID);
    Cookies.remove(COOKIE_NAMES.USER_NAME);
    Cookies.remove(COOKIE_NAMES.USER_EMAIL);
    Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
};
