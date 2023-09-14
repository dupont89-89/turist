import React from 'react'
import s from '../Sidebar.module.css'
import images from '../../../assets/images/articles/snou-articles.jpg'
import { Link } from 'react-router-dom'

export default function SidebarToursListFourthBlock(props) {
  return (
    <div className={s.blockSidebar}>
      <div className={s.sidebarToursListBlockFourth}>
        <div className={s.titleLinkArticlesSidebar}>
          <Link to="/">С ветерком? Конечно давай! Прогуляемся по склону.</Link>
        </div>
        <div className={s.imgLinkArticlesSidebar}>
          <Link to="/"><img src={images} alt="" /></Link>
        </div>
        <div className={s.descriptionArticles}>
          <p>Рассекать по снегу не так уж и сложно, как думают велогонщики. А ты попробуй.</p>
        </div>
        <div className={s.btnArticles}>
          <Link>Читать статью</Link>
        </div>
      </div>
    </div>
  )
}