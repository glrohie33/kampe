import React, {Fragment, useEffect, useMemo, useState} from 'react';
import menu from "../assets/images/menu.svg";
import logo from "../assets/images/logo_9.png";
import "../assets/css/header.css";
import cart from "../assets/images/cart.svg";
import search from "../assets/images/search.svg";
import profile from "../assets/images/user.svg";
import {Link, useNavigate} from "react-router-dom";
import {closeMenu, openMenu, zoomba} from "../utils/functions";
import {connect, useSelector} from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';
import {logoutUser} from "../store/reducers/auth";
import {get} from "../actions/auth";
import {TOPCATEGORIES} from "../utils/texthelper";
import TopCategories from "./topCategories";
function Header({logoutUser}) {
    const cart = useSelector(s=>s.cart.items.products)
    const auth = useSelector(store=>store.auth);
    const [categories,setCategories] = useState([]);
    const navigate = useNavigate();

    function loginButton(){
        return auth.isLogin?
            <button onClick={()=>{logoutUser()}}  className={'btn-block btn login-btn'}> Logout</button>
            :
            <a  href={'/login'} className={'btn-block btn login-btn'}> Login </a>

    }

    function loadCategories (){
        get(TOPCATEGORIES)
            .then(resp=>{
            const {status,categories}=resp.data;
                if(status){
                    setCategories(categories);
                }
        }).catch(e=>{

        })
    }


    useEffect(()=>{
            loadCategories();
    },[])
    return (
        <Fragment>
            <header>
                <section className={'row'}>
                        <div className={'menu-icon icons'}>
                            <svg viewBox={"0 0 24 24"} className={'menu-btn'}>
                                <use xlinkHref={`${menu}#menu`}>
                                </use>
                            </svg>
                            <TopCategories categories={categories} />
                        </div>
                        <div className={'logo-cover'}>
                            <a href="/">
                                <img src={logo} alt="zoomba logo"/>
                            </a>
                        </div>
                        <div className={'search-bar'}>
                            <input type={'text'} placeholder={'Search for Products...'}/>
                            <span className={'search-icon icons'}>
                                <svg viewBox={'0 0 24 24'}>
                                <use xlinkHref={`${search}#search`}>
                                </use>
                            </svg>
                            </span>
                        </div>
                    <div className="other-menus">
                        <div className={'flex flex-center menu-cover'}>
                            <button  onClick={()=>{openMenu('login-menu')}} onBlur={()=>{
                                closeMenu('login-menu')
                            }}  className={'menu-controller flex align-center text-center cart-icon'} >
                                <span className={'icons'}>
                                    <svg viewBox={'0 0 24 24'}>
                                        <use xlinkHref={`${profile}#user`}></use>
                                    </svg>
                                </span>
                                <span className={'text'}>My Dashboard</span>
                            </button>
                            <div className={'menu login-menu'} id={'login-menu'} aria-label={'login-menu'}>
                                <div className={'login-btn-cover'}>
                                    {
                                        loginButton()
                                    }

                                </div>

                                <Link to={ '/dashboard'} className={'flex align-center'}>
                                <span className={'icons icon-md'}>
                                    <svg viewBox={'0 0 24 24'}>
                                        <use xlinkHref={`${profile}#user`}></use>
                                    </svg>
                                </span>My Dashboard</Link>
                                <Link to={'/orders'} className={'flex align-center'}>My Orders</Link>
                            </div>
                        </div>
                        <div className={'flex flex-center'}>
                            <a href={"/cart"} className={'flex align-center text-center cart-icon'}>
                                <span className={'icons'}>
                                    <ShoppingCart/>
                                    <p className='cart-count'>{cart.length}</p>
                                </span>
                                <span className={'text'}>Cart</span>

                            </a>
                        </div>
                    </div>

                </section>
            </header>
        </Fragment>
    );
}

export default connect(null,{logoutUser})(Header);