export default function formatHour(timestamp, format) {
  const msTimeStamp = timestamp * 1000;
  const date = new Date(msTimeStamp);

  let hour = date.getHours();
  const minutes = date.getMinutes();

  if (format === "12h") {
    const amPm = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    return `${hour < 10 ? 0 : ""}${hour}:${minutes < 10 ? "0" : ""}${minutes} ${amPm}`;
  } else if (format === "24h") {
    return `${hour < 10 ? 0 : ""}${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
  } else {
    return "Formato no válido";
  }
}