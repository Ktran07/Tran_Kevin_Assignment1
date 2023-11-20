// INVOICE.JS   - Class Lecture Videos, extra features from ChatGPT

// Settings for custom cursor:
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Creating a new URL object based on the current document's location and then accessing its search parameters using the searchParams property
// The params variable holds a reference to the search parameters of the current URL
    //  search parameters are typically the part of the URL after the "?" character, containing key-value pairs ?valid&qty1=value1&qty2=value2.
let params = (new URL(document.location)).searchParams;

let subtotal = 0;

let qty = [];
// for = loop iterating over products array
    // For each iteration, it retrieves a value from the params object using the key qty${i} (ex:qty0=#,qty1=#, ....) and adds it to the qty array using qty.push().
for (let i in products) {
    qty.push(params.get(`qty${i}`)); // Retrieves the value of 'qty' from the search parameters 
}

// loop that iterates over each element in the array qty
// if = checks if the value at the current index i in the array qty is either equal to 0 or an empty string
// If the condition is true, the continue statement is executed, which skips the rest of the code inside the loop for the current iteration and moves on to the next iteration.
// extended_price = calculation that get quantities value from params //multiply// with price of current product obtain from the products array using index [i]. .toFixed(2): Rounds the result to two decimal places.
// subtotal = : Adds the extended price to the subtotal, updating the overall subtotal for the purchase from each products.
for (let i in qty) {
    if (qty[i] == 0 || qty[i] == '') continue;

    extended_price = (params.get(`qty${i}`) * products[i].price).toFixed(2);
    subtotal += Number(extended_price);
// dynamically updating the HTML content of an element with the ID invoice_table seen in invoice.html.
// document.querySelector =  selects the HTML element with the ID invoice_table and supplement new HTML content to its existing content.
// tr = generate table row for a specific product (indexed by i).
//  table row consists of six cells 6 (<td>) allowing for each products individually get display to invoice.html:
    // 1st cell: show image 
    // 2nd cell: show individual product name
    // 3rd cell: show inputted quantity from products_display.html.
    // 4th cell: show availble quantity of the product
    // 5th cell: show price of product
    // 6th cell: show extended price 
    document.querySelector('#invoice_table').innerHTML += `
    <tr style="border: none; font-family: 'Pacifico', cursive; background-color: #f3e5f5;">
        <td>
            <img src="${products[i].image}" style="width: 300px; height: 300px; border-radius: 5px;" alt="${products[i].alt}">
            <div style="position: relative; top: -40px; text-align: center; font-size: 24px; color: #d32f2f;">
                🌟
            </div>
        </td>
        <td style="font-size: 20px; font-weight: bold; color: #388e3c;">
            🎅 ${products[i].name}
        </td>
        <td style="font-size: 20px; color: #1976d2;">
            🎁 ${qty[i]}
        </td>
        <td style="font-size: 20px; color: #7b1fa2;">
            🎄 ${products[i].qty_available}
        </td>
        <td style="font-size: 20px; color: #5d4037;">
            $${products[i].price.toFixed(2)}
        </td>
        <td style="font-size: 20px; color: #e64a19;">
            $${extended_price.toLocaleString()}
        </td>
    </tr>
`;}

// Sales tax at 4%
// let taxAmount = Subtotal x 4% = Tax at 4%
let tax_rate = 0.04;
let taxAmount = subtotal * tax_rate;

// Shipping and add All Associated Costs (tax % & subtotal)" combined to get Total.
// If subtotal is less than $300, the following actions are performed:
        //shipping = 12: Sets the shipping cost to $12.
        //shipping_display = Put in $ and 2 decimals places to $ shipping.00
        //total =  Get total by adding the tax %, subtotal, and [shipping: either $12 <$300 or $25 >=$300].
if (subtotal < 300) {
    shipping = 12;
    shipping_display = `$${shipping.toFixed(2)}`;
    total = Number(taxAmount + subtotal + shipping);
}
// else any subtotal greater than or equal to $300 will cost $25 shipping fee.
else {
    shipping = 25;
    shipping_display = `$${shipping.toFixed(2)}`;
    total = Number(taxAmount + subtotal + shipping);
};

// Display $ sub-total, $ tax, $ shipping, and $ total information to display on invoice.html. 
    // So user can see information crucial for understanding the cost breakdown of purchases.
document.querySelector('#total_display').innerHTML += `
    <tr style="border-top: 2px solid black; font-family: 'Courier New', monospace; color: green;">
        <td colspan="5" style="text-align:center; font-size: 18px;"> 🎁 Sub-total</td>
        <td style="font-size: 18px;"> $${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
    <tr style="font-family: 'Courier New', monospace; color: red;">
        <td colspan="5" style="text-align:center; font-size: 18px;"> 🎄 💸${(Number(tax_rate) * 100).toLocaleString()}% Tax </td>
        <td style="font-size: 18px;"> $${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
    <tr style="font-family: 'Courier New', monospace; color: blue;">
        <td colspan="5" style="text-align:center; font-size: 18px;"> 🎅 💸Shipping</td>
        <td style="font-size: 18px;"> ${shipping_display}</td>
    </tr>
    <tr style="font-family: 'Courier New', monospace; color: brown;">
        <td colspan="5" style="text-align:center; font-size: 20px;"> 🎁 💵<b>Total</b></td>
        <td style="font-size: 20px;"><b> $${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 💳</b></td>
    </tr>
`;


// Thank you and Merry Christmas End Cards for Invoice.html
document.addEventListener('DOMContentLoaded', function () {
    const THANKYOU = document.querySelector('.THANKYOU');
    const Santa = document.querySelector('.Santa');
    const catJAM = document.querySelector('.catJAM');
    // Add the 'move' class to start the animation
    THANKYOU.classList.add('move');
    Santa.classList.add('move');
    catJAM.classList.add('move');
});



