
const { tables } = require('../../utils/dbHelper')

module.exports = {
  needLogin: true,
  validateRule: {
    tagIdList: 'array?',
    operation: 'number',// 0 删除 1新增 2更新
    tagName: 'string?',
  },
  async process(req, res) {
    const { tagIdList, tagName = '', operation } = req.body

    const { userResourceTagRecords, userResourceRecords } = tables

    if (operation === 0) {
      await userResourceTagRecords.destroyed({
        where: {
          id: tagIdList
        }
      })
    } else if (operation === 1) {
      const resource = await userResourceRecords.fineOne({
        id: tagIdList[0].resourceId,
      })
      await userResourceTagRecords.create({
        resourceId: resource.resourceId,
        tag: tagName
      })
    } else if (operation === 2) {
      const resource = await userResourceRecords.fineOne({
        id: tagIdList[0].resourceId,
      })

      resource.update({
        tag: tagName
      })
    }
    res.send({
      statusCode: 1,
      statusMsg: '操作成功',
    })
  }
}