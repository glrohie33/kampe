import {get} from "../../actions/auth";
import {USERDATAURL, USERSORDERS, USERSPROFILE} from "../../utils/texthelper";
import {memo, useState, useEffect, useCallback} from "react";
import {useSearchParams} from "react-router-dom";
const urls = {
    profile: USERSPROFILE,
    orders: USERSORDERS,
    shippingaddress: `${USERDATAURL+'/all'}?datatype=shippingAddress`
}


function ProfilePages({page,render}) {

    const [searchParams] = useSearchParams();
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
        const search = searchParams.get('currentPage') || 1;
        loadData(search);
    },[page,loadData,searchParams])
    return (
        <>
            {
                render(data||[],loadData)
            }
        </>
    );
}

export default memo(ProfilePages)