// Products_display.js _ Kevin Tran
// Initialize products array



// Function to handle the purchase button click
async function purchaseAll() {
    // Iterate through all products
    for (let index = 0; index < products.length; index++) {
        const qtyInput = document.getElementById(`quantityTextbox_${index}`);
        const qty = parseInt(qtyInput.value);


// Make a POST request to the server endpoint for validation
        const response = await fetch('/validateQuantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: qty }),
        });


        const result = await response.json();
        const errorMessage = result.errorMessage;

        // Display the error message or proceed with further actions
        if (errorMessage) {
            document.getElementById(`validationMessage_${index}`).innerHTML = `<span style="color: darkred; font-weight: bold;">${errorMessage}</span>`;
        } else {
            // Clear validation message
            document.getElementById(`validationMessage_${index}`).innerText = '';


            // Deduct the purchased quantity from available inventory
            products[index].qty_available -= qty;
            products[index].total_sold += qty;
        }
    }


    // Update the HTML to reflect the changes
    displayProducts();


    // Perform additional actions or submit the form
    document.getElementById('purchaseAllForm').submit();
}


// Function to handle the purchase button click for an individual product
async function purchase(event, index) {
    event.preventDefault(); // Prevent the default form submission


    const qtyInput = document.getElementById(`quantityTextbox_${index}`);
    const qty = parseInt(qtyInput.value);


    // Make a POST request to the server endpoint for validation
    const response = await fetch('/validateQuantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: qty }),
    });


    const result = await response.json();
    const errorMessage = result.errorMessage;


    // Display the error message or proceed with further actions
    if (errorMessage) {
        document.getElementById(`validationMessage_${index}`).innerHTML = `<span style="color: darkred; font-weight: bold;">${errorMessage}</span>`;
    } else {
        // Clear validation message
        document.getElementById(`validationMessage_${index}`).innerText = '';


        // Perform additional actions or submit the form
        document.getElementById(`purchaseForm_${index}`).submit();


        // Deduct the purchased quantity from available inventory
        products[index].qty_available -= qty;
        products[index].total_sold += qty;


        // Update the HTML to reflect the changes
        displayProducts();


    // Redirect to invoice.html with parameters
window.location.href = `invoice.html?productName=${encodeURIComponent(product.name)}&quantity=${qty}&price=${product.price}`;
    }
}


// Function to display products on the webpage
function displayProducts() {
    try {
        const productList = document.getElementById('productList');
        if (!productList) {
            throw new Error('Product list element not found');
        }
        productList.innerHTML = ''; // Clear existing product list


    // Product information, including the available quantity, will be updated
    // based on the actual data retrieved from the server when the HTML is loaded
    // Dynamically includes the current inventory quantity
    // for each product in HTML. (product.qty_available)
  products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="col-sm-6">
                <div class="bg-green text-white p-3 product-container">
                    <img src="${product.image}" alt="${product.name}" style="width: 300px; height: 300px;">
                    <h2 class="productName">${product.name}</h2>
                    <p class="productInfo">
                        <span class="productPrice">$${product.price}</span>
                        <span class="productAvailability"> <b> Available: </b> ${product.qty_available}</span>
                    </p>
                    <form id="purchaseForm_${index}" action="./purchase" method="POST">
                        <label for="quantityTextbox_${index}"> <b> Quantity: </b> </label>
                        <input type="text" name="quantity" id="quantityTextbox_${index}" min="1" value="">
                        <button type="button" class="btn btn-success" onclick="purchase(event, ${index})">Purchase</button>
                    </form>
                    <div id="validationMessage_${index}" style="color: red;"></div>
                </div>
            </div>
   `;
        });
    } catch (error) {
        console.error('Error displaying products:', error);
    }
}



// handle the custom cursor:
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Initial display of products
displayProducts();

