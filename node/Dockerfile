FROM node:10.16.3-alpine

## 拷贝项目文件进行构建
WORKDIR /app/
COPY ./package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

COPY ./* /app/
CMD ["npm","run","dev"]

EXPOSE 7001
