const {
  collectNoChildrenElement,
  genBlock
} = require('./app')

// test
const noChildrenElements = []
setTimeout(() => {
  collectNoChildrenElement('body', noChildrenElements)
  genBlock(noChildrenElements)
}, 2000)

