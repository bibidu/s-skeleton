const {
  isInViewShow,
} = require('./utils')
const {
  makeDiv
} = require('./elements')


const COLOR = '#ededed' // 色块颜色
const inlineNodes = ['IMG']

const genBlock = function(els) {
  els = Array.isArray(els) ? els : [els]
  els.forEach(el => {
    if (!el.style) {
      el.style = {}
    }
    if (el.style) {
      el.style.color = COLOR
      el.style.background = COLOR
    }
  })
}

const replaceToDivElement = function(sourceNodes, cloneNodes, needRenderColorElements) {
  const interitAttrNames = ['width', 'height', 'margin', 'borderRadius']
  const style = getComputedStyle(sourceNodes)
  const div = document.createElement('div')
  interitAttrNames.forEach(name => div.style[name] = style[name])
  if (inlineNodes.includes(sourceNodes.tagName)) {
    div.style.display = 'inline-block'
  }
  needRenderColorElements.push(div)
  cloneNodes.parentNode.insertBefore(div, cloneNodes)
  cloneNodes.remove()
}
 
 
const collectNoChildrenElement = function(selector = 'body', cloneNodes, needRenderColorElements) {
  let sourceNodes = typeof selector === 'string' ? document.querySelector(selector) : selector
  switch(sourceNodes.tagName) {
    case 'SCRIPT': return
    case 'A':
    case 'LABEL':
    case 'BUTTON': {
      return needRenderColorElements.push(cloneNodes)
    }
    case 'IMG': {
      return replaceToDivElement(sourceNodes, cloneNodes, needRenderColorElements)
    }
  }

  if (!sourceNodes.hasChildNodes()) {
    if (sourceNodes.tagName === 'DIV' || sourceNodes.tagName === 'SPAN') {
      makeDiv(sourceNodes, cloneNodes)
    }
    
    if (sourceNodes.nodeType === 3 // 文本节点
      && sourceNodes.data.trim() !== '' // 内容非空
    ) {
      return needRenderColorElements.push(cloneNodes.parentNode)
    }
    needRenderColorElements.push(cloneNodes)
  }
 
  (sourceNodes.childNodes || []).forEach((child, idx) => {
    collectNoChildrenElement(child, cloneNodes.childNodes[idx], needRenderColorElements)
  })
}

module.exports.collectNoChildrenElement = collectNoChildrenElement
module.exports.genBlock = genBlock
