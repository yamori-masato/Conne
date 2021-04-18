export const API_ROOT = `http://localhost:${process.env.PORT || 3001}`;
export const API_WS_ROOT = `wss://localhost:${process.env.PORT || 3001}/cable`;
export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};