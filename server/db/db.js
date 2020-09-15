import mongoose from 'mongoose';
import { debugDB as debug, debugError } from '../config/debug.config';

export default (app) => {
  const db = mongoose.connection;
  const ENV = app.get('env');
  let connectionString;
  if (ENV === 'test') {
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
      debugError('Database Connection Failed');
      debugError(error);
    });
  db.on('error', (error) => { debugError(error); });
};
