import React from 'react';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'
import HeaderLogoMenu from './siteheader/headerLogo';
import { useState, useEffect } from 'react';
import { FILTER_BY_STATUS } from '../../graphql/queries/categories';
import { useQuery } from '@apollo/client';

function HeaderPage(props) {
    const { error, loading, data } = useQuery(FILTER_BY_STATUS, {
        variables: {
            Status: 0
        }
    });

    const [categories, setcategories] = useState({});

    const [flags, setflags] = useState({
        isOpen: false,
        cartview: false,
        loader: true
    })

    const [scrolled, setScrolled] = useState();

    useEffect(() => {

        if (data) {
            setcategories(data.categoriasConnection.values);
        }

    }, [data]);

    //place static header when scroll is scrolled down
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 1) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const GetCartItems = () => {
        return JSON.parse(localStorage.getItem("CartProduct"));
    }

    const RemoveItem = (Index) => {
        var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
        CartValue = CartValue.slice(0, Index).concat(CartValue.slice(Index + 1, CartValue.length));
        localStorage.removeItem("CartProduct");
        localStorage.setItem("CartProduct", JSON.stringify(CartValue));
    }

    const Cartview = () => {
        //the value of cartview is updated
        setflags({ ...flags, cartview: !flags.cartview });
    }

    const toggle = () => {
        //the value of isOpen is updated
        setflags({ ...flags, isOpen: !flags.isOpen });
    }

    const handleClick = (event) => {
        var elems = document.querySelectorAll(".childsubmenu");
        [].forEach.call(elems, function (el) {
            el.classList.remove("show");
        });
        showGif();
    }

    const showGif = () => {
        setflags({ ...flags, loader: true });
    }

    const AllCategories = () => {
        if (error) return <h4>Error</h4>;
        if (loading) return <h4>Loading</h4>;
        return (
            <ul className="list-unstyled">
                <li key={`categoryAll`}>
                    <Link to={`/productsCategories`} onClick={handleClick}>Todas</Link>
                </li>
                {categories.length !== undefined && categories.map((categoria, i) => (
                    <li key={`categorY_${i}`}>
                        <Link to={`/category/${categoria.Nombre}/${categoria.id}`} onClick={handleClick}>{categoria.Nombre}</Link>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <header className="site-header">
                <HeaderLogoMenu />
                <div id="header-wrap" className={`${(scrolled) ? "shadow-sm fixed-header " : "shadow-sm"}`} >
                    <Container>
                        <Row>
                            <Col>
                                <Navbar className="navbar-expand-lg navbar-light position-static">
                                    <Link className="navbar-brand logo d-lg-none" to="/">
                                        <img className="img-fluid" src={require(`../../assets/images/chinaMayoreo.png`)} alt="" />
                                    </Link>
                                    <NavbarToggler onClick={() => toggle()} />
                                    <Collapse isOpen={flags.isOpen} className="navbar-collapse" navbar>
                                        <Nav className="navbar-nav" navbar>
                                            {scrolled === true && flags.isOpen === false ?
                                                <NavItem key="Logoheader" onClick={() => showGif()}>
                                                    <img className="img-fluid" src={require(`../../assets/images/chinaMayoreo.png`)} alt="" width="100" height="30" />
                                                </NavItem>
                                                :
                                                <>
                                                </>
                                            }

                                            <NavItem key="Homeheader" onClick={() => showGif()}>
                                                <Link to="/" className="nav-link">Inicio</Link>
                                            </NavItem>
                                            <UncontrolledDropdown nav inNavbar key="categoriesHeader">
                                                <DropdownToggle nav caret >
                                                    Categorías
                                                        </DropdownToggle>
                                                <DropdownMenu id={`submenu_1`} className="childsubmenu" >
                                                    <Row className="w-100 no-gutters">
                                                        <div className="container p-0">
                                                            <AllCategories />
                                                        </div>
                                                    </Row>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <NavItem key="Storesheader" onClick={() => showGif()}>
                                                <Link to="/stores" className="nav-link">Tiendas</Link>
                                            </NavItem>
                                            <NavItem key="Promotionsheader" onClick={() => showGif()}>
                                                <Link to="/offers" className="nav-link">Promociones</Link>
                                            </NavItem>
                                            <NavItem key="Contactheader" onClick={() => showGif()}>
                                                <Link to="/contact" className="nav-link">Contacto</Link>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                                </Navbar>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </header>
            <Modal isOpen={flags.cartview} toggle={Cartview} className="cart-modal">
                <ModalHeader toggle={() => Cartview()}>Your Cart (2)</ModalHeader>
                <ModalBody>
                    {(GetCartItems() != null && GetCartItems().length > 0) ?
                        <>
                            {GetCartItems().map((CartItem, index) => (
                                <>
                                    <div>
                                        <div className="row align-items-center">
                                            <div className="col-5 d-flex align-items-center">
                                                <div className="mr-4">
                                                    <Link type="submit" className="btn btn-primary btn-sm" onClick={() => RemoveItem(index)}><i className="las la-times" />
                                                    </Link>
                                                </div>
                                                {/* Image */}
                                                <a href="product-left-image.html">
                                                    <img className="img-fluid" src={require(`../../assets/images/${CartItem.ProductImage}`)} alt="..." />
                                                </a>
                                            </div>
                                            <div className="col-7">
                                                {/* Title */}
                                                <h6><a className="link-title" href="product-left-image.html">{CartItem.ProductName}</a></h6>
                                                <div className="product-meta"><span className="mr-2 text-primary">${(CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span><span className="text-muted">x {CartItem.Qty}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-5" />
                                </>
                            ))}

                            <div className="d-flex justify-content-between align-items-center mb-8"> <span className="text-muted">Subtotal:</span>  <span className="text-dark">${GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span>
                            </div> <Link to="/cart" className="btn btn-primary btn-animated mr-2"><i className="las la-shopping-cart mr-1" />View Cart</Link>
                            <Link to="/checkout" className="btn btn-dark"><i className="las la-money-check mr-1" />Continue To Checkout</Link>
                        </>
                        :
                        <div>
                            <div className="row align-items-center">
                                <h3 className="mb-4">Your cart is Currently Empty.</h3>
                            </div>
                        </div>
                    }
                </ModalBody>
            </Modal>
        </>
    );
}

export default React.memo(HeaderPage);