import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function TopBarFilter(props){
    const [view] = useState(localStorage.getItem("ProductLayout"));

    const Gridview =()=> {
        var removeelems = document.getElementsByClassName("sky-list-view");
        [].forEach.call(removeelems, function (el) {
            el.classList.remove('active');
        });

        document.querySelector(".sky-grid-view").classList.add("active");
        localStorage.setItem("ProductLayout", 'Gridview');
        localStorage.setItem("reload",true);
    
    }
    // List View
    const Listview = ()=>{
        var removeelems = document.getElementsByClassName("sky-grid-view");
        [].forEach.call(removeelems, function (el) {
            el.classList.remove('active');
        });

        document.querySelector(".sky-list-view").classList.add("active");
        localStorage.setItem("ProductLayout", 'Listing');
        localStorage.setItem("reload",true);
    }
    
    return (
        <div className="view-filter" style={{textAlign: 'right'}}>
            {(view === "Listing") ?
                <>
                    <Link to="#" className="sky-grid-view " onClick={() => Gridview()}>
                        <i className="lab la-buromobelexperte" />
                    </Link>
                    <Link to="#" className="sky-list-view active" onClick={() => Listview()} >
                        <i className="las la-list" />
                    </Link>
                </>
                :
                <>
                    <Link to="#" className="sky-grid-view active" onClick={() => Gridview()}>
                        <i className="lab la-buromobelexperte" />
                    </Link>
                    <Link to="#" className="sky-list-view " onClick={() => Listview()} >
                        <i className="las la-list" />
                    </Link>
                </>
            }
        </div>
    );
}