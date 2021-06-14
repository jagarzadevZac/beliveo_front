import React , {useEffect,useState} from 'react';
import { ToastContainer } from 'react-toastify';
import { Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import ProductsOffers from '../../widgets/home1/sales';
import { COUNT_OFFERS } from '../../graphql/queries/products'; 
import { useQuery } from '@apollo/client';
import Pagination from '../../components/Pagination';

function Offers(){

    const [currentPage, setCurrentPage] = useState(1);
    const [startValue, setStartValue] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const ProductParPage = 20;
    const {data} = useQuery(COUNT_OFFERS,{
        variables:{
            evaluar: "IS NOT NULL"
        }
    });

    useEffect(() => {
        if(data){
            setTotalPages(Math.ceil(data.graphqlcountOffers.length/ProductParPage));
        }
    }, [data]);

    const PreviusProduct = ()=>{
        if(startValue > 0){
            let result = startValue -ProductParPage;
            setStartValue(result);
        }
    }

    const NextProduct = ()=>{
        if( currentPage !== totalPages){
            let valuetemp = currentPage;
            setStartValue(ProductParPage * valuetemp);
        }
    }
  
    return(
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Compras"} title={"Ofertas"} />
            </section>
            <div className="page-content">
                <section>
                    <Container>
                        <Row>
                        {
                            <>
                                <div className="col-lg-12 col-md-12">
                                    <ToastContainer autoClose={900} />
                                    <Row>
                                        <ProductsOffers start={startValue} limit={ ProductParPage} />
                                    </Row>
                                    <Row>
                                        <div className="text-center col-12">
                                            <Pagination 
                                                setCurrentPage={setCurrentPage} 
                                                PreviousPage={PreviusProduct} 
                                                currentPage={currentPage} 
                                                totalPages={totalPages}
                                                NextPage={NextProduct} 
                                            />
                                        </div>
                                    </Row>
                                </div>
                            </>
                        }
                        </Row>
                    </Container>  
                </section>
            </div>
        </>
    );
}

export default React.memo(Offers);