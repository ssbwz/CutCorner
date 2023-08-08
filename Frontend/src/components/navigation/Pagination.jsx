import Pagination from 'react-bootstrap/Pagination';
import usersServer from '../../services/usersServer';
import { useEffect, useState } from 'react';

function AdvancedExample(props) {
    function setPage(e, pageNumber) {
        e.preventDefault()
        if (pageNumber > 0 && pageNumber <= props.lastPageNumber) {
            props.setPageNumber(pageNumber)
        }
    }

    return (
        <Pagination>
            <Pagination.First onClick={e => setPage(e, 1)} />
            <Pagination.Prev onClick={e => setPage(e, props.pagenumber - 1)} />
            <Pagination.Item active>{props.pagenumber}</Pagination.Item>
            <Pagination.Next onClick={e => setPage(e, props.pagenumber + 1)} />
            <Pagination.Last onClick={e => setPage(e, props.lastPageNumber)} />
        </Pagination>
    );
}

export default AdvancedExample;