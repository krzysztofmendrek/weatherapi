import React, { useState, useEffect } from 'react';
import './ForecastView.css';
import { useParams } from 'react-router';
import { getWeatherByCity, getWeatherByWoeid } from '../../requests';
import errorIcon from '../../assets/Icon/error.svg';
import Loader from '../Shared/Loader/Loader';
import { Line } from 'react-chartjs-2';

function ForecastView() {
    const [ searchWeather, setSearchWeather ] = useState('');
    const [ isLoading, setLoadingState ] = useState(true);
    const [ isError, setErrorState ] = useState(false);
    const [ chart, setChart ] = useState('');
    const { city } = useParams();


    useEffect(() => {
        setLoadingState(true);
        getWeatherByCity(city).then(searchCity => {
            
            const woeid = searchCity.data[0].woeid
            getWeatherByWoeid(woeid).then(resp => {
            const data = resp.data.consolidated_weather[0]

            const dataChart = {
                labels: [
                    resp.data.consolidated_weather[0]['applicable_date'], 
                    resp.data.consolidated_weather[1]['applicable_date'],
                    resp.data.consolidated_weather[2]['applicable_date'],
                    resp.data.consolidated_weather[3]['applicable_date'],
                    resp.data.consolidated_weather[4]['applicable_date'],
                    ],
                datasets: [
                    {
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: '#77BCEE',
                        pointBackgroundColor: '#F19290',
                        data: [
                            resp.data.consolidated_weather[0]['the_temp'], 
                            resp.data.consolidated_weather[1]['the_temp'],
                            resp.data.consolidated_weather[2]['the_temp'],
                            resp.data.consolidated_weather[3]['the_temp'],
                            resp.data.consolidated_weather[4]['the_temp'],
                        ]
                    }
                ]
                    
            }

            setChart(dataChart);

            const listOfData = {
                cityName: city.toUpperCase(),
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

            }).catch(() => {
                setErrorState(true);
                setLoadingState(false);
                return
            });

            setErrorState(false);
        
        }).catch(() => {
            setErrorState(true);
            setLoadingState(false);
            return
        });
        
        setErrorState(false);

        setLoadingState(false);

    }, [city]);
    
    return(
        <>
        { !isLoading && !isError && (
            <div id="weatherForecastView" className="weather-info__forecast-view">
                <div className="weather-info--top">
                    <h1 id="weatherCity">{searchWeather.cityName}</h1>
                    <p>{searchWeather.date === 'null' ? 'N/A' : searchWeather.date}</p>
                </div>
                <h2 className='heading-currently-temperatures'>AHORA</h2>
                <div className="weather-info--middle">
                    <div className='weather-info__temperatures'>
                        <p>{searchWeather.currentTemp === 'null' ? 'N/A' : searchWeather.currentTemp}°</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='weather-info__description'>
                        <p>{searchWeather.weatherName === 'null' ? 'N/A' : searchWeather.weatherName}</p>
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
                        <p><span>{searchWeather.maxTemp === 'null' ? 'N/A' : searchWeather.maxTemp}°</span></p>
                    </div>
                    <div>
                        <h2>MIN</h2>
                        <p><span>{searchWeather.minTemp === 'null' ? 'N/A' : searchWeather.minTemp}°</span></p>
                    </div>
                    <div>
                        <h2>LLUVIA</h2>
                        <p><span>{searchWeather.pred === 'null' ? 'N/A' : searchWeather.pred}</span>%</p>
                    </div>
                    <div>
                        <h2>VIENTO</h2>
                        <p><span>{searchWeather.windSpeed === 'null' ? 'N/A' : searchWeather.windSpeed}</span>km/h</p>
                    </div>
                </div>
                <div className='weather-info__chart-wrapper'>
                    <Line 
                        data={chart}
                        options = {{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    ticks: { display: false },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                    }
                                }],
                                yAxes: [{
                                    ticks: { display: false },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                    }   
                                }]
                            },
                            legend:{
                                display: false,
                            }
                        }
                        }
                    />
                </div>
            </div>
            )
        } {
            isError && !isLoading && (
                <section className='info-error'>
                    <div className='error-wrapper'>
                        <img src={errorIcon} alt='error alert'/>
                        <h1>Incorrectly name of the city!</h1>
                    </div>
                </section>
            )
        }
        {
            isLoading && <Loader />
        } 
        </>
    );   
}

export default ForecastView;
