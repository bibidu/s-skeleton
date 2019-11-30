module.exports = function makeDiv(sourceNodes, cloneNodes) {
  const baseSpacing = 6
  const style = getComputedStyle(sourceNodes)
  let height = style.height
  let lineHeight = style.lineHeight
  if (height.includes('px')) {
    height = Number(height.split('px')[0])
    if (typeof lineHeight !== 'number' && lineHeight.includes('px')) {
      lineHeight = Number(lineHeight.split('px')[0])
    } else if (lineHeight === 'auto') {
      lineHeight = height
    } else if (lineHeight.includes('%')) {
      lineHeight = height * Number(lineHeight.slice(0, -1))
    }
    cloneNodes.innerHTML = ''
    const number = Math.floor(Math.sqrt(height / (lineHeight + baseSpacing)))
    let i = number
    while (i-- > 0) {
      const el = document.createElement('div')
      el.style.color = '#ccc !important'
      el.style.background = '#ededed'
      el.style.marginBottom = baseSpacing + 'px'
      el.style.width = '100%'
      el.style.height = number === 1 ? lineHeight + baseSpacing + 'px' : Math.floor(height / number) + 'px'
      cloneNodes.appendChild(el)
    }
    if (getComputedStyle(sourceNodes).width === '0px') {
      cloneNodes.style.width = '100%'
    }
  } else {
    console.log('height not has px unit!')
  }
}