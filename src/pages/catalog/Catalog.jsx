import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CatalogList from "./CatalogList";
import CatalogRight from "./CatalogRight";
import PaginationAndRoutes from "./PaginationAndRoutes";
import Crumbs from "../../components/crumbs/Crumbs";


const Catalog = () => {
    const clothes = useSelector(s => s.clothes.clothes);
    const [page, setPage] = useState(1);
    const params = useParams();

    useEffect(() => setPage(1), [params.category])

    return (
        <section className='catalog'>
            <div className="container">
                <Crumbs title='Каталог'/>
                <div className='catalog__content'>
                    <div className='catalog__content-left'>
                        <h3 className='catalog__content-title'>Каталог</h3>
                        <CatalogList clothes={clothes}/>
                    </div>
                    <CatalogRight clothes={clothes} page={page} params={params}/>
                </div>
                <PaginationAndRoutes clothes={clothes} setPage={setPage} params={params} page={page}/>
            </div>
        </section>
    );
};

export default Catalog;
