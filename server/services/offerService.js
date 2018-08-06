const Axios = require('axios');

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((result) => {
      console.log('PAGE', result);
      resolve(result.toString());
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = OfferService;
