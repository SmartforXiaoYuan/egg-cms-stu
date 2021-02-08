'use strict'

/** @type Egg.EggPlugin */
//  在config/plugin.js的module.exports里面添加
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  // 验证
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  // 加密
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  // 跨域问题
  cors: {
    enable: true,
    package: 'egg-cors',
  },
}
