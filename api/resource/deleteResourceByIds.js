const fs = require('fs')
const path = require('path')
const { tables } = require('../../utils/dbHelper')

module.exports = {
  needLogin: true,
  validateRule: {
    fileList: 'array'
  },
  async process(req, res) {
    const { fileList } = req.body

    try {
      fileList.forEach(async (item) => {
        await fs.unlinkSync(path.join(__dirname + '../../../resource', item.id + item.fileName), function (error) {
          if (error) {
            console.log(error);

            return false;

          }
          console.log('删除文件成功');
        })
      })

      const { userResourceRecords, userResourceFolderRecords, userResourceTagRecords } = tables
      const { idList } = req.body

      await userResourceRecords.destroyed({
        where: {
          id: idList
        }
      })

      await userResourceFolderRecords.destroyed({
        where: {
          resourceId: idList
        }
      })

      await userResourceTagRecords.destroyed({
        where: {
          resourceId: idList
        }
      })

      res.send({
        statusCode: 1,
        statusMsg: '删除成功',
      })
    } catch (err) {
      res.send({
        statusCode: -1,
        statusMsg: '删除失败',
      })
    }
  }
}