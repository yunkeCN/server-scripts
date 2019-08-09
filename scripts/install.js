const pm2 = require('pm2');

module.exports = function(callback) {
  pm2.list(function(err, res) {
    const name = 'pm2-logrotate';

    if (err) {
      callback(err);
      return;
    }

    let installedRotate = false;
    res.map(item => {
      if (item.name === name) {
        installedRotate = true;
      }
    });

    if (!installedRotate) {
      pm2.install(name, err => {
        callback(err);
      })
    } else {
      callback()
    }
  });
}