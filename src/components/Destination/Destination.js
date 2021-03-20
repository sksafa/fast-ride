import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import data from '../../data.json'
import map from '../../images/Map.png'
import logo from '../../images/peopleicon.png'
import GoogleMap from '../GoogleMap/GoogleMap';
import { UserLocation } from '../SearchArea/SearchArea';
import './Destination.css'




const Destination = () => {
    //    const [destination, setDestination] = useContext(UserLocation);
    const { id } = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        setCategory(data[id])
    })

    //console.log(destination)
    return (
        <div className="container" >
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <div className="searchField">
                        <div>
                            <p>Mirpur</p>
                            <p>Malibug</p>
                        </div>
                        <div className="searchContent">
                            <img src={category.image} alt="" />
                            <p>{category.name}</p>
                            <img className="desLogo" src={logo} alt="" />
                            <h5>4</h5>
                            <h4>$67</h4>
                        </div>

                        <div className="searchContent">
                            <img src={category.image} alt="" />
                            <p>{category.name}</p>
                            <img className="desLogo" src={logo} alt="" />
                            <h5>4</h5>
                            <h4>$67</h4>
                        </div>

                        <div className="searchContent">
                            <img src={category.image} alt="" />
                            <p>{category.name}</p>
                            <img className="desLogo" src={logo} alt="" />
                            <h5>4</h5>
                            <h4>$67</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12">
                    <div className="mapSection">
                        <GoogleMap></GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;