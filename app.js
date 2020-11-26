var fs = require('fs');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var db = require('./dbDetails');
var details = db.name;

//connect to MySql database
var mysql = require('mysql');
const { userInfo } = require('os');
const { parse } = require('path');
var conn = mysql.createConnection(details);

try{
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })
}catch(err){
    console.log(err);
}

var app = express();

//register body-parseer middleware for processing forms
app.use(bodyParser.urlencoded({ 
    extended:true
}));

//session middleware
app.use(session({
    secret: 'postco',
    resave: false,
    saveUninitialized: false,
}));

//use ejs
app.set('view engine', 'ejs');

//Middleware to access files in assets folder (style.css)
app.use('/assets', express.static('assets')); 

app.get('/', function(req, res){
    if(req.session.name){
        if(req.session.role == "Store Owner"){
            res.render('indexStoreOwner', {name : req.session.name, num : req.session.icNo, role : req.session.role, location: req.session.location});
        }else{
            res.render('indexVisitor', {name : req.session.name, num : req.session.icNo, role : req.session.role, location: req.session.location});
        }
        
    }else{
        res.render('login');
    }
    
})

//index page
app.get('/index', function(req, res){
    if(req.session.name){
        res.render('indexStoreOwner', {name : req.session.name, num : req.session.icNo, role : req.session.role, location: req.session.location});
    }else{
        res.write("<h1>User not logged in</h1><a href='/'>Login Page</a>")
    }
})

//Login action 
app.post('/login', function(req, res){
    var name = req.body.f_name;
    var num = req.body.icNo;

    try{
        let sql = "SELECT * FROM user WHERE name = ? AND ic = ?";
        conn.query(sql, [name, num], (err, result)=>{
            if(err) throw err;

            //If data exists
            if(result.length > 0){

                //session start
                req.session.name = name;
                req.session.icNo = num;
                req.session.role = result[0]['role'];
                req.session.location = result[0]['location'];

                if(req.session.role == "Store Owner"){
                    //redirect to storeOwner index page if result is found
                    res.render('indexStoreOwner', {name : name, num : num, role : req.session.role, location: req.session.location});
                }else{
                    //redirect to visitor index page if result is found
                    res.render('indexVisitor', {name : name, num : num, role : req.session.role});
                }

            }else{
                res.write(`<h1>Ooops something went wrong!</h1>
                <h3>Name: ${name} with IC Number: ${num} could not be found in our database!<h3>
                <a href = '/'>Login Page</a>`);
            }
        })
    }catch (err){
        console.log(err);
    }
});

//render to register page
app.get('/register-page', function(req, res){
    res.render("register");
})

//registering new user
app.post('/register', function(req, res){
    var name = req.body.f_name;
    var num = req.body.icNo;
    var role = req.body.role;
    var location = req.body.location;

    try{
        let sql = "INSERT INTO user(name, ic, role, location) VALUES(?, ?, ?, ?)";
        conn.query(sql, [name, num, role, location], (err, result)=>{
            if(err) throw err;

            //If data exists
            if(result){
                res.write(`<h1>Successfully created new User!</h1>
                <a href = '/'>Main Page</a>`);
                res.end();
            }else{
                res.write(`<h1>Ooops something went wrong!</h1>
                <a href = '/'>Main Page</a>`);
            }
        })
    }catch (err){
        console.log(err);
    }
})

//qr scanner page
app.get('/qr-scanner', function(req, res){
    res.render('qr-scanner');
})

app.post('/check-in', function(req, res){
    let temperature = req.body.temperature;

    let dateObj = new Date();
    let month = dateObj.getMonth() + 1; //months from 1-12
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let cur_date = year + "/" + month + "/" + date;

    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    let second = dateObj.getSeconds();
    let cur_time = hour + ":" + minute + ":" + second;

    //check if temperature is a number
    if(isNaN(temperature)){
        res.write("<h1>Ooops Something Went Wrong!</h1><h3>Temperature must be a number</h3><a href='/qr-scanner'>Back</a>");
    }else{
        //insert new visitors into visitors table
        let sql = "INSERT INTO visitors(Full_name, IC_No, location, Temperature, Date, Time) VALUES(?, ?, ?, ?, ?, ?)";
        conn.query(sql,[req.session.name, req.session.icNo, 'Tapir Grocer', parseFloat(temperature), cur_date, cur_time] , (err, result)=>{
            if(err) throw err;

            //if successful query
            if(result){
                res.render('visitorDetails', {name : req.session.name, num : req.session.icNo, role : req.session.role, location: req.session.location, icNo: req.session.icNo, temperature: temperature, date: cur_date, time: cur_time});
            }else{
                res.write(`<h1>Ooops something went wrong!</h1><h3>Could not update database </h3>
                <a href = '/'>Main Page</a>`);
            }
        })
    }
})

//logout action
app.get('/logout', function(req, res){
    req.session.destroy(function(err){
        if(err) throw err;
    })
    
    res.redirect('/');
})

app.listen("3000");
console.log("Listening to port 3000");