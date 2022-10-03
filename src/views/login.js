import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTHALERTNAME, LOGINENDPOINT, SUCCESSALERT, WARNINGALERT} from "../utils/texthelper";
import {post} from "../actions/auth";
import {addAlert} from "../store/reducers/alertSlice";
import {loginUser} from "../store/reducers/auth";

function Login(props) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const auth = useSelector(store=>store.auth);
    useEffect(()=>{
        if(auth.isLogin){
            navigate(state?.path || '/');
        }
    },[auth, navigate, state?.path]);


    const dispatch = useDispatch();
    const [form,setForm] = useState({
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const setData = ({target:{name,value}})=>{
        setForm(v=>({...v,[name]:value}));
    }

    useEffect(()=>{
        if(form.email.length > 0 && form.password.length > 0){
            setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    },[form])

    function  handleSubmit(){
        post(LOGINENDPOINT,form).then(resp=>{
            if(resp.status){
                const {status,user}= resp.data

                if(status){
                    dispatch(addAlert({
                        name:AUTHALERTNAME,
                        message:'Success! you will be redirected soon',
                        status:SUCCESSALERT
                    }));
                    setTimeout(()=>{
                        dispatch(loginUser({user}));
                    },3000)
                }
            }

        }).catch(e=>{
            console.log(e);
            const respData = e.response.data;
            dispatch(addAlert({
                name:AUTHALERTNAME,
                message: respData.message,
                status:WARNINGALERT
            }))
        })
    }

    return (
        <section className="row">
            <div className="col">
                <div className={'flex flex-wrap col_12 login-container align-center'}>
                    <div className={'col_7 sm-none'}>

                    </div>
                    <div className={'col_5'}>
                        <div className={'card'}>
                            <div className="login-box">
                                <h3>
                                    Login
                                </h3>
                                <TextField name="email" size={'small'} required label="Email" onKeyUp={setData} />
                                <TextField  name="password" size={'small'} required label="Password" type="password" onKeyUp={setData} />
                                <div className={'col forgot-password'}>
                                    <div className={'col_6'}>

                                    </div>
                                    <div className={'col_6'}>
                                        <Link to={'/forgot-password'}>
                                            Forgot Password
                                        </Link>
                                    </div>
                                </div>
                                <button disabled={buttonDisabled} className={'btn btn-block'} onClick={handleSubmit}>
                                    Login
                                </button>
                                <div className={'col no-padding-top'}>
                                    <div className={'col_12 isL'}>
                                        <p>Don't have an account? <a href='/register' >Sign Up</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Login;