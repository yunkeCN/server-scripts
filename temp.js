let pm2 = require('pm2');

pm2.list((err, processDescriptionList)=>{
  console.info(processDescriptionList.map(item => item.name));
})