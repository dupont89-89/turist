import React, { useEffect, useState } from 'react';
import s from './TouristProfile.module.css';
import LogoutButton from '../Buttons/ButtonLogout';
import LoadAvatarContainer from '../Formik/LoadAvatarContainer';
import { Form, Formik } from 'formik';
import { updateUserData } from '../../api_request/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from "date-fns/locale/ru"; // the locale you want
import { utcToZonedTime } from 'date-fns-tz';
import Popup from 'reactjs-popup';
import NotificationPopup from '../Popup/NotificationPopup';

registerLocale("ru", ru); // register it with the name you want
const timeZone = 'Europe/Moscow'; // Замените на нужный часовой пояс

export default function TourustProfile(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const maxDate = new Date();
  const minDate = new Date(new Date().getFullYear() - 90, 0, 1);

  return (
    <div>
      <Formik
        initialValues={{ age: selectedDate }}
        onSubmit={async (values) => {
          try {
            const response = await updateUserData(props.userId, { age: values.age.toISOString() });
            console.log('Успешный ответ:', response.data);
            setNotificationMessage('Данные обновлены');
            setShowNotification(true);
          } catch (error) {
            console.error('Ошибка:', error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <label htmlFor="age">Дата рождения</label>
            <DatePicker
              showYearDropdown
              dateFormat="dd-MM-yyyy"
              yearDropdownItemNumber={90}
              scrollableYearDropdown
              maxDate={maxDate}
              minDate={minDate}
              locale={ru}
              selected={selectedDate}
              onChange={(date) => {
                const zonedDate = utcToZonedTime(date, timeZone);
                setSelectedDate(zonedDate);
                setFieldValue('age', zonedDate);
              }}
            />
            <button type="submit">Отправить</button>
          </Form>
        )}
      </Formik>
      <div>
        <LogoutButton />
      </div>
      <div>
        <LoadAvatarContainer />
      </div>
      <Popup
        open={showNotification}
        closeOnDocumentClick
        onClose={() => setShowNotification(false)}
      >
        <NotificationPopup message={notificationMessage} close={() => setShowNotification(false)} />
      </Popup>

    </div>
  );
}
