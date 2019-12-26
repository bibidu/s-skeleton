
const strategies = []

// 所有文本颜色透明
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    el.style.color = 'transparent'
  })
})

// 删除svg
strategies.push(() => {
  document.querySelectorAll('*').forEach(el => {
    if (['svg'].includes(el.tagName)) {
      el.remove()
    }
  })
})

// 所有元素，宽和高都小于30的 都删除
strategies.push(() => {
  ;['div', 'img', 'i', 'span', 'a', 'li'].forEach(tag => document.querySelectorAll(tag).forEach(el => {
    let { width, height } = window.getComputedStyle(el)
  width = Number(width.split('px')[0])
  height = Number(height.split('px')[0])
    if (width < 30 && height < 30) {
        el.remove()
    } 
  }))
})

// 所有图片如果取到宽高就 删除该图片并创建一个新的div替换
strategies.push(() => {
  // document.querySelectorAll('img').forEach(img => {img.style.background = '#eee';img.src = ''})
  ;document.querySelectorAll('img').forEach(el => {
    const { width, height } = getComputedStyle(el)
    const span = document.createElement('span')
    span.style.width = width
    span.style.height = height
    span.style.background = '#eee'
    span.style.display = 'inline-block'
    el.replaceWith(span)
  })
})

// 对于所有元素，子元素都是文本节点且值不为空，则给该元素设置背景
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    const flag = Array.from(el.childNodes).every(item => item.nodeType === 3 && item.textContent.trim())
    if (flag) {
      el.style.background = '#eee'
    }
  })
})

// 所有元素有background带url的都删除并设置为默认色
strategies.push(() => {
  ;document.querySelectorAll('*').forEach(el => {
    if (getComputedStyle(el).background.includes('url')) {
      el.style.background = '#eee'
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

module.exports = strategies