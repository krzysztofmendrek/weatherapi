import React, { useState, useEffect } from 'react';
import './ForecastView.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getWeatherByCity, getWeatherByWoeid } from '../../requests';

function ForecastView() {
    const [ searchWeather, setSearchWeather ] = useState('');
    const { city } = useParams();


    useEffect(() => {
        getWeatherByCity(city).then(searchCity => {
            const woeid = searchCity.data[0].woeid
          
            getWeatherByWoeid(woeid).then(resp => {
            const data = resp.data.consolidated_weather[0]
            setSearchWeather(data);
            console.log(data);
            // Object.keys(data).map(key => console.log(key));
            }).catch(err => err);
            
        }).catch(err => err);
    }, [city]);

    const currentTemp = Math.round(searchWeather['the_temp']);
    const maxTemp = Math.round(searchWeather['max_temp']);
    const minTemp = Math.round(searchWeather['min_temp']);
    const pred = Math.round(searchWeather.predictability);
    const windSpeed = Math.round(searchWeather['wind_speed']);
    

    return(

        <div id="weatherForecastView" className="weather-info__forecast-view">
            {/* <Link to={'/'}
            className="weather-info__btn-return">
            return
            </Link> */}

            <div className="weather-info--top">
                <h1 id="weatherCity">{city}</h1>
                <p>{searchWeather['applicable_date']}</p>
            </div>
            <h2 className='heading-currently-temperatures'>AHORA</h2>
            <div className="weather-info--middle">
                <div className='weather-info__temperatures'>
                    <p>{currentTemp}°</p>
                </div>
                <div className='vertical-line'></div>
                <div className='weather-info__description'>
                    <p>{searchWeather['weather_state_name']}</p>
                </div>
                <div className='vertical-line'></div>
                <div className='weather-info__image-description'>
                    <img className='weather-info__img' 
                    src={`https://www.metaweather.com/static/img/weather/${searchWeather['weather_state_abbr']}.svg`} 
                    alt='weather icon' />
                </div>
            </div>
            <div className="weather-info--bottom">
                <div>
                    <h2>MAX</h2>
                    <p><span>{maxTemp}°</span></p>
                </div>
                <div>
                    <h2>MIN</h2>
                    <p><span>{minTemp}°</span></p>
                </div>
                <div>
                    <h2>LLUVIA</h2>
                    <p><span>{pred}</span>%</p>
                </div>
                <div>
                    <h2>VIENTO</h2>
                    <p><span>{windSpeed}</span>km/h</p>
                </div>
            </div>
        </div>
    );   
}

export default ForecastView;
