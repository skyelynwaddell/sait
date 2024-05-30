//Skye Waddell Node.JS | Day 8 - 13 CPNT-262
//May 2024

const { response } = require("express");
const mysql = require("mysql");
let instance = null;

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "setechi",
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

    //delete post function
    async deletePost(data) {
        try {
            // Delete the post
            const deleteQuery = `DELETE FROM ${data.tableName} WHERE id = ?`;
            await new Promise((resolve, reject) => {
                sql.query(deleteQuery, [data.id], (err, result) => {
                    if (err) {
                        console.error("Error deleting post:", err.message);
                        reject(err);
                    } else {
                        console.log("Post deleted successfully:", result);
                        resolve(result);
                    }
                });
            });
    
            // Update user post count
            const updateQuery = "UPDATE users SET posts = posts - 1 WHERE username = ?";
            await new Promise((resolve, reject) => {
                sql.query(updateQuery, [data.username], (err, result) => {
                    if (err) {
                        console.error("Error updating post count:", err.message);
                        reject(err);
                    } else {
                        console.log("Updated post count:", result);
                        resolve(result);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
    
    //like/dislike post
    async increasePost(data){
        try {
            // Check if user has already liked this post
            let existingLike = await new Promise((resolve, reject) => {
                let query = `SELECT * FROM ${data.value} WHERE postID = ? AND ${data.userColumn} = ?`;
                sql.query(query, [data.postID, data.username], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return reject(new Error(err.message));
                    }
                    resolve(result);
                });
            });
    
            if (existingLike.length > 0) {
                // If user has already liked the post, decrease post count and delete existing like
                let decreaseRes = await new Promise((resolve, reject) => {
                    let query = `UPDATE ${data.tableName} SET ${data.value} = ${data.value} - 1 WHERE id = ?`;
                    sql.query(query, [data.postID], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            return reject(new Error(err.message));
                        }
                        resolve(result);
                    });
                });
    
                let deleteRes = await new Promise((resolve, reject) => {
                    let query = `DELETE FROM ${data.value} WHERE postID = ? AND ${data.userColumn} = ?`;
                    sql.query(query, [data.postID, data.username], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            return reject(new Error(err.message));
                        }
                        resolve(result);
                    });
                });
    
                console.log("User has already liked the post. Decreased post count and removed existing like.");
            } else {
                // If user has not liked the post, increase post count and insert new like
                let increaseRes = await new Promise((resolve, reject) => {
                    let query = `UPDATE ${data.tableName} SET ${data.value} = ${data.value} + 1 WHERE id = ?`;
                    sql.query(query, [data.postID], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            return reject(new Error(err.message));
                        }
                        resolve(result);
                    });
                });
    
                let insertRes = await new Promise((resolve, reject) => {
                    let query = `INSERT INTO ${data.value} (postID, ${data.userColumn}) VALUES (?, ?)`;
                    sql.query(query, [data.postID, data.username], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            return reject(new Error(err.message));
                        }
                        console.log("Inserted into likes:", result);
                        resolve(result);
                    });
                });
            }
    
            return "Success";
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    //sql query to search users 
    async getUserByEmail(email) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE email = ?";
                sql.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    if (results.length > 0) resolve(results[0]);
                    else resolve(null);
                });
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    //signup function / query
    async createNewUser(data,res){
        try{
            let date = new Date();
            const insertId = await new Promise((resolve,reject) => {
                const query = "INSERT INTO users (email, username, password, posts, following, followers, date) VALUES (?, ?, ?, ?, ?, ?, ?);";

                sql.query(query, [data.email, data.username,data.password,0,0,0,date] , (err,result) => {
                    if (err) { 
                        res.send("Email / Username already exists!");
                        return reject(new Error(err.message)); 
                    }
                    resolve(result.insertId);
                })
            })

            res.redirect("login")
        } 
        catch(err) { 
            console.log(err);
            res.send("Error 404: Page Not Found!");
        }
    }

    //create new post
    async insertNewPost(data) {
        try {
            let date = new Date();

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            // First query: Insert into posts
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO posts (username, content, likes, reposts, comments, date, time) VALUES (?, ?, ?, ?, ?, ?, ?);";
                sql.query(query, [data.username, data.content, 0, 0, 0, date, time], (err, result) => {
                    if (err) {
                        console.error("Error inserting into posts:", err.message);
                        reject(new Error(err.message));
                    } else {
                        console.log("Inserted post with ID:", result.insertId); // Log the insertId
                        resolve(result.insertId);
                    }
                });
            });

            // Second query: Insert into users_posts
            await new Promise((resolve, reject) => {
                const query2 = "INSERT INTO `users_posts` (postID, username) VALUES (?, ?);";
                sql.query(query2, [insertId, data.username], (err, result) => {
                    if (err) {
                        console.error("Error inserting into users_posts:", err.message);
                        reject(new Error(err.message));
                    } else {
                        console.log("Inserted into users_posts:", result); // Log the result
                        resolve(result);
                    }
                });
            });

            // Third query: Update user post count
            await new Promise((resolve, reject) => {
                const query3 = "UPDATE users SET posts = posts + 1 WHERE username = ?";
                sql.query(query3, [data.username], (err, result) => {
                    if (err) {
                        console.error("Error updating post count:", err.message);
                        reject(new Error(err.message));
                    } else {
                        console.log("Updated post count:", result); // Log the result
                        resolve(result);
                    }
                });
            });

            return insertId;

        } catch (err) {
            console.error("Error in insertNewPost:", err);
        }
    }
   
}

module.exports = DBService;