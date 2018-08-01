const mysql = require("mysql");

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

        console.log(res);
        for(let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}\tITEM: ${res[i].product_name}\tPRICE: $${res[i].price}\tSTOCK: ${res[i].stock_quantity}`);
        }
    });
};

connection.connect((err) => {
    if (err) {
        console.error(err);
    }

    listProducts();
});