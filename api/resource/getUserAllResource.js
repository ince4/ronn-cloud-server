const { tables } = require('../../utils/dbHelper')

module.exports = {
  needLogin: true,
  async process(req, res) {
    const { sequelize } = tables

    try {
      const result = await sequelize.query(
        `select files.fileName, tag.tag, files.id, folder.folderName, files.type, files.createdAt, folder.updatedAt as updatedAt1, tag.updatedAt as updatedAt2 from
      uesr_resource_records as files,
      user_resource_folder_records as folder,
      user_resource_tag_records as tag
      where files.id = folder.resourceId`)

      const resource = result[0]
      const resourceMap = {}
      for (let item of resource) {
        if (!resourceMap[item.id]) {
          const {
            id, type, createdAt, updatedAt1, updatedAt2
          } = item
          resourceMap[item.id] = { id, type, createdAt }
          resourceMap[item.id].tagList = []
          resourceMap[item.id].folderList = []
        }

        if (item.folderName && resourceMap[item.id].folderList.indexOf(item.folderName) === -1) {
          resourceMap[item.id].folderList.push(item.folderName)
        }

        if (item.tag && resourceMap[item.id].tagList.indexOf(item.tag) === -1) {
          resourceMap[item.id].tagList.push(item.tag)
        }
      }

      res.send({
        resourceList: resourceMap,
        statusCode: 1,
        statusMsg: '请求成功',
      })
    } catch (err) {
      res.send({
        statusCode: -1,
        statusMsg: '请求失败',
        errMsg: err.message
      })
    }
  }
}