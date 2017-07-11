/**
 * 参数
 */
const program = require('commander');

program
    .allowUnknownOption(true)
    .option('-e --env [env]', 'environment')
    .parse(process.argv);

module.exports = {
    env: (program.env || 'DEV').toUpperCase()
};
