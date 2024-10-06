import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, LOCAL_URL, REMOTE_URL, FRONTEND_URL_LOCAL, FRONTEND_LOGIN_URL, REMOTE_LOGIN_URL, FRONTEND_URL_REMOTE } = process.env;

const BASE_URL = NODE_ENV === 'development' ? LOCAL_URL : REMOTE_URL;
const FRONTEND_URL = NODE_ENV === 'development' ? FRONTEND_URL_LOCAL : FRONTEND_URL_REMOTE;
const FRONTEND_LOGIN = NODE_ENV === 'development' ? FRONTEND_LOGIN_URL : REMOTE_LOGIN_URL;


export { BASE_URL, FRONTEND_URL, FRONTEND_LOGIN };

