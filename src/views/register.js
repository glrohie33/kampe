import React,{useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {Link, useLocation, useNavigate,  useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {post} from "../actions/auth";
import {AUTHALERTNAME,REGISTRATIONENDPOINT, SUCCESSALERT, WARNINGALERT} from "../utils/texthelper";
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

    const [search] = useSearchParams();
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        firstname:"",
        lastname:"",
        username:"",
        referee: search.get('referee') || ""
    })
    const [buttonDisabled] = useState(false);
    const setData = ({target:{name,value}})=>{
        setForm(v=>({...v,[name]:value}));
    }

    function  handleSubmit(){
        post(REGISTRATIONENDPOINT,form).then(resp=>{
            if(resp.status){
                const {status}= resp.data

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
            <div className={'flex flex-wrap col_12 login-container align-center'}>
                <div className={'col_7 sm-none'}>

                </div>
                <div className={'col_5'}>
                    <div className={'card'}>
                        <div className="login-box">
                            <h3>
                                Register
                            </h3>
                            <TextField value={form.firstname} name="firstname" size={'small'} required label="Firstname" onChange={setData} />
                            <TextField value={form.lastname}  name="lastname" size={'small'} required label="Lastname" onChange={setData} />
                            <TextField  value={form.username} name="username" size={'small'} required label="Username" onChange={setData} />
                            <TextField value={form.phone} name="phone" size={'small'} required label="Phone" onChange={setData} />
                            <TextField value={form.email} name="email" size={'small'} required label="Email" onChange={setData} />
                            <TextField value={form.password}  name="password" size={'small'} required label="Password" type="password" onChange={setData} />
                            <TextField value={form.confirmPassword} name="confirmPassword" size={'small'} required label="Confirm Password" type="password" onChange={setData} />
                            <TextField  value={form.referee} name="referee" size={'small'} required label="Referee Username"  onChange={setData} />
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