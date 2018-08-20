const Axios = require('axios');
const HtmlToJson = require('html-to-json');
const html2json = require('html2json').html2json;

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((res) => {
      console.log('PAGE', res.body);
      const jsonCreated = html2json(res.body);
      console.log('JSON', jsonCreated);
      resolve(jsonCreated);
    })
    .catch((err) => {
      console.log('ERR', err);
      reject(err);
    });
  });

  // return new Promise((resolve, reject) => {
  //   HtmlToJson.request('https://despegar.com',
  //     ['.ux-home-offer', {
  //       'description': function ($offer) {
  //         return $offer.text();
  //       },
  //       'image': function ($offer) {
  //         return $offer.find('img').attr('src');
  //       }}
  //     ],
  //     function (err, result) {
  //       if(err) reject(err);
  //       console.log('htmltojson', result);
  //       resolve(result);
  //     }
  //   );
  // });
};

module.exports = OfferService;
