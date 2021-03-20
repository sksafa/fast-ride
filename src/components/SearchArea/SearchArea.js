import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import data from '../../data.json'
import map from '../../images/Map.png'
import './SearchArea.css'
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import bg from '../../images/Bg.png'
import GoogleMap from '../GoogleMap/GoogleMap';


export const UserLocation = createContext();

const SearchArea = () => {
    const { id } = useParams();

    const [destination, setDestination] = useState({
        pikUp: "",
        pikTo: ""


    })



    const handelPassData = (e) => {
        let setField;
        if (e.target.name === 'pikUp') {
            setField = e.target.value;

        }
        if (e.target.name === 'pikTo') {
            setField = e.target.value;
        }
        if (setField) {
            const newDestination = { ...destination };
            newDestination[e.target.name] = e.target.value;
            setDestination(newDestination);
            console.log(destination)

        }

    }
    const handelOnSubmit = (e) => {
        //const newDes = {...destination}
        //   setDestination.push(newDes);

        e.preventDefault();
    }

    const style = {
        backgroundImage: ` url(${bg})`,
        height: '800px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <UserLocation.Provider value={[destination, setDestination]}>
            <div className="container" >
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="searchField">

                            <form onSubmit={() => handelOnSubmit} >
                                <p>pick from</p>
                                <input required onBlur={handelPassData} name="pikUp" type="text" />
                                <p>pick to</p>
                                <input required onBlur={handelPassData} name="pikTo" type="text" />
                                <br />
                                <Link to={`/Destination/${id}`}>
                                    <button >Search</button>
                                </Link>
                            </form>

                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="mapSection">
                            <GoogleMap></GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
        </UserLocation.Provider>
    );
};

export default SearchArea;