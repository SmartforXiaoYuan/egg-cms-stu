/**
 * 用户模型
 */
var Sequelize = require('sequelize')
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize
  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: {
        allowNull: false,
        unique: true,
        type: STRING(50),
        comment: '用户名',
      },
      nickName: {
        type: STRING(50),
        allowNull: false,
        comment: '昵称',
      },
      password: {
        type: STRING(200),
        allowNull: false,
        comment: '密码',
      },
      phoneNum: {
        type: STRING(50),
        allowNull: false,
        comment: '手机号',
      },
      email: {
        type: STRING(50),
        allowNull: false,
        comment: '邮箱',
      },
      isDelete: {
        type: STRING,
        defaultValue: '0',
        comment: '删除标志（0代表存在 1代表删除）',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: '创建时间',
      },
      createdBy: {
        allowNull: true,
        type: STRING(50),
        comment: '创建者',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: '更新时间',
      },
      updatedBy: {
        allowNull: true,
        type: STRING(50),
        comment: '更新者',
      },
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,
    }
  )

  return User
}
