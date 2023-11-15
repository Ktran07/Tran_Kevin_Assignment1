
// invoice.js

// Assume you have a global variable to store purchased products
// (productsPurchased) and other relevant information.

// Populate invoice details
// Assuming productsPurchased is an array of purchased products
const productsPurchased = [];

// Function to handle the purchase button click
async function purchaseAll() {
    // ... (existing purchaseAll logic)

    // After the purchase is successful, populate the invoice
    populateInvoice();
}


// Function to populate the invoice
function populateInvoice() {
    populateInvoiceDetails();
    populatePurchasedProducts();
    populateTotalAmount();
}
