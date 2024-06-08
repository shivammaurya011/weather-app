import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { TbSunrise, TbSunset } from "react-icons/tb";
import "../../index.css";

function Home({ location }) {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
console.log(location)
  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    setWeather({ ...weather, loading: true });
    const url = "https://api.openweathermap.org/data/2.5/onecall";
    const api_key = "f00c38e0279b7bc85480c3fe775d518c";
    try {
      const res = await axios.get(url, {
        params: {
          lat: latitude,
          lon: longitude,
          units: "metric",
          appid: api_key,
        },
      });
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log("error", error);
    }
  };

  const fetchWeatherBySearch = async (query) => {
    setWeather({ ...weather, loading: true });
    const geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct";
    const weatherUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const api_key = "f00c38e0279b7bc85480c3fe775d518c";
    try {
      const geocodingRes = await axios.get(geocodingUrl, {
        params: {
          q: query,
          limit: 1,
          appid: api_key,
        },
      });
      const { lat, lon } = geocodingRes.data[0];
      const weatherRes = await axios.get(weatherUrl, {
        params: {
          lat,
          lon,
          units: "metric",
          appid: api_key,
        },
      });
      setWeather({ data: weatherRes.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (location) {
      if (typeof location === "string") {
        fetchWeatherBySearch(location);
      } else {
        const { latitude, longitude } = location;
        fetchWeatherByLocation(latitude, longitude);
      }
    }
  }, [location]);

  return (
    <div className="py-4 flex flex-col gap-6 px-8">
      {weather.loading && (
        <div className="flex justify-center items-center">
          <Oval color="black" height={50} width={50} />
        </div>
      )}
      {weather.error && (
        <div className="flex flex-col items-center text-red-500">
          <FontAwesomeIcon icon={faFrown} size="3x" />
          <p className="text-lg mt-2">Error fetching weather data</p>
        </div>
      )}
      <div className="flex gap-6">
        <div className="w-2/5 h-60 flex flex-col justify-around items-center rounded-2xl bg-gray-100 p-8">
          <h2 className="text-2xl font-bold">{weather.data.timezone}</h2>
          <div>
            <h2 className="text-4xl font-bold">
              {new Date().toLocaleTimeString()}
            </h2>
            <p className="text-center mt-1">{toDateFunction()}</p>
          </div>
        </div>
        <div className="w-3/5 h-60 rounded-2xl flex bg-gray-100 p-4">
          {weather.data.current && (
            <div className="flex justify-between p-4 items-center w-full">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-6xl font-extrabold ">
                    {Math.round(weather.data.current.temp)}°C
                  </h2>
                  <p className="text-xl font-bold">
                    Feels like {Math.round(weather.data.current.feels_like)}°C
                  </p>
                </div>
                <div>
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-4xl font-semibold">
                      <TbSunrise />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">Sunrise</p>
                      <p>
                        {new Date(
                          weather.data.current.sunrise * 1000
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-4xl font-semibold">
                      <TbSunset />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">Sunset</p>
                      <p>
                        {new Date(
                          weather.data.current.sunset * 1000
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.data.current.weather[0].icon}@2x.png`}
                  alt={weather.data.current.weather[0].description}
                />
                <h3 className="text-2xl font-bold">
                  {weather.data.current.weather[0].description.toUpperCase()}
                </h3>
              </div>
              <div className="flex gap-2 flex-col">
                <div className="flex justify-between">
                  <div className="text-center px-2">
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/humidity.png"
                      alt="Humidity Icon"
                    />
                    <h5 className="text-lg font-semibold">
                      {weather.data.current.humidity}%
                    </h5>
                    <p>Humidity</p>
                  </div>
                  <div className="text-center px-2">
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/barometer-gauge.png"
                      alt="Pressure Icon"
                    />
                    <h5 className="text-lg font-semibold">
                      {weather.data.current.pressure} hPa
                    </h5>
                    <p>Pressure</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-center px-2">
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/wind.png"
                      alt="Wind Speed Icon"
                    />
                    <h5 className="text-lg font-semibold">
                      {weather.data.current.wind_speed} km/h
                    </h5>
                    <p>Wind Speed</p>
                  </div>
                  <div className="text-center px-2">
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/sun.png"
                      alt="UV Icon"
                    />
                    <h5 className="text-lg font-semibold">
                      {weather.data.current.uvi}
                    </h5>
                    <p>UV Index</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-1/3 rounded-2xl bg-gray-100 p-4">
          <h2 className="text-xl font-bold text-center mb-2">5 Days Forecast</h2>
          <div className="space-y-2">
            {weather.data.daily &&
              weather.data.daily.slice(0, 5).map((day, index) => (
                <div className="flex justify-between items-center" key={index}>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p className="text-lg font-semibold">
                    {Math.round(day.temp.day)}°C
                  </p>
                  <p className="text-lg font-semibold">
                    {new Date(day.dt * 1000)
                      .toLocaleDateString(undefined, {
                        weekday: "short",
                      })
                      .substring(0, 3)}
                  </p>
                  <p className="text-lg font-semibold">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-2/3 rounded-2xl bg-gray-100 p-4">
          <h2 className="text-xl text-center mb-6 font-bold">Hourly Forecast</h2>
          <div className="flex items-center justify-around">
            {weather.data.hourly &&
              weather.data.hourly.slice(0, 5).map((hour, index) => (
                <div
                  className={`flex flex-col justify-between gap-4 py-8 rounded-full px-4 items-center ${
                    Math.round(hour.temp) >= 25
                      ? "bg-gradient-to-t from-red-100 to-orange-400"
                      : "bg-gradient-to-r from-blue-200 to-cyan-200"
                  }`}
                  key={index}
                >
                  <p className="text-lg font-semibold">
                    {new Date(hour.dt * 1000).getHours()}:00
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    alt={hour.weather[0].description}
                  />
                  <p className="text-lg font-semibold">
                    {Math.round(hour.temp)}°C
                  </p>
                  <p>{hour.wind_speed} m/s</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
