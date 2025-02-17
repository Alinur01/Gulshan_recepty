import React, {useState} from 'react';
import {animateScroll} from "react-scroll";
import img from "../pages/catalog/img/1.png";
import {Link} from "react-router-dom";

const SliderCard = ({item}) => {
    const [changeImg, setChangeImg] = useState(0)
    return (
        <Link onMouseOver={() => setChangeImg(1)} onMouseOut={() => setChangeImg(0)} onClick={() => animateScroll.scrollToTop({
            delay: 0,
            duration: 0
        })} className='catalog__content-link' to={`/product/${item._id}`}>
            <img className='category__img' src={changeImg ? `${process.env.REACT_APP_STAGE_URL}${item.images[0]}` : `${process.env.REACT_APP_STAGE_URL}${item.images[1]}`} alt="img"/>
        </Link>
    );
};

export default SliderCard;
