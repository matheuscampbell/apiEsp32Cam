var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var processInteresses = require('./controller/InteressesController');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var storeRouter = require('./routes/store');
var uploadImageRouter = require('./routes/uploadImage');

var app = express();

app.use(fileUpload({
    limits: {
        fileSize: 10000000,
    },
    abortOnLimit: true,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/store', storeRouter)
app.use('/api/admin', adminRouter);
app.use('/sendImage', uploadImageRouter);


module.exports = app;

setInterval(async function () {
    await processInteresses.processInteresses();
},10000);
