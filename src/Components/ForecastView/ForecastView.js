import React, { useState, useEffect } from 'react';
import './ForecastView.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getWeatherByCity, getWeatherByWoeid } from '../../requests';
import Loader from '../Shared/Loader/Loader';

function ForecastView() {
    const [ searchWeather, setSearchWeather ] = useState('');
    const [ isLoading, setLoadingState ] = useState(true);
    const [ isError, setErrorState ] = useState(false);
    const { city } = useParams();


    useEffect(() => {
        setLoadingState(true);
        getWeatherByCity(city).then(searchCity => {
            const woeid = searchCity.data[0].woeid
            getWeatherByWoeid(woeid).then(resp => {
            const data = resp.data.consolidated_weather[0]
            console.log(data);
            
            const listOfData = {
                currentTemp: Math.round(data['the_temp']),
                minTemp: Math.round(data['min_temp']),
                maxTemp: Math.round(data['max_temp']),
                pred: Math.round(data.predictability),
                windSpeed: Math.round(data['wind_speed']),   
                date: data['applicable_date'],
                weatherName: data['weather_state_name'].toUpperCase(),
                weatherIcon: data['weather_state_abbr'],
            }

            setSearchWeather(listOfData);

            }).catch(err => err);

            setLoadingState(false)
        
        }).catch(err => err);
    }, [city]);
    
    return(
        <>
        { !isLoading && (
            <div id="weatherForecastView" className="weather-info__forecast-view">
                {/* <Link to={'/'}
                className="weather-info__btn-return">
                return
                </Link> */}

                <div className="weather-info--top">
                    <h1 id="weatherCity">{city}</h1>
                    <p>{searchWeather.date}</p>
                </div>
                <h2 className='heading-currently-temperatures'>AHORA</h2>
                <div className="weather-info--middle">
                    <div className='weather-info__temperatures'>
                        <p>{searchWeather.currentTemp}°</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='weather-info__description'>
                        <p>{searchWeather.weatherName}</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='weather-info__image-description'>
                        <img className='weather-info__img' 
                        src={`https://www.metaweather.com/static/img/weather/${searchWeather.weatherIcon}.svg`} 
                        alt='weather icon' />
                    </div>
                </div>
                <div className="weather-info--bottom">
                    <div>
                        <h2>MAX</h2>
                        <p><span>{searchWeather.maxTemp}°</span></p>
                    </div>
                    <div>
                        <h2>MIN</h2>
                        <p><span>{searchWeather.minTemp}°</span></p>
                    </div>
                    <div>
                        <h2>LLUVIA</h2>
                        <p><span>{searchWeather.pred}</span>%</p>
                    </div>
                    <div>
                        <h2>VIENTO</h2>
                        <p><span>{searchWeather.windSpeed}</span>km/h</p>
                    </div>
                </div>
            </div>
            )
        } {
        isLoading && <Loader />
        }
        </>
    );   
}

export default ForecastView;
