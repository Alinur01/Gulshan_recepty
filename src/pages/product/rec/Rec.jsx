import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Navigation, Mousewheel, Keyboard, Autoplay} from "swiper/modules";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {animateScroll} from 'react-scroll'


const Rec = () => {
    const clothes = useSelector(s => s.clothes.clothes);
    const  params = useParams();


    return (
        <div className='rec'>
            <h3 className='rec__title'>Вам может понравиться</h3>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                speed={1000}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    350: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    420: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    620: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },

                    // when window width is >= 640px
                    621: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                autoPlay={true}
                keyboard={true}
                navigation={true}
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                {
                    clothes &&  clothes.filter((item) => item.category === clothes.find(el => el._id == params.id).category && item._id != params.id).map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className='category__content'>
                                <Link className='catalog__content-link' to={`/product/${item._id}`} onClick={() => animateScroll.scrollToTop({
                                    delay: 0,
                                    duration: 0
                                })}>
                                    <img className='category__img' src={`${process.env.REACT_APP_STAGE_URL}${item.images[0]}`} alt="img"/>
                                </Link>
                                <p className='rec__name'>{item.title}</p>
                                <p>{item.price}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Rec;
