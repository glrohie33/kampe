import React, { useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {PAGEURL} from "../utils/texthelper";
import {get} from "../actions/auth";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";
import {useDispatch} from "react-redux";
import {setBasket} from "../store/reducers/cart";

function PageView(props) {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [content,setPageContent] = useState({});
    const [search,updateSearchParams] = useSearchParams();
    if (searchParams.basket){
        dispatch(setBasket(searchParams.basket))
    }
    const loadPage = (param)=>{
        get(`${PAGEURL}/${param}`)
            .then(resp=>{
                if(resp.status){
                    setPageContent(resp.data);
                }
            }).catch();
    }
    useEffect(()=>{
        loadPage(slug);
    },[slug])
    return (
        <section className={'row'}>
            {
                content.contents &&
                <PageContent contents={content.contents}/>

            }
            {
                CreateElement(content.view,{content})
            }
        </section>
    );
}

export default PageView;