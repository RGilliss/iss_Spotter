const request = require('request');


const fetchMyIP = (ipCallback) => {
  const urlIP = 'https://api64.ipify.org/?format=json';
  request(urlIP, (error, response, body) => {
    if (error) {
      return ipCallback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return ipCallback(Error(msg), null);
    }
    const ip = JSON.parse(body).ip;
    ipCallback(null, ip);

  });
};

const fetchCoordsByIP = (ip, geoCallback) => {
  const urlGEO = 'https://freegeoip.app/json/' + ip;
  request(urlGEO, (error, response, body) => {
    if (error) {
      return geoCallback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      return geoCallback(Error(msg), null);
    }
    const { latitude, longitude} = JSON.parse(body);
    geoCallback(null, { latitude, longitude});
  });
};


const fetchISSFlyOverTimes = (coords, flyCallback) => {
  const satUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(satUrl, (error, response, body) => {
    if (error) {
      return flyCallback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      return flyCallback(Error(msg), null);
    }
    const flyOver = JSON.parse(body).response;
    flyCallback(null, flyOver);
  });
};


const nextISSTimesForMyLocation = (chainCallback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return chainCallback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return chainCallback(error, null);
      }
      
      fetchISSFlyOverTimes(coordinates, (error, pass) => {
        if (error) {
          return chainCallback(error, null);
        }
        chainCallback(null, pass);
      });
    });
  });
};


module.exports = {nextISSTimesForMyLocation};

