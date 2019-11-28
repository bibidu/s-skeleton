const {
  isInViewShow,
} = require('./utils')
const {
  makeDiv
} = require('./elements')


const COLOR = '#ededed' // 色块颜色

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

const replaceToDivElement = function(element, needRenderColorElements) {
  const interitAttrNames = ['width', 'height', 'margin', 'borderRadius']
  const style = getComputedStyle(element)
  const div = document.createElement('div')
  interitAttrNames.forEach(name => div.style[name] = style[name])
  needRenderColorElements.push(div)
  element.parentNode.insertBefore(div, element)
  element.remove()
}
 
 
const collectNoChildrenElement = function(selector = 'body', needRenderColorElements) {
  let currentNode = typeof selector === 'string' ? document.querySelector(selector) : selector
  switch(currentNode.tagName) {
    case 'SCRIPT': return
    case 'A':
    case 'SPAN':
    case 'LABEL':
    case 'BUTTON': {
      return needRenderColorElements.push(currentNode)
    }
    case 'IMG': {
      return replaceToDivElement(currentNode, needRenderColorElements)
    }
  }

  if (!currentNode.hasChildNodes()) {
    if (currentNode.tagName === 'DIV') {
      makeDiv(currentNode)
    }
    
    if (currentNode.nodeType === 3 // 文本节点
      && currentNode.data.trim() !== '' // 内容非空
    ) {
      return needRenderColorElements.push(currentNode.parentNode)
    }
    needRenderColorElements.push(currentNode)
  }
 
  (currentNode.childNodes || []).forEach(child => {
    collectNoChildrenElement(child, needRenderColorElements)
  })
}

module.exports.collectNoChildrenElement = collectNoChildrenElement
module.exports.genBlock = genBlock
