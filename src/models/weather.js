import convertToCelsius from "../utils/convertToCelsius"
import convertToFarhenheit from "../utils/convertToFarhenheit"
import formatDate from "../utils/formatDate"
import formatDirection from "../utils/formatDirection"
import formatHour from "../utils/formatHour"

export default class Weather {
  constructor(data) {
    this.city = data.name
    this.country = data.sys.country

    this.main = {
      icon: data.weather[0].icon,
      mainWeather: data.weather[0].main,
      description: data.weather[0].description,
      tempF: convertToFarhenheit(data.main.temp),
      tempC: convertToCelsius(data.main.temp)
    }

    this.secondary = {
      humidity: data.main.humidity,
      windChillC: `${convertToCelsius(data.main.feels_like)}°C`,
      windChillF: `${convertToFarhenheit(data.main.feels_like)}°F`,
      windSpeedKmph: `${(data.wind.speed * 1.60934).toFixed(2)}km/h`,
      windSpeedMph: `${data.wind.speed.toFixed(2)}mph`,
      windDirection: formatDirection(data.wind.deg)
    }

    this.dayCycle = {
      sunrise12: formatHour(data.sys.sunrise, "12h"),
      sunrise24: formatHour(data.sys.sunrise, "24h"),
      sunset12: formatHour(data.sys.sunset, "12h"),
      sunset24: formatHour(data.sys.sunset, "24h")
    }

    this.time = {
      date: formatDate(data.dt),
      hour12: formatHour(data.dt, "12h"),
      hour24: formatHour(data.dt, "24h")
    }
  }
}
