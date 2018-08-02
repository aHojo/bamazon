const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({

    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "bamazon"
});

let updateProduct = function (stock, purchased, id) {
    
    connection.query("UPDATE products SET ? WHERE ? ", [
        {
            "stock_quantity": parseInt(stock) - parseInt(purchased)
        },
        {
            "item_id": id
        }
    ], function (err, response) {
        if (err) {
            console.error(err);
        }
    });
}

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
    
            connection.query("SELECT * FROM bamazon.products WHERE ?", { "item_id": answer.id}, function (err, res) {
                
                if (err) {
                    console.error(err);
                }
                if(parseInt(answer.quantity) > parseInt(res[0].stock_quantity)) {
                    console.log(`Insufficient stock to fill request, we currently only have ${res[0].stock_quantity} left of ${res[0].product_name}`);
                } else {
                    let total = parseInt(answer.quantity) * parseInt(res[0].price);
                    // console.log(res[0].item_id + " " + res[0].product_name + " " + res[0].department_name + " " + res[0].price);
                    updateProduct(res[0].stock_quantity, answer.quantity, res[0].item_id);

                    console.log(`\n\n${res[0].product_name}\nTotal: $${total}`);
                    connection.end();
                }

            });
            

        });
    });
};




connection.connect((err) => {
    if (err) {
        console.error(err);
    }

    listProducts();
});