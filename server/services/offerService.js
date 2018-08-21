const Axios = require('axios');
const HtmlToJson = require('html-to-json');
const html2json = require('html2json').html2json;

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((res) => {
      let rawData = res.data.split('<div class="ui-home-main-offer ');
      rawData.pop();
      rawData.shift();
      rawData = rawData.map((item) => {
        return '<div class="ui-home-main-offer' + item;
      });
      console.log('PAGE', rawData);
      const offers = html2json(rawData.join(''));
      console.log('OFFERS', offers);
      resolve(offers);
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
