import {createSlice} from "@reduxjs/toolkit";
import {BASKETNAME, CARTTYPE} from "../../utils/texthelper";
import {getCart} from "../../utils/functions";

const items = getCart();
const basket = window.localStorage.getItem(BASKETNAME);
export const baskets = {
    mini: {
        title: 'zoomba mini',
        min: 15000,
        max: 20000,
    },
    basic: {
        title: 'zoomba basic',
        min: 21000,
        max: 50000,
    },
    oga: {
        title: 'zoomba Oga',
        min: 51000,
        max: 100000,
    },
    igwe: {
        title: 'zoomba Igwe',
        min: 100000,
        max: Infinity,
    },
}
const cart = createSlice({
    name:"cart",
    initialState:{
        items,
        coupons:[],
        basket:basket,
        total:0.00,
    },
    reducers:{
        addItemToCart:(state,{payload})=>{
            const index = state.items.products.findIndex(item=>item.productId === payload.productId);
            state.items.creationTime = new Date().getTime();

            if(index > -1){
                    state.items.products[index] = payload;
                }else{
                    state.items.products.push(payload);
                }
                window.localStorage.setItem(CARTTYPE,JSON.stringify(state.items));
        },
        removeItemFromCart: (state,{payload})=>{
            const newItems = state.items.products.filter(i=>i.productId !== payload.productId);
            state.items.products = newItems;
            window.localStorage.setItem(CARTTYPE,JSON.stringify(state.items));
        },
        calculateTotal: (state)=>{
            const newTotal = state.items.reduce((a,b)=>a+b.amount,0);
            const coupons = state.coupons.reduce((a,b)=>a+b.amount,0);
            state.total = newTotal - coupons;
        },
        addCoupon:(state,{payload:{coupon}})=>{
            state.coupons = coupon;
            this.calculateTotal(state);
        },
        clearCart:(state)=>{
            state.items = {
                products:[],
                creationTime:null
            };
            state.coupons=[];
            state.total = 0.00;
            window.localStorage.removeItem(CARTTYPE);
        },
        setBasket:(state,{payload})=>{
            if (payload in baskets){
                state.basket = payload;
                window.localStorage.setItem(BASKETNAME,payload);
            }

        }
    }
})

export const {addItemToCart,removeItemFromCart,addCoupon,clearCart,setBasket} = cart.actions;

export default cart.reducer;