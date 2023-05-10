export function distanceCalculator(
  latStart: number,
  lonStart: number,
  latEnd: number,
  lonEnd: number
): number {
  var R = 6371; // km
  var dLat = toRad(latStart - latEnd);
  var dLon = toRad(lonStart - lonEnd);
  var lat1 = toRad(latStart);
  var lat2 = toRad(latEnd);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(Value: number): number {
  return (Value * Math.PI) / 180;
}
