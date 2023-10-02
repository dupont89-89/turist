import React from 'react';
import s from '../../Header.module.css'
import { Link } from 'react-router-dom';

export function BoxMenuHuman(props) {

    const someFunction = () => {
        props.handleLinkClick("human");
    };

    return (
        <div className={s.blockPodMenu}>
            <div className={s.headblockPodMenu}>
                <div className={s.titlePodMen}><span>С кем едем отдыхать?</span></div>
                <div><button onClick={someFunction}>✖</button></div>
            </div>
            <hr className={s.hrBlockPodMenu} />
            <div className={s.blockItemPodMenu}>
                <Link to="#154">
                    <div className={s.itemPodMenu}>
                        <span className={s.titleItemPodMenu}>Море, пляж</span>
                        <span className={s.numberItemPodMenu}>(118)</span>
                        <span className={`${s.iconMenuSea} ${s.iconPodMenu}`}></span>
                        <span className={s.descriptionItemPodMenu}>Отдых на каком нибудь лазурном берегу с коктейлем.</span>
                    </div>
                </Link>
                <Link to="#154">
                    <div className={s.itemPodMenu}>
                        <span className={s.titleItemPodMenu}>Море, пляж</span>
                        <span className={s.numberItemPodMenu}>(118)</span>
                        <span className={`${s.iconMenuSea} ${s.iconPodMenu}`}></span>
                        <span className={s.descriptionItemPodMenu}>Отдых на каком нибудь лазурном берегу с коктейлем.</span>
                    </div>
                </Link>
                <Link to="#154">
                    <div className={s.itemPodMenu}>
                        <span className={s.titleItemPodMenu}>Море, пляж</span>
                        <span className={s.numberItemPodMenu}>(118)</span>
                        <span className={`${s.iconMenuSea} ${s.iconPodMenu}`}></span>
                        <span className={s.descriptionItemPodMenu}>Отдых на каком нибудь лазурном берегу с коктейлем.</span>
                    </div>
                </Link>
                <Link to="#154">
                    <div className={s.itemPodMenu}>
                        <span className={s.titleItemPodMenu}>Море, пляж</span>
                        <span className={s.numberItemPodMenu}>(118)</span>
                        <span className={`${s.iconMenuSea} ${s.iconPodMenu}`}></span>
                        <span className={s.descriptionItemPodMenu}>Отдых на каком нибудь лазурном берегу с коктейлем.</span>
                    </div>
                </Link>
                <Link to="#154">
                    <div className={s.itemPodMenu}>
                        <span className={s.titleItemPodMenu}>Море, пляж</span>
                        <span className={s.numberItemPodMenu}>(118)</span>
                        <span className={`${s.iconMenuSea} ${s.iconPodMenu}`}></span>
                        <span className={s.descriptionItemPodMenu}>Отдых на каком нибудь лазурном берегу с коктейлем.</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}