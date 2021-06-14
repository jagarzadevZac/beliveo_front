import React, { useState, useEffect } from 'react';
import { useQuery , useLazyQuery} from '@apollo/client';
import { SEARCH_BY_ID_PRODUCT, FILTER_PRODUCT } from '../../../graphql/queries/products';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import GifLoader from '../../../gifLoader/gifloader';
import ImageGallery from 'react-image-gallery';
import classnames from 'classnames';
import Pageheading from '../../../widgets/pageheading';
import PriceProduct from '../../../components/priceComponent';
import InformationProductCard  from '../../../components/ProductInformationComponentCard';
import InformationProductOnModal from '../../../components/ModalDetailProduct';

function ProductsDetails(props) {

    const { match: { params } } = props;
    const [dataProduct, setdataProduct] = useState({});
    const [productsRelated, setproductsRelated] = useState({});
    // const [images, setimages] = useState({});
    const [imgTest, setImgTest] = useState({});
    const [categorias, setcategorias] = useState({});
    const [activeTab, setActiveTab] = useState('1');
    const [Accion, setAccion] = useState(false);
    const [viewproduct, setviewproduct] = useState("");
    const [categoriasRe, setCategoriasRe] = useState({});
    let cat1=0,cat2=0;
    const Options = {
        options: {
            loop: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
            },
        },
    }

    const elements = [];

    const { data, loading } = useQuery(SEARCH_BY_ID_PRODUCT, {
        variables: {
            id: parseInt(params.productId)
        }
    });


    const [refetch] = useLazyQuery(FILTER_PRODUCT,{
        onCompleted: (dataRelatedProducts) =>{
            setproductsRelated(dataRelatedProducts.productosConnection.values);
        }
    });

    useEffect(() => {
        if (data) {
            setdataProduct(data.producto);
            //setimages(Object.entries(data.producto.ArrayImagenes));
            setImgTest(data.producto.ArrayImagenes);
            setcategorias(data.producto.categorias);
        }
    }, [data]);
    
    if(categorias[0] !== undefined){
        cat1 = parseInt(categorias[0].id);
    }

    if(categorias[1] !== undefined){
        cat2 = parseInt(categorias[1].id);
    }

    useEffect(() => {
        if(cat1 !== 0 && cat2 !== 0){
            refetch({
                variables: {
                    start: 0,
                    limit: 6,
                    where: {
                        Status:1,
                        categorias: {id:[cat1,cat2]}
                    }
                }
            });
        }else{
            refetch({
                variables: {
                    start: 0,
                    limit: 6,
                    where: {
                        Status:1,
                        categorias: {id:cat1}
                    }
                }
            });
        }
    }, [cat1, cat2, refetch]);
   
    const toggle = tab => { if (activeTab !== tab) setActiveTab(tab); }

    const Carousel = () => {
       
        if(dataProduct.ImagenPrincipal === undefined ||  dataProduct.ImagenPrincipal === null){

            let imagen1 ={
                original: 'https://cdn.iconscout.com/icon/free/png-512/gallery-187-902099.png',
                thumbnail: 'https://cdn.iconscout.com/icon/free/png-512/gallery-187-902099.png',
            };
            elements.push(imagen1);

        }else{
            let imagen1 ={
                original: dataProduct.ImagenPrincipal,
                thumbnail: dataProduct.ImagenPrincipal,
            };
            elements.push(imagen1);
        }
       
        if(dataProduct.ArrayImagenes !==  undefined && dataProduct.ArrayImagenes !== null){
            if( typeof imgTest === 'string'){
                if(imgTest.length >= 0 ){
                    let imagesPro = JSON.parse(imgTest);                    
                    Object.entries(imagesPro).forEach(([key, value]) => {
                       
                        if(dataProduct.ImagenPrincipal !== value){
                            const newImg = {
                                original: value,
                                thumbnail: value,
                            };
                            elements.push(newImg);
                        }
                    });
                }
            }else{ 
                let imagenes =  Object.values(imgTest);
                if(imagenes.length >= 0){
                    for (let index = 0; index < imagenes.length; index++) {
                        const element = imagenes[index];

                        if(dataProduct.ImagenPrincipal !== element){
                            const newImg = {
                                original: element,
                                thumbnail: element,
                            };
                            elements.push(newImg); 
                        }
                    }
                }
            }
        }
    }
 
    const quickview =()=> {
        setAccion(!Accion);
     }
     
     const toggleModal = () => setAccion(!Accion);
 
     const onClickQuickView = (product) =>{
         setAccion(true);
         setviewproduct(product);
         setCategoriasRe(product.categorias);
     }

    const ProductRelatedCarousel = () => {
    
        return (
            <OwlCarousel
                className="no-pb owl-2"
                dotData={false}
                nav={true}
                dots={false}
                autoplay={true}
                {...Options.options}
            >
                {productsRelated.length !== undefined && productsRelated.map((productRelated, i) => (
                   
                    <div className="item" key={i}>
                        <InformationProductCard 
                            producto={productRelated} 
                            onClickQuickView={onClickQuickView} 
                        />
                        <InformationProductOnModal 
                            Accion={Accion} 
                            toggle={toggleModal} 
                            viewproduct={viewproduct} 
                            quickview={quickview} 
                            categorias={categorias} 
                        />
                    </div>
                ))}
            </OwlCarousel>
        );
    }

    /**This function was placed to validate 
     * if there are elements in the array and 
     * not affect the performance of react memory. 
     */
    Carousel();
    
    return (
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Compras"} title={"Detalles"} />
            </section>
            <div className="page-content">
                {loading ?
                    <GifLoader />
                    :
                    <section>
                        <Container>
                            <Row>
                                <div className="col-lg-6 col-12">
                                    <ImageGallery
                                        items={elements}
                                        infinite={false}
                                        thumbnailPosition={"left"}
                                        useTranslate3D={true}
                                        showPlayButton={false}
                                        showNav={false}
                                        preventDefaultTouchmoveEvent={true}
                                        video={true}
                                    />
                                </div>
                                <div className="col-lg-6 col-12 mt-5 mt-lg-0">
                                    <div className="product-details">
                                        <h3 className="mb-0">
                                            {dataProduct.Nombre}
                                        </h3>
                                        <div className="star-rating mb-4">
                                            <i className="las la-star" />
                                            <i className="las la-star" />
                                            <i className="las la-star" />
                                            <i className="las la-star" />
                                            <i className="las la-star" />
                                        </div>
                                        <PriceProduct  offerPrice={dataProduct.PrecioOferta} price={dataProduct.Precio} />
                                        <ul className="list-unstyled my-4">
                                            <li className="mb-2">Availibility: <span className="text-muted">{dataProduct.Cantidad}</span> </li>
                                            <li>Categories :
                                            {Object.values(categorias).map(e =>
                                                <span className="text-muted" key={e.id}>{e.Nombre},</span>
                                            )}
                                            </li>
                                        </ul>
                                        <a className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0"  rel="noopener noreferrer"  href={`${dataProduct.Url}`} target="_blank" >
                                            <i className="las la-store-alt mr-1"></i>Ir a tienda
                                        </a> 
                                    </div>
                                    
                                    <div className="card product-card product-list mb-5">
                                        <Row className="align-items-right">
                                            <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                <Link className="card-img-hover d-block" to={`/stores/details/${dataProduct.store !== undefined ? dataProduct.store.id : 0}`}>
                                                    <img className="card-img-top" src={`${dataProduct.store !== undefined ? dataProduct.store.Logo : ""}`} alt="..."  width="100" height="100" />                                              
                                                </Link>
                                            </div> 
                                            <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                                <div className="card-info">
                                                    <div className="card-body">
                                                        <div className="product-title">
                                                            <Link to={`/stores/details/${dataProduct.store !== undefined ? dataProduct.store.id : 0}`} className="link-title">{dataProduct.store !== undefined ? dataProduct.store.Nombre : ""}</Link>
                                                        </div>
                                                        <div className="mt-1"> 
                                                            <div className="star-rating">
                                                                <i className="las la-star" />
                                                                <i className="las la-star" />
                                                                <i className="las la-star" />
                                                                <i className="las la-star" />
                                                                <i className="las la-star" />
                                                            </div>
                                                            <p>tel: {`${dataProduct.store !== undefined ? dataProduct.store.Tel : ""}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </Row>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </section>
                }
                <section className="p-0">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="tab">
                                    {/* Nav tabs */}
                                    <Nav tabs>
                                        <NavItem active>
                                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >Description</NavLink>
                                        </NavItem>
                                    </Nav>
                                    {/* Tab panes */}
                                    <TabContent activeTab={activeTab} className="pt-5 p-0">
                                        <TabPane tabId="1" className="fade show" >
                                            <Row className="align-items-center">
                                                <div className="col-md-5">
                                                    {dataProduct.ImagenPrincipal === undefined || dataProduct.ImagenPrincipal === null
                                                    ?
                                                    <img className="img-fluid w-100" src='https://cdn.iconscout.com/icon/free/png-512/gallery-187-902099.png' alt="" />
                                                    :
                                                    <img className="img-fluid w-100" src={`${dataProduct.ImagenPrincipal}`} alt="" />
                                                    }
                                                </div>
                                                <div className="col-md-7 mt-5 mt-lg-0">
                                                    <h3 className="mb-3">{dataProduct.Nombre}</h3>
                                                    <p className="mb-5">{dataProduct.Descripcion}</p> 
                                                    <a className="btn btn-primary btn-animated"  rel="noopener noreferrer"  href={`${dataProduct.Url}`} target="_blank" >
                                                        <i className="las la-long-arrow-alt-right mr-1" />visit website
                                                    </a>
                                                </div>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2" className="fade show">
                                            <h1>tab2</h1>
                                        </TabPane>
                                        <TabPane tabId="3" className="fade show">
                                            <h1>tab3</h1>
                                        </TabPane>
                                    </TabContent>

                                    <section>
                                        <Container>
                                            <Row className="justify-content-center text-center">
                                                <Col lg={8} md={10}>
                                                    <div className="mb-5">
                                                        <h6 className="text-primary mb-1"> — You may also like </h6>
                                                        <h2 className="mb-0">Related Products</h2>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </section>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProductRelatedCarousel />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

export default React.memo(ProductsDetails);