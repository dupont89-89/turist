import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getSitySearch } from '../../redux/sity-reducer';
import SityItem from './SityItem';
import { useFormik } from 'formik';
import s from '../Sity/Sity.module.css'

function Sity(props) {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  let filteredCities = props.city
    .filter(city => city.name.toLowerCase().startsWith(searchValue.toLowerCase()))
    .map(city => (
      <SityItem
        name={city.name}
        key={city.city_id}
        insertCityName={() => insertCityName(city.name)}
      />
    ));

  function insertCityName(cityName) {
    setSearchValue(cityName);
    setShowSuggestions(false);
  }

  return (
    <div>
      <SignupForm
        getSitySearch={props.getSitySearch}
        setSearchValue={setSearchValue}
        setShowSuggestions={setShowSuggestions}
        searchValue={searchValue} // Передаем searchValue в SignupForm
        filteredCities={filteredCities}
        showSuggestions={showSuggestions}

      />
      {/* {showSuggestions && <ul>{filteredCities}</ul>} */}
    </div>
  );
}

const mapDispatchToProps = {
  getSitySearch: getSitySearch,
};

let mapStateToProps = state => {
  return {
    city: state.searchSityTrack.city,
  };
};

const SignupForm = ({
  setSearchValue,
  getSitySearch,
  setShowSuggestions,
  searchValue,
  showSuggestions,
  filteredCities
}) => {
  const formik = useFormik({
    initialValues: {
      cityName: '',
    },
    onSubmit: values => {
      getSitySearch();
      setSearchValue(values.cityName);
      setShowSuggestions(false);
    },
  });

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    setShowSuggestions(inputValue.length >= 3);
    getSitySearch(); // Вызываем getSitySearch() при каждом изменении значения в поле ввода
  }

  return (
<div className={s.formSity}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="cityName">Выбор города</label>
        <input
          id="cityName"
          name="cityName"
          type="text"
          onChange={handleInputChange}
          value={searchValue} // Привязываем значение поля ввода к searchValue
        />
        <div className={s.inputSearchCity}>{showSuggestions && <ul>{filteredCities}</ul>}</div>
      </form>
</div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sity);
