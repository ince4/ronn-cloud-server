const path = require('path')
const find = require('find')
const basePath = path.resolve('api')
const _ = require('lodash')
const Parameter = require('parameter')
const { isLogin } = require('../utils/accountInfo')
const parameter = new Parameter({ convert: true })


module.exports = async function registerApi(app, vd) {

  function registerHandler(route, config) {
    const callBack = (req, res) => {

      req.session.isLogin = true
      //  todo
      if (config.needLogin && !isLogin(req)) {
        return res.send({ statusCode: 0, message: '需登录后调用' })

      }

      if (config.validateRule) {
        const paramError = parameter.validate(config.validateRule, req.body)
        if (paramError) {
          return res.send({ statusCode: -1, message: '参数有误', error: paramError })
        }
      }

      config.process(req, res)
    }

    app.post(`/api/${route}`, callBack)
  }

  const files = find.fileSync(/\.js$/, basePath)
  const fileCache = {}
  files.forEach(async (file) => {
    const route = path.basename(file, '.js')
    if (route[0] === '_') {
      return
    }
    if (fileCache[route]) {
      console.error('文件名重复')
      return
    }
    fileCache[route] = true

    const apiConfig = await require(file)

    registerHandler(route, apiConfig)
  })

  // app.use(vd, router)
}
