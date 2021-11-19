const express = require('express');
var app = express();
const path = require('path');
const socketio = require("socket.io")

const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

var User = require("./models/User");
var Chat = require("./models/Chat");
var Message = require("./models/Message");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
//DqfAOzgQadYFYuIL
mongoose.connect("mongodb+srv://Harshit:DqfAOzgQadYFYuIL@textchatapp.ef8gl.mongodb.net/TextChatApp?retryWrites=true&w=majority")
require("./passport-setup.js");

app.use(function (req, res, next) {
  res.locals.currUser = req.user;
  next();
});
app.use(
    require("express-session")({
      secret: "chatapp",
      resave: false,
      saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  };


app.get(
    "/login",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/home");
    }
  );

app.get("/failed", (req, res) => {
    res.redirect("/");
  });

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/home",isLoggedIn,async(req,res)=>{
  var u = await User.findById(req.user._id).populate("chats");
  res.render("main",{u});
});


//=======================================
//CHATS
app.get("/msg/:chatid",isLoggedIn,async(req,res)=>{
  var c = await Chat.findById(req.params.chatid).populate("messages");
  res.render("chatscreen",{c});
})


//=========================================
app.get("/new",isLoggedIn,async(req,res)=>{
  var u = await User.find();
  res.render("newpage",{u});
});
app.get("/new/:id",isLoggedIn,async(req,res)=>{
  var u = await User.findById(req.params.id);
  var u2 = await User.findById(req.user._id);
  var c = {
    a1:{
      name:u.name,
      pic:u.google.picture,
      id:u._id
    },
    a2:{
      name:u2.name,
      pic:u2.google.picture,
      id:u2._id
    },
    messages:[],
    timestamp:Date.now()
  }
  var rc = new Chat(c);
  rc.save();
  u.chats.push(rc);
  u.save();
  u2.chats.push(rc);
  u2.save();
  res.redirect("/home");
});

//=======================================
app.get("/profile",isLoggedIn,async(req,res)=>{
  var u = await User.findById(req.user._id);
  res.render("profile",{u});
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
    req.session.destroy();
});


var port = process.env.PORT || 3000;
const exserver= app.listen(port);
const io = socketio(exserver);
io.on("connection", function(socket){
  socket.emit('messageFromServer',{data:"Welcome to server"});
  socket.on('messageToServer',(dfromC)=>{
    console.log(dfromC);
  })
});