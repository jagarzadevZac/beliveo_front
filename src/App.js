import React, { Fragment, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './layout/footer/footer';
import HeaderPage from './layout/header/headerPage';
import Herosection from './widgets/herosection/herosection';

import './App.css';
import './vendor.js';

import ProductsFilterCategory from './pages/shop/layout/grid/productsFilter';
import ProductsDetails from './pages/shop/product/productDetails';
import Offers from './pages/offers/offers';
import MainStores from './pages/stores/MainStores';
import ProductSearchByIdName from './pages/productSearch/ProductSearch';
import StoreDetails from './pages/stores/storeDetails';
import ProductsCategories from './pages/shop/product/productsCategories';
import Contact from './pages/contact/contact';

const Home = React.lazy(() => import('./pages/home/home'));

function App(props) {
    return (
        <Fragment>
            <div className="page-wrapper">
                <Suspense fallback={<><HeaderPage /><Herosection /><Footer /></>}>
                    <HeaderPage />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path={`/category/:nombre/:idCategory`} component={ProductsFilterCategory} />
                        <Route path={`/productDetails/:productId`} component={ProductsDetails} />
                        <Route path={`/offers`} component={Offers} />
                        <Route path={`/stores/details/:id`} component={StoreDetails} />
                        <Route path={`/stores`} component={MainStores} />
                        <Route path={'/:id/:word'} component={ProductSearchByIdName} />
                        <Route path={`/productsCategories`} component={ProductsCategories} />
                        <Route path={`/contact`} component={Contact} />
                    </Switch>
                    <Footer />
                </Suspense>
            </div>
        </Fragment>
    );
}

export default App;