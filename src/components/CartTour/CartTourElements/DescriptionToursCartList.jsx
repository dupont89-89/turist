import React from 'react'
import s from '../CartTourCatalog.module.css'
import GoalsUserToursCartList from './GoalsUserToursCartList'
import TransportUserToursCartList from './TransportUserToursCartList'

export default function DescriptionToursCartList(props) {
    return (
        <div>
            <div className={s.descriptionTours}>
                <p>
                {props.descriptionText}
                </p>
            </div>
            <div>
                <GoalsUserToursCartList goal={props.goal} />
                <TransportUserToursCartList transport={props.transport} />
            </div>
        </div>
    )
}
