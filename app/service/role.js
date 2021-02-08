'use strict'

const BaseService = require('./base')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class Service extends BaseService {
  constructor(...arg) {
    super(...arg)
    this.modelName = 'Role'
    console.log('RoleService')
  }

  // 查询某条数据
  async findOne(id) {
    console.log('查询某条数据')
    console.log(this.modelName)
    return await this.ctx.model[this.modelName].findOne({
      where: {
        id,
      },
      //   include: [
      //     {
      //       model: this.ctx.model['Menu'],
      //       as: 'menu',
      //     },
      //   ],
    })
  }
}

module.exports = Service
