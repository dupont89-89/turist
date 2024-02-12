import React, { useState, useEffect, useRef } from 'react'
import s from './Menu.module.css'
import { Link } from 'react-router-dom'
import { BoxMenuTime } from './BoxMenu/BoxMenuTime'
import { BoxMenuHuman } from './BoxMenu/BoxMenuHuman'
import { BoxMenuContry } from './BoxMenu/BoxMenuContry'
import { BoxMenuType } from './BoxMenu/BoxMenuType'
import iconMenuType from '../../assets/images/header/menu/tent.png'
import iconMenuContry from '../../assets/images/header/menu/travel-map.png'
import iconMenuHuman from '../../assets/images/header/menu/travel-map-search.png'
import iconMenuTime from '../../assets/images/header/menu/icon-travel-time.png'
import iconMenuBlog from '../../assets/images/header/menu/icon-travel-blog.png'
import iconMenuFavorite from '../../assets/images/header/menu/travel-favorit.png'

export default function Menu(props) {
  const [activeComponent, setActiveComponent] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveComponent(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLinkClick = (component) => {
    setActiveComponent((prevComponent) => (prevComponent === component ? null : component))
  }

  return (
    <div>
      {activeComponent === 'type' && <BoxMenuType handleLinkClick={handleLinkClick} />}
      <div className={s.menuBlockHeader} ref={menuRef}>
        <div className={s.textLink}>
          <Link onClick={() => handleLinkClick('type')} to='#1'>
            <div className={s.itemMenu}>
              <img src={iconMenuType} alt='Вид отдыха' />
              <span className={s.textLinkMenu}>Вид отдыха</span>
            </div>
          </Link>
        </div>
        <div className={s.textLink}>
          <Link onClick={() => handleLinkClick('contry')} to='#2'>
            <div className={s.itemMenu}>
              <img src={iconMenuContry} alt='Направления' />
              <span className={s.textLinkMenu}>Направления</span>
            </div>
          </Link>
          {activeComponent === 'contry' && <BoxMenuContry handleLinkClick={handleLinkClick} />}
        </div>
        <div className={s.textLink}>
          <Link onClick={() => handleLinkClick('human')} to='#3'>
            <div className={s.itemMenu}>
              <img src={iconMenuHuman} alt='Кого ищем' />
              <span className={s.textLinkMenu}>Кого ищем</span>
            </div>
          </Link>
          {activeComponent === 'human' && <BoxMenuHuman handleLinkClick={handleLinkClick} />}
        </div>
        <div className={s.textLink}>
          <Link onClick={() => handleLinkClick('time')} to='#4'>
            <div className={s.itemMenu}>
              <img src={iconMenuTime} alt='Когда в путь' />
              <span className={s.textLinkMenu}>Когда в путь</span>
            </div>
          </Link>
          {activeComponent === 'time' && <BoxMenuTime handleLinkClick={handleLinkClick} />}
        </div>
        <div className={s.textLink}>
          <Link to='/blog/'>
            <div className={s.itemMenu}>
              <img src={iconMenuBlog} alt='Отчеты пользователей' />
              <span className={s.textLinkMenu}>Отчеты пользователей</span>
            </div>
          </Link>
        </div>
        <div className={s.textLink}>
          <Link to='/newtur'>
            <div className={s.itemMenu}>
              <img src={iconMenuFavorite} alt='Последние публикации' />
              <span className={s.textLinkMenu}>Последние публикации</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
