export const APP_ID = `1000000681`;
export const APP_KEY = `roPDzOrYW3Qj2cdnKHnts00T11JTEIL8`;
export const APP_URL = `http://localhost:3000`;
export const APP_PRI = `read+write`;
export const APP_STR = `xiaofengsrssreader`;

export const INOREADER_HOST = `https://www.inoreader.com`;

export const SERVER_INOREADER_HOST = `http://localhost:3001`;
export const SERVER_INOREADER_API = `${SERVER_INOREADER_HOST}/reader/api/0`;

export const STAR_TAG = `user/-/state/com.google/starred`;
export const READ_TAG = `user/-/state/com.google/read`;
export const LATER_TAG = `user/-/state/com.google/like`;

export const READ_LIST_ID = `/state/com.google/reading-list`;
export const STAR_ID = `/state/com.google/starred`;

const URLS = 
{
    LOGIN: `${INOREADER_HOST}/oauth2/auth?client_id=${APP_ID}&redirect_uri=${APP_URL}&response_type=code&scope=${APP_PRI}&state=${APP_STR}`,
    TOKEN: `${SERVER_INOREADER_HOST}/oauth2/token`,
    USERINFO: `${SERVER_INOREADER_API}/user-info`,
    UNREADERCOUNTERS: `${SERVER_INOREADER_API}/unread-count`,
    SUBSCRIPTIONS: `${SERVER_INOREADER_API}/subscription/list`,
    ARTICLES: `${SERVER_INOREADER_API}/stream/contents`,
    ADD_STAR: `${SERVER_INOREADER_API}/edit-tag?a=${STAR_TAG}`,
    REMOVE_STAR: `${SERVER_INOREADER_API}/edit-tag?r=${STAR_TAG}`
};

export default URLS;