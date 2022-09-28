
const { tables } = require('../../utils/dbHelper')

module.exports = {
  needLogin: true,
  validateRule: {
    folderIdList: 'array?',
    operation: 'number',// 0 删除 1新增 2更新
    folderName: 'string?',
  },
  async process(req, res) {
    const { folderIdList, folderName = '', operation } = req.body

    const { userResourceTagRecords, userResourceRecords } = tables

    if (operation === 0) {
      await userResourceTagRecords.destroyed({
        where: {
          id: folderIdList
        }
      })
    } else if (operation === 1) {
      const resource = await userResourceRecords.fineOne({
        id: folderIdList[0].resourceId,
      })
      await userResourceTagRecords.create({
        resourceId: resource.resourceId,
        folderName,
      })
    } else if (operation === 2) {
      const resource = await userResourceRecords.fineOne({
        id: folderIdList[0].resourceId,
      })

      resource.update({
        folderName
      })
    }
    res.send({
      statusCode: 1,
      statusMsg: '操作成功',
    })
  }
}