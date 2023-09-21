import { io } from 'socket.io-client';
// export const BASE_URL_SOCKET = 'ws://localhost:5001'
export const BASE_URL_SOCKET = 'wss://mc-api-dev.proactunited.com';
// export const BASE_URL_SOCKET = 'wss://mc-api-qa.proactunited.com'
// export const BASE_URL_SOCKET = 'wss://mc-api-uat.proactunited.com'

let socket: any;

async function connectToSocket() {
  socket = io(BASE_URL_SOCKET, {
    transports: ['websocket'],
    withCredentials: true,
    reconnectionDelayMax: 1000,
  });

  socket.on('connect', () => {});
}

export { connectToSocket, socket };
