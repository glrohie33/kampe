import React, { useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {PAGEURL} from "../utils/texthelper";
import {get} from "../actions/auth";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";
import {useDispatch} from "react-redux";
import {setBasket} from "../store/reducers/cart";
import {Parser} from "html-to-react";
const htmlToReact = new Parser();
const query = new URL(window.location).search;
function PageView() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [content,setPageContent] = useState({});
    const [search] = useSearchParams();

    const loadPage = (param)=>{

        get(`${PAGEURL}/${param}${query}`)
            .then(resp=>{
                if(resp.status){
                    setPageContent(resp.data);
                }
            }).catch();
    }
    useEffect(()=>{
        loadPage(slug);
        if (search.basket){
            dispatch(setBasket(search.basket))
        }
    },[slug,search.basket,dispatch])
    return (
        <section className={'row'}>
            {
                content.contents &&
                <PageContent contents={content.contents}/>

            }
            {
                CreateElement(content.view,{content})
            }
            {
                (content.textContent) &&
                <div className={'col card text-content'}>
                    {
                        htmlToReact.parse(content.textContent)
                    }
                </div>

            }

        </section>
    );
}

export default PageView;