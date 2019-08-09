const pm2 = require('pm2');

const appPath = process.argv[2];

pm2.delete(
  appPath,
  function(err) {
    if (err) {
      console.info(err);
      process.exit(-1);
      return;
    }

    process.exit(0);
  }
);
