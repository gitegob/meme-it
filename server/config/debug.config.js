import debug from 'debug';

export const debugApp = debug('app:startup');
export const debugDB = debug('app:db');
export const debugError = debug('app:error');
export const debugMemeCont = debug('app:meme.controller');
export const debugUserCont = debug('app:user.controller');
export const debugMemeTest = debug('app:test:meme.spec');
export const debugUserTest = debug('app:test:user.spec');
