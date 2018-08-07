const Axios = require('axios');

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((res) => {
      console.log('PAGE', result.data);
      resolve(JSON.stringify(result.data));
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = OfferService;
