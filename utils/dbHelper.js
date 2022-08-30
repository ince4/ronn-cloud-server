
const { Sequelize, DataTypes, Op } = require('sequelize')
// const config = require('../package.json').config
// const port = config.port || '3001'
const path = require('path')
const find = require('find')

const tables = {}
function dbInit() {
  const basePath = path.resolve('table')
  const sequelize = new Sequelize('ronn_cloud_server', 'root', 'Xa110K1065', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  })

  const files = find.fileSync(/\.js$/, basePath)
  const fileCache = {}
  files.forEach(async (file) => {
    const fileName = path.basename(file, '.js')

    if (fileCache[fileName]) {
      console.error('文件名重复')
      return
    }
    fileCache[fileName] = true

    tables[fileName] = require(file)(sequelize)
  })
}

module.exports = {
  dbInit,
  tables
}
