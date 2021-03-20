import React, { useEffect, useState } from 'react';
import data from '../../data.json'
import bg from '../../images/Bg.png'
import Header from '../Header/Header';
import MainBody from '../MainBody/MainBody';
import './Home.css'

const Home = () => {
    const [card, setCard] = useState([]);

    useEffect(() => {
        setCard(data)
    }, [])

    const style = {
        backgroundImage: ` url(${bg})`,
        height: '800px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <div className="mainBody" style={style} >
            <div className="container">
                <div className="row">
                    {
                        card.map(card => <MainBody card={card} ></MainBody>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;