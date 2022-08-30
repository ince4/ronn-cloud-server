const {STRING, INTEGER, Model } = require('sequelize')

module.exports = sequelize => {
  class userAccountRecords extends Model { }
  userAccountRecords.init(
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      uid: STRING(45),
      password: STRING(45),
      accountName: STRING(45),
    },
    {
      modelName: 'userAccountRecords',
      timestamps: false,
      freezeTableName: true,
      tableName: 'user_account_records',
      sequelize,
    }
  )
  return userAccountRecords
}
