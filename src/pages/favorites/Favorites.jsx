import React, {useState} from 'react';
import {Link} from "react-router-dom";
import img from "../catalog/img/1.png";
import {useSelector} from "react-redux";
import img2 from './empty.png'
import BtnForFavorites from "../../components/btnForFavorites/BtnForFavorites";
import Crumbs from "../../components/crumbs/Crumbs";



const Favorites = () => {
    const favorites = useSelector(s => s.user.user.favorites);
    const [loaded, setLoaded] = useState(false);


    return (
        <div className='favorites'>
            <div className="container">
                <Crumbs title='Избранное'/>
                <div className='catalog__content-row'>
                    {
                        favorites && favorites.length ? favorites.map((item) => (
                                <div className='catalog__content-card' key={item._id}>
                                    <Link className='catalog__content-link' to={`/product/${item._id}`}>
                                        {!loaded && <div style={{height:'400px', width: "100%", background:"gray"}}></div>}
                                        <img className='catalog__content-img' src={`${process.env.REACT_APP_STAGE_URL}${item.images[0]}`} alt="" onLoad={() => setLoaded(true)}/>
                                    </Link>
                                    <BtnForFavorites item={item}/>
                                    <p className='catalog__content-name'>{item.title}</p>
                                    <p className='catalog__content-price'>{item.price} грн</p>
                                    <ul className='catalog__content-sizes'>
                                        {
                                            item.sizes.map((size) => (
                                                <li className='catalog__content-size' key={size}>{size}</li>
                                            ))
                                        }
                                    </ul>
                                    <ul className='catalog__content-colors'>
                                        <li style={{background: item.colors }} className='catalog__content-circle'> </li>
                                    </ul>
                                </div>
                            )) :
                            <div className='favorites__info'>
                                <h2 className='favorites__title'>Ваш список избранных товаров пуст!</h2>
                                <img className='favorites__img' src={img2} alt=""/>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Favorites;
