const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/*
    1) Require the express module
    2) Require the morgan module (OPTIONAL)
    3) Require the tourRouter
    4) Require the userRouter
    5) Create the app from express()
    6) Mount the middleware
    7) Mount the routers
    8) Export the app
*/

// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware! 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
