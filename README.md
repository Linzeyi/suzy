# Suzy 一个秃头程序员的个人主页设计

## 一、项目结构介绍
```
├── client                     客户端平台
│   ├── public                 静态资源文件夹（不会被编译）
│   ├── src                    代码开发目录
│   │   ├── assets             资源文件夹（会被编译）
│   │   ├── components         组件文件夹
│   │   │   ├── common         通用组件
│   │   │   └── modules        模块组件
│   │   ├── pages              页面文件夹
│   │   ├── plugins            插件文件夹
│   │   ├── router             路由文件夹
│   │   ├── store              全局状态机
│   │   ├── utils              工具类
│   │   ├── views              容器文件夹
│   │   ├── App.vue            根组件
│   │   ├── components.js      全局组件注册脚本
│   │   ├── main.js            入口文件
│   │   ├── style.js           全局样式引用脚本
│   │   └── util.js            全局工具类注册脚本
│   ├── eslintrc.js            eslint 配置文件
│   ├── .gitignore             git 过滤规则
│   ├── babel.config.js        vue-cli4.0 配置文件
│   ├── package.json           项目依赖包配置文件
│   ├── README.md              自述文件
│   └── vue.config.js          vue-cli4.0 配置文件
├── server                     服务端平台
└── README.md                  自述文件
```


