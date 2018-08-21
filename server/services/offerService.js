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
      const mySubString = '<div class="ui-home-main-offer' + res.data.split('<div class="ui-home-main-offer')[1];
      console.log('PAGE', mySubString);
      const jsonCreated = html2json(mySubString);
      console.log('JSON', jsonCreated);
      resolve(JSON.stringify(jsonCreated));
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
