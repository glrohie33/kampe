import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Rating} from "@mui/material";
import {AddOutlined,RemoveOutlined} from "@mui/icons-material";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadPaymentOptions, post} from "../actions/auth";
import {AUTHALERTNAME, CARTTYPE, CARTURL} from "../utils/texthelper";
import {addAlert} from "../store/reducers/alertSlice";
import {addItemToCart, baskets, removeItemFromCart, setBasket} from "../store/reducers/cart";
import {toCurrency} from "../utils/functions";

function ProductView({content,paymentOptions,loadPaymentOptions}) {
    const dispatch = useDispatch();
    const productId = content.productDetails.id;
    const {items,basket }= useSelector(s=>s.cart);
    const [selection,setSelection] = useState({
        productId,
        quantity:0,
        options:[],
        cartType: CARTTYPE
    });
    const [mainImage,setMainImage] = useState(0);

    const inCart = useCallback(()=>{
        return items.products.find(item=>item.productId===productId);
    },[items,productId])

    useEffect(()=>{
           const product = inCart();
           if(product){
               setSelection(product);
           }
           loadPaymentOptions();
    },[inCart,loadPaymentOptions]);

    function selectBasket(event){
        const value = event.target.value;

        if(!(value  in baskets)){
            dispatch(addAlert({AUTHALERTNAME,message:'this basket is not a zoomba basket'}));
        }
        dispatch(setBasket(value))
    }

    const addToCart = ({target:{name,value}})=>{
           const formData = {...selection};
           formData.action = name;
           formData.quantity += Number(value);
           formData.basket = basket;
            post(CARTURL,formData).then(r => {
                const {message} = r.data;
                setSelection(formData);
                dispatch(addAlert({name:AUTHALERTNAME,message,status:'success'}))
                if(formData.quantity === 0){
                    dispatch(removeItemFromCart(formData))
                }else{
                    dispatch(addItemToCart(formData));
                }

            }).catch(e=>{
                const {message} = e.response.data;
                dispatch(addAlert({name:AUTHALERTNAME,message}))
            });
    }
    return (
        <Fragment>
            <div className="col flex-wrap no-padding-top flex product-description">
                <div className="col_9">
                    <div className="col no-padding-top">
                        <div className="card flex flex-wrap flex-row product-description-container">
                            <div className={'col_6 '}>
                                <div className="col product-image-container">
                                    <div className={'main-image-cover'}>
                                        <img src={content.productDetails?.productImages[mainImage].url} alt={'product'}/>
                                    </div>

                                    <div className={'thumbnails-cover'}>
                                        {
                                            content.productDetails?.productImages.map((img,ind)=>(
                                                <img src={img.url} alt={img.name} key={img.id} onClick={()=>setMainImage(ind)}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col_6 product-details-container">
                                <h3 className={'product-name'}>{content.productDetails?.name}</h3>
                                <p className={'brand'}>Brand: {content.productDetails?.brand.name}</p>
                                <h3 className={'price'}>{ toCurrency((content.productDetails?.price))} / {content.productDetails?.unit}</h3>
                                <p className={'rating-details col_6'}> <Rating value={0} className={'rating'}/> 0 Reviews</p>
                                <div>
                                    <select  onChange={selectBasket} className={'input form-control'} defaultValue={basket}>
                                        <option>Select Basket</option>
                                        {
                                            Object.keys(baskets).map((key)=>
                                                <option key={key} value={key}  >
                                                    {
                                                        baskets[key].title +'  '+toCurrency(baskets[key].min)+' - '+toCurrency(baskets[key].max)
                                                    }
                                                </option>)
                                        }
                                    </select>
                                </div>
                                <div className="buttons col_6">
                                    {
                                        (selection.quantity > 0)&&
                                        <div className="quantity-button">
                                            <button   className={'btn'} disabled={(selection.quantity === 0)}  onClick={()=>addToCart({target:{name:'dec',value:-1}})}><RemoveOutlined fontSize={'small'}/></button>
                                            <input type={'number'}  readOnly value={selection.quantity}/>
                                            <button disabled={(content.productDetails?.quantity === selection.quantity)}  className={'btn'} onClick={()=>addToCart({target:{name:'inc',value:+1}})}><AddOutlined fontSize={'small'}/></button>
                                        </div>

                                    }
                                    {
                                        (selection.quantity === 0)&&
                                        <button className={'btn add-to-cart btn-block'} onClick={addToCart} value={+1} name={'inc'}>Add to Cart</button>

                                    }
                                </div>

                                <p className={'info'}>{content.productDetails?.quantity||0} in Stock</p>
                                <p className={'info'}>Dispatch in 3-7 working days</p>

                            </div>
                        </div>
                    </div>

                    <div className={'col'}>
                        <div className={'card'}>
                            <div className={'title'}>Product Description</div>
                            <div className={'content'}>{content.productDetails?.description}</div>
                        </div>
                    </div>

                    <div className={'col'}>
                        <div className="card">
                            <div className="title">Specifications</div>
                            <div className="col flex flex-wrap">
                                <div className="col_6 inner-col">
                                    <div className="card descripition-cover">
                                        <div className="title">Key Features</div>
                                        <div className={'content'}>

                                            { content.productDetails?.features}
                                        </div>
                                    </div>
                                </div>
                                <div className="col_6 inner-col">
                                    <div className="card features-cover">
                                        <div className="title">Key Attributes</div>
                                        <div className={'content'}>
                                            <ul className={'features'}>
                                                {
                                                    Object.keys(content.productDetails?.attributes||{}).map(attribute=>(
                                                        <li>
                                                            <span className={'attribute-name'}>{attribute}: </span>
                                                            {content.productDetails.attributes[attribute].join(',')}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/*<div className={'col'}>*/}
                    {/*    <div className={'card'}>*/}
                    {/*        <div className={'title'}>Customers Feedback</div>*/}
                    {/*        <div className={'content'}>{content.productDetails?.description}</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className={'col_3 side-bar sm-none'}>
                        <div className="col no-padding-top">
                            <div className="card">
                                <div className={'title'}>Payment Options</div>
                                <div className="content">
                                    {

                                        <div className={'paymentSummary'}>
                                            <table>
                                                <tr><th>Name</th><th>Down Payment</th><th>% Rate</th></tr>
                                                {
                                                    paymentOptions.map(option=>(
                                                        <tr key={option.id}>
                                                            <td className={'title'}>{option.name}</td>
                                                            <td className={'down-perc'}>{ toCurrency(((content.productDetails?.price * (option.downPercent/100)) * (selection.quantity || 1)))}</td>
                                                            <td className={'down-perc'}>{ option.interestRate}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </table>
                                        </div>

                                    }
                                </div>

                            </div>
                        </div>

                    </div>
            </div>
        </Fragment>
    );
}
function mapStateToProps(store){
    const {paymentOptions} = store;
    return {paymentOptions:paymentOptions.data}
}
export default  connect(mapStateToProps,{loadPaymentOptions})(ProductView) ;