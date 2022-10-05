import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

function PaginationLink({value,name,children}) {
    const {slug,...others} = useParams();
    const [url,setUrl ] = useState('');
    const buildParams = useCallback(()=>{
        const path = window.location.pathname;
        const newurl = new URLSearchParams(others);
        const strurl = `${path}?${newurl.toString()}`;
        setUrl(strurl);
    },[others])
    useEffect(()=>{
      buildParams();
    },[buildParams]);

    return (
        <a href={url} className={'btn pg-btn btn-default'}>
            {
                children
            }
        </a>
    );
}

export default PaginationLink;