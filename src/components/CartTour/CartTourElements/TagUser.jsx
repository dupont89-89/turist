import React from 'react';
import { Link } from 'react-router-dom';
import s from '../CartTourCatalog.module.css';
import transliterate from '../../../function/transliterate';

export default function TagUser(props) {
    const heshtags = props.heshtag || [];

    return (
        <div className={s.linkHeshtag}>
            {heshtags.map((tag, index) => {
                // Транслитерируем хештег только для URL
                const transliteratedTag = transliterate(tag);

                return (
                  <Link to={`/tours/${transliteratedTag}`} key={index}>{tag}</Link>
                );
            })}
        </div>
    );
}