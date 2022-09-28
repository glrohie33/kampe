import {configureStore} from "@reduxjs/toolkit";
import Auth from "./reducers/auth";
import Cart from "./reducers/cart";
import Alert from  "./reducers/alertSlice";
import PaymentOptions from "./reducers/paymentOptions";


export default configureStore({
    reducer:{
        auth: Auth,
        cart:Cart,
        alert:Alert,
        paymentOptions:PaymentOptions
    }
})