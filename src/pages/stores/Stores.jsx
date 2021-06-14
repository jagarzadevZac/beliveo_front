import React, { useState, useEffect} from 'react';
import { Row, Col } from 'reactstrap';

import { SEARCH_STORES } from '../../graphql/queries/stores';
import { useLazyQuery } from '@apollo/client';

import GifLoaderComponent from '../../gifLoader/gifloaderComponent';
import Pagination from '../../components/Pagination';
import CardImage from '../../components/CardImage';
import ListImage from '../../components/ListImage';
import NoData from '../../components/NoData';

const Stores = (props) => {
    /* Hooks
    ======================================== */
    // Pagination
    const storesPerPage = useState(parseInt(localStorage.getItem("totalPerPage")));
    const [currentPage, setCurrentPage] = useState(1);
    const [startValue, setStartValue] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // Stores data
    const [storesData, setStoresData] = useState([]);
    // View
    const [view, setView] = useState('Gridview');

    /* Queries
    ======================================== */
    // Stores data
    const [search, { loading }] = useLazyQuery(SEARCH_STORES ,{
        onCompleted(data){
            setStoresData(data.stores);
        }
    });
    // Count stores
    const [searchTotal] = useLazyQuery(SEARCH_STORES,{
        onCompleted: (totalStores) =>{
            setTotalPages(Math.ceil(totalStores.stores.length / storesPerPage));
        }
    });

    /* Observers
    ======================================== */
    // Stores data
    useEffect(() => {
        // Stores data
        search({
            variables: {
                sort: "Rate:Desc",
                start: startValue,
                limit: storesPerPage,
                where: {
                    Nombre_contains: props.name,
                }
            }
        });

        // Count stores
        searchTotal({
            variables: {
                sort: "Rate:Desc",
                where: {
                    Nombre_contains: props.name,
                }
            }
        });

        // Set view
        if (props.view !== undefined) {
            setView(props.view);            
        }
    }, [props.name, search, startValue, storesPerPage, props.view, searchTotal]);

    /* Functions
    ======================================== */
    // Pagination
    const PreviousPage = ()=>{
        if(startValue > 0){
            let result = startValue - storesPerPage;
            setStartValue(result);
        }
    }
    const NextPage = ()=>{
        if( currentPage !== totalPages){
            setStartValue(storesPerPage * currentPage);
        }
    }

    // Loading
    if (loading) return <GifLoaderComponent/>;

    return (
        <Row>
            {storesData.length > 0 ? 
                storesData.map((store, i) => (
                    (view === "Gridview" ?
                        <Col lg={4} md={6} key={i}>
                            <CardImage
                                link={`/stores/details/${store.id}`}
                                button_text='Visitar'
                                title={store.Nombre}
                                image={store.Logo}
                                text={store.Tel}
                            />
                        </Col>
                    :
                        <ListImage
                            link={`/stores/details/${store.id}`}
                            button_text='Visitar'
                            title={store.Nombre}
                            image={store.Logo}
                            text={store.Tel}
                            key={i}
                        />
                    )
                ))
            :
                <NoData/>
            }

            <div className="text-center col-12">
                <Pagination 
                    setCurrentPage={setCurrentPage} 
                    PreviousPage={PreviousPage} 
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    NextPage={NextPage} 
                />
            </div>
        </Row>
    );
}
 
export default React.memo(Stores);
