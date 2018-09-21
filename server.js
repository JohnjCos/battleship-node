const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const shipRouter = require('./router')
const {PORT,DATABASE_URL} = require('./config')

const app = express();

app.use(express.json());


app.use(morgan('common'));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use('/',shipRouter)


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status) {
        const errBody = Object.assign({}, err, { message: err.message });
        res.status(err.status).json(errBody);
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


function runServer(databaseUrl,port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
        if (err) {
            return reject(err);
        }
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}


runServer(DATABASE_URL).catch(err => console.log(err))