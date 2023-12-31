import React, { useState, useEffect, useRef } from 'react';
import s from '../Header.module.css';
import { Link } from 'react-router-dom';
import { BoxMenuTime } from './BoxMenu/BoxMenuTime';
import { BoxMenuHuman } from './BoxMenu/BoxMenuHuman';
import { BoxMenuContry } from './BoxMenu/BoxMenuContry';
import { BoxMenuType } from './BoxMenu/BoxMenuType';

export default function Menu(props) {
    const [activeComponent, setActiveComponent] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveComponent(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = (component) => {
        setActiveComponent((prevComponent) =>
            prevComponent === component ? null : component
        );
    };

    return (
        <div className={s.menuBlockHeader} ref={menuRef}>
            <div className={s.itemMenu}>
                <Link onClick={() => handleLinkClick("type")} to="/#1">
                    <span className={`${s.iconMenuType} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Вид отдыха</span>
                </Link>
                {activeComponent === "type" && <BoxMenuType handleLinkClick={handleLinkClick} />}
            </div>
            <div className={s.itemMenu}>
                <Link onClick={() => handleLinkClick("contry")} to="/#2">
                    <span className={`${s.iconMenuContry} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Направления</span>
                </Link>
                {activeComponent === "contry" && <BoxMenuContry handleLinkClick={handleLinkClick} />}
            </div>
            <div className={s.itemMenu}>
                <Link onClick={() => handleLinkClick("human")} to="/#3">
                    <span className={`${s.iconMenuHuman} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Кого ищем</span>
                </Link>
                {activeComponent === "human" && <BoxMenuHuman handleLinkClick={handleLinkClick} />}
            </div>
            <div className={s.itemMenu}>
                <Link onClick={() => handleLinkClick("time")} to="/#4">
                    <span className={`${s.iconMenuTime} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Когда в путь</span>
                </Link>
                {activeComponent === "time" && <BoxMenuTime handleLinkClick={handleLinkClick} />}
            </div>
            <div className={s.itemMenu}>
                <Link to="/blog/">
                    <span className={`${s.iconMenuBlog} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Отчеты пользователей</span>
                </Link>
            </div>
            <div className={s.itemMenu}>
                <Link to="/newtur">
                    <span className={`${s.iconMenuNew} ${s.iconMenu}`}></span>
                    <span className={s.textLink}>Последние публикации</span>
                </Link>
            </div>
        </div>
    );
}