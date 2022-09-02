const {STRING, INTEGER, Model, DATE } = require('sequelize')

module.exports = sequelize => {
  class userResourceFolderRecords extends Model { }
  userResourceFolderRecords.init(
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      resourceId: INTEGER,
      uid: STRING(45),
      folderName: STRING(200),
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      modelName: 'userResourceFolderRecords',
      timestamps: true,
      freezeTableName: true,
      tableName: 'user_resource_folder_records',
      sequelize,
    }
  )
  return userResourceFolderRecords
}
