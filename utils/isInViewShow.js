module.exports = function isInViewShow(el) {
  const rect = el.getBoundingClientRect()
  if (rect.top < document.documentElement.clientHeight) {
    return true
  }
  return false
}