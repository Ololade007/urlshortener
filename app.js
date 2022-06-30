const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');



app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({extended : false}));



// app used for managing headers
app.use(cors());
// app used to handle requests
app
// connect mongodb
connectDB();
//  routes
app.use('/',require('./api/routes/index'))
app.use('/api/url',require('./api/routes/short'));




app.use ((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use ((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});
module.exports = app;