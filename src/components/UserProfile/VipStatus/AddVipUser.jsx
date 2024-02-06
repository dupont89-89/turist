import { Field, Form, Formik } from 'formik'
import React from 'react'
import { updateUserData } from '../../../api_request/api'
import s from './Vip.module.css'

export default function AddVipUser(props) {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          vip: props.vip,
        }}
        onSubmit={async (values) => {
          try {
            const response = await updateUserData(props.userId, {
              vip: values.vip,
            })
            console.log('Успешный ответ:', response.data)
          } catch (error) {
            console.error('Ошибка:', error)
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <span>Включить VIP</span>
              <label className={s.toggleSwitch}>
                <Field type='checkbox' name='vip' className={s.formCheckToogle} />
                <span className={s.slider}></span>
              </label>
            </div>
            <button type='submit'>Оплатить</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
