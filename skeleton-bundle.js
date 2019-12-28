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

function isDefalutAttrValue(attr, currentValue) {
  const defaultAttrValues = {
    width: 'auto',
    height: 'auto',
    padding: '0px',
    lineHeight: 'normal',
    borderRadius: '0px',
    textAlign: 'start',
    display: '', /* display暂不处理 */
    alignItems: 'normal',
    justifyContent: 'normal',
    flexDirection: 'row',
    position: 'static',
    zIndex: 'auto',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    float: 'none',
    boxShadow: 'none',
    boxSizing: 'content-box',
  }
  return defaultAttrValues[attr] === currentValue
}

function isInViewShow(el) {
  const rect = el.getBoundingClientRect()
  if (rect.top < document.documentElement.clientHeight) {
    return true
  }
  return false
}
function extractInViewDom(sourceNodes) {
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
let initialBody, cloneBody, toggleStatusButton

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
  cloneBody = cloneAndReplaceBody()
  genSkeletonStrategies()
  // test
  // openAnotherBrowser(clone)
  // 恢复当前页面到最初状态
  // rollbackPage()
  createToggleStatusBtn()
}


function toggleInitial() {
  document.body = cloneBody
}
function toggleSkeleton() {
  document.body = initialBody
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

function renderToggleStatusButton() {
  document.body.appendChild(toggleStatusButton)
}

function createToggleStatusBtn() {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `
  .skeleton-container{
    position: fixed;
    z-index: 9999;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-weight: bold;
    width: 300px;
    text-align: center;
    font-size: 13px;
    font-family: Consolas;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .skeleton-container .button{
    flex: 1;
    background: #409eff;
    border-radius: 4px;
    color: #fff;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
  .skeleton-container .download {
    margin-left: 20px;
  }
  `
  document.getElementsByTagName('head')[0].appendChild(style)
  container = document.createElement('div')
  toggleRawAndSkeletonBtn = document.createElement('button')
  downloadBtn = document.createElement('button')

  toggleRawAndSkeletonBtn.setAttribute('class', 'button')
  downloadBtn.setAttribute('class', 'button download')
  toggleRawAndSkeletonBtn.innerText = '原页面'
  downloadBtn.innerText = '下载'

  container.setAttribute('class', 'skeleton-container')
  
  toggleRawAndSkeletonBtn.addEventListener('click', () => {
    if (toggleRawAndSkeletonBtn.innerText === '原页面') {
      toggleRawAndSkeletonBtn.innerText = '骨架屏页面'
      toggleSkeleton()
    } else {
      toggleRawAndSkeletonBtn.innerText = '原页面'
      toggleInitial()
    }
    renderToggleStatusButton()
  })
  
  downloadBtn.addEventListener('click', () => {
    const a = document.createElement('a')
    a.download = 'skeleton.txt'
    const skeletonDom = document.cloneNode('body', true)
    skeletonDom.querySelector('.skeleton-container').remove()
    const skeletonHtml = skeletonDom.body.innerHTML.toString()
    a.href = URL.createObjectURL(new Blob([skeletonHtml]))
    document.body.appendChild(a)
    a.click()
  })

  document.body.appendChild(container)
  container.appendChild(toggleRawAndSkeletonBtn)
  container.appendChild(downloadBtn)
}

App()