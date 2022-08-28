const dotEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const express = require('express');
dotenvExpand.expand(dotEnv);
const cors = require('cors');

const port = process.env.PORT || 8080;

const loginRoute = require('./src/routes/login');
const registerRoute = require('./src/routes/register');
const guestsRoute = require('./src/routes/guests');
const eventsRoute = require('./src/routes/events');
const eventsHasGuestsRoute = require('./src/routes/events_has_guests');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/guests', guestsRoute);
app.use('/api/v1/events', eventsRoute);
app.use('/api/v1/events_has_guests', eventsHasGuestsRoute);

app.all('*', async (req, res) => {
  res.status(404).send("Oh no you don't");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
