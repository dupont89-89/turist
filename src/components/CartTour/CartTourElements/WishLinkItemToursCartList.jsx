import React from 'react';
import { Link } from 'react-router-dom';
import s from '../CartTourCatalog.module.css';
import iconHealt from '../../../assets/images/cartTours/free-icon-favorite-11090394.png'; 
import iconHealtNo from '../../../assets/images/cartTours/icon-favorite-no.png';
import { connect } from 'react-redux';
import {toggleFavouriteTour} from '../../../redux/tour-reducer/tour-reducer'

function WishLinkItemToursCartList(props) {

  const { toursId, Ihave, toggleFavouriteTour } = props;
  
  const handleSetFavourites = () => {
    const updatedFavourites = {
      ...Ihave,
      Ihave: !Ihave,
    };
    toggleFavouriteTour(toursId, updatedFavourites);
  };

  return (
    <div className={s.linkWishGridItemTours}>
      
      <div className={s.linkItemTours}>
        <Link onClick={handleSetFavourites} to='#'>
          {props.Ihave ? (
            <div className={s.blockIhave}>
              <img src={iconHealt} alt="" />
              <span className={s.numberWish}>{props.total}</span>
            </div>
          ) : (
            <div className={s.blockIhave}>
            <img src={iconHealtNo} alt="" />
            <span className={s.numberWish}>{props.total}</span>
          </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default connect(null, { toggleFavouriteTour })(WishLinkItemToursCartList);
