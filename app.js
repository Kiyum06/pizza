// Import the express module
import express from 'express';

// Create an express appliocation
const app = express();

//Define a port number where server will listen
const PORT = 3000; 

// Enable static file serving 
app.use(express.static('public'));

//"Middleware" that allows express to read
// form data and store it in req.body 
app.use(express.urlencoded({extended: true}));

//create a temp array to store orders
const orders = [];

// Define our main route ('/')
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});


// Define our contact-us route ('/')
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});


// Define our /thank-you route ('/')
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// admin route ('/')
app.get('/admin', (req, res) => {
    res.send(orders);
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
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Start server and listed on designed port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});