import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewTours from './NewTours'

function NewToursContainer(props) {
  useEffect(() => {
    document.title = 'Добавить новый тур для поиска попутчиков'
    // Вызываем загрузку туров при монтировании компонента
  }, [])
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
