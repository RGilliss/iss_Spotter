const {nextISSTimesForMyLocation} = require('./iss_promised');
const { printPassTimes } = require('./index')


nextISSTimesForMyLocation()
  .then((pass) => {
    printPassTimes(pass);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });