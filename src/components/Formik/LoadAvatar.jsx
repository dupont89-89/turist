import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import React from 'react'
import FileDragAndDropField from './Index';
import { addUserAvatar } from '../../api_request/api';

export default function LoadAvatar(props) {

  const handleSubmit = async (values) => {
    const avatar = new FormData();
    avatar.append("avatar", values.avatar);
    const userId = props.userId

    try {
      await addUserAvatar(avatar, userId);
      props.getUser(userId);
      console.log("Ссылка на аватар: ", avatar);

    } catch (error) {
      console.error("Ошибка загрузки аватара: ", error.avatar);
    }
  };

  return (
    <Formik
      initialValues={{ avatar: null }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Field
            id="avatar"
            name="avatar"
            component={FileDragAndDropField}
            accept="image/*"
            placeholder="Загрузите аватар"
            margin="normal"
          />
          <button type="submit">Загрузить</button>
        </Form>
      )}
    </Formik>
  )
}
