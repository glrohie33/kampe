import React from 'react';
import {useOutletContext} from "react-router-dom";
import {formatDate, toCurrency} from "../../utils/functions";
import OrderItems from "./orderItems";
import Pagination from "../../components/pagination";

function Orders(props) {
    const {data} = useOutletContext();
  const  {orders=[],perPage,currentPage,total} = data?.orders || {};

    return (
        <>
            <div className={'flex flex-wrap'}>
            {
                orders?.map(order=>(
                    <div className={'col_12'} key={order.id}>
                        <div className="col">
                            <div className="card order-item">
                                <div className="title">
                                    <h3>{order.paymentStatus}</h3>
                                    <div className="order-data">
                                        <span className={'date'}>
                                            Order Date: {formatDate(order.createdAt)}
                                        </span>

                                    </div>
                                </div>
                                <div className="content">
                                    <OrderItems items={order.orderItems}/>
                                </div>
                                <div className="footer">
                                    <h3 className={'payment-gateway'}>{toCurrency(order.grandTotal)}</h3>
                                    <a className={'btn'} href={'/orders/'}>View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
            <Pagination currentPage={currentPage} perPage={perPage} total={total} />
        </>

    );
}

export default Orders;