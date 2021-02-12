const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api64.ipify.org/?format=json')
}

const fetchCoordsByIP = (body) => {
  const parsedIP = JSON.parse(body).ip;

  return request(`https://freegeoip.app/json/${parsedIP}`)
}

const fetchISSFlyOverTimes = (body) => {
  //const coordinates = { latitude, longitude } 
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;

  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}



module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};