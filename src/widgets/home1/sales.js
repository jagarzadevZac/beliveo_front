import React, { useState ,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import { FILTER_PRODUCT } from '../../graphql/queries/products';
import { useQuery } from '@apollo/client'; 
import InformationProductCard from '../../components/ProductInformationComponentCard';
import InformationProductOnModal from '../../components/ModalDetailProduct';
import GifLoaderComponent from '../../gifLoader/gifloaderComponent';
import NoData from '../../components/NoData';
 
function ProductsOffers({start,limit}){

    const [Accion, setAccion] = useState(false);
    const [viewproduct, setviewproduct] = useState("");
    const [categorias, setCategorias] = useState({});
    const [dataOffers, setdataOffers] = useState({});
    const { data , loading} = useQuery(FILTER_PRODUCT, {
        variables:{
            start:start,
            limit:limit,
            where: {
                Status:1,
                PrecioOferta_ne:null
            }    
        }
    });

    useEffect(() => {
        if(data){
            setdataOffers(data.productosConnection.values);
        }
    }, [data]);


    const quickview =()=> {
        setAccion(!Accion);
    }
     
    const toggle = () => setAccion(!Accion);
 
    const onClickQuickView = (product) =>{
        setAccion(true);
        setviewproduct(product);
        setCategorias(product.categorias);
    }

    if(loading) return <Col xl={12} lg={12} md={12} key={"gifDataOffers"}  className="text-center"><GifLoaderComponent /></Col>;

    return (
        <>
        {dataOffers.length > 0 ?
        <>
            <ToastContainer autoClose={900} />
            {dataOffers.length !== undefined && dataOffers.map((producto, i) => (
                <Col xl={3} lg={4} md={6} key={i}>
                    <InformationProductCard 
                        producto={producto} 
                        onClickQuickView={onClickQuickView} 
                    />
                </Col>
            ))}
           
            <InformationProductOnModal 
                Accion={Accion} 
                toggle={toggle} 
                viewproduct={viewproduct} 
                quickview={quickview} 
                categorias={categorias} 
            />
        </>
        :
        <Col xl={12} lg={12} md={12} key={"noDataOffers"}  className="text-center">
           
            <NoData />
        
        </Col>
        }
        </>
    );
}

export default React.memo(ProductsOffers);