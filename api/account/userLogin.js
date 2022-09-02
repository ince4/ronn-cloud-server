const { getUid } = require('../../utils/accountInfo')
const { tables } = require('../../utils/dbHelper')

module.exports = {
  async process(req, res) {
    const { accountName, password } = req.body

    const userRes = await tables.userAccountRecords.findOne({
      where: {
        accountName,
        password
      },
    })

    if (userRes) {
      req.session.isLogin = true
      res.send({
        isLogin: req.session.isLogin,
        statusCode: 1,
        statusMsg: '登录成功',
      })
    } else {
      res.send({
        statusCode: 1,
        statusMsg: '登录失败'
      })
    }
  }
}