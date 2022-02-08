import axios from "axios";
var haversine = require("haversine-distance");

const ipLocation = () => {
  return new Promise((resolve) => {
    const locationApi = axios.get("https://ipapi.co/json").then((response) => {
      return [response.data.longitude, response.data.latitude];
    });
    resolve(locationApi);
  });
};

const geoLocation = () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = [0.0, 0.0];
      currentLocation[0] = position.coords.longitude;
      currentLocation[1] = position.coords.latitude;
      resolve(currentLocation);
    });
    setTimeout(resolve, 2000);
  });
};

export const getUserLocation = async () => {
  const ip = ipLocation();
  const geo = await geoLocation();
  return geo || ip;
};

const calculateDistance2 = (lo1, la1, lo2, la2) => {
  const longitude1 = Number(lo1);
  const latitude1 = Number(la1);
  const longitude2 = Number(lo2);
  const latitude2 = Number(la2);
  var point1 = { lat: longitude1, lng: latitude1 };
  var point2 = { lat: longitude2, lng: latitude2 };
  var haversine_m = haversine(point1, point2); //Results in meters (default)
  var haversine_km = haversine_m / 1000; //Results in kilometers
  return haversine_km;
};

export const addDistanceToUsers = (user, lo1, la1) => {
  const distance = calculateDistance2(
    lo1,
    la1,
    user.coordinates1,
    user.coordinates2
  );
  user.distance = distance;
  return user;
};
