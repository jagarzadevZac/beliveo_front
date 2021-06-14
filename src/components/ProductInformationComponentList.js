import React from 'react'
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import PriceProduct from './priceComponent';

const InformationProductList =({producto,onClickQuickView })=>{

    const ImageFront = ()=>{
        if(producto.ArrayImagenes === null){

            return(
                <>
                    <img className="card-img-top card-img-front" src={require(`../assets/images/default-image.png`)} alt="..." width="190" height="270" />
                </>
            )

        }
        return(
            <>
                {( producto.ArrayImagenes['img1'] === undefined  ?
                    <img className="card-img-top card-img-front" src={`${JSON.parse(producto.ArrayImagenes)["img1"]}`} alt={`${JSON.parse(producto.ArrayImagenes)["img1"]}`} width="190" height="270" />
                    :
                    <img className="card-img-top card-img-front" src={`${producto.ArrayImagenes['img1']}`} alt={`${producto.ArrayImagenes['img1']}`} width="190" height="270" />
                )}
            </>
        );
    }

    const ImagenBack = () =>{

        if(producto.ImagenPrincipal  === null){
            return(
                <img className="card-img-top card-img-back" src={require(`../assets/images/default-image.png`)} alt="..." width="190" height="270" />
            );
        }

        return(                
            <img className="card-img-top card-img-back" src={`${producto.ImagenPrincipal}`} alt="..." width="190" height="270" />
        );
    }

    return(
        <div className="card product-card product-list mb-5">
            <Row className="align-items-center">
                <div className="col-lg-4 col-md-5">
                    <Link className="card-img-hover d-block" to={`/productDetails/${producto.id}`}>
                        <ImagenBack />
                        <ImageFront />
                    </Link>
                </div>
                <div className="col-lg-8 col-md-7">
                    <div className="card-info">
                        <div className="card-body">
                            <div className="product-title">
                                <Link to="/product-single" className="link-title">{producto.Nombre}</Link>
                            </div>
                            <div className="mt-1"> 
                                <PriceProduct  offerPrice={producto.PrecioOferta} price={producto.Precio} />
                                <div className="star-rating">
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                    <i className="las la-star" />
                                </div>
                                <div className="product-link d-flex align-items-center">
                                </div>
                                <p className="mb-3 mt-2">{producto.Descripcion}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <a className="btn-cart btn btn-primary btn-animated mx-3"  rel="noopener noreferrer"  href={`${producto.Url}`} target="_blank" >
                                    <i className="las la-store-alt mr-1"></i>
                                </a>
                                <Link to="#" onClick={() => onClickQuickView(producto)} className="btn btn-view" id="quickview1"><i className="las la-eye" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );

}

export default InformationProductList;
