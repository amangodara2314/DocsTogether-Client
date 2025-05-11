import { io } from "socket.io-client";

const rawBaseUrl = import.meta.env.VITE_BASE_URL;
const baseUrl = rawBaseUrl.replace(/\/api$/, "");
const socket = io(baseUrl, { transports: ["websocket"] });

export default socket;
