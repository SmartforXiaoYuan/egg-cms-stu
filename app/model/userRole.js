'use strict'

module.exports = (app) => {
  const { INTEGER } = app.Sequelize

  const UserRole = app.model.define(
    'user_role',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      userId: {
        allowNull: false,
        type: INTEGER,
        comment: '用户id',
      },
      roleId: {
        allowNull: false,
        type: INTEGER,
        comment: '角色id',
      },
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,
    }
  )

  return UserRole
}
