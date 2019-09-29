# egg-docker-template
> 使用 docker 去一站式构建 nodejs、nginx、mongodb

## 项目结构
```
.
├── README.md
├── docker-compose.yml
├── logs
├── mongo
│   ├── Dockerfile
│   └── mongo.conf
├── nginx
│   ├── Dockerfile
│   ├── cert
│   ├── conf.d
│   └── nginx.conf
└── node
    ├── Dockerfile
    ├── README.md
    ├── README.zh-CN.md
    ├── app
    │   ├── controller
    │   ├── database
    │   │   ├── init.js
    │   │   └── schemas
    │   ├── extend
    │   ├── middleware
    │   ├── public
    │   └── router.js
    ├── app.js
    ├── appveyor.yml
    ├── config
    ├── config.js
    ├── jsconfig.json
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── test
    └── typings
```
## 快速上手
如果是你 MacOS 或 Windows ，直接下载[Docker Desktop](https://www.docker.com/products/docker-desktop)，下载很慢的话，可以去 [DaoCloud](http://get.daocloud.io/)。
如果是 linux 的话，需要以下几个步骤，如果你的服务器没有`yum`的话，需要先去安装 `yum`，安装`yum`篇幅不小就不在这边展开。
**以防万一，清理 Docker**
```
sudo yum remove docker \
				docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-selinux \
                docker-engine-selinux \
                docker-engine
```
**安装依赖**
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
**设置 yum 源**(可以任意其他的，我这里用的阿里)
```
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
**更新缓存**
```
sudo yum makecache fast
```
**安装 Docker-ce**
```
sudo yum -y install docker-ce
```
**启动 Docker**
```
sudo systemctl start docker
```
**测试命令**
```
docker -v
```
当你看到 docker 输出版本后即可，然后开始安装这个模板
```
git@github.com:Hansuku/egg-docker-template.git
```
启动
```
docker-compose up -d
```
启动完成后，需要配置`node`与`mongodb`的链接，我已经在`node/.env.example`中写好了样例，你可以直接把这个文件改成`.env`，里面存有数据库地址、数据库名称、账号密码等等。
然后进入`mongodb`的容器，配置管理员账号以及数据库账号：
```
docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                                      NAMES
57281a1e4106        egg-docker-template_nodejs   "docker-entrypoint.s…"   3 hours ago         Up 3 hours          127.0.0.1:7001->7001/tcp                   egg-docker-template_nodejs_1
596247f36cbe        egg-docker-template_nginx    "/bin/sh -c nginx"       3 hours ago         Up 3 hours          0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   egg-docker-template_nginx_1
9bcac416cd63        egg-docker-template_mongo    "docker-entrypoint.s…"   3 hours ago         Up 3 hours          127.0.0.1:27017->27017/tcp                 egg-docker-template_mongo_1
```
我们先查询到 `mongodb` 所在的容器名字或 ID，然后进入它：
```
docker exec -it egg-docker-template_mongo_1 /bin/sh
// 或者使用 docker-compose 定义的短名进入
docker-compose exec mongo /bin/sh
```
现在你进入了容器的 shell，只需要在命令行输入`mongo`打开 mongodb，然后创建账号
切换到管理员库
```
use admin
```
创建账号
```
db.createUser(
{
    user: "admin",
    pwd: "admin",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
}
```
创建一个 test 库
```
use test
```
创建 test 库用户，赋予读写权限
```
db.createUser(
{
    user: "test",
    pwd: "test",
    roles: [
        { role: "readWrite", db: "test" }
    ]
}
```
上面创建的数据库和账密需要与`.env`文件里对应

然后你就可以访问接口了
```
http://127.0.0.1:7001/registered
```
这个接口是`POST`，需要附带上`phone`,`username`,`password`参数
![postman](https://cdn.hansuku.com/WechatIMG940.png)
然后你可以在数据库中查询到相关数据。

DONE😆😆😆，你已经创建了一个模板，可以在此之上去修改、完善成你的项目基底。