import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {DEFAULTHEADERS, PAGEURL} from "../utils/texthelper";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";
import {useDispatch} from "react-redux";
import {setBasket} from "../store/reducers/cart";
import {Parser} from "html-to-react";
import {Helmet} from "react-helmet";
const htmlToReact = new Parser();

function PageView() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [content,setPageContent] = useState({});
    const [search] = useSearchParams();

    const loadPage = useCallback((param)=>{
        const query = new URL(window.location).search;
        // get(`${PAGEURL}/${param}${query}`)
        //     .then(resp=>{
        //         if(resp.status){
        //             setPageContent(resp.data);
        //         }
        //     }).catch();

        fetch(`${PAGEURL}/${param}${query}`)
            .then(resp=>resp.json())
            .then(resp=>{
                setPageContent(resp);
            })
            .catch(e=>console.log(e));
    },[setPageContent]);

    useEffect(()=>{
        loadPage(slug);
        if (search.get('basket')) {
            dispatch(setBasket(search.get('basket')))
        }
    },[slug,search,dispatch,loadPage])

    const headers = useMemo(()=>{

        let {title,keywords,description,image} = DEFAULTHEADERS;
        const url = window.location;
        if(content.view === 'productView'){
            const {productDetails:{tags,description:productDescription,name,mainImage}} = content;
            keywords = tags.join(',');
            description = productDescription.replace(/(?:\\[rn])+/g, "");
            title= `Zoomba Kampe || ${name}`;
            image= mainImage;
        }

        return(<Helmet>
                    <title>{title}</title>
                    <meta name='description' content={description}/>
                    <meta name={'keywords'} content={keywords}/>
                    <meta name={'site_name'} content={'Zoomba Nigeria'}/>
                    <meta name={'image'} content={image}/>
                    <meta name={'title'} content={title}/>
                <meta name={'url'} content={url}></meta>
                    {/*schema markup for google+*/}
                    <meta itemProp='description' content={description}/>
                    <meta itemProp={'keywords'} content={keywords}/>
                    <meta itemProp={'site_name'} content={'Zoomba Nigeria'}/>
                    <meta itemProp={'image'} content={image}/>
                    {/*twitter card */}
                    <meta name={'twitter:card'} content={'summary_large_image'}/>
                    <meta name={'twitter:title'} content={title}/>
                    <meta name={'twitter:description'} content={'Zoomba Nigeria'}/>
                    <meta name={'twitter:image:src'} content={image}/>

                    {/*    open Graph*/}
                    <meta property='og:description' content={description}/>
                    <meta property={'og:keywords'} content={keywords}/>
                    <meta property={'og:site_name'} content={'Zoomba Kampe'}/>
                    <meta property={'og:image'} content={image}/>
                    <meta property={'og:title'} content={title}/>
                <meta property={'og:url'} content={url}/>

            </Helmet>
            )

    },[content])

    return (
        <>
            {
                headers
            }
            <section className={'row'}>
                <p>
                    {headers}
                </p>
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
        </>

    );
}

export default PageView;
