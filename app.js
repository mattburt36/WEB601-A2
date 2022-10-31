// Import express 
const express = require('express');
const session = require('express-session');

const customerRoute = require('./routes/customer');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');

const store = new session.MemoryStore();
const app = express();

//Use routes 
//------------------------------------------------------------
//Show the requests with requested url in the console window 
//Middleware
app.use((req, res, next) =>
{
    console.log(`${req.method} - ${req.url}`);
    next();
});

//Detect json payloads
app.use(express.json());
//Detect and handle url encoded posts 
app.use(express.urlencoded({extended: false}));

app.use(session(
    {
        secret: 'some secret',
        cookie: { maxAge: 30000},
        saveUninitialized: false,
        store
    }));

app.use('/customer', customerRoute);
app.use('/category', categoryRoute);
app.use('/order', orderRoute);
app.use('/product', productRoute);

//------------------------------------------------------------
//Listen to port 
//------------------------------------------------------------ 
app.listen(8000, () => 
{
    console.log('Server is running on port 8000');
});
//------------------------------------------------------------

