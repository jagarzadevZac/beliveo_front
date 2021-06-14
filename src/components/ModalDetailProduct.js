import React from 'react'
import { Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PriceProduct from './priceComponent';

const InformationProductOnModal =({Accion,toggle,viewproduct,quickview,categorias})=>{

    return(
        <Modal isOpen={Accion} toggle={toggle} className="view-modal">
            <ModalHeader className="border-bottom-0 pb-0">
                <Button className="close" color="danger" onClick={() => quickview()} ><span aria-hidden="true">×</span></Button>
            </ModalHeader>
            <ModalBody>
                <Row className="align-items-center">
                    <div className="col-lg-7 col-12">
                        <img className="img-fluid rounded" src={`${viewproduct.ImagenPrincipal}`} alt="" width="950" height="900" />
                    </div>
                    <div className="col-lg-5 col-12 mt-5 mt-lg-0">
                        <div className="product-details">
                            <h3 className="mb-0">{viewproduct.Nombre}</h3>
                            <div className="star-rating mb-4">
                                <i className="las la-star" />
                                <i className="las la-star" />
                                <i className="las la-star" />
                                <i className="las la-star" />
                                <i className="las la-star" />
                            </div> 
                            <PriceProduct 
                                offerPrice={viewproduct.PrecioOferta} 
                                price={viewproduct.Precio} 
                            />
                            <ul className="list-unstyled my-4">
                                <li className="mb-2">Stock: <span className="text-muted">{viewproduct.Cantidad}</span></li>
                                <li>
                                    Categories :
                                    {Object.values(categorias).map(e => 
                                        <span className="text-muted" key={e.id}>{e.Nombre},</span>
                                    )}
                                </li>
                            </ul>
                            <p className="mb-4">{viewproduct.Descripcion}</p>
                        </div>
                    </div>
                </Row>
            </ModalBody>
        </Modal>
    );
}

export default InformationProductOnModal;

