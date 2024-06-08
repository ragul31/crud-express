var express = require('express');
var app = express();
const bodyParser = require("body-parser");
var fs = require('fs');
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended:true

}));
app.get('/', function(req,res){
    res.sendFile(__dirname+'/'+"index.html");
});
app.post("/addUser",function(req,res){
    var username = req.body.username;
    var dob = req.body.dob;
    var obj = {};
    var key = req.body.userid;
    var newuser = {
        "name" : username,
        "dob" : dob
    }
    obj[key] = newuser;

    fs.readFile("user.json",function(err,data){
        data = JSON.parse(data);
        data[key] = obj[key];
        console.log(data);
        var updatuser = JSON.stringify(data);
        fs.writeFile("user.json",updatuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});
app.post("/Userss",function(req,res){
    fs.readFile("user.json","utf8",function(err,data){
        var users = JSON.parse(data);
        var user = users[req.body.uid];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

app.post("/deletUser",function(req,res){
    fs.readFile("user.json",function(err,data){
        data = JSON.parse(data);
        delete data[req.body.urid];
        console.log(data);
        var updateuser  = JSON.stringify(data);
        fs.writeFile("user.json",updateuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});
app.get('/show',function(req,res){
    fs.readFile("user.json",function(err,data){
        console.log(data);
        res.end(data);
    });
});

app.listen(port,function(){
    console.log("server is running");
});