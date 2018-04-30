const storageService = require('./storageService');
const GooglePlacesService = require('./googlePlacesService');

let placeService = {};

placeService.autoCompletePlace = (placeInput)=>{
  return new Promise((resolve, reject)=>{
    GooglePlacesService.autocompletePlace(placeInput).
    then(places=>resolve(places)).
    catch(error=>reject(error))
  })
};

placeService.searchPlace = (placeInput)=>{
  return new Promise((resolve, reject)=>{
    GooglePlacesService.searchPlace(placeInput).
    then(places=>resolve(places)).
    catch(error=>reject(error))
  })
};

placeService.getPlaces = ()=>{
  return new Promise((resolve, reject)=>{
    storageService.getPlaces().
    then(places=>resolve(places)).
    catch(error=>reject(error))
  })
};

placeService.getPlace = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getPlace(id).
    then(place=>resolve(place)).
    catch(error=>reject(error))
  })
};

placeService.createPlace = (place)=>{
  return new Promise((resolve, reject)=>{
    storageService.createPlace(place).
    then(place=>resolve(place)).
    catch(error=>reject(error))
  })
};

placeService.updatePlace = (place)=>{
  return new Promise((resolve, reject)=>{
    storageService.updatePlace(place).
    then(place=>resolve(place)).
    catch(error=>reject(error))
  })
};

module.exports = placeService;
