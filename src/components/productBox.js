import React from 'react';
import {toCurrency} from "../utils/functions";

function ProductBox({cols,colsMobile=2,data}) {
    return (
        <a href={`/${data.slug}`} className={`col_${cols} col_m_${colsMobile}  product-box`} style={{}}>
            <div className={'col-item-inner'}>
                <div className={'image-cover'}>
                    <img src={data?.mainImage} alt={data?.name}/>
                </div>
                <h3>{data?.name}</h3>
                <p> { toCurrency(data?.price)}</p>
            </div>
        </a>
    );
}

export default ProductBox;