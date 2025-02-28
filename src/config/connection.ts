import mysql from 'promise-mysql';


const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'apliwebb'

});

export default pool;

