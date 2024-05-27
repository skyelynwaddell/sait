const { response } = require("express");
const mysql = require("mysql");
let instance = null;

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
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

    async createNewUser(data){
        try{
            const insertId = await new Promise((resolve,reject) => {
                const query = "INSERT INTO users (username, password, posts, following, followers, date) VALUES (?, ?, ?, ?, ?, ?);";

                sql.query(query, [data.username,data.password,0,0,0,date] , (err,result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            })
        } catch(err) { console.log(err); }
    }

    async insertNewPost(data){
        try{
            let date = new Date();
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            
            const insertId = await new Promise((resolve,reject) => {
                const query = "INSERT INTO posts (username, content, likes, reposts, comments, date, time) VALUES (?, ?, ?, ?, ?, ?, ?);";

                sql.query(query, [data.username,data.content,0,0,0,date,time] , (err,result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            })
            //console.log(insertId)
            //return insertID;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DBService;