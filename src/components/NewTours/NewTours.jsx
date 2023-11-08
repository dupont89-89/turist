import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import s from '../NewTours/NewTours.module.css';
import { newSetDataTours } from '../../api_request/api';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ruLocale from 'date-fns/locale/ru'; // Импортируйте локализацию напрямую из date-fns
import { Formik, Field, Form } from 'formik';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { utcToZonedTime } from 'date-fns-tz';
import FileDragAndDropField from '../Formik/Index';
import NotificationPopup from '../Popup/NotificationPopup';
import iconTrain from '../../assets/images/cartTours/IconTransport/icon-train-821405.png'
import iconAir from '../../assets/images/cartTours/IconTransport/icon-aeroplane-223465.png'
import iconCar from '../../assets/images/cartTours/IconTransport/icon-suv-4391528.png'
import iconBike from '../../assets/images/cartTours/IconTransport/icon-mountain-bike-1947489.png'
import iconFoot from '../../assets/images/cartTours/IconTransport/icon-hiking-5987640.png'



registerLocale('ru', ruLocale); // Используйте 'ru' вместо 'ru_RU'
setDefaultLocale('ru');

export default function NewTours(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const timeZone = 'Europe/Moscow'; // Замените на нужный часовой пояс

    useEffect(() => {
        const today = new Date();
        setStartDate(today);
        setEndDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)); // Добавляем 3 дня к сегодняшней дате
    }, []);

    // const calculateEndDate = (startDate) => {
    //     const zonedStartDate = utcToZonedTime(startDate, timeZone);
    //     const calculatedEndDate = new Date(zonedStartDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Добавляем 3 дня к начальной дате
    //     return calculatedEndDate;
    // };

    const goals = [
        { id: 'goalGrup', value: 'Собрать свою группу', label: 'Собрать свою группу' },
        { id: 'goalExurs', value: 'Совместные экскурсии', label: 'Совместные экскурсии' },
        { id: 'goalSearch', value: 'Поиск единомышленников', label: 'Поиск единомышленников' },
        { id: 'goalSex', value: 'Флирт-секс', label: 'Флирт-секс' },
        { id: 'goalEntertainments', value: 'Совместные развлечения', label: 'Совместные развлечения' },
        { id: 'goalGroupJoining', value: 'Присоединиться к группе', label: 'Присоединиться к группе' },
        { id: 'goalArenda', value: 'Совместная аренда жилья', label: 'Совместная аренда жилья' },
        { id: 'goalSaleTours', value: 'Экономия на пакетном туре', label: 'Экономия на пакетном туре' },
        { id: 'goalKinder', value: 'Путешествия с детьми', label: 'Путешествия с детьми' },
    ];

    const looking = [
        { id: 'radio-what-1', value: 'Ищу попутчицу', label: 'Ищу попутчицу' },
        { id: 'radio-what-2', value: 'Ищу попутчика', label: 'Ищу попутчика' },
        { id: 'radio-what-3', value: 'Собираю группу', label: 'Собираю группу' },
        { id: 'radio-what-4', value: 'Ищу попутчика или попутчицу', label: 'Ищу попутчика или попутчицу' },
        { id: 'radio-what-5', value: 'Ищу попутчицу или женскую компанию', label: 'Ищу попутчицу или женскую компанию' },
        { id: 'radio-what-6', value: 'Ищу попутчика или мужскую компанию', label: 'Ищу попутчика или мужскую компанию' },
        { id: 'radio-what-7', value: 'Ищу попутчицу, попутчика или компанию', label: 'Ищу попутчицу, попутчика или компанию' },
    ];


    return (
        <div className={s.blockNewTours}>
            <div className={s.titleNewTours}>
                <h1>Добавить новый тур</h1>
            </div>
            <Formik
                initialValues={{
                    selectedOptionData: "", // Добавляем поле для хранения выбранной опции
                    firstName: props.firstName,
                    lastName: props.lastName,
                    age: 33,
                    userId: props.userId,
                    avatar: props.avatar,
                    level: 'Средний',
                    city: 'Москва',
                    looking: "",
                    kinder: false,
                    text: '',
                    images: [],
                    goal: '',
                    train: false,
                    air: true,
                    car: true,
                    bike: false,
                    foot: true,
                    places: ['Россия', 'Боливия', 'Иваново'],
                    Ihave: false,
                    total: 0,
                    heshtag: ['#спорт', '#шашлык', '#корольишут', '#поход'],
                    start_date: "", // Add field for start date
                    end_date: "",   // Add field for end date
                }}

                onSubmit={async (values) => {
                    console.log(values)
                    newSetDataTours(values) // Отправляем данные в правильном формате
                        .then((response) => {
                            // Обработайте успешный ответ здесь
                            console.log('Успешный ответ:', response.data);
                            setNotificationMessage('Объявление успешно добавлено');
                            setShowNotification(true);
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
                                        <legend className={s.titleLegend}>Подробности даты путешествия</legend>
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
                                <Field
                                    id="foto"
                                    name="images"
                                    component={FileDragAndDropField}
                                    accept="image/*"
                                    placeholder="Suelta la imagen ó da click para seleccionar una"
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="sectionFormGoal">
                            <div id={s.checkboxGroupGoal}>Цели путешествия<span>*</span></div>
                            <div role="group" aria-labelledby="checkbox-group">
                                {goals.map((goal) => (
                                    <label key={goal.id} htmlFor={goal.id}>
                                        <Field
                                            id={goal.id}
                                            className={s.formCheckInputGoal}
                                            type="checkbox"
                                            name="goal"
                                            value={goal.value}
                                        />
                                        {goal.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className={s.radioGroup}>
                            <fieldset>
                                <legend className={s.titleLegend}>Кого возьмем в путешествие</legend>
                                <div role="group" aria-labelledby="radio-group">
                                    {looking.map((option) => (
                                        <div key={option.id} className={s.radioItem}>
                                            <Field id={option.id} className={s.formCheckInput} type="radio" name="looking" value={option.value} />
                                            <label htmlFor={option.id}>{option.label}</label>
                                        </div>
                                    ))}

                                    <div className={s.titleKinder}>
                                        <legend>Я путешествую с детьми</legend>
                                        <label className={s.toggleSwitch}>
                                            <Field type="checkbox" name="kinder" className={s.formCheckToogle} />
                                            <span className={s.slider}></span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className={s.chekTransport} role="group" aria-labelledby="radio-group">
                            <legend>Каким транспортом добираемся?</legend>
                            <div className={s.transportGridIcon}>
                                <Field id="train" type="checkbox" name="train" />
                                <label htmlFor='train'>
                                    {values.train ? <span className={s.checkedIcon}></span> : null}
                                    <img className={values.train ? s.checked : s.unchecked} src={iconTrain} alt="" />
                                </label>
                                <Field id="air" type="checkbox" name="air" />
                                <label htmlFor='air'>
                                    {values.air ? <span className={s.checkedIcon}></span> : null}
                                    <img className={values.air ? s.checked : s.unchecked} src={iconAir} alt="" />
                                </label>
                                <Field id="car" type="checkbox" name="car" />
                                <label htmlFor='car'>
                                    {values.car ? <span className={s.checkedIcon}></span> : null}
                                    <img className={values.car ? s.checked : s.unchecked} src={iconCar} alt="" />
                                </label>
                                <Field id="bike" type="checkbox" name="bike" />
                                <label htmlFor='bike'>
                                    {values.bike ? <span className={s.checkedIcon}></span> : null}
                                    <img className={values.bike ? s.checked : s.unchecked} src={iconBike} alt="" />
                                </label>
                                <Field id="foot" type="checkbox" name="foot" />
                                <label htmlFor='foot'>
                                    {values.foot ? <span className={s.checkedIcon}></span> : null}
                                    <img className={values.foot ? s.checked : s.unchecked} src={iconFoot} alt="" />
                                </label>
                            </div>
                        </div>
                        <div className={s.tagUser}>
                            <fieldset>
                                <legend className={`${s.titleLegend} ${s.titleLegendTag}`}>ХЕШТЕГИ</legend>
                                <Field id='heshtag' as="textarea" placeholder="Коротко о себе в виде 5-8 хештэгов" name="heshtag" />
                            </fieldset>
                        </div>
                        <div className={s.btnToursForm}><button type="submit">Добавить тур</button></div>
                    </Form>
                )}
            </Formik>
            <Popup
                open={showNotification}
                closeOnDocumentClick
                onClose={() => setShowNotification(false)}
            >
                <NotificationPopup message={notificationMessage} close={() => setShowNotification(false)} />
            </Popup>
        </div>
    );
}
