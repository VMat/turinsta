const gcm = require('node-gcm');
const gcmApiKey = 'AIzaSyCCHGZytVbnHddlS_Bk1mmUnABAxMVpwy0'; // GCM API KEY OF YOUR GOOGLE CONSOLE PROJECT

const retry_times = 4; //the number of times to retry sending the message if it fails
const sender = new gcm.Sender(gcmApiKey); //create a new sender

let NotificationService = {};

NotificationService.send = (data, device_tokens) => {
 
  delete data.notification.icon;
  data.notification.image = "https://turinsta-staging.herokuapp.com/assets/flags/españa.ico";
  data["image-type"] = "circle";
  
  //create a new message
  let message = new gcm.Message({
    priority: 'high',
    delayWhileIdle: true,
    data: {...data.data, ...data.notification, "content-available": '1'}
  });
 
  sender.send(message, { registrationTokens: device_tokens }, retry_times,(result)=>{
      console.log('push sent to: ' + device_tokens);
  }, (err)=>{
      console.log('error: ' + err);
  });

};

module.exports = NotificationService;
