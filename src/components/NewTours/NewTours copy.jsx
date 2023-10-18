import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import s from '../NewTours/NewTours.module.css';
import { newSetDataTours } from '../../api_request/api';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ruLocale from 'date-fns/locale/ru'; // Импортируйте локализацию напрямую из date-fns
import { useUser } from "@clerk/clerk-react";
import { Formik, Field, Form } from 'formik';
import { startOfDay, endOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import FileDragAndDropField from '../Formik/Index';

registerLocale('ru', ruLocale); // Используйте 'ru' вместо 'ru_RU'
setDefaultLocale('ru');

export default function NewTours(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { isLoaded, isSignedIn, user } = useUser();
    const [selectedImages, setSelectedImages] = useState([]);
    const timeZone = 'Europe/Moscow'; // Замените на нужный часовой пояс

    useEffect(() => {
        const today = new Date();
        setStartDate(today);
        setEndDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)); // Добавляем 3 дня к сегодняшней дате
    }, []);

    const calculateEndDate = (startDate) => {
        const zonedStartDate = utcToZonedTime(startDate, timeZone);
        const calculatedEndDate = new Date(zonedStartDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Добавляем 3 дня к начальной дате
        return calculatedEndDate;
    };

    if (!isLoaded || !isSignedIn) {
        return null;
    }


    return (
        <div className={s.blockNewTours}>
            <div className={s.titleNewTours}>
                <h1>Добавить новый тур</h1>
            </div>
            <Formik
                initialValues={{
                    selectedOptionData: "ExactDate", // Добавляем поле для хранения выбранной опции
                    name: user.firstName || "",
                    surname: user.lastName || "",
                    age: user.publicMetadata.age || "",
                    id: user.id || "",
                    avatar: 'https://uprostim.com/wp-content/uploads/2021/03/image107-34-scaled.jpg',
                    level: 'Средний',
                    city: 'Москва',
                    isMale: false,
                    isSeekingCouple: false,
                    isSeekingFemale: false,
                    isGroup: false,
                    text: '',
                    images: [],
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
                    start_date: "", // Add field for start date
                    end_date: "",   // Add field for end date
                }}



                onSubmit={async (values) => {
                    console.log(values)
                    newSetDataTours(values) // Отправляем данные в правильном формате
                        .then((response) => {
                            // Обработайте успешный ответ здесь
                            console.log('Успешный ответ:', response.data);
                        })
                        .catch((error) => {
                            // Обработайте ошибку здесь
                            console.error('Ошибка:', error);
                        });
                }}
            >
                {({ values, setFieldValue, props }) => (
                    <Form>
                        <div className={s.sectionDateTours}>
                            <h2>Период путешествия</h2>
                            <div className={s.gridDataTours}>
                                <div>
                                    <div className={s.inputData}>
                                        <div className={s.dataStart}>
                                            <label htmlFor="data-start">Начало</label>
                                            <DatePicker
                                                onChange={(date) => {
                                                    const zonedDate = utcToZonedTime(date, timeZone);
                                                    setStartDate(zonedDate);
                                                    setFieldValue("start_date", zonedDate);
                                                }}
                                                selected={startDate}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                dateFormat="dd-MM-yyyy"
                                                id="data-start"
                                            />
                                        </div>
                                        <div className={s.dataEnd}>
                                            <label htmlFor="data-end">Закончим</label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => {
                                                    const zonedDate = utcToZonedTime(date, timeZone);
                                                    setEndDate(zonedDate);
                                                    setFieldValue("end_date", zonedDate);
                                                }}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                dateFormat="dd-MM-yyyy"
                                                id="data-end"
                                            />
                                        </div>
                                    </div>
                                    <p>Есть уникальная возможность сделать это, выбрать норм дату.
                                        Обратите внимание что вы можете сделать пометку для подачи заявки на поиск компании для путешествия</p>
                                </div>

                                <div className={s.radioGroup}>
                                    <fieldset>
                                        <legend>Подробности даты путешествия</legend>
                                        <div role="group" aria-labelledby="radio-group">
                                            <div className={s.radioItem}>
                                                <Field id="radio1" className={s.formCheckInput} type="radio" name="selectedOptionData" value="ExactDate" />
                                                <label htmlFor="radio1">
                                                    Точная дата
                                                </label>
                                            </div>
                                            <div className={s.radioItem}>
                                                <Field id="radio2" className={s.formCheckInput} type="radio" name="selectedOptionData" value="ThreeDays" />
                                                <label htmlFor="radio2">
                                                    Разбег +- 3 дня возможен
                                                </label>
                                            </div>
                                            <div className={s.radioItem}>
                                                <Field id="radio3" className={s.formCheckInput} type="radio" name="selectedOptionData" value="Contract" />
                                                <label htmlFor="radio3">
                                                    Даты обсуждаемы
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className={s.sectionFormDescription}>
                            <div className={s.textFormDescription}>
                                <label htmlFor="description">Описание путешествия</label>
                                <Field id='description' as="textarea" cols="25" rows="5" placeholder="Как прекрасен этом мир..." name="text" />
                            </div>
                            <div className={s.imgFormDescription}>
                                <label htmlFor="foto">Прикрепите фото мест</label>
                                {/* <Field
                                    id="foto"
                                    value={undefined}
                                    className={s.fileFotoInput}
                                    type="file"
                                    name="images"
                                    accept='image/*'
                                    onChange={(event) => {
                                        setFieldValue("images", event.target.files[0]);
                                    }}
                                    multiple
                                /> */}
                                <Field
                                    name="images"
                                    component={FileDragAndDropField}
                                    accept="image/*"
                                    placeholder="Suelta la imagen ó da click para seleccionar una"
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="sectionForm">
                            
                        </div>
                        <button type="submit">Добавить тур</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
