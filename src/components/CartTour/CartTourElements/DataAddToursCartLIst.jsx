import React from 'react'
import s from '../CartTourCatalog.module.css'
import { format } from 'date-fns';

export default function DataAddToursCartLIst(props) {
    const date = new Date(props.date);
  
  // Форматирование даты в желаемый формат
  const formattedDate = format(date, 'dd.MM.yyyy');
  return (
    <div className={s.addDataTours}>
      <span>Дата добавления: {formattedDate}</span>
    </div>
  )
}
