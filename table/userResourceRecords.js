const {STRING, INTEGER, Model, DATE } = require('sequelize')

module.exports = sequelize => {
  class userResourceRecords extends Model { }
  userResourceRecords.init(
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: STRING(45),
      uid: STRING(45),
      fileName: STRING(200),
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      modelName: 'userResourceRecords',
      timestamps: true,
      freezeTableName: true,
      tableName: 'uesr_resource_records',
      sequelize,
    }
  )
  return userResourceRecords
}
