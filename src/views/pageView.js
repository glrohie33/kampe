import React, { useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {PAGEURL} from "../utils/texthelper";
import {get} from "../actions/auth";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";

function PageView(props) {
    const {slug} = useParams();
    const [content,setPageContent] = useState({});
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