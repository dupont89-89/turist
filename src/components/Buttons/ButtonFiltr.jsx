import React from 'react';
import s from './Button.module.css';

export default function ButtonFiltr(props) {
  const { type, children,  onClick } = props;

  return (
    <button className={s.buttonFiltr}  onClick={onClick} type={type}>
      {children}
    </button>
  );
}