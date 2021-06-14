import React from 'react';
import { Link } from 'react-router-dom';

const CardImage = (props) => {
    const logo = '../src/assets/images/logo.png';
    const button_text = props.button_text || '';
    const image = props.image || logo;
    const title = props.title || null;
    const text = props.text || null;
    const link = props.link || '#';

    return (
        <div className="card product-card">
            <Link className="card-img-hover d-block" to={link}>
                <img className="card-img-top card-img-back" src={`${image}`} alt="..." width="190" height="270" />
                <img className="card-img-top card-img-front" src={`${image}`} alt="..." width="190" height="270" />
            </Link>
            <div className="card-info">
                <div className="card-body">
                    <div className="product-title">
                        <Link to={link} className="link-title">{title}</Link>
                    </div>
                    <div className="mt-1">   
                        <p>{text}</p>
                    </div>
                </div>
                <div className="card-footer bg-transparent border-0">
                    <div className="product-link d-flex align-items-center justify-content-center">
                        <a className="btn-cart btn btn-primary btn-animated mx-6" rel="noopener noreferrer" href={link}>
                            <i className="las la-store-alt mr-1"></i> {button_text}
                        </a>
                    </div>
                </div>
            </div>
        </div>  
    );
};

export default CardImage;