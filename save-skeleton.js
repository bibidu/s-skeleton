// const body = 'document.body.innerHTML'
// const element = document.createElement('a')
// element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(body))
// element.setAttribute('download', 'skeleton')
// document.body.appendChild(element)
// element.click()
window.toggleStatus = document.querySelector('.toggle-status')
window.nextStatus = toggleStatus.innerText === '1' ? '0' : '1'
toggleStatus.innerText = nextStatus