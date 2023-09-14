import React from 'react';
import s from './Button.module.css';

export default function ButtonAction(props) {
  const { type, children } = props;

  return (
    <button className={s.buttonAction} type={type}>
      {children}
    </button>
  );
}
