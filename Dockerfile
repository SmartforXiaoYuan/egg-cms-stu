#Dockerfile

# node镜像
FROM node:12-alpine  


# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 这个是容器中的文件目录
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /usr/src/app/package.json

# 拷贝所有源代码到工作目
COPY . /usr/src/app



# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --production --registry=https://registry.npm.taobao.org

# 暴露容器端口
EXPOSE 3000

CMD npm run start



#启动命令
# docker run -d -e EGG_SERVER_ENV=test -p 3000:3000 -v ~/test/logs:/root/logs/projectName/  imageName
# docker run -d -e EGG_SERVER_ENV=test -p 3000:3000 -v ~/test/logs:/root/logs/projectName/ egg-cms-stu
# /root/logs/projectName/ 是egg默认的日志目录
# EGG_SERVER_ENV是egg的环境变量，便于区分环境