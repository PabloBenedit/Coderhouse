const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HTTPServer } = require('http')
const router = require('./src/Routes/routes.js')
const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
const PORT = 8080
const datos = require('./src/Products/products.js').listOfProducts()
const messages = require('./public/messages.json')
const MessagesActions = require('./src/Controller/msgController').MessagesActions

//middleware
app.set('views', 'public');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router)
app.use('/message', router)
app.get('/', (req, res) => {
  res.render('index', {datos});
})


// Server conectado exitosamente
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

io.on('connection', socket => {
  console.log('Cliente conectado')
  socket.emit('tabla', datos);
  socket.on('disconnect', () => console.log('Cliente desconectado'))
});
io.on('connection',socket => {
  socket.emit('messages', messages);
  socket.on('new-message',data => {
      MessagesActions.add(data);
      io.sockets.emit('messages', messages);
  });
});



