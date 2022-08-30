const express = require('express');
const config = require('./package.json').config
const port = config.port || '3001'
const app = express();
const session = require('express-session')
const registerApi = require(`./middleware/registerApi.js`)
const { dbInit, tables } = require(`./utils/dbHelper`)


app.use(session({
  secret: 'fff',
  cookie: { maxAge: 30 * 1000 },
  saveUninitialized: false,
  rolling: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

dbInit()


  // const c = await tables.userAccountRecords.findAll()


registerApi(app, '/')

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