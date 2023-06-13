# excel-paste-to-el-table

将 excel 一列或多列数据粘贴到 el-table 指定位置的 vue2 指令

-------
[deme](https://codesandbox.io/p/sandbox/vibrant-raman-g3t8be)
## usage

+ 1.安装
```shell
npm i excel-paste-to-el-table
```
```js
// 全局指令
import Vue from 'vue'
import { excelPasteToElTable } from 'excelPasteToElTable'
Vue.use(excelPasteToElTable) 

//局部指令
export default {
  directives: { 
    paste: excelPasteToElTable
  } 
}

```
+ 2.使用
```html
<tempalte>
  <el-table v-paste row-key="id"></el-table>
</tempalte>
```
+ 3.props
  
|  prop   | type  | description | required |
|  ----  | ----  | ---- | ----|
| row-key  | string | 行key，详情见element文档 | true|
| prop | string | 列属性 | true |
| formatter  | function | 将特殊字段的excel数据转化为table对应字段的数据 | false



### tip

> el-table的row-key必填，且必须使用string，不支持function
