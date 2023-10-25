import { connect } from 'react-redux';
import Header from './Header';

function HeaderContainer(props) {

  return (
    <div>
      <Header isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps)(HeaderContainer);