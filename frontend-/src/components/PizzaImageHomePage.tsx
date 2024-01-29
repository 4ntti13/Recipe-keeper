/* eslint-disable @typescript-eslint/no-unused-vars */
// PizzaImageHomePage.tsx;
import React from 'react';

import pizzaImage from '../images/PizzaHomePage.jpg';
import '../styles/PizzaImageHomePage.css';


const PizzaImageHomePage = () => {
    return (
        <div className='pizza-image-container'>
            <img src={pizzaImage} alt="Pizza" className='pizza-image-home' /> 
        </div>
    )
}

export default PizzaImageHomePage; 
