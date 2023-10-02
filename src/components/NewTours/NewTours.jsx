import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import s from '../NewTours/NewTours.module.css';
import { newSetDataTours } from '../../api_request/api';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ruLocale from 'date-fns/locale/ru'; // Импортируйте локализацию напрямую из date-fns
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

registerLocale('ru', ruLocale); // Используйте 'ru' вместо 'ru_RU'
setDefaultLocale('ru');

export default function NewTours(props) {


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { isLoaded, isSignedIn, user } = useUser();


    // Функция для расчета даты через JavaScript
    const calculateEndDate = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 3); // Добавляем 3 дня к начальной дате
        return endDate;
    };

    // Устанавливаем начальные значения при загрузке компонента
    useEffect(() => {
        setStartDate(new Date());
        setEndDate(calculateEndDate(new Date()));
      
        if (user) {
          setToursData({
            ...toursData,
            name: user.firstName || '',
            surname: user.lastName || '',
            age: user.publicMetadata.age || '',
            id: user.id || '',
          });
        }
      }, [user]);

    const [toursData, setToursData] = useState({
        id: 1,
        name: '',
        surname: '',
        age: '',
        avatar: 'https://uprostim.com/wp-content/uploads/2021/03/image107-34-scaled.jpg',
        level: 'Средний',
        city: 'Москва',
        isMale: false,
        isSeekingCouple: false,
        isSeekingFemale: false,
        isGroup: false,
        text: 'Привет',
        images: 'https://sportishka.com/uploads/posts/2022-03/1646730608_22-sportishka-com-p-puteshestvie-s-odnim-ryukzakom-turizm-kras-25.jpg',
        goal: 'Хочу на React',
        day: 20,
        month: 7,
        year: 2023,
        train: true,
        air: true,
        car: true,
        bicycle: true,
        places: ['Россия'],
        Ihave: false,
        total: 2,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setToursData({ ...toursData, [name]: value });
    };

    const handleOnSubmit = () => {
        newSetDataTours(toursData) // Отправляем данные в правильном формате
            .then((response) => {
                // Обработайте успешный ответ здесь
                console.log('Успешный ответ:', response.data);
            })
            .catch((error) => {
                // Обработайте ошибку здесь
                console.error('Ошибка:', error);
            });
    };

    if (!isLoaded || !isSignedIn) {
        return null;
      }

    return (
        <div className={s.blockNewTours}>
            <div className={s.titleNewTours}>
                <h1>Добавить новый тур</h1>
            </div>
            <form>
                <div className={s.dateToursInputGrid}>
                    <label>Даты начала</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                    />
                    <label>Даты завершения</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy"
                    />
                    <label>Точная дата</label>
                    <input type="checkbox" />
                    <label>Разбег +- 3 дня возможен</label>
                    <input type="checkbox" />
                    <label>Даты обсуждаемы</label>
                    <input type="checkbox" />

                </div>
                <button type="button" onClick={handleOnSubmit}>
                    Отправить
                </button>
            </form>
        </div>
    );
}
