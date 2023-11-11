import React from 'react'
import { connect } from 'react-redux'
import NewTours from './NewTours'

function NewToursContainer(props) {
  return (
    <div>
        <NewTours age={props.age} userId={props.userId} lastName={props.lastName} firstName={props.firstName} avatar={props.avatar} />
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
    age: state.user.dataUser.age,
    };
  }
  
  
  export default connect(mapStateToProps, null)(NewToursContainer);
