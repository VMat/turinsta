const Axios = require('axios');
const HtmlToJson = require('html-to-json');

let OfferService = {};

OfferService.getOffers = () => {
  // return new Promise((resolve, reject) => {
  //   return Axios.get('https://despegar.com')
  //   .then((res) => {
  //     console.log('PAGE', res.data);
  //     resolve(res.data);
  //   })
  //   .catch((err) => {
  //     reject(err);
  //   });
  // });

  return new Promise((resolve, reject) => {
    HtmlToJson.request('https://despegar.com', {
      'offers': ['.ux-home-offer', function (offer) {
        return JSON.stringify(offer);
      }]
    }, function (err, result) {
      if(err) reject(err);
      console.log('htmltojson', result);
      resolve(result);
    });
  });
};

module.exports = OfferService;
