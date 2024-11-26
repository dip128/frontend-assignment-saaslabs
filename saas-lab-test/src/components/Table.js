import React, { useEffect, useMemo, useState } from 'react'
import PaginationComp from './PaginationComp';




function Table({ PageSize = 5 }) {

    const [infoList, setInfoList] = useState({
        isLoading: false,
        infoDetails: []
    });
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return infoList?.infoDetails?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, infoList,PageSize]);

    useEffect(() => {
        setInfoList({
            isLoading: true,
            infoDetails: []
        })
        fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
            .then((res) => res.json())
            .then((res) => {
                setInfoList({
                    isLoading: false,
                    infoDetails: [...res]
                })
            })
            .catch((err) => {
                console.error(err)
                setInfoList({
                    isLoading: false,
                    infoDetails: []
                })
    })
    }, [])


    const { isLoading,infoDetails } = infoList;
    if(isLoading) {
        return <>Loading...</>
    }
    return (
        <section style={{ width: '80%', display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
            <table className='custom-table'>
                <thead className='custom-head-style' >
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                </thead>
                <tbody className='body-style'>
                    {currentTableData.map(item => {
                        return (
                            <tr>
                                <td>{item?.['s.no']}</td>
                                <td>{item?.['percentage.funded']}</td>
                                <td>{item?.["amt.pledged"]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br/>
            <PaginationComp 
                currentPage={currentPage}
                totalCount={infoDetails?.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />


        </section>
    )
}

export default Table