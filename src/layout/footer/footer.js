import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

function  Footer () {
    return (
        <footer className="py-11 bg-light">
            <Container>
                <Row>
                    <div className="col-12 col-lg-3"> 
                        <Link className="footer-logo text-white h2 mb-0" to="/">
                            <img className="img-fluid" src={require(`../../assets/images/chinaMayoreo.png`)} alt="" />
                        </Link>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a  className="text-dark ic-2x" href="https://www.facebook.com/ecommpos" target="_blank" rel="noopener noreferrer">
                                    <i className="lab la-facebook"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="text-dark ic-2x" href="https://www.youtube.com/channel/UCsbp6oj46E0JI169bDClMyQ" target="_blank" rel="noopener noreferrer">
                                    <i className="lab la-youtube"></i> 
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-3 mt-6 mt-lg-0">
                        <div className="mr-2"> 
                            <i className="las la-map ic-2x text-primary" />
                        </div>
                        <div>
                            <h6 className="mb-1 text-dark">Dirección</h6>
                            <p className="mb-0 text-muted">José María Izazaga 89-7th</p>
                        </div>

                    </div>
                    <div className="col-12 col-lg-3 mt-6 mt-lg-0">
                        <div className="mr-2">
                            <i className="las la-envelope ic-2x text-primary" />
                        </div>
                        <div>
                            <h6 className="mb-1 text-dark">Email</h6>
                            <p className="mb-0 text-muted"> venta@ecommpos.com</p>
                        </div>
                    </div>
                    
                    <div className="col-12 col-lg-3 mt-6 mt-lg-0">
                        <div className="mr-2"> 
                            <i className="las la-clock ic-2x text-primary" />
                        </div>
                        <div>
                            <h6 className="mb-1 text-dark">Horas Laborales</h6>
                            <span className="text-muted">Lunes. - Sábado.
                            :08.00am - 18.00pm</span>
                        </div>
                    </div>
                </Row>
                <hr className="my-8" />
                <Row className="text-muted align-items-center">
                    <Col md={7}>Copyright © 2021 - Todos los derechos reservados<i className="las la-globe text-primary heartBeat2"></i>  <u><a className="text-primary" href="https://ecommpos.com" target="_blank" rel="noopener noreferrer">ecommpos.com</a></u>
                    </Col>
                    <Col md={5} className="text-md-right mt-3 mt-md-0">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/01.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/02.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/03.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/04.png`)} alt="" />
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;