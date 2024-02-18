import React from 'react'
import { connect } from 'react-redux'
import NewTours from './NewTours'

function NewToursContainer(props) {
  return (
    <div>
      <NewTours userId={props.userId} />
    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
  }
}

export default connect(mapStateToProps, null)(NewToursContainer)
