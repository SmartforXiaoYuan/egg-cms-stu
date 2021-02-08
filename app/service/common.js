'use strict'

const Service = require('egg').Service

class CommonService extends Service {
  async login(query) {
    const { ctx } = this
    // 在当前数据库中验证此用户思否存在

    // const result = await ctx.model.User.findAll()

    const result = await ctx.model.User.findOne({
      where: {
        userName: query.userName,
        isDelete: 0,
      },
    })
    console.log(result)
    console.log(result.get('password'))
    return result
  }
}

module.exports = CommonService
