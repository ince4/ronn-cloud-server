const express = require('express');
const config = require('./package.json').config
const port = config.port || '3001'
const app = express();
const session = require('express-session')
const registerApi = require(`./middleware/registerApi.js`)
const { dbInit, tables } = require(`./utils/dbHelper`)
const fs = require('fs')

app.use(session({
  secret: 'tr007443',
  cookie: { maxAge: 30000 * 1000 },
  saveUninitialized: true,
  resave: false,
  rolling: true
}));


// app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/resource'))
app.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.set({
      'Access-Control-Allow-Credentials': true, //允许后端发送cookie
      'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
      // 'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

dbInit()

registerApi(app, '/')
app.get(/resource/, (req, res) => {
  fs.read
})
// app.post('/api/f', (req, res) => {
//   if (req.body.username !== 'admin' || req.body.password !== '000000') {
//     return res.send({ status: 1, msg: '登录失败' })
//   }

//   req.session.user = req.body
//   req.session.isLogin = true

//   res.send({ status: 0, msg: '登录成功' })
// })

app.listen(port, () => {
  console.log(`start at port ${port}`)
});