const debug = require('debug')('app:startup');
const { config } = require('dotenv');
const app = require('./server/app');

config();
const port = process.env.PORT || 5000;

app.listen(port, () => debug(`Server running on port ${port}...`));
