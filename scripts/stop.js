const path = require('path');
const pm2 = require('pm2');

const app = process.argv[2];

const appDir = process.cwd();
const script = path.join(appDir, app);

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
