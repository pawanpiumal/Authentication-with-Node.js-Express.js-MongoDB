var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/LoginAPP');



var userSchema = mongoose.Schema({
    username: String,
    password:String
});
var User = mongoose.model("User",userSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'./index.html'))
});

app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname,'./signup.html'));
});

app.post('/',function(req,res){
    var logInfo = req.body;
    if(!logInfo.username || !logInfo.password){
        res.send('Invalid Input');
    }else{
        User.find({username:logInfo.username , password: logInfo.password},function(err,response){
            if(err) res.send('User Not Found');
            if(response.length){
                res.send("Logged IN");
            }else{
                res.send("User Not Found");
            }

        })
    }
});

app.post('/signup',function(req,res){
    var userInfo = req.body;
    if(!userInfo.username || !userInfo.password){
        res.send('Not Added')
    }else{
        var newUser = new User({
            username:userInfo.username,
            password:userInfo.password
        });

        newUser.save(function(err, User){
            if(err) res.send('Not Added');
            res.redirect('/')
        });
    }
});
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'./index.html'))
});

app.listen(8081);