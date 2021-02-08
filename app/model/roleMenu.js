'use strict'

module.exports = (app) => {
  const { INTEGER } = app.Sequelize

  const RoleMenu = app.model.define(
    'role_menu',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      roleId: {
        allowNull: false,
        type: INTEGER,
        comment: '角色roleId',
      },
      menuId: {
        allowNull: false,
        type: INTEGER,
        comment: '菜单menuId',
      },
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,
    }
  )

  return RoleMenu
}
