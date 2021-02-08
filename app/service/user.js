'use strict'

const Service = require('egg').Service

class UserService extends Service {
  // 新增
  async create(query) {
    try {
      // 建立事务对象
      let transaction = await this.ctx.model.transaction()

      // 事务增操作
      let user = await this.ctx.model.User.create(query, {
        transaction,
      })
      let roleIds = this.ctx.request.body['roleIds']
      let roleQuery = []
      for (let i = 0; i < roleIds.length; i++) {
        let obj = {}
        obj.roleId = roleIds[i]
        obj.userId = user.id
        roleQuery.push(obj)
      }

      // 事务批量增操作
      //   await this.ctx.model.UserRole.bulkCreate(roleQuery, {
      //     transaction,
      //   })
      // 提交事务
      await transaction.commit()
      return true
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        this.ctx.throw(500, '用户名已经被占用')
      } else {
        this.ctx.throw(500, '服务器错误')
      }
    }
  }
}

module.exports = UserService
