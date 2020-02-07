const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const app = express();

// const port = !process.env.PORT ? 4000 : process.env.port
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ipexperts')
    .then(result => {
        app.listen(port, () => {
            console.log(`Listening on port: ${port}`)
        })
    })
    .catch(err => console.log(`Error in creating DB ${err}`))

autoIncrement.initialize(mongoose.connection)

module.exports = { app };
