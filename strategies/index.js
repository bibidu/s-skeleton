const {
  isDefalutAttrValue
} = require('../utils')

/*********************** start ***********************/
const baseBackground = '#edeff1' // 基础背景填充色
const darkerBackground = '#ddd' // 更深的背景填充色
const baseBorderRadius = '4px' // 默认的色块圆角
const marginBottomConstant = 6 // 色块高度减少并增加marginBottom的像素值(留出色块间的间距)
// const baseStyles = {
//   background: `linear-gradient(90deg, #fff, ${baseBackground}, #fff)`,
//   backgroundPosition: '450px 0',
//   animation: 'skeleton-light 2.6s linear infinite'
// }

function getBackground(el) {
  const { borderRadius } = getComputedStyle(el)
  if (borderRadius !== '0px') {
    return darkerBackground
  }
  return baseBackground
}

// function setColorBlockStyle(el) {
//   Object.entries(baseStyles).forEach(([attr, value]) => {
//     el.style[attr] = value
//   })
// }

function setAttributeInterceptor(attr, value) {
  if (attr === 'borderRadius' && value === '0px') {
    return baseBorderRadius
  }
  return value
}
/*********************** end ***********************/

const strategies = []

// 所有元素背景透明
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    const { background } = getComputedStyle(el)
    if (!['IMG'].includes(el.tagName)) {
      if (!background.includes('rgba(0, 0, 0, 0)')) {
        el.style.background = 'transparent'
      }
    }
  })
})

// 对于所有元素，子元素都是文本节点且值不为空，则给该元素设置背景
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    const flag = Array.from(el.childNodes).every(item => item.nodeType === 3 && item.textContent.trim())
    if (flag) {
      // setColorBlockStyle(el)
      el.style.background = baseBackground
    }
  })
})

// 所有图片如果取到宽高就 删除该图片并创建一个新的span替换
strategies.push(() => {
  ;document.querySelectorAll('img').forEach(el => {
    const span = document.createElement('span')
    ;[
      'width',
      'height',
      'borderRadius',
      'margin',
      'padding',
      'opacity',
      'position',
      'zIndex',
      'top',
      'left',
      'right',
      'bottom',
      'float',
      'boxShadow',
      'boxSizing',
    ].forEach(attr => {
      const currentValue = getComputedStyle(el)[attr]
      if (!isDefalutAttrValue(attr, currentValue)) {
        span.style[attr] = currentValue
      }
    })
    // setColorBlockStyle(span)
    span.style.background = getBackground(el)
    span.style.display = 'inline-block'
    el.replaceWith(span)
  })
})

// 所有文本颜色透明
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    el.style.color = 'transparent'
  })
})

// 删除svg(不显示，防止样式异常)
strategies.push(() => {
  document.querySelectorAll('*').forEach(el => {
    if (['svg'].includes(el.tagName)) {
      // el.remove()
      el.style.opacity = 0
    }
  })
})

// 所有元素，宽和高都小于30的 都删除(不显示，防止样式异常)
strategies.push(() => {
  document.querySelectorAll('*').forEach(el => {
    let { width, height } = window.getComputedStyle(el)
    width = Number(width.split('px')[0])
    height = Number(height.split('px')[0])
    if (width < 30 && height < 30) {
        // el.remove()
        el.style.opacity = 0
    } 
  })
})

// 所有元素有background带url的都删除并设置为默认色
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    if (getComputedStyle(el).background.includes('url')) {
      // setColorBlockStyle(el)
      el.style.background = getBackground(el)
    }
  })
})

// 所有元素有border的全部去掉
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    if (!getComputedStyle(el).border.startsWith('0px')) {
      el.style.border = 'none'
    }
  })
})

// 所有元素：未设置borderRaduis且(宽度是高度的1.5倍以上 或 内容为纯文本的)，高度减5，改为margin-bottom 5（目的为了留出文本间的间距）
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    let { width, height, borderRadius, marginBottom } = window.getComputedStyle(el)
    width = Number(width.split('px')[0])
    height = Number(height.split('px')[0])
    marginBottom = Number(marginBottom.split('px')[0])
    if (borderRadius === '0px') {
      if (
        (width >= 2 * height) ||
        (!Array.from(el.childNodes).length || Array.from(el.childNodes).every(item => item.nodeType === 3 && item.textContent.trim()))
      ) {
        el.style.height = `${height - marginBottomConstant}px`
        el.style.marginBottom = `${marginBottom + marginBottomConstant}px`
      }
    }
  })
})

// 所有元素的宽高/margin/padding/都写在内联
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    const canWriteInlineAttrs = [
      'width',
      'height',
      'margin',
      'padding',
      'fontSize',
      'lineHeight',
      'borderRadius',
      'textAlign',
      'display',
      'alignItems',
      'justifyContent',
      'flexDirection',
      'position',
      'zIndex',
      'top',
      'left',
      'right',
      'bottom',
      'float',
      'boxShadow',
      'boxSizing',
    ]
    canWriteInlineAttrs.forEach(attr => {
      let currentValue = getComputedStyle(el)[attr]
      currentValue = setAttributeInterceptor(attr, currentValue)
      if (!isDefalutAttrValue(attr, currentValue)) {
        el.style[attr] = currentValue
      }
    })
  })
})

// 【优化】所有元素：如果当前元素有背景色，则清空所有子元素
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    const { background } = getComputedStyle(el)
    if (!background.includes('rgba(0, 0, 0, 0)')) {
      el.innerText = ''
    }
  })
})

// 【优化】所有元素：去掉class、id
strategies.push(() => {
  function removeRestAttribute(el) {
    if (el && el.getAttributeNames) {
      const attributeNames = el.getAttributeNames()
      attributeNames.forEach(attrName => {
        if (attrName !== 'style') {
          el.removeAttribute(attrName)
        }
      })
    }
  }
  function _traverseChildNode(current) {
    if (current.hasChildNodes()) {
      Array.from(current.childNodes).forEach(child => {
        removeRestAttribute(child)
        _traverseChildNode(child)
      })
    }
  }
  ;document.querySelectorAll('body').forEach(el => {
    _traverseChildNode(el)
  })
})

module.exports = strategies