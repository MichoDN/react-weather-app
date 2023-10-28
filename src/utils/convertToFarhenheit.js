export default function convertToFarhenheit(kelvinTemp) {
  return Math.trunc((kelvinTemp - 273.15) * 9 / 5 + 32);
};