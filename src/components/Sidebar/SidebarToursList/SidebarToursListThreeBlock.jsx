import React from 'react'
import s from '../Sidebar.module.css'
import { Link } from 'react-router-dom'
import images from '../../../assets/images/articles/sochi-articles.jpg'

export default function SidebarToursListThreeBlock(props) {
  return (
    <div className={s.blockSidebar}>
      <div className={s.sidebarToursListBlockThree}>
        <div className={s.titleLinkArticlesSidebar}>
          <Link to="/">Крутой Сочи... приезжай быстрей к нам, мы покажем крутой отдых.</Link>
        </div>
        <div className={s.imgLinkArticlesSidebar}>
          <Link to="/"><img src={images} alt="" /></Link>
        </div>
        <div className={s.descriptionArticles}>
          <p>Отличное решение прогуляться по набережной. Расскажи об этом друзьям своим. Они помогут.</p>
        </div>
        <div className={s.btnArticles}>
          <Link>Читать статью</Link>
        </div>
      </div>
    </div>
  )
}