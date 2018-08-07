const Axios = require('axios');

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((res) => {
      console.log('PAGE', res.data);
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = OfferService;
