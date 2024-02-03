import React from 'react'
import { Link } from 'react-router-dom'
import s from './Rating.module.css'

export default function TopFive(props) {
  return (
    <div className={s.headerTopRatingTours}>
      <div className={s.blockTopRatingTours}>
        <div className={s.titleTopRatingTours}>
          <span>ТОП-5 рейтинг направлений</span>
        </div>
        <ul>
          <li>
            <div className={s.linkHeaderTop}>
              <Link>
                <span className={s.nameLinkTop}>Сочи </span>
                <span className={s.numberLinkTop}>1</span>
              </Link>
            </div>
          </li>
          <li>
            <div className={s.linkHeaderTop}>
              <Link>
                <span className={s.nameLinkTop}>Байкал</span>
                <span className={s.numberLinkTop}>2</span>
              </Link>
            </div>
          </li>
          <li>
            <div className={s.linkHeaderTop}>
              <Link>
                <span className={s.nameLinkTop}>Казань</span>
                <span className={s.numberLinkTop}>3</span>
              </Link>
            </div>
          </li>
          <li>
            <div className={s.linkHeaderTop}>
              <Link>
                <span className={s.nameLinkTop}>Турция</span>
                <span className={s.numberLinkTop}>4</span>
              </Link>
            </div>
          </li>
          <li>
            <div className={s.linkHeaderTop}>
              <Link>
                <span className={s.nameLinkTop}>Египет</span>
                <span className={s.numberLinkTop}>5</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
