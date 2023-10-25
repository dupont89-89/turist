import React, { useEffect } from 'react';
import s from './TouristProfile.module.css';
import { newSetDataUser } from '../../api_request/api';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux'; // Импортируйте useSelector из react-redux
import LogoutButton from '../Buttons/ButtonLogout';

export default function TourustProfile(props) {
  
  const user = useSelector(state => state.user.dataUser);

  const handleSubmit = async (values) => {
    try {
      if (!user) {
        console.error('Пользователь не авторизован');
        return;
      }

      const userData = { _id: user.userId, name: values.name }; // Включите идентификатор пользователя

      const response = await newSetDataUser(userData);
      console.log('Успешное обновление данных:', response.data);
    } catch (error) {
      console.error('Ошибка обновления данных:', error);
    }
  }

  useEffect(() => {
    // Этот блок кода будет выполнен каждый раз, когда пропс isAuthenticated изменится
    // Вы можете вставить здесь логику, которая должна выполняться при изменении isAuthenticated
  }, [props.isAuthenticated]);

  return (
    <div className={s.blockNewTours}>
      <div className={s.titleNewTours}>
        <h1>Данные пользователя</h1>
      </div>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, props }) => (
          <Form>
            <div className={s.ageInput}>
              <label htmlFor="name">Ваше имя</label>
              <Field id="name" name="name" type="text" />
            </div>
            <div className={s.btnToursForm}>
              <button type="submit">Добавить данные</button>
            </div>
          </Form>
        )}
      </Formik>
      {props.isAuthenticated ? <LogoutButton /> : null}
    </div>
  );
}


// export default function TourustProfile() {
//   const { user } = useUser();
//   if (!user) return null;
//   const updateUser = async () => {
//     await user.update({
//       firstName: "John",
//       lastName: "Doe",
//     });
//   };
//   return (
//     <>
//       <button onClick={updateUser}>Click me to update your name</button>
//       <p>user.firstName: {user?.firstName}</p>
//       <p>user.lastName: {user?.lastName}</p>
//     </>
//   );
// }