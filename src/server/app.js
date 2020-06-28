const express = require( 'express' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
require('dotenv').config();
const {MONGO_PWD} = process.env;
mongoose.connect( 'mongodb+srv://rest-api:'+MONGO_PWD+'@cluster0-xzlcx.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} )
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));;

const app = express();
const expenseRoutes = require('./api/routes/expenses');

app.use( morgan( 'dev' ) ); // To logging Method of the request, resource path, http code, time took to deliver
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

//Avoiding CORS ISSUE
app.use( cors() );

app.use('/expenses', expenseRoutes);

app.use( (req, res, next) => {
    const error = new Error( 'Not Found' );       
    error.status = 404;
    next( error );
} );
app.use( ( error, req, res, next ) => {
    res.status( error.status || 500 );
    res.json({
        error: {
            message: error.message
        }        
    })
});
module.exports = app; //To Export this file