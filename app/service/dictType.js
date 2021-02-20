'use strict'

const Service = require('egg').Service
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DictTypeService extends Service {
  // 查询, 传页码，分页返回，否则全部返回
  async findList(query, order = [['createdAt', 'DESC']]) {
    let obj = {
      where: {},
      order,
    }
    if (query.offset) {
      query.limit = query.limit ? query.limit : 10
      query.offset = (query.offset - 1) * query.limit
      obj.limit = query.limit
      obj.offset = query.offset
    } else {
      query.limit = null
      query.offset = null
    }
    for (let key in query) {
      if (key !== 'limit' && key !== 'offset') {
        if (!query[key]) {
          query[key] = ''
        }
        obj.where[key] = {
          [Op.like]: '%' + query[key] + '%',
        }
      }
    }
    return await this.ctx.model.DictType.findAndCountAll(obj)
  }

  // 查询某条数据
  async findByPk(id) {
    return await this.ctx.model.DictType.findByPk(id)
  }

  // 新增
  async create(query) {
    return await this.ctx.model.DictType.create(query)
  }

  // 修改
  async update(query, where) {
    return await this.ctx.model.DictType.update(query, {
      where,
    })
  }

  // 删除
  async destroy(ids) {
    return await this.ctx.model.DictType.destroy({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    })
  }
  // 删除
  async destroy(ids) {
    try {
      // 建立事务对象
      let transaction = await this.ctx.model.transaction()

      let dictType = await this.ctx.model.DictType.findAll({
        where: {
          id: {
            [Op.or]: ids,
          },
        },
        transaction,
      })
      let dictTypeLists = dictType.map((item) => item.dictType)

      await this.ctx.model.DictData.destroy({
        where: {
          dictType: {
            [Op.or]: dictTypeLists,
          },
        },
        transaction,
      })
      await this.ctx.model.DictType.destroy({
        where: {
          id: {
            [Op.or]: ids,
          },
        },
        transaction,
      })
      // 提交事务
      await transaction.commit()
      return true
    } catch (error) {
      this.ctx.throw(500, '服务器错误')
    }
  }
}
module.exports = DictTypeService
