const gcm = require('node-gcm');
const gcmApiKey = 'AIzaSyCCHGZytVbnHddlS_Bk1mmUnABAxMVpwy0'; // GCM API KEY OF YOUR GOOGLE CONSOLE PROJECT

const retry_times = 4; //the number of times to retry sending the message if it fails
const sender = new gcm.Sender(gcmApiKey); //create a new sender

let NotificationService = {};

NotificationService.send = (data, device_tokens) => {

  let icon = 'www/assets/imgs/';
  switch(data.data.type){
    case 'message': {
      icon += 'message-icon.png';
      break;
    }
    default:{
      icon += 'notification-icon.png';
    }
  }

  //create a new message
  const message = new gcm.Message();
  message.addData('title', data.notification.title);
  message.addData('message', data.notification.body);
  message.addData('image', icon);
  //message.addData('image-type', 'circular');
  message.addData('type', data.data.type);
  message.addData('category', data.data.category);
  message.addData('key', data.data.key);
  message.addData('ledColor', [0, 0, 255, 0]);
  message.addData('vibrationPattern', [2000, 1000, 500, 500]);
  message.addData('priority', 2);
  message.addData('style', 'inbox');
  message.addData('summaryText', data.notification.summaryText);
  message.addData('content-available', 1);
  message.addData('no-cache', 1);

  return new Promise((resolve, reject) => {
    sender.send(message, { registrationTokens: device_tokens }, retry_times, (err, response)=>{
      resolve(response)
    });
  });
};

module.exports = NotificationService;
