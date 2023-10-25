import React, { useState } from 'react'; // Импортируйте useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from './../../api_request/api';
import { useDispatch } from 'react-redux';
import { setAuthSuccess, setDataDataUser } from '../../redux/user-reducer/user-reducer'; // Импортируйте действие
import TourustProfile from '../UserProfile/TourustProfile';

const Login = (props) => {
    debugger;

  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const [loginSuccess, setLoginSuccess] = useState(false); // Добавьте состояние для отслеживания успешного входа

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const loginResult = await loginUser(values);
      console.log('Вход выполнен успешно', loginResult);
      dispatch(setAuthSuccess());
      const user = loginResult.user;
  
      // Сохраните токен в локальное хранилище
      localStorage.setItem('token', loginResult.token);
  
      // Диспетчеризируйте действие, чтобы установить данные пользователя в Redux
      dispatch(setDataDataUser(user));
      setLoginSuccess(true); // Установите состояние успешного входа в true
    } catch (error) {
      console.error('Ошибка входа', error);
      setFieldError('username', 'Ошибка входа');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <div className="success-message">Вход выполнен успешно! Заполните данные: <TourustProfile /> </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <label htmlFor="username">Имя пользователя</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="password">Пароль</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit">Войти</button>
            </Form>
          )}
        </Formik>
      )}

    </div>
  );
};

export default Login;