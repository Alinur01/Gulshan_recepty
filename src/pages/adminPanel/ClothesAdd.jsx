import React, { useState } from 'react';
import CreateColors from "./CreateColors";
import CreateSizes from "./CreateSizes";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

const ClothesAdd = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });

    const navigate = useNavigate();
    const [colors, setColors] = useState('');
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDrop = acceptedFiles => {
        setImages(prevImages => [...prevImages, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });


    const addClothes = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            images.forEach(image => formData.append('images', image));
            Object.keys(data).forEach(key => formData.append(key, data[key]));

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/clothes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Продукт успешно создан');
            navigate('/admin/clothes');
            reset();
        } catch (err) {
            console.error(err);
            toast.error('Ошибка при создании продукта');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='create__form-content' onSubmit={handleSubmit(addClothes)}>
            <div className='create__form-block'>
                <label className='create__form-label' htmlFor="title">Название</label>
                <input {...register('title', {
                    required: 'Это поле обязательное *',
                })} className='create__form-input'  type="text" id='title'/>
                <span>{errors?.title?.message}</span>
            </div>
            <div className='create__form-block'>
                <label className='create__form-label' htmlFor="price">Цена</label>
                <input {...register('price', {
                    required: 'Это поле обязательное *',
                })} className='create__form-input'  type="number" id='price'/>
                <span>{errors?.price?.message}</span>
            </div>
            <div className='create__form-block'>
                <label className='create__form-label' htmlFor="inStock">Количество</label>
                <input {...register('inStock', {
                    required: 'Это поле обязательное *',
                })} className='create__form-input'  type="number" id='inStock'/>
                <span>{errors?.inStock?.message}</span>
            </div>
            {/*<ul style={{display:"flex", flexDirection:"column", rowGap:"10px", alignItems: "flex-start"}} className='create__form-block'>*/}
            {/*    <ClothesAddBtn images={image1} setImages={setImage1} num={1}/>*/}
            {/*    <ClothesAddBtn images={image2} setImages={setImage2} num={2}/>*/}
            {/*    <ClothesAddBtn images={image3} setImages={setImage3} num={3}/>*/}
            {/*    <ClothesAddBtn images={image4} setImages={setImage4} num={4}/>*/}
            {/*    <ClothesAddBtn images={image5} setImages={setImage5} num={5}/>*/}
            {/*</ul>*/}
            <div {...getRootProps()} className='dropzone'>
                <input {...getInputProps()} />
                <p>Перетащите файлы сюда или нажмите, чтобы выбрать файл</p>
            </div>
            <div>
                {images.map((file, index) => (
                    <div key={index} className='preview'>
                        <img src={URL.createObjectURL(file)} alt='preview' />
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <ul className='create__form-colors'>
                        <li>Выберите цвет : </li>
                        <CreateColors colors={colors} setColors={setColors} color='blue'/>
                        <CreateColors colors={colors} setColors={setColors} color='black'/>
                        <CreateColors colors={colors} setColors={setColors} color='white'/>
                        <CreateColors colors={colors} setColors={setColors} color='red'/>
                        <CreateColors colors={colors} setColors={setColors} color='green'/>
                        <CreateColors colors={colors} setColors={setColors} color='orange'/>
                        <CreateColors colors={colors} setColors={setColors} color='pink'/>
                        <CreateColors colors={colors} setColors={setColors} color='grey'/>
                    </ul>
                </div>
            </div>
            <div>
                <ul className='create__form-sizes'>
                    <li>Выбрать размер :</li>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='XS'/>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='S'/>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='M'/>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='L'/>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='XL'/>
                    <CreateSizes sizes={sizes} setSizes={setSizes} size='XXL'/>
                </ul>
            </div>
            <div className='create__form-gender'>
                <p className='create__form-title'>Товар для :</p>
                <div className='create__form-inpt'>
                    <input {...register('gender')} value='man' type="radio" id='man' />
                    <label htmlFor="man">Для мужчин</label>
                </div>
                <div className='create__form-inpt'>
                    <input {...register('gender')} value='woman' type="radio" id='woman'/>
                    <label htmlFor="woman">Для женщин</label>
                </div>
                <div className='create__form-inpt'>
                    <input {...register('gender')} value='uni' type="radio" id='uni' />
                    <label htmlFor="uni">Унисекс</label>
                </div>
            </div>
            <div className='create__form-block'>
                <label htmlFor="category">Категория</label>
                <select {...register('category', {
                    required: 'Это поле обязательное *',
                })} className='create__form-select'  id='category'>
                    <option>hoody</option>
                    <option>sportsuit</option>
                    <option>sweatshirt</option>
                    <option>tshort</option>
                    <option>pants</option>
                    <option>shorts</option>
                    <option>jacket</option>
                    <option>waistcoat</option>
                    <option>sneakers</option>
                </select>
            </div>
            <button className='create__form-btn' type='submit'>Создать</button>
        </form>
    );
};

export default ClothesAdd;
