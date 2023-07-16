import React, { useEffect, useState } from "react";
import IMAGES from "../images/index.js";
import AnimatedWeather from "react-animated-weather";

export default function Locationdata(props) {
  const [currentTime, setTime] = useState(new Date());
  const [currentDate, setDate] = useState(new Date());
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [changeCity, setChangeCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [changeCountry, setChangeCountry] = useState(null);
  const [tempc, setTempC] = useState(null);
  const [changeTempc, setChangeTempc] = useState(null);
  const [tempf, setTempf] = useState(null);
  const [tempmin, setTemMin] = useState(null);
  const [tempmax, setTemMax] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [windSpeed, setWingSpeed] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [wicon, setWicon] = useState(null);

  const [searchTerm, setSearch] = useState("");  // use for search city
  // function is use to decide, which icon should be display as per the weather condition
  const switchFunc = (weather) => {
    switch (weather) {
      case "Haze":
        setIcon("CLEAR_DAY");
        setWicon(
          <img
            src={IMAGES.Haze}
            style={{ width: "33px", height: "33px", color: "red" }}
            alt=""
          />
        );
        break;
      case "Clouds":
        setIcon("CLOUDY");
        setWicon(
          <img
            src={IMAGES.Clouds}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Rain":
        setIcon("RAIN");
        setWicon(
          <img
            src={IMAGES.Rain}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Snow":
        setIcon("SNOW");
        setWicon(
          <img
            src={IMAGES.Snow}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Dust":
        setIcon("WIND");
        setWicon(
          <img
            src={IMAGES.Dust}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Drizzle":
        setIcon("SLEET");
        setWicon(
          <img
            src={IMAGES.Drizzle}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Fog":
        setIcon("FOG");
        setWicon(
          <img
            src={IMAGES.Fog}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Smoke":
        setIcon("FOG");
        setWicon(
          <img
            src={IMAGES.Smoke}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      case "Tornado":
        setIcon("WIND");
        setWicon(
          <img
            src={IMAGES.Tornado}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
        break;
      default:
        setIcon("CLEAR_DAY");
        setWicon(
          <img
            src={IMAGES.Clear_Day}
            style={{ width: "33px", height: "33px" }}
            alt=""
          />
        );
    }
  };

  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthList = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //edd469146324e4538ce7f85680b2048c
  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      let l = new Date();
      setTime(l);
      setDate(l);
    }, 1000);

    if (navigator.geolocation) {
      // if user has grant the permission then , the latitude and longitude will be detected
      const handleSuccess = (position) => {
        // const { latitude, longitude } = position.coords;
        let lati = position.coords.latitude;
        let longi = position.coords.longitude;
        setUserLocation({ lati, longi });
      };

      const handleError = (error) => {
        // Handle any errors that occur while fetching the location
        console.log(error);
        alert("not allowed");
      };
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.log("access denied");
      alert("location denied");
    }

    return () => {
      clearInterval(timeIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /// to check the user location . if granted or not then , fetch the data
  useEffect(() => {
    if (userLocation) {
      const showData = async () => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lati}&lon=${userLocation.longi}&appid=edd469146324e4538ce7f85680b2048c`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);

          // fetching all imporatant parameters
          const cityName = data.name;
          const countryName = data.sys.country;
          const tempc = Math.round(data.main.temp - 273.15);
          const tempf = Math.round(data.main.temp * 1.8 + 32);
          const tempmin = Math.round(data.main.temp_min - 273.15);
          const tempmax = Math.round(data.main.temp_max - 273.15);
          const pressure = data.main.pressure;
          const humidity = Math.round(data.main.humidity);
          const weather = data.weather[0].main;
          const windSpeed = data.wind.speed;
          const visibility = data.visibility;

          //const icon = data.weather[0].main

          setCity(cityName);
          setCountry(countryName);
          setTempC(tempc);
          setTempf(tempf);
          setTemMin(tempmin);
          setTemMax(tempmax);
          setPressure(pressure);
          setHumidity(humidity);
          setWeather(weather);
          setWingSpeed(windSpeed);
          setVisibility(visibility);

          //setIcon(icon);

          switchFunc(weather);
        } catch (error) {
          console.log(error);
        }
      };
      showData();
    }

    // eslint-disable-next-line
  }, [userLocation]);

  // handle the search functionality
  const handleSearch = async () => {
    setSearch("");
    console.log(searchTerm);
    let searchvalue = searchTerm
      .charAt(0)
      .toUpperCase()
      .concat(searchTerm.slice(1).toLocaleLowerCase());
    let url = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchvalue}&appid=edd469146324e4538ce7f85680b2048c`
    );
    let data = await url.json();
    console.log(data);
    let lat = data[0].lat;
    console.log("lat", lat);
    let lon = data[0].lon;

    if (searchvalue === data[0].name) {
      const searchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=edd469146324e4538ce7f85680b2048c`;
      let search = await fetch(searchUrl);
      let searchResponse = await search.json();
      console.log("aa", searchResponse);

      const cityName = searchResponse.name;
      const countryName = searchResponse.sys.country;
      const tempc = Math.round(searchResponse.main.temp - 273.15);
      const tempf = Math.round(searchResponse.main.temp * 1.8 + 32);
      const tempmin = Math.round(searchResponse.main.temp_min - 273.15);
      const tempmax = Math.round(searchResponse.main.temp_max - 273.15);
      const pressure = searchResponse.main.pressure;
      const humidity = Math.round(searchResponse.main.humidity);
      const weather = searchResponse.weather[0].main;
      const windSpeed = searchResponse.wind.speed;
      const visibility = searchResponse.visibility;

      setChangeCity(cityName);
      setChangeCountry(countryName);
      setChangeTempc(tempc);
      setTempf(tempf);
      setTemMin(tempmin);
      setTemMax(tempmax);
      setPressure(pressure);
      setHumidity(humidity);
      setWeather(weather);
      setWingSpeed(windSpeed);
      setVisibility(visibility);
      switchFunc(weather);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      {userLocation ? (
        <div className="container">
          <div className="locationdata" id="first">
            <div className="location">
              <h5>
                {city} <sub>{country}</sub>
              </h5>
            </div>
            <div id="temp">
              <h5>{tempc}°C</h5>
            </div>

            <div className="time">
              <h5>{currentTime.toLocaleTimeString()}</h5>
            </div>
            <div className="date">
              <h6>
                {dayList[currentDate.getDay()]} {currentDate.getDate()}{" "}
                {monthList[currentDate.getMonth()]}
              </h6>
            </div>
          </div>
          <div className="locationdata" id="second">
            <div className="anime">
              <AnimatedWeather
                icon={icon}
                color={"white"}
                size={70}
                animate={true}
              />
              <h5>
                {weather}
                {wicon}
              </h5>
            </div>
            <div className="searCity">
              <input
                className="search-box"
                id="searchInput"
                type="text"
                name=""
                value={searchTerm}
                placeholder="Search city"
                onChange={handleChange}
              />
              <span
                className={`search-icon ${
                  searchTerm.length === 0 ? "disabled" : ""
                }`}
                onClick={handleSearch}
              >
                &#128269;
              </span>
              <button
                id="btn"
                type="submit"
                onClick={handleSearch}
                disabled={searchTerm.length === 0}
              >
                Search
              </button>
            </div>
            <div className="listContain">
              <ul className="ull">
                <li className="ulList">
                  City: {changeCity ? changeCity : city}{" "}
                  <sub>{changeCountry ? changeCountry : country}</sub>
                </li>
                <li className="ulList">
                  Temp: {changeTempc ? changeTempc : tempc}°C
                </li>
                <li className="ulList">Max Temp: {tempmax}°C </li>
                <li className="ulList">Min Temp: {tempmin}°C</li>
                <li className="ulList">Temp Farh: {tempf}°F</li>
                <li className="ulList">Humidity: {humidity}%</li>
                <li className="ulList">Pressure: {pressure} pas</li>
                <li className="ulList">Wind Speed: {windSpeed}km/h</li>
                <li className="ulList">Visibility: {visibility}mi</li>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>Loading user location...</div>
      )}
    </>
  );
}
