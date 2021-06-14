import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';

const ListImage = (props) => {
    const logo = '../src/assets/images/logo.png';
    const button_text = props.button_text || '';
    const image = props.image || logo;
    const title = props.title || null;
    const text = props.text || null;
    const link = props.link || '#';

    return (
        <div className="card product-card product-list mb-5">
            <Row className="align-items-center">
                <div className="col-lg-4 col-md-5">
                    <Link className="card-img-hover d-block" to={link}>
                        <img className="card-img-top card-img-back" src={`${image}`} alt="..." width="190" height="270" />
                        <img className="card-img-top card-img-front" src={`${image}`} alt="..." width="190" height="270" />
                    </Link>
                </div>
                <div className="col-lg-8 col-md-7">
                    <div className="card-info">
                        <div className="card-body">
                            <div className="product-title">
                                <Link to="/product-single" className="link-title">{title}</Link>
                            </div>
                            <div className="mt-1"> 
                                <p className="mb-3 mt-2">{text}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <a className="btn-cart btn btn-primary btn-animated" rel="noopener noreferrer" href={link}>
                                    <i className="las la-store-alt mr-1"></i> {button_text}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default ListImage;