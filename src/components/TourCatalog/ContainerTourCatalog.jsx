import React from 'react';
import { connect } from 'react-redux';
import TourCatalog from './TourCatalog';
import { toggleFavouriteTour } from '../../redux/tour-reducer/tour-reducer'; // Импортируем setFavourites из файла с действиями

function ContainerTourCatalog(props) {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTourCatalog);
