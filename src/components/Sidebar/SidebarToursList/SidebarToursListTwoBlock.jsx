import React from 'react'
import s from '../Sidebar.module.css'
import { Link } from 'react-router-dom'
import images from '../../../assets/images/articles/banan-articles.jpg'

export default function SidebarToursListTwoBlock(props) {
  return (
    <div className={s.blockSidebar}>
      <div className={s.sidebarToursListBlockTwo}>
        <div className={s.titleLinkArticlesSidebar}>
          <Link to="/">Банан... как же хорошо прокатиться с ветерком.</Link>
        </div>
        <div className={s.imgLinkArticlesSidebar}>
          <Link to="/"><img src={images} alt="" /></Link>
        </div>
        <div className={s.descriptionArticles}>
          <p>Крутое, развлечение на любой такой турпродукт состоит посадки и я расскажу.</p>
        </div>
        <div className={s.btnArticles}>
          <Link>Читать статью</Link>
        </div>
      </div>
    </div>
  )
}