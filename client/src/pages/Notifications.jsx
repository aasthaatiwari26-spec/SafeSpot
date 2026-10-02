import React, { useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Safety Alert",
      title: "Safety alert near your area",
      message:
        "A community safety report was recently submitted in your area. Stay aware and choose a well-lit route.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "Safe Journey",
      title: "Safe Journey reminder",
      message:
        "Your planned journey is scheduled for today. Make sure your trusted contact is available.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "Community",
      title: "New community report",
      message:
        "A new incident report has been added to the community reports section.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "Safety Circle",
      title: "Trusted contact updated",
      message:
        "Your Safety Circle information has been updated successfully.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="notifications-page">

      {/* HERO */}
      <section className="notifications-hero">
        <div className="notifications-hero-content">
          <p className="notifications-tag">NOTIFICATIONS</p>

          <h1>
            Stay <span>Informed & Safe</span>
          </h1>

          <p>
            Keep track of important safety alerts, journey updates,
            and activity from your SafeSpot account.
          </p>
        </div>
      </section>


      {/* MAIN */}
      <section className="notifications-section">

        <div className="notifications-container">

          {/* HEADER */}
          <div className="notifications-header">

            <div>
              <p className="section-tag">YOUR ALERTS</p>

              <h2>Recent Notifications</h2>

              <p>
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${
                      unreadCount > 1 ? "s" : ""
                    }.`
                  : "You're all caught up."}
              </p>
            </div>

            {notifications.length > 0 && unreadCount > 0 && (
              <button
                className="mark-all-btn"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </button>
            )}

          </div>


          {/* NOTIFICATIONS */}
          {notifications.length > 0 ? (
            <div className="notifications-list">

              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${
                    !notification.read ? "unread" : ""
                  }`}
                >

                  <div className="notification-icon">
                    {notification.type === "Safety Alert" && "!"}
                    {notification.type === "Safe Journey" && "→"}
                    {notification.type === "Community" && "C"}
                    {notification.type === "Safety Circle" && "S"}
                  </div>


                  <div className="notification-content">

                    <div className="notification-top">

                      <div>
                        <span className="notification-type">
                          {notification.type}
                        </span>

                        <h3>{notification.title}</h3>
                      </div>

                      {!notification.read && (
                        <span className="unread-dot"></span>
                      )}

                    </div>


                    <p>{notification.message}</p>


                    <div className="notification-bottom">

                      <span className="notification-time">
                        {notification.time}
                      </span>

                      <div className="notification-actions">

                        {!notification.read && (
                          <button
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                          >
                            Mark as Read
                          </button>
                        )}

                        <button
                          className="clear-btn"
                          onClick={() =>
                            removeNotification(notification.id)
                          }
                        >
                          Clear
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="notifications-empty">

              <div className="empty-icon">✓</div>

              <h2>No Notifications</h2>

              <p>
                You're all caught up. New safety alerts and updates
                will appear here.
              </p>

            </div>
          )}

        </div>

      </section>


      {/* INFO NOTE */}
      <section className="notifications-note-section">

        <div className="notifications-note">

          <h2>About SafeSpot Notifications</h2>

          <p>
            Notifications help you stay updated about safety-related
            activity, journey reminders, community reports, and
            important account updates.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Notifications;