// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { registerUser } from './../../api_request/api';

// const RegistrationForm = () => {
//   const initialValues = {
//     username: '',
//     password: '',
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string()
//       .min(3, 'Имя пользователя должно содержать как минимум 3 символа')
//       .required('Обязательное поле'),
//     password: Yup.string()
//       .min(6, 'Пароль должен содержать как минимум 6 символов')
//       .required('Обязательное поле'),
//   });

//   const [registrationError, setRegistrationError] = useState(null);
//   const [registrationSuccess, setRegistrationSuccess] = useState(null); // Создаем состояние для успешной регистрации

//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     try {
//       const registrationResult = await registerUser(values);
//       console.log('Пользователь успешно зарегистрирован', registrationResult);
//       // Устанавливаем сообщение об успешной регистрации
//       setRegistrationSuccess('Регистрация прошла успешно');
//     } catch (error) {
//       console.error('Ошибка регистрации пользователя', error);
//       if (error.response && error.response.data.message) {
//         setRegistrationError(error.response.data.message);
//       } else {
//         setRegistrationError('Произошла ошибка при регистрации');
//       }
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {() => (
//         <Form>
//           <div>
//             <label htmlFor="username">Имя пользователя</label>
//             <Field type="text" id="username" name="username" />
//             <ErrorMessage name="username" component="div" className="error" />
//           </div>

//           <div>
//             <label htmlFor="password">Пароль</label>
//             <Field type="password" id="password" name="password" />
//             <ErrorMessage name="password" component="div" className="error" />
//           </div>

//           {registrationError && (
//             <div className="error">{registrationError}</div>
//           )}

//           {registrationSuccess && (
//             <div className="success">{registrationSuccess}</div>
//           )}

//           <button type="submit">Зарегистрироваться</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RegistrationForm;