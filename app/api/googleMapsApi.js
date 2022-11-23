//function 5o get distance between two points using google maps api
const getDistance = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
  );
  const data = await response.json();
  const distance = data.rows[0].elements[0].distance.text;
  return distance;
};

//function 6 to get the duration between two points using google maps api
const getDuration = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
  );
  const data = await response.json();
  const duration = data.rows[0].elements[0].duration.text;
  return duration;
};

//function 7 to get the duration between two points using google maps api
const getDurationValue = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
  );
  const data = await response.json();
  const durationValue = data.rows[0].elements[0].duration.value;
  return durationValue;
};

//function 8 to get the duration between two points using google maps api
const getDistanceValue = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
  );
  const data = await response.json();
  const distanceValue = data.rows[0].elements[0].distance.value;
  return distanceValue;
};
