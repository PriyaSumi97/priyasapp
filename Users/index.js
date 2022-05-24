const mysql = require("../database/database");
const io = require('socket.io');
const session = require("express-session");
const {regSchema} = require("../validation/reg.schema")
// const socket = io("http://localhost:3000");
module.exports = {

  async register(req, res) {
    try {
      console.log("welcome to backend")
      const {username, password} = req.body;
      const validation = regSchema.validate(req.body)
      if (validation.error) {
          return res.send({ message: validation.error.details[0].message });
      }
      const Exist = await mysql("SELECT * FROM users WHERE username=?", [username]);
      if (Exist && Exist.length >= 1) {
        return res.send({ message: "Already registered..Please Login!"});
      }
      const register = await mysql("INSERT INTO users(username, password) VALUES(?,?)", [
        username, password
      ]);
      console.log(req.body.username)
      return res.send({ message: "true"});
    } catch (err) {
      return res.send({ message: err.message });
    }
  },
  async loginuser(req,res){
    try{
      console.log("Hello orld")
       const {username, password} = req.body;
       const loginUser = await mysql("SELECT * FROM users WHERE username=? and password=?", [username, password]);
       if(loginUser && loginUser.length>=1){
         var session;
         session=req.session;
         session.username=req.body.username;
         req.session.userids=req.body.username;
         return res.send({status: 'success', message: 'loggedin successfully', result: {username: loginUser[0].username, userId: loginUser[0].id}})
       }
       else{
         return res.send({message:"fail"})
       }
    }
    catch{

    }
  },

async userslist(req,res){
  try{
      const list = await mysql("SELECT username FROM users")
      return res.send(list)
  }
  catch{
      return res.send("no user")
  }
},
async receiver(req,res){
  const ch_name = req.params.id;
  const sender = req.query.sender;
  var valSlice = ch_name.slice(3);
 // console.log(sender, "got sender")
  //var sender = req.session.userids;
  //console.log(sender, "got sender successfully")
  const messages = await mysql("SELECT * FROM messages WHERE (sender= '"+ sender +"' AND receiver= '"+ valSlice +"') OR (sender= '"+ valSlice +"' AND receiver= '"+ sender +"')")
  //console.log(messages)
  //console.log(ch_name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  return res.send({sender:sender, receiver:valSlice, message:messages})

  //return res.send(valSlice)
}


/*async list (req, res) {
  return new Promise(async (resolve, reject) => {
    console.log(req.body.username)
    const obj = JSON.parse(JSON.stringify(req.body));
    const values = [
      obj.username,
      obj.password
    ];
    console.log(values)
    let sess;
    sess = req.session;

    const sel= await mysql("SELECT * FROM users");
      if(sel && sel.length>0){
        console.log("login successfully")
        var user = sel[0].id;
        // sess = user
        // socket.emit("loginuser", user);
        sess = session
        resolve({
          status: true,
          message: "success",
          reason: "Updated successfully..!" , result: sel   });
      }
    
  });

}*/


}
