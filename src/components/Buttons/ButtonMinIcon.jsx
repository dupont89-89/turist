import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonMinIcon(props) {
  const { children, icon, backColor, textColor, link } = props
  const button = {
    backgroundColor: backColor,
    borderRadius: '5px',
    color: textColor,
    display: 'flex',
    padding: '5px',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }

  const buttonIcon = {
    width: '20px',
    marginRight: '10px',
  }

  const text = {
    display: 'block',
  }

  const block = {
    display: 'inline-block',
  }

  return (
    <div style={block}>
      <Link to={link} style={button}>
        <img style={buttonIcon} title={children} src={icon} alt={children} /> <span style={text}>{children}</span>
      </Link>
    </div>
  )
}
