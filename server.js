const { config } = require('dotenv');
const app = require('./server/app');
const { debugApp: debug } = require('./server/config/debug.config');

config();
const port = process.env.PORT || 5000;

app.listen(port, () => debug(`Server running on port ${port}...`));
