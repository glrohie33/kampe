import React from 'react';
import {toCurrency} from "../utils/functions";

function ProductBox(props) {
    return (
        <a href={`/${props.data.slug}`} className={`col_${12/ props.cols} product-box`} style={{}}>
            <div className={'col-item-inner'}>
                <div className={'image-cover'}>
                    <img src={props.data.mainImage} alt={props.data.name}/>
                </div>
                <h3>{props.data.name}</h3>
                <p> { toCurrency(props.data.price)}</p>
            </div>
        </a>
    );
}

export default ProductBox;