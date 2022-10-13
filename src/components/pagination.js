import React, {Fragment, useMemo} from 'react';
import PaginationLink from "./paginationLink";
import {
    ChevronLeft,
    ChevronRight, FirstPage,
    LastPage
} from "@mui/icons-material";

function Pagination({max,currentPage,total,numberOfViews=3,perPage=2}) {
    //this is to return 1 incase the start index goes to negative
    const startIndex = Math.max(currentPage - numberOfViews,1);
    const items = '2'.repeat(numberOfViews).split('');
    const totalPage = Math.ceil(total/perPage);
    const search = useMemo(()=>{
        return new URL(window.location).search;
    },[]);
    return (
        <Fragment>
            {
                (totalPage>1) &&
                <div className={'flex flex-center'}>

                    {
                        currentPage>1&&
                        <Fragment>
                            <PaginationLink search={search} name={'page'} value={1}>
                                <ChevronLeft  fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink search={search} name={'page'} value={currentPage - 1}>
                                <FirstPage fontSize={'small'}/>
                            </PaginationLink>
                        </Fragment>
                    }

                    {
                        items.map((item,index)=>(
                                <PaginationLink search={search} name={'page'}  key= {index} value={(startIndex+index)}>
                                    {
                                        (startIndex+index)
                                    }
                                </PaginationLink>
                            )
                        )
                    }

                    {
                        currentPage<totalPage&&
                        <Fragment>
                            <PaginationLink search={search} name={'page'} value={Number(currentPage) + 1}>
                                <ChevronRight fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink search={search} name={'page'} value={totalPage}>
                                <LastPage fontSize={'small'}/>
                            </PaginationLink>
                        </Fragment>
                    }

                </div>
            }

        </Fragment>

    );
}

export default Pagination;