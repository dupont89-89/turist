import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from './../../api_request/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthSuccess, setDataDataUser, logout } from '../../redux/user-reducer/user-reducer';
import TourustProfile from '../UserProfile/TourustProfile';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Импортируйте js-cookie

const Login = (props) => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const isAuthenticated = props.isAuthenticated

  if (isAuthenticated) {
    // Если пользователь уже авторизован, перенаправьте его на другую страницу
    navigate('/'); // Замените '/home' на путь к вашей домашней странице
  }

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const loginResult = await loginUser(values);
      console.log('Вход выполнен успешно', loginResult);
      dispatch(setAuthSuccess());
      if (loginResult.token) {
        const token = loginResult.token;
        localStorage.setItem('token', token);
        console.log('Токен сохранен в локальном хранилище', token);
        console.log('Это отправили токен в локал',token);
        // Диспетчеризируйте действие, чтобы установить данные пользователя в Redux
        dispatch(setDataDataUser(loginResult.user));
      } else {
        console.error('Ошибка входа: неверный формат ответа', loginResult);
        setFieldError('username', 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка входа', error);
      setFieldError('username', 'Ошибка входа');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Получите токен из локального хранилища
    console.log('Токен из localStorage useEffect:', token);
    if (token) {
      // Вы можете отправить запрос на сервер, чтобы получить данные пользователя, используя токен
      // Здесь также можно диспетчеризировать действие для установки данных пользователя в Redux
      // Например, dispatch(setDataDataUser(userData));
      
    }
  }, [dispatch]);

  return (
    <div>
      <div className="success-message">Вход выполнен успешно! Заполните данные: <TourustProfile isAuthenticated={props.isAuthenticated} /> </div>
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
    </div>
  );
};

export default Login;