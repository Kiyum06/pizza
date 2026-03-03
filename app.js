// Import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// load environment variables from .env
dotenv.config();
// console.log(process.env.DB_HOST);

// Create an express appliocation
const app = express();

//Define a port number where server will listen
const PORT = 3000; 
const HOST = "0.0.0.0";

// Enable static file serving 
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

//"Middleware" that allows express to read
// form data and store it in req.body 
app.use(express.urlencoded({extended: true}));

//create a temp array to store orders
const orders = [];

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    // host: '143.198.224.58',
    // user: 'admin',
    // password: 'adminpass0603',
    // database: 'pizza_db',
    // port: 3306

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Database test route 
app.get('/db-test', async(req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error('Database error: ', err);
    }
});


// Define our main route ('/')
app.get('/', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});


// Define our contact-us route ('/')
app.get('/contact-us', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/contact.html`);
    res.render('contact');
});


// Define our /thank-you route ('/')
app.get('/thank-you', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.render('confirmation');
});

// admin route ('/')
app.get('/admin', (req, res) => {
    //res.send(orders);
    res.render('admin', { orders });
});

// Define /sumbit-order route ('/')
app.post('/submit-order', (req, res) => {

    // create a json object to store the order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings ? req.body.toppings: "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    // Add order object to orders array 
    orders.push(order);

    //res.send(orders);
    // res.send(req.body);

    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.render('confirmation', { order });
});

// Start server and listed on designed port
app.listen(PORT, HOST, () => {
    //console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
});