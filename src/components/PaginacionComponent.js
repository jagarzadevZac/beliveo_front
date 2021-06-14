import React from 'react';
import { Button } from 'reactstrap';

const Paginacion = ({currentPage,totalPages, PreviusProduct,NextProduct,setCurrentPage}) =>{

    return(
        <>
            <Button 
                onClick={()=>{
                    PreviusProduct();
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
                {currentPage} 
                of 
                {totalPages}
            </Button>
            <Button 
                onClick={()=>{
                    NextProduct();
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

export default Paginacion;