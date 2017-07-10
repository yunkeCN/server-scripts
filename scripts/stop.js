const path = require('path');
const exe = require('../lib/exe');
const pm2 = require('pm2');

const app = process.argv[2];

const appDir = process.cwd();
const script = path.join(appDir, app);
exe('forever stop master.js', undefined, undefined, 1)
exe('forever stop app.js', undefined, undefined, 1)

pm2.delete(
    script,
    function (err) {
        if (err) {
            console.info(err);
            process.exit(-1);
            return;
        }

        process.exit(0);
    }
);
