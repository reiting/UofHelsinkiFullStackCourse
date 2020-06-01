import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: capital
        };
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log(response.data);
                setCurrentWeather(response.data.current);
            });
    }, [capital]);

    return (
        <div>
            <p> Temperature: {currentWeather.temperature} Celsius</p>
            <img src={currentWeather.weather_icons} width='50px' />
            <p>Wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
        </div>
    )
}

export default Weather;
