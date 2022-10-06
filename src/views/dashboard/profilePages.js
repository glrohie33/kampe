import {get} from "../../actions/auth";
import {USERDATAURL, USERSORDERS, USERSPROFILE} from "../../utils/texthelper";
import {memo, useState, useEffect, useCallback} from "react";
const urls = {
    profile: USERSPROFILE,
    orders: USERSORDERS,
    shippingaddress: `${USERDATAURL+'/all'}?datatype=shippingAddress`
}


function ProfilePages({page,render}) {


    const [data,setData] = useState([]);
    const loadData = useCallback((currentPage=1)=>{
        get(`${urls[page]}?currentPage=${currentPage}&perPage=10`).then(({status,data})=>{
            if(status){
                setData(data);
            }
        }).catch(e=>{
            console.log(e)
        })
    },[page]);
    useEffect(()=>{
        loadData();
    },[page,loadData])
    return (
        <>
            {
                render(data||[],loadData)
            }
        </>
    );
}

export default memo(ProfilePages)