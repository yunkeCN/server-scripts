const childProcess = require('child_process');

const isWin = /^win/.test(process.platform);

module.exports = function exe(cmd, cwd, tryCount, maxTryCount = 3) {
    tryCount = tryCount || 1;

    console.info(cmd);
    const cmdArr = cmd.split(' ');
    const res = childProcess.spawnSync(isWin ? cmdArr[0] + '.cmd' : cmdArr[0], cmdArr.slice(1), {
        cwd,
        stdio: [0, 1, 2],
        timeout: 4 * 60 * 1000
    });
    if ((res.error || res.status !== 0) && tryCount < maxTryCount) {
        console.info(`\nTry again(${++tryCount}):`, cmd);
        return exe(cmd, cwd, tryCount, maxTryCount);
    }

    return res;
}