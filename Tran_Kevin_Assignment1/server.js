// Server.js - Kevin Tran

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const path = require('path');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const products = require('./products.json');
products.forEach(product => (product.total_sold = 0));

// Serve the products.json file 
// Dynamically generates a JavaScript file (products.js) on the server side
// clients receive this dynamically generated JavaScript file.
app.get('/products.js', (req, res) => {
    res.type('.js').send(`let products = ${JSON.stringify(products)};`);
});

app.get('/products_display', (req, res) => {
    // Send the products array as a JSON object to the HTML file
    res.sendFile(path.join(__dirname, 'products_display.html'), { products });
});

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post('/validateQuantity', (req, res) => {
  const quantity = req.body.quantity;
  const errorMessage = validateQuantity(quantity);
  res.json({ errorMessage });
});

// Validate the input quantity function for products_display page 
function validateQuantity(quantity) {
  let errorMessage = "";

  switch (true) {
    case isNaN(quantity):
      errorMessage = "Error: Not a number. Please enter a non-negative quantity to order.";
      break;
    case quantity <= 0 && !Number.isInteger(quantity):
      errorMessage = "Error: The quantity entered is not a number. Please enter a non-negative quantity to order.";
      break;
    case quantity <= 0:
      errorMessage = "Error: The quantity entered is negative. Please enter a non-negative quantity to order.";
      break;
    case !Number.isInteger(quantity):
      errorMessage = "Error: Not an integer. Please enter a non-negative quantity to order.";
      break;
    case quantity >1000:
    errorMessage= " Order quantity exceeds available inventory.";
    break;
    default:
        errorMessage = "";   
  }
  return errorMessage;
}

app.post('/purchase', (req, res) => {
  let receipt = '';
  let qtys = req.body['quantity_textbox'];
  
  qtys.forEach((qty, i) => {
      let q = Number(qty);
      let validationMessage = validateQuantity(q);
      let product = products[i];
      let brand = product["brand"];
      let brand_price = product["price"];

      if (validationMessage === "") {
          product["total_sold"] += q;
          receipt += `<h3>Thank you for purchasing: ${q} ${brand}. Your total is \$${q * brand_price}!</h3>`;
      } else {
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${brand}!<br>${validationMessage}</font></h3>`;
      }
  });

  res.send(receipt);
  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

