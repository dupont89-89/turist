import React from 'react'
import s from '../Sidebar.module.css'
import images from '../../../assets/images/articles/gor-articles-1.jpg'
import { Link } from 'react-router-dom'

export default function SidebarToursListOneBlock(props) {
  return (
    <div className={s.blockSidebar}>
        <div className={s.sidebarToursListBlockOne}>
          <div className={s.titleLinkArticlesSidebar}>
            <Link to="/">Идеальный трип... Или как быстро собрать участников в авторское путешествие.</Link>
          </div>
          <div className={s.imgLinkArticlesSidebar}>
          <Link to="/"><img src={images} alt="" /></Link>
          </div>
          <div className={s.descriptionArticles}>
            <p>На мой взгляд, любой авторский турпродукт состоит из нескольких составляющих, которые я и попробую разобрать.</p>
          </div>
          <div className={s.btnArticles}>
            <Link>Читать статью</Link>
          </div>
        </div>
    </div>
  )
}