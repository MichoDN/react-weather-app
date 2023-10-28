const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export default function formatDate(timestamp) {
  const msTimeStamp = timestamp * 1000;
  const currentDate = new Date(msTimeStamp);
  const formattedDate = `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]}  ${currentDate.getDate()}`
  return formattedDate
}