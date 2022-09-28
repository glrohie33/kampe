import React,{useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {post} from "../actions/auth";
import {AUTHALERTNAME, LOGINENDPOINT, REGISTRATIONENDPOINT, SUCCESSALERT, WARNINGALERT} from "../utils/texthelper";
import {addAlert} from "../store/reducers/alertSlice";
function Register()
{
    const {state} = useLocation();
    const navigate = useNavigate();
    const auth = useSelector(store=>store.auth);
    useEffect(()=>{
        if(auth.isLogin){
            navigate(state?.path || '/');
        }
    },[auth, navigate, state?.path]);

    const {referee} = useDispatch();
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        firstname:"",
        lastname:"",
        username:"",
        refereeUsername: referee || ""
    })
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const setData = ({target:{name,value}})=>{
        setForm(v=>({...v,[name]:value}));
    }

    function  handleSubmit(){
        post(REGISTRATIONENDPOINT,form).then(resp=>{
            if(resp.status){
                const {status,user}= resp.data

                if(status){
                    dispatch(addAlert({
                        name:AUTHALERTNAME,
                        message:'Success! you will be redirected soon',
                        status:SUCCESSALERT
                    }));
                    setTimeout(()=>{
                        navigate('/login');
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


    return  <section className="row">
        <div className="col">
            <div className={'flex col_12 login-container align-center'}>
                <div className={'col_7'}>

                </div>
                <div className={'col_5'}>
                    <div className={'card'}>
                        <div className="login-box">
                            <h3>
                                Register
                            </h3>
                            <TextField name="firstname" size={'small'} required label="Firstname" onKeyUp={setData} />
                            <TextField name="lastname" size={'small'} required label="Lastname" onKeyUp={setData} />
                            <TextField name="username" size={'small'} required label="Username" onKeyUp={setData} />
                            <TextField name="phone" size={'small'} required label="Phone" onKeyUp={setData} />
                            <TextField name="email" size={'small'} required label="Email" onKeyUp={setData} />
                            <TextField  name="password" size={'small'} required label="Password" type="password" onKeyUp={setData} />
                            <TextField  name="confirmPassword" size={'small'} required label="Confirm Password" type="password" onKeyUp={setData} />
                            <TextField name="referee" size={'small'} required label="Referee Username"  onKeyUp={setData} />
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
                                Register
                            </button>
                            <div className={'col no-padding-top'}>
                                <div className={'col_12 isL'}>
                                    <p>have an account? <a href='/login' >Sign In</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Register;