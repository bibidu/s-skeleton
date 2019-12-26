const {
  extractInViewDom,
} = require('./utils')
const strategies = require('./strategies')

let initialBody

// 流程1：克隆并替换body
function cloneAndReplaceBody() {
  initialBody = document.querySelector('body')
  const clone = extractInViewDom(initialBody)
  document.querySelector('body').replaceWith(clone)
  return clone
}

// 流程2: 执行生成骨架屏策略
function genSkeletonStrategies() {
  strategies.forEach(fn => fn())
}

function App() {
  const clone = cloneAndReplaceBody()
  genSkeletonStrategies()
  // test
  openAnotherBrowser(clone)
  // 恢复当前页面到最初状态
  rollbackPage()
}

function rollbackPage() {
  document.body = initialBody
}

// test
function openAnotherBrowser(clone) {
  const browser = window.open('', '_blank')
  const doc = browser.document
  doc.body.replaceWith(clone)
  // 创建移动端meta标签
  createMobildMetaTag(document, doc)
  // 创建clear样式
  createClearStyleTag(doc)
}

function createMobildMetaTag(document, doc) {
  const defaultViewPortContent = 'initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=0,width=device-width'
  const metaTag = Array.from(document.querySelectorAll('meta')).filter(meta => {
    return meta.getAttribute('name') === 'viewport'
  })
  const meta = doc.createElement('meta')
  meta.name = 'viewport'
  if (metaTag.length) {
    meta.content = metaTag[0].getAttribute('content')
  } else {
    meta.content = defaultViewPortContent
  }
  doc.getElementsByTagName('head')[0].appendChild(meta)
}

function createClearStyleTag(document) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `
  button{border:none;background:transparent;}
  @keyframes skeleton-light{
		from {
			background-position: 0 0;
		}
		to {
			background-position: 450px 0;
		}
	}
  `
  document.getElementsByTagName('head')[0].appendChild(style)
}
// App()