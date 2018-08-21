const Axios = require('axios');
const HtmlToJson = require('html-to-json');
const html2json = require('html2json').html2json;

let OfferService = {};

OfferService.getOffers = () => {
  return new Promise((resolve, reject) => {
    return Axios.get('https://despegar.com')
    .then((res) => {
      // const mySubString = res.data.substring(
      //   res.data.lastIndexOf('<div class="ui-home-main-offer'),
      //   res.data.lastIndexOf("</body>") + 7
      // );
      let rawData = res.data.split('<div class="ui-home-main-offer');
      rawData.pop();
      rawData.shift();
      rawData.map((item) => {
        return '<div class="ui-home-main-offer' + item;
      });
      // const mySubString = '<div class="ui-home-main-offer' + res.data.split('<div class="ui-home-main-offer')[1];
      console.log('PAGE', rawData);
      const offers = html2json(rawData);
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
