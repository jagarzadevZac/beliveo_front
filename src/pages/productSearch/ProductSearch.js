import React , {useState,useEffect} from 'react';
import NoData from '../../components/NoData';
import { useLazyQuery } from '@apollo/client';
import { FILTER_PRODUCT ,COUNT_PRODUCTS } from '../../graphql/queries/products';
import { Col, Container, Row } from 'reactstrap';
import InformationProductCard from '../../components/ProductInformationComponentCard';
import InformationProductOnModal from '../../components/ModalDetailProduct';
import Paginacion from '../../components/PaginacionComponent';
import SlideBarCategoires from '../../widgets/filter/SlidebarCategory';
import GifLoaderComponent from '../../gifLoader/gifloaderComponent'; 

function ProductSearchByIdName(props){
    
    const { match: { params } } = props;
    const [dataResult, setdataResult] = useState({});
    const [Accion, setAccion] = useState(false);
    const [viewproduct, setviewproduct] = useState("");
    const [categorias, setCategorias] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [startValue , setStartValue ] = useState(0);
    const [idcategoria, setIdcategoria] = useState("");
    const [word, setWord] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ProductParPage = 20; 

    if(params.id !== idcategoria){
        setStartValue(0);
        setCurrentPage(1);
        setIdcategoria(params.id);
    }else if(params.word !== word){
        setStartValue(0);
        setCurrentPage(1);
        setWord(params.word);
    }

    const [search,{loading}] = useLazyQuery(FILTER_PRODUCT ,{
        onCompleted(data){
            setdataResult(data.productosConnection.values);
        }
    });

    const [countSearch] = useLazyQuery(COUNT_PRODUCTS,{
        onCompleted: (datacount) =>{
            setTotalPages(Math.ceil( datacount.productosConnection.values.length/ProductParPage));
        }
    });
   
    useEffect(() => {
            if(params.id === "All"){
                search({
                    variables: {
                        sort: "Nombre:asc",
                        start:startValue,
                        limit:ProductParPage,
                        where: {
                            Status:1,
                            Nombre_contains:(params.word === "All" ? "" : params.word),
                        }
                    }
                });

                countSearch({
                    variables: {
                        sort: "Nombre:asc",
                        where: {
                            Status:1,
                            Nombre_contains:(params.word === "All" ? "" : params.word),
                        }
                    }
                });
            }else{
                search({
                    variables: {
                        sort: "Nombre:asc",
                        start:startValue,
                        limit:ProductParPage,
                        where: {
                            Status:1,
                            Nombre_contains:(params.word === "All" ? "" : params.word),
                            categorias: {id:parseInt(params.id)}
                        }
                    }
                });

                countSearch({
                    variables: {
                        sort: "Nombre:asc",
                        where: {
                            Status:1,
                            Nombre_contains:(params.word === "All" ? "" : params.word),
                            categorias: {id:parseInt(params.id)}
                        }
                    }
                });
            }
    }, [params.id, search, params.word, startValue, countSearch]);


    const quickview =()=> {
        setAccion(!Accion);
    }
    
    const toggle = () => setAccion(!Accion);

    const onClickQuickView = (product) =>{
        setAccion(true);
        setviewproduct(product);
        setCategorias(product.categorias);
    }

    const PreviusProduct = ()=>{
        if(startValue > 0){
            let result = startValue -ProductParPage;
            setStartValue(result);
        }
    }

    const NextProduct = ()=>{
        if( currentPage !== totalPages){
            setStartValue(ProductParPage * currentPage);
        }
    }

    if(loading) return <GifLoaderComponent />;

    return(
        <>
            <div className="page-content">
                <section>
                    <Container>     
                        <Row>
                            {dataResult.length > 0 ?
                            <>
                                <div className="col-lg-9 col-md-12">
                                    <Row>
                                        {dataResult.length !== undefined && dataResult.map((producto, i) => (
                                            <Col xl={3} lg={4} md={6} key={i}>
                                                <InformationProductCard 
                                                    producto={producto} 
                                                    onClickQuickView={onClickQuickView} 
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <div className="text-center col-12">
                                            <Paginacion 
                                                currentPage={currentPage} 
                                                setCurrentPage={setCurrentPage} 
                                                totalPages={totalPages}
                                                NextProduct={NextProduct} 
                                                PreviusProduct={PreviusProduct} 
                                            />
                                        </div>
                                    </Row>
                                    <InformationProductOnModal 
                                        Accion={Accion} 
                                        toggle={toggle} 
                                        viewproduct={viewproduct} 
                                        quickview={quickview} 
                                        categorias={categorias} 
                                    />
                                </div>
                                <Col lg={3} md={12}  className="sidebar mt-8 mt-lg-0">
                                    <SlideBarCategoires />
                                </Col>
                            </>
                            :
                                <NoData />
                            }
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

export default React.memo(ProductSearchByIdName);