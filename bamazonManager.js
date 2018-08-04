const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({

    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "bamazon"
});

const viewProducts = function () {

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) {
            console.error(err);
        }

        for (let i = 0; i < res.length; i++) {
            console.log(`-------------------------------------------------------------------------------------------------------------`)
            console.log(`ID: ${res[i].item_id}\tITEM: ${res[i].product_name}\tDEPARTMENT: ${res[i].department_name}\tPRICE: $${res[i].price}\tSTOCK: ${res[i].stock_quantity}`);
        }
        console.log(`-------------------------------------------------------------------------------------------------------------\n`);
        start();
    });
};

const viewLowStock = function () {


    connection.query("SELECT * FROM products", function (err, res) {

        if (err) {
            console.error(err);
        }

        console.log("Low Stock (Items that are 3 and under): ");

        for (let i = 0; i < res.length; i++) {

            if(parseInt(res[i].stock_quantity) < 3) {
                console.log(`--------------------------------------------------------------------------------------------------------------------------`)
                console.log(`ID: ${res[i].item_id}\tITEM: ${res[i].product_name}\tDEPARTMENT: ${res[i].department_name}\tPRICE: $${res[i].price}\tSTOCK: ${res[i].stock_quantity}`);
            }
        }
        console.log(`---------------------------------------------------------------------------------------------------------------------------------\n`);
        start();
    });

};

//This function is to deal with the SELECT mysql promis that is generated.
const updateStock = function (quantity, value, id) {
    let total = 0;
    total = parseInt(quantity) + parseInt(value);

    connection.query("UPDATE products SET ? WHERE ?", [{"stock_quantity": total}, {"item_id": id}], function (err, res) {
        if(err) throw new Error(err);
    });
    start();
};
const addStock = function () {

    inquirer
    .prompt([
        {
            "type": "input",
            "name": "id",
            "message": "ID of the item you wish to add stock: "
        },
        {
            "type": "input",
            "name": "value",
            "message": "How many products should we add?: "
        }

    ]).then(function (answer) {

        connection.query("SELECT * FROM products WHERE ?", {"item_id": answer.id}, function (err, res) {
            if(err) {
                console.error(err);
            }

            return updateStock(res[0].stock_quantity, answer.value, answer.id);
        });


    });
};
const addProduct = function () {
    inquirer
    .prompt([
        {
            "type": "input",
            "name": "name",
            "message": "Name of the Item to add: "
        },
        {
            "type": "input",
            "name": "price",
            "message": "Price of the item to add: "
        },
        {
            "type": "input",
            "name": "stock",
            "message": "Amount of the item to add: "
        },
        {
            "type": "input",
            "name": "department",
            "message": "Which department does this item belong? "
        }

    ]).then(function (answer) {
        let item = {
            "product_name": answer.name,
            "department_name": answer.department,
            "price": parseFloat(answer.price),
            "stock_quantity": parseInt(answer.stock)
        };
        connection.query("INSERT INTO products SET ?", item, function (err, res) {
            if(err) throw new Error(err);
        });
        start();
    }

)};

function start () {
inquirer
    .prompt([
        {
            "type": "list",
            "name": "menu",
            "message": "Menu:",
            "choices": [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ]).then(function (answer) {


        switch(answer.menu){

            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowStock();
                break;

            case "Add to Inventory":
                addStock();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "Exit":
                connection.end();
                break;

            default:
                console.log(`Error, something went wrong!`);
                break;
        }
    });
};

start();