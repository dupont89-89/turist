import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

function LoginContainer(props) {

  return (
    <div>
      <Login isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps)(LoginContainer);