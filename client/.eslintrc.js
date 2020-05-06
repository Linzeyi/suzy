module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? 2 : 0, // 开发环境允许使用console，生产环境不允许
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0, // 开发环境允许使用debugger，生产环境不允许
    "semi": [0], // 关闭语句强制分号结尾
    "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-redeclare": 2, // 禁止重复声明变量
    "no-unreachable": 2, // 不能有无法执行的代码
    "no-unused-vars": [0, { // 声明未使用的变量会提示warning
      "vars": "all",
      "args": "after-used"
    }],
    "array-bracket-spacing": [2, "never"], // 是否允许非空数组里面有多余的空格
    "arrow-parens": 0,// 箭头函数用小括号括起来
    "arrow-spacing": 0,// =>的前、后括号
  }
};