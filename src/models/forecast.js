import convertToCelsius from "../utils/convertToCelsius";
import convertToFarhenheit from "../utils/convertToFarhenheit";
import formatHour from "../utils/formatHour";

export default class Forecast {
  constructor(forecast) {
    this.hour12 = formatHour(forecast.dt, "12h");
    this.hour24 = formatHour(forecast.dt, "24h");
    this.icon = forecast.weather[0].icon;
    this.tempC = `${convertToCelsius(forecast.main.temp)}°C`;
    this.tempF = `${convertToFarhenheit(forecast.main.temp)}°F`;
    this.id = crypto.randomUUID()
  }
}