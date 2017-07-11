#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');

const script = process.argv[2];
const args = process.argv.slice(3);

switch (script) {
    case 'start':
    case 'start-dev':
    case 'restart':
    case 'stop': {
        const result = spawn.sync(
            'node',
            [require.resolve(path.join('../scripts', script))].concat(args),
            { stdio: 'inherit' }
        );
        if (result.status === 0) {
            console.info('npm_build_success');
        }
        process.exit(result.status);
        break;
    }
    default:
        console.log(`Unknown script "${script}".`);
        break;
}