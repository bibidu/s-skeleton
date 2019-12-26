const {
  extractInViewDom,
} = require('./utils')
const strategies = require('./strategies')

// 流程1：克隆并替换body
function cloneAndReplaceBody() {
  const clone = extractInViewDom(document.querySelector('body'))
  document.querySelector('body').replaceWith(clone)
}

// 流程2: 执行生成骨架屏策略
function genSkeletonStrategies() {
  strategies.forEach(fn => fn())
}

function App() {
  cloneAndReplaceBody()
  genSkeletonStrategies()
  // 
}

App()