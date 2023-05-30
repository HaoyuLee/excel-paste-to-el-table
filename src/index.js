import { default as excelPasteToElTable } from './excelPasteToElTable'

excelPasteToElTable.install = (Vue) => {
  Vue.directive('paste', excelPasteToElTable)
}
export { excelPasteToElTable }
