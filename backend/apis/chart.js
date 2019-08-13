// let app = require('express')();
// let http = require('http').Server(app);
// let io = require('socket.io')(http);
// 
// // app.post('/api/chart', function(req, res){
// //
// // });
// 
// // io.on('connection', function(socket){
// //     console.log('a user connected');
// // });
// 
// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });
// io.sockets.on('connection', function (socket) {
//     //发送消息给客户端
//     socket.emit('chart','哈哈哈');
//     //监听客户端发来的消息
//     socket.on('chart', function (data) {
//         // redisClient.get(data, function(error, res){
//         //     if(error) {
//         //         console.log(error);
//         //     } else {
//         //         socket.emit('chart', res);
//         //     }
//         // });
//         console.log(data);
//     });
// });




let app = require('express')();
let server = app.listen(3000);   
let io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  console.log('123', '有客户端连接');
      socket.on('chart', function (data) {
          // redisClient.get(data, function(error, res){
          //     if(error) {
          //         console.log(error);
          //     } else {
          //         socket.emit('chart', res);
          //     }
          // });
          // if(data.to === 'user_id_005') {
          //     socket.emit('user_id_005','是你啊' + data.to);
          // }
		  socket.emit('chart',data);
          console.log(data);
      });
});