const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const UserRouter = require('./api/User');

app.use('/api/User', UserRouter);

require('dotenv').config();
require('./config/db');


app.get('/', (req, res) => {
    res.send('API Running');
});

app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});