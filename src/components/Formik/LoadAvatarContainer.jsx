import { connect } from 'react-redux';
import LoadAvatar from './LoadAvatar';
import { getUser } from '../../api_request/api';

function LoadAvatarContainer(props) {

  return (
    <div>
      <LoadAvatar getUser={props.getUser} userId={props.userId} />
    </div>
  );
} 

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
  };
}

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadAvatarContainer);