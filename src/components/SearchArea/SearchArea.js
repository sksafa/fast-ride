import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import data from '../../data.json'

const SearchArea = () => {
    const { id } = useParams();
    const [category ,setCategory] =useState({});

    useEffect(()=>{
        setCategory(data[id])
    })
    return (
        <div>
           <p> this is search area{id} </p>
           <img src={category.image} alt=""/>
          <Link to="/login">aaa</Link>
        </div>
    );
};

export default SearchArea;