import React from 'react'
import { Link } from 'react-router-dom'
import s from '../CartTourCatalog.module.css'

export default function RegionsBlockCartList(props) {
    return (
        <div className={s.regions}>
            <Link className={s.linkRegions}><span></span>Россия<span></span></Link>
            <Link className={s.linkRegions}><span></span>Омск<span></span></Link>
            <Link className={s.linkRegions}><span></span>Горно-Алтайск<span></span></Link>
            <Link className={s.linkRegions}><span></span>Республика Алтай<span></span></Link>
        </div>
    )
}
