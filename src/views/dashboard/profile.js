import React, {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {get} from "../../actions/auth";
import {USERSPROFILE} from "../../utils/texthelper";
import {Edit} from "@mui/icons-material";

function Profile(props) {
    const {data:{user={}}} = useOutletContext();
    return (
    <div className="flex flex-grow flex-wrap">
        <div className="col_6 details">
            <div className="box">
                <div className="title ">
                    <h3>Account Details</h3>
                    <a className={'icon'}><Edit fontSize={'small'}/></a>
                </div>
                <div className="content">
                    <p className={'capitalize text-bold'}>{`${user.firstname} ${user.lastname}`}</p>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                </div>

            </div>
        </div>
        <div className="col_6 details">
            <div className="box">
                <div className="title">
                    <h3>Address</h3>
                    <a className={'icon'}><Edit fontSize={'small'}/></a>
                </div>
                <div className="content">
                    <span><i>This is your default shipping address</i></span>
                    <p className={'capitalize text-bold'}>{`${user.defaultAddress?.data?.firstName} ${user.defaultAddress?.data?.lastName}`}</p>
                    <p>{user.defaultAddress?.data?.address}</p>
                    <p>{user.defaultAddress?.data?.phoneNumber}</p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Profile;