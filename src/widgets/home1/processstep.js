import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Processstep extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Row>
            <Col lg={3} sm={6} >
              <div className="d-flex">
                <div className="mr-2">
                  <i className="las la-truck ic-2x text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">Envios a toda la republica</h5>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} className="mt-3 mt-sm-0">
              <div className="d-flex">
                <div className="mr-2">
                  <i className="las la-hand-holding-usd ic-2x text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">Devolución de dinero</h5>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} className="mt-3 mt-lg-0">
              <div className="d-flex">
                <div className="mr-2">
                  <i className="las la-lock ic-2x text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">Pagos seguro</h5>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} className="mt-3 mt-lg-0">
              <div className="d-flex">
                <div className="mr-2">
                  <i className="las la-headset ic-2x text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">Soporte 24/7</h5>
                </div>
              </div>
            </Col>
          </Row>
        );
    }
}

export default Processstep;