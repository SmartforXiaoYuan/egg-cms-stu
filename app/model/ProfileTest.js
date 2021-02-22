'use strict'

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const UserTest = app.model.define(
    'usertest',
    {
      username: STRING,
      points: INTEGER,
    },
    { timestamps: false }
  )
  const ProfileTest = app.model.define(
    'profiletest',
    {
      name: STRING,
    },
    { timestamps: false }
  )

  UserTest.belongsToMany(ProfileTest, { through: 'User_Profiles' })
  ProfileTest.belongsToMany(UserTest, { through: 'User_Profiles' })
}
