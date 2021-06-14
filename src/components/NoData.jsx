import React from 'react';

const NoData = (props) => {
    const text = props.text || 'No encontramos información relacionada. Prueba una búsqueda diferente';
    const title = props.title || 'Sin datos';

    return (
        <div className="text-center col-12">
            <div className="shadow-sm rounded p-5">
                <div className="mb-5">
                    <h6 className="text-primary mb-1">— {title}</h6>
                    <h4 className="mb-0">{text}</h4>
                </div>
            </div>
        </div>
    );
}
 
export default NoData;