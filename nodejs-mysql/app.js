const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Welcome1!',
  database: 'mysql'
});

mysqlConnection.connect(err => {
  if (err) throw err;

  query(mysqlConnection, 'CREATE DATABASE mydb')
    .catch(err => {
      if (err.errno === 1049) return 1049;
    })
    .then(() => {
      return query(mysqlConnection, 'CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))')
    })
    .catch(err => {
      if (err.errno === 1050) return 1050;
    })
    .then(() => {
      return query(mysqlConnection, 'DELETE FROM customers');
    })
    .then(() => {
      const values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple st 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345'],
        ['Sandy', 'Ocean blvd 2'],
        ['Betty', 'Green Grass 1'],
        ['Richard', 'Sky st 331'],
        ['Susan', 'One way 98'],
        ['Vicky', 'Yellow Garden 2'],
        ['Ben', 'Park Lane 38'],
        ['William', 'Central st 954'],
        ['Chuck', 'Main Road 989'],
        ['Viola', 'Sideway 1633']
      ];
      return query(mysqlConnection, "INSERT INTO customers (name, address) VALUES ?", values);
    })
    .then(() => {
      return query(mysqlConnection, 'SELECT name, address FROM customers ORDER BY name DESC LIMIT 5, 5');
    })
    .then(() => {
      return query(mysqlConnection, `UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'`);
    })
    .then(() => {
      return query(mysqlConnection, `SELECT * FROM customers WHERE address LIKE 'C%'`);
    })
    .then(() => {
      return query(mysqlConnection, 'DROP TABLE IF EXISTS customers');
    })
    .catch(console.log);
});

function query(connection, queryString, options) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, options ? [options] : undefined, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}