#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');

const script = process.argv[2];
const args = process.argv.slice(4);

let filePath = process.argv[3];
if (!path.isAbsolute(filePath)) {
  filePath = path.join(process.cwd(), filePath);
}

switch (script) {
  case 'start':
  case 'start-dev':
  case 'restart':
  case 'stop': {
    const result = spawn.sync(
      'node',
      [
        require.resolve(path.join('../scripts', script)),
        filePath,
      ].concat(args),
      {
        stdio: 'inherit',
        cwd: process.cwd(),
      }
    );
    if (result.status === 0) {
      console.info('server-scripts run success');
    }
    process.exit(result.status);
    break;
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}