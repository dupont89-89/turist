import React from 'react'
import { connect } from 'react-redux'
import UserPage from './UserPage';

function UserPageContainer(props) {
  debugger;
  return (
    <div>
      <UserPage lastName={props.lastName} firstName={props.firstName} avatar={props.avatar} />
    </div>
  )
}

let mapStateToProps = (state) => {
    return {
    isAuthenticated: state.user.isAuthenticated,
    avatar: state.user.dataUser.avatar,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
    userId: state.user.dataUser.userId,
    avatar: state.user.dataUser.avatar,
    };
  }
  
  
  export default connect(mapStateToProps)(UserPageContainer);
