import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { All_CATEGORIES } from '../../../graphql/queries/categories';
import { Row, Col, Container } from 'reactstrap';

import GifLoader from '../../../gifLoader/gifloader';

import Pageheading from '../../../widgets/pageheading';
import CardImage from '../../../components/CardImage'

function ProductsCategories(props) {
    //'../src/assets/images/product/categories/'+
    const { match: { params } } = props;
    const [view, setView] = useState('grid')
    const [categoriesData, setCategoriesData] = useState([]);
    const { data: categories, loading } = useQuery(All_CATEGORIES);

    useEffect(() => {
        if (categories) {
            setCategoriesData(categories.categorias);
        }
    }, [categories]);
    return (
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Shop"} title={"Products Categories"} />
            </section>
            <div className="page-content">
                {loading ?
                    <GifLoader />
                    :
                    <section>
                        <Container>
                            <Row>
                                {categoriesData.map((category, i) => (
                                    <Col lg={4} md={6} key={i}>
                                        {view === "grid" ?
                                            <CardImage
                                                button_text='Visitar'
                                                link={'/category/' + category.Nombre + '/' + category.id}
                                                title={category.Nombre}
                                                image={category.image}
                                                text={category.Status}
                                            />
                                            :
                                            null
                                        }
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                }
            </div>
        </>
    );
}


export default React.memo(ProductsCategories);