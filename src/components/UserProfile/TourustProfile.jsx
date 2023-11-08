import React, { useEffect, useState } from 'react';
import s from './TouristProfile.module.css';
import LogoutButton from '../Buttons/ButtonLogout';
import LoadAvatarContainer from '../Formik/LoadAvatarContainer';
import { Form, Formik } from 'formik';
import { updateUserData } from '../../api_request/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function TourustProfile(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (date) => {
    updateUserData(props.userId, { age: date });
  };

  useEffect(() => {
    handleSubmit(selectedDate);
  }, [props.userId, selectedDate]);

  return (
    <div>
      <Formik
        initialValues={{ age: selectedDate }}
        onSubmit={(values) => {
          // Ничего не делайте здесь, обработка происходит в useEffect
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="age">Дата рождения</label>
            <DatePicker
              showIcon
              selected={selectedDate}
              onChange={(date) => {
                console.log("Выбранная дата:", date);
                setSelectedDate(date);
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
    </div>
  );
}
