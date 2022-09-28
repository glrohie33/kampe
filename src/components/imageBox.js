import React from 'react';

function ImageBox(props) {
    return (
        <a href={'/'} className={`col_${12/ props.cols} image-box`} style={{}}>
            <div className={'col-item-inner'}>
                <img src={props.data.url} alt={props.data.title}/>
                <h3>{props.data.title}</h3>
            </div>
        </a>
    );
}

export default ImageBox;