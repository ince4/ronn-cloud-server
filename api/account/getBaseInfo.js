const { getUid } = require('../../utils/accountInfo')
const { tables } = require('../../utils/dbHelper')

module.exports = {
  async process(req, res) {
    res.send({
      isLogin: req.session.isLogin,
      statusCode: 1,
      statusMsg: '请求成功',
    })
  }
}