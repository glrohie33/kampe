import React, {useMemo} from 'react';

function PaginationLink({value,name,children,search="",isCurrent=false}) {
    const url = useMemo(()=>{
        const newurl = new URLSearchParams(search);
        if (newurl.has('currentPage')){
            newurl.set('currentPage',value);
        }else{
            newurl.append('currentPage',value);
        }
        return newurl.toString();
    },[search,value]);

    return (
        <a href={`?${url}`} className={`btn pg-btn ${isCurrent?'btn-orange':'btn-default'}`}>
            {
                children
            }
        </a>
    );
}

export default PaginationLink;