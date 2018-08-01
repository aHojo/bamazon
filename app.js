const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({

    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "bamazon"
});

let listProducts = function () {

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) {
            console.error(err);
        }

        for(let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}\tITEM: ${res[i].product_name}\tPRICE: $${res[i].price}\tSTOCK: ${res[i].stock_quantity}`);
        }

        inquirer.prompt([
            {
                "type": "input",
                "name": "id",
                "message": "What is the ID of the item you wish to buy?"
            },
            {
                "type": "input",
                "name": "quantity",
                "message": "How man would you like to buy?"
            }
        ]).then(function (answer) {
            console.log(answer.id);
            console.log(answer.quantity);

    });
    });
};

connection.connect((err) => {
    if (err) {
        console.error(err);
    }

    listProducts();
});