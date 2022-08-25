const express = require('express');
const config = require('./package.json').config
const app = express();

const port = config.port || '3001'
app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(port, () => {
  console.log(`start at port ${port}`)
});