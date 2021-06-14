import React, { useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Stores from './Stores'

const MainStores = (props) => {
    /* Hooks
    ======================================== */
    // Stores search
    const [tempName, setTempName] = useState('');
    const [name, setName] = useState('');
    // View
    const [view, setView] = useState(localStorage.getItem("ProductLayout"));

    /* Functions
    ======================================== */
    // Search by name
    const searchStores = event => {
        event.preventDefault();

        setName(tempName);
    };
    // Change view
    const changeView = (new_view) =>{
        if (new_view !== view) {
            setView(new_view);

            localStorage.setItem("ProductLayout", new_view);
        }
    }

    return (  
        <div className="page-content">
            <section>
                <Container>
                    <Row style={{paddingBottom: '1em'}}>
                        <Col md={6}>
                            <div className="right-nav align-items-center d-flex justify-content-end">
                                <form className="form-inline border rounded w-100" onSubmit={searchStores}>
                                    <input 
                                        className="form-control border-0 border-left col" 
                                        placeholder="Search..."
                                        aria-label="Search" 
                                        onChange={e=> setTempName(e.target.value)}
                                        type="search"/>
                                    <button className="btn btn-primary text-white col-auto" type="submit">
                                        <i className="las la-search" />
                                    </button>
                                </form>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="view-filter" style={{textAlign: 'right'}}>
                                {view === 'Gridview' ?
                                    <>
                                        <Link to="#" className="sky-grid-view active" onClick={() => changeView('Gridview')}>
                                            <i className="lab la-buromobelexperte" />
                                        </Link>
                                        <Link to="#" className="sky-list-view " onClick={() => changeView('Listing')} >
                                            <i className="las la-list" />
                                        </Link>
                                    </>
                                :
                                    <>
                                        <Link to="#" className="sky-grid-view " onClick={() => changeView('Gridview')}>
                                            <i className="lab la-buromobelexperte" />
                                        </Link>
                                        <Link to="#" className="sky-list-view active" onClick={() => changeView('Listing')} >
                                            <i className="las la-list" />
                                        </Link>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Stores
                        name={name}
                        view={view}
                    />
                </Container>
            </section>
        </div>
    );
}
 
export default React.memo(MainStores);