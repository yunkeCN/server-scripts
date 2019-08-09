const path = require('path');
const pm2 = require('pm2');
const install = require('./install');

install((err) => {
  if (err) {
    console.info(err);
    process.exit(-1);
    return;
  }
  const appPath = process.argv[2];

  const appDir = path.dirname(appPath);
  const script = appPath;
  const output = path.join(appDir, 'log/out.log');
  const error = path.join(appDir, 'log/error.log');

  processExist(script)
    .then(() => {
      pm2.reload(
        script,
        {
          updateEnv: true
        },
        (errInner) => {
          if (errInner) {
            console.info(errInner);
            process.exit(-1);
            return;
          }

          process.exit(0);
        }
      );
    })
    .catch(() => {
      pm2.start(
        script,
        {
          mergeLogs: true,
          logDateFormat: 'YYYY-MM-DD HH:mm:ss',
          name: script,
          output,
          error
        },
        (errInner) => {
          if (errInner) {
            console.info(errInner);
            process.exit(-1);
            return;
          }

          process.exit(0);
        }
      );
    })
})

function processExist(script) {
  return new Promise((resolve, reject) => {
    pm2.list(script, (err, data) => {
      if (!err) {
        let exist = false;
        for (const item of data) {
          if (item.name === script) {
            exist = true;
            resolve();
            break;
          } else if (item.pm2_env.pm_exec_path === script) {
            exist = true;
            // 如果该脚本已启动，但是名称不一致，杀掉进程
            pm2.delete(item.name, () => {
              reject();
            });
            break;
          }
        }
        if (!exist) {
          reject();
        }
      } else {
        reject();
      }
    });
  });
}
