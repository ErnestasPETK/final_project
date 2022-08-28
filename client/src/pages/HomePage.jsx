import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';

const HomePage = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();


    return (
        <div className='dark'>
            <div className="">
                HOME
            </div>
        </div>
    );
};

export default HomePage;