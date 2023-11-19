import React from 'react'
import TourustProfile from './TourustProfile';
import { connect } from 'react-redux';


function TourustProfileContainer(props) {
    
  return (
    <div>
      <TourustProfile tel={props.tel} sity={props.sity} userId={props.userId} avatar={props.avatar} age={props.age} lastName={props.lastName} firstName={props.firstName} />
    </div>
  )
}

let mapStateToProps = (state) => {
    return {
    isAuthenticated: state.user.isAuthenticated,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
    userId: state.user.dataUser.userId,
    avatar: state.user.dataUser.avatar,
    age: state.user.dataUser.age,
    sity: state.user.dataUser.sity,
    tel: state.user.dataUser.tel,
    };
  }
  
  
  export default connect(mapStateToProps, null)(TourustProfileContainer);
