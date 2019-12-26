const {
  isInViewShow
} = require('.')

/**
 * 克隆可视范围内的dom
 * @param {*} sourceNodes 
 */
module.exports = function extractInViewDom(sourceNodes) {
  const cloneNodes = sourceNodes.cloneNode(true)
  _extractInViewDom(sourceNodes, cloneNodes)
  return cloneNodes

  function _extractInViewDom(sourceNodes, cloneNodes) {
    if (!sourceNodes) {
      return cloneNodes.remove()
    }
    if (sourceNodes.nodeType !== 1 && sourceNodes.nodeType !== 3) {
      return cloneNodes.remove()
    }
    if (window.getComputedStyle(sourceNodes).display === 'none') {
      return cloneNodes.remove()
    }
    if (sourceNodes.tagName === 'SCRIPT') {
      return cloneNodes.remove()
    }
    if (sourceNodes.hasChildNodes()) {
      if (sourceNodes !== document.querySelector('body') && !isInViewShow(sourceNodes)) {
        return cloneNodes.remove()
      }
  
      for (let idx = sourceNodes.childNodes.length - 1;idx >= 0; idx--) {
        const child = sourceNodes.childNodes[idx]
        if (child.nodeType === 3) {
          continue
        }
        _extractInViewDom(child, cloneNodes.childNodes[idx])
      }
    } else {
      return
    }
    return cloneNodes
  }
}