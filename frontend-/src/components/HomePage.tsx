/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import PizzaImageHomePage from './PizzaImageHomePage';
import TextBoxHomePage from './TextBoxHomePage';

const HomePage = () => {
    return (
        <div className='home-container'>
            <TextBoxHomePage />
            <PizzaImageHomePage />
        </div>
    )
}

export default HomePage;


