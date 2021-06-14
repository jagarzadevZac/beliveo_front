import React, { useState ,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { Row, Col } from 'reactstrap';
import { FILTER_PRODUCT } from '../../graphql/queries/products';
import { useQuery } from '@apollo/client'; 
import InformationProductCard from '../../components/ProductInformationComponentCard';
import InformationProductOnModal from '../../components/ModalDetailProduct';

function RatingProducts(){

    const [Accion, setAccion] = useState(false);
    const [viewproduct, setviewproduct] = useState("");
    const [categorias, setCategorias] = useState({});
    const [dataRating, setdataRating] = useState({});
    const { data } = useQuery(FILTER_PRODUCT, {
        variables: { 
            start: 0,
            limit: 8,
            where: {
                Status:1,
                rating_gte :20,
                rating_lte :30
            }
        }
    });

    useEffect(() => {
        if(data){
            setdataRating(data.productosConnection.values);
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

    return (
        <>
           <Row>
            <ToastContainer autoClose={900} />
            {dataRating.length !== undefined && dataRating.map((producto, i) => (i < 8) ?
                <Col xl={3} lg={4} md={6} key={i}>
                    <InformationProductCard 
                        producto={producto} 
                        onClickQuickView={onClickQuickView} 
                    />
                </Col>
                :
                <div key={i}></div>
            )}
            </Row>
            <InformationProductOnModal 
                Accion={Accion} 
                toggle={toggle} 
                viewproduct={viewproduct} 
                quickview={quickview} 
                categorias={categorias} 
            />
        </>
        
    );
}


export default React.memo(RatingProducts);