import React, { useState,useEffect } from 'react';
import { Col, Container, Row} from 'reactstrap';
import TopBarFilter from '../../../../widgets/filter/TopbarFilterPorducts';
import Pageheading from '../../../../widgets/pageheading';
import { FILTER_PRODUCT , COUNT_PRODUCTS } from '../../../../graphql/queries/products';
import { useLazyQuery } from '@apollo/client';
import ListProducts from '../../../../widgets/shop/listproducts';
import SlideBarCategoires from '../../../../widgets/filter/SlidebarCategory';
import Paginacion from '../../../../components/PaginacionComponent';
import NoData from '../../../../components/NoData';

function ProductsFilterCategory(props){
    const { match: { params } } = props;
    const [dataProducts, setdataProducts] = useState({});
    const [search, setSearch] = useState({});
    const [count, setCount] = useState(0);
    const ProductParPage = 21;
    const [startValue, setStartValue] = useState(0);
    const [idcategoria, setIdcategoria] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    if(params.idCategory !== idcategoria){
        setStartValue(0);
        setCurrentPage(1);
        setIdcategoria(params.idCategory);
    }
   
    const [ProductsByCategoria ,  { loading }] = useLazyQuery(FILTER_PRODUCT,{
        onCompleted: (dataProductsByCat) =>{
            setdataProducts(dataProductsByCat.productosConnection.values);
        }

    });
    const [refetch] = useLazyQuery(COUNT_PRODUCTS,{
        onCompleted: (datacount) =>{
            setCount(datacount.productosConnection.values.length);
            setTotalPages(Math.ceil( datacount.productosConnection.values.length/ProductParPage));
        }
    });
   

    useEffect(() => {
        if(params.idCategory !== 'All'){
            setSearch([{Status:1,categorias:{id:parseInt(params.idCategory)}}]);
            ProductsByCategoria({
                variables:{
                    sort: "Nombre:asc",
                    start: startValue,
                    limit: ProductParPage,
                    where :{
                        Status:1,
                        categorias:{id:parseInt(params.idCategory)}
                    }
                }
            });
            refetch({
                variables: {
                    sort: "Nombre:asc",
                    where: {
                        Status:1,
                        categorias: {id:parseInt(params.idCategory)}
                    }
                }
            });
        }else{
            ProductsByCategoria({
                variables:{
                    sort: "Nombre:asc",
                    start: startValue,
                    limit: 21,
                    where :{
                        Status:1,
                    }
                }
            });
            refetch({
                variables: {
                    sort: "Nombre:asc",
                    where:{
                        Status:1
                    }
                }
            });
        }
    }, [ProductsByCategoria, params.idCategory, refetch, startValue]);


    const PreviusProduct = ()=>{
        if(startValue > 0){
            let result = startValue -ProductParPage;
            setStartValue(result);
        }
    }

    const NextProduct = ()=>{
        if( currentPage !== totalPages){
            let valuetemp = currentPage;
            setStartValue(ProductParPage * valuetemp);
        }
    }

    return(
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Compras"} title={params.nombre} />
            </section>
            <div className="page-content">
                <section>
                    <Container>     
                        <Row>
                            <>
                                <div className="col-lg-9 col-md-12">
                                    <TopBarFilter productdata={dataProducts} />
                                    <Row>
                                        {dataProducts.length !== undefined && dataProducts.map((producto, i) => (
                                            <ListProducts  productdata={producto} key={i} countProduct={count} col_lg={4} loading={loading} />
                                        ))}
                                        <div className="text-center col-12">
                                            
                                        {(dataProducts.length > 0) ?
                                            <Paginacion 
                                                currentPage={currentPage} 
                                                setCurrentPage={setCurrentPage} 
                                                totalPages={totalPages}
                                                NextProduct={NextProduct} 
                                                PreviusProduct={PreviusProduct} 
                                            />
                                            :
                                            <Row className="text-center12">
                                                <NoData />
                                            </Row>
                                        }
                                        </div>
                                    </Row>
                                </div>
                                <Col lg={3} md={12}  className="sidebar mt-8 mt-lg-0">
                                    <SlideBarCategoires />
                                </Col>
                            </>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

export default React.memo(ProductsFilterCategory);