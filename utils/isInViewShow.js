module.exports = function isInViewShow(el) {
  const rect = el.getBoundingClientRect()
  console.log(el);
  console.log(rect.top);
  console.log(document.documentElement.clientHeight)
  if (rect.top < document.documentElement.clientHeight) {
    return true
  }
  return false
}