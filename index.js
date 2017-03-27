var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUserOnline = [];
io.on("connection",function(socket){
  console.log("co nguoi ket noi vao server")
  socket.on("client_gui_username",function(data){
    console.log("co nguoi dang ki userName la" + data);
      if (mangUserOnline.indexOf(data)>=0)
      {
        console.log("dang ki that bai");
        socket.emit("thatbai",data);
      }
      else
      {
        mangUserOnline.push(data);
        socket.Username = data;
        io.sockets.emit("thanhcong",{username:data,id:socket.id});
      }
  });
  socket.on("client_gui_message",function(data){
    io.sockets.emit("server_gui_message",{Username:socket.Username,msg:data});
  });
  socket.on("chocgheo_id",function(data){
    io.to(data).emit("server_xuly_choc",socket.Username);
  });
});

app.get("/",function(req,res){
  res.render("trangchu");
})
