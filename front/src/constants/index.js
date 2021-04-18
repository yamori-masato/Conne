export const API_WS_ROOT = process.env.NODE_ENV === 'production'
    ? `wss://link-game.herokuapp.com/cable`
    : 'ws://localhost:3001/cable'
export const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};