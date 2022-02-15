<!--
 * @Description:
 * @FilePath: \DTSMv3\README.md
 * @Date: 2022-02-09 11:38:16
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-15 15:35:41
 * @author: Lin_kangjing
-->

<h1 align="center">DTSM</h1>

点易公司的开发的运维系统，使用基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 实现的 [Ant Design Pro](https://pro.antdv.com/) 作为框架，进一步封装. [原文档](https://pro.antdv.com/docs/getting-started)


## 目录结构
  > `src`
  >> `api`（统一个模块的api注册）
  >> `assets`（资源文件夹）
  >>> `svgIcon`（自动注册成svg图标）

  >> `components`（公用组件）
  >> `config`（配置文件夹）
  >>> `defaultSettings.js`（项目默认主题，布局等默认设置）
  >>>`router.config.js`（路由信息表）

  >>`core`（核心代码）
  >>>`directives` （vue指令）
  >>>`permission` （权限验证)
  >>>`bootstrap.js` （引导程序，初始设置）

  >>`http`（ajax 请求封装）
  >>`layouts`（布局组件模板）
  >>`locales`（国际化）
  >>`mixins`（vue 的mixins）
  >>`mock`（模拟请求）
  >>`router`（vue-router）
  >>`store`（vuex）
  >>`style`（样式文件）
  >>>`utils.less`（ 使用方式@import "~@/style/utils.less" ，.clearfix()，参看less文档）

  >>`bus.js`（ evenbus在vue的兄弟组件中传递事件）
  >>>`domUtil.js`（ 设置页面标题）
  >>>`errorLog`（ 前端错误日志）
  >>>`filter`（ vue filter）
  >>>`util.js`（ 工具方法）

  >>`views`（页面组件）
  >>>`test`（业务模块）

  >`App.vue`（项目页面入库）
  >`main.js`（项目入口）
  >`permission.js`（vue-router 路由控制）

  - `.env.development` 开发环境变量配置
  - `.env.production` 生成环境变量配置


## 建议代码规范

1. [vue官网风格指南](https://cn.vuejs.org/v2/style-guide/)
2. 建议对超过400行代码的组件拆分 
3. 组件 `data` 中的数据 建议对较长的参数，不能一眼看明白具体寓意的可以单独注释
4. 方法建议用 `koroFileHeader` 插件生成注释，注释模板可修改
5. `CSS` 减少选择器层级， 属性编写顺序（一般遵循显示属性 -> 自身属性 -> 文本属性 -> 其他属性的书写格式）
6. `svg`图标建议使用 ，[字节跳动图标库](https://iconpark.oceanengine.com/home)，统一风格
7. 使用 `===` 全等
8. 不要在编写这样的代码 `const self = this`; ，而是应该直接使用变量 `this`, 可用让开发者清楚的知道任何一个被使用的地方，它代表的是组件实例
9. 组件使用 `name` 属性。借助于 `vue devtools` 可以让你更方便的测试
10. 组件事件以连字符命名，事件命名应该以动词或者形容词结尾如 `upload-success, upload-error`
11. 谨慎使用 `this.$refs`，当需要操作 DOM 无法通过指令来做的时候可使用`this.$refs`，而不是 `document.getElement*` , `document.queryElement`
12. 复杂组件提供`.md`文件说明
13. 优先使用 `const` `let`



## 环境和依赖

- node
- yarn
- webpack
- eslint
- @vue/cli
- [ant-design-vue@1.x](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation) - antv/g2 封装实现

> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。


## 其他说明


- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请确保你所使用的 vue-cli 是新版，并且已经学习 cli 官方文档使用教程

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码, `vue.config.js` 下的 `lintOnSave` 值改为 `false`

- 组件按需加载 `/src/main.js` L14 相关代码 `import './core/lazy_use'` / `import './core/use'`

- [修改 Ant Design 配色 (@kokoroli)](https://github.com/kokoroli/antd-awesome/blob/master/docs/Ant_Design_%E6%A0%B7%E5%BC%8F%E8%A6%86%E7%9B%96.md)

- I18n: [多语言支持 (@musnow)](./src/locales/index.js)

- 生产环境默认不加载 `mock`，更多详情请看 `src/mock/index.js`

- **用于生产环境，请使用 `release` 版本代码，使用 master 代码出现的任何问题需要你自行解决**

## 浏览器兼容

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |
