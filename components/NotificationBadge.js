// product-management-frontend/components/NotificationBadge.js
import { useState, useEffect } from "react";
import pusher from "../utils/pusherClient";

const NotificationBadge = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        // Subscribe to the "notifications" channel
        const channel = pusher.subscribe("notifications");

        // Listen for "product.notification" events
        channel.bind("product.notification", () => {
            setNotificationCount((prevCount) => prevCount + 1);
        });

        // Unsubscribe when the component unmounts
        return () => {
            pusher.unsubscribe("notifications");
        };
    }, []);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button style={{ fontSize: "16px" }}>Notifications</button>
            {notificationCount > 0 && (
                <span style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    fontSize: "12px",
                }}>
                    {notificationCount}
                </span>
            )}
        </div>
    );
};

export default NotificationBadge;
