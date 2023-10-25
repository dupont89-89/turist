// import React from 'react'
// import { Link } from 'react-router-dom'
// import s from '../CartTourCatalog.module.css'

// export default function RegionsBlockCartList(props) {
//     return (
//         <div className={s.regions}>
//             <Link className={s.linkRegions}><span></span>Россия<span></span></Link>
//             <Link className={s.linkRegions}><span></span>Омск<span></span></Link>
//             <Link className={s.linkRegions}><span></span>Горно-Алтайск<span></span></Link>
//             <Link className={s.linkRegions}><span></span>Республика Алтай<span></span></Link>
//         </div>
//     )
// }

import React from 'react';
import { Link } from 'react-router-dom';
import s from '../CartTourCatalog.module.css';
import transliterate from '../../../function/transliterate';

export default function RegionsBlockCartList(props) {
    
    const places = props.places || [];

    return (
        <div className={s.regions}>
            {places.map((regions, index) => {
                // Транслитерируем хештег только для URL
                const transliteratedPlaces = transliterate(regions);

                return (
                  <Link className={s.linkRegions} to={`/tours/${transliteratedPlaces}`} key={index}><span></span>{regions}<span></span></Link>
                );
            })}
        </div>
    );
}
