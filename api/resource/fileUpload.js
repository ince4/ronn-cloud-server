const { tables } = require('../../utils/dbHelper')
const multiparty = require('multiparty');
const path = require('path')
const fs = require('fs')

module.exports = {
  needLogin: true,
  async process(req, res) {
    const { userResourceRecords, userResourceFolderRecords, userResourceTagRecords } = tables
    try {
      const form = new multiparty.Form();
      form.on('part', async function (part) {
        if (part.filename) {

          const createRes = await userResourceRecords.create({
            type: part.headers['content-type'],
            fileName: part.filename,
          })

          const writeStrem = fs.createWriteStream(path.join(__dirname, '../../resource',  createRes.id + part.filename))
          part.pipe(writeStrem)

          // if (part.name) {
            await userResourceFolderRecords.create({
              resourceId: createRes.id,
              folderName: part.name,
            })

            await userResourceTagRecords.create({
              resourceId: createRes.id,
            })

          // }
          createRes.id
        }
        part.on('error', function (err) {
          fileStrem.destroy();
          throw new Error(err)
        });
      });

      // form.on('close', function() {
      //   console.log('????')
      //   res.send({
      //     statusCode: 12,
      //     statusMsg: '123213'
      //   })
      // });

      form.parse(req)
    } catch (err) {
      res.send({
        statusCode: -1,
        statusMsg: '上传失败',
        errMsg: err.message
      })
    }

    res.send({
      statusCode: 1,
      statusMsg: '上传成功'
    })
  }
}