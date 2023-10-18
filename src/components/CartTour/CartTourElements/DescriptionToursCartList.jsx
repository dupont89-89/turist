import React from 'react'
import s from '../CartTourCatalog.module.css'
import GoalsUserToursCartList from './GoalsUserToursCartList'
import TransportUserToursCartList from './TransportUserToursCartList'

export default function DescriptionToursCartList(props) {
    return (
        <div>
            <div className={s.descriptionTours}>
                <p>
                {props.text}
                </p>
            </div>
            <div>
                <GoalsUserToursCartList goal={props.goal} />
                <TransportUserToursCartList foot={props.foot} bike={props.bike} car={props.car} air={props.air} train={props.train} />
            </div>
        </div>
    )
}
