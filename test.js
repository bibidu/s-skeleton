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
  collectNoChildrenElement('body', noChildrenElements)
  genBlock(noChildrenElements)
  extractSkeletonDOM(document.querySelector('body').cloneNode(true))
}, 2000)


function extractSkeletonDOM(current) {
  if (current.tagName === 'SCRIPT') {
    return current.remove()
  }
  if (current.hasChildNodes()) {
    if (current !== document.querySelector('body') && !isInViewShow(current)) {
      console.log('12');
      return current.remove()
    }
    current.childNodes.forEach(child => extractSkeletonDOM(child))
  } else {
    return
  }
  console.log(current);
}

