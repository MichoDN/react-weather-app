export default function formatDirection(deg) {
  deg = (deg + 360) % 360;
  if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
    return `${deg}° (North)`;
  } else if (deg >= 22.5 && deg < 67.5) {
    return `${deg}° (Northeast)`;
  } else if (deg >= 67.5 && deg < 112.5) {
    return `${deg}° (East)`;
  } else if (deg >= 112.5 && deg < 157.5) {
    return `${deg}° (Southeast)`;
  } else if (deg >= 157.5 && deg < 202.5) {
    return `${deg}° (South)`;
  } else if (deg >= 202.5 && deg < 247.5) {
    return `${deg}° (Southwest)`;
  } else if (deg >= 247.5 && deg < 292.5) {
    return `${deg}° (West)`;
  } else if (deg >= 292.5 && deg < 337.5) {
    return `${deg}° (Northwest)`;
  } else {
    return `Unknown`;
  }
}