import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

function PaginationLink({value,name,children}) {
    const {slug,...others} = useParams();
    const [url,setUrl ] = useState('');
    const buildParams = ()=>{
        const path = window.location.pathname;
        const newurl = new URLSearchParams(others);
        newurl.set(name,value);
        const strurl = `${path}?${newurl.toString()}`;
        console.log(strurl);
        setUrl(strurl);
    }
    useEffect(()=>{
      buildParams();
    },[]);

    return (
        <a href={url} className={'btn pg-btn btn-default'}>
            {
                children
            }
        </a>
    );
}

export default PaginationLink;