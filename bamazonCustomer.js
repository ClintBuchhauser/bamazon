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
            .then(function (answer) {

                var selected = ((answer.selection) - '1');
                var quantity = (answer.quantity);
                // console.log("selected " + selected);
                // console.log("quantity " + quantity)
                var total = ((res[selected].price) * quantity)
                // Check if store has enough (If not, "Insufficient quantity")
                if (answer.quantity > res[selected].quantity) {
                    console.log('We do not have that quantity available.')
                    displayItems();
                } else {
                    console.log('You selected ' + quantity + ' ' + res[selected].product_name + 's')
                    // Show customer total cost of purchase
                    console.log('Your total is $' + total)
                    var stock = (res[selected].quantity);
                    var id = (res[selected].item_id);
                    var result = (stock - quantity);
                    // console.log("Stock: " + stock);
                    // console.log("ID " + id);
                    // console.log("Result " + result)
                    // If store has enough, update quantity in MySQL Database
                    var yes = "UPDATE products SET quantity = " + result + " WHERE item_id = " + id;
                    connection.query(yes, function (err, res) {
                        if (err) throw err;
                        console.log(result + " left in stock.");
                        console.log('Thank you!');
                        console.log('--------------------------------');
                        displayItems();
                    });
                }
            })
    })
}