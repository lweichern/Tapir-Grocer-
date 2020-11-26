var mysql = require("mysql");
var db = require('./dbDetails');
var details = db.name;

//connect to MySql database
var mysql = require('mysql');
var conn = mysql.createConnection(details);

try{
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "INSERT INTO visitors(Full_name, IC_No) VALUES('LIM WEI CHERns', '900228-03-5969');";
        conn.query(sql, (err, result)=>{
            if(err) throw err;
            console.log("Result: " + result);
        })
    });
}catch (err){
    console.log(err);
}

