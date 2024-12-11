import React, { useEffect, useState } from 'react';
function Notif({ message, onClose, type = 'info', duration = 3000, topPosition }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: 'bg-purpleLight text-purpleDark',
    error: 'bg-red-100 text-red-500',
  };

  return (
    <div
      className={`fixed left-0 w-full p-4 z-50 ${typeStyles[type]}`}
      style={{ top: `${topPosition}px` }}  // adjust top position for stacking
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
}

// manages stack of notifs
function NotifContainer({ notifs, setNotifs }) {
  // automatically remove the oldest notification when more than 3 are shown
  useEffect(() => {
    if (notifs.length > 3) {
        setNotifs((prevQueue) => prevQueue.slice(1));  // remove the oldest notif
    }
  }, [notifs, setNotifs]);

  const removeNotif = (index) => {
    setNotifs((prevQueue) => prevQueue.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed left-0 w-full z-50">
      {notifs.map((notif, index) => (
        <Notif
          key={index}
          message={notif.message}
          type={notif.type}
          onClose={() => removeNotif(index)}
          topPosition={index * 60 + 80}  // stack with 60px spacing, start at top: 80px
        />
      ))}
    </div>
  );
}

export { Notif, NotifContainer };
