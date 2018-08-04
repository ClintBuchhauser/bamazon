// Requirements & Connection
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ridged123',
    database: 'bamazon'
})

// Run app
connection.connect(function (err) {
    if (err) throw (err)
    console.log('Connected')
    displayItems()
})

// Displays all items available for sale (IDs, names, prices)
function displayItems() {
    connection.query('SELECT*FROM products', function (err, res) {
        console.log('Items for sale:')

        for (var i = 0; i < res.length; i++) {
            console.log('#' + res[i].item_id + ' ' + res[i].product_name + ' $' + res[i].price)
        }
    })

    inquirer.prompt([
        // Select ID to purchase
        {
            type: 'input',
            name: 'selection',
            message: 'Which item # would you like to purchase?',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        // Select how many to buy
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?',
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(function(answer){
        var selected = (answer.selection);
        var quantity = (answer.quantity);
        var total = parseFloat(((res[selected].price)*quantity).toFixed(2));
            console.log('You selected ' + quantity + ' ' + selected)
            // Show customer total cost of purchase
            console.log('Your total is $' + total)
        })
}
// RES NOT DEFINED


// Check if store has enough (If not, "Insufficient quantity")
// If store has enough, update quantity in SQL Database
