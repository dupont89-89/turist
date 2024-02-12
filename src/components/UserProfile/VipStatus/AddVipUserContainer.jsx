import React from 'react'
import { connect } from 'react-redux'
import AddVipUser from './AddVipUser'

function AddVipUserContainer(props) {
  return <AddVipUser userId={props.userId} vip={props.vip} />
}

let mapStateToProps = (state) => {
  return {
    vip: state.user.dataUser.vip,
    userId: state.user.dataUser.userId,
  }
}

export default connect(mapStateToProps)(AddVipUserContainer)
