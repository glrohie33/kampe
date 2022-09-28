import {createElement} from 'react';
import ProductBox from "./productBox";
import ImageBox from "./imageBox";
import ProductView from "./productView";
import Flutterwave from "./flutterwave";
import ProductList from "./productList";

const elements ={
    'productBox':ProductBox,
    'imageBox':ImageBox,
    'productView': ProductView,
    'rave':Flutterwave,
    'productList':ProductList
}

export const CreateElement=(element,props)=>{
    if(element in elements){
        return createElement(elements[element],{...props})
    }
}