import {get} from "../../actions/auth";
import {USERDATAURL, USERSORDERS, USERSPROFILE} from "../../utils/texthelper";
import {memo, useState,useEffect} from "react";
const urls = {
    profile: USERSPROFILE,
    orders: USERSORDERS,
    shippingaddress: `${USERDATAURL+'/all'}?datatype=shippingAddress`
}


function ProfilePages({page,render}) {
    useEffect(()=>{
        loadData();
    },[page])

    const [data,setData] = useState([]);
    function loadData(){
        get(urls[page]).then(({status,data})=>{
            if(status){
                setData(data);
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    return (
        <>
            {
                render(data||[])
            }
        </>
    );
}

export default memo(ProfilePages)