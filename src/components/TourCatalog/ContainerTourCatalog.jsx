import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TourCatalog from './TourCatalog';
import { toggleFavouriteTour, getToursCatalog } from '../../redux/tour-reducer/tour-reducer'; // Импортируем setFavourites из файла с действиями

function ContainerTourCatalog(props) {

  useEffect(() => {
    // Вызываем загрузку туров при монтировании компонента
    props.getToursCatalog();
  }, []);

  return (
    <div>
      <TourCatalog addFavouritesAction={props.addFavouritesAction} toursItem={props.toursItem} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    toursItem: state.tours.toursItem,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavouritesAction: (values) => {
      dispatch(toggleFavouriteTour(values));
    },
    getToursCatalog: () => {
      dispatch(getToursCatalog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTourCatalog);
