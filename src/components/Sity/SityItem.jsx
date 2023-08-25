import React from 'react'
import { Link } from 'react-router-dom'


export default function SityItem(props) {
  return (
    <div>
      {/* <a onClick={props.insertCityName}>{props.name}</a> */}
      <Link to="#" onClick={props.insertCityName}>{props.name}</Link>
    </div>
  )
}
