import React from 'react';

const PriceProduct =({offerPrice,price})=>{

   if(offerPrice === undefined && price === undefined ) return <h4>loading...</h4>

    return(
        <>
        {(offerPrice === null ? 
            <span className="product-price">
            $ {price}
            </span>
            : 
            <span className="product-price">
            <del className="text-muted">$ {price}  </del>
                $ {offerPrice}
            </span>
        )}
        </>
    )
}

export default PriceProduct;