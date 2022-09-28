import React, {Fragment} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import PaginationLink from "./paginationLink";
import {
    ArrowBack,
    ArrowBackTwoTone,
    ArrowForwardTwoTone,
    ChevronLeft,
    ChevronRight, FirstPage,
    LastPage
} from "@mui/icons-material";

function Pagination({max,currentPage,total,numberOfViews=3,perPage=2}) {
    //this is to return 1 incase the start index goes to negative
    const startIndex = Math.max(currentPage - numberOfViews,1);
    const items = '2'.repeat(numberOfViews).split('');
    const totalPage = Math.ceil(total/perPage);
    const pageUrl = window.location.href;
    return (
        <Fragment>
            {
                (totalPage>1) &&
                <div className={'flex flex-center'}>

                    {
                        currentPage>1&&
                        <Fragment>
                            <PaginationLink name={'page'} value={''}>
                                <ChevronLeft  fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink name={'page'} value={currentPage - 1}>
                                <FirstPage fontSize={'small'}/>
                            </PaginationLink>
                        </Fragment>
                    }

                    {
                        items.map((item,index)=>(
                                <PaginationLink name={'page'} value={(startIndex+index)}>
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
                            <PaginationLink name={'page'} value={currentPage+1}>
                                <ChevronRight fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink name={'page'} value={totalPage}>
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