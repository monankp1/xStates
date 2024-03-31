import React,{useEffect, useState} from 'react';
import axios from "axios";

const States = () => {


    const [countries, setCountries] = useState([]);
    const [display, setDisplay] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState({
        country: '',
        state: '',
        city: ''
    });

    const getCountries = async () => {
        try {
            const response = await axios.get('https://crio-location-selector.onrender.com/countries');
            setCountries(response.data);
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    }

    useEffect(() => {
        getCountries();
    },[]);

    const handleCountries = async(countryName) => {
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
            setStates(response.data);
            setData((prevData) => ({
                ...prevData, country: countryName
            }));
        } catch (error) {
            console.error("Error fetching states", error);
        }
    };

    const handleState = async(countryName, stateName) => {
        try {
            const response = await axios.get(` https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
            setCities(response.data);
            setData((prevData) => ({
            ...prevData, state: stateName
        }));
        } catch (error) {
            console.error("Error fetching cities", error);
        }
    }

    const handleCities = async(city) => {
        setData((prevData) => ({
            ...prevData, city: city
        }));
        setDisplay(true);
    }

  return (
    <div>
        <h1>Select Location</h1>
        <select onChange={(e) => handleCountries(e.target.value)}>
            <option value='' disabled selected>Select Country</option>
            {Array.isArray(countries) && countries.map((country,idx) => {
                return (
                    <option key={idx} value={country}>{country}</option>
                )
            })}
        </select>

        <select disabled={!data.country} onChange={(e) => handleState(data.country, e.target.value)}>
            <option value='' disabled selected >Select State</option>
            {Array.isArray(states) && states.map((state,idx) => {
                return (
                    <option key={idx} value={state}>{state}</option>
                )
            })}
        </select>

        <select disabled={!data.state} onChange={(e) => handleCities(e.target.value)}>
            <option value='' disabled selected >Select City</option>
            {Array.isArray(cities) && cities.map((city,idx) => {
                return (
                    <option key={idx} value={city}>{city}</option>
                )
            })}
        </select>
        {display && <p>You selected {data.city}, {data.state}, {data.country}</p>}
        
    </div>
  )
}

export default States