const debug = require('debug');

exports.debugApp = debug('app:startup');
exports.debugDB = debug('app:db');
exports.debugError = debug('app:error');
exports.debugMemeCont = debug('app:meme.controller');
exports.debugUserCont = debug('app:user.controller');
exports.debugMemeTest = debug('app:test:meme.spec');
exports.debugUserTest = debug('app:test:user.spec');
