const users = require("../Users/index");
const mysql = require("../database/database");
// const users = require("../app");
module.exports = (app) => {
  var session;
app.post("/register", users.register);
app.get("/userslist", users.userslist);
app.post("/loginuser", users.loginuser);
/*app.get("/users/chat/:id", async function (req, res, next) {
  const ch_name = req.params.id;
  var valSlice = ch_name.slice(3);
  console.log(valSlice, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  returnres.send(valSlice);
});*/
app.get("/users/chat/:id", users.receiver);








//app.get("/loginUser", users.login);

/*app.post("/loginuser", function (req, res, next) {
  var session;
  session=req.session;
  session.username=req.body.username;
    users
      .login(req, res)
      .then((result) => {
        if (result.status) {
          req.session.userids=req.body.username;
          res.redirect("/userlist");
        } else {
          // res.redirect("/preferences/id="+result.result);
        }
      })
      .catch((err) => { 
        console.error(err);
      });
  });

  app.get("/userchat/:id", async function (req, res, next) {
    const ch_name = req.params.id;
    var valSlice = ch_name.slice(3);
    var loginids = req.session.userids;
    const messages = await mysql("SELECT * FROM messages WHERE (sender= '"+ loginids +"' AND receiver= '"+ valSlice +"') OR (sender= '"+ valSlice +"' AND receiver= '"+ loginids +"')") 
    res.render("user_page", {receiver: valSlice, sender:loginids, messages:messages});
  });

  app.get("/userlist", function (req, res, next) {
    users
    .list(req, res)
    .then((result) => {
      if (result.status) {
        // var userids = ssn.username
        // console.log(userids + "094")
      const usernames = req.session.userids
        res.render("userlist", {list:result.result, usernames: usernames });
      } else {
        // res.redirect("/preferences/id="+result.result);
      }
    })
    .catch((err) => { 
      console.error(err);
    });
  });
*/
}