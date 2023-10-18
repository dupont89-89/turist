import React from 'react';
import s from './Popup.module.css'

const NotificationPopup = ({ message, close }) => {
    return (
        <div className={s.notificationPopup}>
            <p>{message}</p>
            <button onClick={close}>Закрыть</button>
        </div>
    );
};

export default NotificationPopup;