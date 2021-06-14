import React, { useState } from 'react';
import {ToastContainer } from 'react-toastify'; 
import InformationProductCard from '../../components/ProductInformationComponentCard';
import InformationProductList from '../../components/ProductInformationComponentList';
import InformationProductOnModal from '../../components/ModalDetailProduct';
import GifLoaderComponent from '../../gifLoader/gifloaderComponent';

function ListProducts (props){
    
    const { productdata } = props;
    const { col_lg } = props;
    const { loading } = props;
    let layout = localStorage.getItem("ProductLayout");
    const [Accion, setAccion] = useState(false);
    const [viewproduct, setviewproduct] = useState("");
    const [categorias, setCategorias] = useState({});

    const quickview =()=> {
       setAccion(!Accion);
    }
    
    const toggle = () => setAccion(!Accion);

    const onClickQuickView = (product) =>{
        setAccion(true);
        setviewproduct(product);
        setCategorias(product.categorias);
    }
  
    const ShowProducts = ()=>{
        return(
            <>
            {(layout ===  'Listing') ?
                <InformationProductList 
                    producto={productdata} 
                    onClickQuickView={onClickQuickView} 
                />                    
                :
                <div className={`col-lg-${col_lg} col-md-6`} >
                    <InformationProductCard 
                        producto={productdata} 
                        onClickQuickView={onClickQuickView} 
                    />
                </div>
            }
            </>
        )
    }

    if(loading) return <GifLoaderComponent/>;
    
    return(
        <>
            <ToastContainer autoClose={900} />
            <>
                <ShowProducts />
            </>
            <InformationProductOnModal 
                Accion={Accion} 
                toggle={toggle} 
                viewproduct={viewproduct} 
                quickview={quickview} 
                categorias={categorias} 
            />
        </>
    )
}

export default React.memo(ListProducts);