/**
 * Required External Modules
 */
const express = require('express');
const app = express();

const dotenv = require('dotenv');
const heltmet = require('helmet')
const cors = require('cors');
const morgan = require('morgan');

import { itemsRouter } from "./items/item.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


/**
 *  App Configuration
 */

app.use(heltmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/menu/items/', itemsRouter);

//middlewares
app.use(errorHandler);
app.use(notFoundHandler);



/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});