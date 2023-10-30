import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';

function HeaderContainer(props) {

  return (
    <div>
      <Header lastName={props.lastName} firstName={props.firstName} avatar={props.avatar} isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    avatar: state.user.dataUser.avatar,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
  };
}

export default connect(mapStateToProps)(HeaderContainer);