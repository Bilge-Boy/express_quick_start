const express = require('express');
const routes = require('./routes');
const app = express();
const port = 8080;
const {connect} = require('./db.js');

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    connect();
    console.log(`listening at http://localhost:${port}`)
})
