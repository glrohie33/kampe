import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {get} from "../actions/auth";
import PageContent from "../components/pageContent";
import PageBanners from "../components/pageBanners";
import {PAGEURL} from "../utils/texthelper";
function Home(props) {

    const [pageContent,setPageContent] = useState({});
    const abortController = useMemo(()=>new AbortController(),[]);
    const signal = abortController.signal;
    useEffect(()=>{
            get(PAGEURL,'',{
                'Content-Type':'application/json',
                signal
            })
                .then(resp=>{
                    if(resp.status){
                        setPageContent(resp.data);
                    };
                });
            return ()=>{
                abortController.abort();
            }
    },[abortController,signal]);
    return (
        <Fragment>
            <section className={'row flex flex-w'}>

                {
                    pageContent['pageBanners'] &&
                    <PageBanners banners={pageContent.pageBanners} />

                }

                {
                    pageContent.contents &&
                    <PageContent contents={pageContent.contents}/>
                }

            </section>
        </Fragment>
    );
}

export default Home;