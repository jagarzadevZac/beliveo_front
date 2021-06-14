import React, { useState, useEffect } from 'react';
import { SINGLE_STORE } from '../../graphql/queries/stores';
import { useLazyQuery } from '@apollo/client';
import { Row, Col, Container} from 'reactstrap';
import { FILTER_PRODUCT , COUNT_PRODUCTS } from '../../graphql/queries/products';
import Paginacion  from '../../components/PaginacionComponent';
import ListProducts from '../../widgets/shop/listproducts';
import TopBarFilter from '../../widgets/filter/TopbarFilterPorducts';
import NoData from '../../components/NoData';

function StoreDetails(props) {

    const ProductParPage = 20;
    const [startValue, setStartValue] = useState(0);
    const [storeDetails, setStoreDetails] = useState({});
    const [products, setProducts] = useState({});
    const [searchByName, setSearchByName] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const { match: { params } } = props;
  
    const [Getproducts] = useLazyQuery(FILTER_PRODUCT, {
        onCompleted: (dataProducts) => {
            setProducts(dataProducts.productosConnection.values);
        }
    });
    const [detailStore, { loading }] = useLazyQuery(SINGLE_STORE, {
        onCompleted: (dataStore) => {
            //console.log("dataStore: ", dataStore.store);
            setStoreDetails(dataStore.store);
        }
    });

    const [countSearch] = useLazyQuery(COUNT_PRODUCTS,{
        onCompleted: (datacount) =>{
            setCount(datacount.productosConnection.values.length);
            setTotalPages(Math.ceil( datacount.productosConnection.values.length/ProductParPage));
        }
    });

    useEffect(() => {
        if (params.id !== 0) {
            detailStore({
                variables: { id: parseInt(params.id) }
            });
        }
    }, [detailStore, params.id]);

    useEffect(() => {
        if (searchByName === "") {
            console.log("buscar todos");
            Getproducts({
                variables: {
                    sort: "Nombre:asc",
                    start: startValue,
                    limit: ProductParPage,
                    where: {
                        Status:1,
                        store: { id: parseInt(params.id) }
                    }
                }
            });
            countSearch({
                variables: {
                    sort: "Nombre:asc",
                    where: {
                        Status:1,
                        store: { id: parseInt(params.id) }
                    }
                }
            });
        } else {
            console.log("buscar por palabra y id");
            if (searchFlag === true) {
                console.log("sarching...");
                Getproducts({
                    variables: {
                        sort: "Nombre:asc",
                        start: startValue,
                        limit: ProductParPage,
                        where: {
                            Status:1,
                            Nombre_contains: searchByName,
                            store: { id: parseInt(params.id) }
                        }
                    }
                });
                countSearch({
                    variables: {
                        sort: "Nombre:asc",
                        where: {
                            Status:1,
                            Nombre_contains: searchByName,
                            store: { id: parseInt(params.id) }
                        }
                    }
                });
            }
        }
    }, [Getproducts, countSearch, params.id, params.word, searchByName, searchFlag, startValue])

    if (loading) return <h4>loading-...</h4>;

    const Search = () => {
        console.log("search");
        setSearchFlag(true);
        setTimeout(() => {
            setSearchFlag(false);
        }, 2000);
    }

    const GetWordSearch = (e) => {
        console.log("e: ", e.target.value);
        setSearchByName(e.target.value);
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

    return (
        <>
            <section className="bg-light">
                <Container >
                    <Row className="align-items-center">

                        <Col md={2}>
                            <div className="text-center">
                                <img alt="..." src={`${storeDetails.Logo}`} className="imagen-circle" />
                                <div className="star-rating">
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                </div>
                            </div>
                        </Col>
                        <Col md={5} className="mt-3 mt-md-0">
                            <div className="text-center col-lg-12">
                                <h1>{storeDetails.Nombre}</h1>
                                <small className="text-muted">tel: {storeDetails.Tel}</small><br/>
                                <small className="text-muted">Mail: {storeDetails.Mail}</small><br/>
                                <small className="text-muted">Address: {storeDetails.Address}</small>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="page-content">
                <section>
                    <Container >
                        <Row style={{ paddingBottom: '1em' }}>
                            <Col lg={6} md={6} sm={6} xs={8}>
                                <div className="right-nav align-items-center d-flex justify-content-end">
                                    <form className="form-inline border rounded w-100">
                                        <input
                                            className="form-control border-0 border-left col" 
                                            type="text" 
                                            placeholder="Enter Your Keyword" 
                                            aria-label="Search" 
                                            required={true}
                                            onKeyUp={GetWordSearch}
                                        />
                                        <button className="btn btn-primary text-white col-auto" type="button" onClick={Search}>
                                            <i className="las la-search" />
                                        </button>
                                    </form>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={4}>
                                <TopBarFilter productdata={products} />
                            </Col> 
                        </Row>
                        <br/>
                        <Row>
                            <>
                                <div className="col-lg-12 col-md-12">
                                    { products.length > 0 ?
                                    <>
                                        <Row>
                                            {products.length !== undefined && products.map((producto, i) => (
                                                <ListProducts  productdata={producto} key={i} countProduct={count} col_lg={3} />
                                                
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
                                    </>
                                    :
                                    <NoData />
                                    }
                                </div>
                            </>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

export default  React.memo(StoreDetails);