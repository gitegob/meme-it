import { config } from 'dotenv';
import app from './server/app';
import { debugApp as debug } from './server/config/debug.config';

config();
const port = process.env.PORT || 5000;

app.listen(port, () => debug(`Server running on port ${port}...`));
