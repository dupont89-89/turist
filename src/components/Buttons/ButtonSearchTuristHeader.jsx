import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ButtonSearchTuristHeader(props) {
  const [isHovered, setIsHovered] = useState(false)

  const btn = {
    color: props.color,
    backgroundColor: props.backColor,
    padding: '8px 20px',
    fontSize: props.size,
    display: 'inline-block',
    borderRadius: '10px',
    marginTop: '20px',
    textAlign: 'center',
    boxShadow: isHovered ? '0px 0px 8px 0px rgba(34, 60, 80, 0.2)' : '0px 0px 8px 0px rgba(34, 60, 80, 0.4) inset',
    opacity: isHovered ? '0.9' : '1',
  }

  return (
    <div>
      <Link
        style={btn}
        to={props.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.title}
      </Link>
    </div>
  )
}
