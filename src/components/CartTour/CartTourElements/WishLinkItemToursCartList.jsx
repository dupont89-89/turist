import React from 'react';
import { Link } from 'react-router-dom';
import s from '../CartTourCatalog.module.css';
import iconHealt from '../../../assets/images/cartTours/free-icon-favorite-11090394.png'; 
import iconHealtNo from '../../../assets/images/cartTours/icon-favorite-no.png';
import { connect } from 'react-redux';
import {toggleFavouriteTour} from '../../../redux/tour-reducer/tour-reducer'

function WishLinkItemToursCartList(props) {

  const { tourId, favourites, toggleFavouriteTour } = props;
  
  const handleSetFavourites = () => {
    const updatedFavourites = {
      ...favourites,
      Ihave: !favourites.Ihave,
    };
    toggleFavouriteTour(tourId, updatedFavourites);
  };

  return (
    <div className={s.linkWishGridItemTours}>
      
      <div className={s.linkItemTours}>
        <Link onClick={handleSetFavourites} to='#'>
          {favourites.Ihave ? (
            <div>
              <img src={iconHealt} alt="" />
              <span className={s.numberWish}>{favourites.total}</span>
            </div>
          ) : (
            <div>
            <img src={iconHealtNo} alt="" />
            <span className={s.numberWish}>{favourites.total}</span>
          </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default connect(null, { toggleFavouriteTour })(WishLinkItemToursCartList);
