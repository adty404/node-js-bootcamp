const mongoose = require('mongoose');
const dotenv = require('dotenv');

/*
    1) Require the mongoose module
    2) Require the dotenv module
    3) Initialize dotenv.config()
    4) Connect to the database
    5) Define the app
    6) Start the server
*/

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({
    path: './config.env',
});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true, // additional cause of error (node:16944) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated
    })
    .then(() => console.log('DB connection successful!'));

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
