const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const { spawn } = require('child_process')
var fs = require('fs')
var mR = require('./fire.js')
//const pythonProcess = spawn('C:/Users/steve/Desktop/robotid/generate_play_2021/Scripts/python.exe',['C:/Users/steve/Desktop/robotid/generate_play_2021/katse3.py', ])


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('pages/index');
    
})
  .post('/voice', (req, res) => res.send('Post'));

  /*pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  })
  pythonProcess.stderr.on('error', (err) => {
    console.error('python err ', err);
  })
  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  pythonProcess.unref()*/
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('message', (text,speaker,chars,key) => {
    mR.requestVoice(text,speaker,chars,key)
    .then( res =>
      io.emit('response url', res, mR.sendText())
    )
  })
})

/*let runPy = new Promise(function (success, nosuccess) {
  
})*/


server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
