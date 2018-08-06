const Axios = require('axios');

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((result) => {
      console.log('PAGE', result.data);
      resolve(JSON.stringify(result));
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = OfferService;
