import axios from 'axios';

const fetchWeatherByLocation = async (latitude, longitude, setWeather) => {
  setWeather({ loading: true, data: {}, error: false });
  const url = 'https://api.openweathermap.org/data/2.5/onecall';
  const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

  try {
    const res = await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric',
        appid: api_key,
      },
    });
    setWeather({ loading: false, data: res.data, error: false });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    setWeather({ loading: false, data: {}, error: true });
  }
};

export default fetchWeatherByLocation;
