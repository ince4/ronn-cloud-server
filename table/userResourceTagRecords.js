const {STRING, INTEGER, Model, DATE } = require('sequelize')

module.exports = sequelize => {
  class userResourceTagRecords extends Model { }
  userResourceTagRecords.init(
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      resourceId: INTEGER,
      uid: STRING(45),
      tag: STRING(45),
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      modelName: 'userResourceTagRecords',
      timestamps: true,
      freezeTableName: true,
      tableName: 'user_resource_tag_records',
      sequelize,
    }
  )
  return userResourceTagRecords
}
