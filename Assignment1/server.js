// Server.js - Class Lecture Videos

// Importing the Express.js framework 
const express = require('express');
// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();

// Monitor all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

/* Import data from a JSON file containing information about products
__dirname represents the directory of the current module (where server.js is located)
__dirname + "./products.json" specifies the location of products.json */
const products = require(__dirname + "/products.json"); /* I move this from LINE 28 */
//  Loop through each product in the products array.
for (let i in products) {
    // For each product, set the qty_sold property to 0.
        products.forEach((prod, i) => {prod.qty_sold = 0}); /* move from line 46 */
}

// Define a route for handling a GET request to a path that matches "./products.js"
app.get('/products.js', function(request, response, next) {
	// Send the response as JS
	response.type('.js');
	
	// Create a JS string (products_str) that contains data loaded from the products.json file
	// Convert the JS string into a JSON string and embed it within variable products
	const products_str = `let products = ${JSON.stringify(products)};`;
	
	// Send the string in response to the GET request
	response.send(products_str);
});


// allows web server to understand and process data sent from HTML forms, URL encoding.
app.use(express.urlencoded({extended: true}));     /* move from line 54 */

// Route all other GET requests to serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// querystring to handle information in web addresses. which helps work with query strings in a web URL. 
const qs = require('querystring');

// Code handles incoming POST requests to the /purchase endpoint.  taken from line 58
app.post("/purchase", function(request, response) {
    // Extracting data sent in the body of the HTTP POST request and storing it in the 'POST' variable.
        let POST = request.body;
    // Initializing a variable has_qty to false, used to track whether any quantity is greater than zero.
        let has_qty = false;
    // Creating an empty object errorObject to store potential error messages related to quantity validation.
        let errorObject = {};
    
    // Looping through each product in the products array.
        for (let i in products) {
            let qty = POST [`qty${[i]}`];
            has_qty = has_qty || (qty > 0);     
    
    // Validate if the quantity for the current product is within the available limit.
            let errorMessages = validateQuantity(qty, products[i].qty_available);
    
    // Check if there are validation errors for the current product and store error messages for the quantity in errorObject.
            if (errorMessages.length > 0) {
                errorObject[`qty${[i]}_error`] = errorMessages.join(', ');
            }
        }
    
    // Check if there are no quantities in the input boxes valid greater than 0 and no invalid errors, Then.....
    if (has_qty == false && Object.keys(errorObject).length == 0) {
        // Send the user to the products_display.html page with an error parameter indication in URL.
        response.redirect("./products_display.html?error");
    }
    // Check if there is at least one quantity greater than 0 and no validation errors.
    else if (has_qty == true && Object.keys(errorObject).length == 0) {
        // Loop through each product and get the submitted quantity from the request data for invoice page.
        for (let i in products) {
            let qty = POST [`qty${[i]}`];
    
    // Update the quantity sold and available for the current product.
            products[i].qty_sold += Number(qty);     // Increase the quantity sold.
            products[i].qty_available = products[i].qty_available - qty;     // Decrease the available quantity.
        }
    
    // Go to invoice.html with positive interger data contained in URL address
            response.redirect("./invoice.html?valid&" + qs.stringify(POST));
        }
    // Check if there are any validation errors for the submitted quantities.
        else if (Object.keys(errorObject).length > 0)  {
    // Go to products_display.html with the submitted data and an inputErr parameter.
            response.redirect("./products_display.html?" + qs.stringify(POST) + `&inputErr`);
        }
    });

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`listening on port 8080`));

//  check if the given quantity is valid based on availableQuantity.
function validateQuantity(quantity, availableQuantity) {
    let errors = [];    // Creating an empty array errors to store any validation error messages.
    quantity = Number(quantity);    // Converting the variable quantity to a number.
    switch (true) {
        case isNaN(quantity) || quantity === '':     
            errors.push("Not a number.");
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errors.push("Negative inventory and not an Interger");
            break;
        case quantity < 0:
            errors.push ("Negative inventory");
            break;
        case quantity != 0 && !Number.isInteger(quantity):
            errors.push ("Not an Integer");
            break;
        case quantity > availableQuantity:
            errors.push(`We do not have ${quantity} available.`);
            break;
        default:
            break;
    }
    return errors;    // Send back the variable errors.
}
