import React from 'react';
import { Button } from 'reactstrap';

const Pagination = ({currentPage, totalPages, PreviousPage, NextPage, setCurrentPage}) =>{
    // Show only two or more pages
    if (parseInt(totalPages) < 2) return('');

    return(
        <>
            <Button 
                onClick={()=>{
                    PreviousPage();
                    setCurrentPage(currentPage === 1 ? 1 : currentPage -1 );}
                } outline color="primary" 
                size="sm"
            >
                Previous
            </Button>
            <Button 
                color="link" 
                size="sm"
            >
                <p style={{paddingTop: '15px'}}>{currentPage} of {totalPages}</p>
            </Button>
            <Button 
                onClick={()=>{
                    NextPage();
                    setCurrentPage(currentPage === totalPages ? currentPage : currentPage +1 )}
                } outline 
                color="primary" 
                size="sm"
            >
                Next
            </Button>
        </>
    )

}

export default Pagination;