const express= require("express");
const app= express();
const bodyparser= require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const server= require("http").createServer(app);
const io= require("socket.io")(server);
const mysql= require("./database/database");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors= require("cors");
app.use(cookieParser());
require("dotenv").config();
app.set('view engine', 'ejs')
var datalist=[];
var passwordlist=[];
var corsoption= {/*origin:"http://localhost:3000" */}
app.use(cors(corsoption))
const oneDay = 1000 * 60 * 60 * 24;
app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', '*')
    res.header('Access-Control-Allow-Credentials', true)
    next();
})
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));

require("./router/chat_app")(app);  
app.get("/", (req,res)=>{
    res.send("hello")
})

/*app.get('/chat_app', async(req,res,next) => {
    res.render('user_page')
})

app.get('/', async(req, res, next)=>{
    res.redirect('/home')
})

app.get('/home', async(req,res,next) => {
    res.render('login')
});
*/



const PORT= 3000 || process.env.PORT

server.listen(PORT, () =>{
    console.log("server is running")
})

var users = [];
var connections=[];
function addConnection(userid, socketid){
    !connections.some((connection => connection.userid==userid)) && connections.push({userid:userid,socketid:socketid})
    console.log(connections)
}

const findUser= async (userId)=>{
    return await connections.find((connection=>connection.userid===userId));
  }
  
//    const disconnect=(userId)=>{
//      connections=connections.filter(connection=>connection.userid!=userid)
//      console.log(connections)
//    }
io.on('connection', function(socket){
    console.log("user connected  " + socket.id)
    socket.on("user_connected", function(data){
    //addConnection(data.username, socket.id);
       var username= data.username;
       console.log(username, "I got the username finally")
       users[data.username]=socket.id;
    //socket.join(data.username)
       console.log(data.username, "login user connected")
})
    //socket.on("loginuser", function(data){
    //    addConnection(data.username, socket.id);
   // })
   /* socket.on("send-message", function(data){
        var socketId = users[data.receiver];
        console.log(socketId);
        console.log("socketId");
         io.to(socketId).emit("message", data);
     })*/
    
    socket.on("message", async function(data){
        // var socketId=users[data.user]
        //console.log(data.username, data.message + "cocococococo")
        //var userl = await findUser(data.receiver);
        //var receiver = userl.userid
        //var socketId = userl.socketid
        //console.log(receiver, "I GOT THE USER")
        var socketId = users[data.receiver]
        var sender = data.sender;
        var message = data.message;
        console.log(socketId, "sockettid received")
        //console.log(users, "THIS IS USERS LIST")
        //const messageList = await mysql("INSERT INTO messages(sender, receiver, message) VALUES('"+ data.sender +"', '"+ data.receiver +"', '"+ data.message +"')")
        //console.log(userl + "fdjfnksdjfnkdsjfnks")
        //var sc = userl.userid;
       // var ewq = userl.socketid;
        //console.log(sc + "____00000")
        //console.log(ewq + "____00000123")
        const messageList = await mysql("INSERT INTO messages(sender, receiver, message) VALUES('"+ data.sender +"', '"+ data.receiver +"', '"+ data.message +"')")
        //socket.broadcast.emit("message-broadcast",{sender: sender, receiver: receiver, message:message})
        //io.to(socketId).emit("message-broadcast", {sender: sender, receiver: userl.userid, message:message});
        //socket.broadcast.to(socketId).emit("message-broadcast", data);
        //socket.broadcast.emit("message-broadcast", data);
        //io.sockets.in(data.receiver).emit("message-broadcast", data);
        io.to(socketId).emit("message-broadcast", data);
        console.log(data)
    })
    // socket.on('user_login', function(data){
       // socket.on("disconnect",async ()=>{
            // await disconnect(client.id)
         //   socket.disconnect();
         //})
       
    //     console.log(data.username + "12")
    //     console.log(data , "69")
    //     addConnection(data.username, socket.id);
    //     var j=0;
    //     users[data.username]=socket.id;
    //      //console.log(data.username)
    //      for(var i = 0; i< datalist.length; i++){
    //          if(data.username == datalist[i].username){
    //              if(data.password== passwordlist[i].password){
    //                  const socketId= users[data.username]
    //                  userSocket= socketId;
    //                  console.log(data)
    //                  io.emit("login_user", data)
    //                  j++;
    //              }
    //         }
    //      }
    //      if (j === 0){
    //         socket.emit("wrong-user", "Oops! Login Failed")
    //     }
       
    //  })

        


})
