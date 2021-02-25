# EGG-CMS-RBAC 系统

# 演示地址

http://1280.jiyulin.com:8081

## 实现一个 RBAC 系统

首先要认识 egg 主要看下 目录结构和加载器

框架模块

- [x] 异步 async/await 开发；
- [x] 接入 ORM 组件 ——Sequelize (Mongoose、Sequelize、TypeORM)，封装数据库操作；
- [ ] 支持自由切换多种数据库，MySql/SqlServer/Sqlite/Oracle/Postgresql；
- [x] 实现项目启动，自动生成种子数据 ✨；
- [ ] 设计 4 种 AOP 切面编程，功能涵盖：日志、缓存、审计、事务 ✨；

组件模块：

- [ ] 提供 Redis 做缓存处理；
- [x] 使用 Swagger 做 api 文档；
- [ ] 使用 graphql 做 api 文档；(备选 Swagger)
- [x] 支持 CORS 跨域；
- [ ] 封装 JWT 自定义策略授权；

微服务模块：

- [ ] 可配合 Docker 实现容器化；

- [ ] 可配合 Jenkins 实现 CI / CD；

## Docker 实践

### 停止容器

```
docker stop apkeggcms
```

### 删除容器

```
docker rm apkeggcms
```

### 删除镜像

```
docker rmi apkeggcms/apkimg
```

没问题后，开始 build 了，还是在当前文件夹下（记得那个点）：
其中 v1 是 tag

```
docker build -t apkeggcms/apkimg .
```

### 生成容器

docker run --name=apkeggcms -d -e EGG_SERVER_ENV=prod -p 7001:7001 -v ~/test/logs:/root/logs/projectName/ apkeggcms/apkimg
docker run --name=apkeggcms -d -p 7001:7001 -v ~/test/logs:/root/logs/projectName/ apkeggcms/apkimg

```
docker run --name=apkeggcms -d -p 7001:7001 apkeggcms/apkimg
```

### 启动容器

排查问题

```
docker logs apkeggcms
```

采坑 docker 中需要改一下启动指令
https://github.com/eggjs/egg/issues/1431

但是端口没有改还是 7001，目前不知道在哪改

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
