import axios from 'axios';

export const getWeatherByCity = city => {
  return axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`);
};

export const getWeatherByWoeid = woeid => {
  return axios.get(`https://www.metaweather.com/api/location/${woeid}`);
};
