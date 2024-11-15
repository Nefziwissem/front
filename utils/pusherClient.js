// product-management-frontend/utils/pusherClient.js
import Pusher from "pusher-js";

const pusher = new Pusher("my-app-key", {
    wsHost: "localhost",
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    cluster: "mt1"  // Required, but not validated by Soketi
});

export default pusher;
