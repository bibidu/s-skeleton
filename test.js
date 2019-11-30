const {
  collectNoChildrenElement,
  genBlock
} = require('./app')
const {
  isInViewShow
} = require('./utils')


// test
const noChildrenElements = []
setTimeout(() => {
  const sourceNodes = document.querySelector('body')
  // 克隆一个相同节点
  const cloneNodes = sourceNodes.cloneNode(true)

  collectNoChildrenElement(sourceNodes, cloneNodes, noChildrenElements)

  genBlock(noChildrenElements)
  // 提取骨架屏需要的节点部分
  const skeletonDOM = extractSkeletonDOM(sourceNodes, cloneNodes)

  console.log('skeletonDOM')
  console.log(skeletonDOM.childNodes)
  // 创建骨架屏组件
  const skeletonComponent = createSkeletonComponent(skeletonDOM)
  
  setTimeout(() => {
    console.log('create')
    skeletonComponent.show()
    setTimeout(() => {
      skeletonComponent.hide()
    }, 1000);
  }, 1000);
}, 2000)



function createSkeletonComponent(dom) {
  dom.style.position = 'fixed'
  dom.style.zIndex = 100000
  dom.style.top = 0
  dom.style.left = 0
  dom.style.right = 0
  dom.style.bottom = 0
  dom.style.background = '#fff'
  function show() {
    document.body.appendChild(dom)
  }
  function hide() {
    dom.remove()
  }
  return { show, hide }
}
function extractSkeletonDOM(sourceNodes, cloneNodes) {
  if (sourceNodes.tagName === 'SCRIPT') {
    return cloneNodes.remove()
  }
  if (sourceNodes.hasChildNodes()) {
    if (sourceNodes !== document.querySelector('body') && !isInViewShow(sourceNodes)) {
      return cloneNodes.remove()
    }

    sourceNodes.childNodes.forEach((child, idx) => extractSkeletonDOM(child, cloneNodes.childNodes[idx]))
  } else {
    return
  }
  return cloneNodes
}

