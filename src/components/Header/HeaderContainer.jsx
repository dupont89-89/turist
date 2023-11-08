import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import { useSelector } from 'react-redux';

function HeaderContainer(props) {
  
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const avatar = useSelector(state => state.user.dataUser.avatar);
  const firstName = useSelector(state => state.user.dataUser.firstName);
  const lastName = useSelector(state => state.user.dataUser.lastName);
  const userId = useSelector(state => state.user.dataUser.userId);

  return (
    <div>
      <Header userId={userId} isAuthenticated={isAuthenticated} avatar={avatar} firstName={firstName} lastName={lastName} />
    </div>
  );
}

export default HeaderContainer

// let mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.user.isAuthenticated,
//     avatar: state.user.dataUser.avatar,
//     firstName: state.user.dataUser.firstName,
//     lastName: state.user.dataUser.lastName,
//   };
// }

// // export default connect(mapStateToProps, null)(HeaderContainer);