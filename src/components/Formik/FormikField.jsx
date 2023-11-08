import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormikField = ({ name, label, ...restProps }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...restProps} />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormikField