const { getUid } = require('../../utils/accountInfo')
const { tables } = require('../../utils/dbHelper')

module.exports = {
  needLogin: true,
  async process(req, res) {
    // const userRes = await tables.userAccountRecords.findAll({
      // where: {
      //   uid: 'M32145',
      // },
    // })

    const userRes = await tables.userAccountRecords.findOne({
      where: {
        uid: 'M32145',
      },
    })

    res.send({
      userRes
    })
  }
}