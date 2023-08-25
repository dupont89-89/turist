import React from 'react'
import s from '../CartTourCatalog.module.css'
import GoalsUserToursCartList from './GoalsUserToursCartList'
import TransportUserToursCartList from './TransportUserToursCartList'

export default function DescriptionToursCartList(props) {
    return (
        <div>
            <div className={s.descriptionTours}>
                <p>
                    Люблю прогулки, походы, общение. Предлагаю провести время совместно с компанией/человеком/парой.
                    Выезжаю из Челябинска в Крым на своей машине 29.06.2023, можно ехать вместе
                </p>
            </div>
            <div>
                <GoalsUserToursCartList />
                <TransportUserToursCartList />
            </div>
        </div>
    )
}
