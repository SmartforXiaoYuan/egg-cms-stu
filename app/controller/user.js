const Controller = require('egg').Controller
/**
 * @Controller user
 */
class UserController extends Controller {
  // 查询
  async index() {
    const { ctx, service } = this
    console.log('查询参数')
    // 查询参数
    const query = {
      limit: ctx.helper.parseInt(ctx.query.pageSize),
      offset: ctx.helper.parseInt(ctx.query.pageNum),
      userName: ctx.query.userName ? ctx.query.userName : '',
      status: ctx.query.status ? ctx.query.status : '',
      deptId: parseInt(ctx.query.deptId),
    }
    const result = await service.user.findList(query)
    ctx.returnBody(result, 100010)
  }

  // 查询单个
  async show() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(ctx.params, 'base.show')
    if (!validateResult) return
    let id = ctx.helper.parseInt(this.ctx.params.id)
    // console.log('查询单个')
    // console.log(this.ctx.params)
    const result = await service.user.findOne(id)
    ctx.returnBody(result, 100010)
  }

  // 查询用户信息
  async getInfo() {
    const { ctx, service } = this
    console.log(ctx.state.permissions)
    ctx.returnBody(
      {
        permissions: ctx.state.permissions,
        user: ctx.state.user,
      },
      100010
    )
  }

  //swagger dome
  async ctreat2() {
    /**
     * @summary 新增用户
     * @router post /user
     * @request body config value 传入参数
     */
    //上面的注释一定要，post请求，json对象为config，post请求必须创建app/contract/type.js 文件
    const { ctx } = this
    // 从前端获取post请求发来的数据
    const param = ctx.request.body
    const result = await ctx.model.User.create({
      nickName: param.nickName,
      password: param.password,
      phoneNum: param.phoneNum,
      email: param.email,
      dataFlag: 1,
    })
    console.log('add方法', result)
    if (result) {
      ctx.body = '创建成功'
    } else {
      ctx.body = '创建失败'
    }
  }

  // 新增
  async create() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(
      ctx.request.body,
      'user.create'
    )
    if (!validateResult) return
    ctx.request.body['password'] = await ctx.genHash(
      ctx.request.body['password']
    )
    let query = {
      userName: ctx.request.body['userName'],
      password: ctx.request.body['password'],
      deptId: ctx.request.body['deptId'],
      nickName: ctx.request.body['nickName'],
      sex: ctx.request.body['sex'],
      avater: ctx.request.body['avater'],
      email: ctx.request.body['email'],
      mobile: ctx.request.body['mobile'],
      remark: ctx.request.body['remark'],
      createdAt: new Date(),
      createdBy: ctx.state.user.userName,
    }
    const result = await service.user.create(query)
    if (result) {
      ctx.returnBody(null, 100020)
    } else {
      ctx.returnBody(null, 100021, 500)
    }
  }

  async list() {
    const { ctx, app } = this
    const param = ctx.request.body
    console.log(param.pageSize, param.pageIndex)
    let result = await ctx.model.User.findAll({
      limit: param.pageSize,
      offset: param.pageIndex - 1,
      order: [['id', 'desc']],
    })
    ctx.returnBody(result, 100010)

    //指定返回的字段
    //ctx.body = await ctx.model.User.findAll({attributes: ['id', 'name'],limit: 10,order:[["id","desc"]]});
  }

  // 修改
  async update() {
    const { ctx, service } = this
    let validate = Object.assign({}, ctx.request.body, ctx.params)
    let validateResult = await ctx.checkValidate(validate, 'user.update')
    if (!validateResult) return

    let query = {
      deptId: ctx.request.body['deptId'],
      nickName: ctx.request.body['nickName'],
      sex: ctx.request.body['sex'],
      avater: ctx.request.body['avater'],
      email: ctx.request.body['email'],
      mobile: ctx.request.body['mobile'],
      status: ctx.request.body['status'],
      remark: ctx.request.body['remark'],
      updatedAt: new Date(),
      updatedBy: ctx.state.user.userName,
    }
    let id = ctx.helper.parseInt(ctx.params.id)
    const result = await service.user.update(query, id)
    if (result) {
      ctx.returnBody(null, 100030)
    } else {
      ctx.returnBody(null, 100031, 500)
    }
  }

  // 删除
  async destroy() {
    const { ctx, service } = this
    let validateResult = await ctx.checkValidate(ctx.params, 'base.destroy')
    if (!validateResult) return
    const ids = ctx.params.id.split(',')
    const result = await service.user.destroy(ids)

    if (result) {
      ctx.returnBody(null, 100040)
    } else {
      ctx.returnBody(null, 100041, 500)
    }
  }
}

module.exports = UserController
