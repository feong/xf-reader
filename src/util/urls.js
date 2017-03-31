export const APP_ID = `1000000681`;
export const APP_KEY = `roPDzOrYW3Qj2cdnKHnts00T11JTEIL8`;
export const APP_URL = `http://localhost:3000`;
export const APP_PRI = `read+write`;
export const APP_STR = `xiaofengsrssreader`;

export const INOREADER_HOST = `https://www.inoreader.com`;
export const SERVER_HOST = `http://localhost:3001`;

const URLS = 
{
    LOGIN: `${INOREADER_HOST}/oauth2/auth?client_id=${APP_ID}&redirect_uri=${APP_URL}&response_type=code&scope=${APP_PRI}&state=${APP_STR}`,
    TOKEN: `${SERVER_HOST}/oauth2/token`
};

export default URLS;