import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {get, post} from "../actions/auth";
import {AUTHALERTNAME, ORDERURL} from "../utils/texthelper";
import {CreateElement} from "../components/createElement";
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/reducers/cart';
import { addAlert } from '../store/reducers/alertSlice';
import {toCurrency} from "../utils/functions";

function MakePayment(props) {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const {orderId} = useParams();
    const [order,setOders] = useState({});
    const loadOrders = ()=>{
        get(`${ORDERURL}/${orderId}`).then(res=>{
            const{order} = res.data
            if(order && order.paymentStatus != 'complete'){
                setOders(order);
            }
        }

        ).catch(err=>{

        });
    }

    const finishOrder = (data)=>{
        if(data){
            post(`${ORDERURL}/verifyOrder/${orderId}`,{
                data
            }).then(res=>{
                const {status} = res.data;
                if(status){
                    dispatch(clearCart());
                    dispatch(addAlert({name:AUTHALERTNAME,message:'Orders Successful',status:'success'}));
                    // navigate('/');
                }
            }).catch(e=>{
                console.log(e);
            })
        }
       
    }
const orderSummary = useMemo(()=>{
    const totalPrice = order.totalPrice ;
    const shippingPrice = order.shippingPrice;
    const grandTotal = order.grandTotal;
    const downPayment = order.downPayment;
    return {totalPrice,shippingPrice,grandTotal,downPayment}
},[order])
    useEffect(()=>{
        if(orderId){
            loadOrders();
        }
    },[]);
    return (
        <section className={'row checkout cart-view'}>
            <div className={'col flex flex-wrap'}>
                <div className={'col_8'}>
                    <div className="card">
                        <div className={'title'}>Cart</div>
                        <div className="content">
                            {
                                order.orderItems?.map(
                                    item=>(
                                        <div className="cart-item-container">
                                            <div className={'item-preview'}>
                                                <div className={'image-cover'}>
                                                    <img src={item.mainImage} alt={item.productName}/>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    <div className="product-details">
                                                        <h3>{item.productName}</h3>
                                                    </div>
                                                    <div className={"price-details"}>
                                                        <h3>{item.quantity} * { toCurrency(item.price)}</h3>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className={'title'}>Shipping Address</div>
                        <div className="content">
                            
                            <div className={'inner-col shipping-address'}>
                                    <div className="card">
                                        <div className="content flex flex-wrap">
                                            <div className="col_6">firstname: {order.shippingAddress?.firstName} </div>
                                            <div className="col_6">lastname: {order.shippingAddress?.lastName}</div>
                                            <div className="col_6">phone number: {order.shippingAddress?.phoneNumber}</div>
                                            {order.shippingAddress?.additionalPhoneNumber &&
                                                <div className="col_6">phone number2: {order.shippingAddress?.additionalPhoneNumber}</div>
                                            }
                                            <div className="col_12">address: {order.shippingAddress?.address}</div>
                                            <div className="col_4">state: {order.shippingAddress?.state}</div>
                                            <div className="col_4">city: {order.shippingAddress?.city}</div>
                                            <div className="col_4">town: {order.shippingAddress?.town}</div>
                                        </div>
                                    </div>
                            </div>
                                    
                        </div>
                    </div>
                </div>
                <div className={'col_4 side-bar'}>
                    <div className="card">
                        <div className={'title'}>Summary</div>
                        <div className="content">
                            <div >
                                <div className={'cart-summary'}>
                                    <p>Total</p>
                                    <h3>
                                        {
                                            toCurrency( orderSummary.totalPrice || 0)
                                        }
                                    </h3>
                                </div>
                                <div className={'cart-summary'}>
                                    <p>shippingPrice</p>
                                    <h3>
                                        {
                                           toCurrency( orderSummary.shippingPrice || 0)
                                        }
                                    </h3>
                                </div>
                                <div className={'cart-summary'}>
                                    <p>Grand Total</p>
                                    <h3>
                                        {
                                          toCurrency( orderSummary.grandTotal || 0 )
                                        }
                                    </h3>
                                </div>
                                <div className={'cart-summary'}>
                                    <p>Down Payment</p>
                                    <h3>
                                        {
                                            toCurrency( orderSummary.downPayment || 0 )
                                        }
                                    </h3>
                                </div>

                            </div>
                        </div>
                        <div className={'footer'}>
                            {
                                order.paymentGateway &&
                                CreateElement(order.paymentGateway,{
                                    order:order,
                                    finishOrder
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MakePayment;