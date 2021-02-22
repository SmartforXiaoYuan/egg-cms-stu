/**
 * 用户模型
 */
var Sequelize = require('sequelize')
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const User = app.model.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      deptId: {
        allowNull: false,
        type: INTEGER,
        comment: '部门deptId',
      },
      userName: {
        allowNull: false,
        unique: true,
        type: STRING,
        comment: '用户名',
      },
      nickName: {
        type: STRING,
        defaultValue: null,
        comment: '昵称',
      },
      sex: {
        type: STRING,
        defaultValue: '1',
        comment: '性别（0代表女 1代表男）',
      },
      password: {
        allowNull: false,
        type: STRING,
        comment: '密码',
      },
      avatar: {
        allowNull: true,
        type: STRING,
        defaultValue: null,
        comment: '头像',
      },
      email: {
        allowNull: true,
        type: STRING,
        comment: '邮箱',
      },
      mobile: {
        allowNull: true,
        type: STRING,
        comment: '手机号',
      },
      isDelete: {
        type: STRING,
        defaultValue: '0',
        comment: '删除标志（0代表存在 1代表删除）',
      },
      status: {
        type: STRING,
        defaultValue: '1',
        comment: '帐号状态（1正常 0停用）',
      },
      remark: {
        type: STRING,
        comment: '备注',
      },
      createdAt: {
        allowNull: true,
        type: DATE,
        comment: '创建时间',
      },
      createdBy: {
        allowNull: true,
        type: STRING,
        comment: '创建者',
      },
      updatedAt: {
        allowNull: true,
        type: DATE,
        comment: '更新时间',
      },
      updatedBy: {
        allowNull: true,
        type: STRING,
        comment: '更新者',
      },
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,
    }
  )
  // User.associate = function () {
  //   User.belongsTo(app.model.Department, {
  //     foreignKey: 'deptId',
  //   })
  //   User.belongsToMany(app.model.Role, {
  //     through: 'user_role',
  //     foreignKey: 'userId',
  //     as: 'role',
  //   })
  // }
  return User
}
