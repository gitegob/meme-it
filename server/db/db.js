const debug = require('debug')('app:db');
const mongoose = require('mongoose');

exports.connectDB = (app) => {
  const db = mongoose.connection;
  const ENV = app.get('env');
  let connectionString;
  if (ENV === 'test') {
    debug(ENV);
    connectionString = process.env.MONGO_TEST_DB;
  } else if (ENV === 'development') {
    connectionString = process.env.MONGO_LOCAL_DB;
  } else if (ENV === 'production') {
    connectionString = process.env.MONGO_ATLAS_DB;
  }
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      debug(`Database connected to ${connectionString}...`);
    })
    .catch((error) => {
      debug('Database Connection Failed');
      debug(error);
    });
  db.on('error', (error) => { debug(error); });
};
