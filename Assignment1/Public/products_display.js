// products_display.js   - Class Lecture Videos, and extra features from ChatGPT.

// Settings for customize mouse cursor.
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Display products name, price, quantity available, and sold seen in products_display.html
// Created quantity textbox for user to enter quantity they desired to buy.
for (let i = 0; i < products.length; i++) {
    document.querySelector('.row').innerHTML += `
    <div class="card mb-3 bg-light text-dark">
        <div class="row g-0">
            <div class="col-md-4">
                 <img src="${products[i].image}" class="product-image" alt="${products[i].alt}" style="width: 400px; height: 430px;">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title text-success">        ${products[i].name}  </h5>
                    <p class="card-text">                       $${(products[i].price).toFixed(2)}  </p>
                    <p class="card-text">                       Available: ${products[i].qty_available}  </p>
                    <p class="card-text">                       Sold: ${products[i].qty_sold}   </p>
                    <div class="form-group">
                            <label style="margin:5px; color: #006633; font-family:'Comic Sans MS', cursive;">      Quantity:</label> 
                            <input type="text" margin:5px;" placeholder="Enter Quantity" name="qty${[i]}" id="qty${[i]}_entered" class="inputBox" onkeyup="checkQuantityTextbox(this,${products[i].qty_available})">
                            <div id="qty${[i]}_error"></div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    
// Function checks if a given quantity is valid based on availableQuantity for Client side validation.
function validateQuantity(quantity, availableQuantity) {
    let errors = [];  // Create an empty list to keep track of error messages

    quantity=Number(quantity);  // Convert the quantity to a number

    switch (true) {
        // Check if the quantity is not a number or an empty string
        case (isNaN(quantity)) && (quantity != ''):
            errors.push("Not a number. Please enter a non-negative quantity to order.");
            break;
        // Check if the quantity is both negative and not an integer
        case quantity < 0 && !Number.isInteger(quantity):
            errors.push("Negative inventory and not an Integer. Please enter a non-negative quantity to order.");
            break;
        // Check if the quantity is negative
        case quantity < 0:
            errors.push("Negative inventory. Please enter a non-negative quantity to order.");
            break;
        // Check if the quantity is not zero and not an integer
        case quantity !=0 && !Number.isInteger(quantity):
            errors.push("Not an Integer. Please enter a non-negative quantity to order.");
            break;
        // Check if the ordered quantity exceeds the available inventory
        case quantity > availableQuantity:
            errors.push(`The ordered quantity of ${quantity.toLocaleString()} exceeds available inventory.`);
            break;
        default:
            break;
    }
    return errors; // Give back the list of error messages
};

// Function to check and validate the quantity entered in the textbox that connect with validateQuantity function above.
function checkQuantityTextbox(textBox, availableQuantity) {
  // Convert the value of the textbox to a string
    let str = String(textBox.value);

    // Check if the first character of the string is '0'
    if (str.charAt(0) == '0') {
        // If '0' is the first character, remove it to prevent leading zeros.
        textBox.value = Number(str.slice(0, 0) + str.slice(1, str.length));
    }

    // Convert the input value to a number
    let inputValue = Number(textBox.value);
   
    // Validate the quantity using the validateQuantity function
     // calling the function to check if the entered quantity is valid, and it stores any error messages in the errorMessages variable.
    let errorMessages = validateQuantity(inputValue, availableQuantity);

   // Find the HTML element.
    let errorDisplay = document.getElementById(textBox.name + '_error');
    // Check if there are any error messages.
    if (errorMessages.length > 0) {
          // If there are error messages, display them in the errorDisplay element with line breaks between messages.
        errorDisplay.innerHTML = errorMessages.join('<br>');
          // Set the text color of the errorDisplay element to red.
        errorDisplay.style.color ="red";
    } else {
    // If there are no error messages:
        // Clear the content of the errorDisplay element.
        errorDisplay.innerHTML = "";
    }
}


// Create a new URL object from the current document's URL and get the query parameters using searchParams. 
    //  Use the params object to access individual query parameters from the URL.
let params = (new URL(document.location)).searchParams;

window.onload = function() {

// Check if the URL contains a query parameter named 'error'  If 'error' parameter is present:
    if (params.has('error')) {
       
         // Get the HTML element with the id 'errMsg' and set its text content to "No quantities selected."
        document.getElementById('errMsg').innerHTML = "No quantities selected.";
         // After 3000 milliseconds (3 seconds), remove the error message from the 'errMsg' element.
        setTimeout(() => {
            document.getElementById('errMsg').innerHTML = "";
        }, 3000);
    } 
        // if found invalid input error = set its text content to "Please fix errors before proceeding."
    else if (params.has('inputErr')) {
        document.getElementById('errMsg').innerHTML = "Please fix errors before proceeding.";
        setTimeout(() => {
            document.getElementById('errMsg').innerHTML = "";
        }, 3000);

        // Loop through each product in the products array
        for (let i in products) {
             // Get the quantity input element for the current product,  the invalid input that show after pressing purchase
            let qtyInput = qty_form[`qty${[i]}_entered`];
            // Get the error display element for the current product, the error that show after pressing purchase
            let qtyError = document.getElementById(`qty${[i]}_error`);

           // checks for specified quantity for the current product in the URL. 
                // If a quantity is found: sets the value of the quantity input element to the retrieved value. make the invalid quantity stay in the textbox when page reload.
            if (params.get(`qty${i}`) !== null) {
                qtyInput.value = params.get(`qty${i}`);
            }

          // calls a function to validate the entered quantity for the current product.
            let errorMessages = validateQuantity(qtyInput.value, products[i].qty_available);
           // If there are validation errors / No Errors 
            if (errorMessages.length > 0) {
            //  If there are validation errors displays the errors in the error display element.
                qtyError.innerHTML = errorMessages.join('<br>');
            } else {
            // If there are no errors, clears the content of the error display element.
                qtyError.innerHTML = "";
            }
        }
    }
}
