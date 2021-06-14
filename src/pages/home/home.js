import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Herosection from '../../widgets/herosection/herosection';
import Processstep from '../../widgets/home1/processstep';
import RatingProducts from '../../widgets/home1/rating';
import ProductsOffers from '../../widgets/home1/sales';

function Home(){
    localStorage.setItem("totalPerPage", 3);

    return(
        <>
            <Herosection />
            <section className="pb-0">
                <Container>
                    <Processstep />
                </Container>
               
            </section>
            <section>
                <div className="container-fluid px-lg-8">
                    <Row className="justify-content-center text-center">
                        <Col lg={8} md={10}>
                        <div className="mb-8">
                            <h6 className="text-primary mb-1">
                            — TOP RATING
                            </h6>
                            <h2 className="mb-0">LOS MEJORES PRODUCTOS</h2>
                        </div>
                        </Col>
                    </Row>
                    <RatingProducts />
                    <br></br>
                    <Row className="justify-content-center text-center">
                        <Col lg={8} md={10}>
                        <div className="mb-8">
                            <h6 className="text-primary mb-1">
                            — TOP DE OFERTAS
                            </h6>
                            <h2 className="mb-0">LAS MEJORES OFERTAS</h2>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <ProductsOffers start={0} limit={8} />
                    </Row>
                </div>
            </section>
        </>
    );
} 

export default React.memo(Home);