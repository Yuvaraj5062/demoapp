import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

const firstIndex = 0;

const CustomPagination = ({data, pagesize, updateData}) => {
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPageSize(pagesize)
        setCount(Math.ceil(data && data.length / pagesize))
        if(data.length>0){
        let updatedData = data.slice(firstIndex , pagesize * 1)
        updateData(updatedData)
        }
    },[data])
    const handlePageChange = (e,value) => {
        setPage(value);
        if(data.length>0){
        let updatedData = data.slice(firstIndex + pageSize * (value - 1), pageSize * value)
        updateData(updatedData)
        }
    }
    return(
        <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Pagination
                size="large"
                variant="outlined"
                color="secondary"
                className="primary"
                count={count}
                page={page}
                onChange={handlePageChange}
              />
            </div>
        </div>
    )
}

export default CustomPagination;