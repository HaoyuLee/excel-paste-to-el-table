let tableData = []
let columns = []
let currentCell = null
let $CI = null
export default {
  bind(el) {
    const isElTable = el.classList.contains('el-table')
    if (!isElTable) return console.error('v-paste:', "directive can't be used for non el-table ")
  },
  inserted(el, binding, vnode, oldVnode) {
    setGlobalData(vnode)
    // 粘贴事件监听
    el.addEventListener('paste', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let paste = (e.clipboardData || window.clipboardData).getData('text')
      if (paste === 'paste') return // 没有复制内容
      const rows = paste.split('\r\n').filter((i) => i.trim())
      const data = rows.map((r) => r.split('\t'))
      const { prop, rowKey, keyValue } = currentCell
      if (prop && rowKey && keyValue) {
        const props = columns.map((col) => col.property)
        const startRowIndex = tableData.findIndex((item) => item[rowKey] === keyValue) // 开始行的位置
        const startColIndex = props.findIndex((p) => p === prop) // 开始列的位置
        // 未找到单元格
        if (startRowIndex < 0 || startColIndex < 0) return
        // data.length - 粘贴的数据有多少行
        for (let r = 0; r < data.length; r++) {
          const currentRowIndex = r + startRowIndex // 要粘贴的行的位置
          // data[r].length - 当前行要粘贴几个单元格的数据
          for (let c = 0; c < data[r].length; c++) {
            const currentProp = props[startColIndex + c]
            $CI.$set($CI.data[currentRowIndex], currentProp, getValue(currentProp, data[r][c]))
          }
        }
      } else {
        console.error('v-paste:', 'focus position not found')
      }
    })
  },
  update(el, binding, vnode, oldVnode) {
    setGlobalData(vnode)
  }
}

/**
 * 根据列是否有formatter函数，生成对应的列的实际的值(在一些excel和table展示的类型不同时使用，比如【是否】-checkbox)
 * @param {String} currentProp 当前列prop
 * @param {*} excelCellValue excel对应的当前列的值
 * @returns 原始excel值 || 格式化后的值
 */
function getValue(currentProp, excelCellValue) {
  const { formatter } = columns.find((c) => c.property === currentProp)
  return formatter ? formatter(excelCellValue) : excelCellValue
}
/**
 * 设置全局变量内容
 * @param {Vnode} vnode el-table虚拟dom
 */
function setGlobalData(vnode) {
  $CI = vnode.componentInstance
  columns = $CI.columns
  tableData = $CI.data
  // 监听el-table中点击单元格事件， 设置当前选中的单元格数据
  $CI.$on('cell-click', (row, column, cell, event) => {
    currentCell = {
      prop: column.property,
      rowKey: $CI.rowKey,
      keyValue: row[$CI.rowKey]
    }
  })
}
