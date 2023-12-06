import "./app.css"
import { useEffect, useRef, useState } from "react"
import { ClockIcon, HumidityIcon, MoonIcon, SettingsIcon, SpeedIcon, SunIcon, TempIcon, WindChillIcon, WindIcon } from "./assets/icons";
import Weather from "./models/weather";
import Forecast from "./models/forecast";
import useBoolean from "./hooks/useBoolean";

function App() {
  const [location, setLocation] = useState(null);

  function getCurrentLocation() {
    if (!'geolocation' in navigator) {
      alert('Geolocalization can not be used in this navigator')
    } else {
      const result = navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(locationTest)
      }, (err) => {
        if (err.message.includes("Only secure origins are allowed")) {
          setLocation(locationTest)
        } else {
          alert('Geolocalization failed, ' + err.message);
        }
      });
    }
  }

  useEffect(getCurrentLocation, []);

  const [currentWeather, setCurrentWeather] = useState(null);
  function getWeatherInfo() {
    if (location) {
      const { lat, lon } = location;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key1}`)
        .then(res => res.json())
        .then(res => {
          const weatherInfo = new Weather(res);
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key1}`)
            .then(res => res.json())
            .then(res => {
              const forecastsInfo = res.list.slice(0, 10).map((data) => new Forecast(data));
              weatherInfo.forecasts = forecastsInfo;
              setCurrentWeather(weatherInfo);
            });
        });
    }
  }

  useEffect(getWeatherInfo, [location]);

  const hourSwitch = useBoolean();
  const speedSwitch = useBoolean();
  const tempSwitch = useBoolean();
  const menuSwitch = useBoolean();

  return <>
    <nav>
      <div className="toolBar">
        <button onClick={menuSwitch.toggleState}><SettingsIcon /></button>
      </div>
    </nav>

    <main className={`appearDownAnimation ${menuSwitch.state ? "hidden" : "shown"}`}>
      <header>
        <h1 className="sectionTitle">{currentWeather?.city} - {currentWeather?.country}</h1>
        <div id="date">
          <h2>{currentWeather?.time.date}</h2>
          <h2>{hourSwitch.state ? currentWeather?.time.hour12 : currentWeather?.time.hour24}</h2>
        </div>
      </header>

      <section id="primaryInfo">
        <div id="primaryIconContainer">
          {currentWeather && <img src={`https://openweathermap.org/img/wn/${currentWeather.main.icon}.png`} alt="Weather icon" />}
        </div>
        <div id="weatherInfo">
          <h1 id="temperature">{tempSwitch.state ? currentWeather?.main.tempC : currentWeather?.main.tempF}<span id="measurement">{tempSwitch.state ? "°C" : "°F"}</span></h1>
          <h2 className="weather">{currentWeather?.main.description}</h2>
          <h2 className="weather">- {currentWeather?.main.mainWeather}</h2>
        </div>
      </section>

      <section id="secondaryInfo">
        <article className="secondaryCard">
          <div className="cardTitle">
            <div className="iconContainer">
              <WindIcon />
            </div>
            <h1 className="secondaryTextTitle">Wind</h1>
          </div>
          <p className="secondaryTextValue">{`${speedSwitch.state ? currentWeather?.secondary.windSpeedKmph : currentWeather?.secondary.windSpeedMph} - ${currentWeather?.secondary.windDirection}`}</p>
        </article>

        <article className="secondaryCard">
          <div className="cardTitle">
            <div className="iconContainer" id="humidityIcon">
              <HumidityIcon />
            </div>
            <h1 className="secondaryTextTitle">Humidity</h1>
          </div>
          <p className="secondaryTextValue">{currentWeather?.secondary.humidity}%</p>
        </article>

        <article className="secondaryCard">
          <div className="cardTitle">
            <div className="iconContainer">
              <WindChillIcon />
            </div>
            <h1 className="secondaryTextTitle">Wind chill</h1>
          </div>
          <p className="secondaryTextValue">{tempSwitch.state ? currentWeather?.secondary.windChillC : currentWeather?.secondary.windChillF}</p>
        </article>
      </section>

      <section id="tertiartyInfo">
        <article className="tertiartyCard">
          <div className="cardTitle">
            <div className="iconContainer">
              <SunIcon />
            </div>
            <h1 className="tertiaryTextTitle">Sunrise</h1>
          </div>
          <p className="tertiaryTextValue">{hourSwitch.state ? currentWeather?.dayCycle.sunrise12 : currentWeather?.dayCycle.sunrise24}</p>
        </article>

        <article className="tertiartyCard">
          <div className="cardTitle">
            <div className="iconContainer">
              <MoonIcon />
            </div>
            <h1 className="tertiaryTextTitle">Sunset</h1>
          </div>
          <p className="tertiaryTextValue">{hourSwitch.state ? currentWeather?.dayCycle.sunset12 : currentWeather?.dayCycle.sunset24}</p>
        </article>
      </section>

      <section id="forecastSection">
        <article className="forecastCard">
          <p className="forecastHour" style={{ height: hourSwitch.state ? "24px" : "12px" }}>now</p>
          {currentWeather && <img src={`https://openweathermap.org/img/wn/${currentWeather.main.icon}.png`} alt="forecastIcon" />}
          <p className="forecastTemp">{tempSwitch.state ? currentWeather?.main.tempC : currentWeather?.main.tempF}<span>{tempSwitch.state ? "°C" : "°F"}</span></p>
        </article>

        {currentWeather?.forecasts.map((forecast) => <article key={forecast.id} className="forecastCard">
          <p className="forecastHour" style={{ height: hourSwitch.state ? "24px" : "12px" }}>
            {hourSwitch.state ? forecast.hour12 : forecast.hour24}
          </p>
          <img src={`https://openweathermap.org/img/wn/${forecast.icon}.png`} alt="forecastIcon" />
          <p className="forecastTemp">{tempSwitch.state ? forecast.tempC : forecast.tempF}</p>
        </article>)}
      </section>
    </main>

    <menu id="settingsMenu" className={`appearDownAnimation ${menuSwitch.state ? "shown" : "hidden"}`}>
      <header>
        <h1 className="sectionTitle">Settings</h1>
      </header>
      <section id="settingsList">
        <article className="setting">
          <div className="settingsIconContainer">
            <TempIcon />
          </div>
          <h1 className="settingTitle">temperature</h1>
          <div className="settingValue">
            <ToggleButton setting="temp" opts={{ opt1: "Fahrenheit", opt2: "Celsius" }} boolean={tempSwitch} />
          </div>
        </article>

        <article className="setting">
          <div className="settingsIconContainer">
            <SpeedIcon />
          </div>
          <h1 className="settingTitle">Speed</h1>
          <div className="settingValue">
            <ToggleButton setting="speed" opts={{ opt1: "mph", opt2: "km/h" }} boolean={speedSwitch} />
          </div>
        </article>

        <article className="setting">
          <div className="settingsIconContainer">
            <ClockIcon />
          </div>
          <h1 className="settingTitle">Hour format</h1>
          <div className="settingValue">
            <ToggleButton setting="hour" opts={{ opt1: "24h", opt2: "12h" }} boolean={hourSwitch} />
          </div>
        </article>
      </section>
    </menu>

  </>
}

function ToggleButton({ setting, opts, boolean }) {
  const { opt1, opt2 } = opts
  return <>
    <input type="checkbox" id={`${setting}Switch`} className="toggle" onChange={boolean.toggleState} />
    <label htmlFor={`${setting}Switch`} className="switchLabel">{boolean.state ? opt2 : opt1}</label>
  </>
}

const locationTest = { lat: 18.9366272, lon: -70.402048 }
const key1 = "386abf5fd398221d0ba6c40ea78d098a"

export default App