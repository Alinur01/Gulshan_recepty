import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios";
import {registerUser} from "../../../redux/reducers/user";
import {useNavigate} from "react-router-dom";
import {removeCart} from "../../../redux/reducers/basket";
import {toast, ToastContainer} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import {toISOStringWithTimezone} from "../../../format";


const Order = () => {

    const user = useSelector((s) => s.user.user)
    const basket = useSelector(s => s.basket.basket)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {
        register,
        reset,
        handleSubmit
    } = useForm()



    const handleOrders = (data) => {
        axios.post(`/orders`, {
            ...data,
            time: toISOStringWithTimezone(new Date()),
            orders: basket,
            price: basket.reduce((acc, rec) => acc + rec.count * rec.price, 0),
            status: 'pending',
            number: uuidv4(),
            _id: user._id
        })
            .then(async (res) => {
                await navigate('/');

                await localStorage.setItem('user', JSON.stringify(res.data));
                await dispatch(registerUser({obj: res.data}));
                await dispatch(removeCart({arr: []}));
                await reset();
                await toast("Заказ успешно совершен!")
            });
    }




    return (
        <div className='order'>
            <h2 className='order__title'>Оформление заказа</h2>

            <form className='order__form' onSubmit={handleSubmit(handleOrders)}>
                <div className='order__left'>
                    <div className='order__method'>
                        <h2 className='order__method-title'>Способ оплаты:</h2>
                        <div className='order__method-content'>
                            <div>
                                <input {...register("cash")} className='order__method-input' checked type="radio" id="cash"
                                       name="method" value="cash"/>
                                <label className='order__method-label' htmlFor="cash">Наличными</label>
                            </div>
                            <div>
                                <input {...register("card")} className='order__method-input' type="radio" id="contactChoice2"
                                       name="method" value="card"/>
                                <label className='order__method-label' htmlFor="contactChoice2">Картой</label>
                            </div>
                        </div>
                    </div>
                    <p className='order__text'>Персональные данные:</p>
                    <div className='order__inputs'>
                        <div>
                            <input {...register("name")} className='order__input' placeholder='Ваше имя*' type="text"/>
                            <input {...register("surname")} className='order__input' placeholder='Ваша фамилия*'
                                   type="text"/>
                            <input {...register("city")} className='order__input' placeholder='Город*' type="text"/>
                        </div>
                        <div>
                            <input {...register("email")} defaultValue={user.email} className='order__input'
                                   placeholder='Ваш e-mail*' type="email"/>
                            <input {...register("phone")} defaultValue={user.phone} className='order__input'
                                   placeholder='Ваш телефон*' type="tel"/>
                            <input {...register("delivery")} className='order__input' placeholder='Адрес доставки *'
                                   type="tel"/>
                        </div>
                    </div>

                </div>
                <div className='order__total'>
                    <p className='order__grn'>Итого к оплате:</p>
                    <p className='order__grn'>{basket.reduce((acc, rec) => acc + rec.count * rec.price, 0)} сом</p>
                    <button className='order__btn' type='submit'>ОФОРМИТЬ ЗАКАЗ</button>
                    <p className='order__agree'>Нажимая на кнопку «оплатить заказ», <br/>
                        я принимаю условия публичной оферты и политики конфиденциальности</p>
                </div>

            </form>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Order;
