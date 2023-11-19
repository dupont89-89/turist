import React, { useEffect, useState } from 'react';
import s from './TouristProfile.module.css';
import LogoutButton from '../Buttons/ButtonLogout';
import LoadAvatarContainer from '../Formik/LoadAvatarContainer';
import { Field, Form, Formik } from 'formik';
import { getUser, updateUserData } from '../../api_request/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from "date-fns/locale/ru";
import { utcToZonedTime } from 'date-fns-tz';
import Popup from 'reactjs-popup';
import NotificationPopup from '../Popup/NotificationPopup';
import FormikField from '../Formik/FormikField';
import { setAuthSuccess } from '../../redux/user-reducer/user-reducer';

registerLocale("ru", ru);

export default function TouristProfile(props) {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const maxDate = new Date();
  const minDate = new Date(new Date().getFullYear() - 90, 0, 1);
  const timeZone = 'Europe/Moscow';

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          age: props.age ? new Date(props.age) : new Date(),
          firstName: props.firstName || '',
          lastName: props.lastName || '',
          sity: props.sity || '',
          tel: props.tel || '',
        }}
        onSubmit={async (values) => {
          try {
            const response = await updateUserData(props.userId, {
              age: values.age.toISOString(),
              firstName: values.firstName,
              lastName: values.lastName,
              sity: values.sity,
              tel: values.tel,
            });
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
              selected={values.age}
              onChange={(date) => {
                const zonedDate = utcToZonedTime(date, timeZone);
                setFieldValue('age', zonedDate);
              }}
            />
            <FormikField name="firstName" label="Ваше имя" />
            <FormikField name="lastName" label="Ваша фамилия" />
            <FormikField name="sity" label="Город проживания" />
            <FormikField name="tel" label="Телефон (не публикуется, нужен для статуса проверенного пользователя)" />
            <button type="submit">Обновить данные</button>
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
