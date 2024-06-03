//Skye Waddell Node.JS | Day 8 - 13 CPNT-262
//May 2024

const { response } = require("express");
const mysql = require("mysql");
let instance = null;

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "classproject",
    connectionLimit: 10,
});

sql.connect((err) => {
    if (err) return console.error("Error connecting to DB! " + err.stack);

    console.log("Connected to MySQL");
})

class DBService{
    static getDbServiceInstance(){
        return instance ? instance : new DBService();
    }

    async getData(tableName){
        try{
            const res = await new Promise((resolve,reject) => {
                const query = `SELECT * FROM ${tableName}`;

                sql.query(query, (err,results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            //console.log(res);
            return res;
        } catch (err) { console.log(err); }
    }
}

module.exports = DBService;