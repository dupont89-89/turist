import React from 'react';
import s from '../CartTourCatalog.module.css';

export default function DataBlockCartList(props) {
  // Преобразовываем исходные строки с датами в объекты Date
  const startDate = new Date(props.start_date);
  const endDate = new Date(props.end_date);

  // Определяем локаль для отображения месяцев
  const locale = "ru-RU";

  // Форматируем даты
  const options = { day: "numeric", month: "long" };
  const formattedStartDate = startDate.toLocaleDateString(locale, options);
  const formattedEndDate = endDate.toLocaleDateString(locale, options);

  // Получаем год только у end_date
  const endYear = endDate.getFullYear();

  // Формируем строку даты
  const dateRangeString = `C ${formattedStartDate} по ${formattedEndDate} ${endYear}`;

  return (
    <div className={s.blockDataTours}>
      <time className={s.dataTours}><span></span>{dateRangeString}</time>
    </div>
  );
}
