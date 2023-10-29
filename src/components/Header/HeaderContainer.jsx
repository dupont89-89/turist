import { connect } from 'react-redux';
import Header from './Header';

function HeaderContainer(props) {

  return (
    <div>
      <Header avatar={props.avatar} isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    avatar: state.user.dataUser.avatar
  };
}

export default connect(mapStateToProps)(HeaderContainer);