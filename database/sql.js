const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'bkntk47u4khwcfcoggtu-mysql.services.clever-cloud.com',
    database: 'bkntk47u4khwcfcoggtu',
    user: 'unzspnxwnylkvv4e',
    password: 'vCg4hyYmv5CALxl9GIQh',
    port: 3306,
    
})
connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
})
module.exports = { connection };