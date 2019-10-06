# egg-docker-template
> Use docker to build nodejs/nginx/mongodb

[中文文档](https://github.com/Hansuku/egg-docker-template/blob/master/README.zh-CN.md)
## Project structure
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
## Quickly started
MacOS or Windows: download [Docker Desktop](https://www.docker.com/products/docker-desktop).
Linux: use `yum install`:
**Clear Old Docker**
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
**Installation dependence**
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
**Set yum srouce**(Optional)
```
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
**Refresh cache**
```
sudo yum makecache fast
```
**Install Docker-ce**
```
sudo yum -y install docker-ce
```
**Start Docker**
```
sudo systemctl start docker
```
**Test**
```
docker -v
```
you will see the version callback
```
git clone git@github.com:Hansuku/egg-docker-template.git
```
start app
```
docker-compose up -d
```
when it done, you need configuration `node` connect to `mongodb`, the template at `node/.env.example`, you can copy and rename it to `.env`, the file contains the host/username/password..., then enter the mongo's container, configuration admin account and a lot:
```
docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                                      NAMES
57281a1e4106        egg-docker-template_nodejs   "docker-entrypoint.s…"   3 hours ago         Up 3 hours          127.0.0.1:7001->7001/tcp                   egg-docker-template_nodejs_1
596247f36cbe        egg-docker-template_nginx    "/bin/sh -c nginx"       3 hours ago         Up 3 hours          0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   egg-docker-template_nginx_1
9bcac416cd63        egg-docker-template_mongo    "docker-entrypoint.s…"   3 hours ago         Up 3 hours          127.0.0.1:27017->27017/tcp                 egg-docker-template_mongo_1
```
we need mongodb's container name or id , and use `exec` to enter.
```
docker exec -it egg-docker-template_mongo_1 /bin/sh
// or use the shorname with docker-compose
docker-compose exec mongo /bin/sh
```
now you enter container's shell, just only enter `mongo` to open mongodb, and create account.
switch to admin database
```
use admin
```
create admin user
```
db.createUser(
{
    user: "admin",
    pwd: "admin",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```
create a database name 'test'
```
use test
```
create user for 'test', and give read and write permission
```
db.createUser(
{
    user: "test",
    pwd: "test",
    roles: [
        { role: "readWrite", db: "test" }
    ]
})
```
the database and account created above need to correspond to the `.env` file.

like that you can access the api:
```
http://127.0.0.1:7001/registered
```
the interface's method is`POST`, parameter is`phone`,`username`,`password`,like:
![postman](https://cdn.hansuku.com/WechatIMG940.png)
also, you can query relevant data in database.

DONE😆😆😆, you can modify and improve it on this template, make it the base of your project.
