import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
 
function SlideBarCategoires (){

    const categories = JSON.parse(localStorage.getItem('categories'));

    return(
        <div className="shadow-sm p-5">
            <div className="widget widget-categories mb-4 pb-4 border-bottom">
                <h4 className="widget-title mb-3">Categorias</h4>
                <Scrollbars style={{  height: 300 }}>   
                <ul className="list-unstyled">  
                    <li key={`categoryAll`}>
                        <Link to={`/category/All/All`} > <i className="lar la-circle"></i>Todas las categorias</Link>
                    </li>                                                  
                    {categories.length !== undefined && categories.map((categoria, i) => (
                        <li key={`categorY_${i}`}>
                            <Link to={`/category/${categoria.Nombre}/${categoria.id}`}> <i className="lar la-circle"></i> {categoria.Nombre}</Link>
                        </li>
                    ))}
                </ul> 
                </Scrollbars>
            </div>
        </div>
    );
}

export default React.memo(SlideBarCategoires);

