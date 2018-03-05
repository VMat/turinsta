const googlePlaces = require('googleplaces');
const googleApiKey = 'AIzaSyCCHGZytVbnHddlS_Bk1mmUnABAxMVpwy0'; // GOOGLE API KEY OF YOUR GOOGLE CONSOLE PROJECT
const googlePlacesMethods = googlePlaces(googleApiKey,"json"); // GET METHODS

let GooglePlacesService = {};

GooglePlacesService.searchPlace = (searchInput) => {

  // let parameters = {
  //   input: 'sydney lyr'
  // };

  return new Promise((resolve, reject) => {
    googlePlacesMethods.placeAutocomplete(searchInput, (error, response)=>{
      if(error){
        reject(error);
      }
      else{
        resolve(response);
      }
    });
  });

};

module.exports = GooglePlacesService;
