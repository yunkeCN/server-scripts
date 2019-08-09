const path = require('path');
const pm2 = require('pm2');

const appPath = process.argv[2];

const appDir = path.dirname(appPath);
const script = appPath;
const output = path.join(appDir, 'log/out.log');
const error = path.join(appDir, 'log/error.log');
pm2.start(
  script,
  {
    logDateFormat: 'YYYY-MM-DD HH:mm:ss',
    name: script,
    output,
    error,
    watch: true
  },
  function(err) {
    if (err) {
      console.info(err);
      process.exit(-1);
      return;
    }

    process.exit(0);
  }
);

