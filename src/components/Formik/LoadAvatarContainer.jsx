import { connect } from 'react-redux';
import LoadAvatar from './LoadAvatar';

function LoadAvatarContainer(props) {
    debugger;

  return (
    <div>
      <LoadAvatar userId={props.userId} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser._id,
  };
}

export default connect(mapStateToProps)(LoadAvatarContainer);