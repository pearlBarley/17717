/**
 * GET /
 * Home page.
 */
// exports.index = (req, res) => {
//   res.render('home', {
//     title: 'Home'
//   });
// };
exports.index = (req, res) => {
    res.render('index');
};
// exports.index = (req, res) => {
//   if (req.cookies.user == null) {
//     res.redirect('/signin');
//     // res.render('chat/signin');
//   } else {
//     // res.sendfile('views/chat/index.html');
//     res.render('chat/index');
//   }
// };
exports.enterRoom = (req, res) => {
  let roomInfo = req.app.roomInfo;
  var roomID = req.params.roomID;
  res.render('room', {
    roomID: roomID,
    users: roomInfo[roomID]
  });
}
exports.signin = (req, res) => {
  // res.sendfile('views/chat/signin.html');
  res.render('chat/signin');
  //res.sendfile('chat/signin'); error
}
exports.signin_post = (req, res) => {
  let users = req.app.users;
  if (users[req.body.name]) {
    //存在，则不允许登陆
    res.redirect('/signin');
  } else {
    //不存在，把用户名存入 cookie 并跳转到主页
    res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*30});
    res.redirect('/');
  }
}
 