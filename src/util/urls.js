const APP_ID = `1000000681`;
const APP_KEY = `roPDzOrYW3Qj2cdnKHnts00T11JTEIL8`;
const APP_URL= `http://localhost:3000`;
const APP_PRI= `read+write`;
const APP_STR= `xiaofengsrssreader`;

const INOREADER_HOST = `https://www.inoreader.com`;

const URLS = 
{
    LOGIN: `${INOREADER_HOST}/oauth2/auth?client_id=${APP_ID}&redirect_uri=${APP_URL}&response_type=code&scope=${APP_PRI}&state=${APP_STR}`
};

export default URLS;