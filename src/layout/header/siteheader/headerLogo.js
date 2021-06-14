import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { FILTER_BY_STATUS } from '../../../graphql/queries/categories';
import { useQuery } from '@apollo/client'; 

export default  function  HeaderLogoMenu (props){
   
    const [word, setWord] = useState("All");
    const [idcategory, setIdcategory] = useState("All");
    const { error,loading, data } = useQuery(FILTER_BY_STATUS, {
        variables: { 
            Status:0
        }
    });

    const [categories, setcategories] = useState({});

    useEffect(() => {
        if(data){
            setcategories(data.categoriasConnection.values);
        }
    }, [data]);
    
    localStorage.setItem('categories', JSON.stringify(categories));
    
    const AllCategories =()=>{
        if(error) return <h4>Error</h4>;
        if(loading) return <h4>Loading</h4>;
        return(
            <select 
                className="custom-select border-0 rounded-0 bg-light form-control d-none d-lg-inline"
                value={idcategory} 
                onChange={e =>setIdcategory(e.target.value)}
            >        
                <option value="All">Todas las categorias</option>                      
                {categories.length !== undefined && categories.map((categoria, i) => (
                    <option key={`cat_${i}`} value={`${categoria.id}`}>{categoria.Nombre}</option> 
                ))}
            </select>
        );
    }

    if(word === ""){
        setWord("All");
    }

    return (
        <div className="py-md-3 py-2">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="d-none d-md-flex align-items-center">
                        <Link className="navbar-brand logo d-none d-lg-block" to="/">
                            <img className="img-fluid" src={require(`../../../assets/images/chinaMayoreo.png`)} alt="" />
                        </Link>
                        <div className="media ml-lg-11"> <i className="las la-mobile-alt ic-2x bg-white rounded p-2 shadow-sm mr-2 text-primary" />
                            <div className="media-body"> <span className="mb-0 d-block">Llámanos</span>
                                <a className="text-muted" href="tel:+5516027636">55-1602-7636</a>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={6} >
                        <div className="right-nav align-items-center d-flex justify-content-end">
                            <form className="form-inline border rounded w-100">
                                <AllCategories />
                                <input 
                                    id="searchProduct"
                                    className="form-control border-0 border-left col" 
                                    type="text" 
                                    placeholder="Buscar productos" 
                                    aria-label="Search"  
                                    values={word}
                                    onBlur={e =>setWord(e.target.value)}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') e.preventDefault();
                                    }} 
                                />
                                <Link to={`/${idcategory}/${word}`} >
                                    <button 
                                        className="btn btn-primary text-white col-auto" 
                                        type="button">
                                            <i className="las la-search" />
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}