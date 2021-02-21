'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class DepartmentService extends Service {
  // 查询, 传页码，分页返回，否则全部返回
  async findList(query, order = [['createdAt', 'DESC']]) {
    let obj = {
      where: {},
      order
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
          [Op.like]: '%' + query[key] + '%'
        }
      }
    }
    return await this.ctx.model.Department.findAndCountAll(obj);
  }

  // 查询某条数据
  async findByPk(id) {
    return await this.ctx.model.Department.findByPk(id);
  }

  // 新增
  async create(query) {
    return await this.ctx.model.Department.create(query);
  }

  // 修改
  async update(query, where) {
    return await this.ctx.model.Department.update(query, {
      where
    });
  }

  // 刪除id
  async destroy(deptId) {
    try {
      // 建立事务对象
      let transaction = await this.ctx.model.transaction();

      // 事务增操作
      let depts = await this.ctx.model.Department.findAll({
        where: {
          parentId: deptId
        },
        transaction
      });
      if (depts.length) {
        throw Error('含有子元素，不能删除')
      }

      // 判断该部门是否有用户
      let users = await this.ctx.model['Users'].findAll({
        where: {
          deptId
        },
        transaction
      });

      if (users.length) {
        throw Error('该部门还有用户，不能删除')
      }

      // 刪除数据
      await this.ctx.model.Department.destroy({
        where: {
          deptId
        }
      })
      // 提交事务
      await transaction.commit();
      return true
    } catch (error) {
      this.ctx.throw(500, error)
    }
  }
}

module.exports = DepartmentService;
