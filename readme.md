# 将 excel 一列或多列数据粘贴到 el-table 指定位置的 vue2 指令
-------
## usage

+ 1.安装
```shell
npm i excel-paste-to-el-table
```
```js
import Vue from 'vue'
import { excelPasteToElTable } from 'excelPasteToElTable'
/Vue.use(excelPasteToElTable) // 注册全局指令

new Vue({
  el: '#app',
  directive: { paste: excelPasteToElTable } //局部指令
})

```
+ 2.使用
```html
<tempalte>
  <el-table v-paste row-key="id"></el-table>
</tempalte>
```

### tip

> el-table的row-key必填，且必须使用string，不支持function
